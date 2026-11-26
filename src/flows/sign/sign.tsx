import { sx } from '@/lib/sx';
import { useEffect, useState } from 'react';
import { GRID, KRK2 } from '@/flows/sign/map';
import { buzz, fire, fmt, reducedMotion } from '@/lib/env';
import { TapShare } from '@/ui/controls';
import { I } from '@/ui/icons';
import { Av, Label, Lead, Num } from '@/ui/primitives';
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
      <p className="stepk">Rynek Główny · sobota, 11:20</p>
      <h1 className="h-l">Podpis bez kartki i długopisu</h1>
      <div className="bill8">
        <div className="b8-k">{BILL.k}</div>
        <div className="b8-t">{BILL.t}</div>
        <div className="b8-s">{BILL.who}</div>
        <div className="b8-bar">
          <i style={sx(`width:${(BILL.n / BILL.goal) * 100}%`)}></i>
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
      <p className="stepk">Głos · sprawdź, zanim podpiszesz</p>
      <h1 className="h-l">{BILL.t}</h1>
      <p className="lead">
        {BILL.k}. {BILL.who}.
      </p>
      <Label t="Kto co zobaczy" />
      <div className="glist">
        <div className="grow-row is-static">
          <Lead ic="people" />
          <span className="g-tx">
            <span className="gt">Komitet</span>
            <span className="gs">„1 ważny podpis, Kraków”. Bez imienia, PESEL i adresu.</span>
          </span>
        </div>
        <div className="grow-row is-static">
          <Lead ic="shield" />
          <span className="g-tx">
            <span className="gt">Marszałek Sejmu</span>
            <span className="gs">Twoje dane, tylko do sprawdzenia ważności podpisu.</span>
          </span>
        </div>
        <div className="grow-row is-static">
          <Lead ic="eye" />
          <span className="g-tx">
            <span className="gt">Ty</span>
            <span className="gs">Podpis trafi do „Moje podpisy”. Możesz śledzić losy projektu.</span>
          </span>
        </div>
      </div>
      <div className="note" style={{ marginTop: '14px' }}>
        {I('info', 18)}
        <span>To poparcie projektu, nie głos w wyborach.</span>
      </div>
      <div className="actions">
        <button
          className="btn"
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
        </button>
      </div>
    </div>
  );
}

export function SignList(c: Ctx) {
  return (
    <div>
      <h1 className="h-l">Moje podpisy</h1>
      <p className="lead">Wszystko, co poparłaś: projekty ustaw, petycje i kandydaci.</p>
      <div className="glist">
        <div className="grow-row is-static">
          <Lead ic="doc" />
          <span className="g-tx">
            <span className="gt">{BILL.t}</span>
            <span className="gs">
              Projekt ustawy · podpisano dziś · {fmt(BILL.n + 1)} / {fmt(BILL.goal)}
            </span>
          </span>
        </div>
        <div className="grow-row is-static">
          <Lead ic="mail" />
          <span className="g-tx">
            <span className="gt">Więcej drzew na Kazimierzu</span>
            <span className="gs">Petycja do Rady Miasta Krakowa · odpowiedź do 12 grudnia</span>
          </span>
        </div>
        <div className="grow-row is-static">
          <Lead ic="check" />
          <span className="g-tx">
            <span className="gt">Kandydatka do Senatu, okręg 32</span>
            <span className="gs">Poparcie zgłoszenia · podpis ważny, sprawdzony w rejestrze wyborców</span>
          </span>
        </div>
      </div>
      <p className="tiny" style={{ marginTop: '12px' }}>
        Partie i komitety nie mogą wysyłać Ci powiadomień. Podpisujesz tylko to, czego sama szukasz albo co
        ktoś poda Ci osobiście.
      </p>
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
      <h1 className="h-l" style={{ fontSize: '34px', lineHeight: '38px' }}>
        Ktoś podpisał się za Pana
      </h1>
      <p className="lead" style={{ fontSize: '19px', lineHeight: '27px' }}>
        Pana PESEL jest na liście poparcia komitetu wyborczego „Nowa Fala”. Lista wpłynęła 22 listopada.
      </p>
      {rep ? (
        <>
          <div className="note green" style={{ fontSize: '17px' }}>
            {I('check', 20)}
            <span>
              Zgłoszone do Państwowej Komisji Wyborczej. Ten podpis nie zostanie policzony. Anna dostała
              informację.
            </span>
          </div>
          <div className="actions">
            <button className="btn ghost bigbtn" onClick={() => c.go('easy', 'tata')}>
              Wróć
            </button>
          </div>
        </>
      ) : (
        <>
          <p style={{ fontSize: '20px', fontWeight: '600', margin: '18px 0 0' }}>Czy to Pan podpisał?</p>
          <div className="actions">
            <button
              className="btn bigbtn"
              onClick={() => {
                setRep(true);
                buzz(20);
                fire();
              }}
            >
              Nie, to nie ja
            </button>
            <button className="btn ghost bigbtn" onClick={() => c.go('easy', 'tata')}>
              Tak, to ja
            </button>
          </div>
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
      <p className="stepk">Głos · podpisano</p>
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
          style={sx(`left:${(KRK2[0] / 3).toFixed(1)}%;top:${(KRK2[1] / 2.78).toFixed(1)}%`)}
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
        <i style={sx(`width:${(n / BILL.goal) * 100}%`)}></i>
      </div>
      <div className="note" style={{ marginTop: '14px' }}>
        {I('shield', 18)}
        <span>
          Komitet widzi tylko: „1 ważny podpis, Kraków”. Na papierze Twoje imię, PESEL i adres leżałyby na
          podkładce dla każdego, kto zrobi zdjęcie.
        </span>
      </div>
      <div className="actions">
        <button className="btn" onClick={() => c.go('sign-list')}>
          Moje podpisy
        </button>
      </div>
    </div>
  );
}
