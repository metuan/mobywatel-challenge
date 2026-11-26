import { html, useState } from '@/lib/preact';
import { I } from '@/ui/icons';
import { Hero } from '@/ui/illustrations';
import { Progress, Row, Src } from '@/ui/primitives';
import type { Ctx } from '@/types';
import type { MoveSelection } from '@/types';

export function Move1(c: Ctx) {
  return html`<div>
    <p class="stepk">Przeprowadzka · krok 1 z 4</p><${Progress} n=${1} of=${4}/>
    <${Hero} n="move" bg="sand"/>
    <h1 class="h-l">Dokąd się przeprowadzasz?</h1>
    <div class="list">
      <div class="field"><div class="l">Nowy adres</div><div class="v">ul. Długa 12/4, 31-147 Kraków</div><div class="src">${I('check', 12)} Z umowy najmu, którą dodałaś 20 listopada</div></div>
      <div class="field"><div class="l">Od kiedy</div><div class="v">1 grudnia 2026</div></div>
      <div class="field"><div class="l">Kto się przeprowadza</div><div class="v">Ty, Tomasz, Zosia</div></div>
    </div>
    <div class="actions"><button class="btn" onClick=${() => c.go('move-2')}>Dalej</button></div>
  </div>`;
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
  return html`<div>
    <p class="stepk">Przeprowadzka · krok 2 z 4</p><${Progress} n=${2} of=${4}/>
    <h1 class="h-l">Zaktualizuj adres we wszystkich urzędach</h1>
    <p class="lead">Asystent znalazł 4 miejsca, gdzie Twój adres musi się zmienić. Odznacz to, czego nie chcesz teraz załatwiać.</p>
    <div class="card" style="padding:6px 0">
      <div style="display:flex;justify-content:space-between;align-items:center;padding:12px 18px 6px"><span class="small">ul. Długa 12/4, Kraków</span><span class="small">${n} z 4</span></div>
      ${items.map(
        ([
          k,
          t,
          sub,
          ini,
        ]) => html`<button class="row" role="checkbox" aria-checked=${on[k]} onClick=${() => setOn({ ...on, [k]: !on[k] })}>
        <span class="org">${ini}</span>
        <span class="tx"><div class="t">${t}</div><div class="s">${sub}</div></span>
        <span class="check" aria-checked=${on[k]}>${on[k] ? I('check', 15) : ''}</span></button>`,
      )}
    </div>
    <div class="note" style="margin-top:12px">${I('sparkle', 18)}<span>Asystent może się mylić. W następnym kroku zobaczysz każde pole i jego źródło.</span></div>
    <div class="actions"><button class="btn" onClick=${() => {
      c.set({ moveSel: on });
      c.go('move-3');
    }}>Pokaż podgląd</button></div>
  </div>`;
}

export function Move3(c: Ctx) {
  const sel = c.s.moveSel || { meld: true, gp: true, vote: true, car: true };
  const n = Object.values(sel).filter(Boolean).length;
  return html`<div>
    <p class="stepk">Przeprowadzka · krok 3 z 4</p><${Progress} n=${3} of=${4}/>
    <h1 class="h-l">Sprawdź przed wysłaniem</h1>
    ${
      sel.meld &&
      html`<div class="sec"><h3>Zameldowanie</h3></div><div class="list">
      <div class="field"><div class="l">Osoby</div><div class="v">Anna, Tomasz i Zofia Nowiccy</div><${Src} t="rejestr PESEL"/></div>
      <div class="field"><div class="l">Adres</div><div class="v">ul. Długa 12/4, 31-147 Kraków</div><${Src} t="umowa najmu z 20.11"/></div>
      <div class="field"><div class="l">Zgoda właściciela</div><div class="v">Jan Kowalczyk · potwierdzi w swojej aplikacji</div></div></div>`
    }
    ${sel.gp && html`<div class="sec"><h3>Lekarz rodzinny</h3></div><div class="list"><div class="field"><div class="l">Nowa przychodnia</div><div class="v">Przychodnia Długa, ul. Długa 40</div><${Src} t="NFZ, wyszukiwarka placówek"/></div></div>`}
    ${sel.vote && html`<div class="sec"><h3>Wybory</h3></div><div class="list"><div class="field"><div class="l">Nowy lokal wyborczy</div><div class="v">Lokal nr 87, Szkoła Podstawowa nr 9</div><${Src} t="Krajowe Biuro Wyborcze"/></div></div>`}
    ${sel.car && html`<div class="sec"><h3>Samochód</h3></div><div class="list"><div class="field"><div class="l">Pojazd</div><div class="v">Toyota Yaris, KR 4F21</div><${Src} t="CEPiK"/></div></div>`}
    <div class="actions"><button class="btn" onClick=${() =>
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
      })}>Potwierdź</button>
    <button class="btn ghost" onClick=${() => c.go('move-2')}>Wróć i zmień</button></div>
  </div>`;
}

export function MoveDone(c: Ctx) {
  return html`<div>
    <${Hero} n="move" bg="mint"/>
    <div class="done-mark" style="margin-top:-34px;margin-left:16px;position:relative;border:4px solid #fff">${I('check', 28)}</div>
    <h1 class="h-l">Wysłane. Resztą zajmiemy się razem.</h1>
    <div class="list">
      <${Row} t="Zameldowanie" s="Przyjęte. Właściciel potwierdził o 15:12." right=${html`<span class="pill p-green">Przyjęte</span>`} onClick=${() => {}}/>
      <${Row} t="Lekarz rodzinny" s="Deklaracja aktywna od 1 grudnia" right=${html`<span class="pill p-green">Gotowe</span>`} onClick=${() => {}}/>
      <${Row} t="Miejsce głosowania" s="Zmienione" right=${html`<span class="pill p-green">Gotowe</span>`} onClick=${() => {}}/>
      <${Row} t="Dowód rejestracyjny" s="Urząd odpowie do 8 grudnia" right=${html`<span class="pill p-navy">W toku</span>`} onClick=${() => c.go('case-meld')}/>
    </div>
    <div class="actions"><button class="btn" onClick=${() => c.go('today')}>Wróć do ekranu Dziś</button></div>
  </div>`;
}
