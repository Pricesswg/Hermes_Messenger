import { html, type TemplateResult } from "lit";

import {
  actionsForEntity,
  buildActionToken,
  buildAttrToken,
  buildStateToken,
  rangeLabel,
  readableAttributes,
  resolveValueSpec,
} from "../actions";
import type {
  ActionDef,
  HermesCommand,
  HermesEntry,
  HomeAssistant,
} from "../types";

export interface MessagesCtx {
  hass: HomeAssistant;
  entries: HermesEntry[];
  selectedEntry: string | null;
  editing: HermesCommand | null;
  /** Set when loading the gateways failed, so we do not claim there are none. */
  loadError: string | null;
  /** Entity ids offered as autocomplete for the target field. */
  entityIds: string[];
  /** Entity currently driving the button palette. */
  paletteEntity: string;
  /** Chosen default for the action parameter, per action id. */
  paletteValues: Record<string, number | string>;
  showAdvanced: boolean;
  onSelectEntry: (entryId: string) => void;
  onNew: () => void;
  onEdit: (command: HermesCommand) => void;
  onDelete: (command: HermesCommand) => void;
  onDraftInput: (key: keyof HermesCommand, value: unknown) => void;
  onPaletteEntity: (entityId: string) => void;
  onPaletteValue: (actionId: string, value: number | string) => void;
  onInsert: (token: string) => void;
  onToggleAdvanced: () => void;
  onSave: () => void;
  onCancel: () => void;
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
    <h2 class="screen-title">${t("messages.title")}</h2>

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
            ? entry.commands.map((command) => renderRow(ctx, command, t))
            : html`<div class="empty">${t("messages.empty")}</div>`}
          <div class="actions">
            <button class="btn primary" @click=${ctx.onNew}>
              ${t("messages.add")}
            </button>
          </div>
        `}
  `;
}

function renderRow(
  ctx: MessagesCtx,
  command: HermesCommand,
  t: (k: string) => string
): TemplateResult {
  const summary = command.service || command.reply_template || "";
  return html`
    <div class="list-row">
      <div class="meta">
        <span class="kw">${command.keyword}</span>
        <span class="sub">${summary}</span>
      </div>
      <div class="actions" style="margin:0">
        <button class="btn" @click=${() => ctx.onEdit(command)}>
          ${t("common.edit")}
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
        <input
          list="hermes-entities"
          .value=${entityId}
          placeholder="light.kitchen"
          @input=${(e: Event) =>
            ctx.onPaletteEntity((e.target as HTMLInputElement).value.trim())}
        />
        <datalist id="hermes-entities">
          ${ctx.entityIds.map((id) => html`<option value=${id}></option>`)}
        </datalist>
        <span class="hint">${t("messages.paletteHint")}</span>
      </div>

      ${!entityId || !ctx.hass.states[entityId]
        ? html`<div class="hint">${t("messages.pickEntityFirst")}</div>`
        : html`
            <div class="section-title">${t("messages.groupRead")}</div>
            <div class="chips">
              <button
                class="chip read"
                @click=${() => ctx.onInsert(buildStateToken(entityId))}
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
              <input
                list="hermes-entities"
                .value=${draft.target?.entity_id ?? ""}
                placeholder="light.kitchen"
                @input=${(e: Event) => {
                  const value = (e.target as HTMLInputElement).value.trim();
                  ctx.onDraftInput(
                    "target",
                    value ? { entity_id: value } : undefined
                  );
                }}
              />
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
