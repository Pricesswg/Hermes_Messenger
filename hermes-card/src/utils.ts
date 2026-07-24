import type {
  HassEntityState,
  HomeAssistant,
  MapNode,
  MeshNode,
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
export function hermesSensor(
  hass: HomeAssistant,
  suffix: string
): HassEntityState | undefined {
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
  includeAll = false
): MapNode[] {
  const wanted = new Set((selected ?? []).map(Number));
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
  const out: MapNode[] = [];
  for (const device of Object.values(hass.devices ?? {})) {
    const nodeNum = nodeNumFor(hass, device.id);
    if (nodeNum === null) continue;
    const isSelected = wanted.has(nodeNum);
    if (!includeAll && !isSelected) continue;

    const trackerId = trackers.get(device.id);
    const state = trackerId ? hass.states[trackerId] : undefined;
    const latitude = state?.attributes?.latitude;
    const longitude = state?.attributes?.longitude;
    const battery = state?.attributes?.battery_level;

    out.push({
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
      connected: isReachable(hass, lastHeard.get(device.id)),
      selected: isSelected,
    });
  }

  return out.sort((a, b) => a.name.localeCompare(b.name));
}

/**
 * A node counts as reachable when it was heard within the threshold, which is
 * how the Meshtastic clients themselves decide whether to show a node as
 * active. Without a last heard sensor we fall back to the entity simply not
 * being unavailable.
 */
export const REACHABLE_WITHIN_MS = 2 * 60 * 60 * 1000;

function isReachable(hass: HomeAssistant, lastHeardId?: string): boolean {
  if (!lastHeardId) return false;
  const state = hass.states[lastHeardId];
  if (!state || state.state === "unavailable" || state.state === "unknown") {
    return false;
  }
  const heard = Date.parse(state.state);
  if (Number.isNaN(heard)) return false;
  return Date.now() - heard <= REACHABLE_WITHIN_MS;
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

/** State plus unit, ready to print. */
export function displayValue(state: HassEntityState): string {
  const unit = state.attributes?.unit_of_measurement;
  return unit ? `${state.state} ${unit}` : state.state;
}
