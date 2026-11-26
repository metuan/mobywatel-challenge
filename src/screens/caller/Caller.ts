import { html, useEffect, useState } from '@/lib/preact';
import { I } from '@/ui/icons';

/* Hop 13: "Kto do mnie dzwoni?" checks a caller who claims to be an office */
export function Caller(c) {
  const [st, setSt] = useState(0); /* 0 ringing, 1 checked */
  useEffect(() => { const a = setTimeout(() => setSt(1), 1500); return () => clearTimeout(a); }, []);
  return html`<div class="caller8">
    <div class="cl-top"><div class="cl-k">Połączenie przychodzące</div><div class="cl-n">ZUS</div><div class="cl-num">+48 22 560 16 00</div></div>
    <div class=${'cl-check ' + (st ? 'bad' : '')}>
      ${st === 0 ? html`<span class="cl-spin"></span><span>mObywatel sprawdza, czy to naprawdę ZUS…</span>`
        : html`<span class="cl-ic">${I('shield', 20)}</span><span><b>To nie jest ZUS.</b> ZUS nie dzwoni teraz do Ciebie z żadnego numeru. Ktoś podszywa się pod urząd. Nie podawaj kodów ani danych.</span>`}
    </div>
    <div class="cl-keys">
      <button class="cl-btn no" onClick=${() => { c.toast('Odrzucono. Numer zgłoszony do CERT Polska.'); c.back(); }}><span>${I('call', 28)}</span>Odrzuć i zgłoś</button>
      <button class="cl-btn yes" onClick=${() => { c.toast('Uważaj: nie podawaj kodów SMS ani BLIK.'); c.back(); }}><span>${I('call', 28)}</span>Odbierz</button>
    </div>
    <p class="cl-foot">Urzędy zgłaszają swoje połączenia z wyprzedzeniem. Gdy dzwoni prawdziwy urząd, zobaczysz zielony znak i powód rozmowy.</p>
  </div>`;
}
