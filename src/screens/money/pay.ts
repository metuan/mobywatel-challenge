import { html, useEffect } from '@/lib/preact';
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
  return html`<div class="pay8">
    <div class="q">Płatność przez ePłatności</div>
    <div class="pay-amt">${sheet.amt}</div>
    <div class="pay-to">${sheet.t}<br/><span>${sheet.to}</span></div>
    <div class="pay-m">${METHODS.map(([ic, t, s], i) => html`<button aria-pressed=${sheet.m === i} onClick=${() => setSheet({ ...sheet, m: i })}><span class="lead-i">${I(ic, 18)}</span><span class="gtx"><span class="gt">${t}</span><span class="gs">${s}</span></span><span class="radio"></span></button>`)}</div>
    <div class="actions row2"><button class="btn soft" onClick=${close}>Anuluj</button><button class="btn" onClick=${() => setSheet({ ...sheet, stage: 1 })}>Zapłać ${sheet.amt}</button></div>
    <p class="tiny" style="text-align:center;margin-top:10px">Potwierdzasz twarzą. Pieniądze trafiają prosto do urzędu.</p>
  </div>`;
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
  return html`<div class="pay8 done"><div class="pay-ok">${I('check', 30)}</div><div class="pay-amt sm">Zapłacono ${sheet.amt}</div>
    <div class="pay-to">${sheet.t}<br/><span>Potwierdzenie jest w Skrzynce</span></div></div>`;
}

/** Turn selected confirmations into payments (a fine becomes an ePłatności sheet). */
export const payWrap = (c: Ctx, map: (o: SheetRequest) => SheetRequest | false | null | undefined): Ctx => ({
  ...c,
  confirm: (o: SheetRequest) => {
    const m = map(o);
    m ? c.pay({ ...m, done: o.done }) : c.confirm(o);
  },
});
