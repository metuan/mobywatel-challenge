import type { CSSProperties } from 'react';
import { List, ListItemDescription, ListItemTitle } from '@/components/ui/list';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Note } from '@/components/ui/note';
import { Caption, Eyebrow, Title } from '@/components/ui/typography';
import { I } from '@/ui/icons';
import { Hero } from '@/ui/illustrations';
import { GRow, Label, Ring, Row } from '@/ui/primitives';
import type { Ctx } from '@/types';

export function Benefits(c: Ctx) {
  return (
    <div>
      <Hero n="coin" />
      <Title>Świadczenia, które mogą Ci przysługiwać</Title>
      <Note icon="lock" tone="amber">
        Sprawdzamy to tylko za Twoją zgodą, na podstawie danych o rodzinie. Nic nie składamy bez Ciebie.
      </Note>
      <List className="mt-3">
        <Row
          icon="coin"
          t="800+ na drugie dziecko"
          s="Po urodzeniu Julii"
          right={<Badge>Pasuje</Badge>}
          onClick={() => c.go('baby-1')}
        />
        <Row
          icon="card"
          t="Karta Dużej Rodziny"
          s="Od trojga dzieci"
          right={<Badge>Nie teraz</Badge>}
          onClick={() => {}}
        />
        <Row
          icon="coin"
          t="Ulga na dzieci w PIT"
          s="Przy rozliczeniu za 2026"
          right={<Badge>Pasuje</Badge>}
          onClick={() => {}}
        />
      </List>
    </div>
  );
}

/* Hop 8: 800+ with a payment history and countdown */
export function P800(c: Ctx) {
  const M = ['cze', 'lip', 'sie', 'wrz', 'paź', 'lis', 'gru', 'sty', 'lut', 'mar', 'kwi', 'maj'];
  return (
    <div className="p8">
      <Eyebrow>Świadczenie dla Zosi</Eyebrow>
      <Title>800+</Title>
      <div className="p8-hero flex gap-4.5 items-center bg-surface rounded-[22px] p-4.5 [box-shadow:0_0_0_0.5px_var(--hair)]">
        <Ring v={26} max={30} size={76} w={4}>
          <b>2</b>
          <small>dni</small>
        </Ring>
        <div>
          <ListItemDescription as="div">Następna wypłata</ListItemDescription>
          <div className="text-[34px] font-[650] tracking-[-0.03em] leading-[1.1] m-[2px_0]">800 zł</div>
          <ListItemDescription as="div">28 listopada · konto •• 4821</ListItemDescription>
        </div>
      </div>
      <Label t="Wypłaty od czerwca 2026 do maja 2027" />
      <Card className="p-[18px_16px_14px]">
        <div className="bars grid [grid-template-columns:repeat(12,_1fr)] gap-1.25 [align-items:end] h-30 [&_span]:flex [&_span]:flex-col [&_span]:items-center [&_span]:gap-1.5 [&_span]:h-full [&_span]:justify-end [&_i]:w-full [&_i]:h-[70%] [&_i]:rounded-[6px] [&_i]:bg-fill-2 [&_i]:origin-bottom [&_i]:animate-[barup_0.5s_var(--out)_calc(var(--i)*30ms)_both] [&_small]:text-[10px] [&_small]:text-ink-3 motion-reduce:[&_i]:animate-none!">
          {M.map((m, i) => (
            <span
              className={
                i < 5
                  ? '[.bars_&_i]:bg-ink'
                  : i === 5
                    ? '[.bars_&_i]:[background:repeating-linear-gradient(135deg,_var(--ink)_0_3px,_transparent_3px_6px)] [.bars_&_i]:[box-shadow:inset_0_0_0_1.5px_var(--ink)]'
                    : ''
              }
            >
              <i style={{ '--i': i } as CSSProperties}></i>
              <small>{m}</small>
            </span>
          ))}
        </div>
        <div className="flex justify-between mt-3 text-[13px] text-ink-2 [&_b]:text-ink">
          <span>
            <b>4 000 zł</b> wypłacone
          </span>
          <span>5 z 12</span>
        </div>
      </Card>
      {c.s.babyDone ? (
        <>
          <Label t="Julia" />
          <List>
            <GRow ic="baby" t="Wniosek w ZUS" s="Decyzja do 24 grudnia" v="W toku" />
          </List>
        </>
      ) : (
        <List className="mt-3">
          <GRow
            ic="baby"
            t="Urodziło się dziecko?"
            s="Wniosek o 800+ złożysz w pakiecie „Nowe dziecko”"
            onClick={() => c.go('baby-1')}
          />
        </List>
      )}
      <Caption className="mt-3">Nie musisz logować się do ZUS ani do banku.</Caption>
    </div>
  );
}

/* Hop 9: vaccinations as a timeline */
export function Vacc(c: Ctx) {
  const V = [
    ['6 lat', 'MMR, dawka 2', 'Zalecane do 31 grudnia', 'due'],
    ['6 lat', 'DTaP, dawka 5', 'Wykonane 12 września 2026', 'ok'],
    ['6 lat', 'Polio, dawka 4', 'Wykonane 12 września 2026', 'ok'],
    ['14 lat', 'HPV', 'Za 8 lat, przypomnimy', 'later'],
    ['19 lat', 'Td, przypominająca', 'Za 13 lat', 'later'],
  ];
  return (
    <div>
      <Eyebrow>Zosia, 6 lat</Eyebrow>
      <Title>Szczepienia</Title>
      <div className="relative m-[14px_0_16px] pl-1.5">
        {V.map(([age, t, s, st]) => (
          <div
            className={
              'vt-i relative flex gap-3.5 p-[0_0_22px] [&:not(:last-child)::before]:[content:""] [&:not(:last-child)::before]:absolute [&:not(:last-child)::before]:left-2.5 [&:not(:last-child)::before]:top-6 [&:not(:last-child)::before]:bottom-0.5 [&:not(:last-child)::before]:w-[1.5px] [&:not(:last-child)::before]:bg-hair-2 [&.later]:opacity-[0.55] ' +
              st
            }
          >
            <span className="flex-none w-5.5 h-5.5 rounded-[50%] grid place-items-center bg-bg [box-shadow:inset_0_0_0_1.5px_var(--ink-3)] text-white mt-px [.vt-i.ok_&]:bg-ink [.vt-i.ok_&]:[box-shadow:none] [.vt-i.due_&&]:[box-shadow:inset_0_0_0_2px_var(--red),_0_0_0_4px_var(--red-soft)]">
              {st === 'ok' ? I('check', 12) : ''}
            </span>
            <div className="flex-1">
              <ListItemTitle as="div">{t}</ListItemTitle>
              <ListItemDescription as="div">{s}</ListItemDescription>
              {st === 'due' && (
                <button
                  className="pill whitespace-nowrap h-13 rounded-[999px] bg-ink text-white text-[16px] font-semibold p-[0_22px] inline-flex items-center justify-center gap-2 [border:0] [box-shadow:none] [.attn-act_&]:text-[14px] [.attn-act_&]:p-[0_16px] [.attn-act_&]:h-9.5 [.st-nav_&]:h-11 [.st-nav_&]:text-[15px] [.st-nav_&]:p-[0_18px] [.st-nav_&:disabled]:opacity-[0.35] [.tour-btns_&]:h-11.5 [.tour-btns_&]:text-[15px] [@media(max-width:640px)]:[.tour-btns_&]:h-11 [@media(max-width:640px)]:[.tour-btns_&]:p-[0_16px] motion-safe:[transition:transform_0.16s_var(--ease-out),_background-color_0.15s_ease,_box-shadow_0.2s_ease] motion-safe:[&:active]:transform-[scale(0.97)] motion-safe:[&:active]:[transition-duration:0.1s] [.st-nav_&.ready]:[outline:2px_solid_var(--signal-blue)] [.st-nav_&.ready]:outline-offset-[3px] [.st-nav_&.ready]:[box-shadow:0_0_0_6px_rgb(47_107_255_/_18%)] motion-safe:[.st-nav_&.ready]:animate-[coach_1.6s_var(--out)_infinite]! [.w2-acts_&]:flex-1 [.w2-acts_&]:justify-center motion-safe:[.st-nav_&.ready]:[animation-iteration-count:3]! mt-2.5"
                  onClick={() => c.go('visit-1')}
                >
                  Umów szczepienie
                </button>
              )}
            </div>
            <span className="text-[12px] text-ink-3 whitespace-nowrap mt-0.75">{age}</span>
          </div>
        ))}
      </div>
      <Caption>Z Internetowego Konta Pacjenta. Oboje rodzice widzą to samo.</Caption>
    </div>
  );
}
