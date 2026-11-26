import { useEffect } from 'react';

/** Scale the desktop phone frame so it always fits the window height (--pz). */
export function useStageZoom() {
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
}
