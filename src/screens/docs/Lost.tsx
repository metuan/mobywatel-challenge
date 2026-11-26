import { Actions } from '@/components/ui/button';
import { sx } from '@/lib/sx';
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
      <h1 className="h-l">{done ? 'Wszystko zastrzeżone.' : 'Zgubiłaś portfel?'}</h1>
      <p className="lead">
        {done
          ? 'Zastrzeżenia są aktywne od 15:58. Oto co dalej.'
          : 'Zastrzeżemy to wszystko naraz. Każdy krok możesz później cofnąć.'}
      </p>
      <div className={'list lost8' + (done ? ' done' : '')}>
        {items.map((t, i) => (
          <div className="row" style={sx(`--i:${i}`)}>
            <span className="ic lk">{done ? I('check', 18) : I('lock', 18)}</span>
            <span className="tx">
              <div className="t">{t}</div>
            </span>
          </div>
        ))}
      </div>
      {done ? (
        <>
          <Sec t="Następne kroki" />
          <div className="list">
            <Row t="Zamów nowy dowód" s="Wizyta w urzędzie na zdjęcie i odciski" onClick={() => {}} />
            <Row t="Zgłoś kradzież na policję" s="Jeśli portfel ukradziono" onClick={() => {}} />
          </div>
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
          <p className="tiny" style={{ textAlign: 'center', marginTop: '8px' }}>
            Przytrzymaj przycisk przez sekundę. Krótkie dotknięcie pokaże podsumowanie.
          </p>
        </>
      )}
    </div>
  );
}
