import { List, ListRow, ListRowContent, ListRowDescription, ListRowTitle } from '@/components/ui/list';
import { Badge } from '@/components/ui/badge';
import { Eyebrow, Lead, Title } from '@/components/ui/typography';
import { Actions, Button } from '@/components/ui/button';
import { payWrap } from '@/screens/money/pay';
import { Hero } from '@/ui/illustrations';
import { Row, Sec } from '@/ui/primitives';
import type { Ctx } from '@/types';

export function CarSell(c: Ctx) {
  return (
    <div>
      <Eyebrow>Ważny moment</Eyebrow>
      <Title>Sprzedaż samochodu</Title>
      <Lead>
        Jedna sprawa w aplikacji zamiast trzech wizyt w urzędach. Kupujący potwierdza w swojej aplikacji.
      </Lead>
      <div className="road">
        {[
          'Wpisz numer PESEL lub NIP kupującego',
          'Kupujący potwierdza zakup w swojej aplikacji',
          'Zgłaszamy sprzedaż auta w starostwie',
          'Przenosimy lub wypowiadamy OC',
        ].map((t, i) => (
          <>
            <div className="n">{i + 1}</div>
            <div className="b">{t}</div>
          </>
        ))}
      </div>
      <Actions>
        <Button onClick={() => c.toast('Ten ekran jest tylko przykładem.')}>Rozpocznij</Button>
      </Actions>
    </div>
  );
}

/* 6: Mój samochód (rozbudowany) */
function CarFullBase(c: Ctx) {
  return (
    <div>
      <Hero n="car" />
      <Title>Toyota Yaris</Title>
      <Lead style={{ marginTop: '-6px' }}>KR 4F21 · 2019 · benzyna</Lead>
      <div className="stats">
        <div>
          <div className="l">OC</div>
          <div className="v red">12 dni</div>
        </div>
        <div>
          <div className="l">Przegląd</div>
          <div className="v">82 dni</div>
        </div>
        <div>
          <div className="l">Punkty</div>
          <div className="v">3 / 24</div>
        </div>
      </div>
      <List>
        <Row
          icon="shield"
          t="OC: Warta, do 6 grudnia"
          s="Porównaj oferty i przedłuż"
          onClick={() => c.toast('Pokażemy oferty OC. Wybór i zakup po Twojej stronie.')}
        />
        <Row icon="car" t="Przegląd techniczny" s="Do 14 lutego 2027 · 98 412 km" onClick={() => {}} />
        <Row
          icon="doc"
          t="Punkty karne: 3"
          s="Przekroczenie prędkości, 12 września. Wygasną 12 września 2027"
          onClick={() => {}}
        />
      </List>
      <Sec t="Mandaty" />
      <List>
        <ListRow>
          <ListRowContent>
            <ListRowTitle>Mandat 200 zł</ListRowTitle>
            <ListRowDescription>
              Parkowanie, ul. Długa, 18 listopada · do zapłaty do 25 listopada
            </ListRowDescription>
          </ListRowContent>
          {c.s.paid ? (
            <Badge>Opłacony</Badge>
          ) : (
            <button
              className="mini"
              onClick={() =>
                c.confirm({
                  t: 'Zapłacić mandat 200 zł?',
                  items: ['Mandat nr KR 0021934', 'Odbiorca: Straż Miejska Kraków', 'Płatność BLIK'],
                  ok: 'Zapłać',
                  done: () => {
                    c.set({ paid: true });
                    c.toast('Opłacono. Potwierdzenie w Skrzynce.');
                  },
                })
              }
            >
              Zapłać
            </button>
          )}
        </ListRow>
      </List>
      <Actions>
        <Button variant="secondary" onClick={() => c.go('car-sell')}>
          Sprzedaję ten samochód
        </Button>
      </Actions>
    </div>
  );
}

export function CarFull(c: Ctx) {
  return CarFullBase(
    payWrap(
      c,
      o =>
        /mandat/i.test(o.t || '') && { amt: '200 zł', t: 'Mandat nr KR 0021934', to: 'Straż Miejska Kraków' },
    ),
  );
}
