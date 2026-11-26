import { Segmented } from '@/components/ui/segmented';
import { Field, FieldLabel, FieldValue } from '@/components/ui/field';
import {
  List,
  ListRow,
  ListRowAvatar,
  ListRowContent,
  ListRowDescription,
  ListRowTile,
  ListRowTitle,
} from '@/components/ui/list';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Note } from '@/components/ui/note';
import { Caption, Eyebrow, Lead, Muted, Subtitle, Title } from '@/components/ui/typography';
import { Actions, Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { I } from '@/ui/icons';
import type { Ctx } from '@/types';

/* 4: Zgoda obojga rodziców */
export function Consent2(c: Ctx) {
  const [tom, setTom] = useState(c.s.tomOk || false);
  useEffect(() => {
    if (c.s.askedTom && !tom) {
      const t = setTimeout(() => {
        setTom(true);
        c.set({ tomOk: true });
      }, 2200);
      return () => clearTimeout(t);
    }
  }, [c.s.askedTom]);
  return (
    <div>
      <Eyebrow>Paszport dla Zosi</Eyebrow>
      <Title>Potrzebna zgoda obojga rodziców</Title>
      <Lead>
        Od czerwca 2026 drugi rodzic może zatwierdzić paszport w swoim mObywatelu. Rozszerzamy to na szkołę i
        wyjazdy, w jednym miejscu.
      </Lead>
      <List>
        <ListRow>
          <ListRowAvatar>AN</ListRowAvatar>
          <ListRowContent>
            <ListRowTitle>Anna</ListRowTitle>
            <ListRowDescription>Zatwierdzone dziś, 16:10</ListRowDescription>
          </ListRowContent>
          <Badge>Zgoda</Badge>
        </ListRow>
        <ListRow>
          <ListRowAvatar>TN</ListRowAvatar>
          <ListRowContent>
            <ListRowTitle>Tomasz</ListRowTitle>
            <ListRowDescription>
              {tom
                ? 'Zatwierdzone dziś, 16:11'
                : c.s.askedTom
                  ? 'Prośba wysłana, czekamy…'
                  : 'Jeszcze nie zapytany'}
            </ListRowDescription>
          </ListRowContent>
          {tom ? <Badge>Zgoda</Badge> : <Badge>{c.s.askedTom ? 'Czeka' : '—'}</Badge>}
        </ListRow>
      </List>
      <List className="mt-3.5">
        <Field>
          <FieldLabel>Wizyta w urzędzie</FieldLabel>
          <FieldValue>Tylko zdjęcie. Dzieci do 12 lat nie oddają odcisków palców</FieldValue>
        </Field>
        <Field>
          <FieldLabel>Opłata</FieldLabel>
          <FieldValue>30 zł</FieldValue>
        </Field>
      </List>
      <Actions>
        {tom ? (
          <Button onClick={() => c.toast('Wizyta: Małopolski Urząd Wojewódzki, 2 grudnia, 9:20')}>
            Umów wizytę w urzędzie
          </Button>
        ) : (
          <Button onClick={() => c.set({ askedTom: true })}>Poproś Tomasza o zgodę</Button>
        )}
      </Actions>
    </div>
  );
}

/* 5: Szkoła */
export function School(c: Ctx) {
  const [tab, setTab] = useState('dziś');
  const [ex, setEx] = useState(c.s.excused || false);
  return (
    <div>
      <div className="flex gap-3 items-center mt-1">
        <ListRowAvatar>ZN</ListRowAvatar>
        <div>
          <div className="[.ice-h_&]:font-semibold font-semibold text-[17px]">Zosia · zerówka</div>
          <Muted>Szkoła Podstawowa nr 9, Kraków</Muted>
        </div>
      </div>
      <Title>Szkoła</Title>
      <Segmented
        className="mb-3.5"
        label="Widok"
        value={tab}
        onValueChange={setTab}
        options={['dziś', 'frekwencja', 'oceny'].map(t => [t, t[0].toUpperCase() + t.slice(1)] as const)}
      />
      {tab === 'dziś' && (
        <div>
          <List>
            <ListRow>
              <ListRowTile tone="orange">{I('bell', 18)}</ListRowTile>
              <ListRowContent>
                <ListRowTitle>Nieobecność wczoraj</ListRowTitle>
                <ListRowDescription>
                  {ex ? 'Usprawiedliwiona przez Ciebie, 16:20' : 'Poniedziałek, 23 listopada, cały dzień'}
                </ListRowDescription>
              </ListRowContent>
              {ex ? (
                <Badge>OK</Badge>
              ) : (
                <button
                  className="mini inline-flex gap-1.5 items-center whitespace-nowrap motion-safe:[&:active]:transform-[scale(0.97)] font-semibold text-[15px] p-[6px_14px] bg-fill text-ink rounded-[999px]"
                  onClick={() => {
                    setEx(true);
                    c.set({ excused: true });
                    c.toast('Wychowawczyni dostała usprawiedliwienie.');
                  }}
                >
                  Usprawiedliw
                </button>
              )}
            </ListRow>
            <ListRow>
              <ListRowTile tone="green">{I('route', 18)}</ListRowTile>
              <ListRowContent>
                <ListRowTitle>Wycieczka do Ojcowa, 4 grudnia</ListRowTitle>
                <ListRowDescription>Zgoda rodzica i 45 zł</ListRowDescription>
              </ListRowContent>
              <button
                className="mini inline-flex gap-1.5 items-center whitespace-nowrap motion-safe:[&:active]:transform-[scale(0.97)] font-semibold text-[15px] p-[6px_14px] bg-fill text-ink rounded-[999px]"
                onClick={() => c.toast('Zgoda wyrażona. Płatność BLIK w pełnej wersji.')}
              >
                Zgoda
              </button>
            </ListRow>
            <ListRow>
              <ListRowTile>{I('mail', 18)}</ListRowTile>
              <ListRowContent>
                <ListRowTitle>Wiadomość od wychowawczyni</ListRowTitle>
                <ListRowDescription>
                  „Jutro zajęcia z bezpieczeństwa, proszę o kamizelkę odblaskową”
                </ListRowDescription>
              </ListRowContent>
            </ListRow>
          </List>
        </div>
      )}
      {tab === 'frekwencja' && (
        <Card className="p-4">
          <div className="flex justify-between items-baseline">
            <Subtitle as="div">96%</Subtitle>
            <Muted>listopad</Muted>
          </div>
          <div className="att grid [grid-template-columns:repeat(10,_1fr)] gap-1 mt-3 [&_i]:h-6 [&_i]:rounded-[5px] [&_i]:bg-signal-green [&_i]:opacity-[0.85]">
            {Array.from({ length: 20 }, (_, i) => (
              <i
                key={i}
                className={
                  i === 15 ? (ex ? '[.att_i&]:[background:#ff9500]' : '[.att_i&]:bg-signal-red') : ''
                }
              ></i>
            ))}
          </div>
          <Muted className="mt-2">1 nieobecność{ex ? ' (usprawiedliwiona)' : ''} · 0 spóźnień</Muted>
        </Card>
      )}
      {tab === 'oceny' && (
        <Card className="p-4">
          <Muted>
            Ocena opisowa za I półrocze pojawi się w styczniu. W klasach 1–3 oceny też są opisowe.
          </Muted>
          <Note icon="sparkle" className="mt-3 bg-fill">
            Jeśli chcesz, streścimy ocenę w trzech zdaniach.
          </Note>
        </Card>
      )}
      <Caption className="mt-3">Widzą oboje rodzice. Dane z dziennika elektronicznego szkoły.</Caption>
    </div>
  );
}
