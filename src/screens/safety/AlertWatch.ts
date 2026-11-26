import { html, useEffect, useLayoutEffect, useRef, useState } from '@/lib/preact';
import { buzz, fire, rmo } from '@/lib/env';
import { I } from '@/ui/icons';

const LEGS = [
  { a: 0, d: 240, t: 'Prosto ulicą Długą' },
  { a: 90, d: 140, t: 'W prawo w Dekerta', taps: 3, side: 'r' },
  { a: -90, d: 40, t: 'W lewo, do bramy nr 24', taps: 2, side: 'l' },
  { end: true }
];

export function AlertWatch(c) {
  const [k, setK] = useState(0);
  const [dist, setDist] = useState(240);
  const [ping, setPing] = useState(0);
  const face = useRef(null), root = useRef(null);
  /* shared-element morph from the red shelter card */
  useLayoutEffect(() => {
    const f = face.current, from = window.__morph; window.__morph = null;
    if (!f || !from || rmo()) return;
    const ph = document.querySelector('.phone'); const pr = ph.getBoundingClientRect(); const sx = pr.width / ph.offsetWidth || 1;
    const to = f.getBoundingClientRect();
    const dx = ((from.left + from.width / 2) - (to.left + to.width / 2)) / sx, dy = ((from.top + from.height / 2) - (to.top + to.height / 2)) / sx;
    f.animate([{ transform: `translate(${dx}px,${dy}px) scale(${from.width / to.width},${from.height / to.height})`, borderRadius: '18px', background: '#fff' }, { transform: 'none', borderRadius: '50%', background: '#050608' }], { duration: 620, easing: 'cubic-bezier(.32,.72,0,1)' });
  }, []);
  useEffect(() => {
    if (k >= LEGS.length - 1) return;
    const leg = LEGS[k];
    if (leg.taps) { setPing(p => p + 1); buzz(Array.from({ length: leg.taps * 2 - 1 }, (_, i) => i % 2 ? 90 : 45)); }
    const end = LEGS[k + 1].d || 0;
    const tick = setInterval(() => setDist(d => Math.max(end, d - 5)), 2300 / Math.max(1, (leg.d - end) / 5));
    const nx = setTimeout(() => { setK(k + 1); if (k + 1 === LEGS.length - 1) { setDist(0); buzz([60, 60, 200]); fire(); } }, k === 0 ? 2600 : 2400);
    return () => { clearInterval(tick); clearTimeout(nx); };
  }, [k]);
  const leg = LEGS[k], arrived = !!leg.end;
  const prog = arrived ? 1 : 1 - dist / 240;
  const C = 2 * Math.PI * 104;
  const open = () => {
    const f = face.current;
    if (!f || rmo()) { c.go('alert-guide'); return; }
    root.current && root.current.classList.add('leaving');
    f.animate([{ transform: 'none', borderRadius: '50%' }, { transform: 'scale(4.2)', borderRadius: '30%' }], { duration: 420, easing: 'cubic-bezier(.32,.72,0,1)', fill: 'forwards' });
    setTimeout(() => c.go('alert-guide'), 360);
  };
  return html`<div class="wt8" ref=${root} role="region" aria-label="Zegarek prowadzi do schronienia">
    <div class="wt-cap"><span class="wt-pocket">${I('phone', 16)}</span>Telefon w kieszeni. Prowadzi zegarek.</div>
    <div class="wt-stage">
      <div class="wt-strap top"></div><div class="wt-strap bot"></div>
      <div class="wt-case"><span class="wt-crown"></span>
        <div class="wt-face" ref=${face}>
          <svg class="wt-ring" viewBox="0 0 220 220" aria-hidden="true"><circle cx="110" cy="110" r="104" stroke="rgba(255,255,255,.1)" stroke-width="7" fill="none"/>
            <circle cx="110" cy="110" r="104" stroke="#E0263F" stroke-width="7" fill="none" stroke-linecap="round" stroke-dasharray=${C} stroke-dashoffset=${C * (1 - prog)} transform="rotate(-90 110 110)" class="wt-prog"/></svg>
          ${arrived ? html`<div class="wt-in done"><span class="wt-ok">${I('check', 40)}</span><b>Jesteś w schronie</b><small>Dekerta 24 · poziom -1</small></div>`
            : html`<div class="wt-in"><span class="wt-arrow" style=${`transform:rotate(${leg.a}deg)`}><svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20V5M5.5 11.5 12 5l6.5 6.5"/></svg></span>
              <b class="wt-d">${dist} m</b><small>${leg.t}</small></div>`}
        </div>
      </div>
      ${leg.taps && html`<div key=${ping} class=${'wt-hap ' + leg.side}><i></i><i></i><span>${Array.from({ length: leg.taps }, () => 'stuk').join(' · ')}</span></div>`}
    </div>
    <div class="wt-legend">${arrived ? 'Zegarek stuknął trzy razy długo: jesteś na miejscu.' : 'Dwa stuknięcia: w lewo. Trzy: w prawo. Bez patrzenia na ekran.'}</div>
    <div style="flex:1"></div>
    ${arrived && html`<div class="actions"><button class="btn" onClick=${open}>Otwórz w telefonie</button></div>`}
  </div>`;
}
