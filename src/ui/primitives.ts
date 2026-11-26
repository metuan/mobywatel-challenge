import { html, useEffect, useRef, useState } from '@/lib/preact';
import { RM } from '@/lib/env';
import { I } from '@/ui/icons';
import { ILL } from '@/ui/illustrations';

export const Sec = ({ t, more, go }) =>
  html`<div class="sec"><h3>${t}</h3>${more && html`<button onClick=${go}>${more}</button>`}</div>`;

export const Row = ({ icon, t, s, right, onClick }) => html`<button class="row" onClick=${onClick}>
  ${icon && html`<span class="ic">${I(icon)}</span>`}
  <span class="tx"><div class="t">${t}</div>${s && html`<div class="s">${s}</div>`}</span>
  ${right !== undefined ? right : html`<span class="chev">${I('chevron', 18)}</span>`}</button>`;

export const Progress = ({ n, of }) =>
  html`<div class="progress" aria-label=${`Krok ${n} z ${of}`}>${Array.from({ length: of }, (_, i) => html`<i class=${(i < n ? 'on' : '') + (i === n - 1 && n > 1 ? ' fresh' : '')}></i>`)}</div>`;

export const Toggle = ({ on, set, label }) =>
  html`<button class="toggle" role="switch" aria-checked=${on} aria-label=${label} onClick=${() => set(!on)}></button>`;

export const Src = ({ t }) => html`<div class="src">${I('check', 12)} Źródło: ${t}</div>`;

const NewTag = () => html`<span class="newtag">Nowe</span>`;

export const Ring = ({ v, max, color = 'var(--ink)', size = 44, w = 3, children }) => {
  const r = (size - w) / 2,
    L = 2 * Math.PI * r,
    p = Math.max(0, Math.min(1, v / max));
  return html`<span class="ring" style=${`width:${size}px;height:${size}px`}><svg width=${size} height=${size}><circle cx=${size / 2} cy=${size / 2} r=${r} stroke="var(--fill-2)" stroke-width=${w} fill="none"/>
    <circle class="ring-p" cx=${size / 2} cy=${size / 2} r=${r} stroke=${color} stroke-width=${w} fill="none" stroke-linecap="round" stroke-dasharray=${L} stroke-dashoffset=${L * (1 - p)} transform=${`rotate(-90 ${size / 2} ${size / 2})`}/></svg><span class="ring-c">${children}</span></span>`;
};

export const Wm = ({ rz = false }) =>
  html`<span class="wm"><i class="flag"></i><span class="m">m</span>Obywatel${rz && html`<span class="rz">Razem</span>`}</span>`;

const AV = [
  ['A', 'Anna'],
  ['T', 'Tomasz'],
  ['Z', 'Zosia'],
  ['S', 'Tata'],
];

export const Av = ({ i, size = 40, dot }) =>
  html`<span class="av" style=${`width:${size}px;height:${size}px;font-size:${Math.round(size * 0.34)}px`}>${i}${dot && html`<i class=${'avd ' + dot}></i>`}</span>`;

export const AvStack = ({ size = 28, list = AV }) =>
  html`<span class="avstack">${list.map(([i]) => html`<${Av} i=${i} size=${size}/>`)}</span>`;

export const Lead = ({ ic }) => html`<span class="lead-i">${I(ic, 20)}</span>`;

export const GRow = ({ ic, av, t, s, v, red, onClick }) => html`<button class="grow" onClick=${onClick}>
  ${ic ? html`<${Lead} ic=${ic}/>` : av ? av : ''}
  <span class="gtx"><span class="gt">${t}</span>${s && html`<span class="gs">${s}</span>`}</span>
  ${v && html`<span class=${'gv' + (red ? ' red' : '')}>${v}</span>`}<span class="gch">${I('chevron', 16)}</span></button>`;

export const Label = ({ t, more, go }) =>
  html`<div class="lbl"><span>${t}</span>${more && html`<button onClick=${go}>${more}${I('chevron', 14)}</button>`}</div>`;

const LINE = { move: 'move', baby: 'baby', car: 'car', coin: 'coin', letter: 'letter', doctor: 'doctor' };

export const Tile = ({ t, s, n, onClick }) =>
  html`<button class="mtile" onClick=${onClick}><span class="mt-ill">${ILL(n, 76)}</span><span class="mt-t">${t}</span><span class="mt-s">${s}</span></button>`;

export const AppIcon = ({ k }) =>
  k === 'rcb'
    ? html`<span class="nicon" style="background:#d42a3e;color:#fff">${I('bell', 15)}</span>`
    : k === 'imgw'
      ? html`<span class="nicon" style="background:#2b6cb0;color:#fff">${I('sun', 15)}</span>`
      : html`<span class="nicon mob"><span class="flag" style="width:16px;height:11px"></span></span>`;

/* Hop 19: the assistant thinks visibly, then answers word by word */
export function Typed({ text, onDone }) {
  const W = text.split(' ');
  const [n, setN] = useState(RM() ? W.length : 0);
  useEffect(() => {
    if (n >= W.length) {
      onDone && onDone();
      return;
    }
    const a = setTimeout(() => setN(n + 2), 38);
    return () => clearTimeout(a);
  }, [n]);
  return html`<span>${W.slice(0, n).map((w, i) => html`<span class="tw8" key=${i}>${w} </span>`)}</span>`;
}

/* M4: digits roll when a number changes (signature counter, badges) */
export function Num({ v, fmtf }) {
  const s = (fmtf || String)(v);
  const prev = useRef(s);
  const old = prev.current;
  prev.current = s;
  return html`<span class="num" aria-label=${s}>${s.split('').map((ch, i) => {
    const ch0 = old[i - (s.length - old.length)];
    const changed = ch0 !== undefined && ch0 !== ch && /\d/.test(ch);
    return html`<span class=${'dg' + (changed ? ' roll' : '')} key=${i + ch}>${ch === ' ' ? ' ' : ch}</span>`;
  })}</span>`;
}
