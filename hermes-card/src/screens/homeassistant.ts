import { html, type TemplateResult } from "lit";

import type { HermesEntry, HomeAssistant } from "../types";
import { displayValue, hermesEntities, referencedEntities } from "../utils";

export interface HaCtx {
  hass: HomeAssistant;
  entries: HermesEntry[];
  testText: string;
  selectedEntry: string | null;
  sending: boolean;
  onTestText: (value: string) => void;
  onSendTest: () => void;
}

const MISSING = "missing";

/**
 * Home Assistant tab: what Hermes shares with Home Assistant and, above all,
 * whether the entities the commands point at are still there. A renamed or
 * deleted entity keeps sitting in a command and would otherwise only fail when
 * somebody texts the keyword.
 */
export function renderHomeAssistant(
  ctx: HaCtx,
  t: (k: string) => string
): TemplateResult {
  const referenced = referencedEntities(ctx.entries);
  const own = hermesEntities(ctx.hass);

  const rows = [...referenced.entries()].map(([entityId, keywords]) => {
    const state = ctx.hass.states[entityId];
    const status = !state
      ? MISSING
      : state.state === "unavailable" || state.state === "unknown"
        ? state.state
        : "";
    return { entityId, keywords, state, status };
  });

  const broken = rows.filter((row) => row.status !== "").length;

  return html`
    <h2 class="screen-title">${t("tab.homeassistant")}</h2>

    <div class="section">
      <div class="section-title">${t("ha.shared")}</div>
      ${own.length
        ? html`
            <div class="rows">
              ${own.map(
                (state) => html`
                  <div class="row">
                    <span class="k">
                      ${state.attributes?.friendly_name || state.entity_id}
                    </span>
                    <span class="v">${displayValue(state)}</span>
                  </div>
                `
              )}
            </div>
          `
        : html`<div class="empty">${t("ha.noEntities")}</div>`}
    </div>

    <div class="section">
      <div class="section-title">
        ${t("ha.connected")}
        ${broken
          ? html`<span class="warn-badge">${broken} ${t("ha.problems")}</span>`
          : ""}
      </div>
      ${rows.length
        ? html`
            <div class="rows">
              ${rows.map(
                (row) => html`
                  <div class="row">
                    <span class="k">
                      <span
                        class="dot ${row.status === "" ? "on" : "bad"}"
                      ></span>
                      ${row.state?.attributes?.friendly_name || row.entityId}
                      <span class="used">${row.keywords.join(", ")}</span>
                    </span>
                    <span class="v">
                      ${row.status === MISSING
                        ? t("ha.missing")
                        : row.state
                          ? displayValue(row.state)
                          : ""}
                    </span>
                  </div>
                `
              )}
            </div>
          `
        : html`<div class="empty">${t("ha.noReferences")}</div>`}
    </div>

    <div class="section">
      <div class="section-title">${t("ha.test")}</div>
      <div class="panel">
        <div class="field">
          <label>${t("ha.testText")}</label>
          <input
            .value=${ctx.testText}
            placeholder=${t("ha.testPlaceholder")}
            @input=${(e: Event) =>
              ctx.onTestText((e.target as HTMLInputElement).value)}
          />
          <span class="hint">${t("ha.testHint")}</span>
        </div>
        <div class="actions">
          <button
            class="btn primary"
            ?disabled=${!ctx.testText || !ctx.entries.length || ctx.sending}
            @click=${ctx.onSendTest}
          >
            ${ctx.sending ? t("common.loading") : t("ha.sendTest")}
          </button>
        </div>
      </div>
    </div>
  `;
}
