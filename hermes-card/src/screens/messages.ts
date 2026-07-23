import { html, type TemplateResult } from "lit";

import type { HermesCommand, HermesEntry } from "../types";

export interface MessagesCtx {
  entries: HermesEntry[];
  selectedEntry: string | null;
  editing: HermesCommand | null;
  onSelectEntry: (entryId: string) => void;
  onNew: () => void;
  onEdit: (command: HermesCommand) => void;
  onDelete: (command: HermesCommand) => void;
  onDraftInput: (key: keyof HermesCommand, value: unknown) => void;
  onSave: () => void;
  onCancel: () => void;
}

export function renderMessages(
  ctx: MessagesCtx,
  t: (k: string) => string
): TemplateResult {
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
  return html`
    <div class="list-row">
      <div class="meta">
        <span class="kw">${command.keyword}</span>
        <span class="sub">${command.service}</span>
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
      </div>

      <div class="field">
        <label>${t("messages.service")}</label>
        <input
          .value=${draft.service ?? ""}
          placeholder="light.turn_off"
          @input=${bind("service")}
        />
      </div>

      <div class="field">
        <label>${t("messages.replyTemplate")}</label>
        <textarea
          .value=${draft.reply_template ?? ""}
          placeholder="{state:sensor.living_room_temp}"
          @input=${bind("reply_template")}
        ></textarea>
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

      <div class="actions">
        <button class="btn primary" @click=${ctx.onSave}>
          ${t("common.save")}
        </button>
        <button class="btn" @click=${ctx.onCancel}>${t("common.cancel")}</button>
      </div>
    </div>
  `;
}
