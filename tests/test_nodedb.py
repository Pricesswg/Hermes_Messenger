"""Tests for reading the radio's node database.

Pure Python, no Home Assistant and no Meshtastic library required:

    .venv/bin/pytest tests/test_nodedb.py -v

The records here are shaped like the ones the Meshtastic library exposes on
`interface.nodes` and `interface.nodesByNum`.
"""

from __future__ import annotations

import importlib.util
from pathlib import Path

_MODULE_PATH = (
    Path(__file__).resolve().parent.parent
    / "custom_components"
    / "hermes"
    / "nodedb.py"
)
_spec = importlib.util.spec_from_file_location("hermes_nodedb", _MODULE_PATH)
nodedb = importlib.util.module_from_spec(_spec)
_spec.loader.exec_module(nodedb)

position = nodedb.position
node_record = nodedb.node_record
node_records = nodedb.node_records


# --- Position decoding -----------------------------------------------------


def test_position_reads_the_float_fields():
    assert position({"position": {"latitude": 45.5, "longitude": 9.2}}) == (45.5, 9.2)


def test_position_decodes_fixed_point_when_the_floats_are_absent():
    # The case that made nodes look like they had never reported a position.
    node = {"position": {"latitudeI": 455000000, "longitudeI": 92000000}}
    lat, lon = position(node)
    assert round(lat, 5) == 45.5
    assert round(lon, 5) == 9.2


def test_position_prefers_the_float_when_both_are_present():
    node = {
        "position": {
            "latitude": 45.5,
            "longitude": 9.2,
            "latitudeI": 10000000,
            "longitudeI": 10000000,
        }
    }
    assert position(node) == (45.5, 9.2)


def test_position_rejects_the_unset_origin():
    assert position({"position": {"latitude": 0, "longitude": 0}}) == (None, None)
    assert position({"position": {"latitudeI": 0, "longitudeI": 0}}) == (None, None)


def test_position_rejects_half_a_position():
    assert position({"position": {"latitude": 45.5}}) == (None, None)


def test_position_rejects_out_of_range_values():
    assert position({"position": {"latitude": 91, "longitude": 9.2}}) == (None, None)
    assert position({"position": {"latitude": 45.5, "longitude": 181}}) == (None, None)


def test_position_survives_rubbish():
    assert position({}) == (None, None)
    assert position({"position": None}) == (None, None)
    assert position({"position": {"latitude": "north"}}) == (None, None)


# --- Records ---------------------------------------------------------------


def test_record_carries_the_useful_fields():
    node = {
        "num": 1128074276,
        "user": {"id": "!433a1b24", "longName": "Base", "shortName": "BSE"},
        "position": {"latitude": 45.5, "longitude": 9.2},
        "deviceMetrics": {"batteryLevel": 88},
        "lastHeard": 1753600000,
        "snr": 6.25,
        "hopsAway": 2,
    }
    record = node_record("!433a1b24", node)
    assert record["node_num"] == 1128074276
    assert record["name"] == "Base"
    assert record["latitude"] == 45.5
    assert record["battery"] == 88
    assert record["last_heard"] == 1753600000
    assert record["hops_away"] == 2


def test_record_takes_the_number_from_the_key_when_absent():
    record = node_record(42, {"user": {"longName": "Peer"}})
    assert record["node_num"] == 42


def test_record_falls_back_through_the_names():
    assert node_record(1, {"user": {"shortName": "ABC"}})["name"] == "ABC"
    assert node_record(1, {"user": {"id": "!0001"}})["name"] == "!0001"
    assert node_record(1, {})["name"] == "1"


def test_record_rejects_an_entry_with_no_usable_number():
    assert node_record("!abcd", {"user": {"longName": "Nameless"}}) is None
    assert node_record("!abcd", "not a dict") is None


def test_records_skips_the_unusable_and_keeps_the_rest():
    raw = {
        1: {"num": 1, "user": {"longName": "One"}},
        "!bad": "not a dict",
        "!nokey": {"user": {"longName": "No number"}},
        3: {"num": 3, "user": {"longName": "Three"}},
    }
    names = sorted(record["name"] for record in node_records(raw))
    assert names == ["One", "Three"]


def test_records_tolerates_a_missing_database():
    assert node_records(None) == []
    assert node_records([]) == []
