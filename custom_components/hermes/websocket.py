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
from homeassistant.helpers import device_registry as dr

from .actions import ACTIONS_BY_TYPE, DOMAIN_TO_TYPE, GENERIC_ACTIONS
from .const import (
    CMD_ID,
    CONF_AUTHORIZED_NODES,
    CONF_CHANNEL_INDEX,
    CONF_COMMANDS,
    CONF_GATEWAY_NODE_ID,
    CONF_INITIAL_DELAY,
    CONF_MODE,
    CONF_PART_DELAY,
    DATA_STORE,
    DATA_WS_REGISTERED,
    DEFAULT_INITIAL_DELAY,
    DEFAULT_PART_DELAY,
    DOMAIN,
    MESHTASTIC_DOMAIN,
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
    websocket_api.async_register_command(hass, ws_nodes_list)
    websocket_api.async_register_command(hass, ws_actions)
    websocket_api.async_register_command(hass, ws_presets_list)
    websocket_api.async_register_command(hass, ws_preset_save)
    websocket_api.async_register_command(hass, ws_preset_remove)
    websocket_api.async_register_command(hass, ws_preset_send)
    websocket_api.async_register_command(hass, ws_history_list)
    websocket_api.async_register_command(hass, ws_history_clear)


def _entry_payload(entry: Any) -> dict[str, Any]:
    """Serialize a Hermes config entry for the card."""
    options = entry.options
    return {
        "entry_id": entry.entry_id,
        "title": entry.title,
        "gateway_node_id": entry.data.get(CONF_GATEWAY_NODE_ID),
        "mode": entry.data.get(CONF_MODE),
        "channel_index": entry.data.get(CONF_CHANNEL_INDEX),
        "authorized_nodes": options.get(
            CONF_AUTHORIZED_NODES, entry.data.get(CONF_AUTHORIZED_NODES, [])
        ),
        "commands": options.get(CONF_COMMANDS, []),
        "initial_delay": options.get(CONF_INITIAL_DELAY, DEFAULT_INITIAL_DELAY),
        "part_delay": options.get(CONF_PART_DELAY, DEFAULT_PART_DELAY),
    }


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
    entries = [_entry_payload(e) for e in hass.config_entries.async_entries(DOMAIN)]
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

    allowed = {CONF_AUTHORIZED_NODES, CONF_INITIAL_DELAY, CONF_PART_DELAY}
    patch = {k: v for k, v in msg["patch"].items() if k in allowed}
    options = {**entry.options, **patch}
    hass.config_entries.async_update_entry(entry, options=options)
    connection.send_result(msg["id"], _entry_payload(entry))


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
    for index, existing in enumerate(commands):
        if existing.get(CMD_ID) == command[CMD_ID]:
            commands[index] = command
            break
    else:
        commands.append(command)

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
    """List the Meshtastic nodes known to Home Assistant.

    Node numbers come from the device identifiers registered by the base
    meshtastic integration, the same mapping the config flow uses.
    """
    registry = dr.async_get(hass)
    nodes: list[dict[str, Any]] = []
    for device in registry.devices.values():
        for domain, value in device.identifiers:
            if domain != MESHTASTIC_DOMAIN:
                continue
            try:
                node_num = int(value)
            except (TypeError, ValueError):
                continue
            nodes.append(
                {
                    "device_id": device.id,
                    "node_num": node_num,
                    "name": device.name_by_user or device.name or str(node_num),
                }
            )
            break
    nodes.sort(key=lambda n: n["name"].lower())
    connection.send_result(msg["id"], nodes)


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
