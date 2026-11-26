import { useEffect, useState } from 'react';
import { I } from '@/ui/icons';
import { Ring } from '@/ui/primitives';
import type { IconName } from '@/ui/icons';
import type { Ctx } from '@/types';

/* Hop 14: the Dynamic Island carries the case you are waiting for */
export function Island({ c, route, full }: { c: Ctx; route: string; full: boolean }) {
  const [open, setOpen] = useState(false);
  useEffect(() => setOpen(false), [route]);
  const s = c.s;
  if (full || s.persona === 'tata')
    return (
      <div className="notch [.phone_&]:absolute [.phone_&]:top-2.5 [.phone_&]:left-[50%] [.phone_&]:transform-[translateX(-50%)] [.phone_&]:w-28 [.phone_&]:h-8 [.phone_&]:[background:#101318] [.phone_&]:rounded-[20px] [.phone_&]:z-60 [@media(max-width:960px)]:[.phone_&]:hidden! [@media(max-width:960px)_and_(min-width:641px)]:[.stage.wide_.phone_&]:block!"></div>
    );
  const a: { t: string; s: string; n: string; v: number; r: string; ic: IconName } = s.visit
    ? {
        t: 'Zosia, kardiolog',
        s: '15 grudnia, 10:30 · Prokocim',
        n: 'za 19 dni',
        v: 0.2,
        r: 'visit-4',
        ic: 'steth',
      }
    : {
        t: 'Dowód rejestracyjny',
        s: 'W produkcji · odbiór od 2 grudnia',
        n: '3 z 4',
        v: 0.75,
        r: 'case-meld',
        ic: 'car',
      };
  return (
    <button
      className={
        'notch [.phone_&]:absolute [.phone_&]:top-2.5 [.phone_&]:left-[50%] [.phone_&]:transform-[translateX(-50%)] [.phone_&]:w-28 [.phone_&]:h-8 [.phone_&]:[background:#101318] [.phone_&]:rounded-[20px] [.phone_&]:z-60 [@media(max-width:960px)]:[.phone_&]:hidden! [@media(max-width:960px)_and_(min-width:641px)]:[.stage.wide_.phone_&]:block! island [.phone_&.notch]:block [.phone_&.notch]:cursor-pointer [.phone_&.notch]:overflow-hidden [.phone_&.notch]:w-37.5 [.phone_&.notch]:[transition:width_0.42s_cubic-bezier(0.32,_0.72,_0,_1),_height_0.42s_cubic-bezier(0.32,_0.72,_0,_1),_border-radius_0.42s_cubic-bezier(0.32,_0.72,_0,_1)] [.phone_&.notch]:text-white [.phone_&.notch]:p-0 [&&.notch.open]:w-85 [&.notch.open]:h-26 [&.notch.open]:rounded-[34px]' +
        (open ? ' open' : '')
      }
      aria-label={'Na żywo: ' + a.t}
      onClick={() => {
        if (open) {
          setOpen(false);
          c.go(a.r);
        } else setOpen(true);
      }}
    >
      <span className="absolute inset-0 flex items-center justify-between p-[0_9px_0_12px] [transition:opacity_0.15s] [.notch.island.open_&]:opacity-[0]">
        <span className="text-white opacity-[0.9] grid">{I(a.ic, 13)}</span>
        <span className="is-r">
          <Ring v={a.v} max={1} size={18} w={2.5} color="#fff" />
        </span>
      </span>
      <span className="absolute left-0 top-0 w-85 grid grid-cols-[auto_1fr_auto] gap-[4px_12px] items-center p-[18px_20px_16px] opacity-[0] [transition:opacity_0.15s] text-left [.notch.island.open_&]:opacity-[1] [.notch.island.open_&]:[transition:opacity_0.25s_0.12s]">
        <span className="w-10 h-10 rounded-[12px] [background:rgb(255_255_255_/_12%)] grid place-items-center">
          {I(a.ic, 20)}
        </span>
        <span className="flex flex-col min-w-0 [&_b]:text-[15px] [&_b]:font-semibold [&_span]:text-[12.5px] [&_span]:[color:rgb(255_255_255_/_60%)] [&_span]:whitespace-nowrap [&_span]:overflow-hidden [&_span]:text-ellipsis">
          <b>{a.t}</b>
          <span>{a.s}</span>
        </span>
        <span className="text-[15px] font-semibold [font-variant-numeric:tabular-nums]">{a.n}</span>
        <span className="[grid-column:1/-1] h-1 [border-radius:4px] [background:rgb(255_255_255_/_18%)] overflow-hidden mt-2 [&_i]:block [&_i]:h-full [&_i]:bg-white [&_i]:[border-radius:4px]">
          <i style={{ width: `${a.v * 100}%` }}></i>
        </span>
      </span>
    </button>
  );
}
