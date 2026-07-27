"""Reading the node database the radio keeps.

Pure: no Home Assistant, no Meshtastic library. It takes the raw dictionaries
the interface exposes and turns them into the records the card draws, which is
the part worth testing on its own. `meshtastic_api` supplies the dictionaries.
"""

from __future__ import annotations

from typing import Any

# The radio stores coordinates as integers scaled by 1e7.
FIXED_POINT_SCALE = 1e7


def position(node: dict[str, Any]) -> tuple[float | None, float | None]:
    """Latitude and longitude of a node record, None when it has none.

    The float fields are only filled when the firmware decodes them, so a node
    can carry a perfectly good position with `latitude` absent and only the
    fixed point `latitudeI` set. Reading the float fields alone is why nodes
    looked like they had never reported where they are.
    """
    raw = node.get("position") or {}
    latitude = raw.get("latitude")
    longitude = raw.get("longitude")
    if latitude is None and raw.get("latitudeI") is not None:
        latitude = raw["latitudeI"] / FIXED_POINT_SCALE
    if longitude is None and raw.get("longitudeI") is not None:
        longitude = raw["longitudeI"] / FIXED_POINT_SCALE

    try:
        lat = float(latitude) if latitude is not None else None
        lon = float(longitude) if longitude is not None else None
    except (TypeError, ValueError):
        return None, None

    if lat is None or lon is None:
        return None, None
    # An unset position decodes to exactly 0, 0, which plots in the Atlantic
    # off Africa. Half a position is no position either.
    if lat == 0 and lon == 0:
        return None, None
    if not (-90 <= lat <= 90) or not (-180 <= lon <= 180):
        return None, None
    return lat, lon


def node_record(key: Any, node: Any) -> dict[str, Any] | None:
    """One node database entry as a flat record, or None if it is unusable.

    `key` is the dictionary key the entry was stored under, used only when the
    entry itself carries no number: `nodesByNum` is keyed by the number while
    `nodes` is keyed by the "!hex" user id.
    """
    if not isinstance(node, dict):
        return None

    user = node.get("user") or {}
    metrics = node.get("deviceMetrics") or {}

    number = node.get("num")
    if number is None and isinstance(key, int):
        number = key
    try:
        node_num = int(number)
    except (TypeError, ValueError):
        return None

    latitude, longitude = position(node)
    return {
        "node_num": node_num,
        "name": user.get("longName")
        or user.get("shortName")
        or user.get("id")
        or str(node_num),
        "short_name": user.get("shortName"),
        "hardware": user.get("hwModel"),
        "latitude": latitude,
        "longitude": longitude,
        "battery": metrics.get("batteryLevel"),
        "last_heard": node.get("lastHeard"),
        "snr": node.get("snr"),
        "hops_away": node.get("hopsAway"),
    }


def node_records(raw: Any) -> list[dict[str, Any]]:
    """Every usable record in a node database, in no particular order."""
    if not isinstance(raw, dict):
        return []
    out = []
    for key, node in raw.items():
        record = node_record(key, node)
        if record is not None:
            out.append(record)
    return out
