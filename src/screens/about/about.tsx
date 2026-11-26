import { I } from '@/ui/icons';
import type { Ctx } from '@/types';

export function Roadmap(c: Ctx) {
  const r = [
    ['Karta ratunkowa bez internetu', 'Grupa krwi, alergie, kontakty alarmowe', 'ice'],
    ['Zgłaszanie szkód ze zdjęciami', 'Po ataku lub powodzi, komisja ogląda szkody', 'damage-1'],
    ['Identyfikator medyczny', 'Na ekranie blokady, tylko za zgodą', 'medical-id'],
    ['Zgoda obojga rodziców', 'Paszport dziecka bez wizyty drugiego rodzica', 'consent2'],
    ['Szkoła w aplikacji', 'Frekwencja, usprawiedliwienia, zgody', 'school'],
    ['Mój samochód', 'OC, przegląd, punkty, mandaty', 'car'],
    ['Podatki', 'Twój e-PIT, zwrot, opłaty lokalne', 'taxes'],
    ['Urządzenia i sesje', 'Wyloguj zgubiony telefon', 'devices'],
    ['Tarcza antyoszustwa', 'Sprawdź SMS, zgłoś do CERT', 'scam'],
    ['Tłumacz PJM', 'Wideo z tłumaczem na każdym ekranie', 'pjm'],
    ['Dokumenty od wystawcy', 'Dyplomy i uprawnienia bez skanów', 'issued'],
  ];
  return (
    <div>
      <h1 className="h-l">Nowe funkcje</h1>
      <p className="lead">11 rzeczy, o które prosili ludzie w badaniach. Każdą da się kliknąć.</p>
      <div className="list">
        {r.map(([t, s, go], i) => (
          <button className="row" onClick={() => c.go(go)}>
            <span className="it">{String(i + 1).padStart(2, '0')}</span>
            <span className="tx">
              <div className="t">{t}</div>
              <div className="s">{s}</div>
            </span>
            <span className="chev">{I('chevron', 18)}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

export function About(_c: Ctx) {
  return (
    <div>
      <h1 className="h-l">O tej koncepcji</h1>
      <p>
        Ten prototyp nowego mObywatela to niezależna koncepcja na konkurs mObywatel Challenge (mobywatel.ai).
        Nie jest oficjalną aplikacją mObywatel ani usługą administracji.
      </p>
      <p className="small">
        Wszystkie osoby, adresy i numery są fikcyjne. Asystent w tej wersji działa na przygotowanych
        scenariuszach. Wersja docelowa korzysta z polskich modeli językowych (Bielik lub PLLuM) z filtrem
        Bielik Guard.
      </p>
      <p className="small">
        Wzorce zaczerpnięte z: Diia (Ukraina), Singpass i LifeSG (Singapur), GOV.UK, Digital Post (Dania),
        aplikacja Home Front Command (Izrael), portfel EUDI.
      </p>
    </div>
  );
}
