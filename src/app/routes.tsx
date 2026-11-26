import type { Ctx, Screen } from '@/types';
import type { IconName } from '@/ui/icons';
import { Baby1, Baby2, Baby3, BabyDone } from '@/flows/baby';
import { Damage1, Damage2, Damage3 } from '@/flows/damage';
import { Letter1, Letter2, Letter3 } from '@/flows/letter';
import { Move1, Move2, Move3, MoveDone } from '@/flows/move';
import { EasySign, Sign1, Sign2, Sign3, SignList } from '@/flows/sign/sign';
import { Visit1, Visit2, Visit3, Visit4 } from '@/flows/visit';
import { About, Roadmap } from '@/screens/about/about';
import { Assistant } from '@/screens/assistant/Assistant';
import { Caller } from '@/screens/caller/Caller';
import { CarFull, CarSell } from '@/screens/car/car';
import { DocId, Docs, Issued, RenewPass, ShareMin } from '@/screens/docs/Docs';
import { EuWallet } from '@/screens/docs/EuWallet';
import { Lost } from '@/screens/docs/Lost';
import { Easy, EasyApprove, EasyCall, EasyDoc, EasyRx, EasyVoice } from '@/screens/easy/easy';
import { Pjm } from '@/screens/easy/Pjm';
import { Calendar } from '@/screens/family/Calendar';
import { Family } from '@/screens/family/Family';
import { Invite } from '@/screens/family/Invite';
import { MemberTata, MemberTomasz, MemberZosia } from '@/screens/family/members';
import { Consent2, School } from '@/screens/family/School';
import { Inbox } from '@/screens/inbox/Inbox';
import { CaseMeld, Matters } from '@/screens/matters/Matters';
import { Benefits, P800, Vacc } from '@/screens/money/benefits';
import { Taxes } from '@/screens/money/Taxes';
import { Profile } from '@/screens/profile/Profile';
import { AlertClear, AlertGuide, AlertRed, AlertSafe, AlertShelter } from '@/screens/safety/alerts';
import { AlertWatch } from '@/screens/safety/AlertWatch';
import { Ice, MedicalId } from '@/screens/safety/emergency';
import { FamilyMap } from '@/screens/safety/FamilyMap';
import { Lock } from '@/screens/safety/Lock';
import { Places, Plan, Safety } from '@/screens/safety/Safety';
import { SearchScreen } from '@/screens/search/Search';
import { Today } from '@/screens/today/Today';
import { Consents } from '@/screens/trust/Consents';
import { AccessLog, Devices, Offline, Scam, Signin } from '@/screens/trust/trust';

/** Bottom tab bar: route, label, icon. */
export const TABS: [Route, string, IconName][] = [
  ['today', 'Dziś', 'home'],
  ['matters', 'Sprawy', 'folder'],
  ['family', 'Bliscy', 'people'],
  ['safety', 'Ochrona', 'shield'],
  ['docs', 'Dokumenty', 'card'],
];

/** Every screen in the prototype, keyed by its hash route (`#move-1`, `#alert-red`, ...). */
export const R = {
  today: Today,
  matters: Matters,
  family: Family,
  safety: Safety,
  docs: Docs,
  profile: Profile,
  'case-meld': CaseMeld,
  'member-zosia': MemberZosia,
  'member-tata': MemberTata,
  'member-tomasz': MemberTomasz,
  'member-julia': MemberZosia,
  invite: Invite,
  calendar: Calendar,
  plan: Plan,
  places: Places,
  'alert-red': AlertRed,
  'alert-shelter': AlertShelter,
  'alert-guide': AlertGuide,
  'alert-clear': AlertClear,
  'alert-safe': AlertSafe,
  'alert-damage': Damage1,
  'doc-id': DocId,
  'share-min': ShareMin,
  lost: Lost,
  'access-log': AccessLog,
  consents: Consents,
  signin: Signin,
  offline: Offline,
  roadmap: Roadmap,
  about: About,
  car: CarFull,
  'car-sell': CarSell,
  benefits: Benefits,
  p800: P800,
  vacc: Vacc,
  'renew-pass': RenewPass,
  'move-1': Move1,
  'move-2': Move2,
  'move-3': Move3,
  'move-done': MoveDone,
  'baby-1': Baby1,
  'baby-2': Baby2,
  'baby-3': Baby3,
  'baby-done': BabyDone,
  'visit-1': Visit1,
  'visit-2': Visit2,
  'visit-3': Visit3,
  'visit-4': Visit4,
  'letter-1': Letter1,
  'letter-2': Letter2,
  'letter-3': Letter3,
  assistant: Assistant,
  lock: Lock,
  'family-map': FamilyMap,
  ice: Ice,
  'medical-id': MedicalId,
  'damage-1': Damage1,
  'damage-2': Damage2,
  'damage-3': Damage3,
  consent2: Consent2,
  school: School,
  taxes: Taxes,
  devices: Devices,
  scam: Scam,
  pjm: Pjm,
  issued: Issued,
  'sign-1': Sign1,
  'sign-2': Sign2,
  'sign-3': Sign3,
  'sign-list': SignList,
  'easy-sign': EasySign,
  eu: EuWallet,
  'alert-watch': AlertWatch,
  inbox: Inbox,
  search: SearchScreen,
  caller: Caller,
  easy: Easy,
  'easy-approve': EasyApprove,
  'easy-doc': EasyDoc,
  'easy-rx': EasyRx,
  'easy-call': EasyCall,
  'easy-voice': EasyVoice,
} satisfies Record<string, Screen>;

export type Route = keyof typeof R;

export const isRoute = (r: string): r is Route => Object.prototype.hasOwnProperty.call(R, r);

export const screenFor = (r: Route): Screen => R[r];

export const Wrap = ({ f, c, d }: { f: Screen; c: Ctx; d?: string }) => (
  <div
    className={
      'screen motion-safe:animate-[scr-in_0.32s_var(--ease-out)_both] motion-safe:[&.back]:[animation-name:scr-back] motion-safe:[&_.people_>_*]:animate-[fade-up_0.42s_var(--ease-out)_both] motion-safe:[&_.people_>_*:nth-child(2)]:[animation-delay:0.04s] motion-safe:[&_.people_>_*:nth-child(3)]:[animation-delay:0.08s] motion-safe:[&_.people_>_*:nth-child(n_+_4)]:[animation-delay:0.12s] [&.full]:absolute [&.full]:inset-0 [&.full]:z-30 [&.full]:animate-[fade_0.25s_ease-out_both] motion-safe:[&.tab_>_div_>_*:nth-child(2)]:[animation-delay:0.03s] motion-safe:[&.tab_>_div_>_*:nth-child(3)]:[animation-delay:0.06s] motion-safe:[&.tab_>_div_>_*:nth-child(4)]:[animation-delay:0.09s] motion-safe:[&.tab_>_div_>_*:nth-child(5)]:[animation-delay:0.12s] motion-safe:[&.tab_>_div_>_*:nth-child(6)]:[animation-delay:0.15s] motion-safe:[&.tab_>_div_>_*:nth-child(n_+_7)]:[animation-delay:0.18s] [&.kbd]:animate-none! [&.kbd_*]:animate-none! [.scroll_>_&]:[zoom:var(--fs,_1)] motion-safe:[&.tab_>_div_>_*]:animate-none! motion-safe:[&.tab]:animate-[tabfade_0.16s_ease-out_both]! ' +
      (d || '')
    }
  >
    {f(c)}
  </div>
);

/** Screens that take over the whole phone (no top bar, no tab bar). */
export const FULL = new Set<string>([
  'alert-red',
  'alert-clear',
  'lock',
  'medical-id',
  'alert-watch',
  'easy-call',
  'caller',
]);

/** Which tab is highlighted while a deeper screen is open. */
export const TABOF = (r: string): string =>
  TABS.some(t => t[0] === r)
    ? r
    : r.startsWith('move') ||
        r.startsWith('baby') ||
        r === 'case-meld' ||
        r === 'car-sell' ||
        r === 'benefits'
      ? 'matters'
      : r.startsWith('member') ||
          [
            'invite',
            'calendar',
            'plan',
            'school',
            'consent2',
            'visit-1',
            'visit-2',
            'visit-3',
            'visit-4',
            'vacc',
            'p800',
            'renew-pass',
          ].includes(r)
        ? 'family'
        : r.startsWith('alert') ||
            r.startsWith('damage') ||
            ['places', 'lock', 'family-map', 'scam', 'caller'].includes(r)
          ? 'safety'
          : ['doc-id', 'share-min', 'lost', 'car', 'ice', 'medical-id', 'issued'].includes(r)
            ? 'docs'
            : ['taxes'].includes(r)
              ? 'matters'
              : 'today';
