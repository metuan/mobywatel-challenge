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
  <div className="flex justify-between items-baseline [&_h3]:m-0 [&_button]:underline-offset-[3px] [&_button]:[text-decoration:none] [&_h3]:font-sans [&_h3]:text-[14px] [&_h3]:font-medium [&_h3]:text-ink-2 [&_h3]:tracking-[-0.006em] m-[32px_4px_8px] [&_button]:text-ink [&_button]:text-[14px] [&_button]:font-medium">
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
  <div
    className="progress flex gap-1 m-[8px_0_2px] [&_i]:flex-1 [&_i]:h-0.75 [&_i]:rounded-xs [&_i]:[background:var(--track)] [&_i]:relative [&_i]:overflow-hidden"
    aria-label={`Krok ${n} z ${of}`}
  >
    {Array.from({ length: of }, (_, i) => (
      <i
        className={
          (i < n
            ? 'on [.progress_i&]:bg-ink [.steps_i&]:bg-ink [.st-ab_>_div&&]:bg-white [.st-ab_&_p]:text-ink [.tour-dots_i&]:w-5.5 [.tour-dots_i&]:bg-ink [.call-keys_button&_span]:bg-white [.call-keys_button&_span]:text-ink'
            : '') +
          (i === n - 1 && n > 1
            ? ' [.progress_i&.on]:bg-fill-2! [.progress_i&.on::after]:[content:""] [.progress_i&.on::after]:absolute [.progress_i&.on::after]:inset-0 [.progress_i&.on::after]:bg-ink [.progress_i&.on::after]:origin-[left] [.progress_i&.on::after]:[animation:segfill_0.45s_cubic-bezier(0.23,_1,_0.32,_1)_0.12s_both] motion-reduce:[.progress_i&.on::after]:animate-none'
            : '')
        }
      ></i>
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
    <span
      className="relative inline-grid place-items-center flex-none [&_svg]:absolute [&_svg]:inset-0 [.hw-col.ph_&]:w-9 [.hw-col.ph_&]:h-3.5 [.hw-col.ph_&]:rounded-[7px] [.hw-col.ph_&]:bg-fill-2 [.hw-col.ph_&]:[outline:2px_solid_var(--signal-blue)] [.hw-col.ph_&]:outline-offset-[3px] motion-safe:[.hw-col.ph_&]:animate-[coach_1.4s_var(--out)_infinite] [.is-r_&_svg_circle:first-child]:[stroke:rgb(255_255_255_/_25%)]"
      style={{ width: size, height: size }}
    >
      <svg width={size} height={size}>
        <circle cx={size / 2} cy={size / 2} r={r} stroke="var(--fill-2)" strokeWidth={w} fill="none" />
        <circle
          className="motion-safe:[transition:stroke-dashoffset_1s_var(--ease-out)] motion-safe:[.screen_&]:animate-[ring-in_1.1s_var(--ease-out)_both]"
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
      <span className="relative flex flex-col items-center leading-none [&_small]:mt-0.5 [&_small]:text-[10px] [&_small]:text-ink-2 [&_b]:text-[15px] [&_b]:font-semibold [&_b]:[font-variant-numeric:tabular-nums] [&_b]:tracking-[-0.02em] [.p8-hero_&_b]:text-[22px] [.p8-hero_&_b]:leading-none [.p8-hero_&_small]:text-[11px] [.p8-hero_&_small]:text-ink-2 [.p8-hero_&]:flex [.p8-hero_&]:flex-col [.p8-hero_&]:items-center">
        {children}
      </span>
    </span>
  );
};

export const Wm = ({ rz = false }: { rz?: boolean }) => (
  <span className="wm font-[650] text-[17px] leading-none tracking-[-0.02em] text-ink inline-flex items-center whitespace-nowrap [.app.compact_.topbar_&]:opacity-[0] [.top8_&]:text-[16px] [.topbar_&]:[transition:opacity_0.12s_var(--out)]">
    <i className="w-4 h-2.75 rounded-[3px] mr-2 [background:linear-gradient(#fff_50%,_var(--red)_50%)] [box-shadow:0_0_0_0.5px_rgb(11_13_18_/_22%)] inline-block flex-none [.d-rp_&]:w-3.5 [.d-rp_&]:h-2.5 [.d-rp_&]:mr-1.75 [.d-rp_&]:[box-shadow:none]"></i>
    <span className="[.wm_&]:font-normal [.wm_&]:text-ink-2">m</span>Obywatel
    {rz && <span className="[.wm_&]:font-normal [.wm_&]:text-ink-3 [.wm_&]:ml-1.5">Razem</span>}
  </span>
);

const AV: [string, string][] = [
  ['A', 'Anna'],
  ['T', 'Tomasz'],
  ['Z', 'Zosia'],
  ['S', 'Tata'],
];

export const Av = ({ i, size = 40, dot }: { i: string; size?: number; dot?: string }) => (
  <span
    className="av [.lfam_&]:w-9 [.lfam_&]:h-9 [.lfam_&]:rounded-[50%] [.lfam_&]:grid [.lfam_&]:place-items-center [.lfam_&]:text-[11.5px] [.lfam_&]:font-bold [.lfam_&]:relative rounded-[50%] text-ink grid place-items-center flex-none relative [letter-spacing:0] [.avstack_&]:[box-shadow:0_0_0_2px_var(--surface)] [.avstack_&]:-ml-2 [.avstack_&:first-child]:ml-0 [.avstack_&]:[background:#dcdee3] [.fhead_&]:[background:#dcdee3] [background:#e6e7eb] font-semibold [.tv-person_&]:bg-white [.tv-person_&]:[box-shadow:0_0_0_0.5px_var(--hair-2),_0_8px_20px_-10px_rgb(11_13_18_/_25%)] [.tv-person:first-child_&]:bg-ink [.tv-person:first-child_&]:text-white [.sg-twist_&]:flex-none [.call-av_&]:relative [.call-av_&]:z-1 [.call-av_&]:[background:#2a3140]! [.call-av_&]:text-white! [.call-av_&]:text-[40px]! [.sg-twist_>_span&]:flex-none [.sg-twist_>_span&]:grid [.sg-twist_>_span&]:flex-row [.sg-twist_>_span&]:gap-0 [.sg-twist_>_span&]:self-center"
    style={{ width: size, height: size, fontSize: Math.round(size * 0.34) }}
  >
    {i}
    {dot && (
      <i
        className={
          'absolute -right-px -bottom-px w-2.5 h-2.5 rounded-[50%] [box-shadow:0_0_0_2px_#fff] ' + dot
        }
      ></i>
    )}
  </span>
);

export const AvStack = ({ size = 28, list = AV }: { size?: number; list?: [string, string?][] }) => (
  <span className="avstack [&_span]:rounded-[50%] [&_span]:text-white [&_span]:text-[10px] [&_span]:font-bold [&_span]:grid [&_span]:place-items-center [&_span]:[box-shadow:0_0_0_2.5px_#fff] [&_span]:-ml-2 [&_span:first-child]:ml-0 inline-flex">
    {list.map(([i]) => (
      <Av i={i} size={size} />
    ))}
  </span>
);

export const LeadIcon = ({ ic }: { ic: IconName }) => (
  <span className="w-10 h-10 rounded-[50%] grid place-items-center flex-none text-ink bg-bg [&.ai]:[background:linear-gradient(135deg,_var(--signal-blue),_var(--signal-violet))] [&.ai]:text-white [.how8-row_&]:w-7.5 [.how8-row_&]:h-7.5 [.how8-row_&]:rounded-[10px]">
    {I(ic, 20)}
  </span>
);

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
    {v && (
      <span
        className={
          'text-[14px] text-ink-2 [font-variant-numeric:tabular-nums] whitespace-nowrap [&.red]:text-red!' +
          (red ? ' red' : '')
        }
      >
        {v}
      </span>
    )}
    <ListItemChevron size={16} />
  </ListItem>
);

export const Label = ({ t, more, go }: { t: Child; more?: Child; go?: () => void }) => (
  <div className="[.rcb-app_&]:flex [.rcb-app_&]:gap-2 [.rcb-app_&]:items-center [.rcb-app_&]:text-[12px] [.rcb-app_&]:text-ink-2 [.rcb-app_&]:p-[8px_16px_2px] flex justify-between items-center [&_button]:inline-flex [&_button]:items-center [&_button]:gap-0.5 [&_button]:text-ink [&_button]:font-medium [&_button]:text-[14px] text-[13px] tracking-[-0.003em] m-[36px_4px_10px] text-ink-2 font-medium">
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
  <button
    className="mtile motion-safe:[&:active]:duration-[0.12s] flex-[0_0_148px] h-42 snap-start bg-white rounded-[22px] p-[12px_14px_14px] flex flex-col text-left text-ink [box-shadow:none] [.mgrid_&]:h-44 [transition:background-color_0.12s,_transform_0.16s_var(--out)] [&:active]:transform-[scale(0.97)]"
    onClick={onClick}
  >
    <span className="mt-ill flex-1 grid place-items-center">{ILL(n, 76)}</span>
    <span className="text-[15px] font-semibold tracking-[-0.015em] [.mtile_&]:block [.mtile_&]:max-w-full [.mtile_&]:whitespace-nowrap [.mtile_&]:overflow-hidden [.mtile_&]:text-ellipsis">
      {t}
    </span>
    <span className="text-[12px] text-ink-2 leading-4 mt-px [.mtile_&]:block [.mtile_&]:max-w-full [.mtile_&]:whitespace-nowrap [.mtile_&]:overflow-hidden [.mtile_&]:text-ellipsis">
      {s}
    </span>
  </button>
);

export const AppIcon = ({ k }: { k: string }) =>
  k === 'rcb' ? (
    <span className="w-5.5 h-5.5 rounded-[6px] grid place-items-center flex-none [&.mob]:bg-white [&.mob]:[box-shadow:inset_0_0_0_1px_rgb(0_0_0_/_8%)] bg-[#d42a3e] text-white">
      {I('bell', 15)}
    </span>
  ) : k === 'imgw' ? (
    <span className="w-5.5 h-5.5 rounded-[6px] grid place-items-center flex-none [&.mob]:bg-white [&.mob]:[box-shadow:inset_0_0_0_1px_rgb(0_0_0_/_8%)] bg-[#2b6cb0] text-white">
      {I('sun', 15)}
    </span>
  ) : (
    <span className="w-5.5 h-5.5 rounded-[6px] grid place-items-center flex-none [&.mob]:bg-white [&.mob]:[box-shadow:inset_0_0_0_1px_rgb(0_0_0_/_8%)] mob">
      <span className="rounded-[3px] mr-2 [background:linear-gradient(#fff_50%,_var(--red)_50%)] [box-shadow:0_0_0_0.5px_rgb(11_13_18_/_22%)] inline-block flex-none [.d-rp_&]:mr-1.75 [.d-rp_&]:[box-shadow:none] w-4 h-[11px]"></span>
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
        <span
          className="relative animate-[wordin_0.22s_ease-out_both] motion-reduce:animate-none! motion-reduce:filter-none"
          key={i}
        >
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
    <span className="inline-flex [font-variant-numeric:tabular-nums]" aria-label={s}>
      {s.split('').map((ch, i) => {
        const ch0 = old[i - (s.length - old.length)];
        const changed = ch0 !== undefined && ch0 !== ch && /\d/.test(ch);
        return (
          <span
            className={
              'inline-block [&.roll]:[animation:dgroll_0.36s_cubic-bezier(0.23,_1,_0.32,_1)_both] motion-reduce:[&.roll]:animate-none! motion-reduce:[&.roll]:filter-none' +
              (changed ? ' roll' : '')
            }
            key={i + ch}
          >
            {ch === ' ' ? ' ' : ch}
          </span>
        );
      })}
    </span>
  );
}
