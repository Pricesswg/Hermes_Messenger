import { LitElement, css, html, unsafeCSS, type TemplateResult } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import * as L from "leaflet";

import { LEAFLET_CSS } from "./leaflet-css";
import type { HomeAssistant, MapNode } from "./types";

/**
 * Base tiles from CARTO (OpenStreetMap data).
 *
 * Never point a distributed integration at tile.openstreetmap.org: their tile
 * usage policy forbids it and the server answers offending clients with
 * "access blocked" tiles. CARTO also ships a native dark style, so the card
 * does not need a CSS invert hack. {r} serves retina tiles automatically.
 */
const CARTO_LIGHT =
  "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png";
const CARTO_DARK = "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png";
const ATTRIBUTION =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>';

/** Optional OpenWeather overlays, unlocked when the user configures a key. */
export const OWM_LAYERS = [
  "temp_new",
  "wind_new",
  "clouds_new",
  "precipitation_new",
] as const;

@customElement("hermes-map")
export class HermesMap extends LitElement {
  static styles = [
    unsafeCSS(LEAFLET_CSS),
    css`
      :host {
        display: block;
      }
      #map {
        height: 420px;
        border-radius: var(--r-md, 10px);
        border: 1px solid var(--border);
        overflow: hidden;
        background: var(--bg-sunken);
      }
      .toolbar {
        display: flex;
        gap: 6px;
        flex-wrap: wrap;
        align-items: center;
        margin-bottom: 10px;
      }
      .lchip {
        padding: 4px 11px;
        border-radius: 999px;
        font-size: 0.72rem;
        font-weight: 700;
        cursor: pointer;
        background: var(--bg-sunken);
        border: 1px solid var(--border);
        color: var(--text-soft);
        font-family: inherit;
      }
      .lchip[data-on="1"] {
        background: var(--accent-soft);
        border-color: var(--accent);
        color: var(--accent-ink);
      }
      .pin {
        background: none;
        border: none;
      }
      .pin div {
        width: 16px;
        height: 16px;
        border-radius: 50%;
        border: 2px solid #1b1b1b;
      }
      .pin div.on {
        background: #2ecc71;
        box-shadow: 0 0 0 3px rgba(46, 204, 113, 0.35);
      }
      .pin div.off {
        background: #ffd60a;
        box-shadow: 0 0 0 3px rgba(255, 214, 10, 0.35);
      }
    `,
  ];

  @property({ attribute: false }) public hass?: HomeAssistant;
  @property({ attribute: false }) public nodes: MapNode[] = [];
  @property() public owmKey = "";
  @property({ type: Number }) public zoom = 10;
  /** Radius filter in km; 0 disables the circle. */
  @property({ type: Number }) public radiusKm = 0;
  @property({ attribute: false }) public center: [number, number] | null = null;

  @state() private _owmLayer = "";

  private _map?: L.Map;
  private _base?: L.TileLayer;
  private _owm?: L.TileLayer;
  private _markers: L.Marker[] = [];
  private _circle?: L.Circle;
  private _resizeObserver?: ResizeObserver;

  protected firstUpdated(): void {
    const container = this.renderRoot.querySelector("#map") as HTMLElement;
    if (!container) return;

    this._map = L.map(container, {
      zoomControl: true,
      attributionControl: true,
    }).setView([46.0, 11.0], this.zoom);

    this._setBase();
    this._drawNodes();

    // Leaflet needs a nudge whenever the card is resized or first revealed,
    // otherwise it renders a partially grey canvas.
    this._resizeObserver = new ResizeObserver(() => this._map?.invalidateSize());
    this._resizeObserver.observe(container);
    window.setTimeout(() => this._map?.invalidateSize(), 60);
  }

  protected updated(changed: Map<string, unknown>): void {
    if (changed.has("nodes") || changed.has("radiusKm") || changed.has("center")) {
      this._drawNodes();
    }
  }

  public disconnectedCallback(): void {
    super.disconnectedCallback();
    this._resizeObserver?.disconnect();
    this._map?.remove();
    this._map = undefined;
  }

  private _isDark(): boolean {
    return matchMedia("(prefers-color-scheme: dark)").matches;
  }

  private _setBase(): void {
    if (!this._map) return;
    this._base?.remove();
    this._base = L.tileLayer(this._isDark() ? CARTO_DARK : CARTO_LIGHT, {
      attribution: ATTRIBUTION,
      maxZoom: 19,
    }).addTo(this._map);
  }

  /** Draw one pin per selected node that actually has a position. */
  private _drawNodes(): void {
    if (!this._map) return;

    for (const marker of this._markers) marker.remove();
    this._markers = [];

    const points: L.LatLngExpression[] = [];
    for (const node of this.nodes) {
      if (node.latitude === null || node.longitude === null) continue;
      const position: L.LatLngExpression = [node.latitude, node.longitude];
      points.push(position);

      const marker = L.marker(position, {
        icon: L.divIcon({
          className: "pin",
          // Green when the node was heard recently, yellow when it was not, so
          // the state of the mesh reads at a glance.
          html: `<div class="${node.connected ? "on" : "off"}"></div>`,
          iconSize: [16, 16],
          iconAnchor: [8, 8],
        }),
        title: node.name,
      }).addTo(this._map);

      marker.bindPopup(this._popup(node));
      this._markers.push(marker);
    }

    this._circle?.remove();
    this._circle = undefined;
    if (this.radiusKm > 0 && this.center) {
      this._circle = L.circle(this.center, {
        radius: this.radiusKm * 1000,
        // Literal colour: Leaflet writes this straight onto the SVG stroke,
        // where a CSS custom property is not reliably resolved.
        color: "#e0a800",
        weight: 2,
        fillOpacity: 0.06,
      }).addTo(this._map);
      this._map.fitBounds(this._circle.getBounds(), { padding: [20, 20] });
      return;
    }

    if (points.length === 1) {
      this._map.setView(points[0], Math.max(this.zoom, 13));
    } else if (points.length > 1) {
      this._map.fitBounds(L.latLngBounds(points), { padding: [40, 40] });
    }
  }

  private _popup(node: MapNode): string {
    const rows: string[] = [`<b>${node.name}</b>`];
    if (node.nodeNum !== null) rows.push(`#${node.nodeNum}`);
    if (node.battery !== null && node.battery !== undefined) {
      rows.push(`${node.battery}%`);
    }
    if (node.lastSeen) rows.push(node.lastSeen);
    return rows.join("<br>");
  }

  private _toggleOwm(layer: string): void {
    if (!this._map || !this.owmKey) return;
    this._owm?.remove();
    this._owm = undefined;

    if (this._owmLayer === layer) {
      this._owmLayer = "";
      return;
    }

    this._owmLayer = layer;
    this._owm = L.tileLayer(
      `https://tile.openweathermap.org/map/${layer}/{z}/{x}/{y}.png?appid=${this.owmKey}`,
      { opacity: 0.6, maxZoom: 19 }
    ).addTo(this._map);
  }

  protected render(): TemplateResult {
    return html`
      ${this.owmKey
        ? html`
            <div class="toolbar">
              ${OWM_LAYERS.map(
                (layer) => html`
                  <button
                    class="lchip"
                    data-on=${this._owmLayer === layer ? "1" : "0"}
                    @click=${() => this._toggleOwm(layer)}
                  >
                    ${layer.replace("_new", "")}
                  </button>
                `
              )}
            </div>
          `
        : ""}
      <div id="map"></div>
    `;
  }
}
