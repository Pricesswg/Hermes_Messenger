import { LitElement, css, html, type TemplateResult } from "lit";
import { customElement, property, state } from "lit/decorators.js";

import type { HomeAssistant } from "./types";

/**
 * Searchable entity picker.
 *
 * A native <datalist> was used before and did not work: browsers do not
 * reliably render it from inside a shadow root, and where they do it matches
 * only the beginning of the option. This renders its own list instead and
 * filters on any part of the entity id or the friendly name, so typing
 * "salotto" finds `light.lampada_salotto`.
 */
@customElement("hermes-entity-picker")
export class HermesEntityPicker extends LitElement {
  static styles = css`
    :host {
      display: block;
      position: relative;
    }
    .list {
      position: absolute;
      z-index: 20;
      left: 0;
      right: 0;
      max-height: 240px;
      overflow-y: auto;
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: var(--r-sm, 6px);
      box-shadow: var(--shadow-md);
      margin-top: 2px;
    }
    .opt {
      display: flex;
      flex-direction: column;
      gap: 1px;
      padding: 7px 10px;
      cursor: pointer;
      border-bottom: 1px solid var(--border);
    }
    .opt:last-child {
      border-bottom: none;
    }
    .opt:hover,
    .opt[data-active="1"] {
      /* Follow the Home Assistant theme rather than painting our yellow here.
       * A light yellow fill sat under the theme's white text on dark themes and
       * was unreadable, and prefers-color-scheme is not enough because a HA
       * dashboard can be dark while the OS is light. Theme background, theme
       * text, and the accent only as an edge marker: legible either way. */
      background: var(--bg-soft, rgba(127, 127, 127, 0.14));
      color: var(--text);
      box-shadow: inset 3px 0 0 var(--accent, #ffd60a);
    }
    .opt .name {
      font-size: 0.84rem;
      font-weight: 600;
    }
    .opt .id {
      font-family: var(--font-mono);
      font-size: 0.7rem;
      color: var(--text-muted);
    }
    .none {
      padding: 10px;
      font-size: 0.8rem;
      color: var(--text-muted);
    }
    input {
      font-family: inherit;
      font-size: 0.86rem;
      color: var(--text);
      background: var(--bg-sunken);
      border: 1px solid var(--border);
      border-radius: var(--r-sm, 6px);
      padding: 8px 10px;
      width: 100%;
      box-sizing: border-box;
    }
    input:focus {
      outline: 2px solid var(--accent);
      outline-offset: -1px;
    }
  `;

  @property({ attribute: false }) public hass?: HomeAssistant;
  @property() public value = "";
  @property() public placeholder = "";
  /** Limit the list to these domains, empty means every domain. */
  @property({ attribute: false }) public domains: string[] = [];

  @state() private _query = "";
  @state() private _open = false;
  @state() private _active = 0;

  private _label(entityId: string): string {
    return (
      this.hass?.states[entityId]?.attributes?.friendly_name || entityId
    );
  }

  private _matches(): string[] {
    if (!this.hass) return [];
    const query = this._query.trim().toLowerCase();
    const domainFilter = this.domains?.length ? new Set(this.domains) : null;

    const all = Object.keys(this.hass.states).filter(
      (id) => !domainFilter || domainFilter.has(id.split(".")[0])
    );

    if (!query) return all.slice(0, 60).sort();

    // Substring match on both the id and the friendly name, so the user can
    // search by what they see in the UI as well as by the technical id.
    return all
      .filter(
        (id) =>
          id.toLowerCase().includes(query) ||
          this._label(id).toLowerCase().includes(query)
      )
      .sort()
      .slice(0, 60);
  }

  private _commit(entityId: string): void {
    this.value = entityId;
    this._query = "";
    this._open = false;
    this.dispatchEvent(
      new CustomEvent("value-changed", {
        detail: { value: entityId },
        bubbles: true,
        composed: true,
      })
    );
  }

  private _onKeyDown(event: KeyboardEvent): void {
    const options = this._matches();
    if (event.key === "ArrowDown") {
      event.preventDefault();
      this._open = true;
      this._active = Math.min(this._active + 1, options.length - 1);
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      this._active = Math.max(this._active - 1, 0);
    } else if (event.key === "Enter") {
      if (this._open && options[this._active]) {
        event.preventDefault();
        this._commit(options[this._active]);
      }
    } else if (event.key === "Escape") {
      this._open = false;
    }
  }

  protected render(): TemplateResult {
    const options = this._matches();
    const shown = this._open ? this._query : this.value;

    return html`
      <input
        .value=${shown}
        placeholder=${this.placeholder}
        @focus=${() => {
          this._open = true;
          this._query = "";
          this._active = 0;
        }}
        @input=${(e: Event) => {
          this._query = (e.target as HTMLInputElement).value;
          this._open = true;
          this._active = 0;
        }}
        @keydown=${this._onKeyDown}
        @blur=${() => window.setTimeout(() => (this._open = false), 150)}
      />
      ${this._open
        ? html`
            <div class="list">
              ${options.length
                ? options.map(
                    (id, index) => html`
                      <div
                        class="opt"
                        data-active=${index === this._active ? "1" : "0"}
                        @mousedown=${(e: Event) => {
                          // mousedown fires before blur, so the click lands.
                          e.preventDefault();
                          this._commit(id);
                        }}
                      >
                        <span class="name">${this._label(id)}</span>
                        <span class="id">${id}</span>
                      </div>
                    `
                  )
                : html`<div class="none">${this._query}</div>`}
            </div>
          `
        : ""}
    `;
  }
}
