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
from homeassistant.core import Event, HomeAssistant, ServiceCall, callback
from homeassistant.exceptions import ServiceValidationError
from homeassistant.helpers import config_validation as cv
from homeassistant.loader import async_get_integration

from . import websocket as hermes_websocket
from .const import (
    CARD_FILENAME,
    CARD_URL,
    DATA_BUS_EVENTS,
    DATA_CARD_REGISTERED,
    DATA_LISTENER,
    DATA_STORE,
    DOMAIN,
    EVENT_TEXT_MESSAGE,
    PLATFORMS,
)
from .coordinator import HermesCoordinator
from .store import HermesStore

_LOGGER = logging.getLogger(__name__)

SERVICE_BROADCAST = "broadcast"
SERVICE_SEND_DIRECT = "send_direct"

ATTR_CONFIG_ENTRY_ID = "config_entry_id"
ATTR_MESSAGE = "message"
ATTR_NODE_ID = "node_id"

ATTR_CHANNEL = "channel"

_BROADCAST_SCHEMA = vol.Schema(
    {
        vol.Required(ATTR_CONFIG_ENTRY_ID): cv.string,
        vol.Required(ATTR_MESSAGE): cv.string,
        # Optional override: without it the entry's own channel is used.
        vol.Optional(ATTR_CHANNEL): vol.All(vol.Coerce(int), vol.Range(min=0, max=7)),
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
    _async_register_mesh_listener(hass)
    # Logged at info so the Home Assistant log alone can confirm that this entry
    # is listening and for what, without turning on debug for the domain.
    _LOGGER.info(
        "Hermes: listening for %s, gateway=%s mode=%s channel=%s",
        EVENT_TEXT_MESSAGE,
        coordinator.gateway_node_id,
        coordinator.mode,
        coordinator.channel_index,
    )
    entry.async_on_unload(coordinator.async_shutdown)

    # Refresh the sensors when options change. Deliberately not a reload: every
    # setting is read live from the entry, so a change already takes effect on
    # the next message without rebuilding anything.
    entry.async_on_unload(entry.add_update_listener(_async_update_listener))

    # Global settings store and websocket API, both shared by every entry.
    if DATA_STORE not in hass.data:
        store = HermesStore(hass)
        await store.async_load()
        hass.data[DATA_STORE] = store
    hermes_websocket.async_register(hass)

    _async_register_services(hass)
    await _async_register_frontend_card(hass)

    await hass.config_entries.async_forward_entry_setups(entry, PLATFORMS)
    return True


@callback
def _async_register_mesh_listener(hass: HomeAssistant) -> None:
    """Subscribe to the mesh text events once, for the whole integration.

    Previously each entry subscribed for itself and unsubscribed on unload. A
    reload runs on every saved setting, so the subscription was torn down and
    rebuilt constantly, and any hiccup in that cycle left nothing listening
    while the entry still looked perfectly healthy. Registering once removes
    that entire class of failure.

    The listener is a plain callback that hands the work to a task rather than a
    coroutine listener, which is the more predictable of the two on the event
    bus, and it counts every event before dispatching so an entry that receives
    nothing can be told apart from nothing being emitted.
    """
    if DATA_LISTENER in hass.data:
        return

    @callback
    def _dispatch(event: Event) -> None:
        hass.data[DATA_BUS_EVENTS] = hass.data.get(DATA_BUS_EVENTS, 0) + 1
        for coordinator in list(hass.data.get(DOMAIN, {}).values()):
            hass.async_create_task(coordinator.async_handle_event(event))

    hass.data[DATA_LISTENER] = hass.bus.async_listen(EVENT_TEXT_MESSAGE, _dispatch)


async def _async_register_frontend_card(hass: HomeAssistant) -> None:
    """Make the Hermes Lovelace card available without manual setup.

    The bundle is copied to /config/www and served from there, not from inside
    the integration folder. That matters during an update: HACS deletes and
    rewrites custom_components/hermes, so a URL pointing inside it answers 404
    for as long as the swap lasts, the module never loads and Lovelace reports
    the custom element as missing. The copy lives outside anything HACS touches,
    so the worst case becomes serving the previous working bundle until Home
    Assistant restarts, instead of serving nothing.

    The copy is refreshed on every setup, while the URL registration can only
    happen once per run.

    Failures here must never break the integration setup, so everything is
    guarded and only logged.
    """
    src = Path(__file__).parent / "www" / CARD_FILENAME
    if not await hass.async_add_executor_job(src.is_file):
        _LOGGER.warning(
            "Hermes: card bundle %s is missing, the Lovelace card will not load",
            src,
        )
        return

    dst = Path(hass.config.path("www")) / CARD_FILENAME

    def _copy_to_www() -> bool:
        dst.parent.mkdir(parents=True, exist_ok=True)
        shutil.copyfile(src, dst)
        return True

    served = src
    try:
        if await hass.async_add_executor_job(_copy_to_www):
            served = dst
    except OSError:
        # Serving from the integration folder still works until the next update
        # swaps it, so this is a degraded mode rather than a failure.
        _LOGGER.warning("Hermes: could not copy the card to /config/www", exc_info=True)

    if hass.data.get(DATA_CARD_REGISTERED):
        return

    # Version query string for cache busting: without it browsers keep serving
    # the previously cached bundle after an update. Read from the manifest so
    # there is no second place to keep the version in sync.
    integration = await async_get_integration(hass, DOMAIN)
    version = integration.version or "0"
    card_url = f"{CARD_URL}?v={version}"

    try:
        await hass.http.async_register_static_paths(
            [StaticPathConfig(CARD_URL, str(served), False)]
        )
        add_extra_js_url(hass, card_url)
    except (RuntimeError, ValueError):
        _LOGGER.warning("Hermes: could not register the card static path", exc_info=True)
        return

    # Only now: a failed registration has to be retried by the next entry
    # instead of being remembered as done.
    hass.data[DATA_CARD_REGISTERED] = True
    _LOGGER.info("Hermes: Lovelace card %s served from %s", version, served)


async def async_unload_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    """Unload a config entry."""
    unload_ok = await hass.config_entries.async_unload_platforms(entry, PLATFORMS)
    if unload_ok:
        hass.data[DOMAIN].pop(entry.entry_id, None)
        # Deregister the global services once no entry is left.
        if not hass.data[DOMAIN]:
            hass.services.async_remove(DOMAIN, SERVICE_BROADCAST)
            hass.services.async_remove(DOMAIN, SERVICE_SEND_DIRECT)
            # Only once the last gateway is gone: a reload of one entry must
            # not take the shared listener down with it.
            unsubscribe = hass.data.pop(DATA_LISTENER, None)
            if unsubscribe is not None:
                unsubscribe()
    return unload_ok


async def _async_update_listener(hass: HomeAssistant, entry: ConfigEntry) -> None:
    """React to an options change without reloading the entry.

    Reloading was the obvious thing to do and it was wrong. Every setting the
    coordinator uses is read from the entry when it is needed, so a change is
    already live; the reload only tore the integration down and built it again.
    That cost was real: messages arriving during the rebuild were lost, the
    in-memory counters went back to zero, and the mesh subscription was
    cancelled and recreated. Since saving any command or setting triggered it,
    the act of configuring Hermes was disrupting the thing being configured.
    """
    coordinator = hass.data.get(DOMAIN, {}).get(entry.entry_id)
    if coordinator is not None:
        coordinator.async_refresh_sensors()


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
        await _resolve(call).async_broadcast(
            call.data[ATTR_MESSAGE], call.data.get(ATTR_CHANNEL)
        )

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
