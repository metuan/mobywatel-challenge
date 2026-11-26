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
      <div className="[background:#fff] rounded-[20px] p-[16px_18px] mt-1">
        <div className="text-[12.5px] text-ink-3 font-medium">{BILL.k}</div>
        <div className="text-[19px] font-[650] tracking-[-0.01em] m-[4px_0_2px]">{BILL.t}</div>
        <div className="text-[13.5px] text-ink-2">{BILL.who}</div>
        <div className="h-1.5 rounded-[3px] [background:var(--fill-2)] m-[14px_0_8px] overflow-hidden [&_i]:block [&_i]:h-full [&_i]:[background:var(--ink)] [&_i]:rounded-[3px] [&_i]:[transition:width_0.8s_cubic-bezier(0.23,_1,_0.32,_1)] [&.big]:h-2 [&&.big]:mt-1.5">
          <i style={{ width: `${(BILL.n / BILL.goal) * 100}%` }}></i>
        </div>
        <div className="text-[13px] text-ink-2 [&_b]:text-ink">
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
      <button
        className="sg-twist flex gap-3 w-full text-left [background:#fff] [border:0] rounded-[18px] p-[14px_16px] [font:inherit] text-ink cursor-pointer [&_>_span]:flex-1 [&_>_span]:flex [&_>_span]:flex-col [&_>_span]:gap-0.5 [&_b]:font-semibold [&_>_span_>_span]:text-[13.5px] [&_>_span_>_span]:text-ink-2 items-center [box-shadow:0_0_0_0.5px_var(--hair)] [&_>_svg]:flex-none [&_>_svg]:text-ink-3"
        onClick={() => c.go('easy-sign', 'tata')}
      >
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
      <div className="w-16 h-16 rounded-[20px] [background:var(--red-soft,_#fbe7ea)] text-red grid place-items-center m-[28px_0_18px]">
        {I('shield', 34)}
      </div>
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
      <div className="pl-map relative m-[4px_-4px_0] [&_svg]:w-full [&_svg]:h-auto [&_svg]:block [&.v2]:relative [&.v2]:[background:var(--surface)] [&.v2]:rounded-3xl [&.v2]:p-[18px_14px_12px] [&.v2]:[box-shadow:0_0_0_0.5px_var(--hair)] [&.v2_svg]:block [&.v2_svg]:w-full [&.v2_svg]:h-auto v2">
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
            className={
              'me-dot' +
              (lit
                ? ' on [.progress_i&]:[background:var(--ink)] [.steps_i&]:[background:var(--ink)] [.st-ab_>_div&&]:[background:#fff] [.st-ab_&_p]:text-ink [.tour-dots_i&]:w-5.5 [.tour-dots_i&]:[background:var(--ink)] [.call-keys_button&_span]:[background:#fff] [.call-keys_button&_span]:text-[#0b0d12]'
                : '')
            }
            transform={`translate(${KRK2[0].toFixed(1)} ${KRK2[1].toFixed(1)})`}
          >
            <circle
              className="[.me-dot_&]:opacity-[0] motion-safe:[.me-dot.on_&]:animate-[md-ping_1.6s_ease-out_3] [.me-dot.on_&]:origin-top-left [.pl-map.v2_&]:origin-center [.pl-map.v2_&]:opacity-[0] [.pl-map.v2_.me-dot.on_&]:animate-[mdring_1.4s_var(--out)_2]"
              r="7"
              fill="none"
              stroke="#2F6BFF"
              strokeWidth="2"
            />
            <circle
              className="[.me-dot_&]:transform-[scale(0)] [.me-dot_&]:[transition:transform_0.4s_cubic-bezier(0.34,_1.56,_0.64,_1)] [.me-dot.on_&]:transform-[scale(1)] [.pl-map.v2_.me-dot_&]:origin-center [.pl-map.v2_.me-dot_&]:transform-[scale(0)] [.pl-map.v2_.me-dot_&]:[transition:transform_0.35s_var(--spring)] [.pl-map.v2_.me-dot.on_&]:transform-[scale(1)]"
              r="5"
              fill="#2F6BFF"
              stroke="#fff"
              strokeWidth="2"
            />
          </g>
        </svg>
        <div
          className={
            'absolute [transform:translate(-50%,_calc(-100%_-_26px))] whitespace-nowrap [background:var(--ink)] [color:#fff] text-[12px] font-semibold p-[6px_10px] rounded-[999px] opacity-[0] [transition:opacity_0.25s,_transform_0.35s_var(--out)] pointer-events-none [&.on]:opacity-[1] [&.on]:[transform:translate(-50%,_calc(-100%_-_14px))]' +
            (lit
              ? ' on [.progress_i&]:[background:var(--ink)] [.steps_i&]:[background:var(--ink)] [.st-ab_>_div&&]:[background:#fff] [.st-ab_&_p]:text-ink [.tour-dots_i&]:w-5.5 [.tour-dots_i&]:[background:var(--ink)] [.call-keys_button&_span]:[background:#fff] [.call-keys_button&_span]:text-[#0b0d12]'
              : '')
          }
          style={{ left: `${(KRK2[0] / 3).toFixed(1)}%`, top: `${(KRK2[1] / 2.78).toFixed(1)}%` }}
        >
          Twój podpis · Kraków
        </div>
        <div className="pl-leg flex justify-between text-[11.5px] text-ink-3 mt-2 p-[0_4px] [&_span]:flex [&_span]:items-center [&_span]:gap-1 [&_i]:w-1.5 [&_i]:h-1.5 [&_i]:rounded-[50%] [&_i]:[background:var(--ink)]">
          <span>
            <i className="[.pl-leg_&]:opacity-[0.15]"></i>mniej
          </span>
          <span>
            <i className="[.pl-leg_&]:opacity-[0.5]"></i>
            <i className="[.pl-leg_&]:opacity-[0.85] [.pl-leg_&]:w-2 [.pl-leg_&]:h-2"></i>więcej podpisów
          </span>
        </div>
      </div>
      <div className="flex items-baseline gap-2.5 mt-2 [&_b]:text-[40px] [&_b]:font-bold [&_b]:tracking-[-0.03em] [&_b]:[font-variant-numeric:tabular-nums] [&_span]:text-[13.5px] [&_span]:text-ink-2 motion-safe:[&_b]:[animation:num-in_0.45s_cubic-bezier(0.23,_1,_0.32,_1)_both]">
        <b>
          <Num v={n} fmtf={v => fmt(Number(v))} />
        </b>
        <span>
          z {fmt(BILL.goal)} · zostało {BILL.left} dni
        </span>
      </div>
      <div className="h-1.5 rounded-[3px] [background:var(--fill-2)] m-[14px_0_8px] overflow-hidden [&_i]:block [&_i]:h-full [&_i]:[background:var(--ink)] [&_i]:rounded-[3px] [&_i]:[transition:width_0.8s_cubic-bezier(0.23,_1,_0.32,_1)] [&.big]:h-2 [&&.big]:mt-1.5 big [.taxhero_&]:text-[40px] [.taxhero_&]:font-bold [.taxhero_&]:tracking-[-0.03em] [.taxhero_&]:text-[#34c759] [.taxhero_&]:m-[4px_0_0]">
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
