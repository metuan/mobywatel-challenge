import { Card } from '@/components/ui/card';
import { Caption, Eyebrow, Title } from '@/components/ui/typography';
import { Actions, Button } from '@/components/ui/button';
import { sx } from '@/lib/sx';
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
      <div className="list">
        <div className="field">
          <div className="l">Wystawił</div>
          <div className="v">dr Ewa Mazur, Przychodnia Zdrowia nr 3</div>
        </div>
        <div className="field">
          <div className="l">Powód</div>
          <div className="v">Szmer serca, kontrola</div>
        </div>
        <div className="field">
          <div className="l">Ważne do</div>
          <div className="v">21 listopada 2027</div>
        </div>
      </div>
      <Actions>
        <Button onClick={() => c.go('visit-2')}>Zarezerwuj wizytę</Button>
      </Actions>
      <Caption style={{ marginTop: '10px' }}>
        Przez system rejestracji NFZ. Nie musisz przepisywać kodu.
      </Caption>
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
      <div className="seg full" style={{ marginBottom: '12px' }}>
        <button aria-pressed="true">Najszybciej</button>
        <button aria-pressed="false" onClick={() => c.toast('Sortowanie po odległości w pełnej wersji')}>
          Najbliżej
        </button>
        <button aria-pressed="false" onClick={() => c.toast('Filtr godzin w pełnej wersji')}>
          Po 15:00
        </button>
      </div>
      <div className="list">
        {slots.map(([d, p, km], i) => (
          <button className="row" onClick={() => setPick(i)} aria-pressed={pick === i}>
            <span className="ic" style={sx(pick === i ? 'background:var(--navy);color:#fff' : '')}>
              {pick === i ? I('check', 18) : ''}
            </span>
            <span className="tx">
              <div className="t">{d}</div>
              <div className="s">
                {p} · {km}
              </div>
            </span>
          </button>
        ))}
      </div>
      <Card className="row" style={{ marginTop: '12px' }}>
        <span className="tx">
          <div className="t">Poczekalnia</div>
          <div className="s">
            Jeśli zwolni się wcześniejszy termin, przeniesiemy wizytę i zapytamy Cię o zgodę.
          </div>
        </span>
        <Toggle on={wait} set={setWait} label="Poczekalnia" />
      </Card>
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
      <div className="list">
        <div className="field">
          <div className="l">Pacjent</div>
          <div className="v">Zofia Nowicka</div>
        </div>
        <div className="field">
          <div className="l">Termin</div>
          <div className="v">{s[0]}</div>
        </div>
        <div className="field">
          <div className="l">Miejsce</div>
          <div className="v">{s[1]}</div>
        </div>
        <div className="field">
          <div className="l">Zabierz</div>
          <div className="v">Wyniki EKG, książeczka zdrowia</div>
        </div>
      </div>
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
      <div
        className="done-mark"
        style={{ marginTop: '-34px', marginLeft: '16px', position: 'relative', border: '4px solid #fff' }}
      >
        {I('check', 28)}
      </div>
      <Title>Wizyta Zosi: {c.s.visit || '15 grudnia, 10:30'}</Title>
      <div className="list">
        <div className="row">
          <span className="tx">
            <div className="t">Przypomnienia</div>
            <div className="s">7 dni i 1 dzień przed, Tobie i Tomaszowi</div>
          </span>
          <Toggle on={true} set={() => {}} label="Przypomnienia" />
        </div>
        <Row
          icon="list"
          t="Dodano do kalendarza rodziny"
          s="Widzi też Tomasz"
          onClick={() => c.go('calendar')}
        />
      </div>
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
