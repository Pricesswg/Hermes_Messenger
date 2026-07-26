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

from .const import CMD_KEYWORD, CMD_MATCH_TYPE, MATCH_EXACT, MATCH_STARTSWITH


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
