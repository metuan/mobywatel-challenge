import { html } from '@/lib/preact';
import { I } from '@/ui/icons';
import { Row, Sec } from '@/ui/primitives';

export function MemberZosia(c) {
  return html`<div>
    <div style="display:flex;gap:12px;align-items:center;margin-top:8px"><span class="face-i" style="background:#a8650a;width:52px;height:52px">ZN</span><div><h1 class="h-m">Zofia Nowicka</h1><div class="small">6 lat, PESEL 200307•••••</div></div></div>
    <${Sec} t="Dokumenty"/>
    <div class="list">
      <${Row} icon="card" t="Paszport" s="Ważny do 4 stycznia 2027" right=${html`<span class="pill p-amber">41 dni</span>`} onClick=${() => c.go('renew-pass')}/>
      <${Row} icon="card" t="Legitymacja szkolna" s="Szkoła Podstawowa nr 9, zerówka" onClick=${() => c.go('school')}/>
    </div>
    <${Sec} t="Szkoła"/>
    <div class="list"><${Row} icon="list" t="Frekwencja, usprawiedliwienia, zgody" s=${c.s.excused ? 'Wszystko załatwione' : '1 nieobecność do usprawiedliwienia'} onClick=${() => c.go('school')}/></div>
    <${Sec} t="Zdrowie"/>
    <div class="list">
      <${Row} icon="steth" t="e-Skierowanie: kardiolog" s=${c.s.visit ? 'Wizyta: ' + c.s.visit : 'Zarezerwuj wizytę'} onClick=${() => c.go(c.s.visit ? 'visit-4' : 'visit-1')} right=${c.s.visit ? html`<span class="pill p-green">Umówiona</span>` : undefined}/>
      <${Row} icon="heart" t="Szczepienia" s="1 zalecane do końca roku" onClick=${() => c.go('vacc')}/>
      <${Row} icon="doc" t="e-Recepta: Nurofen dla dzieci" s="Kod 4821, ważna do 21 grudnia" onClick=${() => {}}/>
    </div>
    <${Sec} t="Świadczenia"/>
    <div class="list"><${Row} icon="coin" t="800+" s="Wypłata 28 listopada" onClick=${() => c.go('p800')}/></div>
    <p class="tiny" style="margin-top:14px">Widzą: Ty i Tomasz (oboje rodzice).</p>
  </div>`;
}

export function MemberTata(c) {
  return html`<div>
    <div style="display:flex;gap:12px;align-items:center;margin-top:8px"><span class="face-i" style="background:#1c7a4c;width:52px;height:52px">SN</span><div><h1 class="h-m">Stanisław Nowicki</h1><div class="small">Tata, 71 lat, Sandomierz</div></div></div>
    <div class="note green" style="margin-top:16px">${I('check', 18)}<span>Tata zatwierdził Twój dostęp 24 listopada 2026, w trybie prostym na swoim telefonie. Może go cofnąć w każdej chwili.</span></div>
    <${Sec} t="Możesz"/>
    <div class="list">
      ${[
        ['Widzieć jego terminy', true],
        ['Czytać pisma z urzędów', true],
        ['Przygotowywać wnioski do jego zatwierdzenia', true],
        ['Widzieć dane o zdrowiu', false],
        ['Wysyłać wnioski bez jego zgody', false],
      ].map(
        ([t, on]) =>
          html`<div class="row"><span class="ic" style=${on ? 'background:var(--green-soft);color:var(--green)' : ''}>${I(on ? 'check' : 'x', 18)}</span><span class="tx"><div class="t">${t}</div></span></div>`,
      )}
    </div>
    <${Sec} t="Terminy taty"/>
    <div class="list">
      <${Row} icon="card" t="Dowód osobisty" s="Ważny do 26 stycznia 2027" right=${html`<span class="pill p-amber">63 dni</span>`} onClick=${() => c.toast('Przygotowałaś wniosek o nowy dowód. Tata zatwierdzi go u siebie.')}/>
      <${Row} icon="doc" t="Legitymacja emeryta" s="Bezterminowa" right=${html`<span class="pill p-gray">Ważna</span>`} onClick=${() => {}}/>
    </div>
    <div class="actions"><button class="btn ghost" onClick=${() => c.go('easy-approve')}>Zobacz, jak tata to zatwierdził</button></div>
  </div>`;
}

export function MemberTomasz(c) {
  return html`<div>
    <div style="display:flex;gap:12px;align-items:center;margin-top:8px"><span class="face-i" style="background:#3d5a80;width:52px;height:52px">TN</span><div><h1 class="h-m">Tomasz Nowicki</h1><div class="small">Partner</div></div></div>
    <${Sec} t="Wspólne"/>
    <div class="list">
      ${['Terminy rodziny', 'Sprawy dzieci, jako drugi rodzic', 'Plan kryzysowy i status „Jestem bezpieczna”'].map(t => html`<div class="row"><span class="ic" style="background:var(--green-soft);color:var(--green)">${I('check', 18)}</span><span class="tx"><div class="t">${t}</div></span></div>`)}
    </div>
    <p class="small" style="margin-top:12px">Każdy z Was zachowuje własne dokumenty, finanse i zdrowie. Nie są wspólne.</p>
  </div>`;
}
