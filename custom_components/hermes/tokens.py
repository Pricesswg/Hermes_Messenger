"""Parsing of the Hermes message tokens.

PURE module: no Home Assistant dependency, testable in isolation like
`message.py`.

A reply template mixes plain text with tokens. Reads are resolved by the
coordinator and were already supported:

    {state:sensor.living_room_temp}
    {attr:climate.living_room:temperature}

Actions are new and live in their own `do:` namespace so they can never
collide with a read:

    {do:light.turn_off:light.kitchen}
    {do:climate.set_temperature:climate.living_room:temperature=21}
    {do:light.turn_on:light.kitchen:brightness_pct=60,transition=2}

A token is self contained: it carries the real service, the entity and the
parameter names. The action catalogue is only an authoring aid in the card, it
is not needed to execute a token. That keeps execution robust to catalogue
changes and makes a stored command readable at a glance.

Security note: tokens are written by the Home Assistant administrator in the
card, never by the mesh sender. A sender can only trigger a keyword and supply
a number, which is parsed strictly as a number and never interpolated into a
service or entity id.
"""

from __future__ import annotations

import re
from dataclasses import dataclass, field
from typing import Any

# {do:<domain.service>:<entity_id>} with an optional :<params> group.
# Every part is deliberately restrictive: no braces, no colons inside the
# service and entity segments, so a malformed token simply does not match
# instead of producing something half valid.
_ACTION_RE = re.compile(
    r"\{do:"
    r"(?P<service>[a-z_][a-z0-9_]*\.[a-z0-9_]+)"
    r":(?P<entity>[a-z_][a-z0-9_]*\.[A-Za-z0-9_]+)"
    r"(?::(?P<params>[^{}:]*))?"
    r"\}"
)


@dataclass
class ActionToken:
    """One action extracted from a template."""

    service: str
    entity_id: str
    params: dict[str, Any] = field(default_factory=dict)

    @property
    def domain(self) -> str:
        return self.service.split(".", 1)[0]

    @property
    def name(self) -> str:
        return self.service.split(".", 1)[1]


def _coerce(raw: str) -> Any:
    """Turn a parameter value into int/float/bool when it clearly is one."""
    text = raw.strip()
    lowered = text.lower()
    if lowered in ("true", "false"):
        return lowered == "true"
    try:
        return int(text)
    except ValueError:
        pass
    try:
        return float(text)
    except ValueError:
        return text


def _parse_params(raw: str | None) -> dict[str, Any]:
    """Parse `key=value,key=value` into a dict, skipping malformed pairs."""
    params: dict[str, Any] = {}
    if not raw:
        return params
    for chunk in raw.split(","):
        if "=" not in chunk:
            continue
        key, _, value = chunk.partition("=")
        key = key.strip()
        if key:
            params[key] = _coerce(value)
    return params


def parse_actions(text: str) -> list[ActionToken]:
    """Extract every action token, in order of appearance.

    Malformed tokens do not match the pattern and are therefore ignored rather
    than raising: a typo in the template must never break message handling.
    """
    if not text:
        return []
    return [
        ActionToken(
            service=m.group("service"),
            entity_id=m.group("entity"),
            params=_parse_params(m.group("params")),
        )
        for m in _ACTION_RE.finditer(text)
    ]


def strip_actions(text: str) -> str:
    """Remove the action tokens and tidy the whitespace they leave behind.

    Action tokens render to nothing, so the author writes the human sentence
    around them and only that sentence is sent.
    """
    if not text:
        return ""
    cleaned = _ACTION_RE.sub("", text)
    # Collapse the runs of spaces/tabs left where tokens were, but keep the
    # newlines the author typed on purpose.
    cleaned = re.sub(r"[ \t]{2,}", " ", cleaned)
    cleaned = re.sub(r"[ \t]+(\n)", r"\1", cleaned)
    cleaned = re.sub(r"(\n)[ \t]+", r"\1", cleaned)
    return cleaned.strip()


def parse_argument(message: str, keyword: str) -> float | None:
    """Read the number the sender appended after the keyword.

    `temp 21` with keyword `temp` yields 21.0. Anything that is not a plain
    number yields None, so free text can never reach a service call.
    """
    if not message or not keyword:
        return None
    text = message.strip()
    lowered = text.casefold()
    key = keyword.strip().casefold()
    if not lowered.startswith(key):
        return None
    remainder = text[len(key) :].strip()
    if not remainder:
        return None
    # Accept a comma as decimal separator, common on phone keyboards.
    candidate = remainder.split()[0].replace(",", ".")
    try:
        return float(candidate)
    except ValueError:
        return None


def apply_argument(
    params: dict[str, Any],
    value: float | None,
    minimum: float | None = None,
    maximum: float | None = None,
) -> dict[str, Any]:
    """Override the single numeric parameter with the sender's value.

    Deterministic rule, chosen to avoid any ambiguity: the override applies
    only when the token has exactly one numeric parameter. With zero or more
    than one, the sender's number is ignored and the configured defaults win.
    Out of range values are rejected the same way.
    """
    if value is None:
        return params

    numeric_keys = [k for k, v in params.items() if isinstance(v, (int, float)) and not isinstance(v, bool)]
    if len(numeric_keys) != 1:
        return params

    if minimum is not None and value < minimum:
        return params
    if maximum is not None and value > maximum:
        return params

    updated = dict(params)
    key = numeric_keys[0]
    # Preserve an integer parameter as integer when the value is a whole number.
    if isinstance(params[key], int) and float(value).is_integer():
        updated[key] = int(value)
    else:
        updated[key] = value
    return updated
