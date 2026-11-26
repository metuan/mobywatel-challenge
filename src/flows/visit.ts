import { html, useState } from '@/lib/preact';
import { I } from '@/ui/icons';
import { Hero } from '@/ui/illustrations';
import { Row, Toggle } from '@/ui/primitives';

export function Visit1(c) {
  return html`<div>
    <p class="stepk">e-Skierowanie · Zosia</p>
    <${Hero} n="doctor" bg="rose"/>
    <h1 class="h-l">Kardiolog dziecięcy</h1>
    <div class="list">
      <div class="field"><div class="l">Wystawił</div><div class="v">dr Ewa Mazur, Przychodnia Zdrowia nr 3</div></div>
      <div class="field"><div class="l">Powód</div><div class="v">Szmer serca, kontrola</div></div>
      <div class="field"><div class="l">Ważne do</div><div class="v">21 listopada 2027</div></div>
    </div>
    <div class="actions"><button class="btn" onClick=${() => c.go('visit-2')}>Zarezerwuj wizytę</button></div>
    <p class="tiny" style="margin-top:10px">Przez system rejestracji NFZ. Nie musisz przepisywać kodu.</p>
  </div>`;
}

export function Visit2(c) {
  const [pick, setPick] = useState(0);
  const [wait, setWait] = useState(true);
  const slots = [
    ['15 grudnia, 10:30', 'Szpital Dziecięcy, Prokocim', '6,1 km'],
    ['19 grudnia, 08:00', 'Poradnia Kardiologiczna, Nowa Huta', '9,4 km'],
    ['8 stycznia, 12:15', 'Centrum Medyczne Ujastek', '11 km'],
  ];
  return html`<div>
    <p class="stepk">Wybierz termin</p><h1 class="h-l">Najbliższe terminy</h1>
    <div class="seg full" style="margin-bottom:12px"><button aria-pressed="true">Najszybciej</button><button aria-pressed="false" onClick=${() => c.toast('Sortowanie po odległości w pełnej wersji')}>Najbliżej</button><button aria-pressed="false" onClick=${() => c.toast('Filtr godzin w pełnej wersji')}>Po 15:00</button></div>
    <div class="list">${slots.map(
      ([d, p, km], i) => html`<button class="row" onClick=${() => setPick(i)} aria-pressed=${pick === i}>
      <span class="ic" style=${pick === i ? 'background:var(--navy);color:#fff' : ''}>${pick === i ? I('check', 18) : ''}</span>
      <span class="tx"><div class="t">${d}</div><div class="s">${p} · ${km}</div></span></button>`,
    )}</div>
    <div class="row card" style="margin-top:12px"><span class="tx"><div class="t">Poczekalnia</div><div class="s">Jeśli zwolni się wcześniejszy termin, przeniesiemy wizytę i zapytamy Cię o zgodę.</div></span><${Toggle} on=${wait} set=${setWait} label="Poczekalnia"/></div>
    <div class="actions"><button class="btn" onClick=${() => {
      c.set({ visitPick: slots[pick] });
      c.go('visit-3');
    }}>Dalej</button></div>
  </div>`;
}

export function Visit3(c) {
  const s = c.s.visitPick || ['15 grudnia, 10:30', 'Szpital Dziecięcy, Prokocim'];
  return html`<div>
    <p class="stepk">Podgląd</p><h1 class="h-l">Sprawdź rezerwację</h1>
    <div class="list">
      <div class="field"><div class="l">Pacjent</div><div class="v">Zofia Nowicka</div></div>
      <div class="field"><div class="l">Termin</div><div class="v">${s[0]}</div></div>
      <div class="field"><div class="l">Miejsce</div><div class="v">${s[1]}</div></div>
      <div class="field"><div class="l">Zabierz</div><div class="v">Wyniki EKG, książeczka zdrowia</div></div>
    </div>
    <div class="actions"><button class="btn" onClick=${() =>
      c.confirm({
        t: 'Zarezerwować wizytę?',
        items: [`Kardiolog dziecięcy, ${s[0]}`],
        ok: 'Potwierdź',
        done: () => {
          c.set({ visit: s[0] });
          c.go('visit-4');
        },
      })}>Potwierdź</button></div>
  </div>`;
}

export function Visit4(c) {
  return html`<div>
    <${Hero} n="doctor" bg="mint"/>
    <div class="done-mark" style="margin-top:-34px;margin-left:16px;position:relative;border:4px solid #fff">${I('check', 28)}</div>
    <h1 class="h-l">Wizyta Zosi: ${c.s.visit || '15 grudnia, 10:30'}</h1>
    <div class="list">
      <div class="row"><span class="tx"><div class="t">Przypomnienia</div><div class="s">7 dni i 1 dzień przed, Tobie i Tomaszowi</div></span><${Toggle} on=${true} set=${() => {}} label="Przypomnienia"/></div>
      <${Row} icon="list" t="Dodano do kalendarza rodziny" s="Widzi też Tomasz" onClick=${() => c.go('calendar')}/>
    </div>
    <div class="actions"><button class="btn ghost" onClick=${() => {
      c.set({ visit: null });
      c.toast('Wizyta odwołana. Termin może zająć ktoś inny.');
      c.go('family');
    }}>Odwołaj wizytę</button></div>
  </div>`;
}
