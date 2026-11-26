/**
 * "Jak to działa" explainer for each screen: which public systems a step relies on.
 * Kind: `j` exists today, `n` needs to be built, `a` uses a language model.
 */
export type TechKind = 'j' | 'n' | 'a';
export type TechStep = [system: string, what: string, kind: TechKind];
export type TechEntry = [title: string, steps: TechStep[]];

const LOGIN: TechStep = ['Logowanie', 'mObywatel z Węzłem Krajowym (login.gov.pl), biometria telefonu', 'j'];

const SIGN: TechStep = [
  'Podpis',
  'Potwierdzenie twarzą lub PIN-em, podpis profilem zaufanym w mObywatelu',
  'j',
];

export const TECH: Record<string, TechEntry> = {
  'sign-1': [
    'Głos: zbliż telefony',
    [
      ['Zbliżenie', 'NFC lub Bluetooth między dwoma telefonami, jak przy wymianie kontaktów', 'n'],
      ['Projekt ustawy', 'Rejestr inicjatyw obywatelskich prowadzony przez Marszałka Sejmu', 'n'],
    ],
  ],
  'sign-2': [
    'Głos: co kto zobaczy',
    [
      SIGN,
      [
        'Tylko to, co trzeba',
        'Komitet dostaje tylko liczbę ważnych podpisów, dane widzi tylko urząd, który sprawdza podpisy',
        'n',
      ],
      [
        'Prawo',
        'Portal poparcia dla komitetów wyborczych to podpisana nowelizacja Kodeksu wyborczego. Podpisy pod projektami ustaw wymagają zmiany ustawy',
        'n',
      ],
    ],
  ],
  'sign-3': [
    'Głos: licznik poparcia',
    [
      ['Weryfikacja', 'Podpis sprawdzony z rejestrem PESEL i Centralnym Rejestrem Wyborców', 'j'],
      ['Licznik', 'Publiczny licznik ważnych podpisów, bez danych osobowych', 'n'],
    ],
  ],
  'sign-list': [
    'Moje podpisy',
    [
      ['Historia', 'Wszystkie poparcia: projekty ustaw, petycje, komitety', 'n'],
      ['Bez reklam', 'Komitety nie mogą wysyłać powiadomień', 'n'],
    ],
  ],
  'easy-sign': [
    'Podpis, którego nie było',
    [
      ['Alert', 'Gdy PESEL pojawia się na liście poparcia, właściciel dostaje powiadomienie', 'n'],
      ['Zgłoszenie', 'Jednym ruchem do PKW, podpis nie jest liczony', 'n'],
    ],
  ],
  eu: [
    'mObywatel w Europie',
    [
      [
        'EUDI',
        'Europejski portfel tożsamości cyfrowej. Pilotaż w mObywatelu planowany na grudzień 2026',
        'n',
      ],
      ['Tylko wybrane dane', 'Wypożyczalnia dostaje tylko 3 informacje: imię, prawo jazdy, wiek 25+', 'n'],
      ['Prawo jazdy', 'Dane z CEPiK', 'j'],
    ],
  ],
  'alert-watch': [
    'Zegarek prowadzi',
    [
      ['Przekazanie', 'Aplikacja na Apple Watch i Wear OS dostaje alert i trasę do schronu', 'n'],
      ['Wibracje', 'Skręty jako wzory wibracji: 2 stuknięcia w lewo, 3 w prawo', 'n'],
      ['Trasa', 'Mapa schronów zapisana w telefonie, działa bez internetu', 'n'],
    ],
  ],
  today: [
    'Ekran Dziś',
    [
      LOGIN,
      ['Terminy', 'Daty ważności z Rejestru Dowodów Osobistych, paszportów i z CEPiK (OC, przegląd)', 'j'],
      ['Sprawy w toku', 'Statusy z e-Doręczeń i systemów urzędów zebrane w jednym widoku', 'n'],
      ['Kolejność', 'Reguły: najpierw to, co wygasa najwcześniej albo blokuje inne sprawy', 'n'],
    ],
  ],
  matters: [
    'Sprawy według momentów życia',
    [
      ['Katalog momentów', 'Przeprowadzka, dziecko, auto, emerytura połączone z usługami z gov.pl', 'n'],
      ['Dane wypełnione za Ciebie', 'Rejestr PESEL, CEPiK, ZUS: formularze wypełniają się same', 'j'],
      ['Statusy', 'Jedna oś czasu dla wszystkich wniosków z e-Doręczeń i ePUAP', 'n'],
    ],
  ],
  'case-meld': [
    'Śledzenie sprawy',
    [
      ['Wniosek', 'Złożony w starostwie przez gov.pl', 'j'],
      ['Status', 'Odczyt z systemu urzędu, krok po kroku', 'n'],
      ['Powiadomienie', 'Powiadomienie, gdy dokument jest gotowy do odbioru', 'n'],
    ],
  ],
  'move-1': [
    'Przeprowadzka: rozmowa',
    [
      LOGIN,
      [
        'Zrozumienie prośby',
        'Polski model językowy (Bielik lub PLLuM) w chmurze państwowej zamienia „przeprowadzam się” na plan',
        'a',
      ],
      ['Plan', 'Stałe reguły łączą przeprowadzkę z 4 sprawami. Model nie decyduje, tylko proponuje', 'n'],
      ['Twoje dane', 'Imię, PESEL i obecny adres z rejestru PESEL, nie z pamięci modelu', 'j'],
    ],
  ],
  'move-2': [
    'Przeprowadzka: urzędy',
    [
      ['Urząd gminy', 'Zameldowanie elektroniczne (usługa gov.pl)', 'j'],
      ['NFZ', 'Wybór lekarza rodzinnego (POZ) przez Internetowe Konto Pacjenta', 'j'],
      ['Centralny Rejestr Wyborców', 'Zmiana miejsca głosowania po zameldowaniu', 'j'],
      ['CEPiK', 'Zgłoszenie zmiany adresu w dowodzie rejestracyjnym', 'j'],
      ['Orkiestracja', 'Jedna lista zamiast 4 osobnych wniosków', 'n'],
    ],
  ],
  'move-3': [
    'Przeprowadzka: podgląd',
    [
      ['Źródło każdego pola', 'Przy każdej wartości widać, skąd pochodzi: rejestr albo dokument', 'n'],
      [
        'Zgoda właściciela',
        'Właściciel mieszkania potwierdza w swoim mObywatelu, zamiast podpisu na papierze',
        'n',
      ],
      SIGN,
    ],
  ],
  'move-done': [
    'Przeprowadzka: wysłane',
    [
      ['Wysyłka', 'e-Doręczenia i ePUAP do 4 instytucji', 'j'],
      ['Śledzenie', 'Statusy i przypomnienia, np. 30 dni na dowód rejestracyjny', 'n'],
      ['Dziennik', 'Wpis w historii: co, kiedy i do kogo wysłano', 'n'],
    ],
  ],
  'baby-1': [
    'Nowe dziecko: start',
    [
      ['Akt urodzenia', 'Szpital zgłasza urodzenie do USC elektronicznie, PESEL nadawany automatycznie', 'j'],
      ['Wybór imienia', 'Zgłoszenie imienia przez rodzica online', 'j'],
      ['Pakiet', 'Jeden wniosek zamiast 4: dane wypełnione z aktu urodzenia', 'n'],
    ],
  ],
  'baby-2': [
    'Nowe dziecko: świadczenia',
    [
      ['800+', 'Wniosek do ZUS (eZUS / PUE ZUS)', 'j'],
      ['Ubezpieczenie NFZ', 'Zgłoszenie dziecka do ubezpieczenia rodzica', 'j'],
      ['Becikowe', 'Wniosek do gminy, gdy dochód rodziny nie przekracza progu', 'j'],
    ],
  ],
  'baby-3': [
    'Nowe dziecko: zgoda obojga',
    [['Drugi rodzic', 'Tomasz dostaje prośbę w swoim mObywatelu i zatwierdza', 'n'], SIGN],
  ],
  'baby-done': [
    'Nowe dziecko: gotowe',
    [
      ['Wysyłka', 'USC, ZUS i NFZ przez e-Doręczenia', 'j'],
      ['Profil dziecka', 'Julia pojawia się w Bliskich z kalendarzem szczepień z IKP', 'n'],
    ],
  ],
  'visit-1': [
    'Wizyta: skierowanie',
    [
      [
        'e-Skierowanie',
        'Wystawione w systemie P1 (Centrum e-Zdrowia), widoczne w Internetowym Koncie Pacjenta (IKP)',
        'j',
      ],
      ['Dostęp do konta dziecka', 'Rodzic widzi IKP dziecka do 18. roku życia', 'j'],
    ],
  ],
  'visit-2': [
    'Wizyta: terminy',
    [
      [
        'Centralna e-Rejestracja',
        'Wolne terminy z Centralnej e-Rejestracji, która obejmuje m.in. pierwszą wizytę u kardiologa',
        'j',
      ],
      ['Poczekalnia', 'Gdy zwolni się wcześniejszy termin, przesuwamy wizytę po Twojej zgodzie', 'n'],
    ],
  ],
  'visit-3': ['Wizyta: podgląd', [['Rezerwacja', 'Zapis w CeR na skierowanie dziecka', 'j'], SIGN]],
  'visit-4': [
    'Wizyta: potwierdzona',
    [
      ['Kalendarz', 'Termin w kalendarzu rodziny i przypomnienie dzień wcześniej', 'n'],
      ['Odwołanie', 'Jednym ruchem, termin wraca do puli', 'j'],
    ],
  ],
  'letter-1': [
    'Pismo: zdjęcie',
    [
      ['Zdjęcie', 'Rozpoznanie tekstu (OCR) na telefonie. Obraz nie opuszcza urządzenia', 'n'],
      ['Dane osobowe', 'PESEL i adres są ukryte przed wysłaniem tekstu do modelu', 'n'],
    ],
  ],
  'letter-2': [
    'Pismo: wyjaśnienie',
    [
      ['Wyjaśnienie', 'Polski model AI (Bielik lub PLLuM) tłumaczy pismo prostym językiem', 'a'],
      [
        'Źródła',
        'Odpowiedź tylko z oficjalnej bazy przepisów (ISAP) i gov.pl, z linkami. Bez źródła nie ma odpowiedzi',
        'a',
      ],
      ['Termin', 'Data odpowiedzi trafia do Terminów', 'n'],
    ],
  ],
  'letter-3': [
    'Pismo: odpowiedź',
    [
      ['Projekt pisma', 'Szkic wyjaśnień do urzędu skarbowego, który możesz edytować', 'a'],
      ['Wysyłka', 'e-Urząd Skarbowy, dopiero po Twoim potwierdzeniu', 'j'],
    ],
  ],
  assistant: [
    'Asystent',
    [
      ['Model', 'Polski model językowy: Bielik (SpeakLeash, ACK Cyfronet AGH) lub PLLuM', 'a'],
      ['Tylko źródła urzędowe', 'gov.pl, ISAP, biznes.gov.pl. Każda odpowiedź ma przypis', 'a'],
      ['Żadnych akcji bez Ciebie', 'Asystent przygotowuje. Wysyłasz Ty, na ekranie potwierdzenia', 'n'],
    ],
  ],
  safety: [
    'Ochrona',
    [
      [
        'Alert RCB',
        'Rządowe Centrum Bezpieczeństwa wysyła alerty przez operatorów (SMS i komunikat na wszystkie telefony w okolicy, tzw. cell broadcast)',
        'j',
      ],
      [
        'Ten sam alert w aplikacji',
        'mObywatel odbiera komunikat RCB i sprawdza jego podpis, żeby nie dać się nabrać na fałszywki',
        'n',
      ],
      ['Ostrzeżenia regionalne', 'RSO i IMGW dla miejsc, które obserwujesz', 'j'],
      ['Lokalizacja', 'Liczona na telefonie. Aplikacja nie wysyła, gdzie jesteś', 'n'],
    ],
  ],
  lock: [
    'Powiadomienia na żywo',
    [
      [
        'Alert RCB',
        'Komunikat RCB przychodzi jak dziś: SMS lub komunikat na wszystkie telefony w okolicy, także bez aplikacji',
        'j',
      ],
      [
        'Powiadomienia mObywatela',
        'Powiadomienie z dodatkami: najbliższy schron i rodzina, zaraz po alercie',
        'n',
      ],
      [
        'Aktywność na żywo',
        'Widżet na ekranie blokady (iOS Live Activities, Android: trwałe powiadomienie) ze statusem rodziny',
        'n',
      ],
      ['Placówki', 'Przedszkole potwierdza „dzieci w schronie” jednym przyciskiem w swoim panelu', 'n'],
    ],
  ],
  'family-map': [
    'Gdzie jest rodzina',
    [
      [
        'Lokalizacja tylko w alarmie',
        'Bliscy udostępniają położenie wyłącznie, gdy RCB ogłosi alarm w ich strefie albo Twojej',
        'n',
      ],
      ['Zgoda z góry', 'Każdy dorosły włącza to sam w ustawieniach rodziny. Dzieci przez rodzica', 'n'],
      ['Wygasanie', 'Udostępnianie wyłącza się po odwołaniu alarmu, ślad znika po 72 godzinach', 'n'],
    ],
  ],
  places: [
    'Obserwowane miejsca',
    [
      ['Strefy', 'Alert dla Sandomierza przychodzi z dopiskiem „miejsce taty”', 'n'],
      ['Prywatność', 'Lista miejsc zostaje w telefonie', 'n'],
    ],
  ],
  'alert-red': [
    'Alert RCB: alarm',
    [
      ['RCB', 'Komunikat od Rządowego Centrum Bezpieczeństwa dla obszaru Krakowa', 'j'],
      ['Weryfikacja', 'Podpis cyfrowy RCB sprawdzony w telefonie', 'n'],
      ['Kontekst', 'mObywatel dokłada najbliższe schronienie i status rodziny', 'n'],
      ['Bez internetu', 'Mapa schronień i trasa zapisane wcześniej w telefonie', 'n'],
    ],
  ],
  'alert-shelter': [
    'Alert RCB: schronienie',
    [
      ['Rejestr schronień', 'Miejsca schronienia z listy Państwowej Straży Pożarnej', 'j'],
      ['Trasa bez internetu', 'Mapa pobrana wcześniej. Działa, nawet gdy sieć jest przeciążona', 'n'],
    ],
  ],
  'alert-guide': [
    'Alert RCB: instrukcja',
    [
      ['Treść', 'Zasady z poradnika RCB i obrony cywilnej', 'j'],
      ['Czytanie na głos', 'Telefon czyta tekst na głos, bez internetu', 'n'],
    ],
  ],
  'alert-safe': [
    '„Jestem bezpieczna”',
    [
      ['Status', 'Krótka wiadomość do rodziny. Przy słabym zasięgu wysyłana SMS-em', 'n'],
      ['Kto widzi', 'Tylko osoby z Twojej rodziny w aplikacji. Znika po 72 godzinach', 'n'],
    ],
  ],
  'alert-clear': [
    'Alert RCB: odwołanie',
    [
      ['RCB', 'Komunikat o odwołaniu alarmu', 'j'],
      ['Po zdarzeniu', 'Zgłoszenie szkód i status rodziny w jednym miejscu', 'n'],
    ],
  ],
  'alert-damage': [
    'Zgłoszenie szkód',
    [
      ['Zdjęcia z lokalizacją', 'Wzór: ukraiński eRecovery w aplikacji Diia', 'n'],
      ['Gmina', 'Zgłoszenie trafia do komisji, która wycenia szkody', 'n'],
    ],
  ],
  family: [
    'Bliscy',
    [
      ['Relacje', 'Rodzice i dzieci z rejestru PESEL i aktów stanu cywilnego', 'j'],
      [
        'Dostęp dla bliskiej osoby',
        'Cyfrowe pełnomocnictwo: zakres, data końca, cofnięcie w każdej chwili',
        'n',
      ],
      ['Dziennik', 'Każde użycie dostępu jest zapisane i widoczne dla obu stron', 'n'],
    ],
  ],
  invite: [
    'Zaproszenie do rodziny',
    [
      ['Zakres', 'Wybierasz, co druga osoba może widzieć i robić', 'n'],
      ['Kod QR', 'Jednorazowy, ważny 10 minut', 'n'],
      SIGN,
    ],
  ],
  'member-tata': [
    'Pomoc tacie',
    [
      ['Pełnomocnictwo', 'Tata zatwierdził dostęp na rok. Możesz pomagać, ale nie wysyłasz za niego', 'n'],
      ['Recepty', 'e-Recepty z IKP taty, za jego zgodą', 'j'],
    ],
  ],
  'member-zosia': [
    'Profil dziecka',
    [
      ['Dane', 'PESEL, paszport, szczepienia (IKP), 800+ (ZUS)', 'j'],
      ['Opiekunowie', 'Oboje rodzice widzą to samo', 'n'],
    ],
  ],
  'member-tomasz': [
    'Partner',
    [['Wspólne sprawy', 'Dzieci, auto, mieszkanie. Reszta zostaje prywatna', 'n']],
  ],
  calendar: [
    'Kalendarz rodziny',
    [
      ['Źródła', 'Terminy z dokumentów, wizyt i wniosków wszystkich bliskich', 'n'],
      ['Eksport', 'Do kalendarza w telefonie', 'n'],
    ],
  ],
  plan: ['Plan rodziny', [['Na wypadek kryzysu', 'Miejsca spotkań i kontakty, zapisane w telefonie', 'n']]],
  docs: [
    'Dokumenty',
    [
      ['mDowód', 'Dane z Rejestru Dowodów Osobistych', 'j'],
      ['Prawo jazdy i pojazdy', 'CEPiK', 'j'],
      ['Weryfikacja', 'Kod QR podpisany przez państwo, sprawdzany w aplikacji drugiej osoby', 'j'],
    ],
  ],
  'doc-id': [
    'mDowód',
    [
      ['Dane', 'Rejestr Dowodów Osobistych i rejestr PESEL', 'j'],
      ['Okazanie', 'Kod QR, który druga osoba sprawdza w swoim mObywatelu', 'j'],
    ],
  ],
  'share-min': [
    'Pokaż tylko to, co trzeba',
    [
      ['Tylko wybrane dane', 'Pokazujesz jeden fakt (np. „pełnoletnia”) zamiast całego dowodu', 'n'],
      ['Standard', 'Zgodnie z europejskim portfelem tożsamości (EUDI Wallet)', 'n'],
    ],
  ],
  lost: [
    'Utrata dokumentu',
    [
      ['Zastrzeżenie', 'Unieważnienie dowodu online, od razu w rejestrze', 'j'],
      ['Nowy dokument', 'Wniosek i wizyta w urzędzie umawiana w aplikacji', 'n'],
    ],
  ],
  'access-log': [
    'Kto sprawdzał moje dane',
    [
      ['Rejestr udostępnień', 'Rejestr PESEL zapisuje, kto i kiedy pobrał Twoje dane', 'j'],
      ['„To nie ja”', 'Zgłoszenie trafia prosto do administratora rejestru', 'n'],
    ],
  ],
  profile: [
    'Profil i zaufanie',
    [LOGIN, ['Przejrzystość', 'Historia zgód, logowań i udostępnień w jednym miejscu', 'n']],
  ],
  signin: ['Historia logowań', [['Sesje', 'Urządzenia i logowania z Węzła Krajowego', 'j']]],
  offline: [
    'Bez internetu',
    [['Zapis w telefonie', 'Dokumenty i mapy zapisane w telefonie, podpisane i zaszyfrowane', 'n']],
  ],
  ice: [
    'Karta ratunkowa',
    [
      ['Twoje wpisy', 'Grupa krwi, alergie, kontakty. Państwo nie ma dziś takiej karty', 'n'],
      ['IKP (P1)', 'Leki i alergie z Internetowego Konta Pacjenta, za zgodą', 'j'],
      ['Bez internetu', 'Zaszyfrowana kopia w telefonie, bez logowania', 'n'],
    ],
  ],
  'medical-id': [
    'Identyfikator medyczny',
    [
      ['Ekran blokady', 'Widżet systemowy (jak Medical ID w iPhonie), tylko pola, które wybierzesz', 'n'],
      [
        'Bez danych wrażliwych',
        'Bez PESEL i adresu. Pełne dane widzi tylko lekarz w systemie e-zdrowia (P1)',
        'n',
      ],
      [
        'Standard UE',
        'Europejskie podsumowanie pacjenta, czytelne dla lekarza w każdym kraju UE (EHDS)',
        'n',
      ],
    ],
  ],
  'damage-1': [
    'Zgłoszenie szkód: zdjęcia',
    [
      ['Zdjęcia z datą i miejscem', 'Czas i miejsce zapisane w chwili zrobienia, podpisane w telefonie', 'n'],
      ['Wzór', 'eRecovery w ukraińskiej Diia: zgłoszenie i odszkodowanie w aplikacji', 'n'],
    ],
  ],
  'damage-2': [
    'Zgłoszenie szkód: opis',
    [
      ['Dane z rejestrów', 'Adres z PESEL, zdarzenie z Alertu RCB, konto z e-Urzędu Skarbowego', 'j'],
      ['Droga do gminy', 'Dziś nie ma krajowego cyfrowego zgłoszenia szkód', 'n'],
      SIGN,
    ],
  ],
  'damage-3': [
    'Zgłoszenie szkód: status',
    [
      ['Gmina', 'Komisja oględzin, protokół i decyzja o zasiłku', 'j'],
      ['Oś czasu', 'Każdy krok sprawy widoczny w aplikacji', 'n'],
    ],
  ],
  consent2: [
    'Zgoda obojga rodziców',
    [
      ['Paszport dziecka', 'Od 11 czerwca 2026 drugi rodzic potwierdza w mObywatelu (dzieci do 12 lat)', 'j'],
      ['Szkoła i wyjazdy', 'Ta sama zgoda dla wycieczek i decyzji szkolnych', 'n'],
      ['Wycofanie', 'Każdą zgodę widać i można cofnąć', 'j'],
    ],
  ],
  school: [
    'Szkoła',
    [
      [
        'Państwowy e-Dziennik',
        'Darmowy dziennik połączony z Systemem Informacji Oświatowej (SIO), pilotaż w roku 2026/27',
        'j',
      ],
      ['Usprawiedliwienia i zgody', 'Jedno stuknięcie, oboje rodzice widzą to samo', 'n'],
      ['Streszczenie tygodnia', 'Co ważnego w szkole, w trzech zdaniach', 'a'],
    ],
  ],
  car: [
    'Mój samochód',
    [
      ['mPojazd (CEPiK)', 'OC, przegląd, przebieg, przypomnienie 30 dni wcześniej', 'j'],
      ['Punkty karne i mandaty', 'Już są w mObywatelu, ale w osobnych miejscach', 'j'],
      ['Jedna karta', 'Wszystko o aucie razem, z płatnością mandatu', 'n'],
    ],
  ],
  taxes: [
    'Podatki',
    [
      ['Twój e-PIT', 'Zeznanie gotowe od 15 lutego, zwrot do 45 dni', 'j'],
      ['ePłatności', 'Podatki lokalne w ponad 300 urzędach, BLIK i karta', 'j'],
      ['Jeden widok', 'Zwrot, raty i opłaty w jednym miejscu z przypomnieniami', 'n'],
    ],
  ],
  devices: [
    'Urządzenia i sesje',
    [
      ['Dziś', 'Zgubiony telefon: infolinia mObywatela blokuje aplikację', 'j'],
      ['Lista urządzeń', 'Wszystkie zalogowane telefony i przeglądarki, wylogowanie jednym ruchem', 'n'],
      ['Alert logowania', 'Powiadomienie przy każdym nowym urządzeniu', 'n'],
    ],
  ],
  scam: [
    'Tarcza antyoszustwa',
    [
      ['Lista ostrzeżeń CERT Polska', 'Niebezpieczne domeny blokowane ustawowo', 'j'],
      ['SMS 8080 i „Bezpiecznie w sieci”', 'Zgłaszanie oszustw, już dostępne', 'j'],
      ['Sprawdzarka wiadomości', 'Wklej lub udostępnij SMS i dostań ocenę', 'n'],
      ['Nowe oszustwa', 'Model rozpoznaje wzorce, których jeszcze nie ma na liście', 'a'],
    ],
  ],
  pjm: [
    'Tłumacz PJM',
    [
      ['Prawo do tłumacza', 'Ustawa o języku migowym z 2011 r.', 'j'],
      ['Wideo z tłumaczem', 'Dziś każdy urząd kupuje to osobno. Tu jeden przycisk w aplikacji', 'n'],
      ['Awatar PJM', 'Projekt Łukasiewicz EMAG tłumaczy mowę na awatara', 'a'],
    ],
  ],
  issued: [
    'Dokumenty od wystawcy',
    [
      ['mDyplomy z POL-on', 'Dyplomy wydawane do mObywatela od czerwca 2026', 'j'],
      ['Uprawnienia zawodowe', 'PWZ i inne z rejestrów zawodowych', 'j'],
      ['Portfel UE', 'Potwierdzone informacje (EUDI), pilotaż mObywatel Europa', 'n'],
    ],
  ],
  inbox: [
    'Skrzynka',
    [
      [
        'e-Doręczenia',
        'Pisma z urzędów trafiają na jeden adres do doręczeń elektronicznych. Działa od 2025 roku',
        'j',
      ],
      [
        'Krótkie wyjaśnienie',
        'Polski model AI streszcza pismo w jednym zdaniu. Pełna treść zawsze obok',
        'a',
      ],
      ['Archiwum', 'Pisma zostają w telefonie, nic nie ginie', 'n'],
    ],
  ],
  search: [
    'Szukaj',
    [
      ['Indeks spraw', 'Wyniki pojawiają się już przy pisaniu, także bez polskich znaków', 'n'],
      [
        'Jak to zrobić?',
        'AI rozpoznaje, o co pytasz, i wybiera gotową instrukcję. Instrukcje piszą ludzie, więc AI ich nie zmyśla. „Pokaż mi” wskazuje właściwy przycisk',
        'a',
      ],
      ['Gdy nic nie pasuje', 'Pytanie trafia do asystenta, który odpowiada ze źródłami z gov.pl', 'a'],
    ],
  ],
  caller: [
    'Kto do mnie dzwoni?',
    [
      [
        'Rejestr połączeń urzędów',
        'Urząd zgłasza zawczasu, do kogo i po co dzwoni. Telefon porównuje numer z tą listą',
        'n',
      ],
      ['Rozpoznawanie podszywania', 'Model sprawdza, czy numer udaje urząd (tzw. spoofing)', 'a'],
      ['Zgłoszenie', 'Jednym ruchem do CERT Polska', 'j'],
    ],
  ],
  consents: [
    'Moje zgody',
    [
      ['Rejestr zgód', 'Każda zgoda ma datę końca i da się ją cofnąć od razu', 'n'],
      ['Cofnij', 'Przez kilka sekund możesz odwołać cofnięcie', 'n'],
    ],
  ],
  'car-sell': [
    'Sprzedaż auta',
    [
      ['Zgłoszenie sprzedaży', 'Do starostwa online, w 30 dni od sprzedaży', 'j'],
      ['Umowa', 'Wzór umowy wypełniony danymi z CEPiK', 'n'],
    ],
  ],
  benefits: [
    'Świadczenia',
    [['ZUS i gmina', 'Dopasowanie świadczeń do Twojej sytuacji z danych, które państwo już ma', 'n']],
  ],
  p800: ['800+', [['ZUS', 'Status z eZUS / PUE ZUS, data wypłaty', 'j']]],
  vacc: ['Szczepienia', [['IKP', 'Kalendarz szczepień dziecka z Internetowego Konta Pacjenta', 'j']]],
  'renew-pass': [
    'Paszport dziecka',
    [
      ['Wniosek', 'Wypełniony wcześniej, w urzędzie tylko odcisk palców i podpis', 'n'],
      ['Wizyta', 'Rezerwacja terminu w urzędzie wojewódzkim', 'j'],
    ],
  ],
  easy: [
    'Tryb prosty',
    [
      ['Ten sam mObywatel', 'Inny układ: 4 duże kafle, większy tekst, czytanie na głos', 'n'],
      ['Pomoc córki', 'Anna widzi to, na co tata się zgodził, i może przygotować sprawy', 'n'],
    ],
  ],
  'easy-voice': [
    'Rozmowa głosowa',
    [
      ['Mowa na tekst', 'Rozpoznawanie mowy po polsku', 'a'],
      ['Odpowiedź', 'Dane z dokumentu taty, przeczytane na głos', 'j'],
    ],
  ],
  'easy-approve': [
    'Zatwierdzanie przez tatę',
    [['Jedno pytanie', 'Duży przycisk TAK lub NIE, bez formularza', 'n'], SIGN],
  ],
  'easy-doc': ['Dowód taty', [['Dane', 'Rejestr Dowodów Osobistych', 'j']]],
  'easy-rx': ['Recepty taty', [['e-Recepty', 'Z IKP, z kodem do apteki', 'j']]],
  'easy-call': ['Telefon do bliskich', [['Kontakty', 'Z Bliskich, bez szukania numeru', 'n']]],
  roadmap: [
    'Nowe funkcje',
    [
      ['Źródło', '11 potrzeb z badań i przeglądu aplikacji z innych krajów', 'n'],
      ['Kolejność', 'Najpierw to, co łączy istniejące usługi mObywatela', 'n'],
    ],
  ],
  about: ['O koncepcji', [['Zasada', 'Asystent przygotowuje, człowiek decyduje', 'n']]],
};
