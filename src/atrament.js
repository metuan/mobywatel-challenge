/* ---------- v8 "Atrament": ink-on-paper tabs, the document is the only rich surface ---------- */
const Ring = ({ v, max, color = 'var(--ink)', size = 44, w = 3, children }) => {
  const r = (size - w) / 2, L = 2 * Math.PI * r, p = Math.max(0, Math.min(1, v / max));
  return html`<span class="ring" style=${`width:${size}px;height:${size}px`}><svg width=${size} height=${size}><circle cx=${size / 2} cy=${size / 2} r=${r} stroke="var(--fill-2)" stroke-width=${w} fill="none"/>
    <circle class="ring-p" cx=${size / 2} cy=${size / 2} r=${r} stroke=${color} stroke-width=${w} fill="none" stroke-linecap="round" stroke-dasharray=${L} stroke-dashoffset=${L * (1 - p)} transform=${`rotate(-90 ${size / 2} ${size / 2})`}/></svg><span class="ring-c">${children}</span></span>`;
};
const Wm = ({ rz = false }) => html`<span class="wm"><i class="flag"></i><span class="m">m</span>Obywatel${rz && html`<span class="rz">Razem</span>`}</span>`;
const AV = [['A', 'Anna'], ['T', 'Tomasz'], ['Z', 'Zosia'], ['S', 'Tata']];
const Av = ({ i, size = 40, dot }) => html`<span class="av" style=${`width:${size}px;height:${size}px;font-size:${Math.round(size * .34)}px`}>${i}${dot && html`<i class=${'avd ' + dot}></i>`}</span>`;
const AvStack = ({ size = 28, list = AV }) => html`<span class="avstack">${list.map(([i]) => html`<${Av} i=${i} size=${size}/>`)}</span>`;
const Lead = ({ ic }) => html`<span class="lead-i">${I(ic, 20)}</span>`;
const GRow = ({ ic, av, t, s, v, red, onClick }) => html`<button class="grow" onClick=${onClick}>
  ${ic ? html`<${Lead} ic=${ic}/>` : av ? av : ''}
  <span class="gtx"><span class="gt">${t}</span>${s && html`<span class="gs">${s}</span>`}</span>
  ${v && html`<span class=${'gv' + (red ? ' red' : '')}>${v}</span>`}<span class="gch">${I('chevron', 16)}</span></button>`;
const Label = ({ t, more, go }) => html`<div class="lbl"><span>${t}</span>${more && html`<button onClick=${go}>${more}${I('chevron', 14)}</button>`}</div>`;

const useClock = () => {
  const [t, setT] = useState(() => 7);
  useEffect(() => { const i = setInterval(() => setT(x => x + 1), 1000); return () => clearInterval(i); }, []);
  const m = 40 + Math.floor(t / 60), sec = t % 60;
  return `15:${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
};
const QRCode = ({ size = 132 }) => {
  const n = 25, cells = []; let seed = 7;
  const rnd = () => (seed = (seed * 9301 + 49297) % 233280) / 233280;
  const finder = (x, y) => (x < 7 && y < 7) || (x >= n - 7 && y < 7) || (x < 7 && y >= n - 7);
  for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) if (!finder(x, y) && rnd() > .52) cells.push(html`<rect x=${x} y=${y} width="1" height="1"/>`);
  const F = (x, y) => html`<g><rect x=${x} y=${y} width="7" height="7" rx="1.6"/><rect x=${x + 1} y=${y + 1} width="5" height="5" rx="1" fill="#fff"/><rect x=${x + 2} y=${y + 2} width="3" height="3" rx=".6"/></g>`;
  return html`<svg width=${size} height=${size} viewBox=${`-1 -1 ${n + 2} ${n + 2}`} fill="#0B0D12" shape-rendering="crispEdges">${cells}${F(0, 0)}${F(n - 7, 0)}${F(0, n - 7)}</svg>`;
};
const Photo = () => html`<span class="dphoto"><svg viewBox="0 0 56 72" width="56" height="72"><rect width="56" height="72" fill="#2A3242"/><circle cx="28" cy="28" r="12" fill="#596274"/><path d="M6 72c2-15 11-22 22-22s20 7 22 22z" fill="#596274"/></svg></span>`;

const ROSETTE = html`<svg class="rosette" viewBox="-100 -100 200 200" aria-hidden="true">${Array.from({ length: 36 }, (_, i) => html`<ellipse rx="92" ry="34" transform=${`rotate(${i * 5})`}/>`)}</svg>`;
const Holo = () => html`<span class="holo" aria-hidden="true"></span>`;
function DocCard({ c, tone = 'id', interactive = true }) {
  const [flip, setFlip] = useState(false);
  const [left, setLeft] = useState(179);
  const clock = useClock();
  const ref = useRef(null);
  useEffect(() => { if (!flip) return; setLeft(179); const i = setInterval(() => setLeft(x => Math.max(0, x - 1)), 1000); return () => clearInterval(i); }, [flip]);
  const move = e => { const el = ref.current; if (!el) return; const r = el.getBoundingClientRect(); const x = (e.clientX - r.left) / r.width; el.style.setProperty('--sx', (100 - x * 100).toFixed(1) + '%'); el.style.setProperty('--rx', ((x - .5) * 6).toFixed(2) + 'deg'); };
  const leave = () => { const el = ref.current; if (el) { el.style.removeProperty('--rx'); } };
  return html`<div class=${'flipwrap' + (flip ? ' flipped' : '')}>
    <button class=${'doc tone-' + tone} ref=${ref} onPointerMove=${interactive ? move : null} onPointerLeave=${leave} onClick=${() => interactive && setFlip(true)} aria-label="Dowód osobisty, dotknij aby pokazać kod QR">${ROSETTE}
      <div class="d-top"><span class="d-rp"><i class="flag"></i>Rzeczpospolita Polska</span><span class="d-kind">Dowód osobisty</span></div>
      <div class="d-mid"><${Photo}/><${Holo}/><div class="d-who"><div class="d-name">Anna Nowicka</div>
        <div class="d-f"><div><span>Data urodzenia</span><b>14.03.1992</b></div><div><span>Ważny do</span><b>12.05.2031</b></div></div></div></div>
      <div class="d-bot"><span class="d-chip">mDowód</span><span class="d-live"><i></i>${clock}</span></div>
    </button>
    <div class="doc doc-back tone-${tone}" role="button" tabindex="0" onClick=${() => setFlip(false)}>
      <div class="qrbox"><${QRCode} size=${118}/></div>
      <div class="qr-tx"><div class="d-name" style="font-size:17px">Pokaż kod do zeskanowania</div><div class="qr-s">Kod ważny ${Math.floor(left / 60)}:${String(left % 60).padStart(2, '0')}. Zobaczysz, kto sprawdza, zanim pokażesz dane.</div>
        <span class="d-chip" style="margin-top:12px">Dotknij, aby wrócić</span></div>
    </div>
  </div>`;
}

const LINE = { move: 'move', baby: 'baby', car: 'car', coin: 'coin', letter: 'letter', doctor: 'doctor' };
const Tile = ({ t, s, n, onClick }) => html`<button class="mtile" onClick=${onClick}><span class="mt-ill">${ILL(n, 76)}</span><span class="mt-t">${t}</span><span class="mt-s">${s}</span></button>`;

function Today(c) {
  const s = c.s;
  return html`<div class="today8">
    <div class="hi"><div class="hi-d">Wtorek, 24 listopada</div><h1 class="h-xl">Dzień dobry, Anno</h1></div>${c.bar || ''}
    <${DocCard} c=${c}/>
    <div class="qa8">
      ${[['qr', 'Pokaż', 'share-min'], ['camera', 'Skanuj', 'letter-1'], ['mic', 'Zapytaj', 'assistant'], ['coin', 'Zapłać', 'taxes']].map(([ic, t, r]) => html`<button onClick=${() => c.go(r)}><span class="qa8-i">${I(ic, 22)}</span><span>${t}</span></button>`)}
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

function Matters(c) {
  const [cat, setCat] = useState('all');
  const cats = [['all', 'Wszystkie'], ['dom', 'Dom'], ['rodzina', 'Rodzina'], ['auto', 'Auto'], ['zdrowie', 'Zdrowie'], ['pieniadze', 'Pieniądze']];
  const items = [['Przeprowadzka', '4 urzędy, ok. 10 minut', 'move-1', 'move', 'dom'], ['Nowe dziecko', 'Akt, PESEL, 800+, NFZ', 'baby-1', 'baby', 'rodzina'],
    ['Wizyta u specjalisty', 'e-Skierowanie i terminy', 'visit-1', 'doctor', 'zdrowie'], ['Sprzedaż auta', 'Zgłoszenie i OC', 'car-sell', 'car', 'auto'],
    ['Podatki', 'Twój e-PIT, opłaty', 'taxes', 'coin', 'pieniadze'], ['Pismo z urzędu', 'Zrób zdjęcie, wyjaśnimy', 'letter-1', 'letter', 'dom']];
  const shown = items.filter(x => cat === 'all' || x[4] === cat);
  const prog = [['Dowód rejestracyjny', 3, 'case-meld', 'Odbiór od 2 grudnia'], ...(c.s.moved ? [['Przeprowadzka', 2, 'move-done', 'Urząd potwierdzi do 27.11']] : []), ...(c.s.babyDone ? [['Nowe dziecko', 3, 'baby-done', '800+ w drodze']] : [])];
  return html`<div>
    <h1 class="h-xl">Sprawy</h1>
    <${Search} c=${c} ph="Czego potrzebujesz?"/>
    <div class="chips">${cats.map(([k, t]) => html`<button aria-pressed=${cat === k} onClick=${() => setCat(k)}>${t}</button>`)}</div>
    <${Label} t="W toku"/>
    <div class="glist">${prog.map(([t, n, r, s2]) => html`<button class="grow" onClick=${() => c.go(r)}><${Ring} v=${n} max=${4} size=${40}><b style="font-size:11px">${n}/4</b></${Ring}>
      <span class="gtx"><span class="gt">${t}</span><span class="gs">${s2}</span></span><span class="gch">${I('chevron', 16)}</span></button>`)}</div>
    <${Label} t="Załatw od początku do końca"/>
    <div class="mgrid">${shown.map(([t, s2, r, n]) => html`<${Tile} t=${t} s=${s2} n=${n} onClick=${() => c.go(r)}/>`)}</div>
  </div>`;
}

function Family(c) {
  const fam = [
    ['A', 'Anna', 'Ty', 'Dowód do 2031', '', 'profile', 'ok'],
    ['Z', 'Zosia', 'Córka, 6 lat', 'Paszport · 41 dni', 'red', 'member-zosia', ''],
    ...(c.s.babyDone ? [['J', 'Julia', 'Córka, 9 dni', '800+ w drodze', '', 'baby-done', '']] : []),
    ['T', 'Tomasz', 'Partner', 'Wspólne sprawy', '', 'member-tomasz', ''],
    ['S', 'Stanisław', 'Tata', 'Dostęp do 2027', '', 'member-tata', 'key']
  ];
  return html`<div>
    <h1 class="h-xl">Bliscy</h1>
    <div class="fhead"><${AvStack} size=${32}/><span>${fam.length} osoby · 1 sprawa wymaga uwagi</span></div>
    <div class="glist">${fam.map(([i, n, r, f, red, go, k]) => html`<button class="grow tall" onClick=${() => c.go(go)}>
      <${Av} i=${i} size=${44}/><span class="gtx"><span class="gt h">${n}${k === 'key' && html`<span class="keyi" title="Masz pełnomocnictwo">${I('key', 14)}</span>`}</span><span class="gs">${r}</span></span>
      <span class=${'gv' + (red ? ' red' : '')}>${f}</span><span class="gch">${I('chevron', 16)}</span></button>`)}
      <button class="grow" onClick=${() => c.go('invite')}><${Lead} ic="plus"/><span class="gtx"><span class="gt">Dodaj osobę</span></span></button>
    </div>
    <${Label} t="Wspólne"/>
    <div class="glist">
      <${GRow} ic="list" t="Kalendarz rodziny" v="7 terminów" onClick=${() => c.go('calendar')}/>
      <${GRow} ic="pin" t="Gdzie jest rodzina" s="Tylko podczas alarmu" onClick=${() => c.go('family-map')}/>
      <${GRow} ic="shield" t="Plan kryzysowy" v="2 miejsca" onClick=${() => c.go('plan')}/>
      <${GRow} ic="lock" t="Uprawnienia" s="Kto co widzi i do kiedy" onClick=${() => c.go('consents')}/>
    </div>
  </div>`;
}

function Docs(c) {
  const cards = [
    ['Dowód osobisty', 'Anna Nowicka', 'doc-id', 'id', 'Ważny'],
    ['Prawo jazdy', 'Kat. B · do 2033', 'doc-id', 'drive', '0 pkt'],
    ['Dowód rejestracyjny', 'Toyota Yaris · KR 4F21', 'car', 'car', 'OC 12 dni'],
    ['Paszport', 'Zofia Nowicka', 'renew-pass', 'pass', '41 dni'],
    ['Dyplom magistra', 'Uniwersytet Jagielloński', 'issued', 'other', 'Nowy'],
    ['Karta ratunkowa', 'A Rh+ · penicylina', 'ice', 'other', '']
  ];
  const [sel, setSel] = useState(-1);
  return html`<div>
    <h1 class="h-xl">Dokumenty</h1>
    <div class=${'stack' + (sel >= 0 ? ' has-sel' : '')} style=${sel >= 0 ? '' : `height:${60 * (cards.length - 1) + 200}px`}>
      ${cards.map(([t, s2, r, tone, b], i) => {
        const isSel = sel === i, y = sel < 0 ? i * 60 : isSel ? 0 : 228 + (i - (i > sel ? 1 : 0)) * 12;
        return html`<button class=${'scard doc tone-' + tone + (isSel ? ' sel' : '')} style=${`transform:translateY(${y}px)${sel >= 0 && !isSel ? ' scale(' + (1 - .02 * (cards.length - 1 - (i - (i > sel ? 1 : 0)))) + ')' : ''};z-index:${isSel ? 50 : i + 1};transition-delay:${isSel ? 0 : i * 30}ms`}
          onClick=${() => isSel ? c.go(r) : setSel(i)}>${ROSETTE}
          <div class="d-top"><span class="sc-t">${t}</span>${b ? html`<span class="d-chip">${b}</span>` : html`<i class="flag"></i>`}</div>
          <div class="sc-s">${s2}</div>
          <div class="d-bot"><span class="d-rp"><i class="flag"></i>Rzeczpospolita Polska</span><span class="d-chip">Otwórz</span></div>
        </button>`;
      })}
    </div>
    ${sel >= 0 && html`<div style="height:${228 + 12 * (cards.length - 2) + 64}px"></div><button class="pill soft wide" onClick=${() => setSel(-1)}>Pokaż wszystkie</button>`}
    <${Label} t="Pokaż tylko to, co trzeba"/>
    <div class="glist">
      <${GRow} ic="eye" t="Pokaż tylko 18+" s="Bez imienia i numeru PESEL" onClick=${() => c.go('share-min')}/>
      <${GRow} ic="pin" t="Pokaż tylko miasto" s="Bez dokładnego adresu" onClick=${() => c.go('share-min')}/>
      <${GRow} ic="list" t="Kto sprawdzał moje dane" v="4 w listopadzie" onClick=${() => c.go('access-log')}/>
    </div>
    <div class="glist" style="margin-top:12px"><button class="grow" onClick=${() => c.go('lost')}><${Lead} ic="lock"/><span class="gtx"><span class="gt red-t">Zgubiłam portfel</span><span class="gs">Zastrzeż wszystkie dokumenty naraz</span></span><span class="gch">${I('chevron', 16)}</span></button></div>
  </div>`;
}

function Safety(c) {
  const [flood, setFlood] = useState(false);
  const alarm = () => { setFlood(true); setTimeout(() => c.go('lock'), 650); };
  return html`<div>
    <h1 class="h-xl">Ochrona</h1>
    <div class=${'status' + (flood ? ' flood' : '')}>
      <div class="st-k"><span class="pulse-dot"></span>Połączono z RCB · 15:40</div>
      <div class="st-city">Kraków</div><div class="st-calm">${flood ? 'Alarm, idź do schronu' : 'Spokojnie'}</div>
      <div class="st-people">
        ${[['A', 'Ty', 'Kraków, Podgórze', 'ok'], ['Z', 'Zosia', 'Przedszkole nr 12', 'ok'], ['S', 'Tata', 'Sandomierz', 'warn']].map(([i, n, p, st]) => html`<button class="st-p" onClick=${() => c.go('family-map')}><${Av} i=${i} size=${28}/><span class="gtx"><span class="gt">${n}</span><span class="gs">${p}</span></span><i class=${'sdot ' + st}></i></button>`)}
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
      ${[['bell', 'Test syren w Krakowie, 1 grudnia, 12:00', 'RCB · wczoraj'], ['sun', 'Silny wiatr w Sandomierzu, 2. stopień', 'IMGW · 14:20'], ['wifi', 'Wisła: więcej wody, domom nic nie grozi', 'RSO · 11:02']].map(([ic, t, s2]) =>
        html`<${GRow} ic=${ic} t=${t} s=${s2} onClick=${() => c.go('places')}/>`)}
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
