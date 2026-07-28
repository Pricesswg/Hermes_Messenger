"""Websocket API used by the Hermes Lovelace card.

Reads and writes go through here so the card can manage everything without the
user opening the options flow. Per gateway settings and commands are stored in
the config entry options (single source of truth, the native options flow keeps
working); only the global settings live in the store.

Every write requires an admin user.
"""

from __future__ import annotations

import uuid
from typing import Any

import voluptuous as vol

from homeassistant.components import websocket_api
from homeassistant.core import HomeAssistant, callback
from homeassistant.helpers import device_registry as dr, entity_registry as er
from homeassistant.util import dt as dt_util

from .actions import ACTIONS_BY_TYPE, DOMAIN_TO_TYPE, GENERIC_ACTIONS
from .ordering import canonical_group, reorder, sort_into_groups
from .meshtastic_api import (
    async_get_channels,
    channel_default_psk,
    async_get_radio_config,
    async_radio_details,
    async_set_radio_config,
    competing_integrations,
    gateway_firmware,
    is_radio_connected,
    mesh_nodes,
    node_num_from_device,
)
from .const import (
    CMD_GROUP,
    CMD_ID,
    CONF_AUTHORIZED_NODES,
    CONF_CHANNEL_INDEX,
    CONF_CHANNEL_RISK_ACK,
    CONF_COMMANDS,
    CONF_GATEWAY_NODE_ID,
    CONF_CASE_SENSITIVE,
    CONF_HELP_KEYWORD,
    CONF_INITIAL_DELAY,
    CONF_MAX_AGE,
    CONF_MODE,
    CONF_PART_DELAY,
    CONF_RATE_LIMIT,
    CONF_REJECT_MQTT,
    CONF_REQUIRE_ACK,
    CONF_REQUIRE_PKC,
    DATA_BUS_EVENTS,
    DATA_LISTENER,
    DATA_STORE,
    DATA_WS_REGISTERED,
    DEFAULT_CASE_SENSITIVE,
    DEFAULT_HELP_KEYWORD,
    DEFAULT_INITIAL_DELAY,
    DEFAULT_MAX_AGE,
    DEFAULT_PART_DELAY,
    DEFAULT_RATE_LIMIT,
    DEFAULT_REJECT_MQTT,
    DEFAULT_REQUIRE_ACK,
    DEFAULT_REQUIRE_PKC,
    DOMAIN,
    MESHTASTIC_DOMAIN,
    MODE_CHANNEL,
)


@callback
def async_register(hass: HomeAssistant) -> None:
    """Register the Hermes websocket commands once."""
    if hass.data.get(DATA_WS_REGISTERED):
        return
    hass.data[DATA_WS_REGISTERED] = True

    websocket_api.async_register_command(hass, ws_settings_get)
    websocket_api.async_register_command(hass, ws_settings_update)
    websocket_api.async_register_command(hass, ws_entries_list)
    websocket_api.async_register_command(hass, ws_entry_update)
    websocket_api.async_register_command(hass, ws_command_save)
    websocket_api.async_register_command(hass, ws_command_remove)
    websocket_api.async_register_command(hass, ws_commands_reorder)
    websocket_api.async_register_command(hass, ws_nodes_list)
    websocket_api.async_register_command(hass, ws_actions)
    websocket_api.async_register_command(hass, ws_presets_list)
    websocket_api.async_register_command(hass, ws_preset_save)
    websocket_api.async_register_command(hass, ws_preset_remove)
    websocket_api.async_register_command(hass, ws_preset_send)
    websocket_api.async_register_command(hass, ws_history_list)
    websocket_api.async_register_command(hass, ws_history_clear)
    websocket_api.async_register_command(hass, ws_channels_list)
    websocket_api.async_register_command(hass, ws_radio_info)
    websocket_api.async_register_command(hass, ws_chats_list)
    websocket_api.async_register_command(hass, ws_chat_send)
    websocket_api.async_register_command(hass, ws_chat_clear)
    websocket_api.async_register_command(hass, ws_radio_config_get)
    websocket_api.async_register_command(hass, ws_radio_config_set)


def _entry_payload(hass: HomeAssistant, entry: Any) -> dict[str, Any]:
    """Serialize a Hermes config entry for the card."""
    options = entry.options
    return {
        "entry_id": entry.entry_id,
        "title": entry.title,
        "gateway_node_id": options.get(
            CONF_GATEWAY_NODE_ID, entry.data.get(CONF_GATEWAY_NODE_ID)
        ),
        "mode": options.get(CONF_MODE) or entry.data.get(CONF_MODE),
        "channel_index": options.get(
            CONF_CHANNEL_INDEX, entry.data.get(CONF_CHANNEL_INDEX)
        ),
        "authorized_nodes": options.get(
            CONF_AUTHORIZED_NODES, entry.data.get(CONF_AUTHORIZED_NODES, [])
        ),
        "commands": options.get(CONF_COMMANDS, []),
        "initial_delay": options.get(CONF_INITIAL_DELAY, DEFAULT_INITIAL_DELAY),
        "part_delay": options.get(CONF_PART_DELAY, DEFAULT_PART_DELAY),
        "require_ack": options.get(CONF_REQUIRE_ACK, DEFAULT_REQUIRE_ACK),
        "rate_limit": options.get(CONF_RATE_LIMIT, DEFAULT_RATE_LIMIT),
        "help_keyword": options.get(CONF_HELP_KEYWORD, DEFAULT_HELP_KEYWORD),
        # Settings come from config entry storage, which reads fine even when
        # the entry failed to load. Without this the card would show a perfect
        # configuration for an integration that is not running and therefore
        # has no event listener at all.
        "loaded": entry.entry_id in hass.data.get(DOMAIN, {}),
        "state": str(getattr(entry, "state", "")),
        "last_seen": _last_seen(hass, entry.entry_id),
        # Counted by the shared listener, so it is independent of this entry.
        "bus_events": hass.data.get(DATA_BUS_EVENTS, 0),
        # Python code only changes on a full restart. Reporting the running
        # version lets the card catch a backend that is still the previous one
        # while the browser already has the new bundle, which otherwise looks
        # like a listener that receives nothing.
        "backend_version": _running_version(hass),
        "listening": DATA_LISTENER in hass.data,
        # None when it cannot be read, which is not the same as disconnected.
        "radio_connected": is_radio_connected(hass),
        # Named so a dead radio link points at the likeliest cause instead of
        # sending the user looking inside Hermes.
        "competing_integrations": competing_integrations(hass),
        # True once a packet id has been seen, False once one arrived without
        # it, None before anything arrived. Reported rather than assumed: the
        # protection depends on the base integration publishing the id.
        "replay_protected": getattr(
            hass.data.get(DOMAIN, {}).get(entry.entry_id), "replay_protected", None
        ),
        "seen_counts": dict(
            getattr(
                hass.data.get(DOMAIN, {}).get(entry.entry_id), "seen_counts", {}
            )
            or {}
        ),
        "case_sensitive": options.get(
            CONF_CASE_SENSITIVE, DEFAULT_CASE_SENSITIVE
        ),
        # --- Security -------------------------------------------------------
        "require_pkc": options.get(CONF_REQUIRE_PKC, DEFAULT_REQUIRE_PKC),
        "reject_mqtt": options.get(CONF_REJECT_MQTT, DEFAULT_REJECT_MQTT),
        "max_age_seconds": options.get(CONF_MAX_AGE, DEFAULT_MAX_AGE),
        "channel_risk_ack": options.get(CONF_CHANNEL_RISK_ACK),
        # Why this gateway currently refuses to run commands, or null. Computed
        # here rather than in the card so the screen and the coordinator can
        # never disagree about whether something will actually run.
        "channel_block": _channel_block(hass, entry),
        # Where the diagnostic sensors actually ended up. The card used to look
        # for an entity id ending in "last_command", which only works while the
        # entity name is English: Home Assistant builds the id from the
        # translated name, so on any other language nothing matched and the
        # panel showed nothing for ever. The registry knows, so it is asked.
        "sensors": _sensor_ids(hass, entry),
    }


def _sensor_ids(hass: HomeAssistant, entry: Any) -> dict[str, str | None]:
    """Entity id of each diagnostic sensor, resolved through its unique id."""
    registry = er.async_get(hass)
    return {
        kind: registry.async_get_entity_id(
            "sensor", DOMAIN, f"{entry.entry_id}_{kind}"
        )
        for kind in ("commands_executed", "last_command", "last_error")
    }


def _channel_block(hass: HomeAssistant, entry: Any) -> str | None:
    """"default_psk", "channel_zero" or None, ignoring any acceptance.

    The acceptance is reported separately, so the card can say both "this is a
    public channel" and "you accepted that on this date" instead of the risk
    quietly disappearing once it has been acknowledged once.
    """
    options = entry.options
    mode = options.get(CONF_MODE) or entry.data.get(CONF_MODE)
    if mode != MODE_CHANNEL:
        return None

    channel = options.get(CONF_CHANNEL_INDEX, entry.data.get(CONF_CHANNEL_INDEX))
    if channel_default_psk(hass, channel) is True:
        return "default_psk"
    if channel in (0, None):
        return "channel_zero"
    return None


def _running_version(hass: HomeAssistant) -> str:
    """Version of the Python actually loaded, read from the live manifest."""
    integration = hass.data.get("integrations", {}).get(DOMAIN)
    version = getattr(integration, "version", None)
    return str(version) if version else ""


def _last_seen(hass: HomeAssistant, entry_id: str) -> dict[str, Any] | None:
    """Diagnostics: the last mesh message this entry saw, filtered or not.

    Without it a gateway or channel mismatch is invisible, because both are
    dropped before anything reaches the log.
    """
    coordinator = hass.data.get(DOMAIN, {}).get(entry_id)
    seen = getattr(coordinator, "last_seen", None)
    if not seen:
        return None
    payload = dict(seen)
    moment = payload.get("time")
    payload["time"] = moment.isoformat() if hasattr(moment, "isoformat") else None
    return payload


def _get_entry(hass: HomeAssistant, entry_id: str) -> Any | None:
    for entry in hass.config_entries.async_entries(DOMAIN):
        if entry.entry_id == entry_id:
            return entry
    return None


@websocket_api.require_admin
@websocket_api.websocket_command({vol.Required("type"): "hermes/settings/get"})
@callback
def ws_settings_get(hass: HomeAssistant, connection, msg: dict) -> None:
    """Return the global settings. Admin only: it includes the API key."""
    store = hass.data.get(DATA_STORE)
    connection.send_result(msg["id"], store.settings if store else {})


@websocket_api.require_admin
@websocket_api.websocket_command(
    {
        vol.Required("type"): "hermes/settings/update",
        vol.Required("patch"): dict,
    }
)
@websocket_api.async_response
async def ws_settings_update(hass: HomeAssistant, connection, msg: dict) -> None:
    """Patch the global settings."""
    store = hass.data.get(DATA_STORE)
    if store is None:
        connection.send_error(msg["id"], "not_ready", "Hermes store not loaded")
        return
    settings = await store.async_update(msg["patch"])
    connection.send_result(msg["id"], settings)


@websocket_api.websocket_command({vol.Required("type"): "hermes/entries/list"})
@callback
def ws_entries_list(hass: HomeAssistant, connection, msg: dict) -> None:
    """List every configured Hermes gateway with its options."""
    entries = [_entry_payload(hass, e) for e in hass.config_entries.async_entries(DOMAIN)]
    connection.send_result(msg["id"], entries)


@websocket_api.require_admin
@websocket_api.websocket_command(
    {
        vol.Required("type"): "hermes/entry/update",
        vol.Required("entry_id"): str,
        vol.Required("patch"): dict,
    }
)
@callback
def ws_entry_update(hass: HomeAssistant, connection, msg: dict) -> None:
    """Update the editable options of one gateway (timing, whitelist)."""
    entry = _get_entry(hass, msg["entry_id"])
    if entry is None:
        connection.send_error(msg["id"], "not_found", "Unknown Hermes entry")
        return

    allowed = {
        CONF_AUTHORIZED_NODES,
        CONF_CASE_SENSITIVE,
        CONF_CHANNEL_INDEX,
        CONF_GATEWAY_NODE_ID,
        CONF_HELP_KEYWORD,
        CONF_INITIAL_DELAY,
        CONF_MODE,
        CONF_PART_DELAY,
        CONF_MAX_AGE,
        CONF_RATE_LIMIT,
        CONF_REJECT_MQTT,
        CONF_REQUIRE_ACK,
        CONF_REQUIRE_PKC,
    }
    patch = {k: v for k, v in msg["patch"].items() if k in allowed}

    # The risk acknowledgement is not a plain setting: the card sends only the
    # decision, and the record of who and when is written here so it cannot be
    # dictated by whatever posted the message.
    if CONF_CHANNEL_RISK_ACK in msg["patch"]:
        patch[CONF_CHANNEL_RISK_ACK] = _risk_record(
            hass, connection, entry, msg["patch"][CONF_CHANNEL_RISK_ACK]
        )
    options = {**entry.options, **patch}

    # Switching to channel mode needs a channel to work with: without one the
    # gateway would listen to nothing at all.
    if options.get(CONF_MODE) == MODE_CHANNEL and options.get(
        CONF_CHANNEL_INDEX, entry.data.get(CONF_CHANNEL_INDEX)
    ) is None:
        options[CONF_CHANNEL_INDEX] = 0

    # Keep the title honest: it names the mode and channel.
    gateway = options.get(CONF_GATEWAY_NODE_ID, entry.data.get(CONF_GATEWAY_NODE_ID))
    mode = options.get(CONF_MODE) or entry.data.get(CONF_MODE)
    if mode == MODE_CHANNEL:
        channel = options.get(CONF_CHANNEL_INDEX, entry.data.get(CONF_CHANNEL_INDEX))
        title = f"Hermes · channel {channel} · gw {gateway}"
    else:
        title = f"Hermes · DM · gw {gateway}"

    hass.config_entries.async_update_entry(entry, options=options, title=title)
    connection.send_result(msg["id"], _entry_payload(hass, entry))


def _risk_record(hass: HomeAssistant, connection, entry: Any, decision: Any) -> Any:
    """Build the acknowledgement that commands may run on a public channel.

    Kept visible rather than hidden. A record of consent that the person who
    gave it cannot see is worth no more as evidence and is worth a great deal
    less to them: they cannot check what their system is currently doing, and
    they cannot take it back. So it names who accepted, when, on which channel
    and for which reason, and the card shows it with a revoke button.

    Who and when are taken from the connection and the clock here, not from the
    message, so they describe what actually happened.
    """
    if not decision:
        return None

    options = entry.options
    mode = options.get(CONF_MODE) or entry.data.get(CONF_MODE)
    if mode != MODE_CHANNEL:
        return None
    channel = options.get(CONF_CHANNEL_INDEX, entry.data.get(CONF_CHANNEL_INDEX))

    reason = "default_psk" if channel_default_psk(hass, channel) else "channel_zero"
    user = getattr(connection, "user", None)
    return {
        "accepted": True,
        "reason": reason,
        "channel": channel,
        "by": getattr(user, "name", None) or getattr(user, "id", None) or "unknown",
        "at": dt_util.utcnow().isoformat(),
        "hermes_version": _running_version(hass),
    }


@websocket_api.require_admin
@websocket_api.websocket_command(
    {
        vol.Required("type"): "hermes/commands/save",
        vol.Required("entry_id"): str,
        vol.Required("command"): dict,
    }
)
@callback
def ws_command_save(hass: HomeAssistant, connection, msg: dict) -> None:
    """Create or update one command inside a gateway's options."""
    entry = _get_entry(hass, msg["entry_id"])
    if entry is None:
        connection.send_error(msg["id"], "not_found", "Unknown Hermes entry")
        return

    command = dict(msg["command"])
    if not command.get(CMD_ID):
        command[CMD_ID] = uuid.uuid4().hex

    commands = list(entry.options.get(CONF_COMMANDS, []))
    # Stored upper case, so "Lights" and "lights" are one group and not two.
    # Done here, once, so everything downstream compares plain strings.
    if CMD_GROUP in command:
        command[CMD_GROUP] = canonical_group(command.get(CMD_GROUP))
    for index, existing in enumerate(commands):
        if existing.get(CMD_ID) == command[CMD_ID]:
            commands[index] = command
            break
    else:
        commands.append(command)

    # Gathered by group in the stored list, not at display time. The order
    # decides which of two overlapping keywords wins, so the sequence on screen
    # has to be the sequence that runs.
    commands = sort_into_groups(commands)

    options = {**entry.options, CONF_COMMANDS: commands}
    hass.config_entries.async_update_entry(entry, options=options)
    connection.send_result(msg["id"], command)


@websocket_api.require_admin
@websocket_api.websocket_command(
    {
        vol.Required("type"): "hermes/commands/remove",
        vol.Required("entry_id"): str,
        vol.Required("command_id"): str,
    }
)
@callback
def ws_command_remove(hass: HomeAssistant, connection, msg: dict) -> None:
    """Remove one command from a gateway's options."""
    entry = _get_entry(hass, msg["entry_id"])
    if entry is None:
        connection.send_error(msg["id"], "not_found", "Unknown Hermes entry")
        return

    commands = [
        c
        for c in entry.options.get(CONF_COMMANDS, [])
        if c.get(CMD_ID) != msg["command_id"]
    ]
    options = {**entry.options, CONF_COMMANDS: commands}
    hass.config_entries.async_update_entry(entry, options=options)
    connection.send_result(msg["id"], {"removed": msg["command_id"]})


@websocket_api.websocket_command({vol.Required("type"): "hermes/actions"})
@callback
def ws_actions(hass: HomeAssistant, connection, msg: dict) -> None:
    """Serve the curated action catalogue used to build the message buttons."""
    connection.send_result(
        msg["id"],
        {
            "by_type": ACTIONS_BY_TYPE,
            "domain_to_type": DOMAIN_TO_TYPE,
            "generic": GENERIC_ACTIONS,
        },
    )


@websocket_api.websocket_command({vol.Required("type"): "hermes/nodes/list"})
@callback
def ws_nodes_list(hass: HomeAssistant, connection, msg: dict) -> None:
    """Every Meshtastic node, whether or not Home Assistant imported it.

    Two sources, merged on the node number. Home Assistant devices come first
    because the user may have renamed them, and their name is the one shown
    everywhere else. The radio's own database then fills in the position and the
    last contact, and adds every node the base integration never imported:
    those are the majority on a busy channel, and leaving them out made the map
    show a handful of nodes when the Meshtastic app showed dozens.
    """
    registry = dr.async_get(hass)
    by_num: dict[int, dict[str, Any]] = {}

    for device in registry.devices.values():
        node_num = node_num_from_device(device)
        if node_num is None:
            continue
        by_num[node_num] = {
            "device_id": device.id,
            "node_num": node_num,
            "name": device.name_by_user or device.name or str(node_num),
            "source": "ha",
            "latitude": None,
            "longitude": None,
            "battery": None,
            "last_heard": None,
            "snr": None,
            "hops_away": None,
        }

    for node in mesh_nodes(hass):
        known = by_num.get(node["node_num"])
        if known is None:
            by_num[node["node_num"]] = {
                "device_id": None,
                "source": "mesh",
                **node,
            }
            continue
        # The device keeps its name; everything the radio knows better wins.
        known["source"] = "both"
        for key in ("latitude", "longitude", "battery", "last_heard", "snr", "hops_away"):
            if node.get(key) is not None:
                known[key] = node[key]

    nodes = sorted(by_num.values(), key=lambda n: str(n["name"]).lower())
    connection.send_result(msg["id"], nodes)


@websocket_api.require_admin
@websocket_api.websocket_command(
    {
        vol.Required("type"): "hermes/commands/reorder",
        vol.Required("entry_id"): str,
        vol.Required("order"): [str],
    }
)
@callback
def ws_commands_reorder(hass: HomeAssistant, connection, msg: dict) -> None:
    """Store a new order for the commands of one gateway.

    Order is not decoration: the first command whose keyword matches is the one
    that runs, so this decides which of two overlapping keywords wins. The
    stored list is the single sequence, used for matching and for display
    alike, so what is on screen cannot promise a different outcome.
    """
    entry = _get_entry(hass, msg["entry_id"])
    if entry is None:
        connection.send_error(msg["id"], "not_found", "Unknown Hermes entry")
        return

    commands = reorder(list(entry.options.get(CONF_COMMANDS, [])), msg["order"])
    options = {**entry.options, CONF_COMMANDS: commands}
    hass.config_entries.async_update_entry(entry, options=options)
    connection.send_result(msg["id"], commands)


# --- Quick send presets ----------------------------------------------------


@websocket_api.websocket_command({vol.Required("type"): "hermes/presets/list"})
@callback
def ws_presets_list(hass: HomeAssistant, connection, msg: dict) -> None:
    """List the quick send presets."""
    store = hass.data.get(DATA_STORE)
    connection.send_result(msg["id"], store.presets if store else [])


@websocket_api.require_admin
@websocket_api.websocket_command(
    {
        vol.Required("type"): "hermes/presets/save",
        vol.Required("preset"): dict,
    }
)
@websocket_api.async_response
async def ws_preset_save(hass: HomeAssistant, connection, msg: dict) -> None:
    """Create or update a quick send preset."""
    store = hass.data.get(DATA_STORE)
    if store is None:
        connection.send_error(msg["id"], "not_ready", "Hermes store not loaded")
        return
    connection.send_result(msg["id"], await store.async_save_preset(msg["preset"]))


@websocket_api.require_admin
@websocket_api.websocket_command(
    {
        vol.Required("type"): "hermes/presets/remove",
        vol.Required("preset_id"): str,
    }
)
@websocket_api.async_response
async def ws_preset_remove(hass: HomeAssistant, connection, msg: dict) -> None:
    """Delete a quick send preset."""
    store = hass.data.get(DATA_STORE)
    if store is None:
        connection.send_error(msg["id"], "not_ready", "Hermes store not loaded")
        return
    await store.async_remove_preset(msg["preset_id"])
    connection.send_result(msg["id"], {"removed": msg["preset_id"]})


@websocket_api.require_admin
@websocket_api.websocket_command(
    {
        vol.Required("type"): "hermes/presets/send",
        vol.Required("entry_id"): str,
        vol.Required("preset_id"): str,
    }
)
@websocket_api.async_response
async def ws_preset_send(hass: HomeAssistant, connection, msg: dict) -> None:
    """Fire a preset through the existing send services.

    The sending logic is not duplicated here: broadcast and send_direct already
    handle splitting, delays and logging.
    """
    store = hass.data.get(DATA_STORE)
    entry = _get_entry(hass, msg["entry_id"])
    if store is None or entry is None:
        connection.send_error(msg["id"], "not_found", "Unknown Hermes entry")
        return

    preset = next(
        (p for p in store.presets if p.get("id") == msg["preset_id"]), None
    )
    if preset is None:
        connection.send_error(msg["id"], "not_found", "Unknown preset")
        return

    node_id = preset.get("node_id")
    data = {"config_entry_id": entry.entry_id, "message": preset.get("text", "")}
    if node_id:
        await hass.services.async_call(
            DOMAIN, "send_direct", {**data, "node_id": int(node_id)}, blocking=True
        )
    else:
        channel = preset.get("channel")
        if channel is not None:
            data["channel"] = int(channel)
        await hass.services.async_call(DOMAIN, "broadcast", data, blocking=True)

    connection.send_result(msg["id"], {"sent": preset["id"]})


# --- Message log -----------------------------------------------------------


@websocket_api.websocket_command({vol.Required("type"): "hermes/history/list"})
@callback
def ws_history_list(hass: HomeAssistant, connection, msg: dict) -> None:
    """Return the log of received and sent messages, newest first."""
    store = hass.data.get(DATA_STORE)
    connection.send_result(msg["id"], store.history if store else [])


@websocket_api.require_admin
@websocket_api.websocket_command({vol.Required("type"): "hermes/history/clear"})
@websocket_api.async_response
async def ws_history_clear(hass: HomeAssistant, connection, msg: dict) -> None:
    """Empty the log."""
    store = hass.data.get(DATA_STORE)
    if store is None:
        connection.send_error(msg["id"], "not_ready", "Hermes store not loaded")
        return
    await store.async_clear_history()
    connection.send_result(msg["id"], {"cleared": True})


# --- Radio: channels and firmware ------------------------------------------


@websocket_api.websocket_command({vol.Required("type"): "hermes/channels/list"})
@websocket_api.async_response
async def ws_channels_list(hass: HomeAssistant, connection, msg: dict) -> None:
    """Channels configured on the radio, so the user picks one by name."""
    connection.send_result(msg["id"], await async_get_channels(hass))


@websocket_api.websocket_command({vol.Required("type"): "hermes/radio/info"})
@websocket_api.async_response
async def ws_radio_info(hass: HomeAssistant, connection, msg: dict) -> None:
    """Everything the card shows about the gateway radio itself."""
    connection.send_result(msg["id"], await async_radio_details(hass))


# --- Conversations ---------------------------------------------------------


@websocket_api.websocket_command({vol.Required("type"): "hermes/chats/list"})
@callback
def ws_chats_list(hass: HomeAssistant, connection, msg: dict) -> None:
    """Every conversation, keyed by channel or by node."""
    store = hass.data.get(DATA_STORE)
    connection.send_result(msg["id"], store.chats if store else {})


@websocket_api.require_admin
@websocket_api.websocket_command(
    {
        vol.Required("type"): "hermes/chats/send",
        vol.Required("entry_id"): str,
        vol.Required("thread"): str,
        vol.Required("message"): str,
    }
)
@websocket_api.async_response
async def ws_chat_send(hass: HomeAssistant, connection, msg: dict) -> None:
    """Send into a conversation, reusing the existing send services.

    The thread key carries the destination, so nothing here has to decide how
    to reach it: `channel:<index>` broadcasts, `node:<num>` is a direct message.
    """
    entry = _get_entry(hass, msg["entry_id"])
    if entry is None:
        connection.send_error(msg["id"], "not_found", "Unknown Hermes entry")
        return

    thread: str = msg["thread"]
    data = {"config_entry_id": entry.entry_id, "message": msg["message"]}
    try:
        kind, value = thread.split(":", 1)
        if kind == "node":
            await hass.services.async_call(
                DOMAIN, "send_direct", {**data, "node_id": int(value)}, blocking=True
            )
        else:
            await hass.services.async_call(
                DOMAIN, "broadcast", {**data, "channel": int(value)}, blocking=True
            )
    except (ValueError, KeyError):
        connection.send_error(msg["id"], "bad_thread", f"Unusable thread {thread}")
        return

    connection.send_result(msg["id"], {"sent": thread})


@websocket_api.require_admin
@websocket_api.websocket_command(
    {
        vol.Required("type"): "hermes/chats/clear",
        vol.Required("thread"): str,
    }
)
@websocket_api.async_response
async def ws_chat_clear(hass: HomeAssistant, connection, msg: dict) -> None:
    """Forget one conversation."""
    store = hass.data.get(DATA_STORE)
    if store is None:
        connection.send_error(msg["id"], "not_ready", "Hermes store not loaded")
        return
    await store.async_clear_chat(msg["thread"])
    connection.send_result(msg["id"], {"cleared": msg["thread"]})


# --- Radio configuration ---------------------------------------------------


@websocket_api.require_admin
@websocket_api.websocket_command({vol.Required("type"): "hermes/radio/config/get"})
@websocket_api.async_response
async def ws_radio_config_get(hass: HomeAssistant, connection, msg: dict) -> None:
    """Current radio settings, with the values each one accepts."""
    connection.send_result(msg["id"], await async_get_radio_config(hass))


@websocket_api.require_admin
@websocket_api.websocket_command(
    {
        vol.Required("type"): "hermes/radio/config/set",
        vol.Required("patch"): dict,
    }
)
@websocket_api.async_response
async def ws_radio_config_set(hass: HomeAssistant, connection, msg: dict) -> None:
    """Write the named radio settings to the node.

    Admin only, and it changes the radio itself rather than anything belonging
    to Hermes, so a failure is reported rather than swallowed: the caller has to
    know the node did not take the change.
    """
    try:
        await async_set_radio_config(hass, msg["patch"])
    except Exception as err:  # noqa: BLE001 - surface whatever the radio said
        connection.send_error(msg["id"], "write_failed", str(err))
        return
    connection.send_result(msg["id"], await async_get_radio_config(hass))
