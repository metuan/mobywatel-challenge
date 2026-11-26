/* ---------- Live notifications on the lock screen (iOS-style), and the family map ---------- */
const AppIcon = ({ k }) => k === 'rcb' ? html`<span class="nicon" style="background:#d42a3e;color:#fff">${I('bell', 15)}</span>`
  : k === 'imgw' ? html`<span class="nicon" style="background:#2b6cb0;color:#fff">${I('sun', 15)}</span>`
  : html`<span class="nicon mob"><span class="flag" style="width:16px;height:11px"></span></span>`;

const NOTES = [
  { at: 1, k: 'imgw', app: 'IMGW', tm: '15:20', t: 'Sandomierz · miejsce taty', b: 'Ostrzeżenie 2. stopnia: silny wiatr do 90 km/h, od 20:00.' },
  { at: 2, k: 'rcb', app: 'ALERT RCB · ALERT EKSTREMALNY', tm: '15:42', t: 'Alarm powietrzny: Kraków', b: 'Alert RCB! Alarm powietrzny w Krakowie. Idź do najbliższego schronu albo ukrycia.', go: 'alert-red', big: true },
  { at: 4, k: 'mob', app: 'mObywatel', tm: '15:45', t: 'Zosia jest w schronie', b: 'Przedszkole nr 12 potwierdziło: wszystkie dzieci w schronie przy ul. Limanowskiego.', go: 'family-map' },
  { at: 5, k: 'mob', app: 'mObywatel', tm: '15:46', t: 'Tomasz: jestem bezpieczny', b: 'Katowice, biuro. Poza strefą alarmu.', go: 'alert-safe' },
  { at: 6, k: 'mob', app: 'mObywatel', tm: '15:43', t: 'Tata jeszcze nie odpowiedział', b: 'Sandomierz jest poza strefą alarmu. Zadzwonić?', go: 'easy-call', act: 'Zadzwoń' }
];

function useTicker(max, ms) {
  const [n, setN] = useState(0);
  useEffect(() => { if (n >= max) return; const t = setTimeout(() => setN(n + 1), n === 0 ? 500 : ms); return () => clearTimeout(t); }, [n]);
  return [n, () => setN(0)];
}

function Fam({ who, st, tone }) {
  const p = { anna: ['AN', '#22408f', 'Ty'], zosia: ['ZN', '#b0533f', 'Zosia'], tomasz: ['TN', '#3d5a80', 'Tomasz'], tata: ['SN', '#1c7a4c', 'Tata'] }[who];
  return html`<div class="lfam"><span class="av" style=${'background:' + p[1]}>${p[0]}<i class=${'st ' + tone}></i></span><span class="nm">${p[2]}</span><span class="ss">${st}</span></div>`;
}

function Lock(c) {
  const [n, replay] = useTicker(6, 1700);
  const shown = NOTES.filter(x => x.at <= n).reverse();
  const live = n >= 3;
  const sec = n >= 3 ? (n - 2) * 47 + 12 : 0;
  return html`<div class="lock" role="region" aria-label="Ekran blokady z powiadomieniami">
    <svg class="skyline" viewBox="0 0 390 160" preserveAspectRatio="none" aria-hidden="true"><path d="M0 160V112h22v-14h14v14h20V96l8-10 8 10v16h18V80h6V64l4-8 4 8v16h6v32h22v-20h30v20h16V90l12-12 12 12v22h20V100h14v-8h10v8h12v12h24V94h8V76l6-10 6 10v18h8v18h22v-16h26v16h18v48z" fill="rgba(0,0,0,.28)"/></svg>
    <div class="lk-top"><span>${I('lock', 14)}</span><div class="lk-clock">${n >= 2 ? '15:43' : '15:41'}</div><div class="lk-date">wtorek, 24 listopada</div></div>
    ${live && html`<button class="live" onClick=${() => c.go('family-map')}>
      <div class="lv-h"><span class="lv-dot"></span><b>Alarm powietrzny · Kraków</b><span class="lv-t">${String(Math.floor(sec / 60)).padStart(2, '0')}:${String(sec % 60).padStart(2, '0')}</span></div>
      <div class="lv-fam">
        <${Fam} who="anna" st="Schron" tone="ok"/>
        <${Fam} who="zosia" st=${n >= 4 ? 'Schron' : '…'} tone=${n >= 4 ? 'ok' : 'wait'}/>
        <${Fam} who="tomasz" st=${n >= 5 ? 'Bezpieczny' : '…'} tone=${n >= 5 ? 'ok' : 'wait'}/>
        <${Fam} who="tata" st=${n >= 6 ? 'Brak odp.' : '…'} tone=${n >= 6 ? 'warn' : 'wait'}/>
      </div>
      <div class="lv-bar"><i style=${'width:' + (25 + (n >= 4 ? 25 : 0) + (n >= 5 ? 25 : 0)) + '%'}></i></div>
      <div class="lv-f">${n >= 5 ? '3 z 4 osób bezpiecznych' : 'Zbieramy status rodziny…'} · stuknij, aby zobaczyć mapę</div>
    </button>`}
    <div class="nstack">${shown.slice(0, 3).map(x => html`<button key=${x.tm} class=${'notif' + (x.big ? ' big' : '')} onClick=${() => x.go && c.go(x.go)}>
      <div class="nh"><${AppIcon} k=${x.k}/><span class="na">${x.app}</span><span class="nt">${x.tm}</span></div>
      <div class="ntt">${x.t}</div><div class="nb">${x.b}</div>
      ${x.act && html`<div class="nact"><span>${I('phone', 14)} ${x.act}</span></div>`}
    </button>`)}${shown.length > 3 && html`<div class="nmore">i ${shown.length - 3} ${shown.length - 3 === 1 ? 'starsze powiadomienie' : 'starsze powiadomienia'}</div>`}</div>
    <div style="flex:1"></div>
    <div class="lk-foot">
      <button class="lk-btn" onClick=${replay}>${I('route', 15)} Odtwórz od nowa</button>
      <button class="lk-btn" onClick=${() => c.go('alert-red')}>Otwórz aplikację</button>
    </div>
  </div>`;
}

function FamilyMap(c) {
  return html`<div>
    <span class="pill p-red" style="margin-top:8px">Alert RCB trwa · Kraków</span>
    <h1 class="h-l">Gdzie jest rodzina</h1>
    <div class="map" style="position:relative">
      <svg viewBox="0 0 350 260" width="100%" role="img" aria-label="Mapa: położenie rodziny">
        <rect width="350" height="260" fill="#eef0ea"/>
        <path d="M-10 180C60 150 120 200 190 170S300 120 360 140" stroke="#cfe0f5" stroke-width="22" fill="none"/>
        <g stroke="#fff" stroke-width="9" fill="none"><path d="M0 70H350M0 230H350M80 0V260M220 0V260M300 0V260"/><path d="M0 20 350 120" stroke-width="6"/></g>
        <g fill="#e2e4dc"><rect x="96" y="84" width="108" height="56" rx="6"/><rect x="236" y="10" width="50" height="50" rx="6"/><rect x="10" y="88" width="56" height="60" rx="6"/></g>
        <circle cx="150" cy="110" r="34" fill="rgba(212,42,62,.08)" stroke="rgba(212,42,62,.35)" stroke-dasharray="3 4"/>
        <g class="mpin" transform="translate(150 110)"><circle r="15" fill="#22408f" stroke="#fff" stroke-width="3"/><text y="4" text-anchor="middle" font-size="10" font-weight="700" fill="#fff" font-family="Inter">AN</text></g>
        <g class="mpin" style="animation-delay:.12s" transform="translate(262 205)"><circle r="15" fill="#b0533f" stroke="#fff" stroke-width="3"/><text y="4" text-anchor="middle" font-size="10" font-weight="700" fill="#fff" font-family="Inter">ZN</text></g>
        <text x="150" y="142" text-anchor="middle" font-size="10.5" fill="#1b2333" font-family="Inter" font-weight="600">Schron, Dekerta 24</text>
        <text x="262" y="237" text-anchor="middle" font-size="10.5" fill="#1b2333" font-family="Inter" font-weight="600">Przedszkole nr 12</text>
        <g transform="translate(18 26)"><rect width="122" height="26" rx="13" fill="#fff" stroke="#e6e6ea"/><text x="12" y="17" font-size="11" fill="#1b2333" font-family="Inter">← Tomasz · Katowice</text></g>
        <g transform="translate(206 26)"><rect width="128" height="26" rx="13" fill="#fff" stroke="#e6e6ea"/><text x="12" y="17" font-size="11" fill="#1b2333" font-family="Inter">Tata · Sandomierz →</text></g>
      </svg>
    </div>
    <div class="list" style="margin-top:12px">
      <div class="row"><span class="face-i" style="background:#22408f">AN</span><span class="tx"><div class="t">Ty</div><div class="s">Schron, Dekerta 24 · od 15:49</div></span><span class="pill p-green">Bezpieczna</span></div>
      <div class="row"><span class="face-i" style="background:#b0533f">ZN</span><span class="tx"><div class="t">Zosia</div><div class="s">Z przedszkolem w schronie · 1,9 km od Ciebie</div></span><span class="pill p-green">Bezpieczna</span></div>
      <div class="row"><span class="face-i" style="background:#3d5a80">TN</span><span class="tx"><div class="t">Tomasz</div><div class="s">Katowice · poza strefą alarmu</div></span><span class="pill p-green">Bezpieczny</span></div>
      <div class="row"><span class="face-i" style="background:#1c7a4c">SN</span><span class="tx"><div class="t">Tata</div><div class="s">Sandomierz · poza strefą alarmu · nie odpowiada</div></span><button class="mini" onClick=${() => c.go('easy-call')}>${I('phone', 14)} Zadzwoń</button></div>
    </div>
    <div class="note" style="margin-top:12px">${I('lock', 18)}<span>Lokalizację widzi tylko rodzina i tylko w czasie alarmu. Udostępnianie wyłącza się samo po odwołaniu.</span></div>
  </div>`;
}
