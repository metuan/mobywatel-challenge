import { ListItemChevron, ListItemContent, ListItemDescription, ListItemTitle } from '@/components/ui/list';
import { Title } from '@/components/ui/typography';
import { useEffect, useRef, useState } from 'react';
import { norm } from '@/lib/env';
import { HOWTO, HowCard, howFor, showMe } from '@/story/howto';
import { I, P } from '@/ui/icons';
import { Label } from '@/ui/primitives';
import type { Ctx } from '@/types';
import type { IconName } from '@/ui/icons';

/* Hop 12: search that answers while you type */
/** Search index: title, subtitle, route, icon. */
const IDX: [string, string, string, string][] = [
  ['Przeprowadzka', 'Zameldowanie, lekarz, wybory, auto', 'move-1', 'move'],
  ['Nowe dziecko', 'Akt, PESEL, 800+, NFZ', 'baby-1', 'baby'],
  ['Dowód osobisty', 'Mój dowód i kod QR', 'doc-id', 'card'],
  ['Pokaż, że masz 18 lat', 'Bez imienia i adresu', 'share-min', 'eye'],
  ['Sprzedaż auta', 'Zgłoszenie i OC', 'car-sell', 'car'],
  ['Mój samochód', 'OC, przegląd, punkty, mandaty', 'car', 'car'],
  ['Kardiolog dla Zosi', 'e-Skierowanie i wolne terminy', 'visit-1', 'steth'],
  ['Szczepienia Zosi', 'Kalendarz szczepień', 'vacc', 'steth'],
  ['800+', 'Wypłaty i wnioski', 'p800', 'coin'],
  ['Podatki', 'e-PIT, zwrot, opłaty lokalne', 'taxes', 'coin'],
  ['Pismo z urzędu', 'Zrób zdjęcie, wyjaśnimy', 'letter-1', 'letter'],
  ['Skrzynka', 'Pisma ze wszystkich urzędów', 'inbox', 'inbox'],
  ['Najbliższy schron', 'Trasa bez internetu', 'alert-shelter', 'route'],
  ['Karta ratunkowa', 'Grupa krwi, alergie', 'ice', 'heart'],
  ['Zgubiony portfel', 'Zastrzeż wszystko naraz', 'lost', 'lock'],
  ['Kto sprawdzał moje dane', 'Historia dostępu', 'access-log', 'eye'],
  ['Moje zgody', 'Rodzina, firmy, asystent', 'consents', 'key'],
  ['Paszport Zosi', 'Zgoda obojga rodziców', 'renew-pass', 'card'],
  ['Podpisz projekt ustawy', 'Petycje i komitety', 'sign-1', 'doc'],
  ['Za granicą', 'Portfel UE', 'eu', 'card'],
  ['Kto do mnie dzwoni?', 'Sprawdź, czy to naprawdę urząd', 'caller', 'call'],
  ['Szkoła Zosi', 'Frekwencja, zgody, oceny', 'school', 'doc'],
  ['Kalendarz rodziny', 'Wszystkie terminy', 'calendar', 'list'],
];

export function Search({
  c,
  ph = 'Szukaj albo zapytaj, jak coś zrobić',
  auto,
  init = '',
}: {
  c: Ctx;
  ph?: string;
  auto?: boolean;
  init?: string;
}) {
  const [q, setQ] = useState(init);
  const ref = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (!auto) return;
    const a = setTimeout(() => ref.current && ref.current.focus(), 250);
    return () => clearTimeout(a);
  }, []);
  const how = howFor(q);
  const hits = q.trim()
    ? IDX.filter(x => norm(x[0] + ' ' + x[1]).includes(norm(q.trim()))).slice(0, how ? 3 : 5)
    : [];
  const enter = () =>
    how ? showMe(c, how) : hits[0] ? c.go(hits[0][2]) : c.ask(q || 'Jak zameldować się w nowym mieszkaniu?');
  return (
    <div className="relative [&:has(input:not(:placeholder-shown))_~_*]:hidden">
      <div className="search">
        <svg
          width="17"
          height="17"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
        >
          <circle cx="11" cy="11" r="6.5" />
          <path d="m16 16 4.5 4.5" />
        </svg>
        <input
          ref={ref}
          value={q}
          onInput={e => setQ((e.target as HTMLInputElement).value)}
          onKeyDown={e => e.key === 'Enter' && enter()}
          placeholder={ph}
          aria-label={ph}
        />
        {q ? (
          <button aria-label="Wyczyść" onClick={() => setQ('')}>
            {I('x', 16)}
          </button>
        ) : (
          <button aria-label="Mów" onClick={() => c.ask('Kiedy kończy się ważność mojego dowodu?')}>
            {I('mic', 18)}
          </button>
        )}
      </div>
      {how && <HowCard c={c} h={how} />}
      {q.trim() && (
        <div className="mt-2 bg-surface rounded-[18px] [box-shadow:var(--e-float)] overflow-hidden animate-[fadeUp_0.18s_var(--out)]">
          {hits.map(([t, s, r, ic]) => (
            <button
              className="flex gap-3 items-center w-full text-left p-[11px_14px] [border-top:0.5px_solid_var(--hair)] [&:first-child]:[border-top:0] [&:active]:bg-fill [transition:background-color_0.12s,_transform_0.16s_var(--out)]"
              onClick={() => c.go(r)}
            >
              <span className="w-10 h-10 rounded-[50%] grid place-items-center flex-none text-ink bg-bg [&.ai]:[background:linear-gradient(135deg,_var(--signal-blue),_var(--signal-violet))] [&.ai]:text-white [.how8-row_&]:w-7.5 [.how8-row_&]:h-7.5 [.how8-row_&]:rounded-[10px]">
                {I((ic in P ? ic : 'doc') as IconName, 18)}
              </span>
              <ListItemContent>
                <ListItemTitle>{t}</ListItemTitle>
                <ListItemDescription>{s}</ListItemDescription>
              </ListItemContent>
            </button>
          ))}
          <button
            className="flex gap-3 items-center w-full text-left p-[11px_14px] [border-top:0.5px_solid_var(--hair)] [&:first-child]:[border-top:0] [&:active]:bg-fill [transition:background-color_0.12s,_transform_0.16s_var(--out)] ask"
            onClick={() => c.ask(q)}
          >
            <span className="w-10 h-10 rounded-[50%] grid place-items-center flex-none text-ink bg-bg [&.ai]:[background:linear-gradient(135deg,_var(--signal-blue),_var(--signal-violet))] [&.ai]:text-white [.how8-row_&]:w-7.5 [.how8-row_&]:h-7.5 [.how8-row_&]:rounded-[10px] ai">
              {I('sparkle', 18)}
            </span>
            <ListItemContent>
              <ListItemTitle>Zapytaj asystenta: „{q}”</ListItemTitle>
              <ListItemDescription>Odpowiedź z gov.pl, ze źródłami</ListItemDescription>
            </ListItemContent>
          </button>
        </div>
      )}
    </div>
  );
}

export function SearchScreen(c: Ctx) {
  const [pick, setPick] = useState('');
  return (
    <div>
      <Title>Szukaj</Title>
      <Search key={pick} init={pick} c={c} auto={!pick} />
      {!pick && (
        <>
          <Label t="Jak to zrobić?" />
          <div className="bg-surface rounded-[18px] overflow-hidden">
            {HOWTO.slice(0, 5).map(h => (
              <button
                className="how8-row flex items-center gap-3 w-full text-left p-[12px_14px] text-[15px] font-medium [border-top:0.5px_solid_var(--hair)] [&:first-child]:[border-top:0] [&_>_span:nth-child(2)]:flex-1 [&:active]:bg-fill"
                onClick={() => setPick(h.q)}
              >
                <span className="w-10 h-10 rounded-[50%] grid place-items-center flex-none text-ink bg-bg [&.ai]:[background:linear-gradient(135deg,_var(--signal-blue),_var(--signal-violet))] [&.ai]:text-white [.how8-row_&]:w-7.5 [.how8-row_&]:h-7.5 [.how8-row_&]:rounded-[10px] ai">
                  {I('sparkle', 16)}
                </span>
                <span>{h.q}</span>
                <ListItemChevron size={16} />
              </button>
            ))}
          </div>
          <Label t="Często szukane" />
          <div className="chips flex gap-2 overflow-x-auto m-[12px_-20px_0] p-[0_20px] scrollbar-none [&::-webkit-scrollbar]:hidden [&_button]:flex-none [&_button]:rounded-[999px] [&_button]:bg-fill [&_button]:text-ink [&_button]:text-[14px] [&_button]:font-medium [&_button]:h-9 [&_button]:p-[0_16px] [&_button[aria-pressed='true']]:bg-ink [&_button[aria-pressed='true']]:text-white [&&_button:not([aria-pressed='true'])]:bg-white [&_button:not([aria-pressed='true'])]:[box-shadow:inset_0_0_0_0.5px_var(--hair)] [&.chips]:flex-wrap">
            {['Przeprowadzka', 'Dowód', '800+', 'Schron', 'Podatki', 'Recepta'].map(t => (
              <button
                onClick={() => {
                  const h = IDX.find(x => norm(x[0] + x[1]).includes(norm(t)));
                  h ? c.go(h[2]) : c.ask(t);
                }}
              >
                {t}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
