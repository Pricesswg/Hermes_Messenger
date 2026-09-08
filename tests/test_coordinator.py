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
    CMD_CONDITION_ENTITY,
    CMD_COOLDOWN,
    CMD_ID,
    CMD_KEYWORD,
    CMD_MATCH_TYPE,
    CMD_REPLY_TEMPLATE,
    CMD_REPLY_TO,
    CMD_SERVICE,
    CMD_TARGET,
    CONF_AUTHORIZED_NODES,
    CONF_CHANNEL_INDEX,
    CONF_CHANNEL_RISK_ACK,
    CONF_COMMANDS,
    CONF_GATEWAY_NODE_ID,
    CONF_HELP_KEYWORD,
    CONF_INITIAL_DELAY,
    CONF_MAX_AGE,
    CONF_MODE,
    CONF_NODE_USERS,
    CONF_PART_DELAY,
    CONF_RATE_LIMIT,
    CONF_REJECT_MQTT,
    CONF_REQUIRE_PKC,
    DATA_CHANNELS,
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
from custom_components.hermes import _async_register_mesh_listener, packet_meta
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
    # The real subscriptions, not direct calls into the coordinator: the shared
    # listener is itself something that has broken before, and the packet
    # metadata only exists because a second one is in place.
    _async_register_mesh_listener(hass)
    packet_meta.async_register(hass)
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


_next_packet_id = iter(range(9000, 99000))


async def deliver(hass, coordinator, payload: dict, message_id: int | None = None) -> None:
    """Fire one mesh event and let every task it starts finish.

    Each delivery gets a fresh packet id unless one is given, which is what the
    radio does: two genuine sends are two packets. Passing the same id twice is
    how a replay is expressed.
    """
    payload = {
        **payload,
        "message_id": next(_next_packet_id) if message_id is None else message_id,
    }
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


async def test_the_same_packet_twice_runs_once(hass, lights, sent):
    """The cheapest attack on a mesh: record a packet, transmit it again.

    No key and no decryption needed, and the sender is the legitimate node, so
    the authorized list waves it through. Only the packet id tells them apart.
    """
    coordinator = await build(hass)
    await deliver(hass, coordinator, message(), message_id=4242)
    await deliver(hass, coordinator, message(), message_id=4242)

    assert len(lights) == 1
    assert coordinator.seen_counts.get("replay") == 1


async def test_asking_twice_is_not_a_replay(hass, lights, sent):
    """The property that lets the check be strict without false positives."""
    coordinator = await build(hass)
    await deliver(hass, coordinator, message(), message_id=1)
    await deliver(hass, coordinator, message(), message_id=2)

    assert len(lights) == 2
    assert not coordinator.seen_counts.get("replay")


async def test_a_replay_never_reaches_the_conversation(hass, lights, sent):
    """It is not a message that happened, so it must not look like one."""
    coordinator = await build(hass)
    await deliver(hass, coordinator, message(), message_id=77)
    await deliver(hass, coordinator, message(), message_id=77)

    store = hass.data[DATA_STORE]
    incoming = [
        m for m in store.chats.get(f"node:{FRIEND}", []) if not m["outgoing"]
    ]
    assert len(incoming) == 1


async def test_an_event_with_no_packet_id_still_works_and_says_so(hass, lights, sent):
    """An older base integration must keep working, visibly unprotected."""
    coordinator = await build(hass)
    hass.bus.async_fire("meshtastic_api_text_message", message())
    await hass.async_block_till_done()
    await hass.async_block_till_done()

    assert len(lights) == 1
    assert coordinator.replay_protected is False


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


# --- What the packet actually was ------------------------------------------


def packet(message_id: int, **fields) -> dict:
    """The shape the base integration publishes on its per packet event."""
    return {"data": {"id": message_id, **fields}}


async def announce(hass, message_id: int, **fields) -> None:
    """Publish the metadata of a packet, as the base integration does."""
    hass.bus.async_fire("meshtastic_api_packet", packet(message_id, **fields))
    await hass.async_block_till_done()


async def test_require_pkc_refuses_a_message_that_was_not_encrypted_for_us(
    hass, lights, sent
):
    """The gap this closes: we claimed the sender was verified, never checked."""
    coordinator = await build(hass, **{CONF_REQUIRE_PKC: True})
    await announce(hass, 555, pkiEncrypted=False)
    await deliver(hass, coordinator, message(), message_id=555)

    assert not lights
    assert "not encrypted for this node alone" in coordinator.last_error["reason"]


async def test_require_pkc_lets_a_properly_encrypted_message_through(
    hass, lights, sent
):
    coordinator = await build(hass, **{CONF_REQUIRE_PKC: True})
    await announce(hass, 556, pkiEncrypted=True)
    await deliver(hass, coordinator, message(), message_id=556)

    assert len(lights) == 1


async def test_require_pkc_refuses_when_it_cannot_tell(hass, lights, sent):
    """No metadata is not proof of safety, so it must not be read as one."""
    coordinator = await build(hass, **{CONF_REQUIRE_PKC: True})
    await deliver(hass, coordinator, message(), message_id=557)

    assert not lights
    assert "could not be verified" in coordinator.last_error["reason"]


async def test_without_the_switch_nothing_changes(hass, lights, sent):
    """Off by default: the field depends on firmware we cannot check from here."""
    coordinator = await build(hass)
    await deliver(hass, coordinator, message(), message_id=558)

    assert len(lights) == 1


async def test_an_mqtt_bridged_packet_can_be_refused(hass, lights, sent):
    coordinator = await build(hass, **{CONF_REJECT_MQTT: True})
    await announce(hass, 559, viaMqtt=True)
    await deliver(hass, coordinator, message(), message_id=559)

    assert not lights
    assert "MQTT" in coordinator.last_error["reason"]


async def test_a_stale_packet_can_be_refused(hass, lights, sent):
    import time

    coordinator = await build(hass, **{CONF_MAX_AGE: 60})
    await announce(hass, 560, rxTime=int(time.time()) - 3600)
    await deliver(hass, coordinator, message(), message_id=560)

    assert not lights
    assert "too old" in coordinator.last_error["reason"]


# --- Command policies ------------------------------------------------------


async def test_a_command_does_not_run_while_its_condition_is_off(hass, lights, sent):
    """A replay at three in the morning does nothing when the switch is off."""
    hass.states.async_set("input_boolean.remote", "off")
    coordinator = await build(
        hass,
        **{CONF_COMMANDS: [command(**{CMD_CONDITION_ENTITY: "input_boolean.remote"})]},
    )
    await deliver(hass, coordinator, message())

    assert not lights

    hass.states.async_set("input_boolean.remote", "on")
    await deliver(hass, coordinator, message())
    assert len(lights) == 1


async def test_a_missing_condition_entity_blocks(hass, lights, sent):
    """A guard that silently does not exist is worse than no guard."""
    coordinator = await build(
        hass,
        **{CONF_COMMANDS: [command(**{CMD_CONDITION_ENTITY: "input_boolean.gone"})]},
    )
    await deliver(hass, coordinator, message())

    assert not lights


async def test_a_cooldown_blocks_the_second_run(hass, lights, sent):
    coordinator = await build(
        hass, **{CONF_COMMANDS: [command(**{CMD_COOLDOWN: 600})]}
    )
    await deliver(hass, coordinator, message())
    await deliver(hass, coordinator, message())

    assert len(lights) == 1
    assert "less than 600s ago" in coordinator.last_error["reason"]


# --- The public channel ----------------------------------------------------


async def test_a_default_key_channel_does_not_run_commands(hass, lights, sent):
    """Anyone in the world can write there: it is a place to publish, not obey."""
    coordinator = await build(
        hass, **{CONF_MODE: MODE_CHANNEL, CONF_CHANNEL_INDEX: 3}
    )
    hass.data[DATA_CHANNELS] = {3: True}
    await deliver(hass, coordinator, message(to={"node": None, "channel": 3}))

    assert not lights
    assert "default_psk" in coordinator.last_error["reason"]


async def test_channel_zero_does_not_run_commands_either(hass, lights, sent):
    coordinator = await build(
        hass, **{CONF_MODE: MODE_CHANNEL, CONF_CHANNEL_INDEX: 0}
    )
    hass.data[DATA_CHANNELS] = {0: False}
    await deliver(hass, coordinator, message(to={"node": None, "channel": 0}))

    assert not lights
    assert "channel_zero" in coordinator.last_error["reason"]


async def test_an_accepted_risk_unblocks_that_channel(hass, lights, sent):
    coordinator = await build(
        hass,
        **{
            CONF_MODE: MODE_CHANNEL,
            CONF_CHANNEL_INDEX: 0,
            CONF_CHANNEL_RISK_ACK: {
                "accepted": True,
                "reason": "channel_zero",
                "channel": 0,
            },
        },
    )
    hass.data[DATA_CHANNELS] = {0: False}
    await deliver(hass, coordinator, message(to={"node": None, "channel": 0}))

    assert len(lights) == 1


async def test_an_acceptance_does_not_carry_to_another_channel(hass, lights, sent):
    """It was given for a situation, not for ever."""
    coordinator = await build(
        hass,
        **{
            CONF_MODE: MODE_CHANNEL,
            CONF_CHANNEL_INDEX: 3,
            CONF_CHANNEL_RISK_ACK: {
                "accepted": True,
                "reason": "channel_zero",
                "channel": 0,
            },
        },
    )
    hass.data[DATA_CHANNELS] = {3: True}
    await deliver(hass, coordinator, message(to={"node": None, "channel": 3}))

    assert not lights


async def test_a_named_channel_with_its_own_key_is_not_blocked(hass, lights, sent):
    coordinator = await build(
        hass, **{CONF_MODE: MODE_CHANNEL, CONF_CHANNEL_INDEX: 2}
    )
    hass.data[DATA_CHANNELS] = {2: False}
    await deliver(hass, coordinator, message(to={"node": None, "channel": 2}))

    assert len(lights) == 1


async def test_a_malformed_payload_is_written_to_the_log(hass, lights, sent):
    """A rising counter over an empty log reads like nothing ever arrived.

    This was the one branch that counted a message and recorded it nowhere, so
    a base integration that changed the shape of its payload looked exactly
    like a dead radio link: two opposite problems, one empty screen.
    """
    coordinator = await build(hass)
    await deliver(hass, coordinator, {"data": "not a dict at all"})

    assert coordinator.seen_counts.get("malformed") == 1
    store = hass.data[DATA_STORE]
    assert [entry["outcome"] for entry in store.history] == ["malformed"]
    # Truncated, because the payload is arbitrary and the log is persisted.
    assert len(store.history[0]["text"]) <= 200


async def test_an_event_moves_last_event_even_when_it_is_discarded(hass, lights, sent):
    """last_seen only moves past the gateway filter; this must move before it."""
    coordinator = await build(hass)
    assert coordinator.last_event is None

    await deliver(hass, coordinator, message(gateway=GATEWAY + 1))

    assert coordinator.last_event is not None
    assert coordinator.seen_counts.get("other_gateway") == 1


# --- Who the node belongs to -----------------------------------------------


async def test_a_linked_node_names_the_person_on_the_service_call(
    hass, lights, sent, hass_admin_user
):
    """The logbook should say who did it, not which number sent a packet."""
    coordinator = await build(
        hass, **{CONF_NODE_USERS: {str(FRIEND): hass_admin_user.id}}
    )
    await deliver(hass, coordinator, message())

    assert len(lights) == 1
    assert lights[0].context.user_id == hass_admin_user.id


async def test_an_unlinked_node_still_acts_as_nobody(hass, lights, sent):
    """The feature must be invisible until someone opts a node into it."""
    coordinator = await build(hass)
    await deliver(hass, coordinator, message())

    assert lights[0].context.user_id is None


async def test_a_shared_channel_keeps_the_link_as_attribution_only(
    hass, lights, sent, hass_read_only_user
):
    """The node number is a claim there, and permissions must not rest on one.

    A read only user would be refused on a proven path. Here the message was
    not encrypted for this node alone, so anyone holding the shared key could
    have sent it under that number: enforcing the person's permissions would
    dress a guess up as an identity.
    """
    coordinator = await build(
        hass, **{CONF_NODE_USERS: {str(FRIEND): hass_read_only_user.id}}
    )
    await announce(hass, 601, pkiEncrypted=False)
    await deliver(hass, coordinator, message(), message_id=601)

    assert len(lights) == 1


async def test_a_pkc_message_is_held_to_the_persons_permissions(
    hass, lights, sent, hass_read_only_user
):
    """Proven sender, so the person's own limits apply on top of the whitelist."""
    coordinator = await build(
        hass, **{CONF_NODE_USERS: {str(FRIEND): hass_read_only_user.id}}
    )
    await announce(hass, 602, pkiEncrypted=True)
    await deliver(hass, coordinator, message(), message_id=602)

    assert not lights
    assert "may not control" in coordinator.last_error["reason"]


async def test_permissions_never_widen_what_the_whitelist_allows(
    hass, lights, sent, hass_admin_user
):
    """Linking an administrator to a node must not let a stranger through."""
    coordinator = await build(
        hass, **{CONF_NODE_USERS: {str(STRANGER): hass_admin_user.id}}
    )
    await announce(hass, 603, pkiEncrypted=True)
    await deliver(hass, coordinator, message(**{"from": STRANGER}), message_id=603)

    assert not lights


async def test_the_reply_can_greet_the_person_by_name(
    hass, lights, sent, hass_admin_user
):
    coordinator = await build(
        hass,
        **{
            CONF_NODE_USERS: {str(FRIEND): hass_admin_user.id},
            CONF_COMMANDS: [command(**{CMD_REPLY_TEMPLATE: "Done, {user}."})],
        },
    )
    await deliver(hass, coordinator, message())

    assert sent[0].data["text"] == f"Done, {hass_admin_user.name}."


async def test_the_user_token_disappears_on_an_unlinked_node(hass, lights, sent):
    """A template written with {user} must still read as a sentence."""
    coordinator = await build(
        hass, **{CONF_COMMANDS: [command(**{CMD_REPLY_TEMPLATE: "Done{user}."})]}
    )
    await deliver(hass, coordinator, message())

    assert sent[0].data["text"] == "Done."


async def test_a_command_can_exist_only_to_answer(hass, lights, sent):
    """A status keyword has nothing to run: it exists to say how things are."""
    coordinator = await build(
        hass,
        **{
            CONF_COMMANDS: [
                command(
                    **{
                        CMD_KEYWORD: "status",
                        CMD_SERVICE: "",
                        CMD_TARGET: None,
                        CMD_REPLY_TEMPLATE: "All good.",
                    }
                )
            ]
        },
    )
    await deliver(hass, coordinator, message(message="status"))

    assert not lights
    assert sent[0].data["text"] == "All good."
    assert coordinator.seen_counts.get("accepted") == 1
