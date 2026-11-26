import { html } from '@/lib/preact';
import { RM, norm } from '@/lib/env';
import { I } from '@/ui/icons';

/* "Jak to zrobić?": search answers how-to questions in plain steps, then "Pokaż mi" points at the real button */
export const HOWTO = [
  {
    k: /wiek(?!sz)|18|pelnolet|alkohol|piwo|dorosl/,
    q: 'Jak pokazać, że mam 18 lat?',
    r: 'docs',
    find: 'Pokaż tylko 18+',
    s: [
      'Otwórz Dokumenty.',
      'Dotknij „Pokaż tylko 18+”.',
      'Pokaż kod QR przy kasie. Sprzedawca zobaczy tylko, że masz 18 lat.',
    ],
  },
  {
    k: /sprzeda|sprzedac|kupuj|zbyc/,
    q: 'Jak zgłosić sprzedaż auta?',
    r: 'car',
    find: 'Sprzedaję ten samochód',
    s: [
      'Otwórz Mój samochód.',
      'Dotknij „Sprzedaję ten samochód”.',
      'Wpisz dane kupującego. Zgłoszenie i OC załatwimy za Ciebie.',
    ],
  },
  {
    k: /zgubi|ukrad|zastrz|portfel|kradziez/,
    q: 'Co zrobić, gdy zgubię dowód?',
    r: 'docs',
    find: 'Zgubiłam portfel',
    s: [
      'Otwórz Dokumenty.',
      'Dotknij „Zgubiłam portfel”.',
      'Przytrzymaj przycisk. Wszystkie dokumenty zastrzeżesz naraz.',
    ],
  },
  {
    k: /kto.*(sprawdz|ogladal|widzial)|dostep do moich|moje dane/,
    q: 'Jak sprawdzić, kto oglądał moje dane?',
    r: 'profile',
    find: 'Kto sprawdzał moje dane',
    s: [
      'Otwórz swój profil (AN w prawym górnym rogu).',
      'Dotknij „Kto sprawdzał moje dane”.',
      'Zobaczysz, kto, kiedy i po co sprawdzał Twoje dane.',
    ],
  },
  {
    k: /dzwoni|podszyw|oszust|telefon z urzedu/,
    q: 'Jak sprawdzić, czy dzwoni prawdziwy urząd?',
    r: 'safety',
    find: 'Kto do mnie dzwoni?',
    s: [
      'Otwórz Ochronę.',
      'Dotknij „Kto do mnie dzwoni?”.',
      'Sprawdzimy numer. Gdy to oszust, zobaczysz ostrzeżenie.',
    ],
  },
  {
    k: /schron|alarm|syren|ewakuac/,
    q: 'Gdzie jest najbliższy schron?',
    r: 'safety',
    find: 'Najbliższy schron',
    s: ['Otwórz Ochronę.', 'Dotknij „Najbliższy schron”.', 'Trasa działa też bez internetu.'],
  },
  {
    k: /tekst|liter|czcion|wieksz|powiek|slabo widz|maly druk/,
    q: 'Jak powiększyć tekst?',
    r: 'profile',
    sel: '.fs8',
    s: [
      'Otwórz swój profil.',
      'Przesuń suwak „A A” w prawo.',
      'Tekst w całej aplikacji od razu się powiększy.',
    ],
  },
  {
    k: /\boc\b|ubezpiecz|polis/,
    q: 'Jak przedłużyć OC?',
    r: 'today',
    find: 'Przedłuż OC',
    s: [
      'Na ekranie Dziś znajdź sprawę OC.',
      'Dotknij „Przedłuż OC”.',
      'Porównaj oferty i zapłać w aplikacji.',
    ],
  },
  {
    k: /800|swiadczen|zasilek/,
    q: 'Kiedy przyjdzie 800+?',
    r: 'today',
    find: '800+ na Zosię',
    s: ['Na ekranie Dziś dotknij „800+ na Zosię”.', 'Zobaczysz datę wypłaty i historię przelewów.'],
  },
];

export const howFor = q => {
  const n = norm(q.trim());
  return n.length > 2 ? HOWTO.find(h => h.k.test(n) || norm(h.q).includes(n)) : null;
};

let guideRaf = 0;

function guideTip(el) {
  cancelAnimationFrame(guideRaf);
  document.querySelectorAll('.guide-tip').forEach(t => t.remove());
  document.querySelectorAll('.guide8').forEach(e => e.classList.remove('guide8'));
  const ph = document.querySelector('.phone');
  if (!ph || !el) return;
  el.classList.add('guide8');
  const tip = document.createElement('div');
  tip.className = 'guide-tip';
  tip.setAttribute('aria-hidden', 'true');
  tip.innerHTML = '<span>Dotknij tutaj</span>';
  ph.appendChild(tip);
  const stop = () => {
    cancelAnimationFrame(guideRaf);
    tip.remove();
    el.classList.remove('guide8');
    ph.removeEventListener('pointerdown', stop, true);
    window.removeEventListener('hashchange', stop);
  };
  setTimeout(() => {
    ph.addEventListener('pointerdown', stop, true);
    window.addEventListener('hashchange', stop);
  }, 50);
  const tick = () => {
    if (!el.isConnected) {
      stop();
      return;
    }
    const pr = ph.getBoundingClientRect(),
      r = el.getBoundingClientRect(),
      sx = pr.width / ph.offsetWidth || 1;
    const x = (r.left + r.width / 2 - pr.left) / sx,
      top = (r.top - pr.top) / sx,
      bot = (r.bottom - pr.top) / sx;
    const below = top < 56;
    tip.classList.toggle('below', below);
    const w = tip.firstChild.offsetWidth || 110,
      W = ph.offsetWidth,
      cx = Math.min(Math.max(x, w / 2 + 10), W - w / 2 - 10);
    tip.style.setProperty('--dx', Math.round(cx - x) + 'px');
    tip.style.transform = `translate(${Math.round(x)}px, ${Math.round(below ? bot + 12 : top - 12)}px)`;
    tip.style.opacity = bot > 40 && top < ph.offsetHeight - 40 ? '' : '0';
    guideRaf = requestAnimationFrame(tick);
  };
  tick();
}

export function showMe(c, h) {
  c.go(h.r);
  let n = 0;
  const look = () => {
    const ph = document.querySelector('.phone .scroll');
    let el = null;
    if (ph)
      el = h.sel
        ? ph.querySelector(h.sel)
        : [...ph.querySelectorAll('button, a, [role=button]')].find(b =>
            b.innerText.replace(/\s+/g, ' ').includes(h.find),
          );
    if (el) {
      el.scrollIntoView({ block: 'center', behavior: RM() ? 'auto' : 'smooth' });
      setTimeout(() => guideTip(el), RM() ? 0 : 380);
    } else if (n++ < 12) setTimeout(look, 150);
  };
  setTimeout(look, 360);
}

export function HowCard({ c, h }) {
  return html`<div class="how8" key=${h.q}>
    <div class="how8-k">${I('sparkle', 14)}<span>Jak to zrobić</span></div>
    <div class="how8-q">${h.q}</div>
    <ol class="how8-s">${h.s.map((t, i) => html`<li key=${i} style=${`--i:${i}`}><i>${i + 1}</i><span>${t}</span></li>`)}</ol>
    <button class="btn how8-go" onClick=${() => showMe(c, h)}>Pokaż mi, gdzie to jest</button>
  </div>`;
}
