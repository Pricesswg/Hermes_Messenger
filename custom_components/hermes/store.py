"""Persistent Hermes data: global settings, quick send presets and the log.

Only what does not belong to a single config entry lives here. Everything that
is per gateway (mode, channel, whitelist, timing, commands) stays in the config
entry options, which remain the single source of truth for those.
"""

from __future__ import annotations

import uuid
from typing import Any

from homeassistant.core import HomeAssistant
from homeassistant.helpers.storage import Store
from homeassistant.util import dt as dt_util

from .const import (
    DEFAULT_SETTINGS,
    HISTORY_MAX_ENTRIES,
    HISTORY_SAVE_DELAY,
    STORAGE_KEY,
    STORAGE_VERSION,
    STORE_HISTORY,
    STORE_PRESETS,
)


class HermesStore:
    """Load and persist the settings, the presets and the message log."""

    def __init__(self, hass: HomeAssistant) -> None:
        """Initialize the store."""
        self._store: Store[dict[str, Any]] = Store(hass, STORAGE_VERSION, STORAGE_KEY)
        self.settings: dict[str, Any] = dict(DEFAULT_SETTINGS)
        self.presets: list[dict[str, Any]] = []
        self.history: list[dict[str, Any]] = []

    async def async_load(self) -> None:
        """Load persisted data, filling in defaults for anything missing."""
        data = await self._store.async_load()
        if not data:
            return
        stored_settings = {
            k: v for k, v in data.items() if k in DEFAULT_SETTINGS
        }
        self.settings = {**DEFAULT_SETTINGS, **stored_settings}
        self.presets = list(data.get(STORE_PRESETS) or [])
        self.history = list(data.get(STORE_HISTORY) or [])

    def _snapshot(self) -> dict[str, Any]:
        return {
            **self.settings,
            STORE_PRESETS: self.presets,
            STORE_HISTORY: self.history,
        }

    async def _async_save(self) -> None:
        await self._store.async_save(self._snapshot())

    # --- Settings ----------------------------------------------------------

    async def async_update(self, patch: dict[str, Any]) -> dict[str, Any]:
        """Apply a partial settings update and persist it.

        Only known keys are accepted, so a malformed call cannot pollute the
        stored dictionary.
        """
        for key, value in patch.items():
            if key in DEFAULT_SETTINGS:
                self.settings[key] = value
        await self._async_save()
        return self.settings

    # --- Quick send presets ------------------------------------------------

    async def async_save_preset(self, preset: dict[str, Any]) -> dict[str, Any]:
        """Create or update one preset, keyed by its id."""
        entry = dict(preset)
        if not entry.get("id"):
            entry["id"] = uuid.uuid4().hex

        for index, existing in enumerate(self.presets):
            if existing.get("id") == entry["id"]:
                self.presets[index] = entry
                break
        else:
            self.presets.append(entry)

        await self._async_save()
        return entry

    async def async_remove_preset(self, preset_id: str) -> None:
        """Delete a preset."""
        self.presets = [p for p in self.presets if p.get("id") != preset_id]
        await self._async_save()

    # --- Message log -------------------------------------------------------

    def async_log(
        self,
        direction: str,
        text: str,
        node: int | None = None,
        outcome: str = "",
    ) -> None:
        """Append one entry to the log, newest first, and schedule a save.

        Writes are debounced: a busy channel would otherwise persist on every
        single message. Losing the last few seconds of log on a hard restart is
        an acceptable trade for not hammering the disk.
        """
        self.history.insert(
            0,
            {
                "ts": dt_util.utcnow().isoformat(),
                "direction": direction,
                "node": node,
                "text": text,
                "outcome": outcome,
            },
        )
        del self.history[HISTORY_MAX_ENTRIES:]
        self._store.async_delay_save(self._snapshot, HISTORY_SAVE_DELAY)

    async def async_clear_history(self) -> None:
        """Empty the log."""
        self.history = []
        await self._async_save()
