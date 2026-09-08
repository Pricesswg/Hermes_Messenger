# Hiking support

A Home Assistant package that watches someone carrying a Meshtastic node into
the mountains, and tells **someone at home** when something looks wrong. The
walker is by definition the person who might have no phone signal, so no alarm
here is ever sent to them.

Everything lives in [`hermes_hiking.yaml`](hermes_hiking.yaml): helpers, three
derived sensors, two binary sensors and ten automations. Hermes does not
appear in it except twice, where it carries a question to the node and where
the answer comes back. The watching itself is Home Assistant's job, done with
entities and automations rather than integration code, so you can read every
threshold, change it, and see why it fired.

## Before anything else

**The node must be selected in the Meshtastic integration's own options.** That
integration creates a `device_tracker` and the battery, SNR and hops sensors
only for the nodes picked there. If the tracker does not exist, nothing in this
package can work, and the first sign will be every distance reading `unknown`.

## Installing

1. Enable packages in `configuration.yaml`, if you have not already:

   ```yaml
   homeassistant:
     packages: !include_dir_named packages
   ```

2. Copy `hermes_hiking.yaml` into `config/packages/`.

3. Replace five values, all listed at the top of the file:

   | Placeholder | Where to find it |
   |---|---|
   | `device_tracker.hiker_node` | Developer tools, after selecting the node in the Meshtastic integration |
   | `sensor.hiker_node_battery` | same device |
   | `notify.home` | whichever notifier reaches a real phone at home |
   | `HERMES_ENTRY_ID` | the URL of the gateway's page under Settings → Devices & services |
   | `HIKER_NODE_ID` | the node number, shown in the Devices tab of the Hermes card |

4. Restart Home Assistant.

5. Add one command in Hermes, so the walker can answer the check:

   - **Keyword** `ok`, match type **Exact**
   - **Service** `input_boolean.turn_off`, target `input_boolean.hike_check_pending`
   - **Reply** `Received. Alarm cancelled.`
   - **Reply to** the sender's direct message

   Two more are worth adding while you are there: `hike on` and `hike off`
   against `input_boolean.hike_mode`, so the mode can be armed from the trail
   without a phone. And a reply-only `status` reading back the distance and the
   battery — a command may exist purely to answer.

## What fires, and when

Nothing below is active unless **Hike mode** is on.

| Alarm | Condition | Default |
|---|---|---|
| Standing still | No movement over 50 m | 30 min, then a check to the node |
| No answer | The check went unanswered | 10 min, then home is told |
| Out of contact | Nothing heard from the node at all | 20 min |
| Overdue | Past *Expected back by*, not home | at the time you set |
| Low battery | Node battery below the threshold | 25%, held for 10 min |
| Too far | Distance from the start point | 15 km, held for 10 min |

Every threshold is an `input_number`, so tuning one on the morning of a walk is
a slider and not a YAML edit.

## Three decisions worth knowing

**The dead man switch has two stages, and the first one wakes nobody.** With a
position every few minutes and GPS jitter of a few metres, a single-stage "no
movement for 30 minutes" fires at every lunch stop. Here the node buzzes and
asks first; a person who stopped on purpose answers `ok` and that is the end of
it. Only silence escalates. An alarm that cries wolf gets ignored, which is
worse than not having one.

**Nothing disarms itself.** Arriving home sends a reminder, not a disarm. An
automation that decided a walk was over on its own would switch the watching
off in exactly the case that matters most: someone who stopped close to home
and never actually arrived.

**"Not moving" and "not reachable" are separate alarms**, with different delays
and different words. The mesh dropping while the walker is perfectly fine is
common, and being told "no movement" when the truth is "no signal" points help
at the wrong question.

## After the walk

Switching hike mode off archives it. The package calls `hermes.archive_hike`,
which reads the track back out of the Home Assistant recorder and hands it to
Hermes, where it is kept with its summary and with any alarms that fired.

That step is what decides whether the walk still exists in September. **The
recorder purges after ten days**, so a walk that was never archived is a walk
that is gone, whatever the Hikes tab is asked afterwards.

The **Hikes** tab in the card lists what has been archived. Opening one shows
the distance, how long it took and how much of that was moving, the stops, the
climb, how far out it went, and the alarms that fired during it with the values
that were true at the time. **Export GPX** saves the track for any map tool.

Some of those numbers are computed with a noise floor rather than from the raw
fixes, and that is deliberate. A receiver sitting under trees for an hour wanders
by tens of metres between fixes; counting every wobble would report a walk that
covered a kilometre while standing still, and an altitude that climbed a
mountain. In the summary, movement under 30 m and height changes under 8 m
are treated as the same place (the standing-still alarm uses its own, wider,
50 m, because deciding someone has stopped deserves more room than measuring
how far they walked). A walk with no altitude reported says zero climb rather than
inventing one.

## While you are out

Two layers on the Map tab are worth turning on for this: **Trails**, which draws
the marked routes so a pin has a path next to it, and **Rain radar**, which
says whether the weather is arriving on the person or going round them. Neither
needs a key. A weather entity set in Settings adds the conditions above the map.

## What it cannot do

Position updates arrive between tens of seconds and several minutes apart: EU868
allows a 1% duty cycle and Meshtastic enforces its own airtime limits on top.
Nothing here reacts inside a minute, and none of it is live tracking.

A node with a flat battery is a node that stops reporting, and every alarm here
goes quiet with it. That is why the battery alarm exists and why it says so.
