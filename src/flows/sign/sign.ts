import { html, useEffect, useState } from '@/lib/preact';
import { GRID, KRK2 } from '@/flows/sign/map';
import { buzz, fire, fmt, rmo } from '@/lib/env';
import { TapShare } from '@/ui/controls';
import { I } from '@/ui/icons';
import { Av, Label, Lead, Num } from '@/ui/primitives';

const BILL = { t: 'Czyste powietrze przy szkołach', k: 'Obywatelski projekt ustawy', who: 'Komitet Inicjatywy Ustawodawczej „Oddychaj”', n: 87411, goal: 100000, left: 23 };

export function Sign1(c) {
  return html`<div>
    <p class="stepk">Rynek Główny · sobota, 11:20</p>
    <h1 class="h-l">Podpis bez kartki i długopisu</h1>
    <div class="bill8">
      <div class="b8-k">${BILL.k}</div>
      <div class="b8-t">${BILL.t}</div>
      <div class="b8-s">${BILL.who}</div>
      <div class="b8-bar"><i style=${`width:${BILL.n / BILL.goal * 100}%`}></i></div>
      <div class="b8-n"><b>${fmt(BILL.n)}</b> z ${fmt(BILL.goal)} podpisów · zostało ${BILL.left} dni</div>
    </div>
    <${TapShare} them="Marta, wolontariuszka" sub="Wolontariuszka trzyma telefon. Anna przykłada swój, górą do góry." onDone=${() => setTimeout(() => c.go('sign-2'), 700)}/>
  </div>`;
}

export function Sign2(c) {
  return html`<div>
    <p class="stepk">Głos · sprawdź, zanim podpiszesz</p>
    <h1 class="h-l">${BILL.t}</h1>
    <p class="lead">${BILL.k}. ${BILL.who}.</p>
    <${Label} t="Kto co zobaczy"/>
    <div class="glist">
      <div class="grow static"><${Lead} ic="people"/><span class="g-tx"><span class="gt">Komitet</span><span class="gs">„1 ważny podpis, Kraków”. Bez imienia, PESEL i adresu.</span></span></div>
      <div class="grow static"><${Lead} ic="shield"/><span class="g-tx"><span class="gt">Marszałek Sejmu</span><span class="gs">Twoje dane, tylko do sprawdzenia ważności podpisu.</span></span></div>
      <div class="grow static"><${Lead} ic="eye"/><span class="g-tx"><span class="gt">Ty</span><span class="gs">Podpis trafi do „Moje podpisy”. Możesz śledzić losy projektu.</span></span></div>
    </div>
    <div class="note" style="margin-top:14px">${I('info', 18)}<span>To poparcie projektu, nie głos w wyborach.</span></div>
    <div class="actions"><button class="btn" onClick=${() => c.confirm({ t: 'Poprzeć projekt ustawy?', items: [BILL.t, 'Komitet zobaczy tylko: 1 ważny podpis, Kraków', 'Podpis możesz sprawdzić w „Moje podpisy”'], ok: 'Podpisz twarzą', done: () => { c.set({ signed: true }); c.go('sign-3'); } })}>Podpisz</button></div>
  </div>`;
}

export function SignList(c) {
  return html`<div>
    <h1 class="h-l">Moje podpisy</h1>
    <p class="lead">Wszystko, co poparłaś: projekty ustaw, petycje i kandydaci.</p>
    <div class="glist">
      <div class="grow static"><${Lead} ic="doc"/><span class="g-tx"><span class="gt">${BILL.t}</span><span class="gs">Projekt ustawy · podpisano dziś · ${fmt(BILL.n + 1)} / ${fmt(BILL.goal)}</span></span></div>
      <div class="grow static"><${Lead} ic="mail"/><span class="g-tx"><span class="gt">Więcej drzew na Kazimierzu</span><span class="gs">Petycja do Rady Miasta Krakowa · odpowiedź do 12 grudnia</span></span></div>
      <div class="grow static"><${Lead} ic="check"/><span class="g-tx"><span class="gt">Kandydatka do Senatu, okręg 32</span><span class="gs">Poparcie zgłoszenia · podpis ważny, sprawdzony w rejestrze wyborców</span></span></div>
    </div>
    <p class="tiny" style="margin-top:12px">Partie i komitety nie mogą wysyłać Ci powiadomień. Podpisujesz tylko to, czego sama szukasz albo co ktoś poda Ci osobiście.</p>
    <${Label} t="Tego samego dnia w Sandomierzu"/>
    <button class="sg-twist" onClick=${() => c.go('easy-sign', 'tata')}><${Av} i="S" size=${40}/><span><b>Telefon taty</b><span>Stanisław dostaje ostrzeżenie o podpisie, którego nie złożył.</span></span>${I('chevron', 18)}</button>
  </div>`;
}

export function EasySign(c) {
  const [rep, setRep] = useState(false);
  return html`<div class="easy">
    <div class="es-ic">${I('shield', 34)}</div>
    <h1 class="h-l" style="font-size:34px;line-height:38px">Ktoś podpisał się za Pana</h1>
    <p class="lead" style="font-size:19px;line-height:27px">Pana PESEL jest na liście poparcia komitetu wyborczego „Nowa Fala”. Lista wpłynęła 22 listopada.</p>
    ${rep ? html`<div class="note green" style="font-size:17px">${I('check', 20)}<span>Zgłoszone do Państwowej Komisji Wyborczej. Ten podpis nie zostanie policzony. Anna dostała informację.</span></div>
      <div class="actions"><button class="btn ghost bigbtn" onClick=${() => c.go('easy', 'tata')}>Wróć</button></div>`
      : html`<p style="font-size:20px;font-weight:600;margin:18px 0 0">Czy to Pan podpisał?</p>
      <div class="actions"><button class="btn bigbtn" onClick=${() => { setRep(true); buzz(20); fire(); }}>Nie, to nie ja</button><button class="btn ghost bigbtn" onClick=${() => c.go('easy', 'tata')}>Tak, to ja</button></div>`}
  </div>`;
}

export function Sign3(c) {
  const [n, setN] = useState(BILL.n);
  useEffect(() => { const t = setTimeout(() => { setN(BILL.n + 1); buzz(10); }, rmo() ? 0 : 1100); return () => clearTimeout(t); }, []);
  const lit = n > BILL.n;
  return html`<div>
    <p class="stepk">Głos · podpisano</p>
    <div class="pl-map v2">
      <svg viewBox="0 0 300 278" role="img" aria-label="Mapa Polski: gdzie ludzie podpisali projekt">
        ${GRID.map(([x, y, v]) => html`<circle cx=${x.toFixed(1)} cy=${y.toFixed(1)} r=${(1.1 + v * 1.5).toFixed(2)} fill="var(--ink)" opacity=${(.1 + v * .75).toFixed(2)}/>`)}
        <g class=${'me-dot' + (lit ? ' on' : '')} transform=${`translate(${KRK2[0].toFixed(1)} ${KRK2[1].toFixed(1)})`}>
          <circle class="md-ring" r="7" fill="none" stroke="#2F6BFF" stroke-width="2"/>
          <circle class="md-core" r="5" fill="#2F6BFF" stroke="#fff" stroke-width="2"/>
        </g>
      </svg>
      <div class=${'pl-tag2' + (lit ? ' on' : '')} style=${`left:${(KRK2[0] / 3).toFixed(1)}%;top:${(KRK2[1] / 2.78).toFixed(1)}%`}>Twój podpis · Kraków</div>
      <div class="pl-leg"><span><i class="l1"></i>mniej</span><span><i class="l2"></i><i class="l3"></i>więcej podpisów</span></div>
    </div>
    <div class="pl-count"><b><${Num} v=${n} fmtf=${fmt}/></b><span>z ${fmt(BILL.goal)} · zostało ${BILL.left} dni</span></div>
    <div class="b8-bar big"><i style=${`width:${n / BILL.goal * 100}%`}></i></div>
    <div class="note" style="margin-top:14px">${I('shield', 18)}<span>Komitet widzi tylko: „1 ważny podpis, Kraków”. Na papierze Twoje imię, PESEL i adres leżałyby na podkładce dla każdego, kto zrobi zdjęcie.</span></div>
    <div class="actions"><button class="btn" onClick=${() => c.go('sign-list')}>Moje podpisy</button></div>
  </div>`;
}
