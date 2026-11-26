import { html, useState } from '@/lib/preact';
import { LOG } from '@/data/household';
import { I } from '@/ui/icons';
import { Hero } from '@/ui/illustrations';
import { Row } from '@/ui/primitives';
import type { Ctx } from '@/types';

export function AccessLog(c: Ctx) {
  const [flag, setFlag] = useState<number | null>(null);
  return html`<div>
    <${Hero} n="lock" bg="sky"/>
    <h1 class="h-l">Kto sprawdzał moje dane</h1>
    <p class="lead">Listopad 2026. Każde sprawdzenie Twoich dokumentów lub rejestrów.</p>
    <div class="list">${LOG.map(
      (
        l,
        i,
      ) => html`<div class="row" style="align-items:flex-start"><span class="ic">${I('eye', 18)}</span><span class="tx">
      <div class="t">${l.who}</div><div class="s">${l.why}</div><div class="tiny">${l.when} · ${l.how}</div>
      ${
        flag === i
          ? html`<div class="note red" style="margin-top:8px">${I('check', 16)}<span>Zgłosiliśmy to do CERT Polska i do instytucji, która sprawdzała dane. Odpowiedź w ciągu 7 dni.</span></div>`
          : html`<button class="link" style="font-size:13px;margin-top:6px" onClick=${() => setFlag(i)}>To nie ja</button>`
      }
    </span></div>`,
    )}</div>
    ${flag !== null && html`<div class="actions"><button class="btn" onClick=${() => c.go('devices')}>Urządzenia na moim koncie</button></div>`}
  </div>`;
}

export function Signin(c: Ctx) {
  return html`<div style="text-align:center">
    <div class="face scan" style="margin-top:60px">${I('eye', 40)}</div>
    <h1 class="h-l">Zaloguj się twarzą</h1>
    <p class="lead">Bez kodów i haseł. Klucz dostępu działa tylko na stronach i w aplikacjach rządowych, więc fałszywa strona go nie przechwyci.</p>
    <div class="actions"><button class="btn" onClick=${() => c.go('today')}>Kontynuuj</button><button class="btn ghost">Użyj kodu PIN</button></div>
    <p class="tiny">Wzorowane na Singpass (Singapur).</p></div>`;
}

export function Offline(c: Ctx) {
  return html`<div>
    <div class="offline" style="margin:8px -20px 0">${I('wifi', 16)} Aktualizacja się nie powiodła. Nie masz internetu, ale najważniejsze rzeczy działają.</div>
    <h1 class="h-l">Twoje dokumenty są bezpieczne.</h1>
    <p class="lead">mDowód, prawo jazdy i poradnik bezpieczeństwa działają bez połączenia. Usługi online wrócą po aktualizacji.</p>
    <div class="list">
      <${Row} icon="card" t="mDowód" s="Działa bez internetu" onClick=${() => c.go('doc-id')}/>
      <${Row} icon="shield" t="Poradnik bezpieczeństwa" s="Działa bez internetu" onClick=${() => c.go('alert-guide')}/>
    </div>
    <div class="actions"><button class="btn">Spróbuj zaktualizować ponownie</button></div>
    <p class="small" style="margin-top:10px">Masz telefon z Androidem 8? Miesiąc przed końcem wsparcia aplikacja Cię ostrzeże i powie, co zrobić.</p>
  </div>`;
}

/* 8: Urządzenia i sesje */
export function Devices(c: Ctx) {
  const [lost, setLost] = useState(c.s.lost || false);
  return html`<div>
    <h1 class="h-l">Urządzenia i sesje</h1>
    <p class="lead">Tu widzisz, gdzie jesteś zalogowana. Jeśli zgubisz telefon, wyloguj go stąd albo z gov.pl na innym urządzeniu.</p>
    <div class="list">
      <div class="row"><span class="it">${I('phone', 18)}</span><span class="tx"><div class="t">iPhone 15 · ten telefon</div><div class="s">Kraków · aktywny teraz</div></span></div>
      <div class="row"><span class="it" style=${lost ? 'background:#8e8e93!important' : ''}>${I('phone', 18)}</span><span class="tx"><div class="t">iPhone 11 · stary</div><div class="s">${lost ? 'Wylogowany, mDowód usunięty z telefonu' : 'Ostatnio: 2 listopada, Katowice'}</div></span>${
        lost
          ? html`<span class="pill p-gray">Wylogowany</span>`
          : html`<button class="mini" style="color:#ff3b30" onClick=${() =>
              c.confirm({
                t: 'Wylogować iPhone 11?',
                items: [
                  'Wylogujemy aplikację',
                  'Usuniemy z niego mDowód i dokumenty',
                  'Kod QR z tego telefonu przestanie działać',
                ],
                ok: 'Wyloguj',
                done: () => {
                  setLost(true);
                  c.set({ lost: true });
                },
              })}>Wyloguj</button>`
      }</div>
      <div class="row"><span class="it">${I('card', 18)}</span><span class="tx"><div class="t">Przeglądarka · gov.pl</div><div class="s">MacBook · dziś, 9:12</div></span></div>
    </div>
    <div class="note" style="margin-top:14px">${I('bell', 18)}<span>Dostaniesz powiadomienie przy każdym nowym logowaniu. Jeśli to nie Ty, wylogujesz je jednym ruchem.</span></div>
  </div>`;
}

/* 9: Tarcza antyoszustwa */
export function Scam(c: Ctx) {
  const [chk, setChk] = useState(false);
  return html`<div>
    <${Hero} n="lock"/>
    <h1 class="h-l">Tarcza antyoszustwa</h1>
    <p class="lead">Wklej podejrzaną wiadomość. Sprawdzimy link na liście ostrzeżeń CERT Polska.</p>
    <div class="sms"><div class="sms-h">SMS · +48 731 •••</div>Twoja paczka czeka. Dopłać 1,99 zł: inpost-dopłata.pl/x7</div>
    ${
      !chk
        ? html`<div class="actions"><button class="btn" onClick=${() => setChk(true)}>Sprawdź wiadomość</button></div>`
        : html`<div class="verdict">
        <div class="vh">${I('x', 18)} To oszustwo</div>
        <div class="small" style="color:var(--ink)">Ta strona jest na liście ostrzeżeń CERT Polska od 21 listopada. Firmy kurierskie nie proszą o dopłaty SMS-em z linkiem.</div>
        <div class="actions row2" style="margin-top:12px"><button class="btn soft" onClick=${() => c.toast('Usunięte')}>Usuń</button><button class="btn" onClick=${() => c.toast('Przekazano do CERT Polska (SMS 8080)')}>Zgłoś do CERT</button></div></div>`
    }
    <div class="list" style="margin-top:14px">
      <div class="row"><span class="it" style="background:#34c759!important">${I('check', 18)}</span><span class="tx"><div class="t">mObywatel nigdy nie pisze SMS-ów z linkiem</div><div class="s">Prawdziwe wiadomości od urzędów są tylko w Skrzynce aplikacji</div></span></div>
    </div>
  </div>`;
}
