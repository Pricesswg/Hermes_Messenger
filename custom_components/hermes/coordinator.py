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
from homeassistant.helpers import device_registry as dr
from homeassistant.helpers.event import async_track_time_change
from homeassistant.util import dt as dt_util

from .const import (
    CMD_AUTH_OVERRIDE,
    CMD_CONDITION_ENTITY,
    CMD_COOLDOWN,
    CMD_ID,
    CMD_KEYWORD,
    CMD_MATCH_TYPE,
    CMD_REPLY_CHANNEL,
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
    CONF_CHANNEL_RISK_ACK,
    CONF_HELP_KEYWORD,
    CONF_MAX_AGE,
    CONF_REJECT_MQTT,
    CONF_REQUIRE_PKC,
    CONF_PART_DELAY,
    CONF_RATE_LIMIT,
    CONF_REQUIRE_ACK,
    DATA_STORE,
    DEFAULT_BYTE_LIMIT,
    DEFAULT_CASE_SENSITIVE,
    DEFAULT_HELP_KEYWORD,
    DEFAULT_INITIAL_DELAY,
    DEFAULT_PART_DELAY,
    DEFAULT_MAX_AGE,
    DEFAULT_RATE_LIMIT,
    DEFAULT_REJECT_MQTT,
    DEFAULT_REQUIRE_ACK,
    DEFAULT_REQUIRE_PKC,
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
from .labels import PLACEHOLDER_RE, apply_labels, parse_labels
from .matching import accepts_message, match_command, matches_keyword
from .meshtastic_api import channel_default_psk, node_num_from_device
from .message import split_message
from .packet_meta import async_lookup
from .rate_limit import allow as rate_allow, forget_idle
from .replay import remember
from .tokens import apply_argument, parse_actions, parse_argument, strip_actions

_LOGGER = logging.getLogger(__name__)


class HermesCoordinator:
    """Application logic for a single config entry (gateway + channel/DM)."""

    def __init__(self, hass: HomeAssistant, entry: ConfigEntry) -> None:
        """Initialize the coordinator."""
        self.hass = hass
        self.entry = entry

        # Diagnostic state exposed to the sensors. Held in the store rather
        # than here, so a restart does not turn every diagnostic to unknown.
        # Last text message that crossed the mesh, recorded before any filter
        # so a gateway or channel mismatch can be seen instead of guessed.
        self.last_seen: dict[str, Any] | None = None
        # How many text messages reached this entry and what became of them.
        # One sample cannot tell "nothing arrives" from "everything arrives on
        # the wrong channel", which are opposite problems.
        self.seen_counts: dict[str, int] = {}
        self.last_reset = dt_util.utcnow()

        # Sliding window of matched commands per node, for the rate limit.
        self._rate_history: dict[int, list[float]] = {}

        # Packet ids already handled, so the same packet cannot run twice.
        self._seen_packets: dict[int, float] = {}
        # When each command last ran, for the per command cooldown.
        self._last_run: dict[str, float] = {}
        # False once a message arrives without an id: the protection cannot run
        # on that base integration, and Status must say so rather than imply it.
        self.replay_protected: bool | None = None

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
    def async_refresh_sensors(self) -> None:
        """Push the current values to the sensors after a settings change."""
        self._notify_sensors()

    @callback
    def async_shutdown(self) -> None:
        """Release resources (called on unload)."""
        if self._unsub_midnight is not None:
            self._unsub_midnight()
            self._unsub_midnight = None

    # --- Config accessors (read live: options editable without a reload) ----

    @property
    def gateway_node_id(self) -> int:
        # Options win, so a gateway picked by mistake can be corrected without
        # deleting the entry and starting over.
        gateway = self.entry.options.get(CONF_GATEWAY_NODE_ID)
        if gateway is None:
            gateway = self.entry.data[CONF_GATEWAY_NODE_ID]
        return int(gateway)

    @property
    def mode(self) -> str:
        # Options win over data, like the channel, so the gateway can be
        # switched between channel and direct message without being recreated.
        return self.entry.options.get(CONF_MODE) or self.entry.data[CONF_MODE]

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
    def require_pkc(self) -> bool:
        return bool(self.entry.options.get(CONF_REQUIRE_PKC, DEFAULT_REQUIRE_PKC))

    @property
    def reject_mqtt(self) -> bool:
        return bool(self.entry.options.get(CONF_REJECT_MQTT, DEFAULT_REJECT_MQTT))

    @property
    def max_age_seconds(self) -> int:
        return int(self.entry.options.get(CONF_MAX_AGE, DEFAULT_MAX_AGE) or 0)

    @property
    def help_keyword(self) -> str:
        return str(
            self.entry.options.get(CONF_HELP_KEYWORD, DEFAULT_HELP_KEYWORD) or ""
        ).strip()

    # --- Incoming event handling -------------------------------------------

    async def async_handle_event(self, event: Event) -> None:
        """Entry point for every `meshtastic_api_text_message`.

        Wrapped whole: an exception in here is caught by Home Assistant and
        written to its log, where nothing in this integration can see it. From
        the card that is indistinguishable from never having been called, which
        sent the diagnosis looking in the wrong place. The failure is recorded
        where the user is already looking instead.
        """
        try:
            await self._handle(event)
        except Exception as err:  # noqa: BLE001 - a listener must never die
            self._count("error")
            self._record_error(f"handler failed: {err}", None, "")
            self._log("in", str(event.data.get("data", "")), None, "error")
            _LOGGER.exception("Hermes: failed handling a mesh message")
            self._notify_sensors()

    async def _handle(self, event: Event) -> None:
        """The real work, so the wrapper above stays readable."""
        # Real schema (verified): fields are nested under ["data"] and `to` is
        # an object {node, channel}. Defensive code: if the base changes we just
        # ignore, we do not blow up.
        # Counted before anything else. Returning here without recording made
        # "the event never arrived" and "the event arrived in a shape I did not
        # expect" produce the same empty diagnostics, which are opposite
        # problems: one is upstream, the other is mine.
        self._count("received")

        data = event.data.get("data")
        if not isinstance(data, dict):
            self._count("malformed")
            _LOGGER.debug("Hermes: unexpected event payload %s", event.data)
            self._notify_sensors()
            return

        # The base integration always reports the node it is connected to as
        # the gateway. Picking any other node in the configuration means
        # nothing will ever match, which is why the mismatch is recorded rather
        # than dropped in silence.
        if data.get("gateway") != self.gateway_node_id:
            self._note_seen(data, "other_gateway")
            _LOGGER.debug(
                "Hermes: message via gateway %s, this entry listens to %s",
                data.get("gateway"),
                self.gateway_node_id,
            )
            self._notify_sensors()
            return

        # Replay check, before the message is recorded anywhere and long before
        # anything runs. A Meshtastic channel has no replay protection, so a
        # captured packet retransmitted later is the cheapest attack there is:
        # no key, no decryption, and the sender is the legitimate node so the
        # authorized list waves it through. The radio's own packet id tells the
        # two apart, because a replay is the same packet while asking twice is
        # not.
        if not self._accept_packet(event):
            self._note_seen(data, "replay")
            _LOGGER.warning(
                "Hermes: refused a repeated packet %s from %s, "
                "which is what a replayed message looks like",
                event.data.get("message_id"),
                data.get("from"),
            )
            self._notify_sensors()
            return

        # Recorded before the channel filter: the conversation view shows the
        # traffic on every channel this gateway hears, which is a different
        # question from which channel Hermes takes orders on.
        self._remember_chat(data)

        to = data.get("to") or {}
        if not self._matches_mode(to):
            self._note_seen(data, "other_target")
            _LOGGER.debug(
                "Hermes: message for %s, this entry listens on mode=%s channel=%s",
                to,
                self.mode,
                self.channel_index,
            )
            self._notify_sensors()
            return

        self._note_seen(data, "accepted")

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
                    # Rate limited like any other command. This branch makes
                    # the radio transmit, and it used to be the one way to do
                    # that without a limit: a node on the list could keep the
                    # gateway talking, spending its airtime and its battery.
                    if not self._allow_rate(sender):
                        self._record_error("rate limit reached", sender, text)
                        self._log("in", text, sender, "rate_limited")
                        self._notify_sensors()
                        return
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

        # From here on the checks are about what the message actually was and
        # whether this is a moment to act, rather than who sent it. They come
        # last because they are the expensive ones: one awaits packet metadata,
        # one reads an entity, and both only matter for a message that was
        # going to run something.
        refusal = await self._policy_refusal(event, command)
        if refusal is not None:
            self._record_error(refusal, sender, text)
            self._log("in", text, sender, "refused")
            _LOGGER.warning("Hermes: refused '%s' from %s: %s", text, sender, refusal)
            self._notify_sensors()
            return

        self._log("in", text, sender, "matched")
        await self._execute(command, sender, text)

    async def _policy_refusal(
        self, event: Event, command: dict[str, Any]
    ) -> str | None:
        """Why this command must not run now, or None to let it through.

        Returns a reason rather than a bool so the panel can say which rule
        stopped a message. A command silently not running is the single most
        confusing thing this integration can do.
        """
        blocked = self._channel_block()
        if blocked is not None:
            return blocked

        # Only fetched when a rule actually reads it. The lookup waits up to a
        # second for the packet event to catch up with the text event, and
        # paying that on every message to answer a question nobody asked would
        # put a delay in the path of a gateway with no policies at all.
        needs_meta = (
            self.require_pkc or self.reject_mqtt or self.max_age_seconds > 0
        )
        meta = (
            await async_lookup(self.hass, event.data.get("message_id"))
            if needs_meta
            else None
        )

        if self.require_pkc:
            if meta is None:
                return "encryption could not be verified"
            if not meta.get("pki_encrypted"):
                # The whole point: on anything else the sender is a claim, and
                # the authorized list is checking a claim against a list.
                return "not encrypted for this node alone"

        if self.reject_mqtt and meta is not None and meta.get("via_mqtt"):
            return "arrived over an MQTT bridge"

        max_age = self.max_age_seconds
        if max_age > 0 and meta is not None:
            received = meta.get("rx_time")
            if isinstance(received, (int, float)) and received > 0:
                age = dt_util.utcnow().timestamp() - float(received)
                if age > max_age:
                    return f"too old, received {int(age)}s ago"

        condition = str(command.get(CMD_CONDITION_ENTITY) or "").strip()
        if condition and not self._condition_met(condition):
            return f"{condition} is not on"

        cooldown = command.get(CMD_COOLDOWN) or 0
        if cooldown and not self._cooldown_passed(command, float(cooldown)):
            return f"run less than {int(cooldown)}s ago"

        return None

    def _condition_met(self, entity_id: str) -> bool:
        """Whether the guard entity currently allows this command.

        A missing entity blocks. Somebody pointed a command at something that
        does not exist, and running anyway would make the guard look like it
        was working when it never ran at all.
        """
        state = self.hass.states.get(entity_id)
        if state is None:
            _LOGGER.warning(
                "Hermes: condition entity %s does not exist, refusing", entity_id
            )
            return False
        return state.state in ("on", "home", "open", "unlocked", "true")

    def _cooldown_passed(self, command: dict[str, Any], cooldown: float) -> bool:
        """Whether enough time has passed since this command last ran."""
        key = str(command.get(CMD_ID) or command.get(CMD_KEYWORD) or "")
        now = self.hass.loop.time()
        last = self._last_run.get(key)
        if last is not None and now - last < cooldown:
            return False
        self._last_run[key] = now
        return True

    def _channel_block(self) -> str | None:
        """Why commands are blocked on this channel, or None.

        A channel key is shared by everyone holding it and a channel message
        has no verified sender, so a public channel is a place to publish, not
        a place to take orders. The user can accept that risk deliberately;
        until then this refuses, and the refusal lives here rather than in the
        card because it is an execution decision.
        """
        if self.mode != MODE_CHANNEL:
            return None

        index = self.channel_index
        if channel_default_psk(self.hass, index) is True:
            reason = "default_psk"
        elif index in (0, None):
            reason = "channel_zero"
        else:
            return None

        if self._risk_accepted(reason, index):
            return None
        return f"public channel blocked ({reason})"

    def _risk_accepted(self, reason: str, index: Any) -> bool:
        """Whether the user accepted this exact risk on this exact channel.

        Tied to both, so an acceptance given for one channel does not silently
        carry over when the gateway is pointed somewhere else. It was given for
        a situation, not for ever.
        """
        ack = self.entry.options.get(CONF_CHANNEL_RISK_ACK)
        if not isinstance(ack, dict) or not ack.get("accepted"):
            return False
        return ack.get("reason") == reason and ack.get("channel") == index

    def _accept_packet(self, event: Event) -> bool:
        """False when this exact packet has already been handled.

        The id sits on the event itself rather than inside its `data`, which is
        where every other field lives, so it is easy to miss: the base
        integration writes `event_data["message_id"]` after building the rest.

        An event with no id at all comes from a base integration too old to
        publish one. That is reported rather than guessed at: refusing
        everything would break those installs, and silently accepting
        everything would leave the panel claiming a protection that is not
        running. `replay_protected` is what Status reads.
        """
        message_id = event.data.get("message_id")
        if not isinstance(message_id, int):
            self.replay_protected = False
            return True

        self.replay_protected = True
        return remember(self._seen_packets, message_id, self.hass.loop.time())

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

    @property
    def last_command(self) -> dict[str, Any] | None:
        store = self.hass.data.get(DATA_STORE)
        return store.get_marker(self.entry.entry_id, "last_command") if store else None

    @property
    def last_error(self) -> dict[str, Any] | None:
        store = self.hass.data.get(DATA_STORE)
        return store.get_marker(self.entry.entry_id, "last_error") if store else None

    @property
    def commands_executed(self) -> int:
        """Commands run today, read from the store so a reload cannot reset it."""
        store = self.hass.data.get(DATA_STORE)
        if store is None:
            return 0
        return store.get_counter(self.entry.entry_id, self._today())

    @staticmethod
    def _today() -> str:
        return dt_util.utcnow().date().isoformat()

    @callback
    def _remember_chat(self, data: dict[str, Any]) -> None:
        """File an incoming message under its channel or its sender."""
        store = self.hass.data.get(DATA_STORE)
        text = data.get("message") or ""
        sender = data.get("from")
        if store is None or not text or sender is None:
            return

        to = data.get("to") or {}
        channel = to.get("channel")
        thread = (
            f"channel:{channel}" if channel is not None else f"node:{int(sender)}"
        )
        store.async_add_chat(
            thread, text, int(sender), False, self._node_name(int(sender))
        )

    def _node_name(self, node: int) -> str:
        """Readable name of a node, falling back to its number."""
        registry = dr.async_get(self.hass)
        for device in registry.devices.values():
            if node_num_from_device(device) == node:
                return device.name_by_user or device.name or str(node)
        return str(node)

    @callback
    def _count(self, reason: str) -> None:
        """Tally one reception outcome."""
        self.seen_counts[reason] = self.seen_counts.get(reason, 0) + 1

    @callback
    def _note_seen(self, data: dict[str, Any], reason: str) -> None:
        """Remember the last mesh message and what this entry made of it.

        Anything discarded by a filter is written to the log as well. Showing
        only what survived every filter meant a message that was read and then
        dropped left no trace in the one place anyone looks, which is
        indistinguishable from never having been read at all.
        """
        to = data.get("to") or {}
        self._count(reason)
        self.last_seen = {
            "gateway": data.get("gateway"),
            "channel": to.get("channel"),
            "node": to.get("node"),
            "from": data.get("from"),
            "reason": reason,
            "time": dt_util.utcnow(),
        }

        if reason != "accepted":
            text = data.get("message") or ""
            self._log("in", text, data.get("from"), reason)

    @callback
    def _log(self, direction: str, text: str, node: int | None, outcome: str) -> None:
        """Append to the shared message log, if the store is loaded."""
        store = self.hass.data.get(DATA_STORE)
        if store is not None:
            store.async_log(direction, text, node, outcome)

    def _matches_mode(self, to: dict[str, Any]) -> bool:
        """Filter channel vs DM against the real `to` schema."""
        return accepts_message(
            to, self.mode, self.channel_index, self.gateway_node_id
        )

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
            store = self.hass.data.get(DATA_STORE)
            if store is not None:
                store.async_bump_counter(self.entry.entry_id, self._today())
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
        """Resolve {state:...}/{attr:...:...} placeholders by reading states.

        A placeholder may carry its own words for the values it can take, so a
        switch answers "running" rather than "on". Purely presentational, and
        written by the administrator in the card: the sender contributes
        nothing here.
        """
        if not template_str:
            return ""

        def _resolve(match: re.Match[str]) -> str:
            kind, entity_id, attr = match.group(1), match.group(2).strip(), match.group(3)
            labels = parse_labels(match.group(4))
            state = self.hass.states.get(entity_id)
            if state is None:
                return "?"
            if kind == "state":
                return apply_labels(str(state.state), labels)
            if kind == "attr" and attr:
                value = state.attributes.get(attr.strip(), "?")
                return apply_labels(str(value), labels)
            return "?"

        return PLACEHOLDER_RE.sub(_resolve, template_str)

    async def _send_reply(
        self, text: str, command: dict[str, Any], sender: int
    ) -> None:
        """Send the reply honoring per-command routing and the radio delays."""
        parts = split_message(text, DEFAULT_BYTE_LIMIT)
        if not parts:
            return

        base = {"from": self.gateway_node_id, "ack": self.require_ack}
        reply_to = command.get(CMD_REPLY_TO, REPLY_CHANNEL)
        explicit = command.get(CMD_REPLY_CHANNEL)

        if reply_to == REPLY_SENDER_DM or self.mode == MODE_DIRECT:
            # A command that arrived privately is answered privately, always.
            # Broadcasting the answer of a direct exchange onto a channel would
            # publish the state of the house to everyone listening on it, so a
            # configured reply channel deliberately does not override this.
            base["to"] = sender
        elif explicit is not None:
            base["channel"] = int(explicit)
        else:
            base["channel"] = self.channel_index

        # Initial wait: the radio may drop immediate replies because it is still
        # busy receiving. Then a pause between parts.
        await asyncio.sleep(self.initial_delay)
        await self._send_parts(parts, base)

    async def _send_parts(self, parts: list[str], base: dict[str, Any]) -> None:
        """Send the parts in sequence with an intermediate pause."""
        text = " ".join(parts)
        self._log("out", text, base.get("to"), "sent")

        store = self.hass.data.get(DATA_STORE)
        if store is not None:
            target = base.get("to")
            thread = (
                f"node:{int(target)}"
                if target is not None
                else f"channel:{base.get('channel')}"
            )
            store.async_add_chat(thread, text, None, True)
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
        store = self.hass.data.get(DATA_STORE)
        if store is not None:
            store.async_set_marker(
                self.entry.entry_id,
                "last_command",
                {"text": text, "node": sender, "time": dt_util.utcnow().isoformat()},
            )

    @callback
    def _record_error(self, reason: str, sender: int | None, text: str) -> None:
        store = self.hass.data.get(DATA_STORE)
        if store is not None:
            store.async_set_marker(
                self.entry.entry_id,
                "last_error",
                {
                    "reason": reason,
                    "node": sender,
                    "text": text,
                    "time": dt_util.utcnow().isoformat(),
                },
            )

    @callback
    def _reset_counter(self, now: Any = None) -> None:
        """Midnight tick. The count is keyed by day, so this only refreshes
        the sensors: the rollover itself needs no bookkeeping."""
        self.last_reset = dt_util.utcnow()
        self._notify_sensors()
