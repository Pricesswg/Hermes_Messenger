// Thin wrappers over the hermes/* websocket commands exposed by the backend.

import type {
  HermesCommand,
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

export function fetchNodes(hass: HomeAssistant): Promise<NodeInfo[]> {
  return hass.callWS<NodeInfo[]>({ type: "hermes/nodes/list" });
}
