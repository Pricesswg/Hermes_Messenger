"""Byte-safe splitting/truncation of Meshtastic messages.

PURE module: no Home Assistant dependency, testable in isolation.

Meshtastic enforces a limit in *bytes* (not characters) on the text payload.
This module splits arbitrary text into a list of strings ready for
`meshtastic.send_text`, guaranteeing that:

  - each part, encoded as UTF-8, does not exceed the byte limit;
  - no multi-byte character is ever cut in half (we work per character, not
    per raw byte);
  - if more than one part is needed, each part carries an ``(i/n) `` header
    whose byte cost is already deducted from the available budget.
"""

from __future__ import annotations

# Default Meshtastic payload limit. This is the documented value: it must still
# be reconfirmed empirically against the firmware in use.
DEFAULT_BYTE_LIMIT = 200

# Safety valve: cap on fixed-point iterations. In practice it converges in 2-3
# rounds; exceeding it means a logic bug, not a "hard" input, better to blow up
# than to spin in an infinite loop.
_MAX_ITERATIONS = 12


def _byte_len(text: str) -> int:
    """UTF-8 byte length of a string."""
    return len(text.encode("utf-8"))


def _header_len(n: int) -> int:
    """Bytes taken by the header in the *worst case* for a total of ``n`` parts.

    The real header of part ``i`` is ``(i/n) ``. Since ``i <= n``, the digit
    count of ``i`` never exceeds that of ``n``: by computing the budget on the
    ``(n/n) `` case we get a valid ceiling for *all* parts using a single
    number. This is what makes overflow impossible when the part count crosses
    from 9 to 10 (header going from 1 to 2 digits).
    """
    return _byte_len(f"({n}/{n}) ")


def _pack(text: str, content_budget: int) -> list[str]:
    """Pack ``text`` into parts whose content fits in ``content_budget`` bytes.

    Greedy per character: accumulate until adding the next character would
    exceed the budget, then open a new part. Does not insert headers.

    Raises ``ValueError`` if a single character does not fit the budget
    (absurdly small limit): without this guard the loop would never advance.
    """
    parts: list[str] = []
    current: list[str] = []
    current_bytes = 0

    for ch in text:
        cb = _byte_len(ch)
        if cb > content_budget:
            raise ValueError(
                f"a {cb}-byte character does not fit the {content_budget}-byte "
                f"budget: limit too small"
            )
        if current_bytes + cb > content_budget:
            parts.append("".join(current))
            current = [ch]
            current_bytes = cb
        else:
            current.append(ch)
            current_bytes += cb

    if current:
        parts.append("".join(current))
    return parts


def split_message(text: str, limit: int = DEFAULT_BYTE_LIMIT) -> list[str]:
    """Split ``text`` into Meshtastic-sendable parts.

    Args:
        text: text to send (already decoded, ``str``).
        limit: byte ceiling for each part (header included). Default 200.

    Returns:
        A list of strings. Cases:
          - empty ``text`` -> ``[]`` (explicit choice: nothing to send);
          - ``text`` that fits in ``limit`` bytes -> ``[text]`` with no header;
          - otherwise N parts, each with an ``(i/n) `` header and <= ``limit`` bytes.

    Raises:
        ValueError: ``limit`` too small to hold header + one character.
        RuntimeError: fixed-point failed to converge (logic bug).
    """
    if text == "":
        return []

    # Common case: everything fits in a single message, no header.
    if _byte_len(text) <= limit:
        return [text]

    # Fixed point on the part count. f(n) = number of parts produced with the
    # budget derived from n; f is monotonically non-decreasing in n (more parts
    # => longer header => smaller budget => no fewer parts), so iterating from
    # the bottom converges to the smallest n with f(n) == n.
    n = 1
    for _ in range(_MAX_ITERATIONS):
        content_budget = limit - _header_len(n)
        if content_budget <= 0:
            raise ValueError(
                f"limit of {limit} bytes is insufficient for the header of {n} parts"
            )
        parts = _pack(text, content_budget)
        m = len(parts)
        if m == n:
            break
        n = m
    else:
        raise RuntimeError(
            "split_message: fixed point did not converge (logic bug)"
        )

    return [f"({i}/{n}) {part}" for i, part in enumerate(parts, start=1)]
