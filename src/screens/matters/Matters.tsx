import { cn } from '@/lib/utils';
import {
  List,
  ListItem,
  ListItemChevron,
  ListItemContent,
  ListItemDescription,
  ListItemTitle,
  ListRow,
  ListRowContent,
  ListRowDescription,
  ListRowIcon,
  ListRowTitle,
} from '@/components/ui/list';
import { Note } from '@/components/ui/note';
import { Display, Eyebrow, Title } from '@/components/ui/typography';
import { useState } from 'react';
import { Search } from '@/screens/search/Search';
import { I } from '@/ui/icons';
import { Label, Ring, Tile } from '@/ui/primitives';
import type { Ctx } from '@/types';
import type { IllustrationName } from '@/ui/illustrations';

export function CaseMeld(_c: Ctx) {
  const st = [
    ['Wniosek złożony', '14 listopada'],
    ['Opłata 54,50 zł', 'Zapłacono 14 listopada'],
    ['Dokument w produkcji', 'Od 20 listopada'],
    ['Odbiór', 'Od 2 grudnia, Wydział Komunikacji, ul. Wielicka 28a'],
  ];
  return (
    <div>
      <Eyebrow>Sprawa</Eyebrow>
      <Title>Wymiana dowodu rejestracyjnego</Title>
      <List>
        {st.map(([t, s], i) => (
          <ListRow>
            <ListRowIcon className={cn(i < 3 && 'bg-green-soft text-green')}>
              {i < 3 ? I('check', 18) : <b>4</b>}
            </ListRowIcon>
            <ListRowContent>
              <ListRowTitle>{t}</ListRowTitle>
              <ListRowDescription>{s}</ListRowDescription>
            </ListRowContent>
          </ListRow>
        ))}
      </List>
      <Note icon="bell" className="mt-3.5">
        Dostaniesz powiadomienie, gdy dokument będzie gotowy. Nie musisz dzwonić do urzędu.
      </Note>
    </div>
  );
}

export function Matters(c: Ctx) {
  const [cat, setCat] = useState('all');
  const cats = [
    ['all', 'Wszystkie'],
    ['dom', 'Dom'],
    ['rodzina', 'Rodzina'],
    ['auto', 'Auto'],
    ['zdrowie', 'Zdrowie'],
    ['pieniadze', 'Pieniądze'],
  ];
  const items: [string, string, string, IllustrationName, string][] = [
    ['Przeprowadzka', '4 urzędy, ok. 10 minut', 'move-1', 'move', 'dom'],
    ['Nowe dziecko', 'Akt, PESEL, 800+, NFZ', 'baby-1', 'baby', 'rodzina'],
    ['Wizyta u specjalisty', 'e-Skierowanie i terminy', 'visit-1', 'doctor', 'zdrowie'],
    ['Sprzedaż auta', 'Zgłoszenie i OC', 'car-sell', 'car', 'auto'],
    ['Podatki', 'Twój e-PIT, opłaty', 'taxes', 'coin', 'pieniadze'],
    ['Pismo z urzędu', 'Zrób zdjęcie, wyjaśnimy', 'letter-1', 'letter', 'dom'],
  ];
  const shown = items.filter(x => cat === 'all' || x[4] === cat);
  type Progress = [string, number, string, string];
  const prog: Progress[] = [
    ['Dowód rejestracyjny', 3, 'case-meld', 'Odbiór od 2 grudnia'],
    ...(c.s.moved ? [['Przeprowadzka', 2, 'move-done', 'Urząd potwierdzi do 27.11'] as Progress] : []),
    ...(c.s.babyDone ? [['Nowe dziecko', 3, 'baby-done', '800+ w drodze'] as Progress] : []),
  ];
  return (
    <div>
      <Display>Sprawy</Display>
      <Search c={c} ph="Czego potrzebujesz?" />
      <div className="chips">
        {cats.map(([k, t]) => (
          <button aria-pressed={cat === k} onClick={() => setCat(k)}>
            {t}
          </button>
        ))}
      </div>
      <Label t="W toku" />
      <List>
        {prog.map(([t, n, r, s2]) => (
          <ListItem as="button" onClick={() => c.go(r)}>
            <Ring v={n} max={4} size={40}>
              <b className="text-[11px]">{n}/4</b>
            </Ring>
            <ListItemContent>
              <ListItemTitle>{t}</ListItemTitle>
              <ListItemDescription>{s2}</ListItemDescription>
            </ListItemContent>
            <ListItemChevron size={16} />
          </ListItem>
        ))}
      </List>
      <Label t="Załatw od początku do końca" />
      <div className="mgrid">
        {shown.map(([t, s2, r, n]) => (
          <Tile t={t} s={s2} n={n} onClick={() => c.go(r)} />
        ))}
      </div>
    </div>
  );
}
