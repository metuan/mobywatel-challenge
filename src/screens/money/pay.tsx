import { ListItemContent, ListItemDescription, ListItemTitle } from '@/components/ui/list';
import { Caption } from '@/components/ui/typography';
import { Actions, Button } from '@/components/ui/button';
import { useEffect } from 'react';
import { coachTip } from '@/story/coach';
import { I } from '@/ui/icons';
import type { IconName } from '@/ui/icons';
import type { Ctx, Sheet, SheetRequest } from '@/types';

/* Hop 18: one payment sheet for every fee and fine */
const METHODS: [IconName, string, string][] = [
  ['blik', 'BLIK', 'Kod z aplikacji banku'],
  ['card2', 'Karta •• 4471', 'Zapisana w mObywatelu'],
  ['coin', 'Przelew z banku', 'PKO BP, Pekao, mBank i inne'],
];

export function PaySheet({
  sheet,
  setSheet,
  close,
}: {
  sheet: Sheet;
  setSheet: (s: Sheet) => void;
  close: () => void;
}) {
  return (
    <div className="pay8 text-center [&.done]:p-[18px_0_26px]">
      <div className="[.sheet_&]:mb-2.5 [.sheet_&]:text-ink-2 [.sheet_&]:font-semibold [.sheet_&]:text-[13px] [.sheet_&]:normal-case! [.sheet_&]:[letter-spacing:0]! [.pay8_&&]:mb-1.5">
        Płatność przez ePłatności
      </div>
      <div className="text-[44px] font-[650] tracking-[-0.035em] leading-[1.1] [font-variant-numeric:tabular-nums] [&.sm]:text-[26px] [&.sm]:mt-3">
        {sheet.amt}
      </div>
      <div className="text-[14.5px] mt-1.5 leading-[1.4] [&_span]:text-ink-2">
        {sheet.t}
        <br />
        <span>{sheet.to}</span>
      </div>
      <div className="pay-m flex flex-col mt-4.5 bg-fill rounded-[18px] p-1 text-left [&_button]:flex [&_button]:items-center [&_button]:gap-3 [&_button]:p-[10px_12px] [&_button]:rounded-[14px] [&_button]:[transition:background_0.2s] [&_button[aria-pressed='true']]:bg-surface [&_button[aria-pressed='true']]:[box-shadow:0_1px_3px_rgb(11_13_18_/_8%)]">
        {METHODS.map(([ic, t, s], i) => (
          <button aria-pressed={sheet.m === i} onClick={() => setSheet({ ...sheet, m: i })}>
            <span className="w-10 h-10 rounded-[50%] grid place-items-center flex-none text-ink bg-bg [&.ai]:[background:linear-gradient(135deg,_var(--signal-blue),_var(--signal-violet))] [&.ai]:text-white [.how8-row_&]:w-7.5 [.how8-row_&]:h-7.5 [.how8-row_&]:rounded-[10px]">
              {I(ic, 18)}
            </span>
            <ListItemContent>
              <ListItemTitle>{t}</ListItemTitle>
              <ListItemDescription>{s}</ListItemDescription>
            </ListItemContent>
            <span className="w-5 h-5 rounded-[50%] [box-shadow:inset_0_0_0_1.5px_var(--ink-3)] [transition:box-shadow_0.2s] [.pay-m_button[aria-pressed='true']_&]:[box-shadow:inset_0_0_0_6px_var(--ink)]"></span>
          </button>
        ))}
      </div>
      <Actions row>
        <Button variant="secondary" onClick={close}>
          Anuluj
        </Button>
        <Button onClick={() => setSheet({ ...sheet, stage: 1 })}>Zapłać {sheet.amt}</Button>
      </Actions>
      <Caption className="text-center mt-2.5">
        Potwierdzasz twarzą. Pieniądze trafiają prosto do urzędu.
      </Caption>
    </div>
  );
}

export function PayDone({ sheet, close }: { sheet: Sheet; close: () => void }) {
  useEffect(() => {
    coachTip(null);
    const a = setTimeout(close, 2200);
    const k = setInterval(() => coachTip(null), 120);
    return () => {
      clearTimeout(a);
      clearInterval(k);
    };
  }, []);
  return (
    <div className="pay8 text-center [&.done]:p-[18px_0_26px] done">
      <div className="w-16 h-16 m-[0_auto] rounded-[50%] bg-green text-white grid place-items-center animate-[pop_0.4s_var(--spring)]">
        {I('check', 30)}
      </div>
      <div className="text-[44px] font-[650] tracking-[-0.035em] leading-[1.1] [font-variant-numeric:tabular-nums] [&.sm]:text-[26px] [&.sm]:mt-3 sm">
        Zapłacono {sheet.amt}
      </div>
      <div className="text-[14.5px] mt-1.5 leading-[1.4] [&_span]:text-ink-2">
        {sheet.t}
        <br />
        <span>Potwierdzenie jest w Skrzynce</span>
      </div>
    </div>
  );
}

/** Turn selected confirmations into payments (a fine becomes an ePłatności sheet). */
export const payWrap = (c: Ctx, map: (o: SheetRequest) => SheetRequest | false | null | undefined): Ctx => ({
  ...c,
  confirm: (o: SheetRequest) => {
    const m = map(o);
    m ? c.pay({ ...m, done: o.done }) : c.confirm(o);
  },
});
