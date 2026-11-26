import { useEffect, useRef, useState } from 'react';
import { TABS, isRoute } from '@/app/routes';
import type { Route } from '@/app/routes';
import type { AppState, Persona } from '@/types';

const startPersona = (r: string): Persona =>
  r === 'easy' || r === 'easy-doc' || r === 'easy-rx' || r === 'easy-voice' ? 'tata' : 'anna';

export const hashRoute = () => {
  const h = (location.hash || '').slice(1);
  return isRoute(h) ? h : null;
};

/** The current screen, the back stack, the persona and the app state, kept in sync with the URL hash. */
export function useNavigation() {
  const [route, setRoute] = useState<Route>(() => hashRoute() || 'today');
  const [, setHist] = useState<Route[]>([]);
  const [dir, setDir] = useState('tab');
  const [s, setS] = useState<AppState>(() => ({
    persona: startPersona(hashRoute() || 'today'),
    inboxNew: 2,
  }));
  /** Set when the next navigation comes from the keyboard, so the screen enters without a slide. */
  const kbdRef = useRef(false);

  const go = (r: string, persona?: Persona) => {
    if (!isRoute(r)) return;
    if (persona) setS(x => ({ ...x, persona, easy: persona === 'tata' }));
    setDir(kbdRef.current ? 'kbd' : TABS.some(t => t[0] === r) ? 'tab' : '');
    kbdRef.current = false;
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
  const clearHistory = () => setHist([]);

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

  return { route, dir, s, setS, set, go, back, clearHistory, kbdRef };
}
export type Navigation = ReturnType<typeof useNavigation>;
