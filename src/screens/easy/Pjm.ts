import { html, useState } from '@/lib/preact';
import { I } from '@/ui/icons';
import { Toggle } from '@/ui/primitives';

/* 10: Tłumacz PJM */
export function Pjm(c) {
  const [on, setOn] = useState(false);
  return html`<div>
    <h1 class="h-l">Tłumacz polskiego języka migowego</h1>
    <p class="lead">Na każdym ekranie przycisk „PJM”. Łączy z tłumaczem na wideo, w dni robocze 8–20.</p>
    <div class="video">
      <svg viewBox="0 0 320 200" width="100%" aria-hidden="true"><rect width="320" height="200" fill="#2c2f36"/><circle cx="160" cy="78" r="28" fill="#e8c9a8"/><path d="M104 200c4-48 28-70 56-70s52 22 56 70z" fill="#22408f"/>
        <g class=${on ? 'sign' : ''}><path d="M110 150c-8-24-2-44 10-50" stroke="#e8c9a8" stroke-width="14" stroke-linecap="round" fill="none"/><path d="M212 150c10-20 16-44 2-58" stroke="#e8c9a8" stroke-width="14" stroke-linecap="round" fill="none"/></g></svg>
      <div class="vlabel">${on ? html`<span class="lv-dot"></span> Tłumaczka Marta · połączono` : 'Kamera wyłączona'}</div>
    </div>
    <div class="actions">${on ? html`<button class="btn" style="background:#ff3b30" onClick=${() => setOn(false)}>Zakończ</button>` : html`<button class="btn" onClick=${() => setOn(true)}>${I('camera', 18)} Połącz z tłumaczem</button>`}</div>
    <div class="list" style="margin-top:14px">
      <div class="row"><span class="tx"><div class="t">Przycisk PJM na każdym ekranie</div></span><${Toggle} on=${!!c.s.pjm} label="Przycisk PJM" set=${v => c.set({ pjm: v })}/></div>
      <div class="row"><span class="tx"><div class="t">Napisy do komunikatów głosowych</div></span><${Toggle} on=${true} label="Napisy" set=${() => {}}/></div>
    </div>
  </div>`;
}
