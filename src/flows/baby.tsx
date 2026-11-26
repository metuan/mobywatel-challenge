import { useEffect, useState } from 'react';
import { I } from '@/ui/icons';
import { Hero } from '@/ui/illustrations';
import { Progress, Row, Src, Toggle } from '@/ui/primitives';
import type { Ctx } from '@/types';

export function Baby1(c: Ctx) {
  return (
    <div>
      <p className="stepk">Nowe dziecko · krok 1 z 4</p>
      <Progress n={1} of={4} />
      <Hero n="baby" />
      <h1 className="h-l">Gratulacje! Zgłośmy narodziny.</h1>
      <div className="note">
        {I('doc', 18)}
        <span>Szpital Uniwersytecki zgłosił urodzenie 15 listopada. Masz czas do 6 grudnia.</span>
      </div>
      <div className="list" style={{ marginTop: '12px' }}>
        <div className="field">
          <div className="l">Imię dziecka</div>
          <div className="v">Julia</div>
        </div>
        <div className="field">
          <div className="l">Nazwisko</div>
          <div className="v">Nowicka</div>
          <Src t="nazwisko Zosi, zgodne z oświadczeniem rodziców" />
        </div>
        <div className="field">
          <div className="l">Data i miejsce urodzenia</div>
          <div className="v">15 listopada 2026, Kraków</div>
          <Src t="karta urodzenia ze szpitala" />
        </div>
        <div className="field">
          <div className="l">Adres</div>
          <div className="v">ul. Długa 12/4, Kraków</div>
        </div>
      </div>
      <div className="actions">
        <button className="btn" onClick={() => c.go('baby-2')}>
          Dalej
        </button>
      </div>
    </div>
  );
}

export function Baby2(c: Ctx) {
  const [on, setOn] = useState<Record<string, boolean>>({ p800: true, nfz: true, pass: false });
  return (
    <div>
      <p className="stepk">Nowe dziecko · krok 2 z 4</p>
      <Progress n={2} of={4} />
      <h1 className="h-l">Co załatwić od razu?</h1>
      <p className="lead">
        Po zgłoszeniu Julia dostanie PESEL i adres automatycznie. Te sprawy wypełnimy za Ciebie:
      </p>
      <div className="list">
        {[
          ['p800', '800+', 'Wniosek do ZUS, bez logowania na stronę ZUS'],
          ['nfz', 'Ubezpieczenie zdrowotne', 'Zgłoszenie do NFZ przez Twojego pracodawcę'],
          ['pass', 'Paszport', 'Gdy planujecie podróż'],
        ].map(([k, t, s]) => (
          <div className="row">
            <span className="tx">
              <div className="t">{t}</div>
              <div className="s">{s}</div>
            </span>
            <Toggle on={on[k]} label={t} set={(v: boolean) => setOn({ ...on, [k]: v })} />
          </div>
        ))}
      </div>
      <div className="actions">
        <button className="btn" onClick={() => c.go('baby-3')}>
          Pokaż podgląd
        </button>
      </div>
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
      <p className="stepk">Nowe dziecko · krok 3 z 4</p>
      <Progress n={3} of={4} />
      <h1 className="h-l">Sprawdź i poproś Tomasza o zgodę</h1>
      <div className="list">
        <div className="field">
          <div className="l">Akt urodzenia</div>
          <div className="v">Julia Nowicka, 15.11.2026, Kraków</div>
          <Src t="szpital" />
        </div>
        <div className="field">
          <div className="l">800+</div>
          <div className="v">800 zł/mies., konto •• 4821</div>
          <Src t="wniosek na Zosię z 2026" />
        </div>
        <div className="field">
          <div className="l">NFZ</div>
          <div className="v">Julia będzie ubezpieczona razem z Anną</div>
          <Src t="ZUS, dane pracodawcy" />
        </div>
      </div>
      {stage === 0 && (
        <div className="actions">
          <button className="btn" onClick={() => setStage(1)}>
            Poproś Tomasza o zgodę
          </button>
        </div>
      )}
      {stage === 1 && (
        <div className="note amber" style={{ marginTop: '14px' }}>
          {I('bell', 18)}
          <span>Tomasz dostał prośbę. Czekamy, aż potwierdzi…</span>
        </div>
      )}
      {stage === 2 && (
        <div>
          <div className="note green" style={{ marginTop: '14px' }}>
            {I('check', 18)}
            <span>Tomasz potwierdził na swoim telefonie o 15:31.</span>
          </div>
          <div className="actions">
            <button
              className="btn"
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
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export function BabyDone(c: Ctx) {
  return (
    <div>
      <Hero n="baby" />
      <div
        className="done-mark"
        style={{ marginTop: '-34px', marginLeft: '16px', position: 'relative', border: '4px solid #fff' }}
      >
        {I('check', 28)}
      </div>
      <h1 className="h-l">Witaj, Julio.</h1>
      <div className="list">
        <Row
          t="Akt urodzenia"
          s="Odpis wysłany na e-Doręczenia"
          right={<span className="pill p-green">Gotowe</span>}
          onClick={() => {}}
        />
        <Row
          t="PESEL i zameldowanie"
          s="Nadane automatycznie"
          right={<span className="pill p-green">Gotowe</span>}
          onClick={() => {}}
        />
        <Row
          t="Ubezpieczenie NFZ"
          s="Aktywne od 15 listopada"
          right={<span className="pill p-green">Gotowe</span>}
          onClick={() => {}}
        />
        <Row
          t="800+"
          s="Decyzja ZUS do 24 grudnia, z wyrównaniem"
          right={<span className="pill p-navy">W toku</span>}
          onClick={() => c.go('p800')}
        />
      </div>
      <div className="actions">
        <button className="btn" onClick={() => c.go('family')}>
          Zobacz kartę Julii w Bliskich
        </button>
      </div>
    </div>
  );
}
