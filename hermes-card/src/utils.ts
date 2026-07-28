import type {
  HassEntityState,
  HermesEntry,
  HomeAssistant,
  MapNode,
  MeshNode,
  NodeInfo,
} from "./types";

const MESHTASTIC = "meshtastic";
const HERMES = "hermes";

/** Entity registry entries belonging to a given integration platform. */
function entitiesForPlatform(hass: HomeAssistant, platform: string) {
  const registry = hass.entities;
  if (!registry) {
    // Older frontends without the entity registry collection: fall back to a
    // name match, which is less precise but keeps the card usable.
    return Object.keys(hass.states)
      .filter((id) => id.includes(platform))
      .map((id) => ({ entity_id: id, platform }));
  }
  return Object.values(registry).filter((e) => e.platform === platform);
}

/** State of the first Hermes entity whose id ends with the given suffix. */
/**
 * State of one diagnostic sensor.
 *
 * The entity id comes from the backend, which resolves it through the unique
 * id. Guessing it here used to mean matching an id ending in "last_command",
 * which is only true while the entity name is English: Home Assistant builds
 * the id from the translated name, so on an Italian instance the entity is
 * `sensor.gateway_ultimo_comando` and nothing matched. The panel then showed
 * nothing at all, which reads as a value that never updates.
 *
 * The suffix search is kept as a fallback for a backend older than the field.
 */
export function hermesSensor(
  hass: HomeAssistant,
  suffix: string,
  entries: HermesEntry[] = []
): HassEntityState | undefined {
  for (const entry of entries) {
    const entityId = entry.sensors?.[suffix];
    if (entityId && hass.states[entityId]) return hass.states[entityId];
  }

  for (const entry of entitiesForPlatform(hass, HERMES)) {
    if (entry.entity_id.endsWith(suffix)) {
      const state = hass.states[entry.entity_id];
      if (state) return state;
    }
  }
  return undefined;
}

/** True when at least one Hermes entity exists. */
export function hasHermes(hass: HomeAssistant): boolean {
  return entitiesForPlatform(hass, HERMES).length > 0;
}

/** Meshtastic node number stored in the device registry identifiers. */
function nodeNumFor(hass: HomeAssistant, deviceId: string): number | null {
  const device = hass.devices?.[deviceId];
  if (!device?.identifiers) return null;
  for (const pair of device.identifiers) {
    if (pair?.[0] === MESHTASTIC) {
      const parsed = Number.parseInt(String(pair[1]), 10);
      return Number.isNaN(parsed) ? null : parsed;
    }
  }
  return null;
}

/** Short, readable key for an entity id (the part after the last underscore). */
function shortKey(entityId: string): string {
  const objectId = entityId.split(".")[1] ?? entityId;
  const parts = objectId.split("_");
  return parts.slice(Math.max(parts.length - 2, 0)).join(" ");
}

/**
 * Group Meshtastic entities into per-node blocks using the device registry.
 * Read-only view: everything comes from states already present in the frontend.
 */
export function meshNodes(hass: HomeAssistant): MeshNode[] {
  const byDevice = new Map<string, MeshNode>();

  for (const entry of entitiesForPlatform(hass, MESHTASTIC)) {
    const deviceId = (entry as any).device_id as string | undefined;
    if (!deviceId) continue;
    const state = hass.states[entry.entity_id];
    if (!state) continue;

    let node = byDevice.get(deviceId);
    if (!node) {
      const device = hass.devices?.[deviceId];
      node = {
        deviceId,
        nodeNum: nodeNumFor(hass, deviceId),
        name:
          device?.name_by_user ||
          device?.name ||
          state.attributes?.friendly_name ||
          deviceId,
        values: {},
      };
      byDevice.set(deviceId, node);
    }
    node.values[shortKey(entry.entity_id)] = state;
  }

  return [...byDevice.values()].sort((a, b) => a.name.localeCompare(b.name));
}

/**
 * Positions of the Meshtastic nodes, restricted to the ones the user chose to
 * show on the map. Coordinates come from the device_tracker entities the base
 * integration creates per node (TrackerEntity with latitude and longitude).
 *
 * An empty selection means "none chosen yet" and draws nothing, which keeps
 * the map deliberate: this is meant as an emergency tracker for a handful of
 * nodes, not a dump of every node the mesh has ever heard.
 */
export function mapNodes(
  hass: HomeAssistant,
  selected: number[],
  includeAll = false,
  reachableMinutes = 120,
  authorized: number[] = [],
  mesh: NodeInfo[] = []
): MapNode[] {
  const wanted = new Set((selected ?? []).map(Number));
  const trusted = new Set((authorized ?? []).map(Number));
  if (!includeAll && !wanted.size) return [];

  // Group the per node entities by device. Position comes from the tracker and
  // reachability from the last heard sensor, but neither is required: a node
  // that never reported a position still has to appear in the list, otherwise
  // authorized nodes look like they do not exist.
  const trackers = new Map<string, string>();
  const lastHeard = new Map<string, string>();
  for (const entry of entitiesForPlatform(hass, MESHTASTIC)) {
    const deviceId = (entry as any).device_id as string | undefined;
    if (!deviceId) continue;
    if (entry.entity_id.startsWith("device_tracker.")) {
      trackers.set(deviceId, entry.entity_id);
    } else if (entry.entity_id.includes("last_heard")) {
      lastHeard.set(deviceId, entry.entity_id);
    }
  }

  // Iterate the devices, not the trackers, so every known node is listed.
  const byNum = new Map<number, MapNode>();
  for (const device of Object.values(hass.devices ?? {})) {
    const nodeNum = nodeNumFor(hass, device.id);
    if (nodeNum === null) continue;

    const trackerId = trackers.get(device.id);
    const state = trackerId ? hass.states[trackerId] : undefined;
    const latitude = state?.attributes?.latitude;
    const longitude = state?.attributes?.longitude;
    const battery = state?.attributes?.battery_level;

    byNum.set(nodeNum, {
      nodeNum,
      name:
        device.name_by_user ||
        device.name ||
        state?.attributes?.friendly_name ||
        String(nodeNum),
      latitude: typeof latitude === "number" ? latitude : null,
      longitude: typeof longitude === "number" ? longitude : null,
      battery: typeof battery === "number" ? battery : null,
      lastSeen: state?.last_changed
        ? new Date(state.last_changed).toLocaleString()
        : "",
      connected: isReachable(hass, lastHeard.get(device.id), reachableMinutes),
      selected: wanted.has(nodeNum),
      authorized: trusted.has(nodeNum),
    });
  }

  // Then the radio's own node database, which holds every node heard on the
  // channels rather than only the few the base integration imported. For a node
  // that is also a device this fills the gaps, since a node with no
  // device_tracker had no position at all.
  for (const node of mesh ?? []) {
    const nodeNum = Number(node.node_num);
    if (!Number.isFinite(nodeNum)) continue;
    const heard = heardRecently(node.last_heard, reachableMinutes);
    const known = byNum.get(nodeNum);

    if (!known) {
      byNum.set(nodeNum, {
        nodeNum,
        name: node.name || String(nodeNum),
        latitude: node.latitude ?? null,
        longitude: node.longitude ?? null,
        battery: node.battery ?? null,
        lastSeen: node.last_heard
          ? new Date(node.last_heard * 1000).toLocaleString()
          : "",
        connected: heard,
        selected: wanted.has(nodeNum),
        authorized: trusted.has(nodeNum),
      });
      continue;
    }

    if (known.latitude === null && node.latitude != null) {
      known.latitude = node.latitude;
      known.longitude = node.longitude ?? null;
    }
    if (known.battery === null && node.battery != null) {
      known.battery = node.battery;
    }
    if (!known.lastSeen && node.last_heard) {
      known.lastSeen = new Date(node.last_heard * 1000).toLocaleString();
    }
    // Heard on the mesh counts as reachable even when the Home Assistant
    // sensor is stale or was never created.
    known.connected = known.connected || heard;
  }

  const out = [...byNum.values()].filter(
    (node) => includeAll || node.selected
  );
  return out.sort((a, b) => a.name.localeCompare(b.name));
}

/** Whether an epoch seconds contact is inside the reachability window. */
function heardRecently(
  lastHeard: number | null | undefined,
  minutes: number
): boolean {
  if (!lastHeard) return false;
  return Date.now() - lastHeard * 1000 < minutes * 60000;
}

/**
 * A node counts as reachable when it was heard within the threshold, which is
 * how the Meshtastic clients themselves decide whether to show a node as
 * active. The window is configurable: two hours suits a fixed installation,
 * while a much shorter one is more meaningful in the field.
 */
function isReachable(
  hass: HomeAssistant,
  lastHeardId?: string,
  minutes = 120
): boolean {
  if (!lastHeardId) return false;
  const state = hass.states[lastHeardId];
  if (!state || state.state === "unavailable" || state.state === "unknown") {
    return false;
  }
  const heard = Date.parse(state.state);
  if (Number.isNaN(heard)) return false;
  return Date.now() - heard <= minutes * 60 * 1000;
}

/** Great circle distance in kilometres, for the radius filter. */
export function distanceKm(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371;
  const toRad = (deg: number) => (deg * Math.PI) / 180;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(a));
}

// Every place a command can name an entity: the advanced target field, the two
// read placeholders and the action token.
const REFERENCE_PATTERNS = [
  /\{state:([^:}]+)\}/g,
  /\{attr:([^:}]+):[^}]+\}/g,
  /\{do:[^:}]+:([^:}]+?)(?::[^}]*)?\}/g,
];

/**
 * Which entities the configured commands actually touch, mapped to the
 * keywords that use them. This is what makes the Home Assistant tab a coherence
 * check: an entity that was renamed or deleted still sits in a command, and
 * without this the failure only shows up when someone texts the keyword.
 */
export function referencedEntities(
  entries: HermesEntry[]
): Map<string, string[]> {
  const used = new Map<string, string[]>();

  const add = (entityId: string, keyword: string) => {
    const id = entityId.trim();
    if (!id.includes(".")) return;
    const list = used.get(id) ?? [];
    if (!list.includes(keyword)) list.push(keyword);
    used.set(id, list);
  };

  for (const entry of entries) {
    for (const command of entry.commands ?? []) {
      const keyword = command.keyword || "?";
      const target = command.target?.entity_id;
      if (typeof target === "string") add(target, keyword);

      const template = command.reply_template ?? "";
      for (const pattern of REFERENCE_PATTERNS) {
        pattern.lastIndex = 0;
        let match: RegExpExecArray | null;
        while ((match = pattern.exec(template)) !== null) {
          add(match[1], keyword);
        }
      }
    }
  }

  return new Map([...used.entries()].sort((a, b) => a[0].localeCompare(b[0])));
}

/** Entities created by Hermes itself, for the shared values section. */
export function hermesEntities(hass: HomeAssistant): HassEntityState[] {
  const out: HassEntityState[] = [];
  for (const entry of entitiesForPlatform(hass, HERMES)) {
    const state = hass.states[entry.entity_id];
    if (state) out.push(state);
  }
  return out.sort((a, b) => a.entity_id.localeCompare(b.entity_id));
}

/**
 * The metrics worth showing first for a node, matched by the key the base
 * integration uses in its entity ids. Anything not listed still shows, just
 * below these, so a new sensor on their side is never hidden.
 */
const HEADLINE_METRICS = [
  "battery",
  "voltage",
  "snr",
  "hops",
  "last_heard",
  "utilization",
  "uptime",
];

export function splitMetrics(
  values: Record<string, HassEntityState>
): { headline: [string, HassEntityState][]; rest: [string, HassEntityState][] } {
  const entries = Object.entries(values);
  const score = (key: string) =>
    HEADLINE_METRICS.findIndex((m) => key.toLowerCase().includes(m));

  const headline = entries
    .filter(([key]) => score(key) >= 0)
    .sort((a, b) => score(a[0]) - score(b[0]));
  const rest = entries.filter(([key]) => score(key) < 0);
  return { headline, rest };
}

/** State plus unit, ready to print. */
export function displayValue(state: HassEntityState): string {
  const unit = state.attributes?.unit_of_measurement;
  return unit ? `${state.state} ${unit}` : state.state;
}
