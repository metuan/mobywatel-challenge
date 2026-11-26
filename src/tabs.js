/* ---------- v7: visual tab screens (override earlier list-style versions) ---------- */
const Ring = ({ v, max, color = '#0a58d0', size = 56, w = 6, children }) => {
  const r = (size - w) / 2, L = 2 * Math.PI * r, p = Math.max(0, Math.min(1, v / max));
  return html`<span class="ring" style=${`width:${size}px;height:${size}px`}><svg width=${size} height=${size}><circle cx=${size / 2} cy=${size / 2} r=${r} stroke="rgba(120,120,128,.16)" stroke-width=${w} fill="none"/>
    <circle class="ring-p" cx=${size / 2} cy=${size / 2} r=${r} stroke=${color} stroke-width=${w} fill="none" stroke-linecap="round" stroke-dasharray=${L} stroke-dashoffset=${L * (1 - p)} transform=${`rotate(-90 ${size / 2} ${size / 2})`}/></svg><span class="ring-c">${children}</span></span>`;
};
const Scene = ({ n, bg, h = 150 }) => html`<div class="scene" style=${`background:${bg};height:${h}px`}>
  <svg class="scene-deco" viewBox="0 0 300 150" preserveAspectRatio="none"><circle cx="250" cy="30" r="60" fill="rgba(255,255,255,.22)"/><path d="M0 120C60 95 120 130 180 110S270 90 300 100V150H0z" fill="rgba(255,255,255,.28)"/></svg>
  ${ILL(n, Math.round(h * 0.95))}</div>`;
const CalTile = ({ m, d }) => html`<span class="caltile"><span class="cm">${m}</span><span class="cd">${d}</span></span>`;
const AV = [['AN', '#2f56b0'], ['TN', '#4b6a8f'], ['ZN', '#d9644a'], ['SN', '#2e8b57']];
const AvStack = ({ list = AV, size = 30 }) => html`<span class="avstack">${list.map(([i, col]) => html`<span style=${`background:${col};width:${size}px;height:${size}px`}>${i}</span>`)}</span>`;

function Today(c) {
  const s = c.s;
  return html`<div class="today">
    <div class="blue-hero">
      <div class="bh-date">Wtorek, 24 listopada</div>
      <div class="bh-hi">Dzień dobry, Anno</div>
      <div class="bh-big"><span>3</span> sprawy w toku</div>
      <button class="bh-pill" onClick=${() => c.go('matters')}>1 wymaga Twojej uwagi</button>
      <div class="qa">
        ${[['card', 'Mój dowód', 'doc-id'], ['qr', 'Skanuj', 'share-min'], ['mic', 'Zapytaj', 'assistant'], ['coin', 'Zapłać', 'taxes']].map(([ic, t, r]) => html`<button onClick=${() => c.go(r)}><span class="qa-i">${I(ic, 22)}</span><span>${t}</span></button>`)}
      </div>
    </div>
    <div class="sheet-up">
      <button class="hot" onClick=${() => c.go('car')}>
        <${Ring} v=${12} max=${30} color="#ff3b30" size=${54}><b>12</b><small>dni</small></${Ring}>
        <span class="tx"><div class="hk">Najpilniejsze</div><div class="ht">OC Toyoty się kończy</div><div class="hs">KR 4F21 · do 6 grudnia</div></span>
        <span class="go-pill">Przedłuż</span>
      </button>
      <div class="widgets">
        <button class="wg" onClick=${() => c.go('p800')}><div class="wk">800+ na Zosię</div><div class="wv">800 zł</div><div class="ws">Wypłata 28 listopada</div><span class="wic" style="background:#34c759">${I('coin', 18)}</span></button>
        <button class="wg" onClick=${() => c.go(s.moved ? 'move-done' : 'case-meld')}><div class="wk">${s.moved ? 'Przeprowadzka' : 'Dowód rejestracyjny'}</div>
          <div style="display:flex;align-items:center;gap:10px;margin-top:6px"><${Ring} v=${s.moved ? 2 : 3} max=${4} size=${46} w=${5}><b style="font-size:13px">${s.moved ? 2 : 3}/4</b></${Ring}><div class="ws" style="margin:0">${s.moved ? 'Urząd potwierdzi do 27.11' : 'Odbiór od 2 grudnia'}</div></div></button>
        <button class="wg" onClick=${() => c.go('family')}><div class="wk">Rodzina</div><div style="margin:8px 0 6px"><${AvStack}/></div><div class="ws">Tata: nowa e-recepta</div></button>
        <button class="wg" onClick=${() => c.go(s.visit ? 'visit-4' : 'visit-1')}><div class="wk">Zosia · kardiolog</div><div class="wv" style="font-size:22px">${s.visit ? '15 gru' : 'Skierowanie'}</div><div class="ws">${s.visit ? '10:30 · Prokocim' : 'Zarezerwuj wizytę'}</div><span class="wic" style="background:#ff2d55">${I('steth', 18)}</span></button>
      </div>

      <${Sec} t="Terminy" more="Kalendarz" go=${() => c.go('calendar')}/>
      <div class="list">
        ${[['GRU', '6', 'OC Toyoty', 'za 12 dni', 'car', 'red'], ['GRU', '31', 'Szczepienie Zosi (MMR)', 'za 37 dni', 'vacc', ''], ['STY', '4', 'Paszport Zosi wygasa', 'za 41 dni', 'renew-pass', 'amber'], ['STY', '26', 'Dowód taty wygasa', 'za 63 dni', 'member-tata', '']].map(([m, d, t, s2, r, tone]) =>
          html`<button class="row" onClick=${() => c.go(r)}><${CalTile} m=${m} d=${d}/><span class="tx"><div class="t">${t}</div><div class=${'s ' + tone}>${s2}</div></span><span class="chev">${I('chevron', 18)}</span></button>`)}
      </div>

      <${Sec} t="Ważne momenty" more="Wszystkie" go=${() => c.go('matters')}/>
      <div class="pcards">
        ${[['Przeprowadzka', '4 urzędy, jeden wniosek', 'move-1', 'move', 'linear-gradient(135deg,#ffd59e,#ff9f6e)'], ['Nowe dziecko', 'PESEL, 800+, NFZ w 10 min', 'baby-1', 'baby', 'linear-gradient(135deg,#ffc2d4,#ff8fab)'], ['Mój samochód', 'OC, przegląd, mandaty', 'car', 'car', 'linear-gradient(135deg,#a8d8ff,#5aa9ff)'], ['Podatki', 'Zwrot 1 284 zł', 'taxes', 'coin', 'linear-gradient(135deg,#c6f1c6,#5fcf86)']].map(([t, s2, r, n, bg]) =>
          html`<button class="pcard" onClick=${() => c.go(r)}><${Scene} n=${n} bg=${bg} h=${130}/><div class="pt">${t}</div><div class="ps">${s2}</div></button>`)}
      </div>
      <p class="tiny" style="margin-top:22px;text-align:center">Niezależna koncepcja. Dane są fikcyjne.</p>
    </div>
  </div>`;
}

function Matters(c) {
  const [cat, setCat] = useState('all');
  const cats = [['all', 'Wszystkie', 'list'], ['dom', 'Dom', 'home'], ['rodzina', 'Rodzina', 'people'], ['auto', 'Auto', 'car'], ['zdrowie', 'Zdrowie', 'steth'], ['pieniadze', 'Pieniądze', 'coin']];
  const items = [['Przeprowadzka', '4 urzędy · ok. 10 minut', 'move-1', 'move', 'linear-gradient(135deg,#ffd59e,#ff9f6e)', 'dom', 'Najczęściej wybierane'], ['Nowe dziecko', 'Akt, PESEL, 800+, NFZ', 'baby-1', 'baby', 'linear-gradient(135deg,#ffc2d4,#ff8fab)', 'rodzina', 'Pakiet 4 w 1'],
    ['Wizyta u specjalisty', 'e-Skierowanie i wolne terminy', 'visit-1', 'doctor', 'linear-gradient(135deg,#ffd1dc,#f78fb3)', 'zdrowie', ''], ['Sprzedaż auta', 'Zgłoszenie zbycia, OC', 'car-sell', 'car', 'linear-gradient(135deg,#a8d8ff,#5aa9ff)', 'auto', ''],
    ['Podatki', 'Twój e-PIT, opłaty lokalne', 'taxes', 'coin', 'linear-gradient(135deg,#c6f1c6,#5fcf86)', 'pieniadze', ''], ['Pismo z urzędu', 'Zrób zdjęcie, wyjaśnimy', 'letter-1', 'letter', 'linear-gradient(135deg,#e2d6ff,#a98bff)', 'dom', 'Nowość']];
  const shown = items.filter(x => cat === 'all' || x[5] === cat);
  return html`<div>
    <h1 class="h-xl">Sprawy</h1>
    <${Search} c=${c} ph="Czego potrzebujesz?"/>
    <div class="cats2">${cats.map(([k, t, ic]) => html`<button aria-pressed=${cat === k} onClick=${() => setCat(k)}>${I(ic, 24)}<span>${t}</span></button>`)}</div>
    <div class="inprog">
      ${[['Dowód rejestracyjny', 3, 'case-meld', '#0a58d0'], ...(c.s.moved ? [['Przeprowadzka', 2, 'move-done', '#ff9500']] : []), ...(c.s.babyDone ? [['Nowe dziecko', 3, 'baby-done', '#ff2d55']] : [])].map(([t, n, r, col]) =>
        html`<button class="ipc" onClick=${() => c.go(r)}><${Ring} v=${n} max=${4} color=${col} size=${40} w=${4}><b style="font-size:11px">${n}/4</b></${Ring}><span><div class="t">${t}</div><div class="s">W toku</div></span></button>`)}
    </div>
    <div class="listing">${shown.map(([t, s2, r, n, bg, , tag]) => html`<button class="lcard" onClick=${() => c.go(r)}>
      <div style="position:relative"><${Scene} n=${n} bg=${bg} h=${190}/>${tag && html`<span class="ltag">${tag}</span>`}</div>
      <div class="lrow"><div><div class="pt">${t}</div><div class="ps">${s2}</div></div><span class="chev">${I('chevron', 18)}</span></div></button>`)}</div>
  </div>`;
}

function Family(c) {
  const fam = [
    { id: 'anna', n: 'Anna', r: 'Ty', bg: '#2f56b0', chips: [['Dowód do 2031', 'doc-id']], big: '3 sprawy', go: 'profile' },
    { id: 'zosia', n: 'Zosia', r: 'Córka · 6 lat', bg: '#e0694f', chips: [['Paszport: 41 dni', 'renew-pass'], ['Szkoła', 'school']], big: 'Paszport', go: 'member-zosia' },
    ...(c.s.babyDone ? [{ id: 'julia', n: 'Julia', r: 'Córka · 9 dni', bg: '#8b5cf6', chips: [['800+', 'p800']], big: 'Nowa', go: 'baby-done' }] : []),
    { id: 'tomasz', n: 'Tomasz', r: 'Partner', bg: '#5b7a99', chips: [['Wspólne sprawy', 'member-tomasz']], big: 'Auto, dzieci', go: 'member-tomasz' },
    { id: 'tata', n: 'Tata', r: 'Sandomierz · 71 lat', bg: '#2e8b57', chips: [['Recepta', 'easy-rx'], ['Zadzwoń', 'easy-call']], big: 'Dostęp do 2027', go: 'member-tata' }
  ];
  return html`<div>
    <h1 class="h-xl">Bliscy</h1>
    <div class="fstack">${fam.map(p => html`<div class="fcard" style=${'background:' + p.bg} role="button" tabindex="0" onClick=${() => c.go(p.go)}>
      <div class="fc-top"><span class="fc-av">${p.n.slice(0, 1)}</span><div><div class="fc-n">${p.n}</div><div class="fc-r">${p.r}</div></div><span class="fc-more">•••</span></div>
      <div class="fc-big">${p.big}</div>
      <div class="fc-chips">${p.chips.map(([t, r]) => html`<button onClick=${e => { e.stopPropagation(); c.go(r); }}>${t}</button>`)}</div>
    </div>`)}
      <button class="fadd" onClick=${() => c.go('invite')}>${I('plus', 22)} Dodaj osobę</button>
    </div>
    <div class="tiles3">
      ${[['Kalendarz', '7 terminów', 'calendar', 'list', '#ff9500'], ['Plan kryzysowy', '2 miejsca', 'plan', 'shield', '#ff3b30'], ['Uprawnienia', 'Kto co widzi', 'consents', 'lock', '#5856d6']].map(([t, s2, r, ic, col]) =>
        html`<button class="t3" onClick=${() => c.go(r)}><span class="wic" style=${'position:static;background:' + col}>${I(ic, 18)}</span><div class="t">${t}</div><div class="s">${s2}</div></button>`)}
    </div>
  </div>`;
}

function Docs(c) {
  const cards = [
    ['Dowód osobisty', 'Anna Nowicka', 'doc-id', 'linear-gradient(135deg,#fdfbfb,#f3dfe3)', '#7a2e3a', 'RP'],
    ['Prawo jazdy', 'Kat. B · do 2033', 'doc-id', 'linear-gradient(135deg,#ffd6e0,#f7a7bd)', '#6b1f36', 'PL'],
    ['Dowód rejestracyjny', 'Toyota Yaris · KR 4F21', 'car', 'linear-gradient(135deg,#9be7d8,#3fb59f)', '#0f4b40', 'OC 12 dni'],
    ['Legitymacja PWZ', 'Pielęgniarka · nr 1206•••', 'issued', 'linear-gradient(135deg,#bcd3ff,#6f95f0)', '#13306e', ''],
    ['Dyplom magistra', 'Uniwersytet Jagielloński', 'issued', 'linear-gradient(135deg,#fff3d6,#f1d38c)', '#5a4515', 'Nowy'],
    ['Karta ratunkowa', 'A Rh+ · Penicylina', 'ice', 'linear-gradient(135deg,#ff6b6b,#e5383b)', '#fff', '']
  ];
  return html`<div>
    <h1 class="h-xl">Dokumenty</h1>
    <div class="wallet">${cards.map(([t, s2, r, bg, ink, b], i) => html`<button class="wcard" style=${`background:${bg};color:${ink};z-index:${i + 1}`} onClick=${() => c.go(r)}>
      <div class="wc-top"><span class="wc-t">${t}</span>${b ? html`<span class="wc-b">${b}</span>` : html`<span class="flag"></span>`}</div>
      <div class="wc-s">${s2}</div>
    </button>`)}</div>
    <div class="widgets" style="margin-top:16px">
      <button class="wg" onClick=${() => c.go('share-min')}><div class="wk">Pokaż tylko</div><div class="wv" style="font-size:22px">18+</div><div class="ws">Bez imienia i PESEL</div><span class="wic" style="background:#0a58d0">${I('eye', 18)}</span></button>
      <button class="wg" onClick=${() => c.go('share-min')}><div class="wk">Pokaż tylko</div><div class="wv" style="font-size:22px">Kraków</div><div class="ws">Bez adresu</div><span class="wic" style="background:#5856d6">${I('pin', 18)}</span></button>
    </div>
    <button class="hot" style="margin-top:12px" onClick=${() => c.go('lost')}><span class="wic" style="position:static;background:#ff3b30;width:40px;height:40px">${I('lock', 20)}</span><span class="tx"><div class="ht" style="margin:0">Zgubiłam portfel</div><div class="hs">Zastrzeż wszystko jednym przyciskiem</div></span><span class="chev">${I('chevron', 18)}</span></button>
  </div>`;
}

function Safety(c) {
  return html`<div>
    <h1 class="h-xl">Ochrona</h1>
    <div class="dark-hero">
      <div class="dh-top"><span class="pulse-dot"></span>Połączono z RCB · 15:40</div>
      <div class="dh-big">Kraków<br/><span>spokojnie</span></div>
      <div class="dh-places">
        ${[['Ty', 'Kraków', 'ok'], ['Zosia', 'Przedszkole', 'ok'], ['Tata', 'Sandomierz', 'warn']].map(([n, p, st]) => html`<button class="dhp" onClick=${() => c.go('places')}><i class=${st}></i><b>${n}</b><span>${p}</span></button>`)}
      </div>
      <div class="dh-warn">Sandomierz: wiatr do 90 km/h od 20:00 (IMGW, 2. stopień)</div>
    </div>
    <div class="widgets" style="margin-top:12px">
      <button class="wg" onClick=${() => c.go('alert-shelter')}><div class="wk">Schronienie</div><div class="wv">240 m</div><div class="ws">Dekerta 24 · 3 min</div><span class="wic" style="background:#34c759">${I('route', 18)}</span></button>
      <button class="wg" onClick=${() => c.go('ice')}><div class="wk">Karta ratunkowa</div><div class="wv" style="font-size:22px">A Rh+</div><div class="ws">Na ekranie blokady</div><span class="wic" style="background:#ff3b30">${I('plus', 18)}</span></button>
      <button class="wg" onClick=${() => c.go('plan')}><div class="wk">Plan rodziny</div><div style="margin:8px 0 6px"><${AvStack} size=${26}/></div><div class="ws">2 miejsca spotkań</div></button>
      <button class="wg" onClick=${() => c.go('scam')}><div class="wk">Tarcza</div><div class="wv" style="font-size:22px">3</div><div class="ws">fałszywe SMS-y zablokowane</div><span class="wic" style="background:#5856d6">${I('shield', 18)}</span></button>
    </div>
    <div class="demo-row">
      <button class="demo-b red" onClick=${() => c.go('lock')}>${I('bell', 20)}<span><b>Zobacz Alert RCB</b><small>Jak przychodzi na telefon</small></span></button>
      <button class="demo-b" onClick=${() => c.go('damage-1')}>${I('camera', 20)}<span><b>Zgłoś szkody</b><small>Po zdarzeniu</small></span></button>
    </div>
    <${Sec} t="Komunikaty"/>
    <div class="list">
      ${[['RCB', '#ff3b30', 'Test syren w Krakowie, 1 grudnia, 12:00', 'wczoraj'], ['IMGW', '#ff9500', 'Silny wiatr, Sandomierz, 2. stopień', '14:20'], ['RSO', '#0a58d0', 'Podwyższony stan Wisły, bez zagrożenia', '11:02']].map(([src, col, t, tm]) =>
        html`<div class="row"><span class="src-b" style=${'background:' + col}>${src}</span><span class="tx"><div class="t" style="font-size:15px">${t}</div><div class="s">${tm}</div></span></div>`)}
    </div>
    <${Sec} t="Rozpoznaj sygnał"/>
    <div class="widgets">
      <div class="wg"><div class="wk">Alarm</div><svg viewBox="0 0 120 30" width="100%" height="30"><path d="M0 15 Q7.5 0 15 15 T30 15 T45 15 T60 15 T75 15 T90 15 T105 15 T120 15" stroke="#ff3b30" stroke-width="2.5" fill="none"/></svg><div class="ws">Dźwięk modulowany, 3 min</div></div>
      <div class="wg"><div class="wk">Odwołanie</div><svg viewBox="0 0 120 30" width="100%" height="30"><path d="M0 15H120" stroke="#34c759" stroke-width="2.5"/></svg><div class="ws">Dźwięk ciągły, 3 min</div></div>
    </div>
  </div>`;
}
