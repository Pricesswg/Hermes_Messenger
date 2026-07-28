"""Tests for the path a mesh message takes through the coordinator.

    .venv/bin/pytest tests/test_coordinator.py -v

This is the part of Hermes that turns a text message into a Home Assistant
action, so most of what is checked here is what it refuses to do: the wrong
gateway, the wrong channel, an unknown sender, too many commands. The pure
modules underneath (matching, tokens, message splitting) have their own tests;
these are about the decisions the coordinator makes with them.

Deliberately no fake coordinator: it calls real services on a real hass, and
the tests assert on the calls that came out.
"""

from __future__ import annotations

import pytest
from pytest_homeassistant_custom_component.common import (
    MockConfigEntry,
    async_mock_service,
)

from custom_components.hermes.const import (
    CMD_AUTH_OVERRIDE,
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
    CONF_HELP_KEYWORD,
    CONF_INITIAL_DELAY,
    CONF_MODE,
    CONF_PART_DELAY,
    CONF_RATE_LIMIT,
    DATA_STORE,
    DOMAIN,
    MATCH_EXACT,
    MATCH_STARTSWITH,
    MESHTASTIC_DOMAIN,
    MODE_CHANNEL,
    MODE_DIRECT,
    REPLY_CHANNEL,
    SERVICE_SEND_TEXT,
)
from custom_components.hermes import _async_register_mesh_listener
from custom_components.hermes.coordinator import HermesCoordinator
from custom_components.hermes.store import HermesStore

GATEWAY = 1128074276
FRIEND = 2233445566
STRANGER = 4000000001


def command(**overrides):
    """A minimal command, overridable field by field."""
    base = {
        CMD_ID: "cmd1",
        CMD_KEYWORD: "lights off",
        CMD_MATCH_TYPE: MATCH_EXACT,
        CMD_SERVICE: "light.turn_off",
        CMD_TARGET: {"entity_id": "light.kitchen"},
        CMD_REPLY_TEMPLATE: "Done.",
        CMD_REPLY_TO: REPLY_CHANNEL,
    }
    base.update(overrides)
    return base


async def build(hass, **options) -> HermesCoordinator:
    """A coordinator wired to a real store, ready to receive messages.

    The delays default to zero: they are what the radio needs, not what a test
    needs, and five real seconds per reply would make this suite useless.
    """
    settings = {
        CONF_GATEWAY_NODE_ID: GATEWAY,
        CONF_MODE: MODE_DIRECT,
        CONF_CHANNEL_INDEX: None,
        CONF_AUTHORIZED_NODES: [FRIEND],
        CONF_COMMANDS: [command()],
        CONF_INITIAL_DELAY: 0,
        CONF_PART_DELAY: 0,
        CONF_RATE_LIMIT: 6,
    }
    settings.update(options)

    entry = MockConfigEntry(domain=DOMAIN, data={}, options=settings, title="Gateway")
    entry.add_to_hass(hass)

    store = HermesStore(hass)
    await store.async_load()
    hass.data[DATA_STORE] = store

    coordinator = HermesCoordinator(hass, entry)
    hass.data.setdefault(DOMAIN, {})[entry.entry_id] = coordinator
    # The real subscription, not a direct call into the coordinator: the shared
    # listener is itself something that has broken before.
    _async_register_mesh_listener(hass)
    return coordinator


def message(**overrides) -> dict:
    """The event payload shape the base integration really emits."""
    data = {
        "gateway": GATEWAY,
        "from": FRIEND,
        "message": "lights off",
        "to": {"node": GATEWAY, "channel": None},
    }
    data.update(overrides)
    return {"data": data}


async def deliver(hass, coordinator, payload: dict) -> None:
    """Fire one mesh event and let every task it starts finish."""
    hass.bus.async_fire("meshtastic_api_text_message", payload)
    await hass.async_block_till_done()
    # Replies are background tasks on purpose, so the bus is never blocked by
    # the radio delays. Waiting twice lets them run and settle.
    await hass.async_block_till_done()


@pytest.fixture
def lights(hass):
    """Records calls to light.turn_off without needing a light integration."""
    return async_mock_service(hass, "light", "turn_off")


@pytest.fixture
def sent(hass):
    """Records what Hermes handed to the Meshtastic integration to transmit."""
    return async_mock_service(hass, MESHTASTIC_DOMAIN, SERVICE_SEND_TEXT)


# --- The happy path --------------------------------------------------------


async def test_authorized_command_runs_and_replies(hass, lights, sent):
    coordinator = await build(hass)
    await deliver(hass, coordinator, message())

    assert len(lights) == 1
    assert lights[0].data["entity_id"] == "light.kitchen"
    assert len(sent) == 1
    assert sent[0].data["text"] == "Done."
    assert coordinator.seen_counts.get("accepted") == 1


async def test_the_counter_and_the_last_command_are_recorded(hass, lights, sent):
    coordinator = await build(hass)
    await deliver(hass, coordinator, message())

    assert coordinator.commands_executed == 1
    assert coordinator.last_command["text"] == "lights off"
    assert coordinator.last_command["node"] == FRIEND


# --- What it refuses to do -------------------------------------------------


async def test_unauthorized_sender_gets_silence(hass, lights, sent):
    """No action, and no reply either: a reply confirms someone is listening."""
    coordinator = await build(hass)
    await deliver(hass, coordinator, message(**{"from": STRANGER}))

    assert not lights
    assert not sent
    assert coordinator.last_error["reason"] == "authorization rejected"


async def test_a_message_through_another_gateway_is_ignored(hass, lights, sent):
    coordinator = await build(hass)
    await deliver(hass, coordinator, message(gateway=999))

    assert not lights
    assert not sent
    assert coordinator.seen_counts.get("other_gateway") == 1
    assert coordinator.last_seen["reason"] == "other_gateway"


async def test_channel_gateway_ignores_another_channel(hass, lights, sent):
    coordinator = await build(
        hass, **{CONF_MODE: MODE_CHANNEL, CONF_CHANNEL_INDEX: 1}
    )
    await deliver(hass, coordinator, message(to={"node": None, "channel": 3}))

    assert not lights
    assert coordinator.seen_counts.get("other_target") == 1


async def test_channel_gateway_accepts_its_own_channel(hass, lights, sent):
    coordinator = await build(
        hass, **{CONF_MODE: MODE_CHANNEL, CONF_CHANNEL_INDEX: 1}
    )
    await deliver(hass, coordinator, message(to={"node": None, "channel": 1}))

    assert len(lights) == 1


async def test_a_direct_message_gateway_ignores_channel_traffic(hass, lights, sent):
    """The security property: a DM gateway takes orders from nobody else."""
    coordinator = await build(hass)
    await deliver(hass, coordinator, message(to={"node": None, "channel": 0}))

    assert not lights
    assert coordinator.seen_counts.get("other_target") == 1


async def test_an_unknown_keyword_does_nothing(hass, lights, sent):
    coordinator = await build(hass)
    await deliver(hass, coordinator, message(message="open the gate"))

    assert not lights
    assert not sent


async def test_the_rate_limit_stops_a_flood(hass, lights, sent):
    coordinator = await build(hass, **{CONF_RATE_LIMIT: 2})
    for _ in range(4):
        await deliver(hass, coordinator, message())

    assert len(lights) == 2
    assert coordinator.last_error["reason"] == "rate limit reached"


async def test_a_command_whitelist_overrides_the_default_one(hass, lights, sent):
    """A command may narrow the senders allowed to run it."""
    coordinator = await build(
        hass,
        **{CONF_COMMANDS: [command(**{CMD_AUTH_OVERRIDE: [STRANGER]})]},
    )
    await deliver(hass, coordinator, message())

    assert not lights, "the default whitelist must not win over the override"

    await deliver(hass, coordinator, message(**{"from": STRANGER}))
    assert len(lights) == 1


# --- Robustness ------------------------------------------------------------


async def test_a_payload_in_an_unexpected_shape_is_counted_not_fatal(hass, lights):
    coordinator = await build(hass)
    await deliver(hass, coordinator, {"data": "not a dict"})

    assert coordinator.seen_counts.get("malformed") == 1
    assert coordinator.seen_counts.get("received") == 1


async def test_a_failing_service_still_lets_the_reply_go_out(hass, sent):
    """A broken action is reported, it does not swallow the answer."""

    async def _boom(call):
        raise ValueError("no such entity")

    hass.services.async_register("light", "turn_off", _boom)
    coordinator = await build(hass)
    await deliver(hass, coordinator, message())

    assert "service execution" in coordinator.last_error["reason"]
    assert len(sent) == 1


async def test_a_handler_failure_is_recorded_where_the_user_looks(hass, monkeypatch):
    """An exception must land in the panel, not only in the Home Assistant log."""
    coordinator = await build(hass)

    def _explode(_data):
        raise RuntimeError("boom")

    monkeypatch.setattr(coordinator, "_remember_chat", _explode)
    await deliver(hass, coordinator, message())

    assert coordinator.seen_counts.get("error") == 1
    assert "handler failed" in coordinator.last_error["reason"]


# --- Replies ---------------------------------------------------------------


async def test_a_private_command_is_answered_privately(hass, lights, sent):
    """Even when the command asks for a channel: the reply carries house state."""
    coordinator = await build(
        hass, **{CONF_COMMANDS: [command(**{CMD_REPLY_TO: REPLY_CHANNEL})]}
    )
    await deliver(hass, coordinator, message())

    assert sent[0].data.get("to") == FRIEND
    assert "channel" not in sent[0].data


async def test_a_channel_command_is_answered_on_the_channel(hass, lights, sent):
    coordinator = await build(
        hass, **{CONF_MODE: MODE_CHANNEL, CONF_CHANNEL_INDEX: 2}
    )
    await deliver(hass, coordinator, message(to={"node": None, "channel": 2}))

    assert sent[0].data.get("channel") == 2
    assert "to" not in sent[0].data


async def test_a_reply_reads_live_state(hass, sent):
    hass.states.async_set("sensor.living_room", "21.5")
    coordinator = await build(
        hass,
        **{
            CONF_COMMANDS: [
                command(
                    **{
                        CMD_KEYWORD: "temp",
                        CMD_SERVICE: "",
                        CMD_REPLY_TEMPLATE: "Living room: {state:sensor.living_room}C",
                    }
                )
            ]
        },
    )
    await deliver(hass, coordinator, message(message="temp"))

    assert sent[0].data["text"] == "Living room: 21.5C"


async def test_a_reply_says_the_label_instead_of_the_raw_state(hass, sent):
    """"on" is what Home Assistant stores, not what anyone wants to read."""
    hass.states.async_set("switch.pump", "on")
    coordinator = await build(
        hass,
        **{
            CONF_COMMANDS: [
                command(
                    **{
                        CMD_KEYWORD: "pump",
                        CMD_SERVICE: "",
                        CMD_REPLY_TEMPLATE: (
                            "Pump: {state:switch.pump|on=running,off=stopped}"
                        ),
                    }
                )
            ]
        },
    )
    await deliver(hass, coordinator, message(message="pump"))

    assert sent[0].data["text"] == "Pump: running"


async def test_an_unlabelled_state_still_comes_through(hass, sent):
    hass.states.async_set("cover.gate", "opening")
    coordinator = await build(
        hass,
        **{
            CONF_COMMANDS: [
                command(
                    **{
                        CMD_KEYWORD: "gate",
                        CMD_SERVICE: "",
                        CMD_REPLY_TEMPLATE: (
                            "Gate: {state:cover.gate|open=up,closed=down}"
                        ),
                    }
                )
            ]
        },
    )
    await deliver(hass, coordinator, message(message="gate"))

    assert sent[0].data["text"] == "Gate: opening"


async def test_a_long_reply_is_split_into_parts(hass, sent):
    coordinator = await build(
        hass,
        **{
            CONF_COMMANDS: [
                command(**{CMD_SERVICE: "", CMD_REPLY_TEMPLATE: "A" * 500})
            ]
        },
    )
    await deliver(hass, coordinator, message())

    assert len(sent) > 1
    assert sent[0].data["text"].startswith("(1/")


# --- Action tokens ---------------------------------------------------------


async def test_an_action_token_runs_with_the_configured_entity(hass, sent):
    calls = async_mock_service(hass, "light", "turn_on")
    coordinator = await build(
        hass,
        **{
            CONF_COMMANDS: [
                command(
                    **{
                        CMD_KEYWORD: "lights on",
                        CMD_SERVICE: "",
                        CMD_REPLY_TEMPLATE: "{do:light.turn_on:light.kitchen}On.",
                    }
                )
            ]
        },
    )
    await deliver(hass, coordinator, message(message="lights on"))

    assert len(calls) == 1
    assert calls[0].data["entity_id"] == "light.kitchen"
    # The token itself renders to nothing: only the sentence is transmitted.
    assert sent[0].data["text"] == "On."


async def test_a_number_from_the_message_overrides_the_default(hass, sent):
    calls = async_mock_service(hass, "climate", "set_temperature")
    coordinator = await build(
        hass,
        **{
            CONF_COMMANDS: [
                command(
                    **{
                        CMD_KEYWORD: "temp",
                        CMD_MATCH_TYPE: MATCH_STARTSWITH,
                        CMD_SERVICE: "",
                        CMD_REPLY_TEMPLATE: (
                            "{do:climate.set_temperature:climate.hall:temperature=18}Set."
                        ),
                    }
                )
            ]
        },
    )
    await deliver(hass, coordinator, message(message="temp 23"))

    assert calls[0].data["temperature"] == 23


async def test_a_number_outside_the_range_falls_back_to_the_default(hass, sent):
    """The sender supplies a number, never a bound: 300 degrees is refused."""
    calls = async_mock_service(hass, "climate", "set_temperature")
    hass.states.async_set(
        "climate.hall", "heat", {"min_temp": 7, "max_temp": 35}
    )
    coordinator = await build(
        hass,
        **{
            CONF_COMMANDS: [
                command(
                    **{
                        CMD_KEYWORD: "temp",
                        CMD_MATCH_TYPE: MATCH_STARTSWITH,
                        CMD_SERVICE: "",
                        CMD_REPLY_TEMPLATE: (
                            "{do:climate.set_temperature:climate.hall:temperature=18}Set."
                        ),
                    }
                )
            ]
        },
    )
    await deliver(hass, coordinator, message(message="temp 300"))

    assert calls[0].data["temperature"] == 18


# --- The help keyword ------------------------------------------------------


async def test_help_answers_an_authorized_sender(hass, sent):
    coordinator = await build(hass, **{CONF_HELP_KEYWORD: "help"})
    await deliver(hass, coordinator, message(message="help"))

    assert len(sent) == 1
    assert "lights off" in sent[0].data["text"]


async def test_help_says_nothing_to_a_stranger(hass, sent):
    """Otherwise the command list is advertised to whoever asks."""
    coordinator = await build(hass, **{CONF_HELP_KEYWORD: "help"})
    await deliver(hass, coordinator, message(message="help", **{"from": STRANGER}))

    assert not sent
