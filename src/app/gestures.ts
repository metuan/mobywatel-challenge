import { reducedMotion } from '@/lib/env';

/* Hop 16: swipe from the left edge to go back, like every iOS app */
export function edgeBack(e: PointerEvent, back: () => void) {
  const sc = e.currentTarget as HTMLElement,
    r = sc.getBoundingClientRect();
  if (e.button > 0 || e.clientX - r.left > 22) return;
  const scr = sc.querySelector<HTMLElement>('.screen');
  if (!scr) return;
  const x0 = e.clientX;
  let dx = 0,
    on = false;
  const W = r.width;
  const mv = (ev: PointerEvent) => {
    const d = ev.clientX - x0;
    if (!on) {
      if (d < 8) return;
      on = true;
      sc.setPointerCapture(e.pointerId);
      scr.style.transition = 'none';
      sc.classList.add('edge');
    }
    dx = Math.max(0, d);
    scr.style.transform = `translateX(${dx}px)`;
    scr.style.boxShadow = '-12px 0 30px -12px rgba(0,0,0,.25)';
  };
  const up = () => {
    sc.removeEventListener('pointermove', mv);
    sc.removeEventListener('pointerup', up);
    sc.removeEventListener('pointercancel', up);
    if (!on) return;
    sc.classList.remove('edge');
    if (dx > W * 0.33) {
      scr.animate([{ transform: `translateX(${dx}px)` }, { transform: `translateX(${W}px)` }], {
        duration: 180,
        easing: 'cubic-bezier(.32,.72,0,1)',
        fill: 'forwards',
      });
      setTimeout(back, 170);
    } else {
      scr.animate([{ transform: `translateX(${dx}px)` }, { transform: 'none' }], {
        duration: 260,
        easing: 'cubic-bezier(.32,.72,0,1)',
      });
      scr.style.transform = '';
      scr.style.boxShadow = '';
    }
  };
  sc.addEventListener('pointermove', mv);
  sc.addEventListener('pointerup', up);
  sc.addEventListener('pointercancel', up);
}

const EASE_DRAWER = 'cubic-bezier(.32,.72,0,1)';

/** Animate a sheet or dialog out, then run `done`. */
export function leave(card: Element | null, bg: Element | null, to: string, ms: number, done: () => void) {
  if (!card || reducedMotion()) {
    done();
    return;
  }
  const from = getComputedStyle(card).transform;
  card.animate(
    [
      { transform: from === 'none' ? 'none' : from, opacity: 1 },
      { transform: to, opacity: to.includes('100%') ? 1 : 0 },
    ],
    { duration: ms, easing: EASE_DRAWER, fill: 'forwards' },
  );
  bg && bg.animate([{ opacity: 1 }, { opacity: 0 }], { duration: ms, easing: 'ease-out', fill: 'forwards' });
  setTimeout(done, ms - 10);
}

/** Rubber-band resistance when a sheet is dragged past its edge. */
const rubber = (x: number, d = 300, c = 0.55) => (x * d * c) / (d + c * Math.abs(x));

/** Drag a sheet down to dismiss it, with velocity projection like iOS. */
export function sheetDrag(e: PointerEvent, close: () => void) {
  const s = e.currentTarget as HTMLElement;
  if (e.button > 0 || (e.target as Element).closest('button,input,a,label,.doc') || s.scrollTop > 0) return;
  const y0 = e.clientY;
  let dy = 0,
    on = false;
  const hist: [number, number][] = [[e.timeStamp, 0]];
  const mv = (ev: PointerEvent) => {
    const d = ev.clientY - y0;
    if (!on) {
      if (Math.abs(d) < 10) return;
      on = true;
      s.setPointerCapture(e.pointerId);
      s.style.transition = 'none';
    }
    dy = d > 0 ? d : -rubber(-d, 200);
    s.style.transform = `translateY(${dy}px)`;
    hist.push([ev.timeStamp, dy]);
    if (hist.length > 5) hist.shift();
  };
  const up = () => {
    s.removeEventListener('pointermove', mv);
    s.removeEventListener('pointerup', up);
    s.removeEventListener('pointercancel', up);
    if (!on) return;
    const [t0, p0] = hist[0],
      [t1, p1] = hist[hist.length - 1];
    const v = (p1 - p0) / Math.max(1, t1 - t0); /* px per ms */
    const projected = dy + (v * 1000 * 0.998) / (1 - 0.998) / 1000;
    if (dy > 0 && (v > 0.11 || projected > s.offsetHeight * 0.4)) close();
    else {
      s.animate([{ transform: `translateY(${dy}px)` }, { transform: 'none' }], {
        duration: 320,
        easing: EASE_DRAWER,
      });
      s.style.transform = '';
    }
  };
  s.addEventListener('pointermove', mv);
  s.addEventListener('pointerup', up);
  s.addEventListener('pointercancel', up);
}
