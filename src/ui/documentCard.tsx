import type { PointerEvent as ReactPointerEvent } from 'react';
import { useEffect, useRef, useState } from 'react';
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
      if (on) cells.push(<rect x={x} y={y} width="1" height="1" />);
    }
  return (
    <svg
      viewBox="0 0 21 21"
      width="100%"
      height="100%"
      fill="#101317"
      role="img"
      aria-label="Kod QR (przykład)"
    >
      {cells}
    </svg>
  );
}

const QRCode = ({ size = 132 }) => {
  const n = 25,
    cells = [];
  let seed = 7;
  const rnd = () => (seed = (seed * 9301 + 49297) % 233280) / 233280;
  const finder = (x: number, y: number) => (x < 7 && y < 7) || (x >= n - 7 && y < 7) || (x < 7 && y >= n - 7);
  for (let y = 0; y < n; y++)
    for (let x = 0; x < n; x++)
      if (!finder(x, y) && rnd() > 0.52) cells.push(<rect x={x} y={y} width="1" height="1" />);
  const finderMark = (x: number, y: number) => (
    <g>
      <rect x={x} y={y} width="7" height="7" rx="1.6" />
      <rect x={x + 1} y={y + 1} width="5" height="5" rx="1" fill="#fff" />
      <rect x={x + 2} y={y + 2} width="3" height="3" rx=".6" />
    </g>
  );
  return (
    <svg
      width={size}
      height={size}
      viewBox={`-1 -1 ${n + 2} ${n + 2}`}
      fill="#0B0D12"
      shapeRendering="crispEdges"
    >
      {cells}
      {finderMark(0, 0)}
      {finderMark(n - 7, 0)}
      {finderMark(0, n - 7)}
    </svg>
  );
};

const Photo = () => (
  <span className="w-14 h-18 [border-radius:8px] overflow-hidden [box-shadow:0_0_0_1px_var(--d-hair)] flex-none block">
    <svg viewBox="0 0 56 72" width="56" height="72">
      <rect width="56" height="72" fill="#2A3242" />
      <circle cx="28" cy="28" r="12" fill="#596274" />
      <path d="M6 72c2-15 11-22 22-22s20 7 22 22z" fill="#596274" />
    </svg>
  </span>
);

export const ROSETTE = (
  <svg
    className="rosette absolute fill-none stroke-[0.5] z-[-1] pointer-events-none -right-27.5 -top-20 w-75 h-75 [stroke:rgb(255_255_255_/_5.5%)] [.scard_&]:-right-22.5 [.scard_&]:-top-17.5 [.scard_&]:opacity-[0.8]"
    viewBox="-100 -100 200 200"
    aria-hidden="true"
  >
    {Array.from({ length: 36 }, (_, i) => (
      <ellipse key={i} rx="92" ry="34" transform={`rotate(${i * 5})`} />
    ))}
  </svg>
);

const Holo = () => (
  <span
    className="absolute! left-10.5 top-13 w-5.5 h-5.5 rounded-[50%] [background:conic-gradient(from_calc(var(--sx,_0%)_*_3.6deg),_#c9d6ff,_#f3d1f4,_#d4f7e6,_#fbe7c6,_#c9d6ff)] opacity-[0.55] mix-blend-screen [box-shadow:0_0_0_1px_rgb(255_255_255_/_18%)] motion-safe:[transition:background_0.3s]"
    aria-hidden="true"
  ></span>
);

export function DocCard({
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
    const i = setInterval(() => setLeft(x => Math.max(0, x - 1)), 1000);
    return () => clearInterval(i);
  }, [flip]);
  const move = (e: ReactPointerEvent<HTMLElement>) => {
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
  return (
    <div
      className={
        'flipwrap [perspective:1200px] relative aspect-[1.586] mt-1 [&_>_.doc]:absolute [&_>_.doc]:inset-0 [&_>_.doc]:[-webkit-backface-visibility:hidden] [&_>_.doc]:[transform:rotateY(var(--rx,_0deg))] [&_>_.doc]:[transition:transform_0.52s_var(--out),_filter_0.52s] [&.flipped_>_.doc:first-child]:transform-[rotateY(-180deg)] [&.flipped_>_.doc:first-child]:invisible motion-safe:[.screen_&_>_.doc:first-child]:animate-[sheen_0.9s_var(--out)_0.15s_both] [&_>_.doc:first-child]:[transition:transform_0.52s_var(--out),_visibility_0s_0.26s] [.tv-card_&]:m-0' +
        (flip ? ' flipped' : '')
      }
    >
      <button
        className={'doc tone-' + tone}
        ref={ref}
        onPointerMove={interactive ? move : undefined}
        onPointerLeave={leave}
        onClick={() => {
          if (!interactive) return;
          setLeft(179);
          setFlip(true);
        }}
        aria-label="Dowód osobisty, dotknij aby pokazać kod QR"
      >
        {ROSETTE}
        <div className="flex justify-between items-center [.eu-eu_&]:pr-24 [.stack.w2_&]:min-h-6">
          <span className="d-rp inline-flex items-center text-[12px] font-medium text-d-ink">
            <i className="w-4 h-2.75 rounded-[3px] mr-2 [background:linear-gradient(#fff_50%,_var(--red)_50%)] [box-shadow:0_0_0_0.5px_rgb(11_13_18_/_22%)] inline-block flex-none [.d-rp_&]:w-3.5 [.d-rp_&]:h-2.5 [.d-rp_&]:mr-1.75 [.d-rp_&]:[box-shadow:none]"></i>
            Rzeczpospolita Polska
          </span>
          <span className="text-[13px] font-medium text-d-ink-2">Dowód osobisty</span>
        </div>
        <div className="flex gap-3.5 items-center relative">
          <Photo />
          <Holo />
          <div className="d-who">
            <div className="font-semibold leading-[1.1] text-[21px] tracking-tight">Anna Nowicka</div>
            <div className="flex gap-4.5 mt-2 [&_span]:block [&_span]:text-[11px] [&_span]:font-medium [&_span]:text-d-ink-2 [&_b]:text-[15px] [&_b]:font-medium [&_b]:[font-variant-numeric:tabular-nums] [&_b]:tracking-[0.01em]">
              <div>
                <span>Data urodzenia</span>
                <b>14.03.1992</b>
              </div>
              <div>
                <span>Ważny do</span>
                <b>12.05.2031</b>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center [.scard_&]:mt-auto">
          <span className="h-6 p-[0_10px] rounded-[999px] text-[12px] font-medium inline-flex items-center text-white bg-d-hair [box-shadow:inset_0_0_0_0.5px_rgb(255_255_255_/_14%)] [backdrop-filter:blur(8px)]">
            mDowód
          </span>
          <span className="text-[11px] [font-variant-numeric:tabular-nums] text-d-ink-2 inline-flex items-center gap-1.5 [&_i]:w-1.5 [&_i]:h-1.5 [&_i]:rounded-[50%] [&_i]:[background:#34c27a]">
            <i></i>
            {clock}
          </span>
        </div>
      </button>
      <div
        className={`doc [.flipwrap_&]:transform-[rotateY(180deg)] [.flipwrap_&]:flex [.flipwrap_&]:flex-row [.flipwrap_&]:items-center [.flipwrap_&]:gap-4 [.flipwrap_&]:justify-start [.flipwrap_&]:invisible [.flipwrap_&]:[transition:transform_0.52s_var(--out),_visibility_0s_0.26s] [.flipwrap.flipped_&]:transform-[rotateY(0)] [.flipwrap.flipped_&]:visible [.flipwrap.flipped_&]:[transition:transform_0.52s_var(--out),_visibility_0s_0.26s] tone-${tone}`}
        role="button"
        tabIndex={0}
        onClick={() => setFlip(false)}
      >
        <div className="bg-white rounded-[12px] p-2 flex-none leading-0">
          <QRCode size={118} />
        </div>
        <div className="qr-tx">
          <div className="font-semibold leading-[1.1] tracking-tight text-[17px]">
            Pokaż kod do zeskanowania
          </div>
          <div className="text-[13px] text-d-ink-2 mt-1.5 leading-4.5 [font-variant-numeric:tabular-nums]">
            Kod ważny {Math.floor(left / 60)}:{String(left % 60).padStart(2, '0')}. Zobaczysz, kto sprawdza,
            zanim pokażesz dane.
          </div>
          <span className="h-6 p-[0_10px] rounded-[999px] text-[12px] font-medium inline-flex items-center text-white bg-d-hair [box-shadow:inset_0_0_0_0.5px_rgb(255_255_255_/_14%)] [backdrop-filter:blur(8px)] mt-3">
            Dotknij, aby wrócić
          </span>
        </div>
      </div>
    </div>
  );
}
