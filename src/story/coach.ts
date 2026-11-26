import { BEATS, beatOf } from '@/story/chapters';

/* coach mark: highlight what to tap on the current beat */
const COACHED = new WeakSet(), USED = new Set();

/* apply once per frame and only on a real change, so the tip never blinks when coach() re-runs */
let readyWant = false, readyRaf = 0;

const setReady = v => { readyWant = v; cancelAnimationFrame(readyRaf); readyRaf = requestAnimationFrame(() => document.querySelectorAll('.st-next, .ms-next').forEach(e => { if (e.classList.contains('ready') !== readyWant) e.classList.toggle('ready', readyWant); })); };

let tipRaf = 0;

export function coachTip(ph, el) {
  cancelAnimationFrame(tipRaf);
  document.querySelectorAll('.coach-tip').forEach(t => t.remove());
  if (!ph || !el) return;
  const tip = document.createElement('div'); tip.className = 'coach-tip'; tip.setAttribute('aria-hidden', 'true');
  tip.innerHTML = '<span>Dotknij tutaj</span>'; ph.appendChild(tip);
  const tick = () => {
    if (!el.isConnected || !el.classList.contains('coach')) { tip.remove(); return; }
    const z = parseFloat(getComputedStyle(ph).zoom) || 1;
    const pr = ph.getBoundingClientRect(), r = el.getBoundingClientRect();
    const sx = pr.width / ph.offsetWidth || 1;
    const x = (r.left + r.width / 2 - pr.left) / sx, top = (r.top - pr.top) / sx, bot = (r.bottom - pr.top) / sx;
    const below = top < 56;
    tip.classList.toggle('below', below);
    const sp = tip.firstChild, w = sp.offsetWidth || 110, W = ph.offsetWidth, m = 10;
    const cx = Math.min(Math.max(x, w / 2 + m), W - w / 2 - m);
    tip.style.setProperty('--dx', Math.round(cx - x) + 'px');
    tip.style.transform = `translate(${Math.round(x)}px, ${Math.round(below ? bot + 12 : top - 12)}px)`;
    const vis = bot > 40 && top < ph.offsetHeight - 40;
    tip.style.opacity = vis ? '' : '0';
    tipRaf = requestAnimationFrame(tick);
  };
  tick();
}

let coachTimers = [];

export function coach(i, route, retry) {
  if (!retry) { coachTimers.forEach(clearTimeout); coachTimers = []; }
  document.querySelectorAll('.coach').forEach(e => e.classList.remove('coach')); coachTip(null);
  setReady(false);
  const b = (BEATS[i] || []).find(x => x[0] === route);
  if (!b || !b[2]) { if (b && beatOf(i, route) === BEATS[i].length - 1) setReady(true); return false; }
  const ph = document.querySelector('.phone'); if (!ph) return false;
  const ok = x => x && !x.closest('.mstory,.story,.sheet-bg,.tabbar') && !COACHED.has(x) && !x.disabled && x.offsetParent !== null;
  const find = sel => {
    if (!sel) return null;
    if (sel[0] === '~') return [...ph.querySelectorAll('button,a,[role=button],.link')].find(x => ok(x) && x.textContent.includes(sel.slice(1)));
    return [...ph.querySelectorAll(sel)].find(ok);
  };
  const sheetBtn = [...ph.querySelectorAll('.sheet-bg .actions .btn:not(.soft)')].find(x => x.offsetParent !== null && !COACHED.has(x));
  if (sheetBtn) { sheetBtn.classList.add('coach'); coachTip(ph, sheetBtn); const offS = () => { ph.removeEventListener('pointerdown', offS, true); sheetBtn.classList.remove('coach'); coachTip(null); }; ph.addEventListener('pointerdown', offS, true); return true; }
  if (ph.querySelector('.sheet-bg')) return false; /* a sheet is open with nothing to tap: never point behind it */
  const sels = (Array.isArray(b[3]) ? b[3] : [b[3]]).filter(Boolean);
  let el = null, used = null;
  for (let k = 0; k < sels.length && !el; k++) {
    if (k < sels.length - 1 && USED.has(route + '|' + sels[k])) continue;
    el = find(sels[k]); used = sels[k];
  }
  if (!el && !sels.length) { el = find('.btn:not(.soft):not(.ghost)') || find('.scroll button'); used = null; }
  if (!el) { if (beatOf(i, route) === BEATS[i].length - 1) setReady(true); return false; }
  el.classList.add('coach');
  try { el.scrollIntoView({ block: 'center', behavior: 'smooth' }); } catch (e) {}
  coachTip(ph, el);
  const off = ev => {
    ph.removeEventListener('pointerdown', off, true);
    el.classList.remove('coach'); coachTip(null);
    if (el.contains(ev.target)) { COACHED.add(el); if (used) USED.add(route + '|' + used); }
    const still = () => (location.hash.slice(1).split('?')[0] || 'today') === route && !document.querySelector('.phone .coach');
    coachTimers = [700, 1200, 1800, 2600, 3600, 5000].map(ms => setTimeout(() => { if (still()) coach(i, route, true); }, ms));
  };
  ph.addEventListener('pointerdown', off, true);
  return true;
}
