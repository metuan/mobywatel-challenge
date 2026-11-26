import { ToggleGroup as ToggleGroupPrimitive } from 'radix-ui';
import type { CSSProperties, ReactNode } from 'react';
import { cn } from '@/lib/utils';

type Option = readonly [value: string, label: ReactNode];

/**
 * A segmented control (Radix ToggleGroup, single choice). One indicator slides under the
 * chosen segment instead of each segment swapping its own background.
 */
export function Segmented({
  options,
  value,
  onValueChange,
  label,
  className,
}: {
  options: readonly Option[];
  value: string;
  onValueChange: (value: string) => void;
  label?: string;
  className?: string;
}) {
  const k = options.findIndex(([v]) => v === value);
  return (
    <ToggleGroupPrimitive.Root
      type="single"
      data-slot="segmented"
      aria-label={label}
      value={value}
      // Radix sends '' when the chosen segment is tapped again; a segmented control keeps its choice.
      onValueChange={v => v && onValueChange(v)}
      className={cn('relative isolate flex h-10 rounded-xl bg-fill p-[3px]', className)}
      style={{ '--n': options.length, '--k': Math.max(0, k) } as CSSProperties}
    >
      <span
        aria-hidden
        data-slot="segmented-indicator"
        className={cn(
          'absolute inset-y-[3px] left-[3px] -z-10 w-[calc((100%-6px)/var(--n))] translate-x-[calc(var(--k)*100%)] rounded-[9px] bg-surface shadow-[0_1px_3px_rgb(11_13_18/10%)]',
          'motion-safe:transition-transform motion-safe:duration-[280ms] motion-safe:ease-[cubic-bezier(0.32,0.72,0,1)]',
          k < 0 && 'opacity-0',
        )}
      />
      {options.map(([v, t]) => (
        <ToggleGroupPrimitive.Item
          key={v}
          value={v}
          data-slot="segmented-item"
          className={cn(
            'flex-1 rounded-[9px] px-3.5 text-center text-sm font-semibold whitespace-nowrap text-ink-2',
            'motion-safe:transition-[color,transform] motion-safe:duration-200 motion-safe:active:scale-[.97] data-[state=on]:text-ink',
          )}
        >
          {t}
        </ToggleGroupPrimitive.Item>
      ))}
    </ToggleGroupPrimitive.Root>
  );
}
