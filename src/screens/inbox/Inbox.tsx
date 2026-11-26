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
      <Lead style={{ marginBottom: '12px' }}>
        Pisma ze wszystkich urzędów w jednym miejscu. Pod każdym krótkie wyjaśnienie.
      </Lead>
      <div className="seg8">
        {[
          ['all', 'Wszystkie'],
          [
            'new',
            `Nieprzeczytane${list.some(x => x.unread) ? ' · ' + list.filter(x => x.unread).length : ''}`,
          ],
        ].map(([k, t]) => (
          <button aria-pressed={f === k} onClick={() => setF(k)}>
            {t}
          </button>
        ))}
      </div>
      <div className="mail">
        {shown.map(x => (
          <div className="mail-w" key={x.k}>
            <span className="mail-bg">
              {I('archive', 20)}
              <span>Archiwum</span>
            </span>
            <button
              className={'mail-i' + (x.unread ? ' new' : '')}
              onPointerDown={e => swipeRow(e, () => arch(x))}
              onClick={e => open(e, x)}
            >
              <span className="mail-top">
                <span className="mail-from">
                  {x.unread && <i className="udot"></i>}
                  {x.from}
                </span>
                <span className="mail-d">{x.d}</span>
              </span>
              <span className="mail-t">{x.t}</span>
              <span className="mail-s">{x.s}</span>
              {x.ai && (
                <span className="mail-ai">
                  <span className="tag-a sm">AI</span> {x.ai}
                </span>
              )}
              {x.tag && <Badge style={{ marginTop: '8px', alignSelf: 'flex-start' }}>{x.tag}</Badge>}
            </button>
          </div>
        ))}
        {!shown.length && (
          <div className="empty8">
            {I('check', 22)}
            <b>Wszystko przeczytane.</b>
            <span>Nowe pisma pojawią się tutaj i w powiadomieniach.</span>
          </div>
        )}
      </div>
      <Caption style={{ marginTop: '12px' }}>Przesuń pismo w lewo, żeby je zarchiwizować.</Caption>
    </div>
  );
}
