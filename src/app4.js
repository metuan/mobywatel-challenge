/* ---------- Flow: Przeprowadzka ---------- */
function Move1(c) {
  return html`<div>
    <p class="stepk">Przeprowadzka · krok 1 z 4</p><${Progress} n=${1} of=${4}/>
    <${Hero} n="move" bg="sand"/>
    <h1 class="h-l">Dokąd się przeprowadzasz?</h1>
    <div class="list">
      <div class="field"><div class="l">Nowy adres</div><div class="v">ul. Długa 12/4, 31-147 Kraków</div><div class="src">${I('check', 12)} Z umowy najmu, którą dodałaś 20 listopada</div></div>
      <div class="field"><div class="l">Od kiedy</div><div class="v">1 grudnia 2026</div></div>
      <div class="field"><div class="l">Kto się przeprowadza</div><div class="v">Ty, Tomasz, Zosia</div></div>
    </div>
    <div class="actions"><button class="btn" onClick=${() => c.go('move-2')}>Dalej</button></div>
  </div>`;
}
function Move2(c) {
  const [on, setOn] = useState({ meld: true, gp: true, vote: true, car: true });
  const items = [['meld', 'Urząd Miasta Krakowa', 'Zameldowanie na pobyt stały, 3 osoby', 'UM', '#3b5bab'], ['gp', 'Narodowy Fundusz Zdrowia', 'Lekarz rodzinny: Przychodnia Długa, 300 m', 'NFZ', '#1c7a4c'], ['vote', 'Krajowe Biuro Wyborcze', 'Miejsce głosowania: obwód nr 87', 'KBW', '#8a5a14'], ['car', 'Wydział Komunikacji', 'Adres w dowodzie rejestracyjnym, do 30 dni', 'WK', '#6b3fa0']];
  const n = Object.values(on).filter(Boolean).length;
  return html`<div>
    <p class="stepk">Przeprowadzka · krok 2 z 4</p><${Progress} n=${2} of=${4}/>
    <h1 class="h-l">Zaktualizuj adres we wszystkich urzędach</h1>
    <p class="lead">Asystent znalazł 4 miejsca, gdzie Twój adres musi się zmienić. Odznacz to, czego nie chcesz teraz załatwiać.</p>
    <div class="card" style="padding:6px 0">
      <div style="display:flex;justify-content:space-between;align-items:center;padding:12px 18px 6px"><span class="small">ul. Długa 12/4, Kraków</span><span class="small">${n} z 4</span></div>
      ${items.map(([k, t, sub, ini, col]) => html`<button class="row" role="checkbox" aria-checked=${on[k]} onClick=${() => setOn({ ...on, [k]: !on[k] })}>
        <span class="org">${ini}</span>
        <span class="tx"><div class="t">${t}</div><div class="s">${sub}</div></span>
        <span class="check" aria-checked=${on[k]}>${on[k] ? I('check', 15) : ''}</span></button>`)}
    </div>
    <div class="note" style="margin-top:12px">${I('sparkle', 18)}<span>Asystent może się mylić. W następnym kroku zobaczysz każde pole i jego źródło.</span></div>
    <div class="actions"><button class="btn" onClick=${() => { c.set({ moveSel: on }); c.go('move-3'); }}>Pokaż podgląd</button></div>
  </div>`;
}
function Move3(c) {
  const sel = c.s.moveSel || { meld: true, gp: true, vote: true, car: true };
  const n = Object.values(sel).filter(Boolean).length;
  return html`<div>
    <p class="stepk">Przeprowadzka · krok 3 z 4</p><${Progress} n=${3} of=${4}/>
    <h1 class="h-l">Sprawdź przed wysłaniem</h1>
    ${sel.meld && html`<div class="sec"><h3>Zameldowanie</h3></div><div class="list">
      <div class="field"><div class="l">Osoby</div><div class="v">Anna, Tomasz i Zofia Nowiccy</div><${Src} t="rejestr PESEL"/></div>
      <div class="field"><div class="l">Adres</div><div class="v">ul. Długa 12/4, 31-147 Kraków</div><${Src} t="umowa najmu z 20.11"/></div>
      <div class="field"><div class="l">Zgoda właściciela</div><div class="v">Jan Kowalczyk · potwierdzi w swojej aplikacji</div></div></div>`}
    ${sel.gp && html`<div class="sec"><h3>Lekarz rodzinny</h3></div><div class="list"><div class="field"><div class="l">Nowa przychodnia</div><div class="v">Przychodnia Długa, ul. Długa 40</div><${Src} t="NFZ, wyszukiwarka placówek"/></div></div>`}
    ${sel.vote && html`<div class="sec"><h3>Wybory</h3></div><div class="list"><div class="field"><div class="l">Nowy lokal wyborczy</div><div class="v">Lokal nr 87, Szkoła Podstawowa nr 9</div><${Src} t="Krajowe Biuro Wyborcze"/></div></div>`}
    ${sel.car && html`<div class="sec"><h3>Samochód</h3></div><div class="list"><div class="field"><div class="l">Pojazd</div><div class="v">Toyota Yaris, KR 4F21</div><${Src} t="CEPiK"/></div></div>`}
    <div class="actions"><button class="btn" onClick=${() => c.confirm({ t: `Wysłać ${n} ${n === 1 ? 'wniosek' : 'wnioski'}?`, items: ['Zameldowanie', 'Lekarz rodzinny', 'Miejsce głosowania', 'Dowód rejestracyjny'].filter((_, i) => Object.values(sel)[i]), ok: 'Potwierdź i wyślij', done: () => { c.set({ moved: true }); c.go('move-done'); } })}>Potwierdź</button>
    <button class="btn ghost" onClick=${() => c.go('move-2')}>Wróć i zmień</button></div>
  </div>`;
}
function MoveDone(c) {
  return html`<div>
    <${Hero} n="move" bg="mint"/>
    <div class="done-mark" style="margin-top:-34px;margin-left:16px;position:relative;border:4px solid #fff">${I('check', 28)}</div>
    <h1 class="h-l">Wysłane. Resztą zajmiemy się razem.</h1>
    <div class="list">
      <${Row} t="Zameldowanie" s="Przyjęte. Właściciel potwierdził o 15:12." right=${html`<span class="pill p-green">Przyjęte</span>`} onClick=${() => {}}/>
      <${Row} t="Lekarz rodzinny" s="Deklaracja aktywna od 1 grudnia" right=${html`<span class="pill p-green">Gotowe</span>`} onClick=${() => {}}/>
      <${Row} t="Miejsce głosowania" s="Zmienione" right=${html`<span class="pill p-green">Gotowe</span>`} onClick=${() => {}}/>
      <${Row} t="Dowód rejestracyjny" s="Urząd odpowie do 8 grudnia" right=${html`<span class="pill p-navy">W toku</span>`} onClick=${() => c.go('case-meld')}/>
    </div>
    <div class="actions"><button class="btn" onClick=${() => c.go('today')}>Wróć do ekranu Dziś</button></div>
  </div>`;
}

/* ---------- Flow: Nowe dziecko ---------- */
function Baby1(c) {
  return html`<div>
    <p class="stepk">Nowe dziecko · krok 1 z 4</p><${Progress} n=${1} of=${4}/>
    <${Hero} n="baby" bg="rose"/>
    <h1 class="h-l">Gratulacje! Zgłośmy narodziny.</h1>
    <div class="note">${I('doc', 18)}<span>Szpital Uniwersytecki zgłosił urodzenie 15 listopada. Masz czas do 6 grudnia.</span></div>
    <div class="list" style="margin-top:12px">
      <div class="field"><div class="l">Imię dziecka</div><div class="v">Julia</div></div>
      <div class="field"><div class="l">Nazwisko</div><div class="v">Nowicka</div><${Src} t="nazwisko Zosi, zgodne z oświadczeniem rodziców"/></div>
      <div class="field"><div class="l">Data i miejsce urodzenia</div><div class="v">15 listopada 2026, Kraków</div><${Src} t="karta urodzenia ze szpitala"/></div>
      <div class="field"><div class="l">Adres</div><div class="v">ul. Długa 12/4, Kraków</div></div>
    </div>
    <div class="actions"><button class="btn" onClick=${() => c.go('baby-2')}>Dalej</button></div>
  </div>`;
}
function Baby2(c) {
  const [on, setOn] = useState({ p800: true, nfz: true, pass: false });
  return html`<div>
    <p class="stepk">Nowe dziecko · krok 2 z 4</p><${Progress} n=${2} of=${4}/>
    <h1 class="h-l">Co załatwić od razu?</h1>
    <p class="lead">Po zgłoszeniu Julia dostanie PESEL i adres automatycznie. Te sprawy wypełnimy za Ciebie:</p>
    <div class="list">
      ${[['p800', '800+', 'Wniosek do ZUS, bez logowania na stronę ZUS'], ['nfz', 'Ubezpieczenie zdrowotne', 'Zgłoszenie do NFZ przez Twojego pracodawcę'], ['pass', 'Paszport', 'Gdy planujecie podróż']].map(([k, t, s]) => html`<div class="row"><span class="tx"><div class="t">${t}</div><div class="s">${s}</div></span><${Toggle} on=${on[k]} label=${t} set=${v => setOn({ ...on, [k]: v })}/></div>`)}
    </div>
    <div class="actions"><button class="btn" onClick=${() => c.go('baby-3')}>Pokaż podgląd</button></div>
  </div>`;
}
function Baby3(c) {
  const [stage, setStage] = useState(0);
  useEffect(() => { if (stage === 1) { const t = setTimeout(() => setStage(2), 2200); return () => clearTimeout(t); } }, [stage]);
  return html`<div>
    <p class="stepk">Nowe dziecko · krok 3 z 4</p><${Progress} n=${3} of=${4}/>
    <h1 class="h-l">Sprawdź i poproś Tomasza o zgodę</h1>
    <div class="list">
      <div class="field"><div class="l">Akt urodzenia</div><div class="v">Julia Nowicka, 15.11.2026, Kraków</div><${Src} t="szpital"/></div>
      <div class="field"><div class="l">800+</div><div class="v">800 zł/mies., konto •• 4821</div><${Src} t="wniosek na Zosię z 2026"/></div>
      <div class="field"><div class="l">NFZ</div><div class="v">Julia będzie ubezpieczona razem z Anną</div><${Src} t="ZUS, dane pracodawcy"/></div>
    </div>
    ${stage === 0 && html`<div class="actions"><button class="btn" onClick=${() => setStage(1)}>Poproś Tomasza o zgodę</button></div>`}
    ${stage === 1 && html`<div class="note amber" style="margin-top:14px">${I('bell', 18)}<span>Tomasz dostał prośbę. Czekamy, aż potwierdzi…</span></div>`}
    ${stage === 2 && html`<div><div class="note green" style="margin-top:14px">${I('check', 18)}<span>Tomasz potwierdził na swoim telefonie o 15:31.</span></div>
      <div class="actions"><button class="btn" onClick=${() => c.confirm({ t: 'Wysłać pakiet „Nowe dziecko”?', items: ['Zgłoszenie urodzenia', 'Wniosek 800+', 'Zgłoszenie do NFZ'], ok: 'Potwierdź i wyślij', done: () => { c.set({ babyDone: true }); c.go('baby-done'); } })}>Potwierdź</button></div></div>`}
  </div>`;
}
function BabyDone(c) {
  return html`<div>
    <${Hero} n="baby" bg="mint"/>
    <div class="done-mark" style="margin-top:-34px;margin-left:16px;position:relative;border:4px solid #fff">${I('check', 28)}</div>
    <h1 class="h-l">Witaj, Julio.</h1>
    <div class="list">
      <${Row} t="Akt urodzenia" s="Odpis wysłany na e-Doręczenia" right=${html`<span class="pill p-green">Gotowe</span>`} onClick=${() => {}}/>
      <${Row} t="PESEL i zameldowanie" s="Nadane automatycznie" right=${html`<span class="pill p-green">Gotowe</span>`} onClick=${() => {}}/>
      <${Row} t="Ubezpieczenie NFZ" s="Aktywne od 15 listopada" right=${html`<span class="pill p-green">Gotowe</span>`} onClick=${() => {}}/>
      <${Row} t="800+" s="Decyzja ZUS do 24 grudnia, z wyrównaniem" right=${html`<span class="pill p-navy">W toku</span>`} onClick=${() => c.go('p800')}/>
    </div>
    <div class="actions"><button class="btn" onClick=${() => c.go('family')}>Zobacz kartę Julii w Bliskich</button></div>
  </div>`;
}

/* ---------- Flow: Wizyta ---------- */
function Visit1(c) {
  return html`<div>
    <p class="stepk">e-Skierowanie · Zosia</p>
    <${Hero} n="doctor" bg="rose"/>
    <h1 class="h-l">Kardiolog dziecięcy</h1>
    <div class="list">
      <div class="field"><div class="l">Wystawił</div><div class="v">dr Ewa Mazur, Przychodnia Zdrowia nr 3</div></div>
      <div class="field"><div class="l">Powód</div><div class="v">Szmer serca, kontrola</div></div>
      <div class="field"><div class="l">Ważne do</div><div class="v">21 listopada 2027</div></div>
    </div>
    <div class="actions"><button class="btn" onClick=${() => c.go('visit-2')}>Zarezerwuj wizytę</button></div>
    <p class="tiny" style="margin-top:10px">Przez system rejestracji NFZ. Nie musisz przepisywać kodu.</p>
  </div>`;
}
function Visit2(c) {
  const [pick, setPick] = useState(0); const [wait, setWait] = useState(true);
  const slots = [['15 grudnia, 10:30', 'Szpital Dziecięcy, Prokocim', '6,1 km'], ['19 grudnia, 08:00', 'Poradnia Kardiologiczna, Nowa Huta', '9,4 km'], ['8 stycznia, 12:15', 'Centrum Medyczne Ujastek', '11 km']];
  return html`<div>
    <p class="stepk">Wybierz termin</p><h1 class="h-l">Najbliższe terminy</h1>
    <div class="seg full" style="margin-bottom:12px"><button aria-pressed="true">Najszybciej</button><button aria-pressed="false" onClick=${() => c.toast('Sortowanie po odległości w pełnej wersji')}>Najbliżej</button><button aria-pressed="false" onClick=${() => c.toast('Filtr godzin w pełnej wersji')}>Po 15:00</button></div>
    <div class="list">${slots.map(([d, p, km], i) => html`<button class="row" onClick=${() => setPick(i)} aria-pressed=${pick === i}>
      <span class="ic" style=${pick === i ? 'background:var(--navy);color:#fff' : ''}>${pick === i ? I('check', 18) : ''}</span>
      <span class="tx"><div class="t">${d}</div><div class="s">${p} · ${km}</div></span></button>`)}</div>
    <div class="row card" style="margin-top:12px"><span class="tx"><div class="t">Poczekalnia</div><div class="s">Jeśli zwolni się wcześniejszy termin, przeniesiemy wizytę i zapytamy Cię o zgodę.</div></span><${Toggle} on=${wait} set=${setWait} label="Poczekalnia"/></div>
    <div class="actions"><button class="btn" onClick=${() => { c.set({ visitPick: slots[pick] }); c.go('visit-3'); }}>Dalej</button></div>
  </div>`;
}
function Visit3(c) {
  const s = c.s.visitPick || ['15 grudnia, 10:30', 'Szpital Dziecięcy, Prokocim'];
  return html`<div>
    <p class="stepk">Podgląd</p><h1 class="h-l">Sprawdź rezerwację</h1>
    <div class="list">
      <div class="field"><div class="l">Pacjent</div><div class="v">Zofia Nowicka</div></div>
      <div class="field"><div class="l">Termin</div><div class="v">${s[0]}</div></div>
      <div class="field"><div class="l">Miejsce</div><div class="v">${s[1]}</div></div>
      <div class="field"><div class="l">Zabierz</div><div class="v">Wyniki EKG, książeczka zdrowia</div></div>
    </div>
    <div class="actions"><button class="btn" onClick=${() => c.confirm({ t: 'Zarezerwować wizytę?', items: [`Kardiolog dziecięcy, ${s[0]}`], ok: 'Potwierdź', done: () => { c.set({ visit: s[0] }); c.go('visit-4'); } })}>Potwierdź</button></div>
  </div>`;
}
function Visit4(c) {
  return html`<div>
    <${Hero} n="doctor" bg="mint"/>
    <div class="done-mark" style="margin-top:-34px;margin-left:16px;position:relative;border:4px solid #fff">${I('check', 28)}</div>
    <h1 class="h-l">Wizyta Zosi: ${c.s.visit || '15 grudnia, 10:30'}</h1>
    <div class="list">
      <div class="row"><span class="tx"><div class="t">Przypomnienia</div><div class="s">7 dni i 1 dzień przed, Tobie i Tomaszowi</div></span><${Toggle} on=${true} set=${() => {}} label="Przypomnienia"/></div>
      <${Row} icon="list" t="Dodano do kalendarza rodziny" s="Widzi też Tomasz" onClick=${() => c.go('calendar')}/>
    </div>
    <div class="actions"><button class="btn ghost" onClick=${() => { c.set({ visit: null }); c.toast('Wizyta odwołana. Termin może zająć ktoś inny.'); c.go('family'); }}>Odwołaj wizytę</button></div>
  </div>`;
}

/* ---------- Flow: Wyjaśnij pismo ---------- */
function Letter1(c) {
  const [snap, setSnap] = useState(false);
  useEffect(() => { if (snap) { const t = setTimeout(() => c.go('letter-2'), 1400); return () => clearTimeout(t); } }, [snap]);
  return html`<div>
    <${Hero} n="letter" bg="sand"/>
    <h1 class="h-l">Zrób zdjęcie pisma</h1>
    <div style="background:#1b1e24;border-radius:20px;height:420px;display:grid;place-items:center;position:relative;overflow:hidden">
      <div style="width:220px;height:300px;background:#f6f5f0;border-radius:4px;padding:18px;transform:rotate(-2deg);font-size:7px;color:#444;line-height:1.6">
        <div style="font-weight:700;font-size:8px">URZĄD SKARBOWY KRAKÓW-PODGÓRZE</div><div>ul. Wadowicka 10</div><br/>
        <div style="font-weight:700">WEZWANIE</div><div>Na podstawie art. 155 § 1 Ordynacji podatkowej wzywa się Panią do złożenia wyjaśnień dotyczących korekty zeznania PIT-37 za rok 2025…</div>
        <div style="margin-top:6px">${'▬ '.repeat(40)}</div></div>
      <div style="position:absolute;inset:40px 50px;border:2px solid ${snap ? '#1c7a4c' : 'rgba(255,255,255,.7)'};border-radius:14px"></div>
      ${snap && html`<div style="position:absolute;bottom:16px;color:#fff;font-size:13px">Czytam pismo…</div>`}
    </div>
    <div class="actions"><button class="btn" onClick=${() => setSnap(true)}>${I('camera', 18)} Zrób zdjęcie</button></div>
  </div>`;
}
function Letter2(c) {
  return html`<div>
    <p class="stepk">Wyjaśnienie pisma</p>
    <h1 class="h-l">Urząd skarbowy prosi o wyjaśnienie korekty PIT-37.</h1>
    <div class="list">
      <div class="field"><div class="l">Co to znaczy</div><div class="v">To nie kara. Urząd chce wiedzieć, dlaczego zmieniłaś zeznanie za 2025 rok i zwrot wzrósł o 1 240 zł.</div></div>
      <div class="field"><div class="l">Termin</div><div class="v">7 grudnia 2026 (14 dni od dnia, w którym dostałaś pismo)</div></div>
      <div class="field"><div class="l">Co zrobić</div><div class="v">Wyślij krótkie wyjaśnienie i zaświadczenie o uldze na dziecko.</div></div>
    </div>
    <div class="msg ai" style="max-width:100%;margin-top:12px"><span class="small">Źródła</span><div class="srcs"><span>Ordynacja podatkowa, art. 155</span><span>podatki.gov.pl: korekta zeznania</span></div></div>
    <p class="ai-warn">Asystent może się mylić. To nie jest porada prawna.</p>
    <div class="actions"><button class="btn" onClick=${() => c.go('letter-3')}>Przygotuj odpowiedź</button></div>
  </div>`;
}
function Letter3(c) {
  return html`<div>
    <p class="stepk">Podgląd odpowiedzi</p><h1 class="h-l">Wyjaśnienie do urzędu</h1>
    <div class="card" style="padding:16px;font-size:14px;line-height:1.6">
      <p style="margin:0 0 8px">W sprawie: pisma z 19.11.2026, PIT-37 za 2025 r.</p>
      <p style="margin:0 0 8px">Poprawiłam zeznanie, bo w pierwszej wersji zapomniałam o uldze na dziecko (Zofia Nowicka, PESEL 200307•••••). Dołączam zaświadczenie.</p>
      <p style="margin:0">Anna Nowicka</p>
    </div>
    <div class="list" style="margin-top:10px"><div class="field"><div class="l">Załącznik</div><div class="v">Zaświadczenie o uldze na dziecko (z rejestru, bez skanowania)</div></div></div>
    ${c.s.letterSent ? html`<div class="note green" style="margin-top:14px">${I('check', 18)}<span>Wysłano przez e-Doręczenia. Urzędowe potwierdzenie odbioru jest zapisane w sprawie.</span></div>` : html`<div class="actions"><button class="btn" onClick=${() => c.confirm({ t: 'Wysłać wyjaśnienie?', items: ['Do: Urząd Skarbowy Kraków-Podgórze', 'Przez: e-Doręczenia', '1 załącznik'], ok: 'Potwierdź i wyślij', done: () => { c.set({ letterSent: true }); c.toast('Wysłano. Urząd ma 14 dni na odpowiedź.'); } })}>Potwierdź</button>
    <button class="btn ghost">Edytuj treść</button></div>`}
  </div>`;
}

/* ---------- Assistant ---------- */
const INTENTS = [
  { k: /(przeprowadz|melduj|zamelduj|adres)/i, a: 'Przy przeprowadzce w Krakowie musisz się zameldować w ciągu 30 dni. Mogę od razu przygotować zameldowanie, zmianę lekarza rodzinnego, miejsca głosowania i adresu w dowodzie rejestracyjnym. Nic nie wyślę bez Twojego potwierdzenia.', src: ['gov.pl: zameldowanie', 'Ustawa o ewidencji ludności, art. 28'], act: ['Przygotuj przeprowadzkę', 'move-1'] },
  { k: /(dziec|urodz|800|narodz)/i, a: 'Gratulacje! Masz 21 dni na zgłoszenie narodzin. Razem z tym mogę przygotować 800+ i zgłoszenie do NFZ.', src: ['gov.pl: zgłoszenie urodzenia', 'ZUS: 800+'], act: ['Zacznij pakiet „Nowe dziecko”', 'baby-1'] },
  { k: /(lekarz|kardiolog|wizyt|skierow)/i, a: 'Masz e-skierowanie do kardiologa dla Zosi. Najbliższy wolny termin to 15 grudnia.', src: ['pacjent.gov.pl: Centralna e-Rejestracja'], act: ['Zarezerwuj wizytę', 'visit-1'] },
  { k: /(dow[oó]d|ważn|wazn)/i, a: 'Twój dowód osobisty jest ważny do 12 maja 2031. Tata ma dowód ważny do 26 stycznia 2027, więc warto złożyć wniosek w grudniu.', src: ['Rejestr Dowodów Osobistych'], act: ['Zobacz terminy taty', 'member-tata'] },
  { k: /(pismo|list|urz[aą]d skarb|wezwan)/i, a: 'Zrób zdjęcie pisma, a wyjaśnię je prostym językiem i podam termin.', src: ['podatki.gov.pl'], act: ['Zrób zdjęcie', 'letter-1'] },
  { k: /(alarm|syren|schron|bezpiecz)/i, a: 'Najbliższe schronienie to ul. Dekerta 24, 240 m od domu, czynne całą dobę. Trasa działa bez internetu.', src: ['Gdzie się ukryć (Straż Pożarna)', 'Poradnik bezpieczeństwa'], act: ['Pokaż schronienie', 'alert-shelter'] }
];
function Assistant(c) {
  const [msgs, setMsgs] = useState(c.s.q ? [] : []);
  const [q, setQ] = useState('');
  const endRef = useRef(null);
  const ask = text => {
    const it = INTENTS.find(i => i.k.test(text));
    const ans = it || { a: 'Na to pytanie nie mam jeszcze pewnej odpowiedzi. Zobacz informacje na gov.pl albo połącz się z konsultantem.', src: ['gov.pl'], act: ['Porozmawiaj z konsultantem', 'about'] };
    setMsgs(m => [...m, { me: text }, { ai: ans }]);
  };
  useEffect(() => { if (c.s.q) { ask(c.s.q); c.set({ q: null }); } }, []);
  useEffect(() => { endRef.current && endRef.current.scrollIntoView({ block: 'end' }); }, [msgs]);
  return html`<div style="display:flex;flex-direction:column;gap:12px">
    <h1 class="h-l">Asystent</h1>
    <p class="ai-warn" style="text-align:left;margin:0">Odpowiadam na podstawie stron gov.pl i Twoich danych. Mogę się mylić. Niczego nie wysyłam bez Twojego „Potwierdź”.</p>
    ${msgs.length === 0 && html`<div class="sugs">${['Przeprowadzam się w grudniu', 'Urodziło mi się dziecko', 'Kiedy wygasa dowód taty?', 'Dostałam pismo z urzędu'].map(t => html`<button class="sug" onClick=${() => ask(t)}>${t}</button>`)}</div>`}
    <div class="chat">${msgs.map(m => m.me ? html`<div class="msg me">${m.me}</div>` : html`<div class="msg ai">${m.ai.a}
      <div class="srcs">${m.ai.src.map(s => html`<span>${s}</span>`)}</div>
      ${m.ai.act && html`<button class="btn" style="margin-top:10px;padding:11px" onClick=${() => c.go(m.ai.act[1])}>${m.ai.act[0]}</button>`}</div>`)}</div>
    <div ref=${endRef}></div>
    <div class="askbar" style="margin-top:6px">
      <input id="ask2" value=${q} onInput=${e => setQ(e.target.value)} onKeyDown=${e => { if (e.key === 'Enter' && q) { ask(q); setQ(''); } }} placeholder="Napisz lub powiedz" aria-label="Napisz pytanie"/>
      <button class="ib" aria-label="Mów" onClick=${() => ask('Kiedy wygasa dowód taty?')}>${I('mic')}</button>
      <button class="ib go" aria-label="Wyślij" onClick=${() => { if (q) { ask(q); setQ(''); } }}>${I('send', 18)}</button>
    </div>
  </div>`;
}

/* ---------- Easy mode (tata) ---------- */
function Easy(c) {
  return html`<div class="easy">
    <h1 class="h-xl">Dzień dobry, Panie Stanisławie.</h1>
    ${c.s.easyApproved ? '' : html`<button class="note amber" style="width:100%;font-size:17px;padding:16px;margin-bottom:14px" onClick=${() => c.go('easy-approve')}>${I('bell', 22)}<span><b>Anna prosi o dostęp.</b> Dotknij, żeby zdecydować.</span></button>`}
    <div class="tiles">
      <button class="tile" onClick=${() => c.go('easy-doc')}><span class="ic">${I('card', 28)}</span>Mój dowód</button>
      <button class="tile" onClick=${() => c.go('easy-rx')}><span class="ic">${I('doc', 28)}</span>Moje recepty</button>
      <button class="tile" onClick=${() => c.go('assistant')}><span class="ic">${I('sparkle', 28)}</span>Zapytaj o pomoc</button>
      <button class="tile" onClick=${() => c.go('easy-call')}><span class="ic">${I('phone', 28)}</span>Zadzwoń do Anny</button>
    </div>
    <button class="speak" style="width:100%;margin-top:14px" onClick=${() => c.go('easy-voice')}>${I('mic', 24)} Powiedz, czego potrzebujesz</button>
  </div>`;
}
function EasyApprove(c) {
  const done = c.s.easyApproved;
  return html`<div class="easy">
    <h1 class="h-l" style="font-size:38px">${done ? 'Zgoda zapisana.' : 'Anna chce Panu pomagać w sprawach urzędowych.'}</h1>
    <div class="card" style="padding:18px;font-size:18px;line-height:1.5">
      <div style="font-weight:600;margin-bottom:6px">Anna będzie mogła:</div>
      <div>✓ widzieć Pana terminy</div><div>✓ czytać pisma z urzędów</div><div>✓ przygotowywać wnioski</div>
      <div style="font-weight:600;margin:10px 0 6px">Anna nie będzie mogła:</div>
      <div>✗ widzieć danych o zdrowiu</div><div>✗ wysyłać niczego bez Pana zgody</div>
    </div>
    ${done ? html`<div class="actions"><button class="btn bigbtn" onClick=${() => c.go(c.s.persona === 'tata' ? 'easy' : 'member-tata')}>Wróć</button></div>`
      : html`<div class="actions"><button class="btn green bigbtn" onClick=${() => c.confirm({ t: 'Zgodzić się?', items: ['Dostęp dla: Anna Nowicka', 'Na rok, do 24.11.2027', 'Może Pan cofnąć w każdej chwili'], ok: 'Zgadzam się', big: true, done: () => { c.set({ easyApproved: true }); c.toast('Anna dostała Pana zgodę.'); } })}>Zgadzam się</button>
      <button class="btn ghost bigbtn" onClick=${() => c.go('easy')}>Nie teraz</button>
      <button class="btn ghost bigbtn">${I('speaker', 22)} Przeczytaj mi to</button></div>`}
  </div>`;
}
function EasyDoc(c) {
  return html`<div class="easy"><h1 class="h-l" style="font-size:38px">Pana dowód</h1>
    <div class="card" style="padding:20px;font-size:20px"><div class="small" style="font-size:16px">Ważny do</div><div style="font-weight:600;font-size:28px">26 stycznia 2027</div>
    <div class="note amber" style="margin-top:12px;font-size:16px">Za 63 dni. Anna pomoże złożyć wniosek o nowy.</div></div>
    <div class="actions"><button class="btn bigbtn" onClick=${() => c.go('share-min')}>Pokaż do sprawdzenia</button><button class="btn ghost bigbtn" onClick=${() => c.go('easy')}>Wróć</button></div></div>`;
}
function EasyRx(c) {
  return html`<div class="easy"><h1 class="h-l" style="font-size:38px">Pana recepty</h1>
    <div class="list">${[['Bisoprolol 5 mg', 'Kod 7731'], ['Atorwastatyna 20 mg', 'Kod 2290']].map(([t, k]) => html`<div class="row" style="padding:18px"><span class="tx"><div class="t" style="font-size:20px">${t}</div><div class="s" style="font-size:16px">${k} · ważna do 20 grudnia</div></span></div>`)}</div>
    <div class="actions"><button class="btn ghost bigbtn" onClick=${() => c.go('easy')}>Wróć</button></div></div>`;
}
function EasyCall(c) {
  const who = c.s.persona === 'tata' ? 'Anna' : 'Tata';
  return html`<div class="easy" style="text-align:center"><div class="face-i" style="width:110px;height:110px;margin:60px auto 16px;font-size:32px;background:${who === 'Anna' ? '#132a5e' : '#1c7a4c'}">${who === 'Anna' ? 'AN' : 'SN'}</div>
    <h1 class="h-l">Dzwonię: ${who}…</h1><p class="lead">Połączenie przez zwykły telefon.</p>
    <div class="actions"><button class="btn red bigbtn" onClick=${() => c.back()}>Rozłącz</button></div></div>`;
}
function EasyVoice(c) {
  const [stage, setStage] = useState(0);
  useEffect(() => { const t = setTimeout(() => setStage(1), 1600); return () => clearTimeout(t); }, []);
  return html`<div class="easy">
    <div class="face ${stage === 0 ? 'scan' : ''}" style="margin-top:40px;border-radius:50%">${I('mic', 38)}</div>
    <p class="lead" style="text-align:center;font-size:18px">${stage === 0 ? 'Słucham…' : '„Kiedy kończy mi się dowód?”'}</p>
    ${stage === 1 && html`<div class="card" style="padding:20px;font-size:20px;line-height:1.5">Pana dowód jest ważny do <b>26 stycznia 2027</b>, czyli jeszcze 63 dni. Anna może pomóc złożyć wniosek o nowy.
      <div class="actions"><button class="speak">${I('speaker', 22)} Przeczytaj jeszcze raz</button><button class="btn bigbtn" onClick=${() => c.go('easy-doc')}>Pokaż mój dowód</button></div></div>`}
  </div>`;
}
