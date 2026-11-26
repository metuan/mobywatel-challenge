import { html } from '@/lib/preact';
import { I } from '@/ui/icons';

/* 6. Family calendar: a date tile on the left, the same shape for every row, red only for what is urgent */
export function Calendar(c) {
  const items = [
    ['28', 'lis', 'Wypłata 800+', 'Zosia', 4, 'p800'],
    ['6', 'gru', 'OC Toyota Yaris', 'Ty i Tomasz', 12, 'car', 1],
    ['15', 'gru', 'Kardiolog', 'Zosia', 21, 'visit-1'],
    ['31', 'gru', 'Szczepienie MMR', 'Zosia', 37, 'vacc'],
    ['4', 'sty', 'Paszport traci ważność', 'Zosia', 41, 'renew-pass'],
    ['26', 'sty', 'Dowód osobisty', 'Tata', 63, 'member-tata'],
    ['14', 'lut', 'Przegląd techniczny', 'Toyota Yaris', 82, 'car'],
  ];
  return html`<div><h1 class="h-l">Kalendarz rodziny</h1><p class="lead">Najbliższe 90 dni. Każdy termin ma następny krok.</p>
    <div class="glist cal8">${items.map(
      ([
        d,
        m,
        t,
        w,
        left,
        r,
        urg,
      ]) => html`<button class=${'grow' + (urg ? ' urg' : '')} onClick=${() => c.go(r)}>
      <span class="cal-d"><b>${d}</b><small>${m}</small></span><span class="gtx"><span class="gt">${t}</span><span class="gs">${w}</span></span>
      <span class="cal-l">${left === 4 ? 'za 4 dni' : `za ${left} dni`}</span><span class="gch">${I('chevron', 16)}</span></button>`,
    )}</div></div>`;
}
