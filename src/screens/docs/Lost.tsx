import type { CSSProperties } from 'react';
import { cn } from '@/lib/utils';
import { List, ListRow, ListRowContent, ListRowIcon, ListRowTitle } from '@/components/ui/list';
import { Caption, Lead, Title } from '@/components/ui/typography';
import { Actions } from '@/components/ui/button';
import { useState } from 'react';
import { HoldBtn } from '@/ui/controls';
import { I } from '@/ui/icons';
import { Row, Sec } from '@/ui/primitives';
import type { Ctx } from '@/types';

export function Lost(c: Ctx) {
  const [done, setDone] = useState(false);
  const items = [
    'mDowód i dowód osobisty',
    'Prawo jazdy',
    'PESEL: nikt nie weźmie kredytu na Twoje dane',
    'Karty płatnicze w 3 bankach',
  ];
  const finish = () => {
    setDone(true);
    c.toast({ t: 'Zastrzeżono 4 dokumenty', undo: () => setDone(false) });
  };
  return (
    <div>
      <Title>{done ? 'Wszystko zastrzeżone.' : 'Zgubiłaś portfel?'}</Title>
      <Lead>
        {done
          ? 'Zastrzeżenia są aktywne od 15:58. Oto co dalej.'
          : 'Zastrzeżemy to wszystko naraz. Każdy krok możesz później cofnąć.'}
      </Lead>
      <List className={cn('lost8', done && 'done')}>
        {items.map((t, i) => (
          <ListRow key={t} style={{ '--i': i } as CSSProperties}>
            <ListRowIcon className="[.lost8_&]:[transition:background_0.25s,_color_0.25s] [.lost8.done_&]:bg-green-soft [.lost8.done_&]:animate-[pop_0.32s_var(--spring)_calc(var(--i)*60ms)_both]">
              {done ? I('check', 18) : I('lock', 18)}
            </ListRowIcon>
            <ListRowContent>
              <ListRowTitle>{t}</ListRowTitle>
            </ListRowContent>
          </ListRow>
        ))}
      </List>
      {done ? (
        <>
          <Sec t="Następne kroki" />
          <List>
            <Row t="Zamów nowy dowód" s="Wizyta w urzędzie na zdjęcie i odciski" onClick={() => {}} />
            <Row t="Zgłoś kradzież na policję" s="Jeśli portfel ukradziono" onClick={() => {}} />
          </List>
        </>
      ) : (
        <>
          <Actions>
            <HoldBtn
              label="Przytrzymaj, żeby zastrzec"
              holdLabel="Trzymaj…"
              onDone={finish}
              onTap={() =>
                c.confirm({
                  t: 'Zastrzec 4 dokumenty?',
                  items: items,
                  ok: 'Zastrzeż',
                  done: () => setDone(true),
                })
              }
            />
          </Actions>
          <Caption className="text-center mt-2">
            Przytrzymaj przycisk przez sekundę. Krótkie dotknięcie pokaże podsumowanie.
          </Caption>
        </>
      )}
    </div>
  );
}
