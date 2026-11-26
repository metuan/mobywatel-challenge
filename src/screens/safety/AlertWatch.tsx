import { Actions, Button } from '@/components/ui/button';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { buzz, fire, reducedMotion } from '@/lib/env';
import { Icon } from '@/ui/icons';
import type { Ctx } from '@/types';
import { takeBox } from '@/lib/morph';

/** Walking directions to the shelter; `taps` is how the watch buzzes before a turn. */
const LEGS: { a?: number; d?: number; t?: string; taps?: number; side?: 'l' | 'r'; end?: boolean }[] = [
  { a: 0, d: 240, t: 'Prosto ulicą Długą' },
  { a: 90, d: 140, t: 'W prawo w Dekerta', taps: 3, side: 'r' },
  { a: -90, d: 40, t: 'W lewo, do bramy nr 24', taps: 2, side: 'l' },
  { end: true },
];

export function AlertWatch(c: Ctx) {
  const [k, setK] = useState(0);
  const [dist, setDist] = useState(240);
  const faceRef = useRef<HTMLDivElement>(null),
    rootRef = useRef<HTMLDivElement>(null);
  /* shared-element morph from the red shelter card */
  useLayoutEffect(() => {
    const f = faceRef.current,
      from = takeBox('shelter');
    if (!f || !from || reducedMotion()) return;
    const ph = document.querySelector<HTMLElement>('.phone');
    if (!ph) return;
    const pr = ph.getBoundingClientRect();
    const sx = pr.width / ph.offsetWidth || 1;
    const to = f.getBoundingClientRect();
    const dx = (from.left + from.width / 2 - (to.left + to.width / 2)) / sx,
      dy = (from.top + from.height / 2 - (to.top + to.height / 2)) / sx;
    f.animate(
      [
        {
          transform: `translate(${dx}px,${dy}px) scale(${from.width / to.width},${from.height / to.height})`,
          borderRadius: '18px',
          background: '#fff',
        },
        { transform: 'none', borderRadius: '50%', background: '#050608' },
      ],
      { duration: 620, easing: 'cubic-bezier(.32,.72,0,1)' },
    );
  }, []);
  useEffect(() => {
    if (k >= LEGS.length - 1) return;
    const leg = LEGS[k];
    if (leg.taps) {
      buzz(Array.from({ length: leg.taps * 2 - 1 }, (_, i) => (i % 2 ? 90 : 45)));
    }
    const end = LEGS[k + 1].d || 0;
    const tick = setInterval(
      () => setDist(d => Math.max(end, d - 5)),
      2300 / Math.max(1, ((leg.d || 0) - end) / 5),
    );
    const nx = setTimeout(
      () => {
        setK(k + 1);
        if (k + 1 === LEGS.length - 1) {
          setDist(0);
          buzz([60, 60, 200]);
          fire();
        }
      },
      k === 0 ? 2600 : 2400,
    );
    return () => {
      clearInterval(tick);
      clearTimeout(nx);
    };
  }, [k]);
  const leg = LEGS[k],
    arrived = !!leg.end;
  const prog = arrived ? 1 : 1 - dist / 240;
  const C = 2 * Math.PI * 104;
  const open = () => {
    const f = faceRef.current;
    if (!f || reducedMotion()) {
      c.go('alert-guide');
      return;
    }
    rootRef.current && rootRef.current.classList.add('leaving');
    f.animate(
      [
        { transform: 'none', borderRadius: '50%' },
        { transform: 'scale(4.2)', borderRadius: '30%' },
      ],
      { duration: 420, easing: 'cubic-bezier(.32,.72,0,1)', fill: 'forwards' },
    );
    setTimeout(() => c.go('alert-guide'), 360);
  };
  return (
    <div
      className="wt8 absolute inset-0 z-30 [background:#050608] text-white flex flex-col items-center p-[64px_20px_26px]"
      ref={rootRef}
      role="region"
      aria-label="Zegarek prowadzi do schronienia"
    >
      <div className="flex items-center gap-2 text-[14px] [color:rgb(255_255_255_/_70%)] mt-2 motion-safe:[animation:fade-up_0.4s_cubic-bezier(0.23,_1,_0.32,_1)_0.35s_both] motion-safe:[.wt8.leaving_&]:[transition:opacity_0.2s_ease-out] motion-safe:[.wt8.leaving_&]:opacity-[0]">
        <span className="grid place-items-center w-7 h-7 rounded-[9px] [background:rgb(255_255_255_/_8%)]">
          <Icon name="phone" size={16} />
        </span>
        Telefon w kieszeni. Prowadzi zegarek.
      </div>
      <div className="relative w-65 h-90 mt-6.5 grid place-items-center">
        <div className="wt-strap absolute left-[50%] w-37.5 -ml-18.75 h-27.5 [background:linear-gradient(90deg,_#16181d,_#22252c_50%,_#16181d)] rounded-[18px] [&.top]:-top-1.5 [&.top]:rounded-[22px_22px_10px_10px] motion-safe:[&.top]:[animation:strap-t_0.5s_cubic-bezier(0.32,_0.72,_0,_1)_0.3s_both] motion-safe:[.wt8.leaving_&]:[transition:opacity_0.2s_ease-out] motion-safe:[.wt8.leaving_&]:opacity-[0] top"></div>
        <div className="wt-strap absolute left-[50%] w-37.5 -ml-18.75 h-27.5 [background:linear-gradient(90deg,_#16181d,_#22252c_50%,_#16181d)] rounded-[18px] [&.top]:-top-1.5 [&.top]:rounded-[22px_22px_10px_10px] motion-safe:[&.top]:[animation:strap-t_0.5s_cubic-bezier(0.32,_0.72,_0,_1)_0.3s_both] motion-safe:[.wt8.leaving_&]:[transition:opacity_0.2s_ease-out] motion-safe:[.wt8.leaving_&]:opacity-[0] [&.wt-strap]:-bottom-1.5 [&.wt-strap]:rounded-[10px_10px_22px_22px] motion-safe:[&.wt-strap]:[animation:strap-b_0.5s_cubic-bezier(0.32,_0.72,_0,_1)_0.3s_both]"></div>
        <div className="relative w-61 h-61 rounded-[50%] [background:linear-gradient(145deg,_#3a3e47,_#15171c)] p-2.5 [box-shadow:0_30px_60px_-20px_rgb(0_0_0_/_80%),_inset_0_1px_0_rgb(255_255_255_/_12%)] motion-safe:[animation:case-in_0.55s_cubic-bezier(0.32,_0.72,_0,_1)_0.05s_both] motion-safe:[transition:transform_0.2s] motion-safe:[.wt8:has(.wt-hap.l)_&]:animate-[nudge-l_0.5s_ease-out]">
          <span className="absolute -right-2.25 top-[50%] w-3 h-9.5 -mt-4.75 [border-radius:4px] [background:linear-gradient(90deg,_#2a2d35,_#4a4e58)] motion-safe:animate-[fade_0.3s_ease-out_0.4s_both]"></span>
          <div
            className="relative w-56 h-56 rounded-[50%] [background:#050608] grid place-items-center overflow-hidden will-change-transform"
            ref={faceRef}
          >
            <svg className="absolute inset-0.5 w-55 h-55" viewBox="0 0 220 220" aria-hidden="true">
              <circle cx="110" cy="110" r="104" stroke="rgba(255,255,255,.1)" strokeWidth="7" fill="none" />
              <circle
                cx="110"
                cy="110"
                r="104"
                stroke="#E0263F"
                strokeWidth="7"
                fill="none"
                strokeLinecap="round"
                strokeDasharray={C}
                strokeDashoffset={C * (1 - prog)}
                transform="rotate(-90 110 110)"
                className="[transition:stroke-dashoffset_0.5s_linear]"
              />
            </svg>
            {arrived ? (
              <div className="flex flex-col items-center text-center gap-0.5 relative [&_small]:text-[13px] [&_small]:[color:rgb(255_255_255_/_65%)] [&_small]:max-w-37.5 [&.done_b]:text-[19px] [&.done_b]:font-[650] motion-safe:[&.done]:[animation:num-in_0.45s_cubic-bezier(0.23,_1,_0.32,_1)_both] done">
                <span className="w-16.5 h-16.5 rounded-[50%] [background:#e0263f] grid place-items-center mb-2">
                  <Icon name="check" size={40} />
                </span>
                <b>Jesteś w schronie</b>
                <small>Dekerta 24 · poziom -1</small>
              </div>
            ) : (
              <div className="flex flex-col items-center text-center gap-0.5 relative [&_small]:text-[13px] [&_small]:[color:rgb(255_255_255_/_65%)] [&_small]:max-w-37.5 [&.done_b]:text-[19px] [&.done_b]:font-[650] motion-safe:[&.done]:[animation:num-in_0.45s_cubic-bezier(0.23,_1,_0.32,_1)_both]">
                <span
                  className="block [transition:transform_0.5s_cubic-bezier(0.77,_0,_0.175,_1)]"
                  style={{ transform: `rotate(${leg.a}deg)` }}
                >
                  <svg
                    width="64"
                    height="64"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#fff"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 20V5M5.5 11.5 12 5l6.5 6.5" />
                  </svg>
                </span>
                <b className="text-[34px] font-bold tracking-[-0.03em] [font-variant-numeric:tabular-nums] mt-0.5">
                  {dist} m
                </b>
                <small>{leg.t}</small>
              </div>
            )}
          </div>
        </div>
        {leg.taps && (
          <div
            key={k}
            className={
              'wt-hap absolute top-[50%] flex items-center pointer-events-none [&.l]:-left-1.5 [&.l]:flex-row-reverse [&.r]:-right-1.5 [&_i]:absolute [&_i]:top-[50%] [&_i]:w-22.5 [&_i]:h-22.5 [&_i]:-mt-11.25 [&_i]:rounded-[50%] [&_i]:[border:2px_solid_rgb(255_255_255_/_60%)] [&_i]:opacity-[0] [&.l_i]:-left-2.5 [&.r_i]:-right-2.5 [&_span]:absolute [&_span]:top-25 [&_span]:whitespace-nowrap [&_span]:text-[12px] [&_span]:font-semibold [&_span]:tracking-[0.02em] [&_span]:bg-d-hair [&_span]:p-[4px_9px] [&_span]:rounded-[999px] [&_span]:text-white [&.l_span]:left-0 [&.r_span]:right-0 motion-safe:[&_i]:[animation:hap_1s_cubic-bezier(0.23,_1,_0.32,_1)_both] motion-safe:[&_i:nth-child(2)]:[animation-delay:0.18s] motion-safe:[&_span]:[animation:fade-up_0.3s_cubic-bezier(0.23,_1,_0.32,_1)_both] ' +
              leg.side
            }
          >
            <i></i>
            <i></i>
            <span>{Array.from({ length: leg.taps }, () => 'stuk').join(' · ')}</span>
          </div>
        )}
      </div>
      <div className="text-[14px] [color:rgb(255_255_255_/_70%)] text-center mt-5.5 max-w-75 leading-5 motion-safe:[.wt8.leaving_&]:[transition:opacity_0.2s_ease-out] motion-safe:[.wt8.leaving_&]:opacity-[0]">
        {arrived
          ? 'Zegarek stuknął trzy razy długo: jesteś na miejscu.'
          : 'Dwa stuknięcia: w lewo. Trzy: w prawo. Bez patrzenia na ekran.'}
      </div>
      <div className="flex-1"></div>
      {arrived && (
        <Actions className="motion-safe:[.wt8.leaving_&]:[transition:opacity_0.2s_ease-out] motion-safe:[.wt8.leaving_&]:opacity-[0]">
          <Button variant="inverse" onClick={open}>
            Otwórz w telefonie
          </Button>
        </Actions>
      )}
    </div>
  );
}
