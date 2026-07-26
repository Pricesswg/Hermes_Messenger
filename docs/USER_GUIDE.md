# Hermes user guide

Hermes lets people on a Meshtastic mesh run Home Assistant commands by sending a
text message, and lets Home Assistant send messages back onto the mesh. This
guide covers setting it up, building commands, and working out what is wrong
when nothing happens.

Everything is configured from the Hermes card. You never need to write YAML.

---

## Before you start

Hermes is a layer on top of the official
[Meshtastic integration](https://github.com/meshtastic/home-assistant). That one
owns the connection to your radio; Hermes only listens to what it reports and
uses it to send. So it has to be installed and working first.

You also need to know **which node is physically connected to Home Assistant**.
That node is the gateway. Every message reaches Home Assistant through it, and
picking any other node means Hermes never receives anything. If you are not
sure, the Status tab tells you (see [Nothing is coming through](#nothing-is-coming-through)).

### Firmware

Keep every node and repeater on the same firmware version, or on versions known
to work together. Mixed versions cause messages that reach one node and not
another, which looks like a Hermes problem and is not.

Direct messages need recent firmware on **both** ends. On older versions the
encryption is not recognised, the message never reaches Home Assistant, and no
entity changes state. If a node cannot be updated, use a channel instead.

---

## Setting up

1. **Settings, Devices and Services, Add Integration, Hermes**.
2. **Gateway node**: pick the node connected to Home Assistant.
3. **Mode**:
   - *Listen on a channel*: commands arrive on a shared channel. Anyone on that
     channel can send them, subject to the whitelist.
   - *Listen to direct messages*: commands arrive as private messages to the
     gateway. Replies always go back privately.
4. **Channel**: which channel to listen on, in channel mode. The list is read
   from your radio, so you pick it by name.
5. **Authorized nodes**: only these nodes can trigger commands. Everyone else is
   ignored without a reply.

All of these can be changed later in the card, under **Settings**.

### Adding the card

The card registers itself. Add it to a dashboard: **Edit dashboard**,
**Add card**, search for **Hermes**. In YAML it is:

```yaml
type: custom:hermes-card
```

A **Panel (1 card)** view suits it best, since it fills the screen.

---

## Building a command

Open **Messages**, then **Add message**.

A command needs a **keyword** and at least one of: something to do, or something
to reply. Both is fine too.

### Keyword and matching

| Field | What it does |
|-------|--------------|
| **Keyword** | The text someone sends from a node to trigger this |
| **Match type** | *Exact match* requires the whole message to be the keyword. *Starts with* also accepts a value after it, like `temp 21` |

Matching ignores capitals by default, which is what handles phone keyboards
capitalising the first letter on their own. There is a setting to make it
strict, and you almost certainly want to leave it off.

### The buttons

Pick an entity, and Hermes shows what you can do with it. You never type a
service name.

- **Read** buttons insert the current value into the reply. *Value* is the state
  itself, and the others are attributes the entity actually publishes.
- **Do** buttons run something: *Turn on*, *Turn off*, *Toggle*, *Set
  temperature*, and so on, depending on the entity.

Buttons with a value, like a temperature, let you choose the default before
inserting. The range shown is the one **your device** accepts, read from the
entity, not a generic one.

Everything a button inserts goes into the reply box at the cursor. Action
buttons send nothing themselves, so write the human text around them.

### Worked example: a toggle

To toggle a light and confirm what happened:

1. Keyword: `luce`
2. Match type: *Exact match*
3. Pick the entity: `light.cucina`
4. Under **Do**, click **Toggle**
5. Type ` Kitchen light is now ` after the token
6. Under **Read**, click **Value**

The reply box ends up holding:

```
{do:light.toggle:light.cucina} Kitchen light is now {state:light.cucina}
```

Sending `luce` from an authorized node toggles the light and answers
`Kitchen light is now on`.

> The reply is rendered **after** the action runs, so the state you read back is
> the state you just caused.

### Worked example: reading only

1. Keyword: `stato`
2. Leave the action buttons alone
3. Under **Read**, insert the values you want

```
Home: {state:sensor.temperatura_salotto}C, alarm {state:alarm_control_panel.casa}
```

### Worked example: a value from the message

1. Keyword: `temp`
2. Match type: **Starts with**
3. Pick `climate.salotto`, click **Set temperature**, set the default to 21

Sending `temp` sets 21. Sending `temp 23` sets 23 instead. A number outside what
your device accepts is refused and the default is used.

### Where the reply goes

- **On the channel**: everyone on it sees the answer. You can pick a different
  channel than the one the command arrived on, which is useful to keep replies
  off a busy channel.
- **DM to sender**: only the person who asked sees it.

On a gateway that listens to direct messages, replies always go back privately.
Answering a private command on a channel would publish the state of your home to
everyone listening on it, so that is not offered.

---

## Quick send presets

Under **Messages**, presets are ready made texts you fire with one click, like
the canned messages in the Meshtastic app. Each one can go to a channel or as a
direct message to a node.

---

## Sending from automations

Two actions are available to any automation, including scheduled ones. There is
no scheduler inside Hermes: Home Assistant already has one.

- **`hermes.broadcast`** with `config_entry_id`, `message`, and an optional
  `channel` to override the gateway's own.
- **`hermes.send_direct`** with `config_entry_id`, `node_id`, `message`.

```yaml
automation:
  - alias: "Mesh: evening reminder"
    triggers:
      - trigger: time
        at: "22:00:00"
    actions:
      - action: hermes.broadcast
        data:
          config_entry_id: <YOUR_ENTRY_ID>
          message: "Good night, gates closing in 10 minutes."
```

Messages longer than the radio payload are split automatically, with a `(1/3)`
style header, never cutting a character in half.

---

## The map

**Map** draws the nodes you picked in Settings. Only those, which is what makes
it usable as an emergency tracker rather than a crowded map. Two switches change
that: showing every mesh node, and filtering to a radius you set with a slider.

Pins are **green** when the node was heard recently and **yellow** when it was
not. How recent counts as recent is configurable: two hours suits a fixed
installation, a much shorter window says more in the field.

Adding your own OpenWeather API key in Settings unlocks temperature, wind, cloud
and precipitation overlays. The key is stored in Home Assistant and never leaves
it.

---

## Security

**On a channel**, the only protection is the channel key. Anyone who has it can
send a message claiming to be any node: the sender is stated, not proven. The
whitelist is a weak defence there.

**On direct messages with PKC** (firmware 2.5 and later) the sender is verified
by the protocol before the message reaches Home Assistant. The whitelist is
trustworthy there.

For anything that matters, prefer direct messages. Verify the behaviour on the
firmware you actually run.

Two more things worth knowing:

- Unauthorized senders get **silence**, not a refusal. A reply would confirm to a
  stranger that a Home Assistant is listening behind that node.
- A rate limit caps how many commands one node can run per minute, which protects
  against a malfunctioning node or a repeater duplicating packets.

---

## Nothing is coming through

Open **Status** and read the **Reception** panel from the top. Each line rules
out the ones below it.

### 1. Is the radio connected?

If it says **radio not connected**, stop here. The Meshtastic integration has no
link to its node, so no message can reach Hermes and nothing can be sent. Check
that integration and the connection to the gateway node.

This one is deceptive: an app connected **straight to the radio** keeps showing
traffic perfectly, because it never goes through Home Assistant. Seeing messages
there does not mean Home Assistant is receiving them.

### 2. Is Hermes running?

**Not running** means the integration failed to load. The settings still display
correctly because they are read from storage, so a broken setup looks healthy.
Check Settings, Devices and Services for an error.

### 3. Are events arriving?

**Mesh events reaching Hermes** counts every message before any filter.

- **Zero while messages cross the mesh**: nothing is being emitted. The problem
  is upstream, not in Hermes.
- **Rising**: Hermes is receiving, and anything wrong is in the configuration
  below.

### 4. Does it match this gateway?

The panel puts what the gateway listens to next to the last message that
actually arrived. If they differ you get **nothing is getting through**, and a
button that adopts the gateway, mode and channel from that real message.

The gateway is always the node **connected to Home Assistant**, never the one
you send from. With several nodes on a desk this is an easy mistake.

### 5. What did Hermes decide?

The **Log** tab shows every message it read, including the ones it discarded and
why:

| Outcome | Meaning |
|---------|---------|
| command run | matched and executed |
| no command matched | received, but no keyword matched it |
| sender not authorized | not on the whitelist, dropped in silence |
| ignored, another gateway | arrived through a different node |
| ignored, another channel | arrived somewhere this gateway does not listen |
| rate limit reached | too many commands from that node |
| failed while being handled | a bug: the Home Assistant log has the details |

---

## Updating

Restart Home Assistant, then reload the page with a hard refresh
(Ctrl+Shift+R, Cmd+Shift+R on a Mac). Python only changes on a restart, and the
card is cached by the browser. Status shows both versions side by side, so a
mismatch is visible.
