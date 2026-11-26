import { html } from '@/lib/preact';
import { I } from '@/ui/icons';
import { Hero } from '@/ui/illustrations';
import { GRow, Label, Ring, Row } from '@/ui/primitives';

export function Benefits(c) {
  return html`<div><${Hero} n="coin" bg="yellow"/><h1 class="h-l">Świadczenia, które mogą Ci przysługiwać</h1>
    <div class="note amber">${I('lock', 18)}<span>Sprawdzamy to tylko za Twoją zgodą, na podstawie danych o rodzinie. Nic nie składamy bez Ciebie.</span></div>
    <div class="list" style="margin-top:12px">
      <${Row} icon="coin" t="800+ na drugie dziecko" s="Po urodzeniu Julii" right=${html`<span class="pill p-green">Pasuje</span>`} onClick=${() => c.go('baby-1')}/>
      <${Row} icon="card" t="Karta Dużej Rodziny" s="Od trojga dzieci" right=${html`<span class="pill p-gray">Nie teraz</span>`} onClick=${() => {}}/>
      <${Row} icon="coin" t="Ulga na dzieci w PIT" s="Przy rozliczeniu za 2026" right=${html`<span class="pill p-green">Pasuje</span>`} onClick=${() => {}}/>
    </div></div>`;
}

/* Hop 8: 800+ with a payment history and countdown */
export function P800(c) {
  const M = ['cze', 'lip', 'sie', 'wrz', 'paź', 'lis', 'gru', 'sty', 'lut', 'mar', 'kwi', 'maj'];
  return html`<div class="p8">
    <p class="stepk">Świadczenie dla Zosi</p><h1 class="h-l">800+</h1>
    <div class="p8-hero"><${Ring} v=${26} max=${30} size=${76} w=${4}><b>2</b><small>dni</small></${Ring}>
      <div><div class="gs">Następna wypłata</div><div class="p8-v">800 zł</div><div class="gs">28 listopada · konto •• 4821</div></div></div>
    <${Label} t="Wypłaty od czerwca 2026 do maja 2027"/>
    <div class="card p8-chart">
      <div class="bars">${M.map((m, i) => html`<span class=${i < 5 ? 'paid' : i === 5 ? 'next' : ''}><i style=${`--i:${i}`}></i><small>${m}</small></span>`)}</div>
      <div class="p8-sum"><span><b>4 000 zł</b> wypłacone</span><span>5 z 12</span></div>
    </div>
    ${
      c.s.babyDone
        ? html`<${Label} t="Julia"/><div class="glist"><${GRow} ic="baby" t="Wniosek w ZUS" s="Decyzja do 24 grudnia" v="W toku"/></div>`
        : html`<div class="glist" style="margin-top:12px"><${GRow} ic="baby" t="Urodziło się dziecko?" s="Wniosek o 800+ złożysz w pakiecie „Nowe dziecko”" onClick=${() => c.go('baby-1')}/></div>`
    }
    <p class="tiny" style="margin-top:12px">Nie musisz logować się do ZUS ani do banku.</p></div>`;
}

/* Hop 9: vaccinations as a timeline */
export function Vacc(c) {
  const V = [
    ['6 lat', 'MMR, dawka 2', 'Zalecane do 31 grudnia', 'due'],
    ['6 lat', 'DTaP, dawka 5', 'Wykonane 12 września 2026', 'ok'],
    ['6 lat', 'Polio, dawka 4', 'Wykonane 12 września 2026', 'ok'],
    ['14 lat', 'HPV', 'Za 8 lat, przypomnimy', 'later'],
    ['19 lat', 'Td, przypominająca', 'Za 13 lat', 'later'],
  ];
  return html`<div><p class="stepk">Zosia, 6 lat</p><h1 class="h-l">Szczepienia</h1>
    <div class="vt">${V.map(
      ([
        age,
        t,
        s,
        st,
      ]) => html`<div class=${'vt-i ' + st}><span class="vt-dot">${st === 'ok' ? I('check', 12) : ''}</span>
      <div class="vt-b"><div class="gt">${t}</div><div class="gs">${s}</div>${st === 'due' && html`<button class="pill" style="margin-top:10px" onClick=${() => c.go('visit-1')}>Umów szczepienie</button>`}</div><span class="vt-age">${age}</span></div>`,
    )}</div>
    <p class="tiny">Z Internetowego Konta Pacjenta. Oboje rodzice widzą to samo.</p></div>`;
}
