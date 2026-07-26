import { html, type TemplateResult } from "lit";

import type { HassEntityState, HomeAssistant } from "../types";
import { displayValue, meshNodes, splitMetrics } from "../utils";

/**
 * Devices screen: one block per Meshtastic node with the values that node
 * shares. Block layout inspired by the community meshtastic-card, rewritten in
 * the Hermes design language.
 */
export function renderDevices(
  hass: HomeAssistant,
  t: (k: string) => string
): TemplateResult {
  const nodes = meshNodes(hass);

  if (!nodes.length) {
    return html`<div class="empty">${t("devices.empty")}</div>`;
  }

  return html`
    <h2 class="screen-title">${t("devices.title")}</h2>
    <div class="grid">
      ${nodes.map(
        (node) => html`
          <div class="panel">
            <div class="node-head">
              <span class="node-name">${node.name}</span>
              <span class="node-num"
                >${node.nodeNum ?? t("devices.unknown")}</span
              >
            </div>
            ${renderMetrics(node.values)}
          </div>
        `
      )}
    </div>
  `;
}

/**
 * The metrics that describe the health of a link come first: battery, signal
 * and how long ago the node was heard. Everything else follows, so nothing the
 * base integration publishes is lost.
 */
function renderMetrics(
  values: Record<string, HassEntityState>
): TemplateResult {
  const { headline, rest } = splitMetrics(values);
  return html`
    <div class="rows">
      ${[...headline, ...rest].map(
        ([key, state]) => html`
          <div class="row">
            <span class="k">${key}</span>
            <span class="v">${displayValue(state)}</span>
          </div>
        `
      )}
    </div>
  `;
}
