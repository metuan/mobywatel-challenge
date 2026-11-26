import { useEffect, useState } from 'react';

/** Live clock for the document card, so a screenshot cannot pass for the real thing. */
export const useClock = () => {
  const [t, setT] = useState(() => 7);
  useEffect(() => {
    const i = setInterval(() => setT(x => x + 1), 1000);
    return () => clearInterval(i);
  }, []);
  const m = 40 + Math.floor(t / 60),
    sec = t % 60;
  return `15:${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
};

/** Counts 0..max, one step every `ms`; used to stage notifications. */
export function useTicker(max: number, ms: number): [step: number, replay: () => void] {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (n >= max) return;
    const t = setTimeout(() => setN(n + 1), n === 0 ? 500 : ms);
    return () => clearTimeout(t);
  }, [n]);
  return [n, () => setN(0)];
}
