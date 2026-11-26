import type { PointerEvent as ReactPointerEvent } from 'react';
import { sx } from '@/lib/sx';
import { useEffect, useRef, useState } from 'react';
import { buzz, fire, reducedMotion } from '@/lib/env';
import { coachTip } from '@/story/coach';
import { I } from '@/ui/icons';

/* Zbliż telefony: two phones meet top to top, a ripple of light passes, one haptic click */
export function TapShare({
  them,
  sub,
  label = 'Zbliż telefony',
  done,
  onDone,
}: {
  them: string;
  sub?: string;
  label?: string;
  done?: boolean;
  onDone?: () => void;
}) {
  const [st, setSt] = useState(done ? 2 : 0);
  useEffect(() => {
    if (st !== 1) return;
    const a = setTimeout(() => buzz(18), reducedMotion() ? 0 : 640);
    const b = setTimeout(
      () => {
        setSt(2);
        fire();
        onDone && onDone();
      },
      reducedMotion() ? 200 : 1900,
    );
    return () => {
      clearTimeout(a);
      clearTimeout(b);
    };
  }, [st]);
  return (
    <div className={'tap8 s' + st}>
      <div className="tap-scene" aria-hidden="true">
        <div className="tp tp-them">
          <span className="tp-isl"></span>
          <span className="tp-n">{them}</span>
        </div>
        <div className="tp-wave">
          <i></i>
          <i></i>
          <i></i>
        </div>
        <div className="tp tp-me">
          <span className="tp-isl"></span>
          <span className="tp-n">Anna</span>
        </div>
      </div>
      <div className="tap-cap">
        {st === 0 ? sub : st === 1 ? 'Łączenie…' : 'Gotowe. Telefony się rozpoznały.'}
      </div>
      {st === 0 && (
        <div className="actions">
          <button className="btn" onClick={() => setSt(1)}>
            {label}
          </button>
        </div>
      )}
    </div>
  );
}

/* 1. One confirmation loader for the whole app: a face scan that draws, steps that tick, then a check */
export function Confirming({ steps }: { steps?: string[] }) {
  const S = steps || ['Potwierdzam, że to Ty', 'Podpisuję', 'Wysyłam'];
  const [k, setK] = useState(reducedMotion() ? S.length : 0);
  useEffect(() => {
    coachTip(null);
    document.querySelectorAll('.coach').forEach(e => e.classList.remove('coach'));
    if (k >= S.length) return;
    const a = setTimeout(() => setK(k + 1), k ? 420 : 520);
    return () => clearTimeout(a);
  }, [k]);
  const done = k >= S.length;
  return (
    <div className={'conf8' + (done ? ' done' : '')} role="status" aria-live="polite">
      <div className="cf-art">
        <svg
          viewBox="0 0 64 64"
          width="64"
          height="64"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path
            className="cf-br"
            d="M6 20V12a6 6 0 0 1 6-6h8M44 6h8a6 6 0 0 1 6 6v8M58 44v8a6 6 0 0 1-6 6h-8M20 58h-8a6 6 0 0 1-6-6v-8"
          />
          <g className="cf-face">
            <path d="M23 25v4M41 25v4M32 26v9h-3M25 42c4 4 10 4 14 0" />
          </g>
          <path className="cf-ok" d="M20 33l8 8 16-17" />
        </svg>
        <i className="cf-scan"></i>
      </div>
      <div className="cf-steps">
        {S.map((t, i) => (
          <div className={'cf-s' + (i < k ? ' ok' : i === k ? ' now' : '')}>
            <span className="cf-dot">{i < k ? I('check', 12) : ''}</span>
            {t}
          </div>
        ))}
      </div>
    </div>
  );
}

export const OUT = 'cubic-bezier(.23,1,.32,1)',
  DRAWER = 'cubic-bezier(.32,.72,0,1)';

/* M2: removed rows collapse instead of vanishing, so the list does not jump */
export function collapseOut(el: HTMLElement | null, done: () => void) {
  if (!el || reducedMotion()) {
    done();
    return;
  }
  const h = el.offsetHeight;
  el.style.overflow = 'hidden';
  el.animate(
    [
      { height: h + 'px', opacity: 1 },
      {
        height: '0px',
        opacity: 0,
        marginTop: '0px',
        marginBottom: '0px',
        paddingTop: '0px',
        paddingBottom: '0px',
      },
    ],
    { duration: 220, easing: OUT, fill: 'forwards' },
  );
  setTimeout(done, 210);
}

/** Swipe a list row left to dismiss it. */
export function swipeRow(e: ReactPointerEvent<HTMLElement>, onDone: () => void) {
  const el = e.currentTarget as HTMLElement,
    x0 = e.clientX;
  let dx = 0,
    on = false;
  const mv = (ev: PointerEvent) => {
    const d = ev.clientX - x0;
    if (!on) {
      if (Math.abs(d) < 8) return;
      on = true;
      el.setPointerCapture(e.pointerId);
      el.classList.add('drag');
    }
    dx = Math.min(0, d);
    el.style.transform = `translateX(${dx}px)`;
    el.parentElement?.style.setProperty('--sw', String(Math.min(1, -dx / 120)));
  };
  const up = () => {
    el.removeEventListener('pointermove', mv);
    el.removeEventListener('pointerup', up);
    el.removeEventListener('pointercancel', up);
    if (!on) return;
    el.classList.remove('drag');
    if (dx < -110) {
      el.style.transform = 'translateX(-110%)';
      setTimeout(() => collapseOut(el.parentElement, onDone), 160);
    } else {
      el.style.transform = '';
      el.parentElement?.style.setProperty('--sw', '0');
    }
    el.dataset.swiped = '1';
    setTimeout(() => delete el.dataset.swiped, 50);
  };
  el.addEventListener('pointermove', mv);
  el.addEventListener('pointerup', up);
  el.addEventListener('pointercancel', up);
}

/* M6: hold to confirm a destructive, all-at-once action */
export function HoldBtn({
  label,
  holdLabel,
  ms = 1200,
  onDone,
  onTap,
}: {
  label: string;
  holdLabel: string;
  ms?: number;
  onDone: () => void;
  onTap: () => void;
}) {
  const [p, setP] = useState(0);
  const raf = useRef(0),
    held = useRef(false);
  const start = (e: ReactPointerEvent<HTMLElement>) => {
    if (e.button > 0) return;
    held.current = false;
    const t0 = performance.now();
    const tick = (now: number) => {
      const k = Math.min(1, (now - t0) / ms);
      setP(k);
      if (k >= 1) {
        held.current = true;
        buzz(20);
        onDone();
        return;
      }
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
  };
  const stop = () => {
    cancelAnimationFrame(raf.current);
    if (!held.current && p > 0) setP(0);
  };
  return (
    <button
      className={'btn red hold8' + (p > 0 && p < 1 ? ' holding' : '')}
      style={sx(`--p:${p}`)}
      onPointerDown={start}
      onPointerUp={stop}
      onPointerLeave={stop}
      onPointerCancel={stop}
      onClick={e => {
        if (e.detail === 0) onTap();
        else if (!held.current && p === 0) onTap();
      }}
    >
      <span className="hold-l">{p > 0 && p < 1 ? holdLabel : label}</span>
      <span className="hold-fill" aria-hidden="true">
        {p > 0 && p < 1 ? holdLabel : label}
      </span>
    </button>
  );
}
