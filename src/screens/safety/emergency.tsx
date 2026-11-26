import {
  List,
  ListRow,
  ListRowChevron,
  ListRowContent,
  ListRowDescription,
  ListRowTile,
  ListRowTitle,
} from '@/components/ui/list';
import { Caption, Eyebrow, Title } from '@/components/ui/typography';
import { useState } from 'react';
import { I } from '@/ui/icons';
import { Toggle } from '@/ui/primitives';
import type { Ctx } from '@/types';

/* 1 + 3: Karta ratunkowa i identyfikator medyczny */
export function Ice(c: Ctx) {
  const [lock, setLock] = useState(c.s.medLock !== false);
  return (
    <div>
      <Eyebrow>Karta ratunkowa</Eyebrow>
      <Title>Na wypadek, gdy nie możesz mówić</Title>
      <div className="[background:#fff] rounded-2xl overflow-hidden">
        <div className="ice-h flex gap-3 items-center p-4 [border-bottom:0.5px_solid_var(--sep)]">
          <span className="w-9 h-9 rounded-[10px] [background:#ff3b30] [color:#fff] grid place-items-center flex-none">
            {I('plus', 18)}
          </span>
          <div>
            <div className="[.ice-h_&]:font-semibold [.ice-h_&]:text-[17px]">Anna Nowicka</div>
            <div className="[.ice-h_&]:text-[14px] [.ice-h_&]:text-(--label2) [.hw-col_i&]:w-[60%]">
              34 lata · 168 cm · 61 kg
            </div>
          </div>
        </div>
        <div className="ice-g grid grid-cols-[1fr_1fr] gap-px [background:var(--sep)] [&_>_div]:[background:#fff] [&_>_div]:p-[12px_16px] [&_.l]:text-[13px] [&_.l]:text-(--label2)">
          <div>
            <div className="l">Grupa krwi</div>
            <div className="v [.ice-g_&]:text-[17px] [.ice-g_&]:font-semibold [.stats_&]:text-[20px] [.stats_&]:font-bold [.stats_&]:tracking-[-0.02em] [.stats_&.red]:text-[#ff3b30]">
              A Rh+
            </div>
          </div>
          <div>
            <div className="l">Alergie</div>
            <div className="v [.ice-g_&]:text-[17px] [.ice-g_&]:font-semibold [.stats_&]:text-[20px] [.stats_&]:font-bold [.stats_&]:tracking-[-0.02em] [.stats_&.red]:text-[#ff3b30]">
              Penicylina
            </div>
          </div>
          <div>
            <div className="l">Leki</div>
            <div className="v [.ice-g_&]:text-[17px] [.ice-g_&]:font-semibold [.stats_&]:text-[20px] [.stats_&]:font-bold [.stats_&]:tracking-[-0.02em] [.stats_&.red]:text-[#ff3b30]">
              Euthyrox 50
            </div>
          </div>
          <div>
            <div className="l">Choroby</div>
            <div className="v [.ice-g_&]:text-[17px] [.ice-g_&]:font-semibold [.stats_&]:text-[20px] [.stats_&]:font-bold [.stats_&]:tracking-[-0.02em] [.stats_&.red]:text-[#ff3b30]">
              Niedoczynność tarczycy
            </div>
          </div>
        </div>
        <div className="[&_.l]:text-[13px] [&_.l]:text-(--label2) p-[12px_16px]">
          <div className="l">Kontakt w nagłych wypadkach</div>
          <div className="flex justify-between items-center p-[8px_0] text-[15px]">
            <span>Tomasz Nowicki · partner</span>
            <span className="mini inline-flex gap-1.5 items-center whitespace-nowrap motion-safe:[&:active]:transform-[scale(0.97)] font-semibold text-[15px] p-[6px_14px] [background:var(--fill)] text-ink rounded-[999px]">
              {I('phone', 14)} Zadzwoń
            </span>
          </div>
          <div className="flex justify-between items-center p-[8px_0] text-[15px]">
            <span>Stanisław Nowicki · tata</span>
            <span className="mini inline-flex gap-1.5 items-center whitespace-nowrap motion-safe:[&:active]:transform-[scale(0.97)] font-semibold text-[15px] p-[6px_14px] [background:var(--fill)] text-ink rounded-[999px]">
              {I('phone', 14)} Zadzwoń
            </span>
          </div>
        </div>
      </div>
      <List className="mt-3.5">
        <ListRow>
          <ListRowTile tone="red">{I('lock', 18)}</ListRowTile>
          <ListRowContent>
            <ListRowTitle>Pokaż na ekranie blokady</ListRowTitle>
            <ListRowDescription>Ratownik zobaczy kartę bez odblokowania telefonu</ListRowDescription>
          </ListRowContent>
          <Toggle
            on={lock}
            label="Pokaż na ekranie blokady"
            set={(v: boolean) => {
              setLock(v);
              c.set({ medLock: v });
            }}
          />
        </ListRow>
        <ListRow>
          <ListRowTile>{I('wifi', 18)}</ListRowTile>
          <ListRowContent>
            <ListRowTitle>Działa bez internetu</ListRowTitle>
            <ListRowDescription>Zapisana w telefonie, zaszyfrowana</ListRowDescription>
          </ListRowContent>
        </ListRow>
        <ListRow as="button" onClick={() => c.go('medical-id')}>
          <ListRowTile>{I('eye', 18)}</ListRowTile>
          <ListRowContent>
            <ListRowTitle>Zobacz, co widzi ratownik</ListRowTitle>
          </ListRowContent>
          <ListRowChevron size={18} />
        </ListRow>
      </List>
      <Caption className="mt-3">
        Alergie i leki pobieramy z Internetowego Konta Pacjenta za Twoją zgodą. Grupę krwi i kontakty
        wpisujesz sama.
      </Caption>
    </div>
  );
}

export function MedicalId(c: Ctx) {
  return (
    <div className="lock [background:#000]" role="region" aria-label="Ekran blokady: identyfikator medyczny">
      <div className="text-center relative [&_>_span]:opacity-[0.8]">
        <div className="text-[15px] opacity-[0.85] m-[4px_0_14px] font-medium mt-1.5">
          Ekran blokady · widok ratownika
        </div>
      </div>
      <div className="[background:#1c1c1e] rounded-2xl p-4 mt-2.5">
        <div className="flex gap-2.5 items-center text-[#ff453a] text-[15px]">
          <span className="w-9 h-9 rounded-[10px] [background:#ff3b30] [color:#fff] grid place-items-center flex-none bg-[#ff3b30]">
            {I('plus', 16)}
          </span>
          <b>Identyfikator medyczny</b>
        </div>
        <div className="text-[24px] font-bold m-[12px_0_8px] tracking-[-0.02em]">Anna Nowicka, 34</div>
        <div className="flex justify-between p-[10px_0] [border-top:0.5px_solid_rgb(255_255_255_/_15%)] text-[15px] [&_span]:[color:rgb(235_235_245_/_60%)]">
          <span>Grupa krwi</span>
          <b>A Rh+</b>
        </div>
        <div className="flex justify-between p-[10px_0] [border-top:0.5px_solid_rgb(255_255_255_/_15%)] text-[15px] [&_span]:[color:rgb(235_235_245_/_60%)]">
          <span>Alergie</span>
          <b>Penicylina</b>
        </div>
        <div className="flex justify-between p-[10px_0] [border-top:0.5px_solid_rgb(255_255_255_/_15%)] text-[15px] [&_span]:[color:rgb(235_235_245_/_60%)]">
          <span>Leki</span>
          <b>Euthyrox 50</b>
        </div>
        <div className="flex justify-between p-[10px_0] [border-top:0.5px_solid_rgb(255_255_255_/_15%)] text-[15px] [&_span]:[color:rgb(235_235_245_/_60%)]">
          <span>Kontakt</span>
          <b>Tomasz · 600 123 456</b>
        </div>
        <div className="text-[12px] [color:rgb(235_235_245_/_50%)] mt-2.5">
          Dane bez PESEL i adresu. Udostępnione przez właścicielkę telefonu.
        </div>
      </div>
      <div className="flex-1"></div>
      <div className="flex justify-between gap-2.5 relative">
        <button
          className="lk-btn inline-flex gap-1.5 items-center [background:rgb(255_255_255_/_18%)] [-webkit-backdrop-filter:blur(14px)] [color:#fff] rounded-[999px] p-[10px_14px] text-[13px] font-medium motion-safe:[&:active]:transform-[scale(0.97)]"
          onClick={c.back}
        >
          {I('left', 15)} Wróć do karty
        </button>
        <button className="lk-btn inline-flex gap-1.5 items-center [-webkit-backdrop-filter:blur(14px)] [color:#fff] rounded-[999px] p-[10px_14px] text-[13px] font-medium motion-safe:[&:active]:transform-[scale(0.97)] bg-[#ff3b30]">
          {I('phone', 15)} 112
        </button>
      </div>
    </div>
  );
}
