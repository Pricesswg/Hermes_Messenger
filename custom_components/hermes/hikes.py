"""Turning a recorded track into something a person can read.

PURE module: no Home Assistant, no clock of its own, no I/O. The caller hands
in points and gets back numbers and a GPX document, which is what makes every
threshold in here testable against a track written by hand.

A track from a Meshtastic node is not a track from a phone. Points arrive tens
of seconds to minutes apart because of the EU868 duty cycle, they carry the
accuracy of a small GNSS chip under tree cover, and some of them are missing
entirely. Every number below is therefore computed with a noise floor rather
than from the raw differences: summing every wobble between two fixes taken
four minutes apart produces a walk that climbed a mountain while standing
still, which is worse than saying nothing.
"""

from __future__ import annotations

from math import asin, cos, radians, sin, sqrt
from typing import Any, Iterable
from xml.sax.saxutils import escape

EARTH_RADIUS_KM = 6371.0088

# Below this, two fixes are the same place seen twice. A consumer GNSS under
# trees wanders by a few tens of metres with the receiver sitting still, and
# every metre of that wander would otherwise be counted as distance walked.
MOVEMENT_FLOOR_KM = 0.03

# Same idea vertically, where it is worse: barometric and GNSS altitude both
# drift by several metres, and a walk of two hundred fixes would accumulate a
# kilometre of imaginary climb from noise alone.
CLIMB_FLOOR_M = 8.0

# How long a walker has to stay inside MOVEMENT_FLOOR_KM before it counts as a
# stop rather than a slow stretch.
STOP_MINUTES = 6.0


def haversine_km(
    lat1: float, lon1: float, lat2: float, lon2: float
) -> float:
    """Great circle distance in kilometres."""
    phi1, phi2 = radians(lat1), radians(lat2)
    dphi = phi2 - phi1
    dlambda = radians(lon2 - lon1)
    a = sin(dphi / 2) ** 2 + cos(phi1) * cos(phi2) * sin(dlambda / 2) ** 2
    return 2 * EARTH_RADIUS_KM * asin(sqrt(a))


def clean_track(points: Iterable[dict[str, Any]]) -> list[dict[str, Any]]:
    """Drop what cannot be plotted, and the fixes that repeat a position.

    A point needs a timestamp and both coordinates. The pair (0, 0) is thrown
    away rather than plotted: an unset position decodes to exactly that, and it
    lands in the Atlantic off Africa, which has ruined more than one track.
    """
    cleaned: list[dict[str, Any]] = []
    for point in points:
        latitude = point.get("lat")
        longitude = point.get("lon")
        when = point.get("ts")
        if latitude is None or longitude is None or not when:
            continue
        if latitude == 0 and longitude == 0:
            continue
        if cleaned:
            previous = cleaned[-1]
            same_place = (
                haversine_km(previous["lat"], previous["lon"], latitude, longitude)
                < MOVEMENT_FLOOR_KM / 3
            )
            if same_place and previous["ts"] == when:
                continue
        cleaned.append(
            {
                "ts": when,
                "lat": float(latitude),
                "lon": float(longitude),
                "alt": point.get("alt"),
            }
        )
    return cleaned


def _minutes_between(first: str, second: str) -> float:
    """Minutes between two ISO timestamps, or 0 when either cannot be read."""
    from datetime import datetime

    try:
        start = datetime.fromisoformat(first)
        end = datetime.fromisoformat(second)
    except (TypeError, ValueError):
        return 0.0
    return (end - start).total_seconds() / 60


def summarize(points: list[dict[str, Any]]) -> dict[str, Any]:
    """Distance, duration, stops, climb and how far out the walk went.

    Distance is measured from an anchor rather than by summing consecutive
    steps. The anchor stays put until the walker is further from it than the
    movement floor, and only then does the displacement count and the anchor
    move. Summing steps and carrying the remainder forward looks equivalent and
    is not: jitter around a fixed point has no direction, but its lengths are
    all positive, so a carried remainder turns a receiver sitting under a tree
    for an hour into most of a kilometre walked.

    The cost is that a winding path between two fixes is measured across the
    chord and not along the curve. With fixes minutes apart that understates a
    little, which is the right direction to be wrong in.
    """
    track = clean_track(points)
    if len(track) < 2:
        return {
            "points": len(track),
            "distance_km": 0.0,
            "duration_min": 0.0,
            "moving_min": 0.0,
            "stops": 0,
            "stopped_min": 0.0,
            "climb_m": 0.0,
            "max_from_start_km": 0.0,
            "started": track[0]["ts"] if track else None,
            "ended": track[-1]["ts"] if track else None,
        }

    distance = 0.0
    moving = 0.0
    stopped = 0.0
    stops = 0
    still_for = 0.0
    max_out = 0.0
    start = track[0]
    anchor = track[0]

    climb = 0.0
    reference_alt = track[0].get("alt")

    for previous, current in zip(track, track[1:]):
        gap = _minutes_between(previous["ts"], current["ts"])
        from_anchor = haversine_km(
            anchor["lat"], anchor["lon"], current["lat"], current["lon"]
        )

        if from_anchor >= MOVEMENT_FLOOR_KM:
            distance += from_anchor
            moving += still_for + gap
            # A stop only counts once the walker has been still long enough to
            # mean it, so a pause at a junction is not a rest.
            if still_for >= STOP_MINUTES:
                stops += 1
                stopped += still_for
                moving -= still_for
            still_for = 0.0
            anchor = current
        else:
            still_for += gap

        altitude = current.get("alt")
        if altitude is not None and reference_alt is not None:
            rise = float(altitude) - float(reference_alt)
            if abs(rise) >= CLIMB_FLOOR_M:
                if rise > 0:
                    climb += rise
                reference_alt = float(altitude)
        elif altitude is not None and reference_alt is None:
            reference_alt = float(altitude)

        max_out = max(
            max_out,
            haversine_km(start["lat"], start["lon"], current["lat"], current["lon"]),
        )

    # A walk that ends standing still ends with an unclosed stop.
    if still_for >= STOP_MINUTES:
        stops += 1
        stopped += still_for

    return {
        "points": len(track),
        "distance_km": round(distance, 2),
        "duration_min": round(_minutes_between(track[0]["ts"], track[-1]["ts"]), 0),
        "moving_min": round(moving, 0),
        "stops": stops,
        "stopped_min": round(stopped, 0),
        "climb_m": round(climb, 0),
        "max_from_start_km": round(max_out, 2),
        "started": track[0]["ts"],
        "ended": track[-1]["ts"],
    }


def to_gpx(points: list[dict[str, Any]], name: str) -> str:
    """A GPX 1.1 track, the format every map tool reads.

    Written by hand rather than with a library: the document is twenty lines of
    structure and a dependency for it would have to be vendored into a custom
    integration that Home Assistant installs without a build step.
    """
    track = clean_track(points)
    segments = []
    for point in track:
        altitude = point.get("alt")
        elevation = (
            f"<ele>{float(altitude):.1f}</ele>" if altitude is not None else ""
        )
        segments.append(
            f'<trkpt lat="{point["lat"]:.6f}" lon="{point["lon"]:.6f}">'
            f"{elevation}<time>{escape(str(point['ts']))}</time></trkpt>"
        )

    body = "\n      ".join(segments)
    return (
        '<?xml version="1.0" encoding="UTF-8"?>\n'
        '<gpx version="1.1" creator="Hermes" '
        'xmlns="http://www.topografix.com/GPX/1/1">\n'
        f"  <trk>\n    <name>{escape(name)}</name>\n"
        f"    <trkseg>\n      {body}\n    </trkseg>\n"
        "  </trk>\n</gpx>\n"
    )
