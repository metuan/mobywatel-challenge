import { html, useState } from '@/lib/preact';
import { I } from '@/ui/icons';
import { Toggle } from '@/ui/primitives';

/* 1 + 3: Karta ratunkowa i identyfikator medyczny */
export function Ice(c) {
  const [lock, setLock] = useState(c.s.medLock !== false);
  return html`<div>
    <p class="stepk">Karta ratunkowa</p><h1 class="h-l">Na wypadek, gdy nie możesz mówić</h1>
    <div class="icecard">
      <div class="ice-h"><span class="ice-star">${I('plus', 18)}</span><div><div class="t">Anna Nowicka</div><div class="s">34 lata · 168 cm · 61 kg</div></div></div>
      <div class="ice-g">
        <div><div class="l">Grupa krwi</div><div class="v">A Rh+</div></div>
        <div><div class="l">Alergie</div><div class="v">Penicylina</div></div>
        <div><div class="l">Leki</div><div class="v">Euthyrox 50</div></div>
        <div><div class="l">Choroby</div><div class="v">Niedoczynność tarczycy</div></div>
      </div>
      <div class="ice-c"><div class="l">Kontakt w nagłych wypadkach</div>
        <div class="ice-p"><span>Tomasz Nowicki · partner</span><span class="mini">${I('phone', 14)} Zadzwoń</span></div>
        <div class="ice-p"><span>Stanisław Nowicki · tata</span><span class="mini">${I('phone', 14)} Zadzwoń</span></div></div>
    </div>
    <div class="list" style="margin-top:14px">
      <div class="row"><span class="it" style="background:#ff3b30!important">${I('lock', 18)}</span><span class="tx"><div class="t">Pokaż na ekranie blokady</div><div class="s">Ratownik zobaczy kartę bez odblokowania telefonu</div></span><${Toggle} on=${lock} label="Pokaż na ekranie blokady" set=${v => {
        setLock(v);
        c.set({ medLock: v });
      }}/></div>
      <div class="row"><span class="it">${I('wifi', 18)}</span><span class="tx"><div class="t">Działa bez internetu</div><div class="s">Zapisana w telefonie, zaszyfrowana</div></span></div>
      <button class="row" onClick=${() => c.go('medical-id')}><span class="it">${I('eye', 18)}</span><span class="tx"><div class="t">Zobacz, co widzi ratownik</div></span><span class="chev">${I('chevron', 18)}</span></button>
    </div>
    <p class="tiny" style="margin-top:12px">Alergie i leki pobieramy z Internetowego Konta Pacjenta za Twoją zgodą. Grupę krwi i kontakty wpisujesz sama.</p>
  </div>`;
}

export function MedicalId(c) {
  return html`<div class="lock medlock" role="region" aria-label="Ekran blokady: identyfikator medyczny">
    <div class="lk-top"><div class="lk-date" style="margin-top:6px">Ekran blokady · widok ratownika</div></div>
    <div class="med">
      <div class="med-h"><span class="ice-star" style="background:#ff3b30">${I('plus', 16)}</span><b>Identyfikator medyczny</b></div>
      <div class="med-n">Anna Nowicka, 34</div>
      <div class="med-r"><span>Grupa krwi</span><b>A Rh+</b></div>
      <div class="med-r"><span>Alergie</span><b>Penicylina</b></div>
      <div class="med-r"><span>Leki</span><b>Euthyrox 50</b></div>
      <div class="med-r"><span>Kontakt</span><b>Tomasz · 600 123 456</b></div>
      <div class="med-f">Dane bez PESEL i adresu. Udostępnione przez właścicielkę telefonu.</div>
    </div>
    <div style="flex:1"></div>
    <div class="lk-foot"><button class="lk-btn" onClick=${c.back}>${I('left', 15)} Wróć do karty</button><button class="lk-btn" style="background:#ff3b30">${I('phone', 15)} 112</button></div>
  </div>`;
}
