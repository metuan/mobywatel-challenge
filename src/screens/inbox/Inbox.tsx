import { Segmented } from '@/components/ui/segmented';
import { Badge } from '@/components/ui/badge';
import { Caption, Lead, Title } from '@/components/ui/typography';
import { useState, type MouseEvent as ReactMouseEvent } from 'react';
import { swipeRow } from '@/ui/controls';
import { I } from '@/ui/icons';
import type { Ctx, MailItem } from '@/types';

/* Hop 11: one inbox for letters from every office (e-Doręczenia), swipe to archive */
export const MAIL0: MailItem[] = [
  {
    k: 'us',
    from: 'Urząd Skarbowy Kraków-Podgórze',
    t: 'Wezwanie: wyjaśnienie korekty PIT-37',
    s: 'Odpowiedz do 7 grudnia',
    d: '19 lis',
    unread: true,
    r: 'letter-1',
    tag: 'Wymaga odpowiedzi',
    ai: 'Urząd pyta, dlaczego zwrot wzrósł. To nie kara.',
  },
  {
    k: 'zus',
    from: 'ZUS',
    t: 'Decyzja: 800+ na Zosię',
    s: 'Przyznano od czerwca 2026',
    d: '12 lis',
    unread: true,
    r: 'p800',
    ai: 'Dostajesz 800 zł co miesiąc do maja 2027.',
  },
  {
    k: 'um',
    from: 'Urząd Miasta Krakowa',
    t: 'Podatek od nieruchomości, 4. rata',
    s: '86 zł, termin 15 listopada',
    d: '2 lis',
    r: 'taxes',
  },
  {
    k: 'cepik',
    from: 'Wydział Komunikacji',
    t: 'Dowód rejestracyjny w produkcji',
    s: 'Odbiór od 2 grudnia',
    d: '20 lis',
    r: 'case-meld',
  },
  {
    k: 'nfz',
    from: 'NFZ',
    t: 'Zosia: e-skierowanie do kardiologa',
    s: 'Ważne do 21 listopada 2027',
    d: '18 lis',
    r: 'visit-1',
  },
];

export function Inbox(c: Ctx) {
  const [list, setList] = useState(c.s.mail || MAIL0);
  const [f, setF] = useState('all');
  const save = (l: MailItem[]) => {
    setList(l);
    c.set({ mail: l, inboxNew: l.filter(x => x.unread).length });
  };
  const arch = (x: MailItem) => {
    const prev = list;
    save(list.filter(y => y.k !== x.k));
    c.toast({ t: 'Przeniesiono do archiwum', undo: () => save(prev) });
  };
  const open = (e: ReactMouseEvent<HTMLElement>, x: MailItem) => {
    if ((e.currentTarget as HTMLElement).dataset.swiped) return;
    save(list.map(y => (y.k === x.k ? { ...y, unread: false } : y)));
    c.go(x.r);
  };
  const shown = list.filter(x => f === 'all' || x.unread);
  return (
    <div className="inbox8">
      <Title>Skrzynka</Title>
      <Lead className="mb-3">
        Pisma ze wszystkich urzędów w jednym miejscu. Pod każdym krótkie wyjaśnienie.
      </Lead>
      <Segmented
        className="mb-3.5"
        label="Filtr"
        value={f}
        onValueChange={setF}
        options={[
          ['all', 'Wszystkie'],
          [
            'new',
            `Nieprzeczytane${list.some(x => x.unread) ? ' · ' + list.filter(x => x.unread).length : ''}`,
          ],
        ]}
      />
      <div className="mail">
        {shown.map(x => (
          <div
            className="relative rounded-[20px] overflow-hidden [background:var(--ink)] will-change-auto"
            key={x.k}
          >
            <span className="absolute inset-0 flex items-center justify-end gap-2 pr-5.5 [color:#fff] text-[13px] font-semibold [opacity:calc(0.4_+_var(--sw,_0)_*_0.6)]">
              {I('archive', 20)}
              <span>Archiwum</span>
            </span>
            <button
              className={
                'mail-i relative w-full text-left flex flex-col gap-0.75 [background:var(--surface)] p-[14px_16px] rounded-[20px] [touch-action:pan-y] [transition:transform_0.26s_cubic-bezier(0.32,_0.72,_0,_1)] [&.drag]:[transition:none]' +
                (x.unread ? ' new' : '')
              }
              onPointerDown={e => swipeRow(e, () => arch(x))}
              onClick={e => open(e, x)}
            >
              <span className="flex justify-between gap-2.5 text-[12.5px] text-ink-2">
                <span className="flex items-center gap-1.5 min-w-0 whitespace-nowrap overflow-hidden text-ellipsis">
                  {x.unread && <i className="w-2 h-2 rounded-[50%] [background:#2f6bff] flex-none"></i>}
                  {x.from}
                </span>
                <span className="mail-d">{x.d}</span>
              </span>
              <span className="[.mail-i.new_&]:font-[650] text-[15.5px] font-medium tracking-[-0.012em]">
                {x.t}
              </span>
              <span className="text-[13.5px] text-ink-2">{x.s}</span>
              {x.ai && (
                <span className="mt-1.5 text-[13px] leading-[1.35] text-ink [background:linear-gradient(135deg,_rgb(47_107_255_/_7%),_rgb(122_77_255_/_7%))] rounded-[10px] p-[8px_10px]">
                  <span className="rounded-[999px] [background:none]! p-0 text-[12px] inline-flex items-center gap-1.25 [&::before]:[content:''] [&::before]:w-1.5 [&::before]:h-1.5 [&::before]:rounded-[50%] [&::before]:[background:var(--ink-3)]! text-ink-2! font-medium [.sys_&]:inline-flex [.sys_&]:items-center [.sys_&]:rounded-[999px] [.sys_&]:gap-1 [.sys_&]:ml-2 [.sys_&]:text-[11px] [.sys_&]:tracking-[0.06em] [.sys_&]:align-[1px] [.sys_&]:[box-shadow:0_4px_10px_-4px_rgb(76_90_255_/_60%)] [.sys_&]:[background:linear-gradient(135deg,_#2f6bff,_#7a4dff)]! [.sys_&]:[color:#fff]! [.sys_&]:p-[3px_9px_3px_7px]! [.sys_&]:font-bold! [.sys_&::before]:[content:''] [.sys_&::before]:inline-block! [.sys_&::before]:w-2.5 [.sys_&::before]:h-2.5 [.sys_&::before]:[-webkit-mask:url(data:image/svg+xml,%3Csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20viewBox=%270%200%2024%2024%27%3E%3Cpath%20d=%27M12%202l2.2%206.3L20.5%2010l-6.3%202.2L12%2018.5l-2.2-6.3L3.5%2010l6.3-1.7z%27/%3E%3C/svg%3E)_center/contain_no-repeat] [.sys_&::before]:[mask:url(data:image/svg+xml,%3Csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20viewBox=%270%200%2024%2024%27%3E%3Cpath%20d=%27M12%202l2.2%206.3L20.5%2010l-6.3%202.2L12%2018.5l-2.2-6.3L3.5%2010l6.3-1.7z%27/%3E%3C/svg%3E)_center/contain_no-repeat] [.sys_&::before]:[background:#fff]! [.sys_&::before]:[box-shadow:none]! [.sys_&::before]:rounded-none! [&.sm]:text-[9.5px]! [&&.sm]:p-[1px_6px]! [&.sm]:align-[1px] [&.sm]:[background:linear-gradient(135deg,_#2f6bff,_#7a4dff)]! [&.sm]:[color:#fff]! [&.sm]:rounded-[999px] [&&.sm::before]:hidden! sm">
                    AI
                  </span>{' '}
                  {x.ai}
                </span>
              )}
              {x.tag && <Badge className="mt-2 self-start">{x.tag}</Badge>}
            </button>
          </div>
        ))}
        {!shown.length && (
          <div className="flex flex-col items-center text-center gap-1.5 p-[40px_20px] text-ink-2 [&_b]:text-ink [&_b]:font-semibold">
            {I('check', 22)}
            <b>Wszystko przeczytane.</b>
            <span>Nowe pisma pojawią się tutaj i w powiadomieniach.</span>
          </div>
        )}
      </div>
      <Caption className="mt-3">Przesuń pismo w lewo, żeby je zarchiwizować.</Caption>
    </div>
  );
}
