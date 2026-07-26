"""Per node rate limiting.

PURE module: no Home Assistant dependency, testable in isolation like
`message.py` and `tokens.py`.

A single node can flood matched commands, either because it malfunctions or
because a repeater duplicates its packets. Executing a Home Assistant service
per duplicate is the expensive failure, so the limit is applied to matched and
authorized commands, after the cheap checks have already dropped everything else.
"""

from __future__ import annotations

WINDOW_SECONDS = 60.0


def prune(timestamps: list[float], now: float, window: float = WINDOW_SECONDS) -> list[float]:
    """Drop the timestamps that fell out of the window."""
    cutoff = now - window
    return [ts for ts in timestamps if ts > cutoff]


def allow(
    history: dict[int, list[float]],
    node: int,
    now: float,
    limit: int,
    window: float = WINDOW_SECONDS,
) -> bool:
    """Record an event for ``node`` and say whether it is within the limit.

    ``history`` is mutated in place: the caller keeps it across calls.

    A ``limit`` of 0 or less disables the check entirely, and nothing is
    recorded in that case, so turning the limit off does not leave the previous
    history to interfere if it is turned back on.

    Returns True when the event is allowed. When it is refused the event is not
    recorded either: a node hammering the channel must not keep pushing its own
    window forward, otherwise it would stay blocked long after it calmed down.
    """
    if limit <= 0:
        return True

    recent = prune(history.get(node, []), now, window)
    if len(recent) >= limit:
        history[node] = recent
        return False

    recent.append(now)
    history[node] = recent
    return True


def forget_idle(
    history: dict[int, list[float]], now: float, window: float = WINDOW_SECONDS
) -> None:
    """Drop nodes with no recent events, so the history cannot grow forever."""
    for node in [n for n, ts in history.items() if not prune(ts, now, window)]:
        del history[node]
