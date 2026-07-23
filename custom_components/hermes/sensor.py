"""Hermes diagnostic entities.

Three sensors under a single device (native HA device page), so the user gets a
"clean UI" without a custom dashboard: last command, command counter, last error.
"""

from __future__ import annotations

from typing import Any

from homeassistant.components.sensor import (
    SensorEntity,
    SensorStateClass,
)
from homeassistant.config_entries import ConfigEntry
from homeassistant.const import EntityCategory
from homeassistant.core import HomeAssistant, callback
from homeassistant.helpers.entity_platform import AddEntitiesCallback

from .const import DOMAIN
from .coordinator import HermesCoordinator


async def async_setup_entry(
    hass: HomeAssistant,
    entry: ConfigEntry,
    async_add_entities: AddEntitiesCallback,
) -> None:
    """Set up the diagnostic sensors from the config entry."""
    coordinator: HermesCoordinator = hass.data[DOMAIN][entry.entry_id]
    async_add_entities(
        [
            LastCommandSensor(coordinator, entry),
            CommandsExecutedSensor(coordinator, entry),
            LastErrorSensor(coordinator, entry),
        ]
    )


class _HermesSensorBase(SensorEntity):
    """Common base: shared device_info and hook into the coordinator observer."""

    _attr_has_entity_name = True
    _attr_entity_category = EntityCategory.DIAGNOSTIC
    _attr_should_poll = False

    def __init__(self, coordinator: HermesCoordinator, entry: ConfigEntry) -> None:
        """Initialize the sensor."""
        self._coordinator = coordinator
        self._entry = entry
        self._attr_device_info = {
            "identifiers": {(DOMAIN, entry.entry_id)},
            "name": entry.title,
            "manufacturer": "Hermes",
            "model": "Meshtastic Commander",
        }

    async def async_added_to_hass(self) -> None:
        """Register the sensor as an observer of the coordinator."""
        self.async_on_remove(self._coordinator.async_add_listener(self._handle_update))

    @callback
    def _handle_update(self) -> None:
        self.async_write_ha_state()


class LastCommandSensor(_HermesSensorBase):
    """Last command received (text + node + timestamp as attributes)."""

    _attr_translation_key = "last_command"
    _attr_icon = "mdi:message-arrow-left"

    def __init__(self, coordinator: HermesCoordinator, entry: ConfigEntry) -> None:
        super().__init__(coordinator, entry)
        self._attr_unique_id = f"{entry.entry_id}_last_command"

    @property
    def native_value(self) -> str | None:
        last = self._coordinator.last_command
        return last["text"] if last else None

    @property
    def extra_state_attributes(self) -> dict[str, Any]:
        last = self._coordinator.last_command
        if not last:
            return {}
        return {"node": last["node"], "timestamp": last["time"].isoformat()}


class CommandsExecutedSensor(_HermesSensorBase):
    """Executed command counter, daily reset."""

    _attr_translation_key = "commands_executed"
    _attr_icon = "mdi:counter"
    _attr_state_class = SensorStateClass.TOTAL_INCREASING

    def __init__(self, coordinator: HermesCoordinator, entry: ConfigEntry) -> None:
        super().__init__(coordinator, entry)
        self._attr_unique_id = f"{entry.entry_id}_commands_executed"

    @property
    def native_value(self) -> int:
        return self._coordinator.commands_executed

    @property
    def extra_state_attributes(self) -> dict[str, Any]:
        return {"last_reset": self._coordinator.last_reset.isoformat()}


class LastErrorSensor(_HermesSensorBase):
    """Last error or authorization rejection (debug without reading the logs)."""

    _attr_translation_key = "last_error"
    _attr_icon = "mdi:alert-circle-outline"

    def __init__(self, coordinator: HermesCoordinator, entry: ConfigEntry) -> None:
        super().__init__(coordinator, entry)
        self._attr_unique_id = f"{entry.entry_id}_last_error"

    @property
    def native_value(self) -> str | None:
        err = self._coordinator.last_error
        return err["reason"] if err else None

    @property
    def extra_state_attributes(self) -> dict[str, Any]:
        err = self._coordinator.last_error
        if not err:
            return {}
        return {
            "node": err.get("node"),
            "text": err.get("text"),
            "timestamp": err["time"].isoformat(),
        }
