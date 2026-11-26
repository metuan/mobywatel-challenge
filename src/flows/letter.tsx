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
        {snap && <div className="absolute bottom-4 text-white text-[13px]">Czytam pismo…</div>}
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
      const t = setTimeout(() => window.dispatchEvent(new Event('coach')), 60);
      return () => clearTimeout(t);
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
        <div className="inline-flex items-center gap-2 text-[13px] font-medium p-[6px_12px] rounded-[999px] text-white [background:linear-gradient(135deg,_var(--signal-blue),_var(--signal-violet))] m-[2px_0_10px] [box-shadow:0_4px_12px_-6px_rgb(76_90_255_/_70%)] [&_span]:animate-[fadeUp_0.25s_var(--out)]">
          {I('sparkle', 14)}{' '}
          <span>
            {['Czytam pismo…', 'Szukam przepisu…', 'Sprawdzam termin…', 'Piszę prostym językiem…'][k]}
          </span>
        </div>
      )}
      <List>
        {F.map(([l, v], i) => (
          <Field key={l}>
            <FieldLabel>{l}</FieldLabel>
            {i < k ? (
              <FieldValue className="in [&.v]:[animation:txtin_0.3s_cubic-bezier(0.23,_1,_0.32,_1)_both] [&.msg]:[animation:txtin_0.3s_cubic-bezier(0.23,_1,_0.32,_1)_both] motion-reduce:[&.v]:animate-none! motion-reduce:[&.v]:filter-none motion-reduce:[&.msg]:animate-none! motion-reduce:[&.msg]:filter-none">
                {v}
              </FieldValue>
            ) : (
              <div className="flex flex-col gap-1.75 p-[6px_0_2px] [&_i]:h-3 [&_i]:rounded-[6px] [&_i]:[background:linear-gradient(90deg,_var(--fill)_0%,_var(--fill-2)_40%,_var(--fill)_80%)] [&&_i]:bg-size-[200%_100%] [&_i]:animate-[shim_1.1s_linear_infinite] [&_i_+_i]:w-[62%] motion-reduce:[&_i]:animate-none!">
                <i></i>
                <i></i>
              </div>
            )}
          </Field>
        ))}
      </List>
      {k >= 4 && (
        <>
          <div className="msg p-[12px_15px] rounded-[22px] text-[15px] [&&.ai]:self-start [&.ai]:[border:0] [&.ai]:rounded-[22px]! [&.ai]:[box-shadow:none]! [&&.ai]:bg-white ai in [&.v]:[animation:txtin_0.3s_cubic-bezier(0.23,_1,_0.32,_1)_both] [&.msg]:[animation:txtin_0.3s_cubic-bezier(0.23,_1,_0.32,_1)_both] motion-reduce:[&.v]:animate-none! motion-reduce:[&.v]:filter-none motion-reduce:[&.msg]:animate-none! motion-reduce:[&.msg]:filter-none max-w-[100%] mt-3">
            <Muted as="span">Źródła</Muted>
            <div className="[.msg_&]:flex [.msg_&]:flex-wrap [.msg_&]:gap-1.5 [.msg_&]:mt-2.5 [.msg_&_span]:text-[12px] [.msg_&_span]:bg-bg [.msg_&_span]:rounded-[999px] [.msg_&_span]:p-[4px_10px] [.msg_&_span]:text-(--ink2) [.msg_&_span]:inline-flex [.msg_&_span]:gap-1.25 [.msg_&_span]:items-center [&.in]:animate-[fadeUp_0.25s_var(--out)]">
              <span>Ordynacja podatkowa, art. 155</span>
              <span>podatki.gov.pl: korekta zeznania</span>
            </div>
          </div>
          <p className="text-[12.5px] text-ink-2 m-0">Asystent może się mylić. To nie jest porada prawna.</p>
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
