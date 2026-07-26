"""Tests for keyword matching, including the case sensitivity setting.

Pure Python, no Home Assistant instance required:

    .venv/bin/pytest tests/test_matching.py -v
"""

from __future__ import annotations

import importlib.util
import sys
from pathlib import Path

_ROOT = Path(__file__).resolve().parent.parent / "custom_components" / "hermes"


def _load(name: str, filename: str):
    spec = importlib.util.spec_from_file_location(name, _ROOT / filename)
    module = importlib.util.module_from_spec(spec)
    sys.modules[name] = module
    spec.loader.exec_module(module)
    return module


# matching.py imports from const.py by package path, so const is registered
# under the name the relative import resolves to.
_const = _load("hermes_const", "const.py")
sys.modules["hermes_pkg"] = type(sys)("hermes_pkg")
sys.modules["hermes_pkg"].__path__ = [str(_ROOT)]
sys.modules["hermes_pkg.const"] = _const

_spec = importlib.util.spec_from_file_location(
    "hermes_pkg.matching", _ROOT / "matching.py"
)
matching = importlib.util.module_from_spec(_spec)
sys.modules["hermes_pkg.matching"] = matching
_spec.loader.exec_module(matching)

match_command = matching.match_command
matches_keyword = matching.matches_keyword
normalize = matching.normalize

EXACT = [{"keyword": "status", "match_type": "exact"}]
STARTS = [{"keyword": "temp", "match_type": "startswith"}]


# --- case insensitive, the default -----------------------------------------

def test_capitalised_message_still_matches():
    # The Meshtastic app and phone keyboards capitalise on their own.
    assert match_command("Status", EXACT) is not None
    assert match_command("STATUS", EXACT) is not None


def test_capitalised_keyword_still_matches():
    commands = [{"keyword": "Status", "match_type": "exact"}]
    assert match_command("status", commands) is not None


def test_surrounding_whitespace_is_ignored():
    assert match_command("  status  ", EXACT) is not None


def test_startswith_accepts_an_argument():
    assert match_command("Temp 21", STARTS) is not None


def test_exact_rejects_extra_text():
    assert match_command("status now", EXACT) is None


# --- case sensitive, opt in -------------------------------------------------

def test_case_sensitive_rejects_a_different_case():
    assert match_command("Status", EXACT, case_sensitive=True) is None


def test_case_sensitive_accepts_the_exact_case():
    assert match_command("status", EXACT, case_sensitive=True) is not None


def test_case_sensitive_still_trims():
    assert match_command(" status ", EXACT, case_sensitive=True) is not None


# --- ordering and edge cases ------------------------------------------------

def test_first_match_wins():
    commands = [
        {"keyword": "temp", "match_type": "exact"},
        {"keyword": "temp", "match_type": "startswith"},
    ]
    assert match_command("temp", commands)["match_type"] == "exact"


def test_empty_keyword_is_skipped():
    commands = [{"keyword": "  ", "match_type": "exact"}, *EXACT]
    assert match_command("status", commands) is not None


def test_empty_message_never_matches():
    assert match_command("", EXACT) is None
    assert match_command("   ", EXACT) is None


def test_no_commands_configured():
    assert match_command("status", []) is None
    assert match_command("status", None) is None


def test_missing_match_type_defaults_to_exact():
    commands = [{"keyword": "status"}]
    assert match_command("status", commands) is not None
    assert match_command("status now", commands) is None


# --- help keyword -----------------------------------------------------------

def test_help_keyword_is_case_insensitive_by_default():
    assert matches_keyword("Help", "help") is True


def test_help_keyword_can_be_strict():
    assert matches_keyword("Help", "help", case_sensitive=True) is False


def test_empty_help_keyword_never_matches():
    assert matches_keyword("anything", "") is False
    assert matches_keyword("", "") is False


def test_normalize():
    assert normalize(" AbC ") == "abc"
    assert normalize(" AbC ", case_sensitive=True) == "AbC"


# --- the security gate ------------------------------------------------------
#
# A gateway must act only on the traffic it was configured for. Everything else
# has to be met with silence, because a reply tells a stranger that a Home
# Assistant is listening behind that node.

accepts_message = matching.accepts_message

CH = "channel"
DM = "direct_message"


def test_channel_mode_accepts_its_own_channel():
    assert accepts_message({"node": None, "channel": 1}, CH, 1, 999) is True


def test_channel_mode_rejects_another_channel():
    # The core of it: a command shouted on a channel we do not listen to must
    # never be acted on, and must never be answered.
    assert accepts_message({"node": None, "channel": 2}, CH, 1, 999) is False
    assert accepts_message({"node": None, "channel": 0}, CH, 1, 999) is False


def test_channel_mode_rejects_direct_messages():
    assert accepts_message({"node": 999, "channel": None}, CH, 1, 999) is False


def test_channel_zero_is_a_real_channel_not_a_missing_one():
    # Channel 0 is the primary channel: it must not be confused with "unset".
    assert accepts_message({"node": None, "channel": 0}, CH, 0, 999) is True


def test_channel_mode_without_a_configured_channel_accepts_nothing():
    assert accepts_message({"node": None, "channel": 0}, CH, None, 999) is False
    assert accepts_message({"node": None, "channel": None}, CH, None, 999) is False
    assert accepts_message({"node": 999, "channel": None}, CH, None, 999) is False


def test_dm_mode_accepts_a_message_to_this_gateway():
    assert accepts_message({"node": 999, "channel": None}, DM, None, 999) is True


def test_dm_mode_rejects_a_message_to_another_node():
    assert accepts_message({"node": 1234, "channel": None}, DM, None, 999) is False


def test_dm_mode_rejects_channel_traffic():
    assert accepts_message({"node": None, "channel": 0}, DM, None, 999) is False


def test_malformed_target_is_rejected():
    # Defensive: the base integration could change shape under us.
    assert accepts_message(None, CH, 1, 999) is False
    assert accepts_message({}, CH, 1, 999) is False
    assert accepts_message("nonsense", CH, 1, 999) is False
    assert accepts_message({}, DM, None, 999) is False
