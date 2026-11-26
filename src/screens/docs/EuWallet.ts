import { html, useEffect, useState } from '@/lib/preact';
import { reducedMotion } from '@/lib/env';
import { TapShare } from '@/ui/controls';
import { I } from '@/ui/icons';
import { Label } from '@/ui/primitives';
import type { Ctx } from '@/types';

export function EuWallet(_c: Ctx) {
  const [side, setSide] = useState(0);
  const [sent, setSent] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setSide(1), reducedMotion() ? 0 : 700);
    return () => clearTimeout(t);
  }, []);
  const stars = Array.from({ length: 12 }, (_, i) => {
    const a = (i / 12) * Math.PI * 2;
    return [50 + Math.cos(a) * 30, 50 + Math.sin(a) * 30];
  });
  return html`<div>
    <p class="stepk">Lizbona · wypożyczalnia aut</p>
    <h1 class="h-l">Ta sama karta w całej Unii</h1>
    <div class=${'eu-flip' + (side ? ' on' : '')}>
      <div class="eu-f eu-pl doc tone-id"><div class="d-top"><span class="d-rp"><i class="flag"></i>Rzeczpospolita Polska</span><span class="d-kind">Dowód osobisty</span></div><div class="eu-name">Anna Nowicka</div><div class="d-bot"><span class="d-chip">mDowód</span></div></div>
      <div class="eu-f eu-eu doc tone-id">
        <svg class="eu-stars" viewBox="0 0 100 100" aria-hidden="true">${stars.map(([x, y]) => html`<circle cx=${x} cy=${y} r="2.6" fill="#D8C27A"/>`)}</svg>
        <div class="d-top"><span class="d-rp">Unia Europejska</span><span class="d-kind">EU Digital Identity</span></div>
        <div class="eu-name">Anna Nowicka</div>
        <div class="d-bot"><span class="d-chip">PL · EUDI</span><span class="d-live"><i></i>ważny w 27 krajach</span></div>
      </div>
    </div>
    <${Label} t="Wypożyczalnia prosi o 3 informacje"/>
    <div class="eu-facts">${['Imię i nazwisko', 'Prawo jazdy kat. B', 'Ukończone 25 lat'].map(t => html`<span class=${sent ? 'ok' : ''}>${I('check', 14)}${t}</span>`)}</div>
    <p class="tiny" style="margin:8px 0 14px">Nie udostępniasz: adresu, PESEL ani daty urodzenia.</p>
    <${TapShare} them="Rent-a-car Lisboa" sub="Anna przykłada telefon do terminala przy ladzie." label="Zbliż telefony" onDone=${() => setSent(true)}/>
    ${sent && html`<div class="note green" style="margin-top:10px">${I('check', 18)}<span>Udostępniono 3 informacje. Wypożyczalnia nie dostała PESEL ani adresu. Wpis jest w „Kto sprawdzał moje dane”.</span></div>`}
  </div>`;
}
