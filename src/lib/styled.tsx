import type { ComponentPropsWithoutRef, ElementType } from 'react';
import { cn } from '@/lib/utils';

export type PolymorphicProps<T extends ElementType> = { as?: T } & ComponentPropsWithoutRef<T>;

/**
 * A small styled element: a default tag, a `data-slot` name and Tailwind classes.
 * Callers can swap the element with `as` and add classes with `className`.
 */
export function styled<D extends ElementType>(slot: string, Default: D, base: string) {
  function Styled<T extends ElementType = D>({ as, className, ...props }: PolymorphicProps<T>) {
    const Comp: ElementType = as ?? Default;
    return <Comp data-slot={slot} className={cn(base, className)} {...props} />;
  }
  Styled.displayName = slot;
  return Styled;
}
