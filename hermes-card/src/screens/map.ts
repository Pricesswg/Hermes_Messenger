import { html, type TemplateResult } from "lit";

import "../hermes-map";
import type { HermesSettings, HomeAssistant } from "../types";
import { mapNodes } from "../utils";

/**
 * Map screen: only the nodes the user picked in Settings are drawn, which is
 * what makes this usable as an emergency tracker instead of a crowded map.
 */
export function renderMap(
  hass: HomeAssistant,
  settings: HermesSettings | null,
  t: (k: string) => string
): TemplateResult {
  const selected = settings?.map_nodes ?? [];
  const nodes = mapNodes(hass, selected);

  if (!selected.length) {
    return html`
      <h2 class="screen-title">${t("tab.map")}</h2>
      <div class="empty">${t("map.noSelection")}</div>
    `;
  }

  const positioned = nodes.filter(
    (node) => node.latitude !== null && node.longitude !== null
  );

  return html`
    <h2 class="screen-title">${t("tab.map")}</h2>

    ${positioned.length === 0
      ? html`<div class="empty">${t("map.noPosition")}</div>`
      : html`
          <hermes-map
            .hass=${hass}
            .nodes=${positioned}
            .owmKey=${settings?.openweather_api_key ?? ""}
            .zoom=${settings?.map_zoom ?? 10}
          ></hermes-map>
        `}

    ${nodes.length
      ? html`
          <div class="rows" style="margin-top:14px">
            ${nodes.map(
              (node) => html`
                <div class="row">
                  <span class="k">${node.name}</span>
                  <span class="v">
                    ${node.latitude !== null && node.longitude !== null
                      ? `${node.latitude.toFixed(5)}, ${node.longitude.toFixed(5)}`
                      : t("map.waiting")}
                  </span>
                </div>
              `
            )}
          </div>
        `
      : ""}
  `;
}
