import { html, useEffect, useState } from '@/lib/preact';
import { I } from '@/ui/icons';
import { Ring } from '@/ui/primitives';

/* Hop 14: the Dynamic Island carries the case you are waiting for */
export function Island({ c, route, full }) {
  const [open, setOpen] = useState(false);
  useEffect(() => setOpen(false), [route]);
  const s = c.s;
  if (full || s.persona === 'tata') return html`<div class="notch"></div>`;
  const a = s.visit ? { t: 'Zosia, kardiolog', s: '15 grudnia, 10:30 · Prokocim', n: 'za 19 dni', v: .2, r: 'visit-4', ic: 'steth' }
    : { t: 'Dowód rejestracyjny', s: 'W produkcji · odbiór od 2 grudnia', n: '3 z 4', v: .75, r: 'case-meld', ic: 'car' };
  return html`<button class=${'notch island' + (open ? ' open' : '')} aria-label=${'Na żywo: ' + a.t} onClick=${() => { if (open) { setOpen(false); c.go(a.r); } else setOpen(true); }}>
    <span class="is-c"><span class="is-l">${I(a.ic, 13)}</span><span class="is-r"><${Ring} v=${a.v} max=${1} size=${18} w=${2.5} color="#fff"/></span></span>
    <span class="is-x"><span class="is-ic">${I(a.ic, 20)}</span><span class="is-tx"><b>${a.t}</b><span>${a.s}</span></span><span class="is-n">${a.n}</span>
      <span class="is-bar"><i style=${`width:${a.v * 100}%`}></i></span></span></button>`;
}
