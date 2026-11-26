import { Field, FieldLabel, FieldValue } from '@/components/ui/field';
import { List, ListRow, ListRowContent, ListRowDescription, ListRowTitle } from '@/components/ui/list';
import { Badge } from '@/components/ui/badge';
import { Note } from '@/components/ui/note';
import { Eyebrow, Lead, Title } from '@/components/ui/typography';
import { Actions, Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { I } from '@/ui/icons';
import { Hero } from '@/ui/illustrations';
import { Progress, Row, Src, Toggle } from '@/ui/primitives';
import type { Ctx } from '@/types';

export function Baby1(c: Ctx) {
  return (
    <div>
      <Eyebrow>Nowe dziecko · krok 1 z 4</Eyebrow>
      <Progress n={1} of={4} />
      <Hero n="baby" />
      <Title>Gratulacje! Zgłośmy narodziny.</Title>
      <Note icon="doc">Szpital Uniwersytecki zgłosił urodzenie 15 listopada. Masz czas do 6 grudnia.</Note>
      <List className="mt-3">
        <Field>
          <FieldLabel>Imię dziecka</FieldLabel>
          <FieldValue>Julia</FieldValue>
        </Field>
        <Field>
          <FieldLabel>Nazwisko</FieldLabel>
          <FieldValue>Nowicka</FieldValue>
          <Src t="nazwisko Zosi, zgodne z oświadczeniem rodziców" />
        </Field>
        <Field>
          <FieldLabel>Data i miejsce urodzenia</FieldLabel>
          <FieldValue>15 listopada 2026, Kraków</FieldValue>
          <Src t="karta urodzenia ze szpitala" />
        </Field>
        <Field>
          <FieldLabel>Adres</FieldLabel>
          <FieldValue>ul. Długa 12/4, Kraków</FieldValue>
        </Field>
      </List>
      <Actions>
        <Button onClick={() => c.go('baby-2')}>Dalej</Button>
      </Actions>
    </div>
  );
}

export function Baby2(c: Ctx) {
  const [on, setOn] = useState<Record<string, boolean>>({ p800: true, nfz: true, pass: false });
  return (
    <div>
      <Eyebrow>Nowe dziecko · krok 2 z 4</Eyebrow>
      <Progress n={2} of={4} />
      <Title>Co załatwić od razu?</Title>
      <Lead>Po zgłoszeniu Julia dostanie PESEL i adres automatycznie. Te sprawy wypełnimy za Ciebie:</Lead>
      <List>
        {[
          ['p800', '800+', 'Wniosek do ZUS, bez logowania na stronę ZUS'],
          ['nfz', 'Ubezpieczenie zdrowotne', 'Zgłoszenie do NFZ przez Twojego pracodawcę'],
          ['pass', 'Paszport', 'Gdy planujecie podróż'],
        ].map(([k, t, s]) => (
          <ListRow>
            <ListRowContent>
              <ListRowTitle>{t}</ListRowTitle>
              <ListRowDescription>{s}</ListRowDescription>
            </ListRowContent>
            <Toggle on={on[k]} label={t} set={(v: boolean) => setOn({ ...on, [k]: v })} />
          </ListRow>
        ))}
      </List>
      <Actions>
        <Button onClick={() => c.go('baby-3')}>Pokaż podgląd</Button>
      </Actions>
    </div>
  );
}

export function Baby3(c: Ctx) {
  const [stage, setStage] = useState(0);
  useEffect(() => {
    if (stage === 1) {
      const t = setTimeout(() => setStage(2), 2200);
      return () => clearTimeout(t);
    }
  }, [stage]);
  return (
    <div>
      <Eyebrow>Nowe dziecko · krok 3 z 4</Eyebrow>
      <Progress n={3} of={4} />
      <Title>Sprawdź i poproś Tomasza o zgodę</Title>
      <List>
        <Field>
          <FieldLabel>Akt urodzenia</FieldLabel>
          <FieldValue>Julia Nowicka, 15.11.2026, Kraków</FieldValue>
          <Src t="szpital" />
        </Field>
        <Field>
          <FieldLabel>800+</FieldLabel>
          <FieldValue>800 zł/mies., konto •• 4821</FieldValue>
          <Src t="wniosek na Zosię z 2026" />
        </Field>
        <Field>
          <FieldLabel>NFZ</FieldLabel>
          <FieldValue>Julia będzie ubezpieczona razem z Anną</FieldValue>
          <Src t="ZUS, dane pracodawcy" />
        </Field>
      </List>
      {stage === 0 && (
        <Actions>
          <Button onClick={() => setStage(1)}>Poproś Tomasza o zgodę</Button>
        </Actions>
      )}
      {stage === 1 && (
        <Note icon="bell" tone="amber" className="mt-3.5">
          Tomasz dostał prośbę. Czekamy, aż potwierdzi…
        </Note>
      )}
      {stage === 2 && (
        <div>
          <Note icon="check" tone="green" className="mt-3.5">
            Tomasz potwierdził na swoim telefonie o 15:31.
          </Note>
          <Actions>
            <Button
              onClick={() =>
                c.confirm({
                  t: 'Wysłać pakiet „Nowe dziecko”?',
                  items: ['Zgłoszenie urodzenia', 'Wniosek 800+', 'Zgłoszenie do NFZ'],
                  ok: 'Potwierdź i wyślij',
                  done: () => {
                    c.set({ babyDone: true });
                    c.go('baby-done');
                  },
                })
              }
            >
              Potwierdź
            </Button>
          </Actions>
        </div>
      )}
    </div>
  );
}

export function BabyDone(c: Ctx) {
  return (
    <div>
      <Hero n="baby" />
      <div className="w-15 h-15 rounded-[50%] [color:#fff] grid place-items-center m-[26px_0_4px] [box-shadow:var(--shadow-s)] border-(--app)! motion-safe:animate-[pop_0.5s_0.15s_var(--ease-spring)_both] [background:var(--ink)] mt-[-34px] ml-4 relative [border:4px_solid_#fff]">
        {I('check', 28)}
      </div>
      <Title>Witaj, Julio.</Title>
      <List>
        <Row
          t="Akt urodzenia"
          s="Odpis wysłany na e-Doręczenia"
          right={<Badge>Gotowe</Badge>}
          onClick={() => {}}
        />
        <Row
          t="PESEL i zameldowanie"
          s="Nadane automatycznie"
          right={<Badge>Gotowe</Badge>}
          onClick={() => {}}
        />
        <Row
          t="Ubezpieczenie NFZ"
          s="Aktywne od 15 listopada"
          right={<Badge>Gotowe</Badge>}
          onClick={() => {}}
        />
        <Row
          t="800+"
          s="Decyzja ZUS do 24 grudnia, z wyrównaniem"
          right={<Badge>W toku</Badge>}
          onClick={() => c.go('p800')}
        />
      </List>
      <Actions>
        <Button onClick={() => c.go('family')}>Zobacz kartę Julii w Bliskich</Button>
      </Actions>
    </div>
  );
}
