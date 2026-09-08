"""Reading a walk back out of the recorder, before the recorder forgets it.

Hermes does not track anything. The position comes from the Meshtastic
integration's own device tracker and Home Assistant records it like any other
entity; this reads that history once, at the end of a walk, and keeps what it
found.

The keeping is the point. The recorder purges after ten days by default, so a
walk consulted a fortnight later is simply gone, and "the summary of my last
hike" is a question people ask months afterwards. Copying the track into the
Hermes store at the end of the walk costs a few kilobytes and makes the answer
outlive the database it came from, without lengthening retention for every
entity in the house.
"""

from __future__ import annotations

import logging
from datetime import datetime, timedelta
from typing import Any

from homeassistant.components.recorder import get_instance, history
from homeassistant.core import HomeAssistant, State
from homeassistant.util import dt as dt_util

from .hikes import summarize, to_gpx

_LOGGER = logging.getLogger(__name__)

# A walk longer than this is almost certainly a hike mode left switched on, and
# reading a month of history to find out is a way to block the recorder.
MAX_WINDOW_HOURS = 36


def _points(states: list[State]) -> list[dict[str, Any]]:
    """Position attributes of each recorded state, oldest first.

    A device tracker's state is "home" or "not_home"; the position lives in the
    attributes, so a history read with no_attributes would return the shape of
    the walk and none of its content.
    """
    points: list[dict[str, Any]] = []
    for state in states:
        attributes = state.attributes or {}
        latitude = attributes.get("latitude")
        longitude = attributes.get("longitude")
        if latitude is None or longitude is None:
            continue
        points.append(
            {
                "ts": state.last_updated.isoformat(),
                "lat": latitude,
                "lon": longitude,
                # Altitude is optional on the mesh: many nodes never report it,
                # and the summary says zero climb rather than pretending.
                "alt": attributes.get("altitude") or attributes.get("elevation"),
            }
        )
    return points


async def async_read_track(
    hass: HomeAssistant, entity_id: str, start: datetime, end: datetime
) -> list[dict[str, Any]]:
    """Every recorded position of one tracker between two moments.

    Runs in the recorder's own executor, which is not optional: this is a
    database read and doing it on the event loop stalls everything Home
    Assistant is doing while it runs.
    """
    if end <= start:
        return []
    if end - start > timedelta(hours=MAX_WINDOW_HOURS):
        start = end - timedelta(hours=MAX_WINDOW_HOURS)
        _LOGGER.warning(
            "Hermes: hike window longer than %sh, reading only the last %sh",
            MAX_WINDOW_HOURS,
            MAX_WINDOW_HOURS,
        )

    # after_dependencies, not dependencies: Hermes works perfectly well on an
    # instance with the recorder switched off, right up to the moment someone
    # asks it to read history back. Saying so beats an exception from an import
    # that was fine until it was used.
    if "recorder" not in hass.config.components:
        _LOGGER.warning(
            "Hermes: cannot archive a walk, the recorder is not set up"
        )
        return []

    def _read() -> dict[str, list[State]]:
        return history.state_changes_during_period(
            hass,
            start,
            end,
            entity_id,
            include_start_time_state=True,
        )

    found = await get_instance(hass).async_add_executor_job(_read)
    return _points(found.get(entity_id, []))


async def async_archive_hike(
    hass: HomeAssistant,
    store: Any,
    entity_id: str,
    start: datetime,
    end: datetime | None = None,
    name: str = "",
    events: list[dict[str, Any]] | None = None,
) -> dict[str, Any]:
    """Read a walk out of the recorder and file it, summary and all.

    Returns the archived record, including the reason it holds no track when
    that is what happened: a walk with no positions is a real outcome (a node
    that never got a fix, or a tracker that was never selected in the Meshtastic
    integration) and it has to be visible rather than silently absent.
    """
    end = end or dt_util.utcnow()
    track = await async_read_track(hass, entity_id, start, end)
    summary = summarize(track)

    record = {
        "name": name or f"{start.date().isoformat()}",
        "entity_id": entity_id,
        "started": start.isoformat(),
        "ended": end.isoformat(),
        "summary": summary,
        "track": track,
        # Alarms raised during the walk, as the package reported them. Kept with
        # the walk so "why did it go off" can be answered later, next to the
        # numbers that were true at the time.
        "events": list(events or []),
    }
    return store.async_add_hike(record)


def hike_gpx(record: dict[str, Any]) -> str:
    """GPX for one archived walk."""
    return to_gpx(record.get("track") or [], record.get("name") or "Hike")
