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

### The two small cards

The panel above is the place where Hermes is set up, and it wants a view of its
own. For a dashboard you already use for something else there are two more
cards, each doing one thing and taking only the height it needs, so they sit in
a column next to your lights and your thermostat.

| Card | What it shows |
|------|---------------|
| **Hermes summary** | The state of the system as a list of parameters: radio link, nodes, messages received, commands accepted and executed, last command, last error, and what each gateway listens to |
| **Hermes chat** | Conversations, so you can read and send messages on a channel or straight to a node without leaving the dashboard |

Both are in **Add card** under their own name. In YAML:

```yaml
type: custom:hermes-summary-card
```

```yaml
type: custom:hermes-chat-card
```

Neither changes any setting: the summary only reads, and the chat only sends
what you type. Everything that configures Hermes stays in the panel.

The summary rearranges itself when the column is narrow, putting each value
under its label instead of beside it, so it stays readable in a third of a
screen.

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

## Reading and writing messages

The **Chat** tab shows the traffic itself, grouped into conversations: every
channel on the radio at the top, whether or not anyone has written on one yet,
and direct messages below. Pick one and reply from the box at the bottom.

It covers every channel the gateway hears, not only the one commands arrive on,
which is deliberately a different question from the **Log** tab. Log answers what
Hermes decided about a message; Chat is the conversation.

Conversations are capped per thread and in number, and the quietest one is
dropped when the cap is reached, so a busy mesh cannot grow the store forever.

## Configuring the radio

**Settings** has a **Radio configuration** section that writes to the node
itself: region, modem preset, hop limit, transmit power, whether transmitting is
enabled at all, the node role and how often it announces itself.

Read this before using it. These settings belong to the radio, not to Hermes.
Most of them restart the node, and the wrong region or modem preset stops it
talking to every other node until they match again. Change one at a time and
check the mesh after each.

Hermes reads the current configuration, applies only the fields you changed, and
writes the whole thing back, so nothing you did not touch is reset. The values
offered in each menu come from the firmware on your own node, not from a list
kept here, so a newer firmware offers its own.

It has its own save button, separate from every other setting on the page, for
the same reason: writing to a radio should never happen as a side effect of
changing a reply delay.

## The map

**Map** draws the nodes you picked in Settings. Only those, which is what makes
it usable as an emergency tracker rather than a crowded map. Two switches change
that: showing every mesh node, and filtering to a radius you set with a slider.

The nodes to pick from are every node **the radio knows**, not only the few the
Meshtastic integration imported into Home Assistant as devices. Those are
usually a hand picked handful, while the radio holds everything it has heard on
its channels, with the position each one reported: the same list the Meshtastic
app shows you.

Pins are **green** when the node was heard recently and **yellow** when it was
not. How recent counts as recent is configurable: two hours suits a fixed
installation, a much shorter window says more in the field.

Adding your own OpenWeather API key in Settings unlocks temperature, wind, cloud
and precipitation overlays. The key is stored in Home Assistant and never leaves
it.

---

## Security

Hermes turns a text message into a Home Assistant action. That is the whole
point, and it is also the whole risk: whoever can get a message accepted can do
whatever the commands allow. This section is about keeping that set small and
the senders real.

### What actually protects you

There are two very different situations, and the difference decides everything
else.

**On a channel**, the only protection is the channel key, shared by everyone on
it. Messages carry a sender, but nothing proves it: anyone holding the key can
send a message claiming to be any node. The authorized nodes list is therefore a
**weak** defence on a channel. It stops mistakes and casual traffic, not someone
who wants in.

**On a direct message with PKC** (firmware 2.5 and later) the message is
encrypted for the recipient and the sender is verified by the protocol, before it
ever reaches Home Assistant. Here the authorized nodes list means what it says.

So the rule is short: **a channel tells you things, a direct message changes
them.**

### The recommended shape

Run Hermes twice, which costs nothing because each config entry is independent.

| Instance | Mode | Commands on it |
|----------|------|----------------|
| Status | a channel | Read only: temperatures, whether the alarm is armed, node battery, "am I still online" |
| Control | direct messages | Anything that acts: lights, heating, gates, scenes |

Add the integration a second time to get the second instance. The channel one
answers questions from anyone on the channel who is on the list; the direct
message one is the only place where anything happens.

If you keep a single instance, use direct messages and accept that the channel
is not a command surface at all.

### What not to put on a channel

Not because Hermes will refuse, but because a leaked channel key turns each of
these into someone else's control:

- unlocking doors, opening gates, disarming an alarm
- anything irreversible, or expensive, or that runs while you are away
- anything whose reply reveals whether the house is empty

Presence, location and "nobody home" are the ones people forget. A status
command answering `alarm: disarmed, nobody home` on a channel is an
announcement, and it is worse than a light switch.

### Where the blast radius is set

A command runs as Home Assistant itself. There is no user behind it, no
permission check, no confirmation. The command list **is** the permission list.

So the question to ask about each command is not "is this convenient" but
"would I accept a stranger triggering this, on the day the key leaks". Anything
that fails that test belongs on direct messages, or nowhere.

Two design choices help, and it is worth knowing exactly how far they go:

- The sender never supplies a service name, an entity or a template. All of that
  is written by you in the card. The only thing a message contributes is the
  keyword and, when the match type allows it, **one number**, parsed strictly as
  a number and checked against the range your device accepts. There is no way to
  make a message reach something you did not configure.
- A command that arrived privately is always answered privately. Publishing the
  answer of a private exchange onto a channel would broadcast the state of your
  home, so it is not offered.

### Recommended settings

- **Never use the default channel key.** The key `AQ==` is published in the
  Meshtastic documentation, so a channel using it is public. Settings flags it.
- **Fill the authorized nodes list** on every instance, even the channel one. It
  is weak there, not useless.
- **Leave the rate limit on.** It will not stop an attacker, who can stay under
  it, but it does stop a malfunctioning node or a repeater duplicating packets
  from replaying a command hundreds of times.
- **Set the help keyword only if you want the command list readable.** It answers
  authorized nodes only, but on a channel "authorized" is a soft claim.
- **Prefer replies by direct message** for anything that reveals state, even when
  the command arrived on a channel.

### Rotating a key, and losing a node

A node holds the keys of every channel it is on. A node that is lost, stolen,
sold or lent is a copy of those keys in someone else's hands.

When that happens, change the channel key on every remaining node. Until you do,
the whitelist is protecting nothing on that channel: whoever holds the old node
can send as any node they like.

The same applies to a node you flash and pass on. Wipe it first.

### What is stored, and where

The Log and Chat tabs keep the text of messages in Home Assistant's storage, on
disk, unencrypted, like any other Home Assistant data. Both are capped and both
can be cleared from the card.

If people on your channel would not want their messages sitting in your Home
Assistant, clear the conversations, or do not run the channel instance.

### Beyond Meshtastic

None of the above helps if Home Assistant itself is reachable. Hermes is one
door; the usual ones matter more:

- do not expose Home Assistant to the internet without a reverse proxy and
  multi-factor authentication
- keep it and its integrations updated
- treat anyone with a Home Assistant admin account as able to change every
  Hermes setting, including which nodes are authorized

### The short version

Status on a channel. Control on direct messages, with PKC firmware on both ends
and a whitelist. Never the default key. Assume a channel key will leak one day,
and configure so that the day it does, all anyone learns is the temperature.

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
actually arrived. If the two differ you get **nothing is getting through**, and
the two lines tell you exactly what to change in Settings.

Change it yourself rather than expecting a button to do it. Adopting whatever
the last message happened to use would move a gateway from direct messages to a
channel on the strength of one stray packet, and that is the whole difference
between a sender the protocol verified and anyone holding the channel key.

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
