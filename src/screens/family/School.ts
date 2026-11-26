import { html, useEffect, useState } from '@/lib/preact';
import { I } from '@/ui/icons';

/* 4: Zgoda obojga rodziców */
export function Consent2(c) {
  const [tom, setTom] = useState(c.s.tomOk || false);
  useEffect(() => {
    if (c.s.askedTom && !tom) {
      const t = setTimeout(() => {
        setTom(true);
        c.set({ tomOk: true });
      }, 2200);
      return () => clearTimeout(t);
    }
  }, [c.s.askedTom]);
  return html`<div>
    <p class="stepk">Paszport dla Zosi</p><h1 class="h-l">Potrzebna zgoda obojga rodziców</h1>
    <p class="lead">Od czerwca 2026 drugi rodzic może zatwierdzić paszport w swoim mObywatelu. Rozszerzamy to na szkołę i wyjazdy, w jednym miejscu.</p>
    <div class="list">
      <div class="row"><span class="face-i" style="background:#22408f">AN</span><span class="tx"><div class="t">Anna</div><div class="s">Zatwierdzone dziś, 16:10</div></span><span class="pill p-green">Zgoda</span></div>
      <div class="row"><span class="face-i" style="background:#3d5a80">TN</span><span class="tx"><div class="t">Tomasz</div><div class="s">${tom ? 'Zatwierdzone dziś, 16:11' : c.s.askedTom ? 'Prośba wysłana, czekamy…' : 'Jeszcze nie zapytany'}</div></span>${tom ? html`<span class="pill p-green">Zgoda</span>` : html`<span class="pill p-gray">${c.s.askedTom ? 'Czeka' : '—'}</span>`}</div>
    </div>
    <div class="list" style="margin-top:14px">
      <div class="field"><div class="l">Wizyta w urzędzie</div><div class="v">Tylko zdjęcie. Dzieci do 12 lat nie oddają odcisków palców</div></div>
      <div class="field"><div class="l">Opłata</div><div class="v">30 zł</div></div>
    </div>
    <div class="actions">${
      tom
        ? html`<button class="btn" onClick=${() => c.toast('Wizyta: Małopolski Urząd Wojewódzki, 2 grudnia, 9:20')}>Umów wizytę w urzędzie</button>`
        : html`<button class="btn" onClick=${() => c.set({ askedTom: true })}>Poproś Tomasza o zgodę</button>`
    }</div>
  </div>`;
}

/* 5: Szkoła */
export function School(c) {
  const [tab, setTab] = useState('dziś');
  const [ex, setEx] = useState(c.s.excused || false);
  return html`<div>
    <div style="display:flex;gap:12px;align-items:center;margin-top:4px"><span class="face-i" style="background:#b0533f">ZN</span><div><div class="t" style="font-weight:600;font-size:17px">Zosia · zerówka</div><div class="small">Szkoła Podstawowa nr 9, Kraków</div></div></div>
    <h1 class="h-l">Szkoła</h1>
    <div class="seg full" style="margin-bottom:14px">${['dziś', 'frekwencja', 'oceny'].map(t => html`<button aria-pressed=${tab === t} onClick=${() => setTab(t)}>${t[0].toUpperCase() + t.slice(1)}</button>`)}</div>
    ${
      tab === 'dziś' &&
      html`<div>
      <div class="list">
        <div class="row"><span class="it" style="background:#ff9500!important">${I('bell', 18)}</span><span class="tx"><div class="t">Nieobecność wczoraj</div><div class="s">${ex ? 'Usprawiedliwiona przez Ciebie, 16:20' : 'Poniedziałek, 23 listopada, cały dzień'}</div></span>${
          ex
            ? html`<span class="pill p-green">OK</span>`
            : html`<button class="mini" onClick=${() => {
                setEx(true);
                c.set({ excused: true });
                c.toast('Wychowawczyni dostała usprawiedliwienie.');
              }}>Usprawiedliw</button>`
        }</div>
        <div class="row"><span class="it" style="background:#34c759!important">${I('route', 18)}</span><span class="tx"><div class="t">Wycieczka do Ojcowa, 4 grudnia</div><div class="s">Zgoda rodzica i 45 zł</div></span><button class="mini" onClick=${() => c.toast('Zgoda wyrażona. Płatność BLIK w pełnej wersji.')}>Zgoda</button></div>
        <div class="row"><span class="it">${I('mail', 18)}</span><span class="tx"><div class="t">Wiadomość od wychowawczyni</div><div class="s">„Jutro zajęcia z bezpieczeństwa, proszę o kamizelkę odblaskową”</div></span></div>
      </div></div>`
    }
    ${
      tab === 'frekwencja' &&
      html`<div class="card" style="padding:16px">
      <div style="display:flex;justify-content:space-between;align-items:baseline"><div class="h-m">96%</div><div class="small">listopad</div></div>
      <div class="att">${Array.from({ length: 20 }, (_, i) => html`<i class=${i === 15 ? (ex ? 'ex' : 'ab') : ''}></i>`)}</div>
      <div class="small" style="margin-top:8px">1 nieobecność${ex ? ' (usprawiedliwiona)' : ''} · 0 spóźnień</div></div>`
    }
    ${
      tab === 'oceny' &&
      html`<div class="card" style="padding:16px"><div class="small">Ocena opisowa za I półrocze pojawi się w styczniu. W klasach 1–3 oceny też są opisowe.</div>
      <div class="note" style="margin-top:12px;background:var(--fill)">${I('sparkle', 18)}<span>Jeśli chcesz, streścimy ocenę w trzech zdaniach.</span></div></div>`
    }
    <p class="tiny" style="margin-top:12px">Widzą oboje rodzice. Dane z dziennika elektronicznego szkoły.</p>
  </div>`;
}
