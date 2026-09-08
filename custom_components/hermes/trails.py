"""Marked hiking routes near a point, from OpenStreetMap.

The map already draws the paths; this answers the other question, which is what
they are called. A pin on a ridge becomes "on the GTA, Piamprato to Ronco
Canavese", and that is the sentence you can actually say to somebody on the
radio or read out to mountain rescue.

The query goes through Overpass, which is a public service run on donated
capacity, so this is written to be a polite client rather than a fast one: it
runs only when someone asks, the answer is cached, the timeout is short, and it
identifies itself. Nothing here polls.
"""

from __future__ import annotations

import logging
import time
from typing import Any

from homeassistant.core import HomeAssistant
from homeassistant.helpers.aiohttp_client import async_get_clientsession

_LOGGER = logging.getLogger(__name__)

OVERPASS_URL = "https://overpass-api.de/api/interpreter"

# Overpass asks clients to identify themselves so a misbehaving one can be
# told apart from the rest and contacted rather than simply blocked.
USER_AGENT = "Hermes/Home-Assistant (https://github.com/Pricesswg/Hermes_Messenger)"

REQUEST_TIMEOUT = 30
# Routes are relations in OpenStreetMap and they do not move. An hour is short
# enough that an edit shows up the same day and long enough that pressing the
# button twice costs one query.
CACHE_TTL = 3600
MAX_RESULTS = 25
MAX_RADIUS_M = 25000

# The walking network a route belongs to, from least to most far reaching.
# Reported as it comes rather than translated: these are OSM's own four values
# and a table of words for them is one more thing to keep true.
NETWORKS = ("lwn", "rwn", "nwn", "iwn")


def _query(latitude: float, longitude: float, radius_m: int) -> str:
    """Hiking route relations whose ways pass within the radius."""
    return (
        f"[out:json][timeout:{REQUEST_TIMEOUT - 5}];"
        f'relation["route"="hiking"](around:{radius_m},{latitude},{longitude});'
        f"out tags {MAX_RESULTS};"
    )


def _route(element: dict[str, Any]) -> dict[str, Any]:
    """One Overpass element as the card needs it."""
    tags = element.get("tags") or {}
    return {
        "id": element.get("id"),
        # A route with neither a name nor a ref is a relation nobody has
        # finished tagging; it is still shown, because it is still a path.
        "name": tags.get("name") or tags.get("ref") or "",
        "ref": tags.get("ref") or "",
        "network": tags.get("network") or "",
        "from": tags.get("from") or "",
        "to": tags.get("to") or "",
        "distance": tags.get("distance") or "",
        "symbol": tags.get("osmc:symbol") or tags.get("symbol") or "",
        "url": f"https://www.openstreetmap.org/relation/{element.get('id')}",
    }


def _rank(route: dict[str, Any]) -> tuple[int, str]:
    """Wider networks first, then alphabetically.

    A long distance path is the more useful answer to "where am I": it is the
    one with a name the other person will recognise.
    """
    network = route.get("network", "")
    position = NETWORKS.index(network) if network in NETWORKS else -1
    return (-position, route.get("name", ""))


async def async_nearby_routes(
    hass: HomeAssistant,
    latitude: float,
    longitude: float,
    radius_m: int = 3000,
    cache: dict[str, Any] | None = None,
) -> list[dict[str, Any]]:
    """Hiking routes passing near a point, nearest network first.

    Returns an empty list rather than raising when Overpass is slow, down or
    rate limiting: this is a convenience beside a map, and a map that fails to
    draw because a third party is having a bad afternoon would be a worse
    trade than a panel that says it found nothing.
    """
    radius_m = max(100, min(MAX_RADIUS_M, int(radius_m)))
    # Rounded to about a hundred metres: moving the reference point by a few
    # metres is not a different question and must not cost another query.
    key = f"{latitude:.3f},{longitude:.3f},{radius_m}"

    if cache is not None:
        cached = cache.get(key)
        if cached and time.time() - cached["at"] < CACHE_TTL:
            return cached["routes"]

    session = async_get_clientsession(hass)
    try:
        async with session.post(
            OVERPASS_URL,
            data={"data": _query(latitude, longitude, radius_m)},
            headers={"User-Agent": USER_AGENT},
            timeout=REQUEST_TIMEOUT,
        ) as response:
            if response.status != 200:
                _LOGGER.warning(
                    "Hermes: Overpass answered %s for the nearby routes",
                    response.status,
                )
                return []
            payload = await response.json()
    except Exception as err:  # noqa: BLE001 - a third party being down is normal
        _LOGGER.warning("Hermes: could not reach Overpass: %s", err)
        return []

    routes = [_route(element) for element in payload.get("elements") or []]
    routes.sort(key=_rank)

    if cache is not None:
        cache[key] = {"at": time.time(), "routes": routes}
        # The cache is per Home Assistant run and bounded: a map panned around
        # all afternoon must not grow it without limit.
        if len(cache) > 32:
            oldest = min(cache, key=lambda k: cache[k]["at"])
            del cache[oldest]

    return routes
