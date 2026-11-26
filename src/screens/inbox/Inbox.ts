import { html, useState } from '@/lib/preact';
import { swipeRow } from '@/ui/controls';
import { I } from '@/ui/icons';

/* Hop 11: one inbox for letters from every office (e-Doręczenia), swipe to archive */
const MAIL0 = [
  {
    k: 'us',
    from: 'Urząd Skarbowy Kraków-Podgórze',
    t: 'Wezwanie: wyjaśnienie korekty PIT-37',
    s: 'Odpowiedz do 7 grudnia',
    d: '19 lis',
    unread: true,
    r: 'letter-1',
    tag: 'Wymaga odpowiedzi',
    ai: 'Urząd pyta, dlaczego zwrot wzrósł. To nie kara.',
  },
  {
    k: 'zus',
    from: 'ZUS',
    t: 'Decyzja: 800+ na Zosię',
    s: 'Przyznano od czerwca 2026',
    d: '12 lis',
    unread: true,
    r: 'p800',
    ai: 'Dostajesz 800 zł co miesiąc do maja 2027.',
  },
  {
    k: 'um',
    from: 'Urząd Miasta Krakowa',
    t: 'Podatek od nieruchomości, 4. rata',
    s: '86 zł, termin 15 listopada',
    d: '2 lis',
    r: 'taxes',
  },
  {
    k: 'cepik',
    from: 'Wydział Komunikacji',
    t: 'Dowód rejestracyjny w produkcji',
    s: 'Odbiór od 2 grudnia',
    d: '20 lis',
    r: 'case-meld',
  },
  {
    k: 'nfz',
    from: 'NFZ',
    t: 'Zosia: e-skierowanie do kardiologa',
    s: 'Ważne do 21 listopada 2027',
    d: '18 lis',
    r: 'visit-1',
  },
];

export function Inbox(c) {
  const [list, setList] = useState(c.s.mail || MAIL0);
  const [f, setF] = useState('all');
  const save = l => {
    setList(l);
    c.set({ mail: l, inboxNew: l.filter(x => x.unread).length });
  };
  const arch = x => {
    const prev = list;
    save(list.filter(y => y.k !== x.k));
    c.toast({ t: 'Przeniesiono do archiwum', undo: () => save(prev) });
  };
  const open = (e, x) => {
    if (e.currentTarget.dataset.swiped) return;
    save(list.map(y => (y.k === x.k ? { ...y, unread: false } : y)));
    c.go(x.r);
  };
  const shown = list.filter(x => f === 'all' || x.unread);
  return html`<div class="inbox8">
    <h1 class="h-l">Skrzynka</h1>
    <p class="lead" style="margin-bottom:12px">Pisma ze wszystkich urzędów w jednym miejscu. Pod każdym krótkie wyjaśnienie.</p>
    <div class="seg8">${[
      ['all', 'Wszystkie'],
      ['new', `Nieprzeczytane${list.some(x => x.unread) ? ' · ' + list.filter(x => x.unread).length : ''}`],
    ].map(([k, t]) => html`<button aria-pressed=${f === k} onClick=${() => setF(k)}>${t}</button>`)}</div>
    <div class="mail">${shown.map(
      x => html`<div class="mail-w" key=${x.k}><span class="mail-bg">${I('archive', 20)}<span>Archiwum</span></span>
      <button class=${'mail-i' + (x.unread ? ' new' : '')} onPointerDown=${e => swipeRow(e, () => arch(x))} onClick=${e => open(e, x)}>
        <span class="mail-top"><span class="mail-from">${x.unread && html`<i class="udot"></i>`}${x.from}</span><span class="mail-d">${x.d}</span></span>
        <span class="mail-t">${x.t}</span><span class="mail-s">${x.s}</span>
        ${x.ai && html`<span class="mail-ai"><span class="tag-a sm">AI</span> ${x.ai}</span>`}
        ${x.tag && html`<span class="pill p-red" style="margin-top:8px;align-self:flex-start">${x.tag}</span>`}</button></div>`,
    )}
      ${!shown.length && html`<div class="empty8">${I('check', 22)}<b>Wszystko przeczytane.</b><span>Nowe pisma pojawią się tutaj i w powiadomieniach.</span></div>`}</div>
    <p class="tiny" style="margin-top:12px">Przesuń pismo w lewo, żeby je zarchiwizować.</p>
  </div>`;
}
