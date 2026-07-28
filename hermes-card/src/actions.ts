// Action catalogue used to build the message buttons.
//
// The backend serves the authoritative catalogue over `hermes/actions`; this
// fallback keeps the palette usable if that call has not landed yet, the same
// arrangement Chronos uses.

import type { ActionDef, ActionValueSpec, HomeAssistant } from "./types";

const GENERIC: ActionDef[] = [
  { id: "turn_on", label: "Turn on", service: "homeassistant.turn_on" },
  { id: "turn_off", label: "Turn off", service: "homeassistant.turn_off" },
  { id: "toggle", label: "Toggle", service: "homeassistant.toggle" },
];

const FALLBACK_BY_TYPE: Record<string, ActionDef[]> = {
  light: [
    { id: "turn_on", label: "Turn on", service: "light.turn_on" },
    {
      id: "turn_on_brightness",
      label: "Turn on at brightness",
      service: "light.turn_on",
      value: { key: "brightness_pct", type: "number", unit: "%", min: 1, max: 100, step: 1, default: 80 },
    },
    { id: "turn_off", label: "Turn off", service: "light.turn_off" },
    { id: "toggle", label: "Toggle", service: "light.toggle" },
  ],
  switch: GENERIC,
  climate: [
    {
      id: "set_temperature",
      label: "Set temperature",
      service: "climate.set_temperature",
      value: { key: "temperature", type: "number", unit: "C", min: 5, max: 35, step: 0.5, default: 21 },
    },
    { id: "turn_on", label: "Turn on", service: "climate.turn_on" },
    { id: "turn_off", label: "Turn off", service: "climate.turn_off" },
  ],
  cover: [
    { id: "open", label: "Open", service: "cover.open_cover" },
    { id: "close", label: "Close", service: "cover.close_cover" },
    { id: "stop", label: "Stop", service: "cover.stop_cover" },
    {
      id: "set_position",
      label: "Set position",
      service: "cover.set_cover_position",
      value: { key: "position", type: "number", unit: "%", min: 0, max: 100, step: 5, default: 100 },
    },
  ],
};

const FALLBACK_DOMAIN_TO_TYPE: Record<string, string> = {
  light: "light",
  switch: "switch",
  input_boolean: "switch",
  climate: "climate",
  cover: "cover",
};

let byType: Record<string, ActionDef[]> = FALLBACK_BY_TYPE;
let domainToType: Record<string, string> = FALLBACK_DOMAIN_TO_TYPE;
let generic: ActionDef[] = GENERIC;

/** Replace the client catalogue with the one served by the backend. */
export function setCatalogue(payload: {
  by_type: Record<string, ActionDef[]>;
  domain_to_type: Record<string, string>;
  generic: ActionDef[];
}): void {
  if (payload?.by_type) byType = payload.by_type;
  if (payload?.domain_to_type) domainToType = payload.domain_to_type;
  if (payload?.generic) generic = payload.generic;
}

export function domainOf(entityId: string): string {
  return entityId.split(".")[0] ?? "";
}

/** Actions offered for an entity, generic on/off/toggle as fallback. */
export function actionsForEntity(entityId: string): ActionDef[] {
  const type = domainToType[domainOf(entityId)];
  return (type && byType[type]) || generic;
}

/** Build the self contained token a button inserts into the template. */
export function buildActionToken(
  action: ActionDef,
  entityId: string,
  value?: number | string
): string {
  if (!action.value || value === undefined || value === "") {
    return `{do:${action.service}:${entityId}}`;
  }
  return `{do:${action.service}:${entityId}:${action.value.key}=${value}}`;
}

/**
 * The label section of a placeholder, empty when there is nothing to say.
 *
 * A label holding a comma, an equals sign, a brace or a pipe would break the
 * placeholder around it, so it is dropped rather than written into a token the
 * backend would then read back wrongly. Mirrors format_labels in labels.py.
 */
function labelSection(labels?: Record<string, string>): string {
  const parts = Object.entries(labels ?? {})
    .filter(
      ([state, label]) =>
        state && label && !/[,={}|]/.test(label)
    )
    .map(([state, label]) => `${state}=${label}`);
  return parts.length ? `|${parts.join(",")}` : "";
}

export function buildStateToken(
  entityId: string,
  labels?: Record<string, string>
): string {
  return `{state:${entityId}${labelSection(labels)}}`;
}

export function buildAttrToken(
  entityId: string,
  attribute: string,
  labels?: Record<string, string>
): string {
  return `{attr:${entityId}:${attribute}${labelSection(labels)}}`;
}

// Which values an entity can report, so the composer can offer a word for each
// one instead of asking the user to know them. The entity is asked first, since
// it publishes the real list for the things that have one; this table only
// covers the domains whose states are fixed and never published.
const STATES_BY_DOMAIN: Record<string, string[]> = {
  light: ["on", "off"],
  switch: ["on", "off"],
  fan: ["on", "off"],
  siren: ["on", "off"],
  input_boolean: ["on", "off"],
  automation: ["on", "off"],
  binary_sensor: ["on", "off"],
  lock: ["locked", "unlocked", "open"],
  cover: ["open", "closed", "opening", "closing"],
  person: ["home", "not_home"],
  device_tracker: ["home", "not_home"],
  alarm_control_panel: ["disarmed", "armed_home", "armed_away", "triggered"],
  media_player: ["playing", "paused", "idle", "off"],
  vacuum: ["cleaning", "docked", "returning", "paused", "idle"],
  water_heater: ["eco", "performance", "off"],
};

/**
 * The states worth offering a word for, or an empty list when there is no
 * meaningful set.
 *
 * A sensor reporting a temperature has infinitely many values and none of them
 * wants a label, so it gets none: offering a text field per value there would
 * be noise. What the entity itself publishes wins over the table, because a
 * thermostat knows its own modes better than any list written here.
 */
export function labelableStates(
  attributes: Record<string, any> | undefined,
  entityId: string
): string[] {
  const published =
    attributes?.options ?? attributes?.hvac_modes ?? attributes?.effect_list;
  if (Array.isArray(published) && published.length && published.length <= 12) {
    return published.map(String);
  }
  return STATES_BY_DOMAIN[domainOf(entityId)] ?? [];
}

// Where the real limits of a parameter live in the entity attributes. The
// catalogue only carries generic defaults; the device is the authority, so a
// thermostat that accepts 7 to 30 shows 7 to 30 instead of the generic 5 to 35.
const RANGE_ATTRS: Record<string, { min?: string; max?: string; step?: string }> = {
  temperature: { min: "min_temp", max: "max_temp", step: "target_temp_step" },
  percentage: { step: "percentage_step" },
  value: { min: "min", max: "max", step: "step" },
};

// Enum parameters whose allowed options the entity publishes itself.
const ENUM_ATTRS: Record<string, string> = {
  hvac_mode: "hvac_modes",
  preset_mode: "preset_modes",
  fan_mode: "fan_modes",
  swing_mode: "swing_modes",
  operation_mode: "operation_list",
  source: "source_list",
};

/**
 * Narrow a catalogue value descriptor to what the selected entity really
 * supports, so while building the command you can see the range to expect.
 */
export function resolveValueSpec(
  hass: HomeAssistant,
  entityId: string,
  spec: ActionValueSpec
): ActionValueSpec {
  const attributes = hass.states[entityId]?.attributes ?? {};
  const resolved: ActionValueSpec = { ...spec };

  const mapping = RANGE_ATTRS[spec.key] ?? {};
  for (const kind of ["min", "max", "step"] as const) {
    const attr = mapping[kind];
    const value = attr ? attributes[attr] : undefined;
    if (typeof value === "number") resolved[kind] = value;
  }

  const enumAttr = ENUM_ATTRS[spec.key];
  const options = enumAttr ? attributes[enumAttr] : undefined;
  if (Array.isArray(options) && options.length) {
    resolved.options = options.map(String);
    if (resolved.default === undefined || !resolved.options.includes(String(resolved.default))) {
      resolved.default = resolved.options[0];
    }
  }

  // Keep the default inside the resolved range.
  if (typeof resolved.default === "number") {
    if (typeof resolved.min === "number" && resolved.default < resolved.min) {
      resolved.default = resolved.min;
    }
    if (typeof resolved.max === "number" && resolved.default > resolved.max) {
      resolved.default = resolved.max;
    }
  }

  return resolved;
}

/** Human readable range shown next to a value input, empty when unknown. */
export function rangeLabel(spec: ActionValueSpec): string {
  if (spec.type === "enum") return "";
  if (typeof spec.min !== "number" || typeof spec.max !== "number") return "";
  const unit = spec.unit ? ` ${spec.unit}` : "";
  return `${spec.min} to ${spec.max}${unit}`;
}

/**
 * Attributes worth offering as read buttons.
 * Skips the noisy bookkeeping attributes that are never useful in a reply.
 */
const SKIP_ATTRS = new Set([
  "friendly_name",
  "icon",
  "supported_features",
  "device_class",
  "entity_picture",
  "attribution",
  "supported_color_modes",
  "hs_color",
  "rgb_color",
  "xy_color",
]);

export function readableAttributes(
  hass: HomeAssistant,
  entityId: string
): string[] {
  const state = hass.states[entityId];
  if (!state?.attributes) return [];
  return Object.entries(state.attributes)
    .filter(
      ([key, value]) =>
        !SKIP_ATTRS.has(key) &&
        (typeof value === "string" ||
          typeof value === "number" ||
          typeof value === "boolean")
    )
    .map(([key]) => key)
    .sort();
}
