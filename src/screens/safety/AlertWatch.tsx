import { sx } from '@/lib/sx';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { buzz, fire, reducedMotion } from '@/lib/env';
import { I } from '@/ui/icons';
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
  const [ping, setPing] = useState(0);
  const face = useRef<HTMLDivElement>(null),
    root = useRef<HTMLDivElement>(null);
  /* shared-element morph from the red shelter card */
  useLayoutEffect(() => {
    const f = face.current,
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
      setPing(p => p + 1);
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
    const f = face.current;
    if (!f || reducedMotion()) {
      c.go('alert-guide');
      return;
    }
    root.current && root.current.classList.add('leaving');
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
    <div className="wt8" ref={root} role="region" aria-label="Zegarek prowadzi do schronienia">
      <div className="wt-cap">
        <span className="wt-pocket">{I('phone', 16)}</span>Telefon w kieszeni. Prowadzi zegarek.
      </div>
      <div className="wt-stage">
        <div className="wt-strap top"></div>
        <div className="wt-strap bot"></div>
        <div className="wt-case">
          <span className="wt-crown"></span>
          <div className="wt-face" ref={face}>
            <svg className="wt-ring" viewBox="0 0 220 220" aria-hidden="true">
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
                className="wt-prog"
              />
            </svg>
            {arrived ? (
              <div className="wt-in done">
                <span className="wt-ok">{I('check', 40)}</span>
                <b>Jesteś w schronie</b>
                <small>Dekerta 24 · poziom -1</small>
              </div>
            ) : (
              <div className="wt-in">
                <span className="wt-arrow" style={sx(`transform:rotate(${leg.a}deg)`)}>
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
                <b className="wt-d">{dist} m</b>
                <small>{leg.t}</small>
              </div>
            )}
          </div>
        </div>
        {leg.taps && (
          <div key={ping} className={'wt-hap ' + leg.side}>
            <i></i>
            <i></i>
            <span>{Array.from({ length: leg.taps }, () => 'stuk').join(' · ')}</span>
          </div>
        )}
      </div>
      <div className="wt-legend">
        {arrived
          ? 'Zegarek stuknął trzy razy długo: jesteś na miejscu.'
          : 'Dwa stuknięcia: w lewo. Trzy: w prawo. Bez patrzenia na ekran.'}
      </div>
      <div style={{ flex: '1' }}></div>
      {arrived && (
        <div className="actions">
          <button className="btn" onClick={open}>
            Otwórz w telefonie
          </button>
        </div>
      )}
    </div>
  );
}
