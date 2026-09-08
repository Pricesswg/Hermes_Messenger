import { LitElement, css, html, unsafeCSS, type TemplateResult } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import * as L from "leaflet";

import { LEAFLET_CSS } from "./leaflet-css";
import { translator } from "./i18n";
import type { HomeAssistant, MapNode } from "./types";

/**
 * Base tile sources, all of them reachable without an API key.
 *
 * Esri's gray canvases are the default: a quiet backdrop built for data drawn
 * on top of it, in a light and a dark variant, on legacy endpoints Esri keeps
 * serving keyless. CARTO stays selectable for whoever prefers its look, but
 * since September 2026 it stamps "API KEY REQUIRED" diagonally across every
 * keyless tile, whatever Referer the browser sends, so it can no longer be
 * the default. OpenTopoMap shows the terrain, which on a Meshtastic map is
 * not decoration: relief is what explains why a node is or is not heard.
 *
 * Never point a distributed integration at tile.openstreetmap.org: their tile
 * usage policy forbids it and the server answers offending clients with
 * "access blocked" tiles. {r} serves retina tiles automatically.
 */
interface BaseSource {
  light: string;
  dark?: string;
  subdomains?: string;
  /** Where the provider's own tiles stop; past it Leaflet upscales. */
  maxNativeZoom?: number;
  attribution: string;
}

const ESRI = "https://server.arcgisonline.com/ArcGIS/rest/services";
/**
 * Every source is drawn up to this zoom. Pins sit metres apart, so capping
 * the map at a provider's last native level (16 for Esri, 15 for OpenTopoMap)
 * would cost more than the blur of an upscaled tile does.
 */
const MAX_ZOOM = 18;

export const BASE_SOURCES: Record<string, BaseSource> = {
  esri: {
    // Note the {z}/{y}/{x} order: this endpoint is not the usual XYZ one.
    light: `${ESRI}/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}`,
    dark: `${ESRI}/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}`,
    maxNativeZoom: 16,
    attribution:
      'Tiles &copy; <a href="https://www.esri.com/">Esri</a> &mdash; Esri, HERE, Garmin, &copy; OpenStreetMap contributors',
  },
  carto: {
    light:
      "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png",
    dark: "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
    subdomains: "abcd",
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
  },
  topo: {
    light: "https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png",
    subdomains: "abc",
    maxNativeZoom: 15,
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, SRTM &middot; &copy; <a href="https://opentopomap.org/">OpenTopoMap</a> (CC-BY-SA)',
  },
};

export const DEFAULT_SOURCE = "esri";

/**
 * A custom XYZ template is accepted only when it is https, carries the
 * {z}/{x}/{y} placeholders and holds no character that could break out of the
 * URL Leaflet builds from it. Anything else returns null and the caller falls
 * back to the default source without ever hitting the network.
 */
export function customTileTemplate(url: string): string | null {
  const src = (url || "").trim();
  if (!src || src.length > 512 || !src.startsWith("https://")) return null;
  if (!src.includes("{z}") || !src.includes("{x}") || !src.includes("{y}")) {
    return null;
  }
  if (/[\s<>"'`]/.test(src)) return null;
  try {
    new URL(src.replace(/\{[sxyzr]\}/g, "0"));
  } catch {
    return null;
  }
  return src;
}

/**
 * Marked hiking routes, drawn over whatever base is selected.
 *
 * Waymarked Trails renders the route relations of OpenStreetMap: the paths
 * that carry a waymark on a tree, with the colour of their network. On a map
 * of node positions in the mountains this is the layer that turns "somewhere
 * up there" into "on the GTA between Piamprato and Ronco". Transparent tiles,
 * no key, CC-BY-SA like the data underneath.
 */
const TRAILS_URL = "https://tile.waymarkedtrails.org/hiking/{z}/{x}/{y}.png";
const TRAILS_ATTRIBUTION =
  '&copy; <a href="https://waymarkedtrails.org/">Waymarked Trails</a> (CC-BY-SA)';

/**
 * Precipitation radar. Free and without a key, which is the reason it is here
 * rather than behind the OpenWeather key: the one weather layer that matters
 * while someone is out is the one that says whether it is raining on them, and
 * it should not depend on having signed up for anything.
 */
const RAINVIEWER_INDEX = "https://api.rainviewer.com/public/weather-maps.json";
/** How often the frame list is refreshed. RainViewer publishes every 10 min. */
const RADAR_REFRESH_MS = 10 * 60 * 1000;
const RADAR_STEP_MS = 700;

/** One radar frame: its timestamp and the tile layer already on the map. */
interface RadarFrame {
  time: number;
  layer: L.TileLayer;
}

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
        /* Driven by the size preset. "auto" scales with the viewport so the
         * same card is usable on a phone and on a desktop without a setting. */
        height: var(--hermes-map-height, clamp(320px, 60vh, 900px));
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
      /* A node that may not send commands is a relay as far as Hermes is
       * concerned: it carries traffic but is not a peer, so it reads as a
       * different kind of thing rather than a different state. */
      .pin div.relay {
        background: #4aa3ff;
        box-shadow: 0 0 0 3px rgba(74, 163, 255, 0.30);
      }
      /* A halo was not enough: over a busy map the text still landed on tiles
       * and other labels. An opaque chip on its own stacking level reads in
       * every case, and a long name is cut rather than covering a neighbour. */
      .pin .tag {
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        top: 100%;
        margin-top: 4px;
        max-width: 120px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-size: 10px;
        font-weight: 700;
        line-height: 1.4;
        padding: 1px 5px;
        border-radius: 4px;
        color: var(--text);
        background: var(--surface);
        border: 1px solid var(--border);
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.25);
        pointer-events: none;
      }
      /* Labels above every marker, so one pin never sits on another's name. */
      .leaflet-marker-icon:hover {
        z-index: 500 !important;
      }
      /* Sources with no dark variant (OpenTopoMap, custom) in dark mode.
       * Inverting hue as well as luminance keeps water blue and woods green
       * instead of turning the whole map into a photographic negative. */
      .base-tiles--darkened {
        filter: invert(1) hue-rotate(180deg) brightness(0.82) contrast(0.92)
          saturate(0.7);
      }
      .radar-bar input[type="range"] {
        flex: 1;
        min-width: 120px;
        max-width: 260px;
      }
      .frame-time {
        font-family: var(--font-mono, monospace);
        font-size: 0.72rem;
        color: var(--text-soft);
        min-width: 74px;
      }
      .lchip[disabled] {
        opacity: 0.45;
        cursor: default;
      }
      .base-note {
        margin-top: 8px;
        padding: 6px 9px;
        font-size: 0.72rem;
        line-height: 1.45;
        color: var(--text-muted);
        background: var(--bg-sunken);
        border-left: 3px solid var(--accent);
        border-radius: var(--r-sm, 6px);
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
  @property() public heightMode = "auto";
  @property() public pinSize = "medium";
  @property({ type: Boolean }) public labels = false;
  /** esri, carto, topo or custom. */
  @property() public source = DEFAULT_SOURCE;
  /** XYZ template used when source is "custom". */
  @property() public customUrl = "";

  @state() private _owmLayer = "";
  /** Source that failed and was swapped out, "" while none has. */
  @state() private _baseFallback = "";
  @state() private _trailsOn = false;
  @state() private _radarOn = false;
  @state() private _radarError = false;
  @state() private _frameIdx = 0;
  @state() private _playing = false;
  @state() private _frameCount = 0;
  @state() private _frameTime = 0;

  private _map?: L.Map;
  private _base?: L.TileLayer;
  private _owm?: L.TileLayer;
  private _trails?: L.TileLayer;
  // Every frame stays on the map at zero opacity, so scrubbing and playing are
  // instant instead of refetching tiles at each step.
  private _frames: RadarFrame[] = [];
  private _pastCount = 0;
  private _playTimer?: number;
  private _radarTimer?: number;
  private _markers: L.Marker[] = [];
  private _circle?: L.Circle;
  private _resizeObserver?: ResizeObserver;
  private _themeQuery?: MediaQueryList;
  private _signature = "";
  private _heightApplied = "";

  protected firstUpdated(): void {
    const container = this.renderRoot.querySelector("#map") as HTMLElement;
    if (!container) return;

    this._map = L.map(container, {
      zoomControl: true,
      attributionControl: true,
    }).setView([46.0, 11.0], this.zoom);

    this._buildBase();
    this._drawNodes();

    // The base layer is chosen for the current theme, so a theme flip has to
    // rebuild it. Nothing else in the card watches this, and Leaflet has no
    // notion of a colour scheme.
    this._themeQuery = matchMedia("(prefers-color-scheme: dark)");
    this._themeQuery.addEventListener("change", this._onThemeChange);

    // Leaflet needs a nudge whenever the card is resized or first revealed,
    // otherwise it renders a partially grey canvas.
    void this._loadRadar();
    this._radarTimer = window.setInterval(
      () => void this._loadRadar(),
      RADAR_REFRESH_MS
    );

    this._resizeObserver = new ResizeObserver(() => this._map?.invalidateSize());
    this._resizeObserver.observe(container);
    window.setTimeout(() => this._map?.invalidateSize(), 60);
  }

  protected willUpdate(): void {
    const heights: Record<string, string> = {
      auto: "clamp(320px, 60vh, 900px)",
      mobile: "340px",
      tablet: "520px",
      desktop: "760px",
    };
    this.style.setProperty(
      "--hermes-map-height",
      heights[this.heightMode] ?? heights.auto
    );
  }

  protected updated(changed: Map<string, unknown>): void {
    if (this._map && (changed.has("source") || changed.has("customUrl"))) {
      // A source the user just picked deserves a clean try even if the
      // previous one had already fallen back.
      this._baseFallback = "";
      this._buildBase();
    }

    // Compare by value, not identity. The parent rebuilds the nodes array and
    // the centre tuple on every render, so an identity check would redraw and
    // re-fit the view continuously, making the map impossible to pan.
    const signature = JSON.stringify([
      this.nodes.map((n) => [
        n.nodeNum,
        n.latitude,
        n.longitude,
        n.connected,
        n.authorized,
      ]),
      this.radiusKm,
      this.center,
      this.pinSize,
      this.labels,
    ]);
    if (signature !== this._signature) {
      this._signature = signature;
      this._drawNodes();
    }
    if (this.heightMode !== this._heightApplied) {
      this._heightApplied = this.heightMode;
      // Leaflet caches the container size, so it must be told after a resize.
      window.setTimeout(() => this._map?.invalidateSize(), 50);
    }
  }

  public disconnectedCallback(): void {
    super.disconnectedCallback();
    this._resizeObserver?.disconnect();
    this._themeQuery?.removeEventListener("change", this._onThemeChange);
    this._themeQuery = undefined;
    this._pause();
    if (this._radarTimer) {
      window.clearInterval(this._radarTimer);
      this._radarTimer = undefined;
    }
    for (const frame of this._frames) frame.layer.remove();
    this._frames = [];
    this._map?.remove();
    this._map = undefined;
    this._base = undefined;
  }

  private _isDark(): boolean {
    return matchMedia("(prefers-color-scheme: dark)").matches;
  }

  private _onThemeChange = (): void => {
    this._baseFallback = "";
    this._buildBase();
  };

  /** Resolve the configured source to a tile spec, in the current theme. */
  private _baseSpec(sourceId: string): {
    url: string;
    opts: L.TileLayerOptions;
    filtered: boolean;
  } {
    const dark = this._isDark();

    if (sourceId === "custom") {
      const url = customTileTemplate(this.customUrl);
      if (url) {
        // No attribution string: only the user knows who serves these tiles.
        return {
          url,
          opts: { maxZoom: MAX_ZOOM, attribution: "" },
          filtered: dark,
        };
      }
      sourceId = DEFAULT_SOURCE;
    }

    const src = BASE_SOURCES[sourceId] ?? BASE_SOURCES[DEFAULT_SOURCE];
    return {
      url: dark && src.dark ? src.dark : src.light,
      opts: {
        maxZoom: MAX_ZOOM,
        maxNativeZoom: src.maxNativeZoom,
        subdomains: src.subdomains ?? "abc",
        attribution: src.attribution,
      },
      filtered: dark && !src.dark,
    };
  }

  /**
   * (Re)create the base layer for the current source and theme. Rebuilding
   * rather than calling setUrl is what lets the subdomains, the zoom cap and
   * the dark filter change with the source.
   *
   * The first tile error of a non-default source swaps in Esri, so a dead
   * custom server or a provider that changed its terms never leaves the pins
   * floating over a blank canvas.
   */
  private _buildBase(sourceId?: string): void {
    if (!this._map) return;
    const id = sourceId || this.source || DEFAULT_SOURCE;

    if (this._base) {
      this._map.removeLayer(this._base);
      this._base = undefined;
    }

    const spec = this._baseSpec(id);
    const layer = L.tileLayer(spec.url, {
      ...spec.opts,
      className: spec.filtered
        ? "base-tiles base-tiles--darkened"
        : "base-tiles",
    });

    // One fallback per layer. Without the guard a provider that is down fires
    // a tileerror per tile and rebuilds the map in a loop.
    let failed = false;
    layer.on("tileerror", () => {
      if (failed || id === DEFAULT_SOURCE) return;
      failed = true;
      this._baseFallback = id;
      this._buildBase(DEFAULT_SOURCE);
    });

    layer.addTo(this._map);
    // Pins, the radius circle and the OpenWeather overlay all belong above
    // the backdrop, whichever order the rebuild happened in.
    layer.bringToBack();
    this._base = layer;
  }

  private _toggleTrails = (): void => {
    this._trailsOn = !this._trailsOn;
    if (!this._map) return;
    if (!this._trailsOn) {
      this._trails?.remove();
      this._trails = undefined;
      return;
    }
    this._trails = L.tileLayer(TRAILS_URL, {
      attribution: TRAILS_ATTRIBUTION,
      maxZoom: MAX_ZOOM,
      // Waymarked Trails renders to 18; past that Leaflet upscales rather than
      // asking for a tile that comes back empty.
      maxNativeZoom: 18,
      opacity: 0.85,
      zIndex: 4,
    }).addTo(this._map);
  };

  /**
   * Fetch the list of radar frames and put each one on the map at zero
   * opacity. A hiccup keeps the frames already showing: slightly old radar is
   * worth more than an empty map, and the next refresh is ten minutes away.
   */
  private async _loadRadar(): Promise<void> {
    try {
      const response = await fetch(RAINVIEWER_INDEX);
      const data = await response.json();
      const past = (data?.radar?.past || []).slice(-7);
      const nowcast = data?.radar?.nowcast || [];
      const raw = [...past, ...nowcast];
      if (!raw.length || !this._map) {
        this._radarError = !this._frames.length;
        return;
      }

      const wasPlaying = this._playing;
      this._pause();
      for (const frame of this._frames) frame.layer.remove();
      this._pastCount = past.length;
      this._frames = raw.map((entry: any) => ({
        time: entry.time,
        layer: L.tileLayer(`${data.host}${entry.path}/256/{z}/{x}/{y}/2/1_1.png`, {
          opacity: 0,
          zIndex: 5,
          maxZoom: MAX_ZOOM,
          // The free tile API stops at zoom 7 and answers deeper requests with
          // a "zoom level not supported" placeholder. Radar is km-scale data
          // anyway, so cap it and let Leaflet upscale, as their own widget does.
          maxNativeZoom: 7,
        }).addTo(this._map!),
      }));
      this._frameCount = this._frames.length;
      this._radarError = false;
      // Land on the most recent observed frame; playing the loop is a choice.
      this._showFrame(Math.max(0, this._pastCount - 1));
      if (wasPlaying) this._togglePlay();
    } catch {
      this._radarError = !this._frames.length;
    }
  }

  private _showFrame(index: number): void {
    this._frameIdx = index;
    this._frameTime = this._frames[index]?.time ?? 0;
    this._frames.forEach((frame, position) =>
      frame.layer.setOpacity(this._radarOn && position === index ? 0.7 : 0)
    );
  }

  private _toggleRadar = (): void => {
    this._radarOn = !this._radarOn;
    if (!this._radarOn) this._pause();
    this._showFrame(this._frameIdx);
  };

  private _togglePlay = (): void => {
    if (this._playing) {
      this._pause();
      return;
    }
    if (!this._frames.length) return;
    if (!this._radarOn) this._radarOn = true;
    this._playing = true;
    this._playTimer = window.setInterval(() => {
      this._showFrame((this._frameIdx + 1) % this._frames.length);
    }, RADAR_STEP_MS);
  };

  private _pause(): void {
    this._playing = false;
    if (this._playTimer) {
      window.clearInterval(this._playTimer);
      this._playTimer = undefined;
    }
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

      const sizes: Record<string, number> = { small: 12, medium: 16, large: 22 };
      const px = sizes[this.pinSize] ?? sizes.medium;
      // Blue marks a node that cannot send commands. Among the ones that can,
      // green and yellow say whether it was heard recently.
      const kind = !node.authorized
        ? "relay"
        : node.connected
          ? "on"
          : "off";
      const tag = this.labels
        ? `<span class="tag">${node.name}</span>`
        : "";

      const marker = L.marker(position, {
        icon: L.divIcon({
          className: "pin",
          html: `<div class="${kind}" style="width:${px}px;height:${px}px"></div>${tag}`,
          iconSize: [px, px],
          iconAnchor: [px / 2, px / 2],
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
    const t = translator(this.hass);
    return html`
      <div class="toolbar">
        <button
          class="lchip"
          data-on=${this._trailsOn ? "1" : "0"}
          @click=${this._toggleTrails}
        >
          ${t("map.layer.trails")}
        </button>
        <button
          class="lchip"
          data-on=${this._radarOn ? "1" : "0"}
          ?disabled=${!this._frameCount && !this._radarError}
          @click=${this._toggleRadar}
        >
          ${t("map.layer.radar")}
        </button>

        ${OWM_LAYERS.map(
          (layer) => html`
            <button
              class="lchip"
              data-on=${this._owmLayer === layer ? "1" : "0"}
              ?disabled=${!this.owmKey}
              title=${!this.owmKey ? t("map.layer.needsKey") : ""}
              @click=${() => this._toggleOwm(layer)}
            >
              ${t(`map.layer.${layer.replace("_new", "")}`)}
            </button>
          `
        )}
      </div>

      ${this._radarOn
        ? html`
            <div class="toolbar radar-bar">
              ${this._radarError
                ? html`<span class="hint">${t("map.radarError")}</span>`
                : html`
                    <button
                      class="lchip"
                      ?disabled=${!this._frameCount}
                      @click=${this._togglePlay}
                    >
                      ${this._playing ? t("map.pause") : t("map.play")}
                    </button>
                    <span class="frame-time">
                      ${this._frameIdx >= this._pastCount
                        ? html`<b>${t("map.nowcast")}</b> `
                        : ""}
                      ${this._frameTime
                        ? new Date(this._frameTime * 1000).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })
                        : "—"}
                    </span>
                    <input
                      type="range"
                      min="0"
                      max=${Math.max(0, this._frameCount - 1)}
                      .value=${String(this._frameIdx)}
                      ?disabled=${!this._frameCount}
                      @input=${(e: Event) => {
                        this._pause();
                        this._showFrame(
                          Number((e.target as HTMLInputElement).value)
                        );
                      }}
                    />
                  `}
            </div>
          `
        : ""}

      <div id="map"></div>
      ${this._baseFallback
        ? html`<div class="base-note">
            ${t("map.baseFallback").replace("{source}", this._baseFallback)}
          </div>`
        : ""}
    `;
  }
}
