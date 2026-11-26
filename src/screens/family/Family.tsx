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
      <div className="fhead">
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
                  <span className="keyi" title="Masz pełnomocnictwo">
                    {I('key', 14)}
                  </span>
                )}
              </ListItemTitle>
              <ListItemDescription>{r}</ListItemDescription>
            </ListItemContent>
            <span className={'gv' + (red ? ' red' : '')}>{f}</span>
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
    <div className="lfam">
      <span className="av" style={{ background: p[1] }}>
        {p[0]}
        <i className={'st ' + tone}></i>
      </span>
      <span className="nm">{p[2]}</span>
      <span className="ss">{st}</span>
    </div>
  );
}
