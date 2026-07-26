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

> **[Read the user guide](https://github.com/Pricesswg/Hermes_Messenger/blob/main/docs/USER_GUIDE.md)** for setting up, building commands, and
> working out what is wrong when nothing happens.

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

## Installation

Through HACS:

1. HACS, ⋮ menu, **Custom repositories**.
2. Add `https://github.com/Pricesswg/Hermes_Messenger`, category **Integration**.
3. Install Hermes, restart Home Assistant.
4. **Settings, Devices and Services, Add Integration, Hermes**.

The Lovelace card registers itself, so there is no resource to add by hand. Add
it to a dashboard from **Add card**, searching for **Hermes**.

After any update, restart Home Assistant and hard refresh the page: Python only
changes on a restart and the card is cached by the browser.

## Configuration

Everything is configured from the card, with no YAML. Pick the gateway node, the
mode (a channel or direct messages), the channel, and which nodes are allowed to
send commands.

Commands are built by picking an entity and clicking buttons: **Read** buttons
insert a live value into the reply, **Do** buttons run something. You never type
a service name, and values are offered within the range your device actually
accepts.

The [user guide](docs/USER_GUIDE.md) walks through all of it, with worked
examples for a toggle, a status reply, and a command that takes a number from the
message.

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

### Where a reply can go

The channel a gateway listens on is a boundary, not a preference. A command that
arrives on any other channel is ignored without an answer: a stranger on a
channel Hermes was not told to listen to gets silence, not a reply that would
reveal a Home Assistant sitting behind that node.

For the same reason a command that arrived as a direct message is always
answered privately. Broadcasting the answer of a private exchange onto a channel
would publish the state of the house to everyone listening on it, so a reply
channel configured on a command deliberately does not override that.

A command heard on a channel can be told to answer on a different one, which is
useful to keep replies off a busy channel. The reply then goes only there.

The whitelist should be configured in both cases anyway. For commands that
control critical entities, prefer **DM with PKC** mode. Verify the behavior on
the **firmware actually in use**: do not take it for granted.

## After updating

Restart Home Assistant, then reload the browser page with a hard refresh
(Ctrl+Shift+R, or Cmd+Shift+R on a Mac).

The reason is that the card is a JavaScript module the browser caches, and the
running Home Assistant keeps advertising the URL it was given at startup. Until
it restarts it cannot announce the new one, so the browser has no reason to
fetch the new bundle. Hermes serves the card from a copy in `/config/www` rather
than from inside its own folder, precisely because HACS deletes and rewrites
that folder during an update: the copy keeps the last working bundle available
instead of answering 404 while the files are being swapped. If the card still
reports itself as an unknown element, the console shows which version was
loaded, printed as `HERMES-CARD <version>`.

## Firmware, before you blame the integration

Two failure modes look like a bug in Hermes and are not.

- **Keep the firmware aligned.** Every node and repeater should run the same
  firmware version, or versions known to be compatible. Mixed versions produce
  the confusing case where a message reaches one node and not another, and no
  amount of configuration on the Home Assistant side fixes it.
- **Direct messages need a recent firmware on both ends.** Since the move to
  public key cryptography, a DM sent to or from a node running an older build
  cannot be decrypted by the other end. The message never reaches Home
  Assistant, so no entity changes state and nothing appears in the Hermes log.
  If a node cannot be updated, use a channel for it instead of DMs.

Home Assistant only learns the firmware version of the **gateway**, the node it
is connected to. The Settings tab shows that one; the others have to be checked
in the Meshtastic app.

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

## License

Released under the [MIT License](LICENSE), Copyright (c) 2026 Alessandro Simonitto.

## Support

If Hermes is useful to you, you can support the work:

- Ko-fi: https://ko-fi.com/alessandrosimonitto
- PayPal: https://www.paypal.me/AlessandroSimonitto
