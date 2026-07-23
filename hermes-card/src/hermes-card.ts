import { LitElement, html, type TemplateResult } from "lit";
import { customElement, property, state } from "lit/decorators.js";

import { translator } from "./i18n";
import { hermesLayout, hermesTokens } from "./styles";
import { renderDevices } from "./screens/devices";
import { renderPlaceholder } from "./screens/placeholder";
import { renderStatus } from "./screens/status";
import type { HermesCardConfig, HomeAssistant, TabId } from "./types";
import { VERSION } from "./version";

const TABS: TabId[] = [
  "status",
  "devices",
  "map",
  "messages",
  "homeassistant",
  "settings",
];

@customElement("hermes-card")
export class HermesCard extends LitElement {
  static styles = [hermesTokens, hermesLayout];

  @property({ attribute: false }) public hass?: HomeAssistant;

  @state() private _config?: HermesCardConfig;
  @state() private _tab: TabId = "status";

  public setConfig(config: HermesCardConfig): void {
    this._config = config;
    if (config?.tab && TABS.includes(config.tab)) {
      this._tab = config.tab;
    }
  }

  public getCardSize(): number {
    return 12;
  }

  protected firstUpdated(): void {
    // Lovelace panel views hand us the full viewport and draw the HA app bar
    // over the card. Detect that layout so the host padding can offset it.
    let node: HTMLElement | null = this.parentElement;
    while (node) {
      if (node.tagName === "HUI-PANEL-VIEW") {
        this.setAttribute("panel-mode", "");
        return;
      }
      node = node.parentElement;
    }
  }

  private _select(tab: TabId): void {
    this._tab = tab;
  }

  private _screen(t: (k: string) => string): TemplateResult {
    const hass = this.hass!;
    switch (this._tab) {
      case "status":
        return renderStatus(hass, t);
      case "devices":
        return renderDevices(hass, t);
      case "map":
        return renderPlaceholder(t("tab.map"), 3, t);
      case "messages":
        return renderPlaceholder(t("tab.messages"), 2, t);
      case "homeassistant":
        return renderPlaceholder(t("tab.homeassistant"), 4, t);
      case "settings":
        return renderPlaceholder(t("tab.settings"), 2, t);
      default:
        return renderStatus(hass, t);
    }
  }

  protected render(): TemplateResult {
    if (!this.hass || !this._config) return html``;
    const t = translator(this.hass);

    return html`
      <div class="shell">
        <div class="topbar">
          <div class="brand">
            <span class="dot"></span>
            <span>Hermes</span>
            <span class="sub">Meshtastic Commander</span>
          </div>
        </div>

        <div class="tabs" role="tablist">
          ${TABS.map(
            (tab) => html`
              <button
                class="tab"
                role="tab"
                aria-selected=${this._tab === tab ? "true" : "false"}
                @click=${() => this._select(tab)}
              >
                ${t(`tab.${tab}`)}
              </button>
            `
          )}
        </div>

        <div class="content">${this._screen(t)}</div>
      </div>
    `;
  }
}

// Register the card in the Lovelace picker.
(window as any).customCards = (window as any).customCards || [];
(window as any).customCards.push({
  type: "hermes-card",
  name: "Hermes",
  description: "Meshtastic Commander control panel",
  preview: false,
});

// eslint-disable-next-line no-console
console.info(`%c HERMES-CARD %c ${VERSION} `, "background:#FFD60A;color:#000", "");
