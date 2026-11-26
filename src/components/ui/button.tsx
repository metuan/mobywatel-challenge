import { cva, type VariantProps } from 'class-variance-authority';
import { Slot } from 'radix-ui';
import type { ComponentProps } from 'react';
import { cn } from '@/lib/utils';

/**
 * The app's one button: a full-width 52px pill.
 * Variants follow shadcn/ui naming; `inverse` and `inverseSecondary` sit on the dark alert and watch screens.
 */
export const buttonVariants = cva(
  [
    'flex h-[52px] w-full items-center justify-center gap-2 rounded-full border-0 px-[22px]',
    'text-center text-base leading-[1.45] font-semibold tracking-[-0.01em] shadow-none',
    'disabled:opacity-35',
    'motion-safe:[transition:transform_0.16s_var(--ease-out),background-color_0.2s,color_0.2s,box-shadow_0.2s]',
    'motion-safe:active:[transform:scale(0.97)]',
  ],
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground',
        secondary: 'bg-secondary text-secondary-foreground',
        destructive: 'bg-red-soft text-red',
        success: 'bg-green text-white',
        inverse: 'bg-white text-ink',
        inverseSecondary: 'bg-white/12 text-white',
      },
    },
    defaultVariants: { variant: 'default' },
  },
);

export type ButtonProps = ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & { asChild?: boolean };

export function Button({ className, variant, asChild = false, ...props }: ButtonProps) {
  const Comp = asChild ? Slot.Root : 'button';
  return (
    <Comp
      data-slot="button"
      data-variant={variant ?? 'default'}
      className={cn(buttonVariants({ variant }), className)}
      {...props}
    />
  );
}

/** A stack of buttons under a screen's content; `row` puts them side by side. */
export function Actions({ className, row, ...props }: ComponentProps<'div'> & { row?: boolean }) {
  return (
    <div
      data-slot="actions"
      className={cn('mt-6 flex flex-col gap-2.5', row && 'flex-row *:flex-1', className)}
      {...props}
    />
  );
}
