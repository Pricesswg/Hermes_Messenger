// Minimal typings for the slice of the Home Assistant frontend object we use.
// The real `hass` object is much larger; we only declare what the card touches.

export interface HassEntityState {
  entity_id: string;
  state: string;
  attributes: Record<string, any>;
  last_changed?: string;
  last_updated?: string;
}

export interface HassEntityRegistryEntry {
  entity_id: string;
  device_id?: string | null;
  platform?: string;
  name?: string | null;
}

export interface HassDeviceRegistryEntry {
  id: string;
  name?: string | null;
  name_by_user?: string | null;
  manufacturer?: string | null;
  model?: string | null;
  identifiers?: [string, string][];
}

export interface HomeAssistant {
  states: Record<string, HassEntityState>;
  entities?: Record<string, HassEntityRegistryEntry>;
  devices?: Record<string, HassDeviceRegistryEntry>;
  language?: string;
  locale?: { language?: string };
  callWS<T>(msg: Record<string, any>): Promise<T>;
  callService(
    domain: string,
    service: string,
    data?: Record<string, any>
  ): Promise<unknown>;
}

export interface HermesCardConfig {
  type: string;
  /** Optional starting tab. Defaults to "status". */
  tab?: TabId;
}

export type TabId =
  | "status"
  | "devices"
  | "map"
  | "messages"
  | "homeassistant"
  | "settings";

/** A Meshtastic node as seen through the Home Assistant device registry. */
export interface MeshNode {
  deviceId: string;
  nodeNum: number | null;
  name: string;
  /** Entity states belonging to this node, keyed by a normalized short key. */
  values: Record<string, HassEntityState>;
}
