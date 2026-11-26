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
    <div className="pay8">
      <div className="q">Płatność przez ePłatności</div>
      <div className="pay-amt">{sheet.amt}</div>
      <div className="pay-to">
        {sheet.t}
        <br />
        <span>{sheet.to}</span>
      </div>
      <div className="pay-m">
        {METHODS.map(([ic, t, s], i) => (
          <button aria-pressed={sheet.m === i} onClick={() => setSheet({ ...sheet, m: i })}>
            <span className="lead-i">{I(ic, 18)}</span>
            <ListItemContent>
              <ListItemTitle>{t}</ListItemTitle>
              <ListItemDescription>{s}</ListItemDescription>
            </ListItemContent>
            <span className="radio"></span>
          </button>
        ))}
      </div>
      <Actions row>
        <Button variant="secondary" onClick={close}>
          Anuluj
        </Button>
        <Button onClick={() => setSheet({ ...sheet, stage: 1 })}>Zapłać {sheet.amt}</Button>
      </Actions>
      <Caption style={{ textAlign: 'center', marginTop: '10px' }}>
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
    <div className="pay8 done">
      <div className="pay-ok">{I('check', 30)}</div>
      <div className="pay-amt sm">Zapłacono {sheet.amt}</div>
      <div className="pay-to">
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
