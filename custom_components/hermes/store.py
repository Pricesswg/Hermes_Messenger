"""Global Hermes settings, persisted with the Home Assistant storage helper.

Only settings that do not belong to a single config entry live here: the
OpenWeather API key and the map preferences. Everything that is per gateway
(mode, channel, whitelist, timing, commands) stays in the config entry options,
which remain the single source of truth for those.
"""

from __future__ import annotations

from typing import Any

from homeassistant.core import HomeAssistant
from homeassistant.helpers.storage import Store

from .const import DEFAULT_SETTINGS, STORAGE_KEY, STORAGE_VERSION


class HermesStore:
    """Load and persist the global settings dictionary."""

    def __init__(self, hass: HomeAssistant) -> None:
        """Initialize the store."""
        self._store: Store[dict[str, Any]] = Store(hass, STORAGE_VERSION, STORAGE_KEY)
        self.settings: dict[str, Any] = dict(DEFAULT_SETTINGS)

    async def async_load(self) -> None:
        """Load persisted settings, filling in defaults for missing keys."""
        data = await self._store.async_load()
        if data:
            self.settings = {**DEFAULT_SETTINGS, **data}

    async def async_update(self, patch: dict[str, Any]) -> dict[str, Any]:
        """Apply a partial update and persist it.

        Only known keys are accepted, so a malformed call cannot pollute the
        stored dictionary.
        """
        for key, value in patch.items():
            if key in DEFAULT_SETTINGS:
                self.settings[key] = value
        await self._store.async_save(self.settings)
        return self.settings
