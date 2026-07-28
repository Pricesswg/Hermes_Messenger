"""Tests for the readable words a placeholder can put in place of a state.

    .venv/bin/pytest tests/test_labels.py -v

Pure Python, no Home Assistant required. The point of most of these is that a
placeholder written before labels existed still means exactly what it meant.
"""

from __future__ import annotations

import importlib.util
from pathlib import Path

_MODULE_PATH = (
    Path(__file__).resolve().parent.parent
    / "custom_components"
    / "hermes"
    / "labels.py"
)
_spec = importlib.util.spec_from_file_location("hermes_labels", _MODULE_PATH)
labels = importlib.util.module_from_spec(_spec)
_spec.loader.exec_module(labels)

PLACEHOLDER_RE = labels.PLACEHOLDER_RE
parse_labels = labels.parse_labels
apply_labels = labels.apply_labels
format_labels = labels.format_labels
build_placeholder = labels.build_placeholder


def parts(text: str):
    """(kind, entity, attribute, label section) of the first placeholder."""
    match = PLACEHOLDER_RE.search(text)
    return match.groups() if match else None


# --- The old syntax must keep meaning what it meant -------------------------


def test_a_plain_state_placeholder_still_parses():
    assert parts("{state:sensor.temp}") == ("state", "sensor.temp", None, None)


def test_a_plain_attribute_placeholder_still_parses():
    assert parts("{attr:climate.hall:temperature}") == (
        "attr",
        "climate.hall",
        "temperature",
        None,
    )


def test_a_placeholder_with_no_labels_passes_the_value_through():
    assert apply_labels("on", parse_labels(None)) == "on"


# --- With labels -----------------------------------------------------------


def test_a_state_placeholder_carries_its_labels():
    assert parts("{state:switch.pump|on=running,off=stopped}") == (
        "state",
        "switch.pump",
        None,
        "on=running,off=stopped",
    )


def test_an_attribute_placeholder_carries_its_labels():
    assert parts("{attr:climate.hall:hvac_action|heating=warming up}") == (
        "attr",
        "climate.hall",
        "hvac_action",
        "heating=warming up",
    )


def test_the_label_replaces_the_state():
    found = parse_labels("on=running,off=stopped")
    assert apply_labels("on", found) == "running"
    assert apply_labels("off", found) == "stopped"


def test_an_unlabelled_state_is_left_alone():
    """A cover that is opening must not vanish because only open was labelled."""
    assert apply_labels("opening", parse_labels("open=up,closed=down")) == "opening"


def test_matching_ignores_case_and_spacing():
    found = parse_labels(" ON = running , off=stopped ")
    assert apply_labels("on", found) == "running"
    assert apply_labels("  OFF ", found) == "stopped"


def test_a_label_may_contain_spaces():
    assert parse_labels("home=at home")["home"] == "at home"


# --- Robustness ------------------------------------------------------------


def test_malformed_pairs_are_skipped_not_fatal():
    """One bad label costs one ugly word, an exception costs the command."""
    assert parse_labels("on=running,rubbish,=nothing,off=") == {"on": "running"}


def test_an_empty_label_section_is_no_labels():
    assert parse_labels("") == {}
    assert parts("{state:switch.pump|}") == ("state", "switch.pump", None, "")


# --- Building, and the round trip ------------------------------------------


def test_building_a_placeholder_without_labels_is_the_old_format():
    assert build_placeholder("state", "sensor.temp") == "{state:sensor.temp}"
    assert (
        build_placeholder("attr", "climate.hall", "temperature")
        == "{attr:climate.hall:temperature}"
    )


def test_what_is_built_is_what_is_parsed():
    token = build_placeholder(
        "state", "switch.pump", labels={"on": "running", "off": "stopped"}
    )
    kind, entity, attribute, section = parts(token)
    assert (kind, entity, attribute) == ("state", "switch.pump", None)
    assert parse_labels(section) == {"on": "running", "off": "stopped"}


def test_a_label_that_would_break_the_placeholder_is_dropped():
    """Otherwise the parser reads back something other than what was meant."""
    assert format_labels({"on": "a,b"}) == ""
    assert format_labels({"on": "a=b"}) == ""
    assert format_labels({"on": "a}b"}) == ""
    assert format_labels({"on": "fine", "off": "a,b"}) == "on=fine"
