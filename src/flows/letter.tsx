import { cn } from '@/lib/utils';
import { Field, FieldLabel, FieldValue } from '@/components/ui/field';
import { List } from '@/components/ui/list';
import { Card } from '@/components/ui/card';
import { Note } from '@/components/ui/note';
import { Eyebrow, Muted, Title } from '@/components/ui/typography';
import { Actions, Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { I } from '@/ui/icons';
import { Hero } from '@/ui/illustrations';
import type { Ctx } from '@/types';

export function Letter1(c: Ctx) {
  const [snap, setSnap] = useState(false);
  useEffect(() => {
    if (snap) {
      const t = setTimeout(() => c.go('letter-2'), 1400);
      return () => clearTimeout(t);
    }
  }, [snap]);
  return (
    <div>
      <Hero n="letter" />
      <Title>Zrób zdjęcie pisma</Title>
      <div className="relative grid h-[420px] place-items-center overflow-hidden rounded-[20px] bg-[#1b1e24]">
        <div className="h-[300px] w-[220px] -rotate-2 rounded-[4px] bg-[#f6f5f0] p-[18px] text-[7px]/[1.6] text-[#444]">
          <div className="font-bold text-[8px]">URZĄD SKARBOWY KRAKÓW-PODGÓRZE</div>
          <div>ul. Wadowicka 10</div>
          <br />
          <div className="font-bold">WEZWANIE</div>
          <div>
            Na podstawie art. 155 § 1 Ordynacji podatkowej wzywa się Panią do złożenia wyjaśnień dotyczących
            korekty zeznania PIT-37 za rok 2025…
          </div>
          <div className="mt-1.5">{'▬ '.repeat(40)}</div>
        </div>
        <div
          className={cn(
            'absolute inset-x-[50px] inset-y-10 rounded-[14px] border-2',
            snap ? 'border-[#1c7a4c]' : 'border-white/70',
          )}
        ></div>
        {snap && <div className="absolute bottom-4 text-[#fff] text-[13px]">Czytam pismo…</div>}
      </div>
      <Actions>
        <Button onClick={() => setSnap(true)}>{I('camera', 18)} Zrób zdjęcie</Button>
      </Actions>
    </div>
  );
}

export function Letter3(c: Ctx) {
  return (
    <div>
      <Eyebrow>Podgląd odpowiedzi</Eyebrow>
      <Title>Wyjaśnienie do urzędu</Title>
      <Card className="p-4 text-[14px] leading-[1.6]">
        <p className="mt-0 mr-0 mb-2 ml-0">W sprawie: pisma z 19.11.2026, PIT-37 za 2025 r.</p>
        <p className="mt-0 mr-0 mb-2 ml-0">
          Poprawiłam zeznanie, bo w pierwszej wersji zapomniałam o uldze na dziecko (Zofia Nowicka, PESEL
          200307•••••). Dołączam zaświadczenie.
        </p>
        <p className="m-0">Anna Nowicka</p>
      </Card>
      <List className="mt-2.5">
        <Field>
          <FieldLabel>Załącznik</FieldLabel>
          <FieldValue>Zaświadczenie o uldze na dziecko (z rejestru, bez skanowania)</FieldValue>
        </Field>
      </List>
      {c.s.letterSent ? (
        <Note icon="check" tone="green" className="mt-3.5">
          Wysłano przez e-Doręczenia. Urzędowe potwierdzenie odbioru jest zapisane w sprawie.
        </Note>
      ) : (
        <Actions>
          <Button
            onClick={() =>
              c.confirm({
                t: 'Wysłać wyjaśnienie?',
                items: ['Do: Urząd Skarbowy Kraków-Podgórze', 'Przez: e-Doręczenia', '1 załącznik'],
                ok: 'Potwierdź i wyślij',
                done: () => {
                  c.set({ letterSent: true });
                  c.toast('Wysłano. Urząd ma 14 dni na odpowiedź.');
                },
              })
            }
          >
            Potwierdź
          </Button>
          <Button variant="secondary">Edytuj treść</Button>
        </Actions>
      )}
    </div>
  );
}

/* Hop 10: the explanation streams in, so the AI step feels like work, not magic */
export function Letter2(c: Ctx) {
  const [k, setK] = useState(c.s.l2seen ? 4 : 0);
  useEffect(() => {
    if (k >= 4) {
      c.s.l2seen || c.set({ l2seen: true });
      setTimeout(() => window.dispatchEvent(new Event('coach')), 60);
      return;
    }
    const a = setTimeout(() => setK(k + 1), k ? 520 : 900);
    return () => clearTimeout(a);
  }, [k]);
  const F = [
    [
      'Co to znaczy',
      'To nie kara. Urząd chce wiedzieć, dlaczego zmieniłaś zeznanie za 2025 rok i zwrot wzrósł o 1 240 zł.',
    ],
    ['Termin', '7 grudnia 2026 (14 dni od dnia, w którym dostałaś pismo)'],
    ['Co zrobić', 'Wyślij krótkie wyjaśnienie i zaświadczenie o uldze na dziecko.'],
  ];
  return (
    <div>
      <Eyebrow>Wyjaśnienie pisma</Eyebrow>
      <Title>Urząd skarbowy prosi o wyjaśnienie korekty PIT-37.</Title>
      {k < 4 && (
        <div className="ai-work">
          {I('sparkle', 14)}{' '}
          <span>
            {['Czytam pismo…', 'Szukam przepisu…', 'Sprawdzam termin…', 'Piszę prostym językiem…'][k]}
          </span>
        </div>
      )}
      <List>
        {F.map(([l, v], i) => (
          <Field>
            <FieldLabel>{l}</FieldLabel>
            {i < k ? (
              <FieldValue className="in">{v}</FieldValue>
            ) : (
              <div className="skel">
                <i></i>
                <i></i>
              </div>
            )}
          </Field>
        ))}
      </List>
      {k >= 4 && (
        <>
          <div className="msg ai in max-w-[100%] mt-3">
            <Muted as="span">Źródła</Muted>
            <div className="srcs">
              <span>Ordynacja podatkowa, art. 155</span>
              <span>podatki.gov.pl: korekta zeznania</span>
            </div>
          </div>
          <p className="ai-warn">Asystent może się mylić. To nie jest porada prawna.</p>
        </>
      )}
      <Actions>
        <Button disabled={k < 4} onClick={() => c.go('letter-3')}>
          Przygotuj odpowiedź
        </Button>
      </Actions>
    </div>
  );
}
