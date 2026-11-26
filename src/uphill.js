/* ===== Uphill pass (26 Nov): one improvement per hop. Later declarations replace earlier ones. ===== */
Object.assign(P, {
  search: 'M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14zM20 20l-4.2-4.2',
  mute: 'M12 4a3 3 0 0 0-3 3v5a3 3 0 0 0 6 0V7a3 3 0 0 0-3-3zM5 11a7 7 0 0 0 14 0M12 18v3M4 4l16 16',
  grid: 'M6 6h.01M12 6h.01M18 6h.01M6 12h.01M12 12h.01M18 12h.01M6 18h.01M12 18h.01M18 18h.01',
  archive: 'M3 6h18v4H3zM5 10v9h14v-9M10 14h4',
  undo: 'M9 14 4 9l5-5M4 9h11a5 5 0 0 1 0 10h-3',
  pharm: 'M10 4h4v6h6v4h-6v6h-4v-6H4v-4h6z',
  sync: 'M20 11a8 8 0 0 0-14.5-4.5M4 4v4h4M4 13a8 8 0 0 0 14.5 4.5M20 20v-4h-4',
  inbox: 'M3 13l3-8h12l3 8v6H3zM3 13h5l1 3h6l1-3h5',
  call: 'M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z',
  card2: 'M3 6h18v12H3zM3 10h18M7 15h4',
  blik: 'M4 5h16v14H4zM8 9v6M12 9v6M16 9v6'
});
const wait = ms => new Promise(r => setTimeout(r, ms));

/* Hop 4: consents as a trust ledger with undo */
const CONS0 = [
  { k: 'tomasz', who: 'Tomasz Nowicki', av: 'T', what: 'Terminy rodziny, sprawy dzieci', until: 'Bez końca', left: null, group: 'Rodzina' },
  { k: 'tata', who: 'Ty pomagasz tacie', av: 'S', what: 'Terminy, pisma, przygotowanie wniosków', until: 'Do 24.11.2027', left: 365, group: 'Rodzina' },
  { k: 'mem', who: 'Pamięć asystenta', ic: 'sparkle', what: 'Pamięta Twoje sprawy przez 30 dni', until: 'Do 24.12.2026', left: 30, group: 'Aplikacja', ai: true },
  { k: 'bank', who: 'Bank Pekao S.A.', ic: 'key', what: 'Sprawdził Twoją tożsamość jeden raz', until: 'Wygasła 18.11', left: 0, group: 'Firmy' }
];
function Consents(c) {
  const [list, setList] = useState(c.s.cons || CONS0);
  const save = l => { setList(l); c.set({ cons: l }); };
  const revoke = x => { const prev = list; save(list.filter(y => y.k !== x.k)); c.toast({ t: 'Cofnięto: ' + x.who, undo: () => save(prev) }); };
  const groups = [...new Set(list.map(x => x.group))];
  const active = list.filter(x => x.left !== 0).length;
  return html`<div class="cons">
    <h1 class="h-l">Moje zgody</h1>
    <div class="cons-sum"><div><b><${Num} v=${active}/></b><span>${active === 1 ? 'aktywna zgoda' : active < 5 ? 'aktywne zgody' : 'aktywnych zgód'}</span></div>
      <p>Każdą zgodę cofniesz jednym ruchem. Działa od razu, a przez chwilę możesz to odwołać.</p></div>
    ${groups.map(g => html`<${Label} t=${g}/><div class="glist">${list.filter(x => x.group === g).map(x => html`<div class="cons-row" key=${x.k}>
      ${x.av ? html`<${Av} i=${x.av} size=${36}/>` : html`<span class="lead-i">${I(x.ic, 18)}</span>`}
      <span class="cr-tx"><span class="gt">${x.who}${x.ai && html` <span class="tag-a sm">AI</span>`}</span><span class="gs">${x.what}</span>
        <span class="cr-until ${x.left === 0 ? 'off' : ''}">${x.left === 0 ? 'Wygasła' : x.until}${x.left ? html`<i class="cr-bar"><i style=${`width:${Math.min(100, x.left / 3.65)}%`}></i></i>` : ''}</span></span>
      <button class="mini" onClick=${e => { const row = e.currentTarget.closest('.cons-row'); collapseOut(row, () => revoke(x)); }}>${x.left === 0 ? 'Usuń' : 'Cofnij'}</button></div>`)}</div>`)}
    ${!list.length && html`<div class="empty8">${I('check', 22)}<b>Nikt nie ma dostępu do Twoich danych.</b><span>Zgody pojawią się tu, gdy ich udzielisz.</span></div>`}
  </div>`;
}

/* Hop 5: a real call screen */
function EasyCall(c) {
  const who = c.s.persona === 'tata' ? 'Anna' : 'Tata';
  const [t, setT] = useState(-1); const [mute, setMute] = useState(false); const [spk, setSpk] = useState(false);
  useEffect(() => { const a = setTimeout(() => setT(0), 2200); return () => clearTimeout(a); }, []);
  useEffect(() => { if (t < 0) return; const a = setTimeout(() => setT(t + 1), 1000); return () => clearTimeout(a); }, [t]);
  const mm = t < 0 ? 'Łączę…' : `${String(Math.floor(t / 60)).padStart(2, '0')}:${String(t % 60).padStart(2, '0')}`;
  return html`<div class="call8 ${t >= 0 ? 'on' : ''}">
    <div class="call-av"><i></i><i></i><${Av} i=${who[0]} size=${108}/></div>
    <div class="call-n">${who === 'Anna' ? 'Anna, córka' : 'Tata'}</div>
    <div class="call-t">${mm}</div>
    ${t >= 2 && html`<div class="call-note">${I('sparkle', 14)} Anna widzi, że oglądasz ekran z dowodem. Może Ci pomóc krok po kroku.</div>`}
    <div class="call-keys">
      <button class=${mute ? 'on' : ''} onClick=${() => setMute(!mute)}><span>${I('mute', 26)}</span>Wycisz</button>
      <button onClick=${() => c.toast('Klawiatura')}><span>${I('grid', 26)}</span>Klawiatura</button>
      <button class=${spk ? 'on' : ''} onClick=${() => setSpk(!spk)}><span>${I('speaker', 26)}</span>Głośnik</button>
    </div>
    <button class="call-end" aria-label="Rozłącz" onClick=${() => { c.toast(t >= 0 ? `Rozmowa trwała ${mm}` : 'Połączenie przerwane'); c.back(); }}>${I('call', 30)}</button>
  </div>`;
}

/* Hop 6: voice with a live waveform and words appearing as they are heard */
function EasyVoice(c) {
  const Q = 'Kiedy kończy mi się dowód?'.split(' ');
  const [n, setN] = useState(0); const [done, setDone] = useState(false);
  useEffect(() => { if (n < Q.length) { const a = setTimeout(() => setN(n + 1), n ? 340 : 900); return () => clearTimeout(a); } const b = setTimeout(() => setDone(true), 700); return () => clearTimeout(b); }, [n]);
  return html`<div class="easy voice8">
    <div class=${'wave ' + (done ? 'stop' : '')}>${Array.from({ length: 28 }, (_, i) => html`<i style=${`--d:${(i * 73) % 600}ms;--h:${18 + ((i * 37) % 46)}px`}></i>`)}</div>
    <p class="v-q">${n ? html`„${Q.slice(0, n).join(' ')}${n === Q.length ? '”' : ''}` : html`<span class="v-hint">Słucham. Mów spokojnie.</span>`}</p>
    ${done && html`<div class="card v-a" style="padding:20px;font-size:20px;line-height:1.5">Pana dowód jest ważny do <b>26 stycznia 2027</b>, czyli jeszcze 63 dni. Anna może pomóc złożyć wniosek o nowy.
      <div class="actions"><button class="speak" onClick=${() => c.toast('Czytam na głos…')}>${I('speaker', 22)} Przeczytaj jeszcze raz</button><button class="btn bigbtn" onClick=${() => c.go('easy-doc')}>Pokaż mój dowód</button></div></div>`}
  </div>`;
}

/* Hop 7: prescriptions as pharmacy-ready codes */
function EasyRx(c) {
  const [open, setOpen] = useState(null);
  const RX = [['Bisoprolol 5 mg', '7731', 'Na serce, 1 rano', 18], ['Atorwastatyna 20 mg', '2290', 'Na cholesterol, 1 wieczorem', 26]];
  return html`<div class="easy"><h1 class="h-l" style="font-size:34px;line-height:1.1">Pana recepty</h1>
    <p class="lead" style="font-size:18px">Dotknij recepty i pokaż ekran w aptece.</p>
    <div class="rx8">${RX.map(([t, k, how, d], i) => html`<button class=${'rx ' + (open === i ? 'open' : '')} onClick=${() => setOpen(open === i ? null : i)}>
      <span class="rx-h"><span class="rx-ic">${I('pharm', 22)}</span><span><b>${t}</b><small>${how}</small></span></span>
      <span class="rx-code"><small>Kod recepty</small><b>${k.split('').join(' ')}</b><small>PESEL 520103•••••</small></span>
      <span class="rx-f"><span>Ważna jeszcze ${d} dni</span><span>${open === i ? 'Schowaj' : 'Pokaż w aptece'}</span></span></button>`)}</div>
    <div class="actions"><button class="btn ghost bigbtn" onClick=${() => c.go('easy')}>Wróć</button></div></div>`;
}

/* Hop 8: 800+ with a payment history and countdown */
function P800(c) {
  const M = ['cze', 'lip', 'sie', 'wrz', 'paź', 'lis', 'gru', 'sty', 'lut', 'mar', 'kwi', 'maj'];
  return html`<div class="p8">
    <p class="stepk">Świadczenie dla Zosi</p><h1 class="h-l">800+</h1>
    <div class="p8-hero"><${Ring} v=${26} max=${30} size=${76} w=${4}><b>2</b><small>dni</small></${Ring}>
      <div><div class="gs">Następna wypłata</div><div class="p8-v">800 zł</div><div class="gs">28 listopada · konto •• 4821</div></div></div>
    <${Label} t="Wypłaty od czerwca 2026 do maja 2027"/>
    <div class="card p8-chart">
      <div class="bars">${M.map((m, i) => html`<span class=${i < 5 ? 'paid' : i === 5 ? 'next' : ''}><i style=${`--i:${i}`}></i><small>${m}</small></span>`)}</div>
      <div class="p8-sum"><span><b>4 000 zł</b> wypłacone</span><span>5 z 12</span></div>
    </div>
    ${c.s.babyDone ? html`<${Label} t="Julia"/><div class="glist"><${GRow} ic="baby" t="Wniosek w ZUS" s="Decyzja do 24 grudnia" v="W toku"/></div>`
      : html`<div class="glist" style="margin-top:12px"><${GRow} ic="baby" t="Urodziło się dziecko?" s="Wniosek o 800+ złożysz w pakiecie „Nowe dziecko”" onClick=${() => c.go('baby-1')}/></div>`}
    <p class="tiny" style="margin-top:12px">Nie musisz logować się do ZUS ani do banku.</p></div>`;
}

/* Hop 9: vaccinations as a timeline */
function Vacc(c) {
  const V = [['6 lat', 'MMR, dawka 2', 'Zalecane do 31 grudnia', 'due'], ['6 lat', 'DTaP, dawka 5', 'Wykonane 12 września 2026', 'ok'], ['6 lat', 'Polio, dawka 4', 'Wykonane 12 września 2026', 'ok'], ['14 lat', 'HPV', 'Za 8 lat, przypomnimy', 'later'], ['19 lat', 'Td, przypominająca', 'Za 13 lat', 'later']];
  return html`<div><p class="stepk">Zosia, 6 lat</p><h1 class="h-l">Szczepienia</h1>
    <div class="vt">${V.map(([age, t, s, st]) => html`<div class=${'vt-i ' + st}><span class="vt-dot">${st === 'ok' ? I('check', 12) : ''}</span>
      <div class="vt-b"><div class="gt">${t}</div><div class="gs">${s}</div>${st === 'due' && html`<button class="pill" style="margin-top:10px" onClick=${() => c.go('visit-1')}>Umów szczepienie</button>`}</div><span class="vt-age">${age}</span></div>`)}</div>
    <p class="tiny">Z Internetowego Konta Pacjenta. Oboje rodzice widzą to samo.</p></div>`;
}

/* Hop 10: the explanation streams in, so the AI step feels like work, not magic */
function Letter2(c) {
  const [k, setK] = useState(c.s.l2seen ? 4 : 0);
  useEffect(() => { if (k >= 4) { c.s.l2seen || c.set({ l2seen: true }); setTimeout(() => window.dispatchEvent(new Event('coach')), 60); return; } const a = setTimeout(() => setK(k + 1), k ? 520 : 900); return () => clearTimeout(a); }, [k]);
  const F = [['Co to znaczy', 'To nie kara. Urząd chce wiedzieć, dlaczego zmieniłaś zeznanie za 2025 rok i zwrot wzrósł o 1 240 zł.'], ['Termin', '7 grudnia 2026 (14 dni od dnia, w którym dostałaś pismo)'], ['Co zrobić', 'Wyślij krótkie wyjaśnienie i zaświadczenie o uldze na dziecko.']];
  return html`<div>
    <p class="stepk">Wyjaśnienie pisma</p>
    <h1 class="h-l">Urząd skarbowy prosi o wyjaśnienie korekty PIT-37.</h1>
    ${k < 4 && html`<div class="ai-work">${I('sparkle', 14)} <span>${['Czytam pismo…', 'Szukam przepisu…', 'Sprawdzam termin…', 'Piszę prostym językiem…'][k]}</span></div>`}
    <div class="list">${F.map(([l, v], i) => html`<div class="field"><div class="l">${l}</div>${i < k ? html`<div class="v in">${v}</div>` : html`<div class="skel"><i></i><i></i></div>`}</div>`)}</div>
    ${k >= 4 && html`<div class="msg ai in" style="max-width:100%;margin-top:12px"><span class="small">Źródła</span><div class="srcs"><span>Ordynacja podatkowa, art. 155</span><span>podatki.gov.pl: korekta zeznania</span></div></div>
    <p class="ai-warn">Asystent może się mylić. To nie jest porada prawna.</p>`}
    <div class="actions"><button class="btn" disabled=${k < 4} onClick=${() => c.go('letter-3')}>Przygotuj odpowiedź</button></div>
  </div>`;
}

/* Hop 11: one inbox for letters from every office (e-Doręczenia), swipe to archive */
const MAIL0 = [
  { k: 'us', from: 'Urząd Skarbowy Kraków-Podgórze', t: 'Wezwanie: wyjaśnienie korekty PIT-37', s: 'Odpowiedz do 7 grudnia', d: '19 lis', unread: true, r: 'letter-1', tag: 'Wymaga odpowiedzi', ai: 'Urząd pyta, dlaczego zwrot wzrósł. To nie kara.' },
  { k: 'zus', from: 'ZUS', t: 'Decyzja: 800+ na Zosię', s: 'Przyznano od czerwca 2026', d: '12 lis', unread: true, r: 'p800', ai: 'Dostajesz 800 zł co miesiąc do maja 2027.' },
  { k: 'um', from: 'Urząd Miasta Krakowa', t: 'Podatek od nieruchomości, 4. rata', s: '86 zł, termin 15 listopada', d: '2 lis', r: 'taxes' },
  { k: 'cepik', from: 'Wydział Komunikacji', t: 'Dowód rejestracyjny w produkcji', s: 'Odbiór od 2 grudnia', d: '20 lis', r: 'case-meld' },
  { k: 'nfz', from: 'NFZ', t: 'Zosia: e-skierowanie do kardiologa', s: 'Ważne do 21 listopada 2027', d: '18 lis', r: 'visit-1' }
];
function swipeRow(e, onDone) {
  const el = e.currentTarget, x0 = e.clientX; let dx = 0, on = false;
  const mv = ev => { const d = ev.clientX - x0; if (!on) { if (Math.abs(d) < 8) return; on = true; el.setPointerCapture(e.pointerId); el.classList.add('drag'); }
    dx = Math.min(0, d); el.style.transform = `translateX(${dx}px)`; el.parentElement.style.setProperty('--sw', Math.min(1, -dx / 120)); };
  const up = () => { el.removeEventListener('pointermove', mv); el.removeEventListener('pointerup', up); el.removeEventListener('pointercancel', up); if (!on) return; el.classList.remove('drag');
    if (dx < -110) { el.style.transform = 'translateX(-110%)'; setTimeout(onDone, 200); } else { el.style.transform = ''; el.parentElement.style.setProperty('--sw', 0); }
    el.dataset.swiped = '1'; setTimeout(() => delete el.dataset.swiped, 50); };
  el.addEventListener('pointermove', mv); el.addEventListener('pointerup', up); el.addEventListener('pointercancel', up);
}
function Inbox(c) {
  const [list, setList] = useState(c.s.mail || MAIL0);
  const [f, setF] = useState('all');
  const save = l => { setList(l); c.set({ mail: l, inboxNew: l.filter(x => x.unread).length }); };
  const arch = x => { const prev = list; save(list.filter(y => y.k !== x.k)); c.toast({ t: 'Przeniesiono do archiwum', undo: () => save(prev) }); };
  const open = (e, x) => { if (e.currentTarget.dataset.swiped) return; save(list.map(y => y.k === x.k ? { ...y, unread: false } : y)); c.go(x.r); };
  const shown = list.filter(x => f === 'all' || x.unread);
  return html`<div class="inbox8">
    <h1 class="h-l">Skrzynka</h1>
    <p class="lead" style="margin-bottom:12px">Pisma ze wszystkich urzędów w jednym miejscu. Pod każdym krótkie wyjaśnienie.</p>
    <div class="seg8">${[['all', 'Wszystkie'], ['new', `Nieprzeczytane${list.some(x => x.unread) ? ' · ' + list.filter(x => x.unread).length : ''}`]].map(([k, t]) => html`<button aria-pressed=${f === k} onClick=${() => setF(k)}>${t}</button>`)}</div>
    <div class="mail">${shown.map(x => html`<div class="mail-w" key=${x.k}><span class="mail-bg">${I('archive', 20)}<span>Archiwum</span></span>
      <button class=${'mail-i' + (x.unread ? ' new' : '')} onPointerDown=${e => swipeRow(e, () => arch(x))} onClick=${e => open(e, x)}>
        <span class="mail-top"><span class="mail-from">${x.unread && html`<i class="udot"></i>`}${x.from}</span><span class="mail-d">${x.d}</span></span>
        <span class="mail-t">${x.t}</span><span class="mail-s">${x.s}</span>
        ${x.ai && html`<span class="mail-ai"><span class="tag-a sm">AI</span> ${x.ai}</span>`}
        ${x.tag && html`<span class="pill p-red" style="margin-top:8px;align-self:flex-start">${x.tag}</span>`}</button></div>`)}
      ${!shown.length && html`<div class="empty8">${I('check', 22)}<b>Wszystko przeczytane.</b><span>Nowe pisma pojawią się tutaj i w powiadomieniach.</span></div>`}</div>
    <p class="tiny" style="margin-top:12px">Przesuń pismo w lewo, żeby je zarchiwizować.</p>
  </div>`;
}

/* Hop 12: search that answers while you type */
const IDX = [['Przeprowadzka', 'Zameldowanie, lekarz, wybory, auto', 'move-1', 'move'], ['Nowe dziecko', 'Akt, PESEL, 800+, NFZ', 'baby-1', 'baby'], ['Dowód osobisty', 'Mój dowód i kod QR', 'doc-id', 'card'],
  ['Pokaż, że masz 18 lat', 'Bez imienia i adresu', 'share-min', 'eye'], ['Sprzedaż auta', 'Zgłoszenie i OC', 'car-sell', 'car'], ['Mój samochód', 'OC, przegląd, punkty, mandaty', 'car', 'car'],
  ['Kardiolog dla Zosi', 'e-Skierowanie i wolne terminy', 'visit-1', 'steth'], ['Szczepienia Zosi', 'Kalendarz szczepień', 'vacc', 'steth'], ['800+', 'Wypłaty i wnioski', 'p800', 'coin'],
  ['Podatki', 'e-PIT, zwrot, opłaty lokalne', 'taxes', 'coin'], ['Pismo z urzędu', 'Zrób zdjęcie, wyjaśnimy', 'letter-1', 'letter'], ['Skrzynka', 'Pisma ze wszystkich urzędów', 'inbox', 'inbox'],
  ['Najbliższy schron', 'Trasa bez internetu', 'alert-shelter', 'route'], ['Karta ratunkowa', 'Grupa krwi, alergie', 'ice', 'heart'], ['Zgubiony portfel', 'Zastrzeż wszystko naraz', 'lost', 'lock'],
  ['Kto sprawdzał moje dane', 'Historia dostępu', 'access-log', 'eye'], ['Moje zgody', 'Rodzina, firmy, asystent', 'consents', 'key'], ['Paszport Zosi', 'Zgoda obojga rodziców', 'renew-pass', 'card'],
  ['Podpisz projekt ustawy', 'Petycje i komitety', 'sign-1', 'doc'], ['Za granicą', 'Portfel UE', 'eu', 'card'], ['Kto do mnie dzwoni?', 'Sprawdź, czy to naprawdę urząd', 'caller', 'call'],
  ['Szkoła Zosi', 'Frekwencja, zgody, oceny', 'school', 'doc'], ['Kalendarz rodziny', 'Wszystkie terminy', 'calendar', 'list']];
const norm = s => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/ł/g, 'l');
function Search({ c, ph = 'Szukaj spraw, dokumentów, pytań', auto }) {
  const [q, setQ] = useState(''); const ref = useRef(null);
  useEffect(() => { if (!auto) return; const a = setTimeout(() => ref.current && ref.current.focus(), 250); return () => clearTimeout(a); }, []);
  const hits = q.trim() ? IDX.filter(x => norm(x[0] + ' ' + x[1]).includes(norm(q.trim()))).slice(0, 5) : [];
  return html`<div class="srch8"><div class="search"><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><circle cx="11" cy="11" r="6.5"/><path d="m16 16 4.5 4.5"/></svg>
    <input ref=${ref} value=${q} onInput=${e => setQ(e.target.value)} onKeyDown=${e => e.key === 'Enter' && (hits[0] ? c.go(hits[0][2]) : c.ask(q || 'Jak zameldować się w nowym mieszkaniu?'))} placeholder=${ph} aria-label=${ph}/>
    ${q ? html`<button aria-label="Wyczyść" onClick=${() => setQ('')}>${I('x', 16)}</button>` : html`<button aria-label="Mów" onClick=${() => c.ask('Kiedy kończy się ważność mojego dowodu?')}>${I('mic', 18)}</button>`}</div>
    ${q.trim() && html`<div class="hits">${hits.map(([t, s, r, ic]) => html`<button class="hit" onClick=${() => c.go(r)}><span class="lead-i">${I(P[ic] ? ic : 'doc', 18)}</span><span class="gtx"><span class="gt">${t}</span><span class="gs">${s}</span></span></button>`)}
      <button class="hit ask" onClick=${() => c.ask(q)}><span class="lead-i ai">${I('sparkle', 18)}</span><span class="gtx"><span class="gt">Zapytaj asystenta: „${q}”</span><span class="gs">Odpowiedź z gov.pl, ze źródłami</span></span></button></div>`}</div>`;
}
function SearchScreen(c) {
  return html`<div><h1 class="h-l">Szukaj</h1><${Search} c=${c} auto/>
    <${Label} t="Często szukane"/><div class="chips wrap">${['Przeprowadzka', 'Dowód', '800+', 'Schron', 'Podatki', 'Recepta'].map(t => html`<button onClick=${() => { const h = IDX.find(x => norm(x[0] + x[1]).includes(norm(t))); h ? c.go(h[2]) : c.ask(t); }}>${t}</button>`)}</div></div>`;
}

/* Hop 13: "Kto do mnie dzwoni?" checks a caller who claims to be an office */
function Caller(c) {
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

/* Hop 19: the assistant thinks visibly, then answers word by word */
function Typed({ text, onDone }) {
  const W = text.split(' '); const [n, setN] = useState(RM() ? W.length : 0);
  useEffect(() => { if (n >= W.length) { onDone && onDone(); return; } const a = setTimeout(() => setN(n + 2), 38); return () => clearTimeout(a); }, [n]);
  return html`<span>${W.slice(0, n).map((w, i) => html`<span class="tw8" key=${i}>${w} </span>`)}</span>`;
}
function Assistant(c) {
  const [msgs, setMsgs] = useState([]);
  const [q, setQ] = useState(''); const [busy, setBusy] = useState(false);
  const endRef = useRef(null);
  const ask = text => {
    const it = INTENTS.find(i => i.k.test(text));
    const ans = it || { a: 'Na to pytanie nie mam jeszcze pewnej odpowiedzi. Zobacz informacje na gov.pl albo połącz się z konsultantem.', src: ['gov.pl'], act: ['Porozmawiaj z konsultantem', 'about'] };
    setMsgs(m => [...m, { me: text }]); setBusy(true);
    setTimeout(() => { setBusy(false); setMsgs(m => [...m, { ai: ans, typing: true }]); }, RM() ? 0 : 900);
  };
  const fin = i => setMsgs(m => m.map((x, j) => j === i ? { ...x, typing: false } : x));
  useEffect(() => { if (c.s.q) { ask(c.s.q); c.set({ q: null }); } }, []);
  useEffect(() => { endRef.current && endRef.current.scrollIntoView({ block: 'end' }); }, [msgs, busy]);
  return html`<div style="display:flex;flex-direction:column;gap:12px">
    <h1 class="h-l">Asystent</h1>
    <p class="ai-warn" style="text-align:left;margin:0">Odpowiadam na podstawie stron gov.pl i Twoich danych. Mogę się mylić. Niczego nie wysyłam bez Twojego „Potwierdź”.</p>
    ${msgs.length === 0 && html`<div class="sugs">${['Przeprowadzam się w grudniu', 'Urodziło mi się dziecko', 'Kiedy wygasa dowód taty?', 'Dostałam pismo z urzędu'].map(t => html`<button class="sug" onClick=${() => ask(t)}>${t}</button>`)}</div>`}
    <div class="chat">${msgs.map((m, i) => m.me ? html`<div class="msg me">${m.me}</div>` : html`<div class="msg ai">${m.typing ? html`<${Typed} text=${m.ai.a} onDone=${() => fin(i)}/>` : m.ai.a}
      ${!m.typing && html`<div class="srcs in">${m.ai.src.map(s => html`<span>${s}</span>`)}</div>
      ${m.ai.act && html`<button class="btn in" style="margin-top:10px;padding:11px" onClick=${() => c.go(m.ai.act[1])}>${m.ai.act[0]}</button>`}`}</div>`)}
      ${busy && html`<div class="msg ai typing"><span class="tdots"><i></i><i></i><i></i></span><span class="tw">Szukam w gov.pl…</span></div>`}</div>
    <div ref=${endRef}></div>
    <div class="askbar" style="margin-top:6px">
      <input id="ask2" value=${q} onInput=${e => setQ(e.target.value)} onKeyDown=${e => { if (e.key === 'Enter' && q) { ask(q); setQ(''); } }} placeholder="Napisz lub powiedz" aria-label="Napisz pytanie"/>
      <button class="ib" aria-label="Mów" onClick=${() => ask('Kiedy wygasa dowód taty?')}>${I('mic')}</button>
      <button class="ib go" aria-label="Wyślij" onClick=${() => { if (q) { ask(q); setQ(''); } }}>${I('send', 18)}</button>
    </div>
  </div>`;
}

/* Hop 15: text size, applied live to every screen */
const _Profile = Profile;
function TextSize(c) {
  const v = c.s.fs || 1; const steps = [.9, 1, 1.12, 1.25];
  return html`<div class="fs8"><span class="fs-a sm">A</span><div class="fs-track">${steps.map(x => html`<button aria-label=${'Rozmiar ' + x} aria-pressed=${v === x} onClick=${() => c.set({ fs: x })}><i></i></button>`)}<span class="fs-fill" style=${`width:${steps.indexOf(v) / 3 * 100}%`}></span></div><span class="fs-a lg">A</span></div>`;
}
Profile = function (c) {
  return html`<div>${_Profile(c)}<${Label} t="Wielkość tekstu"/><div class="card" style="padding:16px 18px"><${TextSize} ...${c}/><p class="tiny" style="margin:10px 0 0">Zmiana działa od razu na każdym ekranie.</p></div></div>`;
};

/* Hop 14: the Dynamic Island carries the case you are waiting for */
function Island({ c, route, full }) {
  const [open, setOpen] = useState(false);
  useEffect(() => setOpen(false), [route]);
  const s = c.s;
  if (full || s.persona === 'tata') return html`<div class="notch"></div>`;
  const a = s.visit ? { t: 'Zosia, kardiolog', s: '15 grudnia, 10:30 · Prokocim', n: 'za 19 dni', v: .2, r: 'visit-4', ic: 'steth' }
    : { t: 'Dowód rejestracyjny', s: 'W produkcji · odbiór od 2 grudnia', n: '3 z 4', v: .75, r: 'case-meld', ic: 'car' };
  return html`<button class=${'notch island' + (open ? ' open' : '')} aria-label=${'Na żywo: ' + a.t} onClick=${() => { if (open) { setOpen(false); c.go(a.r); } else setOpen(true); }}>
    <span class="is-c"><span class="is-l">${I(a.ic, 13)}</span><span class="is-r"><${Ring} v=${a.v} max=${1} size=${18} w=${2.5} color="#fff"/></span></span>
    <span class="is-x"><span class="is-ic">${I(a.ic, 20)}</span><span class="is-tx"><b>${a.t}</b><span>${a.s}</span></span><span class="is-n">${a.n}</span>
      <span class="is-bar"><i style=${`width:${a.v * 100}%`}></i></span></span></button>`;
}

/* Hop 16: swipe from the left edge to go back, like every iOS app */
function edgeBack(e, back) {
  const sc = e.currentTarget, r = sc.getBoundingClientRect();
  if (e.button > 0 || e.clientX - r.left > 22) return;
  const scr = sc.querySelector('.screen'); if (!scr) return;
  const x0 = e.clientX; let dx = 0, on = false; const W = r.width;
  const mv = ev => { const d = ev.clientX - x0; if (!on) { if (d < 8) return; on = true; sc.setPointerCapture(e.pointerId); scr.style.transition = 'none'; sc.classList.add('edge'); }
    dx = Math.max(0, d); scr.style.transform = `translateX(${dx}px)`; scr.style.boxShadow = '-12px 0 30px -12px rgba(0,0,0,.25)'; };
  const up = () => { sc.removeEventListener('pointermove', mv); sc.removeEventListener('pointerup', up); sc.removeEventListener('pointercancel', up); if (!on) return; sc.classList.remove('edge');
    if (dx > W * .33) { scr.animate([{ transform: `translateX(${dx}px)` }, { transform: `translateX(${W}px)` }], { duration: 180, easing: 'cubic-bezier(.32,.72,0,1)', fill: 'forwards' }); setTimeout(back, 170); }
    else { scr.animate([{ transform: `translateX(${dx}px)` }, { transform: 'none' }], { duration: 260, easing: 'cubic-bezier(.32,.72,0,1)' }); scr.style.transform = ''; scr.style.boxShadow = ''; } };
  sc.addEventListener('pointermove', mv); sc.addEventListener('pointerup', up); sc.addEventListener('pointercancel', up);
}

/* Hop 18: one payment sheet for every fee and fine */
const METHODS = [['blik', 'BLIK', 'Kod z aplikacji banku'], ['card2', 'Karta •• 4471', 'Zapisana w mObywatelu'], ['coin', 'Przelew z banku', 'PKO BP, Pekao, mBank i inne']];
function PaySheet({ sheet, setSheet, close }) {
  return html`<div class="pay8">
    <div class="q">Płatność przez ePłatności</div>
    <div class="pay-amt">${sheet.amt}</div>
    <div class="pay-to">${sheet.t}<br/><span>${sheet.to}</span></div>
    <div class="pay-m">${METHODS.map(([ic, t, s], i) => html`<button aria-pressed=${sheet.m === i} onClick=${() => setSheet({ ...sheet, m: i })}><span class="lead-i">${I(ic, 18)}</span><span class="gtx"><span class="gt">${t}</span><span class="gs">${s}</span></span><span class="radio"></span></button>`)}</div>
    <div class="actions row2"><button class="btn soft" onClick=${close}>Anuluj</button><button class="btn" onClick=${() => setSheet({ ...sheet, stage: 1 })}>Zapłać ${sheet.amt}</button></div>
    <p class="tiny" style="text-align:center;margin-top:10px">Potwierdzasz twarzą. Pieniądze trafiają prosto do urzędu.</p>
  </div>`;
}
function PayDone({ sheet, close }) {
  useEffect(() => { coachTip(null); const a = setTimeout(close, 2200); const k = setInterval(() => coachTip(null), 120); return () => { clearTimeout(a); clearInterval(k); }; }, []);
  return html`<div class="pay8 done"><div class="pay-ok">${I('check', 30)}</div><div class="pay-amt sm">Zapłacono ${sheet.amt}</div>
    <div class="pay-to">${sheet.t}<br/><span>Potwierdzenie jest w Skrzynce</span></div></div>`;
}
/* wire existing "Zapłać" buttons to the payment sheet */
const _CarFull = CarFull, _Taxes = Taxes;
const payWrap = (c, map) => ({ ...c, confirm: o => { const m = map(o); m ? c.pay({ ...m, done: o.done }) : c.confirm(o); } });
CarFull = function (c) { return _CarFull(payWrap(c, o => /mandat/i.test(o.t) && { amt: '200 zł', t: 'Mandat nr KR 0021934', to: 'Straż Miejska Kraków' })); };
Taxes = function (c) {
  const c2 = { ...c, set: p => { if (p && p.propPaid && !c.s.propPaid) { c.pay({ amt: '86 zł', t: 'Podatek od nieruchomości, 4. rata', to: 'Urząd Miasta Krakowa', done: () => { c.set({ propPaid: true }); c.toast('Opłacono 86 zł. Potwierdzenie w Skrzynce.'); } }); } else c.set(p); }, toast: t => /Opłacono 86/.test(t) ? null : c.toast(t) };
  return _Taxes(c2);
};

/* Hops 11–12 entry points: search and inbox at the top of Dziś */
const _Today = Today;
Today = function (c) {
  const n = c.s.mail ? c.s.mail.filter(x => x.unread).length : 2;
  /* search + inbox sit in their own row under the greeting, so nothing crowds the title (Karl, 26 Nov) */
  const bar = html`<div class="hdr9"><button class="hdr9-s" onClick=${() => c.go('search')}>${I('search', 18)}<span>Szukaj albo zapytaj</span></button>
    <button class="hdr9-i" aria-label=${'Skrzynka, nowe: ' + n} onClick=${() => c.go('inbox')}>${I('inbox', 20)}${n > 0 && html`<b><${Num} v=${n}/></b>`}</button></div>`;
  return html`<div class="tw8">${_Today({ ...c, bar })}</div>`;
};

/* ===== Comment round (26 Nov, Karl) ===== */
/* 1. One confirmation loader for the whole app: a face scan that draws, steps that tick, then a check */
function Confirming({ steps }) {
  const S = steps || ['Potwierdzam, że to Ty', 'Podpisuję', 'Wysyłam'];
  const [k, setK] = useState(RM() ? S.length : 0);
  useEffect(() => { coachTip(null); document.querySelectorAll('.coach').forEach(e => e.classList.remove('coach'));
    if (k >= S.length) return; const a = setTimeout(() => setK(k + 1), k ? 420 : 520); return () => clearTimeout(a); }, [k]);
  const done = k >= S.length;
  return html`<div class=${'conf8' + (done ? ' done' : '')} role="status" aria-live="polite">
    <div class="cf-art"><svg viewBox="0 0 64 64" width="64" height="64" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
      <path class="cf-br" d="M6 20V12a6 6 0 0 1 6-6h8M44 6h8a6 6 0 0 1 6 6v8M58 44v8a6 6 0 0 1-6 6h-8M20 58h-8a6 6 0 0 1-6-6v-8"/>
      <g class="cf-face"><path d="M23 25v4M41 25v4M32 26v9h-3M25 42c4 4 10 4 14 0"/></g>
      <path class="cf-ok" d="M20 33l8 8 16-17"/></svg><i class="cf-scan"></i></div>
    <div class="cf-steps">${S.map((t, i) => html`<div class=${'cf-s' + (i < k ? ' ok' : i === k ? ' now' : '')}><span class="cf-dot">${i < k ? I('check', 12) : ''}</span>${t}</div>`)}</div>
  </div>`;
}

/* 2. Wallet: the card you use most sits in front, fully visible, with real content */
function Docs(c) {
  const cards = [
    ['Karta ratunkowa', 'A Rh+ · penicylina', 'ice', 'other', 'A Rh+'],
    ['Dyplom magistra', 'Uniwersytet Jagielloński', 'issued', 'other', 'Nowy'],
    ['Paszport', 'Zofia Nowicka', 'renew-pass', 'pass', '41 dni'],
    ['Dowód rejestracyjny', 'Toyota Yaris · KR 4F21', 'car', 'car', 'OC 12 dni'],
    ['Prawo jazdy', 'Kat. B · do 2033', 'doc-id', 'drive', '0 pkt'],
    ['Dowód osobisty', 'Anna Nowicka', 'doc-id', 'id', 'Ważny']
  ];
  const PEEK = 52, FRONT = 196, n = cards.length;
  const [sel, setSel] = useState(-1);
  return html`<div>
    <h1 class="h-xl">Dokumenty</h1>
    <div class=${'stack w2' + (sel >= 0 ? ' has-sel' : '')} style=${sel >= 0 ? '' : `height:${PEEK * (n - 1) + FRONT}px`}>
      ${cards.map(([t, s2, r, tone, b], i) => {
        const isSel = sel === i, front = sel < 0 ? i === n - 1 : isSel;
        const y = sel < 0 ? i * PEEK : isSel ? 0 : 208 + (i - (i > sel ? 1 : 0)) * 7;
        return html`<button class=${'scard doc tone-' + tone + (isSel ? ' sel' : '') + (front ? ' front' : '')} style=${`transform:translateY(${y}px)${sel >= 0 && !isSel ? ' scale(' + (1 - .02 * (n - 1 - (i - (i > sel ? 1 : 0)))) + ')' : ''};z-index:${isSel ? 50 : i + 1};transition-delay:${isSel ? 0 : i * 25}ms`}
          onClick=${() => isSel ? c.go(r) : setSel(i)}>${ROSETTE}
          <div class="d-top"><span class="sc-t">${t}</span><span class="d-chip">${b}</span></div>
          ${front && html`<div class="w2-body"><div class="w2-name">${s2}</div><div class="w2-meta">${tone === 'id' ? 'Ważny do 12.05.2031 · nr ABC 123456' : 'Dotknij, żeby otworzyć'}</div></div>
          <div class="d-bot"><span class="d-rp"><i class="flag"></i>Rzeczpospolita Polska</span><span class="d-chip">${tone === 'id' ? 'Pokaż kod QR' : 'Otwórz'}</span></div>`}
        </button>`;
      })}
    </div>
    ${sel >= 0 && html`<div style="height:${208 + 7 * (n - 2) + 14}px"></div><div class="w2-acts"><button class="pill" onClick=${() => c.go(cards[sel][2])}>${cards[sel][3] === 'id' ? 'Pokaż kod QR' : 'Otwórz'}</button><button class="pill soft" onClick=${() => setSel(-1)}>Pokaż wszystkie</button></div>`}
    <${Label} t="Pokaż tylko to, co trzeba"/>
    <div class="glist">
      <${GRow} ic="eye" t="Pokaż tylko 18+" s="Bez imienia i numeru PESEL" onClick=${() => c.go('share-min')}/>
      <${GRow} ic="pin" t="Pokaż tylko miasto" s="Bez dokładnego adresu" onClick=${() => c.go('share-min')}/>
      <${GRow} ic="list" t="Kto sprawdzał moje dane" v="4 w listopadzie" onClick=${() => c.go('access-log')}/>
    </div>
    <div class="glist" style="margin-top:12px"><button class="grow" onClick=${() => c.go('lost')}><${Lead} ic="lock"/><span class="gtx"><span class="gt red-t">Zgubiłam portfel</span><span class="gs">Zastrzeż wszystkie dokumenty naraz</span></span><span class="gch">${I('chevron', 16)}</span></button></div>
  </div>`;
}

/* 5. Map of Poland: a real outline and a dot matrix where density shows where people signed */
const PL2 = [[14.22, 53.93], [14.6, 53.98], [15.58, 54.18], [16.4, 54.45], [17.55, 54.76], [18.33, 54.83], [18.8, 54.62], [18.45, 54.7], [18.55, 54.52], [18.65, 54.38], [19.0, 54.35], [19.63, 54.45], [20.5, 54.4], [21.5, 54.33], [22.79, 54.36], [23.2, 54.25], [23.5, 53.95], [23.9, 53.5], [23.8, 53.1], [23.6, 52.7], [23.17, 52.28], [23.55, 51.9], [23.65, 51.5], [24.12, 50.86], [23.9, 50.45], [23.5, 50.25], [22.68, 49.6], [22.85, 49.05], [22.56, 49.0], [22.0, 49.22], [21.5, 49.42], [20.9, 49.33], [20.33, 49.39], [19.95, 49.22], [19.45, 49.6], [19.0, 49.42], [18.85, 49.52], [18.58, 49.92], [17.9, 49.98], [17.65, 50.27], [17.0, 50.42], [16.9, 50.25], [16.6, 50.12], [16.3, 50.38], [16.2, 50.65], [15.4, 50.8], [14.83, 50.87], [14.98, 51.4], [14.75, 52.07], [14.55, 52.6], [14.15, 52.85], [14.4, 53.25], [14.25, 53.7]]
  .map(([lo, la]) => [(lo - 14) * 28.5 + 6, (54.95 - la) * 46 + 6]);
const inPL2 = (x, y) => { let o = false; for (let i = 0, j = PL2.length - 1; i < PL2.length; j = i++) { const [xi, yi] = PL2[i], [xj, yj] = PL2[j]; if ((yi > y) !== (yj > y) && x < (xj - xi) * (y - yi) / (yj - yi) + xi) o = !o; } return o; };
const proj = (lo, la) => [(lo - 14) * 28.5 + 6, (54.95 - la) * 46 + 6];
const CITIES = [[21.01, 52.23, 1], [19.94, 50.06, .9], [17.03, 51.11, .7], [16.93, 52.41, .6], [18.65, 54.35, .65], [19.46, 51.76, .55], [19.02, 50.26, .7], [22.57, 51.25, .4], [23.16, 53.13, .35], [21.99, 50.04, .35], [18.0, 53.12, .4]].map(([lo, la, w]) => [...proj(lo, la), w]);
const GRID = (() => { const d = []; for (let y = 6; y < 272; y += 7.2) for (let x = 6; x < 300; x += 7.2) { const xx = x + ((Math.round(y / 7.2) % 2) ? 3.6 : 0); if (!inPL2(xx, y)) continue;
  let v = .12; CITIES.forEach(([cx, cy, w]) => { const dd = Math.hypot(xx - cx, y - cy); v += w * Math.exp(-dd * dd / 520); }); d.push([xx, y, Math.min(1, v)]); } return d; })();
const KRK2 = proj(19.94, 50.06);
function Sign3(c) {
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

/* 6. Family calendar: a date tile on the left, the same shape for every row, red only for what is urgent */
function Calendar(c) {
  const items = [['28', 'lis', 'Wypłata 800+', 'Zosia', 4, 'p800'], ['6', 'gru', 'OC Toyota Yaris', 'Ty i Tomasz', 12, 'car', 1], ['15', 'gru', 'Kardiolog', 'Zosia', 21, 'visit-1'], ['31', 'gru', 'Szczepienie MMR', 'Zosia', 37, 'vacc'],
    ['4', 'sty', 'Paszport traci ważność', 'Zosia', 41, 'renew-pass'], ['26', 'sty', 'Dowód osobisty', 'Tata', 63, 'member-tata'], ['14', 'lut', 'Przegląd techniczny', 'Toyota Yaris', 82, 'car']];
  return html`<div><h1 class="h-l">Kalendarz rodziny</h1><p class="lead">Najbliższe 90 dni. Każdy termin ma następny krok.</p>
    <div class="glist cal8">${items.map(([d, m, t, w, left, r, urg]) => html`<button class=${'grow' + (urg ? ' urg' : '')} onClick=${() => c.go(r)}>
      <span class="cal-d"><b>${d}</b><small>${m}</small></span><span class="gtx"><span class="gt">${t}</span><span class="gs">${w}</span></span>
      <span class="cal-l">${left === 4 ? 'za 4 dni' : `za ${left} dni`}</span><span class="gch">${I('chevron', 16)}</span></button>`)}</div></div>`;
}

/* ===== Motion uphill (26 Nov): emil-design-eng + find-animation-opportunities ===== */
const OUT = 'cubic-bezier(.23,1,.32,1)', DRAWER = 'cubic-bezier(.32,.72,0,1)';

/* M2: removed rows collapse instead of vanishing, so the list does not jump */
function collapseOut(el, done) {
  if (!el || RM()) { done(); return; }
  const h = el.offsetHeight; el.style.overflow = 'hidden';
  el.animate([{ height: h + 'px', opacity: 1 }, { height: '0px', opacity: 0, marginTop: '0px', marginBottom: '0px', paddingTop: '0px', paddingBottom: '0px' }], { duration: 220, easing: OUT, fill: 'forwards' });
  setTimeout(done, 210);
}
function swipeRow(e, onDone) {
  const el = e.currentTarget, x0 = e.clientX; let dx = 0, on = false;
  const mv = ev => { const d = ev.clientX - x0; if (!on) { if (Math.abs(d) < 8) return; on = true; el.setPointerCapture(e.pointerId); el.classList.add('drag'); }
    dx = Math.min(0, d); el.style.transform = `translateX(${dx}px)`; el.parentElement.style.setProperty('--sw', Math.min(1, -dx / 120)); };
  const up = () => { el.removeEventListener('pointermove', mv); el.removeEventListener('pointerup', up); el.removeEventListener('pointercancel', up); if (!on) return; el.classList.remove('drag');
    if (dx < -110) { el.style.transform = 'translateX(-110%)'; setTimeout(() => collapseOut(el.parentElement, onDone), 160); } else { el.style.transform = ''; el.parentElement.style.setProperty('--sw', 0); }
    el.dataset.swiped = '1'; setTimeout(() => delete el.dataset.swiped, 50); };
  el.addEventListener('pointermove', mv); el.addEventListener('pointerup', up); el.addEventListener('pointercancel', up);
}

/* M4: digits roll when a number changes (signature counter, badges) */
function Num({ v, fmtf }) {
  const s = (fmtf || String)(v); const prev = useRef(s); const old = prev.current; prev.current = s;
  return html`<span class="num" aria-label=${s}>${s.split('').map((ch, i) => { const ch0 = old[i - (s.length - old.length)]; const changed = ch0 !== undefined && ch0 !== ch && /\d/.test(ch);
    return html`<span class=${'dg' + (changed ? ' roll' : '')} key=${i + ch}>${ch === ' ' ? ' ' : ch}</span>`; })}</span>`;
}

/* M5: the wallet card flies into the document screen (shared element) */
const _DocsW = Docs;
Docs = function (c) {
  const go2 = (r, p) => { const el = document.querySelector('.phone .scard.sel'); if (el) window.__morph2 = el.getBoundingClientRect(); c.go(r, p); };
  return _DocsW({ ...c, go: go2 });
};
const _DocId = DocId;
DocId = function (c) {
  htmPreact.useLayoutEffect(() => { const r = window.__morph2; window.__morph2 = null; const el = document.querySelector('.phone .scroll .doc'); if (!r || !el || RM()) return;
    const t = el.getBoundingClientRect(); const sx = r.width / t.width, sy = r.height / t.height;
    el.animate([{ transform: `translate(${r.left - t.left}px,${r.top - t.top}px) scale(${sx},${sy})`, transformOrigin: '0 0', borderRadius: '18px' }, { transform: 'none', transformOrigin: '0 0' }], { duration: 380, easing: DRAWER });
    const scr = el.closest('.screen'); scr && scr.getAnimations().forEach(a => a.finish()); }, []);
  return _DocId(c);
};

/* M6: hold to confirm a destructive, all-at-once action */
function HoldBtn({ label, holdLabel, ms = 1200, onDone, onTap }) {
  const [p, setP] = useState(0); const t = useRef(null), raf = useRef(0), held = useRef(false);
  const start = e => { if (e.button > 0) return; held.current = false; const t0 = performance.now();
    const tick = now => { const k = Math.min(1, (now - t0) / ms); setP(k); if (k >= 1) { held.current = true; buzz(20); onDone(); return; } raf.current = requestAnimationFrame(tick); };
    raf.current = requestAnimationFrame(tick); };
  const stop = () => { cancelAnimationFrame(raf.current); if (!held.current && p > 0) setP(0); };
  return html`<button class=${'btn red hold8' + (p > 0 && p < 1 ? ' holding' : '')} style=${`--p:${p}`} onPointerDown=${start} onPointerUp=${stop} onPointerLeave=${stop} onPointerCancel=${stop}
    onClick=${e => { if (e.detail === 0) onTap(); else if (!held.current && p === 0) onTap(); }}>
    <span class="hold-l">${p > 0 && p < 1 ? holdLabel : label}</span><span class="hold-fill" aria-hidden="true">${p > 0 && p < 1 ? holdLabel : label}</span></button>`;
}
function Lost(c) {
  const [done, setDone] = useState(false);
  const items = ['mDowód i dowód osobisty', 'Prawo jazdy', 'PESEL: nikt nie weźmie kredytu na Twoje dane', 'Karty płatnicze w 3 bankach'];
  const finish = () => { setDone(true); c.toast({ t: 'Zastrzeżono 4 dokumenty', undo: () => setDone(false) }); };
  return html`<div>
    <h1 class="h-l">${done ? 'Wszystko zastrzeżone.' : 'Zgubiłaś portfel?'}</h1>
    <p class="lead">${done ? 'Zastrzeżenia są aktywne od 15:58. Oto co dalej.' : 'Zastrzeżemy to wszystko naraz. Każdy krok możesz później cofnąć.'}</p>
    <div class=${'list lost8' + (done ? ' done' : '')}>${items.map((t, i) => html`<div class="row" style=${`--i:${i}`}><span class="ic lk">${done ? I('check', 18) : I('lock', 18)}</span><span class="tx"><div class="t">${t}</div></span></div>`)}</div>
    ${done ? html`<${Sec} t="Następne kroki"/><div class="list"><${Row} t="Zamów nowy dowód" s="Wizyta w urzędzie na zdjęcie i odciski" onClick=${() => {}}/><${Row} t="Zgłoś kradzież na policję" s="Jeśli portfel ukradziono" onClick=${() => {}}/></div>`
      : html`<div class="actions"><${HoldBtn} label="Przytrzymaj, żeby zastrzec" holdLabel="Trzymaj…" onDone=${finish} onTap=${() => c.confirm({ t: 'Zastrzec 4 dokumenty?', items: items, ok: 'Zastrzeż', done: () => setDone(true) })}/></div>
      <p class="tiny" style="text-align:center;margin-top:8px">Przytrzymaj przycisk przez sekundę. Krótkie dotknięcie pokaże podsumowanie.</p>`}
  </div>`;
}


/* "Jak to zrobić?": search answers how-to questions in plain steps, then "Pokaż mi" points at the real button (Karl, 26 Nov) */
const HOWTO = [
  { k: /wiek(?!sz)|18|pelnolet|alkohol|piwo|dorosl/, q: 'Jak pokazać, że mam 18 lat?', r: 'docs', find: 'Pokaż tylko 18+',
    s: ['Otwórz Dokumenty.', 'Dotknij „Pokaż tylko 18+”.', 'Pokaż kod QR przy kasie. Sprzedawca zobaczy tylko, że masz 18 lat.'] },
  { k: /sprzeda|sprzedac|kupuj|zbyc/, q: 'Jak zgłosić sprzedaż auta?', r: 'car', find: 'Sprzedaję ten samochód',
    s: ['Otwórz Mój samochód.', 'Dotknij „Sprzedaję ten samochód”.', 'Wpisz dane kupującego. Zgłoszenie i OC załatwimy za Ciebie.'] },
  { k: /zgubi|ukrad|zastrz|portfel|kradziez/, q: 'Co zrobić, gdy zgubię dowód?', r: 'docs', find: 'Zgubiłam portfel',
    s: ['Otwórz Dokumenty.', 'Dotknij „Zgubiłam portfel”.', 'Przytrzymaj przycisk. Wszystkie dokumenty zastrzeżesz naraz.'] },
  { k: /kto.*(sprawdz|ogladal|widzial)|dostep do moich|moje dane/, q: 'Jak sprawdzić, kto oglądał moje dane?', r: 'profile', find: 'Kto sprawdzał moje dane',
    s: ['Otwórz swój profil (AN w prawym górnym rogu).', 'Dotknij „Kto sprawdzał moje dane”.', 'Zobaczysz, kto, kiedy i po co sprawdzał Twoje dane.'] },
  { k: /dzwoni|podszyw|oszust|telefon z urzedu/, q: 'Jak sprawdzić, czy dzwoni prawdziwy urząd?', r: 'safety', find: 'Kto do mnie dzwoni?',
    s: ['Otwórz Ochronę.', 'Dotknij „Kto do mnie dzwoni?”.', 'Sprawdzimy numer. Gdy to oszust, zobaczysz ostrzeżenie.'] },
  { k: /schron|alarm|syren|ewakuac/, q: 'Gdzie jest najbliższy schron?', r: 'safety', find: 'Najbliższy schron',
    s: ['Otwórz Ochronę.', 'Dotknij „Najbliższy schron”.', 'Trasa działa też bez internetu.'] },
  { k: /tekst|liter|czcion|wieksz|powiek|slabo widz|maly druk/, q: 'Jak powiększyć tekst?', r: 'profile', sel: '.fs8',
    s: ['Otwórz swój profil.', 'Przesuń suwak „A A” w prawo.', 'Tekst w całej aplikacji od razu się powiększy.'] },
  { k: /\boc\b|ubezpiecz|polis/, q: 'Jak przedłużyć OC?', r: 'today', find: 'Przedłuż OC',
    s: ['Na ekranie Dziś znajdź sprawę OC.', 'Dotknij „Przedłuż OC”.', 'Porównaj oferty i zapłać w aplikacji.'] },
  { k: /800|swiadczen|zasilek/, q: 'Kiedy przyjdzie 800+?', r: 'today', find: '800+ na Zosię',
    s: ['Na ekranie Dziś dotknij „800+ na Zosię”.', 'Zobaczysz datę wypłaty i historię przelewów.'] }
];
const howFor = q => { const n = norm(q.trim()); return n.length > 2 ? HOWTO.find(h => h.k.test(n) || norm(h.q).includes(n)) : null; };

let guideRaf = 0;
function guideTip(el) {
  cancelAnimationFrame(guideRaf);
  document.querySelectorAll('.guide-tip').forEach(t => t.remove());
  document.querySelectorAll('.guide8').forEach(e => e.classList.remove('guide8'));
  const ph = document.querySelector('.phone'); if (!ph || !el) return;
  el.classList.add('guide8');
  const tip = document.createElement('div'); tip.className = 'guide-tip'; tip.setAttribute('aria-hidden', 'true');
  tip.innerHTML = '<span>Dotknij tutaj</span>'; ph.appendChild(tip);
  const stop = () => { cancelAnimationFrame(guideRaf); tip.remove(); el.classList.remove('guide8'); ph.removeEventListener('pointerdown', stop, true); window.removeEventListener('hashchange', stop); };
  setTimeout(() => { ph.addEventListener('pointerdown', stop, true); window.addEventListener('hashchange', stop); }, 50);
  const tick = () => {
    if (!el.isConnected) { stop(); return; }
    const pr = ph.getBoundingClientRect(), r = el.getBoundingClientRect(), sx = pr.width / ph.offsetWidth || 1;
    const x = (r.left + r.width / 2 - pr.left) / sx, top = (r.top - pr.top) / sx, bot = (r.bottom - pr.top) / sx;
    const below = top < 56; tip.classList.toggle('below', below);
    const w = tip.firstChild.offsetWidth || 110, W = ph.offsetWidth, cx = Math.min(Math.max(x, w / 2 + 10), W - w / 2 - 10);
    tip.style.setProperty('--dx', Math.round(cx - x) + 'px');
    tip.style.transform = `translate(${Math.round(x)}px, ${Math.round(below ? bot + 12 : top - 12)}px)`;
    tip.style.opacity = bot > 40 && top < ph.offsetHeight - 40 ? '' : '0';
    guideRaf = requestAnimationFrame(tick);
  };
  tick();
}
function showMe(c, h) {
  c.go(h.r);
  let n = 0;
  const look = () => {
    const ph = document.querySelector('.phone .scroll'); let el = null;
    if (ph) el = h.sel ? ph.querySelector(h.sel) : [...ph.querySelectorAll('button, a, [role=button]')].find(b => b.innerText.replace(/\s+/g, ' ').includes(h.find));
    if (el) { el.scrollIntoView({ block: 'center', behavior: RM() ? 'auto' : 'smooth' }); setTimeout(() => guideTip(el), RM() ? 0 : 380); }
    else if (n++ < 12) setTimeout(look, 150);
  };
  setTimeout(look, 360);
}
function HowCard({ c, h }) {
  return html`<div class="how8" key=${h.q}>
    <div class="how8-k">${I('sparkle', 14)}<span>Jak to zrobić</span></div>
    <div class="how8-q">${h.q}</div>
    <ol class="how8-s">${h.s.map((t, i) => html`<li key=${i} style=${`--i:${i}`}><i>${i + 1}</i><span>${t}</span></li>`)}</ol>
    <button class="btn how8-go" onClick=${() => showMe(c, h)}>Pokaż mi, gdzie to jest</button>
  </div>`;
}
function Search({ c, ph = 'Szukaj albo zapytaj, jak coś zrobić', auto, init = '' }) {
  const [q, setQ] = useState(init); const ref = useRef(null);
  useEffect(() => { if (!auto) return; const a = setTimeout(() => ref.current && ref.current.focus(), 250); return () => clearTimeout(a); }, []);
  const how = howFor(q);
  const hits = q.trim() ? IDX.filter(x => norm(x[0] + ' ' + x[1]).includes(norm(q.trim()))).slice(0, how ? 3 : 5) : [];
  const enter = () => how ? showMe(c, how) : hits[0] ? c.go(hits[0][2]) : c.ask(q || 'Jak zameldować się w nowym mieszkaniu?');
  return html`<div class="srch8"><div class="search"><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><circle cx="11" cy="11" r="6.5"/><path d="m16 16 4.5 4.5"/></svg>
    <input ref=${ref} value=${q} onInput=${e => setQ(e.target.value)} onKeyDown=${e => e.key === 'Enter' && enter()} placeholder=${ph} aria-label=${ph}/>
    ${q ? html`<button aria-label="Wyczyść" onClick=${() => setQ('')}>${I('x', 16)}</button>` : html`<button aria-label="Mów" onClick=${() => c.ask('Kiedy kończy się ważność mojego dowodu?')}>${I('mic', 18)}</button>`}</div>
    ${how && html`<${HowCard} c=${c} h=${how}/>`}
    ${q.trim() && html`<div class="hits">${hits.map(([t, s, r, ic]) => html`<button class="hit" onClick=${() => c.go(r)}><span class="lead-i">${I(P[ic] ? ic : 'doc', 18)}</span><span class="gtx"><span class="gt">${t}</span><span class="gs">${s}</span></span></button>`)}
      <button class="hit ask" onClick=${() => c.ask(q)}><span class="lead-i ai">${I('sparkle', 18)}</span><span class="gtx"><span class="gt">Zapytaj asystenta: „${q}”</span><span class="gs">Odpowiedź z gov.pl, ze źródłami</span></span></button></div>`}</div>`;
}
function SearchScreen(c) {
  const [pick, setPick] = useState('');
  return html`<div><h1 class="h-l">Szukaj</h1><${Search} key=${pick} init=${pick} c=${c} auto=${!pick}/>
    ${!pick && html`<${Label} t="Jak to zrobić?"/>
    <div class="how8-list">${HOWTO.slice(0, 5).map(h => html`<button class="how8-row" onClick=${() => setPick(h.q)}><span class="lead-i ai">${I('sparkle', 16)}</span><span>${h.q}</span><span class="gch">${I('chevron', 16)}</span></button>`)}</div>
    <${Label} t="Często szukane"/><div class="chips wrap">${['Przeprowadzka', 'Dowód', '800+', 'Schron', 'Podatki', 'Recepta'].map(t => html`<button onClick=${() => { const h = IDX.find(x => norm(x[0] + x[1]).includes(norm(t))); h ? c.go(h[2]) : c.ask(t); }}>${t}</button>`)}</div>`}
  </div>`;
}
