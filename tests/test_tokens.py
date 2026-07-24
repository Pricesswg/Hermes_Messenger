"""Tests for the token parser.

Pure Python, no Home Assistant instance required:

    .venv/bin/pytest tests/test_tokens.py -v
"""

from __future__ import annotations

import importlib.util
import sys
from pathlib import Path

import pytest

_MODULE_PATH = (
    Path(__file__).resolve().parent.parent
    / "custom_components"
    / "hermes"
    / "tokens.py"
)
_spec = importlib.util.spec_from_file_location("hermes_tokens", _MODULE_PATH)
tokens = importlib.util.module_from_spec(_spec)
# @dataclass resolves its module through sys.modules, so the module has to be
# registered before it is executed when loading by path.
sys.modules["hermes_tokens"] = tokens
_spec.loader.exec_module(tokens)

parse_actions = tokens.parse_actions
strip_actions = tokens.strip_actions
parse_argument = tokens.parse_argument
apply_argument = tokens.apply_argument


# --- parse_actions ---------------------------------------------------------

def test_single_action_no_params():
    found = parse_actions("{do:light.turn_off:light.kitchen}Lights off.")
    assert len(found) == 1
    assert found[0].service == "light.turn_off"
    assert found[0].entity_id == "light.kitchen"
    assert found[0].params == {}
    assert found[0].domain == "light"
    assert found[0].name == "turn_off"


def test_action_with_single_param():
    found = parse_actions("{do:climate.set_temperature:climate.living:temperature=21}")
    assert found[0].params == {"temperature": 21}


def test_action_with_multiple_params():
    found = parse_actions(
        "{do:light.turn_on:light.kitchen:brightness_pct=60,transition=2}"
    )
    assert found[0].params == {"brightness_pct": 60, "transition": 2}


def test_multiple_actions_keep_order():
    found = parse_actions(
        "{do:light.turn_on:light.a}{do:climate.set_temperature:climate.b:temperature=19}"
    )
    assert [f.service for f in found] == [
        "light.turn_on",
        "climate.set_temperature",
    ]


def test_mixed_with_read_tokens_ignores_reads():
    text = "{do:light.turn_off:light.kitchen}Now {state:sensor.temp} and {attr:climate.x:temperature}"
    found = parse_actions(text)
    assert len(found) == 1
    assert found[0].service == "light.turn_off"


def test_float_and_bool_params_are_coerced():
    found = parse_actions("{do:climate.set_temperature:climate.b:temperature=20.5,away=true}")
    assert found[0].params == {"temperature": 20.5, "away": True}


@pytest.mark.parametrize(
    "text",
    [
        "{do:notaservice:light.kitchen}",      # service without a dot
        "{do:light.turn_off}",                  # missing entity
        "{do:light.turn_off:kitchen}",          # entity without a domain
        "{dosomething:light.turn_off:light.a}",  # wrong namespace
        "{state:sensor.temp}",                  # a read, not an action
        "plain text with no tokens",
        "",
    ],
)
def test_malformed_tokens_are_ignored(text):
    # A typo in the template must never raise: it simply does not match.
    assert parse_actions(text) == []


# --- strip_actions ---------------------------------------------------------

def test_strip_leaves_only_the_human_text():
    assert strip_actions("{do:light.turn_off:light.kitchen}Lights off.") == "Lights off."


def test_strip_collapses_leftover_spaces():
    text = "{do:light.turn_off:light.a} Done {do:light.turn_on:light.b} ok"
    assert strip_actions(text) == "Done ok"


def test_strip_keeps_read_tokens_for_later_rendering():
    text = "{do:light.turn_off:light.a}Temp {state:sensor.temp}"
    assert strip_actions(text) == "Temp {state:sensor.temp}"


def test_strip_preserves_intentional_newlines():
    assert strip_actions("{do:light.turn_off:light.a}Line1\nLine2") == "Line1\nLine2"


def test_strip_of_empty_is_empty():
    assert strip_actions("") == ""


# --- parse_argument --------------------------------------------------------

@pytest.mark.parametrize(
    ("message", "keyword", "expected"),
    [
        ("temp 21", "temp", 21.0),
        ("temp 21.5", "temp", 21.5),
        ("temp 21,5", "temp", 21.5),      # comma decimal from phone keyboards
        ("TEMP 22", "temp", 22.0),        # case insensitive
        ("  temp   23  ", "temp", 23.0),  # extra whitespace
        ("temp", "temp", None),           # no argument at all
        ("temp hot", "temp", None),       # free text is never accepted
        ("other 21", "temp", None),       # keyword does not match
        ("", "temp", None),
        ("temp 21", "", None),
    ],
)
def test_parse_argument(message, keyword, expected):
    assert parse_argument(message, keyword) == expected


# --- apply_argument --------------------------------------------------------

def test_argument_overrides_the_single_numeric_param():
    params = {"temperature": 21}
    assert apply_argument(params, 23.0) == {"temperature": 23}


def test_argument_keeps_float_when_not_whole():
    assert apply_argument({"temperature": 21}, 22.5) == {"temperature": 22.5}


def test_argument_ignored_when_no_numeric_param():
    params = {"hvac_mode": "heat"}
    assert apply_argument(params, 23.0) == params


def test_argument_ignored_when_several_numeric_params():
    # Ambiguous: we would not know which one the sender meant.
    params = {"brightness_pct": 60, "transition": 2}
    assert apply_argument(params, 30.0) == params


def test_argument_ignored_when_out_of_range():
    params = {"temperature": 21}
    assert apply_argument(params, 99.0, minimum=5, maximum=35) == params
    assert apply_argument(params, 1.0, minimum=5, maximum=35) == params


def test_argument_accepted_inside_range():
    params = {"temperature": 21}
    assert apply_argument(params, 25.0, minimum=5, maximum=35) == {"temperature": 25}


def test_no_argument_leaves_params_untouched():
    params = {"temperature": 21}
    assert apply_argument(params, None) == params


def test_bool_is_not_treated_as_numeric():
    # bool is a subclass of int in Python: it must not count as the numeric slot.
    params = {"away": True}
    assert apply_argument(params, 23.0) == params
