"""Tests for the 5 acceptance criteria of the byte-safe split engine.

Pure Python, no Home Assistant instance required:

    .venv/bin/pytest tests/test_message.py -v
"""

from __future__ import annotations

import importlib.util
import re
from pathlib import Path

import pytest

# Import the module directly by path: avoids having to install the
# `custom_components.hermes` package (which would in turn import Home Assistant).
_MODULE_PATH = (
    Path(__file__).resolve().parent.parent
    / "custom_components"
    / "hermes"
    / "message.py"
)
_spec = importlib.util.spec_from_file_location("hermes_message", _MODULE_PATH)
message = importlib.util.module_from_spec(_spec)
_spec.loader.exec_module(message)

split_message = message.split_message
LIMIT = message.DEFAULT_BYTE_LIMIT

_HEADER_RE = re.compile(r"^\((\d+)/(\d+)\) ")


def _byte_len(s: str) -> int:
    return len(s.encode("utf-8"))


# --- Criterion 1: short ASCII -> single message, no header ------------------

def test_short_ascii_single_no_header():
    text = "Living room: 21.5C, lights off"
    out = split_message(text, LIMIT)
    assert out == [text]
    assert _HEADER_RE.match(out[0]) is None


# --- Criterion 2: long ASCII -> N parts, each <= limit, correct headers ------

def test_long_ascii_multipart():
    text = "A" * 500
    out = split_message(text, LIMIT)

    assert len(out) > 1
    for part in out:
        assert _byte_len(part) <= LIMIT

    # Sequential and consistent headers: (1/n), (2/n), ... (n/n).
    n = len(out)
    for idx, part in enumerate(out, start=1):
        m = _HEADER_RE.match(part)
        assert m is not None, f"part without header: {part!r}"
        assert int(m.group(1)) == idx
        assert int(m.group(2)) == n

    # No character lost: recomposing the contents yields the original.
    rebuilt = "".join(_HEADER_RE.sub("", part) for part in out)
    assert rebuilt == text


# --- Criterion 3: accents/emoji at the limit -> no character cut -------------

@pytest.mark.parametrize(
    "text",
    [
        "à" * 130,          # 2 bytes/char, ~260 bytes -> forces the split
        "€" * 90,           # 3 bytes/char
        "🚨" * 70,          # 4 bytes/char (emoji)
        "North perimeter alarm 🚨 motion detected at 03:14, please check 📹" * 6,
    ],
)
def test_multibyte_no_char_truncated(text):
    out = split_message(text, LIMIT)

    rebuilt_parts = []
    for part in out:
        # Each part must be valid UTF-8 (it is by construction, but we
        # re-decode to be sure: no surrogate/truncation).
        assert _byte_len(part) <= LIMIT
        part.encode("utf-8").decode("utf-8")  # must not raise
        rebuilt_parts.append(_HEADER_RE.sub("", part))

    assert "".join(rebuilt_parts) == text


# --- Criterion 4: >=10 parts -> 2-digit header does not overflow the budget --

def test_ten_or_more_parts_two_digit_header():
    # Small limit to force many parts with manageable text.
    limit = 24
    text = "X" * 400
    out = split_message(text, limit)

    assert len(out) >= 10, "the test case must produce >= 10 parts"
    n = len(out)
    assert n >= 10  # 2-digit header present

    for part in out:
        assert _byte_len(part) <= limit, (
            f"part over the limit ({_byte_len(part)} > {limit}): {part!r}"
        )

    # Parts with index >= 10 actually have a 2-digit header.
    assert any(_HEADER_RE.match(p).group(1) == "10" for p in out)
    rebuilt = "".join(_HEADER_RE.sub("", part) for part in out)
    assert rebuilt == text


# --- Criterion 5: empty string -> explicit behavior ([]) --------------------

def test_empty_string_empty_list():
    assert split_message("", LIMIT) == []


# --- Extra guards (safety valve) -------------------------------------------

def test_limit_at_exact_boundary():
    # Exactly `limit` bytes -> single message with no header.
    text = "A" * LIMIT
    out = split_message(text, LIMIT)
    assert out == [text]

    # One byte more -> two parts.
    out2 = split_message("A" * (LIMIT + 1), LIMIT)
    assert len(out2) == 2


def test_absurd_limit_raises_valueerror():
    # A 2-part header is ~6 bytes; with a limit of 6 no character fits.
    with pytest.raises(ValueError):
        split_message("hello world long enough to be split", 6)
