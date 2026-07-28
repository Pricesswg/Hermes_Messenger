"""Tests for the replay defence.

    .venv/bin/pytest tests/test_replay.py -v

Pure Python, no Home Assistant required. The two properties that matter are
opposite failures: a replayed packet must be refused, and a person sending the
same words twice must not be.
"""

from __future__ import annotations

import importlib.util
from pathlib import Path

_MODULE_PATH = (
    Path(__file__).resolve().parent.parent
    / "custom_components"
    / "hermes"
    / "replay.py"
)
_spec = importlib.util.spec_from_file_location("hermes_replay", _MODULE_PATH)
replay = importlib.util.module_from_spec(_spec)
_spec.loader.exec_module(replay)

remember = replay.remember
WINDOW = replay.DEFAULT_WINDOW_SECONDS


# --- The point of the whole module -----------------------------------------


def test_a_new_packet_is_accepted():
    seen: dict[int, float] = {}
    assert remember(seen, 1001, now=0.0) is True


def test_the_same_packet_twice_is_refused():
    seen: dict[int, float] = {}
    remember(seen, 1001, now=0.0)
    assert remember(seen, 1001, now=5.0) is False


def test_the_same_words_sent_twice_are_two_packets_and_both_pass():
    """The reason this can be strict: genuine repeats carry different ids."""
    seen: dict[int, float] = {}
    assert remember(seen, 1001, now=0.0) is True
    assert remember(seen, 1002, now=1.0) is True


def test_a_replay_much_later_is_refused_while_inside_the_window():
    seen: dict[int, float] = {}
    remember(seen, 1001, now=0.0)
    assert remember(seen, 1001, now=WINDOW - 1) is False


# --- Eviction --------------------------------------------------------------


def test_an_id_is_forgotten_once_the_window_has_passed():
    seen: dict[int, float] = {}
    remember(seen, 1001, now=0.0)
    assert remember(seen, 1001, now=WINDOW + 1) is True


def test_a_replay_does_not_extend_its_own_entry():
    """Otherwise a persistent attacker keeps the entry, and the memory, alive."""
    seen: dict[int, float] = {}
    remember(seen, 1001, now=0.0)
    # Hammered throughout the window, always refused.
    for moment in range(1, int(WINDOW), 60):
        assert remember(seen, 1001, now=float(moment)) is False
    # And it still expires on the original schedule, not a rolling one.
    assert remember(seen, 1001, now=WINDOW + 1) is True


def test_the_memory_stays_bounded_under_a_flood():
    seen: dict[int, float] = {}
    for message_id in range(5000):
        remember(seen, message_id, now=float(message_id) / 1000, cap=64)
    assert len(seen) <= 64


def test_the_cap_drops_the_oldest_first():
    seen: dict[int, float] = {}
    for message_id in range(10):
        remember(seen, message_id, now=float(message_id), cap=4)
    # The most recent survive, the first ones are gone.
    assert 9 in seen
    assert 0 not in seen


def test_a_window_of_zero_disables_expiry_but_not_the_cap():
    seen: dict[int, float] = {}
    remember(seen, 1001, now=0.0, window=0)
    assert remember(seen, 1001, now=10**9, window=0) is False


# --- Independence ----------------------------------------------------------


def test_two_memories_do_not_interfere():
    """Each gateway keeps its own, so one entry cannot mask another's traffic."""
    first: dict[int, float] = {}
    second: dict[int, float] = {}
    assert remember(first, 1001, now=0.0) is True
    assert remember(second, 1001, now=0.0) is True
