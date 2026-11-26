import { Dialog as DialogPrimitive } from 'radix-ui';
import type { PointerEvent, ReactNode } from 'react';
import { cn } from '@/lib/utils';

/**
 * A bottom sheet inside the phone frame (Radix Dialog: focus trap, Escape, labelled dialog).
 * It renders into `container` rather than the page body, so it stays inside the phone.
 * `onDismiss` runs for Escape and taps on the dimmed backdrop; leave it out for a sheet
 * that must be finished with its own buttons.
 */
export function Sheet({
  container,
  title,
  onDismiss,
  onPointerDown,
  className,
  children,
}: {
  container: HTMLElement | null;
  title: string;
  onDismiss?: () => void;
  onPointerDown?: (e: PointerEvent<HTMLDivElement>) => void;
  className?: string;
  children: ReactNode;
}) {
  return (
    <DialogPrimitive.Root open onOpenChange={open => !open && onDismiss?.()}>
      <DialogPrimitive.Portal container={container}>
        <DialogPrimitive.Overlay
          data-slot="sheet-overlay"
          className={cn(
            // `sheet-bg` stays as the hook for the close animation and the story coach.
            'sheet-bg absolute inset-0 z-40 flex items-end bg-[rgb(11_13_18/40%)]',
            'motion-safe:animate-overlay-in',
          )}
        >
          <DialogPrimitive.Content
            data-slot="sheet"
            aria-describedby={undefined}
            onPointerDown={onPointerDown}
            // Keep focus where it lands naturally; the sheet itself is the first stop.
            onOpenAutoFocus={e => e.preventDefault()}
            className={cn(
              'sheet max-h-[92%] w-full overflow-hidden rounded-t-[22px] bg-background px-4 pt-2 pb-[30px] shadow-card outline-none',
              'motion-safe:animate-sheet-up motion-safe:touch-pan-x motion-safe:will-change-transform',
              'contrast-more:shadow-[0_0_0_1px_var(--ink)]',
              // drag handle
              'before:mx-auto before:mb-3 before:block before:h-[5px] before:w-10 before:cursor-grab before:rounded-[3px] before:bg-[#c7c7cc] before:content-[""]',
              // content swaps crossfade
              '*:motion-safe:animate-swap-in',
              className,
            )}
          >
            <DialogPrimitive.Title className="sr-only">{title}</DialogPrimitive.Title>
            {children}
          </DialogPrimitive.Content>
        </DialogPrimitive.Overlay>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
