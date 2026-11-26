import { Switch } from '@/components/ui/switch';
import { FieldSource } from '@/components/ui/field';
import {
  ListItem,
  ListItemChevron,
  ListItemContent,
  ListItemDescription,
  ListItemTitle,
  ListRow,
  ListRowChevron,
  ListRowContent,
  ListRowDescription,
  ListRowIcon,
  ListRowTitle,
} from '@/components/ui/list';
import { useEffect, useRef, useState } from 'react';
import { reducedMotion } from '@/lib/env';
import { I } from '@/ui/icons';
import { ILL } from '@/ui/illustrations';
import type { IllustrationName } from '@/ui/illustrations';
import type { IconName } from '@/ui/icons';
import type { Child } from '@/types';

export const Sec = ({ t, more, go }: { t: Child; more?: Child; go?: () => void }) => (
  <div className="sec">
    <h3>{t}</h3>
    {more && <button onClick={go}>{more}</button>}
  </div>
);

export const Row = ({
  icon,
  t,
  s,
  right,
  onClick,
}: {
  icon?: IconName;
  t: Child;
  s?: Child;
  right?: Child;
  onClick?: () => void;
}) => (
  <ListRow as="button" onClick={onClick}>
    {icon && <ListRowIcon>{I(icon)}</ListRowIcon>}
    <ListRowContent>
      <ListRowTitle>{t}</ListRowTitle>
      {s && <ListRowDescription>{s}</ListRowDescription>}
    </ListRowContent>
    {right !== undefined ? right : <ListRowChevron size={18} />}
  </ListRow>
);

export const Progress = ({ n, of }: { n: number; of: number }) => (
  <div className="progress" aria-label={`Krok ${n} z ${of}`}>
    {Array.from({ length: of }, (_, i) => (
      <i className={(i < n ? 'on' : '') + (i === n - 1 && n > 1 ? ' fresh' : '')}></i>
    ))}
  </div>
);

export const Toggle = ({ on, set, label }: { on: boolean; set: (v: boolean) => void; label?: string }) => (
  <Switch checked={on} onCheckedChange={set} aria-label={label} />
);

export const Src = ({ t }: { t: Child }) => (
  <FieldSource>
    {I('check', 12)} Źródło: {t}
  </FieldSource>
);

export const Ring = ({
  v,
  max,
  color = 'var(--ink)',
  size = 44,
  w = 3,
  children,
}: {
  v: number;
  max: number;
  color?: string;
  size?: number;
  w?: number;
  children?: Child;
}) => {
  const r = (size - w) / 2,
    L = 2 * Math.PI * r,
    p = Math.max(0, Math.min(1, v / max));
  return (
    <span className="ring-meter" style={{ width: size, height: size }}>
      <svg width={size} height={size}>
        <circle cx={size / 2} cy={size / 2} r={r} stroke="var(--fill-2)" strokeWidth={w} fill="none" />
        <circle
          className="ring-p"
          cx={size / 2}
          cy={size / 2}
          r={r}
          stroke={color}
          strokeWidth={w}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={L}
          strokeDashoffset={L * (1 - p)}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </svg>
      <span className="ring-c">{children}</span>
    </span>
  );
};

export const Wm = ({ rz = false }: { rz?: boolean }) => (
  <span className="wm">
    <i className="flag"></i>
    <span className="m">m</span>Obywatel{rz && <span className="rz">Razem</span>}
  </span>
);

const AV: [string, string][] = [
  ['A', 'Anna'],
  ['T', 'Tomasz'],
  ['Z', 'Zosia'],
  ['S', 'Tata'],
];

export const Av = ({ i, size = 40, dot }: { i: string; size?: number; dot?: string }) => (
  <span className="av" style={{ width: size, height: size, fontSize: Math.round(size * 0.34) }}>
    {i}
    {dot && <i className={'avd ' + dot}></i>}
  </span>
);

export const AvStack = ({ size = 28, list = AV }: { size?: number; list?: [string, string?][] }) => (
  <span className="avstack">
    {list.map(([i]) => (
      <Av i={i} size={size} />
    ))}
  </span>
);

export const LeadIcon = ({ ic }: { ic: IconName }) => <span className="lead-i">{I(ic, 20)}</span>;

export const GRow = ({
  ic,
  av,
  t,
  s,
  v,
  red,
  onClick,
}: {
  ic?: IconName;
  av?: Child;
  t: Child;
  s?: Child;
  v?: Child;
  red?: boolean;
  onClick?: () => void;
}) => (
  <ListItem as="button" onClick={onClick}>
    {ic ? <LeadIcon ic={ic} /> : av ? av : ''}
    <ListItemContent>
      <ListItemTitle>{t}</ListItemTitle>
      {s && <ListItemDescription>{s}</ListItemDescription>}
    </ListItemContent>
    {v && <span className={'gv' + (red ? ' red' : '')}>{v}</span>}
    <ListItemChevron size={16} />
  </ListItem>
);

export const Label = ({ t, more, go }: { t: Child; more?: Child; go?: () => void }) => (
  <div className="lbl">
    <span>{t}</span>
    {more && (
      <button onClick={go}>
        {more}
        {I('chevron', 14)}
      </button>
    )}
  </div>
);

export const Tile = ({
  t,
  s,
  n,
  onClick,
}: {
  t: Child;
  s?: Child;
  n: IllustrationName;
  onClick?: () => void;
}) => (
  <button className="mtile" onClick={onClick}>
    <span className="mt-ill">{ILL(n, 76)}</span>
    <span className="mt-t">{t}</span>
    <span className="mt-s">{s}</span>
  </button>
);

export const AppIcon = ({ k }: { k: string }) =>
  k === 'rcb' ? (
    <span className="nicon bg-[#d42a3e] text-[#fff]">{I('bell', 15)}</span>
  ) : k === 'imgw' ? (
    <span className="nicon bg-[#2b6cb0] text-[#fff]">{I('sun', 15)}</span>
  ) : (
    <span className="nicon mob">
      <span className="flag w-4 h-[11px]"></span>
    </span>
  );

/* Hop 19: the assistant thinks visibly, then answers word by word */
export function Typed({ text, onDone }: { text: string; onDone?: () => void }) {
  const W = text.split(' ');
  const [n, setN] = useState(reducedMotion() ? W.length : 0);
  useEffect(() => {
    if (n >= W.length) {
      onDone && onDone();
      return;
    }
    const a = setTimeout(() => setN(n + 2), 38);
    return () => clearTimeout(a);
  }, [n]);
  return (
    <span>
      {W.slice(0, n).map((w, i) => (
        <span className="tw8" key={i}>
          {w}{' '}
        </span>
      ))}
    </span>
  );
}

/* M4: digits roll when a number changes (signature counter, badges) */
export function Num({ v, fmtf }: { v: number | string; fmtf?: (v: number | string) => string }) {
  const s = (fmtf || String)(v);
  const prev = useRef(s);
  const old = prev.current;
  prev.current = s;
  return (
    <span className="num" aria-label={s}>
      {s.split('').map((ch, i) => {
        const ch0 = old[i - (s.length - old.length)];
        const changed = ch0 !== undefined && ch0 !== ch && /\d/.test(ch);
        return (
          <span className={'dg' + (changed ? ' roll' : '')} key={i + ch}>
            {ch === ' ' ? ' ' : ch}
          </span>
        );
      })}
    </span>
  );
}
