"""Readable words in place of raw states.

A reply built from `{state:switch.pump}` says `on`, which is what Home Assistant
stores and not what anyone wants to read over the radio. A placeholder can carry
its own vocabulary:

    {state:switch.pump|on=running,off=stopped}
    {state:cover.gate|open=open,closed=shut}
    {attr:climate.hall:hvac_action|heating=warming up}

Pure: no Home Assistant, no side effects, so the parsing that decides what a
message says is testable on its own.

The labels are written by the administrator in the card, never by whoever sends
the message, so this is presentation only. A state with no label is passed
through unchanged, which keeps every placeholder written before this existed
working exactly as it did.
"""

from __future__ import annotations

import re

# {kind:entity} or {kind:entity:attribute}, each optionally followed by
# |state=word,state=word. The entity and attribute exclude the pipe so the
# label section can never be swallowed by them.
PLACEHOLDER_RE = re.compile(
    r"\{(state|attr):([^:}|]+?)(?::([^}|]+?))?(?:\|([^}]*))?\}"
)


def parse_labels(raw: str | None) -> dict[str, str]:
    """The `state=word` pairs of a placeholder, keyed by the lowercased state.

    Deliberately forgiving: a malformed pair is skipped rather than raising,
    because the cost of one bad label is one ugly word in a message, while the
    cost of an exception is a command that stops working.
    """
    if not raw:
        return {}

    labels: dict[str, str] = {}
    for pair in raw.split(","):
        state, separator, label = pair.partition("=")
        if not separator:
            continue
        state, label = state.strip(), label.strip()
        if state and label:
            labels[state.lower()] = label
    return labels


def apply_labels(value: str, labels: dict[str, str]) -> str:
    """The label for a value, or the value itself when there is none.

    Matched without case, since Home Assistant states are lowercase by
    convention but attributes are whatever the integration decided.
    """
    if not labels:
        return value
    return labels.get(str(value).strip().lower(), value)


def format_labels(labels: dict[str, str]) -> str:
    """The label section of a placeholder, empty when there is nothing to say.

    A label containing a comma, an equals sign or a closing brace would break
    the placeholder it lives in, so those are dropped here rather than written
    into a token that the parser would then read back wrongly.
    """
    parts = [
        f"{state}={label}"
        for state, label in labels.items()
        if state and label and not set(label) & {",", "=", "}", "|"}
    ]
    return ",".join(parts)


def build_placeholder(
    kind: str,
    entity_id: str,
    attribute: str | None = None,
    labels: dict[str, str] | None = None,
) -> str:
    """A placeholder string, the one format the card and the backend share."""
    body = entity_id if not attribute else f"{entity_id}:{attribute}"
    section = format_labels(labels or {})
    return f"{{{kind}:{body}|{section}}}" if section else f"{{{kind}:{body}}}"
