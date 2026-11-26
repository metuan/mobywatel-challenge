import {
  List,
  ListRow,
  ListRowChevron,
  ListRowContent,
  ListRowDescription,
  ListRowTile,
  ListRowTitle,
} from '@/components/ui/list';
import { Lead, Muted, Title } from '@/components/ui/typography';
import type { Ctx } from '@/types';

export function Roadmap(c: Ctx) {
  const r = [
    ['Karta ratunkowa bez internetu', 'Grupa krwi, alergie, kontakty alarmowe', 'ice'],
    ['Zgłaszanie szkód ze zdjęciami', 'Po ataku lub powodzi, komisja ogląda szkody', 'damage-1'],
    ['Identyfikator medyczny', 'Na ekranie blokady, tylko za zgodą', 'medical-id'],
    ['Zgoda obojga rodziców', 'Paszport dziecka bez wizyty drugiego rodzica', 'consent2'],
    ['Szkoła w aplikacji', 'Frekwencja, usprawiedliwienia, zgody', 'school'],
    ['Mój samochód', 'OC, przegląd, punkty, mandaty', 'car'],
    ['Podatki', 'Twój e-PIT, zwrot, opłaty lokalne', 'taxes'],
    ['Urządzenia i sesje', 'Wyloguj zgubiony telefon', 'devices'],
    ['Tarcza antyoszustwa', 'Sprawdź SMS, zgłoś do CERT', 'scam'],
    ['Tłumacz PJM', 'Wideo z tłumaczem na każdym ekranie', 'pjm'],
    ['Dokumenty od wystawcy', 'Dyplomy i uprawnienia bez skanów', 'issued'],
  ];
  return (
    <div>
      <Title>Nowe funkcje</Title>
      <Lead>11 rzeczy, o które prosili ludzie w badaniach. Każdą da się kliknąć.</Lead>
      <List>
        {r.map(([t, s, go], i) => (
          <ListRow as="button" onClick={() => c.go(go)}>
            <ListRowTile>{String(i + 1).padStart(2, '0')}</ListRowTile>
            <ListRowContent>
              <ListRowTitle>{t}</ListRowTitle>
              <ListRowDescription>{s}</ListRowDescription>
            </ListRowContent>
            <ListRowChevron size={18} />
          </ListRow>
        ))}
      </List>
    </div>
  );
}

export function About(_c: Ctx) {
  return (
    <div>
      <Title>O tej koncepcji</Title>
      <p>
        Ten prototyp nowego mObywatela to niezależna koncepcja na konkurs mObywatel Challenge (mobywatel.ai).
        Nie jest oficjalną aplikacją mObywatel ani usługą administracji.
      </p>
      <Muted as="p">
        Wszystkie osoby, adresy i numery są fikcyjne. Asystent w tej wersji działa na przygotowanych
        scenariuszach. Wersja docelowa korzysta z polskich modeli językowych (Bielik lub PLLuM) z filtrem
        Bielik Guard.
      </Muted>
      <Muted as="p">
        Wzorce zaczerpnięte z: Diia (Ukraina), Singpass i LifeSG (Singapur), GOV.UK, Digital Post (Dania),
        aplikacja Home Front Command (Izrael), portfel EUDI.
      </Muted>
    </div>
  );
}
