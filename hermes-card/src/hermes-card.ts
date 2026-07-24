import { LitElement, html, type TemplateResult } from "lit";
import { customElement, property, state } from "lit/decorators.js";

import { translator } from "./i18n";
import { hermesLayout, hermesTokens } from "./styles";
import { renderDevices } from "./screens/devices";
import { renderMessages } from "./screens/messages";
import { renderPlaceholder } from "./screens/placeholder";
import { renderSettings } from "./screens/settings";
import { renderStatus } from "./screens/status";
import type {
  HermesCardConfig,
  HermesCommand,
  HermesEntry,
  HermesSettings,
  HomeAssistant,
  NodeInfo,
  TabId,
} from "./types";
import { VERSION } from "./version";
import { setCatalogue } from "./actions";
import {
  fetchActions,
  fetchEntries,
  fetchNodes,
  fetchSettings,
  removeCommand,
  saveCommand,
  updateEntry,
  updateSettings,
} from "./ws";

const TABS: TabId[] = [
  "status",
  "devices",
  "map",
  "messages",
  "homeassistant",
  "settings",
];

const EMPTY_COMMAND: HermesCommand = {
  keyword: "",
  match_type: "exact",
  service: "",
  reply_template: "",
  reply_to: "channel",
};

@customElement("hermes-card")
export class HermesCard extends LitElement {
  static styles = [hermesTokens, hermesLayout];

  @property({ attribute: false }) public hass?: HomeAssistant;

  @state() private _config?: HermesCardConfig;
  @state() private _tab: TabId = "status";

  @state() private _entries: HermesEntry[] = [];
  @state() private _nodes: NodeInfo[] = [];
  @state() private _settings: HermesSettings | null = null;
  @state() private _saved = false;

  @state() private _draftGlobal: Partial<HermesSettings> = {};
  @state() private _draftEntries: Record<string, Record<string, any>> = {};

  @state() private _selectedEntry: string | null = null;
  @state() private _editing: HermesCommand | null = null;
  @state() private _loadError: string | null = null;
  @state() private _paletteEntity = "";
  @state() private _paletteValues: Record<string, number | string> = {};
  @state() private _showAdvanced = false;

  private _loaded = false;

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
        break;
      }
      node = node.parentElement;
    }
  }

  protected updated(): void {
    if (this.hass && !this._loaded) {
      this._loaded = true;
      void this._load();
    }
  }

  /**
   * Load backend data.
   *
   * Each call is isolated: a failure in one must not blank the others, which
   * previously made the Messages tab claim "no gateway configured" when the
   * real problem was a failed request. Entries are also retried, because the
   * card can be loaded by the frontend before the integration has registered
   * its websocket commands, and without a retry the tab stayed empty forever.
   */
  private async _load(attempt = 0): Promise<void> {
    if (!this.hass) return;

    try {
      const entries = await fetchEntries(this.hass);
      this._entries = entries;
      this._loadError = null;
      if (!this._selectedEntry && entries.length) {
        this._selectedEntry = entries[0].entry_id;
      }
    } catch (err) {
      if (attempt < 3) {
        window.setTimeout(() => void this._load(attempt + 1), 500 * (attempt + 1));
        return;
      }
      this._loadError = String((err as any)?.message ?? err);
      console.error("Hermes: failed to load gateways", err);
    }

    try {
      this._nodes = await fetchNodes(this.hass);
    } catch (err) {
      console.error("Hermes: failed to load nodes", err);
    }

    try {
      // Authoritative action catalogue; the client fallback covers a failure.
      setCatalogue(await fetchActions(this.hass));
    } catch (err) {
      console.warn("Hermes: using the built-in action catalogue", err);
    }

    try {
      // Admin only: a non-admin user simply does not get the global settings.
      this._settings = await fetchSettings(this.hass);
    } catch {
      this._settings = null;
    }
  }

  private _flagSaved(): void {
    this._saved = true;
    window.setTimeout(() => {
      this._saved = false;
    }, 2000);
  }

  // --- Settings handlers -------------------------------------------------

  private _onGlobalInput = (key: keyof HermesSettings, value: unknown): void => {
    this._draftGlobal = { ...this._draftGlobal, [key]: value };
  };

  private _onEntryInput = (
    entryId: string,
    key: string,
    value: unknown
  ): void => {
    this._draftEntries = {
      ...this._draftEntries,
      [entryId]: { ...(this._draftEntries[entryId] ?? {}), [key]: value },
    };
  };

  private _onSaveGlobal = async (): Promise<void> => {
    if (!this.hass || !Object.keys(this._draftGlobal).length) return;
    this._settings = await updateSettings(this.hass, this._draftGlobal);
    this._draftGlobal = {};
    this._flagSaved();
  };

  private _onSaveEntry = async (entryId: string): Promise<void> => {
    const patch = this._draftEntries[entryId];
    if (!this.hass || !patch || !Object.keys(patch).length) return;
    await updateEntry(this.hass, entryId, patch);
    this._draftEntries = { ...this._draftEntries, [entryId]: {} };
    this._flagSaved();
    await this._load();
  };

  // --- Messages handlers -------------------------------------------------

  private _onSelectEntry = (entryId: string): void => {
    this._selectedEntry = entryId;
    this._editing = null;
  };

  private _onNew = (): void => {
    this._editing = { ...EMPTY_COMMAND };
  };

  private _onEdit = (command: HermesCommand): void => {
    this._editing = { ...command };
  };

  private _onDraftInput = (key: keyof HermesCommand, value: unknown): void => {
    if (!this._editing) return;
    this._editing = { ...this._editing, [key]: value } as HermesCommand;
  };

  private _onCancel = (): void => {
    this._editing = null;
  };

  private _onPaletteEntity = (entityId: string): void => {
    this._paletteEntity = entityId;
  };

  private _onPaletteValue = (actionId: string, value: number | string): void => {
    this._paletteValues = { ...this._paletteValues, [actionId]: value };
  };

  private _onToggleAdvanced = (): void => {
    this._showAdvanced = !this._showAdvanced;
  };

  /**
   * Insert a token where the cursor sits in the template textarea, so the user
   * can build a sentence around the tokens instead of only appending.
   */
  private _onInsert = (token: string): void => {
    if (!this._editing) return;
    const area = this.renderRoot.querySelector(
      "#hermes-template"
    ) as HTMLTextAreaElement | null;
    const current = this._editing.reply_template ?? "";

    if (!area) {
      this._editing = { ...this._editing, reply_template: current + token };
      return;
    }

    const start = area.selectionStart ?? current.length;
    const end = area.selectionEnd ?? current.length;
    const next = current.slice(0, start) + token + current.slice(end);
    this._editing = { ...this._editing, reply_template: next };

    // Put the caret after the inserted token once Lit has re-rendered.
    void this.updateComplete.then(() => {
      const el = this.renderRoot.querySelector(
        "#hermes-template"
      ) as HTMLTextAreaElement | null;
      if (el) {
        const pos = start + token.length;
        el.focus();
        el.setSelectionRange(pos, pos);
      }
    });
  };

  private _onSaveCommand = async (): Promise<void> => {
    const entryId = this._selectedEntry;
    if (!this.hass || !entryId || !this._editing) return;
    // A command needs a keyword, plus at least one of: a service to run or a
    // reply to send. A reply-only command (for example "status") is valid.
    const hasAction =
      Boolean(this._editing.service) || Boolean(this._editing.reply_template);
    if (!this._editing.keyword || !hasAction) return;
    await saveCommand(this.hass, entryId, this._editing);
    this._editing = null;
    this._flagSaved();
    await this._load();
  };

  private _onDeleteCommand = async (command: HermesCommand): Promise<void> => {
    const entryId = this._selectedEntry;
    if (!this.hass || !entryId || !command.id) return;
    await removeCommand(this.hass, entryId, command.id);
    this._flagSaved();
    await this._load();
  };

  // --- Rendering ---------------------------------------------------------

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
        return renderMessages(
          {
            hass,
            entries: this._entries,
            selectedEntry: this._selectedEntry,
            editing: this._editing,
            loadError: this._loadError,
            entityIds: Object.keys(hass.states).sort(),
            paletteEntity: this._paletteEntity,
            paletteValues: this._paletteValues,
            showAdvanced: this._showAdvanced,
            onSelectEntry: this._onSelectEntry,
            onNew: this._onNew,
            onEdit: this._onEdit,
            onDelete: this._onDeleteCommand,
            onDraftInput: this._onDraftInput,
            onPaletteEntity: this._onPaletteEntity,
            onPaletteValue: this._onPaletteValue,
            onInsert: this._onInsert,
            onToggleAdvanced: this._onToggleAdvanced,
            onSave: this._onSaveCommand,
            onCancel: this._onCancel,
          },
          t
        );
      case "homeassistant":
        return renderPlaceholder(t("tab.homeassistant"), 4, t);
      case "settings":
        return renderSettings(
          {
            settings: this._settings,
            entries: this._entries,
            nodes: this._nodes,
            saved: this._saved,
            loadError: this._loadError,
            draftGlobal: this._draftGlobal,
            draftEntries: this._draftEntries,
            onGlobalInput: this._onGlobalInput,
            onEntryInput: this._onEntryInput,
            onSaveGlobal: this._onSaveGlobal,
            onSaveEntry: this._onSaveEntry,
          },
          t
        );
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

console.info(`%c HERMES-CARD %c ${VERSION} `, "background:#FFD60A;color:#000", "");
