/** Small browser helpers shared across screens. */

/** True when the visitor asked the OS for less motion; every animation checks this first. */
export const reducedMotion = (): boolean => {
  try {
    return matchMedia('(prefers-reduced-motion: reduce)').matches;
  } catch {
    return false;
  }
};

/** Haptic tick on phones that support it. */
export const buzz = (pattern: number | number[]) => {
  try {
    navigator.vibrate?.(pattern);
  } catch {
    /* not supported */
  }
};

/** Ask the story coach to look for the next thing to tap (after content appears late). */
export const fire = () => setTimeout(() => window.dispatchEvent(new Event('coach')), 60);

/** Polish number formatting with a space as the thousands separator. */
export const fmt = (n: number) => n.toLocaleString('pl-PL').replace(/,/g, ' ');

/** Lowercase and strip Polish diacritics, for forgiving search. */
export const norm = (s: string) => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/ł/g, 'l');
