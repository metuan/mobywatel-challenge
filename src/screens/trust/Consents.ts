import { html, useState } from '@/lib/preact';
import { collapseOut } from '@/ui/controls';
import { I } from '@/ui/icons';
import { Av, Label, Num } from '@/ui/primitives';
import type { ConsentItem, Ctx } from '@/types';

/* Hop 4: consents as a trust ledger with undo */
export const CONS0: ConsentItem[] = [
  {
    k: 'tomasz',
    who: 'Tomasz Nowicki',
    av: 'T',
    what: 'Terminy rodziny, sprawy dzieci',
    until: 'Bez końca',
    left: null,
    group: 'Rodzina',
  },
  {
    k: 'tata',
    who: 'Ty pomagasz tacie',
    av: 'S',
    what: 'Terminy, pisma, przygotowanie wniosków',
    until: 'Do 24.11.2027',
    left: 365,
    group: 'Rodzina',
  },
  {
    k: 'mem',
    who: 'Pamięć asystenta',
    ic: 'sparkle',
    what: 'Pamięta Twoje sprawy przez 30 dni',
    until: 'Do 24.12.2026',
    left: 30,
    group: 'Aplikacja',
    ai: true,
  },
  {
    k: 'bank',
    who: 'Bank Pekao S.A.',
    ic: 'key',
    what: 'Sprawdził Twoją tożsamość jeden raz',
    until: 'Wygasła 18.11',
    left: 0,
    group: 'Firmy',
  },
];

export function Consents(c: Ctx) {
  const [list, setList] = useState(c.s.cons || CONS0);
  const save = (l: ConsentItem[]) => {
    setList(l);
    c.set({ cons: l });
  };
  const revoke = (x: ConsentItem) => {
    const prev = list;
    save(list.filter(y => y.k !== x.k));
    c.toast({ t: 'Cofnięto: ' + x.who, undo: () => save(prev) });
  };
  const groups = [...new Set(list.map(x => x.group))];
  const active = list.filter(x => x.left !== 0).length;
  return html`<div class="cons">
    <h1 class="h-l">Moje zgody</h1>
    <div class="cons-sum"><div><b><${Num} v=${active}/></b><span>${active === 1 ? 'aktywna zgoda' : active < 5 ? 'aktywne zgody' : 'aktywnych zgód'}</span></div>
      <p>Każdą zgodę cofniesz jednym ruchem. Działa od razu, a przez chwilę możesz to odwołać.</p></div>
    ${groups.map(
      g =>
        html`<${Label} t=${g}/><div class="glist">${list
          .filter(x => x.group === g)
          .map(
            x => html`<div class="cons-row" key=${x.k}>
      ${x.av ? html`<${Av} i=${x.av} size=${36}/>` : html`<span class="lead-i">${x.ic && I(x.ic, 18)}</span>`}
      <span class="cr-tx"><span class="gt">${x.who}${x.ai && html` <span class="tag-a sm">AI</span>`}</span><span class="gs">${x.what}</span>
        <span class="cr-until ${x.left === 0 ? 'off' : ''}">${x.left === 0 ? 'Wygasła' : x.until}${x.left ? html`<i class="cr-bar"><i style=${`width:${Math.min(100, x.left / 3.65)}%`}></i></i>` : ''}</span></span>
      <button class="mini" onClick=${(e: MouseEvent) => {
        const row = (e.currentTarget as HTMLElement).closest<HTMLElement>('.cons-row');
        collapseOut(row, () => revoke(x));
      }}>${x.left === 0 ? 'Usuń' : 'Cofnij'}</button></div>`,
          )}</div>`,
    )}
    ${!list.length && html`<div class="empty8">${I('check', 22)}<b>Nikt nie ma dostępu do Twoich danych.</b><span>Zgody pojawią się tu, gdy ich udzielisz.</span></div>`}
  </div>`;
}
