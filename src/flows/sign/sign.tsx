import { List, ListItem, ListItemDescription, ListItemTitle } from '@/components/ui/list';
import { Note } from '@/components/ui/note';
import { Caption, Eyebrow, Lead, Title } from '@/components/ui/typography';
import { Actions, Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { GRID, KRK2 } from '@/flows/sign/map';
import { buzz, fire, fmt, reducedMotion } from '@/lib/env';
import { TapShare } from '@/ui/controls';
import { I } from '@/ui/icons';
import { Av, Label, LeadIcon, Num } from '@/ui/primitives';
import type { Ctx } from '@/types';

const BILL = {
  t: 'Czyste powietrze przy szkołach',
  k: 'Obywatelski projekt ustawy',
  who: 'Komitet Inicjatywy Ustawodawczej „Oddychaj”',
  n: 87411,
  goal: 100000,
  left: 23,
};

export function Sign1(c: Ctx) {
  return (
    <div>
      <Eyebrow>Rynek Główny · sobota, 11:20</Eyebrow>
      <Title>Podpis bez kartki i długopisu</Title>
      <div className="bill8">
        <div className="b8-k">{BILL.k}</div>
        <div className="b8-t">{BILL.t}</div>
        <div className="b8-s">{BILL.who}</div>
        <div className="b8-bar">
          <i style={{ width: `${(BILL.n / BILL.goal) * 100}%` }}></i>
        </div>
        <div className="b8-n">
          <b>{fmt(BILL.n)}</b> z {fmt(BILL.goal)} podpisów · zostało {BILL.left} dni
        </div>
      </div>
      <TapShare
        them="Marta, wolontariuszka"
        sub="Wolontariuszka trzyma telefon. Anna przykłada swój, górą do góry."
        onDone={() => setTimeout(() => c.go('sign-2'), 700)}
      />
    </div>
  );
}

export function Sign2(c: Ctx) {
  return (
    <div>
      <Eyebrow>Głos · sprawdź, zanim podpiszesz</Eyebrow>
      <Title>{BILL.t}</Title>
      <Lead>
        {BILL.k}. {BILL.who}.
      </Lead>
      <Label t="Kto co zobaczy" />
      <List>
        <ListItem className="cursor-default">
          <LeadIcon ic="people" />
          <span className="g-tx">
            <ListItemTitle>Komitet</ListItemTitle>
            <ListItemDescription>„1 ważny podpis, Kraków”. Bez imienia, PESEL i adresu.</ListItemDescription>
          </span>
        </ListItem>
        <ListItem className="cursor-default">
          <LeadIcon ic="shield" />
          <span className="g-tx">
            <ListItemTitle>Marszałek Sejmu</ListItemTitle>
            <ListItemDescription>Twoje dane, tylko do sprawdzenia ważności podpisu.</ListItemDescription>
          </span>
        </ListItem>
        <ListItem className="cursor-default">
          <LeadIcon ic="eye" />
          <span className="g-tx">
            <ListItemTitle>Ty</ListItemTitle>
            <ListItemDescription>
              Podpis trafi do „Moje podpisy”. Możesz śledzić losy projektu.
            </ListItemDescription>
          </span>
        </ListItem>
      </List>
      <Note icon="info" className="mt-3.5">
        To poparcie projektu, nie głos w wyborach.
      </Note>
      <Actions>
        <Button
          onClick={() =>
            c.confirm({
              t: 'Poprzeć projekt ustawy?',
              items: [
                BILL.t,
                'Komitet zobaczy tylko: 1 ważny podpis, Kraków',
                'Podpis możesz sprawdzić w „Moje podpisy”',
              ],
              ok: 'Podpisz twarzą',
              done: () => {
                c.set({ signed: true });
                c.go('sign-3');
              },
            })
          }
        >
          Podpisz
        </Button>
      </Actions>
    </div>
  );
}

export function SignList(c: Ctx) {
  return (
    <div>
      <Title>Moje podpisy</Title>
      <Lead>Wszystko, co poparłaś: projekty ustaw, petycje i kandydaci.</Lead>
      <List>
        <ListItem className="cursor-default">
          <LeadIcon ic="doc" />
          <span className="g-tx">
            <ListItemTitle>{BILL.t}</ListItemTitle>
            <ListItemDescription>
              Projekt ustawy · podpisano dziś · {fmt(BILL.n + 1)} / {fmt(BILL.goal)}
            </ListItemDescription>
          </span>
        </ListItem>
        <ListItem className="cursor-default">
          <LeadIcon ic="mail" />
          <span className="g-tx">
            <ListItemTitle>Więcej drzew na Kazimierzu</ListItemTitle>
            <ListItemDescription>
              Petycja do Rady Miasta Krakowa · odpowiedź do 12 grudnia
            </ListItemDescription>
          </span>
        </ListItem>
        <ListItem className="cursor-default">
          <LeadIcon ic="check" />
          <span className="g-tx">
            <ListItemTitle>Kandydatka do Senatu, okręg 32</ListItemTitle>
            <ListItemDescription>
              Poparcie zgłoszenia · podpis ważny, sprawdzony w rejestrze wyborców
            </ListItemDescription>
          </span>
        </ListItem>
      </List>
      <Caption className="mt-3">
        Partie i komitety nie mogą wysyłać Ci powiadomień. Podpisujesz tylko to, czego sama szukasz albo co
        ktoś poda Ci osobiście.
      </Caption>
      <Label t="Tego samego dnia w Sandomierzu" />
      <button className="sg-twist" onClick={() => c.go('easy-sign', 'tata')}>
        <Av i="S" size={40} />
        <span>
          <b>Telefon taty</b>
          <span>Stanisław dostaje ostrzeżenie o podpisie, którego nie złożył.</span>
        </span>
        {I('chevron', 18)}
      </button>
    </div>
  );
}

export function EasySign(c: Ctx) {
  const [rep, setRep] = useState(false);
  return (
    <div className="easy">
      <div className="es-ic">{I('shield', 34)}</div>
      <Title className="text-[34px]/[38px] in-[.easy]:leading-[38px]">Ktoś podpisał się za Pana</Title>
      <Lead className="text-[19px]/[27px]">
        Pana PESEL jest na liście poparcia komitetu wyborczego „Nowa Fala”. Lista wpłynęła 22 listopada.
      </Lead>
      {rep ? (
        <>
          <Note icon="check" tone="green" className="text-[17px]/[1.45]">
            Zgłoszone do Państwowej Komisji Wyborczej. Ten podpis nie zostanie policzony. Anna dostała
            informację.
          </Note>
          <Actions>
            <Button variant="secondary" onClick={() => c.go('easy', 'tata')}>
              Wróć
            </Button>
          </Actions>
        </>
      ) : (
        <>
          <p className="text-[20px] font-semibold mt-4.5 mr-0 mb-0 ml-0">Czy to Pan podpisał?</p>
          <Actions>
            <Button
              onClick={() => {
                setRep(true);
                buzz(20);
                fire();
              }}
            >
              Nie, to nie ja
            </Button>
            <Button variant="secondary" onClick={() => c.go('easy', 'tata')}>
              Tak, to ja
            </Button>
          </Actions>
        </>
      )}
    </div>
  );
}

export function Sign3(c: Ctx) {
  const [n, setN] = useState(BILL.n);
  useEffect(() => {
    const t = setTimeout(
      () => {
        setN(BILL.n + 1);
        buzz(10);
      },
      reducedMotion() ? 0 : 1100,
    );
    return () => clearTimeout(t);
  }, []);
  const lit = n > BILL.n;
  return (
    <div>
      <Eyebrow>Głos · podpisano</Eyebrow>
      <div className="pl-map v2">
        <svg viewBox="0 0 300 278" role="img" aria-label="Mapa Polski: gdzie ludzie podpisali projekt">
          {GRID.map(([x, y, v]) => (
            <circle
              cx={x.toFixed(1)}
              cy={y.toFixed(1)}
              r={(1.1 + v * 1.5).toFixed(2)}
              fill="var(--ink)"
              opacity={(0.1 + v * 0.75).toFixed(2)}
            />
          ))}
          <g
            className={'me-dot' + (lit ? ' on' : '')}
            transform={`translate(${KRK2[0].toFixed(1)} ${KRK2[1].toFixed(1)})`}
          >
            <circle className="md-ring" r="7" fill="none" stroke="#2F6BFF" strokeWidth="2" />
            <circle className="md-core" r="5" fill="#2F6BFF" stroke="#fff" strokeWidth="2" />
          </g>
        </svg>
        <div
          className={'pl-tag2' + (lit ? ' on' : '')}
          style={{ left: `${(KRK2[0] / 3).toFixed(1)}%`, top: `${(KRK2[1] / 2.78).toFixed(1)}%` }}
        >
          Twój podpis · Kraków
        </div>
        <div className="pl-leg">
          <span>
            <i className="l1"></i>mniej
          </span>
          <span>
            <i className="l2"></i>
            <i className="l3"></i>więcej podpisów
          </span>
        </div>
      </div>
      <div className="pl-count">
        <b>
          <Num v={n} fmtf={v => fmt(Number(v))} />
        </b>
        <span>
          z {fmt(BILL.goal)} · zostało {BILL.left} dni
        </span>
      </div>
      <div className="b8-bar big">
        <i style={{ width: `${(n / BILL.goal) * 100}%` }}></i>
      </div>
      <Note icon="shield" className="mt-3.5">
        Komitet widzi tylko: „1 ważny podpis, Kraków”. Na papierze Twoje imię, PESEL i adres leżałyby na
        podkładce dla każdego, kto zrobi zdjęcie.
      </Note>
      <Actions>
        <Button onClick={() => c.go('sign-list')}>Moje podpisy</Button>
      </Actions>
    </div>
  );
}
