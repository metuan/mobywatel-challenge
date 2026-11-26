import { Field, FieldLabel, FieldValue } from '@/components/ui/field';
import {
  List,
  ListItem,
  ListItemChevron,
  ListItemContent,
  ListItemDescription,
  ListItemTitle,
} from '@/components/ui/list';
import { Card } from '@/components/ui/card';
import { Note } from '@/components/ui/note';
import { Caption, Display, Eyebrow, Lead, Muted, Subtitle, Title } from '@/components/ui/typography';
import { Actions, Button } from '@/components/ui/button';
import { useLayoutEffect, useState } from 'react';
import { reducedMotion } from '@/lib/env';
import { DRAWER } from '@/ui/controls';
import { DocCard, QR, ROSETTE } from '@/ui/documentCard';
import { I } from '@/ui/icons';
import { GRow, Label, LeadIcon, Row, Sec } from '@/ui/primitives';
import type { Ctx } from '@/types';
import type { Persona } from '@/types';
import { stashBox, takeBox } from '@/lib/morph';

function DocIdBase(c: Ctx) {
  const [show, setShow] = useState(false);
  return (
    <div>
      <DocCard c={c} />
      <List className="mt-3">
        <ListItem>
          <ListItemContent>
            <ListItemDescription>PESEL</ListItemDescription>
            <ListItemTitle className="tabular-nums">{show ? '92031412345' : '92031•••••'}</ListItemTitle>
          </ListItemContent>
        </ListItem>
      </List>
      <Actions>
        <Button onClick={() => c.go('share-min')}>{I('qr', 18)} Pokaż do sprawdzenia</Button>
        <Button variant="secondary" onClick={() => setShow(!show)}>
          {show ? 'Ukryj PESEL' : 'Pokaż PESEL'}
        </Button>
      </Actions>
      <Note icon="wifi" className="mt-3.5">
        Dokument jest zapisany w telefonie. Otworzysz go także bez internetu i po nieudanej aktualizacji.
      </Note>
    </div>
  );
}

export function ShareMin(c: Ctx) {
  const [what, setWhat] = useState('age');
  return (
    <div>
      <Title>Pokaż tylko to, co trzeba</Title>
      <div className="seg full mb-2">
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
      <Card className="py-3.5 px-4">
        <Muted>Osoba, która sprawdza, zobaczy:</Muted>
        <div className="font-semibold text-[18px]">
          {what === 'age'
            ? 'Osoba pełnoletnia: TAK'
            : what === 'city'
              ? 'Miejsce zamieszkania: Kraków'
              : 'Imię, nazwisko, PESEL, zdjęcie, data ważności'}
        </div>
        <Caption as="div">
          {what === 'full' ? 'Użyj tylko w urzędzie, banku lub na poczcie.' : 'Bez imienia, PESEL i zdjęcia.'}
        </Caption>
      </Card>
      <Caption className="mt-2.5">Każde sprawdzenie trafia do historii „Kto sprawdzał moje dane”.</Caption>
      <Actions>
        <Button variant="secondary" onClick={() => c.go('eu')}>
          {I('card', 18)} Za granicą: portfel UE
        </Button>
      </Actions>
    </div>
  );
}

export function RenewPass(c: Ctx) {
  return (
    <div>
      <Eyebrow>Zosia</Eyebrow>
      <Title>Nowy paszport dla Zosi</Title>
      <Lead>
        Wniosek przygotujemy z danych, które już są w rejestrach. Potrzebna jest zgoda obojga rodziców.
      </Lead>
      <List>
        <Field>
          <FieldLabel>Wizyta w urzędzie</FieldLabel>
          <FieldValue>Tylko zdjęcie, dzieci do 12 lat nie oddają odcisków palców</FieldValue>
        </Field>
        <Field>
          <FieldLabel>Opłata</FieldLabel>
          <FieldValue>30 zł</FieldValue>
        </Field>
      </List>
      <Actions>
        <Button onClick={() => c.go('consent2')}>Dalej: zgoda obojga rodziców</Button>
      </Actions>
    </div>
  );
}

/* 11: Dokumenty od wystawcy */
export function Issued(c: Ctx) {
  const [acc, setAcc] = useState(c.s.diploma || false);
  return (
    <div>
      <Title>Dokumenty od wystawcy</Title>
      <Lead>
        Uczelnie, szkoły i urzędy wydają dokumenty prosto do aplikacji. Bez skanów i kopii „za zgodność”.
      </Lead>
      {!acc ? (
        <Card className="p-4">
          <Muted>Nowy dokument · dziś</Muted>
          <Subtitle as="div" className="mt-1 mr-0 mb-0.5 ml-0">
            Dyplom ukończenia studiów
          </Subtitle>
          <Muted>Uniwersytet Jagielloński · Pielęgniarstwo, magister</Muted>
          <Actions row className="mt-3.5">
            <Button variant="secondary" onClick={() => c.toast('Odrzucono')}>
              Odrzuć
            </Button>
            <Button
              onClick={() => {
                setAcc(true);
                c.set({ diploma: true });
              }}
            >
              Dodaj
            </Button>
          </Actions>
        </Card>
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
      <List>
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
      </List>
      <Actions>
        <Button variant="secondary" onClick={() => c.go('share-min')}>
          Pokaż pracodawcy tylko dyplom
        </Button>
      </Actions>
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
      <Display>Dokumenty</Display>
      <div
        className={'stack w2' + (sel >= 0 ? ' has-sel' : '')}
        style={sel >= 0 ? undefined : { height: PEEK * (n - 1) + FRONT }}
      >
        {cards.map(([t, s2, r, tone, b], i) => {
          const isSel = sel === i,
            front = sel < 0 ? i === n - 1 : isSel;
          const y = sel < 0 ? i * PEEK : isSel ? 0 : 208 + (i - (i > sel ? 1 : 0)) * 7;
          return (
            <button
              className={'scard doc tone-' + tone + (isSel ? ' sel' : '') + (front ? ' front' : '')}
              style={{
                transform: `translateY(${y}px)${sel >= 0 && !isSel ? ' scale(' + (1 - 0.02 * (n - 1 - (i - (i > sel ? 1 : 0)))) + ')' : ''}`,
                zIndex: isSel ? 50 : i + 1,
                transitionDelay: `${isSel ? 0 : i * 25}ms`,
              }}
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
      <List>
        <GRow ic="eye" t="Pokaż tylko 18+" s="Bez imienia i numeru PESEL" onClick={() => c.go('share-min')} />
        <GRow ic="pin" t="Pokaż tylko miasto" s="Bez dokładnego adresu" onClick={() => c.go('share-min')} />
        <GRow ic="list" t="Kto sprawdzał moje dane" v="4 w listopadzie" onClick={() => c.go('access-log')} />
      </List>
      <List className="mt-3">
        <ListItem as="button" onClick={() => c.go('lost')}>
          <LeadIcon ic="lock" />
          <ListItemContent>
            <ListItemTitle className="red-t">Zgubiłam portfel</ListItemTitle>
            <ListItemDescription>Zastrzeż wszystkie dokumenty naraz</ListItemDescription>
          </ListItemContent>
          <ListItemChevron size={16} />
        </ListItem>
      </List>
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
