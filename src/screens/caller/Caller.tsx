import { useEffect, useState } from 'react';
import { Icon } from '@/ui/icons';
import type { Ctx } from '@/types';

/* Hop 13: "Kto do mnie dzwoni?" checks a caller who claims to be an office */
export function Caller(c: Ctx) {
  const [st, setSt] = useState(0); /* 0 ringing, 1 checked */
  useEffect(() => {
    const a = setTimeout(() => setSt(1), 1500);
    return () => clearTimeout(a);
  }, []);
  return (
    <div className="absolute inset-0 flex flex-col items-center p-[110px_24px_40px] [background:linear-gradient(180deg,_#3a3f4b_0%,_#14171d_60%)] text-white text-center">
      <div className="cl-top">
        <div className="text-[14px] [color:rgb(255_255_255_/_60%)]">Połączenie przychodzące</div>
        <div className="text-[40px] font-semibold tracking-[-0.03em] mt-1.5">ZUS</div>
        <div className="text-[16px] [color:rgb(255_255_255_/_60%)] mt-1 [font-variant-numeric:tabular-nums]">
          +48 22 560 16 00
        </div>
      </div>
      <div
        className={
          'mt-8.5 flex gap-3 items-start text-left text-[14.5px] leading-[1.4] bg-d-hair [backdrop-filter:blur(20px)] rounded-[20px] p-[14px_16px] [transition:background_0.3s] [&.bad]:bg-red [&.bad]:animate-[fadeUp_0.3s_var(--out)] ' +
          (st ? 'bad' : '')
        }
      >
        {st === 0 ? (
          <>
            <span className="flex-none w-4.5 h-4.5 rounded-[50%] [border:2px_solid_rgb(255_255_255_/_25%)] [&&]:border-t-white animate-[spin_0.8s_linear_infinite] mt-px motion-reduce:animate-none"></span>
            <span>mObywatel sprawdza, czy to naprawdę ZUS…</span>
          </>
        ) : (
          <>
            <span className="flex-none w-8.5 h-8.5 rounded-[50%] [background:rgb(255_255_255_/_20%)] grid place-items-center">
              <Icon name="shield" size={20} />
            </span>
            <span>
              <b>To nie jest ZUS.</b> ZUS nie dzwoni teraz do Ciebie z żadnego numeru. Ktoś podszywa się pod
              urząd. Nie podawaj kodów ani danych.
            </span>
          </>
        )}
      </div>
      <div className="mt-auto flex justify-between w-full p-[0_18px]">
        <button
          className="cl-btn flex flex-col items-center gap-2.5 text-white text-[13px] [&_span]:w-18.5 [&_span]:h-18.5 [&_span]:rounded-[50%] [&_span]:grid [&_span]:place-items-center [&_span]:[transition:transform_0.16s_var(--out)] [&:active_span]:transform-[scale(0.95)] [&.cl-btn_span]:[background:#e5243b] [&.cl-btn_svg]:transform-[rotate(135deg)]"
          onClick={() => {
            c.toast('Odrzucono. Numer zgłoszony do CERT Polska.');
            c.back();
          }}
        >
          <span>
            <Icon name="call" size={28} />
          </span>
          Odrzuć i zgłoś
        </button>
        <button
          className="cl-btn flex flex-col items-center gap-2.5 text-white text-[13px] [&_span]:w-18.5 [&_span]:h-18.5 [&_span]:rounded-[50%] [&_span]:grid [&_span]:place-items-center [&_span]:[transition:transform_0.16s_var(--out)] [&:active_span]:transform-[scale(0.95)] [&.cl-btn_span]:bg-signal-green"
          onClick={() => {
            c.toast('Uważaj: nie podawaj kodów SMS ani BLIK.');
            c.back();
          }}
        >
          <span>
            <Icon name="call" size={28} />
          </span>
          Odbierz
        </button>
      </div>
      <p className="m-[22px_0_0] text-[12px] leading-[1.4] [color:rgb(255_255_255_/_55%)]">
        Urzędy zgłaszają swoje połączenia z wyprzedzeniem. Gdy dzwoni prawdziwy urząd, zobaczysz zielony znak
        i powód rozmowy.
      </p>
    </div>
  );
}
