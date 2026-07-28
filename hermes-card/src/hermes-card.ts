import { LitElement, html, type TemplateResult } from "lit";
import { customElement, property, state } from "lit/decorators.js";

import { translator } from "./i18n";
import { hermesLayout, hermesTokens } from "./styles";
import { renderChat } from "./screens/chat";
import { renderDevices } from "./screens/devices";
import { renderHomeAssistant } from "./screens/homeassistant";
import { renderLog } from "./screens/log";
import { renderMap } from "./screens/map";
import { renderMessages } from "./screens/messages";
import { renderSecurity } from "./screens/security";
import { renderSettings } from "./screens/settings";
import { renderStatus, renderStatusSummary } from "./screens/status";
import type {
  CardView,
  ChatMessage,
  RadioConfig,
  HermesCardConfig,
  HermesChannel,
  HermesCommand,
  HermesEntry,
  HermesLogEntry,
  HermesPreset,
  HermesSettings,
  HomeAssistant,
  NodeInfo,
  RadioInfo,
  TabId,
} from "./types";
import { VERSION } from "./version";
import { setCatalogue } from "./actions";
import {
  clearChat,
  clearHistory,
  fetchActions,
  fetchChannels,
  fetchChats,
  fetchRadioConfig,
  fetchRadioInfo,
  fetchEntries,
  fetchHistory,
  fetchNodes,
  fetchPresets,
  fetchSettings,
  removeCommand,
  reorderCommands,
  removePreset,
  saveCommand,
  savePreset,
  sendChat,
  setRadioConfig,
  sendPreset,
  updateEntry,
  updateSettings,
} from "./ws";

const TABS: TabId[] = [
  "status",
  "chat",
  "log",
  "devices",
  "map",
  "messages",
  "homeassistant",
  "settings",
];

const VIEWS: CardView[] = ["full", "summary", "chat"];

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
  /** Pinned by the compact cards; "full" is the tabbed panel. */
  @state() private _view: CardView = "full";

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
  /** Word to say instead of each raw state, for the entity being composed. */
  @state() private _paletteLabels: Record<string, string> = {};
  @state() private _showAdvanced = false;
  @state() private _mapShowAll = false;
  @state() private _mapRadiusOn = false;
  @state() private _mapRadiusKm = 25;
  @state() private _presets: HermesPreset[] = [];
  @state() private _editingPreset: HermesPreset | null = null;
  @state() private _history: HermesLogEntry[] = [];
  @state() private _logFilter = "";
  @state() private _testText = "";
  @state() private _sendingTest = false;
  @state() private _channels: HermesChannel[] = [];
  @state() private _firmware: string | null = null;
  @state() private _radio: RadioInfo | null = null;
  /** Set when loading the nodes failed, so an error is not shown as "none". */
  @state() private _nodesError: string | null = null;
  @state() private _refreshing = false;
  /** Clock time of the last successful refresh, shown so it is not guesswork. */
  @state() private _updatedAt = "";
  @state() private _chats: Record<string, ChatMessage[]> = {};
  @state() private _chatThread: string | null = null;
  @state() private _chatDraft = "";
  @state() private _chatSending = false;
  @state() private _radioConfig: RadioConfig | null = null;
  @state() private _radioDraft: Record<string, string | number | boolean> = {};
  @state() private _radioSaving = false;
  @state() private _radioError: string | null = null;
  /** "<entry_id>:<key>" of the protection armed for a confirming click. */
  @state() private _armed: string | null = null;
  /** Entry whose public channel warning is open. */
  @state() private _riskDialog: string | null = null;

  private _loaded = false;
  private _pollTimer?: number;
  private _unsubscribe?: () => Promise<void>;

  public setConfig(config: HermesCardConfig): void {
    this._config = config;
    if (config?.tab && TABS.includes(config.tab)) {
      this._tab = config.tab;
    }
    this._view = VIEWS.includes(config?.view as CardView)
      ? (config.view as CardView)
      : "full";
    // The host element itself has to stop stretching, and only an attribute
    // reaches it from inside the shadow root.
    this.toggleAttribute("compact", this._view !== "full");
  }

  public getCardSize(): number {
    return 12;
  }

  public connectedCallback(): void {
    super.connectedCallback();
    // Listen to the same event the integration listens to, so a message shows
    // up as it arrives instead of whenever a timer happens to fire. Polling
    // alone meant staring at a screen with no idea whether it was working.
    void this._subscribe();
    // Safety net for anything that does not raise the event, and for a
    // connection that dropped the subscription.
    this._pollTimer = window.setInterval(() => void this._poll(), 15000);
  }

  public disconnectedCallback(): void {
    super.disconnectedCallback();
    if (this._pollTimer) {
      window.clearInterval(this._pollTimer);
      this._pollTimer = undefined;
    }
    if (this._unsubscribe) {
      void this._unsubscribe();
      this._unsubscribe = undefined;
    }
  }

  private async _subscribe(): Promise<void> {
    const connection = this.hass?.connection;
    if (!connection?.subscribeEvents || this._unsubscribe) return;
    try {
      this._unsubscribe = await connection.subscribeEvents(
        () => void this._poll(true),
        "meshtastic_api_text_message"
      );
    } catch (err) {
      console.warn("Hermes: live updates unavailable, falling back to polling", err);
    }
  }

  /** Refresh the monitoring data. `force` ignores which tab is open. */
  private async _poll(force = false): Promise<void> {
    if (!this.hass || !this._loaded) return;
    if (
      !force &&
      this._tab !== "status" &&
      this._tab !== "log" &&
      this._tab !== "chat"
    ) {
      return;
    }
    try {
      this._entries = await fetchEntries(this.hass);
      if (this._view === "full") {
        this._history = await fetchHistory(this.hass);
      }
      if (this._view !== "summary") {
        this._chats = await fetchChats(this.hass);
      }
      this._updatedAt = new Date().toLocaleTimeString();
    } catch (err) {
      console.warn("Hermes: refresh failed", err);
    }
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
      this._nodesError = null;
    } catch (err) {
      // Never silently show an empty list for a failed call: that reads as
      // "you have no nodes" and sends the user looking in the wrong place.
      this._nodesError = String((err as any)?.message ?? err);
      console.error("Hermes: failed to load nodes", err);
    }

    try {
      this._channels = await fetchChannels(this.hass);
    } catch (err) {
      console.warn("Hermes: could not read the radio channels", err);
    }

    try {
      const radio = await fetchRadioInfo(this.hass);
      this._radio = radio;
      this._firmware = radio.firmware;
    } catch {
      this._firmware = null;
    }

    try {
      this._chats = await fetchChats(this.hass);
    } catch (err) {
      console.error("Hermes: failed to load the conversations", err);
    }

    // A compact card has everything it draws by now. The rest is for the
    // panel, and one of these cards can sit on a dashboard next to another:
    // reading the radio configuration, which talks to the node over the air,
    // three times a screen for a screen that never shows it is pure cost.
    if (this._view !== "full") return;

    try {
      // Authoritative action catalogue; the client fallback covers a failure.
      setCatalogue(await fetchActions(this.hass));
    } catch (err) {
      console.warn("Hermes: using the built-in action catalogue", err);
    }

    try {
      this._presets = await fetchPresets(this.hass);
    } catch (err) {
      console.error("Hermes: failed to load presets", err);
    }

    try {
      this._history = await fetchHistory(this.hass);
    } catch (err) {
      console.error("Hermes: failed to load the log", err);
    }

    try {
      // Admin only, and it talks to the radio, so a failure here is normal on a
      // node that is busy or away and must not blank the rest of the screen.
      this._radioConfig = await fetchRadioConfig(this.hass);
    } catch (err) {
      console.warn("Hermes: could not read the radio configuration", err);
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

  private _onDuplicate = (command: HermesCommand): void => {
    // Opened as an unsaved copy rather than written straight away: a duplicate
    // is nearly always the starting point for an edit, and two commands sharing
    // a keyword would both match the same message.
    const { id, ...rest } = command;
    this._editing = { ...rest, keyword: `${command.keyword} 2` };
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
    // The words belong to the entity that was being composed. Carrying them to
    // the next one would quietly put "running" on a door lock.
    this._paletteLabels = {};
  };

  private _onPaletteValue = (actionId: string, value: number | string): void => {
    this._paletteValues = { ...this._paletteValues, [actionId]: value };
  };

  private _onPaletteLabel = (state: string, word: string): void => {
    this._paletteLabels = { ...this._paletteLabels, [state]: word };
  };

  private _onToggleAdvanced = (): void => {
    this._showAdvanced = !this._showAdvanced;
  };

  private _onPresetNew = (): void => {
    this._editingPreset = { label: "", text: "", node_id: null, channel: null };
  };

  private _onPresetEdit = (preset: HermesPreset): void => {
    this._editingPreset = { ...preset };
  };

  private _onPresetInput = (key: keyof HermesPreset, value: unknown): void => {
    if (!this._editingPreset) return;
    this._editingPreset = {
      ...this._editingPreset,
      [key]: value,
    } as HermesPreset;
  };

  private _onPresetCancel = (): void => {
    this._editingPreset = null;
  };

  private _onPresetSave = async (): Promise<void> => {
    if (!this.hass || !this._editingPreset?.text) return;
    await savePreset(this.hass, this._editingPreset);
    this._editingPreset = null;
    this._presets = await fetchPresets(this.hass);
    this._flagSaved();
  };

  private _onPresetDelete = async (preset: HermesPreset): Promise<void> => {
    if (!this.hass || !preset.id) return;
    await removePreset(this.hass, preset.id);
    this._presets = await fetchPresets(this.hass);
  };

  private _onPresetSend = async (preset: HermesPreset): Promise<void> => {
    const entryId = this._selectedEntry ?? this._entries[0]?.entry_id;
    if (!this.hass || !entryId || !preset.id) return;
    await sendPreset(this.hass, entryId, preset.id);
    this._flagSaved();
    this._history = await fetchHistory(this.hass);
  };

  private _onTestText = (value: string): void => {
    this._testText = value;
  };

  private _onSendTest = async (): Promise<void> => {
    const entryId = this._selectedEntry ?? this._entries[0]?.entry_id;
    if (!this.hass || !entryId || !this._testText) return;
    this._sendingTest = true;
    try {
      await this.hass.callService("hermes", "broadcast", {
        config_entry_id: entryId,
        message: this._testText,
      });
      this._flagSaved();
      this._history = await fetchHistory(this.hass);
    } catch (err) {
      console.error("Hermes: test send failed", err);
    } finally {
      this._sendingTest = false;
    }
  };

  private _onRadioInput = (
    field: string,
    value: string | number | boolean
  ): void => {
    this._radioDraft = { ...this._radioDraft, [field]: value };
    this._radioError = null;
  };

  private _onRadioSave = async (): Promise<void> => {
    if (!this.hass || !Object.keys(this._radioDraft).length) return;
    this._radioSaving = true;
    this._radioError = null;
    try {
      this._radioConfig = await setRadioConfig(this.hass, this._radioDraft);
      this._radioDraft = {};
      this._flagSaved();
    } catch (err) {
      // Shown in place rather than logged away: this one changed the radio, or
      // failed to, and the user needs to know which.
      this._radioError = String((err as any)?.message ?? err);
    } finally {
      this._radioSaving = false;
    }
  };

  private _onChatSelect = (thread: string): void => {
    this._chatThread = thread;
  };

  private _onChatDraft = (text: string): void => {
    this._chatDraft = text;
  };

  private _onChatSend = async (): Promise<void> => {
    const entryId = this._selectedEntry ?? this._entries[0]?.entry_id;
    const thread = this._chatThread ?? Object.keys(this._chats)[0];
    if (!this.hass || !entryId || !thread || !this._chatDraft.trim()) return;

    this._chatSending = true;
    try {
      await sendChat(this.hass, entryId, thread, this._chatDraft.trim());
      this._chatDraft = "";
      this._chats = await fetchChats(this.hass);
    } catch (err) {
      console.error("Hermes: could not send the message", err);
    } finally {
      this._chatSending = false;
    }
  };

  private _onChatClear = async (thread: string): Promise<void> => {
    if (!this.hass) return;
    await clearChat(this.hass, thread);
    this._chats = await fetchChats(this.hass);
  };

  private _onLogFilter = (value: string): void => {
    this._logFilter = value;
  };

  private _onLogClear = async (): Promise<void> => {
    if (!this.hass) return;
    await clearHistory(this.hass);
    this._history = [];
  };

  private _onToggleShowAll = (): void => {
    this._mapShowAll = !this._mapShowAll;
  };

  private _onToggleRadius = (): void => {
    this._mapRadiusOn = !this._mapRadiusOn;
  };

  private _onRadiusChange = (km: number): void => {
    this._mapRadiusKm = km;
  };

  private _onSecurityToggle = async (
    entryId: string,
    key: string,
    value: boolean
  ): Promise<void> => {
    if (!this.hass) return;
    await updateEntry(this.hass, entryId, { [key]: value });
    this._flagSaved();
    await this._load();
  };

  private _onSecurityNumber = async (
    entryId: string,
    key: string,
    value: number
  ): Promise<void> => {
    if (!this.hass) return;
    await updateEntry(this.hass, entryId, { [key]: value });
    this._flagSaved();
    await this._load();
  };

  private _onArm = (token: string | null): void => {
    this._armed = token;
    if (!token) return;
    // The confirmation disarms itself, so a button left armed on a screen
    // nobody is watching cannot be completed by an accidental later click.
    window.setTimeout(() => {
      if (this._armed === token) this._armed = null;
    }, 5000);
  };

  private _onOpenRisk = (entryId: string | null): void => {
    this._riskDialog = entryId;
  };

  private _onAcceptRisk = async (entryId: string): Promise<void> => {
    if (!this.hass) return;
    // Only the decision travels. Who and when are recorded by the backend from
    // the connection and the clock, so the record describes what happened.
    await updateEntry(this.hass, entryId, { channel_risk_ack: true });
    this._flagSaved();
    await this._load();
  };

  private _onRevokeRisk = async (entryId: string): Promise<void> => {
    if (!this.hass) return;
    await updateEntry(this.hass, entryId, { channel_risk_ack: false });
    this._flagSaved();
    await this._load();
  };

  private _onPickChannel = (entryId: string): void => {
    this._tab = "settings";
    this._selectedEntry = entryId;
  };

  private _onRefresh = async (): Promise<void> => {
    // Explicit reload: channels, node list and gateway options are all read
    // from the radio and the registry, so a change made in the Meshtastic app
    // shows up here without restarting Home Assistant.
    this._refreshing = true;
    try {
      await this._load();
    } finally {
      this._refreshing = false;
    }
  };

  private _onHeightChange = async (mode: string): Promise<void> => {
    if (!this.hass) return;
    // Persist straight away: a display preference the user has to set again on
    // every visit is not a preference.
    this._settings = await updateSettings(this.hass, { map_height: mode });
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

  /**
   * Move a command one place in the stored order.
   *
   * The order is what decides which of two overlapping keywords runs, so this
   * writes the whole sequence back rather than a position: the backend keeps
   * one list and there is no second notion of order anywhere.
   */
  private _onMoveCommand = async (
    command: HermesCommand,
    delta: number
  ): Promise<void> => {
    const entryId = this._selectedEntry ?? this._entries[0]?.entry_id;
    const entry = this._entries.find((e) => e.entry_id === entryId);
    if (!this.hass || !entry || !command.id) return;

    const ids = entry.commands.map((c) => c.id ?? "");
    const from = ids.indexOf(command.id);
    const to = from + delta;
    if (from < 0 || to < 0 || to >= ids.length) return;

    ids.splice(to, 0, ids.splice(from, 1)[0]);
    await reorderCommands(this.hass, entry.entry_id, ids);
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
    // Every tab shows backend data by now, so entering one always refreshes.
    // Status and Log used to be excluded, which meant the two monitoring tabs
    // showed a snapshot from page load forever: messages were received and
    // logged while the card kept saying nothing had arrived.
    void this._load();
  }

  private _screen(t: (k: string) => string): TemplateResult {
    const hass = this.hass!;
    switch (this._tab) {
      case "status":
        return renderStatus(
          hass,
          this._entries,
          this._updatedAt,
          this._radio,
          t
        );
      case "chat":
        return renderChat(
          {
            chats: this._chats,
            channels: this._channels,
            nodes: this._nodes,
            thread: this._chatThread,
            draft: this._chatDraft,
            sending: this._chatSending,
            onSelect: this._onChatSelect,
            onDraft: this._onChatDraft,
            onSend: this._onChatSend,
            onClear: this._onChatClear,
          },
          t
        );
      case "log":
        return renderLog(
          {
            entries: this._history,
            entries_meta: this._entries.map((e) => ({
              title: e.title,
              counts: e.seen_counts ?? {},
            })),
            filter: this._logFilter,
            updatedAt: this._updatedAt,
            onFilter: this._onLogFilter,
            onClear: this._onLogClear,
            onRefresh: () => void this._poll(true),
          },
          t
        );
      case "devices":
        return renderDevices(hass, t);
      case "map":
        return renderMap(
          {
            hass,
            settings: this._settings,
            // Trust is per gateway; the map is one view, so a node trusted by
            // any gateway counts as trusted on it.
            authorized: [
              ...new Set(this._entries.flatMap((e) => e.authorized_nodes ?? [])),
            ],
            meshNodes: this._nodes,
            showAll: this._mapShowAll,
            radiusOn: this._mapRadiusOn,
            radiusKm: this._mapRadiusKm,
            onToggleShowAll: this._onToggleShowAll,
            onToggleRadius: this._onToggleRadius,
            onRadiusChange: this._onRadiusChange,
            onHeightChange: this._onHeightChange,
          },
          t
        );
      case "messages":
        return renderMessages(
          {
            hass,
            entries: this._entries,
            selectedEntry: this._selectedEntry,
            editing: this._editing,
            loadError: this._loadError,
            paletteEntity: this._paletteEntity,
            paletteValues: this._paletteValues,
            paletteLabels: this._paletteLabels,
            showAdvanced: this._showAdvanced,
            onSelectEntry: this._onSelectEntry,
            onNew: this._onNew,
            onEdit: this._onEdit,
            onDuplicate: this._onDuplicate,
            onDelete: this._onDeleteCommand,
            onMove: this._onMoveCommand,
            onDraftInput: this._onDraftInput,
            onPaletteEntity: this._onPaletteEntity,
            onPaletteValue: this._onPaletteValue,
            onPaletteLabel: this._onPaletteLabel,
            onInsert: this._onInsert,
            onToggleAdvanced: this._onToggleAdvanced,
            onSave: this._onSaveCommand,
            onCancel: this._onCancel,
            channels: this._channels,
            presets: this._presets,
            editingPreset: this._editingPreset,
            onPresetNew: this._onPresetNew,
            onPresetEdit: this._onPresetEdit,
            onPresetDelete: this._onPresetDelete,
            onPresetInput: this._onPresetInput,
            onPresetSave: this._onPresetSave,
            onPresetCancel: this._onPresetCancel,
            onPresetSend: this._onPresetSend,
          },
          t
        );
      case "homeassistant":
        return renderHomeAssistant(
          {
            hass,
            entries: this._entries,
            testText: this._testText,
            selectedEntry: this._selectedEntry,
            sending: this._sendingTest,
            onTestText: this._onTestText,
            onSendTest: this._onSendTest,
          },
          t
        );
      case "settings":
        return html`
          ${renderSecurity(
            {
              entries: this._entries,
              armed: this._armed,
              riskDialog: this._riskDialog,
              onToggle: this._onSecurityToggle,
              onArm: this._onArm,
              onNumber: this._onSecurityNumber,
              onOpenRisk: this._onOpenRisk,
              onAcceptRisk: this._onAcceptRisk,
              onRevokeRisk: this._onRevokeRisk,
              onPickChannel: this._onPickChannel,
            },
            t
          )}
          ${this._renderSettings(t)}
        `;
      default:
        return renderStatus(
          hass,
          this._entries,
          this._updatedAt,
          this._radio,
          t
        );
    }
  }

  private _renderSettings(t: (k: string) => string): TemplateResult {
    return renderSettings(
          {
            settings: this._settings,
            entries: this._entries,
            nodes: this._nodes,
            channels: this._channels,
            firmware: this._firmware,
            nodesError: this._nodesError,
            refreshing: this._refreshing,
            onRefresh: this._onRefresh,
            saved: this._saved,
            loadError: this._loadError,
            draftGlobal: this._draftGlobal,
            draftEntries: this._draftEntries,
            onGlobalInput: this._onGlobalInput,
            onEntryInput: this._onEntryInput,
            radioConfig: this._radioConfig,
            radioDraft: this._radioDraft,
            radioSaving: this._radioSaving,
            radioError: this._radioError,
            onRadioInput: this._onRadioInput,
            onRadioSave: this._onRadioSave,
            onSaveGlobal: this._onSaveGlobal,
            onSaveEntry: this._onSaveEntry,
          },
          t
    );
  }

  /** The single screen a compact card shows, without tabs or toolbar. */
  private _compact(t: (k: string) => string): TemplateResult {
    const hass = this.hass!;
    if (this._view === "chat") {
      return renderChat(
        {
          chats: this._chats,
          channels: this._channels,
          nodes: this._nodes,
          thread: this._chatThread,
          draft: this._chatDraft,
          sending: this._chatSending,
          onSelect: this._onChatSelect,
          onDraft: this._onChatDraft,
          onSend: this._onChatSend,
          onClear: this._onChatClear,
        },
        t
      );
    }
    return renderStatusSummary(hass, this._entries, this._updatedAt, this._radio, t);
  }

  protected render(): TemplateResult {
    if (!this.hass || !this._config) return html``;
    const t = translator(this.hass);

    if (this._view !== "full") {
      return html`
        <div class="shell compact" data-view=${this._view}>
          <div class="content">${this._compact(t)}</div>
        </div>
      `;
    }

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

/**
 * The two compact cards.
 *
 * Separate elements rather than a config option alone, so they show up in the
 * Lovelace picker under their own name: a user putting a chat box on a
 * dashboard should not have to know that it is the panel card with a setting
 * changed. Both are the same card underneath, with the view pinned.
 */
@customElement("hermes-summary-card")
export class HermesSummaryCard extends HermesCard {
  public setConfig(config: HermesCardConfig): void {
    super.setConfig({ ...config, view: "summary" });
  }

  public getCardSize(): number {
    return 4;
  }
}

@customElement("hermes-chat-card")
export class HermesChatCard extends HermesCard {
  public setConfig(config: HermesCardConfig): void {
    super.setConfig({ ...config, view: "chat" });
  }

  public getCardSize(): number {
    return 8;
  }
}

// Register the cards in the Lovelace picker.
(window as any).customCards = (window as any).customCards || [];
(window as any).customCards.push(
  {
    type: "hermes-card",
    name: "Hermes",
    description: "Meshtastic Commander control panel",
    preview: false,
  },
  {
    type: "hermes-summary-card",
    name: "Hermes summary",
    description: "Hermes status as a list of parameters, for a dashboard column",
    preview: false,
  },
  {
    type: "hermes-chat-card",
    name: "Hermes chat",
    description: "Send and read Meshtastic messages, channels and direct",
    preview: false,
  }
);

console.info(`%c HERMES-CARD %c ${VERSION} `, "background:#FFD60A;color:#000", "");
