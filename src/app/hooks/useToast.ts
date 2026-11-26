import { useRef, useState } from 'react';
import { reducedMotion } from '@/lib/env';
import type { ToastInput } from '@/types';

/** One toast at a time: it fades out after three seconds, and a new one replaces the old. */
export function useToast() {
  const [toast, setToast] = useState<ToastInput | null>(null);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);
  const show = (t: ToastInput) => {
    timersRef.current.forEach(clearTimeout);
    setToast(t);
    timersRef.current = [
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
  const clear = () => setToast(null);
  const view = toast === null ? null : typeof toast === 'string' ? { t: toast, undo: undefined } : toast;
  return { view, show, clear };
}
export type Toasts = ReturnType<typeof useToast>;
