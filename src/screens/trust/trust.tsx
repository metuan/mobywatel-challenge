import {
  List,
  ListRow,
  ListRowContent,
  ListRowDescription,
  ListRowIcon,
  ListRowTile,
  ListRowTitle,
} from '@/components/ui/list';
import { Badge } from '@/components/ui/badge';
import { Note } from '@/components/ui/note';
import { Caption, Lead, Muted, Title } from '@/components/ui/typography';
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
      <Title>Kto sprawdzał moje dane</Title>
      <Lead>Listopad 2026. Każde sprawdzenie Twoich dokumentów lub rejestrów.</Lead>
      <List>
        {LOG.map((l, i) => (
          <ListRow className="items-start">
            <ListRowIcon>{I('eye', 18)}</ListRowIcon>
            <ListRowContent>
              <ListRowTitle>{l.who}</ListRowTitle>
              <ListRowDescription>{l.why}</ListRowDescription>
              <Caption as="div">
                {l.when} · {l.how}
              </Caption>
              {flag === i ? (
                <Note icon="check" tone="red" compact className="mt-2">
                  Zgłosiliśmy to do CERT Polska i do instytucji, która sprawdzała dane. Odpowiedź w ciągu 7
                  dni.
                </Note>
              ) : (
                <button
                  className="link font-medium text-ink [text-decoration:underline] underline-offset-[3px] [&&]:decoration-hair-2 text-[13px] mt-1.5"

                  onClick={() => setFlag(i)}
                >
                  To nie ja
                </button>
              )}
            </ListRowContent>
          </ListRow>
        ))}
      </List>
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
    <div className="text-center">
      <div className="w-21 h-21 rounded-[26px] bg-fill grid place-items-center text-ink m-[10px_auto_12px] motion-safe:[&.scan]:animate-[pulse_1s_ease-in-out_infinite] scan mt-[60px]">
        {I('eye', 40)}
      </div>
      <Title>Zaloguj się twarzą</Title>
      <Lead>
        Bez kodów i haseł. Klucz dostępu działa tylko na stronach i w aplikacjach rządowych, więc fałszywa
        strona go nie przechwyci.
      </Lead>
      <Actions>
        <Button onClick={() => c.go('today')}>Kontynuuj</Button>
        <Button variant="secondary">Użyj kodu PIN</Button>
      </Actions>
      <Caption>Wzorowane na Singpass (Singapur).</Caption>
    </div>
  );
}

export function Offline(c: Ctx) {
  return (
    <div>
      <div className="offline mt-2 -mr-5 mb-0 -ml-5">
        {I('wifi', 16)} Aktualizacja się nie powiodła. Nie masz internetu, ale najważniejsze rzeczy działają.
      </div>
      <Title>Twoje dokumenty są bezpieczne.</Title>
      <Lead>
        mDowód, prawo jazdy i poradnik bezpieczeństwa działają bez połączenia. Usługi online wrócą po
        aktualizacji.
      </Lead>
      <List>
        <Row icon="card" t="mDowód" s="Działa bez internetu" onClick={() => c.go('doc-id')} />
        <Row
          icon="shield"
          t="Poradnik bezpieczeństwa"
          s="Działa bez internetu"
          onClick={() => c.go('alert-guide')}
        />
      </List>
      <Actions>
        <Button>Spróbuj zaktualizować ponownie</Button>
      </Actions>
      <Muted as="p" className="mt-2.5">
        Masz telefon z Androidem 8? Miesiąc przed końcem wsparcia aplikacja Cię ostrzeże i powie, co zrobić.
      </Muted>
    </div>
  );
}

/* 8: Urządzenia i sesje */
export function Devices(c: Ctx) {
  const [lost, setLost] = useState(c.s.lost || false);
  return (
    <div>
      <Title>Urządzenia i sesje</Title>
      <Lead>
        Tu widzisz, gdzie jesteś zalogowana. Jeśli zgubisz telefon, wyloguj go stąd albo z gov.pl na innym
        urządzeniu.
      </Lead>
      <List>
        <ListRow>
          <ListRowTile>{I('phone', 18)}</ListRowTile>
          <ListRowContent>
            <ListRowTitle>iPhone 15 · ten telefon</ListRowTitle>
            <ListRowDescription>Kraków · aktywny teraz</ListRowDescription>
          </ListRowContent>
        </ListRow>
        <ListRow>
          <ListRowTile tone={lost ? 'gray' : 'default'}>{I('phone', 18)}</ListRowTile>
          <ListRowContent>
            <ListRowTitle>iPhone 11 · stary</ListRowTitle>
            <ListRowDescription>
              {lost ? 'Wylogowany, mDowód usunięty z telefonu' : 'Ostatnio: 2 listopada, Katowice'}
            </ListRowDescription>
          </ListRowContent>
          {lost ? (
            <Badge>Wylogowany</Badge>
          ) : (
            <button
              className="mini inline-flex gap-1.5 items-center whitespace-nowrap motion-safe:[&:active]:transform-[scale(0.97)] font-semibold text-[15px] p-[6px_14px] bg-fill rounded-[999px] text-signal-red"

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
        </ListRow>
        <ListRow>
          <ListRowTile>{I('card', 18)}</ListRowTile>
          <ListRowContent>
            <ListRowTitle>Przeglądarka · gov.pl</ListRowTitle>
            <ListRowDescription>MacBook · dziś, 9:12</ListRowDescription>
          </ListRowContent>
        </ListRow>
      </List>
      <Note icon="bell" className="mt-3.5">
        Dostaniesz powiadomienie przy każdym nowym logowaniu. Jeśli to nie Ty, wylogujesz je jednym ruchem.
      </Note>
    </div>
  );
}

/* 9: Tarcza antyoszustwa */
export function Scam(c: Ctx) {
  const [chk, setChk] = useState(false);
  return (
    <div>
      <Hero n="lock" />
      <Title>Tarcza antyoszustwa</Title>
      <Lead>Wklej podejrzaną wiadomość. Sprawdzimy link na liście ostrzeżeń CERT Polska.</Lead>
      <div className="[background:#e9e9eb] rounded-[18px_18px_18px_4px] p-[10px_14px] text-[16px] max-w-[88%]">
        <div className="text-[12px] text-ink-2 mb-1">SMS · +48 731 •••</div>Twoja paczka czeka. Dopłać 1,99
        zł: inpost-dopłata.pl/x7
      </div>
      {!chk ? (
        <Actions>
          <Button onClick={() => setChk(true)}>Sprawdź wiadomość</Button>
        </Actions>
      ) : (
        <div className="verdict bg-white rounded-[14px] p-4 mt-3.5 [border-left:4px_solid_var(--signal-red)]">
          <div className="[.verdict_&]:flex [.verdict_&]:gap-1.5 [.verdict_&]:items-center [.verdict_&]:font-bold [.verdict_&]:text-[18px] [.verdict_&]:text-signal-red [.verdict_&]:mb-1.5">
            {I('x', 18)} To oszustwo
          </div>
          <Muted className="text-ink">
            Ta strona jest na liście ostrzeżeń CERT Polska od 21 listopada. Firmy kurierskie nie proszą o
            dopłaty SMS-em z linkiem.
          </Muted>
          <Actions row className="mt-3">
            <Button variant="secondary" onClick={() => c.toast('Usunięte')}>
              Usuń
            </Button>
            <Button onClick={() => c.toast('Przekazano do CERT Polska (SMS 8080)')}>Zgłoś do CERT</Button>
          </Actions>
        </div>
      )}
      <List className="mt-3.5">
        <ListRow>
          <ListRowTile tone="green">{I('check', 18)}</ListRowTile>
          <ListRowContent>
            <ListRowTitle>mObywatel nigdy nie pisze SMS-ów z linkiem</ListRowTitle>
            <ListRowDescription>
              Prawdziwe wiadomości od urzędów są tylko w Skrzynce aplikacji
            </ListRowDescription>
          </ListRowContent>
        </ListRow>
      </List>
    </div>
  );
}
