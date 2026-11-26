import { Muted, Title } from '@/components/ui/typography';
import { Hero } from '@/ui/illustrations';
import { Row, Sec } from '@/ui/primitives';
import type { Ctx } from '@/types';

/* 7: Podatki */
function TaxesBase(c: Ctx) {
  return (
    <div>
      <Hero n="coin" />
      <Title>Podatki</Title>
      <div className="card taxhero">
        <Muted>PIT-37 za 2025 · Twój e-PIT · zwrot do 45 dni</Muted>
        <div className="big">1 284 zł</div>
        <Muted>zwrotu, wysłany 3 marca na konto •••• 4471</Muted>
        <div className="steps" style={{ gridTemplateColumns: 'repeat(3,1fr)' }}>
          <i className="on"></i>
          <i className="on"></i>
          <i className="on"></i>
        </div>
        <Muted>Złożony · przyjęty · zwrot wypłacony</Muted>
      </div>
      <Sec t="Opłaty lokalne" />
      <div className="list">
        <div className="row">
          <span className="tx">
            <div className="t">Podatek od nieruchomości</div>
            <div className="s">4. rata: 86 zł · termin 15 listopada</div>
          </span>
          {c.s.propPaid ? (
            <span className="pill p-green">Opłacony</span>
          ) : (
            <button
              className="mini"
              onClick={() => {
                c.set({ propPaid: true });
                c.toast('Opłacono 86 zł');
              }}
            >
              Zapłać
            </button>
          )}
        </div>
        <div className="row">
          <span className="tx">
            <div className="t">Opłata za śmieci</div>
            <div className="s">Grudzień: 3 osoby × 46 zł</div>
          </span>
          <span className="due">138 zł</span>
        </div>
      </div>
      <Sec t="Pisma" />
      <div className="list">
        <Row
          icon="mail"
          t="Wezwanie z urzędu skarbowego"
          s="Wyjaśnimy prostym językiem"
          onClick={() => c.go('letter-2')}
        />
      </div>
    </div>
  );
}

export function Taxes(c: Ctx) {
  const c2: Ctx = {
    ...c,
    set: p => {
      if (p && p.propPaid && !c.s.propPaid) {
        c.pay({
          amt: '86 zł',
          t: 'Podatek od nieruchomości, 4. rata',
          to: 'Urząd Miasta Krakowa',
          done: () => {
            c.set({ propPaid: true });
            c.toast('Opłacono 86 zł. Potwierdzenie w Skrzynce.');
          },
        });
      } else c.set(p);
    },
    toast: t => (typeof t === 'string' && /Opłacono 86/.test(t) ? null : c.toast(t)),
  };
  return TaxesBase(c2);
}
