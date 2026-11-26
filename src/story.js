/* ---------- One story: a week in the life of the Nowicki family ----------
   Each chapter is And-But-Therefore: a concrete moment (hook), how it works today (but), how it works in the new app (therefore). */
const CH = (t, when, hook, today, razem, tr, p, r, x = []) => ({ t, when, hook, today, razem, tr, p, r, x });
const CHAPTERS = [
  CH('Poznaj Annę', 'Codzienność', 'Rano, zanim Anna wyjdzie do pracy.',
    'Terminy rodziny są rozrzucone po e-mailach, listach, SMS-ach i kilku państwowych serwisach.',
    'Jeden ekran pokazuje, co jest pilne dziś, dla całej rodziny. Najpilniejsze jest na górze.',
    'Przewiń ekran Dziś i dotknij sprawy OC.', 'anna', ['today', 'profile']),
  CH('Dokument zawsze przy sobie', 'Codzienność', 'Przy kasie trzeba potwierdzić, że Anna jest pełnoletnia.',
    'Pokazujesz cały dowód, a z nim adres i PESEL, choć wystarczy informacja o wieku.',
    'Anna pokazuje tylko to, co trzeba. Karta żyje, tyka na niej zegar, więc zrzut ekranu jej nie podrobi.',
    'Dotknij karty, aby odwrócić ją na kod QR.', 'anna', ['doc-id', 'docs', 'share-min', 'eu', 'lost', 'issued'],
    [['Pokaż tylko 18+', 'share-min'], ['Dokumenty od wystawcy', 'issued'], ['Zgubiony portfel', 'lost']]),
  CH('Przeprowadzka', 'Dom', 'Nowiccy odbierają klucze do mieszkania na Długiej.',
    'Gmina, NFZ, szkoła i CEPiK to cztery miejsca, cztery formularze i cztery razy ten sam adres.',
    'Anna podaje nowy adres raz. Aplikacja przygotowuje wszystkie zgłoszenia i wysyła je dopiero, gdy Anna je zatwierdzi.',
    'Przejdź cztery kroki i potwierdź na końcu.', 'anna', ['move-1', 'move-2', 'move-3', 'move-done', 'matters']),
  CH('Samochód', 'Auto', 'Za 12 dni kończy się OC Toyoty.',
    'O końcu polisy przypomina ubezpieczyciel, o mandacie list, a o punktach karnych nikt.',
    'Wszystko o aucie jest w jednej karcie: OC za 12 dni, mandat do zapłaty i punkty karne.',
    'Zapłać mandat albo sprawdź przegląd.', 'anna', ['car', 'car-sell', 'case-meld'], [['Sprzedaż auta', 'car-sell']]),
  CH('Nowe dziecko', 'Rodzina', 'Rodzi się Julia, druga córka Nowickich.',
    'Akt urodzenia, PESEL, 800+ i NFZ to cztery osobne wnioski.',
    'To jeden pakiet, który rodzice podpisują raz, jeszcze w szpitalu.',
    'Wypełnij pakiet i zobacz, co dzieje się dalej.', 'anna', ['baby-1', 'baby-2', 'baby-3', 'baby-done', 'p800', 'benefits']),
  CH('Zdrowie Zosi', 'Zdrowie', 'Pediatra słyszy u Zosi szmer serca i wystawia skierowanie.',
    'Dzwonisz do kolejnych poradni i słyszysz, że najbliższy termin jest za pół roku.',
    'Aplikacja pokazuje wolne terminy w okolicy i pilnuje poczekalni. W tym samym miejscu są szczepienia i paszport Zosi.',
    'Zarezerwuj wizytę.', 'anna', ['visit-1', 'visit-2', 'visit-3', 'visit-4', 'member-zosia', 'member-julia', 'school', 'vacc', 'renew-pass', 'consent2', 'member-tomasz'],
    [['Szkoła', 'school'], ['Paszport i zgoda obojga rodziców', 'renew-pass'], ['Szczepienia', 'vacc']]),
  CH('Pismo z urzędu', 'Urzędy', 'W skrzynce leży pismo z urzędu skarbowego.',
    'To trzy strony urzędowego języka i termin na odpowiedź, którego nie widać od razu.',
    'Anna robi zdjęcie. Asystent tłumaczy pismo prostym językiem i szykuje odpowiedź, którą Anna sama zatwierdza.',
    'Zrób zdjęcie pisma i zapytaj asystenta.', 'anna', ['letter-1', 'letter-2', 'letter-3', 'assistant', 'taxes'],
    [['Podatki i zwrot', 'taxes'], ['Asystent', 'assistant']]),
  CH('Alarm', 'Bezpieczeństwo', 'Alert RCB: alarm powietrzny w Krakowie.',
    'SMS mówi, że jest zagrożenie. Nie mówi, dokąd iść ani gdzie teraz jest Zosia.',
    'mObywatel dokłada do alertu najbliższy schron i to, czy bliscy są bezpieczni. Lokalizacja jest udostępniana tylko na czas alarmu.',
    'Obserwuj ekran blokady, a potem otwórz aplikację.', 'anna', ['lock', 'alert-red', 'alert-watch', 'alert-shelter', 'alert-guide', 'family-map', 'alert-safe', 'alert-clear', 'safety', 'places', 'plan', 'ice', 'medical-id'],
    [['Mapa rodziny', 'family-map'], ['Karta ratunkowa', 'ice'], ['Plan kryzysowy', 'plan']]),
  CH('Po zdarzeniu', 'Bezpieczeństwo', 'Po nawałnicy w Krakowie woda zalała mieszkanie Nowickich.',
    'Trzeba pisać do urzędu miasta, wysyłać zdjęcia e-mailem i wydzwaniać o oględziny.',
    'Zdjęcia i opis trafiają w jednym zgłoszeniu do urzędu miasta, a postęp i termin oględzin widać na osi czasu.',
    'Dodaj zdjęcia i wyślij zgłoszenie.', 'anna', ['damage-1', 'damage-2', 'damage-3', 'alert-damage']),
  CH('Tata, 71 lat', 'Dostępność', 'Stanisław ma 71 lat i rzadko korzysta z aplikacji.',
    'Każda sprawa to wizyta w urzędzie albo telefon do córki w Krakowie.',
    'Ma wersję prostą: duże przyciski, jedną decyzję na ekranie i odczyt na głos. Anna pomaga mu z daleka, ale widzi tylko to, na co tata się zgodził.',
    'Odbierz e-receptę taty albo zadzwoń do Anny.', 'tata', ['easy', 'easy-approve', 'easy-doc', 'easy-rx', 'easy-call', 'easy-voice', 'member-tata', 'pjm'],
    [['Tłumacz PJM', 'pjm'], ['Widok Anny: tata', 'member-tata']]),
  CH('Rodzina razem', 'Rodzina', 'Niedziela. Anna planuje kolejny tydzień.',
    'Każdy w rodzinie ma osobne konta, terminy i hasła, a pomoc wymaga pełnomocnictwa na papierze.',
    'Wspólny kalendarz, plan kryzysowy i jasne zasady: kto co widzi i do kiedy.',
    'Zajrzyj do kalendarza i uprawnień.', 'anna', ['family', 'calendar', 'invite', 'consents'],
    [['Zaproś bliskiego', 'invite'], ['Uprawnienia', 'consents']]),
  CH('Głos', 'Obywatelskość', 'Sobota na Rynku. Wolontariuszka zbiera podpisy pod projektem ustawy.',
    'Kartka na podkładce: imię, nazwisko, PESEL i adres, które może sfotografować każdy. Na listach trafiają się nawet zmarli.',
    'Anna przykłada telefon do telefonu wolontariuszki i potwierdza twarzą. Komitet widzi tylko „1 ważny podpis, Kraków”.',
    'Zbliż telefony i podpisz.', 'anna', ['sign-1', 'sign-2', 'sign-3', 'sign-list', 'easy-sign']),
  CH('Zaufanie', 'Prywatność', 'Anna chce wiedzieć, kto sprawdzał jej dane.',
    'Nie wiadomo, kto i kiedy sprawdzał ich dane ani na ilu urządzeniach są zalogowani.',
    'Anna widzi każde sprawdzenie swoich danych, wszystkie urządzenia i ostrzeżenia przed oszustwami.',
    'Sprawdź, kto ostatnio pytał o dane Anny.', 'anna', ['access-log', 'devices', 'scam', 'signin', 'offline', 'roadmap', 'about'],
    [['Urządzenia', 'devices'], ['Tarcza antyoszustwa', 'scam'], ['Działa bez internetu', 'offline']])
];
const chapterOf = r => CHAPTERS.findIndex(ch => ch.r.includes(r));

/* beats: [route, what happens, what to tap, highlight selector ('~text' matches a button by its text)] */
const BEATS = [
  [['today', 'Anna otwiera aplikację. Na górze jest jej dowód, a pod nim jedyna pilna sprawa: OC za 12 dni.', 'Dotknij AN w prawym górnym rogu.', '.avatar-btn'],
   ['profile', 'Profil zbiera wszystko o zaufaniu: logowanie twarzą, zgody i urządzenia.']],
  [['doc-id', 'Dowód żyje: zegar tyka, a światło przesuwa się po karcie. Zrzut ekranu tego nie podrobi.', 'Dotknij karty, a potem „Pokaż do sprawdzenia”.', ['.flipwrap .doc', '~Pokaż do sprawdzenia']],
   ['share-min', 'Wystarczy potwierdzić pełnoletność, więc Anna pokazuje tylko to: bez imienia, adresu i PESEL.', 'Dotknij „Za granicą: portfel UE”.', '~Za granicą'],
   ['eu', 'Wiosną, w Lizbonie, ta sama karta działa jako europejski portfel. Wypożyczalnia dostaje trzy fakty i nic więcej.', 'Dotknij „Zbliż telefony”.', '~Zbliż telefony']],
  [['move-1', 'Anna wpisuje nowy adres raz. Reszta danych przychodzi z rejestrów.', 'Dotknij „Dalej”.'],
   ['move-2', 'Aplikacja wie, które urzędy trzeba zawiadomić. Anna tylko odznacza to, czego nie chce.', 'Dotknij „Pokaż podgląd”.'],
   ['move-3', 'Przed wysłaniem Anna widzi każde zgłoszenie. Nic nie wyjdzie bez jej zgody.', 'Dotknij „Potwierdź” i zatwierdź.'],
   ['move-done', 'Gotowe. Sprawa nie znika: widać, który urząd już potwierdził.']],
  [['car', 'Polisa, przegląd, punkty karne i mandat są w jednej karcie auta.', 'Zapłać mandat, a potem dotknij „Sprzedaję ten samochód” na dole.', ['.mini', '~Sprzedaję ten samochód']],
   ['car-sell', 'Sprzedaż auta to jedno zgłoszenie zamiast wizyty w wydziale komunikacji.']],
  [['baby-1', 'Szpital już zgłosił narodziny. Rodzice wybierają tylko imię.', 'Dotknij „Dalej”.'],
   ['baby-2', 'Jeden pakiet zamiast czterech wniosków: akt urodzenia, PESEL, 800+ i NFZ.', 'Dotknij „Pokaż podgląd”.'],
   ['baby-3', 'Pakiet podpisują oboje rodzice. Tomasz dostaje prośbę na swój telefon.', 'Poproś Tomasza o zgodę, a potem potwierdź.'],
   ['baby-done', 'Julia ma PESEL, a 800+ jest w drodze.']],
  [['visit-1', 'Pediatra wystawił e-skierowanie. Aplikacja już je widzi.', 'Dotknij „Zarezerwuj wizytę”.'],
   ['visit-2', 'Najbliższe wolne terminy w okolicy, od razu z odległością.', 'Wybierz termin i dotknij „Dalej”.'],
   ['visit-3', 'Jeśli zwolni się wcześniejszy termin, poczekalnia przeniesie wizytę. Tylko za zgodą Anny.', 'Dotknij „Potwierdź”.'],
   ['visit-4', 'Wizyta jest w kalendarzu rodziny, więc Tomasz też ją widzi.']],
  [['letter-1', 'Anna robi zdjęcie pisma z urzędu skarbowego.', 'Dotknij „Zrób zdjęcie”.'],
   ['letter-2', 'Asystent tłumaczy pismo prostym językiem i pokazuje termin odpowiedzi.', 'Dotknij „Przygotuj odpowiedź”.'],
   ['letter-3', 'Odpowiedź jest gotowa. Anna ją czyta i dopiero wtedy wysyła.', 'Dotknij „Potwierdź” i zatwierdź.']],
  [['lock', 'Na ekran blokady przychodzi Alert RCB, a zaraz po nim mObywatel: najbliższy schron i to, czy bliscy są bezpieczni.', 'Poczekaj na powiadomienia i dotknij „Otwórz aplikację”.', '.lk-btn:last-child'],
   ['alert-red', 'Aplikacja w trybie alarmu: najbliższy schron i status rodziny na jednym ekranie.', 'Dotknij „Prowadź do schronienia”.'],
   ['alert-watch', 'Telefon trafia do kieszeni, a karta schronu przenosi się na zegarek. Dwa stuknięcia w nadgarstek to skręt w lewo, trzy w prawo.', 'Poczekaj, aż Anna dojdzie, i dotknij „Otwórz w telefonie”.', '~Otwórz w telefonie'],
   ['alert-guide', 'W schronie: co robić teraz, z odczytem na głos.']],
  [['damage-1', 'Anna robi zdjęcia szkód. Każde ma datę i miejsce.', 'Dodaj zdjęcie i dotknij „Dalej”.', ['.ph.add', '~Dalej']],
   ['damage-2', 'Opis i konto do wypłaty są już wypełnione z rejestrów.', 'Dotknij „Sprawdź i wyślij”.'],
   ['damage-3', 'Zgłoszenie trafiło do urzędu miasta. Postęp widać na osi czasu.']],
  [['easy', 'Tak widzi aplikację Stanisław: duże przyciski i jedna decyzja na ekranie.', 'Dotknij „Moje recepty”.', '~Moje recepty'],
   ['easy-rx', 'E-recepta z kodem, który wystarczy pokazać w aptece.']],
  [['family', 'Cała rodzina na jednej liście, przy każdej osobie jedna najważniejsza informacja.', 'Dotknij „Kalendarz rodziny”.', '~Kalendarz rodziny'],
   ['calendar', 'Wspólny kalendarz: przy każdym terminie jest następny krok.']],
  [['sign-1', 'Wolontariuszka trzyma telefon. Anna przykłada swój, jak przy wymianie kontaktów.', 'Dotknij „Zbliż telefony”.', '~Zbliż telefony'],
   ['sign-2', 'Przed podpisem Anna widzi, kto co zobaczy. Komitet dostaje tylko liczbę ważnych podpisów.', 'Dotknij „Podpisz” i potwierdź twarzą.', '~Podpisz'],
   ['sign-3', 'Podpis zapala się na mapie, a licznik rośnie. Bez kartki i bez danych na podkładce.', 'Dotknij „Moje podpisy”.', '~Moje podpisy'],
   ['sign-list', 'Wszystkie poparcia w jednym miejscu: projekty ustaw, petycje i kandydaci.', 'Dotknij „Telefon taty”.', '.sg-twist'],
   ['easy-sign', 'Ten sam system chroni Stanisława: jego PESEL pojawił się na liście, której nie podpisywał.', 'Dotknij „Nie, to nie ja”.', '~Nie, to nie ja']],
  [['access-log', 'Każde sprawdzenie danych Anny jest zapisane: kto, kiedy i po co.', 'Dotknij „To nie ja” przy wpisie, którego nie rozpoznajesz.', ['~Urządzenia', '.link']],
   ['devices', 'Wszystkie urządzenia zalogowane na konto Anny. Zgubiony telefon wylogujesz jednym ruchem.', 'Dotknij „Wyloguj” przy starym telefonie.']]
];
const beatOf = (i, r) => (BEATS[i] || []).findIndex(b => b[0] === r);

function StoryPanel({ i, route, go, step, lastBeat = 0 }) {
  const ch = CHAPTERS[i], beats = BEATS[i];
  const here = beatOf(i, route), off = here < 0 && route !== beats[0][0];
  const cur = here >= 0 ? here : Math.min(lastBeat, beats.length - 1);
  const last = cur === beats.length - 1;
  return html`<div class="story" key=${i}>
    <div class="st-n"><span>${ch.when}</span></div>
    <h2 class="st-t">${ch.t}</h2>
    <p class="st-hook">${ch.hook}</p>
    <div class="st-ab">
      <div><span class="st-k">Dziś</span><p>${ch.today}</p></div>
      <div class="on"><span class="st-k">W nowym mObywatelu</span><p>${ch.razem}</p></div>
    </div>
    <ol class="beats">${beats.map(([r, t, act], j) => html`<li class=${j < cur ? 'done' : j === cur ? 'now' : ''}>
      <button class="bt-dot" onClick=${() => go(r, ch.p)} aria-label=${'Krok ' + (j + 1)}>${j < cur ? I('check', 13) : j + 1}</button>
      <div><p>${t}</p>${j === cur && off && html`<button class="bt-back" onClick=${() => go(r, ch.p)}>${I('left', 14)}<span>Wróć do tego kroku</span></button>`}</div></li>`)}</ol>
    ${last && html`<div class="st-done">${i < CHAPTERS.length - 1 ? 'Ten rozdział za Tobą.' : 'To ostatni rozdział.'}</div>`}
    <div class="st-nav">
      <button class="pill soft" disabled=${i === 0} onClick=${() => step(-1)} aria-label="Poprzedni rozdział">${I('left', 18)}</button>
      <button class="pill st-next" onClick=${() => step(1)}>${i < CHAPTERS.length - 1 ? html`Dalej: ${CHAPTERS[i + 1].t}` : 'Zakończ historię'} ${I('chevron', 16)}</button>
    </div>
    ${ch.x.length > 0 && html`<div class="st-more"><span>Zobacz też</span>${ch.x.map(([t, r]) => html`<button onClick=${() => go(r, ch.p)}>${t}</button>`)}</div>`}
  </div>`;
}
function Progress12({ i, goChap }) {
  return html`<div class="p12"><div class="p12-k"><span>Rozdział ${i + 1} z ${CHAPTERS.length}</span></div>
    <div class="p12-bar">${CHAPTERS.map((ch, j) => html`<button class=${j < i ? 'done' : j === i ? 'now' : ''} onClick=${() => goChap(j)} title=${ch.t} aria-label=${'Rozdział ' + (j + 1) + ': ' + ch.t}><span>${ch.t}</span></button>`)}</div></div>`;
}

/* ---------- Opening tour and closing card ---------- */
const PEOPLE = [['A', 'Anna', '34 lata, Kraków'], ['T', 'Tomasz', 'partner'], ['Z', 'Zosia', '6 lat'], ['S', 'Stanisław', 'tata, 71 lat, Sandomierz']];
const OFFICES = ['Urząd gminy', 'NFZ', 'ZUS', 'CEPiK', 'Urząd skarbowy', 'USC', 'Szkoła', 'Poradnia', 'Ubezpieczyciel', 'RCB', 'Policja', 'Urząd wojewódzki'];
function Tour({ mode, onStart, onClose }) {
  const outro = mode === 'outro';
  const N = outro ? 1 : 4;
  const [k, setK] = useState(0);
  const next = () => k < N - 1 ? setK(k + 1) : onStart();
  useEffect(() => {
    const f = e => { e.stopImmediatePropagation(); if (e.key === 'ArrowRight' || e.key === 'Enter') next(); if (e.key === 'ArrowLeft' && k > 0) setK(k - 1); if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', f, true); return () => window.removeEventListener('keydown', f, true);
  }, [k]);
  const slides = outro ? [html`<div class="tv" key="o">
      <div class="tv-art"><div class="tv-card"><${DocCard} interactive=${false}/></div></div>
      <div class="tv-k">To wszystko</div>
      <h2 class="tv-h">Tak mógłby działać mObywatel.</h2>
      <p class="tv-p">Część tych funkcji działa już dziś, reszta korzysta z rejestrów, które państwo już ma. Przy każdym ekranie widać, jak to działa i gdzie pomaga AI.</p>
    </div>`] : [
    html`<div class="tv" key="0">
      <div class="tv-art fam">${PEOPLE.map(([i, n, r], j) => html`<div class="tv-person" style=${`animation-delay:${j * 70}ms`}><${Av} i=${i} size=${j === 0 ? 72 : 56}/><b>${n}</b><span>${r}</span></div>`)}</div>
      <div class="tv-k">Prototyp nowego mObywatela</div>
      <h2 class="tv-h">Poznaj Nowickich.</h2>
      <p class="tv-p">Anna i Tomasz mieszkają w Krakowie z sześcioletnią Zosią. Tata Anny, Stanisław, mieszka sam w Sandomierzu. Rodzina jest zmyślona, sprawy są prawdziwe.</p>
    </div>`,
    html`<div class="tv" key="1">
      <div class="tv-art scatter">${OFFICES.map((o, j) => html`<span style=${`--r:${((j * 37) % 13) - 6}deg;--d:${j * 40}ms`}>${o}</span>`)}</div>
      <div class="tv-k">Ich tydzień</div>
      <h2 class="tv-h">Przeprowadzka, poród, kardiolog, mandat, alarm i zalane mieszkanie.</h2>
      <p class="tv-p">Dziś każda z tych spraw to inny urząd, inny formularz i ten sam PESEL wpisywany od nowa.</p>
    </div>`,
    html`<div class="tv" key="2">
      <div class="tv-art"><div class="tv-card"><${DocCard} interactive=${false}/></div></div>
      <div class="tv-k">Pomysł</div>
      <h2 class="tv-h">Jedna aplikacja, która prowadzi sprawę do końca.</h2>
      <div class="tv-3">
        <div><b>Do końca</b><span>Od wniosku do decyzji, bez okienek.</span></div>
        <div><b>Dla rodziny</b><span>Dzieci, rodzice, pełnomocnictwa.</span></div>
        <div><b>Za Twoją zgodą</b><span>Nic nie wychodzi bez potwierdzenia.</span></div>
      </div>
    </div>`,
    html`<div class="tv" key="3">
      <div class="tv-art howto">
        <div class="hw"><b>1</b><span class="hw-col txt"><i></i><i></i><i class="s"></i><i class="btn"></i></span><em>Czytasz</em></div>
        <div class="hw main"><b>2</b><span class="hw-col ph"><i class="ring"></i></span><em>Klikasz</em></div>
        <div class="hw"><b>3</b><span class="hw-col txt"><i class="s"></i><i></i><i class="s"></i><i></i></span><em>Jak to działa</em></div>
      </div>
      <div class="tv-k">Jak to obejrzeć</div>
      <h2 class="tv-h">13 rozdziałów, około 6 minut.</h2>
      <p class="tv-p">Po lewej przeczytasz, co się dzieje. Telefon w środku działa naprawdę: podświetlimy, co kliknąć. Po prawej zobaczysz, jak to działa od środka. Następny rozdział włączysz przyciskiem „Dalej” albo strzałką →.</p>
    </div>`
  ];
  return html`<div class="tour-bg" role="dialog" aria-modal="true" aria-label="Wprowadzenie">
    <div class="tour">
      <button class="tour-x" aria-label="Zamknij" onClick=${onClose}>${I('x', 18)}</button>
      ${slides[k]}
      <div class="tour-foot">
        ${N > 1 ? html`<div class="tour-dots">${Array.from({ length: N }, (_, j) => html`<i class=${j === k ? 'on' : ''}></i>`)}</div>` : html`<span></span>`}
        <div class="tour-btns">
          ${outro ? html`<button class="pill soft" onClick=${onClose}>Klikaj dalej sam</button><button class="pill" onClick=${onStart}>Obejrzyj od nowa</button>`
            : k < N - 1 ? html`<button class="pill soft" onClick=${onClose}>Pomiń</button><button class="pill" onClick=${next}>Dalej ${I('chevron', 16)}</button>`
            : html`<button class="pill soft" onClick=${onClose}>Rozejrzę się sam</button><button class="pill" onClick=${onStart}>Zacznij historię ${I('chevron', 16)}</button>`}
        </div>
      </div>
    </div>
  </div>`;
}

/* coach mark: highlight what to tap on the current beat */
const COACHED = new WeakSet(), USED = new Set();
/* apply once per frame and only on a real change, so the tip never blinks when coach() re-runs (Karl, 26 Nov) */
let readyWant = false, readyRaf = 0;
const setReady = v => { readyWant = v; cancelAnimationFrame(readyRaf); readyRaf = requestAnimationFrame(() => document.querySelectorAll('.st-next, .ms-next').forEach(e => { if (e.classList.contains('ready') !== readyWant) e.classList.toggle('ready', readyWant); })); };
let tipRaf = 0;
function coachTip(ph, el) {
  cancelAnimationFrame(tipRaf);
  document.querySelectorAll('.coach-tip').forEach(t => t.remove());
  if (!ph || !el) return;
  const tip = document.createElement('div'); tip.className = 'coach-tip'; tip.setAttribute('aria-hidden', 'true');
  tip.innerHTML = '<span>Dotknij tutaj</span>'; ph.appendChild(tip);
  const tick = () => {
    if (!el.isConnected || !el.classList.contains('coach')) { tip.remove(); return; }
    const z = parseFloat(getComputedStyle(ph).zoom) || 1;
    const pr = ph.getBoundingClientRect(), r = el.getBoundingClientRect();
    const sx = pr.width / ph.offsetWidth || 1;
    const x = (r.left + r.width / 2 - pr.left) / sx, top = (r.top - pr.top) / sx, bot = (r.bottom - pr.top) / sx;
    const below = top < 56;
    tip.classList.toggle('below', below);
    const sp = tip.firstChild, w = sp.offsetWidth || 110, W = ph.offsetWidth, m = 10;
    const cx = Math.min(Math.max(x, w / 2 + m), W - w / 2 - m);
    tip.style.setProperty('--dx', Math.round(cx - x) + 'px');
    tip.style.transform = `translate(${Math.round(x)}px, ${Math.round(below ? bot + 12 : top - 12)}px)`;
    const vis = bot > 40 && top < ph.offsetHeight - 40;
    tip.style.opacity = vis ? '' : '0';
    tipRaf = requestAnimationFrame(tick);
  };
  tick();
}
let coachTimers = [];
function coach(i, route, retry) {
  if (!retry) { coachTimers.forEach(clearTimeout); coachTimers = []; }
  document.querySelectorAll('.coach').forEach(e => e.classList.remove('coach')); coachTip(null);
  setReady(false);
  const b = (BEATS[i] || []).find(x => x[0] === route);
  if (!b || !b[2]) { if (b && beatOf(i, route) === BEATS[i].length - 1) setReady(true); return false; }
  const ph = document.querySelector('.phone'); if (!ph) return false;
  const ok = x => x && !x.closest('.mstory,.story,.sheet-bg,.tabbar') && !COACHED.has(x) && !x.disabled && x.offsetParent !== null;
  const find = sel => {
    if (!sel) return null;
    if (sel[0] === '~') return [...ph.querySelectorAll('button,a,[role=button],.link')].find(x => ok(x) && x.textContent.includes(sel.slice(1)));
    return [...ph.querySelectorAll(sel)].find(ok);
  };
  const sheetBtn = [...ph.querySelectorAll('.sheet-bg .actions .btn:not(.soft)')].find(x => x.offsetParent !== null && !COACHED.has(x));
  if (sheetBtn) { sheetBtn.classList.add('coach'); coachTip(ph, sheetBtn); const offS = () => { ph.removeEventListener('pointerdown', offS, true); sheetBtn.classList.remove('coach'); coachTip(null); }; ph.addEventListener('pointerdown', offS, true); return true; }
  if (ph.querySelector('.sheet-bg')) return false; /* a sheet is open with nothing to tap: never point behind it */
  const sels = (Array.isArray(b[3]) ? b[3] : [b[3]]).filter(Boolean);
  let el = null, used = null;
  for (let k = 0; k < sels.length && !el; k++) {
    if (k < sels.length - 1 && USED.has(route + '|' + sels[k])) continue;
    el = find(sels[k]); used = sels[k];
  }
  if (!el && !sels.length) { el = find('.btn:not(.soft):not(.ghost)') || find('.scroll button'); used = null; }
  if (!el) { if (beatOf(i, route) === BEATS[i].length - 1) setReady(true); return false; }
  el.classList.add('coach');
  try { el.scrollIntoView({ block: 'center', behavior: 'smooth' }); } catch (e) {}
  coachTip(ph, el);
  const off = ev => {
    ph.removeEventListener('pointerdown', off, true);
    el.classList.remove('coach'); coachTip(null);
    if (el.contains(ev.target)) { COACHED.add(el); if (used) USED.add(route + '|' + used); }
    const still = () => (location.hash.slice(1).split('?')[0] || 'today') === route && !document.querySelector('.phone .coach');
    coachTimers = [700, 1200, 1800, 2600, 3600, 5000].map(ms => setTimeout(() => { if (still()) coach(i, route, true); }, ms));
  };
  ph.addEventListener('pointerdown', off, true);
  return true;
}
