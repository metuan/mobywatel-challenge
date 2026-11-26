import { Caption, Eyebrow, Title } from '@/components/ui/typography';
import { useEffect, useState } from 'react';
import { reducedMotion } from '@/lib/env';
import { TapShare } from '@/ui/controls';
import { I } from '@/ui/icons';
import { Label } from '@/ui/primitives';
import type { Ctx } from '@/types';

export function EuWallet(_c: Ctx) {
  const [side, setSide] = useState(0);
  const [sent, setSent] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setSide(1), reducedMotion() ? 0 : 700);
    return () => clearTimeout(t);
  }, []);
  const stars = Array.from({ length: 12 }, (_, i) => {
    const a = (i / 12) * Math.PI * 2;
    return [50 + Math.cos(a) * 30, 50 + Math.sin(a) * 30];
  });
  return (
    <div>
      <Eyebrow>Lizbona · wypożyczalnia aut</Eyebrow>
      <Title>Ta sama karta w całej Unii</Title>
      <div className={'eu-flip' + (side ? ' on' : '')}>
        <div className="eu-f eu-pl doc tone-id">
          <div className="d-top">
            <span className="d-rp">
              <i className="flag"></i>Rzeczpospolita Polska
            </span>
            <span className="d-kind">Dowód osobisty</span>
          </div>
          <div className="eu-name">Anna Nowicka</div>
          <div className="d-bot">
            <span className="d-chip">mDowód</span>
          </div>
        </div>
        <div className="eu-f eu-eu doc tone-id">
          <svg className="eu-stars" viewBox="0 0 100 100" aria-hidden="true">
            {stars.map(([x, y]) => (
              <circle cx={x} cy={y} r="2.6" fill="#D8C27A" />
            ))}
          </svg>
          <div className="d-top">
            <span className="d-rp">Unia Europejska</span>
            <span className="d-kind">EU Digital Identity</span>
          </div>
          <div className="eu-name">Anna Nowicka</div>
          <div className="d-bot">
            <span className="d-chip">PL · EUDI</span>
            <span className="d-live">
              <i></i>ważny w 27 krajach
            </span>
          </div>
        </div>
      </div>
      <Label t="Wypożyczalnia prosi o 3 informacje" />
      <div className="eu-facts">
        {['Imię i nazwisko', 'Prawo jazdy kat. B', 'Ukończone 25 lat'].map(t => (
          <span className={sent ? 'ok' : ''}>
            {I('check', 14)}
            {t}
          </span>
        ))}
      </div>
      <Caption style={{ margin: '8px 0 14px' }}>Nie udostępniasz: adresu, PESEL ani daty urodzenia.</Caption>
      <TapShare
        them="Rent-a-car Lisboa"
        sub="Anna przykłada telefon do terminala przy ladzie."
        label="Zbliż telefony"
        onDone={() => setSent(true)}
      />
      {sent && (
        <div className="note green" style={{ marginTop: '10px' }}>
          {I('check', 18)}
          <span>
            Udostępniono 3 informacje. Wypożyczalnia nie dostała PESEL ani adresu. Wpis jest w „Kto sprawdzał
            moje dane”.
          </span>
        </div>
      )}
    </div>
  );
}
