import { Segmented } from '@/components/ui/segmented';
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
import { Icon } from '@/ui/icons';
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
        <Button onClick={() => c.go('share-min')}>
          <Icon name="qr" size={18} /> Pokaż do sprawdzenia
        </Button>
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
      <Segmented
        className="mb-2"
        label="Co pokazać"
        value={what}
        onValueChange={setWhat}
        options={[
          ['age', 'Pełnoletność'],
          ['city', 'Miasto'],
          ['full', 'Pełne dane'],
        ]}
      />
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
          <Icon name="card" size={18} /> Za granicą: portfel UE
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
        <div className="diploma [background:#fffdf7] rounded-2xl p-4.5 [border:1px_solid_#e9e2cf]">
          <div className="[.diploma_&]:flex [.diploma_&]:justify-between [.diploma_&]:text-[12px] [.diploma_&]:tracking-[0.08em] [.diploma_&]:font-semibold [.diploma_&]:text-[#7a6a40]">
            <span>UNIWERSYTET JAGIELLOŃSKI</span>
            <span className="w-4 h-2.75 rounded-[3px] mr-2 [background:linear-gradient(#fff_50%,_var(--red)_50%)] [box-shadow:0_0_0_0.5px_rgb(11_13_18_/_22%)] inline-block flex-none [.d-rp_&]:w-3.5 [.d-rp_&]:h-2.5 [.d-rp_&]:mr-1.75 [.d-rp_&]:[box-shadow:none]"></span>
          </div>
          <div className="[.diploma_&]:text-[26px] [.diploma_&]:font-bold [.diploma_&]:tracking-[-0.02em] [.diploma_&]:m-[18px_0_4px]">
            Anna Nowicka
          </div>
          <div className="[.diploma_&]:text-ink-2">Magister pielęgniarstwa · 2016</div>
          <div className="[.diploma_&]:flex [.diploma_&]:gap-1.5 [.diploma_&]:items-center [.diploma_&]:text-signal-green [.diploma_&]:text-[13px] [.diploma_&]:font-semibold [.diploma_&]:mt-3.5">
            <Icon name="check" size={14} /> Podpisany przez wystawcę
          </div>
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
        className={
          'stack relative [transition:height_0.32s_var(--out)] [&.has-sel]:h-0 w2' +
          (sel >= 0 ? ' has-sel' : '')
        }
        style={sel >= 0 ? undefined : { height: PEEK * (n - 1) + FRONT }}
      >
        {cards.map(([t, s2, r, tone, b], i) => {
          const isSel = sel === i,
            front = sel < 0 ? i === n - 1 : isSel;
          const y = sel < 0 ? i * PEEK : isSel ? 0 : 208 + (i - (i > sel ? 1 : 0)) * 7;
          return (
            <button
              key={t}
              className={
                'scard absolute! left-0 right-0 top-0 justify-start gap-1.5 origin-[50%_0] [transition:transform_0.42s_var(--spring)]! [&:active]:filter-[brightness(1.1)] [.stack:not(.has-sel)_&:hover]:transform-[translateY(var(--y))] [@media(hover:none),_(pointer:coarse)]:[.stack:not(.has-sel)_&:hover]:transform-none [.stack.w2_&]:min-h-49 [.stack.w2:not(.has-sel)_&:not(.front)]:[box-shadow:inset_0_1px_0_rgb(255_255_255_/_14%),_0_-1px_0_rgb(0_0_0_/_25%)] [.stack.w2.has-sel_&:not(.sel)]:[clip-path:inset(0_0_calc(100%-12px)_0_round_18px_18px_0_0)] [.stack.w2.has-sel_&:not(.sel)]:pointer-events-auto [.stack.w2.has-sel_&:not(.sel)_*]:invisible doc tone-' +
                tone +
                (isSel ? ' sel' : '') +
                (front ? ' front' : '')
              }
              style={{
                transform: `translateY(${y}px)${sel >= 0 && !isSel ? ' scale(' + (1 - 0.02 * (n - 1 - (i - (i > sel ? 1 : 0)))) + ')' : ''}`,
                zIndex: isSel ? 50 : i + 1,
                transitionDelay: `${isSel ? 0 : i * 25}ms`,
              }}
              onClick={() => (isSel ? c.go(r) : setSel(i))}
            >
              {ROSETTE}
              <div className="flex justify-between items-center [.eu-eu_&]:pr-24 [.stack.w2_&]:min-h-6">
                <span className="text-[15px] font-semibold tracking-[-0.01em]">{t}</span>
                <span className="h-6 p-[0_10px] rounded-[999px] text-[12px] font-medium inline-flex items-center text-white bg-d-hair [box-shadow:inset_0_0_0_0.5px_rgb(255_255_255_/_14%)] [backdrop-filter:blur(8px)]">
                  {b}
                </span>
              </div>
              {front && (
                <>
                  <div className="mt-4.5">
                    <div className="text-[24px] font-semibold tracking-[-0.02em] text-white leading-[1.15]">
                      {s2}
                    </div>
                    <div className="text-[12.5px] [color:rgb(255_255_255_/_62%)] mt-1 [font-variant-numeric:tabular-nums]">
                      {tone === 'id' ? 'Ważny do 12.05.2031 · nr ABC 123456' : 'Dotknij, żeby otworzyć'}
                    </div>
                  </div>
                  <div className="flex justify-between items-center [.scard_&]:mt-auto">
                    <span className="d-rp inline-flex items-center text-[12px] font-medium text-d-ink">
                      <i className="w-4 h-2.75 rounded-[3px] mr-2 [background:linear-gradient(#fff_50%,_var(--red)_50%)] [box-shadow:0_0_0_0.5px_rgb(11_13_18_/_22%)] inline-block flex-none [.d-rp_&]:w-3.5 [.d-rp_&]:h-2.5 [.d-rp_&]:mr-1.75 [.d-rp_&]:[box-shadow:none]"></i>
                      Rzeczpospolita Polska
                    </span>
                    <span className="h-6 p-[0_10px] rounded-[999px] text-[12px] font-medium inline-flex items-center text-white bg-d-hair [box-shadow:inset_0_0_0_0.5px_rgb(255_255_255_/_14%)] [backdrop-filter:blur(8px)]">
                      {tone === 'id' ? 'Pokaż kod QR' : 'Otwórz'}
                    </span>
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
          <div className="w2-acts flex gap-2 mt-3.5">
            <button
              className="pill whitespace-nowrap h-13 rounded-[999px] bg-ink text-white text-[16px] font-semibold p-[0_22px] inline-flex items-center justify-center gap-2 [border:0] [box-shadow:none] [.attn-act_&]:text-[14px] [.attn-act_&]:p-[0_16px] [.attn-act_&]:h-9.5 [.st-nav_&]:h-11 [.st-nav_&]:text-[15px] [.st-nav_&]:p-[0_18px] [.st-nav_&:disabled]:opacity-[0.35] [.tour-btns_&]:h-11.5 [.tour-btns_&]:text-[15px] [@media(max-width:640px)]:[.tour-btns_&]:h-11 [@media(max-width:640px)]:[.tour-btns_&]:p-[0_16px] motion-safe:[transition:transform_0.16s_var(--ease-out),_background-color_0.15s_ease,_box-shadow_0.2s_ease] motion-safe:[&:active]:transform-[scale(0.97)] motion-safe:[&:active]:[transition-duration:0.1s] [.st-nav_&.ready]:[outline:2px_solid_var(--signal-blue)] [.st-nav_&.ready]:outline-offset-[3px] [.st-nav_&.ready]:[box-shadow:0_0_0_6px_rgb(47_107_255_/_18%)] motion-safe:[.st-nav_&.ready]:animate-[coach_1.6s_var(--out)_infinite]! [.w2-acts_&]:flex-1 [.w2-acts_&]:justify-center motion-safe:[.st-nav_&.ready]:[animation-iteration-count:3]!"
              onClick={() => c.go(cards[sel][2])}
            >
              {cards[sel][3] === 'id' ? 'Pokaż kod QR' : 'Otwórz'}
            </button>
            <button
              className="pill whitespace-nowrap h-13 rounded-[999px] bg-ink text-white text-[16px] font-semibold p-[0_22px] inline-flex items-center justify-center gap-2 [border:0] [box-shadow:none] [.attn-act_&]:text-[14px] [.attn-act_&]:p-[0_16px] [.attn-act_&]:h-9.5 [.st-nav_&]:h-11 [.st-nav_&]:text-[15px] [.st-nav_&]:p-[0_18px] [.st-nav_&:disabled]:opacity-[0.35] [.tour-btns_&]:h-11.5 [.tour-btns_&]:text-[15px] [@media(max-width:640px)]:[.tour-btns_&]:h-11 [@media(max-width:640px)]:[.tour-btns_&]:p-[0_16px] motion-safe:[transition:transform_0.16s_var(--ease-out),_background-color_0.15s_ease,_box-shadow_0.2s_ease] motion-safe:[&:active]:transform-[scale(0.97)] motion-safe:[&:active]:[transition-duration:0.1s] [.st-nav_&.ready]:[outline:2px_solid_var(--signal-blue)] [.st-nav_&.ready]:outline-offset-[3px] [.st-nav_&.ready]:[box-shadow:0_0_0_6px_rgb(47_107_255_/_18%)] motion-safe:[.st-nav_&.ready]:animate-[coach_1.6s_var(--out)_infinite]! [.w2-acts_&]:flex-1 [.w2-acts_&]:justify-center motion-safe:[.st-nav_&.ready]:[animation-iteration-count:3]! [&.pill]:bg-fill [&.pill]:text-ink [.st-nav_&.pill]:w-11 [.st-nav_&.pill]:p-0"
              onClick={() => setSel(-1)}
            >
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
            <ListItemTitle className="text-red!">Zgubiłam portfel</ListItemTitle>
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
