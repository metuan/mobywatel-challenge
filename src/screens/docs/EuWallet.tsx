import { Note } from '@/components/ui/note';
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
      <div
        className={
          'eu-flip relative h-50 [perspective:1200px] m-[6px_0_4px]' +
          (side
            ? ' on [.progress_i&]:bg-ink [.steps_i&]:bg-ink [.st-ab_>_div&&]:bg-white [.st-ab_&_p]:text-ink [.tour-dots_i&]:w-5.5 [.tour-dots_i&]:bg-ink [.call-keys_button&_span]:bg-white [.call-keys_button&_span]:text-ink'
            : '')
        }
      >
        <div className="absolute! inset-0 w-full! h-full! [-webkit-backface-visibility:hidden] [transition:transform_0.8s_cubic-bezier(0.32,_0.72,_0,_1)] flex flex-col justify-between p-[18px_20px]! text-left overflow-hidden [.eu-flip.on_&]:transform-[rotateY(-180deg)] doc tone-id">
          <div className="flex justify-between items-center [.eu-eu_&]:pr-24 [.stack.w2_&]:min-h-6">
            <span className="d-rp inline-flex items-center text-[12px] font-medium text-d-ink">
              <i className="w-4 h-2.75 rounded-[3px] mr-2 [background:linear-gradient(#fff_50%,_var(--red)_50%)] [box-shadow:0_0_0_0.5px_rgb(11_13_18_/_22%)] inline-block flex-none [.d-rp_&]:w-3.5 [.d-rp_&]:h-2.5 [.d-rp_&]:mr-1.75 [.d-rp_&]:[box-shadow:none]"></i>
              Rzeczpospolita Polska
            </span>
            <span className="text-[13px] font-medium text-d-ink-2">Dowód osobisty</span>
          </div>
          <div className="text-[24px] font-[650] text-white tracking-[-0.02em] relative">Anna Nowicka</div>
          <div className="flex justify-between items-center [.scard_&]:mt-auto">
            <span className="h-6 p-[0_10px] rounded-[999px] text-[12px] font-medium inline-flex items-center text-white bg-d-hair [box-shadow:inset_0_0_0_0.5px_rgb(255_255_255_/_14%)] [backdrop-filter:blur(8px)]">
              mDowód
            </span>
          </div>
        </div>
        <div className="absolute! inset-0 w-full! h-full! [-webkit-backface-visibility:hidden] [transition:transform_0.8s_cubic-bezier(0.32,_0.72,_0,_1)] flex flex-col justify-between p-[18px_20px]! text-left overflow-hidden eu-eu transform-[rotateY(180deg)] [.eu-flip.on_&]:transform-[rotateY(0)] doc tone-id">
          <svg
            className="relative right-3.5 top-3.5 mt-0 w-24 h-24 opacity-[0.85]"
            viewBox="0 0 100 100"
            aria-hidden="true"
          >
            {stars.map(([x, y]) => (
              <circle cx={x} cy={y} r="2.6" fill="#D8C27A" />
            ))}
          </svg>
          <div className="flex justify-between items-center [.eu-eu_&]:pr-24 [.stack.w2_&]:min-h-6">
            <span className="d-rp inline-flex items-center text-[12px] font-medium text-d-ink">
              Unia Europejska
            </span>
            <span className="text-[13px] font-medium text-d-ink-2">EU Digital Identity</span>
          </div>
          <div className="text-[24px] font-[650] text-white tracking-[-0.02em] relative">Anna Nowicka</div>
          <div className="flex justify-between items-center [.scard_&]:mt-auto">
            <span className="h-6 p-[0_10px] rounded-[999px] text-[12px] font-medium inline-flex items-center text-white bg-d-hair [box-shadow:inset_0_0_0_0.5px_rgb(255_255_255_/_14%)] [backdrop-filter:blur(8px)]">
              PL · EUDI
            </span>
            <span className="text-[11px] [font-variant-numeric:tabular-nums] text-d-ink-2 inline-flex items-center gap-1.5 [&_i]:w-1.5 [&_i]:h-1.5 [&_i]:rounded-[50%] [&_i]:[background:#34c27a]">
              <i></i>ważny w 27 krajach
            </span>
          </div>
        </div>
      </div>
      <Label t="Wypożyczalnia prosi o 3 informacje" />
      <div className="flex flex-wrap gap-2 [&_span]:inline-flex [&_span]:items-center [&_span]:gap-1.5 [&_span]:bg-white [&_span]:rounded-[999px] [&_span]:p-[8px_12px] [&_span]:text-[13.5px] [&_span]:font-medium [&_span]:[transition:background-color_0.3s_ease,_color_0.3s_ease] [&_span_svg]:text-ink-3 [&_span.ok]:bg-ink [&_span.ok]:text-white [&_span.ok_svg]:text-white">
        {['Imię i nazwisko', 'Prawo jazdy kat. B', 'Ukończone 25 lat'].map(t => (
          <span className={sent ? 'ok' : ''}>
            {I('check', 14)}
            {t}
          </span>
        ))}
      </div>
      <Caption className="mt-2 mr-0 mb-3.5 ml-0">Nie udostępniasz: adresu, PESEL ani daty urodzenia.</Caption>
      <TapShare
        them="Rent-a-car Lisboa"
        sub="Anna przykłada telefon do terminala przy ladzie."
        label="Zbliż telefony"
        onDone={() => setSent(true)}
      />
      {sent && (
        <Note icon="check" tone="green" className="mt-2.5">
          Udostępniono 3 informacje. Wypożyczalnia nie dostała PESEL ani adresu. Wpis jest w „Kto sprawdzał
          moje dane”.
        </Note>
      )}
    </div>
  );
}
