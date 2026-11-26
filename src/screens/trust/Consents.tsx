import { List, ListItemDescription, ListItemTitle } from '@/components/ui/list';
import { Title } from '@/components/ui/typography';
import { Fragment, useState } from 'react';
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
  return (
    <div className="cons">
      <Title>Moje zgody</Title>
      <div className="flex gap-4 items-center bg-surface rounded-[20px] p-4.5 mt-1.5 [box-shadow:0_0_0_0.5px_var(--hair)] [&_>_div]:flex [&_>_div]:flex-col [&_>_div]:items-center [&_>_div]:min-w-16 [&_b]:text-[34px] [&_b]:leading-none [&_b]:font-[650] [&_b]:tracking-[-0.03em] [&_b]:[font-variant-numeric:tabular-nums] [&_span]:text-[12px] [&_span]:text-ink-2 [&_span]:text-center [&_span]:leading-[1.2] [&_span]:mt-1 [&_p]:m-0 [&_p]:text-[13.5px] [&_p]:leading-[1.4] [&_p]:text-ink-2">
        <div>
          <b>
            <Num v={active} />
          </b>
          <span>{active === 1 ? 'aktywna zgoda' : active < 5 ? 'aktywne zgody' : 'aktywnych zgód'}</span>
        </div>
        <p>Każdą zgodę cofniesz jednym ruchem. Działa od razu, a przez chwilę możesz to odwołać.</p>
      </div>
      {groups.map(g => (
        <Fragment key={g}>
          <Label t={g} />
          <List>
            {list
              .filter(x => x.group === g)
              .map(x => (
                <div
                  className="cons-row flex items-center gap-3 p-[14px_16px] [border-top:0.5px_solid_var(--hair)] [&:first-child]:[border-top:0] will-change-auto"
                  key={x.k}
                >
                  {x.av ? (
                    <Av i={x.av} size={36} />
                  ) : (
                    <span className="w-10 h-10 rounded-[50%] grid place-items-center flex-none text-ink bg-bg [&.ai]:[background:linear-gradient(135deg,_var(--signal-blue),_var(--signal-violet))] [&.ai]:text-white [.how8-row_&]:w-7.5 [.how8-row_&]:h-7.5 [.how8-row_&]:rounded-[10px]">
                      {x.ic && I(x.ic, 18)}
                    </span>
                  )}
                  <span className="flex-1 min-w-0 flex flex-col gap-0.5">
                    <ListItemTitle>
                      {x.who}
                      {x.ai && (
                        <>
                          {' '}
                          <span className="rounded-[999px] [background:none]! p-0 text-[12px] inline-flex items-center gap-1.25 [&::before]:[content:''] [&::before]:w-1.5 [&::before]:h-1.5 [&::before]:rounded-[50%] [&::before]:bg-ink-3! text-ink-2! font-medium [.sys_&]:inline-flex [.sys_&]:items-center [.sys_&]:rounded-[999px] [.sys_&]:gap-1 [.sys_&]:ml-2 [.sys_&]:text-[11px] [.sys_&]:tracking-[0.06em] [.sys_&]:align-[1px] [.sys_&]:[box-shadow:0_4px_10px_-4px_rgb(76_90_255_/_60%)] [.sys_&]:[background:linear-gradient(135deg,_var(--signal-blue),_var(--signal-violet))]! [.sys_&]:text-white! [.sys_&]:p-[3px_9px_3px_7px]! [.sys_&]:font-bold! [.sys_&::before]:[content:''] [.sys_&::before]:inline-block! [.sys_&::before]:w-2.5 [.sys_&::before]:h-2.5 [.sys_&::before]:[-webkit-mask:url(data:image/svg+xml,%3Csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20viewBox=%270%200%2024%2024%27%3E%3Cpath%20d=%27M12%202l2.2%206.3L20.5%2010l-6.3%202.2L12%2018.5l-2.2-6.3L3.5%2010l6.3-1.7z%27/%3E%3C/svg%3E)_center/contain_no-repeat] [.sys_&::before]:[mask:url(data:image/svg+xml,%3Csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20viewBox=%270%200%2024%2024%27%3E%3Cpath%20d=%27M12%202l2.2%206.3L20.5%2010l-6.3%202.2L12%2018.5l-2.2-6.3L3.5%2010l6.3-1.7z%27/%3E%3C/svg%3E)_center/contain_no-repeat] [.sys_&::before]:bg-white! [.sys_&::before]:[box-shadow:none]! [.sys_&::before]:rounded-none! [&.sm]:text-[9.5px]! [&&.sm]:p-[1px_6px]! [&.sm]:align-[1px] [&.sm]:[background:linear-gradient(135deg,_var(--signal-blue),_var(--signal-violet))]! [&.sm]:text-white! [&.sm]:rounded-[999px] [&&.sm::before]:hidden! sm">
                            AI
                          </span>
                        </>
                      )}
                    </ListItemTitle>
                    <ListItemDescription>{x.what}</ListItemDescription>
                    <span
                      className={`flex items-center gap-2 text-[12px] text-ink-3 mt-1 [&.off]:text-red ${x.left === 0 ? 'off' : ''}`}
                    >
                      {x.left === 0 ? 'Wygasła' : x.until}
                      {x.left ? (
                        <i className="flex-1 max-w-22.5 h-0.75 rounded-[3px] bg-fill-2 overflow-hidden [&_i]:block [&_i]:h-full [&_i]:bg-ink">
                          <i style={{ width: `${Math.min(100, (x.left ?? 0) / 3.65)}%` }}></i>
                        </i>
                      ) : (
                        ''
                      )}
                    </span>
                  </span>
                  <button
                    className="mini inline-flex gap-1.5 items-center whitespace-nowrap motion-safe:[&:active]:transform-[scale(0.97)] font-semibold text-[15px] p-[6px_14px] bg-fill text-ink rounded-[999px]"
                    onClick={e => {
                      const row = (e.currentTarget as HTMLElement).closest<HTMLElement>('.cons-row');
                      collapseOut(row, () => revoke(x));
                    }}
                  >
                    {x.left === 0 ? 'Usuń' : 'Cofnij'}
                  </button>
                </div>
              ))}
          </List>
        </Fragment>
      ))}
      {!list.length && (
        <div className="flex flex-col items-center text-center gap-1.5 p-[40px_20px] text-ink-2 [&_b]:text-ink [&_b]:font-semibold">
          {I('check', 22)}
          <b>Nikt nie ma dostępu do Twoich danych.</b>
          <span>Zgody pojawią się tu, gdy ich udzielisz.</span>
        </div>
      )}
    </div>
  );
}
