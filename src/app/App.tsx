import { useEffect, useRef, useState } from 'react';
import type { CSSProperties } from 'react';
import { edgeBack, leave } from '@/app/gestures';
import { Island } from '@/app/Island';
import { FULL, TABOF, TABS, Wrap, screenFor } from '@/app/routes';
import { SheetHost } from '@/app/SheetHost';
import { StoryBar, TabBar, Toast, TopBar } from '@/app/chrome';
import { useNavigation } from '@/app/hooks/useNavigation';
import { useStageZoom } from '@/app/hooks/useStageZoom';
import { useStory } from '@/app/hooks/useStory';
import { useStoryKeys } from '@/app/hooks/useStoryKeys';
import { useToast } from '@/app/hooks/useToast';
import { Progress12, StoryPanel } from '@/story/StoryPanel';
import { Tour } from '@/story/Tour';
import { TechPanel } from '@/tech/TechPanel';
import { Icon } from '@/ui/icons';
import { Wm } from '@/ui/primitives';
import type { Ctx, Persona, Sheet as SheetState, SheetRequest } from '@/types';

/**
 * The stage: story panel on the left, the phone in the middle, "how it works" on the right.
 * On phones only the phone shows, with the story folded into a bar.
 */
export function App() {
  const nav = useNavigation();
  const { route, s } = nav;
  const toast = useToast();
  const [sheet, setSheet] = useState<SheetState | null>(null);
  const [phoneEl, setPhoneEl] = useState<HTMLDivElement | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const closeSheet = (cb?: unknown) =>
    leave(
      document.querySelector('.phone .sheet'),
      document.querySelector('.phone .sheet-bg'),
      'translateY(100%)',
      240,
      () => {
        setSheet(null);
        typeof cb === 'function' && cb();
      },
    );
  const story = useStory({
    nav,
    sheet,
    onReset: () => {
      setSheet(null);
      toast.clear();
    },
  });
  useStoryKeys({ chap: story.chap, step: story.step, kbdRef: nav.kbdRef });
  useStageZoom();

  /** Navigate and start a fresh back stack (tabs, the wordmark, the story panel). */
  const goFresh = (r: string, p?: Persona) => {
    nav.clearHistory();
    nav.go(r, p);
  };
  const openHow = () => setSheet({ tech: true });
  const c: Ctx = {
    s,
    go: nav.go,
    back: nav.back,
    set: nav.set,
    toast: toast.show,
    ask: (q: string) => {
      nav.set({ q });
      nav.go('assistant');
    },
    confirm: (o: SheetRequest) => setSheet({ ...o, stage: 0 }),
    pay: (o: SheetRequest) => setSheet({ ...o, pay: true, m: 0, stage: 0 }),
  };

  // A new screen starts at the top with the large title showing.
  const [compact, setCompact] = useState(false);
  const [scrolledRoute, setScrolledRoute] = useState(route);
  if (scrolledRoute !== route) {
    setScrolledRoute(route);
    setCompact(false);
  }
  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = 0;
  }, [route]);

  const Screen = screenFor(route);
  const isTab = TABS.some(t => t[0] === route) || route === 'easy';
  const tata = s.persona === 'tata';

  const phone = (
    <div ref={setPhoneEl} className="phone" role="application" aria-label="Prototyp aplikacji">
      <Island c={c} route={route} full={FULL.has(route)} />
      <div
        className={
          'app absolute inset-0 flex flex-col [font-family:"Inter",_system-ui,_sans-serif] [font-optical-sizing:auto] [font-feature-settings:"calt",_"ss03",_"cv11"] [-webkit-font-smoothing:antialiased] bg-bg' +
          (compact ? ' compact' : '')
        }
      >
        <div className="[@media(max-width:960px)]:hidden! h-12.5 flex-none flex justify-between items-end p-[0_30px_6px] text-[14px] font-semibold text-ink [@media(max-width:960px)_and_(min-width:641px)]:[.stage.wide_&]:flex!">
          <span>15:40</span>
          <span className="flex gap-1.5 items-center">
            <Icon name="wifi" size={15} /> 82%
          </span>
        </div>
        {FULL.has(route) ? (
          <Wrap key={route} f={Screen} c={c} d="full" />
        ) : (
          <>
            <TopBar
              isTab={isTab}
              tata={tata}
              route={route}
              go={nav.go}
              back={nav.back}
              clearHistory={nav.clearHistory}
              openHow={openHow}
            />
            <div
              className="scroll flex-1 overflow-y-auto overflow-x-hidden scrollbar-none [&::-webkit-scrollbar]:hidden pr-5 pb-28 pl-5 -mt-13 pt-14 [@media(max-width:960px)]:pb-42.5 [&.edge]:overflow-hidden"
              ref={scrollRef}
              style={s.fs && s.fs !== 1 ? ({ '--fs': s.fs } as CSSProperties) : undefined}
              onPointerDown={e => !isTab && edgeBack(e, nav.back)}
              onScroll={e => {
                const el = e.currentTarget as HTMLElement;
                const st = el.scrollTop;
                el.parentElement?.classList.toggle('scrolled', st > 4);
                const v = st > 48;
                if (v !== compact) setCompact(v);
              }}
            >
              <Wrap key={route} f={Screen} c={c} d={nav.dir} />
            </div>
            {!tata && (
              <TabBar route={route} curTab={TABOF(route)} go={nav.go} clearHistory={nav.clearHistory} />
            )}
          </>
        )}
        {!story.tour && (
          <StoryBar
            route={route}
            chap={story.chap}
            lastBeat={story.lastBeat}
            go={nav.go}
            step={story.step}
            openHow={openHow}
          />
        )}
        {toast.view && <Toast view={toast.view} onClose={toast.clear} />}
        {sheet && (
          <SheetHost
            sheet={sheet}
            setSheet={setSheet}
            close={closeSheet}
            container={phoneEl}
            route={route}
            chap={story.chap}
            lastBeat={story.lastBeat}
            go={goFresh}
            step={story.step}
          />
        )}
      </div>
    </div>
  );

  return (
    <div className="stage min-h-full grid [grid-template-columns:minmax(320px,_520px)_auto] justify-center gap-18 items-center [padding-left:max(32px,_env(safe-area-inset-left,_0px))] [padding-right:max(32px,_env(safe-area-inset-right,_0px))] [@media(max-width:960px)]:block [@media(max-width:960px)]:pr-0 [@media(max-width:960px)]:pl-0 [@media(max-width:1279px)]:[&.wide]:[grid-template-areas:'rail_phone'_'side_phone'] [@media(max-width:1279px)]:[&.wide_.phone]:[grid-area:phone] py-6 bg-bg [&.wide]:relative [&.wide]:gap-18 [&.wide]:pb-14 [@media(max-width:960px)]:[&.wide]:pr-0 [@media(max-width:960px)]:[&.wide]:pb-0 [@media(max-width:960px)]:[&.wide]:pl-0 [&.wide_.phone]:[filter:drop-shadow(0_50px_40px_rgb(11_13_18_/_8%))] [&.wide_.phone]:sticky [&.wide_.phone]:top-6 [&.wide_.phone]:[zoom:var(--pz,_1)] [&.wide]:[grid-template-columns:minmax(340px,_440px)_392px_minmax(300px,_380px)] [&.wide]:[align-items:start] [&.wide]:pt-23 [@media(max-width:1279px)]:[&.wide]:[grid-template-columns:minmax(320px,_460px)_392px] [@media(max-width:1439px)_and_(min-width:1280px)]:[&.wide]:gap-11 [@media(max-width:1439px)_and_(min-width:1280px)]:[&.wide]:[grid-template-columns:minmax(320px,_400px)_auto_minmax(280px,_340px)] [@media(max-height:820px)_and_(min-width:961px)]:[&.wide]:pt-18 [@media(max-width:1279px)_and_(min-width:961px)]:[&.wide]:[grid-template-columns:minmax(320px,_1fr)_auto] [@media(max-width:1279px)_and_(min-width:961px)]:[&.wide]:[grid-template-areas:'rail_phone'_'side_phone'] [@media(max-width:1279px)_and_(min-width:961px)]:[&.wide]:gap-[28px_48px] [@media(max-width:1279px)_and_(min-width:961px)]:[&.wide]:[align-items:start] [@media(max-width:1279px)_and_(min-width:961px)]:[&.wide]:px-8 [@media(max-width:1279px)_and_(min-width:961px)]:[&.wide_.phone]:[grid-area:phone] [@media(max-width:960px)_and_(min-width:641px)]:[&.wide]:grid! [@media(max-width:960px)_and_(min-width:641px)]:[&.wide]:grid-cols-[1fr] [@media(max-width:960px)_and_(min-width:641px)]:[&.wide]:justify-items-center [@media(max-width:960px)_and_(min-width:641px)]:[&.wide]:p-[76px_24px_24px]! [@media(max-width:960px)_and_(min-width:641px)]:[&.wide]:min-h-dvh [@media(max-width:960px)_and_(min-width:641px)]:[&.wide_.phone]:w-98! [@media(max-width:960px)_and_(min-width:641px)]:[&.wide_.phone]:h-211.5! [@media(max-width:960px)_and_(min-width:641px)]:[&.wide_.phone]:rounded-[56px]! [@media(max-width:960px)_and_(min-width:641px)]:[&.wide_.phone]:[box-shadow:0_0_0_1px_#1a1c22,_0_0_0_9px_var(--ink),_0_0_0_10px_#2a2d35,_0_60px_120px_-40px_rgb(11_13_18_/_35%)]! [@media(max-width:960px)_and_(min-width:641px)]:[&.wide_.phone]:relative [@media(max-width:960px)_and_(min-width:641px)]:[&.wide_.phone]:top-0 [@media(max-width:640px)]:[&.wide_.phone]:w-full! [@media(max-width:640px)]:[&.wide_.phone]:h-dvh! [@media(max-width:640px)]:[&.wide_.phone]:rounded-none! [@media(max-width:640px)]:[&.wide_.phone]:[box-shadow:none]! [@media(max-width:640px)]:[&.wide_.phone]:filter-none! [@media(max-width:640px)]:[&.wide_.phone]:relative [@media(max-width:640px)]:[&.wide_.phone]:top-0 [@media(max-width:640px)]:[&.wide_.phone]:zoom-[1] [@media(max-width:640px)]:[&.wide]:p-0! wide [&.pill]:w-full">
      <header className="top8 absolute top-7 left-10 right-10 flex justify-between items-center text-[13px] text-ink-2 [@media(max-width:960px)]:hidden [@media(max-height:820px)_and_(min-width:961px)]:top-5 [@media(max-width:960px)_and_(min-width:641px)]:flex! [@media(max-width:960px)_and_(min-width:641px)]:left-6 [@media(max-width:960px)_and_(min-width:641px)]:right-6 [@media(max-width:960px)_and_(min-width:641px)]:top-5.5 [@media(max-width:960px)_and_(min-width:641px)]:[&_>_span]:text-[12px] [@media(max-width:640px)]:hidden">
        <Wm />
        <span>
          <button
            className="text-[13px] text-ink font-semibold [text-decoration:underline] underline-offset-[3px] [&&]:decoration-hair-2"
            onClick={() => story.setTour('intro')}
          >
            Wstęp
          </button>{' '}
          ·{' '}
          <button
            className="text-[13px] text-ink font-semibold [text-decoration:underline] underline-offset-[3px] [&&]:decoration-hair-2"
            onClick={() => story.goChap(story.chap)}
          >
            Zacznij rozdział od nowa
          </button>{' '}
          · Niezależna koncepcja na mObywatel Challenge · osoby i dane są fikcyjne
        </span>
      </header>
      <aside className="flex flex-col min-w-0 [&_.mark]:flex [&_.mark]:items-center [&_.mark]:gap-2.5 [&_.mark]:tracking-[-0.02em] [@media(max-width:960px)]:hidden [@media(max-width:1279px)]:[.stage.wide_&]:[grid-area:rail] [@media(max-width:1279px)]:[.stage.wide_&]:[align-self:end] [&_.mark]:font-sans [&_.mark]:font-semibold [&_.mark]:text-[19px] gap-0 [@media(max-width:1279px)_and_(min-width:961px)]:[.stage.wide_&]:[grid-area:rail] [@media(max-width:960px)_and_(min-width:641px)]:[.stage.wide_&]:hidden!">
        <Progress12 i={story.chap} goChap={story.goChap} />
        <StoryPanel i={story.chap} route={route} lastBeat={story.lastBeat} go={goFresh} step={story.step} />
      </aside>
      {phone}
      {story.tour && (
        <Tour
          key={story.tour}
          mode={story.tour}
          onClose={() => story.closeTour()}
          onStart={() => story.closeTour(() => story.goChap(0))}
        />
      )}
      <aside className="self-center max-h-none overflow-visible flex flex-col [&_.flows]:gap-0 [&_.flows_button]:[transition:color_0.15s] [@media(max-width:1279px)]:[.stage.wide_&]:[grid-area:side] [@media(max-width:1279px)]:[.stage.wide_&]:block [@media(max-width:1279px)]:[.stage.wide_&&]:[grid-column:1/-1] [@media(max-width:1279px)]:[&_.flows]:grid-cols-[1fr_1fr] [@media(max-width:1279px)]:[&_.flows]:gap-x-4.5 [@media(max-width:960px)]:hidden! [&_.flows]:[border-top:1px_solid_var(--hair-2)] [&_.flows]:mt-2.5 [&_.flows]:flex-col [&_.flows]:hidden [&_.flows_button]:relative [&_.flows_button]:p-[0_0_0_12px] [&_.flows_button]:font-medium [&_.flows_button]:text-ink-2 [&_.flows_button]:[border-bottom:1px_solid_var(--hair)] [&_.flows_button]:[text-decoration:none]! [&_.flows_button]:gap-3 [&_.flows_button]:items-center [&_.flows_button]:h-9.5 [&_.flows_button]:text-[14px] [&_.flows_button:hover]:text-ink [&_.flows_button[aria-current='step']]:text-ink [&_.flows_button[aria-current='step']]:font-semibold [&_.flows_button[aria-current='step']::before]:[content:''] [&_.flows_button[aria-current='step']::before]:absolute [&_.flows_button[aria-current='step']::before]:left-0 [&_.flows_button[aria-current='step']::before]:top-3 [&_.flows_button[aria-current='step']::before]:bottom-3 [&_.flows_button[aria-current='step']::before]:w-0.5 [&_.flows_button[aria-current='step']::before]:rounded-xs [&_.flows_button[aria-current='step']::before]:bg-ink [.stage.wide_&]:[align-self:start] [.stage.wide_&]:sticky [.stage.wide_&]:top-6 [.stage.wide_&]:mt-7.5 [@media(max-width:1279px)_and_(min-width:961px)]:[.stage.wide_&]:[grid-area:side] [@media(max-width:1279px)_and_(min-width:961px)]:[.stage.wide_&]:static [@media(max-width:1279px)_and_(min-width:961px)]:[.stage.wide_&]:mt-0 [@media(max-width:1279px)_and_(min-width:961px)]:[.stage.wide_&]:block [@media(max-width:960px)_and_(min-width:641px)]:[.stage.wide_&]:hidden!">
        <div
          className="how-card bg-white [box-shadow:0_0_0_0.5px_var(--hair),_0_20px_50px_-30px_rgb(11_13_18_/_25%)] [&_.sys]:text-[15px] [&_.what]:text-[14px] [&_.what]:leading-5 motion-safe:animate-[rise_0.45s_var(--out)_both] p-[24px_24px_20px] rounded-[28px]"
          key={route}
        >
          <div className="flex items-center text-[12.5px] font-semibold text-signal-blue mb-2 gap-1.5">
            <Icon name="info" size={16} /> Jak to działa na tym ekranie
          </div>
          <TechPanel route={route} />
        </div>
      </aside>
    </div>
  );
}
