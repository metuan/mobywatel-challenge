import { html, useState } from '@/lib/preact';
import { I } from '@/ui/icons';
import { Hero } from '@/ui/illustrations';
import { Progress, Src } from '@/ui/primitives';

/* 2: Zgłaszanie szkód */
export function Damage1(c) {
  const [n, setN] = useState(c.s.dmgPhotos || 0);
  return html`<div>
    <p class="stepk">Zgłoszenie szkód · krok 1 z 3</p><${Progress} n=${1} of=${3}/>
    <h1 class="h-l">Zrób zdjęcia szkód</h1>
    <p class="lead">Do każdego zdjęcia dodamy datę i miejsce. Nikt ich potem nie zmieni.</p>
    <div class="photos">
      ${[0, 1, 2, 3].map(i => i < n ? html`<div class="ph"><svg viewBox="0 0 100 100" width="100%" height="100%"><rect width="100" height="100" fill=${['#c9c4bb', '#b7b1a6', '#d2ccc2', '#bfb9ae'][i]}/><path d=${['M10 70 40 40 60 60 75 45 95 70V100H10z', 'M0 60H100V100H0zM20 20h30v40H20z', 'M15 80 50 30 85 80z', 'M0 50 100 40V100H0z'][i]} fill="rgba(0,0,0,.18)"/></svg><span>15:58 · Kraków</span></div>`
        : html`<button class="ph add" onClick=${() => { setN(n + 1); c.set({ dmgPhotos: n + 1 }); }}>${I('camera', 24)}<span>${i === n ? 'Zrób zdjęcie' : ''}</span></button>`)}
    </div>
    <div class="actions"><button class="btn" disabled=${n === 0} style=${n === 0 ? 'opacity:.4' : ''} onClick=${() => c.go('damage-2')}>Dalej</button></div>
  </div>`;
}

export function Damage2(c) {
  const [k, setK] = useState('dom');
  return html`<div>
    <p class="stepk">Zgłoszenie szkód · krok 2 z 3</p><${Progress} n=${2} of=${3}/>
    <h1 class="h-l">Co zostało uszkodzone?</h1>
    <div class="seg full" style="margin-bottom:14px">${[['dom', 'Mieszkanie'], ['auto', 'Samochód'], ['inne', 'Inne']].map(([v, t]) => html`<button aria-pressed=${k === v} onClick=${() => setK(v)}>${t}</button>`)}</div>
    <div class="list">
      <div class="field"><div class="l">Adres</div><div class="v">ul. Długa 12/4, Kraków</div><${Src} t="rejestr PESEL"/></div>
      <div class="field"><div class="l">Zdarzenie</div><div class="v">Alarm powietrzny, 24 listopada</div><${Src} t="Alert RCB"/></div>
      <div class="field"><div class="l">Opis</div><div class="v">Wybite okna w kuchni i pokoju, zalany parkiet</div></div>
      <div class="field"><div class="l">Konto do wypłaty</div><div class="v">PKO BP •••• 4471</div><${Src} t="konto do zwrotu podatku"/></div>
    </div>
    <div class="actions"><button class="btn" onClick=${() => c.confirm({ t: 'Wysłać zgłoszenie do gminy?', items: ['4 zdjęcia z datą i miejscem', 'Opis szkód: mieszkanie', 'Konto do wypłaty •••• 4471'], ok: 'Wyślij', done: () => c.go('damage-3') })}>Sprawdź i wyślij</button></div>
  </div>`;
}

export function Damage3(c) {
  return html`<div>
    <${Hero} n="shelter"/>
    <h1 class="h-l">Zgłoszenie przyjęte</h1>
    <p class="lead">Numer sprawy: KR/SZK/2026/0412. Zajmuje się nią Urząd Miasta Krakowa.</p>
    <div class="list timeline">
      ${[['Zgłoszenie wysłane', 'Dziś, 16:04', 1], ['Komisja ogląda szkody', 'Wybierz termin: 26 lub 27 listopada', 0], ['Komisja wycenia szkody', 'Wynik zobaczysz tutaj', 0], ['Wypłata zasiłku', 'Na konto •••• 4471', 0]].map(([t, s, d]) => html`<div class="row"><span class=${'tl' + (d ? ' on' : '')}></span><span class="tx"><div class="t">${t}</div><div class="s">${s}</div></span></div>`)}
    </div>
    <div class="actions"><button class="btn" onClick=${() => c.toast('Komisja przyjdzie 26 listopada, 10:00–12:00')}>Wybierz termin wizyty komisji</button></div>
  </div>`;
}
