import { Title } from '@/components/ui/typography';
import { Button } from '@/components/ui/button';
import { useEffect, useRef, useState } from 'react';
import { reducedMotion } from '@/lib/env';
import { I } from '@/ui/icons';
import { Typed } from '@/ui/primitives';
import type { Ctx } from '@/types';

/** A canned assistant answer, picked by matching the question against `k`. */
interface Answer {
  k?: RegExp;
  a: string;
  src: string[];
  act?: [label: string, route: string];
}

type Message =
  { me: string; ai?: undefined; typing?: undefined } | { me?: undefined; ai: Answer; typing: boolean };

const INTENTS: (Answer & { k: RegExp })[] = [
  {
    k: /(przeprowadz|melduj|zamelduj|adres)/i,
    a: 'Przy przeprowadzce w Krakowie musisz się zameldować w ciągu 30 dni. Mogę od razu przygotować zameldowanie, zmianę lekarza rodzinnego, miejsca głosowania i adresu w dowodzie rejestracyjnym. Nic nie wyślę bez Twojego potwierdzenia.',
    src: ['gov.pl: zameldowanie', 'Ustawa o ewidencji ludności, art. 28'],
    act: ['Przygotuj przeprowadzkę', 'move-1'],
  },
  {
    k: /(dziec|urodz|800|narodz)/i,
    a: 'Gratulacje! Masz 21 dni na zgłoszenie narodzin. Razem z tym mogę przygotować 800+ i zgłoszenie do NFZ.',
    src: ['gov.pl: zgłoszenie urodzenia', 'ZUS: 800+'],
    act: ['Zacznij pakiet „Nowe dziecko”', 'baby-1'],
  },
  {
    k: /(lekarz|kardiolog|wizyt|skierow)/i,
    a: 'Masz e-skierowanie do kardiologa dla Zosi. Najbliższy wolny termin to 15 grudnia.',
    src: ['pacjent.gov.pl: Centralna e-Rejestracja'],
    act: ['Zarezerwuj wizytę', 'visit-1'],
  },
  {
    k: /(dow[oó]d|ważn|wazn)/i,
    a: 'Twój dowód osobisty jest ważny do 12 maja 2031. Tata ma dowód ważny do 26 stycznia 2027, więc warto złożyć wniosek w grudniu.',
    src: ['Rejestr Dowodów Osobistych'],
    act: ['Zobacz terminy taty', 'member-tata'],
  },
  {
    k: /(pismo|list|urz[aą]d skarb|wezwan)/i,
    a: 'Zrób zdjęcie pisma, a wyjaśnię je prostym językiem i podam termin.',
    src: ['podatki.gov.pl'],
    act: ['Zrób zdjęcie', 'letter-1'],
  },
  {
    k: /(alarm|syren|schron|bezpiecz)/i,
    a: 'Najbliższe schronienie to ul. Dekerta 24, 240 m od domu, czynne całą dobę. Trasa działa bez internetu.',
    src: ['Gdzie się ukryć (Straż Pożarna)', 'Poradnik bezpieczeństwa'],
    act: ['Pokaż schronienie', 'alert-shelter'],
  },
];

export function Assistant(c: Ctx) {
  const [msgs, setMsgs] = useState<Message[]>([]);
  const [q, setQ] = useState('');
  const [busy, setBusy] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);
  const ask = (text: string) => {
    const it = INTENTS.find(i => i.k.test(text));
    const ans: Answer = it || {
      a: 'Na to pytanie nie mam jeszcze pewnej odpowiedzi. Zobacz informacje na gov.pl albo połącz się z konsultantem.',
      src: ['gov.pl'],
      act: ['Porozmawiaj z konsultantem', 'about'],
    };
    setMsgs(m => [...m, { me: text }]);
    setBusy(true);
    setTimeout(
      () => {
        setBusy(false);
        setMsgs(m => [...m, { ai: ans, typing: true }]);
      },
      reducedMotion() ? 0 : 900,
    );
  };
  const fin = (i: number) => setMsgs(m => m.map((x, j) => (j === i && x.ai ? { ...x, typing: false } : x)));
  useEffect(() => {
    if (c.s.q) {
      ask(c.s.q);
      c.set({ q: null });
    }
  }, []);
  useEffect(() => {
    endRef.current && endRef.current.scrollIntoView({ block: 'end' });
  }, [msgs, busy]);
  return (
    <div className="flex flex-col gap-3">
      <Title>Asystent</Title>
      <p className="ai-warn text-left m-0">
        Odpowiadam na podstawie stron gov.pl i Twoich danych. Mogę się mylić. Niczego nie wysyłam bez Twojego
        „Potwierdź”.
      </p>
      {msgs.length === 0 && (
        <div className="sugs">
          {[
            'Przeprowadzam się w grudniu',
            'Urodziło mi się dziecko',
            'Kiedy wygasa dowód taty?',
            'Dostałam pismo z urzędu',
          ].map(t => (
            <button className="sug" onClick={() => ask(t)}>
              {t}
            </button>
          ))}
        </div>
      )}
      <div className="chat">
        {msgs.map((m, i) =>
          m.ai === undefined ? (
            <div className="msg me">{m.me}</div>
          ) : (
            <div className="msg ai">
              {m.typing ? <Typed text={m.ai.a} onDone={() => fin(i)} /> : m.ai.a}
              {!m.typing && (
                <>
                  <div className="srcs in">
                    {m.ai.src.map(s => (
                      <span>{s}</span>
                    ))}
                  </div>
                  {m.ai.act && (
                    <Button
                      className="animate-[fadeUp_0.25s_var(--out)] mt-2.5 p-[11px]"

                      onClick={() => c.go(m.ai.act![1])}
                    >
                      {m.ai.act[0]}
                    </Button>
                  )}
                </>
              )}
            </div>
          ),
        )}
        {busy && (
          <div className="msg ai typing">
            <span className="tdots">
              <i></i>
              <i></i>
              <i></i>
            </span>
            <span className="tw">Szukam w gov.pl…</span>
          </div>
        )}
      </div>
      <div ref={endRef}></div>
      <div className="askbar mt-1.5">
        <input
          id="ask2"
          value={q}
          onInput={e => setQ((e.target as HTMLInputElement).value)}
          onKeyDown={e => {
            if (e.key === 'Enter' && q) {
              ask(q);
              setQ('');
            }
          }}
          placeholder="Napisz lub powiedz"
          aria-label="Napisz pytanie"
        />
        <button className="ib" aria-label="Mów" onClick={() => ask('Kiedy wygasa dowód taty?')}>
          {I('mic')}
        </button>
        <button
          className="ib go"
          aria-label="Wyślij"
          onClick={() => {
            if (q) {
              ask(q);
              setQ('');
            }
          }}
        >
          {I('send', 18)}
        </button>
      </div>
    </div>
  );
}
