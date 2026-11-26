import { Sheet } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import type { CSSProperties } from 'react';
import { Field, FieldValue } from '@/components/ui/field';
import { Caption, Subtitle } from '@/components/ui/typography';
import { Actions, Button } from '@/components/ui/button';
import { useEffect, useRef, useState } from 'react';
import { edgeBack, leave, sheetDrag } from '@/app/gestures';
import { Island } from '@/app/Island';
import { FULL, TABOF, TABS, Wrap, isRoute, screenFor } from '@/app/routes';
import type { Route } from '@/app/routes';
import { reducedMotion } from '@/lib/env';
import { PayDone, PaySheet } from '@/screens/money/pay';
import { BEATS, CHAPTERS, beatOf, chapterOf } from '@/story/chapters';
import { coach } from '@/story/coach';
import { Progress12, StoryPanel } from '@/story/StoryPanel';
import { Tour } from '@/story/Tour';
import { TechPanel } from '@/tech/TechPanel';
import { Confirming } from '@/ui/controls';
import { I } from '@/ui/icons';
import { Wm } from '@/ui/primitives';
import type { AppState, Ctx, Persona, Sheet as SheetState, SheetRequest, ToastInput } from '@/types';

const startPersona = (r: string): Persona =>
  r === 'easy' || r === 'easy-doc' || r === 'easy-rx' || r === 'easy-voice' ? 'tata' : 'anna';

const hashRoute = () => {
  const h = (location.hash || '').slice(1);
  return isRoute(h) ? h : null;
};

export function App() {
  const [route, setRoute] = useState<Route>(hashRoute() || 'today');
  const [, setHist] = useState<Route[]>([]);
  const [dir, setDir] = useState('tab');
  const [s, setS] = useState<AppState>({ persona: startPersona(hashRoute() || 'today'), inboxNew: 2 });
  const [sheet, setSheet] = useState<SheetState | null>(null);
  const [phoneEl, setPhoneEl] = useState<HTMLDivElement | null>(null);
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
  const [toast, setToast] = useState<ToastInput | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const go = (r: string, persona?: Persona) => {
    if (!isRoute(r)) return;
    if (persona) setS(x => ({ ...x, persona, easy: persona === 'tata' }));
    setDir(kbd.current ? 'kbd' : TABS.some(t => t[0] === r) ? 'tab' : '');
    kbd.current = false;
    setHist(h => [...h.slice(-30), route]);
    setRoute(r);
    try {
      history.replaceState(null, '', '#' + r);
    } catch {}
  };
  const back = () => {
    setDir('back');
    setHist(h => {
      const p = h[h.length - 1] || (s.persona === 'tata' ? 'easy' : 'today');
      setRoute(p);
      try {
        history.replaceState(null, '', '#' + p);
      } catch {}
      return h.slice(0, -1);
    });
  };
  const set = (patch: Partial<AppState>) => setS(x => ({ ...x, ...patch }));
  const toastT = useRef<ReturnType<typeof setTimeout>[]>([]);
  const showToast = (t: ToastInput) => {
    toastT.current.forEach(clearTimeout);
    setToast(t);
    toastT.current = [
      setTimeout(() => {
        const el = document.querySelector('.phone .toast');
        el &&
          !reducedMotion() &&
          el.animate(
            [
              { opacity: 1, transform: 'none' },
              { opacity: 0, transform: 'translateY(12px) scale(.98)' },
            ],
            { duration: 180, easing: 'cubic-bezier(.23,1,.32,1)', fill: 'forwards' },
          );
      }, 3000),
      setTimeout(() => setToast(null), 3200),
    ];
  };
  const kbd = useRef(false);
  const c: Ctx = {
    s,
    go,
    back,
    set,
    toast: showToast,
    ask: (q: string) => {
      set({ q });
      go('assistant');
    },
    confirm: (o: SheetRequest) => setSheet({ ...o, stage: 0 }),
    pay: (o: SheetRequest) => setSheet({ ...o, pay: true, m: 0, stage: 0 }),
  };

  useEffect(() => {
    const f = () => {
      const r = hashRoute();
      if (r && r !== route) {
        setRoute(r);
        if (r === 'easy') setS(x => ({ ...x, persona: 'tata' }));
        if (TABS.some(t => t[0] === r)) setS(x => ({ ...x, persona: 'anna' }));
      }
    };
    window.addEventListener('hashchange', f);
    return () => window.removeEventListener('hashchange', f);
  }, [route]);
  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = 0;
  }, [route]);
  useEffect(() => {
    if (sheet && sheet.stage === 1) {
      const t = setTimeout(
        () => {
          if (sheet.pay) {
            setSheet({ ...sheet, stage: 2 });
            return;
          }
          const d = sheet.done;
          closeSheet(d);
        },
        reducedMotion() ? 600 : 1700,
      );
      return () => clearTimeout(t);
    }
  }, [sheet]);

  const Screen = screenFor(route);
  const isTab = TABS.some(t => t[0] === route) || route === 'easy';
  const tata = s.persona === 'tata';
  const curTab = TABOF(route);

  const [menu, setMenu] = useState(false);
  const [play, setPlay] = useState(false);
  const [compact, setCompact] = useState(false);
  const [ttl, setTtl] = useState('');
  useEffect(() => {
    const t = setTimeout(() => {
      const h = document.querySelector('.phone .scroll h1');
      const x = h ? (h.textContent || '').trim() : '';
      setTtl(x.length > 26 ? x.slice(0, 24).replace(/\s+\S*$/, '') + '…' : x);
    }, 60);
    return () => clearTimeout(t);
  }, [route]);
  const [tour, setTour] = useState<'intro' | 'outro' | null>(location.hash ? null : 'intro');
  const closeTour = (cb?: () => void) =>
    leave(
      document.querySelector('.tour'),
      document.querySelector('.tour-bg'),
      innerWidth <= 640 ? 'translateY(100%)' : 'translateY(10px) scale(.98)',
      innerWidth <= 640 ? 260 : 180,
      () => {
        setTour(null);
        cb && cb();
      },
    );
  useEffect(() => {
    const f = () => {
      const w = innerWidth,
        h = innerHeight;
      const z = w <= 640 ? 1 : Math.min(1, Math.max(0.62, (h - (w <= 960 ? 96 : 120)) / 846));
      document.documentElement.style.setProperty('--pz', z.toFixed(3));
    };
    f();
    addEventListener('resize', f);
    return () => removeEventListener('resize', f);
  }, []);
  useEffect(() => setCompact(false), [route]);
  const [chap, setChap] = useState(Math.max(0, chapterOf(route)));
  useEffect(() => {
    if (beatOf(chap, route) >= 0) return;
    if (TABS.some(t => t[0] === route)) return;
    const k = chapterOf(route);
    if (k >= 0 && k !== chap) setChap(k);
  }, [route]);
  useEffect(() => {
    if (tour) return;
    const t = setTimeout(() => coach(chap, route), route === 'lock' ? 4200 : 700);
    return () => clearTimeout(t);
  }, [route, tour, chap]);
  useEffect(() => {
    const f = () => !tour && coach(chap, route, true);
    window.addEventListener('coach', f);
    return () => window.removeEventListener('coach', f);
  }, [chap, route, tour]);
  useEffect(() => {
    if (tour || !sheet || sheet.tech || sheet.stage !== 0) return;
    const t = setTimeout(() => coach(chap, route, true), 450);
    return () => clearTimeout(t);
  }, [sheet]);
  /* M1: the sheet glides to its new height when its content changes (confirm -> loader -> receipt) */
  useEffect(() => {
    if (!sheet || !window.ResizeObserver) return;
    let ro: ResizeObserver | undefined;
    // The sheet mounts through a portal a frame later, so look for it after the next paint.
    const raf = requestAnimationFrame(() => {
      const sh = document.querySelector<HTMLElement>('.phone .sheet');
      if (sh) ro = glide(sh);
    });
    return () => {
      cancelAnimationFrame(raf);
      ro?.disconnect();
    };
  }, [!!sheet]);
  const glide = (sh: HTMLElement) => {
    let h = sh.offsetHeight,
      busy = false;
    const ro = new ResizeObserver(() => {
      const nh = sh.offsetHeight;
      if (Math.abs(nh - h) < 4 || busy || reducedMotion()) {
        h = nh;
        return;
      }
      busy = true;
      sh.animate([{ height: h + 'px' }, { height: nh + 'px' }], {
        duration: 300,
        easing: 'cubic-bezier(.32,.72,0,1)',
      }).onfinish = () => {
        busy = false;
      };
      h = nh;
    });
    ro.observe(sh);
    return ro;
  };
  const hadSheet = useRef(false);
  useEffect(() => {
    if (sheet) {
      hadSheet.current = true;
      return;
    }
    if (!hadSheet.current || tour) return;
    hadSheet.current = false;
    const t = setTimeout(() => coach(chap, route, true), 320);
    return () => clearTimeout(t);
  }, [sheet]);
  const [lastBeat, setLastBeat] = useState(0);
  const lbChap = useRef(chap);
  useEffect(() => {
    const b = beatOf(chap, route);
    if (b >= 0) setLastBeat(b);
    else if (lbChap.current !== chap) setLastBeat(0);
    lbChap.current = chap;
  }, [route, chap]);
  const goChap = (k: number) => {
    const ch = CHAPTERS[k];
    try {
      history.pushState({ chap: k }, '', '#' + ch.r[0]);
    } catch {}
    setSheet(null);
    setMenu(false);
    setToast(null);
    setS({ persona: ch.p || 'anna', inboxNew: 2 });
    setChap(k);
    go(ch.r[0], ch.p);
    setHist([]);
    setTimeout(() => {
      const sc = document.querySelector('.phone .scroll');
      sc && (sc.scrollTop = 0);
    }, 0);
  };
  const step = (d: number) => {
    if (chap + d >= CHAPTERS.length) {
      setPlay(false);
      setTour('outro');
      return;
    }
    goChap(Math.max(0, chap + d));
  };
  useEffect(() => {
    if (!play) return;
    const t = setTimeout(() => step(1), 9000);
    return () => clearTimeout(t);
  }, [play, chap]);
  useEffect(() => {
    const f = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        // An open sheet handles Escape itself (see Sheet's onDismiss).
        setMenu(false);
        return;
      }
      if ((e.target as HTMLElement).tagName === 'INPUT') return;
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        kbd.current = true;
        step(1);
      }
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        kbd.current = true;
        step(-1);
      }
    };
    window.addEventListener('keydown', f);
    return () => window.removeEventListener('keydown', f);
  }, [chap]);
  const MENU: [Route, string][] = [
    ['today', 'Dziś'],
    ['matters', 'Sprawy'],
    ['family', 'Bliscy'],
    ['safety', 'Ochrona'],
    ['docs', 'Dokumenty'],
    ['profile', 'Profil i zaufanie'],
    ['roadmap', 'Co dalej'],
    ['about', 'O koncepcji'],
  ];

  const toastView = toast === null ? null : typeof toast === 'string' ? { t: toast, undo: undefined } : toast;

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
          <span className="flex gap-1.5 items-center">{I('wifi', 15)} 82%</span>
        </div>
        {FULL.has(route) ? (
          <Wrap key={route} f={Screen} c={c} d="full" />
        ) : (
          <>
            <div className="topbar flex-none flex items-center justify-between min-h-11 h-13 p-[0_20px] relative bg-transparent [-webkit-backdrop-filter:none] [transition:background-color_0.2s,_box-shadow_0.2s] z-16 [@media(prefers-reduced-transparency:reduce)]:[-webkit-backdrop-filter:none]! [@media(prefers-reduced-transparency:reduce)]:bg-bg [@media(prefers-contrast:more)]:[box-shadow:0_0_0_1px_var(--ink)] [.app.scrolled_&]:[transition:box-shadow_0.2s] [.app.scrolled_&]:[background:rgb(244_244_246_/_94%)]! [.app.scrolled_&]:[-webkit-backdrop-filter:blur(20px)_saturate(160%)]! [.app.scrolled_&]:[box-shadow:0_0.5px_0_rgb(20_20_40_/_12%)]! [.app.compact_&]:[background:rgb(244_244_246_/_94%)]! [.app.compact_&]:[-webkit-backdrop-filter:blur(20px)_saturate(160%)]! [.app.compact_&]:[box-shadow:0_0.5px_0_rgb(20_20_40_/_12%)]!">
              {isTab ? (
                <button
                  className="flex items-center [&_em]:italic [&_em]:font-normal [&_em]:text-ink-2 text-[17px] font-semibold tracking-[-0.01em] gap-2 [&_em]:hidden font-[inherit] p-0"
                  onClick={() => {
                    setHist([]);
                    go(tata ? 'easy' : 'today');
                  }}
                >
                  <Wm />
                </button>
              ) : (
                <button
                  className="flex items-center gap-0 -ml-2 text-ink text-[16px] font-medium"
                  onClick={back}
                >
                  {I('left', 22)}
                  <span>Wstecz</span>
                </button>
              )}
              {!tata && (
                <span className="absolute left-[50%] [transform:translate(-50%,_4px)] font-semibold tracking-[-0.015em] opacity-[0] pointer-events-none [.app.compact_&]:opacity-[1] [.app.compact_&]:[transform:translate(-50%,_0)] whitespace-nowrap overflow-hidden text-ellipsis max-w-37.5 text-[15px] [transition:opacity_0.18s_var(--out)_0.08s,_transform_0.22s_var(--out)_0.08s] [.app:not(.compact)_&]:[transition:opacity_0.1s_var(--out),_transform_0.1s_var(--out)]">
                  {isTab ? (TABS.find(t => t[0] === route)?.[1] ?? '') : ttl}
                </span>
              )}
              <div className="flex items-center">
                <button
                  className="inline-flex items-center gap-1.25 rounded-[999px] text-[12.5px] font-medium mr-1.5 [@media(min-width:1280px)]:hidden [@media(min-width:961px)]:hidden! [@media(max-width:960px)]:inline-flex! p-0 justify-center [border:0] w-8 h-8 [background:rgb(11_13_18_/_5%)] text-ink motion-safe:[transition:transform_0.16s_var(--ease-out),_background-color_0.15s_ease,_box-shadow_0.2s_ease] motion-safe:[&:active]:transform-[scale(0.97)] motion-safe:[&:active]:[transition-duration:0.1s]"
                  aria-label="Jak to działa"
                  onClick={() => setSheet({ tech: true })}
                >
                  {I('info', 18)}
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
            <div
              className="scroll flex-1 overflow-y-auto overflow-x-hidden scrollbar-none [&::-webkit-scrollbar]:hidden pr-5 pb-28 pl-5 -mt-13 pt-14 [@media(max-width:960px)]:pb-42.5 [&.edge]:overflow-hidden"
              ref={scrollRef}
              style={s.fs && s.fs !== 1 ? ({ '--fs': s.fs } as CSSProperties) : undefined}
              onPointerDown={e => !isTab && edgeBack(e, back)}
              onScroll={e => {
                const el = e.currentTarget as HTMLElement;
                const st = el.scrollTop;
                el.parentElement?.classList.toggle('scrolled', st > 4);
                const v = st > 48;
                if (v !== compact) setCompact(v);
              }}
            >
              <Wrap key={route} f={Screen} c={c} d={dir} />
            </div>
            {!tata && (
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
                      setHist([]);
                      go(r);
                    }}
                  >
                    {I(ic, 24)}
                    <span>{t}</span>
                  </button>
                ))}
              </nav>
            )}
          </>
        )}
        {!tour && (
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
                else setSheet({ tech: true });
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
              {I('chevron', 18)}
            </button>
          </div>
        )}
        {menu && (
          <div
            className="absolute inset-0 z-45 [background:rgb(235_235_238_/_60%)] [-webkit-backdrop-filter:blur(14px)] flex items-start justify-end p-[56px_14px_14px] motion-safe:animate-[fade_0.2s_ease-out_both] [@media(prefers-reduced-transparency:reduce)]:[-webkit-backdrop-filter:none]!"
            onClick={e => e.target === e.currentTarget && setMenu(false)}
          >
            <div
              className="menu bg-surface rounded-[30px] [box-shadow:var(--shadow)] w-full p-[18px_18px_16px] text-center [&_.x]:ml-auto [&_.x]:grid [&_.x]:place-items-center [&_.x]:w-8.5 [&_.x]:h-8.5 [&_.x]:rounded-[50%] [&_.x]:bg-bg [&_nav]:flex [&_nav]:flex-col [&_nav]:gap-1.5 [&_nav]:m-[6px_0_18px] [&_nav_button]:text-[25px] [&_nav_button]:font-medium [&_nav_button]:tracking-[-0.03em] [&_nav_button]:text-center [&_nav_button]:text-ink [&_nav_button[aria-current='page']]:[text-decoration:underline] [&_nav_button[aria-current='page']]:underline-offset-[5px] [&&_nav_button[aria-current='page']]:decoration-[1.5px] motion-safe:origin-[top_right] motion-safe:animate-[menu-in_0.3s_var(--ease-out)_both] motion-safe:[&_nav_button]:animate-[fade-up_0.36s_var(--ease-out)_both] motion-safe:[&_nav_button:nth-child(2)]:[animation-delay:0.025s] motion-safe:[&_nav_button:nth-child(3)]:[animation-delay:0.05s] motion-safe:[&_nav_button:nth-child(4)]:[animation-delay:0.075s] motion-safe:[&_nav_button:nth-child(5)]:[animation-delay:0.1s] motion-safe:[&_nav_button:nth-child(n_+_6)]:[animation-delay:0.125s]"
              role="dialog"
              aria-label="Menu"
            >
              <button className="x" aria-label="Zamknij" onClick={() => setMenu(false)}>
                {I('x', 16)}
              </button>
              <nav>
                {MENU.map(([r, t]) => (
                  <button
                    key={r}
                    aria-current={
                      route === r || (curTab === r && TABS.some(x => x[0] === r) && route !== 'profile')
                        ? 'page'
                        : undefined
                    }
                    onClick={() => {
                      setMenu(false);
                      setHist([]);
                      go(r);
                    }}
                  >
                    {t}
                  </button>
                ))}
              </nav>
              <div className="[.menu_&]:bg-bg [.menu_&]:rounded-2xl [.menu_&]:p-3 [.menu_&]:text-[11.5px] [.menu_&]:text-ink-2 [.menu_&]:flex [.menu_&]:flex-col [.menu_&]:items-center [.menu_&]:gap-1.5">
                <span className="w-4 h-2.75 rounded-[3px] mr-2 [background:linear-gradient(#fff_50%,_var(--red)_50%)] [box-shadow:0_0_0_0.5px_rgb(11_13_18_/_22%)] inline-block flex-none [.d-rp_&]:w-3.5 [.d-rp_&]:h-2.5 [.d-rp_&]:mr-1.75 [.d-rp_&]:[box-shadow:none]"></span>
                <span>
                  Niezależna koncepcja na mObywatel Challenge.
                  <br />
                  To nie jest oficjalna aplikacja.
                </span>
              </div>
            </div>
          </div>
        )}
        {toastView && (
          <div
            className={
              'toast absolute left-4 right-4 text-white z-50 [box-shadow:var(--shadow)] motion-safe:animate-[toast-in_0.34s_var(--ease-out)_both] [backdrop-filter:blur(10px)] bottom-23 bg-ink rounded-[999px] p-[12px_18px] text-[14px] [@media(max-width:960px)]:bottom-37.5 [@media(prefers-reduced-transparency:reduce)]:[-webkit-backdrop-filter:none]! [&.has-undo]:flex [&.has-undo]:items-center [&.has-undo]:gap-3.5 [&.has-undo]:p-[8px_8px_8px_18px]' +
              (toastView.undo ? ' has-undo' : '')
            }
            role="status"
          >
            {toastView.t}
            {toastView.undo && (
              <button
                className="inline-flex items-center gap-1.5 [background:rgb(255_255_255_/_14%)] text-white rounded-[999px] p-[7px_12px] text-[13.5px] font-semibold whitespace-nowrap [transition:transform_0.16s_var(--out)] [&:active]:transform-[scale(0.97)]"
                onClick={() => {
                  toastView.undo?.();
                  setToast(null);
                }}
              >
                {I('undo', 15)} Cofnij
              </button>
            )}
          </div>
        )}
        {sheet && (
          <Sheet
            container={phoneEl}
            title={sheet.t || 'Jak to działa'}
            onDismiss={sheet.tech || sheet.stage === 0 ? () => closeSheet() : undefined}
            onPointerDown={e => sheetDrag(e, closeSheet)}
          >
            {sheet.pay && sheet.stage === 0 ? (
              <PaySheet sheet={sheet} setSheet={setSheet} close={() => closeSheet()} />
            ) : sheet.pay && sheet.stage === 2 ? (
              <PayDone sheet={sheet} close={() => closeSheet(sheet.done)} />
            ) : sheet.tech ? (
              <div>
                <StoryPanel
                  i={chap}
                  route={route}
                  lastBeat={lastBeat}
                  go={(r: string, p?: Persona) => {
                    closeSheet(() => {
                      setHist([]);
                      go(r, p);
                    });
                  }}
                  step={(d: number) => {
                    closeSheet(() => step(d));
                  }}
                />
                <TechPanel route={route} />
                <Actions>
                  <Button variant="secondary" onClick={() => closeSheet()}>
                    Zamknij
                  </Button>
                </Actions>
              </div>
            ) : sheet.stage === 0 ? (
              <div>
                <div className="[.sheet_&]:mb-2.5 [.sheet_&]:text-ink-2 [.sheet_&]:font-semibold [.sheet_&]:text-[13px] [.sheet_&]:normal-case! [.sheet_&]:[letter-spacing:0]! [.pay8_&&]:mb-1.5">
                  Czy te dane są poprawne?
                </div>
                <Subtitle className={cn('mb-3', sheet.big && 'text-[30px]')}>{sheet.t}</Subtitle>
                <div className="rounded-[22px] bg-white">
                  {(sheet.items || []).map(i => (
                    <Field key={i} className={cn(sheet.big && 'text-lg')}>
                      <FieldValue className="flex gap-2.5 items-start">
                        <span className="text-ink mt-0.5">{I('check', 16)}</span>
                        <span>{i}</span>
                      </FieldValue>
                    </Field>
                  ))}
                </div>
                <Caption className="mt-3">
                  Potwierdzasz twarzą lub kodem PIN. To jest Twój podpis. Nic nie zostanie wysłane wcześniej.
                </Caption>
                <Actions row>
                  <Button variant="secondary" onClick={() => closeSheet()}>
                    Nie, popraw
                  </Button>
                  <Button onClick={() => setSheet({ ...sheet, stage: 1 })}>{sheet.ok}</Button>
                </Actions>
              </div>
            ) : (
              <Confirming
                steps={sheet.pay ? ['Potwierdzam, że to Ty', 'Łączę z bankiem', 'Płacę'] : sheet.steps}
              />
            )}
          </Sheet>
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
            onClick={() => setTour('intro')}
          >
            Wstęp
          </button>{' '}
          ·{' '}
          <button
            className="text-[13px] text-ink font-semibold [text-decoration:underline] underline-offset-[3px] [&&]:decoration-hair-2"
            onClick={() => goChap(chap)}
          >
            Zacznij rozdział od nowa
          </button>{' '}
          · Niezależna koncepcja na mObywatel Challenge · osoby i dane są fikcyjne
        </span>
      </header>
      <aside className="flex flex-col min-w-0 [&_.mark]:flex [&_.mark]:items-center [&_.mark]:gap-2.5 [&_.mark]:tracking-[-0.02em] [@media(max-width:960px)]:hidden [@media(max-width:1279px)]:[.stage.wide_&]:[grid-area:rail] [@media(max-width:1279px)]:[.stage.wide_&]:[align-self:end] [&_.mark]:font-sans [&_.mark]:font-semibold [&_.mark]:text-[19px] gap-0 [@media(max-width:1279px)_and_(min-width:961px)]:[.stage.wide_&]:[grid-area:rail] [@media(max-width:960px)_and_(min-width:641px)]:[.stage.wide_&]:hidden!">
        <Progress12 i={chap} goChap={goChap} />
        <StoryPanel
          i={chap}
          route={route}
          lastBeat={lastBeat}
          go={(r: string, p?: Persona) => {
            setHist([]);
            go(r, p);
          }}
          step={step}
        />
      </aside>
      {phone}
      {tour && (
        <Tour key={tour} mode={tour} onClose={() => closeTour()} onStart={() => closeTour(() => goChap(0))} />
      )}
      <aside className="self-center max-h-none overflow-visible flex flex-col [&_.flows]:gap-0 [&_.flows_button]:[transition:color_0.15s] [@media(max-width:1279px)]:[.stage.wide_&]:[grid-area:side] [@media(max-width:1279px)]:[.stage.wide_&]:block [@media(max-width:1279px)]:[.stage.wide_&&]:[grid-column:1/-1] [@media(max-width:1279px)]:[&_.flows]:grid-cols-[1fr_1fr] [@media(max-width:1279px)]:[&_.flows]:gap-x-4.5 [@media(max-width:960px)]:hidden! [&_.flows]:[border-top:1px_solid_var(--hair-2)] [&_.flows]:mt-2.5 [&_.flows]:flex-col [&_.flows]:hidden [&_.flows_button]:relative [&_.flows_button]:p-[0_0_0_12px] [&_.flows_button]:font-medium [&_.flows_button]:text-ink-2 [&_.flows_button]:[border-bottom:1px_solid_var(--hair)] [&_.flows_button]:[text-decoration:none]! [&_.flows_button]:gap-3 [&_.flows_button]:items-center [&_.flows_button]:h-9.5 [&_.flows_button]:text-[14px] [&_.flows_button:hover]:text-ink [&_.flows_button[aria-current='step']]:text-ink [&_.flows_button[aria-current='step']]:font-semibold [&_.flows_button[aria-current='step']::before]:[content:''] [&_.flows_button[aria-current='step']::before]:absolute [&_.flows_button[aria-current='step']::before]:left-0 [&_.flows_button[aria-current='step']::before]:top-3 [&_.flows_button[aria-current='step']::before]:bottom-3 [&_.flows_button[aria-current='step']::before]:w-0.5 [&_.flows_button[aria-current='step']::before]:rounded-xs [&_.flows_button[aria-current='step']::before]:bg-ink [.stage.wide_&]:[align-self:start] [.stage.wide_&]:sticky [.stage.wide_&]:top-6 [.stage.wide_&]:mt-7.5 [@media(max-width:1279px)_and_(min-width:961px)]:[.stage.wide_&]:[grid-area:side] [@media(max-width:1279px)_and_(min-width:961px)]:[.stage.wide_&]:static [@media(max-width:1279px)_and_(min-width:961px)]:[.stage.wide_&]:mt-0 [@media(max-width:1279px)_and_(min-width:961px)]:[.stage.wide_&]:block [@media(max-width:960px)_and_(min-width:641px)]:[.stage.wide_&]:hidden!">
        <div
          className="how-card bg-white [box-shadow:0_0_0_0.5px_var(--hair),_0_20px_50px_-30px_rgb(11_13_18_/_25%)] [&_.sys]:text-[15px] [&_.what]:text-[14px] [&_.what]:leading-5 motion-safe:animate-[rise_0.45s_var(--out)_both] p-[24px_24px_20px] rounded-[28px]"
          key={route}
        >
          <div className="flex items-center text-[12.5px] font-semibold text-signal-blue mb-2 gap-1.5">
            {I('info', 16)} Jak to działa na tym ekranie
          </div>
          <TechPanel route={route} />
        </div>
      </aside>
    </div>
  );
}
