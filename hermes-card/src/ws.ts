// Thin wrappers over the hermes/* websocket commands exposed by the backend.

import type {
  HermesCommand,
  HermesLogEntry,
  HermesPreset,
  HermesEntry,
  HermesSettings,
  HomeAssistant,
  NodeInfo,
} from "./types";

export function fetchSettings(hass: HomeAssistant): Promise<HermesSettings> {
  return hass.callWS<HermesSettings>({ type: "hermes/settings/get" });
}

export function updateSettings(
  hass: HomeAssistant,
  patch: Partial<HermesSettings>
): Promise<HermesSettings> {
  return hass.callWS<HermesSettings>({ type: "hermes/settings/update", patch });
}

export function fetchEntries(hass: HomeAssistant): Promise<HermesEntry[]> {
  return hass.callWS<HermesEntry[]>({ type: "hermes/entries/list" });
}

export function updateEntry(
  hass: HomeAssistant,
  entryId: string,
  patch: Record<string, any>
): Promise<HermesEntry> {
  return hass.callWS<HermesEntry>({
    type: "hermes/entry/update",
    entry_id: entryId,
    patch,
  });
}

export function saveCommand(
  hass: HomeAssistant,
  entryId: string,
  command: HermesCommand
): Promise<HermesCommand> {
  return hass.callWS<HermesCommand>({
    type: "hermes/commands/save",
    entry_id: entryId,
    command,
  });
}

export function removeCommand(
  hass: HomeAssistant,
  entryId: string,
  commandId: string
): Promise<unknown> {
  return hass.callWS({
    type: "hermes/commands/remove",
    entry_id: entryId,
    command_id: commandId,
  });
}

export function fetchActions(hass: HomeAssistant): Promise<any> {
  return hass.callWS<any>({ type: "hermes/actions" });
}

export function fetchNodes(hass: HomeAssistant): Promise<NodeInfo[]> {
  return hass.callWS<NodeInfo[]>({ type: "hermes/nodes/list" });
}

export function fetchPresets(hass: HomeAssistant): Promise<HermesPreset[]> {
  return hass.callWS<HermesPreset[]>({ type: "hermes/presets/list" });
}

export function savePreset(
  hass: HomeAssistant,
  preset: HermesPreset
): Promise<HermesPreset> {
  return hass.callWS<HermesPreset>({ type: "hermes/presets/save", preset });
}

export function removePreset(
  hass: HomeAssistant,
  presetId: string
): Promise<unknown> {
  return hass.callWS({ type: "hermes/presets/remove", preset_id: presetId });
}

export function sendPreset(
  hass: HomeAssistant,
  entryId: string,
  presetId: string
): Promise<unknown> {
  return hass.callWS({
    type: "hermes/presets/send",
    entry_id: entryId,
    preset_id: presetId,
  });
}

export function fetchHistory(hass: HomeAssistant): Promise<HermesLogEntry[]> {
  return hass.callWS<HermesLogEntry[]>({ type: "hermes/history/list" });
}

export function clearHistory(hass: HomeAssistant): Promise<unknown> {
  return hass.callWS({ type: "hermes/history/clear" });
}
