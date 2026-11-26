const { html, render, useState, useEffect, useRef } = htmPreact;

/* ---------- Icons (1.6 stroke, 24 grid) ---------- */
const P = {
  home:'M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1z',
  folder:'M3 6.5A1.5 1.5 0 0 1 4.5 5h4l2 2h9A1.5 1.5 0 0 1 21 8.5v9a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 3 17.5z',
  people:'M9 11a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7zM2.5 20c.6-3.4 3.2-5.5 6.5-5.5s5.9 2.1 6.5 5.5M16 4.3a3.5 3.5 0 0 1 0 6.4M18 14.8c1.9.7 3.2 2.5 3.5 5.2',
  shield:'M12 3 4.5 6v5.5c0 4.6 3.1 8.2 7.5 9.5 4.4-1.3 7.5-4.9 7.5-9.5V6z',
  card:'M3 6.5A1.5 1.5 0 0 1 4.5 5h15A1.5 1.5 0 0 1 21 6.5v11a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 3 17.5zM7 10h4M7 14h7M15.5 10.5h2',
  clip:'M20 11.5 12.4 19a5 5 0 0 1-7.1-7.1l7.8-7.8a3.3 3.3 0 0 1 4.7 4.7l-7.8 7.8a1.7 1.7 0 0 1-2.4-2.4l7.1-7.1',
  mic:'M12 15a3 3 0 0 0 3-3V6a3 3 0 0 0-6 0v6a3 3 0 0 0 3 3zM5.5 11.5a6.5 6.5 0 0 0 13 0M12 18v3',
  send:'M5 12h14M13 6l6 6-6 6',
  chevron:'M9 5l7 7-7 7',
  left:'M15 5l-7 7 7 7',
  check:'M5 12.5 10 17.5 19 7',
  x:'M6 6l12 12M18 6 6 18',
  bell:'M6 16V11a6 6 0 0 1 12 0v5l1.5 2h-15zM10 20.5a2 2 0 0 0 4 0',
  mail:'M3.5 6.5h17v11h-17zM4 7l8 6 8-6',
  pin:'M12 21s7-6.2 7-11.5A7 7 0 0 0 5 9.5C5 14.8 12 21 12 21zM12 12a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z',
  phone:'M5 4h3.5l1.5 4-2 1.5a11 11 0 0 0 6.5 6.5L16 14l4 1.5V19a1.5 1.5 0 0 1-1.6 1.5C10.5 20 4 13.5 3.5 5.6A1.5 1.5 0 0 1 5 4z',
  camera:'M4 8h3l1.5-2.5h7L17 8h3v11H4zM12 16.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z',
  heart:'M12 20s-7.5-4.6-7.5-10A4.3 4.3 0 0 1 12 7.3 4.3 4.3 0 0 1 19.5 10c0 5.4-7.5 10-7.5 10z',
  baby:'M12 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM6 21v-5l-2-3 3-3h10l3 3-2 3v5M9.5 14h5',
  truck:'M3 6h11v10H3zM14 9.5h4l3 3.5v3h-7M7 18.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zM17.5 18.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z',
  car:'M5 16.5h14M4 13l1.8-5A1.5 1.5 0 0 1 7.2 7h9.6a1.5 1.5 0 0 1 1.4 1l1.8 5v4.5H4zM7 17.5v2M17 17.5v2M7.5 13h.01M16.5 13h.01',
  sun:'M12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM12 2.5v2M12 19.5v2M4.6 4.6 6 6M18 18l1.4 1.4M2.5 12h2M19.5 12h2M4.6 19.4 6 18M18 6l1.4-1.4',
  eye:'M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12zM12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z',
  key:'M14.5 9.5a4.5 4.5 0 1 1-1.3-3.2M13.2 6.3 20 13v3h-3v2h-2l-1.8-1.8',
  doc:'M7 3h7l4 4v14H7zM14 3v4h4M10 12h5M10 16h5',
  steth:'M6 3v6a4 4 0 0 0 8 0V3M10 13v2a5 5 0 0 0 10 0v-2M20 11a1.5 1.5 0 1 0 0-.01',
  sparkle:'M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M6 18l2.5-2.5M15.5 8.5 18 6',
  speaker:'M4 9.5h4L13 5v14l-5-4.5H4zM16.5 9a4 4 0 0 1 0 6M19 6.5a7.5 7.5 0 0 1 0 11',
  lock:'M6 11h12v9.5H6zM8.5 11V8a3.5 3.5 0 0 1 7 0v3',
  wifi:'M2.5 9a14 14 0 0 1 19 0M5.5 12.5a9.5 9.5 0 0 1 13 0M8.5 16a5 5 0 0 1 7 0M12 19.5h.01',
  route:'M6 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM18 9a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM8 17h7.5a3.5 3.5 0 0 0 0-7h-7a3.5 3.5 0 0 1 0-7H16',
  list:'M8 6h12M8 12h12M8 18h12M4 6h.01M4 12h.01M4 18h.01',
  plus:'M12 5v14M5 12h14',
  coin:'M12 20.5a8.5 8.5 0 1 0 0-17 8.5 8.5 0 0 0 0 17zM9.5 14.5c.5 1 1.4 1.5 2.5 1.5 1.4 0 2.5-.8 2.5-2s-1-1.7-2.5-2-2.5-.8-2.5-2 1.1-2 2.5-2c1.1 0 2 .5 2.5 1.5M12 6.5v1.5M12 16v1.5',
  pause:'M8 5v14M16 5v14',
  info:'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM12 11v5.5M12 7.6h.01',
  qr:'M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h2v2h-2zM18 14h2v2M14 18h2v2M18 18h2v2'
};
const I = (n, s = 20) => html`<svg width=${s} height=${s} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d=${P[n]}/></svg>`;

/* ---------- Mock data (fictional family) ---------- */
const FAMILY = [
  { id:'anna', name:'Anna', full:'Anna Nowicka', role:'Ty', age:34, color:'#132a5e', ini:'AN' },
  { id:'tomasz', name:'Tomasz', full:'Tomasz Nowicki', role:'Partner', age:36, color:'#3d5a80', ini:'TN' },
  { id:'zosia', name:'Zosia', full:'Zofia Nowicka', role:'Córka, 6 lat', age:6, color:'#a8650a', ini:'ZN' },
  { id:'tata', name:'Tata', full:'Stanisław Nowicki', role:'Tata, Sandomierz', age:71, color:'#1c7a4c', ini:'SN' }
];
const DEADLINES = [
  { t:'Paszport Zosi', s:'Ważny do 4 stycznia 2027', d:41, tone:'amber', go:'docs' },
  { t:'OC — Toyota Yaris KR 4F21', s:'Polisa kończy się 6 grudnia', d:12, tone:'red', go:'car' },
  { t:'Dowód osobisty taty', s:'Ważny do 26 stycznia 2027', d:63, tone:'gray', go:'member-tata' },
  { t:'Szczepienie Zosi (MMR, dawka 2)', s:'Zalecane do końca roku', d:37, tone:'gray', go:'vacc' }
];
const LOG = [
  { who:'Apteka Gemini, Kraków', why:'Realizacja e-recepty', when:'22 listopada, 17:42', how:'Kod recepty' },
  { who:'Bank Pekao S.A.', why:'Weryfikacja tożsamości przy kredycie', when:'18 listopada, 10:05', how:'mDowód, kod QR' },
  { who:'Policja, KMP Kraków', why:'Kontrola drogowa', when:'9 listopada, 21:13', how:'Rejestr CEPiK' },
  { who:'Tomasz Nowicki', why:'Podgląd terminów rodziny', when:'8 listopada, 08:30', how:'Uprawnienie rodzinne' }
];

/* ---------- Small building blocks ---------- */
const Sec = ({ t, more, go }) => html`<div class="sec"><h3>${t}</h3>${more && html`<button onClick=${go}>${more}</button>`}</div>`;
const Row = ({ icon, t, s, right, onClick }) => html`<button class="row" onClick=${onClick}>
  ${icon && html`<span class="ic">${I(icon)}</span>`}
  <span class="tx"><div class="t">${t}</div>${s && html`<div class="s">${s}</div>`}</span>
  ${right !== undefined ? right : html`<span class="chev">${I('chevron', 18)}</span>`}</button>`;
const Progress = ({ n, of }) => html`<div class="progress" aria-label=${`Krok ${n} z ${of}`}>${Array.from({ length: of }, (_, i) => html`<i class=${(i < n ? 'on' : '') + (i === n - 1 && n > 1 ? ' fresh' : '')}></i>`)}</div>`;
const Toggle = ({ on, set, label }) => html`<button class="toggle" role="switch" aria-checked=${on} aria-label=${label} onClick=${() => set(!on)}></button>`;
const Src = ({ t }) => html`<div class="src">${I('check', 12)} Źródło: ${t}</div>`;

/* iOS-style search field: opens the assistant */
function Search({ c, ph = 'Szukaj spraw, dokumentów, pytań' }) {
  const [q, setQ] = useState('');
  return html`<div class="search"><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><circle cx="11" cy="11" r="6.5"/><path d="m16 16 4.5 4.5"/></svg>
    <input value=${q} onInput=${e => setQ(e.target.value)} onKeyDown=${e => e.key === 'Enter' && c.ask(q || 'Jak zameldować się w nowym mieszkaniu?')} placeholder=${ph} aria-label=${ph}/>
    <button aria-label="Mów" onClick=${() => c.ask('Kiedy kończy się ważność mojego dowodu?')}>${I('mic', 18)}</button></div>`;
}
