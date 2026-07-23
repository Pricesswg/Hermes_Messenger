# Hermes — Meshtastic Commander

A custom Home Assistant integration that lets members of an encrypted Meshtastic
channel (or DM) **send text commands that run Home Assistant actions and get a
reply**, and lets Home Assistant **send broadcast notifications** onto the mesh
from any automation (including scheduled ones).

Hermes is an **application layer** on top of the official
[`meshtastic/home-assistant`](https://github.com/meshtastic/home-assistant)
integration: it does not manage the node connection (TCP/serial/BLE), it listens
to its events and uses its services. All configuration happens from the UI — no
hand-written YAML, no raw Jinja2, no custom Lovelace cards.

## Requirements

- A recent Home Assistant (config flow, modern options flow, `TargetSelector`).
- **The official Meshtastic integration already installed and configured**
  (`domain: meshtastic`), with at least one connected gateway. Hermes depends on
  its `meshtastic_api_text_message` event and its `meshtastic.send_text` service.
- Meshtastic firmware with PKC (≥ 2.5) if you want to use DMs as a trustworthy
  channel (see *Security*).

## Installation (HACS, private custom repository)

While the repo is private:

1. HACS → ⋮ menu → **Custom repositories**.
2. Add the repo URL (category **Integration**). For a private repo HACS needs
   access: configure a GitHub **Personal Access Token** with the `repo` scope in
   the HACS settings, or make the repo public.
3. Install "Hermes", restart Home Assistant.
4. **Settings → Devices & Services → Add Integration → Hermes**.

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

**Configure → Add a command.** Each command:

| Field | Notes |
|-------|-------|
| **Keyword** | e.g. `status`, `lights off`. |
| **Match type** | `Exact match` or `Starts with`. |
| **Service** | `domain.service`, e.g. `light.turn_off`. |
| **Target** | Entity or area (native selector). |
| **Reply template** | Simple placeholders (below). |
| **Reply routing** | On channel (broadcast) or DM to the sender. |
| **Service data** | Optional, advanced (dict). |
| **Authorized nodes override** | Optional: whitelist specific to this command. |

Commands are **editable without restarting** the integration.

#### Reply template placeholders

No Jinja2: just two placeholders, resolved internally.

- `{state:entity_id}` → the entity state. e.g. `{state:sensor.living_room_temp}`
- `{attr:entity_id:attribute}` → an attribute value. e.g. `{attr:climate.living_room:temperature}`

Example reply: `Living room: {state:sensor.living_room_temp}°C, lights {state:light.living_room}`

## Services (for automations, including scheduled ones)

The "scheduling feature" is obtained by composing standard HA automations with
these services — no internal scheduler.

- **`hermes.broadcast`** — `config_entry_id`, `message`. Sends on the entry's channel/DM.
- **`hermes.send_direct`** — `config_entry_id`, `node_id`, `message`. DM to a single node.

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
          message: "Good night — gates closing in 10 minutes."
```

## Diagnostic entities

Under the config entry's device (native device page):

- **Last command received** — text, sender node and timestamp (attributes).
- **Commands executed** — counter with a daily reset.
- **Last error / auth rejection** — handy for debugging without reading the logs.

## Security — channel vs DM+PKC

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

- **Send timing** (`Configure → Send timing`): 5s initial wait before the first
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
