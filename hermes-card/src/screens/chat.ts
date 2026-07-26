import { html, type TemplateResult } from "lit";

import type { ChatMessage, HermesChannel, NodeInfo } from "../types";

export interface ChatCtx {
  /** Thread key to messages, oldest first. */
  chats: Record<string, ChatMessage[]>;
  channels: HermesChannel[];
  nodes: NodeInfo[];
  /** Thread currently open, or null to let the first one win. */
  thread: string | null;
  draft: string;
  sending: boolean;
  onSelect: (thread: string) => void;
  onDraft: (text: string) => void;
  onSend: () => void;
  onClear: (thread: string) => void;
}

/** Timestamp of the last message in a thread, empty when it has none. */
function lastActivity(ctx: ChatCtx, thread: string): string {
  const messages = ctx.chats[thread];
  return messages?.length ? messages[messages.length - 1].ts : "";
}

/**
 * Every channel on the radio, whether or not anyone has spoken on it.
 *
 * Listing only threads that already hold messages meant a quiet channel could
 * not be selected, and therefore could not be written to at all: the one case
 * where you most want to start a conversation is the one where none exists yet.
 */
function channelThreads(ctx: ChatCtx): string[] {
  const known = ctx.channels.map((channel) => `channel:${channel.index}`);
  const seen = Object.keys(ctx.chats).filter((key) => key.startsWith("channel:"));
  return [...new Set([...known, ...seen])].sort(
    (a, b) => Number(a.split(":")[1]) - Number(b.split(":")[1])
  );
}

/** Node conversations, most recently active first. */
function nodeThreads(ctx: ChatCtx): string[] {
  return Object.keys(ctx.chats)
    .filter((key) => key.startsWith("node:"))
    .sort((a, b) => lastActivity(ctx, b).localeCompare(lastActivity(ctx, a)));
}

function channelLabel(
  thread: string,
  ctx: ChatCtx,
  t: (k: string) => string
): string {
  const index = Number(thread.split(":")[1]);
  const known = ctx.channels.find((c) => c.index === index);
  return known ? `${index}: ${known.name}` : `${t("settings.channel")} ${index}`;
}

function nodeLabel(thread: string, ctx: ChatCtx): string {
  const value = thread.split(":")[1];
  const node = ctx.nodes.find((n) => String(n.node_num) === value);
  return node ? node.name : value;
}

function chip(
  ctx: ChatCtx,
  thread: string,
  active: string,
  label: string
): TemplateResult {
  const count = ctx.chats[thread]?.length ?? 0;
  return html`
    <button
      class="chip"
      data-on=${thread === active ? "1" : "0"}
      @click=${() => ctx.onSelect(thread)}
    >
      ${label}${count ? html`<span class="count">${count}</span>` : ""}
    </button>
  `;
}

export function renderChat(
  ctx: ChatCtx,
  t: (k: string) => string
): TemplateResult {
  const channels = channelThreads(ctx);
  const nodes = nodeThreads(ctx);
  const all = [...channels, ...nodes];

  if (!all.length) {
    return html`
      <h2 class="screen-title">${t("tab.chat")}</h2>
      <div class="empty">${t("chat.noChannels")}</div>
    `;
  }

  const active = ctx.thread && all.includes(ctx.thread) ? ctx.thread : all[0];
  const messages = ctx.chats[active] ?? [];
  const isChannel = active.startsWith("channel:");

  return html`
    <h2 class="screen-title">${t("tab.chat")}</h2>

    <div class="section-title">${t("chat.channels")}</div>
    <div class="chips" style="margin-bottom:10px">
      ${channels.map((thread) =>
        chip(ctx, thread, active, channelLabel(thread, ctx, t))
      )}
    </div>

    ${nodes.length
      ? html`
          <div class="section-title">${t("chat.direct")}</div>
          <div class="chips" style="margin-bottom:12px">
            ${nodes.map((thread) =>
              chip(ctx, thread, active, nodeLabel(thread, ctx))
            )}
          </div>
        `
      : ""}

    <div class="chat-log">
      ${messages.length
        ? messages.map(
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
          )
        : html`<div class="hint">${t("chat.emptyThread")}</div>`}
    </div>

    <div class="chat-send">
      <input
        .value=${ctx.draft}
        placeholder=${isChannel
          ? `${t("chat.sendOn")} ${channelLabel(active, ctx, t)}`
          : `${t("chat.sendTo")} ${nodeLabel(active, ctx)}`}
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

    ${messages.length
      ? html`
          <div class="actions">
            <button class="btn danger" @click=${() => ctx.onClear(active)}>
              ${t("chat.clear")}
            </button>
          </div>
        `
      : ""}

    <div class="hint">${t("chat.note")}</div>
  `;
}
