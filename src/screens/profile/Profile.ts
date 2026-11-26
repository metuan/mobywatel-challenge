import { html } from '@/lib/preact';
import { I } from '@/ui/icons';
import { Label, Row, Sec, Toggle } from '@/ui/primitives';
import type { Ctx } from '@/types';

function ProfileBase(c: Ctx) {
  return html`<div>
    <div style="display:flex;gap:12px;align-items:center;margin-top:8px"><span class="face-i" style="background:#132a5e;width:52px;height:52px">AN</span><div><h1 class="h-m">Anna Nowicka</h1><div class="small">Kraków</div></div></div>
    <${Sec} t="Zaufanie"/>
    <div class="list">
      <${Row} icon="eye" t="Kto sprawdzał moje dane" s="4 razy w tym miesiącu" onClick=${() => c.go('access-log')}/>
      <${Row} icon="lock" t="Moje zgody" s="Rodzina, firmy, pamięć asystenta" onClick=${() => c.go('consents')}/>
      <${Row} icon="key" t="Logowanie" s="Twarz i klucz dostępu" onClick=${() => c.go('signin')}/>
      <${Row} icon="phone" t="Urządzenia i sesje" s="2 telefony, 1 przeglądarka" onClick=${() => c.go('devices')}/>
      <${Row} icon="shield" t="Tarcza antyoszustwa" s="Sprawdź podejrzany SMS lub link" onClick=${() => c.go('scam')}/>
    </div>
    <${Sec} t="Ułatwienia"/>
    <div class="list">
      <div class="row"><span class="ic">${I('sun')}</span><span class="tx"><div class="t">Tryb prosty</div><div class="s">Duże przyciski, jedna decyzja na ekranie</div></span><${Toggle} on=${c.s.easy} label="Tryb prosty" set=${(
        v: boolean,
      ) => {
        c.go(v ? 'easy' : 'today', v ? 'tata' : 'anna');
      }}/></div>
      <${Row} icon="speaker" t="Odczyt na głos i sterowanie głosem" s="Włączone" onClick=${() => {}}/>
      <${Row} icon="people" t="Tłumacz polskiego języka migowego" s="Wideo z tłumaczem, przycisk na każdym ekranie" onClick=${() => c.go('pjm')}/>
      <${Row} icon="wifi" t="Co, jeśli aktualizacja się nie uda?" s="Zobacz, co działa bez internetu" onClick=${() => c.go('offline')}/>
    </div>
    <${Sec} t="O aplikacji"/>
    <div class="list">
      <${Row} icon="list" t="Nowe funkcje" s="11 rzeczy, o które prosili ludzie w badaniach" onClick=${() => c.go('roadmap')}/>
      <${Row} icon="doc" t="O tej koncepcji" s="Niezależny projekt na mObywatel Challenge" onClick=${() => c.go('about')}/>
    </div>
  </div>`;
}

function TextSize(c: Ctx) {
  const v = c.s.fs || 1;
  const steps = [0.9, 1, 1.12, 1.25];
  return html`<div class="fs8"><span class="fs-a sm">A</span><div class="fs-track">${steps.map(x => html`<button aria-label=${'Rozmiar ' + x} aria-pressed=${v === x} onClick=${() => c.set({ fs: x })}><i></i></button>`)}<span class="fs-fill" style=${`width:${(steps.indexOf(v) / 3) * 100}%`}></span></div><span class="fs-a lg">A</span></div>`;
}

export function Profile(c: Ctx) {
  return html`<div>${ProfileBase(c)}<${Label} t="Wielkość tekstu"/><div class="card" style="padding:16px 18px"><${TextSize} ...${c}/><p class="tiny" style="margin:10px 0 0">Zmiana działa od razu na każdym ekranie.</p></div></div>`;
}
