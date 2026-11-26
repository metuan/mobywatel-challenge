import {
  List,
  ListItem,
  ListItemChevron,
  ListItemContent,
  ListItemDescription,
  ListItemTitle,
} from '@/components/ui/list';
import { Display } from '@/components/ui/typography';
import { I } from '@/ui/icons';
import { Av, AvStack, GRow, Label, LeadIcon } from '@/ui/primitives';
import type { Ctx } from '@/types';

export function Family(c: Ctx) {
  const fam = [
    ['A', 'Anna', 'Ty', 'Dowód do 2031', '', 'profile', 'ok'],
    ['Z', 'Zosia', 'Córka, 6 lat', 'Paszport · 41 dni', 'red', 'member-zosia', ''],
    ...(c.s.babyDone ? [['J', 'Julia', 'Córka, 9 dni', '800+ w drodze', '', 'baby-done', '']] : []),
    ['T', 'Tomasz', 'Partner', 'Wspólne sprawy', '', 'member-tomasz', ''],
    ['S', 'Stanisław', 'Tata', 'Dostęp do 2027', '', 'member-tata', 'key'],
  ];
  return (
    <div>
      <Display>Bliscy</Display>
      <div className="fhead flex items-center gap-3 mr-1 mb-4 ml-1 text-[14px] text-ink-2 -mt-1.5">
        <AvStack size={32} />
        <span>{fam.length} osoby · 1 sprawa wymaga uwagi</span>
      </div>
      <List>
        {fam.map(([i, n, r, f, red, go, k]) => (
          <ListItem as="button" className="min-h-[72px]" onClick={() => c.go(go)}>
            <Av i={i} size={44} />
            <ListItemContent>
              <ListItemTitle className="text-[17px]/[22px] font-semibold tracking-[-0.015em]">
                {n}
                {k === 'key' && (
                  <span className="text-ink-3 inline-grid" title="Masz pełnomocnictwo">
                    {I('key', 14)}
                  </span>
                )}
              </ListItemTitle>
              <ListItemDescription>{r}</ListItemDescription>
            </ListItemContent>
            <span
              className={
                'text-[14px] text-ink-2 [font-variant-numeric:tabular-nums] whitespace-nowrap [&.red]:text-red!' +
                (red ? ' red' : '')
              }
            >
              {f}
            </span>
            <ListItemChevron size={16} />
          </ListItem>
        ))}
        <ListItem as="button" onClick={() => c.go('invite')}>
          <LeadIcon ic="plus" />
          <ListItemContent>
            <ListItemTitle>Dodaj osobę</ListItemTitle>
          </ListItemContent>
        </ListItem>
      </List>
      <Label t="Wspólne" />
      <List>
        <GRow ic="list" t="Kalendarz rodziny" v="7 terminów" onClick={() => c.go('calendar')} />
        <GRow ic="pin" t="Gdzie jest rodzina" s="Tylko podczas alarmu" onClick={() => c.go('family-map')} />
        <GRow ic="shield" t="Plan kryzysowy" v="2 miejsca" onClick={() => c.go('plan')} />
        <GRow ic="lock" t="Uprawnienia" s="Kto co widzi i do kiedy" onClick={() => c.go('consents')} />
      </List>
    </div>
  );
}

export function Fam({
  who,
  st,
  tone,
}: {
  who: 'anna' | 'zosia' | 'tomasz' | 'tata';
  st: string;
  tone: string;
}) {
  const p = {
    anna: ['AN', '#22408f', 'Ty'],
    zosia: ['ZN', '#b0533f', 'Zosia'],
    tomasz: ['TN', '#3d5a80', 'Tomasz'],
    tata: ['SN', '#1c7a4c', 'Tata'],
  }[who];
  return (
    <div className="lfam flex flex-col items-center gap-0.75 text-[11px]">
      <span
        className="av [.lfam_&]:w-9 [.lfam_&]:h-9 [.lfam_&]:rounded-[50%] [.lfam_&]:grid [.lfam_&]:place-items-center [.lfam_&]:text-[11.5px] [.lfam_&]:font-bold [.lfam_&]:relative rounded-[50%] text-ink grid place-items-center flex-none relative [letter-spacing:0] [.avstack_&]:[box-shadow:0_0_0_2px_var(--surface)] [.avstack_&]:-ml-2 [.avstack_&:first-child]:ml-0 [.avstack_&]:[background:#dcdee3] [.fhead_&]:[background:#dcdee3] [background:#e6e7eb] font-semibold [.tv-person_&]:bg-white [.tv-person_&]:[box-shadow:0_0_0_0.5px_var(--hair-2),_0_8px_20px_-10px_rgb(11_13_18_/_25%)] [.tv-person:first-child_&]:bg-ink [.tv-person:first-child_&]:text-white [.sg-twist_&]:flex-none [.call-av_&]:relative [.call-av_&]:z-1 [.call-av_&]:[background:#2a3140]! [.call-av_&]:text-white! [.call-av_&]:text-[40px]! [.sg-twist_>_span&]:flex-none [.sg-twist_>_span&]:grid [.sg-twist_>_span&]:flex-row [.sg-twist_>_span&]:gap-0 [.sg-twist_>_span&]:self-center"
        style={{ background: p[1] }}
      >
        {p[0]}
        <i
          className={
            '[.lfam_&]:absolute [.lfam_&]:-right-0.5 [.lfam_&]:-bottom-0.5 [.lfam_&]:w-3.25 [.lfam_&]:h-3.25 [.lfam_&]:rounded-[50%] [.lfam_&]:[border:2.5px_solid_#14161c] [.lfam_&]:[background:#8a8f99] [.lfam_&]:[transition:background_0.3s] [.lfam_&.ok]:[background:#3ccf7e] [.lfam_&.warn]:[background:#ffb020] ' +
            tone
          }
        ></i>
      </span>
      <span className="[.lfam_&]:font-semibold">{p[2]}</span>
      <span className="[.lfam_&]:opacity-[0.65]">{st}</span>
    </div>
  );
}
