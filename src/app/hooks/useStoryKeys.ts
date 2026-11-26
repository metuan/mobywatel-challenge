import { useEffect } from 'react';
import type { RefObject } from 'react';

/** Arrow keys move between chapters (an open sheet handles Escape itself). */
export function useStoryKeys({
  chap,
  step,
  kbdRef,
}: {
  chap: number;
  step: (d: number) => void;
  kbdRef: RefObject<boolean>;
}) {
  useEffect(() => {
    const f = (e: KeyboardEvent) => {
      if ((e.target as HTMLElement).tagName === 'INPUT') return;
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        kbdRef.current = true;
        step(1);
      }
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        kbdRef.current = true;
        step(-1);
      }
    };
    window.addEventListener('keydown', f);
    return () => window.removeEventListener('keydown', f);
  }, [chap]);
}
