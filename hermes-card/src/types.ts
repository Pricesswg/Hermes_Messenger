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

/** Value descriptor of an action parameter, from the curated catalogue. */
export interface ActionValueSpec {
  key: string;
  type: "number" | "enum";
  unit?: string;
  min?: number;
  max?: number;
  step?: number;
  default?: number | string;
  options?: string[];
}

/** One entry of the curated action catalogue. */
export interface ActionDef {
  id: string;
  label: string;
  service: string;
  value?: ActionValueSpec;
}

/** Global settings, stored by the integration outside any config entry. */
export interface HermesSettings {
  openweather_api_key: string;
  map_nodes: number[];
  map_zoom: number;
}

/** One configured command, as stored in the config entry options. */
export interface HermesCommand {
  id?: string;
  keyword: string;
  match_type: "exact" | "startswith";
  service: string;
  target?: Record<string, any>;
  service_data?: Record<string, any>;
  reply_template?: string;
  reply_to: "channel" | "sender_dm";
  authorized_nodes_override?: number[];
}

/** One configured Hermes gateway (a config entry). */
export interface HermesEntry {
  entry_id: string;
  title: string;
  gateway_node_id: number | null;
  mode: string;
  channel_index: number | null;
  authorized_nodes: number[];
  commands: HermesCommand[];
  initial_delay: number;
  part_delay: number;
}

/** A Meshtastic node as reported by the backend. */
export interface NodeInfo {
  device_id: string;
  node_num: number;
  name: string;
}

/** A Meshtastic node as seen through the Home Assistant device registry. */
export interface MeshNode {
  deviceId: string;
  nodeNum: number | null;
  name: string;
  /** Entity states belonging to this node, keyed by a normalized short key. */
  values: Record<string, HassEntityState>;
}
