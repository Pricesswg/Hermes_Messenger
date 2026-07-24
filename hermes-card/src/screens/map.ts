import { html, type TemplateResult } from "lit";

import "../hermes-map";
import type { HermesSettings, HomeAssistant, MapNode } from "../types";
import { distanceKm, mapNodes } from "../utils";

export interface MapCtx {
  hass: HomeAssistant;
  settings: HermesSettings | null;
  /** Show every mesh node, not only the ones picked in Settings. */
  showAll: boolean;
  /** Restrict the nodes to a circle around the reference point. */
  radiusOn: boolean;
  radiusKm: number;
  onToggleShowAll: () => void;
  onToggleRadius: () => void;
  onRadiusChange: (km: number) => void;
}

/** Centre of the radius circle: the first shown node that has a position. */
function referencePoint(nodes: MapNode[]): [number, number] | null {
  const anchor =
    nodes.find((n) => n.selected && n.latitude !== null) ??
    nodes.find((n) => n.latitude !== null);
  return anchor && anchor.latitude !== null && anchor.longitude !== null
    ? [anchor.latitude, anchor.longitude]
    : null;
}

export function renderMap(
  ctx: MapCtx,
  t: (k: string) => string
): TemplateResult {
  const selected = ctx.settings?.map_nodes ?? [];
  let nodes = mapNodes(ctx.hass, selected, ctx.showAll);

  const center = referencePoint(nodes);

  // The radius filter drops nodes outside the circle, so the map stays
  // readable when "show all" pulls in the whole mesh.
  if (ctx.radiusOn && center && ctx.radiusKm > 0) {
    nodes = nodes.filter(
      (node) =>
        node.latitude === null ||
        node.longitude === null ||
        distanceKm(center[0], center[1], node.latitude, node.longitude) <=
          ctx.radiusKm
    );
  }

  const positioned = nodes.filter(
    (node) => node.latitude !== null && node.longitude !== null
  );

  return html`
    <h2 class="screen-title">${t("tab.map")}</h2>

    <div class="map-controls">
      <label class="check">
        <input
          type="checkbox"
          .checked=${ctx.showAll}
          @change=${ctx.onToggleShowAll}
        />
        <span>${t("map.showAll")}</span>
      </label>

      <label class="check">
        <input
          type="checkbox"
          .checked=${ctx.radiusOn}
          @change=${ctx.onToggleRadius}
        />
        <span>${t("map.radiusFilter")}</span>
      </label>

      ${ctx.radiusOn
        ? html`
            <span class="radius">
              <input
                type="range"
                min="1"
                max="200"
                step="1"
                .value=${String(ctx.radiusKm)}
                @input=${(e: Event) =>
                  ctx.onRadiusChange(
                    Number((e.target as HTMLInputElement).value)
                  )}
              />
              <span class="unit">${ctx.radiusKm} km</span>
            </span>
          `
        : ""}
    </div>

    <div class="legend">
      <span class="dot on"></span>${t("map.connected")}
      <span class="dot off"></span>${t("map.notConnected")}
    </div>

    ${!selected.length && !ctx.showAll
      ? html`<div class="empty">${t("map.noSelection")}</div>`
      : positioned.length === 0
        ? html`<div class="empty">${t("map.noPosition")}</div>`
        : html`
            <hermes-map
              .hass=${ctx.hass}
              .nodes=${positioned}
              .owmKey=${ctx.settings?.openweather_api_key ?? ""}
              .zoom=${ctx.settings?.map_zoom ?? 10}
              .radiusKm=${ctx.radiusOn ? ctx.radiusKm : 0}
              .center=${center}
            ></hermes-map>
          `}

    ${nodes.length
      ? html`
          <div class="rows" style="margin-top:14px">
            ${nodes.map(
              (node) => html`
                <div class="row">
                  <span class="k">
                    <span class="dot ${node.connected ? "on" : "off"}"></span>
                    ${node.name}
                  </span>
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
