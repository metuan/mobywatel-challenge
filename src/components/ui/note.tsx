import { cva, type VariantProps } from 'class-variance-authority';
import type { ComponentProps, ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { Icon, type IconName } from '@/ui/icons';

/** A callout with an icon badge: tips, confirmations and warnings inside a flow. */
const noteVariants = cva(
  'flex items-start gap-3 rounded-[22px] bg-card px-4 py-3.5 text-left text-sm/[1.45] text-ink',
  {
    variants: {
      tone: {
        default: '[--note-bg:var(--fill)] [--note-fg:var(--ink)]',
        amber: '[--note-bg:var(--amber-soft)] [--note-fg:var(--warn)]',
        red: '[--note-bg:var(--red-soft)] [--note-fg:var(--red)]',
        green: '[--note-bg:var(--green-soft)] [--note-fg:var(--ok)]',
      },
      /** Inside a list row: no surface, a smaller icon. */
      compact: { true: 'items-center gap-2.5 bg-transparent px-0 pt-2.5 pb-0.5', false: '' },
    },
    defaultVariants: { tone: 'default', compact: false },
  },
);

type NoteProps = VariantProps<typeof noteVariants> & {
  icon: IconName;
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
};

function NoteBody({
  icon,
  compact,
  children,
}: {
  icon: IconName;
  compact?: boolean | null;
  children: ReactNode;
}) {
  return (
    <>
      <Icon
        name={icon}
        className={cn(
          'flex-none rounded-full bg-(--note-bg) text-(--note-fg)',
          compact ? 'size-7 p-1.5' : '-mt-0.5 size-8 p-[7px]',
        )}
      />
      <span className={cn('min-w-0 flex-1', compact ? 'text-[13.5px]/[1.4]' : 'pt-1')}>{children}</span>
    </>
  );
}

export function Note({ icon, tone, compact, children, className, style }: NoteProps) {
  return (
    <div data-slot="note" className={cn(noteVariants({ tone, compact }), className)} style={style}>
      <NoteBody icon={icon} compact={compact}>
        {children}
      </NoteBody>
    </div>
  );
}

/** The same callout as a tappable button. */
export function NoteButton({
  icon,
  tone,
  children,
  className,
  ...props
}: Omit<ComponentProps<'button'>, 'children'> & NoteProps) {
  return (
    <button data-slot="note" className={cn(noteVariants({ tone }), className)} {...props}>
      <NoteBody icon={icon}>{children}</NoteBody>
    </button>
  );
}
