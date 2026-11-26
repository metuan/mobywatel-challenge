import { List, ListItemDescription, ListItemTitle } from '@/components/ui/list';
import { Display } from '@/components/ui/typography';
import { DocCard } from '@/ui/documentCard';
import { I } from '@/ui/icons';
import { AvStack, GRow, Label, Num, Ring, Tile } from '@/ui/primitives';
import type { Ctx } from '@/types';
import type { IconName } from '@/ui/icons';

function TodayBase(c: Ctx) {
  const s = c.s;
  return (
    <div className="today8">
      <div className="hi">
        <div className="hi-d">Wtorek, 24 listopada</div>
        <Display className="mx-1 mt-0.5 mb-5">Dzień dobry, Anno</Display>
      </div>
      {c.bar || ''}
      <DocCard c={c} />
      <div className="qa8">
        {(
          [
            ['qr', 'Pokaż', 'share-min'],
            ['camera', 'Skanuj', 'letter-1'],
            ['mic', 'Zapytaj', 'assistant'],
            ['coin', 'Zapłać', 'taxes'],
          ] as [IconName, string, string][]
        ).map(([ic, t, r]) => (
          <button onClick={() => c.go(r)}>
            <span className="qa8-i">{I(ic, 22)}</span>
            <span>{t}</span>
          </button>
        ))}
      </div>
      <Label t="Wymaga uwagi" />
      <div className="attn">
        <Ring v={12} max={30} color="var(--red)" size={48}>
          <b className="red-t">12</b>
          <small>dni</small>
        </Ring>
        <div className="attn-tx">
          <ListItemTitle as="div" className="text-[17px]/[22px] font-semibold tracking-[-0.015em]">
            OC Toyoty kończy się za 12 dni
          </ListItemTitle>
          <ListItemDescription as="div">KR 4F21 · polisa do 6 grudnia</ListItemDescription>
        </div>
      </div>
      <div className="attn-act">
        <button className="pill" onClick={() => c.go('car')}>
          Przedłuż OC
        </button>
        <button className="pill soft" onClick={() => c.go('car')}>
          Szczegóły
        </button>
      </div>
      <div className="w8">
        <button className="w" onClick={() => c.go('p800')}>
          <span className="wk">800+ na Zosię</span>
          <span className="wico">{I('coin', 20)}</span>
          <span className="wv">800 zł</span>
          <span className="ws">Wypłata 28 listopada</span>
        </button>
        <button className="w" onClick={() => c.go(s.moved ? 'move-done' : 'case-meld')}>
          <span className="wk">{s.moved ? 'Przeprowadzka' : 'Rejestracja auta'}</span>
          <span className="wico">{I('folder', 20)}</span>
          <span className="wv">
            {s.moved ? 2 : 3}
            <small> z 4</small>
          </span>
          <span className="wbar">
            <i style={{ width: `${(s.moved ? 2 : 3) * 25}%` }}></i>
          </span>
          <span className="ws">{s.moved ? 'Urząd potwierdzi do 27.11' : 'Odbiór od 2 grudnia'}</span>
        </button>
        <button className="w" onClick={() => c.go('family')}>
          <span className="wk">Bliscy</span>
          <span className="wico">{I('people', 20)}</span>
          <span className="wav">
            <AvStack size={28} />
          </span>
          <span className="ws">Tata: nowa e-recepta</span>
        </button>
        <button className="w" onClick={() => c.go(s.visit ? 'visit-4' : 'visit-1')}>
          <span className="wk">Zosia, kardiolog</span>
          <span className="wico">{I('steth', 20)}</span>
          <span className="wv text-[22px]">{s.visit ? '15 gru' : 'Skierowanie'}</span>
          <span className="ws">{s.visit ? '10:30 · Prokocim' : 'Wybierz termin'}</span>
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
      <div className="mrow">
        <Tile t="Przeprowadzka" s="4 urzędy, 1 wniosek" n="move" onClick={() => c.go('move-1')} />
        <Tile t="Nowe dziecko" s="PESEL, 800+, NFZ" n="baby" onClick={() => c.go('baby-1')} />
        <Tile t="Mój samochód" s="OC, przegląd, mandaty" n="car" onClick={() => c.go('car')} />
        <Tile t="Podatki" s="Zwrot 1 284 zł" n="coin" onClick={() => c.go('taxes')} />
      </div>
      <p className="foot">Niezależna koncepcja. Dane są fikcyjne.</p>
    </div>
  );
}

export function Today(c: Ctx) {
  const n = c.s.mail ? c.s.mail.filter(x => x.unread).length : 2;
  /* search + inbox sit in their own row under the greeting, so nothing crowds the title (Karl, 26 Nov) */
  const bar = (
    <div className="hdr9">
      <button className="hdr9-s" onClick={() => c.go('search')}>
        {I('search', 18)}
        <span>Szukaj albo zapytaj</span>
      </button>
      <button className="hdr9-i" aria-label={'Skrzynka, nowe: ' + n} onClick={() => c.go('inbox')}>
        {I('inbox', 20)}
        {n > 0 && (
          <b>
            <Num v={n} />
          </b>
        )}
      </button>
    </div>
  );
  return <div className="tw8">{TodayBase({ ...c, bar })}</div>;
}
