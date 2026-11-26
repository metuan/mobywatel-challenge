import { html } from '@/lib/preact';
import { TABOF } from '@/app/routes';
import { TECH } from '@/tech/techData';

/** Explains, step by step, which public systems the current screen relies on. */
export function TechPanel({ route }: { route: string }) {
  const t = TECH[route] || TECH[TABOF(route)] || TECH.today;
  return html`<div class="tech">
    <div class="eyebrow">Jak to działa na tym ekranie</div>
    <h3>${t[0]}</h3>
    <ol class="tsteps">${t[1].map(
      (
        [sys, what, k],
        i,
      ) => html`<li class=${'tstep' + (k === 'a' ? ' ai' : '')}><span class="ts-dot">${k === 'a' ? html`<svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.2 6.3L20.5 10l-6.3 2.2L12 18.5l-2.2-6.3L3.5 10l6.3-1.7z"/></svg>` : i + 1}</span>
      <div class="ts-b"><div class="ts-h"><span class="ts-t">${sys}</span>${k === 'a' && html`<span class="ts-ai">AI</span>`}</div><div class="ts-w">${what}</div></div></li>`,
    )}</ol>
    ${t[1].some(x => x[2] === 'a') && html`<div class="ts-foot"><span class="ts-ai">AI</span> Polski model językowy. Proponuje, ale nic nie wysyła bez Twojego potwierdzenia.</div>`}
  </div>`;
}
