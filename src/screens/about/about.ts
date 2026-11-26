import { html } from '@/lib/preact';
import { I } from '@/ui/icons';
import type { Ctx } from '@/types';

export function Roadmap(c: Ctx) {
  const r = [
    ['Karta ratunkowa bez internetu', 'Grupa krwi, alergie, kontakty alarmowe', 'ice'],
    ['Zgłaszanie szkód ze zdjęciami', 'Po ataku lub powodzi, komisja ogląda szkody', 'damage-1'],
    ['Identyfikator medyczny', 'Na ekranie blokady, tylko za zgodą', 'medical-id'],
    ['Zgoda obojga rodziców', 'Paszport dziecka bez wizyty drugiego rodzica', 'consent2'],
    ['Szkoła w aplikacji', 'Frekwencja, usprawiedliwienia, zgody', 'school'],
    ['Mój samochód', 'OC, przegląd, punkty, mandaty', 'car'],
    ['Podatki', 'Twój e-PIT, zwrot, opłaty lokalne', 'taxes'],
    ['Urządzenia i sesje', 'Wyloguj zgubiony telefon', 'devices'],
    ['Tarcza antyoszustwa', 'Sprawdź SMS, zgłoś do CERT', 'scam'],
    ['Tłumacz PJM', 'Wideo z tłumaczem na każdym ekranie', 'pjm'],
    ['Dokumenty od wystawcy', 'Dyplomy i uprawnienia bez skanów', 'issued'],
  ];
  return html`<div><h1 class="h-l">Nowe funkcje</h1><p class="lead">11 rzeczy, o które prosili ludzie w badaniach. Każdą da się kliknąć.</p>
    <div class="list">${r.map(([t, s, go], i) => html`<button class="row" onClick=${() => c.go(go)}><span class="it">${String(i + 1).padStart(2, '0')}</span><span class="tx"><div class="t">${t}</div><div class="s">${s}</div></span><span class="chev">${I('chevron', 18)}</span></button>`)}</div></div>`;
}

export function About(_c: Ctx) {
  return html`<div><h1 class="h-l">O tej koncepcji</h1>
    <p>Ten prototyp nowego mObywatela to niezależna koncepcja na konkurs mObywatel Challenge (mobywatel.ai). Nie jest oficjalną aplikacją mObywatel ani usługą administracji.</p>
    <p class="small">Wszystkie osoby, adresy i numery są fikcyjne. Asystent w tej wersji działa na przygotowanych scenariuszach. Wersja docelowa korzysta z polskich modeli językowych (Bielik lub PLLuM) z filtrem Bielik Guard.</p>
    <p class="small">Wzorce zaczerpnięte z: Diia (Ukraina), Singpass i LifeSG (Singapur), GOV.UK, Digital Post (Dania), aplikacja Home Front Command (Izrael), portfel EUDI.</p></div>`;
}
