import type { ReactElement, ReactNode } from 'react';
import type { IconName } from '@/ui/icons';

/** Whatever a template can render. */
export type Child = ReactNode;
export type View = ReactElement | ReactElement[] | string | null;

export type Persona = 'anna' | 'tata';
/** Offices notified about a change of address. */
export type MoveSelection = Record<string, boolean> & {
  meld: boolean;
  gp: boolean;
  vote: boolean;
  car: boolean;
};
/** A letter in the unified inbox. */
export interface MailItem {
  k: string;
  from: string;
  t: string;
  s: string;
  d: string;
  r: string;
  unread?: boolean;
  tag?: string;
  /** One-line plain-language summary written by the assistant. */
  ai?: string;
}

/** A consent the visitor has granted (family, companies, the assistant's memory). */
export interface ConsentItem {
  k: string;
  who: string;
  what: string;
  until: string;
  /** Days left; null means no end date, 0 means expired. */
  left: number | null;
  group: string;
  av?: string;
  ic?: IconName;
  ai?: boolean;
}

/**
 * Demo state shared by every screen. It only records what the visitor has done so far,
 * so each flow can pick up where it was left (paid, signed, booked, and so on).
 */
export interface AppState {
  persona: Persona;
  inboxNew: number;
  easy?: boolean;
  /** Text size step (1 is the default). */
  fs?: number;
  /** Question handed to the assistant screen. */
  q?: string | null;
  mail?: MailItem[];
  cons?: ConsentItem[];
  moveSel?: MoveSelection;
  moved?: boolean;
  visit?: string | null;
  visitPick?: string[];
  babyDone?: boolean;
  askedTom?: boolean;
  tomOk?: boolean;
  letterSent?: boolean;
  l2seen?: boolean;
  dmgPhotos?: number;
  safe?: boolean;
  lost?: boolean;
  paid?: boolean;
  propPaid?: boolean;
  signed?: boolean;
  diploma?: boolean;
  excused?: boolean;
  easyApproved?: boolean;
  medLock?: boolean;
  pjm?: boolean;
}

/** A confirm or payment sheet raised from a screen. */
export interface SheetRequest {
  t?: string;
  items?: string[];
  ok?: string;
  big?: boolean;
  steps?: string[];
  amt?: string;
  to?: string;
  d?: string;
  done?: () => void;
}

export interface Sheet extends SheetRequest {
  stage?: number;
  pay?: boolean;
  /** Selected payment method. */
  m?: number;
  /** Set when the sheet is the "Jak to działa" explainer rather than a confirmation. */
  tech?: boolean;
}

export type ToastInput = string | { t: string; undo?: () => void };

/** Everything a screen gets from the app shell. */
export interface Ctx {
  s: AppState;
  go: (route: string, persona?: Persona) => void;
  back: () => void;
  set: (patch: Partial<AppState>) => void;
  toast: (t: ToastInput) => void;
  ask: (q: string) => void;
  confirm: (o: SheetRequest) => void;
  pay: (o: SheetRequest) => void;
  /** Optional slot some wrappers inject above a screen. */
  bar?: Child;
}

export type Screen = (c: Ctx) => View;
