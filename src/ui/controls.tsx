import type { CSSProperties } from 'react';
import { Actions, Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { PointerEvent as ReactPointerEvent } from 'react';
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
    <div className={'mt-4.5 [.ice-h_&]:text-[14px] [.ice-h_&]:text-ink-2 [.hw-col_i&]:w-[60%]' + st}>
      <div
        className="relative h-52.5 rounded-3xl bg-ink overflow-hidden flex flex-col items-center justify-between p-0"
        aria-hidden="true"
      >
        <div className="absolute left-[50%] h-37.5 rounded-[26px] [background:#1a1d24] [box-shadow:inset_0_0_0_1.5px_#2e323c] [transition:transform_0.6s_cubic-bezier(0.32,_0.72,_0,_1)] w-37.5 -ml-18.75 tp-them -top-23 transform-none [.s2_&]:transform-[translateY(43px)]">
          <span className="absolute left-[50%] w-8.5 h-2.25 -ml-4.25 rounded-[6px] bg-black [.tp-them_&]:bottom-2.5 [.tp-me_&]:top-2.5"></span>
          <span className="absolute left-0 right-0 text-center text-[11.5px] font-semibold [color:rgb(255_255_255_/_72%)] [.tp-them_&]:bottom-6 [.tp-me_&]:top-6">
            {them}
          </span>
        </div>
        <div className="absolute left-[50%] top-[50%] w-0 h-0 [&_i]:absolute [&_i]:-left-15 [&_i]:-top-15 [&_i]:w-30 [&_i]:h-30 [&_i]:rounded-[50%] [&_i]:[border:2px_solid_rgb(255_255_255_/_85%)] [&_i]:opacity-[0] [&_i]:transform-[scale(0.2)]">
          <i></i>
          <i></i>
          <i></i>
        </div>
        <div className="absolute left-[50%] h-37.5 rounded-[26px] [background:#1a1d24] [box-shadow:inset_0_0_0_1.5px_#2e323c] [transition:transform_0.6s_cubic-bezier(0.32,_0.72,_0,_1)] w-37.5 -ml-18.75 tp-me -bottom-23 transform-none [.s2_&]:transform-[translateY(-43px)]">
          <span className="absolute left-[50%] w-8.5 h-2.25 -ml-4.25 rounded-[6px] bg-black [.tp-them_&]:bottom-2.5 [.tp-me_&]:top-2.5"></span>
          <span className="absolute left-0 right-0 text-center text-[11.5px] font-semibold [color:rgb(255_255_255_/_72%)] [.tp-them_&]:bottom-6 [.tp-me_&]:top-6">
            Anna
          </span>
        </div>
      </div>
      <div className="text-[14px] text-ink-2 text-center m-[12px_6px_0] min-h-5 [.s2_&]:[color:var(--ok,_#1f7a4f)] [.s2_&]:font-semibold">
        {st === 0 ? sub : st === 1 ? 'Łączenie…' : 'Gotowe. Telefony się rozpoznały.'}
      </div>
      {st === 0 && (
        <Actions>
          <Button onClick={() => setSt(1)}>{label}</Button>
        </Actions>
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
    <div
      className={'conf8 flex flex-col items-center p-[14px_0_22px]' + (done ? ' done' : '')}
      role="status"
      aria-live="polite"
    >
      <div className="relative w-21 h-21 grid place-items-center rounded-[26px] bg-fill text-ink overflow-hidden [transition:background_0.3s,_color_0.3s] [.conf8.done_&]:bg-green [.conf8.done_&]:text-white [.conf8.done_&]:animate-[cfdone_0.35s_var(--spring)]">
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
            className="[stroke-dasharray:120] [stroke-dashoffset:120] animate-[cfdraw_0.5s_var(--out)_forwards] [.conf8.done_&]:[transition:opacity_0.15s] [.conf8.done_&]:animate-none! [.conf8.done_&]:opacity-[0]! motion-reduce:animate-none! motion-reduce:[stroke-dashoffset:0]"
            d="M6 20V12a6 6 0 0 1 6-6h8M44 6h8a6 6 0 0 1 6 6v8M58 44v8a6 6 0 0 1-6 6h-8M20 58h-8a6 6 0 0 1-6-6v-8"
          />
          <g className="opacity-[0] animate-[cfin_0.3s_var(--out)_0.25s_forwards] [transition:opacity_0.2s] [.conf8.done_&]:[transition:opacity_0.15s] [.conf8.done_&]:animate-none! [.conf8.done_&]:opacity-[0]! motion-reduce:animate-none! motion-reduce:[stroke-dashoffset:0]">
            <path d="M23 25v4M41 25v4M32 26v9h-3M25 42c4 4 10 4 14 0" />
          </g>
          <path
            className="[stroke-dasharray:44] [stroke-dashoffset:44] opacity-[0] [.conf8.done_&]:opacity-[1] [.conf8.done_&]:animate-[cfdraw_0.35s_var(--out)_forwards] motion-reduce:animate-none! motion-reduce:[stroke-dashoffset:0]"
            d="M20 33l8 8 16-17"
          />
        </svg>
        <i className="absolute left-2.5 right-2.5 h-0.5 rounded-xs bg-signal-blue [box-shadow:0_0_12px_2px_rgb(47_107_255_/_60%)] top-3.5 animate-[cfscan_1s_ease-in-out_0.2s_2_alternate] [.conf8.done_&]:hidden motion-reduce:animate-none"></i>
      </div>
      <div className="mt-4.5 flex flex-col gap-2.25 min-w-50">
        {S.map((t, i) => (
          <div
            className={
              'cf-s flex items-center gap-2.5 text-[14.5px] text-ink-3 [transition:color_0.2s] [&.now]:text-ink [&.now]:font-medium [&.ok]:text-ink-2' +
              (i < k
                ? ' ok'
                : i === k
                  ? ' now [.p12-bar_button&]:bg-ink [.beats_li&_p]:text-ink [.beats_li&_p]:text-[16px] [.beats_li&_p]:leading-5.75 [.beats_li&_p]:font-medium motion-safe:[.beats_li&_>_div]:animate-[rise_0.4s_var(--out)_both] [@media(max-height:820px)_and_(min-width:961px)]:[.beats_li&_p]:text-[15px] [@media(max-height:820px)_and_(min-width:961px)]:[.beats_li&_p]:leading-5.25'
                  : '')
            }
          >
            <span className="w-4.5 h-4.5 rounded-[50%] flex-none grid place-items-center [box-shadow:inset_0_0_0_1.5px_var(--hair-2)] text-white [transition:background_0.2s,_box-shadow_0.2s] [.cf-s.now_&]:[box-shadow:inset_0_0_0_2px_var(--signal-blue)] [.cf-s.now_&]:animate-[cfpulse_1s_ease-in-out_infinite] [.cf-s.ok_&]:bg-ink [.cf-s.ok_&]:[box-shadow:none] [.cf-s.ok_&]:animate-[pop_0.25s_var(--spring)] motion-reduce:[.cf-s.now_&&]:animate-none">
              {i < k ? I('check', 12) : ''}
            </span>
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
    <Button
      variant="destructive"
      className={cn(
        'hold8 relative overflow-hidden isolate touch-none [-webkit-user-select:none] bg-red-soft! text-red! [&.holding]:transform-[scale(0.985)]',
        p > 0 && p < 1 && 'holding',
      )}
      style={{ '--p': p } as CSSProperties}
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
      <span
        className="absolute inset-0 [clip-path:inset(0_calc((1-var(--p))*100%)_0_0)] [transition:clip-path_0.2s_cubic-bezier(0.23,_1,_0.32,_1)] z-1 grid place-items-center bg-red text-white [font:inherit] [&&]:[font-weight:inherit] [.hold8.holding_&]:[transition:none]"
        aria-hidden="true"
      >
        {p > 0 && p < 1 ? holdLabel : label}
      </span>
    </Button>
  );
}
