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
import type { AppState, Ctx, Persona, Sheet, SheetRequest, ToastInput } from '@/types';

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
  const [sheet, setSheet] = useState<Sheet | null>(null);
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
    const sh = document.querySelector<HTMLElement>('.phone .sheet');
    if (!sh || !window.ResizeObserver) return;
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
    return () => ro.disconnect();
  }, [!!sheet]);
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
        closeSheet();
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
    <div className="phone" role="application" aria-label="Prototyp aplikacji">
      <Island c={c} route={route} full={FULL.has(route)} />
      <div className={'app' + (compact ? ' compact' : '')}>
        <div className="statusbar">
          <span>15:40</span>
          <span className="flex gap-1.5 items-center">{I('wifi', 15)} 82%</span>
        </div>
        {FULL.has(route) ? (
          <Wrap key={route} f={Screen} c={c} d="full" />
        ) : (
          <>
            <div className="topbar">
              {isTab ? (
                <button
                  className="word"
                  onClick={() => {
                    setHist([]);
                    go(tata ? 'easy' : 'today');
                  }}
                >
                  <Wm />
                </button>
              ) : (
                <button className="navback" onClick={back}>
                  {I('left', 22)}
                  <span>Wstecz</span>
                </button>
              )}
              {!tata && (
                <span className="tb-title">{isTab ? (TABS.find(t => t[0] === route)?.[1] ?? '') : ttl}</span>
              )}
              <div className="tb-right">
                <button
                  className="how-btn"
                  aria-label="Jak to działa"
                  onClick={() => setSheet({ tech: true })}
                >
                  {I('info', 18)}
                </button>
                {tata ? (
                  <button className="menu-btn" onClick={() => go('today', 'anna')}>
                    Zwykły widok
                  </button>
                ) : (
                  <button
                    className="avatar-btn"
                    aria-label="Profil i ustawienia"
                    onClick={() => go('profile')}
                  >
                    AN
                  </button>
                )}
              </div>
            </div>
            <div
              className="scroll"
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
              <nav className="tabbar" aria-label="Główne">
                <i
                  className="tb-ind"
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
          <div className={'mstory' + (FULL.has(route) ? ' top' : '')}>
            <button
              className="ms-main"
              onClick={() => {
                const h = beatOf(chap, route);
                if (h < 0 && route !== BEATS[chap][0][0]) go(BEATS[chap][lastBeat][0], CHAPTERS[chap].p);
                else setSheet({ tech: true });
              }}
            >
              <span className="ms-n">
                {chap + 1}/{CHAPTERS.length}
              </span>
              <span className="ms-t">
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
            <button className="ms-next" aria-label="Następny rozdział" onClick={() => step(1)}>
              {I('chevron', 18)}
            </button>
          </div>
        )}
        {menu && (
          <div className="menu-bg" onClick={e => e.target === e.currentTarget && setMenu(false)}>
            <div className="menu" role="dialog" aria-label="Menu">
              <button className="x" aria-label="Zamknij" onClick={() => setMenu(false)}>
                {I('x', 16)}
              </button>
              <nav>
                {MENU.map(([r, t]) => (
                  <button
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
              <div className="official">
                <span className="flag"></span>
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
          <div className={'toast' + (toastView.undo ? ' has-undo' : '')} role="status">
            {toastView.t}
            {toastView.undo && (
              <button
                className="t-undo"
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
          <div
            className="sheet-bg"
            onClick={e => e.target === e.currentTarget && (sheet.tech || sheet.stage === 0) && closeSheet()}
          >
            <div
              className="sheet"
              onPointerDown={e => sheetDrag(e, closeSheet)}
              role="dialog"
              aria-label={sheet.t || 'Jak to działa'}
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
                  <div className="q">Czy te dane są poprawne?</div>
                  <Subtitle className={cn('mb-3', sheet.big && 'text-[30px]')}>{sheet.t}</Subtitle>
                  <div className="rounded-[22px] bg-white">
                    {(sheet.items || []).map(i => (
                      <Field className={cn(sheet.big && 'text-lg')}>
                        <FieldValue className="flex gap-2.5 items-start">
                          <span className="text-(--blue) mt-0.5">{I('check', 16)}</span>
                          <span>{i}</span>
                        </FieldValue>
                      </Field>
                    ))}
                  </div>
                  <Caption className="mt-3">
                    Potwierdzasz twarzą lub kodem PIN. To jest Twój podpis. Nic nie zostanie wysłane
                    wcześniej.
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
            </div>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="stage wide">
      <header className="top8">
        <Wm />
        <span>
          <button className="tlink8" onClick={() => setTour('intro')}>
            Wstęp
          </button>{' '}
          ·{' '}
          <button className="tlink8" onClick={() => goChap(chap)}>
            Zacznij rozdział od nowa
          </button>{' '}
          · Niezależna koncepcja na mObywatel Challenge · osoby i dane są fikcyjne
        </span>
      </header>
      <aside className="rail">
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
      <aside className="side">
        <div className="how-card" key={route}>
          <div className="hc-k">{I('info', 16)} Jak to działa na tym ekranie</div>
          <TechPanel route={route} />
        </div>
      </aside>
    </div>
  );
}
