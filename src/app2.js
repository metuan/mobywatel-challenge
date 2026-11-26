/* ---------- Tab: Dziś ---------- */
function AskBar({ c, auto }) {
  const [q, setQ] = useState('');
  const send = () => c.ask(q || 'Jak zameldować się w nowym mieszkaniu?');
  return html`<div>
    <div class="askbar">
      <input id="ask" value=${q} onInput=${e => setQ(e.target.value)} onKeyDown=${e => e.key === 'Enter' && send()} placeholder="Zapytaj o sprawę" aria-label="Zapytaj o dowolną sprawę"/>
      <button class="ib" aria-label="Dodaj zdjęcie pisma" onClick=${() => c.go('letter-1')}>${I('clip')}</button>
      <button class="ib" aria-label="Mów" onClick=${() => c.ask('Kiedy kończy się ważność mojego dowodu?')}>${I('mic')}</button>
      <button class="ib go" aria-label="Wyślij" onClick=${send}>${I('send', 18)}</button>
    </div>
    <div class="hint">Spróbuj: „Przeprowadzam się w grudniu, co muszę załatwić?”</div>
  </div>`;
}

function Today(c) {
  const s = c.s;
  return html`<div>
    ${s.alert === 'yellow' && html`<button class="note amber" style="width:100%;margin-top:8px" onClick=${() => c.go('safety')}>${I('bell', 18)}<span><b>Ostrzeżenie dla Sandomierza.</b> Obserwujesz to miejsce, bo mieszka tam tata.</span></button>`}
    <div class="dateline">Wtorek, 24 listopada</div>
    <h1 class="h-xl">Dzień dobry, Anno</h1>
    <${Search} c=${c}/>
    <div class="urgent">
      <div class="tx"><div class="k">Najpilniejsze</div><div class="ut">OC Toyoty kończy się za 12 dni</div><div class="s">KR 4F21 · polisa do 6 grudnia</div>
      <button class="tlink" onClick=${() => c.go('car')}>Przedłuż polisę ${I('send', 15)}</button></div>
      <span class="ui">${ILL('car', 92)}</span></div>

    <${Sec} t="Terminy" more="Kalendarz rodziny" go=${() => c.go('calendar')}/>
    <div class="list">${DEADLINES.filter(d => d.go !== 'car').slice(0, 3).map(d => html`<${Row} t=${d.t} s=${d.s} onClick=${() => c.go(d.go)}
      right=${html`<span class=${'due ' + (d.d < 14 ? 'red' : d.d < 30 ? 'amber' : '')}>za ${d.d} dni</span>`}/>`)}</div>

    <${Sec} t="Twoje sprawy" more="Wszystkie" go=${() => c.go('matters')}/>
    <div class="list">
      ${s.moved ? html`<button class="row track" onClick=${() => c.go('move-done')}><span class="tx">
        <div style="display:flex;justify-content:space-between;gap:8px"><span class="t">Przeprowadzka: 3 zmiany</span><span class="pill p-navy">W toku</span></div>
        <div class="steps"><i class="on"></i><i class="on"></i><i></i><i></i></div>
        <div class="s">Zameldowanie przyjęte. Urząd potwierdzi do 27 listopada.</div></span></button>`
      : html`<button class="row track" onClick=${() => c.go('case-meld')}><span class="tx">
        <div style="display:flex;justify-content:space-between;gap:8px"><span class="t">Wymiana dowodu rejestracyjnego</span><span class="pill p-navy">Krok 3 z 4</span></div>
        <div class="steps"><i class="on"></i><i class="on"></i><i class="on"></i><i></i></div>
        <div class="s">Dokument gotowy do odbioru od 2 grudnia, Wydział Komunikacji, ul. Wielicka 28a</div></span></button>`}
      ${s.babyDone && html`<button class="row track" onClick=${() => c.go('baby-done')}><span class="tx">
        <div style="display:flex;justify-content:space-between;gap:8px"><span class="t">Pakiet „Nowe dziecko”</span><span class="pill p-green">3 z 4 gotowe</span></div>
        <div class="steps"><i class="on"></i><i class="on"></i><i class="on"></i><i></i></div>
        <div class="s">800+ w ZUS: decyzja do 24 grudnia</div></span></button>`}
      <button class="row track" onClick=${() => c.go('p800')}><span class="tx">
        <div style="display:flex;justify-content:space-between;gap:8px"><span class="t">800+ na Zosię</span><span class="pill p-green">Wypłacane</span></div>
        <div class="s">Następna wypłata: 28 listopada</div></span></button>
    </div>

    <${Sec} t="Skrzynka" more=${s.inboxNew ? `${s.inboxNew} nowe` : ''} go=${() => {}}/>
    <div class="list">
      <${Row} icon="steth" t="e-Skierowanie: kardiolog dla Zosi" s="Od dr Ewy Mazur, 21 listopada. Możesz zarezerwować wizytę." onClick=${() => c.go('visit-1')} right=${s.visit ? html`<span class="pill p-green">Umówiona</span>` : html`<span class="pill p-navy">Nowe</span>`}/>
      <${Row} icon="mail" t="Urząd Skarbowy Kraków-Podgórze" s="Wezwanie do złożenia wyjaśnień. Zrób zdjęcie, wyjaśnimy je." onClick=${() => c.go('letter-2')} right=${html`<span class="pill p-amber">14 dni</span>`}/>
      <${Row} icon="people" t="Tata zatwierdził Twój dostęp" s="Widzisz jego terminy i pisma. Do 24 listopada 2027." onClick=${() => c.go('member-tata')}/>
    </div>

    <${Sec} t="Zacznij sprawę" more="Wszystkie" go=${() => c.go('matters')}/>
    <div class="mrow">
      ${[['Przeprowadzka', 'Meldunek, lekarz, auto, wybory', 'move-1', 'move', 'sand'], ['Nowe dziecko', 'PESEL, 800+, NFZ, paszport', 'baby-1', 'baby', 'rose'],
         ['Mój samochód', 'OC, przegląd, sprzedaż', 'car', 'car', 'sky'], ['Emerytura', 'Wniosek, kalkulator, legitymacja', 'roadmap', 'sun', 'mint']].map(([t, s, r, n, bg]) =>
        html`<button class="mcard" onClick=${() => c.go(r)}><div class=${'mimg bg-' + bg}>${ILL(n, 124)}</div><div><div class="mt">${t}</div><div class="ms">${s}</div></div></button>`)}
    </div>
    <p class="tiny" style="margin-top:22px;text-align:center">Niezależna koncepcja. Dane są fikcyjne.</p>
  </div>`;
}

/* ---------- Tab: Sprawy ---------- */
function Matters(c) {
  return html`<div>
    <h1 class="h-xl">Sprawy</h1>
    <${Search} c=${c} ph="Czego potrzebujesz?"/>
    <p class="lead">Zacznij od tego, co dzieje się w Twoim życiu. Resztę ułożymy w kroki.</p>
    <div class="mgrid2">
      ${[['Przeprowadzka', '4 urzędy, 1 wniosek', 'move-1', 'move', 'sand'], ['Nowe dziecko', 'Akt, PESEL, 800+, NFZ', 'baby-1', 'baby', 'rose'], ['Kupno lub sprzedaż auta', 'Zgłoszenie i OC', 'car-sell', 'car', 'sky'], ['Świadczenia dla mnie', 'Sprawdzimy za Twoją zgodą', 'benefits', 'coin', 'yellow']].map(([t, s, r, n, bg]) =>
        html`<button class="mcard" onClick=${() => c.go(r)}><div class=${'mimg bg-' + bg}>${ILL(n, 130)}</div><div><div class="mt">${t}</div><div class="ms">${s}</div></div></button>`)}
    </div>
    <${Sec} t="W toku"/>
    <div class="list">
      ${c.s.moved && html`<${Row} t="Przeprowadzka: 3 zmiany" s="2 z 4 kroków" onClick=${() => c.go('move-done')} right=${html`<span class="pill p-navy">W toku</span>`}/>`}
      ${c.s.babyDone && html`<${Row} t="Pakiet „Nowe dziecko”" s="3 z 4 gotowe" onClick=${() => c.go('baby-done')} right=${html`<span class="pill p-green">Prawie</span>`}/>`}
      <${Row} t="Wymiana dowodu rejestracyjnego" s="Gotowy do odbioru od 2 grudnia" onClick=${() => c.go('case-meld')} right=${html`<span class="pill p-navy">3 z 4</span>`}/>
      ${c.s.visit && html`<${Row} t="Wizyta: kardiolog, Zosia" s=${c.s.visit} onClick=${() => c.go('visit-4')} right=${html`<span class="pill p-green">Umówiona</span>`}/>`}
    </div>
    <${Sec} t="Pieniądze i urzędy"/>
    <div class="list">
      <${Row} icon="coin" t="Podatki" s="Twój e-PIT, opłaty lokalne" onClick=${() => c.go('taxes')}/>
      <${Row} icon="car" t="Mój samochód" s="OC za 12 dni · mandat do zapłaty" onClick=${() => c.go('car')}/>
    </div>
    <${Sec} t="Zakończone"/>
    <div class="list">
      <${Row} t="Wniosek 800+ na Zosię" s="Przyznane, 12 lutego 2026" right=${html`<span class="pill p-gray">Gotowe</span>`} onClick=${() => c.go('p800')}/>
      <${Row} t="Zastrzeżenie numeru PESEL" s="Aktywne od 3 marca 2025" right=${html`<span class="pill p-gray">Gotowe</span>`} onClick=${() => c.go('lost')}/>
    </div>
  </div>`;
}

function CaseMeld(c) {
  const st = [['Wniosek złożony', '14 listopada'], ['Opłata 54,50 zł', 'Zapłacono 14 listopada'], ['Dokument w produkcji', 'Od 20 listopada'], ['Odbiór', 'Od 2 grudnia, Wydział Komunikacji, ul. Wielicka 28a']];
  return html`<div>
    <p class="stepk">Sprawa</p><h1 class="h-l">Wymiana dowodu rejestracyjnego</h1>
    <div class="list">${st.map(([t, s], i) => html`<div class="row"><span class="ic" style=${i < 3 ? 'background:var(--green-soft);color:var(--green)' : ''}>${i < 3 ? I('check', 18) : html`<b>4</b>`}</span><span class="tx"><div class="t">${t}</div><div class="s">${s}</div></span></div>`)}</div>
    <div class="note" style="margin-top:14px">${I('bell', 18)}<span>Dostaniesz powiadomienie, gdy dokument będzie gotowy. Nie musisz dzwonić do urzędu.</span></div>
  </div>`;
}

/* ---------- Tab: Bliscy ---------- */
function Family(c) {
  const fam = c.s.babyDone ? [...FAMILY.slice(0, 3), { id:'julia', name:'Julia', role:'Córka, 9 dni', color:'#7a4fa8', ini:'JN' }, FAMILY[3]] : FAMILY;
  return html`<div>
    <h1 class="h-xl">Bliscy</h1>
    <p class="lead">Sprawy rodziny w jednym miejscu. Każdy widzi tylko to, na co się zgodził.</p>
    <div class="people">
      ${fam.map(p => html`<button class="person" onClick=${() => c.go(p.id === 'anna' ? 'profile' : 'member-' + p.id)}>
        <span class="face-i" style=${`background:${p.color}`}>${p.ini}</span>
        <span><div style="font-weight:600">${p.name}</div><div class="tiny">${p.role}</div></span>
        ${p.id === 'zosia' && html`<span class="pill p-amber">Paszport: 41 dni</span>`}
        ${p.id === 'tata' && html`<span class="pill p-green">Dostęp przyznany</span>`}
        
        ${p.id === 'julia' && html`<span class="pill p-green">Nowa</span>`}
      </button>`)}
      <button class="person" style="justify-content:center;align-items:center;color:var(--navy);border-style:dashed" onClick=${() => c.go('invite')}>${I('plus', 26)}<span style="font-weight:600">Dodaj osobę</span></button>
    </div>
    <${Sec} t="Rodzina razem"/>
    <div class="list">
      <${Row} icon="list" t="Kalendarz terminów rodziny" s="7 terminów w ciągu 90 dni" onClick=${() => c.go('calendar')}/>
      <${Row} icon="shield" t="Plan na sytuację kryzysową" s="Miejsca spotkań, kto odbiera dzieci" onClick=${() => c.go('plan')}/>
      <${Row} icon="lock" t="Uprawnienia w rodzinie" s="Kto co widzi i może zrobić" onClick=${() => c.go('consents')}/>
    </div>
  </div>`;
}

function MemberZosia(c) {
  return html`<div>
    <div style="display:flex;gap:12px;align-items:center;margin-top:8px"><span class="face-i" style="background:#a8650a;width:52px;height:52px">ZN</span><div><h1 class="h-m">Zofia Nowicka</h1><div class="small">6 lat, PESEL 200307•••••</div></div></div>
    <${Sec} t="Dokumenty"/>
    <div class="list">
      <${Row} icon="card" t="Paszport" s="Ważny do 4 stycznia 2027" right=${html`<span class="pill p-amber">41 dni</span>`} onClick=${() => c.go('renew-pass')}/>
      <${Row} icon="card" t="Legitymacja szkolna" s="Szkoła Podstawowa nr 9, zerówka" onClick=${() => c.go('school')}/>
    </div>
    <${Sec} t="Szkoła"/>
    <div class="list"><${Row} icon="list" t="Frekwencja, usprawiedliwienia, zgody" s=${c.s.excused ? 'Wszystko załatwione' : '1 nieobecność do usprawiedliwienia'} onClick=${() => c.go('school')}/></div>
    <${Sec} t="Zdrowie"/>
    <div class="list">
      <${Row} icon="steth" t="e-Skierowanie: kardiolog" s=${c.s.visit ? 'Wizyta: ' + c.s.visit : 'Zarezerwuj wizytę'} onClick=${() => c.go(c.s.visit ? 'visit-4' : 'visit-1')} right=${c.s.visit ? html`<span class="pill p-green">Umówiona</span>` : undefined}/>
      <${Row} icon="heart" t="Szczepienia" s="1 zalecane do końca roku" onClick=${() => c.go('vacc')}/>
      <${Row} icon="doc" t="e-Recepta: Nurofen dla dzieci" s="Kod 4821, ważna do 21 grudnia" onClick=${() => {}}/>
    </div>
    <${Sec} t="Świadczenia"/>
    <div class="list"><${Row} icon="coin" t="800+" s="Wypłata 28 listopada" onClick=${() => c.go('p800')}/></div>
    <p class="tiny" style="margin-top:14px">Widzą: Ty i Tomasz (oboje rodzice).</p>
  </div>`;
}

function MemberTata(c) {
  return html`<div>
    <div style="display:flex;gap:12px;align-items:center;margin-top:8px"><span class="face-i" style="background:#1c7a4c;width:52px;height:52px">SN</span><div><h1 class="h-m">Stanisław Nowicki</h1><div class="small">Tata, 71 lat, Sandomierz</div></div></div>
    <div class="note green" style="margin-top:16px">${I('check', 18)}<span>Tata zatwierdził Twój dostęp 24 listopada 2026, w trybie prostym na swoim telefonie. Może go cofnąć w każdej chwili.</span></div>
    <${Sec} t="Możesz"/>
    <div class="list">
      ${[['Widzieć jego terminy', true], ['Czytać pisma z urzędów', true], ['Przygotowywać wnioski do jego zatwierdzenia', true], ['Widzieć dane o zdrowiu', false], ['Wysyłać wnioski bez jego zgody', false]].map(([t, on]) =>
        html`<div class="row"><span class="ic" style=${on ? 'background:var(--green-soft);color:var(--green)' : ''}>${I(on ? 'check' : 'x', 18)}</span><span class="tx"><div class="t">${t}</div></span></div>`)}
    </div>
    <${Sec} t="Terminy taty"/>
    <div class="list">
      <${Row} icon="card" t="Dowód osobisty" s="Ważny do 26 stycznia 2027" right=${html`<span class="pill p-amber">63 dni</span>`} onClick=${() => c.toast('Przygotowałaś wniosek o nowy dowód. Tata zatwierdzi go u siebie.')}/>
      <${Row} icon="doc" t="Legitymacja emeryta" s="Bezterminowa" right=${html`<span class="pill p-gray">Ważna</span>`} onClick=${() => {}}/>
    </div>
    <div class="actions"><button class="btn ghost" onClick=${() => c.go('easy-approve')}>Zobacz, jak tata to zatwierdził</button></div>
  </div>`;
}

function MemberTomasz(c) {
  return html`<div>
    <div style="display:flex;gap:12px;align-items:center;margin-top:8px"><span class="face-i" style="background:#3d5a80;width:52px;height:52px">TN</span><div><h1 class="h-m">Tomasz Nowicki</h1><div class="small">Partner</div></div></div>
    <${Sec} t="Wspólne"/>
    <div class="list">
      ${['Terminy rodziny', 'Sprawy dzieci, jako drugi rodzic', 'Plan kryzysowy i status „Jestem bezpieczna”'].map(t => html`<div class="row"><span class="ic" style="background:var(--green-soft);color:var(--green)">${I('check', 18)}</span><span class="tx"><div class="t">${t}</div></span></div>`)}
    </div>
    <p class="small" style="margin-top:12px">Każdy z Was zachowuje własne dokumenty, finanse i zdrowie. Nie są wspólne.</p>
  </div>`;
}

function Invite(c) {
  const [perm, setPerm] = useState({ dates: true, letters: true, prepare: true, health: false });
  const [step, setStep] = useState(0);
  if (step === 1) return html`<div>
    <p class="stepk">Krok 2 z 2</p><h1 class="h-l">Pokaż ten kod osobie, którą zapraszasz</h1>
    <div class="qr">${QR()}</div>
    <p class="small" style="text-align:center">Kod działa 10 minut. Zapraszana osoba potwierdza go swoim mDowodem.</p>
    <div class="actions"><button class="btn" onClick=${() => { c.toast('Zaproszenie wysłane. Czekamy na potwierdzenie.'); c.go('family'); }}>Gotowe</button></div></div>`;
  const rows = [['dates', 'Widzi terminy', 'Dowody, paszporty, OC, wizyty'], ['letters', 'Czyta pisma', 'Decyzje i wezwania z urzędów'], ['prepare', 'Przygotowuje wnioski', 'Wysyłasz je dopiero Ty'], ['health', 'Widzi dane o zdrowiu', 'Recepty, skierowania, wyniki']];
  return html`<div>
    <p class="stepk">Krok 1 z 2</p><h1 class="h-l">Co ta osoba może?</h1>
    <p class="lead">Możesz to zmienić lub cofnąć w każdej chwili. Każde użycie zobaczysz w historii dostępu.</p>
    <div class="list">${rows.map(([k, t, s]) => html`<div class="row"><span class="tx"><div class="t">${t}</div><div class="s">${s}</div></span><${Toggle} on=${perm[k]} label=${t} set=${v => setPerm({ ...perm, [k]: v })}/></div>`)}</div>
    <div class="actions"><button class="btn" onClick=${() => setStep(1)}>Utwórz zaproszenie</button></div>
  </div>`;
}

function QR() {
  const cells = []; let seed = 7;
  for (let y = 0; y < 21; y++) for (let x = 0; x < 21; x++) {
    seed = (seed * 9301 + 49297) % 233280;
    const finder = (x < 7 && y < 7) || (x > 13 && y < 7) || (x < 7 && y > 13);
    const on = finder ? ((x % 14 === 0 || x % 14 === 6 || y % 14 === 0 || y % 14 === 6) || ((x % 14) > 1 && (x % 14) < 5 && (y % 14) > 1 && (y % 14) < 5)) : seed / 233280 > .52;
    if (on) cells.push(html`<rect x=${x} y=${y} width="1" height="1"/>`);
  }
  return html`<svg viewBox="0 0 21 21" width="100%" height="100%" fill="#101317" role="img" aria-label="Kod QR (przykład)">${cells}</svg>`;
}

function Calendar(c) {
  const items = [['6 gru', 'OC Toyota Yaris', 'Ty i Tomasz', 'red'], ['28 lis', 'Wypłata 800+', 'Zosia', 'green'], ['15 gru', 'Kardiolog', 'Zosia', 'navy'], ['31 gru', 'Szczepienie MMR', 'Zosia', 'amber'], ['4 sty', 'Paszport traci ważność', 'Zosia', 'amber'], ['26 sty', 'Dowód osobisty', 'Tata', 'amber'], ['14 lut', 'Przegląd techniczny', 'Toyota Yaris', 'gray']];
  return html`<div><h1 class="h-l">Kalendarz rodziny</h1><p class="lead">Najbliższe 90 dni. Każdy termin ma następny krok.</p>
    <div class="list">${items.map(([d, t, w, tone]) => html`<${Row} t=${t} s=${w} onClick=${() => {}} right=${html`<span class=${'pill p-' + tone}>${d}</span>`}/>`)}</div></div>`;
}

function Plan(c) {
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
      ${[['Woda, 2 l na osobę na dzień', true], ['Latarka i baterie', true], ['Powerbank', false], ['Kopie dokumentów', true], ['Apteczka', false]].map(([t, on]) => html`<div class="row"><span class="ic" style=${on ? 'background:var(--green-soft);color:var(--green)' : ''}>${on ? I('check', 18) : ''}</span><span class="tx"><div class="t">${t}</div></span>${!on && html`<span class="pill p-amber">Brakuje</span>`}</div>`)}
    </div>
  </div>`;
}
