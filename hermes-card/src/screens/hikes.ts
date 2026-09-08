import { html, type TemplateResult } from "lit";

import type { HermesHike } from "../types";

export interface HikesCtx {
  hikes: HermesHike[];
  /** The one opened, with its track. Null while the list is showing. */
  open: HermesHike | null;
  loading: boolean;
  error: string | null;
  onOpen: (hikeId: string) => void;
  onClose: () => void;
  onExport: (hikeId: string) => void;
  onDelete: (hikeId: string) => void;
  onRefresh: () => void;
}

/** Minutes as "4 h 20 min", or "35 min" when there is no hour to show. */
function duration(minutes: number, t: (k: string) => string): string {
  const total = Math.max(0, Math.round(minutes));
  const hours = Math.floor(total / 60);
  const rest = total % 60;
  return hours > 0
    ? `${hours} ${t("hikes.h")} ${rest} ${t("hikes.min")}`
    : `${rest} ${t("hikes.min")}`;
}

function when(iso: string | null | undefined): string {
  if (!iso) return "—";
  const moment = new Date(iso);
  return Number.isNaN(moment.getTime()) ? "—" : moment.toLocaleString();
}

/**
 * The walk in one sentence, assembled from the numbers rather than written.
 *
 * Only the parts that have something to say appear: a walk with no altitude
 * reported does not get a clause claiming zero climb, and a walk that never
 * stopped does not get one about stops. A sentence with a zero in it reads as
 * a measurement, and these zeroes mean "not reported".
 */
function sentence(hike: HermesHike, t: (k: string) => string): string {
  const summary = hike.summary ?? {};
  const parts: string[] = [];

  if ((summary.distance_km ?? 0) > 0) {
    parts.push(`${summary.distance_km} km`);
  }
  if ((summary.duration_min ?? 0) > 0) {
    parts.push(duration(summary.duration_min ?? 0, t));
  }
  if ((summary.climb_m ?? 0) > 0) {
    parts.push(`${summary.climb_m} ${t("hikes.climbShort")}`);
  }
  if ((summary.stops ?? 0) > 0) {
    parts.push(
      `${summary.stops} ${t("hikes.stopsShort")} (${duration(
        summary.stopped_min ?? 0,
        t
      )})`
    );
  }
  if ((summary.max_from_start_km ?? 0) > 0) {
    parts.push(`${summary.max_from_start_km} km ${t("hikes.outShort")}`);
  }

  return parts.length ? parts.join(" · ") : t("hikes.noTrack");
}

function row(label: string, value: string): TemplateResult {
  return html`
    <div class="row">
      <span class="k">${label}</span>
      <span class="v">${value}</span>
    </div>
  `;
}

function detail(
  hike: HermesHike,
  ctx: HikesCtx,
  t: (k: string) => string
): TemplateResult {
  const summary = hike.summary ?? {};
  const events = hike.events ?? [];

  return html`
    <div class="map-controls">
      <button class="btn" @click=${ctx.onClose}>${t("hikes.back")}</button>
      <button class="btn primary" @click=${() => ctx.onExport(hike.id)}>
        ${t("hikes.exportGpx")}
      </button>
      <button
        class="btn danger"
        style="margin-left:auto"
        @click=${() => ctx.onDelete(hike.id)}
      >
        ${t("hikes.delete")}
      </button>
    </div>

    <div class="note">${sentence(hike, t)}</div>

    <div class="rows">
      ${row(t("hikes.started"), when(hike.started))}
      ${row(t("hikes.ended"), when(hike.ended))}
      ${row(t("hikes.distance"), `${summary.distance_km ?? 0} km`)}
      ${row(t("hikes.duration"), duration(summary.duration_min ?? 0, t))}
      ${row(t("hikes.moving"), duration(summary.moving_min ?? 0, t))}
      ${row(
        t("hikes.stops"),
        `${summary.stops ?? 0} (${duration(summary.stopped_min ?? 0, t)})`
      )}
      ${row(t("hikes.climb"), `${summary.climb_m ?? 0} m`)}
      ${row(t("hikes.maxOut"), `${summary.max_from_start_km ?? 0} km`)}
      ${row(
        t("hikes.points"),
        `${summary.points ?? 0}${hike.truncated ? ` (${t("hikes.truncated")})` : ""}`
      )}
    </div>

    <h3 class="section-title" style="margin-top:16px">${t("hikes.alarms")}</h3>
    ${events.length === 0
      ? html`<div class="empty">${t("hikes.noAlarms")}</div>`
      : html`
          <div class="rows">
            ${events.map(
              (event) => html`
                <div class="row">
                  <span class="k">
                    ${when(event.ts)} · <b>${event.title}</b>
                  </span>
                  <span class="v">${event.message}</span>
                </div>
              `
            )}
          </div>
        `}
  `;
}

export function renderHikes(
  ctx: HikesCtx,
  t: (k: string) => string
): TemplateResult {
  return html`
    <h2 class="screen-title">
      ${t("tab.hikes")}
      <button class="btn refresh" @click=${ctx.onRefresh}>
        ${t("settings.refresh")}
      </button>
    </h2>

    ${ctx.error ? html`<div class="note warn">${ctx.error}</div>` : ""}

    ${ctx.open
      ? detail(ctx.open, ctx, t)
      : ctx.hikes.length === 0
        ? html`<div class="empty">${t("hikes.empty")}</div>`
        : html`
            <div class="rows">
              ${ctx.hikes.map(
                (hike) => html`
                  <div
                    class="row clickable"
                    role="button"
                    tabindex="0"
                    @click=${() => ctx.onOpen(hike.id)}
                    @keydown=${(e: KeyboardEvent) => {
                      if (e.key === "Enter" || e.key === " ") ctx.onOpen(hike.id);
                    }}
                  >
                    <span class="k">
                      <b>${hike.name}</b><br />
                      <span class="hint">${when(hike.started)}</span>
                    </span>
                    <span class="v">${sentence(hike, t)}</span>
                  </div>
                `
              )}
            </div>
          `}

    <div class="hint" style="margin-top:12px">${t("hikes.note")}</div>
  `;
}
