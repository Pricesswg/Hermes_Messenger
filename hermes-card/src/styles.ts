import { css } from "lit";

// Token vars + layout, applied only to the hermes-card root. Custom properties
// cascade through the shadow DOM, so children inherit them.
//
// Hybrid theme, same approach as Chronos: chrome colors (background, text,
// border, surface) come from Home Assistant theme tokens with our oklch values
// as fallback, so the card follows whatever theme the user installed. The
// accent stays ours (the gold of the Hermes logo) for brand recognition.
export const hermesTokens = css`
  :host {
    display: block;
    height: 100%;
    box-sizing: border-box;
  }

  /* Lovelace "panel" view gives us the full viewport and overlays the HA app
   * bar on top of the card. hermes-card.ts sets the panel-mode attribute when
   * it detects that layout, and this padding offsets the content. */
  :host([panel-mode]) {
    padding-top: var(--hermes-panel-offset, var(--header-height, 56px));
  }

  /* A compact card is one card among many in a column: it has to end where its
   * content ends, not stretch to whatever the row happens to be. */
  :host([compact]) {
    height: auto;
  }

  :host {
    --font-sans: "Inter", -apple-system, BlinkMacSystemFont, sans-serif;
    --font-mono: "JetBrains Mono", ui-monospace, Menlo, monospace;

    --bg: var(--ha-card-background, var(--card-background-color, var(--primary-background-color, oklch(0.985 0.004 85))));
    --bg-soft: var(--secondary-background-color, var(--primary-background-color, oklch(0.965 0.005 85)));
    --bg-sunken: var(--primary-background-color, var(--secondary-background-color, oklch(0.945 0.006 85)));
    --surface: var(--ha-card-background, var(--card-background-color, #ffffff));
    --border: var(--divider-color, oklch(0.90 0.006 85));
    --text: var(--primary-text-color, oklch(0.22 0.012 85));
    --text-soft: var(--secondary-text-color, oklch(0.42 0.012 85));
    --text-muted: var(--disabled-text-color, var(--secondary-text-color, oklch(0.60 0.010 85)));

    /* Accent: Hermes gold, taken from the logo. Never themed away. */
    --accent: oklch(0.82 0.16 92);
    --accent-strong: oklch(0.72 0.16 90);
    --accent-soft: oklch(0.95 0.06 92);
    --accent-ink: oklch(0.42 0.10 88);

    --ok: var(--success-color, oklch(0.65 0.14 155));
    --warn: var(--warning-color, oklch(0.72 0.15 65));
    --danger: var(--error-color, oklch(0.60 0.18 25));
    --info: var(--info-color, oklch(0.60 0.13 230));

    --r-sm: 6px;
    --r-md: 10px;
    --r-lg: 16px;
    --r-pill: 999px;

    --shadow-xs: 0 1px 2px rgba(0, 0, 0, 0.06);
    --shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(0, 0, 0, 0.04);
    --shadow-md: 0 4px 14px rgba(0, 0, 0, 0.10), 0 2px 4px rgba(0, 0, 0, 0.06);

    --pad: 16px;

    /* Opaque base for anything that floats over other content.
     *
     * --surface follows --ha-card-background, which a good number of Home
     * Assistant themes deliberately make translucent for a glass look. That is
     * fine for a panel sitting on the dashboard and wrong for a dropdown: the
     * list let the fields underneath show through and read as broken.
     *
     * The page background is the right base. A theme may well make a card
     * translucent, but it has nothing to show through behind the page itself,
     * so this one is opaque in practice and follows the theme's own light or
     * dark palette, which a hardcoded colour could not. */
    --overlay-base: var(--primary-background-color, var(--card-background-color, #ffffff));

    font-family: var(--font-sans);
    color: var(--text);
  }

  /* Dark theme: the light yellow highlight would sit under the theme's white
   * text and become unreadable. Use a translucent accent that darkens instead,
   * and a light ink, so highlighted rows and chips stay legible either way.
   * Every rule that paints --accent-soft must also set --accent-ink as colour. */
  @media (prefers-color-scheme: dark) {
    :host {
      --accent-soft: rgba(255, 214, 10, 0.18);
      --accent-ink: oklch(0.9 0.12 92);
      --overlay-base: #1c1c1e;
    }
  }
`;

export const hermesLayout = css`
  .shell {
    display: flex;
    flex-direction: column;
    height: 100%;
    background: var(--bg);
    border-radius: var(--r-lg);
    overflow: hidden;
    box-shadow: var(--shadow-sm);
  }

  .topbar {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px var(--pad);
    background: var(--surface);
    border-bottom: 1px solid var(--border);
  }

  .brand {
    display: flex;
    align-items: center;
    gap: 10px;
    font-weight: 700;
    letter-spacing: 0.2px;
  }

  .brand .dot {
    width: 10px;
    height: 10px;
    border-radius: var(--r-pill);
    background: var(--accent);
    box-shadow: 0 0 0 4px var(--accent-soft);
  }

  .brand .sub {
    color: var(--text-muted);
    font-weight: 500;
    font-size: 0.8rem;
  }

  .tabs {
    display: flex;
    gap: 4px;
    padding: 8px var(--pad);
    background: var(--bg-soft);
    border-bottom: 1px solid var(--border);
    overflow-x: auto;
    scrollbar-width: thin;
  }

  .tab {
    appearance: none;
    border: 1px solid transparent;
    background: transparent;
    color: var(--text-soft);
    font-family: inherit;
    font-size: 0.86rem;
    font-weight: 600;
    padding: 8px 14px;
    border-radius: var(--r-pill);
    cursor: pointer;
    white-space: nowrap;
    transition: background 0.15s ease, color 0.15s ease;
  }

  .tab:hover {
    background: var(--surface);
    color: var(--text);
  }

  .tab[aria-selected="true"] {
    background: var(--accent-soft);
    color: var(--accent-ink);
    border-color: var(--accent);
  }

  .content {
    flex: 1;
    min-height: 0;
    overflow: auto;
    padding: var(--pad);
  }

  h2.screen-title {
    margin: 0 0 14px;
    font-size: 1.05rem;
    font-weight: 700;
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(210px, 1fr));
    gap: 12px;
  }

  .panel {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--r-md);
    padding: 14px;
    box-shadow: var(--shadow-xs);
  }

  .stat .label {
    font-size: 0.74rem;
    text-transform: uppercase;
    letter-spacing: 0.6px;
    color: var(--text-muted);
    font-weight: 700;
  }

  .stat .value {
    margin-top: 6px;
    font-size: 1.5rem;
    font-weight: 700;
    font-variant-numeric: tabular-nums;
  }

  .stat .value.small {
    font-size: 0.95rem;
    font-weight: 600;
    word-break: break-word;
  }

  .node-head {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    gap: 8px;
    margin-bottom: 10px;
  }

  .node-name {
    font-weight: 700;
    font-size: 0.95rem;
  }

  .node-num {
    font-family: var(--font-mono);
    font-size: 0.72rem;
    color: var(--text-muted);
  }

  .rows {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    font-size: 0.82rem;
    padding: 4px 0;
    border-bottom: 1px dashed var(--border);
  }

  .row:last-child {
    border-bottom: none;
  }

  .row .k {
    color: var(--text-soft);
  }

  .row .v {
    font-weight: 600;
    font-variant-numeric: tabular-nums;
    text-align: right;
    /* Values are user text: a command with no spaces, or an error message
     * carrying an entity id, has to wrap rather than run off the card. */
    min-width: 0;
    overflow-wrap: anywhere;
  }

  .empty {
    color: var(--text-muted);
    font-size: 0.9rem;
    background: var(--bg-sunken);
    border: 1px dashed var(--border);
    border-radius: var(--r-md);
    padding: 22px;
    text-align: center;
  }

  .badge {
    display: inline-block;
    font-size: 0.7rem;
    font-weight: 700;
    letter-spacing: 0.4px;
    padding: 3px 9px;
    border-radius: var(--r-pill);
    background: var(--accent-soft);
    color: var(--accent-ink);
  }

  .section {
    margin-bottom: 18px;
  }

  .section-title {
    font-size: 0.76rem;
    text-transform: uppercase;
    letter-spacing: 0.7px;
    font-weight: 700;
    color: var(--text-muted);
    margin-bottom: 8px;
  }

  .field {
    display: flex;
    flex-direction: column;
    gap: 5px;
    margin-bottom: 12px;
  }

  .field > label {
    font-size: 0.78rem;
    font-weight: 600;
    color: var(--text-soft);
  }

  .hint {
    font-size: 0.72rem;
    color: var(--text-muted);
  }

  input,
  select,
  textarea {
    font-family: inherit;
    font-size: 0.86rem;
    color: var(--text);
    background: var(--bg-sunken);
    border: 1px solid var(--border);
    border-radius: var(--r-sm);
    padding: 8px 10px;
    width: 100%;
    box-sizing: border-box;
  }

  input:focus,
  select:focus,
  textarea:focus {
    outline: 2px solid var(--accent);
    outline-offset: -1px;
  }

  select[multiple] {
    min-height: 110px;
  }

  textarea {
    min-height: 70px;
    resize: vertical;
  }

  .actions {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
    margin-top: 8px;
  }

  button.btn {
    appearance: none;
    font-family: inherit;
    font-size: 0.82rem;
    font-weight: 700;
    padding: 8px 14px;
    border-radius: var(--r-pill);
    border: 1px solid var(--border);
    background: var(--surface);
    color: var(--text);
    cursor: pointer;
  }

  button.btn:hover {
    background: var(--bg-soft);
  }

  button.btn.primary {
    background: var(--accent);
    border-color: var(--accent-strong);
    /* The accent stays a bright gold in both themes, so the ink stays dark. */
    color: #1b1b1b;
  }

  button.btn.danger {
    color: var(--danger);
  }

  /* Wraps instead of overflowing: in a narrow column the buttons used to fall
   * out of line with the text they belong to. */
  .list-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 10px;
    padding: 10px 12px;
    border: 1px solid var(--border);
    border-radius: var(--r-md);
    background: var(--surface);
    margin-bottom: 8px;
  }

  .list-row .meta {
    flex: 1 1 220px;
  }

  .list-row .actions {
    flex: 0 0 auto;
    flex-wrap: nowrap;
  }

  @media (max-width: 520px) {
    .list-row .actions {
      flex: 1 1 100%;
      flex-wrap: wrap;
    }
  }

  .list-row .meta {
    display: flex;
    flex-direction: column;
    gap: 2px;
    min-width: 0;
  }

  .list-row .kw {
    font-weight: 700;
    font-size: 0.9rem;
  }

  .list-row .sub {
    font-size: 0.75rem;
    color: var(--text-muted);
    font-family: var(--font-mono);
    overflow: hidden;
    text-overflow: ellipsis;
  }

  /* Next to the button that caused it, vertically centred on the same row:
   * in a title it could scroll out of view while the button stayed visible. */
  .toast {
    display: inline-flex;
    align-items: center;
    font-size: 0.78rem;
    font-weight: 700;
    color: var(--ok);
    white-space: nowrap;
  }

  .palette {
    background: var(--bg-sunken);
    border: 1px solid var(--border);
    border-radius: var(--r-md);
    padding: 12px;
    margin-bottom: 14px;
  }

  .chips {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-bottom: 12px;
  }

  .chip-group {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--r-pill);
    padding: 3px 8px 3px 3px;
  }

  button.chip {
    appearance: none;
    font-family: inherit;
    font-size: 0.8rem;
    font-weight: 700;
    padding: 6px 12px;
    border-radius: var(--r-pill);
    border: 1px solid var(--border);
    background: var(--surface);
    color: var(--text);
    cursor: pointer;
    white-space: nowrap;
  }

  button.chip:hover {
    border-color: var(--accent);
    background: var(--bg-soft);
    color: var(--text);
  }

  button.chip.read {
    border-style: dashed;
  }

  /* Action chips read as "actionable" through the accent border rather than a
   * yellow fill, so the label keeps the theme text colour and stays legible on
   * dark dashboards. */
  button.chip.do {
    background: var(--surface);
    border-color: var(--accent);
    border-width: 2px;
    color: var(--text);
  }

  .chip-group button.chip {
    border: none;
    background: transparent;
    padding: 4px 8px;
  }

  input.inline {
    width: 76px;
    padding: 4px 6px;
    font-size: 0.78rem;
  }

  select.inline {
    width: auto;
    padding: 4px 6px;
    font-size: 0.78rem;
  }

  .unit {
    font-size: 0.72rem;
    color: var(--text-muted);
  }

  button.btn.link {
    background: none;
    border: none;
    color: var(--accent-ink);
    padding: 4px 0;
    text-decoration: underline;
  }

  .map-controls {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 14px;
    margin-bottom: 10px;
  }

  label.check {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-size: 0.82rem;
    font-weight: 600;
    color: var(--text-soft);
    cursor: pointer;
  }

  label.check input {
    width: auto;
    margin: 0;
  }

  .radius {
    display: inline-flex;
    align-items: center;
    gap: 8px;
  }

  .radius input[type="range"] {
    width: 160px;
    padding: 0;
  }

  .legend {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 0.74rem;
    color: var(--text-muted);
    margin-bottom: 10px;
  }

  .legend .dot {
    margin-left: 8px;
  }

  .dot {
    display: inline-block;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    vertical-align: middle;
    margin-right: 6px;
  }

  .dot.on {
    background: #2ecc71;
  }

  .dot.off {
    background: #ffd60a;
  }

  .dot.relay {
    background: #4aa3ff;
  }

  .checklist {
    display: flex;
    flex-direction: column;
    gap: 2px;
    max-height: 220px;
    overflow-y: auto;
    border: 1px solid var(--border);
    border-radius: var(--r-sm);
    padding: 8px 10px;
    background: var(--bg-sunken);
  }

  .checklist .check {
    justify-content: flex-start;
    gap: 8px;
    padding: 3px 0;
  }

  .checklist .node-num {
    margin-left: auto;
  }

  button.btn.refresh {
    margin-left: 10px;
    padding: 4px 12px;
    font-size: 0.72rem;
    vertical-align: middle;
  }

  .field.indented {
    margin-left: 16px;
    padding-left: 12px;
    border-left: 2px solid var(--border);
  }

  .channel-badge {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    margin-left: 10px;
    padding: 3px 10px;
    border-radius: var(--r-pill);
    border: 2px solid var(--accent);
    background: var(--surface);
    color: var(--text);
    font-size: 0.72rem;
    font-weight: 700;
    white-space: nowrap;
    vertical-align: middle;
  }

  .channel-badge.small {
    margin-left: 0;
    font-size: 0.68rem;
    padding: 2px 8px;
  }

  .note {
    font-size: 0.78rem;
    line-height: 1.45;
    padding: 8px 10px;
    border-left: 3px solid var(--accent);
    background: var(--bg-sunken);
    border-radius: var(--r-sm);
    margin-bottom: 8px;
  }

  .note.warn {
    border-left-color: var(--danger);
  }

  .dot.bad {
    background: var(--danger);
  }

  .used {
    font-family: var(--font-mono);
    font-size: 0.68rem;
    color: var(--text-muted);
    margin-left: 6px;
  }

  .warn-badge {
    margin-left: 8px;
    font-size: 0.68rem;
    font-weight: 700;
    color: var(--danger);
    text-transform: none;
    letter-spacing: 0;
  }

  .chip .count {
    margin-left: 6px;
    font-size: 0.66rem;
    font-weight: 700;
    opacity: 0.7;
    font-variant-numeric: tabular-nums;
  }

  .chat-log {
    display: flex;
    flex-direction: column;
    gap: 8px;
    max-height: 50vh;
    overflow-y: auto;
    padding: 12px;
    background: var(--bg-sunken);
    border: 1px solid var(--border);
    border-radius: var(--r-md);
  }

  .bubble {
    max-width: 80%;
    padding: 8px 11px;
    border-radius: var(--r-md);
    background: var(--surface);
    border: 1px solid var(--border);
  }

  /* Ours sit on the right with the accent edge, theirs on the left, which is
   * the arrangement every messaging app has taught people to read. */
  .bubble.out {
    align-self: flex-end;
    border-color: var(--accent);
    box-shadow: inset -3px 0 0 var(--accent);
  }

  .bubble .who {
    font-size: 0.7rem;
    font-weight: 700;
    color: var(--text-muted);
    margin-bottom: 2px;
  }

  .bubble .text {
    font-size: 0.86rem;
    word-break: break-word;
    white-space: pre-wrap;
  }

  .bubble .when {
    font-size: 0.66rem;
    color: var(--text-muted);
    font-family: var(--font-mono);
    margin-top: 3px;
  }

  .chat-send {
    display: flex;
    gap: 8px;
    margin-top: 12px;
  }

  .chat-send input {
    flex: 1;
  }

  .log-row {
    display: flex;
    gap: 10px;
    align-items: flex-start;
    padding: 8px 0;
    border-bottom: 1px dashed var(--border);
  }

  .log-row .dir {
    font-weight: 700;
    font-size: 1rem;
    line-height: 1.2;
  }

  .log-row .dir.in {
    color: var(--info);
  }

  .log-row .dir.out {
    color: var(--ok);
  }

  .log-body {
    min-width: 0;
    flex: 1;
  }

  .log-text {
    font-size: 0.84rem;
    word-break: break-word;
  }

  .log-meta {
    font-size: 0.7rem;
    color: var(--text-muted);
    font-family: var(--font-mono);
    margin-top: 2px;
  }

  button.chip[data-on="1"] {
    border-color: var(--accent);
    border-width: 2px;
    background: var(--bg-soft);
  }

  .labels {
    margin-bottom: 12px;
  }

  .label-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(190px, 1fr));
    gap: 6px;
    margin-top: 6px;
  }

  .label-row {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  /* The raw state, monospaced and muted: it is what Home Assistant calls the
   * value, shown so the mapping is obvious, not something to read as a label. */
  .label-row .raw {
    flex: 0 0 auto;
    min-width: 74px;
    font-family: var(--font-mono);
    font-size: 0.72rem;
    color: var(--text-muted);
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .label-row input {
    flex: 1 1 auto;
    min-width: 0;
    font-size: 0.8rem;
    padding: 5px 8px;
  }

  /* --- Danger zone -------------------------------------------------------
   *
   * Marked red for the whole time a protection is off, not only while it is
   * being changed. The point of the colour is to say what the system is doing
   * now, so it has to stay while that remains true. */
  .danger-zone {
    margin-top: 18px;
  }

  .danger-panel {
    border: 2px solid var(--danger);
    border-radius: var(--r-md);
  }

  .danger-title {
    color: var(--danger);
  }

  .danger-entry {
    padding-top: 12px;
    margin-top: 12px;
    border-top: 1px dashed var(--border);
  }

  .danger-entry:first-of-type {
    border-top: none;
    margin-top: 0;
  }

  .danger-entry-title {
    font-weight: 700;
    font-size: 0.9rem;
    margin-bottom: 8px;
  }

  .guard {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 12px;
    padding: 8px 0;
    border-bottom: 1px dashed var(--border);
  }

  /* Never wraps: "Click again to confirm" is longer than the label it
   * replaces, and a button that changes shape mid-confirmation reads as a
   * different button. */
  .guard > button {
    flex: 0 0 auto;
    white-space: nowrap;
    align-self: center;
  }

  .guard-text {
    display: flex;
    flex-direction: column;
    gap: 2px;
    min-width: 0;
  }

  .guard-label {
    font-weight: 600;
    font-size: 0.85rem;
  }

  /* A protection that is off is the thing worth seeing on this screen. */
  .guard[data-on="0"] .guard-label {
    color: var(--danger);
  }

  /* Sits directly under the switch it is about, indented so it reads as
   * belonging to it rather than to the next one. */
  /* Heading over each block of commands. Cosmetic: the sequence underneath
   * is the one that decides which keyword wins. */
  .group-head {
    margin-top: 14px;
  }

  .btn.move {
    padding: 4px 9px;
    font-size: 0.9rem;
    line-height: 1;
  }

  .btn.move:disabled {
    opacity: 0.35;
    cursor: default;
  }

  .pkc-note {
    margin: -4px 0 8px;
  }

  .note.danger {
    border-left: 3px solid var(--danger);
    padding-left: 10px;
    font-size: 0.82rem;
  }

  .btn.danger {
    border-color: var(--danger);
    color: var(--danger);
    font-weight: 700;
  }

  .modal-backdrop {
    position: fixed;
    inset: 0;
    z-index: 400;
    background: rgba(0, 0, 0, 0.55);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
  }

  .modal {
    max-width: 520px;
    width: 100%;
    max-height: 80vh;
    overflow-y: auto;
    /* Opaque over the page background for the same reason as the entity list:
     * a theme may make a card translucent and this sits over other content. */
    background-color: var(--overlay-base, #ffffff);
    background-image: linear-gradient(var(--surface), var(--surface));
    border-radius: var(--r-lg);
    padding: 20px;
    box-shadow: var(--shadow-md);
  }

  .danger-modal {
    border: 2px solid var(--danger);
  }

  .modal-title {
    font-weight: 700;
    font-size: 1rem;
    color: var(--danger);
    margin-bottom: 10px;
  }

  .modal-body {
    font-size: 0.86rem;
    line-height: 1.45;
    margin-bottom: 10px;
  }

  .modal-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin: 14px 0 6px;
  }

  .sub-error {
    margin-top: 8px;
    font-family: var(--font-mono);
    font-size: 0.72rem;
    color: var(--danger);
    word-break: break-word;
  }

  /* --- Compact cards ----------------------------------------------------
   *
   * The panel card owns a whole view and stretches to it. These two sit in a
   * dashboard column next to unrelated cards, so they take the height their
   * content needs and measure themselves rather than the window: a column can
   * be a quarter of the screen wide on a desktop, which no viewport media
   * query would ever notice. */
  .shell.compact {
    height: auto;
    container-type: inline-size;
  }

  .shell.compact .content {
    padding: 14px;
    overflow: visible;
  }

  .shell.compact .screen-title {
    font-size: 0.95rem;
  }

  /* Tall enough to hold a conversation, short enough to leave room for the
   * cards underneath it. */
  .shell.compact .chat-log {
    max-height: 320px;
  }

  .summary-head {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    gap: 8px;
    margin-bottom: 10px;
  }

  .summary-title {
    font-weight: 700;
    font-size: 0.95rem;
  }

  /* The radio link being down makes every other reading meaningless, so it
   * marks the whole card instead of one row. */
  .summary[data-warn="1"] {
    border-left: 3px solid var(--warn);
    padding-left: 11px;
    margin-left: -14px;
  }

  @container (max-width: 330px) {
    .row {
      flex-direction: column;
      align-items: flex-start;
      gap: 1px;
    }

    .row .v {
      text-align: left;
    }
  }
`;
