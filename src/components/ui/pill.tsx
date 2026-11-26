import type { ComponentPropsWithoutRef, ElementType } from 'react';

/*
 * Inline pill buttons. Unlike Button they size to their label.
 * Pill is the dark call to action in the story panel, the tour and the attention cards; the context rules
 * below size it for each of those places. Chip is the small grey one used for secondary actions and tags.
 * Both keep their legacy marker class (pill, mini) because surrounding rules and the coach target it.
 */

const pill =
  'pill whitespace-nowrap h-13 rounded-[999px] bg-ink text-white text-[16px] font-semibold p-[0_22px] inline-flex items-center justify-center gap-2 [border:0] [box-shadow:none] [.attn-act_&]:text-[14px] [.attn-act_&]:p-[0_16px] [.attn-act_&]:h-9.5 [.st-nav_&]:h-11 [.st-nav_&]:text-[15px] [.st-nav_&]:p-[0_18px] [.st-nav_&:disabled]:opacity-[0.35] [.tour-btns_&]:h-11.5 [.tour-btns_&]:text-[15px] [@media(max-width:640px)]:[.tour-btns_&]:h-11 [@media(max-width:640px)]:[.tour-btns_&]:p-[0_16px] motion-safe:[transition:transform_0.16s_var(--ease-out),_background-color_0.15s_ease,_box-shadow_0.2s_ease] motion-safe:[&:active]:transform-[scale(0.97)] motion-safe:[&:active]:[transition-duration:0.1s] [.st-nav_&.ready]:[outline:2px_solid_var(--signal-blue)] [.st-nav_&.ready]:outline-offset-[3px] [.st-nav_&.ready]:[box-shadow:0_0_0_6px_rgb(47_107_255_/_18%)] motion-safe:[.st-nav_&.ready]:animate-[coach_1.6s_var(--out)_infinite]! [.w2-acts_&]:flex-1 [.w2-acts_&]:justify-center motion-safe:[.st-nav_&.ready]:[animation-iteration-count:3]!';

const chip =
  'mini inline-flex gap-1.5 items-center whitespace-nowrap motion-safe:[&:active]:transform-[scale(0.97)] font-semibold text-[15px] p-[6px_14px] bg-fill text-ink rounded-[999px]';

type Poly<T extends ElementType> = { as?: T } & ComponentPropsWithoutRef<T>;

export function Pill({ className, ...props }: ComponentPropsWithoutRef<'button'>) {
  return <button data-slot="pill" className={className ? pill + ' ' + className : pill} {...props} />;
}

export function Chip<T extends ElementType = 'button'>({ as, className, ...props }: Poly<T>) {
  const Comp: ElementType = as ?? 'button';
  return <Comp data-slot="chip" className={className ? chip + ' ' + className : chip} {...props} />;
}
