"""Read-only access to the base Meshtastic integration.

Hermes needs two things the base integration knows and does not publish as
entities: the list of channels configured on the radio, and the firmware version
of the connected gateway.

These come from the other integration's `runtime_data`, which is internal API.
Everything here is therefore defensive: any change on their side degrades to an
empty result and a reason, never an exception that breaks a websocket call.
"""

from __future__ import annotations

import logging
from typing import Any

from homeassistant.core import HomeAssistant
from homeassistant.helpers import entity_registry as er

from .const import MESHTASTIC_DOMAIN

_LOGGER = logging.getLogger(__name__)

# A channel whose pre-shared key is the single byte 0x01 (base64 "AQ==") is the
# well known default. It is published in the Meshtastic docs, so anyone can read
# and send on it. That matters here: Hermes executes commands.
DEFAULT_PSK = "AQ=="


def node_num_from_device(device: Any) -> int | None:
    """Meshtastic node number of a device, or None if it is not one.

    Deliberately tolerant about the shape of the identifiers. This runs over
    every device in Home Assistant, not only the Meshtastic ones, and an
    integration that stored an identifier which is not a plain pair used to
    break the whole call with an unpacking error.
    """
    for identifier in getattr(device, "identifiers", None) or ():
        try:
            domain, value = identifier[0], identifier[1]
        except (TypeError, IndexError, KeyError):
            continue
        if domain != MESHTASTIC_DOMAIN:
            continue
        try:
            return int(value)
        except (TypeError, ValueError):
            return None
    return None


def _clients(hass: HomeAssistant) -> list[Any]:
    """Every Meshtastic API client currently loaded."""
    found = []
    for entry in hass.config_entries.async_entries(MESHTASTIC_DOMAIN):
        client = getattr(getattr(entry, "runtime_data", None), "client", None)
        if client is not None:
            found.append(client)
    return found


def channel_name(channel: dict[str, Any]) -> str:
    """Readable name for a channel, mirroring what the Meshtastic app shows."""
    settings = channel.get("settings") or {}
    name = settings.get("name")
    if name:
        return str(name)
    if settings.get("psk") == DEFAULT_PSK:
        return "Primary (default key)"
    role = channel.get("role")
    if role == "PRIMARY":
        return "Primary"
    if role == "SECONDARY":
        return "Secondary"
    return f"Channel {channel.get('index', '?')}"


async def async_get_channels(hass: HomeAssistant) -> list[dict[str, Any]]:
    """Channels configured on the radio, disabled ones excluded.

    Returns an empty list when the base integration is not loaded or its
    internals moved, rather than raising.
    """
    out: list[dict[str, Any]] = []
    for client in _clients(hass):
        try:
            channels = await client.async_get_channels()
        except Exception:  # noqa: BLE001 - foreign internals, never fatal here
            _LOGGER.debug("Hermes: could not read the Meshtastic channels", exc_info=True)
            continue

        for channel in channels or []:
            if not isinstance(channel, dict):
                continue
            if channel.get("role") == "DISABLED":
                continue
            settings = channel.get("settings") or {}
            out.append(
                {
                    "index": channel.get("index", 0),
                    "name": channel_name(channel),
                    "role": channel.get("role"),
                    # Surfaced so the card can warn: a default key channel is
                    # readable and writable by anyone who knows Meshtastic.
                    "default_psk": settings.get("psk") == DEFAULT_PSK,
                }
            )

    # One entry per index: several gateways usually share the same channels.
    unique: dict[int, dict[str, Any]] = {}
    for channel in out:
        unique.setdefault(channel["index"], channel)

    if unique:
        return [unique[index] for index in sorted(unique)]

    # The client had nothing to say, which happens while the node is still
    # connecting or if its internals moved. Fall back to the public entities.
    fallback = channels_from_entities(hass)
    if fallback:
        _LOGGER.debug("Hermes: channels read from the notify entities")
    return fallback


def channels_from_entities(hass: HomeAssistant) -> list[dict[str, Any]]:
    """Channels as published by the base integration's own notify entities.

    Fully public path: the base integration creates one notify entity per
    channel and puts `gateways: {node_id: channel_index}` in its attributes, so
    the index and the name can be read without touching its internals. Used when
    the client is unavailable, for instance while the node is still connecting.

    The channel key is not exposed this way, so a default key cannot be detected
    through this path and is simply not flagged.
    """
    registry = er.async_get(hass)
    found: dict[int, dict[str, Any]] = {}

    for entry in registry.entities.values():
        if entry.platform != MESHTASTIC_DOMAIN:
            continue
        if not entry.entity_id.startswith("notify."):
            continue
        state = hass.states.get(entry.entity_id)
        if state is None:
            continue

        gateways = state.attributes.get("gateways")
        if not isinstance(gateways, dict) or not gateways:
            continue

        name = str(state.attributes.get("friendly_name") or entry.entity_id)
        # The base integration prefixes the channel name with "Channel".
        if name.lower().startswith("channel "):
            name = name[len("channel ") :].strip() or name

        for index in gateways.values():
            try:
                idx = int(index)
            except (TypeError, ValueError):
                continue
            found.setdefault(
                idx,
                {"index": idx, "name": name, "role": None, "default_psk": False},
            )

    return [found[index] for index in sorted(found)]


def gateway_firmware(hass: HomeAssistant) -> str | None:
    """Firmware version of the connected gateway, when known.

    Only the gateway reports it: the base integration sets sw_version solely on
    the node it is connected to, so the firmware of the other nodes cannot be
    read from Home Assistant.
    """
    for client in _clients(hass):
        metadata = getattr(client, "metadata", None) or {}
        version = metadata.get("firmwareVersion")
        if version:
            return str(version)
    return None
