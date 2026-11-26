import { sx } from '@/lib/sx';
import { useLayoutEffect, useState } from 'react';
import { reducedMotion } from '@/lib/env';
import { DRAWER } from '@/ui/controls';
import { DocCard, QR, ROSETTE } from '@/ui/documentCard';
import { I } from '@/ui/icons';
import { GRow, Label, Lead, Row, Sec } from '@/ui/primitives';
import type { Ctx } from '@/types';
import type { Persona } from '@/types';
import { stashBox, takeBox } from '@/lib/morph';

function DocIdBase(c: Ctx) {
  const [show, setShow] = useState(false);
  return (
    <div>
      <DocCard c={c} />
      <div className="glist" style={{ marginTop: '12px' }}>
        <div className="grow">
          <span className="gtx">
            <span className="gs">PESEL</span>
            <span className="gt" style={{ fontVariantNumeric: 'tabular-nums' }}>
              {show ? '92031412345' : '92031•••••'}
            </span>
          </span>
        </div>
      </div>
      <div className="actions">
        <button className="btn" onClick={() => c.go('share-min')}>
          {I('qr', 18)} Pokaż do sprawdzenia
        </button>
        <button className="btn ghost" onClick={() => setShow(!show)}>
          {show ? 'Ukryj PESEL' : 'Pokaż PESEL'}
        </button>
      </div>
      <div className="note" style={{ marginTop: '14px' }}>
        {I('wifi', 18)}
        <span>
          Dokument jest zapisany w telefonie. Otworzysz go także bez internetu i po nieudanej aktualizacji.
        </span>
      </div>
    </div>
  );
}

export function ShareMin(c: Ctx) {
  const [what, setWhat] = useState('age');
  return (
    <div>
      <h1 className="h-l">Pokaż tylko to, co trzeba</h1>
      <div className="seg full" style={{ marginBottom: '8px' }}>
        {[
          ['age', 'Pełnoletność'],
          ['city', 'Miasto'],
          ['full', 'Pełne dane'],
        ].map(([k, t]) => (
          <button aria-pressed={what === k} onClick={() => setWhat(k)}>
            {t}
          </button>
        ))}
      </div>
      <div className="qr">{QR()}</div>
      <div className="card" style={{ padding: '14px 16px' }}>
        <div className="small">Osoba, która sprawdza, zobaczy:</div>
        <div style={{ fontWeight: '600', fontSize: '18px' }}>
          {what === 'age'
            ? 'Osoba pełnoletnia: TAK'
            : what === 'city'
              ? 'Miejsce zamieszkania: Kraków'
              : 'Imię, nazwisko, PESEL, zdjęcie, data ważności'}
        </div>
        <div className="tiny">
          {what === 'full' ? 'Użyj tylko w urzędzie, banku lub na poczcie.' : 'Bez imienia, PESEL i zdjęcia.'}
        </div>
      </div>
      <p className="tiny" style={{ marginTop: '10px' }}>
        Każde sprawdzenie trafia do historii „Kto sprawdzał moje dane”.
      </p>
      <div className="actions">
        <button className="btn ghost" onClick={() => c.go('eu')}>
          {I('card', 18)} Za granicą: portfel UE
        </button>
      </div>
    </div>
  );
}

export function RenewPass(c: Ctx) {
  return (
    <div>
      <p className="stepk">Zosia</p>
      <h1 className="h-l">Nowy paszport dla Zosi</h1>
      <p className="lead">
        Wniosek przygotujemy z danych, które już są w rejestrach. Potrzebna jest zgoda obojga rodziców.
      </p>
      <div className="list">
        <div className="field">
          <div className="l">Wizyta w urzędzie</div>
          <div className="v">Tylko zdjęcie, dzieci do 12 lat nie oddają odcisków palców</div>
        </div>
        <div className="field">
          <div className="l">Opłata</div>
          <div className="v">30 zł</div>
        </div>
      </div>
      <div className="actions">
        <button className="btn" onClick={() => c.go('consent2')}>
          Dalej: zgoda obojga rodziców
        </button>
      </div>
    </div>
  );
}

/* 11: Dokumenty od wystawcy */
export function Issued(c: Ctx) {
  const [acc, setAcc] = useState(c.s.diploma || false);
  return (
    <div>
      <h1 className="h-l">Dokumenty od wystawcy</h1>
      <p className="lead">
        Uczelnie, szkoły i urzędy wydają dokumenty prosto do aplikacji. Bez skanów i kopii „za zgodność”.
      </p>
      {!acc ? (
        <div className="card" style={{ padding: '16px' }}>
          <div className="small">Nowy dokument · dziś</div>
          <div className="h-m" style={{ margin: '4px 0 2px' }}>
            Dyplom ukończenia studiów
          </div>
          <div className="small">Uniwersytet Jagielloński · Pielęgniarstwo, magister</div>
          <div className="actions row2" style={{ marginTop: '14px' }}>
            <button className="btn soft" onClick={() => c.toast('Odrzucono')}>
              Odrzuć
            </button>
            <button
              className="btn"
              onClick={() => {
                setAcc(true);
                c.set({ diploma: true });
              }}
            >
              Dodaj
            </button>
          </div>
        </div>
      ) : (
        <div className="diploma">
          <div className="dh">
            <span>UNIWERSYTET JAGIELLOŃSKI</span>
            <span className="flag"></span>
          </div>
          <div className="dn">Anna Nowicka</div>
          <div className="dd">Magister pielęgniarstwa · 2016</div>
          <div className="dv">{I('check', 14)} Podpisany przez wystawcę</div>
        </div>
      )}
      <Sec t="W portfelu" />
      <div className="list">
        <Row
          icon="card"
          t="Prawo wykonywania zawodu (PWZ)"
          s="Naczelna Izba Pielęgniarek i Położnych"
          onClick={() => {}}
        />
        <Row
          icon="doc"
          t="Świadectwo dojrzałości"
          s="Okręgowa Komisja Egzaminacyjna, 2011"
          onClick={() => {}}
        />
        {acc && <Row icon="doc" t="Dyplom magistra" s="Uniwersytet Jagielloński, 2016" onClick={() => {}} />}
      </div>
      <div className="actions">
        <button className="btn ghost" onClick={() => c.go('share-min')}>
          Pokaż pracodawcy tylko dyplom
        </button>
      </div>
    </div>
  );
}

/* 2. Wallet: the card you use most sits in front, fully visible, with real content */
function DocsBase(c: Ctx) {
  const cards = [
    ['Karta ratunkowa', 'A Rh+ · penicylina', 'ice', 'other', 'A Rh+'],
    ['Dyplom magistra', 'Uniwersytet Jagielloński', 'issued', 'other', 'Nowy'],
    ['Paszport', 'Zofia Nowicka', 'renew-pass', 'pass', '41 dni'],
    ['Dowód rejestracyjny', 'Toyota Yaris · KR 4F21', 'car', 'car', 'OC 12 dni'],
    ['Prawo jazdy', 'Kat. B · do 2033', 'doc-id', 'drive', '0 pkt'],
    ['Dowód osobisty', 'Anna Nowicka', 'doc-id', 'id', 'Ważny'],
  ];
  const PEEK = 52,
    FRONT = 196,
    n = cards.length;
  const [sel, setSel] = useState(-1);
  return (
    <div>
      <h1 className="h-xl">Dokumenty</h1>
      <div
        className={'stack w2' + (sel >= 0 ? ' has-sel' : '')}
        style={sx(sel >= 0 ? '' : `height:${PEEK * (n - 1) + FRONT}px`)}
      >
        {cards.map(([t, s2, r, tone, b], i) => {
          const isSel = sel === i,
            front = sel < 0 ? i === n - 1 : isSel;
          const y = sel < 0 ? i * PEEK : isSel ? 0 : 208 + (i - (i > sel ? 1 : 0)) * 7;
          return (
            <button
              className={'scard doc tone-' + tone + (isSel ? ' sel' : '') + (front ? ' front' : '')}
              style={sx(
                `transform:translateY(${y}px)${sel >= 0 && !isSel ? ' scale(' + (1 - 0.02 * (n - 1 - (i - (i > sel ? 1 : 0)))) + ')' : ''};z-index:${isSel ? 50 : i + 1};transition-delay:${isSel ? 0 : i * 25}ms`,
              )}
              onClick={() => (isSel ? c.go(r) : setSel(i))}
            >
              {ROSETTE}
              <div className="d-top">
                <span className="sc-t">{t}</span>
                <span className="d-chip">{b}</span>
              </div>
              {front && (
                <>
                  <div className="w2-body">
                    <div className="w2-name">{s2}</div>
                    <div className="w2-meta">
                      {tone === 'id' ? 'Ważny do 12.05.2031 · nr ABC 123456' : 'Dotknij, żeby otworzyć'}
                    </div>
                  </div>
                  <div className="d-bot">
                    <span className="d-rp">
                      <i className="flag"></i>Rzeczpospolita Polska
                    </span>
                    <span className="d-chip">{tone === 'id' ? 'Pokaż kod QR' : 'Otwórz'}</span>
                  </div>
                </>
              )}
            </button>
          );
        })}
      </div>
      {sel >= 0 && (
        <>
          <div style={{ height: `${208 + 7 * (n - 2) + 14}px` }}></div>
          <div className="w2-acts">
            <button className="pill" onClick={() => c.go(cards[sel][2])}>
              {cards[sel][3] === 'id' ? 'Pokaż kod QR' : 'Otwórz'}
            </button>
            <button className="pill soft" onClick={() => setSel(-1)}>
              Pokaż wszystkie
            </button>
          </div>
        </>
      )}
      <Label t="Pokaż tylko to, co trzeba" />
      <div className="glist">
        <GRow ic="eye" t="Pokaż tylko 18+" s="Bez imienia i numeru PESEL" onClick={() => c.go('share-min')} />
        <GRow ic="pin" t="Pokaż tylko miasto" s="Bez dokładnego adresu" onClick={() => c.go('share-min')} />
        <GRow ic="list" t="Kto sprawdzał moje dane" v="4 w listopadzie" onClick={() => c.go('access-log')} />
      </div>
      <div className="glist" style={{ marginTop: '12px' }}>
        <button className="grow" onClick={() => c.go('lost')}>
          <Lead ic="lock" />
          <span className="gtx">
            <span className="gt red-t">Zgubiłam portfel</span>
            <span className="gs">Zastrzeż wszystkie dokumenty naraz</span>
          </span>
          <span className="gch">{I('chevron', 16)}</span>
        </button>
      </div>
    </div>
  );
}

export function Docs(c: Ctx) {
  const go2 = (r: string, p?: Persona) => {
    stashBox('document', document.querySelector('.phone .scard.sel'));
    c.go(r, p);
  };
  return DocsBase({ ...c, go: go2 });
}

export function DocId(c: Ctx) {
  useLayoutEffect(() => {
    const r = takeBox('document');
    const el = document.querySelector('.phone .scroll .doc');
    if (!r || !el || reducedMotion()) return;
    const t = el.getBoundingClientRect();
    const sx = r.width / t.width,
      sy = r.height / t.height;
    el.animate(
      [
        {
          transform: `translate(${r.left - t.left}px,${r.top - t.top}px) scale(${sx},${sy})`,
          transformOrigin: '0 0',
          borderRadius: '18px',
        },
        { transform: 'none', transformOrigin: '0 0' },
      ],
      { duration: 380, easing: DRAWER },
    );
    const scr = el.closest('.screen');
    scr && scr.getAnimations().forEach(a => a.finish());
  }, []);
  return DocIdBase(c);
}
