import { cva, type VariantProps } from 'class-variance-authority';
import type { ComponentPropsWithoutRef, ElementType } from 'react';
import { styled } from '@/lib/styled';
import { cn } from '@/lib/utils';
import { Icon } from '@/ui/icons';

/*
 * Grouped lists, iOS style: a white rounded surface with rows separated by hairlines.
 *
 *   <List>
 *     <ListRow as="button" onClick={…}>
 *       <ListRowIcon><Icon name="doc" size={18} /></ListRowIcon>
 *       <ListRowContent>
 *         <ListRowTitle>Dowód osobisty</ListRowTitle>
 *         <ListRowDescription>Ważny do 2031</ListRowDescription>
 *       </ListRowContent>
 *       <ListRowChevron />
 *     </ListRow>
 *   </List>
 */

type Poly<T extends ElementType> = { as?: T } & ComponentPropsWithoutRef<T>;

export function List<T extends ElementType = 'div'>({ as, className, ...props }: Poly<T>) {
  const Comp: ElementType = as ?? 'div';
  return (
    <Comp
      data-slot="list"
      className={cn('stagger overflow-hidden rounded-[22px] bg-card', className)}
      {...props}
    />
  );
}

/* Hairline dividers between rows live in list.css: they depend on the previous row's content. */

const pressable =
  'cursor-pointer text-left [transition:background-color_0.12s,transform_0.16s_var(--out)] hover:bg-[#fafafb] active:bg-fill! [&:active_.check]:[transform:scale(0.9)]';

export function ListRow<T extends ElementType = 'div'>({ as, className, ...props }: Poly<T>) {
  const Comp: ElementType = as ?? 'div';
  return (
    <Comp
      data-slot="list-row"
      className={cn(
        'flex min-h-14 w-full items-center gap-3.5 px-4 py-3',
        Comp === 'button' && pressable,
        className,
      )}
      {...props}
    />
  );
}

/** A plain leading icon. */
export const ListRowIcon = styled(
  'list-row-icon',
  'span',
  'grid w-6 flex-none place-items-center rounded-full bg-fill text-ink',
);

/** A leading icon on a round tile. */
const tile = cva(
  'grid size-[30px] flex-none place-items-center rounded-full text-xs font-bold text-ink [&>svg]:size-[18px]',
  {
    variants: {
      tone: {
        default: 'bg-fill',
        red: 'bg-signal-red',
        orange: 'bg-[#ff9500]',
        green: 'bg-signal-green',
        gray: 'bg-[#8e8e93]',
      },
    },
    defaultVariants: { tone: 'default' },
  },
);
export function ListRowTile({
  className,
  tone,
  ...props
}: ComponentPropsWithoutRef<'span'> & VariantProps<typeof tile>) {
  return <span data-slot="list-row-tile" className={cn(tile({ tone }), className)} {...props} />;
}

/** Initials on a round avatar. */
export const ListRowAvatar = styled(
  'list-row-avatar',
  'span',
  'grid size-10 flex-none place-items-center rounded-full bg-fill text-sm/[1.45] font-semibold text-ink',
);

export const ListRowContent = styled('list-row-content', 'span', 'block min-w-0 flex-1');

export const ListRowTitle = styled(
  'list-row-title',
  'div',
  'text-base/[1.45] font-medium tracking-[-0.011em]',
);

export const ListRowDescription = styled('list-row-description', 'div', 'text-sm/[1.45] text-ink-2');

export function ListRowChevron({ className, size = 18 }: { className?: string; size?: number }) {
  return (
    <span data-slot="list-row-chevron" className={cn('block text-ink-3', className)}>
      <Icon name="chevron" size={size} />
    </span>
  );
}

/*
 * The denser row used on the tab screens (GRow): a 40px leading icon and two tight lines.
 */
export function ListItem<T extends ElementType = 'div'>({ as, className, ...props }: Poly<T>) {
  const Comp: ElementType = as ?? 'div';
  return (
    <Comp
      data-slot="list-item"
      className={cn(
        'flex min-h-14 w-full items-center gap-3 bg-white px-4 py-3 text-left',
        '[transition:background-color_0.12s,transform_0.16s_var(--out)] hover:bg-[#fafafb] active:bg-fill! motion-safe:active:[transform:scale(0.97)]',
        className,
      )}
      {...props}
    />
  );
}

export const ListItemContent = styled('list-item-content', 'span', 'flex min-w-0 flex-1 flex-col gap-px');

export const ListItemTitle = styled(
  'list-item-title',
  'span',
  'flex items-center gap-1.5 text-base/[22px] font-medium tracking-[-0.011em]',
);

export const ListItemDescription = styled('list-item-description', 'span', 'text-sm/[19px] text-ink-2');

export function ListItemChevron({ className, size = 16 }: { className?: string; size?: number }) {
  return (
    <span data-slot="list-item-chevron" className={cn('grid flex-none text-ink-3', className)}>
      <Icon name="chevron" size={size} />
    </span>
  );
}
