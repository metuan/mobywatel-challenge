import { sx } from '@/lib/sx';
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
  if (full || s.persona === 'tata') return <div className="notch"></div>;
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
      className={'notch island' + (open ? ' open' : '')}
      aria-label={'Na żywo: ' + a.t}
      onClick={() => {
        if (open) {
          setOpen(false);
          c.go(a.r);
        } else setOpen(true);
      }}
    >
      <span className="is-c">
        <span className="is-l">{I(a.ic, 13)}</span>
        <span className="is-r">
          <Ring v={a.v} max={1} size={18} w={2.5} color="#fff" />
        </span>
      </span>
      <span className="is-x">
        <span className="is-ic">{I(a.ic, 20)}</span>
        <span className="is-tx">
          <b>{a.t}</b>
          <span>{a.s}</span>
        </span>
        <span className="is-n">{a.n}</span>
        <span className="is-bar">
          <i style={sx(`width:${a.v * 100}%`)}></i>
        </span>
      </span>
    </button>
  );
}
