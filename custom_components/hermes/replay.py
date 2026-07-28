"""Refusing to run the same packet twice.

A Meshtastic channel has no replay protection: the encryption documentation
says so plainly, and it only exists for direct messages and admin messages
between devices on firmware 2.5 and later. So the cheapest attack on a system
that acts on radio messages is also the one that needs the least skill. Record
the encrypted packet that opens the gate, transmit it again tomorrow. No key,
no decryption, nothing to break. The sender is the legitimate node, so an
authorized nodes list waves it through, and it is one message, so a rate limit
never sees it.

What makes the defence exact is that the packet carries an identity. The base
integration puts the radio's own packet id on the event as `message_id`, and a
replay is the same packet, so it carries the same id, while two genuine sends
of the same words carry different ones. That means this can refuse replays
without ever refusing a person who simply asked twice.

Pure: no Home Assistant, no clock of its own. The caller supplies the time,
which is what makes the eviction testable.
"""

from __future__ import annotations

# How long a packet id is remembered. Generous on purpose: the window is the
# period over which a captured packet is useless to an attacker, and the only
# cost of a long one is memory, which the cap below bounds anyway.
DEFAULT_WINDOW_SECONDS = 900.0

# Ceiling on remembered ids, so a busy channel cannot grow this without limit.
# At the default window this is well above what any real mesh produces.
DEFAULT_CAP = 512


def remember(
    seen: dict[int, float],
    message_id: int,
    now: float,
    window: float = DEFAULT_WINDOW_SECONDS,
    cap: int = DEFAULT_CAP,
) -> bool:
    """Record a packet id. True when it is new, False when it is a replay.

    `seen` maps packet id to the moment it arrived and is owned by the caller,
    so a restart starts with an empty memory. That is a real limit and an
    accepted one: it costs an attacker a replay timed to a restart, and the
    alternative is persisting every packet id across reboots for a window that
    is measured in minutes.
    """
    _evict(seen, now, window, cap)

    if message_id in seen:
        # Deliberately not refreshed. A replay must not extend the life of the
        # entry that catches it, or a persistent attacker would keep it alive
        # and, worse, keep pushing genuine ids out under the cap.
        return False

    seen[message_id] = now
    return True


def _evict(seen: dict[int, float], now: float, window: float, cap: int) -> None:
    """Drop what is too old, then what is oldest if there is still too much."""
    if window > 0:
        cutoff = now - window
        for message_id in [mid for mid, at in seen.items() if at <= cutoff]:
            del seen[message_id]

    # The cap is the backstop for a flood inside a single window.
    excess = len(seen) - cap
    if excess >= 0:
        oldest = sorted(seen, key=seen.__getitem__)[: excess + 1]
        for message_id in oldest:
            del seen[message_id]
