import { html, type TemplateResult } from "lit";

import "../hermes-map";
import type {
  HermesSettings,
  HomeAssistant,
  MapNode,
  NodeInfo,
  TrailRoute,
} from "../types";
import { distanceKm, mapNodes, trackerNodes } from "../utils";

export interface MapCtx {
  hass: HomeAssistant;
  settings: HermesSettings | null;
  /** Nodes allowed to send commands, across every gateway. */
  authorized: number[];
  /** Every node the radio knows, not only the ones imported as devices. */
  meshNodes: NodeInfo[];
  /** Show every mesh node, not only the ones picked in Settings. */
  showAll: boolean;
  /** Restrict the nodes to a circle around the reference point. */
  radiusOn: boolean;
  radiusKm: number;
  onToggleShowAll: () => void;
  onToggleRadius: () => void;
  onRadiusChange: (km: number) => void;
  onHeightChange: (mode: string) => void;
  onSourceChange: (source: string) => void;
  onCustomUrlChange: (url: string) => void;
  /** Marked routes near the reference point, once they have been asked for. */
  trails: TrailRoute[] | null;
  trailsLoading: boolean;
  onFindTrails: (latitude: number, longitude: number) => void;
}

const HEIGHT_MODES = ["auto", "mobile", "tablet", "desktop"];

/**
 * What a Home Assistant weather entity currently says.
 *
 * Read from the states rather than fetched: the entity belongs to whichever
 * weather integration the user already trusts, and Hermes has no business
 * forecasting anything. The radar on the map answers "is it raining on them
 * now"; this answers "what is it doing today", which is the other half of the
 * question anyone asks before setting off.
 */
function renderWeather(
  ctx: MapCtx,
  t: (k: string) => string
): TemplateResult | "" {
  const entityId = ctx.settings?.weather_entity ?? "";
  if (!entityId) return "";

  const state = ctx.hass.states[entityId];
  if (!state) {
    return html`<div class="note warn">
      ${t("map.weatherMissing")} <code>${entityId}</code>
    </div>`;
  }

  const attributes = state.attributes ?? {};
  const parts: string[] = [];
  if (attributes.temperature !== undefined && attributes.temperature !== null) {
    parts.push(
      `${attributes.temperature}${attributes.temperature_unit ?? "°"}`
    );
  }
  if (attributes.wind_speed !== undefined && attributes.wind_speed !== null) {
    parts.push(
      `${t("map.wind")} ${attributes.wind_speed}${
        attributes.wind_speed_unit ? ` ${attributes.wind_speed_unit}` : ""
      }`
    );
  }
  if (attributes.humidity !== undefined && attributes.humidity !== null) {
    parts.push(`${attributes.humidity}% ${t("map.humidity")}`);
  }

  // The condition is the entity's own vocabulary (partlycloudy, rainy). It is
  // shown as it comes: inventing words for a list that each integration can
  // extend would be a translation table that silently goes stale.
  return html`
    <div class="note">
      <b>${attributes.friendly_name ?? entityId}</b> ·
      ${state.state}${parts.length ? ` · ${parts.join(" · ")}` : ""}
    </div>
  `;
}
const MAP_SOURCES = ["esri", "carto", "topo", "custom"];

/**
 * The marked routes near the reference point.
 *
 * Asked for with a button rather than fetched with the map: the query goes to
 * Overpass, which runs on donated capacity, and a panel that looked it up on
 * every render would be the kind of client that gets everyone blocked.
 */
function renderTrails(
  ctx: MapCtx,
  center: [number, number] | null,
  t: (k: string) => string
): TemplateResult {
  const routes = ctx.trails;

  return html`
    <div class="section" style="margin-top:16px">
      <div class="section-title">
        ${t("map.trailsNear")}
        <button
          class="btn"
          style="margin-left:8px"
          ?disabled=${!center || ctx.trailsLoading}
          @click=${() => center && ctx.onFindTrails(center[0], center[1])}
        >
          ${ctx.trailsLoading ? t("common.loading") : t("map.trailsFind")}
        </button>
      </div>

      ${!center
        ? html`<div class="empty">${t("map.trailsNoPoint")}</div>`
        : routes === null
          ? html`<div class="hint">${t("map.trailsHint")}</div>`
          : routes.length === 0
            ? html`<div class="empty">${t("map.trailsNone")}</div>`
            : html`
                <div class="rows">
                  ${routes.map(
                    (route) => html`
                      <div class="row">
                        <span class="k">
                          <b>${route.name || route.ref || route.id}</b>
                          ${route.network
                            ? html`<span class="used">
                                ${t(`map.network.${route.network}`)}
                              </span>`
                            : ""}
                          ${route.from || route.to
                            ? html`<br /><span class="hint">
                                  ${route.from} → ${route.to}
                                </span>`
                            : ""}
                        </span>
                        <span class="v">
                          ${route.distance ? `${route.distance} km · ` : ""}
                          <a
                            href=${route.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            >OSM</a
                          >
                        </span>
                      </div>
                    `
                  )}
                </div>
                <div class="hint" style="margin-top:6px">
                  ${t("map.trailsSource")}
                </div>
              `}
    </div>
  `;
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
  const allNodes: MapNode[] = mapNodes(
    ctx.hass,
    selected,
    ctx.showAll,
    ctx.settings?.reachable_minutes ?? 120,
    ctx.authorized,
    ctx.meshNodes
  );

  // Trackers that are not mesh nodes, appended rather than merged: they have
  // no node number, so nothing downstream can confuse one for the other.
  allNodes.push(
    ...trackerNodes(ctx.hass, ctx.settings?.extra_trackers ?? [])
  );

  const center = referencePoint(allNodes);
  const radiusActive = ctx.radiusOn && center !== null && ctx.radiusKm > 0;

  // The radius only ever hides nodes from the map. Nodes without a position
  // are never filtered out: they have no distance to compare, and dropping
  // them would make authorized nodes silently vanish from the list.
  const nodes = radiusActive
    ? allNodes.filter(
        (node) =>
          node.latitude === null ||
          node.longitude === null ||
          distanceKm(center![0], center![1], node.latitude, node.longitude) <=
            ctx.radiusKm
      )
    : allNodes;

  const positioned = nodes.filter(
    (node) => node.latitude !== null && node.longitude !== null
  );
  const anyPositioned = allNodes.some((node) => node.latitude !== null);

  return html`
    <h2 class="screen-title">${t("tab.map")}</h2>

    ${renderWeather(ctx, t)}

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

      <span class="radius">
        <label class="check" style="gap:6px">
          <span>${t("map.size")}</span>
          <select
            @change=${(e: Event) =>
              ctx.onHeightChange((e.target as HTMLSelectElement).value)}
          >
            ${HEIGHT_MODES.map(
              (mode) => html`
                <option
                  value=${mode}
                  ?selected=${(ctx.settings?.map_height ?? "auto") === mode}
                >
                  ${t(`map.size.${mode}`)}
                </option>
              `
            )}
          </select>
        </label>
      </span>

      <span class="radius">
        <label class="check" style="gap:6px">
          <span>${t("map.source")}</span>
          <select
            @change=${(e: Event) =>
              ctx.onSourceChange((e.target as HTMLSelectElement).value)}
          >
            ${MAP_SOURCES.map(
              (id) => html`
                <option
                  value=${id}
                  ?selected=${(ctx.settings?.map_source ?? "esri") === id}
                >
                  ${t(`map.source.${id}`)}
                </option>
              `
            )}
          </select>
        </label>
      </span>

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

    <div class="hint" style="margin:-4px 0 10px">${t("map.sourceHint")}</div>

    ${(ctx.settings?.map_source ?? "esri") === "custom"
      ? html`
          <div class="map-custom">
            <input
              type="text"
              spellcheck="false"
              autocomplete="off"
              .value=${ctx.settings?.map_custom_url ?? ""}
              placeholder="https://tiles.example.org/{z}/{x}/{y}.png"
              @change=${(e: Event) =>
                ctx.onCustomUrlChange(
                  (e.target as HTMLInputElement).value.trim()
                )}
            />
            <span class="hint">${t("map.customUrlHint")}</span>
          </div>
        `
      : ""}

    <div class="legend">
      <span class="dot on"></span>${t("map.connected")}
      <span class="dot off"></span>${t("map.notConnected")}
      <span class="dot relay"></span>${t("map.relay")}
      ${(ctx.settings?.extra_trackers ?? []).length
        ? html`<span class="dot tracker"></span>${t("map.tracker")}`
        : ""}
    </div>

    ${!selected.length && !ctx.showAll
      ? html`<div class="empty">${t("map.noSelection")}</div>`
      : positioned.length === 0
        ? html`<div class="empty">
            ${anyPositioned && radiusActive
              ? t("map.noneInRadius")
              : t("map.noPosition")}
          </div>`
        : html`
            <hermes-map
              .hass=${ctx.hass}
              .nodes=${positioned}
              .owmKey=${ctx.settings?.openweather_api_key ?? ""}
              .zoom=${ctx.settings?.map_zoom ?? 10}
              .radiusKm=${ctx.radiusOn ? ctx.radiusKm : 0}
              .center=${center}
              .heightMode=${ctx.settings?.map_height ?? "auto"}
              .pinSize=${ctx.settings?.map_pin_size ?? "medium"}
              .labels=${ctx.settings?.map_labels ?? false}
              .source=${ctx.settings?.map_source ?? "esri"}
              .customUrl=${ctx.settings?.map_custom_url ?? ""}
            ></hermes-map>
          `}

    ${renderTrails(ctx, center, t)}

    ${nodes.length
      ? html`
          <div class="rows" style="margin-top:14px">
            ${nodes.map(
              (node) => html`
                <div class="row">
                  <span class="k">
                    <span
                      class="dot ${!node.authorized
                        ? "relay"
                        : node.connected
                          ? "on"
                          : "off"}"
                    ></span>
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
