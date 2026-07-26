"""Tests for the per node rate limiter.

Pure Python, no Home Assistant instance required:

    .venv/bin/pytest tests/test_rate_limit.py -v
"""

from __future__ import annotations

import importlib.util
import sys
from pathlib import Path

_MODULE_PATH = (
    Path(__file__).resolve().parent.parent
    / "custom_components"
    / "hermes"
    / "rate_limit.py"
)
_spec = importlib.util.spec_from_file_location("hermes_rate_limit", _MODULE_PATH)
rate_limit = importlib.util.module_from_spec(_spec)
sys.modules["hermes_rate_limit"] = rate_limit
_spec.loader.exec_module(rate_limit)

allow = rate_limit.allow
prune = rate_limit.prune
forget_idle = rate_limit.forget_idle


def test_allows_up_to_the_limit():
    history: dict[int, list[float]] = {}
    assert [allow(history, 7, 1000.0 + i, 3) for i in range(3)] == [True, True, True]


def test_refuses_past_the_limit():
    history: dict[int, list[float]] = {}
    for i in range(3):
        allow(history, 7, 1000.0 + i, 3)
    assert allow(history, 7, 1003.0, 3) is False


def test_refused_events_do_not_extend_the_window():
    # A node hammering the channel must not keep pushing its own window
    # forward, or it would stay blocked long after it calmed down.
    history: dict[int, list[float]] = {}
    for i in range(3):
        allow(history, 7, 1000.0 + i, 3)
    for i in range(20):
        allow(history, 7, 1005.0 + i, 3)
    # The three original events expire 60s after they happened, not after the
    # last refused attempt.
    assert allow(history, 7, 1063.0, 3) is True


def test_window_slides():
    history: dict[int, list[float]] = {}
    for i in range(3):
        allow(history, 7, 1000.0 + i, 3)
    assert allow(history, 7, 1001.0, 3) is False
    assert allow(history, 7, 1100.0, 3) is True


def test_nodes_are_independent():
    history: dict[int, list[float]] = {}
    for i in range(3):
        allow(history, 7, 1000.0 + i, 3)
    assert allow(history, 7, 1002.5, 3) is False
    assert allow(history, 8, 1002.5, 3) is True


def test_limit_zero_disables_and_records_nothing():
    history: dict[int, list[float]] = {}
    for i in range(50):
        assert allow(history, 7, 1000.0 + i, 0) is True
    # Nothing recorded, so turning the limit back on starts from a clean slate.
    assert history == {}
    assert allow(history, 7, 1050.0, 3) is True


def test_negative_limit_also_disables():
    history: dict[int, list[float]] = {}
    assert allow(history, 7, 1000.0, -1) is True


def test_prune_keeps_only_recent():
    assert prune([100.0, 900.0, 1000.0], 1000.0, 60.0) == [1000.0]


def test_forget_idle_drops_silent_nodes():
    history = {7: [1000.0], 8: [10.0]}
    forget_idle(history, 1000.0, 60.0)
    assert 7 in history and 8 not in history


def test_forget_idle_does_not_lose_active_nodes():
    history: dict[int, list[float]] = {}
    allow(history, 7, 1000.0, 3)
    forget_idle(history, 1001.0)
    assert allow(history, 7, 1001.0, 1) is False
