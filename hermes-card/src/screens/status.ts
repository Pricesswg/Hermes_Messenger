import { html, type TemplateResult } from "lit";

import type { HomeAssistant } from "../types";
import { hasHermes, hermesSensor, meshNodes } from "../utils";

/** Status screen: a compact overview, no long lists. */
export function renderStatus(
  hass: HomeAssistant,
  t: (k: string) => string
): TemplateResult {
  if (!hasHermes(hass)) {
    return html`<div class="empty">${t("status.noIntegration")}</div>`;
  }

  const nodes = meshNodes(hass);
  const executed = hermesSensor(hass, "commands_executed");
  const lastCommand = hermesSensor(hass, "last_command");
  const lastError = hermesSensor(hass, "last_error");

  const asText = (value?: string): string =>
    !value || value === "unknown" || value === "unavailable"
      ? t("status.none")
      : value;

  return html`
    <h2 class="screen-title">${t("status.title")}</h2>
    <div class="grid">
      <div class="panel stat">
        <div class="label">${t("status.nodes")}</div>
        <div class="value">${nodes.length}</div>
      </div>
      <div class="panel stat">
        <div class="label">${t("status.executed")}</div>
        <div class="value">${executed ? executed.state : "0"}</div>
      </div>
      <div class="panel stat">
        <div class="label">${t("status.lastCommand")}</div>
        <div class="value small">${asText(lastCommand?.state)}</div>
      </div>
      <div class="panel stat">
        <div class="label">${t("status.lastError")}</div>
        <div class="value small">${asText(lastError?.state)}</div>
      </div>
    </div>
  `;
}
