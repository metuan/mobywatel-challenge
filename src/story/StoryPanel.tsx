import { BEATS, CHAPTERS, beatOf } from '@/story/chapters';
import { I } from '@/ui/icons';
import type { Persona } from '@/types';

export function StoryPanel({
  i,
  route,
  go,
  step,
  lastBeat = 0,
}: {
  i: number;
  route: string;
  go: (r: string, p?: Persona) => void;
  step: (d: number) => void;
  lastBeat?: number;
}) {
  const ch = CHAPTERS[i],
    beats = BEATS[i];
  const here = beatOf(i, route),
    off = here < 0 && route !== beats[0][0];
  const cur = here >= 0 ? here : Math.min(lastBeat, beats.length - 1);
  const last = cur === beats.length - 1;
  return (
    <div
      className="story [.sheet_&]:[border:0] [.sheet_&]:pt-1 [.sheet_&]:mb-4.5 [border-top:0] pt-0 motion-safe:animate-[story-in_0.32s_var(--ease-out)_both]"
      key={i}
    >
      <div className="font-medium text-ink-2 [font-variant-numeric:tabular-nums] flex justify-between text-[13px] [&_span:last-child]:text-ink-2 [&_span:last-child]:font-medium tracking-[0.005em]">
        <span>{ch.when}</span>
      </div>
      <h2 className="font-[680] [.sheet_&]:text-[24px] [.sheet_&]:leading-7 text-[36px] m-[2px_0_8px] [@media(max-width:1439px)_and_(min-width:1280px)]:text-[32px] [@media(max-height:820px)_and_(min-width:961px)]:[&&]:text-[30px] tracking-tight leading-[1.08] [font-optical-sizing:auto]">
        {ch.t}
      </h2>
      <p className="font-medium mt-0 mr-0 ml-0 max-w-[30em] text-pretty text-[18px] leading-6.5 mb-4 [@media(max-height:820px)_and_(min-width:961px)]:text-[16px] [@media(max-height:820px)_and_(min-width:961px)]:leading-5.75 [@media(max-height:820px)_and_(min-width:961px)]:mb-3 tracking-[-0.005em]">
        {ch.hook}
      </p>
      <div className="st-ab grid grid-cols-[1fr_1fr] gap-px bg-hair rounded-2xl overflow-hidden [box-shadow:inset_0_0_0_0.5px_var(--hair)] [&_p]:m-[6px_0_0] [&_p]:text-ink-2 [&_p]:text-pretty [@media(max-width:960px)]:grid-cols-[1fr] [&_>_div]:[background:#f9f9fa] [&_>_div]:p-[12px_14px] [&_p]:text-[13.5px] [&_p]:leading-4.75 [@media(max-height:820px)_and_(min-width:961px)]:[&_p]:text-[13px] [@media(max-height:820px)_and_(min-width:961px)]:[&_p]:leading-4.5 [@media(prefers-contrast:more)]:[&_p]:text-ink">
        <div>
          <span className="flex items-center gap-2 text-[12px] font-semibold text-ink-3 [.status.flood_&]:[color:rgb(255_255_255_/_85%)] [.st-ab_.on_&&]:text-ink">
            Dziś
          </span>
          <p>{ch.today}</p>
        </div>
        <div className="on [.progress_i&]:bg-ink [.steps_i&]:bg-ink [.st-ab_>_div&&]:bg-white [.st-ab_&_p]:text-ink [.tour-dots_i&]:w-5.5 [.tour-dots_i&]:bg-ink [.call-keys_button&_span]:bg-white [.call-keys_button&_span]:text-ink">
          <span className="flex items-center gap-2 text-[12px] font-semibold text-ink-3 [.status.flood_&]:[color:rgb(255_255_255_/_85%)] [.st-ab_.on_&&]:text-ink">
            W nowym mObywatelu
          </span>
          <p>{ch.razem}</p>
        </div>
      </div>
      <ol className="beats [list-style:none] m-[22px_0_0] p-0 relative [&_li]:grid [&_li]:grid-cols-[28px_1fr] [&_li]:gap-3 [&_li]:relative [&_li]:pb-4 [&_li:not(:last-child)::before]:[content:''] [&_li:not(:last-child)::before]:absolute [&_li:not(:last-child)::before]:left-[13.5px] [&_li:not(:last-child)::before]:top-7.5 [&_li:not(:last-child)::before]:bottom-0.5 [&_li:not(:last-child)::before]:w-px [&_li:not(:last-child)::before]:bg-hair-2 [&_li_p]:m-[4px_0_0] [&_li_p]:text-[14.5px] [&_li_p]:leading-5.25 [&_li_p]:text-ink-3 [&_li.done_p]:text-ink-2 [@media(max-height:820px)_and_(min-width:961px)]:mt-4 [@media(max-height:820px)_and_(min-width:961px)]:[&_li]:pb-3 motion-safe:[&_li_p]:[transition:color_0.25s_ease,_font-size_0.25s_var(--ease-out)] [@media(prefers-contrast:more)]:[&_li_p]:text-ink [&_li_p]:tracking-[-0.005em]">
        {beats.map(([r, t], j) => (
          <li
            key={r}
            className={
              j < cur
                ? 'done'
                : j === cur
                  ? 'now [.p12-bar_button&]:bg-ink [.beats_li&_p]:text-ink [.beats_li&_p]:text-[16px] [.beats_li&_p]:leading-5.75 [.beats_li&_p]:font-medium motion-safe:[.beats_li&_>_div]:animate-[rise_0.4s_var(--out)_both] [@media(max-height:820px)_and_(min-width:961px)]:[.beats_li&_p]:text-[15px] [@media(max-height:820px)_and_(min-width:961px)]:[.beats_li&_p]:leading-5.25'
                  : ''
            }
          >
            <button
              className="w-7 h-7 rounded-[50%] bg-white [box-shadow:inset_0_0_0_1px_var(--hair-2)] text-[12px] font-semibold text-ink-3 grid place-items-center [font-variant-numeric:tabular-nums] [.beats_li.done_&]:bg-ink [.beats_li.done_&]:text-white [.beats_li.done_&]:[box-shadow:none] [.beats_li.now_&]:bg-signal-blue [.beats_li.now_&]:text-white [.beats_li.now_&]:[box-shadow:0_0_0_4px_rgb(47_107_255_/_18%)] motion-safe:[&:active]:transform-[scale(0.97)] motion-safe:[&:active]:[transition-duration:0.1s] motion-safe:[transition:background-color_0.25s_var(--ease-out),_color_0.25s_var(--ease-out),_box-shadow_0.3s_var(--ease-out),_transform_0.16s_var(--ease-out)]"
              onClick={() => go(r, ch.p)}
              aria-label={'Krok ' + (j + 1)}
            >
              {j < cur ? I('check', 13) : j + 1}
            </button>
            <div>
              <p>{t}</p>
              {j === cur && off && (
                <button
                  className="inline-flex items-center gap-1.5 mt-2 p-[6px_12px_6px_9px] rounded-[999px] [border:0] bg-signal-blue text-white [font:inherit] [&&]:text-[13px] [&&]:font-semibold cursor-pointer motion-safe:[transition:transform_0.16s_var(--ease-out),_background-color_0.15s_ease,_box-shadow_0.2s_ease] motion-safe:[&:active]:transform-[scale(0.97)] motion-safe:[&:active]:[transition-duration:0.1s]"
                  onClick={() => go(r, ch.p)}
                >
                  {I('left', 14)}
                  <span>Wróć do tego kroku</span>
                </button>
              )}
            </div>
          </li>
        ))}
      </ol>
      {last && (
        <div className="text-[14px] font-semibold text-green m-[-4px_0_0_40px] [.story:not(:has(.st-next.ready))_&]:block! [.story:not(:has(.st-next.ready))_&]:invisible">
          {i < CHAPTERS.length - 1 ? 'Ten rozdział za Tobą.' : 'To ostatni rozdział.'}
        </div>
      )}
      <div className="st-nav flex gap-2 mt-4.5 [.story_&]:mt-12.5 [.story:has(.st-next.ready)_&]:mt-12.5">
        <button
          className="pill whitespace-nowrap h-13 rounded-[999px] bg-ink text-white text-[16px] font-semibold p-[0_22px] inline-flex items-center justify-center gap-2 [border:0] [box-shadow:none] [.attn-act_&]:text-[14px] [.attn-act_&]:p-[0_16px] [.attn-act_&]:h-9.5 [.st-nav_&]:h-11 [.st-nav_&]:text-[15px] [.st-nav_&]:p-[0_18px] [.st-nav_&:disabled]:opacity-[0.35] [.tour-btns_&]:h-11.5 [.tour-btns_&]:text-[15px] [@media(max-width:640px)]:[.tour-btns_&]:h-11 [@media(max-width:640px)]:[.tour-btns_&]:p-[0_16px] motion-safe:[transition:transform_0.16s_var(--ease-out),_background-color_0.15s_ease,_box-shadow_0.2s_ease] motion-safe:[&:active]:transform-[scale(0.97)] motion-safe:[&:active]:[transition-duration:0.1s] [.st-nav_&.ready]:[outline:2px_solid_var(--signal-blue)] [.st-nav_&.ready]:outline-offset-[3px] [.st-nav_&.ready]:[box-shadow:0_0_0_6px_rgb(47_107_255_/_18%)] motion-safe:[.st-nav_&.ready]:animate-[coach_1.6s_var(--out)_infinite]! [.w2-acts_&]:flex-1 [.w2-acts_&]:justify-center motion-safe:[.st-nav_&.ready]:[animation-iteration-count:3]! [&.pill]:bg-fill [&.pill]:text-ink [.st-nav_&.pill]:w-11 [.st-nav_&.pill]:p-0"
          disabled={i === 0}
          onClick={() => step(-1)}
          aria-label="Poprzedni rozdział"
        >
          {I('left', 18)}
        </button>
        <button
          className="pill whitespace-nowrap h-13 rounded-[999px] bg-ink text-white text-[16px] font-semibold p-[0_22px] inline-flex items-center justify-center gap-2 [border:0] [box-shadow:none] [.attn-act_&]:text-[14px] [.attn-act_&]:p-[0_16px] [.attn-act_&]:h-9.5 [.st-nav_&]:h-11 [.st-nav_&]:text-[15px] [.st-nav_&]:p-[0_18px] [.st-nav_&:disabled]:opacity-[0.35] [.tour-btns_&]:h-11.5 [.tour-btns_&]:text-[15px] [@media(max-width:640px)]:[.tour-btns_&]:h-11 [@media(max-width:640px)]:[.tour-btns_&]:p-[0_16px] motion-safe:[transition:transform_0.16s_var(--ease-out),_background-color_0.15s_ease,_box-shadow_0.2s_ease] motion-safe:[&:active]:transform-[scale(0.97)] motion-safe:[&:active]:[transition-duration:0.1s] [.st-nav_&.ready]:[outline:2px_solid_var(--signal-blue)] [.st-nav_&.ready]:outline-offset-[3px] [.st-nav_&.ready]:[box-shadow:0_0_0_6px_rgb(47_107_255_/_18%)] motion-safe:[.st-nav_&.ready]:animate-[coach_1.6s_var(--out)_infinite]! [.w2-acts_&]:flex-1 [.w2-acts_&]:justify-center motion-safe:[.st-nav_&.ready]:[animation-iteration-count:3]! st-next [.st-nav_&.pill]:relative [.st-nav_&.pill.ready::before]:absolute [.st-nav_&.pill.ready::before]:whitespace-nowrap [.st-nav_&.pill.ready::before]:bg-signal-blue [.st-nav_&.pill.ready::before]:text-white [.st-nav_&.pill.ready::before]:text-[13px] [.st-nav_&.pill.ready::before]:font-semibold [.st-nav_&.pill.ready::before]:tracking-[-0.006em] [.st-nav_&.pill.ready::before]:p-[7px_12px] [.st-nav_&.pill.ready::before]:[box-shadow:0_8px_20px_-6px_rgb(47_107_255_/_55%)] [.st-nav_&.pill.ready::before]:pointer-events-none [.st-nav_&.pill.ready::after]:[content:''] [.st-nav_&.pill.ready::after]:absolute [.st-nav_&.pill.ready::after]:[border:6px_solid_transparent] [.st-nav_&.pill.ready::after]:pointer-events-none [.st-nav_&.pill.ready::before]:[content:'Dotknij_tutaj']! [.st-nav_&.pill.ready::before]:block! [.st-nav_&.pill.ready::before]:w-auto [.st-nav_&.pill.ready::before]:h-auto [.st-nav_&.pill.ready::before]:rounded-[999px] [.st-nav_&.pill.ready::before]:left-[50%]! [.st-nav_&.pill.ready::before]:top-auto! [.st-nav_&.pill.ready::before]:bottom-[calc(100%+14px)]! [.st-nav_&.pill.ready::before]:transform-[translateX(-50%)]! [.st-nav_&.pill.ready::before]:[animation:tip-in_0.22s_cubic-bezier(0.23,_1,_0.32,_1)_both]! [.st-nav_&.pill.ready::before]:z-30 [.st-nav_&.pill.ready::after]:left-[50%]! [.st-nav_&.pill.ready::after]:top-auto! [.st-nav_&.pill.ready::after]:bottom-[calc(100%+2px)]! [.st-nav_&.pill.ready::after]:m-[0_0_0_-6px]! [.st-nav_&.pill.ready::after]:border-transparent! [.st-nav_&.pill.ready::after]:border-t-signal-blue! [.st-nav_&.pill.ready::after]:[animation:tip-in-a_0.22s_cubic-bezier(0.23,_1,_0.32,_1)_both]! [.st-nav_&.pill.ready::after]:z-30"
          onClick={() => step(1)}
        >
          {i < CHAPTERS.length - 1 ? <>Dalej: {CHAPTERS[i + 1].t}</> : 'Zakończ historię'} {I('chevron', 16)}
        </button>
      </div>
      {ch.x.length > 0 && (
        <div className="flex flex-wrap gap-1.5 items-center [&_span]:text-[13px] [&_span]:text-ink-2 [&_span]:mr-1 [&_button]:h-7 [&_button]:p-[0_11px] [&_button]:rounded-[999px] [&_button]:bg-fill [&_button]:text-[12.5px] [&_button]:font-medium [&_button]:text-ink [&_button:hover]:bg-fill-2 mt-4.5 motion-safe:[&_button]:[transition:transform_0.16s_var(--ease-out),_background-color_0.15s_ease,_box-shadow_0.2s_ease] motion-safe:[&_button:active]:transform-[scale(0.97)] motion-safe:[&_button:active]:[transition-duration:0.1s]">
          <span>Zobacz też</span>
          {ch.x.map(([t, r]) => (
            <button key={t} onClick={() => go(r, ch.p)}>
              {t}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export function Progress12({ i, goChap }: { i: number; goChap: (k: number) => void }) {
  return (
    <div className="mb-5.5 [.sheet_&]:hidden">
      <div className="text-[13px] font-medium text-ink-2 mb-2.5 [font-variant-numeric:tabular-nums] tracking-[0.005em]">
        <span>
          Rozdział {i + 1} z {CHAPTERS.length}
        </span>
      </div>
      <div className="p12-bar grid [grid-template-columns:repeat(13,_1fr)] gap-1 [&_button]:h-1.5 [&_button]:rounded-[3px] [&_button]:bg-fill-2 [&_button]:relative [&_button]:p-0 [&_button::before]:[content:''] [&_button::before]:absolute [&_button::before]:inset-[-8px_0] [&_button.done]:bg-ink-3 [&_button_span]:absolute [&_button_span]:bottom-4 [&_button_span]:left-[50%] [&_button_span]:[transform:translate(-50%,_4px)] [&_button_span]:whitespace-nowrap [&_button_span]:bg-ink [&_button_span]:text-white [&_button_span]:text-[12px] [&_button_span]:font-medium [&_button_span]:p-[5px_9px] [&_button_span]:[border-radius:8px] [&_button_span]:opacity-[0] [&_button_span]:pointer-events-none [&_button_span]:[transition:opacity_0.15s,_transform_0.2s_var(--out)] [&_button_span]:z-5 [&_button:hover_span]:opacity-[1] [&_button:hover_span]:[transform:translate(-50%,_0)] [&_button:hover]:bg-ink-2 [@media(hover:none),_(pointer:coarse)]:[&_button:hover_span]:opacity-[0] motion-safe:[&_button]:[transition:background-color_0.3s_var(--ease-out),_transform_0.16s_var(--ease-out)] motion-safe:[&_button_span]:[transition:opacity_0.15s_ease-out,_transform_0.15s_var(--ease-out)]">
        {CHAPTERS.map((ch, j) => (
          <button
            key={j}
            className={
              j < i
                ? 'done'
                : j === i
                  ? 'now [.p12-bar_button&]:bg-ink [.beats_li&_p]:text-ink [.beats_li&_p]:text-[16px] [.beats_li&_p]:leading-5.75 [.beats_li&_p]:font-medium motion-safe:[.beats_li&_>_div]:animate-[rise_0.4s_var(--out)_both] [@media(max-height:820px)_and_(min-width:961px)]:[.beats_li&_p]:text-[15px] [@media(max-height:820px)_and_(min-width:961px)]:[.beats_li&_p]:leading-5.25'
                  : ''
            }
            onClick={() => goChap(j)}
            title={ch.t}
            aria-label={'Rozdział ' + (j + 1) + ': ' + ch.t}
          >
            <span>{ch.t}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
