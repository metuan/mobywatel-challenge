import { Switch as SwitchPrimitive } from 'radix-ui';
import type { ComponentProps } from 'react';
import { cn } from '@/lib/utils';

/** An iOS-style on/off switch (Radix Switch), ink when on. */
export function Switch({ className, ...props }: ComponentProps<typeof SwitchPrimitive.Root>) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      className={cn(
        'relative inline-flex h-[31px] w-[51px] flex-none shrink-0 cursor-pointer items-center rounded-full bg-[#e9e9eb] outline-none',
        'motion-safe:transition-colors motion-safe:duration-200 data-[state=checked]:bg-ink',
        'focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2',
        className,
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className={cn(
          'pointer-events-none absolute top-0.5 left-0.5 block size-[27px] rounded-full bg-white',
          'shadow-[0_3px_8px_rgb(0_0_0/15%),0_3px_1px_rgb(0_0_0/6%)]',
          'motion-safe:transition-transform motion-safe:duration-200 motion-safe:ease-(--ease-out) data-[state=checked]:translate-x-5',
        )}
      />
    </SwitchPrimitive.Root>
  );
}
