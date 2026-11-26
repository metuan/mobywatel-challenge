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
      <div className="road grid grid-cols-[auto_1fr] gap-[0_16px] [&_.n]:text-(--faint) [&_.n]:pt-3 [&_.n]:[font-family:var(--disp)] [&_.n]:font-bold [&_.n]:text-[20px]">
        {[
          'Wpisz numer PESEL lub NIP kupującego',
          'Kupujący potwierdza zakup w swojej aplikacji',
          'Zgłaszamy sprzedaż auta w starostwie',
          'Przenosimy lub wypowiadamy OC',
        ].map((t, i) => (
          <>
            <div className="n">{i + 1}</div>
            <div className="[.road_&]:[border-bottom:1px_solid_var(--hair)] [.road_&]:p-[13px_0] [.rcb_.hd_&]:w-5.5 [.rcb_.hd_&]:h-5.5 [.rcb_.hd_&]:rounded-[6px] [.rcb_.hd_&]:[color:#fff] [.rcb_.hd_&]:grid [.rcb_.hd_&]:place-items-center [.rcb.clear_.hd_&]:[background:var(--green)] [.rcb_.hd_&]:[background:rgb(255_255_255_/_20%)]">
              {t}
            </div>
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
      <Lead className="-mt-1.5">KR 4F21 · 2019 · benzyna</Lead>
      <div className="stats grid [grid-template-columns:repeat(3,_1fr)] gap-2 m-[4px_0_14px] [&_>_div]:[background:#fff] [&_>_div]:rounded-[12px] [&_>_div]:p-3 [&_.l]:text-[13px] [&_.l]:text-(--label2)">
        <div>
          <div className="l">OC</div>
          <div className="v [.ice-g_&]:text-[17px] [.ice-g_&]:font-semibold [.stats_&]:text-[20px] [.stats_&]:font-bold [.stats_&]:tracking-[-0.02em] [.stats_&.red]:text-[#ff3b30] red">
            12 dni
          </div>
        </div>
        <div>
          <div className="l">Przegląd</div>
          <div className="v [.ice-g_&]:text-[17px] [.ice-g_&]:font-semibold [.stats_&]:text-[20px] [.stats_&]:font-bold [.stats_&]:tracking-[-0.02em] [.stats_&.red]:text-[#ff3b30]">
            82 dni
          </div>
        </div>
        <div>
          <div className="l">Punkty</div>
          <div className="v [.ice-g_&]:text-[17px] [.ice-g_&]:font-semibold [.stats_&]:text-[20px] [.stats_&]:font-bold [.stats_&]:tracking-[-0.02em] [.stats_&.red]:text-[#ff3b30]">
            3 / 24
          </div>
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
              className="mini inline-flex gap-1.5 items-center whitespace-nowrap motion-safe:[&:active]:transform-[scale(0.97)] font-semibold text-[15px] p-[6px_14px] [background:var(--fill)] text-ink rounded-[999px]"
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
