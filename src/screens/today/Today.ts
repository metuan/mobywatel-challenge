import { html } from '@/lib/preact';
import { DocCard } from '@/ui/documentCard';
import { I } from '@/ui/icons';
import { AvStack, GRow, Label, Num, Ring, Tile } from '@/ui/primitives';
import type { Ctx } from '@/types';
import type { IconName } from '@/ui/icons';

function TodayBase(c: Ctx) {
  const s = c.s;
  return html`<div class="today8">
    <div class="hi"><div class="hi-d">Wtorek, 24 listopada</div><h1 class="h-xl">Dzień dobry, Anno</h1></div>${c.bar || ''}
    <${DocCard} c=${c}/>
    <div class="qa8">
      ${(
        [
          ['qr', 'Pokaż', 'share-min'],
          ['camera', 'Skanuj', 'letter-1'],
          ['mic', 'Zapytaj', 'assistant'],
          ['coin', 'Zapłać', 'taxes'],
        ] as [IconName, string, string][]
      ).map(
        ([ic, t, r]) =>
          html`<button onClick=${() => c.go(r)}><span class="qa8-i">${I(ic, 22)}</span><span>${t}</span></button>`,
      )}
    </div>
    <${Label} t="Wymaga uwagi"/>
    <div class="attn">
      <${Ring} v=${12} max=${30} color="var(--red)" size=${48}><b class="red-t">12</b><small>dni</small></${Ring}>
      <div class="attn-tx"><div class="gt">OC Toyoty kończy się za 12 dni</div><div class="gs">KR 4F21 · polisa do 6 grudnia</div></div>
    </div>
    <div class="attn-act"><button class="pill" onClick=${() => c.go('car')}>Przedłuż OC</button><button class="pill soft" onClick=${() => c.go('car')}>Szczegóły</button></div>
    <div class="w8">
      <button class="w" onClick=${() => c.go('p800')}><span class="wk">800+ na Zosię</span><span class="wico">${I('coin', 20)}</span><span class="wv">800 zł</span><span class="ws">Wypłata 28 listopada</span></button>
      <button class="w" onClick=${() => c.go(s.moved ? 'move-done' : 'case-meld')}><span class="wk">${s.moved ? 'Przeprowadzka' : 'Rejestracja auta'}</span><span class="wico">${I('folder', 20)}</span>
        <span class="wv">${s.moved ? 2 : 3}<small> z 4</small></span><span class="wbar"><i style=${`width:${(s.moved ? 2 : 3) * 25}%`}></i></span><span class="ws">${s.moved ? 'Urząd potwierdzi do 27.11' : 'Odbiór od 2 grudnia'}</span></button>
      <button class="w" onClick=${() => c.go('family')}><span class="wk">Bliscy</span><span class="wico">${I('people', 20)}</span><span class="wav"><${AvStack} size=${28}/></span><span class="ws">Tata: nowa e-recepta</span></button>
      <button class="w" onClick=${() => c.go(s.visit ? 'visit-4' : 'visit-1')}><span class="wk">Zosia, kardiolog</span><span class="wico">${I('steth', 20)}</span><span class="wv" style="font-size:22px">${s.visit ? '15 gru' : 'Skierowanie'}</span><span class="ws">${s.visit ? '10:30 · Prokocim' : 'Wybierz termin'}</span></button>
    </div>
    <${Label} t="Terminy" more="Wszystkie" go=${() => c.go('calendar')}/>
    <div class="glist">
      <${GRow} ic="car" t="OC Toyoty" s="6 gru" v="12 dni" red onClick=${() => c.go('car')}/>
      <${GRow} ic="steth" t="Szczepienie Zosi (MMR)" s="31 gru" v="37 dni" onClick=${() => c.go('vacc')}/>
      <${GRow} ic="card" t="Paszport Zosi wygasa" s="4 sty" v="41 dni" onClick=${() => c.go('renew-pass')}/>
      <${GRow} ic="doc" t="Dowód taty wygasa" s="26 sty" v="63 dni" onClick=${() => c.go('member-tata')}/>
    </div>
    <${Label} t="Ważne momenty" more="Wszystkie" go=${() => c.go('matters')}/>
    <div class="mrow">
      <${Tile} t="Przeprowadzka" s="4 urzędy, 1 wniosek" n="move" onClick=${() => c.go('move-1')}/>
      <${Tile} t="Nowe dziecko" s="PESEL, 800+, NFZ" n="baby" onClick=${() => c.go('baby-1')}/>
      <${Tile} t="Mój samochód" s="OC, przegląd, mandaty" n="car" onClick=${() => c.go('car')}/>
      <${Tile} t="Podatki" s="Zwrot 1 284 zł" n="coin" onClick=${() => c.go('taxes')}/>
    </div>
    <p class="foot">Niezależna koncepcja. Dane są fikcyjne.</p>
  </div>`;
}

export function Today(c: Ctx) {
  const n = c.s.mail ? c.s.mail.filter(x => x.unread).length : 2;
  /* search + inbox sit in their own row under the greeting, so nothing crowds the title (Karl, 26 Nov) */
  const bar = html`<div class="hdr9"><button class="hdr9-s" onClick=${() => c.go('search')}>${I('search', 18)}<span>Szukaj albo zapytaj</span></button>
    <button class="hdr9-i" aria-label=${'Skrzynka, nowe: ' + n} onClick=${() => c.go('inbox')}>${I('inbox', 20)}${n > 0 && html`<b><${Num} v=${n}/></b>`}</button></div>`;
  return html`<div class="tw8">${TodayBase({ ...c, bar })}</div>`;
}
