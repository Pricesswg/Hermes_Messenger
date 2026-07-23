"""Coordinator Hermes: ascolto evento, match comando, esecuzione, risposta.

Non è un DataUpdateCoordinator (non facciamo polling): è un oggetto applicativo
per config entry che reagisce agli eventi `meshtastic_api_text_message` emessi
dall'integrazione base `meshtastic`, esegue il servizio HA associato e rispedisce
la risposta sulla mesh rispettando il limite di payload.
"""

from __future__ import annotations

import asyncio
import logging
import re
from typing import Any, Callable

from homeassistant.config_entries import ConfigEntry
from homeassistant.core import CALLBACK_TYPE, Event, HomeAssistant, callback
from homeassistant.helpers.event import async_track_time_change
from homeassistant.util import dt as dt_util

from .const import (
    CMD_AUTH_OVERRIDE,
    CMD_KEYWORD,
    CMD_MATCH_TYPE,
    CMD_REPLY_TEMPLATE,
    CMD_REPLY_TO,
    CMD_SERVICE,
    CMD_SERVICE_DATA,
    CMD_TARGET,
    CONF_AUTHORIZED_NODES,
    CONF_CHANNEL_INDEX,
    CONF_COMMANDS,
    CONF_GATEWAY_NODE_ID,
    CONF_INITIAL_DELAY,
    CONF_MODE,
    CONF_PART_DELAY,
    DEFAULT_BYTE_LIMIT,
    DEFAULT_INITIAL_DELAY,
    DEFAULT_PART_DELAY,
    MATCH_EXACT,
    MATCH_STARTSWITH,
    MESHTASTIC_DOMAIN,
    MODE_CHANNEL,
    MODE_DIRECT,
    REPLY_CHANNEL,
    REPLY_SENDER_DM,
    SERVICE_SEND_TEXT,
)
from .message import split_message

_LOGGER = logging.getLogger(__name__)

# Placeholder utente-facing: {state:entity_id} e {attr:entity_id:attributo}.
# Volutamente NON esponiamo Jinja2 grezzo: questi due bastano al 90% dei casi
# e non permettono esecuzione arbitraria nel testo di risposta.
_PLACEHOLDER_RE = re.compile(r"\{(state|attr):([^:}]+?)(?::([^}]+?))?\}")


class HermesCoordinator:
    """Logica applicativa per una singola config entry (gateway + canale/DM)."""

    def __init__(self, hass: HomeAssistant, entry: ConfigEntry) -> None:
        """Inizializza il coordinator."""
        self.hass = hass
        self.entry = entry

        # Stato diagnostico esposto ai sensori (device page nativa).
        self.last_command: dict[str, Any] | None = None
        self.last_error: dict[str, Any] | None = None
        self.commands_executed = 0
        self.last_reset = dt_util.utcnow()

        self._sensor_listeners: list[CALLBACK_TYPE] = []
        self._unsub_midnight: CALLBACK_TYPE | None = None

    # --- Lifecycle ---------------------------------------------------------

    @callback
    def async_setup(self) -> None:
        """Registra il reset giornaliero del contatore comandi."""
        self._unsub_midnight = async_track_time_change(
            self.hass, self._reset_counter, hour=0, minute=0, second=0
        )

    @callback
    def async_shutdown(self) -> None:
        """Rilascia le risorse (chiamato in unload)."""
        if self._unsub_midnight is not None:
            self._unsub_midnight()
            self._unsub_midnight = None

    # --- Config accessors (letti live: options editabili senza riavvio) ----

    @property
    def gateway_node_id(self) -> int:
        return self.entry.data[CONF_GATEWAY_NODE_ID]

    @property
    def mode(self) -> str:
        return self.entry.data[CONF_MODE]

    @property
    def channel_index(self) -> int | None:
        return self.entry.data.get(CONF_CHANNEL_INDEX)

    @property
    def default_authorized(self) -> set[int]:
        # La whitelist di default è modificabile via OptionsFlow: le options
        # vincono sulla data iniziale dello step "user".
        nodes = self.entry.options.get(CONF_AUTHORIZED_NODES)
        if nodes is None:
            nodes = self.entry.data.get(CONF_AUTHORIZED_NODES, [])
        return {int(n) for n in nodes}

    @property
    def commands(self) -> list[dict[str, Any]]:
        return self.entry.options.get(CONF_COMMANDS, [])

    @property
    def initial_delay(self) -> float:
        return self.entry.options.get(CONF_INITIAL_DELAY, DEFAULT_INITIAL_DELAY)

    @property
    def part_delay(self) -> float:
        return self.entry.options.get(CONF_PART_DELAY, DEFAULT_PART_DELAY)

    # --- Gestione evento in arrivo -----------------------------------------

    async def async_handle_event(self, event: Event) -> None:
        """Punto d'ingresso per ogni `meshtastic_api_text_message`."""
        # Schema reale (verificato): i campi sono annidati sotto ["data"] e
        # `to` è un oggetto {node, channel}. Codice difensivo: se cambia la
        # base ci limitiamo a ignorare, non a esplodere.
        data = event.data.get("data")
        if not isinstance(data, dict):
            return

        if data.get("gateway") != self.gateway_node_id:
            return

        to = data.get("to") or {}
        if not self._matches_mode(to):
            return

        sender = data.get("from")
        text = data.get("message") or ""
        if sender is None or not text:
            return

        # Match PRIMA dell'autorizzazione: nessun effetto collaterale avviene
        # prima del check, e serve conoscere il comando per applicare la
        # whitelist-override specifica. Un mittente non autorizzato non riceve
        # comunque nulla (scarto silenzioso più sotto).
        command = self._match_command(text)
        if command is None:
            return

        if not self._is_authorized(sender, command):
            # Scarto silenzioso: non confermare a un attaccante che il
            # nodo/canale è vivo e in ascolto.
            self._record_error("rifiuto autorizzazione", sender, text)
            _LOGGER.debug(
                "Hermes: nodo %s NON autorizzato per '%s' — scarto", sender, text
            )
            self._notify_sensors()
            return

        await self._execute(command, sender, text)

    def _matches_mode(self, to: dict[str, Any]) -> bool:
        """Filtra canale vs DM sullo schema reale di `to`."""
        node = to.get("node")
        channel = to.get("channel")
        if self.mode == MODE_CHANNEL:
            return node is None and channel == self.channel_index
        # DM: il messaggio è indirizzato al nostro gateway come nodo.
        return channel is None and node == self.gateway_node_id

    def _match_command(self, text: str) -> dict[str, Any] | None:
        """Match case-insensitive e trim contro i comandi configurati."""
        norm = text.strip().casefold()
        for cmd in self.commands:
            keyword = (cmd.get(CMD_KEYWORD) or "").strip().casefold()
            if not keyword:
                continue
            match_type = cmd.get(CMD_MATCH_TYPE, MATCH_EXACT)
            if match_type == MATCH_STARTSWITH and norm.startswith(keyword):
                return cmd
            if match_type == MATCH_EXACT and norm == keyword:
                return cmd
        return None

    def _is_authorized(self, sender: int, command: dict[str, Any]) -> bool:
        """Whitelist effettiva: override del comando se presente, altrimenti default."""
        override = command.get(CMD_AUTH_OVERRIDE)
        allowed = {int(n) for n in override} if override else self.default_authorized
        return int(sender) in allowed

    # --- Esecuzione + risposta ---------------------------------------------

    async def _execute(
        self, command: dict[str, Any], sender: int, text: str
    ) -> None:
        """Esegue il servizio associato e invia la risposta."""
        service = command.get(CMD_SERVICE)
        try:
            if service and "." in service:
                domain, name = service.split(".", 1)
                service_data = dict(command.get(CMD_SERVICE_DATA) or {})
                target = command.get(CMD_TARGET) or None
                await self.hass.services.async_call(
                    domain,
                    name,
                    service_data,
                    blocking=True,
                    target=target,
                )
            self.commands_executed += 1
            self._record_command(text, sender)
        except Exception as err:  # noqa: BLE001 - robustezza runtime: mai far cadere il listener
            self._record_error(f"esecuzione servizio: {err}", sender, text)
            _LOGGER.warning("Hermes: errore eseguendo '%s': %s", service, err)

        reply = self._render_reply(command.get(CMD_REPLY_TEMPLATE) or "")
        if reply:
            # Fire-and-forget: i delay di invio non devono bloccare il bus eventi.
            self.entry.async_create_background_task(
                self.hass,
                self._send_reply(reply, command, sender),
                name="hermes_reply",
            )
        self._notify_sensors()

    def _render_reply(self, template_str: str) -> str:
        """Risolve i placeholder {state:...}/{attr:...:...} leggendo gli stati."""
        if not template_str:
            return ""

        def _resolve(match: re.Match[str]) -> str:
            kind, entity_id, attr = match.group(1), match.group(2).strip(), match.group(3)
            state = self.hass.states.get(entity_id)
            if state is None:
                return "?"
            if kind == "state":
                return str(state.state)
            if kind == "attr" and attr:
                return str(state.attributes.get(attr.strip(), "?"))
            return "?"

        return _PLACEHOLDER_RE.sub(_resolve, template_str)

    async def _send_reply(
        self, text: str, command: dict[str, Any], sender: int
    ) -> None:
        """Invia la risposta rispettando routing per-comando e delay del radio."""
        parts = split_message(text, DEFAULT_BYTE_LIMIT)
        if not parts:
            return

        base = {"from": self.gateway_node_id, "ack": False}
        reply_to = command.get(CMD_REPLY_TO, REPLY_CHANNEL)
        if self.mode == MODE_DIRECT or reply_to == REPLY_SENDER_DM:
            base["to"] = sender
        else:
            base["channel"] = self.channel_index

        # Attesa iniziale: il radio può scartare risposte immediate perché
        # ancora occupato dalla ricezione. Poi pausa tra le parti.
        await asyncio.sleep(self.initial_delay)
        await self._send_parts(parts, base)

    async def _send_parts(self, parts: list[str], base: dict[str, Any]) -> None:
        """Invia in sequenza le parti con pausa intermedia."""
        for index, part in enumerate(parts):
            if index:
                await asyncio.sleep(self.part_delay)
            await self.hass.services.async_call(
                MESHTASTIC_DOMAIN,
                SERVICE_SEND_TEXT,
                {**base, "text": part},
                blocking=True,
            )

    # --- Servizi pubblici (broadcast / send_direct) ------------------------

    async def async_broadcast(self, message: str) -> None:
        """Invio sul canale/DM configurato nella entry (per automazioni HA)."""
        parts = split_message(message, DEFAULT_BYTE_LIMIT)
        if not parts:
            return
        base = {"from": self.gateway_node_id, "ack": False}
        if self.mode == MODE_CHANNEL and self.channel_index is not None:
            base["channel"] = self.channel_index
        await self._send_parts(parts, base)

    async def async_send_direct(self, node_id: int, message: str) -> None:
        """Invio mirato a un singolo nodo, bypassando il canale di default."""
        parts = split_message(message, DEFAULT_BYTE_LIMIT)
        if not parts:
            return
        base = {"from": self.gateway_node_id, "to": int(node_id), "ack": False}
        await self._send_parts(parts, base)

    # --- Stato diagnostico + observer per i sensori ------------------------

    @callback
    def async_add_listener(self, update_callback: CALLBACK_TYPE) -> Callable[[], None]:
        """Registra un sensore come osservatore dello stato del coordinator."""
        self._sensor_listeners.append(update_callback)

        def _remove() -> None:
            if update_callback in self._sensor_listeners:
                self._sensor_listeners.remove(update_callback)

        return _remove

    @callback
    def _notify_sensors(self) -> None:
        for update_callback in list(self._sensor_listeners):
            update_callback()

    @callback
    def _record_command(self, text: str, sender: int) -> None:
        self.last_command = {
            "text": text,
            "node": sender,
            "time": dt_util.utcnow(),
        }

    @callback
    def _record_error(self, reason: str, sender: int | None, text: str) -> None:
        self.last_error = {
            "reason": reason,
            "node": sender,
            "text": text,
            "time": dt_util.utcnow(),
        }

    @callback
    def _reset_counter(self, now: Any = None) -> None:
        """Reset giornaliero del contatore comandi (a mezzanotte)."""
        self.commands_executed = 0
        self.last_reset = dt_util.utcnow()
        self._notify_sensors()
