"""Hermes integration (Meshtastic Commander).

Application layer on top of the base `meshtastic` integration: it listens to
text message events, runs Home Assistant commands and sends the replies back
over the mesh; it also exposes broadcast/DM services callable from automations.
"""

from __future__ import annotations

import logging
import shutil
from pathlib import Path

import voluptuous as vol

from homeassistant.components.frontend import add_extra_js_url
from homeassistant.components.http import StaticPathConfig
from homeassistant.config_entries import ConfigEntry
from homeassistant.core import HomeAssistant, ServiceCall
from homeassistant.exceptions import ServiceValidationError
from homeassistant.helpers import config_validation as cv
from homeassistant.loader import async_get_integration

from .const import (
    CARD_FILENAME,
    CARD_URL,
    DATA_CARD_REGISTERED,
    DOMAIN,
    EVENT_TEXT_MESSAGE,
    PLATFORMS,
)
from .coordinator import HermesCoordinator

_LOGGER = logging.getLogger(__name__)

SERVICE_BROADCAST = "broadcast"
SERVICE_SEND_DIRECT = "send_direct"

ATTR_CONFIG_ENTRY_ID = "config_entry_id"
ATTR_MESSAGE = "message"
ATTR_NODE_ID = "node_id"

_BROADCAST_SCHEMA = vol.Schema(
    {
        vol.Required(ATTR_CONFIG_ENTRY_ID): cv.string,
        vol.Required(ATTR_MESSAGE): cv.string,
    }
)

_SEND_DIRECT_SCHEMA = vol.Schema(
    {
        vol.Required(ATTR_CONFIG_ENTRY_ID): cv.string,
        vol.Required(ATTR_NODE_ID): vol.Coerce(int),
        vol.Required(ATTR_MESSAGE): cv.string,
    }
)


async def async_setup_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    """Set up Hermes from a config entry."""
    coordinator = HermesCoordinator(hass, entry)
    coordinator.async_setup()

    hass.data.setdefault(DOMAIN, {})[entry.entry_id] = coordinator

    # Listener on the base Meshtastic event. `async_on_unload` guarantees clean
    # removal on unload/reload.
    entry.async_on_unload(
        hass.bus.async_listen(EVENT_TEXT_MESSAGE, coordinator.async_handle_event)
    )
    entry.async_on_unload(coordinator.async_shutdown)

    # Reload the entry when options change (command/whitelist CRUD): this way UI
    # changes take effect without restarting the integration.
    entry.async_on_unload(entry.add_update_listener(_async_update_listener))

    _async_register_services(hass)
    await _async_register_frontend_card(hass)

    await hass.config_entries.async_forward_entry_setups(entry, PLATFORMS)
    return True


async def _async_register_frontend_card(hass: HomeAssistant) -> None:
    """Make the Hermes Lovelace card available without manual setup.

    Two complementary steps, mirroring what Chronos Scheduler does:
      1. copy the bundle to /config/www so it is reachable at /local/,
         which is what a user would otherwise add as a resource by hand;
      2. serve it from /hermes_static/ and inject it with add_extra_js_url,
         which registers the custom element at the frontend level.
    Failures here must never break the integration setup, so everything is
    guarded and only logged.
    """
    if hass.data.get(DATA_CARD_REGISTERED):
        return
    hass.data[DATA_CARD_REGISTERED] = True

    src = Path(__file__).parent / "www" / CARD_FILENAME
    if not await hass.async_add_executor_job(src.is_file):
        _LOGGER.warning(
            "Hermes: card bundle %s is missing, the Lovelace card will not load",
            src,
        )
        return

    def _copy_to_www() -> None:
        dst_dir = Path(hass.config.path("www"))
        dst_dir.mkdir(parents=True, exist_ok=True)
        shutil.copyfile(src, dst_dir / CARD_FILENAME)

    try:
        await hass.async_add_executor_job(_copy_to_www)
    except OSError:
        _LOGGER.warning("Hermes: could not copy the card to /config/www", exc_info=True)

    # Version query string for cache busting: without it browsers keep serving
    # the previously cached bundle after an update. Read from the manifest so
    # there is no second place to keep the version in sync.
    integration = await async_get_integration(hass, DOMAIN)
    card_url = f"{CARD_URL}?v={integration.version or '0'}"

    try:
        await hass.http.async_register_static_paths(
            [StaticPathConfig(CARD_URL, str(src), False)]
        )
        add_extra_js_url(hass, card_url)
        _LOGGER.info("Hermes: Lovelace card registered at %s", card_url)
    except (RuntimeError, ValueError):
        _LOGGER.warning("Hermes: could not register the card static path", exc_info=True)


async def async_unload_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    """Unload a config entry."""
    unload_ok = await hass.config_entries.async_unload_platforms(entry, PLATFORMS)
    if unload_ok:
        hass.data[DOMAIN].pop(entry.entry_id, None)
        # Deregister the global services once no entry is left.
        if not hass.data[DOMAIN]:
            hass.services.async_remove(DOMAIN, SERVICE_BROADCAST)
            hass.services.async_remove(DOMAIN, SERVICE_SEND_DIRECT)
    return unload_ok


async def _async_update_listener(hass: HomeAssistant, entry: ConfigEntry) -> None:
    """Reload the entry when options change."""
    await hass.config_entries.async_reload(entry.entry_id)


def _async_register_services(hass: HomeAssistant) -> None:
    """Register the global services exactly once."""
    if hass.services.has_service(DOMAIN, SERVICE_BROADCAST):
        return

    def _resolve(call: ServiceCall) -> HermesCoordinator:
        entry_id = call.data[ATTR_CONFIG_ENTRY_ID]
        coordinator = hass.data.get(DOMAIN, {}).get(entry_id)
        if coordinator is None:
            raise ServiceValidationError(
                f"config_entry_id '{entry_id}' is not a valid Hermes entry"
            )
        return coordinator

    async def _handle_broadcast(call: ServiceCall) -> None:
        await _resolve(call).async_broadcast(call.data[ATTR_MESSAGE])

    async def _handle_send_direct(call: ServiceCall) -> None:
        coordinator = _resolve(call)
        await coordinator.async_send_direct(
            call.data[ATTR_NODE_ID], call.data[ATTR_MESSAGE]
        )

    hass.services.async_register(
        DOMAIN, SERVICE_BROADCAST, _handle_broadcast, schema=_BROADCAST_SCHEMA
    )
    hass.services.async_register(
        DOMAIN, SERVICE_SEND_DIRECT, _handle_send_direct, schema=_SEND_DIRECT_SCHEMA
    )
