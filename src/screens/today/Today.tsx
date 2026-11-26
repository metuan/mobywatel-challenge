import { List, ListItemDescription, ListItemTitle } from '@/components/ui/list';
import { Display } from '@/components/ui/typography';
import { DocCard } from '@/ui/documentCard';
import { Icon } from '@/ui/icons';
import { AvStack, GRow, Label, Num, Ring, Tile } from '@/ui/primitives';
import type { Ctx } from '@/types';
import type { IconName } from '@/ui/icons';

function TodayBase(c: Ctx) {
  const s = c.s;
  return (
    <div className="today8">
      <div className="hi">
        <div className="text-ink-2 m-[8px_4px_0] text-[13px] tracking-[-0.003em]">Wtorek, 24 listopada</div>
        <Display className="mx-1 mt-0.5 mb-5">Dzień dobry, Anno</Display>
      </div>
      {c.bar || ''}
      <DocCard c={c} />
      <div className="grid [grid-template-columns:repeat(4,_1fr)] mt-6 [&_button]:flex [&_button]:flex-col [&_button]:items-center [&_button]:font-medium [&_button]:text-[12px] [&_button]:text-ink-2 [&_button]:gap-2.25">
        {(
          [
            ['qr', 'Pokaż', 'share-min'],
            ['camera', 'Skanuj', 'letter-1'],
            ['mic', 'Zapytaj', 'assistant'],
            ['coin', 'Zapłać', 'taxes'],
          ] as [IconName, string, string][]
        ).map(([ic, t, r]) => (
          <button key={t} onClick={() => c.go(r)}>
            <span className="rounded-[50%] grid place-items-center w-14 h-14 bg-white [box-shadow:0_0_0_0.5px_var(--hair)]">
              <Icon name={ic} size={22} />
            </span>
            <span>{t}</span>
          </button>
        ))}
      </div>
      <Label t="Wymaga uwagi" />
      <div className="flex gap-3.5 items-center bg-white rounded-[22px_22px_0_0] p-[18px_18px_6px]">
        <Ring v={12} max={30} color="var(--red)" size={48}>
          <b className="text-red!">12</b>
          <small>dni</small>
        </Ring>
        <div className="attn-tx">
          <ListItemTitle as="div" className="text-[17px]/[22px] font-semibold tracking-[-0.015em]">
            OC Toyoty kończy się za 12 dni
          </ListItemTitle>
          <ListItemDescription as="div">KR 4F21 · polisa do 6 grudnia</ListItemDescription>
        </div>
      </div>
      <div className="attn-act flex gap-2 bg-white rounded-[0_0_22px_22px] p-[12px_18px_18px]">
        <button
          className="pill whitespace-nowrap h-13 rounded-[999px] bg-ink text-white text-[16px] font-semibold p-[0_22px] inline-flex items-center justify-center gap-2 [border:0] [box-shadow:none] [.attn-act_&]:text-[14px] [.attn-act_&]:p-[0_16px] [.attn-act_&]:h-9.5 [.st-nav_&]:h-11 [.st-nav_&]:text-[15px] [.st-nav_&]:p-[0_18px] [.st-nav_&:disabled]:opacity-[0.35] [.tour-btns_&]:h-11.5 [.tour-btns_&]:text-[15px] [@media(max-width:640px)]:[.tour-btns_&]:h-11 [@media(max-width:640px)]:[.tour-btns_&]:p-[0_16px] motion-safe:[transition:transform_0.16s_var(--ease-out),_background-color_0.15s_ease,_box-shadow_0.2s_ease] motion-safe:[&:active]:transform-[scale(0.97)] motion-safe:[&:active]:[transition-duration:0.1s] [.st-nav_&.ready]:[outline:2px_solid_var(--signal-blue)] [.st-nav_&.ready]:outline-offset-[3px] [.st-nav_&.ready]:[box-shadow:0_0_0_6px_rgb(47_107_255_/_18%)] motion-safe:[.st-nav_&.ready]:animate-[coach_1.6s_var(--out)_infinite]! [.w2-acts_&]:flex-1 [.w2-acts_&]:justify-center motion-safe:[.st-nav_&.ready]:[animation-iteration-count:3]!"
          onClick={() => c.go('car')}
        >
          Przedłuż OC
        </button>
        <button
          className="pill whitespace-nowrap h-13 rounded-[999px] bg-ink text-white text-[16px] font-semibold p-[0_22px] inline-flex items-center justify-center gap-2 [border:0] [box-shadow:none] [.attn-act_&]:text-[14px] [.attn-act_&]:p-[0_16px] [.attn-act_&]:h-9.5 [.st-nav_&]:h-11 [.st-nav_&]:text-[15px] [.st-nav_&]:p-[0_18px] [.st-nav_&:disabled]:opacity-[0.35] [.tour-btns_&]:h-11.5 [.tour-btns_&]:text-[15px] [@media(max-width:640px)]:[.tour-btns_&]:h-11 [@media(max-width:640px)]:[.tour-btns_&]:p-[0_16px] motion-safe:[transition:transform_0.16s_var(--ease-out),_background-color_0.15s_ease,_box-shadow_0.2s_ease] motion-safe:[&:active]:transform-[scale(0.97)] motion-safe:[&:active]:[transition-duration:0.1s] [.st-nav_&.ready]:[outline:2px_solid_var(--signal-blue)] [.st-nav_&.ready]:outline-offset-[3px] [.st-nav_&.ready]:[box-shadow:0_0_0_6px_rgb(47_107_255_/_18%)] motion-safe:[.st-nav_&.ready]:animate-[coach_1.6s_var(--out)_infinite]! [.w2-acts_&]:flex-1 [.w2-acts_&]:justify-center motion-safe:[.st-nav_&.ready]:[animation-iteration-count:3]! [&.pill]:bg-fill [&.pill]:text-ink [.st-nav_&.pill]:w-11 [.st-nav_&.pill]:p-0"
          onClick={() => c.go('car')}
        >
          Szczegóły
        </button>
      </div>
      <div className="grid grid-cols-[1fr_1fr] mt-3 gap-2.5">
        <button
          className="motion-safe:[&:active]:duration-[0.12s] relative bg-white rounded-[22px] flex flex-col text-left text-ink p-[16px_16px_15px] min-h-34.5 [transition:background-color_0.12s,_transform_0.16s_var(--out)] [&:active]:transform-[scale(0.97)]"
          onClick={() => c.go('p800')}
        >
          <span className="text-[12px] font-medium pr-6.5 leading-4 text-ink-2">800+ na Zosię</span>
          <span className="absolute top-3.5 right-3.5 grid text-ink-3">
            <Icon name="coin" size={20} />
          </span>
          <span className="font-semibold [font-variant-numeric:tabular-nums] mt-auto text-[30px] leading-8 tracking-[-0.035em] [&_small]:text-[14px] [&_small]:font-medium [&_small]:text-ink-2 [&_small]:tracking-[-0.01em]">
            800 zł
          </span>
          <span className="text-[13px] text-ink-2 mt-0.75 leading-4.25">Wypłata 28 listopada</span>
        </button>
        <button
          className="motion-safe:[&:active]:duration-[0.12s] relative bg-white rounded-[22px] flex flex-col text-left text-ink p-[16px_16px_15px] min-h-34.5 [transition:background-color_0.12s,_transform_0.16s_var(--out)] [&:active]:transform-[scale(0.97)]"
          onClick={() => c.go(s.moved ? 'move-done' : 'case-meld')}
        >
          <span className="text-[12px] font-medium pr-6.5 leading-4 text-ink-2">
            {s.moved ? 'Przeprowadzka' : 'Rejestracja auta'}
          </span>
          <span className="absolute top-3.5 right-3.5 grid text-ink-3">
            <Icon name="folder" size={20} />
          </span>
          <span className="font-semibold [font-variant-numeric:tabular-nums] mt-auto text-[30px] leading-8 tracking-[-0.035em] [&_small]:text-[14px] [&_small]:font-medium [&_small]:text-ink-2 [&_small]:tracking-[-0.01em]">
            {s.moved ? 2 : 3}
            <small> z 4</small>
          </span>
          <span className="h-0.75 rounded-xs bg-fill-2 mt-2 overflow-hidden [&_i]:block [&_i]:h-full [&_i]:bg-ink [&_i]:rounded-xs">
            <i style={{ width: `${(s.moved ? 2 : 3) * 25}%` }}></i>
          </span>
          <span className="text-[13px] text-ink-2 mt-0.75 leading-4.25">
            {s.moved ? 'Urząd potwierdzi do 27.11' : 'Odbiór od 2 grudnia'}
          </span>
        </button>
        <button
          className="motion-safe:[&:active]:duration-[0.12s] relative bg-white rounded-[22px] flex flex-col text-left text-ink p-[16px_16px_15px] min-h-34.5 [transition:background-color_0.12s,_transform_0.16s_var(--out)] [&:active]:transform-[scale(0.97)]"
          onClick={() => c.go('family')}
        >
          <span className="text-[12px] font-medium pr-6.5 leading-4 text-ink-2">Bliscy</span>
          <span className="absolute top-3.5 right-3.5 grid text-ink-3">
            <Icon name="people" size={20} />
          </span>
          <span className="mt-auto">
            <AvStack size={28} />
          </span>
          <span className="text-[13px] text-ink-2 mt-0.75 leading-4.25">Tata: nowa e-recepta</span>
        </button>
        <button
          className="motion-safe:[&:active]:duration-[0.12s] relative bg-white rounded-[22px] flex flex-col text-left text-ink p-[16px_16px_15px] min-h-34.5 [transition:background-color_0.12s,_transform_0.16s_var(--out)] [&:active]:transform-[scale(0.97)]"
          onClick={() => c.go(s.visit ? 'visit-4' : 'visit-1')}
        >
          <span className="text-[12px] font-medium pr-6.5 leading-4 text-ink-2">Zosia, kardiolog</span>
          <span className="absolute top-3.5 right-3.5 grid text-ink-3">
            <Icon name="steth" size={20} />
          </span>
          <span className="font-semibold [font-variant-numeric:tabular-nums] mt-auto leading-8 tracking-[-0.035em] [&_small]:font-medium [&_small]:text-ink-2 [&_small]:tracking-[-0.01em] text-[22px]">
            {s.visit ? '15 gru' : 'Skierowanie'}
          </span>
          <span className="text-[13px] text-ink-2 mt-0.75 leading-4.25">
            {s.visit ? '10:30 · Prokocim' : 'Wybierz termin'}
          </span>
        </button>
      </div>
      <Label t="Terminy" more="Wszystkie" go={() => c.go('calendar')} />
      <List>
        <GRow ic="car" t="OC Toyoty" s="6 gru" v="12 dni" red onClick={() => c.go('car')} />
        <GRow ic="steth" t="Szczepienie Zosi (MMR)" s="31 gru" v="37 dni" onClick={() => c.go('vacc')} />
        <GRow ic="card" t="Paszport Zosi wygasa" s="4 sty" v="41 dni" onClick={() => c.go('renew-pass')} />
        <GRow ic="doc" t="Dowód taty wygasa" s="26 sty" v="63 dni" onClick={() => c.go('member-tata')} />
      </List>
      <Label t="Ważne momenty" more="Wszystkie" go={() => c.go('matters')} />
      <div className="motion-safe:[.screen_&_>_*]:animate-[fade-up_0.42s_var(--ease-out)_both] motion-safe:[.screen_&_>_*:nth-child(2)]:[animation-delay:0.04s] motion-safe:[.screen_&_>_*:nth-child(3)]:[animation-delay:0.08s] motion-safe:[.screen_&_>_*:nth-child(n_+_4)]:[animation-delay:0.12s] flex gap-3 overflow-x-auto m-[0_-20px] p-[0_20px_4px] [scroll-snap-type:x_mandatory] scrollbar-none [&::-webkit-scrollbar]:hidden">
        <Tile t="Przeprowadzka" s="4 urzędy, 1 wniosek" n="move" onClick={() => c.go('move-1')} />
        <Tile t="Nowe dziecko" s="PESEL, 800+, NFZ" n="baby" onClick={() => c.go('baby-1')} />
        <Tile t="Mój samochód" s="OC, przegląd, mandaty" n="car" onClick={() => c.go('car')} />
        <Tile t="Podatki" s="Zwrot 1 284 zł" n="coin" onClick={() => c.go('taxes')} />
      </div>
      <p className="text-[12px] text-ink-3 text-center mt-7">Niezależna koncepcja. Dane są fikcyjne.</p>
    </div>
  );
}

export function Today(c: Ctx) {
  const n = c.s.mail ? c.s.mail.filter(x => x.unread).length : 2;
  /* search + inbox sit in their own row under the greeting, so nothing crowds the title (Karl, 26 Nov) */
  const bar = (
    <div className="flex gap-2.5 items-center m-[14px_0_16px]">
      <button
        className="flex-1 min-w-0 flex items-center gap-2 h-11 p-[0_14px] rounded-[14px] bg-surface [box-shadow:inset_0_0_0_0.5px_var(--hair)] [color:var(--label2,_#8a8f99)] text-[15px] text-left [transition:transform_0.16s_var(--out)] [&_span]:overflow-hidden [&_span]:whitespace-nowrap [&_span]:text-ellipsis [&:active]:transform-[scale(0.97)]"
        onClick={() => c.go('search')}
      >
        <Icon name="search" size={18} />
        <span>Szukaj albo zapytaj</span>
      </button>
      <button
        className="relative flex-none w-11 h-11 rounded-[14px] bg-surface grid place-items-center [box-shadow:inset_0_0_0_0.5px_var(--hair)] [transition:transform_0.16s_var(--out)] [&:active]:transform-[scale(0.97)] [&_b]:absolute [&_b]:-top-1 [&_b]:-right-1 [&_b]:min-w-4.5 [&_b]:h-4.5 [&_b]:p-[0_5px] [&_b]:rounded-[9px] [&_b]:bg-red [&_b]:text-white [&_b]:text-[11px] [&_b]:font-bold [&_b]:grid [&_b]:place-items-center [&_b]:[box-shadow:0_0_0_2px_var(--bg)]"
        aria-label={'Skrzynka, nowe: ' + n}
        onClick={() => c.go('inbox')}
      >
        <Icon name="inbox" size={20} />
        {n > 0 && (
          <b>
            <Num v={n} />
          </b>
        )}
      </button>
    </div>
  );
  return (
    <div className="relative animate-[wordin_0.22s_ease-out_both] motion-reduce:animate-none! motion-reduce:filter-none">
      {TodayBase({ ...c, bar })}
    </div>
  );
}
