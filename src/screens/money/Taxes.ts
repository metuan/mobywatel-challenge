import { html } from '@/lib/preact';
import { Hero } from '@/ui/illustrations';
import { Row, Sec } from '@/ui/primitives';

/* 7: Podatki */
function TaxesBase(c) {
  return html`<div>
    <${Hero} n="coin"/>
    <h1 class="h-l">Podatki</h1>
    <div class="card taxhero">
      <div class="small">PIT-37 za 2025 · Twój e-PIT · zwrot do 45 dni</div>
      <div class="big">1 284 zł</div><div class="small">zwrotu, wysłany 3 marca na konto •••• 4471</div>
      <div class="steps" style="grid-template-columns:repeat(3,1fr)"><i class="on"></i><i class="on"></i><i class="on"></i></div>
      <div class="small">Złożony · przyjęty · zwrot wypłacony</div>
    </div>
    <${Sec} t="Opłaty lokalne"/>
    <div class="list">
      <div class="row"><span class="tx"><div class="t">Podatek od nieruchomości</div><div class="s">4. rata: 86 zł · termin 15 listopada</div></span>${
        c.s.propPaid
          ? html`<span class="pill p-green">Opłacony</span>`
          : html`<button class="mini" onClick=${() => {
              c.set({ propPaid: true });
              c.toast('Opłacono 86 zł');
            }}>Zapłać</button>`
      }</div>
      <div class="row"><span class="tx"><div class="t">Opłata za śmieci</div><div class="s">Grudzień: 3 osoby × 46 zł</div></span><span class="due">138 zł</span></div>
    </div>
    <${Sec} t="Pisma"/>
    <div class="list"><${Row} icon="mail" t="Wezwanie z urzędu skarbowego" s="Wyjaśnimy prostym językiem" onClick=${() => c.go('letter-2')}/></div>
  </div>`;
}

export function Taxes(c) {
  const c2 = {
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
    toast: t => (/Opłacono 86/.test(t) ? null : c.toast(t)),
  };
  return TaxesBase(c2);
}
