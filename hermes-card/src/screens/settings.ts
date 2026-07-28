import { html, type TemplateResult } from "lit";

import type {
  HermesChannel,
  HermesEntry,
  HermesSettings,
  NodeInfo,
  RadioConfig,
} from "../types";

export interface SettingsCtx {
  settings: HermesSettings | null;
  entries: HermesEntry[];
  nodes: NodeInfo[];
  channels: HermesChannel[];
  firmware: string | null;
  nodesError: string | null;
  refreshing: boolean;
  onRefresh: () => void;
  saved: boolean;
  loadError: string | null;
  onGlobalInput: (key: keyof HermesSettings, value: unknown) => void;
  onEntryInput: (entryId: string, key: string, value: unknown) => void;
  onSaveGlobal: () => void;
  onSaveEntry: (entryId: string) => void;
  draftGlobal: Partial<HermesSettings>;
  draftEntries: Record<string, Record<string, any>>;
  radioConfig: RadioConfig | null;
  radioDraft: Record<string, string | number | boolean>;
  radioSaving: boolean;
  radioError: string | null;
  onRadioInput: (field: string, value: string | number | boolean) => void;
  onRadioSave: () => void;
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
/**
 * Nodes that can act as a gateway, which means the ones Home Assistant holds a
 * device for.
 *
 * The node list now also carries every node the radio has merely heard, which
 * is what the map and the authorized senders want. A gateway is different: it
 * is the node the base integration is actually connected to, so offering a
 * remote node here would only ever produce a gateway that receives nothing.
 */
function gatewayNodes(nodes: NodeInfo[]): NodeInfo[] {
  return nodes.filter((node) => node.source !== "mesh");
}

function nodeChecklist(
  nodes: NodeInfo[],
  selected: number[],
  onChange: (values: number[]) => void,
  emptyText: string,
  error: string | null = null
): TemplateResult {
  if (error) {
    return html`<div class="sub-error">${error}</div>`;
  }
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
      <button
        class="btn refresh"
        ?disabled=${ctx.refreshing}
        title=${t("settings.refreshHint")}
        @click=${ctx.onRefresh}
      >
        ${ctx.refreshing ? t("common.loading") : t("settings.refresh")}
      </button>
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
            t("settings.noNodes"),
            ctx.nodesError
          )}
          <span class="hint">${t("settings.mapNodesHint")}</span>
        </div>

        <div class="field">
          <label>${t("settings.reachable")}</label>
          <input
            type="number"
            min="1"
            max="1440"
            step="5"
            .value=${String(globalValue("reachable_minutes") ?? 120)}
            @input=${(e: Event) =>
              ctx.onGlobalInput(
                "reachable_minutes",
                Number((e.target as HTMLInputElement).value)
              )}
          />
          <span class="hint">${t("settings.reachableHint")}</span>
        </div>

        <div class="field">
          <label>${t("settings.pinSize")}</label>
          <select
            @change=${(e: Event) =>
              ctx.onGlobalInput(
                "map_pin_size",
                (e.target as HTMLSelectElement).value
              )}
          >
            ${["small", "medium", "large"].map(
              (size) => html`
                <option
                  value=${size}
                  ?selected=${(globalValue("map_pin_size") ?? "medium") === size}
                >
                  ${t(`settings.pinSize.${size}`)}
                </option>
              `
            )}
          </select>
        </div>

        <div class="field">
          <label class="check">
            <input
              type="checkbox"
              .checked=${Boolean(globalValue("map_labels"))}
              @change=${(e: Event) =>
                ctx.onGlobalInput(
                  "map_labels",
                  (e.target as HTMLInputElement).checked
                )}
            />
            <span>${t("settings.mapLabels")}</span>
          </label>
          <span class="hint">${t("settings.mapLabelsHint")}</span>
        </div>

        <div class="actions">
          <button class="btn primary" @click=${ctx.onSaveGlobal}>
            ${t("common.save")}
          </button>
          ${ctx.saved ? html`<span class="toast">${t("common.saved")}</span>` : ""}
        </div>
      </div>
    </div>

    <div class="section">
      <div class="section-title">${t("settings.firmware")}</div>
      <div class="panel">
        ${ctx.firmware
          ? html`<div class="row">
              <span class="k">${t("settings.gatewayFirmware")}</span>
              <span class="v">${ctx.firmware}</span>
            </div>`
          : ""}
        <div class="row">
          <span class="k">${t("settings.channelsFound")}</span>
          <span class="v">
            ${ctx.channels.length
              ? ctx.channels.map((c) => `${c.index}: ${c.name}`).join(", ")
              : t("settings.channelsNone")}
          </span>
        </div>
        <div class="note">${t("settings.firmwareSameNote")}</div>
        <div class="note">${t("settings.firmwareDmNote")}</div>
        <div class="hint">${t("settings.firmwareOnlyGateway")}</div>
      </div>
    </div>

    ${renderRadioConfig(ctx, t)}

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


        </div>

        <div class="field" style="margin-top:12px">
          <label>${t("settings.gateway")}</label>
          ${gatewayNodes(ctx.nodes).length
            ? html`
                <select
                  @change=${(e: Event) =>
                    ctx.onEntryInput(
                      entry.entry_id,
                      "gateway_node_id",
                      Number((e.target as HTMLSelectElement).value)
                    )}
                >
                  ${gatewayNodes(ctx.nodes).map(
                    (node) => html`
                      <option
                        value=${node.node_num}
                        ?selected=${value("gateway_node_id", entry.gateway_node_id) ===
                        node.node_num}
                      >
                        ${node.name} (${node.node_num})
                      </option>
                    `
                  )}
                </select>
              `
            : html`<div class="hint">${t("settings.noNodes")}</div>`}
          <span class="hint">${t("settings.gatewayHint")}</span>
        </div>

        <div class="field">
          <label>${t("settings.mode")}</label>
          <select
            @change=${(e: Event) =>
              ctx.onEntryInput(
                entry.entry_id,
                "mode",
                (e.target as HTMLSelectElement).value
              )}
          >
            <option
              value="channel"
              ?selected=${value("mode", entry.mode) === "channel"}
            >
              ${t("settings.modeChannel")}
            </option>
            <option
              value="direct_message"
              ?selected=${value("mode", entry.mode) === "direct_message"}
            >
              ${t("settings.modeDm")}
            </option>
          </select>
          <span class="hint">${t("settings.modeHint")}</span>
        </div>

        ${value("mode", entry.mode) === "channel"
          ? renderChannelPicker(ctx, entry, t)
          : ""}

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
            t("settings.noNodes"),
            ctx.nodesError
          )}
          <span class="hint">${t("settings.authorizedHint")}</span>
        </div>

        <div class="field">
          <label class="check">
            <input
              type="checkbox"
              .checked=${Boolean(value("require_ack", entry.require_ack))}
              @change=${(e: Event) =>
                ctx.onEntryInput(
                  entry.entry_id,
                  "require_ack",
                  (e.target as HTMLInputElement).checked
                )}
            />
            <span>${t("settings.requireAck")}</span>
          </label>
          <span class="hint">${t("settings.requireAckHint")}</span>
        </div>

        <div class="field">
          <label>${t("settings.rateLimit")}</label>
          <input
            type="number"
            min="0"
            max="60"
            step="1"
            .value=${String(value("rate_limit", entry.rate_limit))}
            @input=${(e: Event) =>
              ctx.onEntryInput(
                entry.entry_id,
                "rate_limit",
                Number((e.target as HTMLInputElement).value)
              )}
          />
          <span class="hint">${t("settings.rateLimitHint")}</span>
        </div>

        <div class="field">
          <label class="check">
            <input
              type="checkbox"
              .checked=${Boolean(value("case_sensitive", entry.case_sensitive))}
              @change=${(e: Event) =>
                ctx.onEntryInput(
                  entry.entry_id,
                  "case_sensitive",
                  (e.target as HTMLInputElement).checked
                )}
            />
            <span>${t("settings.caseSensitive")}</span>
          </label>
          <span class="hint">${t("settings.caseSensitiveHint")}</span>
        </div>

        <div class="field">
          <label>${t("settings.helpKeyword")}</label>
          <input
            placeholder="help"
            .value=${String(value("help_keyword", entry.help_keyword) ?? "")}
            @input=${(e: Event) =>
              ctx.onEntryInput(
                entry.entry_id,
                "help_keyword",
                (e.target as HTMLInputElement).value
              )}
          />
          <span class="hint">${t("settings.helpKeywordHint")}</span>
        </div>

        <div class="actions">
          <button
            class="btn primary"
            @click=${() => ctx.onSaveEntry(entry.entry_id)}
          >
            ${t("common.save")}
          </button>
          ${ctx.saved ? html`<span class="toast">${t("common.saved")}</span>` : ""}
        </div>
      </div>
    </div>
  `;
}


/**
 * Which channel this gateway listens on, picked from the channels actually
 * configured on the radio rather than typed as a bare index.
 */
function renderChannelPicker(
  ctx: SettingsCtx,
  entry: HermesEntry,
  t: (k: string) => string
): TemplateResult {
  const draft = ctx.draftEntries[entry.entry_id] ?? {};
  const current = (draft.channel_index ?? entry.channel_index ?? 0) as number;
  const known = ctx.channels.find((c) => c.index === current);

  return html`
    <div class="field" style="margin-top:12px">
      <label>${t("settings.channel")}</label>
      ${ctx.channels.length
        ? html`
            <select
              @change=${(e: Event) =>
                ctx.onEntryInput(
                  entry.entry_id,
                  "channel_index",
                  Number((e.target as HTMLSelectElement).value)
                )}
            >
              ${ctx.channels.map(
                (channel) => html`
                  <option value=${channel.index} ?selected=${channel.index === current}>
                    ${channel.index}: ${channel.name}
                  </option>
                `
              )}
            </select>
          `
        : html`
            <input
              type="number"
              min="0"
              max="7"
              .value=${String(current)}
              @change=${(e: Event) =>
                ctx.onEntryInput(
                  entry.entry_id,
                  "channel_index",
                  Number((e.target as HTMLInputElement).value)
                )}
            />
            <span class="hint">${t("settings.channelsUnavailable")}</span>
          `}
      <span class="hint">${t("settings.channelHint")}</span>
      ${known?.default_psk === true
        ? html`<div class="note warn">${t("settings.defaultPskWarning")}</div>`
        : known?.default_psk === null
          ? html`<div class="note warn">${t("settings.defaultPskUnknown")}</div>`
          : ""}
    </div>
  `;
}

/**
 * The radio's own settings, which are not Hermes settings at all.
 *
 * Kept in its own section with its own save button for that reason: these are
 * written to the node, most of them make it restart, and the wrong region or
 * modem preset silently cuts it off from every other node. Mixing them into the
 * same save as a reply delay would invite exactly the accident this guards
 * against.
 */
function renderRadioConfig(
  ctx: SettingsCtx,
  t: (k: string) => string
): TemplateResult {
  const config = ctx.radioConfig;
  if (!config || !Object.keys(config.values).length) return html``;

  const value = (field: string) =>
    ctx.radioDraft[field] ?? config.values[field];
  const dirty = Object.keys(ctx.radioDraft).length > 0;

  const field = (name: string): TemplateResult => {
    const current = value(name);
    const options = config.options[name];

    if (options) {
      return html`
        <div class="field">
          <label>${t(`radioCfg.${name}`)}</label>
          <select
            @change=${(e: Event) =>
              ctx.onRadioInput(name, (e.target as HTMLSelectElement).value)}
          >
            ${options.map(
              (option: string) => html`
                <option value=${option} ?selected=${option === current}>
                  ${option}
                </option>
              `
            )}
          </select>
        </div>
      `;
    }

    if (typeof config.values[name] === "boolean") {
      return html`
        <div class="field">
          <label class="check">
            <input
              type="checkbox"
              .checked=${Boolean(current)}
              @change=${(e: Event) =>
                ctx.onRadioInput(name, (e.target as HTMLInputElement).checked)}
            />
            <span>${t(`radioCfg.${name}`)}</span>
          </label>
        </div>
      `;
    }

    return html`
      <div class="field">
        <label>${t(`radioCfg.${name}`)}</label>
        <input
          type="number"
          .value=${String(current ?? "")}
          @input=${(e: Event) =>
            ctx.onRadioInput(name, Number((e.target as HTMLInputElement).value))}
        />
      </div>
    `;
  };

  return html`
    <div class="section">
      <div class="section-title">${t("radioCfg.title")}</div>
      <div class="panel">
        <div class="note warn">${t("radioCfg.warning")}</div>

        ${Object.keys(config.values).map((name) => field(name))}

        ${ctx.radioError
          ? html`<div class="note warn">${ctx.radioError}</div>`
          : ""}

        <div class="actions">
          <button
            class="btn primary"
            ?disabled=${!dirty || ctx.radioSaving}
            @click=${ctx.onRadioSave}
          >
            ${ctx.radioSaving ? t("common.loading") : t("radioCfg.write")}
          </button>
        </div>
      </div>
    </div>
  `;
}
