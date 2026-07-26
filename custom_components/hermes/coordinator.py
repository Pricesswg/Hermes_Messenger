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
    CONF_CASE_SENSITIVE,
    CONF_HELP_KEYWORD,
    CONF_PART_DELAY,
    CONF_RATE_LIMIT,
    CONF_REQUIRE_ACK,
    DATA_STORE,
    DEFAULT_BYTE_LIMIT,
    DEFAULT_CASE_SENSITIVE,
    DEFAULT_HELP_KEYWORD,
    DEFAULT_INITIAL_DELAY,
    DEFAULT_PART_DELAY,
    DEFAULT_RATE_LIMIT,
    DEFAULT_REQUIRE_ACK,
    MATCH_EXACT,
    MATCH_STARTSWITH,
    MESHTASTIC_DOMAIN,
    MODE_CHANNEL,
    MODE_DIRECT,
    REPLY_CHANNEL,
    REPLY_SENDER_DM,
    SERVICE_SEND_TEXT,
)
from .actions import entity_bounds, value_spec
from .matching import match_command, matches_keyword
from .message import split_message
from .rate_limit import allow as rate_allow, forget_idle
from .tokens import apply_argument, parse_actions, parse_argument, strip_actions

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

        # Sliding window of matched commands per node, for the rate limit.
        self._rate_history: dict[int, list[float]] = {}

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
        # Options win over data, so the listening channel can be changed from
        # the card without recreating the entry.
        channel = self.entry.options.get(CONF_CHANNEL_INDEX)
        if channel is None:
            channel = self.entry.data.get(CONF_CHANNEL_INDEX)
        return channel

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

    @property
    def require_ack(self) -> bool:
        return bool(self.entry.options.get(CONF_REQUIRE_ACK, DEFAULT_REQUIRE_ACK))

    @property
    def rate_limit(self) -> int:
        return int(self.entry.options.get(CONF_RATE_LIMIT, DEFAULT_RATE_LIMIT))

    @property
    def case_sensitive(self) -> bool:
        return bool(
            self.entry.options.get(CONF_CASE_SENSITIVE, DEFAULT_CASE_SENSITIVE)
        )

    @property
    def help_keyword(self) -> str:
        return str(
            self.entry.options.get(CONF_HELP_KEYWORD, DEFAULT_HELP_KEYWORD) or ""
        ).strip()

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
            # The help keyword is not a configured command, so it is handled
            # here, and only for senders on the default whitelist: replying to
            # anyone would advertise the command list to the whole channel.
            if self._is_help(text):
                if int(sender) in self.default_authorized:
                    self._log("in", text, sender, "help")
                    self.entry.async_create_background_task(
                        self.hass, self._send_help(sender), name="hermes_help"
                    )
                else:
                    self._log("in", text, sender, "unauthorized")
                return
            self._log("in", text, sender, "no_match")
            return

        if not self._is_authorized(sender, command):
            # Silent drop: do not confirm to an attacker that the node/channel
            # is alive and listening.
            self._record_error("authorization rejected", sender, text)
            self._log("in", text, sender, "unauthorized")
            _LOGGER.debug(
                "Hermes: node %s NOT authorized for '%s', dropping", sender, text
            )
            self._notify_sensors()
            return

        if not self._allow_rate(sender):
            # Refused after authorization on purpose: the cheap checks have
            # already run, and what this protects is service execution.
            self._record_error("rate limit reached", sender, text)
            self._log("in", text, sender, "rate_limited")
            _LOGGER.warning(
                "Hermes: node %s over the rate limit of %s per minute, dropping",
                sender,
                self.rate_limit,
            )
            self._notify_sensors()
            return

        self._log("in", text, sender, "matched")
        await self._execute(command, sender, text)

    def _allow_rate(self, sender: int) -> bool:
        """Whether this node is still within its per minute allowance."""
        now = self.hass.loop.time()
        forget_idle(self._rate_history, now)
        return rate_allow(self._rate_history, int(sender), now, self.rate_limit)

    def _is_help(self, text: str) -> bool:
        return matches_keyword(text, self.help_keyword, self.case_sensitive)

    async def _send_help(self, sender: int) -> None:
        """Reply with the configured keywords, for people without access to HA."""
        keywords = [
            (cmd.get(CMD_KEYWORD) or "").strip()
            for cmd in self.commands
            if (cmd.get(CMD_KEYWORD) or "").strip()
        ]
        text = ", ".join(keywords) if keywords else "no commands configured"

        base = {"from": self.gateway_node_id, "ack": self.require_ack}
        if self.mode == MODE_DIRECT:
            base["to"] = sender
        else:
            base["channel"] = self.channel_index

        await asyncio.sleep(self.initial_delay)
        await self._send_parts(split_message(text, DEFAULT_BYTE_LIMIT), base)

    @callback
    def _log(self, direction: str, text: str, node: int | None, outcome: str) -> None:
        """Append to the shared message log, if the store is loaded."""
        store = self.hass.data.get(DATA_STORE)
        if store is not None:
            store.async_log(direction, text, node, outcome)

    def _matches_mode(self, to: dict[str, Any]) -> bool:
        """Filter channel vs DM against the real `to` schema."""
        node = to.get("node")
        channel = to.get("channel")
        if self.mode == MODE_CHANNEL:
            return node is None and channel == self.channel_index
        # DM: the message is addressed to our gateway as a node.
        return channel is None and node == self.gateway_node_id

    def _match_command(self, text: str) -> dict[str, Any] | None:
        """Match against the configured commands, honouring the case setting."""
        return match_command(text, self.commands, self.case_sensitive)

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

        template = command.get(CMD_REPLY_TEMPLATE) or ""
        await self._run_action_tokens(command, template, text)

        # Action tokens render to nothing, so only the human sentence is sent.
        reply = self._render_reply(strip_actions(template))
        if reply:
            # Fire-and-forget: the send delays must not block the event bus.
            self.entry.async_create_background_task(
                self.hass,
                self._send_reply(reply, command, sender),
                name="hermes_reply",
            )
        self._notify_sensors()

    async def _run_action_tokens(
        self, command: dict[str, Any], template: str, message: str
    ) -> None:
        """Execute the `{do:...}` tokens of a template, in order.

        The number the sender may append after the keyword overrides the
        configured default. It is parsed strictly as a number and validated
        against the catalogue range, and it never touches the service or the
        entity id.
        """
        actions = parse_actions(template)
        if not actions:
            return

        argument: float | None = None
        if command.get(CMD_MATCH_TYPE) == MATCH_STARTSWITH:
            argument = parse_argument(message, command.get(CMD_KEYWORD) or "")

        for token in actions:
            params = dict(token.params)
            if argument is not None and len(params) == 1:
                key = next(iter(params))
                # The device is the authority on its own limits; the catalogue
                # is only the fallback when the entity does not publish them.
                state = self.hass.states.get(token.entity_id)
                low, high = entity_bounds(
                    state.attributes if state else {},
                    key,
                    value_spec(token.service, key),
                )
                params = apply_argument(params, argument, low, high)
            try:
                await self.hass.services.async_call(
                    token.domain,
                    token.name,
                    params,
                    blocking=True,
                    target={"entity_id": token.entity_id},
                )
            except Exception as err:  # noqa: BLE001 - one bad token must not stop the rest
                self._record_error(f"action {token.service}: {err}", None, message)
                _LOGGER.warning(
                    "Hermes: action token %s on %s failed: %s",
                    token.service,
                    token.entity_id,
                    err,
                )

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

        base = {"from": self.gateway_node_id, "ack": self.require_ack}
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
        self._log("out", " ".join(parts), base.get("to"), "sent")
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

    async def async_broadcast(
        self, message: str, channel: int | None = None
    ) -> None:
        """Send on a channel, defaulting to the one configured in the entry.

        The explicit channel wins when given, so an automation or a preset can
        reach a channel other than the one this gateway listens on without
        needing a second config entry.
        """
        parts = split_message(message, DEFAULT_BYTE_LIMIT)
        if not parts:
            return
        base = {"from": self.gateway_node_id, "ack": self.require_ack}
        target = channel if channel is not None else self.channel_index
        if target is not None:
            base["channel"] = int(target)
        await self._send_parts(parts, base)

    async def async_send_direct(self, node_id: int, message: str) -> None:
        """Targeted send to a single node, bypassing the default channel."""
        parts = split_message(message, DEFAULT_BYTE_LIMIT)
        if not parts:
            return
        base = {
            "from": self.gateway_node_id,
            "to": int(node_id),
            "ack": self.require_ack,
        }
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
