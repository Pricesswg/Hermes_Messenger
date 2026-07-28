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
  /**
   * How much of Hermes this card shows. "full" is the panel with every tab;
   * the others are single purpose cards meant to sit in a dashboard column
   * next to unrelated cards.
   */
  view?: CardView;
}

export type CardView = "full" | "summary" | "chat";

export type TabId =
  | "status"
  | "chat"
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

/** One message in a conversation. */
export interface ChatMessage {
  ts: string;
  text: string;
  node: number | null;
  name: string;
  outgoing: boolean;
}

/** The radio settings Hermes can change, and what each one accepts. */
export interface RadioConfig {
  values: Record<string, string | number | boolean>;
  options: Record<string, string[]>;
}

/** What the gateway radio reports about itself. */
export interface RadioInfo {
  firmware: string | null;
  connected: boolean | null;
  node_num?: number | null;
  long_name?: string | null;
  short_name?: string | null;
  hardware?: string | null;
  role?: string | null;
  region?: string | null;
  modem_preset?: string | null;
  hop_limit?: number | null;
  tx_enabled?: boolean | null;
}

/** A channel configured on the radio. */
export interface HermesChannel {
  index: number;
  name: string;
  role: string;
  /**
   * True on the published default key, false when the key was read and is not
   * it, null when the key could not be read at all. The third state matters:
   * reporting false for "cannot tell" claimed a channel was safe.
   */
  default_psk: boolean | null;
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
  /** Entity that must be on for this command to run. */
  condition_entity?: string;
  /** Seconds that must pass between two runs of this command. */
  cooldown_seconds?: number;
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
  /** Other loaded integrations that connect to a Meshtastic node themselves. */
  competing_integrations?: string[];
  /** True once a packet id was seen, false once one arrived without it,
   * null before anything arrived. */
  replay_protected?: boolean | null;
  /** Run commands only from messages encrypted for this node alone. */
  require_pkc?: boolean;
  /** Refuse packets that reached the mesh through an MQTT bridge. */
  reject_mqtt?: boolean;
  /** Refuse packets older than this many seconds. 0 is off. */
  max_age_seconds?: number;
  /** Why commands are blocked on this channel, ignoring any acceptance. */
  channel_block?: "default_psk" | "channel_zero" | null;
  /** The recorded acceptance of that risk, deliberately visible. */
  channel_risk_ack?: ChannelRiskAck | null;
}

/** Who accepted that a public channel may run commands, and when. */
export interface ChannelRiskAck {
  accepted: boolean;
  reason: "default_psk" | "channel_zero";
  channel: number | null;
  by: string;
  at: string;
  hermes_version?: string;
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
  /** Null for a node the radio knows but Home Assistant never imported. */
  device_id: string | null;
  node_num: number;
  name: string;
  /** Where the record came from: the HA registry, the radio, or both. */
  source?: "ha" | "mesh" | "both";
  latitude?: number | null;
  longitude?: number | null;
  battery?: number | null;
  /** Epoch seconds of the last packet heard from this node. */
  last_heard?: number | null;
  snr?: number | null;
  hops_away?: number | null;
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
