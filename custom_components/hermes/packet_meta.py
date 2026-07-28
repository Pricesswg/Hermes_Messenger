"""What a packet actually carried, as opposed to what we assumed.

Hermes has always treated a message the same whether it arrived encrypted for
this node alone, encrypted under a channel key shared with strangers, encrypted
under the key published in the Meshtastic documentation, or bridged in over the
internet through MQTT. The guide said a direct message has a sender the protocol
verified, which is true of the protocol and was never true of Hermes: nothing
here ever checked that public key cryptography had been used at all.

It can be checked. Besides the text event, the base integration publishes
`meshtastic_api_packet` for every packet with the whole thing converted to a
dictionary, and that carries the fields the text event drops: whether it was PKC
encrypted, whether it came in over MQTT, when the radio received it, how many
hops it took. The text event carries the packet id, and so does this one, so the
two can be matched.

The extraction is pure and tested; the subscription and the expiry live here
because they need Home Assistant.
"""

from __future__ import annotations

import asyncio
import logging
from typing import Any

from homeassistant.core import Event, HomeAssistant, callback

from .const import DATA_PACKET_META, EVENT_PACKET

_LOGGER = logging.getLogger(__name__)

# Long enough that the metadata is still there when the text event is handled,
# short enough that a busy mesh does not accumulate. The two events are matched
# within milliseconds in practice.
TTL_SECONDS = 120.0
CAP = 512

# How long to wait for the metadata of a packet that has not arrived yet. The
# two events come from different paths inside the base integration and nothing
# orders them, so the text can win the race. A reply already waits five seconds
# before transmitting, which makes this invisible.
GRACE_SECONDS = 1.0
_POLL_SECONDS = 0.05


def extract(packet: Any) -> tuple[int, dict[str, Any]] | None:
    """The id and the interesting fields of a packet dictionary.

    None when there is no usable id, since without one the record could never
    be matched to a message anyway.

    A note on the missing fields: the conversion the base integration uses
    omits anything left at its default, so `pkiEncrypted` absent means false,
    not unknown. That is the correct reading and it is not obvious, which is
    why it is written down here rather than discovered later.
    """
    if not isinstance(packet, dict):
        return None
    try:
        packet_id = int(packet.get("id"))
    except (TypeError, ValueError):
        return None

    return packet_id, {
        "pki_encrypted": bool(packet.get("pkiEncrypted", False)),
        "via_mqtt": bool(packet.get("viaMqtt", False)),
        "rx_time": packet.get("rxTime"),
        "hop_start": packet.get("hopStart"),
        "hop_limit": packet.get("hopLimit"),
        "snr": packet.get("rxSnr"),
    }


def store(seen: dict[int, dict[str, Any]], packet_id: int, record: dict[str, Any],
          now: float, ttl: float = TTL_SECONDS, cap: int = CAP) -> None:
    """Record metadata, evicting what is stale and then what is oldest."""
    record = {**record, "at": now}
    seen[packet_id] = record

    cutoff = now - ttl
    for stale in [pid for pid, rec in seen.items() if rec["at"] <= cutoff]:
        del seen[stale]

    excess = len(seen) - cap
    if excess > 0:
        for oldest in sorted(seen, key=lambda pid: seen[pid]["at"])[:excess]:
            del seen[oldest]


@callback
def async_register(hass: HomeAssistant) -> None:
    """Subscribe once, for the whole integration."""
    if DATA_PACKET_META in hass.data:
        return

    seen: dict[int, dict[str, Any]] = {}
    hass.data[DATA_PACKET_META] = seen

    @callback
    def _remember(event: Event) -> None:
        found = extract(event.data.get("data"))
        if found is None:
            return
        packet_id, record = found
        store(seen, packet_id, record, hass.loop.time())

    hass.bus.async_listen(EVENT_PACKET, _remember)


async def async_lookup(
    hass: HomeAssistant, packet_id: int | None, grace: float = GRACE_SECONDS
) -> dict[str, Any] | None:
    """Metadata for a packet, waiting briefly for it to turn up.

    None means it never arrived, which is not the same as "the packet had no
    protection": on an older base integration the packet event does not exist
    at all. Callers must treat None as unknown and decide accordingly, rather
    than reading it as false.
    """
    if packet_id is None:
        return None
    seen: dict[int, dict[str, Any]] | None = hass.data.get(DATA_PACKET_META)
    if seen is None:
        return None

    record = seen.get(packet_id)
    if record is not None:
        return record

    waited = 0.0
    while waited < grace:
        await asyncio.sleep(_POLL_SECONDS)
        waited += _POLL_SECONDS
        record = seen.get(packet_id)
        if record is not None:
            return record

    _LOGGER.debug("Hermes: no packet metadata for %s within %ss", packet_id, grace)
    return None
