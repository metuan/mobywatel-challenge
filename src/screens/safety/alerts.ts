import { html, useState } from '@/lib/preact';
import { I } from '@/ui/icons';
import { Hero } from '@/ui/illustrations';
import { Sec } from '@/ui/primitives';

export function AlertRed(c) {
  return html`<div class="rcb-screen" role="alertdialog" aria-label="Alert RCB">
    <div class="rcb-clock">15:42</div><div class="rcb-date">wtorek, 24 listopada</div>
    <div class="rcb">
      <div class="hd"><span class="b">${I('bell', 14)}</span>ALERT RCB · ALERT EKSTREMALNY<span class="tm">teraz</span></div>
      <div class="ttl">Alarm powietrzny: Kraków</div>
      <div class="bd">Alert RCB! Alarm powietrzny w Krakowie. Idź do najbliższego schronu albo ukrycia. Słuchaj poleceń służb.</div>
      <div class="sig">${I('check', 14)} Telefon sprawdził, że to prawdziwy alert RCB</div>
    </div>
    <div class="rcb-app">
      <div class="lbl"><span class="flag"></span>mObywatel dodaje do tego alertu</div>
      <button class="row" onClick=${() => c.go('alert-shelter')}><span class="it bg-sand">${I('route', 20)}</span><span class="tx"><div class="t">Schronienie: ul. Dekerta 24</div><div class="s">240 m · 3 min pieszo · trasa działa bez internetu</div></span><span class="chev">${I('chevron', 18)}</span></button>
      <button class="row" onClick=${() => c.go('family-map')}><span class="it bg-rose">${I('people', 20)}</span><span class="tx"><div class="t">Rodzina</div><div class="s">Zosia: przedszkole w schronie · Tata: poza strefą alarmu</div></span><span class="chev">${I('chevron', 18)}</span></button>
    </div>
    <div style="flex:1;min-height:14px"></div>
    <div class="actions" style="margin-top:12px">
      <button class="btn" onClick=${() => {
        const el = document.querySelector('.phone .rcb-app');
        if (el) {
          const q = el.getBoundingClientRect();
          window.__morph = { left: q.left, top: q.top, width: q.width, height: q.height };
        }
        c.go('alert-watch');
      }}>${I('route', 18)} Prowadź do schronienia</button>
      <button class="btn ghost" onClick=${() => c.go('alert-guide')}>${I('speaker', 18)} Co robić teraz (odczytaj)</button>
    </div>
  </div>`;
}

function ShelterMap() {
  return html`<svg viewBox="0 0 350 230" width="100%" role="img" aria-label="Mapa trasy do schronienia">
    <rect width="350" height="230" fill="#e9eae5"/>
    <g stroke="#ffffff" stroke-width="14" fill="none"><path d="M0 70H350M0 170H350M90 0V230M250 0V230"/></g>
    <g fill="#d9dbd4"><rect x="10" y="90" width="68" height="68" rx="6"/><rect x="102" y="10" width="136" height="50" rx="6"/><rect x="102" y="82" width="136" height="76" rx="6"/><rect x="262" y="82" width="80" height="76" rx="6"/><rect x="102" y="182" width="136" height="44" rx="6"/></g>
    <path d="M60 170H170V70H250" fill="none" stroke="#132a5e" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="1 10"/>
    <circle cx="60" cy="170" r="9" fill="#132a5e" stroke="#fff" stroke-width="3"/>
    <g transform="translate(250 70)"><rect x="-14" y="-14" width="28" height="28" rx="8" fill="#1c7a4c"/><path d="M-6 2 0-5 6 2M-4 1v6h8V1" stroke="#fff" stroke-width="2" fill="none" stroke-linejoin="round"/></g>
    <text x="72" y="196" font-size="11" fill="#5d636d" font-family="Inter,Arial">Jesteś tutaj</text>
    <text x="196" y="52" font-size="11" fill="#1c7a4c" font-weight="600" font-family="Inter,Arial">Schron, Dekerta 24</text>
  </svg>`;
}

export function AlertShelter(c) {
  return html`<div>
    <span class="pill p-red" style="margin-top:8px">Alert RCB trwa · Kraków</span>
    <h1 class="h-l">Idź do schronienia przy ul. Dekerta 24</h1>
    <div class="map">${ShelterMap()}</div>
    <div class="list" style="margin-top:12px">
      <div class="field"><div class="l">Odległość</div><div class="v">240 m · około 3 minuty pieszo</div></div>
      <div class="field"><div class="l">Typ</div><div class="v">Schron, dla 180 osób, czynny całą dobę</div><div class="src">${I('check', 12)} Źródło: lista „Gdzie się ukryć”, Państwowa Straż Pożarna</div></div>
      <div class="field"><div class="l">Gdy nie zdążysz</div><div class="v">Korytarz bez okien, z dwiema ścianami między Tobą a ulicą</div></div>
    </div>
    <div class="note" style="margin-top:12px">${I('wifi', 18)}<span>Mapa i trasa są zapisane w telefonie. Działają bez internetu.</span></div>
    <div class="actions"><button class="btn" onClick=${() => c.go('alert-guide')}>Jestem na miejscu</button></div>
  </div>`;
}

export function AlertGuide(c) {
  const [reading, setReading] = useState(false);
  return html`<div>
    <span class="pill p-red" style="margin-top:8px">Alert RCB trwa</span>
    <h1 class="h-l">Co robić teraz</h1>
    <p class="lead">Zasady z poradnika RCB. Alarm to syrena, której dźwięk rośnie i opada przez 3 minuty.</p>
    <button class="speak" style="width:100%" onClick=${() => setReading(!reading)}>${I(reading ? 'pause' : 'speaker', 22)} ${reading ? 'Zatrzymaj odczyt' : 'Odczytaj na głos'}</button>
    <div class="road" style="margin-top:10px">
      ${['Zostań w schronieniu do odwołania alarmu.', 'Trzymaj się z dala od okien i drzwi zewnętrznych.', 'Nie dzwoń bez potrzeby. Sieć jest potrzebna służbom.', 'Wyślij rodzinie status „Jestem bezpieczna”. Dojdzie nawet przy słabym zasięgu.', 'Słuchaj komunikatów w aplikacji i w radiu.'].map((t, i) => html`<div class="n">${i + 1}</div><div class="b">${t}</div>`)}
    </div>
    <div class="actions">
      <button class="btn" onClick=${() => c.go('alert-safe')}>${I('heart', 18)} Jestem bezpieczna</button>
      <button class="btn ghost" onClick=${() => c.go('alert-clear')}>Pokaż odwołanie alarmu (demo)</button>
    </div>
  </div>`;
}

export function AlertClear(c) {
  return html`<div class="rcb-screen clear" role="alertdialog" aria-label="Odwołanie alarmu">
    <div class="rcb-clock">16:21</div><div class="rcb-date">wtorek, 24 listopada</div>
    <div class="rcb clear">
      <div class="hd"><span class="b">${I('check', 14)}</span>ALERT RCB<span class="tm">teraz</span></div>
      <div class="ttl">Odwołanie alarmu: Kraków</div>
      <div class="bd">Alert RCB! Odwołano alarm powietrzny dla miasta Kraków. Ulica Kamieńskiego pozostaje zamknięta do odwołania.</div>
      <div class="sig">${I('check', 14)} Telefon sprawdził, że to prawdziwy alert RCB</div>
    </div>
    <div class="rcb-app">
      <div class="lbl"><span class="flag"></span>Twoja rodzina</div>
      <div class="row"><span class="tx"><div class="t">Tomasz, Zosia</div><div class="s">Bezpieczni</div></span><span class="pill p-green">OK</span></div>
      <div class="row"><span class="tx"><div class="t">Tata</div><div class="s">Brak odpowiedzi od 15:42</div></span><span class="pill p-amber">Sprawdź</span></div>
    </div>
    <div style="flex:1;min-height:14px"></div>
    <div class="actions" style="margin-top:12px"><button class="btn" onClick=${() => c.go('alert-safe')}>Zobacz status rodziny</button>
    <button class="btn ghost" onClick=${() => c.go('damage-1')}>Zgłoś szkody</button></div>
  </div>`;
}

export function AlertSafe(c) {
  const [sent, setSent] = useState(c.s.safe);
  const send = () => {
    setSent(true);
    c.set({ safe: true });
  };
  return html`<div>
    <h1 class="h-l">${sent ? 'Rodzina wie, że jesteś bezpieczna.' : 'Daj znać rodzinie'}</h1>
    ${
      !sent &&
      html`<div class="actions" style="margin-top:6px">
      <button class="btn green bigbtn" onClick=${send}>${I('check', 22)} Jestem bezpieczna</button>
      <button class="btn ghost" onClick=${() => c.toast('Rodzina dostała Twoją prośbę o pomoc i lokalizację.')}>Potrzebuję pomocy</button></div>`
    }
    <${Sec} t="Status rodziny" more="Mapa" go=${() => c.go('family-map')}/>
    <div class="list">
      <div class="row"><span class="face-i" style="background:#132a5e">AN</span><span class="tx"><div class="t">Ty</div><div class="s">${sent ? 'Bezpieczna, schron Dekerta 24, 15:49' : 'Nie wysłano'}</div></span>${sent ? html`<span class="pill p-green">Bezpieczna</span>` : html`<span class="pill p-gray">—</span>`}</div>
      <div class="row"><span class="face-i" style="background:#3d5a80">TN</span><span class="tx"><div class="t">Tomasz</div><div class="s">Bezpieczny, Katowice, 15:46</div></span><span class="pill p-green">Bezpieczny</span></div>
      <div class="row"><span class="face-i" style="background:#a8650a">ZN</span><span class="tx"><div class="t">Zosia</div><div class="s">Przedszkole nr 12: dzieci w schronie, 15:45</div></span><span class="pill p-green">Bezpieczna</span></div>
      <div class="row"><span class="face-i" style="background:#1c7a4c">SN</span><span class="tx"><div class="t">Tata</div><div class="s">Brak odpowiedzi od 15:42</div></span><button class="mini" onClick=${() => c.go('easy-call')}>${I('phone', 14)} Zadzwoń</button></div>
    </div>
    <p class="tiny" style="margin-top:12px">Status widzą tylko osoby z Twojej rodziny. Znika po 72 godzinach.</p>
  </div>`;
}

function AlertDamage(c) {
  return html`<div><p class="stepk">Po zdarzeniu</p><h1 class="h-l">Zgłoś szkody</h1>
    <${Hero} n="shelter" bg="sand"/>
    <p class="lead">Zrób zdjęcia. Dodamy lokalizację i datę. Komisja z gminy umówi oględziny.</p>
    <button class="card" style="width:100%;padding:30px;display:grid;place-items:center;gap:6px;color:var(--navy)">${I('camera', 30)}<span style="font-weight:600">Zrób zdjęcie</span></button>
    <p class="tiny" style="margin-top:10px">Funkcja z planu rozwoju. Wzorowana na ukraińskim eRecovery w aplikacji Diia.</p></div>`;
}
