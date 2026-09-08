"""Tests for how Overpass answers are turned into something readable.

    .venv/bin/pytest tests/test_trails.py -v

No network: what is checked is the shaping and the ordering, which is where
the decisions are. The request itself is one aiohttp call whose failure mode
is already "return nothing and say so in the log".
"""

from __future__ import annotations

import importlib.util
import sys
from pathlib import Path

_ROOT = Path(__file__).resolve().parent.parent / "custom_components" / "hermes"
_spec = importlib.util.spec_from_file_location("hermes_trails", _ROOT / "trails.py")
trails = importlib.util.module_from_spec(_spec)
sys.modules["hermes_trails"] = trails
_spec.loader.exec_module(trails)


def element(**tags):
    return {"id": tags.pop("id", 1), "tags": tags}


def test_a_route_keeps_the_parts_worth_reading():
    route = trails._route(
        element(
            id=42,
            name="GTA: Piamprato - Ronco Canavese",
            ref="GTA",
            network="nwn",
            **{"from": "Piamprato", "to": "Ronco Canavese"},
        )
    )
    assert route["name"].startswith("GTA:")
    assert route["network"] == "nwn"
    assert route["from"] == "Piamprato"
    assert route["url"] == "https://www.openstreetmap.org/relation/42"


def test_a_route_with_no_name_falls_back_to_its_ref():
    """Half tagged is still a path, and a blank line helps nobody."""
    assert trails._route(element(ref="AV2"))["name"] == "AV2"


def test_a_route_with_neither_is_still_returned():
    route = trails._route(element(id=7))
    assert route["name"] == ""
    assert route["id"] == 7


def test_wider_networks_come_first():
    """A long distance path is the name the other person will recognise."""
    routes = [
        trails._route(element(id=1, name="Local loop", network="lwn")),
        trails._route(element(id=2, name="Alta Via", network="iwn")),
        trails._route(element(id=3, name="Regional way", network="rwn")),
        trails._route(element(id=4, name="National way", network="nwn")),
    ]
    routes.sort(key=trails._rank)
    assert [r["network"] for r in routes] == ["iwn", "nwn", "rwn", "lwn"]


def test_an_unknown_network_sorts_last_rather_than_crashing():
    routes = [
        trails._route(element(id=1, name="Odd", network="something_else")),
        trails._route(element(id=2, name="Local", network="lwn")),
    ]
    routes.sort(key=trails._rank)
    assert routes[0]["network"] == "lwn"


def test_the_query_asks_only_for_hiking_relations():
    query = trails._query(45.5, 7.4, 3000)
    assert 'relation["route"="hiking"]' in query
    assert "around:3000,45.5,7.4" in query
    # Tags only: the geometry of every way in every route would be megabytes to
    # answer a question about names.
    assert "out tags" in query
