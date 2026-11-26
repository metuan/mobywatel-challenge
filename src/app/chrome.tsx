import { useEffect, useState } from 'react';
import { FULL, TABS } from '@/app/routes';
import type { Route } from '@/app/routes';
import { BEATS, CHAPTERS, beatOf } from '@/story/chapters';
import { Icon } from '@/ui/icons';
import { Wm } from '@/ui/primitives';
import type { Persona } from '@/types';

/* The phone's own chrome around the current screen: top bar, tab bar, the story bar on small screens and the toast. */

/** Wordmark or "back" on the left, the screen title once scrolled, and "how it works" plus the profile on the right. */
export function TopBar({
  isTab,
  tata,
  route,
  go,
  back,
  clearHistory,
  openHow,
}: {
  isTab: boolean;
  tata: boolean;
  route: Route;
  go: (r: string, p?: Persona) => void;
  back: () => void;
  clearHistory: () => void;
  openHow: () => void;
}) {
  // The title that fades into the bar once the large heading scrolls away, read from the screen's h1.
  const [title, setTitle] = useState('');
  useEffect(() => {
    const t = setTimeout(() => {
      const h = document.querySelector('.phone .scroll h1');
      const x = h ? (h.textContent || '').trim() : '';
      setTitle(x.length > 26 ? x.slice(0, 24).replace(/\s+\S*$/, '') + '…' : x);
    }, 60);
    return () => clearTimeout(t);
  }, [route]);
  return (
    <div className="topbar flex-none flex items-center justify-between min-h-11 h-13 p-[0_20px] relative bg-transparent [-webkit-backdrop-filter:none] [transition:background-color_0.2s,_box-shadow_0.2s] z-16 [@media(prefers-reduced-transparency:reduce)]:[-webkit-backdrop-filter:none]! [@media(prefers-reduced-transparency:reduce)]:bg-bg [@media(prefers-contrast:more)]:[box-shadow:0_0_0_1px_var(--ink)] [.app.scrolled_&]:[transition:box-shadow_0.2s] [.app.scrolled_&]:[background:rgb(244_244_246_/_94%)]! [.app.scrolled_&]:[-webkit-backdrop-filter:blur(20px)_saturate(160%)]! [.app.scrolled_&]:[box-shadow:0_0.5px_0_rgb(20_20_40_/_12%)]! [.app.compact_&]:[background:rgb(244_244_246_/_94%)]! [.app.compact_&]:[-webkit-backdrop-filter:blur(20px)_saturate(160%)]! [.app.compact_&]:[box-shadow:0_0.5px_0_rgb(20_20_40_/_12%)]!">
      {isTab ? (
        <button
          className="flex items-center [&_em]:italic [&_em]:font-normal [&_em]:text-ink-2 text-[17px] font-semibold tracking-[-0.01em] gap-2 [&_em]:hidden font-[inherit] p-0"
          onClick={() => {
            clearHistory();
            go(tata ? 'easy' : 'today');
          }}
        >
          <Wm />
        </button>
      ) : (
        <button className="flex items-center gap-0 -ml-2 text-ink text-[16px] font-medium" onClick={back}>
          <Icon name="left" size={22} />
          <span>Wstecz</span>
        </button>
      )}
      {!tata && (
        <span className="absolute left-[50%] [transform:translate(-50%,_4px)] font-semibold tracking-[-0.015em] opacity-[0] pointer-events-none [.app.compact_&]:opacity-[1] [.app.compact_&]:[transform:translate(-50%,_0)] whitespace-nowrap overflow-hidden text-ellipsis max-w-37.5 text-[15px] [transition:opacity_0.18s_var(--out)_0.08s,_transform_0.22s_var(--out)_0.08s] [.app:not(.compact)_&]:[transition:opacity_0.1s_var(--out),_transform_0.1s_var(--out)]">
          {isTab ? (TABS.find(t => t[0] === route)?.[1] ?? '') : title}
        </span>
      )}
      <div className="flex items-center">
        <button
          className="inline-flex items-center gap-1.25 rounded-[999px] text-[12.5px] font-medium mr-1.5 [@media(min-width:1280px)]:hidden [@media(min-width:961px)]:hidden! [@media(max-width:960px)]:inline-flex! p-0 justify-center [border:0] w-8 h-8 [background:rgb(11_13_18_/_5%)] text-ink motion-safe:[transition:transform_0.16s_var(--ease-out),_background-color_0.15s_ease,_box-shadow_0.2s_ease] motion-safe:[&:active]:transform-[scale(0.97)] motion-safe:[&:active]:[transition-duration:0.1s]"
          aria-label="Jak to działa"
          onClick={openHow}
        >
          <Icon name="info" size={18} />
        </button>
        {tata ? (
          <button
            className="rounded-[999px] [box-shadow:none] motion-safe:[&:active]:transform-[scale(0.97)] [border:0] [background:none] p-[8px_4px] text-ink font-normal text-[17px]"
            onClick={() => go('today', 'anna')}
          >
            Zwykły widok
          </button>
        ) : (
          <button
            className="avatar-btn grid place-items-center rounded-[50%] text-[12px] font-semibold w-8 h-8 [background:rgb(11_13_18_/_5%)] text-ink"
            aria-label="Profil i ustawienia"
            onClick={() => go('profile')}
          >
            AN
          </button>
        )}
      </div>
    </div>
  );
}

/** The floating tab bar with a pill that slides to the current tab. */
export function TabBar({
  route,
  curTab,
  go,
  clearHistory,
}: {
  route: Route;
  curTab: string;
  go: (r: string) => void;
  clearHistory: () => void;
}) {
  return (
    <nav
      className="tabbar flex-none grid [grid-template-columns:repeat(5,_1fr)] z-20 [&_button]:flex [&_button]:flex-col [&_button]:items-center [&_button]:[letter-spacing:0] absolute left-3 right-3 bottom-3.5 h-15 rounded-[999px] [border:0] [-webkit-backdrop-filter:blur(24px)_saturate(180%)] items-center [&_button]:text-ink-3 [&_button]:text-[10px] [&_button]:font-medium [&_button]:gap-0.75 [&_button]:h-full [&_button]:justify-center [&_button]:relative [&_button]:z-1 [&_button[aria-current='page']]:text-ink [&_button[aria-current='page']_svg]:stroke-[2.1] [&_button[aria-current='page']_svg_path]:fill-current [&_button[aria-current='page']_svg_path]:[fill-opacity:0] [@media(max-width:960px)]:bottom-[max(14px,env(safe-area-inset-bottom))] p-[0_6px] [background:rgb(255_255_255_/_72%)] [box-shadow:0_10px_30px_-10px_rgb(11_13_18_/_22%),_0_0_0_0.5px_rgb(11_13_18_/_8%),_inset_0_1px_0_rgb(255_255_255_/_80%)] [&_button[aria-current='page']_span]:font-semibold [@media(prefers-reduced-transparency:reduce)]:[-webkit-backdrop-filter:none]! [@media(prefers-reduced-transparency:reduce)]:bg-white [@media(prefers-contrast:more)]:[box-shadow:0_0_0_1px_var(--ink)]"
      aria-label="Główne"
    >
      <i
        className="absolute left-1.5 top-1.5 bottom-1.5 w-[calc((100%-12px)/5)] rounded-[999px] [background:rgb(11_13_18_/_6%)] [transition:transform_0.42s_var(--spring)] pointer-events-none motion-reduce:[transition:none]"
        style={{
          transform: `translateX(${
            Math.max(
              0,
              TABS.findIndex(t => t[0] === curTab),
            ) * 100
          }%)`,
        }}
      ></i>
      {TABS.map(([r, t, ic]) => (
        <button
          key={r}
          aria-current={curTab === r && route !== 'profile' ? 'page' : undefined}
          onClick={() => {
            clearHistory();
            go(r);
          }}
        >
          <Icon name={ic} size={24} />
          <span>{t}</span>
        </button>
      ))}
    </nav>
  );
}

/** On phones the story panel collapses into this bar: chapter, step, and "next chapter". */
export function StoryBar({
  route,
  chap,
  lastBeat,
  go,
  step,
  openHow,
}: {
  route: Route;
  chap: number;
  lastBeat: number;
  go: (r: string, p?: Persona) => void;
  step: (d: number) => void;
  openHow: () => void;
}) {
  return (
    <div
      className={
        'mstory hidden absolute left-3 right-3 bottom-21 z-19 items-center gap-1.5 p-1.5 rounded-[18px] bg-ink text-white [box-shadow:0_12px_30px_-10px_rgb(11_13_18_/_45%)] [@media(max-width:960px)_and_(min-width:641px)]:flex [@media(max-width:640px)]:flex motion-safe:animate-[rise_0.4s_var(--out)_both] [&.top]:top-1.5 [&.top]:bottom-auto [&.top]:z-40 [@media(prefers-reduced-transparency:reduce)]:[-webkit-backdrop-filter:none]!' +
        (FULL.has(route) ? ' top' : '')
      }
    >
      <button
        className="flex-1 min-w-0 flex items-center gap-2.5 text-left text-white p-[4px_6px] motion-safe:[transition:transform_0.16s_var(--ease-out),_background-color_0.15s_ease,_box-shadow_0.2s_ease] motion-safe:[&:active]:transform-[scale(0.97)] motion-safe:[&:active]:[transition-duration:0.1s]"
        onClick={() => {
          const h = beatOf(chap, route);
          if (h < 0 && route !== BEATS[chap][0][0]) go(BEATS[chap][lastBeat][0], CHAPTERS[chap].p);
          else openHow();
        }}
      >
        <span className="flex-none text-[12px] font-semibold [font-variant-numeric:tabular-nums] [background:rgb(255_255_255_/_14%)] rounded-[999px] p-[4px_8px]">
          {chap + 1}/{CHAPTERS.length}
        </span>
        <span className="min-w-0 flex flex-col [&_b]:text-[13px] [&_b]:font-semibold [&_b]:whitespace-nowrap [&_b]:overflow-hidden [&_b]:text-ellipsis [&_span]:text-[12.5px] [&_span]:text-[#afc3ff] [&_span]:whitespace-nowrap [&_span]:overflow-hidden [&_span]:text-ellipsis">
          <b>{CHAPTERS[chap].t}</b>
          <span>
            {(() => {
              const h = beatOf(chap, route);
              if (h < 0 && route !== BEATS[chap][0][0]) return 'Poza historią. Dotknij, by wrócić';
              const bi = h >= 0 ? h : lastBeat,
                n = BEATS[chap].length;
              return `Krok ${bi + 1} z ${n}`;
            })()}
          </span>
        </span>
      </button>
      <button
        className="ms-next flex-none w-10 h-10 rounded-[12px] bg-white text-ink grid place-items-center motion-safe:[transition:transform_0.16s_var(--ease-out),_background-color_0.15s_ease,_box-shadow_0.2s_ease] motion-safe:[&:active]:transform-[scale(0.97)] motion-safe:[&:active]:[transition-duration:0.1s] [&.ready]:[outline:2px_solid_var(--signal-blue)] [&.ready]:outline-offset-[3px] [&.ready]:[box-shadow:0_0_0_6px_rgb(47_107_255_/_18%)] motion-safe:[&.ready]:animate-[coach_1.6s_var(--out)_infinite]! relative [&.ready::before]:[content:'Dotknij_tutaj'] [&.ready::before]:absolute [&.ready::before]:bottom-[calc(100%+14px)] [&.ready::before]:whitespace-nowrap [&.ready::before]:bg-signal-blue [&.ready::before]:text-white [&.ready::before]:text-[13px] [&.ready::before]:font-semibold [&.ready::before]:tracking-[-0.006em] [&.ready::before]:p-[7px_12px] [&.ready::before]:rounded-[999px] [&.ready::before]:[box-shadow:0_8px_20px_-6px_rgb(47_107_255_/_55%)] [&.ready::before]:pointer-events-none [&.ready::before]:z-5 [&.ready::after]:[content:''] [&.ready::after]:absolute [&.ready::after]:bottom-[calc(100%+2px)] [&.ready::after]:-ml-1.5 [&.ready::after]:[border:6px_solid_transparent] [&&.ready::after]:border-t-signal-blue [&.ready::after]:pointer-events-none [&.ready::after]:z-5 [&.ready::after]:left-[50%] [.mstory.top_&.ready::before]:bottom-auto [.mstory.top_&.ready::before]:top-[calc(100%+14px)] [.mstory.top_&.ready::after]:bottom-auto [.mstory.top_&.ready::after]:top-[calc(100%+2px)] [.mstory.top_&.ready::after]:border-t-transparent [.mstory.top_&.ready::after]:border-b-signal-blue motion-safe:[&.ready]:[animation-iteration-count:3]! [&.ready::before]:[animation:tip-in-a_0.22s_cubic-bezier(0.23,_1,_0.32,_1)_both]! [&.ready::after]:[animation:tip-in-a_0.22s_cubic-bezier(0.23,_1,_0.32,_1)_both]! [&.ready::before]:-right-1! [&.ready::before]:left-auto! [&.ready::before]:transform-none!"
        aria-label="Następny rozdział"
        onClick={() => step(1)}
      >
        <Icon name="chevron" size={18} />
      </button>
    </div>
  );
}

/** The status toast, with an optional "Cofnij" (undo). */
export function Toast({ view, onClose }: { view: { t: string; undo?: () => void }; onClose: () => void }) {
  return (
    <div
      className={
        'toast absolute left-4 right-4 text-white z-50 [box-shadow:var(--shadow)] motion-safe:animate-[toast-in_0.34s_var(--ease-out)_both] [backdrop-filter:blur(10px)] bottom-23 bg-ink rounded-[999px] p-[12px_18px] text-[14px] [@media(max-width:960px)]:bottom-37.5 [@media(prefers-reduced-transparency:reduce)]:[-webkit-backdrop-filter:none]! [&.has-undo]:flex [&.has-undo]:items-center [&.has-undo]:gap-3.5 [&.has-undo]:p-[8px_8px_8px_18px]' +
        (view.undo ? ' has-undo' : '')
      }
      role="status"
    >
      {view.t}
      {view.undo && (
        <button
          className="inline-flex items-center gap-1.5 [background:rgb(255_255_255_/_14%)] text-white rounded-[999px] p-[7px_12px] text-[13.5px] font-semibold whitespace-nowrap [transition:transform_0.16s_var(--out)] [&:active]:transform-[scale(0.97)]"
          onClick={() => {
            view.undo?.();
            onClose();
          }}
        >
          <Icon name="undo" size={15} /> Cofnij
        </button>
      )}
    </div>
  );
}
