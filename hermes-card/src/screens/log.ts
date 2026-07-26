import { html, type TemplateResult } from "lit";

import type { HermesLogEntry } from "../types";

export interface LogCtx {
  entries: HermesLogEntry[];
  /** Reception tallies per gateway, so an empty log can be explained. */
  entries_meta: { title: string; counts: Record<string, number> }[];
  /** "", "in" or "out". */
  filter: string;
  updatedAt: string;
  onFilter: (value: string) => void;
  onClear: () => void;
  onRefresh: () => void;
}

/** Received and sent traffic, newest first. */
export function renderLog(
  ctx: LogCtx,
  t: (k: string) => string
): TemplateResult {
  const entries = ctx.filter
    ? ctx.entries.filter((entry) => entry.direction === ctx.filter)
    : ctx.entries;

  return html`
    <h2 class="screen-title">
      ${t("tab.log")}
      <button class="btn refresh" @click=${ctx.onRefresh}>
        ${t("settings.refresh")}
      </button>
      ${ctx.updatedAt
        ? html`<span class="hint">${t("status.updatedAt")} ${ctx.updatedAt}</span>`
        : ""}
    </h2>

    ${ctx.entries_meta.map(
      (meta) => html`
        <div class="note">
          <b>${meta.title}</b>:
          ${Object.keys(meta.counts).length
            ? Object.entries(meta.counts)
                .map(([reason, n]) => `${n} ${t(`status.reason.${reason}`)}`)
                .join(", ")
            : t("log.nothingReceived")}
        </div>
      `
    )}

    <div class="map-controls">
      ${["", "in", "out"].map(
        (value) => html`
          <button
            class="chip"
            data-on=${ctx.filter === value ? "1" : "0"}
            @click=${() => ctx.onFilter(value)}
          >
            ${value === ""
              ? t("log.all")
              : value === "in"
                ? t("log.received")
                : t("log.sent")}
          </button>
        `
      )}
      <button class="btn danger" style="margin-left:auto" @click=${ctx.onClear}>
        ${t("log.clear")}
      </button>
    </div>

    ${entries.length === 0
      ? html`<div class="empty">${t("log.empty")}</div>`
      : html`
          <div class="rows">
            ${entries.map((entry) => renderEntry(entry, t))}
          </div>
        `}

    <div class="hint" style="margin-top:12px">${t("log.privacy")}</div>
  `;
}

function renderEntry(
  entry: HermesLogEntry,
  t: (k: string) => string
): TemplateResult {
  const when = entry.ts ? new Date(entry.ts).toLocaleString() : "";
  const outcomeKey = `log.outcome.${entry.outcome}`;
  const outcome = t(outcomeKey);

  return html`
    <div class="log-row">
      <span class="dir ${entry.direction}">
        ${entry.direction === "in" ? "←" : "→"}
      </span>
      <div class="log-body">
        <div class="log-text">${entry.text}</div>
        <div class="log-meta">
          ${when}${entry.node ? ` · ${entry.node}` : ""}
          ${outcome && outcome !== outcomeKey ? ` · ${outcome}` : ""}
        </div>
      </div>
    </div>
  `;
}
