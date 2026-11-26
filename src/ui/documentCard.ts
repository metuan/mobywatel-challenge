import { html, useEffect, useRef, useState } from '@/lib/preact';
import { useClock } from '@/ui/hooks';
import type { Ctx } from '@/types';

export function QR() {
  const cells = [];
  let seed = 7;
  for (let y = 0; y < 21; y++)
    for (let x = 0; x < 21; x++) {
      seed = (seed * 9301 + 49297) % 233280;
      const finder = (x < 7 && y < 7) || (x > 13 && y < 7) || (x < 7 && y > 13);
      const on = finder
        ? x % 14 === 0 ||
          x % 14 === 6 ||
          y % 14 === 0 ||
          y % 14 === 6 ||
          (x % 14 > 1 && x % 14 < 5 && y % 14 > 1 && y % 14 < 5)
        : seed / 233280 > 0.52;
      if (on) cells.push(html`<rect x=${x} y=${y} width="1" height="1"/>`);
    }
  return html`<svg viewBox="0 0 21 21" width="100%" height="100%" fill="#101317" role="img" aria-label="Kod QR (przykład)">${cells}</svg>`;
}

const QRCode = ({ size = 132 }) => {
  const n = 25,
    cells = [];
  let seed = 7;
  const rnd = () => (seed = (seed * 9301 + 49297) % 233280) / 233280;
  const finder = (x: number, y: number) => (x < 7 && y < 7) || (x >= n - 7 && y < 7) || (x < 7 && y >= n - 7);
  for (let y = 0; y < n; y++)
    for (let x = 0; x < n; x++)
      if (!finder(x, y) && rnd() > 0.52) cells.push(html`<rect x=${x} y=${y} width="1" height="1"/>`);
  const F = (x: number, y: number) =>
    html`<g><rect x=${x} y=${y} width="7" height="7" rx="1.6"/><rect x=${x + 1} y=${y + 1} width="5" height="5" rx="1" fill="#fff"/><rect x=${x + 2} y=${y + 2} width="3" height="3" rx=".6"/></g>`;
  return html`<svg width=${size} height=${size} viewBox=${`-1 -1 ${n + 2} ${n + 2}`} fill="#0B0D12" shape-rendering="crispEdges">${cells}${F(0, 0)}${F(n - 7, 0)}${F(0, n - 7)}</svg>`;
};

const Photo = () =>
  html`<span class="dphoto"><svg viewBox="0 0 56 72" width="56" height="72"><rect width="56" height="72" fill="#2A3242"/><circle cx="28" cy="28" r="12" fill="#596274"/><path d="M6 72c2-15 11-22 22-22s20 7 22 22z" fill="#596274"/></svg></span>`;

export const ROSETTE = html`<svg class="rosette" viewBox="-100 -100 200 200" aria-hidden="true">${Array.from({ length: 36 }, (_, i) => html`<ellipse rx="92" ry="34" transform=${`rotate(${i * 5})`}/>`)}</svg>`;

const Holo = () => html`<span class="holo" aria-hidden="true"></span>`;

export function DocCard({
  c,
  tone = 'id',
  interactive = true,
}: {
  c?: Ctx;
  tone?: string;
  interactive?: boolean;
}) {
  const [flip, setFlip] = useState(false);
  const [left, setLeft] = useState(179);
  const clock = useClock();
  const ref = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!flip) return;
    setLeft(179);
    const i = setInterval(() => setLeft(x => Math.max(0, x - 1)), 1000);
    return () => clearInterval(i);
  }, [flip]);
  const move = (e: PointerEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    el.style.setProperty('--sx', (100 - x * 100).toFixed(1) + '%');
    el.style.setProperty('--rx', ((x - 0.5) * 6).toFixed(2) + 'deg');
  };
  const leave = () => {
    const el = ref.current;
    if (el) {
      el.style.removeProperty('--rx');
    }
  };
  return html`<div class=${'flipwrap' + (flip ? ' flipped' : '')}>
    <button class=${'doc tone-' + tone} ref=${ref} onPointerMove=${interactive ? move : null} onPointerLeave=${leave} onClick=${() => interactive && setFlip(true)} aria-label="Dowód osobisty, dotknij aby pokazać kod QR">${ROSETTE}
      <div class="d-top"><span class="d-rp"><i class="flag"></i>Rzeczpospolita Polska</span><span class="d-kind">Dowód osobisty</span></div>
      <div class="d-mid"><${Photo}/><${Holo}/><div class="d-who"><div class="d-name">Anna Nowicka</div>
        <div class="d-f"><div><span>Data urodzenia</span><b>14.03.1992</b></div><div><span>Ważny do</span><b>12.05.2031</b></div></div></div></div>
      <div class="d-bot"><span class="d-chip">mDowód</span><span class="d-live"><i></i>${clock}</span></div>
    </button>
    <div class="doc doc-back tone-${tone}" role="button" tabindex="0" onClick=${() => setFlip(false)}>
      <div class="qrbox"><${QRCode} size=${118}/></div>
      <div class="qr-tx"><div class="d-name" style="font-size:17px">Pokaż kod do zeskanowania</div><div class="qr-s">Kod ważny ${Math.floor(left / 60)}:${String(left % 60).padStart(2, '0')}. Zobaczysz, kto sprawdza, zanim pokażesz dane.</div>
        <span class="d-chip" style="margin-top:12px">Dotknij, aby wrócić</span></div>
    </div>
  </div>`;
}
