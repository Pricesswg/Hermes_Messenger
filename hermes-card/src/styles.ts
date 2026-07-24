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

  .list-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    padding: 10px 12px;
    border: 1px solid var(--border);
    border-radius: var(--r-md);
    background: var(--surface);
    margin-bottom: 8px;
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

  .toast {
    font-size: 0.78rem;
    font-weight: 700;
    color: var(--ok);
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

  .sub-error {
    margin-top: 8px;
    font-family: var(--font-mono);
    font-size: 0.72rem;
    color: var(--danger);
    word-break: break-word;
  }
`;
