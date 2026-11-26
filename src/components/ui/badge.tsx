import { cva, type VariantProps } from 'class-variance-authority';
import type { ComponentProps } from 'react';
import { cn } from '@/lib/utils';

/** A status label with a leading dot: "Zgoda", "Czeka", "Ważny". */
const badgeVariants = cva(
  'inline-flex items-center gap-2 rounded-full text-sm/[1.45] font-medium whitespace-nowrap before:size-2 before:flex-none before:rounded-full before:bg-current',
  {
    variants: {
      variant: {
        default: 'text-current',
        destructive: 'bg-red-soft text-red',
      },
    },
    defaultVariants: { variant: 'default' },
  },
);

export function Badge({
  className,
  variant,
  ...props
}: ComponentProps<'span'> & VariantProps<typeof badgeVariants>) {
  return <span data-slot="badge" className={cn(badgeVariants({ variant }), className)} {...props} />;
}
