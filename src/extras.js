/* ---------- Round 2: Zbliż telefony, Głos (signatures), mObywatel w Europie, Zegarek prowadzi ---------- */
const buzz = p => { try { navigator.vibrate && navigator.vibrate(p); } catch (e) {} };
const rmo = () => { try { return matchMedia('(prefers-reduced-motion: reduce)').matches; } catch (e) { return false; } };
const fire = () => setTimeout(() => window.dispatchEvent(new Event('coach')), 60);

/* Zbliż telefony: two phones meet top to top, a ripple of light passes, one haptic click */
function TapShare({ them, sub, label = 'Zbliż telefony', done, onDone }) {
  const [st, setSt] = useState(done ? 2 : 0);
  useEffect(() => {
    if (st !== 1) return;
    const a = setTimeout(() => buzz(18), rmo() ? 0 : 640);
    const b = setTimeout(() => { setSt(2); fire(); onDone && onDone(); }, rmo() ? 200 : 1900);
    return () => { clearTimeout(a); clearTimeout(b); };
  }, [st]);
  return html`<div class=${'tap8 s' + st}>
    <div class="tap-scene" aria-hidden="true">
      <div class="tp tp-them"><span class="tp-isl"></span><span class="tp-n">${them}</span></div>
      <div class="tp-wave"><i></i><i></i><i></i></div>
      <div class="tp tp-me"><span class="tp-isl"></span><span class="tp-n">Anna</span></div>
    </div>
    <div class="tap-cap">${st === 0 ? sub : st === 1 ? 'Łączenie…' : 'Gotowe. Telefony się rozpoznały.'}</div>
    ${st === 0 && html`<div class="actions"><button class="btn" onClick=${() => setSt(1)}>${label}</button></div>`}
  </div>`;
}

/* ---- Głos: signing a citizens' bill on the Rynek ---- */
const BILL = { t: 'Czyste powietrze przy szkołach', k: 'Obywatelski projekt ustawy', who: 'Komitet Inicjatywy Ustawodawczej „Oddychaj”', n: 87411, goal: 100000, left: 23 };
const fmt = n => n.toLocaleString('pl-PL').replace(/,/g, ' ');

function Sign1(c) {
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

function Sign2(c) {
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

/* rough outline of Poland, lon/lat projected into a 300x280 box */
const PL = [[14.2, 53.9], [16, 54.25], [17.5, 54.75], [18.6, 54.4], [19.6, 54.45], [22.8, 54.36], [23.5, 53.9], [23.9, 53], [23.2, 52.3], [23.6, 51.6], [24.1, 50.9], [23.5, 50.4], [22.6, 49.5], [22.9, 49.05], [22, 49.2], [20.9, 49.3], [19.8, 49.2], [19, 49.4], [18.6, 49.9], [17.7, 50.1], [16.8, 50.2], [16.4, 50.6], [15, 51], [14.8, 51.6], [14.6, 52.6], [14.2, 53.3]]
  .map(([lo, la]) => [(lo - 14) * 28.5 + 8, (54.9 - la) * 46 + 6]);
const inPL = (x, y) => { let o = false; for (let i = 0, j = PL.length - 1; i < PL.length; j = i++) { const [xi, yi] = PL[i], [xj, yj] = PL[j]; if ((yi > y) !== (yj > y) && x < (xj - xi) * (y - yi) / (yj - yi) + xi) o = !o; } return o; };
const DOTS = (() => { const d = []; let s = 7; const r = () => (s = (s * 9301 + 49297) % 233280) / 233280; while (d.length < 150) { const x = r() * 300, y = r() * 280; if (inPL(x, y)) d.push([x, y, r()]); } return d; })();
const KRK = [(19.94 - 14) * 28.5 + 8, (54.9 - 50.06) * 46 + 6];

function Sign3(c) {
  const [n, setN] = useState(BILL.n);
  useEffect(() => { const t = setTimeout(() => { setN(BILL.n + 1); buzz(10); }, rmo() ? 0 : 1100); return () => clearTimeout(t); }, []);
  const lit = n > BILL.n;
  return html`<div>
    <p class="stepk">Głos · podpisano</p>
    <div class="pl-map">
      <svg viewBox="0 0 300 280" role="img" aria-label="Mapa Polski z podpisami">
        <path d=${'M' + PL.map(p => p.map(v => v.toFixed(1)).join(' ')).join('L') + 'Z'} fill="#fff" stroke="var(--hair-2)" stroke-width="1"/>
        ${DOTS.map(([x, y, k]) => html`<circle cx=${x} cy=${y} r=${1.6 + k * 1.4} fill="var(--ink)" opacity=${.18 + k * .3}/>`)}
        <g class=${'me-dot' + (lit ? ' on' : '')} transform=${`translate(${KRK[0]} ${KRK[1]})`}>
          <circle class="md-ring" r="6" fill="none" stroke="#2F6BFF" stroke-width="2"/>
          <circle class="md-core" r="4.5" fill="#2F6BFF"/>
        </g>
      </svg>
      <div class="pl-tag" style=${`left:${KRK[0] / 3}%;top:${KRK[1] / 2.8}%`}>${lit ? 'Twój podpis · Kraków' : ''}</div>
    </div>
    <div class="pl-count"><b key=${n}>${fmt(n)}</b><span>z ${fmt(BILL.goal)} · zostało ${BILL.left} dni</span></div>
    <div class="b8-bar big"><i style=${`width:${n / BILL.goal * 100}%`}></i></div>
    <div class="note" style="margin-top:14px">${I('shield', 18)}<span>Komitet widzi tylko: „1 ważny podpis, Kraków”. Na papierze Twoje imię, PESEL i adres leżałyby na podkładce dla każdego, kto zrobi zdjęcie.</span></div>
    <div class="actions"><button class="btn" onClick=${() => c.go('sign-list')}>Moje podpisy</button></div>
  </div>`;
}

function SignList(c) {
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

function EasySign(c) {
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

/* ---- mObywatel w Europie ---- */
function EuWallet(c) {
  const [side, setSide] = useState(0);
  const [sent, setSent] = useState(false);
  useEffect(() => { const t = setTimeout(() => setSide(1), rmo() ? 0 : 700); return () => clearTimeout(t); }, []);
  const stars = Array.from({ length: 12 }, (_, i) => { const a = i / 12 * Math.PI * 2; return [50 + Math.cos(a) * 30, 50 + Math.sin(a) * 30]; });
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

/* ---- Zegarek prowadzi: the shelter card becomes a watch face ---- */
const LEGS = [
  { a: 0, d: 240, t: 'Prosto ulicą Długą' },
  { a: 90, d: 140, t: 'W prawo w Dekerta', taps: 3, side: 'r' },
  { a: -90, d: 40, t: 'W lewo, do bramy nr 24', taps: 2, side: 'l' },
  { end: true }
];
function AlertWatch(c) {
  const [k, setK] = useState(0);
  const [dist, setDist] = useState(240);
  const [ping, setPing] = useState(0);
  const face = useRef(null), root = useRef(null);
  /* shared-element morph from the red shelter card */
  (htmPreact.useLayoutEffect || useEffect)(() => {
    const f = face.current, from = window.__morph; window.__morph = null;
    if (!f || !from || rmo()) return;
    const ph = document.querySelector('.phone'); const pr = ph.getBoundingClientRect(); const sx = pr.width / ph.offsetWidth || 1;
    const to = f.getBoundingClientRect();
    const dx = ((from.left + from.width / 2) - (to.left + to.width / 2)) / sx, dy = ((from.top + from.height / 2) - (to.top + to.height / 2)) / sx;
    f.animate([{ transform: `translate(${dx}px,${dy}px) scale(${from.width / to.width},${from.height / to.height})`, borderRadius: '18px', background: '#fff' }, { transform: 'none', borderRadius: '50%', background: '#050608' }], { duration: 620, easing: 'cubic-bezier(.32,.72,0,1)' });
  }, []);
  useEffect(() => {
    if (k >= LEGS.length - 1) return;
    const leg = LEGS[k];
    if (leg.taps) { setPing(p => p + 1); buzz(Array.from({ length: leg.taps * 2 - 1 }, (_, i) => i % 2 ? 90 : 45)); }
    const end = LEGS[k + 1].d || 0;
    const tick = setInterval(() => setDist(d => Math.max(end, d - 5)), 2300 / Math.max(1, (leg.d - end) / 5));
    const nx = setTimeout(() => { setK(k + 1); if (k + 1 === LEGS.length - 1) { setDist(0); buzz([60, 60, 200]); fire(); } }, k === 0 ? 2600 : 2400);
    return () => { clearInterval(tick); clearTimeout(nx); };
  }, [k]);
  const leg = LEGS[k], arrived = !!leg.end;
  const prog = arrived ? 1 : 1 - dist / 240;
  const C = 2 * Math.PI * 104;
  const open = () => {
    const f = face.current;
    if (!f || rmo()) { c.go('alert-guide'); return; }
    root.current && root.current.classList.add('leaving');
    f.animate([{ transform: 'none', borderRadius: '50%' }, { transform: 'scale(4.2)', borderRadius: '30%' }], { duration: 420, easing: 'cubic-bezier(.32,.72,0,1)', fill: 'forwards' });
    setTimeout(() => c.go('alert-guide'), 360);
  };
  return html`<div class="wt8" ref=${root} role="region" aria-label="Zegarek prowadzi do schronienia">
    <div class="wt-cap"><span class="wt-pocket">${I('phone', 16)}</span>Telefon w kieszeni. Prowadzi zegarek.</div>
    <div class="wt-stage">
      <div class="wt-strap top"></div><div class="wt-strap bot"></div>
      <div class="wt-case"><span class="wt-crown"></span>
        <div class="wt-face" ref=${face}>
          <svg class="wt-ring" viewBox="0 0 220 220" aria-hidden="true"><circle cx="110" cy="110" r="104" stroke="rgba(255,255,255,.1)" stroke-width="7" fill="none"/>
            <circle cx="110" cy="110" r="104" stroke="#E0263F" stroke-width="7" fill="none" stroke-linecap="round" stroke-dasharray=${C} stroke-dashoffset=${C * (1 - prog)} transform="rotate(-90 110 110)" class="wt-prog"/></svg>
          ${arrived ? html`<div class="wt-in done"><span class="wt-ok">${I('check', 40)}</span><b>Jesteś w schronie</b><small>Dekerta 24 · poziom -1</small></div>`
            : html`<div class="wt-in"><span class="wt-arrow" style=${`transform:rotate(${leg.a}deg)`}><svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20V5M5.5 11.5 12 5l6.5 6.5"/></svg></span>
              <b class="wt-d">${dist} m</b><small>${leg.t}</small></div>`}
        </div>
      </div>
      ${leg.taps && html`<div key=${ping} class=${'wt-hap ' + leg.side}><i></i><i></i><span>${Array.from({ length: leg.taps }, () => 'stuk').join(' · ')}</span></div>`}
    </div>
    <div class="wt-legend">${arrived ? 'Zegarek stuknął trzy razy długo: jesteś na miejscu.' : 'Dwa stuknięcia: w lewo. Trzy: w prawo. Bez patrzenia na ekran.'}</div>
    <div style="flex:1"></div>
    ${arrived && html`<div class="actions"><button class="btn" onClick=${open}>Otwórz w telefonie</button></div>`}
  </div>`;
}
