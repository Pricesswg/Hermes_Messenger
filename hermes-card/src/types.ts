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
  connection?: {
    subscribeEvents<T>(
      callback: (event: T) => void,
      eventType: string
    ): Promise<() => Promise<void>>;
  };
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
  | "log"
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

/** A channel configured on the radio. */
export interface HermesChannel {
  index: number;
  name: string;
  role: string;
  /** True when the channel still uses the well known default key. */
  default_psk: boolean;
}

/** A ready made message the user fires with one click. */
export interface HermesPreset {
  id?: string;
  label: string;
  text: string;
  /** Send as a DM to this node; empty means broadcast on a channel. */
  node_id?: number | null;
  /** Channel to broadcast on; empty means the gateway's own channel. */
  channel?: number | null;
}

/** One line of the received and sent log. */
export interface HermesLogEntry {
  ts: string;
  direction: "in" | "out";
  node: number | null;
  text: string;
  outcome: string;
}

/** Global settings, stored by the integration outside any config entry. */
export interface HermesSettings {
  openweather_api_key: string;
  map_nodes: number[];
  map_zoom: number;
  /** auto, mobile, tablet or desktop. */
  map_height: string;
  /** Minutes within which a node must have been heard to count as reachable. */
  reachable_minutes: number;
  /** small, medium or large. */
  map_pin_size: string;
  /** Draw the node name beside each pin. */
  map_labels: boolean;
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
  /** Channel to answer on; empty means the one the gateway listens on. */
  reply_channel?: number | null;
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
  require_ack: boolean;
  rate_limit: number;
  help_keyword: string;
  case_sensitive: boolean;
  /** False when the integration is not running, so nothing is listening. */
  loaded: boolean;
  state: string;
  last_seen: HermesLastSeen | null;
  /** Count of text messages per outcome, since Home Assistant started. */
  seen_counts: Record<string, number>;
  /** Mesh events seen on the bus by the shared listener, across all gateways. */
  bus_events: number;
  /** Version of the Python currently loaded, which needs a restart to change. */
  backend_version: string;
  /** Whether the shared mesh subscription is in place. */
  listening: boolean;
  /** Live link between the base Meshtastic integration and its node. */
  radio_connected: boolean | null;
}

/** The last text message this entry saw on the mesh, before any filtering. */
export interface HermesLastSeen {
  gateway: number | null;
  channel: number | null;
  node: number | null;
  from: number | null;
  /** accepted, other_gateway or other_target. */
  reason: string;
  time: string | null;
}

/** A Meshtastic node as reported by the backend. */
export interface NodeInfo {
  device_id: string;
  node_num: number;
  name: string;
}

/** A node ready to be drawn on the map. */
export interface MapNode {
  nodeNum: number | null;
  name: string;
  latitude: number | null;
  longitude: number | null;
  battery: number | null;
  lastSeen: string;
  /** Heard recently enough to count as reachable. Drives the pin colour. */
  connected: boolean;
  /** True when the node is one the user explicitly picked in Settings. */
  selected: boolean;
  /** True when the node may send commands, so a relay stands out from a peer. */
  authorized: boolean;
}

/** A Meshtastic node as seen through the Home Assistant device registry. */
export interface MeshNode {
  deviceId: string;
  nodeNum: number | null;
  name: string;
  /** Entity states belonging to this node, keyed by a normalized short key. */
  values: Record<string, HassEntityState>;
}
