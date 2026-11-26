import { styled } from '@/lib/styled';

/**
 * The type scale. Each component owns one style; pass `as` to change the element and
 * `className` for a local tweak. Easy mode (the `.easy` wrapper) enlarges the headings.
 */
/** Tab titles: "Sprawy", "Bliscy". */
export const Display = styled(
  'display',
  'h1',
  'mt-1 mb-4 text-[34px] leading-[38px] font-[680] tracking-[-0.035em] text-balance in-[.easy]:text-[40px]',
);

/** Screen titles. */
export const Title = styled(
  'title',
  'h1',
  'my-2.5 text-2xl leading-[1.16] font-[650] tracking-[-0.025em] text-balance in-[.easy]:leading-[1.1]',
);

/** Card and section titles. */
export const Subtitle = styled(
  'subtitle',
  'h2',
  'm-0 text-[17px] leading-[22px] font-semibold tracking-[-0.015em] text-balance',
);

/** The paragraph under a title. */
export const Lead = styled('lead', 'p', 'mt-0 mb-[18px] text-base/[1.45] text-ink-2');

/** Small label above a title: "Przeprowadzka · krok 2 z 3". */
export const Eyebrow = styled(
  '[.tech_&]:normal-case! [.tech_&]:[letter-spacing:0]! normal-case! [letter-spacing:0]! [.tech_&]:text-[13px] [.tech_&]:font-medium [.tech_&]:text-ink-2 [.how-card_.tech_&]:hidden',
  'p',
  'mt-2.5 mb-0 text-[13px] font-semibold tracking-normal text-ink-2 normal-case',
);

/** Secondary text. */
export const Muted = styled('muted', 'div', 'text-[13.5px] text-ink-2');

/** Fine print. */
export const Caption = styled('caption', 'p', 'text-xs/[1.45] text-ink-3');
