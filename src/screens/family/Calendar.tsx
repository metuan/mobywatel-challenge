import { cn } from '@/lib/utils';
import {
  List,
  ListItem,
  ListItemChevron,
  ListItemContent,
  ListItemDescription,
  ListItemTitle,
} from '@/components/ui/list';
import { Lead, Title } from '@/components/ui/typography';
import type { Ctx } from '@/types';

/* 6. Family calendar: a date tile on the left, the same shape for every row, red only for what is urgent */
export function Calendar(c: Ctx) {
  const items: [string, string, string, string, number, string, number?][] = [
    ['28', 'lis', 'Wypłata 800+', 'Zosia', 4, 'p800'],
    ['6', 'gru', 'OC Toyota Yaris', 'Ty i Tomasz', 12, 'car', 1],
    ['15', 'gru', 'Kardiolog', 'Zosia', 21, 'visit-1'],
    ['31', 'gru', 'Szczepienie MMR', 'Zosia', 37, 'vacc'],
    ['4', 'sty', 'Paszport traci ważność', 'Zosia', 41, 'renew-pass'],
    ['26', 'sty', 'Dowód osobisty', 'Tata', 63, 'member-tata'],
    ['14', 'lut', 'Przegląd techniczny', 'Toyota Yaris', 82, 'car'],
  ];
  return (
    <div>
      <Title>Kalendarz rodziny</Title>
      <Lead>Najbliższe 90 dni. Każdy termin ma następny krok.</Lead>
      <List>
        {items.map(([d, m, t, w, left, r, urg]) => (
          <ListItem as="button" className={cn('gap-3.5', urg && 'urg')} onClick={() => c.go(r)}>
            <span className="cal-d">
              <b>{d}</b>
              <small>{m}</small>
            </span>
            <ListItemContent>
              <ListItemTitle>{t}</ListItemTitle>
              <ListItemDescription>{w}</ListItemDescription>
            </ListItemContent>
            <span className="cal-l">{left === 4 ? 'za 4 dni' : `za ${left} dni`}</span>
            <ListItemChevron size={16} />
          </ListItem>
        ))}
      </List>
    </div>
  );
}
