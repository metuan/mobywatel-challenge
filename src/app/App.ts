import { html, useEffect, useRef, useState } from '@/lib/preact';
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

const DEMO = [
  ['Ekran Dziś', 'today', 'T1 T5', 'anna'],
  ['Przeprowadzka od A do Z', 'move-1', 'T2 T3', 'anna'],
  ['Pakiet „Nowe dziecko”', 'baby-1', 'T2', 'anna'],
  ['Alert RCB na ekranie blokady', 'lock', 'T1', 'anna'],
  ['Alarm, schron, mapa rodziny', 'alert-red', 'T1', 'anna'],
  ['Kardiolog dla Zosi', 'visit-1', 'T2', 'anna'],
  ['Rodzina i pomoc tacie', 'family', 'T4', 'anna'],
  ['Kto sprawdzał moje dane', 'access-log', 'T6', 'anna'],
  ['Wyjaśnij pismo z urzędu', 'letter-1', 'T3', 'anna'],
  ['Tryb prosty: tata', 'easy', 'T4', 'tata'],
];

const startPersona = (r: string): Persona =>
  r === 'easy' || r === 'easy-doc' || r === 'easy-rx' || r === 'easy-voice' ? 'tata' : 'anna';

const hashRoute = () => {
  const h = (location.hash || '').slice(1);
  return isRoute(h) ? h : null;
};

export function App() {
  const [route, setRoute] = useState<Route>(hashRoute() || 'today');
  const [hist, setHist] = useState<Route[]>([]);
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
    } catch (e) {}
  };
  const back = () => {
    setDir('back');
    setHist(h => {
      const p = h[h.length - 1] || (s.persona === 'tata' ? 'easy' : 'today');
      setRoute(p);
      try {
        history.replaceState(null, '', '#' + p);
      } catch (e) {}
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
    } catch (e) {}
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
  const [dq, setDq] = useState('');
  const sendQ = () => {
    const q = dq || 'Jak zameldować się w nowym mieszkaniu?';
    setDq('');
    c.ask(q);
  };
  const showDock = !tata && !FULL.has(route) && route !== 'assistant';
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

  const phone = html`<div class="phone" role="application" aria-label="Prototyp aplikacji">
    <${Island} c=${c} route=${route} full=${FULL.has(route)}/>
    <div class=${'app' + (compact ? ' compact' : '')}>
      <div class="statusbar"><span>15:40</span><span style="display:flex;gap:6px;align-items:center">${I('wifi', 15)} 82%</span></div>
      ${
        FULL.has(route)
          ? html`<${Wrap} key=${route} f=${Screen} c=${c} d="full"/>`
          : html`
        <div class="topbar">
          ${
            isTab
              ? html`<button class="word" onClick=${() => {
                  setHist([]);
                  go(tata ? 'easy' : 'today');
                }}><${Wm}/></button>`
              : html`<button class="navback" onClick=${back}>${I('left', 22)}<span>Wstecz</span></button>`
          }
          ${!tata && html`<span class="tb-title">${isTab ? (TABS.find(t => t[0] === route) || [, ''])[1] : ttl}</span>`}
          <div class="tb-right"><button class="how-btn" aria-label="Jak to działa" onClick=${() => setSheet({ tech: true })}>${I('info', 18)}</button>
          ${
            tata
              ? html`<button class="menu-btn" onClick=${() => go('today', 'anna')}>Zwykły widok</button>`
              : html`<button class="avatar-btn" aria-label="Profil i ustawienia" onClick=${() => go('profile')}>AN</button>`
          }</div>
        </div>
        <div class="scroll" ref=${scrollRef} style=${s.fs && s.fs !== 1 ? `--fs:${s.fs}` : ''} onPointerDown=${(e: PointerEvent) => !isTab && edgeBack(e, back)} onScroll=${(
          e: Event,
        ) => {
          const el = e.currentTarget as HTMLElement;
          const st = el.scrollTop;
          el.parentElement?.classList.toggle('scrolled', st > 4);
          const v = st > 48;
          if (v !== compact) setCompact(v);
        }}><${Wrap} key=${route} f=${Screen} c=${c} d=${dir}/></div>
        ${
          !tata &&
          html`<nav class="tabbar" aria-label="Główne"><i class="tb-ind" style=${`transform:translateX(${
            Math.max(
              0,
              TABS.findIndex(t => t[0] === curTab),
            ) * 100
          }%)`}></i>${TABS.map(
            ([r, t, ic]) =>
              html`<button aria-current=${curTab === r && route !== 'profile' ? 'page' : null} onClick=${() => {
                setHist([]);
                go(r);
              }}>${I(ic, 24)}<span>${t}</span></button>`,
          )}</nav>`
        }
      `
      }
        ${
          !tour &&
          html`<div class=${'mstory' + (FULL.has(route) ? ' top' : '')}><button class="ms-main" onClick=${() => {
            const h = beatOf(chap, route);
            if (h < 0 && route !== BEATS[chap][0][0]) go(BEATS[chap][lastBeat][0], CHAPTERS[chap].p);
            else setSheet({ tech: true });
          }}><span class="ms-n">${chap + 1}/${CHAPTERS.length}</span><span class="ms-t"><b>${CHAPTERS[chap].t}</b><span>${(() => {
            const h = beatOf(chap, route);
            if (h < 0 && route !== BEATS[chap][0][0]) return 'Poza historią. Dotknij, by wrócić';
            const b = BEATS[chap][h >= 0 ? h : lastBeat];
            const bi = h >= 0 ? h : lastBeat,
              n = BEATS[chap].length;
            return `Krok ${bi + 1} z ${n}`;
          })()}</span></span></button><button class="ms-next" aria-label="Następny rozdział" onClick=${() => step(1)}>${I('chevron', 18)}</button></div>`
        }
      ${
        menu &&
        html`<div class="menu-bg" onClick=${(e: MouseEvent) => e.target === e.currentTarget && setMenu(false)}>
        <div class="menu" role="dialog" aria-label="Menu">
          <button class="x" aria-label="Zamknij" onClick=${() => setMenu(false)}>${I('x', 16)}</button>
          <nav>${MENU.map(
            ([r, t]) =>
              html`<button aria-current=${route === r || (curTab === r && TABS.some(x => x[0] === r) && route !== 'profile') ? 'page' : null} onClick=${() => {
                setMenu(false);
                setHist([]);
                go(r);
              }}>${t}</button>`,
          )}</nav>
          <div class="official"><span class="flag"></span><span>Niezależna koncepcja na mObywatel Challenge.<br/>To nie jest oficjalna aplikacja.</span></div>
        </div></div>`
      }
      ${
        toastView &&
        html`<div class=${'toast' + (toastView.undo ? ' has-undo' : '')} role="status">${toastView.t}${
          toastView.undo &&
          html`<button class="t-undo" onClick=${() => {
            toastView.undo?.();
            setToast(null);
          }}>${I('undo', 15)} Cofnij</button>`
        }</div>`
      }
      ${
        sheet &&
        html`<div class="sheet-bg" onClick=${(e: MouseEvent) => e.target === e.currentTarget && (sheet.tech || sheet.stage === 0) && closeSheet()}>
        <div class="sheet" onPointerDown=${(e: PointerEvent) => sheetDrag(e, closeSheet)} role="dialog" aria-label=${sheet.t || 'Jak to działa'}>
          ${
            sheet.pay && sheet.stage === 0
              ? html`<${PaySheet} sheet=${sheet} setSheet=${setSheet} close=${() => closeSheet()}/>`
              : sheet.pay && sheet.stage === 2
                ? html`<${PayDone} sheet=${sheet} close=${() => closeSheet(sheet.done)}/>`
                : sheet.tech
                  ? html`<div><${StoryPanel} i=${chap} route=${route} lastBeat=${lastBeat} go=${(
                      r: string,
                      p?: Persona,
                    ) => {
                      closeSheet(() => {
                        setHist([]);
                        go(r, p);
                      });
                    }} step=${(d: number) => {
                      closeSheet(() => step(d));
                    }}/><${TechPanel} route=${route}/><div class="actions"><button class="btn soft" onClick=${() => closeSheet()}>Zamknij</button></div></div>`
                  : sheet.stage === 0
                    ? html`<div>
            <div class="q">Czy te dane są poprawne?</div>
            <h2 class="h-m" style=${sheet.big ? 'font-size:30px;margin-bottom:12px' : 'margin-bottom:12px'}>${sheet.t}</h2>
            <div class="fields">${(sheet.items || []).map(i => html`<div class="field" style=${sheet.big ? 'font-size:18px' : ''}><div class="v" style="display:flex;gap:10px;align-items:flex-start"><span style="color:var(--blue);margin-top:2px">${I('check', 16)}</span><span>${i}</span></div></div>`)}</div>
            <p class="tiny" style="margin-top:12px">Potwierdzasz twarzą lub kodem PIN. To jest Twój podpis. Nic nie zostanie wysłane wcześniej.</p>
            <div class="actions row2"><button class=${'btn soft' + (sheet.big ? ' bigbtn' : '')} onClick=${() => closeSheet()}>Nie, popraw</button><button class=${'btn' + (sheet.big ? ' bigbtn' : '')} onClick=${() => setSheet({ ...sheet, stage: 1 })}>${sheet.ok}</button></div>
          </div>`
                    : html`<${Confirming} steps=${sheet.pay ? ['Potwierdzam, że to Ty', 'Łączę z bankiem', 'Płacę'] : sheet.steps}/>`
          }
        </div></div>`
      }
    </div>
  </div>`;

  return html`<div class="stage wide">
    <header class="top8"><${Wm}/><span><button class="tlink8" onClick=${() => setTour('intro')}>Wstęp</button> · <button class="tlink8" onClick=${() => goChap(chap)}>Zacznij rozdział od nowa</button> · Niezależna koncepcja na mObywatel Challenge · osoby i dane są fikcyjne</span></header>
    <aside class="rail">
      <${Progress12} i=${chap} goChap=${goChap}/>
      <${StoryPanel} i=${chap} route=${route} lastBeat=${lastBeat} go=${(r: string, p?: Persona) => {
        setHist([]);
        go(r, p);
      }} step=${step}/>
    </aside>
    ${phone}
    ${tour && html`<${Tour} key=${tour} mode=${tour} onClose=${() => closeTour()} onStart=${() => closeTour(() => goChap(0))}/>`}
    <aside class="side">
      <div class="how-card" key=${route}>
        <div class="hc-k">${I('info', 16)} Jak to działa na tym ekranie</div>
        <${TechPanel} route=${route}/>
        
      </div>
    </aside>
  </div>`;
}
