"""Tests for the track summary and the GPX export.

    .venv/bin/pytest tests/test_hikes.py -v

PURE module, loaded straight from its file like the other pure ones. What is
checked here is mostly what the noise floors refuse to count: a receiver
sitting still under trees produces a track that walks and climbs, and reporting
that as a walk is worse than reporting nothing.
"""

from __future__ import annotations

import importlib.util
import sys
from datetime import datetime, timedelta
from pathlib import Path

_ROOT = Path(__file__).resolve().parent.parent / "custom_components" / "hermes"
_spec = importlib.util.spec_from_file_location("hermes_hikes", _ROOT / "hikes.py")
hikes = importlib.util.module_from_spec(_spec)
sys.modules["hermes_hikes"] = hikes
_spec.loader.exec_module(hikes)

START = datetime(2026, 9, 8, 8, 0, 0)


def at(minutes: float) -> str:
    return (START + timedelta(minutes=minutes)).isoformat()


def point(minutes: float, lat: float, lon: float, alt=None) -> dict:
    return {"ts": at(minutes), "lat": lat, "lon": lon, "alt": alt}


# --- Distance ---------------------------------------------------------------


def test_a_known_distance_comes_out_right():
    """One minute of latitude is a nautical mile, near enough to check against."""
    km = hikes.haversine_km(45.0, 7.0, 45.0 + 1 / 60, 7.0)
    assert 1.8 < km < 1.9


def test_a_receiver_sitting_still_walks_nowhere():
    """Jitter of a few metres per fix must not accumulate into a walk."""
    track = [
        point(i, 45.5 + (i % 3) * 0.00008, 7.4 + (i % 2) * 0.00008)
        for i in range(60)
    ]
    assert hikes.summarize(track)["distance_km"] == 0.0


def test_small_steps_still_add_up_to_their_real_length():
    """Carrying the remainder is what keeps a slow climb from rounding away."""
    track = [point(i * 2, 45.5 + i * 0.0002, 7.4) for i in range(40)]
    summary = hikes.summarize(track)
    # 39 steps of about 22 m: roughly 0.87 km, and none of them clears the floor
    # on its own, so without the carry this would be zero.
    assert 0.8 < summary["distance_km"] < 0.95


# --- Stops ------------------------------------------------------------------


def test_a_lunch_stop_is_counted_once():
    walk_out = [point(i * 3, 45.5 + i * 0.002, 7.4) for i in range(6)]
    lunch = [point(15 + i * 3, 45.51, 7.4) for i in range(1, 8)]
    walk_back = [point(45 + i * 3, 45.51 + i * 0.002, 7.4) for i in range(1, 6)]

    summary = hikes.summarize(walk_out + lunch + walk_back)
    assert summary["stops"] == 1
    assert summary["stopped_min"] >= 18


def test_a_pause_at_a_junction_is_not_a_stop():
    """Two minutes standing is not a rest, and calling it one is noise."""
    track = [
        point(0, 45.5, 7.4),
        point(3, 45.502, 7.4),
        point(5, 45.502, 7.4),
        point(8, 45.504, 7.4),
    ]
    assert hikes.summarize(track)["stops"] == 0


# --- Climb ------------------------------------------------------------------


def test_altitude_noise_does_not_climb_a_mountain():
    """Both GNSS and barometric altitude drift by metres between fixes."""
    track = [
        point(i * 2, 45.5 + i * 0.002, 7.4, alt=1200 + (i % 2) * 5)
        for i in range(80)
    ]
    assert hikes.summarize(track)["climb_m"] == 0.0


def test_a_real_ascent_is_counted():
    track = [point(i * 5, 45.5 + i * 0.003, 7.4, alt=1000 + i * 40) for i in range(11)]
    assert hikes.summarize(track)["climb_m"] == 400


def test_a_descent_is_not_counted_as_climb():
    track = [point(i * 5, 45.5 + i * 0.003, 7.4, alt=2000 - i * 40) for i in range(11)]
    assert hikes.summarize(track)["climb_m"] == 0.0


def test_a_track_with_no_altitude_says_zero_rather_than_failing():
    track = [point(i * 5, 45.5 + i * 0.003, 7.4) for i in range(10)]
    assert hikes.summarize(track)["climb_m"] == 0.0


# --- What is thrown away ----------------------------------------------------


def test_the_null_island_fix_is_dropped():
    """An unset Meshtastic position decodes to exactly 0,0."""
    track = [point(0, 45.5, 7.4), point(3, 0, 0), point(6, 45.502, 7.4)]
    assert hikes.summarize(track)["points"] == 2


def test_half_a_position_is_no_position():
    track = [point(0, 45.5, 7.4), {"ts": at(3), "lat": 45.6}, point(6, 45.502, 7.4)]
    assert hikes.summarize(track)["points"] == 2


def test_an_empty_track_summarizes_to_zeroes_not_an_error():
    summary = hikes.summarize([])
    assert summary["points"] == 0
    assert summary["distance_km"] == 0.0
    assert summary["started"] is None


# --- GPX --------------------------------------------------------------------


def test_the_gpx_carries_every_usable_point():
    track = [point(i * 5, 45.5 + i * 0.003, 7.4, alt=1000 + i) for i in range(4)]
    gpx = hikes.to_gpx(track, "Test walk")
    assert gpx.count("<trkpt") == 4
    assert "<ele>1000.0</ele>" in gpx
    assert "<name>Test walk</name>" in gpx


def test_a_name_with_markup_in_it_cannot_break_the_document():
    gpx = hikes.to_gpx([point(0, 45.5, 7.4)], 'Walk & <b>"friends"</b>')
    assert "<b>" not in gpx
    assert "&amp;" in gpx


def test_points_without_altitude_produce_no_elevation_tag():
    gpx = hikes.to_gpx([point(0, 45.5, 7.4)], "No altitude")
    assert "<ele>" not in gpx
    assert gpx.count("<trkpt") == 1
