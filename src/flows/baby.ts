import { html, useEffect, useState } from '@/lib/preact';
import { I } from '@/ui/icons';
import { Hero } from '@/ui/illustrations';
import { Progress, Row, Src, Toggle } from '@/ui/primitives';

export function Baby1(c) {
  return html`<div>
    <p class="stepk">Nowe dziecko · krok 1 z 4</p><${Progress} n=${1} of=${4}/>
    <${Hero} n="baby" bg="rose"/>
    <h1 class="h-l">Gratulacje! Zgłośmy narodziny.</h1>
    <div class="note">${I('doc', 18)}<span>Szpital Uniwersytecki zgłosił urodzenie 15 listopada. Masz czas do 6 grudnia.</span></div>
    <div class="list" style="margin-top:12px">
      <div class="field"><div class="l">Imię dziecka</div><div class="v">Julia</div></div>
      <div class="field"><div class="l">Nazwisko</div><div class="v">Nowicka</div><${Src} t="nazwisko Zosi, zgodne z oświadczeniem rodziców"/></div>
      <div class="field"><div class="l">Data i miejsce urodzenia</div><div class="v">15 listopada 2026, Kraków</div><${Src} t="karta urodzenia ze szpitala"/></div>
      <div class="field"><div class="l">Adres</div><div class="v">ul. Długa 12/4, Kraków</div></div>
    </div>
    <div class="actions"><button class="btn" onClick=${() => c.go('baby-2')}>Dalej</button></div>
  </div>`;
}

export function Baby2(c) {
  const [on, setOn] = useState({ p800: true, nfz: true, pass: false });
  return html`<div>
    <p class="stepk">Nowe dziecko · krok 2 z 4</p><${Progress} n=${2} of=${4}/>
    <h1 class="h-l">Co załatwić od razu?</h1>
    <p class="lead">Po zgłoszeniu Julia dostanie PESEL i adres automatycznie. Te sprawy wypełnimy za Ciebie:</p>
    <div class="list">
      ${[['p800', '800+', 'Wniosek do ZUS, bez logowania na stronę ZUS'], ['nfz', 'Ubezpieczenie zdrowotne', 'Zgłoszenie do NFZ przez Twojego pracodawcę'], ['pass', 'Paszport', 'Gdy planujecie podróż']].map(([k, t, s]) => html`<div class="row"><span class="tx"><div class="t">${t}</div><div class="s">${s}</div></span><${Toggle} on=${on[k]} label=${t} set=${v => setOn({ ...on, [k]: v })}/></div>`)}
    </div>
    <div class="actions"><button class="btn" onClick=${() => c.go('baby-3')}>Pokaż podgląd</button></div>
  </div>`;
}

export function Baby3(c) {
  const [stage, setStage] = useState(0);
  useEffect(() => { if (stage === 1) { const t = setTimeout(() => setStage(2), 2200); return () => clearTimeout(t); } }, [stage]);
  return html`<div>
    <p class="stepk">Nowe dziecko · krok 3 z 4</p><${Progress} n=${3} of=${4}/>
    <h1 class="h-l">Sprawdź i poproś Tomasza o zgodę</h1>
    <div class="list">
      <div class="field"><div class="l">Akt urodzenia</div><div class="v">Julia Nowicka, 15.11.2026, Kraków</div><${Src} t="szpital"/></div>
      <div class="field"><div class="l">800+</div><div class="v">800 zł/mies., konto •• 4821</div><${Src} t="wniosek na Zosię z 2026"/></div>
      <div class="field"><div class="l">NFZ</div><div class="v">Julia będzie ubezpieczona razem z Anną</div><${Src} t="ZUS, dane pracodawcy"/></div>
    </div>
    ${stage === 0 && html`<div class="actions"><button class="btn" onClick=${() => setStage(1)}>Poproś Tomasza o zgodę</button></div>`}
    ${stage === 1 && html`<div class="note amber" style="margin-top:14px">${I('bell', 18)}<span>Tomasz dostał prośbę. Czekamy, aż potwierdzi…</span></div>`}
    ${stage === 2 && html`<div><div class="note green" style="margin-top:14px">${I('check', 18)}<span>Tomasz potwierdził na swoim telefonie o 15:31.</span></div>
      <div class="actions"><button class="btn" onClick=${() => c.confirm({ t: 'Wysłać pakiet „Nowe dziecko”?', items: ['Zgłoszenie urodzenia', 'Wniosek 800+', 'Zgłoszenie do NFZ'], ok: 'Potwierdź i wyślij', done: () => { c.set({ babyDone: true }); c.go('baby-done'); } })}>Potwierdź</button></div></div>`}
  </div>`;
}

export function BabyDone(c) {
  return html`<div>
    <${Hero} n="baby" bg="mint"/>
    <div class="done-mark" style="margin-top:-34px;margin-left:16px;position:relative;border:4px solid #fff">${I('check', 28)}</div>
    <h1 class="h-l">Witaj, Julio.</h1>
    <div class="list">
      <${Row} t="Akt urodzenia" s="Odpis wysłany na e-Doręczenia" right=${html`<span class="pill p-green">Gotowe</span>`} onClick=${() => {}}/>
      <${Row} t="PESEL i zameldowanie" s="Nadane automatycznie" right=${html`<span class="pill p-green">Gotowe</span>`} onClick=${() => {}}/>
      <${Row} t="Ubezpieczenie NFZ" s="Aktywne od 15 listopada" right=${html`<span class="pill p-green">Gotowe</span>`} onClick=${() => {}}/>
      <${Row} t="800+" s="Decyzja ZUS do 24 grudnia, z wyrównaniem" right=${html`<span class="pill p-navy">W toku</span>`} onClick=${() => c.go('p800')}/>
    </div>
    <div class="actions"><button class="btn" onClick=${() => c.go('family')}>Zobacz kartę Julii w Bliskich</button></div>
  </div>`;
}
