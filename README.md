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

**Commands from the mesh.** An authorized node sends a keyword, Hermes runs the
Home Assistant action mapped to it and replies over the mesh. Commands are built
by picking an entity and clicking buttons, never by typing a service name, and
values are offered within the range your device actually accepts.

**Notifications onto the mesh.** `hermes.broadcast` and `hermes.send_direct` can
be called from any automation, including scheduled ones, so alarms, events and
reminders reach people with no phone signal.

**A dashboard for the mesh.** One card with everything: reception diagnostics,
conversations you can read and reply to, the nodes and their health, a map, and
the radio's own configuration. It runs on top of the official Meshtastic
integration, so nothing opens a second connection to your node.

### The card

| Tab | What it holds |
|-----|---------------|
| **Status** | Whether messages are getting through and why not, the gateway radio, counters |
| **Chat** | Conversations by channel and by node, with replies sent from here |
| **Log** | What Hermes decided about each message, including the ones it ignored |
| **Devices** | Every node with battery, signal, hops and last heard |
| **Map** | Chosen nodes as points, optionally the whole mesh, with a radius filter |
| **Messages** | Building commands, and quick send presets |
| **Home Assistant** | Which entities your commands use, and whether they still exist |
| **Settings** | Everything configurable, including the radio itself |

**Byte-safe by design.** Every outgoing message is split to fit the Meshtastic
payload, with a `(1/3)` header, never cutting a multi-byte character in half.

**Silence by default.** A node whitelist gates commands, and unauthorized
senders get no reply at all, since answering would confirm that a Home Assistant
is listening.

## Installation

### Through HACS (recommended)

[![Add to HACS](https://my.home-assistant.io/badges/hacs_repository.svg)](https://my.home-assistant.io/redirect/hacs_repository/?owner=Pricesswg&repository=Hermes_Messenger&category=integration)

1. Click the badge above to open HACS with this repository pre-filled, then click **Add**
2. Search for "Hermes" in HACS, click **Download**
3. Restart Home Assistant
4. Click the badge below to add the integration:

[![Add Hermes integration](https://my.home-assistant.io/badges/config_flow_start.svg)](https://my.home-assistant.io/redirect/config_flow_start/?domain=hermes)

5. Add the card to any dashboard: **Edit dashboard**, **Add card**, search for **Hermes**

The card registers itself, so there is no Lovelace resource to add by hand. A
**Panel (1 card)** view suits it best, since it fills the screen.

### Before you install

The official [Meshtastic integration](https://my.home-assistant.io/redirect/config_flow_start/?domain=meshtastic)
has to be installed and connected first: it owns the connection to your radio
and Hermes works on top of it. Only one integration can hold that connection, so
do not run a second one against the same node.

- A recent Home Assistant (config flow, modern options flow, `TargetSelector`).
- **The official Meshtastic integration already installed and configured**
  (`domain: meshtastic`), with at least one connected gateway. Hermes depends on
  its `meshtastic_api_text_message` event and its `meshtastic.send_text` service.
- Meshtastic firmware with PKC (≥ 2.5) if you want to use DMs as a trustworthy
  channel (see *Security*).

## Configuration

Everything is configured from the card, with no YAML. Pick the gateway node, the
mode (a channel or direct messages), the channel, and which nodes may send
commands. All of it can be changed later without recreating anything.

Commands are built by picking an entity and clicking buttons: **Read** buttons
insert a live value into the reply, **Do** buttons run something.

Settings can also configure the radio itself: region, modem preset, hop limit,
transmit power, node role. Those are written to the node, so they sit in their
own section with their own save button and a warning, since most of them restart
it and a wrong region cuts it off from the mesh.

The [user guide](docs/USER_GUIDE.md) walks through all of it, with worked
examples and a troubleshooting section ordered so each step rules out the ones
below it.

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

## Security

A channel tells you things, a direct message changes them.

**On a channel** the only protection is the shared key. Messages carry a sender
but nothing proves it, so anyone holding the key can claim to be any node: the
authorized nodes list is a weak defence there. **On a direct message with PKC**
(firmware 2.5 and later) the sender is verified by the protocol before the
message reaches Home Assistant, and the list means what it says.

The recommended shape is two instances: status queries on a channel, anything
that acts on direct messages. Adding the integration twice costs nothing, and it
keeps a leaked channel key from becoming someone else's control of your house.

A command runs as Home Assistant itself, with no user and no confirmation, so
the command list is the permission list. The sender never supplies a service, an
entity or a template: the only thing a message contributes is the keyword and,
where allowed, one number, parsed strictly and range checked.

The [security section of the guide](docs/USER_GUIDE.md#security) covers the
recommended settings, what not to put on a channel, key rotation after losing a
node, and what Hermes stores.

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
