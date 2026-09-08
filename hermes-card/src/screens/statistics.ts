import { html, svg, type TemplateResult } from "lit";

import type { ChatMessage, HermesEntry, HermesLogEntry } from "../types";

export interface StatisticsCtx {
  entries: HermesEntry[];
  history: HermesLogEntry[];
  chats: Record<string, ChatMessage[]>;
  /** How many rows the log keeps, so usage can be read against its limit. */
  retention: number;
  updatedAt: string;
  onRefresh: () => void;
}

interface Slice {
  label: string;
  value: number;
  /** Index into the categorical slots, or -1 for the folded remainder. */
  slot: number;
}

/** Six categorical slots, assigned in this order and never cycled. */
const SLOTS = 6;

function colourOf(slot: number): string {
  return slot < 0 ? "var(--viz-other)" : `var(--viz-${slot + 1})`;
}

/**
 * Rank, cap and fold a tally into slices.
 *
 * Everything past the slots becomes one neutral "Other": a seventh generated
 * hue would be a colour nobody can name, and on a ring the first and last
 * slices touch, so more slices also means more adjacent pairs to tell apart.
 */
function toSlices(
  counts: Record<string, number>,
  labelOf: (key: string) => string,
  otherLabel: string
): Slice[] {
  const ranked = Object.entries(counts)
    .filter(([, value]) => value > 0)
    .sort((a, b) => b[1] - a[1]);

  const slices: Slice[] = ranked
    .slice(0, SLOTS)
    .map(([key, value], index) => ({
      label: labelOf(key),
      value,
      slot: index,
    }));

  const rest = ranked.slice(SLOTS).reduce((total, [, value]) => total + value, 0);
  if (rest > 0) slices.push({ label: otherLabel, value: rest, slot: -1 });
  return slices;
}

/** Point on the donut, from an angle measured clockwise from twelve o'clock. */
function polar(cx: number, cy: number, r: number, fraction: number): string {
  const angle = fraction * 2 * Math.PI - Math.PI / 2;
  return `${(cx + r * Math.cos(angle)).toFixed(3)} ${(cy + r * Math.sin(angle)).toFixed(3)}`;
}

/**
 * A donut, drawn as one path per slice with a 2px ring of the surface colour
 * between them, so two neighbouring hues never touch. A single slice is drawn
 * as a full ring, because an arc that closes on itself degenerates to nothing.
 */
function donut(slices: Slice[]): TemplateResult {
  const size = 116;
  const cx = size / 2;
  const cy = size / 2;
  const outer = 52;
  const inner = 30;
  const total = slices.reduce((sum, slice) => sum + slice.value, 0);

  if (total <= 0) return html``;

  if (slices.length === 1) {
    return html`
      <svg viewBox="0 0 ${size} ${size}" width="116" height="116" aria-hidden="true">
        <circle
          cx=${cx}
          cy=${cy}
          r=${(outer + inner) / 2}
          fill="none"
          stroke=${colourOf(slices[0].slot)}
          stroke-width=${outer - inner}
        />
      </svg>
    `;
  }

  let cursor = 0;
  const paths = slices.map((slice) => {
    const start = cursor / total;
    cursor += slice.value;
    const end = cursor / total;
    const large = end - start > 0.5 ? 1 : 0;
    const d = [
      `M ${polar(cx, cy, outer, start)}`,
      `A ${outer} ${outer} 0 ${large} 1 ${polar(cx, cy, outer, end)}`,
      `L ${polar(cx, cy, inner, end)}`,
      `A ${inner} ${inner} 0 ${large} 0 ${polar(cx, cy, inner, start)}`,
      "Z",
    ].join(" ");
    return svg`
      <path
        d=${d}
        fill=${colourOf(slice.slot)}
        stroke="var(--surface)"
        stroke-width="2"
      ><title>${slice.label}: ${slice.value}</title></path>
    `;
  });

  return html`
    <svg viewBox="0 0 ${size} ${size}" width="116" height="116" role="img">
      ${paths}
    </svg>
  `;
}

/** Donut plus its legend. The legend is not optional: it carries the values. */
function pie(
  title: string,
  slices: Slice[],
  emptyText: string
): TemplateResult {
  const total = slices.reduce((sum, slice) => sum + slice.value, 0);

  return html`
    <div class="stat-card">
      <h3>${title}</h3>
      ${total === 0
        ? html`<div class="hint">${emptyText}</div>`
        : html`
            <div class="stat-figure">
              ${donut(slices)}
              <div class="stat-legend">
                ${slices.map(
                  (slice) => html`
                    <div class="line">
                      <span
                        class="swatch"
                        style="background:${colourOf(slice.slot)}"
                      ></span>
                      <span class="label" title=${slice.label}
                        >${slice.label}</span
                      >
                      <span class="value">
                        ${slice.value}
                        (${Math.round((slice.value / total) * 100)}%)
                      </span>
                    </div>
                  `
                )}
              </div>
            </div>
          `}
    </div>
  `;
}

/** Messages per hour of the day: a shape over time, so bars rather than a pie. */
function hours(
  history: HermesLogEntry[],
  title: string,
  emptyText: string
): TemplateResult {
  const buckets = new Array(24).fill(0);
  for (const entry of history) {
    const moment = new Date(entry.ts);
    if (!Number.isNaN(moment.getTime())) buckets[moment.getHours()] += 1;
  }
  const peak = Math.max(...buckets);

  return html`
    <div class="stat-card">
      <h3>${title}</h3>
      ${peak === 0
        ? html`<div class="hint">${emptyText}</div>`
        : html`
            <div class="hours">
              ${buckets.map(
                (count, hour) => html`
                  <div
                    class="bar"
                    style="height:${Math.max(2, (count / peak) * 100)}%"
                    title="${hour}:00 — ${count}"
                  ></div>
                `
              )}
            </div>
            <div class="hours-axis">
              <span>00</span><span>06</span><span>12</span><span>18</span
              ><span>23</span>
            </div>
          `}
    </div>
  `;
}

export function renderStatistics(
  ctx: StatisticsCtx,
  t: (k: string) => string
): TemplateResult {
  const history = ctx.history;

  // Reception outcomes, summed over every gateway. "received" is the total and
  // not an outcome, so adding it as a slice would count everything twice.
  const reception: Record<string, number> = {};
  for (const entry of ctx.entries) {
    for (const [reason, count] of Object.entries(entry.seen_counts ?? {})) {
      if (reason === "received") continue;
      reception[reason] = (reception[reason] ?? 0) + count;
    }
  }

  const outcomes: Record<string, number> = {};
  for (const entry of history) {
    const key = entry.outcome || "unknown";
    outcomes[key] = (outcomes[key] ?? 0) + 1;
  }

  const senders: Record<string, number> = {};
  for (const entry of history) {
    if (entry.direction !== "in" || entry.node === null) continue;
    const key = String(entry.node);
    senders[key] = (senders[key] ?? 0) + 1;
  }

  const conversations: Record<string, number> = {};
  for (const [thread, messages] of Object.entries(ctx.chats)) {
    conversations[thread] = messages.length;
  }

  const incoming = history.filter((entry) => entry.direction === "in").length;
  const outgoing = history.length - incoming;
  const executed = history.filter((entry) => entry.outcome === "matched").length;
  const used = Math.min(100, Math.round((history.length / ctx.retention) * 100));

  // A name for a node number, taken from whichever conversation carries one.
  const nameOf = (node: string): string => {
    for (const messages of Object.values(ctx.chats)) {
      for (const message of messages) {
        if (String(message.node) === node && message.name) return message.name;
      }
    }
    return `#${node}`;
  };

  const threadLabel = (thread: string): string =>
    thread.startsWith("channel:")
      ? `${t("stats.channel")} ${thread.slice("channel:".length)}`
      : nameOf(thread.slice("node:".length));

  return html`
    <h2 class="screen-title">
      ${t("tab.statistics")}
      <button class="btn refresh" @click=${ctx.onRefresh}>
        ${t("settings.refresh")}
      </button>
      ${ctx.updatedAt
        ? html`<span class="hint">${t("status.updatedAt")} ${ctx.updatedAt}</span>`
        : ""}
    </h2>

    <div class="stat-tiles">
      <div class="stat-tile">
        <div class="n">${incoming}</div>
        <div class="k">${t("stats.incoming")}</div>
      </div>
      <div class="stat-tile">
        <div class="n">${outgoing}</div>
        <div class="k">${t("stats.outgoing")}</div>
      </div>
      <div class="stat-tile">
        <div class="n">${executed}</div>
        <div class="k">${t("stats.executed")}</div>
      </div>
      <div class="stat-tile">
        <div class="n">${Object.keys(senders).length}</div>
        <div class="k">${t("stats.senders")}</div>
      </div>
      <div class="stat-tile">
        <div class="n">${history.length}/${ctx.retention}</div>
        <div class="k">${t("stats.retention")}</div>
        <div class="meter"><span style="width:${used}%"></span></div>
      </div>
    </div>

    <div class="stat-grid">
      ${pie(
        t("stats.reception"),
        toSlices(
          reception,
          (key) => t(`status.reason.${key}`),
          t("stats.other")
        ),
        t("stats.empty")
      )}
      ${pie(
        t("stats.outcomes"),
        toSlices(
          outcomes,
          (key) => {
            const label = t(`log.outcome.${key}`);
            return label === `log.outcome.${key}` ? key : label;
          },
          t("stats.other")
        ),
        t("stats.empty")
      )}
      ${pie(
        t("stats.topSenders"),
        toSlices(senders, nameOf, t("stats.other")),
        t("stats.empty")
      )}
      ${pie(
        t("stats.conversations"),
        toSlices(conversations, threadLabel, t("stats.other")),
        t("stats.empty")
      )}
      ${hours(history, t("stats.byHour"), t("stats.empty"))}
    </div>

    <div class="hint">${t("stats.window")}</div>
  `;
}
