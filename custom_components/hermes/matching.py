"""Keyword matching for incoming messages.

PURE module: no Home Assistant dependency, testable in isolation like
`message.py`, `tokens.py` and `rate_limit.py`.

Matching is case insensitive by default, and that default matters: phone
keyboards and the Meshtastic app capitalise the first letter on their own, so a
strict comparison would silently reject "Status" for a keyword typed as
"status". Installations that want the strict behaviour can ask for it.
"""

from __future__ import annotations

from typing import Any

from .const import (
    CMD_KEYWORD,
    CMD_MATCH_TYPE,
    MATCH_EXACT,
    MATCH_STARTSWITH,
    MODE_CHANNEL,
)


def normalize(text: str, case_sensitive: bool = False) -> str:
    """Trim, and fold the case unless the caller asked for strict matching."""
    trimmed = (text or "").strip()
    return trimmed if case_sensitive else trimmed.casefold()


def match_command(
    text: str,
    commands: list[dict[str, Any]],
    case_sensitive: bool = False,
) -> dict[str, Any] | None:
    """First command whose keyword matches ``text``, or None.

    Commands are tried in configuration order, so when two keywords could both
    match the same message the earlier one wins. That is predictable and lets
    the user order a specific keyword before a broader "starts with" one.
    """
    norm = normalize(text, case_sensitive)
    if not norm:
        return None

    for command in commands or []:
        keyword = normalize(command.get(CMD_KEYWORD) or "", case_sensitive)
        if not keyword:
            continue
        match_type = command.get(CMD_MATCH_TYPE, MATCH_EXACT)
        if match_type == MATCH_STARTSWITH:
            if norm.startswith(keyword):
                return command
        elif match_type == MATCH_EXACT and norm == keyword:
            return command
    return None


def matches_keyword(text: str, keyword: str, case_sensitive: bool = False) -> bool:
    """Exact comparison of a single keyword, used for the help word."""
    folded = normalize(keyword, case_sensitive)
    return bool(folded) and normalize(text, case_sensitive) == folded


def accepts_message(
    to: dict[str, Any] | None,
    mode: str,
    channel_index: int | None,
    gateway_node_id: int,
) -> bool:
    """Whether this gateway should act on a message at all.

    This is the security gate of the integration, so it is written to reject by
    default. A gateway configured for one channel must never act on traffic from
    another channel: a stranger on a channel we were not told to listen to has
    to get silence, not a reply that reveals a Home Assistant is behind it.

    ``to`` follows the schema of the base integration: ``node`` is set on direct
    messages and ``channel`` on channel messages, never both.
    """
    if not isinstance(to, dict):
        return False

    node = to.get("node")
    channel = to.get("channel")

    if mode == MODE_CHANNEL:
        # An unconfigured channel index can never match, otherwise a gateway
        # with no channel set would start answering direct messages.
        if channel_index is None:
            return False
        return node is None and channel == channel_index

    # Direct message mode: addressed to this gateway as a node.
    return channel is None and node == gateway_node_id
