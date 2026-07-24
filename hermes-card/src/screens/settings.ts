import { html, type TemplateResult } from "lit";

import type { HermesEntry, HermesSettings, NodeInfo } from "../types";

export interface SettingsCtx {
  settings: HermesSettings | null;
  entries: HermesEntry[];
  nodes: NodeInfo[];
  saved: boolean;
  loadError: string | null;
  onGlobalInput: (key: keyof HermesSettings, value: unknown) => void;
  onEntryInput: (entryId: string, key: string, value: unknown) => void;
  onSaveGlobal: () => void;
  onSaveEntry: (entryId: string) => void;
  draftGlobal: Partial<HermesSettings>;
  draftEntries: Record<string, Record<string, any>>;
}

/**
 * Node chooser as checkboxes.
 *
 * A native multi-select was used before and was wrong twice: it needs
 * ctrl-clicking to pick more than one, which nobody discovers, and Lit can only
 * set the `selected` attribute on an option, while the browser reads the
 * property once the user has interacted, so a saved selection did not always
 * come back. Checkboxes bind to a property and are obvious to use.
 */
function nodeChecklist(
  nodes: NodeInfo[],
  selected: number[],
  onChange: (values: number[]) => void,
  emptyText: string
): TemplateResult {
  if (!nodes.length) {
    return html`<div class="hint">${emptyText}</div>`;
  }
  const current = new Set((selected ?? []).map(Number));

  return html`
    <div class="checklist">
      ${nodes.map(
        (node) => html`
          <label class="check">
            <input
              type="checkbox"
              .checked=${current.has(node.node_num)}
              @change=${(e: Event) => {
                const next = new Set(current);
                if ((e.target as HTMLInputElement).checked) {
                  next.add(node.node_num);
                } else {
                  next.delete(node.node_num);
                }
                onChange([...next].sort((a, b) => a - b));
              }}
            />
            <span>${node.name}</span>
            <span class="node-num">${node.node_num}</span>
          </label>
        `
      )}
    </div>
  `;
}

export function renderSettings(
  ctx: SettingsCtx,
  t: (k: string) => string
): TemplateResult {
  const settings = ctx.settings;
  const globalValue = <K extends keyof HermesSettings>(key: K) =>
    (ctx.draftGlobal[key] ?? settings?.[key]) as HermesSettings[K];

  return html`
    <h2 class="screen-title">
      ${t("settings.title")}
      ${ctx.saved ? html`<span class="toast">${t("common.saved")}</span>` : ""}
    </h2>

    <div class="section">
      <div class="section-title">${t("settings.global")}</div>
      <div class="panel">
        <div class="field">
          <label for="owm">${t("settings.owmKey")}</label>
          <input
            id="owm"
            type="password"
            autocomplete="off"
            .value=${String(globalValue("openweather_api_key") ?? "")}
            @input=${(e: Event) =>
              ctx.onGlobalInput(
                "openweather_api_key",
                (e.target as HTMLInputElement).value
              )}
          />
          <span class="hint">${t("settings.owmHint")}</span>
        </div>

        <div class="field">
          <label>${t("settings.mapNodes")}</label>
          ${nodeChecklist(
            ctx.nodes,
            (globalValue("map_nodes") as number[]) ?? [],
            (values) => ctx.onGlobalInput("map_nodes", values),
            t("settings.noNodes")
          )}
          <span class="hint">${t("settings.mapNodesHint")}</span>
        </div>

        <div class="actions">
          <button class="btn primary" @click=${ctx.onSaveGlobal}>
            ${t("common.save")}
          </button>
        </div>
      </div>
    </div>

    ${ctx.loadError
      ? html`<div class="empty">
          <div>${t("common.loadError")}</div>
          <div class="sub-error">${ctx.loadError}</div>
        </div>`
      : ctx.entries.length === 0
        ? html`<div class="empty">${t("common.noEntries")}</div>`
        : ctx.entries.map((entry) => renderEntry(ctx, entry, t))}
  `;
}

function renderEntry(
  ctx: SettingsCtx,
  entry: HermesEntry,
  t: (k: string) => string
): TemplateResult {
  const draft = ctx.draftEntries[entry.entry_id] ?? {};
  const value = (key: string, fallback: unknown) => draft[key] ?? fallback;

  return html`
    <div class="section">
      <div class="section-title">${entry.title}</div>
      <div class="panel">
        <div class="rows">
          <div class="row">
            <span class="k">${t("settings.gateway")}</span>
            <span class="v">${entry.gateway_node_id ?? "-"}</span>
          </div>
          <div class="row">
            <span class="k">${t("settings.mode")}</span>
            <span class="v">${entry.mode}</span>
          </div>
          ${entry.channel_index !== null && entry.channel_index !== undefined
            ? html`<div class="row">
                <span class="k">${t("settings.channel")}</span>
                <span class="v">${entry.channel_index}</span>
              </div>`
            : ""}
        </div>

        <div class="field" style="margin-top:12px">
          <label>${t("settings.initialDelay")}</label>
          <input
            type="number"
            min="0"
            max="60"
            step="1"
            .value=${String(value("initial_delay", entry.initial_delay))}
            @input=${(e: Event) =>
              ctx.onEntryInput(
                entry.entry_id,
                "initial_delay",
                Number((e.target as HTMLInputElement).value)
              )}
          />
        </div>

        <div class="field">
          <label>${t("settings.partDelay")}</label>
          <input
            type="number"
            min="0"
            max="30"
            step="1"
            .value=${String(value("part_delay", entry.part_delay))}
            @input=${(e: Event) =>
              ctx.onEntryInput(
                entry.entry_id,
                "part_delay",
                Number((e.target as HTMLInputElement).value)
              )}
          />
        </div>

        <div class="field">
          <label>${t("settings.authorizedNodes")}</label>
          ${nodeChecklist(
            ctx.nodes,
            (value("authorized_nodes", entry.authorized_nodes) as number[]) ?? [],
            (values) =>
              ctx.onEntryInput(entry.entry_id, "authorized_nodes", values),
            t("settings.noNodes")
          )}
          <span class="hint">${t("settings.authorizedHint")}</span>
        </div>

        <div class="actions">
          <button
            class="btn primary"
            @click=${() => ctx.onSaveEntry(entry.entry_id)}
          >
            ${t("common.save")}
          </button>
        </div>
      </div>
    </div>
  `;
}
