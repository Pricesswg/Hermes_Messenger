# Hermes: Meshtastic Commander

![Hermes carries messages between the Meshtastic mesh and Home Assistant](assets/cover.jpg)

A custom Home Assistant integration that lets members of an encrypted Meshtastic
channel (or DM) **send text commands that run Home Assistant actions and get a
reply**, and lets Home Assistant **send broadcast notifications** onto the mesh
from any automation (including scheduled ones).

Hermes is an **application layer** on top of the official
[`meshtastic/home-assistant`](https://github.com/meshtastic/home-assistant)
integration: it does not manage the node connection (TCP/serial/BLE), it listens
to its events and uses its services. All configuration happens from the UI, with
no hand-written YAML, no raw Jinja2, and no custom Lovelace cards.

## Why the name "Hermes"?

**Hermes** (Greek Ἑρμῆς; the Roman **Mercury**) is the Greek god of **messengers,
travelers, boundaries and communication**. He is the herald of the gods, the one
who carries messages between worlds and moves swiftly across every border. His
attributes say it all: the **winged helmet** and **winged sandals** for speed,
and the **caduceus**, the herald's staff, mark of the messenger.

The name fits the integration literally. Hermes is a **herald that carries text
across a boundary**: it relays commands coming *in* from the Meshtastic LoRa mesh
and turns them into Home Assistant actions, and it carries Home Assistant's
notifications back *out* onto the mesh. Fast, lightweight, crossing between the
radio network and the smart home, exactly the messenger's job.

The name also sits alongside the sibling project *Chronos*, from the same
Greek-deity naming line.

## What it does

- **Commands to actions with a reply.** An authorized node sends a keyword on the
  channel/DM; Hermes runs the mapped Home Assistant service and sends a reply
  back over the mesh (for example `status` returns home state or sensor readings).
- **Home Assistant to mesh notifications.** The `hermes.broadcast` and
  `hermes.send_direct` services let any automation (including scheduled ones)
  push messages onto the mesh: alarms, events, reminders.
- **Byte-safe by design.** Every outgoing message is split to fit the 200-byte
  Meshtastic payload, never cutting a multi-byte character.
- **Secure-by-default posture.** A node whitelist gates commands; unauthorized
  senders are dropped silently (see *Security*).

## Requirements

- A recent Home Assistant (config flow, modern options flow, `TargetSelector`).
- **The official Meshtastic integration already installed and configured**
  (`domain: meshtastic`), with at least one connected gateway. Hermes depends on
  its `meshtastic_api_text_message` event and its `meshtastic.send_text` service.
- Meshtastic firmware with PKC (≥ 2.5) if you want to use DMs as a trustworthy
  channel (see *Security*).

## Installation (HACS, private custom repository)

While the repo is private:

1. HACS, ⋮ menu, **Custom repositories**.
2. Add the repo URL (category **Integration**). For a private repo HACS needs
   access: configure a GitHub **Personal Access Token** with the `repo` scope in
   the HACS settings, or make the repo public.
3. Install "Hermes", restart Home Assistant.
4. **Settings, Devices & Services, Add Integration, Hermes**.

When the repo becomes public, no extra packaging is needed: `hacs.json` is
already in place.

## Configuration

### Initial step (config flow)

| Field | Description |
|-------|-------------|
| **Gateway node ID** | Node id of the Meshtastic gateway to operate from/to. |
| **Mode** | `Channel (broadcast)` or `Direct message (DM)`. |
| **Channel index** | 0-7, used only in channel mode. |
| **Authorized node IDs** | Default whitelist, comma-separated (at least one). |

To manage **multiple channels**: add the integration multiple times (one config
entry per gateway + channel/DM combination). This is native multi-instance, no
ad-hoc configuration needed.

### Commands (options flow)

**Configure, Add a command.** Each command:

| Field | Notes |
|-------|-------|
| **Keyword** | for example `status`, `lights off`. |
| **Match type** | `Exact match` or `Starts with`. |
| **Service** | `domain.service`, for example `light.turn_off`. |
| **Target** | Entity or area (native selector). |
| **Reply template** | Simple placeholders (below). |
| **Reply routing** | On channel (broadcast) or DM to the sender. |
| **Service data** | Optional, advanced (dict). |
| **Authorized nodes override** | Optional: whitelist specific to this command. |

Commands are **editable without restarting** the integration.

#### Reply template placeholders

No Jinja2: just two placeholders, resolved internally.

- `{state:entity_id}` resolves to the entity state, for example `{state:sensor.living_room_temp}`
- `{attr:entity_id:attribute}` resolves to an attribute value, for example `{attr:climate.living_room:temperature}`

Example reply: `Living room: {state:sensor.living_room_temp}°C, lights {state:light.living_room}`

## Services (for automations, including scheduled ones)

The "scheduling feature" is obtained by composing standard HA automations with
these services. There is no internal scheduler.

- **`hermes.broadcast`**: `config_entry_id`, `message`. Sends on the entry's channel/DM.
- **`hermes.send_direct`**: `config_entry_id`, `node_id`, `message`. DM to a single node.

Both pass through the byte-safe split engine (≤ 200 bytes per part, `(i/n) `
header, no multi-byte character cut in half).

```yaml
# Example: scheduled notification every evening at 22:00
automation:
  - alias: "Meshtastic: evening reminder"
    triggers:
      - trigger: time
        at: "22:00:00"
    actions:
      - action: hermes.broadcast
        data:
          config_entry_id: <HERMES_ENTRY_ID>
          message: "Good night, gates closing in 10 minutes."
```

## Diagnostic entities

Under the config entry's device (native device page):

- **Last command received**: text, sender node and timestamp (attributes).
- **Commands executed**: counter with a daily reset.
- **Last error / auth rejection**: handy for debugging without reading the logs.

## Security: channel vs DM+PKC

> **Read before exposing sensitive actions.**

- **On a broadcast channel** the only protection is the **channel PSK**: anyone
  who knows it can send commands with a **declared but not cryptographically
  proven** `from`. The node whitelist here is a **weak** protection (sender
  spoofing is possible).
- **On DM with PKC** (Public Key Cryptography, firmware ≥ 2.5) the sender
  identity is guaranteed **at the protocol level** before the message even
  reaches Home Assistant. The whitelist here is **reliable**.

The whitelist should be configured in both cases anyway. For commands that
control critical entities, prefer **DM with PKC** mode. Verify the behavior on
the **firmware actually in use**: do not take it for granted.

## To tune/verify on real hardware

These values are reasonable defaults, not experimental truths:

- **Send timing** (`Configure`, `Send timing`): 5s initial wait before the first
  reply (the radio may drop immediate replies) and 2s between parts. Tune them to
  your real timings.
- **Byte limit** (200) is the documented value; confirm it with your firmware.
- **Event schema and `send_text` signature** are verified against
  `meshtastic/home-assistant` (main branch): reconfirm after a major update of
  the base integration.

## Development / testing

The split engine is pure Python and testable without Home Assistant:

```bash
python3 -m venv .venv
.venv/bin/pip install pytest
.venv/bin/pytest tests/test_message.py -v
```
