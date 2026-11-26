import type { ComponentProps } from 'react';
import { cn } from '@/lib/utils';

/** A white surface. Padding is up to the content, so lists and charts can run edge to edge. */
export function Card({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div
      data-slot="card"
      className={cn('rounded-[22px] bg-card text-card-foreground', className)}
      {...props}
    />
  );
}
