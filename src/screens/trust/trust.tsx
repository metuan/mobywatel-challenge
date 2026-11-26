import { Actions, Button } from '@/components/ui/button';
import { useState } from 'react';
import { LOG } from '@/data/household';
import { I } from '@/ui/icons';
import { Hero } from '@/ui/illustrations';
import { Row } from '@/ui/primitives';
import type { Ctx } from '@/types';

export function AccessLog(c: Ctx) {
  const [flag, setFlag] = useState<number | null>(null);
  return (
    <div>
      <Hero n="lock" />
      <h1 className="h-l">Kto sprawdzał moje dane</h1>
      <p className="lead">Listopad 2026. Każde sprawdzenie Twoich dokumentów lub rejestrów.</p>
      <div className="list">
        {LOG.map((l, i) => (
          <div className="row" style={{ alignItems: 'flex-start' }}>
            <span className="ic">{I('eye', 18)}</span>
            <span className="tx">
              <div className="t">{l.who}</div>
              <div className="s">{l.why}</div>
              <div className="tiny">
                {l.when} · {l.how}
              </div>
              {flag === i ? (
                <div className="note red" style={{ marginTop: '8px' }}>
                  {I('check', 16)}
                  <span>
                    Zgłosiliśmy to do CERT Polska i do instytucji, która sprawdzała dane. Odpowiedź w ciągu 7
                    dni.
                  </span>
                </div>
              ) : (
                <button
                  className="link"
                  style={{ fontSize: '13px', marginTop: '6px' }}
                  onClick={() => setFlag(i)}
                >
                  To nie ja
                </button>
              )}
            </span>
          </div>
        ))}
      </div>
      {flag !== null && (
        <Actions>
          <Button onClick={() => c.go('devices')}>Urządzenia na moim koncie</Button>
        </Actions>
      )}
    </div>
  );
}

export function Signin(c: Ctx) {
  return (
    <div style={{ textAlign: 'center' }}>
      <div className="face scan" style={{ marginTop: '60px' }}>
        {I('eye', 40)}
      </div>
      <h1 className="h-l">Zaloguj się twarzą</h1>
      <p className="lead">
        Bez kodów i haseł. Klucz dostępu działa tylko na stronach i w aplikacjach rządowych, więc fałszywa
        strona go nie przechwyci.
      </p>
      <Actions>
        <Button onClick={() => c.go('today')}>Kontynuuj</Button>
        <Button variant="secondary">Użyj kodu PIN</Button>
      </Actions>
      <p className="tiny">Wzorowane na Singpass (Singapur).</p>
    </div>
  );
}

export function Offline(c: Ctx) {
  return (
    <div>
      <div className="offline" style={{ margin: '8px -20px 0' }}>
        {I('wifi', 16)} Aktualizacja się nie powiodła. Nie masz internetu, ale najważniejsze rzeczy działają.
      </div>
      <h1 className="h-l">Twoje dokumenty są bezpieczne.</h1>
      <p className="lead">
        mDowód, prawo jazdy i poradnik bezpieczeństwa działają bez połączenia. Usługi online wrócą po
        aktualizacji.
      </p>
      <div className="list">
        <Row icon="card" t="mDowód" s="Działa bez internetu" onClick={() => c.go('doc-id')} />
        <Row
          icon="shield"
          t="Poradnik bezpieczeństwa"
          s="Działa bez internetu"
          onClick={() => c.go('alert-guide')}
        />
      </div>
      <Actions>
        <Button>Spróbuj zaktualizować ponownie</Button>
      </Actions>
      <p className="small" style={{ marginTop: '10px' }}>
        Masz telefon z Androidem 8? Miesiąc przed końcem wsparcia aplikacja Cię ostrzeże i powie, co zrobić.
      </p>
    </div>
  );
}

/* 8: Urządzenia i sesje */
export function Devices(c: Ctx) {
  const [lost, setLost] = useState(c.s.lost || false);
  return (
    <div>
      <h1 className="h-l">Urządzenia i sesje</h1>
      <p className="lead">
        Tu widzisz, gdzie jesteś zalogowana. Jeśli zgubisz telefon, wyloguj go stąd albo z gov.pl na innym
        urządzeniu.
      </p>
      <div className="list">
        <div className="row">
          <span className="it">{I('phone', 18)}</span>
          <span className="tx">
            <div className="t">iPhone 15 · ten telefon</div>
            <div className="s">Kraków · aktywny teraz</div>
          </span>
        </div>
        <div className="row">
          <span className={lost ? 'it it-gray' : 'it'}>{I('phone', 18)}</span>
          <span className="tx">
            <div className="t">iPhone 11 · stary</div>
            <div className="s">
              {lost ? 'Wylogowany, mDowód usunięty z telefonu' : 'Ostatnio: 2 listopada, Katowice'}
            </div>
          </span>
          {lost ? (
            <span className="pill p-gray">Wylogowany</span>
          ) : (
            <button
              className="mini"
              style={{ color: '#ff3b30' }}
              onClick={() =>
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
                })
              }
            >
              Wyloguj
            </button>
          )}
        </div>
        <div className="row">
          <span className="it">{I('card', 18)}</span>
          <span className="tx">
            <div className="t">Przeglądarka · gov.pl</div>
            <div className="s">MacBook · dziś, 9:12</div>
          </span>
        </div>
      </div>
      <div className="note" style={{ marginTop: '14px' }}>
        {I('bell', 18)}
        <span>
          Dostaniesz powiadomienie przy każdym nowym logowaniu. Jeśli to nie Ty, wylogujesz je jednym ruchem.
        </span>
      </div>
    </div>
  );
}

/* 9: Tarcza antyoszustwa */
export function Scam(c: Ctx) {
  const [chk, setChk] = useState(false);
  return (
    <div>
      <Hero n="lock" />
      <h1 className="h-l">Tarcza antyoszustwa</h1>
      <p className="lead">Wklej podejrzaną wiadomość. Sprawdzimy link na liście ostrzeżeń CERT Polska.</p>
      <div className="sms">
        <div className="sms-h">SMS · +48 731 •••</div>Twoja paczka czeka. Dopłać 1,99 zł: inpost-dopłata.pl/x7
      </div>
      {!chk ? (
        <Actions>
          <Button onClick={() => setChk(true)}>Sprawdź wiadomość</Button>
        </Actions>
      ) : (
        <div className="verdict">
          <div className="vh">{I('x', 18)} To oszustwo</div>
          <div className="small" style={{ color: 'var(--ink)' }}>
            Ta strona jest na liście ostrzeżeń CERT Polska od 21 listopada. Firmy kurierskie nie proszą o
            dopłaty SMS-em z linkiem.
          </div>
          <Actions row style={{ marginTop: '12px' }}>
            <Button variant="secondary" onClick={() => c.toast('Usunięte')}>
              Usuń
            </Button>
            <Button onClick={() => c.toast('Przekazano do CERT Polska (SMS 8080)')}>Zgłoś do CERT</Button>
          </Actions>
        </div>
      )}
      <div className="list" style={{ marginTop: '14px' }}>
        <div className="row">
          <span className="it it-green">{I('check', 18)}</span>
          <span className="tx">
            <div className="t">mObywatel nigdy nie pisze SMS-ów z linkiem</div>
            <div className="s">Prawdziwe wiadomości od urzędów są tylko w Skrzynce aplikacji</div>
          </span>
        </div>
      </div>
    </div>
  );
}
