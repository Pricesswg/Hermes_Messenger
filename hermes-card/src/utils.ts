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
  selected: number[]
): MapNode[] {
  if (!selected?.length) return [];
  const wanted = new Set(selected.map(Number));
  const out: MapNode[] = [];

  for (const entry of entitiesForPlatform(hass, MESHTASTIC)) {
    if (!entry.entity_id.startsWith("device_tracker.")) continue;
    const deviceId = (entry as any).device_id as string | undefined;
    if (!deviceId) continue;

    const nodeNum = nodeNumFor(hass, deviceId);
    if (nodeNum === null || !wanted.has(nodeNum)) continue;

    const state = hass.states[entry.entity_id];
    if (!state) continue;

    const latitude = state.attributes?.latitude;
    const longitude = state.attributes?.longitude;
    const device = hass.devices?.[deviceId];
    const battery = state.attributes?.battery_level;

    out.push({
      nodeNum,
      name:
        device?.name_by_user ||
        device?.name ||
        state.attributes?.friendly_name ||
        String(nodeNum),
      latitude: typeof latitude === "number" ? latitude : null,
      longitude: typeof longitude === "number" ? longitude : null,
      battery: typeof battery === "number" ? battery : null,
      lastSeen: state.last_changed
        ? new Date(state.last_changed).toLocaleString()
        : "",
    });
  }

  return out.sort((a, b) => a.name.localeCompare(b.name));
}

/** State plus unit, ready to print. */
export function displayValue(state: HassEntityState): string {
  const unit = state.attributes?.unit_of_measurement;
  return unit ? `${state.state} ${unit}` : state.state;
}
