"""The diagnostic sensors, and finding them from the card.

    .venv/bin/pytest tests/test_sensors.py -v

Written because of a real failure. The card looked for an entity id ending in
"last_command", and Home Assistant builds an entity id from the entity's
*translated* name, so the real one is `sensor.gateway_last_command_received` in
English and something else again in Italian. Nothing ever matched, and a value
that is never read looks exactly like a value that never updates.
"""

from __future__ import annotations

from pytest_homeassistant_custom_component.common import (
    MockConfigEntry,
    async_mock_service,
)

from custom_components.hermes.const import (
    CMD_ID,
    CMD_KEYWORD,
    CMD_MATCH_TYPE,
    CMD_REPLY_TEMPLATE,
    CMD_REPLY_TO,
    CMD_SERVICE,
    CMD_TARGET,
    CONF_AUTHORIZED_NODES,
    CONF_CHANNEL_INDEX,
    CONF_COMMANDS,
    CONF_GATEWAY_NODE_ID,
    CONF_INITIAL_DELAY,
    CONF_MODE,
    CONF_PART_DELAY,
    DOMAIN,
    MATCH_EXACT,
    MESHTASTIC_DOMAIN,
    MODE_DIRECT,
    REPLY_CHANNEL,
    SERVICE_SEND_TEXT,
)
from custom_components.hermes.websocket import _entry_payload, _sensor_ids

GATEWAY = 1128074276
FRIEND = 2233445566


async def setup_gateway(hass) -> MockConfigEntry:
    """A loaded gateway with one command, through the real setup."""
    entry = MockConfigEntry(
        domain=DOMAIN,
        title="Gateway",
        data={
            CONF_GATEWAY_NODE_ID: GATEWAY,
            CONF_MODE: MODE_DIRECT,
            CONF_AUTHORIZED_NODES: [FRIEND],
        },
        options={
            CONF_GATEWAY_NODE_ID: GATEWAY,
            CONF_MODE: MODE_DIRECT,
            CONF_CHANNEL_INDEX: None,
            CONF_AUTHORIZED_NODES: [FRIEND],
            CONF_INITIAL_DELAY: 0,
            CONF_PART_DELAY: 0,
            CONF_COMMANDS: [
                {
                    CMD_ID: "c1",
                    CMD_KEYWORD: "lights off",
                    CMD_MATCH_TYPE: MATCH_EXACT,
                    CMD_SERVICE: "light.turn_off",
                    CMD_TARGET: {"entity_id": "light.kitchen"},
                    CMD_REPLY_TEMPLATE: "Done.",
                    CMD_REPLY_TO: REPLY_CHANNEL,
                }
            ],
        },
    )
    entry.add_to_hass(hass)
    assert await hass.config_entries.async_setup(entry.entry_id)
    await hass.async_block_till_done()
    return entry


async def send(hass, message_id: int = 5150) -> None:
    hass.bus.async_fire(
        "meshtastic_api_text_message",
        {
            "message_id": message_id,
            "data": {
                "gateway": GATEWAY,
                "from": FRIEND,
                "message": "lights off",
                "to": {"node": GATEWAY, "channel": None},
            },
        },
    )
    await hass.async_block_till_done()
    await hass.async_block_till_done()


async def test_the_card_is_told_where_the_sensors_are(hass):
    """The fix: resolved through the unique id, not guessed from the name."""
    entry = await setup_gateway(hass)
    sensors = _entry_payload(hass, entry)["sensors"]

    for kind in ("commands_executed", "last_command", "last_error"):
        assert sensors[kind], f"{kind} not reported"
        assert hass.states.get(sensors[kind]) is not None


async def test_the_reported_ids_are_not_guessable_by_suffix(hass):
    """Guards the reason this exists, so nobody reintroduces the shortcut.

    If this ever starts passing the other way, the entity naming changed and
    the old suffix search would look like it works again. It did not work.
    """
    entry = await setup_gateway(hass)
    sensors = _sensor_ids(hass, entry)

    assert not sensors["last_command"].endswith("last_command")
    assert not sensors["last_error"].endswith("last_error")


async def test_the_sensors_move_when_a_command_runs(hass):
    lights = async_mock_service(hass, "light", "turn_off")
    async_mock_service(hass, MESHTASTIC_DOMAIN, SERVICE_SEND_TEXT)

    entry = await setup_gateway(hass)
    sensors = _sensor_ids(hass, entry)
    assert hass.states.get(sensors["commands_executed"]).state == "0"

    await send(hass)

    assert len(lights) == 1
    assert hass.states.get(sensors["commands_executed"]).state == "1"
    assert hass.states.get(sensors["last_command"]).state == "lights off"


async def test_the_counter_climbs_with_each_command(hass):
    async_mock_service(hass, "light", "turn_off")
    async_mock_service(hass, MESHTASTIC_DOMAIN, SERVICE_SEND_TEXT)

    entry = await setup_gateway(hass)
    sensors = _sensor_ids(hass, entry)

    await send(hass, message_id=1)
    await send(hass, message_id=2)

    assert hass.states.get(sensors["commands_executed"]).state == "2"
