import { Field, FieldLabel, FieldSource, FieldValue } from '@/components/ui/field';
import { List, ListRow, ListRowContent, ListRowDescription, ListRowTitle } from '@/components/ui/list';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Note } from '@/components/ui/note';
import { Eyebrow, Lead, Muted, Title } from '@/components/ui/typography';
import { Actions, Button } from '@/components/ui/button';
import { useState } from 'react';
import { I } from '@/ui/icons';
import { Hero } from '@/ui/illustrations';
import { Progress, Row, Src } from '@/ui/primitives';
import type { Ctx } from '@/types';
import type { MoveSelection } from '@/types';

export function Move1(c: Ctx) {
  return (
    <div>
      <Eyebrow>Przeprowadzka · krok 1 z 4</Eyebrow>
      <Progress n={1} of={4} />
      <Hero n="move" />
      <Title>Dokąd się przeprowadzasz?</Title>
      <List>
        <Field>
          <FieldLabel>Nowy adres</FieldLabel>
          <FieldValue>ul. Długa 12/4, 31-147 Kraków</FieldValue>
          <FieldSource>{I('check', 12)} Z umowy najmu, którą dodałaś 20 listopada</FieldSource>
        </Field>
        <Field>
          <FieldLabel>Od kiedy</FieldLabel>
          <FieldValue>1 grudnia 2026</FieldValue>
        </Field>
        <Field>
          <FieldLabel>Kto się przeprowadza</FieldLabel>
          <FieldValue>Ty, Tomasz, Zosia</FieldValue>
        </Field>
      </List>
      <Actions>
        <Button onClick={() => c.go('move-2')}>Dalej</Button>
      </Actions>
    </div>
  );
}

export function Move2(c: Ctx) {
  const [on, setOn] = useState<MoveSelection>({ meld: true, gp: true, vote: true, car: true });
  const items = [
    ['meld', 'Urząd Miasta Krakowa', 'Zameldowanie na pobyt stały, 3 osoby', 'UM', '#3b5bab'],
    ['gp', 'Narodowy Fundusz Zdrowia', 'Lekarz rodzinny: Przychodnia Długa, 300 m', 'NFZ', '#1c7a4c'],
    ['vote', 'Krajowe Biuro Wyborcze', 'Miejsce głosowania: obwód nr 87', 'KBW', '#8a5a14'],
    ['car', 'Wydział Komunikacji', 'Adres w dowodzie rejestracyjnym, do 30 dni', 'WK', '#6b3fa0'],
  ];
  const n = Object.values(on).filter(Boolean).length;
  return (
    <div>
      <Eyebrow>Przeprowadzka · krok 2 z 4</Eyebrow>
      <Progress n={2} of={4} />
      <Title>Zaktualizuj adres we wszystkich urzędach</Title>
      <Lead>
        Asystent znalazł 4 miejsca, gdzie Twój adres musi się zmienić. Odznacz to, czego nie chcesz teraz
        załatwiać.
      </Lead>
      <Card style={{ padding: '6px 0' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '12px 18px 6px',
          }}
        >
          <Muted as="span">ul. Długa 12/4, Kraków</Muted>
          <Muted as="span">{n} z 4</Muted>
        </div>
        {items.map(([k, t, sub, ini]) => (
          <ListRow
            as="button"
            role="checkbox"
            aria-checked={on[k]}
            onClick={() => setOn({ ...on, [k]: !on[k] })}
          >
            <span className="org">{ini}</span>
            <ListRowContent>
              <ListRowTitle>{t}</ListRowTitle>
              <ListRowDescription>{sub}</ListRowDescription>
            </ListRowContent>
            <span className="check" aria-checked={on[k]}>
              {on[k] ? I('check', 15) : ''}
            </span>
          </ListRow>
        ))}
      </Card>
      <Note icon="sparkle" style={{ marginTop: '12px' }}>
        Asystent może się mylić. W następnym kroku zobaczysz każde pole i jego źródło.
      </Note>
      <Actions>
        <Button
          onClick={() => {
            c.set({ moveSel: on });
            c.go('move-3');
          }}
        >
          Pokaż podgląd
        </Button>
      </Actions>
    </div>
  );
}

export function Move3(c: Ctx) {
  const sel = c.s.moveSel || { meld: true, gp: true, vote: true, car: true };
  const n = Object.values(sel).filter(Boolean).length;
  return (
    <div>
      <Eyebrow>Przeprowadzka · krok 3 z 4</Eyebrow>
      <Progress n={3} of={4} />
      <Title>Sprawdź przed wysłaniem</Title>
      {sel.meld && (
        <>
          <div className="sec">
            <h3>Zameldowanie</h3>
          </div>
          <List>
            <Field>
              <FieldLabel>Osoby</FieldLabel>
              <FieldValue>Anna, Tomasz i Zofia Nowiccy</FieldValue>
              <Src t="rejestr PESEL" />
            </Field>
            <Field>
              <FieldLabel>Adres</FieldLabel>
              <FieldValue>ul. Długa 12/4, 31-147 Kraków</FieldValue>
              <Src t="umowa najmu z 20.11" />
            </Field>
            <Field>
              <FieldLabel>Zgoda właściciela</FieldLabel>
              <FieldValue>Jan Kowalczyk · potwierdzi w swojej aplikacji</FieldValue>
            </Field>
          </List>
        </>
      )}
      {sel.gp && (
        <>
          <div className="sec">
            <h3>Lekarz rodzinny</h3>
          </div>
          <List>
            <Field>
              <FieldLabel>Nowa przychodnia</FieldLabel>
              <FieldValue>Przychodnia Długa, ul. Długa 40</FieldValue>
              <Src t="NFZ, wyszukiwarka placówek" />
            </Field>
          </List>
        </>
      )}
      {sel.vote && (
        <>
          <div className="sec">
            <h3>Wybory</h3>
          </div>
          <List>
            <Field>
              <FieldLabel>Nowy lokal wyborczy</FieldLabel>
              <FieldValue>Lokal nr 87, Szkoła Podstawowa nr 9</FieldValue>
              <Src t="Krajowe Biuro Wyborcze" />
            </Field>
          </List>
        </>
      )}
      {sel.car && (
        <>
          <div className="sec">
            <h3>Samochód</h3>
          </div>
          <List>
            <Field>
              <FieldLabel>Pojazd</FieldLabel>
              <FieldValue>Toyota Yaris, KR 4F21</FieldValue>
              <Src t="CEPiK" />
            </Field>
          </List>
        </>
      )}
      <Actions>
        <Button
          onClick={() =>
            c.confirm({
              t: `Wysłać ${n} ${n === 1 ? 'wniosek' : 'wnioski'}?`,
              items: ['Zameldowanie', 'Lekarz rodzinny', 'Miejsce głosowania', 'Dowód rejestracyjny'].filter(
                (_, i) => Object.values(sel)[i],
              ),
              ok: 'Potwierdź i wyślij',
              done: () => {
                c.set({ moved: true });
                c.go('move-done');
              },
            })
          }
        >
          Potwierdź
        </Button>
        <Button variant="secondary" onClick={() => c.go('move-2')}>
          Wróć i zmień
        </Button>
      </Actions>
    </div>
  );
}

export function MoveDone(c: Ctx) {
  return (
    <div>
      <Hero n="move" />
      <div
        className="done-mark"
        style={{ marginTop: '-34px', marginLeft: '16px', position: 'relative', border: '4px solid #fff' }}
      >
        {I('check', 28)}
      </div>
      <Title>Wysłane. Resztą zajmiemy się razem.</Title>
      <List>
        <Row
          t="Zameldowanie"
          s="Przyjęte. Właściciel potwierdził o 15:12."
          right={<Badge>Przyjęte</Badge>}
          onClick={() => {}}
        />
        <Row
          t="Lekarz rodzinny"
          s="Deklaracja aktywna od 1 grudnia"
          right={<Badge>Gotowe</Badge>}
          onClick={() => {}}
        />
        <Row t="Miejsce głosowania" s="Zmienione" right={<Badge>Gotowe</Badge>} onClick={() => {}} />
        <Row
          t="Dowód rejestracyjny"
          s="Urząd odpowie do 8 grudnia"
          right={<Badge>W toku</Badge>}
          onClick={() => c.go('case-meld')}
        />
      </List>
      <Actions>
        <Button onClick={() => c.go('today')}>Wróć do ekranu Dziś</Button>
      </Actions>
    </div>
  );
}
