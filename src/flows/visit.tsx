import { Segmented } from '@/components/ui/segmented';
import { cn } from '@/lib/utils';
import { Field, FieldLabel, FieldValue } from '@/components/ui/field';
import {
  List,
  ListRow,
  ListRowContent,
  ListRowDescription,
  ListRowIcon,
  ListRowTitle,
} from '@/components/ui/list';
import { Card } from '@/components/ui/card';
import { Caption, Eyebrow, Title } from '@/components/ui/typography';
import { Actions, Button } from '@/components/ui/button';
import { useState } from 'react';
import { I } from '@/ui/icons';
import { Hero } from '@/ui/illustrations';
import { Row, Toggle } from '@/ui/primitives';
import type { Ctx } from '@/types';

export function Visit1(c: Ctx) {
  return (
    <div>
      <Eyebrow>e-Skierowanie · Zosia</Eyebrow>
      <Hero n="doctor" />
      <Title>Kardiolog dziecięcy</Title>
      <List>
        <Field>
          <FieldLabel>Wystawił</FieldLabel>
          <FieldValue>dr Ewa Mazur, Przychodnia Zdrowia nr 3</FieldValue>
        </Field>
        <Field>
          <FieldLabel>Powód</FieldLabel>
          <FieldValue>Szmer serca, kontrola</FieldValue>
        </Field>
        <Field>
          <FieldLabel>Ważne do</FieldLabel>
          <FieldValue>21 listopada 2027</FieldValue>
        </Field>
      </List>
      <Actions>
        <Button onClick={() => c.go('visit-2')}>Zarezerwuj wizytę</Button>
      </Actions>
      <Caption className="mt-2.5">Przez system rejestracji NFZ. Nie musisz przepisywać kodu.</Caption>
    </div>
  );
}

export function Visit2(c: Ctx) {
  const [pick, setPick] = useState(0);
  const [wait, setWait] = useState(true);
  const slots = [
    ['15 grudnia, 10:30', 'Szpital Dziecięcy, Prokocim', '6,1 km'],
    ['19 grudnia, 08:00', 'Poradnia Kardiologiczna, Nowa Huta', '9,4 km'],
    ['8 stycznia, 12:15', 'Centrum Medyczne Ujastek', '11 km'],
  ];
  return (
    <div>
      <Eyebrow>Wybierz termin</Eyebrow>
      <Title>Najbliższe terminy</Title>
      <Segmented
        className="mb-3"
        label="Sortowanie"
        value="fast"
        onValueChange={v =>
          c.toast(v === 'near' ? 'Sortowanie po odległości w pełnej wersji' : 'Filtr godzin w pełnej wersji')
        }
        options={[
          ['fast', 'Najszybciej'],
          ['near', 'Najbliżej'],
          ['late', 'Po 15:00'],
        ]}
      />
      <List>
        {slots.map(([d, p, km], i) => (
          <ListRow key={d} as="button" onClick={() => setPick(i)} aria-pressed={pick === i}>
            <ListRowIcon className={cn(pick === i && 'bg-ink text-white')}>
              {pick === i ? I('check', 18) : ''}
            </ListRowIcon>
            <ListRowContent>
              <ListRowTitle>{d}</ListRowTitle>
              <ListRowDescription>
                {p} · {km}
              </ListRowDescription>
            </ListRowContent>
          </ListRow>
        ))}
      </List>
      <ListRow as={Card} className="mt-3">
        <ListRowContent>
          <ListRowTitle>Poczekalnia</ListRowTitle>
          <ListRowDescription>
            Jeśli zwolni się wcześniejszy termin, przeniesiemy wizytę i zapytamy Cię o zgodę.
          </ListRowDescription>
        </ListRowContent>
        <Toggle on={wait} set={setWait} label="Poczekalnia" />
      </ListRow>
      <Actions>
        <Button
          onClick={() => {
            c.set({ visitPick: slots[pick] });
            c.go('visit-3');
          }}
        >
          Dalej
        </Button>
      </Actions>
    </div>
  );
}

export function Visit3(c: Ctx) {
  const s = c.s.visitPick || ['15 grudnia, 10:30', 'Szpital Dziecięcy, Prokocim'];
  return (
    <div>
      <Eyebrow>Podgląd</Eyebrow>
      <Title>Sprawdź rezerwację</Title>
      <List>
        <Field>
          <FieldLabel>Pacjent</FieldLabel>
          <FieldValue>Zofia Nowicka</FieldValue>
        </Field>
        <Field>
          <FieldLabel>Termin</FieldLabel>
          <FieldValue>{s[0]}</FieldValue>
        </Field>
        <Field>
          <FieldLabel>Miejsce</FieldLabel>
          <FieldValue>{s[1]}</FieldValue>
        </Field>
        <Field>
          <FieldLabel>Zabierz</FieldLabel>
          <FieldValue>Wyniki EKG, książeczka zdrowia</FieldValue>
        </Field>
      </List>
      <Actions>
        <Button
          onClick={() =>
            c.confirm({
              t: 'Zarezerwować wizytę?',
              items: [`Kardiolog dziecięcy, ${s[0]}`],
              ok: 'Potwierdź',
              done: () => {
                c.set({ visit: s[0] });
                c.go('visit-4');
              },
            })
          }
        >
          Potwierdź
        </Button>
      </Actions>
    </div>
  );
}

export function Visit4(c: Ctx) {
  return (
    <div>
      <Hero n="doctor" />
      <div className="w-15 h-15 rounded-[50%] text-white grid place-items-center m-[26px_0_4px] [box-shadow:var(--shadow-s)] border-bg! motion-safe:animate-[pop_0.5s_0.15s_var(--ease-spring)_both] bg-ink mt-[-34px] ml-4 relative [border:4px_solid_#fff]">
        {I('check', 28)}
      </div>
      <Title>Wizyta Zosi: {c.s.visit || '15 grudnia, 10:30'}</Title>
      <List>
        <ListRow>
          <ListRowContent>
            <ListRowTitle>Przypomnienia</ListRowTitle>
            <ListRowDescription>7 dni i 1 dzień przed, Tobie i Tomaszowi</ListRowDescription>
          </ListRowContent>
          <Toggle on={true} set={() => {}} label="Przypomnienia" />
        </ListRow>
        <Row
          icon="list"
          t="Dodano do kalendarza rodziny"
          s="Widzi też Tomasz"
          onClick={() => c.go('calendar')}
        />
      </List>
      <Actions>
        <Button
          variant="secondary"
          onClick={() => {
            c.set({ visit: null });
            c.toast('Wizyta odwołana. Termin może zająć ktoś inny.');
            c.go('family');
          }}
        >
          Odwołaj wizytę
        </Button>
      </Actions>
    </div>
  );
}
