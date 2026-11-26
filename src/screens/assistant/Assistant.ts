import { html, useEffect, useRef, useState } from '@/lib/preact';
import { RM } from '@/lib/env';
import { I } from '@/ui/icons';
import { Typed } from '@/ui/primitives';

const INTENTS = [
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

export function Assistant(c) {
  const [msgs, setMsgs] = useState([]);
  const [q, setQ] = useState('');
  const [busy, setBusy] = useState(false);
  const endRef = useRef(null);
  const ask = text => {
    const it = INTENTS.find(i => i.k.test(text));
    const ans = it || {
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
      RM() ? 0 : 900,
    );
  };
  const fin = i => setMsgs(m => m.map((x, j) => (j === i ? { ...x, typing: false } : x)));
  useEffect(() => {
    if (c.s.q) {
      ask(c.s.q);
      c.set({ q: null });
    }
  }, []);
  useEffect(() => {
    endRef.current && endRef.current.scrollIntoView({ block: 'end' });
  }, [msgs, busy]);
  return html`<div style="display:flex;flex-direction:column;gap:12px">
    <h1 class="h-l">Asystent</h1>
    <p class="ai-warn" style="text-align:left;margin:0">Odpowiadam na podstawie stron gov.pl i Twoich danych. Mogę się mylić. Niczego nie wysyłam bez Twojego „Potwierdź”.</p>
    ${msgs.length === 0 && html`<div class="sugs">${['Przeprowadzam się w grudniu', 'Urodziło mi się dziecko', 'Kiedy wygasa dowód taty?', 'Dostałam pismo z urzędu'].map(t => html`<button class="sug" onClick=${() => ask(t)}>${t}</button>`)}</div>`}
    <div class="chat">${msgs.map((m, i) =>
      m.me
        ? html`<div class="msg me">${m.me}</div>`
        : html`<div class="msg ai">${m.typing ? html`<${Typed} text=${m.ai.a} onDone=${() => fin(i)}/>` : m.ai.a}
      ${
        !m.typing &&
        html`<div class="srcs in">${m.ai.src.map(s => html`<span>${s}</span>`)}</div>
      ${m.ai.act && html`<button class="btn in" style="margin-top:10px;padding:11px" onClick=${() => c.go(m.ai.act[1])}>${m.ai.act[0]}</button>`}`
      }</div>`,
    )}
      ${busy && html`<div class="msg ai typing"><span class="tdots"><i></i><i></i><i></i></span><span class="tw">Szukam w gov.pl…</span></div>`}</div>
    <div ref=${endRef}></div>
    <div class="askbar" style="margin-top:6px">
      <input id="ask2" value=${q} onInput=${e => setQ(e.target.value)} onKeyDown=${e => {
        if (e.key === 'Enter' && q) {
          ask(q);
          setQ('');
        }
      }} placeholder="Napisz lub powiedz" aria-label="Napisz pytanie"/>
      <button class="ib" aria-label="Mów" onClick=${() => ask('Kiedy wygasa dowód taty?')}>${I('mic')}</button>
      <button class="ib go" aria-label="Wyślij" onClick=${() => {
        if (q) {
          ask(q);
          setQ('');
        }
      }}>${I('send', 18)}</button>
    </div>
  </div>`;
}
