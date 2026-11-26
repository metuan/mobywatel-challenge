import { useEffect, useRef, useState } from 'react';
import { leave } from '@/app/gestures';
import { TABS } from '@/app/routes';
import type { Route } from '@/app/routes';
import { CHAPTERS, beatOf, chapterOf } from '@/story/chapters';
import { coach } from '@/story/coach';
import type { Navigation } from '@/app/hooks/useNavigation';
import type { Sheet } from '@/types';

/**
 * The guided story: which chapter is open, the last beat reached in it, the intro and outro tour,
 * and the coach marks that point at what to tap next.
 */
export function useStory({
  nav,
  sheet,
  onReset,
}: {
  nav: Navigation;
  sheet: Sheet | null;
  onReset: () => void;
}) {
  const { route } = nav;
  const [tour, setTour] = useState<'intro' | 'outro' | null>(location.hash ? null : 'intro');
  const [chap, setChap] = useState(() => Math.max(0, chapterOf(route)));

  // Landing on a screen outside the open chapter opens the chapter that screen belongs to.
  const [chapRoute, setChapRoute] = useState<Route>(route);
  if (chapRoute !== route) {
    setChapRoute(route);
    const k = chapterOf(route);
    if (beatOf(chap, route) < 0 && !TABS.some(t => t[0] === route) && k >= 0 && k !== chap) setChap(k);
  }

  // The furthest beat seen in this chapter, so "back to the story" returns there.
  const [seen, setSeen] = useState({ chap, beat: 0 });
  const beat = beatOf(chap, route);
  if (beat >= 0 ? seen.chap !== chap || seen.beat !== beat : seen.chap !== chap)
    setSeen({ chap, beat: Math.max(0, beat) });
  const lastBeat = seen.beat;

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

  const goChap = (k: number) => {
    const ch = CHAPTERS[k];
    try {
      history.pushState({ chap: k }, '', '#' + ch.r[0]);
    } catch {}
    onReset();
    nav.setS({ persona: ch.p || 'anna', inboxNew: 2 });
    setChap(k);
    nav.go(ch.r[0], ch.p);
    nav.clearHistory();
    setTimeout(() => {
      const sc = document.querySelector('.phone .scroll');
      sc && (sc.scrollTop = 0);
    }, 0);
  };
  const step = (d: number) => {
    if (chap + d >= CHAPTERS.length) {
      setTour('outro');
      return;
    }
    goChap(Math.max(0, chap + d));
  };

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
  // Point again once a sheet closes.
  const hadSheetRef = useRef(false);
  useEffect(() => {
    if (sheet) {
      hadSheetRef.current = true;
      return;
    }
    if (!hadSheetRef.current || tour) return;
    hadSheetRef.current = false;
    const t = setTimeout(() => coach(chap, route, true), 320);
    return () => clearTimeout(t);
  }, [sheet]);

  return { chap, lastBeat, tour, setTour, closeTour, goChap, step };
}
export type Story = ReturnType<typeof useStory>;
