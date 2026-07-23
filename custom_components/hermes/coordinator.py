"""Hermes coordinator: event listening, command matching, execution, reply.

This is not a DataUpdateCoordinator (we do no polling): it is a per-config-entry
application object that reacts to `meshtastic_api_text_message` events emitted by
the base `meshtastic` integration, runs the associated Home Assistant service,
and sends the reply back over the mesh while respecting the payload limit.
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

# User-facing placeholders: {state:entity_id} and {attr:entity_id:attribute}.
# We deliberately do NOT expose raw Jinja2: these two cover 90% of cases and do
# not allow arbitrary execution inside the reply text.
_PLACEHOLDER_RE = re.compile(r"\{(state|attr):([^:}]+?)(?::([^}]+?))?\}")


class HermesCoordinator:
    """Application logic for a single config entry (gateway + channel/DM)."""

    def __init__(self, hass: HomeAssistant, entry: ConfigEntry) -> None:
        """Initialize the coordinator."""
        self.hass = hass
        self.entry = entry

        # Diagnostic state exposed to the sensors (native device page).
        self.last_command: dict[str, Any] | None = None
        self.last_error: dict[str, Any] | None = None
        self.commands_executed = 0
        self.last_reset = dt_util.utcnow()

        self._sensor_listeners: list[CALLBACK_TYPE] = []
        self._unsub_midnight: CALLBACK_TYPE | None = None

    # --- Lifecycle ---------------------------------------------------------

    @callback
    def async_setup(self) -> None:
        """Register the daily reset of the command counter."""
        self._unsub_midnight = async_track_time_change(
            self.hass, self._reset_counter, hour=0, minute=0, second=0
        )

    @callback
    def async_shutdown(self) -> None:
        """Release resources (called on unload)."""
        if self._unsub_midnight is not None:
            self._unsub_midnight()
            self._unsub_midnight = None

    # --- Config accessors (read live: options editable without a reload) ----

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
        # The default whitelist is editable via the OptionsFlow: options win
        # over the initial data from the "user" step.
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

    # --- Incoming event handling -------------------------------------------

    async def async_handle_event(self, event: Event) -> None:
        """Entry point for every `meshtastic_api_text_message`."""
        # Real schema (verified): fields are nested under ["data"] and `to` is
        # an object {node, channel}. Defensive code: if the base changes we just
        # ignore, we do not blow up.
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

        # Match BEFORE authorization: no side effect happens before the check,
        # and we need to know the command to apply its specific whitelist
        # override. An unauthorized sender still receives nothing (silent drop
        # below).
        command = self._match_command(text)
        if command is None:
            return

        if not self._is_authorized(sender, command):
            # Silent drop: do not confirm to an attacker that the node/channel
            # is alive and listening.
            self._record_error("authorization rejected", sender, text)
            _LOGGER.debug(
                "Hermes: node %s NOT authorized for '%s' — dropping", sender, text
            )
            self._notify_sensors()
            return

        await self._execute(command, sender, text)

    def _matches_mode(self, to: dict[str, Any]) -> bool:
        """Filter channel vs DM against the real `to` schema."""
        node = to.get("node")
        channel = to.get("channel")
        if self.mode == MODE_CHANNEL:
            return node is None and channel == self.channel_index
        # DM: the message is addressed to our gateway as a node.
        return channel is None and node == self.gateway_node_id

    def _match_command(self, text: str) -> dict[str, Any] | None:
        """Case-insensitive, trimmed match against the configured commands."""
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
        """Effective whitelist: command override if present, else the default."""
        override = command.get(CMD_AUTH_OVERRIDE)
        allowed = {int(n) for n in override} if override else self.default_authorized
        return int(sender) in allowed

    # --- Execution + reply -------------------------------------------------

    async def _execute(
        self, command: dict[str, Any], sender: int, text: str
    ) -> None:
        """Run the associated service and send the reply."""
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
        except Exception as err:  # noqa: BLE001 - runtime robustness: never let the listener die
            self._record_error(f"service execution: {err}", sender, text)
            _LOGGER.warning("Hermes: error running '%s': %s", service, err)

        reply = self._render_reply(command.get(CMD_REPLY_TEMPLATE) or "")
        if reply:
            # Fire-and-forget: the send delays must not block the event bus.
            self.entry.async_create_background_task(
                self.hass,
                self._send_reply(reply, command, sender),
                name="hermes_reply",
            )
        self._notify_sensors()

    def _render_reply(self, template_str: str) -> str:
        """Resolve {state:...}/{attr:...:...} placeholders by reading states."""
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
        """Send the reply honoring per-command routing and the radio delays."""
        parts = split_message(text, DEFAULT_BYTE_LIMIT)
        if not parts:
            return

        base = {"from": self.gateway_node_id, "ack": False}
        reply_to = command.get(CMD_REPLY_TO, REPLY_CHANNEL)
        if self.mode == MODE_DIRECT or reply_to == REPLY_SENDER_DM:
            base["to"] = sender
        else:
            base["channel"] = self.channel_index

        # Initial wait: the radio may drop immediate replies because it is still
        # busy receiving. Then a pause between parts.
        await asyncio.sleep(self.initial_delay)
        await self._send_parts(parts, base)

    async def _send_parts(self, parts: list[str], base: dict[str, Any]) -> None:
        """Send the parts in sequence with an intermediate pause."""
        for index, part in enumerate(parts):
            if index:
                await asyncio.sleep(self.part_delay)
            await self.hass.services.async_call(
                MESHTASTIC_DOMAIN,
                SERVICE_SEND_TEXT,
                {**base, "text": part},
                blocking=True,
            )

    # --- Public services (broadcast / send_direct) -------------------------

    async def async_broadcast(self, message: str) -> None:
        """Send on the channel/DM configured in the entry (for HA automations)."""
        parts = split_message(message, DEFAULT_BYTE_LIMIT)
        if not parts:
            return
        base = {"from": self.gateway_node_id, "ack": False}
        if self.mode == MODE_CHANNEL and self.channel_index is not None:
            base["channel"] = self.channel_index
        await self._send_parts(parts, base)

    async def async_send_direct(self, node_id: int, message: str) -> None:
        """Targeted send to a single node, bypassing the default channel."""
        parts = split_message(message, DEFAULT_BYTE_LIMIT)
        if not parts:
            return
        base = {"from": self.gateway_node_id, "to": int(node_id), "ack": False}
        await self._send_parts(parts, base)

    # --- Diagnostic state + observer for the sensors -----------------------

    @callback
    def async_add_listener(self, update_callback: CALLBACK_TYPE) -> Callable[[], None]:
        """Register a sensor as an observer of the coordinator state."""
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
        """Daily reset of the command counter (at midnight)."""
        self.commands_executed = 0
        self.last_reset = dt_util.utcnow()
        self._notify_sensors()
