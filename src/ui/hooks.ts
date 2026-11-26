import { useEffect, useState } from '@/lib/preact';

export const useClock = () => {
  const [t, setT] = useState(() => 7);
  useEffect(() => { const i = setInterval(() => setT(x => x + 1), 1000); return () => clearInterval(i); }, []);
  const m = 40 + Math.floor(t / 60), sec = t % 60;
  return `15:${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
};

export function useTicker(max, ms) {
  const [n, setN] = useState(0);
  useEffect(() => { if (n >= max) return; const t = setTimeout(() => setN(n + 1), n === 0 ? 500 : ms); return () => clearTimeout(t); }, [n]);
  return [n, () => setN(0)];
}
