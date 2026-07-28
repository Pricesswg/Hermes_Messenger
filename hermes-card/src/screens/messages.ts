import { html, type TemplateResult } from "lit";

import "../hermes-entity-picker";

import {
  actionsForEntity,
  buildActionToken,
  buildAttrToken,
  buildStateToken,
  labelableStates,
  rangeLabel,
  readableAttributes,
  resolveValueSpec,
} from "../actions";
import type {
  ActionDef,
  HermesChannel,
  HermesCommand,
  HermesEntry,
  HermesPreset,
  HomeAssistant,
} from "../types";

export interface MessagesCtx {
  hass: HomeAssistant;
  entries: HermesEntry[];
  selectedEntry: string | null;
  editing: HermesCommand | null;
  /** Set when loading the gateways failed, so we do not claim there are none. */
  loadError: string | null;
  /** Entity currently driving the button palette. */
  paletteEntity: string;
  /** Chosen default for the action parameter, per action id. */
  paletteValues: Record<string, number | string>;
  /** Word to say instead of each raw state, for the entity being composed. */
  paletteLabels: Record<string, string>;
  showAdvanced: boolean;
  onSelectEntry: (entryId: string) => void;
  onNew: () => void;
  onEdit: (command: HermesCommand) => void;
  onDuplicate: (command: HermesCommand) => void;
  onDelete: (command: HermesCommand) => void;
  /** Move a command one place up (-1) or down (+1) in the stored order. */
  onMove: (command: HermesCommand, delta: number) => void;
  onDraftInput: (key: keyof HermesCommand, value: unknown) => void;
  onPaletteEntity: (entityId: string) => void;
  onPaletteValue: (actionId: string, value: number | string) => void;
  onPaletteLabel: (state: string, word: string) => void;
  onInsert: (token: string) => void;
  onToggleAdvanced: () => void;
  onSave: () => void;
  onCancel: () => void;
  channels: HermesChannel[];
  presets: HermesPreset[];
  editingPreset: HermesPreset | null;
  onPresetNew: () => void;
  onPresetEdit: (preset: HermesPreset) => void;
  onPresetDelete: (preset: HermesPreset) => void;
  onPresetInput: (key: keyof HermesPreset, value: unknown) => void;
  onPresetSave: () => void;
  onPresetCancel: () => void;
  onPresetSend: (preset: HermesPreset) => void;
}

/** Readable name of the channel this gateway is listening on. */
function channelLabel(
  ctx: MessagesCtx,
  entry: HermesEntry,
  t: (k: string) => string
): string {
  if (entry.mode !== "channel") return t("messages.onDm");
  const index = entry.channel_index ?? 0;
  const known = ctx.channels.find((c) => c.index === index);
  return known ? `${index}: ${known.name}` : `${t("settings.channel")} ${index}`;
}

export function renderMessages(
  ctx: MessagesCtx,
  t: (k: string) => string
): TemplateResult {
  if (ctx.loadError) {
    return html`
      <div class="empty">
        <div>${t("common.loadError")}</div>
        <div class="sub-error">${ctx.loadError}</div>
      </div>
    `;
  }

  if (!ctx.entries.length) {
    return html`<div class="empty">${t("common.noEntries")}</div>`;
  }

  const entry =
    ctx.entries.find((e) => e.entry_id === ctx.selectedEntry) ?? ctx.entries[0];

  return html`
    <h2 class="screen-title">
      ${t("messages.title")}
      <span class="channel-badge" title=${t("messages.listeningHint")}>
        ${t("messages.listening")} ${channelLabel(ctx, entry, t)}
      </span>
    </h2>

    ${ctx.entries.length > 1
      ? html`
          <div class="field">
            <label>${t("messages.gateway")}</label>
            <select
              @change=${(e: Event) =>
                ctx.onSelectEntry((e.target as HTMLSelectElement).value)}
            >
              ${ctx.entries.map(
                (item) => html`
                  <option
                    value=${item.entry_id}
                    ?selected=${item.entry_id === entry.entry_id}
                  >
                    ${item.title}
                  </option>
                `
              )}
            </select>
          </div>
        `
      : ""}

    ${ctx.editing
      ? renderForm(ctx, ctx.editing, t)
      : html`
          ${entry.commands.length
            ? renderCommandList(ctx, entry, t)
            : html`<div class="empty">${t("messages.empty")}</div>`}
          <div class="actions">
            <button class="btn primary" @click=${ctx.onNew}>
              ${t("messages.add")}
            </button>
          </div>

          ${renderPresets(ctx, entry, t)}
        `}
  `;
}

/**
 * Quick send presets: ready made texts fired with one click, the equivalent of
 * the canned messages in the Meshtastic app.
 */
function renderPresets(
  ctx: MessagesCtx,
  entry: HermesEntry,
  t: (k: string) => string
): TemplateResult {
  if (ctx.editingPreset) {
    const draft = ctx.editingPreset;
    return html`
      <div class="section" style="margin-top:22px">
        <div class="section-title">${t("presets.title")}</div>
        <div class="panel">
          <div class="field">
            <label>${t("presets.label")}</label>
            <input
              .value=${draft.label ?? ""}
              @input=${(e: Event) =>
                ctx.onPresetInput("label", (e.target as HTMLInputElement).value)}
            />
          </div>
          <div class="field">
            <label>${t("presets.text")}</label>
            <textarea
              .value=${draft.text ?? ""}
              @input=${(e: Event) =>
                ctx.onPresetInput("text", (e.target as HTMLTextAreaElement).value)}
            ></textarea>
          </div>
          <div class="field">
            <label>${t("presets.channel")}</label>
            <select
              ?disabled=${Boolean(draft.node_id)}
              @change=${(e: Event) => {
                const raw = (e.target as HTMLSelectElement).value;
                ctx.onPresetInput("channel", raw === "" ? null : Number(raw));
              }}
            >
              <option value="" ?selected=${draft.channel === null || draft.channel === undefined}>
                ${t("presets.channelDefault")}
              </option>
              ${ctx.channels.map(
                (channel) => html`
                  <option
                    value=${channel.index}
                    ?selected=${draft.channel === channel.index}
                  >
                    ${channel.index}: ${channel.name}
                  </option>
                `
              )}
            </select>
            <span class="hint">${t("presets.channelHint")}</span>
          </div>

          <div class="field">
            <label>${t("presets.node")}</label>
            <input
              type="number"
              .value=${draft.node_id ? String(draft.node_id) : ""}
              @input=${(e: Event) => {
                const raw = (e.target as HTMLInputElement).value.trim();
                ctx.onPresetInput("node_id", raw ? Number(raw) : null);
              }}
            />
            <span class="hint">${t("presets.nodeHint")}</span>
          </div>
          <div class="actions">
            <button class="btn primary" @click=${ctx.onPresetSave}>
              ${t("common.save")}
            </button>
            <button class="btn" @click=${ctx.onPresetCancel}>
              ${t("common.cancel")}
            </button>
          </div>
        </div>
      </div>
    `;
  }

  return html`
    <div class="section" style="margin-top:22px">
      <div class="section-title">${t("presets.title")}</div>
      ${ctx.presets.length
        ? ctx.presets.map(
            (preset) => html`
              <div class="list-row">
                <div class="meta">
                  <span class="kw">${preset.label || preset.text}</span>
                  <span class="sub">
                    ${preset.node_id
                      ? `${t("presets.toNode")} ${preset.node_id}`
                      : preset.channel !== null && preset.channel !== undefined
                        ? `${t("presets.toChannel")} ${preset.channel}`
                        : t("presets.toChannelDefault")}
                  </span>
                </div>
                <div class="actions" style="margin:0">
                  <button
                    class="btn primary"
                    @click=${() => ctx.onPresetSend(preset)}
                    ?disabled=${!entry}
                  >
                    ${t("presets.send")}
                  </button>
                  <button class="btn" @click=${() => ctx.onPresetEdit(preset)}>
                    ${t("common.edit")}
                  </button>
                  <button
                    class="btn danger"
                    @click=${() => ctx.onPresetDelete(preset)}
                  >
                    ${t("common.delete")}
                  </button>
                </div>
              </div>
            `
          )
        : html`<div class="empty">${t("presets.empty")}</div>`}
      <div class="actions">
        <button class="btn" @click=${ctx.onPresetNew}>${t("presets.add")}</button>
      </div>
    </div>
  `;
}

/**
 * The commands, under their group headings.
 *
 * The headings are cosmetic; the sequence is not. The first command whose
 * keyword matches is the one that runs, so a specific "lights kitchen" has to
 * sit above a broader "lights" or it can never fire. The list is therefore
 * shown in exactly the stored order, and the arrows move a command within it.
 */
function renderCommandList(
  ctx: MessagesCtx,
  entry: HermesEntry,
  t: (k: string) => string
): TemplateResult {
  const commands = entry.commands;
  const grouped = commands.some((command) => (command.group ?? "").trim());

  let previous: string | null = null;
  return html`
    <div class="hint" style="margin-bottom:8px">${t("messages.orderHint")}</div>
    ${commands.map((command, index) => {
      const group = (command.group ?? "").trim();
      const heading =
        grouped && group !== previous
          ? html`<div class="section-title group-head">
              ${group || t("messages.ungrouped")}
            </div>`
          : "";
      previous = group;
      return html`${heading}${renderRow(ctx, command, entry, t, index, commands.length)}`;
    })}
  `;
}

function renderRow(
  ctx: MessagesCtx,
  command: HermesCommand,
  entry: HermesEntry,
  t: (k: string) => string,
  index = 0,
  total = 1
): TemplateResult {
  const summary = command.service || command.reply_template || "";
  // Where this specific command answers: the channel it is heard on, or a DM
  // back to whoever sent it.
  const explicit = command.reply_channel;
  const named =
    explicit !== null && explicit !== undefined
      ? ctx.channels.find((c) => c.index === explicit)
      : undefined;

  const target =
    command.reply_to === "sender_dm"
      ? t("messages.onDm")
      : explicit !== null && explicit !== undefined
        ? `${explicit}${named ? `: ${named.name}` : ""}`
        : channelLabel(ctx, entry, t);

  return html`
    <div class="list-row">
      <div class="meta">
        <span class="kw">${command.keyword}</span>
        <span class="sub">${summary}</span>
      </div>
      <div class="actions" style="margin:0">
        <button
          class="btn move"
          ?disabled=${index === 0}
          title=${t("messages.moveUp")}
          @click=${() => ctx.onMove(command, -1)}
        >
          &uarr;
        </button>
        <button
          class="btn move"
          ?disabled=${index === total - 1}
          title=${t("messages.moveDown")}
          @click=${() => ctx.onMove(command, 1)}
        >
          &darr;
        </button>
        <span class="channel-badge small" title=${t("messages.repliesOn")}>
          ${target}
        </span>
        <button class="btn" @click=${() => ctx.onEdit(command)}>
          ${t("common.edit")}
        </button>
        <button class="btn" @click=${() => ctx.onDuplicate(command)}>
          ${t("common.duplicate")}
        </button>
        <button class="btn danger" @click=${() => ctx.onDelete(command)}>
          ${t("common.delete")}
        </button>
      </div>
    </div>
  `;
}

/**
 * The value picker shown next to an action that takes a parameter.
 * The bounds come from the selected entity when it publishes them, so you see
 * the range the device really accepts while you build the command.
 */
function renderValueInput(
  ctx: MessagesCtx,
  action: ActionDef,
  entityId: string
): TemplateResult | "" {
  if (!action.value) return "";
  const spec = resolveValueSpec(ctx.hass, entityId, action.value);
  const current = ctx.paletteValues[action.id] ?? spec.default ?? "";

  if (spec.type === "enum") {
    return html`
      <select
        class="inline"
        @change=${(e: Event) =>
          ctx.onPaletteValue(action.id, (e.target as HTMLSelectElement).value)}
      >
        ${(spec.options ?? []).map(
          (option) => html`
            <option value=${option} ?selected=${option === current}>
              ${option}
            </option>
          `
        )}
      </select>
    `;
  }

  const range = rangeLabel(spec);
  return html`
    <input
      class="inline"
      type="number"
      min=${spec.min ?? 0}
      max=${spec.max ?? 100}
      step=${spec.step ?? 1}
      .value=${String(current)}
      @input=${(e: Event) =>
        ctx.onPaletteValue(action.id, Number((e.target as HTMLInputElement).value))}
    />
    ${range ? html`<span class="unit">${range}</span>` : ""}
  `;
}

/**
 * A word to say instead of each raw state.
 *
 * Home Assistant stores "on", "not_home", "armed_away". Those are fine in a
 * database and poor in a message that a person reads on a radio. One field per
 * state the entity can report, filled in only where you want to: anything left
 * empty keeps the raw value, which is what every reply did before this existed.
 *
 * The words are part of the token the button inserts, so they travel with the
 * command and two commands on the same entity can word it differently.
 */
function renderLabels(
  ctx: MessagesCtx,
  entityId: string,
  t: (k: string) => string
): TemplateResult {
  const states = labelableStates(
    ctx.hass.states[entityId]?.attributes,
    entityId
  );
  // A temperature has no meaningful set of values, so it gets no fields.
  if (!states.length) return html``;

  return html`
    <div class="labels">
      <div class="section-title">${t("messages.groupLabels")}</div>
      <span class="hint">${t("messages.labelsHint")}</span>
      <div class="label-grid">
        ${states.map(
          (state) => html`
            <label class="label-row">
              <span class="raw">${state}</span>
              <input
                .value=${ctx.paletteLabels[state] ?? ""}
                placeholder=${state}
                @input=${(e: Event) =>
                  ctx.onPaletteLabel(
                    state,
                    (e.target as HTMLInputElement).value
                  )}
              />
            </label>
          `
        )}
      </div>
    </div>
  `;
}

/**
 * The palette: pick an entity, then click a button. Read buttons insert the
 * value placeholder, action buttons insert a self contained action token.
 * The user never has to know a service name.
 */
function renderPalette(
  ctx: MessagesCtx,
  t: (k: string) => string
): TemplateResult {
  const entityId = ctx.paletteEntity;

  return html`
    <div class="palette">
      <div class="field">
        <label>${t("messages.paletteEntity")}</label>
        <hermes-entity-picker
          .hass=${ctx.hass}
          .value=${entityId}
          placeholder="light.kitchen"
          @value-changed=${(e: CustomEvent) =>
            ctx.onPaletteEntity(e.detail.value)}
        ></hermes-entity-picker>
        <span class="hint">${t("messages.paletteHint")}</span>
      </div>

      ${!entityId || !ctx.hass.states[entityId]
        ? html`<div class="hint">${t("messages.pickEntityFirst")}</div>`
        : html`
            <div class="section-title">${t("messages.groupRead")}</div>
            <div class="chips">
              <button
                class="chip read"
                @click=${() =>
                  ctx.onInsert(buildStateToken(entityId, ctx.paletteLabels))}
              >
                ${t("messages.readState")}
              </button>
              ${readableAttributes(ctx.hass, entityId).map(
                (attr) => html`
                  <button
                    class="chip read"
                    @click=${() => ctx.onInsert(buildAttrToken(entityId, attr))}
                  >
                    ${attr}
                  </button>
                `
              )}
            </div>

            ${renderLabels(ctx, entityId, t)}

            <div class="section-title">${t("messages.groupDo")}</div>
            <div class="chips">
              ${actionsForEntity(entityId).map(
                (action) => html`
                  <span class="chip-group">
                    <button
                      class="chip do"
                      @click=${() =>
                        ctx.onInsert(
                          buildActionToken(
                            action,
                            entityId,
                            ctx.paletteValues[action.id] ??
                              (action.value
                                ? resolveValueSpec(ctx.hass, entityId, action.value)
                                    .default
                                : undefined)
                          )
                        )}
                    >
                      ${action.label}
                    </button>
                    ${renderValueInput(ctx, action, entityId)}
                  </span>
                `
              )}
            </div>
          `}
    </div>
  `;
}

function renderForm(
  ctx: MessagesCtx,
  draft: HermesCommand,
  t: (k: string) => string
): TemplateResult {
  const entry =
    ctx.entries.find((e) => e.entry_id === ctx.selectedEntry) ?? ctx.entries[0];
  const dmGateway = entry?.mode === "direct_message";
  const bind =
    (key: keyof HermesCommand) =>
    (e: Event): void =>
      ctx.onDraftInput(key, (e.target as HTMLInputElement).value);

  return html`
    <div class="panel">
      <div class="field">
        <label>${t("messages.keyword")}</label>
        <input .value=${draft.keyword ?? ""} @input=${bind("keyword")} />
        <span class="hint">${t("messages.keywordHint")}</span>
      </div>

      <div class="field">
        <label>${t("messages.matchType")}</label>
        <select @change=${bind("match_type")}>
          <option value="exact" ?selected=${draft.match_type === "exact"}>
            ${t("messages.exact")}
          </option>
          <option value="startswith" ?selected=${draft.match_type === "startswith"}>
            ${t("messages.startswith")}
          </option>
        </select>
        <span class="hint">${t("messages.matchHint")}</span>
      </div>

      ${renderPalette(ctx, t)}

      <div class="field">
        <label>${t("messages.replyTemplate")}</label>
        <textarea
          id="hermes-template"
          .value=${draft.reply_template ?? ""}
          @input=${bind("reply_template")}
        ></textarea>
        <span class="hint">${t("messages.templateHint")}</span>
      </div>

      <div class="field">
        <label>${t("messages.group")}</label>
        <input
          .value=${draft.group ?? ""}
          placeholder=${t("messages.groupPlaceholder")}
          @input=${bind("group")}
        />
        <span class="hint">${t("messages.groupHint")}</span>
      </div>

      <div class="field">
        <label>${t("messages.conditionEntity")}</label>
        <hermes-entity-picker
          .hass=${ctx.hass}
          .value=${draft.condition_entity ?? ""}
          placeholder="input_boolean.remote_control"
          @value-changed=${(e: CustomEvent) =>
            ctx.onDraftInput("condition_entity", e.detail.value)}
        ></hermes-entity-picker>
        <span class="hint">${t("messages.conditionHint")}</span>
      </div>

      <div class="field">
        <label>${t("messages.cooldown")}</label>
        <input
          type="number"
          min="0"
          max="86400"
          step="10"
          .value=${String(draft.cooldown_seconds ?? 0)}
          @input=${(e: Event) =>
            ctx.onDraftInput(
              "cooldown_seconds",
              Number((e.target as HTMLInputElement).value)
            )}
        />
        <span class="hint">${t("messages.cooldownHint")}</span>
      </div>

      <div class="field">
        <label>${t("messages.replyTo")}</label>
        <select @change=${bind("reply_to")}>
          <option value="channel" ?selected=${draft.reply_to === "channel"}>
            ${t("messages.onChannel")}
          </option>
          <option value="sender_dm" ?selected=${draft.reply_to === "sender_dm"}>
            ${t("messages.senderDm")}
          </option>
        </select>
      </div>

      ${draft.reply_to === "channel"
        ? html`
            <div class="field indented">
              <label>${t("messages.replyChannel")}</label>
              <select
                ?disabled=${dmGateway}
                @change=${(e: Event) => {
                  const raw = (e.target as HTMLSelectElement).value;
                  ctx.onDraftInput(
                    "reply_channel",
                    raw === "" ? null : Number(raw)
                  );
                }}
              >
                <option
                  value=""
                  ?selected=${draft.reply_channel === null ||
                  draft.reply_channel === undefined}
                >
                  ${t("messages.replyChannelSame")}
                </option>
                ${ctx.channels.map(
                  (channel) => html`
                    <option
                      value=${channel.index}
                      ?selected=${draft.reply_channel === channel.index}
                    >
                      ${channel.index}: ${channel.name}
                    </option>
                  `
                )}
              </select>
              <span class="hint">
                ${dmGateway
                  ? t("messages.dmGatewayNote")
                  : t("messages.replyChannelHint")}
              </span>
            </div>
          `
        : ""}

      <button class="btn link" @click=${ctx.onToggleAdvanced}>
        ${ctx.showAdvanced ? t("messages.hideAdvanced") : t("messages.advanced")}
      </button>

      ${ctx.showAdvanced
        ? html`
            <div class="field" style="margin-top:10px">
              <label>${t("messages.service")}</label>
              <input
                .value=${draft.service ?? ""}
                placeholder="light.turn_off"
                @input=${bind("service")}
              />
              <span class="hint">${t("messages.serviceHint")}</span>
            </div>
            <div class="field">
              <label>${t("messages.target")}</label>
              <hermes-entity-picker
                .hass=${ctx.hass}
                .value=${draft.target?.entity_id ?? ""}
                placeholder="light.kitchen"
                @value-changed=${(e: CustomEvent) => {
                  const value = e.detail.value;
                  ctx.onDraftInput(
                    "target",
                    value ? { entity_id: value } : undefined
                  );
                }}
              ></hermes-entity-picker>
            </div>
          `
        : ""}

      <div class="actions">
        <button class="btn primary" @click=${ctx.onSave}>
          ${t("common.save")}
        </button>
        <button class="btn" @click=${ctx.onCancel}>${t("common.cancel")}</button>
      </div>
    </div>
  `;
}
