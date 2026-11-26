import { useEffect } from 'react';
import { Sheet } from '@/components/ui/sheet';
import { Actions, Button } from '@/components/ui/button';
import { Field, FieldValue } from '@/components/ui/field';
import { Caption, Subtitle } from '@/components/ui/typography';
import { sheetDrag } from '@/app/gestures';
import type { Route } from '@/app/routes';
import { reducedMotion } from '@/lib/env';
import { cn } from '@/lib/utils';
import { PayDone, PaySheet } from '@/screens/money/pay';
import { StoryPanel } from '@/story/StoryPanel';
import { TechPanel } from '@/tech/TechPanel';
import { Confirming } from '@/ui/controls';
import { Icon } from '@/ui/icons';
import type { Persona, Sheet as SheetState } from '@/types';

/** The sheet glides to its new height when its content changes (confirm, then loader, then receipt). */
function glide(sh: HTMLElement) {
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
  return ro;
}

/**
 * The one bottom sheet the phone shows at a time: "how it works", a confirmation with its
 * loader, or a payment. Confirmations advance on their own once the loader has run.
 */
export function SheetHost({
  sheet,
  setSheet,
  close,
  container,
  route,
  chap,
  lastBeat,
  go,
  step,
}: {
  sheet: SheetState;
  setSheet: (s: SheetState | null) => void;
  close: (then?: unknown) => void;
  container: HTMLElement | null;
  route: Route;
  chap: number;
  lastBeat: number;
  go: (r: string, p?: Persona) => void;
  step: (d: number) => void;
}) {
  useEffect(() => {
    if (sheet.stage !== 1) return;
    const t = setTimeout(
      () => {
        if (sheet.pay) {
          setSheet({ ...sheet, stage: 2 });
          return;
        }
        close(sheet.done);
      },
      reducedMotion() ? 600 : 1700,
    );
    return () => clearTimeout(t);
  }, [sheet]);

  useEffect(() => {
    if (!window.ResizeObserver) return;
    let ro: ResizeObserver | undefined;
    // The sheet mounts through a portal a frame later, so look for it after the next paint.
    const raf = requestAnimationFrame(() => {
      const sh = document.querySelector<HTMLElement>('.phone .sheet');
      if (sh) ro = glide(sh);
    });
    return () => {
      cancelAnimationFrame(raf);
      ro?.disconnect();
    };
  }, []);

  return (
    <Sheet
      container={container}
      title={sheet.t || 'Jak to działa'}
      onDismiss={sheet.tech || sheet.stage === 0 ? () => close() : undefined}
      onPointerDown={e => sheetDrag(e, close)}
    >
      {sheet.pay && sheet.stage === 0 ? (
        <PaySheet sheet={sheet} setSheet={setSheet} close={() => close()} />
      ) : sheet.pay && sheet.stage === 2 ? (
        <PayDone sheet={sheet} close={() => close(sheet.done)} />
      ) : sheet.tech ? (
        <div>
          <StoryPanel
            i={chap}
            route={route}
            lastBeat={lastBeat}
            go={(r: string, p?: Persona) => close(() => go(r, p))}
            step={(d: number) => close(() => step(d))}
          />
          <TechPanel route={route} />
          <Actions>
            <Button variant="secondary" onClick={() => close()}>
              Zamknij
            </Button>
          </Actions>
        </div>
      ) : sheet.stage === 0 ? (
        <div>
          <div className="[.sheet_&]:mb-2.5 [.sheet_&]:text-ink-2 [.sheet_&]:font-semibold [.sheet_&]:text-[13px] [.sheet_&]:normal-case! [.sheet_&]:[letter-spacing:0]! [.pay8_&&]:mb-1.5">
            Czy te dane są poprawne?
          </div>
          <Subtitle className={cn('mb-3', sheet.big && 'text-[30px]')}>{sheet.t}</Subtitle>
          <div className="rounded-[22px] bg-white">
            {(sheet.items || []).map(i => (
              <Field key={i} className={cn(sheet.big && 'text-lg')}>
                <FieldValue className="flex gap-2.5 items-start">
                  <span className="text-ink mt-0.5">
                    <Icon name="check" size={16} />
                  </span>
                  <span>{i}</span>
                </FieldValue>
              </Field>
            ))}
          </div>
          <Caption className="mt-3">
            Potwierdzasz twarzą lub kodem PIN. To jest Twój podpis. Nic nie zostanie wysłane wcześniej.
          </Caption>
          <Actions row>
            <Button variant="secondary" onClick={() => close()}>
              Nie, popraw
            </Button>
            <Button onClick={() => setSheet({ ...sheet, stage: 1 })}>{sheet.ok}</Button>
          </Actions>
        </div>
      ) : (
        <Confirming steps={sheet.pay ? ['Potwierdzam, że to Ty', 'Łączę z bankiem', 'Płacę'] : sheet.steps} />
      )}
    </Sheet>
  );
}
