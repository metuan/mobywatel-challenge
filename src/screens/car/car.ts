import { html } from '@/lib/preact';
import { payWrap } from '@/screens/money/pay';
import { Hero } from '@/ui/illustrations';
import { Row, Sec } from '@/ui/primitives';

function Car(c) {
  return html`<div><${Hero} n="car" bg="sky"/><h1 class="h-l">Toyota Yaris, KR 4F21</h1>
    <div class="list">
      <${Row} icon="shield" t="OC" s="Kończy się 6 grudnia" right=${html`<span class="pill p-red">12 dni</span>`} onClick=${() => c.toast('Pokażemy oferty OC. Wybór i zakup po Twojej stronie.')}/>
      <${Row} icon="car" t="Przegląd techniczny" s="Do 14 lutego 2027" right=${html`<span class="pill p-gray">82 dni</span>`} onClick=${() => {}}/>
      <${Row} icon="doc" t="Punkty karne" s="0 punktów" right=${html`<span class="pill p-green">Czysto</span>`} onClick=${() => {}}/>
    </div>
    <div class="actions"><button class="btn ghost" onClick=${() => c.go('car-sell')}>Sprzedaję ten samochód</button></div></div>`;
}

export function CarSell(c) {
  return html`<div><p class="stepk">Ważny moment</p><h1 class="h-l">Sprzedaż samochodu</h1>
    <p class="lead">Jedna sprawa w aplikacji zamiast trzech wizyt w urzędach. Kupujący potwierdza w swojej aplikacji.</p>
    <div class="road">${['Wpisz numer PESEL lub NIP kupującego', 'Kupujący potwierdza zakup w swojej aplikacji', 'Zgłaszamy sprzedaż auta w starostwie', 'Przenosimy lub wypowiadamy OC'].map((t, i) => html`<div class="n">${i + 1}</div><div class="b">${t}</div>`)}</div>
    <div class="actions"><button class="btn" onClick=${() => c.toast('Ten ekran jest tylko przykładem.')}>Rozpocznij</button></div></div>`;
}

/* 6: Mój samochód (rozbudowany) */
function CarFullBase(c) {
  return html`<div>
    <${Hero} n="car"/>
    <h1 class="h-l">Toyota Yaris</h1>
    <p class="lead" style="margin-top:-6px">KR 4F21 · 2019 · benzyna</p>
    <div class="stats">
      <div><div class="l">OC</div><div class="v red">12 dni</div></div>
      <div><div class="l">Przegląd</div><div class="v">82 dni</div></div>
      <div><div class="l">Punkty</div><div class="v">3 / 24</div></div>
    </div>
    <div class="list">
      <${Row} icon="shield" t="OC: Warta, do 6 grudnia" s="Porównaj oferty i przedłuż" onClick=${() => c.toast('Pokażemy oferty OC. Wybór i zakup po Twojej stronie.')}/>
      <${Row} icon="car" t="Przegląd techniczny" s="Do 14 lutego 2027 · 98 412 km" onClick=${() => {}}/>
      <${Row} icon="doc" t="Punkty karne: 3" s="Przekroczenie prędkości, 12 września. Wygasną 12 września 2027" onClick=${() => {}}/>
    </div>
    <${Sec} t="Mandaty"/>
    <div class="list">
      <div class="row"><span class="tx"><div class="t">Mandat 200 zł</div><div class="s">Parkowanie, ul. Długa, 18 listopada · do zapłaty do 25 listopada</div></span>${
        c.s.paid
          ? html`<span class="pill p-green">Opłacony</span>`
          : html`<button class="mini" onClick=${() =>
              c.confirm({
                t: 'Zapłacić mandat 200 zł?',
                items: ['Mandat nr KR 0021934', 'Odbiorca: Straż Miejska Kraków', 'Płatność BLIK'],
                ok: 'Zapłać',
                done: () => {
                  c.set({ paid: true });
                  c.toast('Opłacono. Potwierdzenie w Skrzynce.');
                },
              })}>Zapłać</button>`
      }</div>
    </div>
    <div class="actions"><button class="btn ghost" onClick=${() => c.go('car-sell')}>Sprzedaję ten samochód</button></div>
  </div>`;
}

export function CarFull(c) {
  return CarFullBase(
    payWrap(
      c,
      o => /mandat/i.test(o.t) && { amt: '200 zł', t: 'Mandat nr KR 0021934', to: 'Straż Miejska Kraków' },
    ),
  );
}
