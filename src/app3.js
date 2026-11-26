/* ---------- Tab: Bezpieczeństwo ---------- */
function Safety(c) {
  const feed = [
    ['RCB', 'Alert RCB', 'Test syren alarmowych w Krakowie, 1 grudnia o 12:00. Nic nie musisz robić.', 'Kraków · wczoraj, 18:05', 'gray'],
    ['IMGW', 'Ostrzeżenie 2. stopnia', 'Silny wiatr do 90 km/h, od dziś 20:00 do jutra 8:00.', 'Sandomierz · miejsce taty · 14:20', 'amber'],
    ['RSO', 'Komunikat regionalny', 'Wisła ma wyższy poziom wody. Domom nic nie grozi.', 'Sandomierz · 11:02', 'gray']
  ];
  return html`<div>
    <h1 class="h-xl">Ochrona</h1>
    <p class="lead">Alerty RCB, ostrzeżenia dla Twoich bliskich i najbliższe schronienie. Działa też bez internetu.</p>
    <div class="card" style="padding:14px 16px;display:flex;gap:12px;align-items:center">
      <span class="it" style="background:var(--green-soft);color:var(--green)">${I('shield', 20)}</span>
      <div style="flex:1"><div style="font-weight:600">Kraków: brak aktywnych alertów</div><div class="small">Sprawdzono o 15:40 · połączono z RCB</div></div>
    </div>
    <${Sec} t="Komunikaty" more="Archiwum"/>
    <div class="list feed">${feed.map(([src, k, t, m, tone]) => html`<div class="row">
      <span class="it" style=${tone === 'amber' ? 'background:var(--amber-soft);color:var(--amber)' : 'background:#f2f2f4;color:var(--ink2)'}><b style="font-size:10.5px;letter-spacing:.02em">${src}</b></span>
      <span class="tx"><div class="t">${k}</div><div class="s" style="color:var(--ink2)">${t}</div><div class="tiny" style="margin-top:3px">${m}</div></span></div>`)}</div>
    <${Sec} t="Obserwowane miejsca" more="Zmień" go=${() => c.go('places')}/>
    <div class="list">
      <${Row} icon="pin" t="Moja lokalizacja" s="Kraków, Podgórze" right=${html`<span class="pill p-green">Spokojnie</span>`} onClick=${() => c.go('places')}/>
      <${Row} icon="pin" t="Sandomierz" s="Tata" right=${html`<span class="pill p-amber">Wiatr, 2. st.</span>`} onClick=${() => c.go('places')}/>
      <${Row} icon="pin" t="Przedszkole nr 12" s="Zosia" right=${html`<span class="pill p-green">Spokojnie</span>`} onClick=${() => c.go('places')}/>
    </div>
    <div class="list" style="margin-top:12px">
      <${Row} icon="plus" t="Karta ratunkowa" s="Dla ratownika, bez odblokowania telefonu" onClick=${() => c.go('ice')}/>
      <${Row} icon="camera" t="Zgłoś szkody po zdarzeniu" s="Zdjęcia, oględziny, zasiłek" onClick=${() => c.go('damage-1')}/>
      <${Row} icon="shield" t="Tarcza antyoszustwa" s="Fałszywe SMS-y podszywające się pod alerty" onClick=${() => c.go('scam')}/>
    </div>
    <${Sec} t="Rozpoznaj sygnał"/>
    <div class="list">
      <div class="row"><span class="it" style="background:var(--red-soft);color:var(--red)">${I('speaker', 20)}</span><span class="tx"><div class="t">Alarm</div><div class="s">Syrena: dźwięk rośnie i opada przez 3 minuty</div></span></div>
      <div class="row"><span class="it" style="background:var(--green-soft);color:var(--green)">${I('speaker', 20)}</span><span class="tx"><div class="t">Odwołanie alarmu</div><div class="s">Syrena, dźwięk ciągły przez 3 minuty</div></span></div>
    </div>
    <${Sec} t="Przygotuj się"/>
    <div class="mrow">
      ${[['Najbliższe schronienie', 'Dekerta 24, 240 m', 'alert-shelter', 'shelter', 'sand'], ['Plan rodziny', '2 miejsca spotkań', 'plan', 'family', 'rose'], ['Co robić w alarmie', 'Posłuchaj instrukcji', 'alert-guide', 'siren', 'yellow']].map(([t, s, r, n, bg]) =>
        html`<button class="mcard" onClick=${() => c.go(r)}><div class=${'mimg bg-' + bg}>${ILL(n, 120)}</div><div><div class="mt">${t}</div><div class="ms">${s}</div></div></button>`)}
    </div>
    <div class="actions"><button class="btn" onClick=${() => c.go('lock')}>${I('bell', 18)} Zobacz, jak przychodzi Alert RCB</button><button class="btn ghost" onClick=${() => c.go('alert-red')}>Otwórz alert w aplikacji</button></div>
  </div>`;
}
function Places(c) {
  return html`<div><h1 class="h-l">Obserwowane miejsca</h1>
    <p class="lead">Alerty dla Twojej lokalizacji przychodzą zawsze. Alerty dla tych miejsc są oznaczone ich nazwą, żeby ich nie pomylić.</p>
    <div class="list">${[['Sandomierz', 'Tata, ul. Mickiewicza'], ['Przedszkole nr 12, Kraków', 'Zosia'], ['Biuro Tomasza, Katowice', 'Tomasz']].map(([t, s]) => html`<div class="row"><span class="ic">${I('pin')}</span><span class="tx"><div class="t">${t}</div><div class="s">${s}</div></span><${Toggle} on=${true} set=${() => {}} label=${t}/></div>`)}</div>
    <div class="actions"><button class="btn ghost">${I('plus', 18)} Dodaj miejsce</button></div></div>`;
}

function AlertRed(c) {
  return html`<div class="rcb-screen" role="alertdialog" aria-label="Alert RCB">
    <div class="rcb-clock">15:42</div><div class="rcb-date">wtorek, 24 listopada</div>
    <div class="rcb">
      <div class="hd"><span class="b">${I('bell', 14)}</span>ALERT RCB · ALERT EKSTREMALNY<span class="tm">teraz</span></div>
      <div class="ttl">Alarm powietrzny: Kraków</div>
      <div class="bd">Alert RCB! Alarm powietrzny w Krakowie. Idź do najbliższego schronu albo ukrycia. Słuchaj poleceń służb.</div>
      <div class="sig">${I('check', 14)} Telefon sprawdził, że to prawdziwy alert RCB</div>
    </div>
    <div class="rcb-app">
      <div class="lbl"><span class="flag"></span>mObywatel dodaje do tego alertu</div>
      <button class="row" onClick=${() => c.go('alert-shelter')}><span class="it bg-sand">${I('route', 20)}</span><span class="tx"><div class="t">Schronienie: ul. Dekerta 24</div><div class="s">240 m · 3 min pieszo · trasa działa bez internetu</div></span><span class="chev">${I('chevron', 18)}</span></button>
      <button class="row" onClick=${() => c.go('family-map')}><span class="it bg-rose">${I('people', 20)}</span><span class="tx"><div class="t">Rodzina</div><div class="s">Zosia: przedszkole w schronie · Tata: poza strefą alarmu</div></span><span class="chev">${I('chevron', 18)}</span></button>
    </div>
    <div style="flex:1;min-height:14px"></div>
    <div class="actions" style="margin-top:12px">
      <button class="btn" onClick=${() => { const el = document.querySelector('.phone .rcb-app'); if (el) { const q = el.getBoundingClientRect(); window.__morph = { left: q.left, top: q.top, width: q.width, height: q.height }; } c.go('alert-watch'); }}>${I('route', 18)} Prowadź do schronienia</button>
      <button class="btn ghost" onClick=${() => c.go('alert-guide')}>${I('speaker', 18)} Co robić teraz (odczytaj)</button>
    </div>
  </div>`;
}
function ShelterMap() {
  return html`<svg viewBox="0 0 350 230" width="100%" role="img" aria-label="Mapa trasy do schronienia">
    <rect width="350" height="230" fill="#e9eae5"/>
    <g stroke="#ffffff" stroke-width="14" fill="none"><path d="M0 70H350M0 170H350M90 0V230M250 0V230"/></g>
    <g fill="#d9dbd4"><rect x="10" y="90" width="68" height="68" rx="6"/><rect x="102" y="10" width="136" height="50" rx="6"/><rect x="102" y="82" width="136" height="76" rx="6"/><rect x="262" y="82" width="80" height="76" rx="6"/><rect x="102" y="182" width="136" height="44" rx="6"/></g>
    <path d="M60 170H170V70H250" fill="none" stroke="#132a5e" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="1 10"/>
    <circle cx="60" cy="170" r="9" fill="#132a5e" stroke="#fff" stroke-width="3"/>
    <g transform="translate(250 70)"><rect x="-14" y="-14" width="28" height="28" rx="8" fill="#1c7a4c"/><path d="M-6 2 0-5 6 2M-4 1v6h8V1" stroke="#fff" stroke-width="2" fill="none" stroke-linejoin="round"/></g>
    <text x="72" y="196" font-size="11" fill="#5d636d" font-family="Inter,Arial">Jesteś tutaj</text>
    <text x="196" y="52" font-size="11" fill="#1c7a4c" font-weight="600" font-family="Inter,Arial">Schron, Dekerta 24</text>
  </svg>`;
}

function AlertShelter(c) {
  return html`<div>
    <span class="pill p-red" style="margin-top:8px">Alert RCB trwa · Kraków</span>
    <h1 class="h-l">Idź do schronienia przy ul. Dekerta 24</h1>
    <div class="map">${ShelterMap()}</div>
    <div class="list" style="margin-top:12px">
      <div class="field"><div class="l">Odległość</div><div class="v">240 m · około 3 minuty pieszo</div></div>
      <div class="field"><div class="l">Typ</div><div class="v">Schron, dla 180 osób, czynny całą dobę</div><div class="src">${I('check', 12)} Źródło: lista „Gdzie się ukryć”, Państwowa Straż Pożarna</div></div>
      <div class="field"><div class="l">Gdy nie zdążysz</div><div class="v">Korytarz bez okien, z dwiema ścianami między Tobą a ulicą</div></div>
    </div>
    <div class="note" style="margin-top:12px">${I('wifi', 18)}<span>Mapa i trasa są zapisane w telefonie. Działają bez internetu.</span></div>
    <div class="actions"><button class="btn" onClick=${() => c.go('alert-guide')}>Jestem na miejscu</button></div>
  </div>`;
}

function AlertGuide(c) {
  const [reading, setReading] = useState(false);
  return html`<div>
    <span class="pill p-red" style="margin-top:8px">Alert RCB trwa</span>
    <h1 class="h-l">Co robić teraz</h1>
    <p class="lead">Zasady z poradnika RCB. Alarm to syrena, której dźwięk rośnie i opada przez 3 minuty.</p>
    <button class="speak" style="width:100%" onClick=${() => setReading(!reading)}>${I(reading ? 'pause' : 'speaker', 22)} ${reading ? 'Zatrzymaj odczyt' : 'Odczytaj na głos'}</button>
    <div class="road" style="margin-top:10px">
      ${['Zostań w schronieniu do odwołania alarmu.', 'Trzymaj się z dala od okien i drzwi zewnętrznych.', 'Nie dzwoń bez potrzeby. Sieć jest potrzebna służbom.', 'Wyślij rodzinie status „Jestem bezpieczna”. Dojdzie nawet przy słabym zasięgu.', 'Słuchaj komunikatów w aplikacji i w radiu.'].map((t, i) => html`<div class="n">${i + 1}</div><div class="b">${t}</div>`)}
    </div>
    <div class="actions">
      <button class="btn" onClick=${() => c.go('alert-safe')}>${I('heart', 18)} Jestem bezpieczna</button>
      <button class="btn ghost" onClick=${() => c.go('alert-clear')}>Pokaż odwołanie alarmu (demo)</button>
    </div>
  </div>`;
}

function AlertClear(c) {
  return html`<div class="rcb-screen clear" role="alertdialog" aria-label="Odwołanie alarmu">
    <div class="rcb-clock">16:21</div><div class="rcb-date">wtorek, 24 listopada</div>
    <div class="rcb clear">
      <div class="hd"><span class="b">${I('check', 14)}</span>ALERT RCB<span class="tm">teraz</span></div>
      <div class="ttl">Odwołanie alarmu: Kraków</div>
      <div class="bd">Alert RCB! Odwołano alarm powietrzny dla miasta Kraków. Ulica Kamieńskiego pozostaje zamknięta do odwołania.</div>
      <div class="sig">${I('check', 14)} Telefon sprawdził, że to prawdziwy alert RCB</div>
    </div>
    <div class="rcb-app">
      <div class="lbl"><span class="flag"></span>Twoja rodzina</div>
      <div class="row"><span class="tx"><div class="t">Tomasz, Zosia</div><div class="s">Bezpieczni</div></span><span class="pill p-green">OK</span></div>
      <div class="row"><span class="tx"><div class="t">Tata</div><div class="s">Brak odpowiedzi od 15:42</div></span><span class="pill p-amber">Sprawdź</span></div>
    </div>
    <div style="flex:1;min-height:14px"></div>
    <div class="actions" style="margin-top:12px"><button class="btn" onClick=${() => c.go('alert-safe')}>Zobacz status rodziny</button>
    <button class="btn ghost" onClick=${() => c.go('damage-1')}>Zgłoś szkody</button></div>
  </div>`;
}
function AlertSafe(c) {
  const [sent, setSent] = useState(c.s.safe);
  const send = () => { setSent(true); c.set({ safe: true }); };
  return html`<div>
    <h1 class="h-l">${sent ? 'Rodzina wie, że jesteś bezpieczna.' : 'Daj znać rodzinie'}</h1>
    ${!sent && html`<div class="actions" style="margin-top:6px">
      <button class="btn green bigbtn" onClick=${send}>${I('check', 22)} Jestem bezpieczna</button>
      <button class="btn ghost" onClick=${() => c.toast('Rodzina dostała Twoją prośbę o pomoc i lokalizację.')}>Potrzebuję pomocy</button></div>`}
    <${Sec} t="Status rodziny" more="Mapa" go=${() => c.go('family-map')}/>
    <div class="list">
      <div class="row"><span class="face-i" style="background:#132a5e">AN</span><span class="tx"><div class="t">Ty</div><div class="s">${sent ? 'Bezpieczna, schron Dekerta 24, 15:49' : 'Nie wysłano'}</div></span>${sent ? html`<span class="pill p-green">Bezpieczna</span>` : html`<span class="pill p-gray">—</span>`}</div>
      <div class="row"><span class="face-i" style="background:#3d5a80">TN</span><span class="tx"><div class="t">Tomasz</div><div class="s">Bezpieczny, Katowice, 15:46</div></span><span class="pill p-green">Bezpieczny</span></div>
      <div class="row"><span class="face-i" style="background:#a8650a">ZN</span><span class="tx"><div class="t">Zosia</div><div class="s">Przedszkole nr 12: dzieci w schronie, 15:45</div></span><span class="pill p-green">Bezpieczna</span></div>
      <div class="row"><span class="face-i" style="background:#1c7a4c">SN</span><span class="tx"><div class="t">Tata</div><div class="s">Brak odpowiedzi od 15:42</div></span><button class="mini" onClick=${() => c.go('easy-call')}>${I('phone', 14)} Zadzwoń</button></div>
    </div>
    <p class="tiny" style="margin-top:12px">Status widzą tylko osoby z Twojej rodziny. Znika po 72 godzinach.</p>
  </div>`;
}

function AlertDamage(c) {
  return html`<div><p class="stepk">Po zdarzeniu</p><h1 class="h-l">Zgłoś szkody</h1>
    <${Hero} n="shelter" bg="sand"/>
    <p class="lead">Zrób zdjęcia. Dodamy lokalizację i datę. Komisja z gminy umówi oględziny.</p>
    <button class="card" style="width:100%;padding:30px;display:grid;place-items:center;gap:6px;color:var(--navy)">${I('camera', 30)}<span style="font-weight:600">Zrób zdjęcie</span></button>
    <p class="tiny" style="margin-top:10px">Funkcja z planu rozwoju. Wzorowana na ukraińskim eRecovery w aplikacji Diia.</p></div>`;
}

/* ---------- Tab: Dokumenty ---------- */
function Docs(c) {
  const docs = [['mDowód', 'Ważny do 12 maja 2031', 'gray'], ['Prawo jazdy', 'Kat. B, ważne do 3 października 2033', 'gray'], ['Legitymacja pielęgniarki (PWZ)', 'Nr 1206•••', 'gray'], ['Dowód rejestracyjny: Toyota Yaris', 'OC kończy się 6 grudnia', 'red']];
  return html`<div>
    <h1 class="h-xl">Dokumenty</h1>
    <button class="doccard" style="width:100%;text-align:left" onClick=${() => c.go('doc-id')}>
      <div style="display:flex;justify-content:space-between"><span class="tiny" style="color:rgba(255,255,255,.75);letter-spacing:.1em">DOWÓD CYFROWY</span><span class="flag"></span></div>
      <div><div class="h-m" style="font-size:30px">Anna Nowicka</div><div style="opacity:.8;font-size:13px">Ważny do 12 maja 2031 · działa bez internetu</div></div>
    </button>
    <div class="list" style="margin-top:12px">${docs.slice(1).map(([t, s, tone]) => html`<${Row} icon="card" t=${t} s=${s} onClick=${() => tone === 'red' ? c.go('car') : c.go('doc-id')} right=${tone === 'red' ? html`<span class="pill p-red">12 dni</span>` : undefined}/>`)}</div>
    <div class="list" style="margin-top:12px">
      <${Row} icon="plus" t="Karta ratunkowa" s="Grupa krwi, alergie, kontakty. Na ekranie blokady" onClick=${() => c.go('ice')}/>
      <${Row} icon="doc" t="Dokumenty od wystawcy" s="Dyplom, PWZ, świadectwo" onClick=${() => c.go('issued')}/>
    </div>
    <${Sec} t="Pokaż tylko to, co trzeba"/>
    <div class="list">
      <${Row} icon="eye" t="Potwierdź pełnoletność" s="Bez imienia, PESEL i adresu" onClick=${() => c.go('share-min')}/>
      <${Row} icon="pin" t="Potwierdź miejsce zamieszkania" s="Tylko miasto" onClick=${() => c.go('share-min')}/>
    </div>
    <${Sec} t="Gdy coś pójdzie nie tak"/>
    <div class="list"><${Row} icon="lock" t="Zgubiłam portfel" s="Zastrzeż wszystko jednym przyciskiem" onClick=${() => c.go('lost')}/></div>
  </div>`;
}

function DocId(c) {
  const [show, setShow] = useState(false);
  return html`<div>
    <${DocCard} c=${c}/>
    <div class="glist" style="margin-top:12px"><div class="grow"><span class="gtx"><span class="gs">PESEL</span><span class="gt" style="font-variant-numeric:tabular-nums">${show ? '92031412345' : '92031•••••'}</span></span></div></div>
    <div class="actions"><button class="btn" onClick=${() => c.go('share-min')}>${I('qr', 18)} Pokaż do sprawdzenia</button><button class="btn ghost" onClick=${() => setShow(!show)}>${show ? 'Ukryj PESEL' : 'Pokaż PESEL'}</button></div>
    <div class="note" style="margin-top:14px">${I('wifi', 18)}<span>Dokument jest zapisany w telefonie. Otworzysz go także bez internetu i po nieudanej aktualizacji.</span></div>
  </div>`;
}

function ShareMin(c) {
  const [what, setWhat] = useState('age');
  return html`<div>
    <h1 class="h-l">Pokaż tylko to, co trzeba</h1>
    <div class="seg full" style="margin-bottom:8px">${[['age', 'Pełnoletność'], ['city', 'Miasto'], ['full', 'Pełne dane']].map(([k, t]) => html`<button aria-pressed=${what === k} onClick=${() => setWhat(k)}>${t}</button>`)}</div>
    <div class="qr">${QR()}</div>
    <div class="card" style="padding:14px 16px">
      <div class="small">Osoba, która sprawdza, zobaczy:</div>
      <div style="font-weight:600;font-size:18px">${what === 'age' ? 'Osoba pełnoletnia: TAK' : what === 'city' ? 'Miejsce zamieszkania: Kraków' : 'Imię, nazwisko, PESEL, zdjęcie, data ważności'}</div>
      <div class="tiny">${what === 'full' ? 'Użyj tylko w urzędzie, banku lub na poczcie.' : 'Bez imienia, PESEL i zdjęcia.'}</div>
    </div>
    <p class="tiny" style="margin-top:10px">Każde sprawdzenie trafia do historii „Kto sprawdzał moje dane”.</p>
    <div class="actions"><button class="btn ghost" onClick=${() => c.go('eu')}>${I('card', 18)} Za granicą: portfel UE</button></div>
  </div>`;
}

function Lost(c) {
  const [done, setDone] = useState(false);
  const items = ['mDowód i dowód osobisty', 'Prawo jazdy', 'PESEL: nikt nie weźmie kredytu na Twoje dane', 'Karty płatnicze w 3 bankach'];
  return html`<div>
    <h1 class="h-l">${done ? 'Wszystko zastrzeżone.' : 'Zgubiłaś portfel?'}</h1>
    <p class="lead">${done ? 'Zastrzeżenia są aktywne od 15:58. Oto co dalej.' : 'Zastrzeżemy to wszystko naraz. Każdy krok możesz później cofnąć.'}</p>
    <div class="list">${items.map(t => html`<div class="row"><span class="ic" style=${done ? 'background:var(--green-soft);color:var(--green)' : ''}>${done ? I('check', 18) : I('lock', 18)}</span><span class="tx"><div class="t">${t}</div></span></div>`)}</div>
    ${done ? html`<${Sec} t="Następne kroki"/><div class="list"><${Row} t="Zamów nowy dowód" s="Wizyta w urzędzie na zdjęcie i odciski" onClick=${() => {}}/><${Row} t="Zgłoś kradzież na policję" s="Jeśli portfel ukradziono" onClick=${() => {}}/></div>`
      : html`<div class="actions"><button class="btn red" onClick=${() => c.confirm({ t: 'Zastrzec 4 dokumenty?', items: items, ok: 'Zastrzeż', done: () => setDone(true) })}>Zastrzeż wszystko</button></div>`}
  </div>`;
}

/* ---------- Profile & trust ---------- */
function Profile(c) {
  return html`<div>
    <div style="display:flex;gap:12px;align-items:center;margin-top:8px"><span class="face-i" style="background:#132a5e;width:52px;height:52px">AN</span><div><h1 class="h-m">Anna Nowicka</h1><div class="small">Kraków</div></div></div>
    <${Sec} t="Zaufanie"/>
    <div class="list">
      <${Row} icon="eye" t="Kto sprawdzał moje dane" s="4 razy w tym miesiącu" onClick=${() => c.go('access-log')}/>
      <${Row} icon="lock" t="Moje zgody" s="Rodzina, firmy, pamięć asystenta" onClick=${() => c.go('consents')}/>
      <${Row} icon="key" t="Logowanie" s="Twarz i klucz dostępu" onClick=${() => c.go('signin')}/>
      <${Row} icon="phone" t="Urządzenia i sesje" s="2 telefony, 1 przeglądarka" onClick=${() => c.go('devices')}/>
      <${Row} icon="shield" t="Tarcza antyoszustwa" s="Sprawdź podejrzany SMS lub link" onClick=${() => c.go('scam')}/>
    </div>
    <${Sec} t="Ułatwienia"/>
    <div class="list">
      <div class="row"><span class="ic">${I('sun')}</span><span class="tx"><div class="t">Tryb prosty</div><div class="s">Duże przyciski, jedna decyzja na ekranie</div></span><${Toggle} on=${c.s.easy} label="Tryb prosty" set=${v => { c.go(v ? 'easy' : 'today', v ? 'tata' : 'anna'); }}/></div>
      <${Row} icon="speaker" t="Odczyt na głos i sterowanie głosem" s="Włączone" onClick=${() => {}}/>
      <${Row} icon="people" t="Tłumacz polskiego języka migowego" s="Wideo z tłumaczem, przycisk na każdym ekranie" onClick=${() => c.go('pjm')}/>
      <${Row} icon="wifi" t="Co, jeśli aktualizacja się nie uda?" s="Zobacz, co działa bez internetu" onClick=${() => c.go('offline')}/>
    </div>
    <${Sec} t="O aplikacji"/>
    <div class="list">
      <${Row} icon="list" t="Nowe funkcje" s="11 rzeczy, o które prosili ludzie w badaniach" onClick=${() => c.go('roadmap')}/>
      <${Row} icon="doc" t="O tej koncepcji" s="Niezależny projekt na mObywatel Challenge" onClick=${() => c.go('about')}/>
    </div>
  </div>`;
}

function AccessLog(c) {
  const [flag, setFlag] = useState(null);
  return html`<div>
    <${Hero} n="lock" bg="sky"/>
    <h1 class="h-l">Kto sprawdzał moje dane</h1>
    <p class="lead">Listopad 2026. Każde sprawdzenie Twoich dokumentów lub rejestrów.</p>
    <div class="list">${LOG.map((l, i) => html`<div class="row" style="align-items:flex-start"><span class="ic">${I('eye', 18)}</span><span class="tx">
      <div class="t">${l.who}</div><div class="s">${l.why}</div><div class="tiny">${l.when} · ${l.how}</div>
      ${flag === i ? html`<div class="note red" style="margin-top:8px">${I('check', 16)}<span>Zgłosiliśmy to do CERT Polska i do instytucji, która sprawdzała dane. Odpowiedź w ciągu 7 dni.</span></div>`
        : html`<button class="link" style="font-size:13px;margin-top:6px" onClick=${() => setFlag(i)}>To nie ja</button>`}
    </span></div>`)}</div>
    ${flag !== null && html`<div class="actions"><button class="btn" onClick=${() => c.go('devices')}>Urządzenia na moim koncie</button></div>`}
  </div>`;
}

function Consents(c) {
  const [list, setList] = useState([['Tomasz Nowicki', 'Terminy rodziny, sprawy dzieci', 'Bezterminowo'], ['Ty → Tata', 'Terminy, pisma, przygotowanie wniosków', 'Do 24.11.2027'], ['Pamięć asystenta', 'Pamięta Twoje sprawy przez 30 dni', 'Do 24.12.2026'], ['Bank Pekao S.A.', 'Weryfikacja tożsamości', 'Jednorazowo, 18.11']]);
  return html`<div>
    <h1 class="h-l">Moje zgody</h1>
    <p class="lead">Każdą zgodę możesz cofnąć. Cofnięcie działa od razu.</p>
    <div class="list">${list.map((l, i) => html`<div class="row"><span class="tx"><div class="t">${l[0]}</div><div class="s">${l[1]}</div><div class="tiny">${l[2]}</div></span><button class="mini" onClick=${() => { setList(list.filter((_, j) => j !== i)); c.toast('Zgoda cofnięta: ' + l[0]); }}>Cofnij</button></div>`)}</div>
  </div>`;
}

function Signin(c) {
  return html`<div style="text-align:center">
    <div class="face scan" style="margin-top:60px">${I('eye', 40)}</div>
    <h1 class="h-l">Zaloguj się twarzą</h1>
    <p class="lead">Bez kodów i haseł. Klucz dostępu działa tylko na stronach i w aplikacjach rządowych, więc fałszywa strona go nie przechwyci.</p>
    <div class="actions"><button class="btn" onClick=${() => c.go('today')}>Kontynuuj</button><button class="btn ghost">Użyj kodu PIN</button></div>
    <p class="tiny">Wzorowane na Singpass (Singapur).</p></div>`;
}

function Offline(c) {
  return html`<div>
    <div class="offline" style="margin:8px -20px 0">${I('wifi', 16)} Aktualizacja się nie powiodła. Nie masz internetu, ale najważniejsze rzeczy działają.</div>
    <h1 class="h-l">Twoje dokumenty są bezpieczne.</h1>
    <p class="lead">mDowód, prawo jazdy i poradnik bezpieczeństwa działają bez połączenia. Usługi online wrócą po aktualizacji.</p>
    <div class="list">
      <${Row} icon="card" t="mDowód" s="Działa bez internetu" onClick=${() => c.go('doc-id')}/>
      <${Row} icon="shield" t="Poradnik bezpieczeństwa" s="Działa bez internetu" onClick=${() => c.go('alert-guide')}/>
    </div>
    <div class="actions"><button class="btn">Spróbuj zaktualizować ponownie</button></div>
    <p class="small" style="margin-top:10px">Masz telefon z Androidem 8? Miesiąc przed końcem wsparcia aplikacja Cię ostrzeże i powie, co zrobić.</p>
  </div>`;
}

function Roadmap(c) {
  const r = [['Karta ratunkowa bez internetu', 'Grupa krwi, alergie, kontakty alarmowe', 'ice'], ['Zgłaszanie szkód ze zdjęciami', 'Po ataku lub powodzi, komisja ogląda szkody', 'damage-1'], ['Identyfikator medyczny', 'Na ekranie blokady, tylko za zgodą', 'medical-id'], ['Zgoda obojga rodziców', 'Paszport dziecka bez wizyty drugiego rodzica', 'consent2'], ['Szkoła w aplikacji', 'Frekwencja, usprawiedliwienia, zgody', 'school'], ['Mój samochód', 'OC, przegląd, punkty, mandaty', 'car'], ['Podatki', 'Twój e-PIT, zwrot, opłaty lokalne', 'taxes'], ['Urządzenia i sesje', 'Wyloguj zgubiony telefon', 'devices'], ['Tarcza antyoszustwa', 'Sprawdź SMS, zgłoś do CERT', 'scam'], ['Tłumacz PJM', 'Wideo z tłumaczem na każdym ekranie', 'pjm'], ['Dokumenty od wystawcy', 'Dyplomy i uprawnienia bez skanów', 'issued']];
  return html`<div><h1 class="h-l">Nowe funkcje</h1><p class="lead">11 rzeczy, o które prosili ludzie w badaniach. Każdą da się kliknąć.</p>
    <div class="list">${r.map(([t, s, go], i) => html`<button class="row" onClick=${() => c.go(go)}><span class="it">${String(i + 1).padStart(2, '0')}</span><span class="tx"><div class="t">${t}</div><div class="s">${s}</div></span><span class="chev">${I('chevron', 18)}</span></button>`)}</div></div>`;
}

function About(c) {
  return html`<div><h1 class="h-l">O tej koncepcji</h1>
    <p>Ten prototyp nowego mObywatela to niezależna koncepcja na konkurs mObywatel Challenge (mobywatel.ai). Nie jest oficjalną aplikacją mObywatel ani usługą administracji.</p>
    <p class="small">Wszystkie osoby, adresy i numery są fikcyjne. Asystent w tej wersji działa na przygotowanych scenariuszach. Wersja docelowa korzysta z polskich modeli językowych (Bielik lub PLLuM) z filtrem Bielik Guard.</p>
    <p class="small">Wzorce zaczerpnięte z: Diia (Ukraina), Singpass i LifeSG (Singapur), GOV.UK, Digital Post (Dania), aplikacja Home Front Command (Izrael), portfel EUDI.</p></div>`;
}

/* ---------- One-screen features ---------- */
function Car(c) {
  return html`<div><${Hero} n="car" bg="sky"/><h1 class="h-l">Toyota Yaris, KR 4F21</h1>
    <div class="list">
      <${Row} icon="shield" t="OC" s="Kończy się 6 grudnia" right=${html`<span class="pill p-red">12 dni</span>`} onClick=${() => c.toast('Pokażemy oferty OC. Wybór i zakup po Twojej stronie.')}/>
      <${Row} icon="car" t="Przegląd techniczny" s="Do 14 lutego 2027" right=${html`<span class="pill p-gray">82 dni</span>`} onClick=${() => {}}/>
      <${Row} icon="doc" t="Punkty karne" s="0 punktów" right=${html`<span class="pill p-green">Czysto</span>`} onClick=${() => {}}/>
    </div>
    <div class="actions"><button class="btn ghost" onClick=${() => c.go('car-sell')}>Sprzedaję ten samochód</button></div></div>`;
}
function CarSell(c) {
  return html`<div><p class="stepk">Ważny moment</p><h1 class="h-l">Sprzedaż samochodu</h1>
    <p class="lead">Jedna sprawa w aplikacji zamiast trzech wizyt w urzędach. Kupujący potwierdza w swojej aplikacji.</p>
    <div class="road">${['Wpisz numer PESEL lub NIP kupującego', 'Kupujący potwierdza zakup w swojej aplikacji', 'Zgłaszamy sprzedaż auta w starostwie', 'Przenosimy lub wypowiadamy OC'].map((t, i) => html`<div class="n">${i + 1}</div><div class="b">${t}</div>`)}</div>
    <div class="actions"><button class="btn" onClick=${() => c.toast('Ten ekran jest tylko przykładem.')}>Rozpocznij</button></div></div>`;
}
function Benefits(c) {
  return html`<div><${Hero} n="coin" bg="yellow"/><h1 class="h-l">Świadczenia, które mogą Ci przysługiwać</h1>
    <div class="note amber">${I('lock', 18)}<span>Sprawdzamy to tylko za Twoją zgodą, na podstawie danych o rodzinie. Nic nie składamy bez Ciebie.</span></div>
    <div class="list" style="margin-top:12px">
      <${Row} icon="coin" t="800+ na drugie dziecko" s="Po urodzeniu Julii" right=${html`<span class="pill p-green">Pasuje</span>`} onClick=${() => c.go('baby-1')}/>
      <${Row} icon="card" t="Karta Dużej Rodziny" s="Od trojga dzieci" right=${html`<span class="pill p-gray">Nie teraz</span>`} onClick=${() => {}}/>
      <${Row} icon="coin" t="Ulga na dzieci w PIT" s="Przy rozliczeniu za 2026" right=${html`<span class="pill p-green">Pasuje</span>`} onClick=${() => {}}/>
    </div></div>`;
}
function P800(c) {
  return html`<div><h1 class="h-l">800+</h1>
    <div class="list">
      <div class="field"><div class="l">Zosia</div><div class="v">800 zł miesięcznie · od czerwca 2026 do maja 2027</div></div>
      <div class="field"><div class="l">Następna wypłata</div><div class="v">28 listopada, na konto •• 4821</div></div>
      ${c.s.babyDone && html`<div class="field"><div class="l">Julia</div><div class="v">Wniosek w ZUS · decyzja do 24 grudnia</div></div>`}
    </div><p class="tiny" style="margin-top:10px">Nie musisz logować się do ZUS ani do banku.</p></div>`;
}
function Vacc(c) {
  return html`<div><h1 class="h-l">Szczepienia Zosi</h1>
    <div class="list">
      <${Row} t="MMR, dawka 2" s="Zalecane do 31 grudnia" right=${html`<span class="pill p-amber">Umów</span>`} onClick=${() => c.go('visit-1')}/>
      <${Row} t="DTaP, dawka 5" s="Wykonane 12 września 2026" right=${html`<span class="pill p-gray">Gotowe</span>`} onClick=${() => {}}/>
      <${Row} t="Polio, dawka 4" s="Wykonane 12 września 2026" right=${html`<span class="pill p-gray">Gotowe</span>`} onClick=${() => {}}/>
    </div></div>`;
}
function RenewPass(c) {
  return html`<div><p class="stepk">Zosia</p><h1 class="h-l">Nowy paszport dla Zosi</h1>
    <p class="lead">Wniosek przygotujemy z danych, które już są w rejestrach. Potrzebna jest zgoda obojga rodziców.</p>
    <div class="list"><div class="field"><div class="l">Wizyta w urzędzie</div><div class="v">Tylko zdjęcie, dzieci do 12 lat nie oddają odcisków palców</div></div><div class="field"><div class="l">Opłata</div><div class="v">30 zł</div></div></div>
    <div class="actions"><button class="btn" onClick=${() => c.go('consent2')}>Dalej: zgoda obojga rodziców</button></div></div>`;
}
