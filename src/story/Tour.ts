import { html, useEffect, useState } from '@/lib/preact';
import { OFFICES, PEOPLE } from '@/data/household';
import { DocCard } from '@/ui/documentCard';
import { I } from '@/ui/icons';
import { Av } from '@/ui/primitives';

export function Tour({ mode, onStart, onClose }) {
  const outro = mode === 'outro';
  const N = outro ? 1 : 4;
  const [k, setK] = useState(0);
  const next = () => (k < N - 1 ? setK(k + 1) : onStart());
  useEffect(() => {
    const f = e => {
      e.stopImmediatePropagation();
      if (e.key === 'ArrowRight' || e.key === 'Enter') next();
      if (e.key === 'ArrowLeft' && k > 0) setK(k - 1);
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', f, true);
    return () => window.removeEventListener('keydown', f, true);
  }, [k]);
  const slides = outro
    ? [
        html`<div class="tv" key="o">
      <div class="tv-art"><div class="tv-card"><${DocCard} interactive=${false}/></div></div>
      <div class="tv-k">To wszystko</div>
      <h2 class="tv-h">Tak mógłby działać mObywatel.</h2>
      <p class="tv-p">Część tych funkcji działa już dziś, reszta korzysta z rejestrów, które państwo już ma. Przy każdym ekranie widać, jak to działa i gdzie pomaga AI.</p>
    </div>`,
      ]
    : [
        html`<div class="tv" key="0">
      <div class="tv-art fam">${PEOPLE.map(([i, n, r], j) => html`<div class="tv-person" style=${`animation-delay:${j * 70}ms`}><${Av} i=${i} size=${j === 0 ? 72 : 56}/><b>${n}</b><span>${r}</span></div>`)}</div>
      <div class="tv-k">Prototyp nowego mObywatela</div>
      <h2 class="tv-h">Poznaj Nowickich.</h2>
      <p class="tv-p">Anna i Tomasz mieszkają w Krakowie z sześcioletnią Zosią. Tata Anny, Stanisław, mieszka sam w Sandomierzu. Rodzina jest zmyślona, sprawy są prawdziwe.</p>
    </div>`,
        html`<div class="tv" key="1">
      <div class="tv-art scatter">${OFFICES.map((o, j) => html`<span style=${`--r:${((j * 37) % 13) - 6}deg;--d:${j * 40}ms`}>${o}</span>`)}</div>
      <div class="tv-k">Ich tydzień</div>
      <h2 class="tv-h">Przeprowadzka, poród, kardiolog, mandat, alarm i zalane mieszkanie.</h2>
      <p class="tv-p">Dziś każda z tych spraw to inny urząd, inny formularz i ten sam PESEL wpisywany od nowa.</p>
    </div>`,
        html`<div class="tv" key="2">
      <div class="tv-art"><div class="tv-card"><${DocCard} interactive=${false}/></div></div>
      <div class="tv-k">Pomysł</div>
      <h2 class="tv-h">Jedna aplikacja, która prowadzi sprawę do końca.</h2>
      <div class="tv-3">
        <div><b>Do końca</b><span>Od wniosku do decyzji, bez okienek.</span></div>
        <div><b>Dla rodziny</b><span>Dzieci, rodzice, pełnomocnictwa.</span></div>
        <div><b>Za Twoją zgodą</b><span>Nic nie wychodzi bez potwierdzenia.</span></div>
      </div>
    </div>`,
        html`<div class="tv" key="3">
      <div class="tv-art howto">
        <div class="hw"><b>1</b><span class="hw-col txt"><i></i><i></i><i class="s"></i><i class="btn"></i></span><em>Czytasz</em></div>
        <div class="hw main"><b>2</b><span class="hw-col ph"><i class="ring"></i></span><em>Klikasz</em></div>
        <div class="hw"><b>3</b><span class="hw-col txt"><i class="s"></i><i></i><i class="s"></i><i></i></span><em>Jak to działa</em></div>
      </div>
      <div class="tv-k">Jak to obejrzeć</div>
      <h2 class="tv-h">13 rozdziałów, około 6 minut.</h2>
      <p class="tv-p">Po lewej przeczytasz, co się dzieje. Telefon w środku działa naprawdę: podświetlimy, co kliknąć. Po prawej zobaczysz, jak to działa od środka. Następny rozdział włączysz przyciskiem „Dalej” albo strzałką →.</p>
    </div>`,
      ];
  return html`<div class="tour-bg" role="dialog" aria-modal="true" aria-label="Wprowadzenie">
    <div class="tour">
      <button class="tour-x" aria-label="Zamknij" onClick=${onClose}>${I('x', 18)}</button>
      ${slides[k]}
      <div class="tour-foot">
        ${N > 1 ? html`<div class="tour-dots">${Array.from({ length: N }, (_, j) => html`<i class=${j === k ? 'on' : ''}></i>`)}</div>` : html`<span></span>`}
        <div class="tour-btns">
          ${
            outro
              ? html`<button class="pill soft" onClick=${onClose}>Klikaj dalej sam</button><button class="pill" onClick=${onStart}>Obejrzyj od nowa</button>`
              : k < N - 1
                ? html`<button class="pill soft" onClick=${onClose}>Pomiń</button><button class="pill" onClick=${next}>Dalej ${I('chevron', 16)}</button>`
                : html`<button class="pill soft" onClick=${onClose}>Rozejrzę się sam</button><button class="pill" onClick=${onStart}>Zacznij historię ${I('chevron', 16)}</button>`
          }
        </div>
      </div>
    </div>
  </div>`;
}
