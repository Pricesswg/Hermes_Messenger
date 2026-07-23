import { html, type TemplateResult } from "lit";

/** Shared stub for screens that arrive in a later build phase. */
export function renderPlaceholder(
  title: string,
  phase: number,
  t: (k: string) => string
): TemplateResult {
  return html`
    <h2 class="screen-title">${title}</h2>
    <div class="empty">
      <div class="badge">${t("common.phase")} ${phase}</div>
      <p>${t("common.comingSoon")}</p>
    </div>
  `;
}
