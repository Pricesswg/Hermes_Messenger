import { html, type TemplateResult } from "lit";

import type { HermesEntry, HomeAssistant, RadioInfo } from "../types";
import { VERSION } from "../version";
import { hasHermes, hermesSensor, meshNodes } from "../utils";

/** Status screen: a compact overview, no long lists. */
export function renderStatus(
  hass: HomeAssistant,
  entries: HermesEntry[],
  updatedAt: string,
  radio: RadioInfo | null,
  t: (k: string) => string
): TemplateResult {
  if (!hasHermes(hass)) {
    return html`<div class="empty">${t("status.noIntegration")}</div>`;
  }

  const nodes = meshNodes(hass);
  const executed = hermesSensor(hass, "commands_executed", entries);
  const lastCommand = hermesSensor(hass, "last_command", entries);
  const lastError = hermesSensor(hass, "last_error", entries);

  const asText = (value?: string): string =>
    !value || value === "unknown" || value === "unavailable"
      ? t("status.none")
      : value;

  return html`
    <h2 class="screen-title">
      ${t("status.title")}
      ${updatedAt
        ? html`<span class="hint">${t("status.updatedAt")} ${updatedAt}</span>`
        : ""}
    </h2>
    <div class="grid">
      <div class="panel stat">
        <div class="label">${t("status.nodes")}</div>
        <div class="value">${nodes.length}</div>
      </div>
      <div class="panel stat">
        <div class="label">${t("status.executed")}</div>
        <div class="value">${executed ? executed.state : "0"}</div>
      </div>
      <div class="panel stat">
        <div class="label">${t("status.lastCommand")}</div>
        <div class="value small">${asText(lastCommand?.state)}</div>
      </div>
      <div class="panel stat">
        <div class="label">${t("status.lastError")}</div>
        <div class="value small">${asText(lastError?.state)}</div>
      </div>
    </div>

    ${radio ? renderRadio(radio, t) : ""}

    ${entries.map((entry) => renderReception(entry, t))}
  `;
}

/**
 * The same readings as the Status tab, as a plain list of parameters.
 *
 * Built for a dashboard column rather than a panel: no tabs, no controls,
 * nothing that writes anything, and every value on its own row so it stays
 * legible when the card is a third of the screen wide.
 */
export function renderStatusSummary(
  hass: HomeAssistant,
  entries: HermesEntry[],
  updatedAt: string,
  radio: RadioInfo | null,
  t: (k: string) => string
): TemplateResult {
  if (!hasHermes(hass)) {
    return html`<div class="empty">${t("status.noIntegration")}</div>`;
  }

  const asText = (value?: string): string =>
    !value || value === "unknown" || value === "unavailable"
      ? t("status.none")
      : value;

  const executed = hermesSensor(hass, "commands_executed", entries);
  const lastCommand = hermesSensor(hass, "last_command", entries);
  const lastError = hermesSensor(hass, "last_error", entries);
  // One offline gateway is enough to stop everything it serves, so the summary
  // reports the worst link rather than an average.
  const offline = entries.some((entry) => entry.radio_connected === false);
  const received = entries.reduce(
    (total, entry) => total + (entry.seen_counts?.received ?? 0),
    0
  );
  const accepted = entries.reduce(
    (total, entry) => total + (entry.seen_counts?.accepted ?? 0),
    0
  );

  const rows: [string, unknown][] = [
    [
      t("summary.link"),
      offline ? t("status.radioOfflineBadge") : t("summary.linkUp"),
    ],
    [t("status.nodes"), meshNodes(hass).length],
    [t("summary.received"), received],
    [t("summary.accepted"), accepted],
    [t("status.executed"), executed ? executed.state : "0"],
    [t("status.lastCommand"), asText(lastCommand?.state)],
    [t("status.lastError"), asText(lastError?.state)],
  ];

  if (radio?.long_name) rows.splice(1, 0, [t("radio.name"), radio.long_name]);

  return html`
    <div class="summary" data-warn=${offline ? "1" : "0"}>
      <div class="summary-head">
        <span class="summary-title">Hermes</span>
        ${updatedAt ? html`<span class="hint">${updatedAt}</span>` : ""}
      </div>

      <div class="rows">
        ${rows.map(
          ([label, value]) => html`
            <div class="row">
              <span class="k">${label}</span>
              <span class="v">${String(value)}</span>
            </div>
          `
        )}
      </div>

      ${entries.map(
        (entry) => html`
          <div class="row">
            <span class="k">${entry.title}</span>
            <span class="v">
              ${entry.mode === "channel"
                ? `${t("settings.channel")} ${entry.channel_index ?? 0}`
                : t("messages.onDm")}
            </span>
          </div>
        `
      )}
    </div>
  `;
}

/**
 * What this gateway expects against what actually crossed the mesh.
 *
 * A message on another gateway or another channel is dropped before anything
 * reaches the log, so without this the two most common misconfigurations look
 * exactly like nothing happening at all.
 *
 * Diagnosis only, deliberately. There used to be a button that copied the
 * reception of the last message straight into the gateway settings, which took
 * one click to move a gateway from direct messages to a channel: the whole
 * difference between a verified sender and anyone holding the channel key. A
 * single stray message on a channel was enough to offer it, so the reading is
 * shown and the change is left to Settings, where the mode says what it means.
 */
function renderReception(
  entry: HermesEntry,
  t: (k: string) => string
): TemplateResult {
  const seen = entry.last_seen;
  const counts = entry.seen_counts ?? {};
  const notRunning = entry.loaded === false;
  // The radio link comes first: with it down nothing else can possibly work,
  // and every other reading on this panel is a consequence of it.
  const offline = entry.radio_connected === false;
  // "received" is the raw total, so it must not be added to the outcomes.
  const total = counts.received ?? 0;
  const mismatch = total > 0 && !counts.accepted;

  return html`
    <div class="section" style="margin-top:18px">
      <div class="section-title">
        ${t("status.reception")}
        ${offline
          ? html`<span class="warn-badge">${t("status.radioOfflineBadge")}</span>`
          : notRunning
          ? html`<span class="warn-badge">${t("status.notRunning")}</span>`
          : mismatch
            ? html`<span class="warn-badge">${t("status.mismatch")}</span>`
            : ""}
      </div>
      <div class="panel">
        ${offline
          ? html`<div class="note warn">${t("status.radioOffline")}</div>`
          : ""}
        ${offline && entry.competing_integrations?.length
          ? html`<div class="note warn">
              ${t("status.radioConflict")}
              <br />
              ${entry.competing_integrations.map(
                (domain) => html`<code>${domain}</code> `
              )}
            </div>`
          : ""}
        ${notRunning
          ? html`<div class="note warn">
              ${t("status.notRunningHint")}
              ${entry.state ? html`<br /><code>${entry.state}</code>` : ""}
            </div>`
          : ""}
        <div class="rows">
          <div class="row">
            <span class="k">${t("status.versions")}</span>
            <span class="v">
              ${t("status.card")} ${VERSION},
              ${t("status.backend")} ${entry.backend_version || "?"}
              ${entry.listening === false ? ` (${t("status.notListening")})` : ""}
            </span>
          </div>
          ${entry.backend_version && entry.backend_version !== VERSION
            ? html`<div class="note warn">${t("status.versionMismatch")}</div>`
            : ""}
          <div class="row">
            <span class="k">${t("status.busEvents")}</span>
            <span class="v">${entry.bus_events ?? 0}</span>
          </div>
          <div class="row">
            <span class="k">${t("status.replayGuard")}</span>
            <span class="v">
              ${entry.replay_protected === false
                ? t("status.replayGuard.off")
                : entry.replay_protected === true
                  ? t("status.replayGuard.on")
                  : t("status.replayGuard.idle")}
            </span>
          </div>
          <div class="row">
            <span class="k">${t("status.expects")}</span>
            <span class="v">
              ${t("settings.gateway")} ${entry.gateway_node_id ?? "-"},
              ${entry.mode === "channel"
                ? `${t("settings.channel")} ${entry.channel_index ?? 0}`
                : t("messages.onDm")}
            </span>
          </div>
          ${seen
            ? html`
                <div class="row">
                  <span class="k">${t("status.lastSeen")}</span>
                  <span class="v">
                    ${t("settings.gateway")} ${seen.gateway ?? "-"},
                    ${seen.channel !== null && seen.channel !== undefined
                      ? `${t("settings.channel")} ${seen.channel}`
                      : t("messages.onDm")}
                  </span>
                </div>
                <div class="row">
                  <span class="k">${t("status.seenFrom")}</span>
                  <span class="v">${seen.from ?? "-"}</span>
                </div>
                <div class="row">
                  <span class="k">${t("status.seenResult")}</span>
                  <span class="v">${t(`status.reason.${seen.reason}`)}</span>
                </div>
                <div class="row">
                  <span class="k">${t("status.tally")}</span>
                  <span class="v">
                    ${Object.entries(counts)
                      .map(
                        ([reason, n]) =>
                          `${n} ${t(`status.reason.${reason}`)}`
                      )
                      .join(", ")}
                  </span>
                </div>
              `
            : html`<div class="row">
                <span class="k">${t("status.lastSeen")}</span>
                <span class="v">${t("status.nothingSeen")}</span>
              </div>`}
        </div>
        ${mismatch
          ? html`
              <div class="note warn" style="margin-top:10px">
                ${seen?.reason === "other_gateway"
                  ? t("status.hintGateway")
                  : t("status.hintTarget")}
              </div>
            `
          : ""}
      </div>
    </div>
  `;
}

/** The gateway radio itself: identity, hardware and LoRa settings. */
function renderRadio(radio: RadioInfo, t: (k: string) => string): TemplateResult {
  const rows: [string, unknown][] = [
    ["radio.name", radio.long_name],
    ["radio.short", radio.short_name],
    ["radio.hardware", radio.hardware],
    ["radio.role", radio.role],
    ["radio.firmware", radio.firmware],
    ["radio.region", radio.region],
    ["radio.preset", radio.modem_preset],
    ["radio.hops", radio.hop_limit],
  ];

  const shown = rows.filter(
    ([, value]) => value !== null && value !== undefined && value !== ""
  );
  if (!shown.length) return html``;

  return html`
    <div class="section" style="margin-top:18px">
      <div class="section-title">${t("radio.title")}</div>
      <div class="panel">
        <div class="rows">
          ${shown.map(
            ([key, value]) => html`
              <div class="row">
                <span class="k">${t(key)}</span>
                <span class="v">${String(value)}</span>
              </div>
            `
          )}
        </div>
      </div>
    </div>
  `;
}
