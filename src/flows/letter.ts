import { html, useEffect, useState } from '@/lib/preact';
import { I } from '@/ui/icons';
import { Hero } from '@/ui/illustrations';
import type { Ctx } from '@/types';

export function Letter1(c: Ctx) {
  const [snap, setSnap] = useState(false);
  useEffect(() => {
    if (snap) {
      const t = setTimeout(() => c.go('letter-2'), 1400);
      return () => clearTimeout(t);
    }
  }, [snap]);
  return html`<div>
    <${Hero} n="letter" bg="sand"/>
    <h1 class="h-l">Zrób zdjęcie pisma</h1>
    <div style="background:#1b1e24;border-radius:20px;height:420px;display:grid;place-items:center;position:relative;overflow:hidden">
      <div style="width:220px;height:300px;background:#f6f5f0;border-radius:4px;padding:18px;transform:rotate(-2deg);font-size:7px;color:#444;line-height:1.6">
        <div style="font-weight:700;font-size:8px">URZĄD SKARBOWY KRAKÓW-PODGÓRZE</div><div>ul. Wadowicka 10</div><br/>
        <div style="font-weight:700">WEZWANIE</div><div>Na podstawie art. 155 § 1 Ordynacji podatkowej wzywa się Panią do złożenia wyjaśnień dotyczących korekty zeznania PIT-37 za rok 2025…</div>
        <div style="margin-top:6px">${'▬ '.repeat(40)}</div></div>
      <div style="position:absolute;inset:40px 50px;border:2px solid ${snap ? '#1c7a4c' : 'rgba(255,255,255,.7)'};border-radius:14px"></div>
      ${snap && html`<div style="position:absolute;bottom:16px;color:#fff;font-size:13px">Czytam pismo…</div>`}
    </div>
    <div class="actions"><button class="btn" onClick=${() => setSnap(true)}>${I('camera', 18)} Zrób zdjęcie</button></div>
  </div>`;
}

export function Letter3(c: Ctx) {
  return html`<div>
    <p class="stepk">Podgląd odpowiedzi</p><h1 class="h-l">Wyjaśnienie do urzędu</h1>
    <div class="card" style="padding:16px;font-size:14px;line-height:1.6">
      <p style="margin:0 0 8px">W sprawie: pisma z 19.11.2026, PIT-37 za 2025 r.</p>
      <p style="margin:0 0 8px">Poprawiłam zeznanie, bo w pierwszej wersji zapomniałam o uldze na dziecko (Zofia Nowicka, PESEL 200307•••••). Dołączam zaświadczenie.</p>
      <p style="margin:0">Anna Nowicka</p>
    </div>
    <div class="list" style="margin-top:10px"><div class="field"><div class="l">Załącznik</div><div class="v">Zaświadczenie o uldze na dziecko (z rejestru, bez skanowania)</div></div></div>
    ${
      c.s.letterSent
        ? html`<div class="note green" style="margin-top:14px">${I('check', 18)}<span>Wysłano przez e-Doręczenia. Urzędowe potwierdzenie odbioru jest zapisane w sprawie.</span></div>`
        : html`<div class="actions"><button class="btn" onClick=${() =>
            c.confirm({
              t: 'Wysłać wyjaśnienie?',
              items: ['Do: Urząd Skarbowy Kraków-Podgórze', 'Przez: e-Doręczenia', '1 załącznik'],
              ok: 'Potwierdź i wyślij',
              done: () => {
                c.set({ letterSent: true });
                c.toast('Wysłano. Urząd ma 14 dni na odpowiedź.');
              },
            })}>Potwierdź</button>
    <button class="btn ghost">Edytuj treść</button></div>`
    }
  </div>`;
}

/* Hop 10: the explanation streams in, so the AI step feels like work, not magic */
export function Letter2(c: Ctx) {
  const [k, setK] = useState(c.s.l2seen ? 4 : 0);
  useEffect(() => {
    if (k >= 4) {
      c.s.l2seen || c.set({ l2seen: true });
      setTimeout(() => window.dispatchEvent(new Event('coach')), 60);
      return;
    }
    const a = setTimeout(() => setK(k + 1), k ? 520 : 900);
    return () => clearTimeout(a);
  }, [k]);
  const F = [
    [
      'Co to znaczy',
      'To nie kara. Urząd chce wiedzieć, dlaczego zmieniłaś zeznanie za 2025 rok i zwrot wzrósł o 1 240 zł.',
    ],
    ['Termin', '7 grudnia 2026 (14 dni od dnia, w którym dostałaś pismo)'],
    ['Co zrobić', 'Wyślij krótkie wyjaśnienie i zaświadczenie o uldze na dziecko.'],
  ];
  return html`<div>
    <p class="stepk">Wyjaśnienie pisma</p>
    <h1 class="h-l">Urząd skarbowy prosi o wyjaśnienie korekty PIT-37.</h1>
    ${k < 4 && html`<div class="ai-work">${I('sparkle', 14)} <span>${['Czytam pismo…', 'Szukam przepisu…', 'Sprawdzam termin…', 'Piszę prostym językiem…'][k]}</span></div>`}
    <div class="list">${F.map(([l, v], i) => html`<div class="field"><div class="l">${l}</div>${i < k ? html`<div class="v in">${v}</div>` : html`<div class="skel"><i></i><i></i></div>`}</div>`)}</div>
    ${
      k >= 4 &&
      html`<div class="msg ai in" style="max-width:100%;margin-top:12px"><span class="small">Źródła</span><div class="srcs"><span>Ordynacja podatkowa, art. 155</span><span>podatki.gov.pl: korekta zeznania</span></div></div>
    <p class="ai-warn">Asystent może się mylić. To nie jest porada prawna.</p>`
    }
    <div class="actions"><button class="btn" disabled=${k < 4} onClick=${() => c.go('letter-3')}>Przygotuj odpowiedź</button></div>
  </div>`;
}
