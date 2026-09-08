import { LitElement, css, html, type TemplateResult } from "lit";
import { customElement, property } from "lit/decorators.js";

// Deliberately no import of ./hermes-card: that module is the bundle entry
// and it imports this one, so importing it back would be a cycle with a
// decorator on each side of it.
import type { HomeAssistant } from "./types";

/**
 * The card as a sidebar page.
 *
 * Home Assistant hands a custom panel `hass`, `narrow` and `panel`, and expects
 * an element that fills the view. All this does is wrap the card that already
 * exists: a second implementation of the same seven tabs, one for a dashboard
 * and one for the sidebar, is how the two drift apart.
 *
 * The panel is opt in, from Settings. A sidebar entry is the user's own space
 * and an integration that plants one there without being asked has decided
 * something that was not its to decide.
 */
@customElement("hermes-panel")
export class HermesPanel extends LitElement {
  static styles = css`
    :host {
      display: block;
      height: 100%;
      /* The app bar is drawn over the panel, exactly as in a Lovelace panel
       * view, so the card is pushed down by the same amount it uses there. */
      --hermes-panel-offset: var(--header-height, 56px);
    }
  `;

  @property({ attribute: false }) public hass?: HomeAssistant;
  @property({ type: Boolean }) public narrow = false;
  @property({ attribute: false }) public panel?: Record<string, unknown>;

  protected render(): TemplateResult {
    return html`
      <hermes-card .hass=${this.hass} panel-mode></hermes-card>
    `;
  }
}
