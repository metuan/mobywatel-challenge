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
      <div className="list">
        <div className="field">
          <div className="l">Nowy adres</div>
          <div className="v">ul. Długa 12/4, 31-147 Kraków</div>
          <div className="src">{I('check', 12)} Z umowy najmu, którą dodałaś 20 listopada</div>
        </div>
        <div className="field">
          <div className="l">Od kiedy</div>
          <div className="v">1 grudnia 2026</div>
        </div>
        <div className="field">
          <div className="l">Kto się przeprowadza</div>
          <div className="v">Ty, Tomasz, Zosia</div>
        </div>
      </div>
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
      <div className="card" style={{ padding: '6px 0' }}>
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
          <button
            className="row"
            role="checkbox"
            aria-checked={on[k]}
            onClick={() => setOn({ ...on, [k]: !on[k] })}
          >
            <span className="org">{ini}</span>
            <span className="tx">
              <div className="t">{t}</div>
              <div className="s">{sub}</div>
            </span>
            <span className="check" aria-checked={on[k]}>
              {on[k] ? I('check', 15) : ''}
            </span>
          </button>
        ))}
      </div>
      <div className="note" style={{ marginTop: '12px' }}>
        {I('sparkle', 18)}
        <span>Asystent może się mylić. W następnym kroku zobaczysz każde pole i jego źródło.</span>
      </div>
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
          <div className="list">
            <div className="field">
              <div className="l">Osoby</div>
              <div className="v">Anna, Tomasz i Zofia Nowiccy</div>
              <Src t="rejestr PESEL" />
            </div>
            <div className="field">
              <div className="l">Adres</div>
              <div className="v">ul. Długa 12/4, 31-147 Kraków</div>
              <Src t="umowa najmu z 20.11" />
            </div>
            <div className="field">
              <div className="l">Zgoda właściciela</div>
              <div className="v">Jan Kowalczyk · potwierdzi w swojej aplikacji</div>
            </div>
          </div>
        </>
      )}
      {sel.gp && (
        <>
          <div className="sec">
            <h3>Lekarz rodzinny</h3>
          </div>
          <div className="list">
            <div className="field">
              <div className="l">Nowa przychodnia</div>
              <div className="v">Przychodnia Długa, ul. Długa 40</div>
              <Src t="NFZ, wyszukiwarka placówek" />
            </div>
          </div>
        </>
      )}
      {sel.vote && (
        <>
          <div className="sec">
            <h3>Wybory</h3>
          </div>
          <div className="list">
            <div className="field">
              <div className="l">Nowy lokal wyborczy</div>
              <div className="v">Lokal nr 87, Szkoła Podstawowa nr 9</div>
              <Src t="Krajowe Biuro Wyborcze" />
            </div>
          </div>
        </>
      )}
      {sel.car && (
        <>
          <div className="sec">
            <h3>Samochód</h3>
          </div>
          <div className="list">
            <div className="field">
              <div className="l">Pojazd</div>
              <div className="v">Toyota Yaris, KR 4F21</div>
              <Src t="CEPiK" />
            </div>
          </div>
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
      <div className="list">
        <Row
          t="Zameldowanie"
          s="Przyjęte. Właściciel potwierdził o 15:12."
          right={<span className="pill p-green">Przyjęte</span>}
          onClick={() => {}}
        />
        <Row
          t="Lekarz rodzinny"
          s="Deklaracja aktywna od 1 grudnia"
          right={<span className="pill p-green">Gotowe</span>}
          onClick={() => {}}
        />
        <Row
          t="Miejsce głosowania"
          s="Zmienione"
          right={<span className="pill p-green">Gotowe</span>}
          onClick={() => {}}
        />
        <Row
          t="Dowód rejestracyjny"
          s="Urząd odpowie do 8 grudnia"
          right={<span className="pill p-navy">W toku</span>}
          onClick={() => c.go('case-meld')}
        />
      </div>
      <Actions>
        <Button onClick={() => c.go('today')}>Wróć do ekranu Dziś</Button>
      </Actions>
    </div>
  );
}
