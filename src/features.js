/* ---------- 11 features from "Co dalej" ---------- */
const NewTag = () => html`<span class="newtag">Nowe</span>`;

/* 1 + 3: Karta ratunkowa i identyfikator medyczny */
function Ice(c) {
  const [lock, setLock] = useState(c.s.medLock !== false);
  return html`<div>
    <p class="stepk">Karta ratunkowa</p><h1 class="h-l">Na wypadek, gdy nie możesz mówić</h1>
    <div class="icecard">
      <div class="ice-h"><span class="ice-star">${I('plus', 18)}</span><div><div class="t">Anna Nowicka</div><div class="s">34 lata · 168 cm · 61 kg</div></div></div>
      <div class="ice-g">
        <div><div class="l">Grupa krwi</div><div class="v">A Rh+</div></div>
        <div><div class="l">Alergie</div><div class="v">Penicylina</div></div>
        <div><div class="l">Leki</div><div class="v">Euthyrox 50</div></div>
        <div><div class="l">Choroby</div><div class="v">Niedoczynność tarczycy</div></div>
      </div>
      <div class="ice-c"><div class="l">Kontakt w nagłych wypadkach</div>
        <div class="ice-p"><span>Tomasz Nowicki · partner</span><span class="mini">${I('phone', 14)} Zadzwoń</span></div>
        <div class="ice-p"><span>Stanisław Nowicki · tata</span><span class="mini">${I('phone', 14)} Zadzwoń</span></div></div>
    </div>
    <div class="list" style="margin-top:14px">
      <div class="row"><span class="it" style="background:#ff3b30!important">${I('lock', 18)}</span><span class="tx"><div class="t">Pokaż na ekranie blokady</div><div class="s">Ratownik zobaczy kartę bez odblokowania telefonu</div></span><${Toggle} on=${lock} label="Pokaż na ekranie blokady" set=${v => { setLock(v); c.set({ medLock: v }); }}/></div>
      <div class="row"><span class="it">${I('wifi', 18)}</span><span class="tx"><div class="t">Działa bez internetu</div><div class="s">Zapisana w telefonie, zaszyfrowana</div></span></div>
      <button class="row" onClick=${() => c.go('medical-id')}><span class="it">${I('eye', 18)}</span><span class="tx"><div class="t">Zobacz, co widzi ratownik</div></span><span class="chev">${I('chevron', 18)}</span></button>
    </div>
    <p class="tiny" style="margin-top:12px">Alergie i leki pobieramy z Internetowego Konta Pacjenta za Twoją zgodą. Grupę krwi i kontakty wpisujesz sama.</p>
  </div>`;
}
function MedicalId(c) {
  return html`<div class="lock medlock" role="region" aria-label="Ekran blokady: identyfikator medyczny">
    <div class="lk-top"><div class="lk-date" style="margin-top:6px">Ekran blokady · widok ratownika</div></div>
    <div class="med">
      <div class="med-h"><span class="ice-star" style="background:#ff3b30">${I('plus', 16)}</span><b>Identyfikator medyczny</b></div>
      <div class="med-n">Anna Nowicka, 34</div>
      <div class="med-r"><span>Grupa krwi</span><b>A Rh+</b></div>
      <div class="med-r"><span>Alergie</span><b>Penicylina</b></div>
      <div class="med-r"><span>Leki</span><b>Euthyrox 50</b></div>
      <div class="med-r"><span>Kontakt</span><b>Tomasz · 600 123 456</b></div>
      <div class="med-f">Dane bez PESEL i adresu. Udostępnione przez właścicielkę telefonu.</div>
    </div>
    <div style="flex:1"></div>
    <div class="lk-foot"><button class="lk-btn" onClick=${c.back}>${I('left', 15)} Wróć do karty</button><button class="lk-btn" style="background:#ff3b30">${I('phone', 15)} 112</button></div>
  </div>`;
}

/* 2: Zgłaszanie szkód */
function Damage1(c) {
  const [n, setN] = useState(c.s.dmgPhotos || 0);
  return html`<div>
    <p class="stepk">Zgłoszenie szkód · krok 1 z 3</p><${Progress} n=${1} of=${3}/>
    <h1 class="h-l">Zrób zdjęcia szkód</h1>
    <p class="lead">Do każdego zdjęcia dodamy datę i miejsce. Nikt ich potem nie zmieni.</p>
    <div class="photos">
      ${[0, 1, 2, 3].map(i => i < n ? html`<div class="ph"><svg viewBox="0 0 100 100" width="100%" height="100%"><rect width="100" height="100" fill=${['#c9c4bb', '#b7b1a6', '#d2ccc2', '#bfb9ae'][i]}/><path d=${['M10 70 40 40 60 60 75 45 95 70V100H10z', 'M0 60H100V100H0zM20 20h30v40H20z', 'M15 80 50 30 85 80z', 'M0 50 100 40V100H0z'][i]} fill="rgba(0,0,0,.18)"/></svg><span>15:58 · Kraków</span></div>`
        : html`<button class="ph add" onClick=${() => { setN(n + 1); c.set({ dmgPhotos: n + 1 }); }}>${I('camera', 24)}<span>${i === n ? 'Zrób zdjęcie' : ''}</span></button>`)}
    </div>
    <div class="actions"><button class="btn" disabled=${n === 0} style=${n === 0 ? 'opacity:.4' : ''} onClick=${() => c.go('damage-2')}>Dalej</button></div>
  </div>`;
}
function Damage2(c) {
  const [k, setK] = useState('dom');
  return html`<div>
    <p class="stepk">Zgłoszenie szkód · krok 2 z 3</p><${Progress} n=${2} of=${3}/>
    <h1 class="h-l">Co zostało uszkodzone?</h1>
    <div class="seg full" style="margin-bottom:14px">${[['dom', 'Mieszkanie'], ['auto', 'Samochód'], ['inne', 'Inne']].map(([v, t]) => html`<button aria-pressed=${k === v} onClick=${() => setK(v)}>${t}</button>`)}</div>
    <div class="list">
      <div class="field"><div class="l">Adres</div><div class="v">ul. Długa 12/4, Kraków</div><${Src} t="rejestr PESEL"/></div>
      <div class="field"><div class="l">Zdarzenie</div><div class="v">Alarm powietrzny, 24 listopada</div><${Src} t="Alert RCB"/></div>
      <div class="field"><div class="l">Opis</div><div class="v">Wybite okna w kuchni i pokoju, zalany parkiet</div></div>
      <div class="field"><div class="l">Konto do wypłaty</div><div class="v">PKO BP •••• 4471</div><${Src} t="konto do zwrotu podatku"/></div>
    </div>
    <div class="actions"><button class="btn" onClick=${() => c.confirm({ t: 'Wysłać zgłoszenie do gminy?', items: ['4 zdjęcia z datą i miejscem', 'Opis szkód: mieszkanie', 'Konto do wypłaty •••• 4471'], ok: 'Wyślij', done: () => c.go('damage-3') })}>Sprawdź i wyślij</button></div>
  </div>`;
}
function Damage3(c) {
  return html`<div>
    <${Hero} n="shelter"/>
    <h1 class="h-l">Zgłoszenie przyjęte</h1>
    <p class="lead">Numer sprawy: KR/SZK/2026/0412. Zajmuje się nią Urząd Miasta Krakowa.</p>
    <div class="list timeline">
      ${[['Zgłoszenie wysłane', 'Dziś, 16:04', 1], ['Komisja ogląda szkody', 'Wybierz termin: 26 lub 27 listopada', 0], ['Komisja wycenia szkody', 'Wynik zobaczysz tutaj', 0], ['Wypłata zasiłku', 'Na konto •••• 4471', 0]].map(([t, s, d]) => html`<div class="row"><span class=${'tl' + (d ? ' on' : '')}></span><span class="tx"><div class="t">${t}</div><div class="s">${s}</div></span></div>`)}
    </div>
    <div class="actions"><button class="btn" onClick=${() => c.toast('Komisja przyjdzie 26 listopada, 10:00–12:00')}>Wybierz termin wizyty komisji</button></div>
  </div>`;
}

/* 4: Zgoda obojga rodziców */
function Consent2(c) {
  const [tom, setTom] = useState(c.s.tomOk || false);
  useEffect(() => { if (c.s.askedTom && !tom) { const t = setTimeout(() => { setTom(true); c.set({ tomOk: true }); }, 2200); return () => clearTimeout(t); } }, [c.s.askedTom]);
  return html`<div>
    <p class="stepk">Paszport dla Zosi</p><h1 class="h-l">Potrzebna zgoda obojga rodziców</h1>
    <p class="lead">Od czerwca 2026 drugi rodzic może zatwierdzić paszport w swoim mObywatelu. Rozszerzamy to na szkołę i wyjazdy, w jednym miejscu.</p>
    <div class="list">
      <div class="row"><span class="face-i" style="background:#22408f">AN</span><span class="tx"><div class="t">Anna</div><div class="s">Zatwierdzone dziś, 16:10</div></span><span class="pill p-green">Zgoda</span></div>
      <div class="row"><span class="face-i" style="background:#3d5a80">TN</span><span class="tx"><div class="t">Tomasz</div><div class="s">${tom ? 'Zatwierdzone dziś, 16:11' : c.s.askedTom ? 'Prośba wysłana, czekamy…' : 'Jeszcze nie zapytany'}</div></span>${tom ? html`<span class="pill p-green">Zgoda</span>` : html`<span class="pill p-gray">${c.s.askedTom ? 'Czeka' : '—'}</span>`}</div>
    </div>
    <div class="list" style="margin-top:14px">
      <div class="field"><div class="l">Wizyta w urzędzie</div><div class="v">Tylko zdjęcie. Dzieci do 12 lat nie oddają odcisków palców</div></div>
      <div class="field"><div class="l">Opłata</div><div class="v">30 zł</div></div>
    </div>
    <div class="actions">${tom ? html`<button class="btn" onClick=${() => c.toast('Wizyta: Małopolski Urząd Wojewódzki, 2 grudnia, 9:20')}>Umów wizytę w urzędzie</button>`
      : html`<button class="btn" onClick=${() => c.set({ askedTom: true })}>Poproś Tomasza o zgodę</button>`}</div>
  </div>`;
}

/* 5: Szkoła */
function School(c) {
  const [tab, setTab] = useState('dziś');
  const [ex, setEx] = useState(c.s.excused || false);
  return html`<div>
    <div style="display:flex;gap:12px;align-items:center;margin-top:4px"><span class="face-i" style="background:#b0533f">ZN</span><div><div class="t" style="font-weight:600;font-size:17px">Zosia · zerówka</div><div class="small">Szkoła Podstawowa nr 9, Kraków</div></div></div>
    <h1 class="h-l">Szkoła</h1>
    <div class="seg full" style="margin-bottom:14px">${['dziś', 'frekwencja', 'oceny'].map(t => html`<button aria-pressed=${tab === t} onClick=${() => setTab(t)}>${t[0].toUpperCase() + t.slice(1)}</button>`)}</div>
    ${tab === 'dziś' && html`<div>
      <div class="list">
        <div class="row"><span class="it" style="background:#ff9500!important">${I('bell', 18)}</span><span class="tx"><div class="t">Nieobecność wczoraj</div><div class="s">${ex ? 'Usprawiedliwiona przez Ciebie, 16:20' : 'Poniedziałek, 23 listopada, cały dzień'}</div></span>${ex ? html`<span class="pill p-green">OK</span>` : html`<button class="mini" onClick=${() => { setEx(true); c.set({ excused: true }); c.toast('Wychowawczyni dostała usprawiedliwienie.'); }}>Usprawiedliw</button>`}</div>
        <div class="row"><span class="it" style="background:#34c759!important">${I('route', 18)}</span><span class="tx"><div class="t">Wycieczka do Ojcowa, 4 grudnia</div><div class="s">Zgoda rodzica i 45 zł</div></span><button class="mini" onClick=${() => c.toast('Zgoda wyrażona. Płatność BLIK w pełnej wersji.')}>Zgoda</button></div>
        <div class="row"><span class="it">${I('mail', 18)}</span><span class="tx"><div class="t">Wiadomość od wychowawczyni</div><div class="s">„Jutro zajęcia z bezpieczeństwa, proszę o kamizelkę odblaskową”</div></span></div>
      </div></div>`}
    ${tab === 'frekwencja' && html`<div class="card" style="padding:16px">
      <div style="display:flex;justify-content:space-between;align-items:baseline"><div class="h-m">96%</div><div class="small">listopad</div></div>
      <div class="att">${Array.from({ length: 20 }, (_, i) => html`<i class=${i === 15 ? (ex ? 'ex' : 'ab') : ''}></i>`)}</div>
      <div class="small" style="margin-top:8px">1 nieobecność${ex ? ' (usprawiedliwiona)' : ''} · 0 spóźnień</div></div>`}
    ${tab === 'oceny' && html`<div class="card" style="padding:16px"><div class="small">Ocena opisowa za I półrocze pojawi się w styczniu. W klasach 1–3 oceny też są opisowe.</div>
      <div class="note" style="margin-top:12px;background:var(--fill)">${I('sparkle', 18)}<span>Jeśli chcesz, streścimy ocenę w trzech zdaniach.</span></div></div>`}
    <p class="tiny" style="margin-top:12px">Widzą oboje rodzice. Dane z dziennika elektronicznego szkoły.</p>
  </div>`;
}

/* 6: Mój samochód (rozbudowany) */
function CarFull(c) {
  return html`<div>
    <${Hero} n="car"/>
    <h1 class="h-l">Toyota Yaris</h1>
    <p class="lead" style="margin-top:-6px">KR 4F21 · 2019 · benzyna</p>
    <div class="stats">
      <div><div class="l">OC</div><div class="v red">12 dni</div></div>
      <div><div class="l">Przegląd</div><div class="v">82 dni</div></div>
      <div><div class="l">Punkty</div><div class="v">3 / 24</div></div>
    </div>
    <div class="list">
      <${Row} icon="shield" t="OC: Warta, do 6 grudnia" s="Porównaj oferty i przedłuż" onClick=${() => c.toast('Pokażemy oferty OC. Wybór i zakup po Twojej stronie.')}/>
      <${Row} icon="car" t="Przegląd techniczny" s="Do 14 lutego 2027 · 98 412 km" onClick=${() => {}}/>
      <${Row} icon="doc" t="Punkty karne: 3" s="Przekroczenie prędkości, 12 września. Wygasną 12 września 2027" onClick=${() => {}}/>
    </div>
    <${Sec} t="Mandaty"/>
    <div class="list">
      <div class="row"><span class="tx"><div class="t">Mandat 200 zł</div><div class="s">Parkowanie, ul. Długa, 18 listopada · do zapłaty do 25 listopada</div></span>${c.s.paid ? html`<span class="pill p-green">Opłacony</span>` : html`<button class="mini" onClick=${() => c.confirm({ t: 'Zapłacić mandat 200 zł?', items: ['Mandat nr KR 0021934', 'Odbiorca: Straż Miejska Kraków', 'Płatność BLIK'], ok: 'Zapłać', done: () => { c.set({ paid: true }); c.toast('Opłacono. Potwierdzenie w Skrzynce.'); } })}>Zapłać</button>`}</div>
    </div>
    <div class="actions"><button class="btn ghost" onClick=${() => c.go('car-sell')}>Sprzedaję ten samochód</button></div>
  </div>`;
}

/* 7: Podatki */
function Taxes(c) {
  return html`<div>
    <${Hero} n="coin"/>
    <h1 class="h-l">Podatki</h1>
    <div class="card taxhero">
      <div class="small">PIT-37 za 2025 · Twój e-PIT · zwrot do 45 dni</div>
      <div class="big">1 284 zł</div><div class="small">zwrotu, wysłany 3 marca na konto •••• 4471</div>
      <div class="steps" style="grid-template-columns:repeat(3,1fr)"><i class="on"></i><i class="on"></i><i class="on"></i></div>
      <div class="small">Złożony · przyjęty · zwrot wypłacony</div>
    </div>
    <${Sec} t="Opłaty lokalne"/>
    <div class="list">
      <div class="row"><span class="tx"><div class="t">Podatek od nieruchomości</div><div class="s">4. rata: 86 zł · termin 15 listopada</div></span>${c.s.propPaid ? html`<span class="pill p-green">Opłacony</span>` : html`<button class="mini" onClick=${() => { c.set({ propPaid: true }); c.toast('Opłacono 86 zł'); }}>Zapłać</button>`}</div>
      <div class="row"><span class="tx"><div class="t">Opłata za śmieci</div><div class="s">Grudzień: 3 osoby × 46 zł</div></span><span class="due">138 zł</span></div>
    </div>
    <${Sec} t="Pisma"/>
    <div class="list"><${Row} icon="mail" t="Wezwanie z urzędu skarbowego" s="Wyjaśnimy prostym językiem" onClick=${() => c.go('letter-2')}/></div>
  </div>`;
}

/* 8: Urządzenia i sesje */
function Devices(c) {
  const [lost, setLost] = useState(c.s.lost || false);
  return html`<div>
    <h1 class="h-l">Urządzenia i sesje</h1>
    <p class="lead">Tu widzisz, gdzie jesteś zalogowana. Jeśli zgubisz telefon, wyloguj go stąd albo z gov.pl na innym urządzeniu.</p>
    <div class="list">
      <div class="row"><span class="it">${I('phone', 18)}</span><span class="tx"><div class="t">iPhone 15 · ten telefon</div><div class="s">Kraków · aktywny teraz</div></span></div>
      <div class="row"><span class="it" style=${lost ? 'background:#8e8e93!important' : ''}>${I('phone', 18)}</span><span class="tx"><div class="t">iPhone 11 · stary</div><div class="s">${lost ? 'Wylogowany, mDowód usunięty z telefonu' : 'Ostatnio: 2 listopada, Katowice'}</div></span>${lost ? html`<span class="pill p-gray">Wylogowany</span>` : html`<button class="mini" style="color:#ff3b30" onClick=${() => c.confirm({ t: 'Wylogować iPhone 11?', items: ['Wylogujemy aplikację', 'Usuniemy z niego mDowód i dokumenty', 'Kod QR z tego telefonu przestanie działać'], ok: 'Wyloguj', done: () => { setLost(true); c.set({ lost: true }); } })}>Wyloguj</button>`}</div>
      <div class="row"><span class="it">${I('card', 18)}</span><span class="tx"><div class="t">Przeglądarka · gov.pl</div><div class="s">MacBook · dziś, 9:12</div></span></div>
    </div>
    <div class="note" style="margin-top:14px">${I('bell', 18)}<span>Dostaniesz powiadomienie przy każdym nowym logowaniu. Jeśli to nie Ty, wylogujesz je jednym ruchem.</span></div>
  </div>`;
}

/* 9: Tarcza antyoszustwa */
function Scam(c) {
  const [chk, setChk] = useState(false);
  return html`<div>
    <${Hero} n="lock"/>
    <h1 class="h-l">Tarcza antyoszustwa</h1>
    <p class="lead">Wklej podejrzaną wiadomość. Sprawdzimy link na liście ostrzeżeń CERT Polska.</p>
    <div class="sms"><div class="sms-h">SMS · +48 731 •••</div>Twoja paczka czeka. Dopłać 1,99 zł: inpost-dopłata.pl/x7</div>
    ${!chk ? html`<div class="actions"><button class="btn" onClick=${() => setChk(true)}>Sprawdź wiadomość</button></div>`
      : html`<div class="verdict">
        <div class="vh">${I('x', 18)} To oszustwo</div>
        <div class="small" style="color:var(--ink)">Ta strona jest na liście ostrzeżeń CERT Polska od 21 listopada. Firmy kurierskie nie proszą o dopłaty SMS-em z linkiem.</div>
        <div class="actions row2" style="margin-top:12px"><button class="btn soft" onClick=${() => c.toast('Usunięte')}>Usuń</button><button class="btn" onClick=${() => c.toast('Przekazano do CERT Polska (SMS 8080)')}>Zgłoś do CERT</button></div></div>`}
    <div class="list" style="margin-top:14px">
      <div class="row"><span class="it" style="background:#34c759!important">${I('check', 18)}</span><span class="tx"><div class="t">mObywatel nigdy nie pisze SMS-ów z linkiem</div><div class="s">Prawdziwe wiadomości od urzędów są tylko w Skrzynce aplikacji</div></span></div>
    </div>
  </div>`;
}

/* 10: Tłumacz PJM */
function Pjm(c) {
  const [on, setOn] = useState(false);
  return html`<div>
    <h1 class="h-l">Tłumacz polskiego języka migowego</h1>
    <p class="lead">Na każdym ekranie przycisk „PJM”. Łączy z tłumaczem na wideo, w dni robocze 8–20.</p>
    <div class="video">
      <svg viewBox="0 0 320 200" width="100%" aria-hidden="true"><rect width="320" height="200" fill="#2c2f36"/><circle cx="160" cy="78" r="28" fill="#e8c9a8"/><path d="M104 200c4-48 28-70 56-70s52 22 56 70z" fill="#22408f"/>
        <g class=${on ? 'sign' : ''}><path d="M110 150c-8-24-2-44 10-50" stroke="#e8c9a8" stroke-width="14" stroke-linecap="round" fill="none"/><path d="M212 150c10-20 16-44 2-58" stroke="#e8c9a8" stroke-width="14" stroke-linecap="round" fill="none"/></g></svg>
      <div class="vlabel">${on ? html`<span class="lv-dot"></span> Tłumaczka Marta · połączono` : 'Kamera wyłączona'}</div>
    </div>
    <div class="actions">${on ? html`<button class="btn" style="background:#ff3b30" onClick=${() => setOn(false)}>Zakończ</button>` : html`<button class="btn" onClick=${() => setOn(true)}>${I('camera', 18)} Połącz z tłumaczem</button>`}</div>
    <div class="list" style="margin-top:14px">
      <div class="row"><span class="tx"><div class="t">Przycisk PJM na każdym ekranie</div></span><${Toggle} on=${!!c.s.pjm} label="Przycisk PJM" set=${v => c.set({ pjm: v })}/></div>
      <div class="row"><span class="tx"><div class="t">Napisy do komunikatów głosowych</div></span><${Toggle} on=${true} label="Napisy" set=${() => {}}/></div>
    </div>
  </div>`;
}

/* 11: Dokumenty od wystawcy */
function Issued(c) {
  const [acc, setAcc] = useState(c.s.diploma || false);
  return html`<div>
    <h1 class="h-l">Dokumenty od wystawcy</h1>
    <p class="lead">Uczelnie, szkoły i urzędy wydają dokumenty prosto do aplikacji. Bez skanów i kopii „za zgodność”.</p>
    ${!acc ? html`<div class="card" style="padding:16px">
      <div class="small">Nowy dokument · dziś</div>
      <div class="h-m" style="margin:4px 0 2px">Dyplom ukończenia studiów</div>
      <div class="small">Uniwersytet Jagielloński · Pielęgniarstwo, magister</div>
      <div class="actions row2" style="margin-top:14px"><button class="btn soft" onClick=${() => c.toast('Odrzucono')}>Odrzuć</button><button class="btn" onClick=${() => { setAcc(true); c.set({ diploma: true }); }}>Dodaj</button></div></div>`
      : html`<div class="diploma"><div class="dh"><span>UNIWERSYTET JAGIELLOŃSKI</span><span class="flag"></span></div><div class="dn">Anna Nowicka</div><div class="dd">Magister pielęgniarstwa · 2016</div><div class="dv">${I('check', 14)} Podpisany przez wystawcę</div></div>`}
    <${Sec} t="W portfelu"/>
    <div class="list">
      <${Row} icon="card" t="Prawo wykonywania zawodu (PWZ)" s="Naczelna Izba Pielęgniarek i Położnych" onClick=${() => {}}/>
      <${Row} icon="doc" t="Świadectwo dojrzałości" s="Okręgowa Komisja Egzaminacyjna, 2011" onClick=${() => {}}/>
      ${acc && html`<${Row} icon="doc" t="Dyplom magistra" s="Uniwersytet Jagielloński, 2016" onClick=${() => {}}/>`}
    </div>
    <div class="actions"><button class="btn ghost" onClick=${() => c.go('share-min')}>Pokaż pracodawcy tylko dyplom</button></div>
  </div>`;
}
