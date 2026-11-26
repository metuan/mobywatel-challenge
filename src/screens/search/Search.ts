import { html, useEffect, useRef, useState } from '@/lib/preact';
import { norm } from '@/lib/env';
import { HOWTO, HowCard, howFor, showMe } from '@/story/howto';
import { I, P } from '@/ui/icons';
import { Label } from '@/ui/primitives';

/* Hop 12: search that answers while you type */
const IDX = [['Przeprowadzka', 'Zameldowanie, lekarz, wybory, auto', 'move-1', 'move'], ['Nowe dziecko', 'Akt, PESEL, 800+, NFZ', 'baby-1', 'baby'], ['Dowód osobisty', 'Mój dowód i kod QR', 'doc-id', 'card'],
  ['Pokaż, że masz 18 lat', 'Bez imienia i adresu', 'share-min', 'eye'], ['Sprzedaż auta', 'Zgłoszenie i OC', 'car-sell', 'car'], ['Mój samochód', 'OC, przegląd, punkty, mandaty', 'car', 'car'],
  ['Kardiolog dla Zosi', 'e-Skierowanie i wolne terminy', 'visit-1', 'steth'], ['Szczepienia Zosi', 'Kalendarz szczepień', 'vacc', 'steth'], ['800+', 'Wypłaty i wnioski', 'p800', 'coin'],
  ['Podatki', 'e-PIT, zwrot, opłaty lokalne', 'taxes', 'coin'], ['Pismo z urzędu', 'Zrób zdjęcie, wyjaśnimy', 'letter-1', 'letter'], ['Skrzynka', 'Pisma ze wszystkich urzędów', 'inbox', 'inbox'],
  ['Najbliższy schron', 'Trasa bez internetu', 'alert-shelter', 'route'], ['Karta ratunkowa', 'Grupa krwi, alergie', 'ice', 'heart'], ['Zgubiony portfel', 'Zastrzeż wszystko naraz', 'lost', 'lock'],
  ['Kto sprawdzał moje dane', 'Historia dostępu', 'access-log', 'eye'], ['Moje zgody', 'Rodzina, firmy, asystent', 'consents', 'key'], ['Paszport Zosi', 'Zgoda obojga rodziców', 'renew-pass', 'card'],
  ['Podpisz projekt ustawy', 'Petycje i komitety', 'sign-1', 'doc'], ['Za granicą', 'Portfel UE', 'eu', 'card'], ['Kto do mnie dzwoni?', 'Sprawdź, czy to naprawdę urząd', 'caller', 'call'],
  ['Szkoła Zosi', 'Frekwencja, zgody, oceny', 'school', 'doc'], ['Kalendarz rodziny', 'Wszystkie terminy', 'calendar', 'list']];

export function Search({ c, ph = 'Szukaj albo zapytaj, jak coś zrobić', auto, init = '' }) {
  const [q, setQ] = useState(init); const ref = useRef(null);
  useEffect(() => { if (!auto) return; const a = setTimeout(() => ref.current && ref.current.focus(), 250); return () => clearTimeout(a); }, []);
  const how = howFor(q);
  const hits = q.trim() ? IDX.filter(x => norm(x[0] + ' ' + x[1]).includes(norm(q.trim()))).slice(0, how ? 3 : 5) : [];
  const enter = () => how ? showMe(c, how) : hits[0] ? c.go(hits[0][2]) : c.ask(q || 'Jak zameldować się w nowym mieszkaniu?');
  return html`<div class="srch8"><div class="search"><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><circle cx="11" cy="11" r="6.5"/><path d="m16 16 4.5 4.5"/></svg>
    <input ref=${ref} value=${q} onInput=${e => setQ(e.target.value)} onKeyDown=${e => e.key === 'Enter' && enter()} placeholder=${ph} aria-label=${ph}/>
    ${q ? html`<button aria-label="Wyczyść" onClick=${() => setQ('')}>${I('x', 16)}</button>` : html`<button aria-label="Mów" onClick=${() => c.ask('Kiedy kończy się ważność mojego dowodu?')}>${I('mic', 18)}</button>`}</div>
    ${how && html`<${HowCard} c=${c} h=${how}/>`}
    ${q.trim() && html`<div class="hits">${hits.map(([t, s, r, ic]) => html`<button class="hit" onClick=${() => c.go(r)}><span class="lead-i">${I(P[ic] ? ic : 'doc', 18)}</span><span class="gtx"><span class="gt">${t}</span><span class="gs">${s}</span></span></button>`)}
      <button class="hit ask" onClick=${() => c.ask(q)}><span class="lead-i ai">${I('sparkle', 18)}</span><span class="gtx"><span class="gt">Zapytaj asystenta: „${q}”</span><span class="gs">Odpowiedź z gov.pl, ze źródłami</span></span></button></div>`}</div>`;
}

export function SearchScreen(c) {
  const [pick, setPick] = useState('');
  return html`<div><h1 class="h-l">Szukaj</h1><${Search} key=${pick} init=${pick} c=${c} auto=${!pick}/>
    ${!pick && html`<${Label} t="Jak to zrobić?"/>
    <div class="how8-list">${HOWTO.slice(0, 5).map(h => html`<button class="how8-row" onClick=${() => setPick(h.q)}><span class="lead-i ai">${I('sparkle', 16)}</span><span>${h.q}</span><span class="gch">${I('chevron', 16)}</span></button>`)}</div>
    <${Label} t="Często szukane"/><div class="chips wrap">${['Przeprowadzka', 'Dowód', '800+', 'Schron', 'Podatki', 'Recepta'].map(t => html`<button onClick=${() => { const h = IDX.find(x => norm(x[0] + x[1]).includes(norm(t))); h ? c.go(h[2]) : c.ask(t); }}>${t}</button>`)}</div>`}
  </div>`;
}
