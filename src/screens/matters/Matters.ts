import { html, useState } from '@/lib/preact';
import { Search } from '@/screens/search/Search';
import { I } from '@/ui/icons';
import { Label, Ring, Tile } from '@/ui/primitives';

export function CaseMeld(c) {
  const st = [['Wniosek złożony', '14 listopada'], ['Opłata 54,50 zł', 'Zapłacono 14 listopada'], ['Dokument w produkcji', 'Od 20 listopada'], ['Odbiór', 'Od 2 grudnia, Wydział Komunikacji, ul. Wielicka 28a']];
  return html`<div>
    <p class="stepk">Sprawa</p><h1 class="h-l">Wymiana dowodu rejestracyjnego</h1>
    <div class="list">${st.map(([t, s], i) => html`<div class="row"><span class="ic" style=${i < 3 ? 'background:var(--green-soft);color:var(--green)' : ''}>${i < 3 ? I('check', 18) : html`<b>4</b>`}</span><span class="tx"><div class="t">${t}</div><div class="s">${s}</div></span></div>`)}</div>
    <div class="note" style="margin-top:14px">${I('bell', 18)}<span>Dostaniesz powiadomienie, gdy dokument będzie gotowy. Nie musisz dzwonić do urzędu.</span></div>
  </div>`;
}

export function Matters(c) {
  const [cat, setCat] = useState('all');
  const cats = [['all', 'Wszystkie'], ['dom', 'Dom'], ['rodzina', 'Rodzina'], ['auto', 'Auto'], ['zdrowie', 'Zdrowie'], ['pieniadze', 'Pieniądze']];
  const items = [['Przeprowadzka', '4 urzędy, ok. 10 minut', 'move-1', 'move', 'dom'], ['Nowe dziecko', 'Akt, PESEL, 800+, NFZ', 'baby-1', 'baby', 'rodzina'],
    ['Wizyta u specjalisty', 'e-Skierowanie i terminy', 'visit-1', 'doctor', 'zdrowie'], ['Sprzedaż auta', 'Zgłoszenie i OC', 'car-sell', 'car', 'auto'],
    ['Podatki', 'Twój e-PIT, opłaty', 'taxes', 'coin', 'pieniadze'], ['Pismo z urzędu', 'Zrób zdjęcie, wyjaśnimy', 'letter-1', 'letter', 'dom']];
  const shown = items.filter(x => cat === 'all' || x[4] === cat);
  const prog = [['Dowód rejestracyjny', 3, 'case-meld', 'Odbiór od 2 grudnia'], ...(c.s.moved ? [['Przeprowadzka', 2, 'move-done', 'Urząd potwierdzi do 27.11']] : []), ...(c.s.babyDone ? [['Nowe dziecko', 3, 'baby-done', '800+ w drodze']] : [])];
  return html`<div>
    <h1 class="h-xl">Sprawy</h1>
    <${Search} c=${c} ph="Czego potrzebujesz?"/>
    <div class="chips">${cats.map(([k, t]) => html`<button aria-pressed=${cat === k} onClick=${() => setCat(k)}>${t}</button>`)}</div>
    <${Label} t="W toku"/>
    <div class="glist">${prog.map(([t, n, r, s2]) => html`<button class="grow" onClick=${() => c.go(r)}><${Ring} v=${n} max=${4} size=${40}><b style="font-size:11px">${n}/4</b></${Ring}>
      <span class="gtx"><span class="gt">${t}</span><span class="gs">${s2}</span></span><span class="gch">${I('chevron', 16)}</span></button>`)}</div>
    <${Label} t="Załatw od początku do końca"/>
    <div class="mgrid">${shown.map(([t, s2, r, n]) => html`<${Tile} t=${t} s=${s2} n=${n} onClick=${() => c.go(r)}/>`)}</div>
  </div>`;
}
