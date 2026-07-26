import { html, type TemplateResult } from "lit";

import type { ChatMessage, HermesChannel, NodeInfo } from "../types";

export interface ChatCtx {
  /** Thread key to messages, oldest first. */
  chats: Record<string, ChatMessage[]>;
  channels: HermesChannel[];
  nodes: NodeInfo[];
  /** Thread currently open, or null to let the newest one win. */
  thread: string | null;
  draft: string;
  sending: boolean;
  onSelect: (thread: string) => void;
  onDraft: (text: string) => void;
  onSend: () => void;
  onClear: (thread: string) => void;
}

/** Readable name of a thread key: a channel by name, a node by node name. */
function threadLabel(
  thread: string,
  ctx: ChatCtx,
  t: (k: string) => string
): string {
  const [kind, value] = thread.split(":", 2);
  if (kind === "channel") {
    const index = Number(value);
    const known = ctx.channels.find((c) => c.index === index);
    return known ? `${index}: ${known.name}` : `${t("settings.channel")} ${value}`;
  }
  const node = ctx.nodes.find((n) => String(n.node_num) === value);
  return node ? node.name : value;
}

/** Newest activity first, so the conversation in use is at the top. */
function orderedThreads(ctx: ChatCtx): string[] {
  return Object.keys(ctx.chats).sort((a, b) => {
    const last = (key: string) => {
      const messages = ctx.chats[key];
      return messages?.length ? messages[messages.length - 1].ts : "";
    };
    return last(b).localeCompare(last(a));
  });
}

export function renderChat(
  ctx: ChatCtx,
  t: (k: string) => string
): TemplateResult {
  const threads = orderedThreads(ctx);

  if (!threads.length) {
    return html`
      <h2 class="screen-title">${t("tab.chat")}</h2>
      <div class="empty">${t("chat.empty")}</div>
    `;
  }

  const active = ctx.thread && ctx.chats[ctx.thread] ? ctx.thread : threads[0];
  const messages = ctx.chats[active] ?? [];

  return html`
    <h2 class="screen-title">${t("tab.chat")}</h2>

    <div class="chips" style="margin-bottom:12px">
      ${threads.map(
        (thread) => html`
          <button
            class="chip"
            data-on=${thread === active ? "1" : "0"}
            @click=${() => ctx.onSelect(thread)}
          >
            ${threadLabel(thread, ctx, t)}
          </button>
        `
      )}
    </div>

    <div class="chat-log">
      ${messages.map(
        (message) => html`
          <div class="bubble ${message.outgoing ? "out" : "in"}">
            ${!message.outgoing
              ? html`<div class="who">
                  ${message.name || message.node || t("devices.unknown")}
                </div>`
              : ""}
            <div class="text">${message.text}</div>
            <div class="when">
              ${message.ts ? new Date(message.ts).toLocaleString() : ""}
            </div>
          </div>
        `
      )}
    </div>

    <div class="chat-send">
      <input
        .value=${ctx.draft}
        placeholder=${t("chat.placeholder")}
        @input=${(e: Event) => ctx.onDraft((e.target as HTMLInputElement).value)}
        @keydown=${(e: KeyboardEvent) => {
          if (e.key === "Enter" && ctx.draft.trim()) ctx.onSend();
        }}
      />
      <button
        class="btn primary"
        ?disabled=${!ctx.draft.trim() || ctx.sending}
        @click=${ctx.onSend}
      >
        ${ctx.sending ? t("common.loading") : t("chat.send")}
      </button>
    </div>

    <div class="actions">
      <button class="btn danger" @click=${() => ctx.onClear(active)}>
        ${t("chat.clear")}
      </button>
    </div>

    <div class="hint">${t("chat.note")}</div>
  `;
}
