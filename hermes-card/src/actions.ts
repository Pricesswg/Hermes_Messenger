// Action catalogue used to build the message buttons.
//
// The backend serves the authoritative catalogue over `hermes/actions`; this
// fallback keeps the palette usable if that call has not landed yet, the same
// arrangement Chronos uses.

import type { ActionDef, HomeAssistant } from "./types";

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

export function buildStateToken(entityId: string): string {
  return `{state:${entityId}}`;
}

export function buildAttrToken(entityId: string, attribute: string): string {
  return `{attr:${entityId}:${attribute}}`;
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
