import { Chip } from '@/components/ui/pill';
import { List, ListRow, ListRowContent, ListRowDescription, ListRowTitle } from '@/components/ui/list';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Muted, Title } from '@/components/ui/typography';
import { Hero } from '@/ui/illustrations';
import { Row, Sec } from '@/ui/primitives';
import type { Ctx } from '@/types';

/* 7: Podatki */
function TaxesBase(c: Ctx) {
  return (
    <div>
      <Hero n="coin" />
      <Title>Podatki</Title>
      <Card className="taxhero p-4">
        <Muted>PIT-37 za 2025 · Twój e-PIT · zwrot do 45 dni</Muted>
        <div className="big [.taxhero_&]:text-[40px] [.taxhero_&]:font-bold [.taxhero_&]:tracking-[-0.03em] [.taxhero_&]:text-signal-green [.taxhero_&]:m-[4px_0_0]">
          1 284 zł
        </div>
        <Muted>zwrotu, wysłany 3 marca na konto •••• 4471</Muted>
        <div className="steps grid [grid-template-columns:repeat(4,_1fr)] gap-1 m-[12px_0_8px] [&_i]:rounded-xs [&_i]:[background:var(--track)] [&_i]:h-0.75 grid-cols-[repeat(3,1fr)]">
          <i className="on [.progress_i&]:bg-ink [.steps_i&]:bg-ink [.st-ab_>_div&&]:bg-white [.st-ab_&_p]:text-ink [.tour-dots_i&]:w-5.5 [.tour-dots_i&]:bg-ink [.call-keys_button&_span]:bg-white [.call-keys_button&_span]:text-ink"></i>
          <i className="on [.progress_i&]:bg-ink [.steps_i&]:bg-ink [.st-ab_>_div&&]:bg-white [.st-ab_&_p]:text-ink [.tour-dots_i&]:w-5.5 [.tour-dots_i&]:bg-ink [.call-keys_button&_span]:bg-white [.call-keys_button&_span]:text-ink"></i>
          <i className="on [.progress_i&]:bg-ink [.steps_i&]:bg-ink [.st-ab_>_div&&]:bg-white [.st-ab_&_p]:text-ink [.tour-dots_i&]:w-5.5 [.tour-dots_i&]:bg-ink [.call-keys_button&_span]:bg-white [.call-keys_button&_span]:text-ink"></i>
        </div>
        <Muted>Złożony · przyjęty · zwrot wypłacony</Muted>
      </Card>
      <Sec t="Opłaty lokalne" />
      <List>
        <ListRow>
          <ListRowContent>
            <ListRowTitle>Podatek od nieruchomości</ListRowTitle>
            <ListRowDescription>4. rata: 86 zł · termin 15 listopada</ListRowDescription>
          </ListRowContent>
          {c.s.propPaid ? (
            <Badge>Opłacony</Badge>
          ) : (
            <Chip
              onClick={() => {
                c.set({ propPaid: true });
                c.toast('Opłacono 86 zł');
              }}
            >
              Zapłać
            </Chip>
          )}
        </ListRow>
        <ListRow>
          <ListRowContent>
            <ListRowTitle>Opłata za śmieci</ListRowTitle>
            <ListRowDescription>Grudzień: 3 osoby × 46 zł</ListRowDescription>
          </ListRowContent>
          <span className="due">138 zł</span>
        </ListRow>
      </List>
      <Sec t="Pisma" />
      <List>
        <Row
          icon="mail"
          t="Wezwanie z urzędu skarbowego"
          s="Wyjaśnimy prostym językiem"
          onClick={() => c.go('letter-2')}
        />
      </List>
    </div>
  );
}

export function Taxes(c: Ctx) {
  const c2: Ctx = {
    ...c,
    set: p => {
      if (p && p.propPaid && !c.s.propPaid) {
        c.pay({
          amt: '86 zł',
          t: 'Podatek od nieruchomości, 4. rata',
          to: 'Urząd Miasta Krakowa',
          done: () => {
            c.set({ propPaid: true });
            c.toast('Opłacono 86 zł. Potwierdzenie w Skrzynce.');
          },
        });
      } else c.set(p);
    },
    toast: t => (typeof t === 'string' && /Opłacono 86/.test(t) ? null : c.toast(t)),
  };
  return TaxesBase(c2);
}
