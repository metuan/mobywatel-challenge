import { html, useState } from '@/lib/preact';
import { I } from '@/ui/icons';
import { Av, GRow, Label, Sec, Toggle } from '@/ui/primitives';

export function Plan(c) {
  return html`<div>
    <h1 class="h-l">Plan rodziny na sytuację kryzysową</h1>
    <p class="lead">Ustalony razem z Tomaszem. Działa bez internetu.</p>
    <div class="list">
      <div class="field"><div class="l">Miejsce spotkania 1</div><div class="v">Schron, ul. Dekerta 24 (240 m od domu)</div></div>
      <div class="field"><div class="l">Miejsce spotkania 2</div><div class="v">Szkoła Podstawowa nr 34, ul. Kalwaryjska</div></div>
      <div class="field"><div class="l">Kto odbiera Zosię z przedszkola</div><div class="v">Tomasz, a jeśli nie odpowiada: Anna</div></div>
      <div class="field"><div class="l">Kolejność kontaktu</div><div class="v">Anna, Tomasz, tata, sąsiadka p. Ewa</div></div>
      <div class="field"><div class="l">Leki</div><div class="v">Tata: leki na ciśnienie, zapas na 7 dni</div></div>
    </div>
    <${Sec} t="Plecak ewakuacyjny"/>
    <div class="list">
      ${[
        ['Woda, 2 l na osobę na dzień', true],
        ['Latarka i baterie', true],
        ['Powerbank', false],
        ['Kopie dokumentów', true],
        ['Apteczka', false],
      ].map(
        ([t, on]) =>
          html`<div class="row"><span class="ic" style=${on ? 'background:var(--green-soft);color:var(--green)' : ''}>${on ? I('check', 18) : ''}</span><span class="tx"><div class="t">${t}</div></span>${!on && html`<span class="pill p-amber">Brakuje</span>`}</div>`,
      )}
    </div>
  </div>`;
}

export function Places(c) {
  return html`<div><h1 class="h-l">Obserwowane miejsca</h1>
    <p class="lead">Alerty dla Twojej lokalizacji przychodzą zawsze. Alerty dla tych miejsc są oznaczone ich nazwą, żeby ich nie pomylić.</p>
    <div class="list">${[
      ['Sandomierz', 'Tata, ul. Mickiewicza'],
      ['Przedszkole nr 12, Kraków', 'Zosia'],
      ['Biuro Tomasza, Katowice', 'Tomasz'],
    ].map(
      ([t, s]) =>
        html`<div class="row"><span class="ic">${I('pin')}</span><span class="tx"><div class="t">${t}</div><div class="s">${s}</div></span><${Toggle} on=${true} set=${() => {}} label=${t}/></div>`,
    )}</div>
    <div class="actions"><button class="btn ghost">${I('plus', 18)} Dodaj miejsce</button></div></div>`;
}

export function Safety(c) {
  const [flood, setFlood] = useState(false);
  const alarm = () => {
    setFlood(true);
    setTimeout(() => c.go('lock'), 650);
  };
  return html`<div>
    <h1 class="h-xl">Ochrona</h1>
    <div class=${'status' + (flood ? ' flood' : '')}>
      <div class="st-k"><span class="pulse-dot"></span>Połączono z RCB · 15:40</div>
      <div class="st-city">Kraków</div><div class="st-calm">${flood ? 'Alarm, idź do schronu' : 'Spokojnie'}</div>
      <div class="st-people">
        ${[
          ['A', 'Ty', 'Kraków, Podgórze', 'ok'],
          ['Z', 'Zosia', 'Przedszkole nr 12', 'ok'],
          ['S', 'Tata', 'Sandomierz', 'warn'],
        ].map(
          ([i, n, p, st]) =>
            html`<button class="st-p" onClick=${() => c.go('family-map')}><${Av} i=${i} size=${28}/><span class="gtx"><span class="gt">${n}</span><span class="gs">${p}</span></span><i class=${'sdot ' + st}></i></button>`,
        )}
      </div>
      <div class="st-warn"><i class="sdot warn"></i>Sandomierz: wiatr do 90 km/h od 20:00 (IMGW, 2. stopień)</div>
      <i class="st-flood"></i>
    </div>
    <button class="pill wide" style="margin-top:12px" onClick=${alarm}>Zobacz, jak przychodzi Alert RCB</button>
    <div class="w8">
      <button class="w" onClick=${() => c.go('alert-shelter')}><span class="wk">Najbliższy schron</span><span class="wico">${I('route', 20)}</span><span class="wv">240 m</span><span class="ws">Dekerta 24 · 3 min pieszo</span></button>
      <button class="w" onClick=${() => c.go('ice')}><span class="wk">Karta ratunkowa</span><span class="wico">${I('heart', 20)}</span><span class="wv" style="font-size:22px">A Rh+</span><span class="ws">Widoczna na ekranie blokady</span></button>
      <button class="w" onClick=${() => c.go('plan')}><span class="wk">Plan rodziny</span><span class="wico">${I('people', 20)}</span><span class="wv">2<small> miejsca</small></span><span class="ws">Spotkania po alarmie</span></button>
      <button class="w" onClick=${() => c.go('scam')}><span class="wk">Tarcza SMS</span><span class="wico">${I('shield', 20)}</span><span class="wv">3<small> zablokowane</small></span><span class="ws">Fałszywe dopłaty i kurierzy</span></button>
    </div>
    <${Label} t="Komunikaty"/>
    <div class="glist">
      ${[
        ['bell', 'Test syren w Krakowie, 1 grudnia, 12:00', 'RCB · wczoraj'],
        ['sun', 'Silny wiatr w Sandomierzu, 2. stopień', 'IMGW · 14:20'],
        ['wifi', 'Wisła: więcej wody, domom nic nie grozi', 'RSO · 11:02'],
      ].map(([ic, t, s2]) => html`<${GRow} ic=${ic} t=${t} s=${s2} onClick=${() => c.go('places')}/>`)}
      <${GRow} ic="call" t="Kto do mnie dzwoni?" s="Sprawdź, czy dzwoni naprawdę urząd" onClick=${() => c.go('caller')}/>
      <${GRow} ic="camera" t="Zgłoś szkody po zdarzeniu" s="Zdjęcia, opis, jeden wniosek" onClick=${() => c.go('damage-1')}/>
    </div>
    <${Label} t="Rozpoznaj sygnał"/>
    <div class="w8">
      <div class="w"><span class="wk">Alarm</span><svg viewBox="0 0 120 30" width="100%" height="30" style="margin-top:auto"><path d="M0 15 Q7.5 0 15 15 T30 15 T45 15 T60 15 T75 15 T90 15 T105 15 T120 15" stroke="var(--ink)" stroke-width="1.75" fill="none"/></svg><span class="ws">Dźwięk modulowany, 3 min</span></div>
      <div class="w"><span class="wk">Odwołanie</span><svg viewBox="0 0 120 30" width="100%" height="30" style="margin-top:auto"><path d="M0 15H120" stroke="var(--ink)" stroke-width="1.75"/></svg><span class="ws">Dźwięk ciągły, 3 min</span></div>
    </div>
  </div>`;
}
