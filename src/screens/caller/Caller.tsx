import { useEffect, useState } from 'react';
import { I } from '@/ui/icons';
import type { Ctx } from '@/types';

/* Hop 13: "Kto do mnie dzwoni?" checks a caller who claims to be an office */
export function Caller(c: Ctx) {
  const [st, setSt] = useState(0); /* 0 ringing, 1 checked */
  useEffect(() => {
    const a = setTimeout(() => setSt(1), 1500);
    return () => clearTimeout(a);
  }, []);
  return (
    <div className="caller8">
      <div className="cl-top">
        <div className="cl-k">Połączenie przychodzące</div>
        <div className="cl-n">ZUS</div>
        <div className="cl-num">+48 22 560 16 00</div>
      </div>
      <div className={'cl-check ' + (st ? 'bad' : '')}>
        {st === 0 ? (
          <>
            <span className="cl-spin"></span>
            <span>mObywatel sprawdza, czy to naprawdę ZUS…</span>
          </>
        ) : (
          <>
            <span className="cl-ic">{I('shield', 20)}</span>
            <span>
              <b>To nie jest ZUS.</b> ZUS nie dzwoni teraz do Ciebie z żadnego numeru. Ktoś podszywa się pod
              urząd. Nie podawaj kodów ani danych.
            </span>
          </>
        )}
      </div>
      <div className="cl-keys">
        <button
          className="cl-btn no"
          onClick={() => {
            c.toast('Odrzucono. Numer zgłoszony do CERT Polska.');
            c.back();
          }}
        >
          <span>{I('call', 28)}</span>Odrzuć i zgłoś
        </button>
        <button
          className="cl-btn yes"
          onClick={() => {
            c.toast('Uważaj: nie podawaj kodów SMS ani BLIK.');
            c.back();
          }}
        >
          <span>{I('call', 28)}</span>Odbierz
        </button>
      </div>
      <p className="cl-foot">
        Urzędy zgłaszają swoje połączenia z wyprzedzeniem. Gdy dzwoni prawdziwy urząd, zobaczysz zielony znak
        i powód rozmowy.
      </p>
    </div>
  );
}
