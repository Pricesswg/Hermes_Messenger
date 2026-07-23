"""Integrazione Hermes (Meshtastic Commander).

Livello applicativo sopra l'integrazione base `meshtastic`: ascolta gli eventi
di messaggio testuale, esegue comandi Home Assistant e rispedisce le risposte
sulla mesh; espone inoltre servizi broadcast/DM richiamabili da automazioni.
"""

from __future__ import annotations

import logging

import voluptuous as vol

from homeassistant.config_entries import ConfigEntry
from homeassistant.core import HomeAssistant, ServiceCall
from homeassistant.exceptions import ServiceValidationError
from homeassistant.helpers import config_validation as cv

from .const import (
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
    """Configura Hermes da una config entry."""
    coordinator = HermesCoordinator(hass, entry)
    coordinator.async_setup()

    hass.data.setdefault(DOMAIN, {})[entry.entry_id] = coordinator

    # Listener sull'evento della base Meshtastic. `async_on_unload` garantisce
    # la rimozione pulita in unload/reload.
    entry.async_on_unload(
        hass.bus.async_listen(EVENT_TEXT_MESSAGE, coordinator.async_handle_event)
    )
    entry.async_on_unload(coordinator.async_shutdown)

    # Ricarica l'entry quando cambiano le options (CRUD comandi/whitelist):
    # così le modifiche via UI sono attive senza riavviare l'integrazione.
    entry.async_on_unload(entry.add_update_listener(_async_update_listener))

    _async_register_services(hass)

    await hass.config_entries.async_forward_entry_setups(entry, PLATFORMS)
    return True


async def async_unload_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    """Scarica una config entry."""
    unload_ok = await hass.config_entries.async_unload_platforms(entry, PLATFORMS)
    if unload_ok:
        hass.data[DOMAIN].pop(entry.entry_id, None)
        # Deregistra i servizi globali quando non resta più nessuna entry.
        if not hass.data[DOMAIN]:
            hass.services.async_remove(DOMAIN, SERVICE_BROADCAST)
            hass.services.async_remove(DOMAIN, SERVICE_SEND_DIRECT)
    return unload_ok


async def _async_update_listener(hass: HomeAssistant, entry: ConfigEntry) -> None:
    """Ricarica l'entry al cambio delle options."""
    await hass.config_entries.async_reload(entry.entry_id)


def _async_register_services(hass: HomeAssistant) -> None:
    """Registra i servizi globali una sola volta."""
    if hass.services.has_service(DOMAIN, SERVICE_BROADCAST):
        return

    def _resolve(call: ServiceCall) -> HermesCoordinator:
        entry_id = call.data[ATTR_CONFIG_ENTRY_ID]
        coordinator = hass.data.get(DOMAIN, {}).get(entry_id)
        if coordinator is None:
            raise ServiceValidationError(
                f"config_entry_id '{entry_id}' non è una entry Hermes valida"
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
