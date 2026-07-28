import { html, type TemplateResult } from "lit";

import type { HermesEntry } from "../types";

export interface SecurityCtx {
  entries: HermesEntry[];
  /** "<entry_id>:<key>" of the protection armed for a confirming second click. */
  armed: string | null;
  /** Entry whose public channel warning is open. */
  riskDialog: string | null;
  onToggle: (entryId: string, key: string, value: boolean) => void;
  onArm: (token: string | null) => void;
  onNumber: (entryId: string, key: string, value: number) => void;
  onOpenRisk: (entryId: string | null) => void;
  onAcceptRisk: (entryId: string) => void;
  onRevokeRisk: (entryId: string) => void;
  /** Send the user to the channel picker of this gateway. */
  onPickChannel: (entryId: string) => void;
}

/** One protection, with the asymmetry that makes the section worth having. */
interface Guard {
  key: "require_pkc" | "reject_mqtt";
  label: string;
  hint: string;
}

const GUARDS: Guard[] = [
  { key: "require_pkc", label: "security.requirePkc", hint: "security.requirePkcHint" },
  { key: "reject_mqtt", label: "security.rejectMqtt", hint: "security.rejectMqttHint" },
];

/**
 * The danger zone.
 *
 * Everything here decides whether a radio message is allowed to act on the
 * house, so it is separated from the rest of the settings, marked, and made
 * deliberately harder to weaken.
 *
 * The asymmetry is the point: turning a protection on happens on the first
 * click, turning one off takes a second click to confirm. Friction belongs in
 * the direction that costs something, and a confirmation on the safe direction
 * would only teach people to click through confirmations.
 */
export function renderSecurity(
  ctx: SecurityCtx,
  t: (k: string) => string
): TemplateResult {
  if (!ctx.entries.length) return html``;

  const anyOff = ctx.entries.some(
    (entry) => !entry.require_pkc || entry.channel_risk_ack?.accepted
  );

  return html`
    <div class="section danger-zone" data-open=${anyOff ? "1" : "0"}>
      <div class="section-title danger-title">${t("security.title")}</div>
      <div class="panel danger-panel">
        <div class="hint">${t("security.intro")}</div>
        ${ctx.entries.map((entry) => renderEntry(ctx, entry, t))}
      </div>
    </div>
    ${ctx.riskDialog ? renderRiskDialog(ctx, ctx.riskDialog, t) : ""}
  `;
}

function renderEntry(
  ctx: SecurityCtx,
  entry: HermesEntry,
  t: (k: string) => string
): TemplateResult {
  const ack = entry.channel_risk_ack;
  const blocked = entry.channel_block;

  return html`
    <div class="danger-entry">
      <div class="danger-entry-title">${entry.title}</div>

      ${blocked
        ? ack?.accepted
          ? html`
              <div class="note danger">
                ${t("security.riskAccepted")}
                <strong>${ack.by}</strong>
                ${ack.at ? new Date(ack.at).toLocaleString() : ""}
                ${ack.hermes_version ? `(Hermes ${ack.hermes_version})` : ""}
                <div class="actions" style="margin-top:8px">
                  <button
                    class="btn danger"
                    @click=${() => ctx.onRevokeRisk(entry.entry_id)}
                  >
                    ${t("security.revoke")}
                  </button>
                </div>
              </div>
            `
          : html`
              <div class="note danger">
                ${t(`security.blocked.${blocked}`)}
                <div class="actions" style="margin-top:8px">
                  <button
                    class="btn"
                    @click=${() => ctx.onOpenRisk(entry.entry_id)}
                  >
                    ${t("security.readMore")}
                  </button>
                </div>
              </div>
            `
        : ""}

      ${GUARDS.map((guard) => renderGuard(ctx, entry, guard, t))}
      ${renderPkcConsequence(entry, t)}

      <div class="field">
        <label>${t("security.maxAge")}</label>
        <input
          type="number"
          min="0"
          max="86400"
          step="30"
          .value=${String(entry.max_age_seconds ?? 0)}
          @input=${(e: Event) =>
            ctx.onNumber(
              entry.entry_id,
              "max_age_seconds",
              Number((e.target as HTMLInputElement).value)
            )}
        />
        <span class="hint">${t("security.maxAgeHint")}</span>
      </div>
    </div>
  `;
}

/**
 * What requiring PKC costs, said next to the switch that does it.
 *
 * Only a direct message is encrypted for one node. A channel message is
 * encrypted with the key of the channel, so it is never PKC and never will be.
 * Turning this on therefore stops every channel command, and on a gateway that
 * listens to a channel it stops everything: a switch that silently makes a
 * working system deaf is a switch that needs to say so before it is used.
 */
function renderPkcConsequence(
  entry: HermesEntry,
  t: (k: string) => string
): TemplateResult {
  const onChannel = entry.mode === "channel";
  return html`
    <div class="note warn pkc-note">
      ${t("security.pkcChannelNote")}
      ${onChannel ? html`<br /><strong>${t("security.pkcChannelGateway")}</strong>` : ""}
    </div>
  `;
}

function renderGuard(
  ctx: SecurityCtx,
  entry: HermesEntry,
  guard: Guard,
  t: (k: string) => string
): TemplateResult {
  const on = Boolean((entry as any)[guard.key]);
  const token = `${entry.entry_id}:${guard.key}`;
  const armed = ctx.armed === token;

  return html`
    <div class="guard" data-on=${on ? "1" : "0"}>
      <div class="guard-text">
        <span class="guard-label">${guard.label ? t(guard.label) : ""}</span>
        <span class="hint">${t(guard.hint)}</span>
      </div>
      ${on
        ? html`
            <button
              class="btn ${armed ? "danger" : ""}"
              @click=${() => {
                if (armed) {
                  ctx.onToggle(entry.entry_id, guard.key, false);
                  ctx.onArm(null);
                } else {
                  ctx.onArm(token);
                }
              }}
            >
              ${armed ? t("security.confirmOff") : t("security.turnOff")}
            </button>
          `
        : html`
            <button
              class="btn primary"
              @click=${() => ctx.onToggle(entry.entry_id, guard.key, true)}
            >
              ${t("security.turnOn")}
            </button>
          `}
    </div>
  `;
}

/**
 * The warning shown before commands are allowed to run on a public channel.
 *
 * The safe way out comes first and is the one that looks like the button. The
 * dangerous one is available, spelled out, and says what it means.
 */
function renderRiskDialog(
  ctx: SecurityCtx,
  entryId: string,
  t: (k: string) => string
): TemplateResult {
  const entry = ctx.entries.find((e) => e.entry_id === entryId);
  if (!entry) return html``;
  const reason = entry.channel_block ?? "channel_zero";

  return html`
    <div class="modal-backdrop" @click=${() => ctx.onOpenRisk(null)}>
      <div class="modal danger-modal" @click=${(e: Event) => e.stopPropagation()}>
        <div class="modal-title">${t(`security.risk.${reason}.title`)}</div>
        <div class="modal-body">${t(`security.risk.${reason}.body`)}</div>
        <div class="modal-body">${t("security.risk.common")}</div>

        <div class="modal-actions">
          <button
            class="btn primary"
            @click=${() => {
              ctx.onOpenRisk(null);
              ctx.onPickChannel(entry.entry_id);
            }}
          >
            ${t("security.risk.useAnother")}
          </button>
          <button
            class="btn danger"
            @click=${() => {
              ctx.onAcceptRisk(entry.entry_id);
              ctx.onOpenRisk(null);
            }}
          >
            ${t("security.risk.accept")}
          </button>
        </div>
        <span class="hint">${t("security.risk.acceptHint")}</span>
      </div>
    </div>
  `;
}
