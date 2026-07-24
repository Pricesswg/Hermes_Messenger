"""Curated catalogue of actions offered by the card, per entity domain.

The card turns each entry into a button labelled in plain words, so the user
never has to know that "turn the kitchen light off" is `light.turn_off`.
Clicking a button writes a self contained token into the message template.

This mirrors the approach of the sibling project Chronos Scheduler
(`ACTIONS_BY_TYPE`): a curated list with human labels beats introspecting every
service, because most services are noise for an end user and their names are
not self explanatory.

Shape of an action:
    id       stable identifier
    label    English label; the card translates it through its own i18n
    service  the real service the token will carry
    value    optional parameter descriptor:
             key, type (number|enum), unit, min, max, step, default, options
"""

from __future__ import annotations

from typing import Any

# Home Assistant domains that behave the same way are grouped under one type.
DOMAIN_TO_TYPE: dict[str, str] = {
    "light": "light",
    "switch": "switch",
    "input_boolean": "switch",
    "fan": "fan",
    "climate": "climate",
    "water_heater": "water_heater",
    "cover": "cover",
    "lock": "lock",
    "scene": "scene",
    "script": "script",
    "automation": "automation",
    "vacuum": "vacuum",
    "media_player": "media_player",
    "valve": "valve",
    "button": "button",
}

ACTIONS_BY_TYPE: dict[str, list[dict[str, Any]]] = {
    "light": [
        {"id": "turn_on", "label": "Turn on", "service": "light.turn_on"},
        {
            "id": "turn_on_brightness",
            "label": "Turn on at brightness",
            "service": "light.turn_on",
            "value": {
                "key": "brightness_pct",
                "type": "number",
                "unit": "%",
                "min": 1,
                "max": 100,
                "step": 1,
                "default": 80,
            },
        },
        {"id": "turn_off", "label": "Turn off", "service": "light.turn_off"},
        {"id": "toggle", "label": "Toggle", "service": "light.toggle"},
    ],
    "switch": [
        {"id": "turn_on", "label": "Turn on", "service": "homeassistant.turn_on"},
        {"id": "turn_off", "label": "Turn off", "service": "homeassistant.turn_off"},
        {"id": "toggle", "label": "Toggle", "service": "homeassistant.toggle"},
    ],
    "fan": [
        {"id": "turn_on", "label": "Turn on", "service": "fan.turn_on"},
        {
            "id": "set_speed",
            "label": "Set speed",
            "service": "fan.set_percentage",
            "value": {
                "key": "percentage",
                "type": "number",
                "unit": "%",
                "min": 0,
                "max": 100,
                "step": 10,
                "default": 50,
            },
        },
        {"id": "turn_off", "label": "Turn off", "service": "fan.turn_off"},
    ],
    "climate": [
        {
            "id": "set_temperature",
            "label": "Set temperature",
            "service": "climate.set_temperature",
            "value": {
                "key": "temperature",
                "type": "number",
                "unit": "C",
                "min": 5,
                "max": 35,
                "step": 0.5,
                "default": 21,
            },
        },
        {
            "id": "set_hvac_mode",
            "label": "Set mode",
            "service": "climate.set_hvac_mode",
            "value": {
                "key": "hvac_mode",
                "type": "enum",
                "options": ["heat", "cool", "heat_cool", "dry", "fan_only", "auto", "off"],
                "default": "heat",
            },
        },
        {"id": "turn_on", "label": "Turn on", "service": "climate.turn_on"},
        {"id": "turn_off", "label": "Turn off", "service": "climate.turn_off"},
    ],
    "water_heater": [
        {
            "id": "set_temperature",
            "label": "Set temperature",
            "service": "water_heater.set_temperature",
            "value": {
                "key": "temperature",
                "type": "number",
                "unit": "C",
                "min": 30,
                "max": 75,
                "step": 1,
                "default": 55,
            },
        },
        {"id": "turn_off", "label": "Turn off", "service": "water_heater.turn_off"},
    ],
    "cover": [
        {"id": "open", "label": "Open", "service": "cover.open_cover"},
        {"id": "close", "label": "Close", "service": "cover.close_cover"},
        {"id": "stop", "label": "Stop", "service": "cover.stop_cover"},
        {
            "id": "set_position",
            "label": "Set position",
            "service": "cover.set_cover_position",
            "value": {
                "key": "position",
                "type": "number",
                "unit": "%",
                "min": 0,
                "max": 100,
                "step": 5,
                "default": 100,
            },
        },
    ],
    "valve": [
        {"id": "open", "label": "Open", "service": "valve.open_valve"},
        {"id": "close", "label": "Close", "service": "valve.close_valve"},
    ],
    "lock": [
        {"id": "lock", "label": "Lock", "service": "lock.lock"},
        {"id": "unlock", "label": "Unlock", "service": "lock.unlock"},
    ],
    "scene": [
        {"id": "activate", "label": "Activate scene", "service": "scene.turn_on"},
    ],
    "script": [
        {"id": "run", "label": "Run script", "service": "script.turn_on"},
    ],
    "automation": [
        {"id": "trigger", "label": "Trigger automation", "service": "automation.trigger"},
        {"id": "turn_on", "label": "Enable automation", "service": "automation.turn_on"},
        {"id": "turn_off", "label": "Disable automation", "service": "automation.turn_off"},
    ],
    "vacuum": [
        {"id": "start", "label": "Start cleaning", "service": "vacuum.start"},
        {"id": "pause", "label": "Pause", "service": "vacuum.pause"},
        {"id": "return_home", "label": "Return to dock", "service": "vacuum.return_to_base"},
    ],
    "media_player": [
        {"id": "play", "label": "Play", "service": "media_player.media_play"},
        {"id": "pause", "label": "Pause", "service": "media_player.media_pause"},
        {
            "id": "set_volume",
            "label": "Set volume",
            "service": "media_player.volume_set",
            "value": {
                "key": "volume_level",
                "type": "number",
                "unit": "",
                "min": 0,
                "max": 1,
                "step": 0.05,
                "default": 0.3,
            },
        },
        {"id": "turn_off", "label": "Turn off", "service": "media_player.turn_off"},
    ],
    "button": [
        {"id": "press", "label": "Press", "service": "button.press"},
    ],
}

# Domains with no dedicated entry still get the generic on/off/toggle, which
# work across almost every domain in Home Assistant.
GENERIC_ACTIONS: list[dict[str, Any]] = [
    {"id": "turn_on", "label": "Turn on", "service": "homeassistant.turn_on"},
    {"id": "turn_off", "label": "Turn off", "service": "homeassistant.turn_off"},
    {"id": "toggle", "label": "Toggle", "service": "homeassistant.toggle"},
]


def actions_for_domain(domain: str) -> list[dict[str, Any]]:
    """Actions offered for an entity domain, generic ones as fallback."""
    return ACTIONS_BY_TYPE.get(DOMAIN_TO_TYPE.get(domain, ""), GENERIC_ACTIONS)


def value_spec(service: str, key: str) -> dict[str, Any] | None:
    """Find the value descriptor of a service parameter, if the catalogue has one.

    Used to validate a number supplied by the mesh sender against min and max
    before it reaches a service call.
    """
    for actions in ACTIONS_BY_TYPE.values():
        for action in actions:
            spec = action.get("value")
            if action["service"] == service and spec and spec.get("key") == key:
                return spec
    return None
