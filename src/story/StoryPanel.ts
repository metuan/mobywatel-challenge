import { html } from '@/lib/preact';
import { BEATS, CHAPTERS, beatOf } from '@/story/chapters';
import { I } from '@/ui/icons';

export function StoryPanel({ i, route, go, step, lastBeat = 0 }) {
  const ch = CHAPTERS[i], beats = BEATS[i];
  const here = beatOf(i, route), off = here < 0 && route !== beats[0][0];
  const cur = here >= 0 ? here : Math.min(lastBeat, beats.length - 1);
  const last = cur === beats.length - 1;
  return html`<div class="story" key=${i}>
    <div class="st-n"><span>${ch.when}</span></div>
    <h2 class="st-t">${ch.t}</h2>
    <p class="st-hook">${ch.hook}</p>
    <div class="st-ab">
      <div><span class="st-k">Dziś</span><p>${ch.today}</p></div>
      <div class="on"><span class="st-k">W nowym mObywatelu</span><p>${ch.razem}</p></div>
    </div>
    <ol class="beats">${beats.map(([r, t, act], j) => html`<li class=${j < cur ? 'done' : j === cur ? 'now' : ''}>
      <button class="bt-dot" onClick=${() => go(r, ch.p)} aria-label=${'Krok ' + (j + 1)}>${j < cur ? I('check', 13) : j + 1}</button>
      <div><p>${t}</p>${j === cur && off && html`<button class="bt-back" onClick=${() => go(r, ch.p)}>${I('left', 14)}<span>Wróć do tego kroku</span></button>`}</div></li>`)}</ol>
    ${last && html`<div class="st-done">${i < CHAPTERS.length - 1 ? 'Ten rozdział za Tobą.' : 'To ostatni rozdział.'}</div>`}
    <div class="st-nav">
      <button class="pill soft" disabled=${i === 0} onClick=${() => step(-1)} aria-label="Poprzedni rozdział">${I('left', 18)}</button>
      <button class="pill st-next" onClick=${() => step(1)}>${i < CHAPTERS.length - 1 ? html`Dalej: ${CHAPTERS[i + 1].t}` : 'Zakończ historię'} ${I('chevron', 16)}</button>
    </div>
    ${ch.x.length > 0 && html`<div class="st-more"><span>Zobacz też</span>${ch.x.map(([t, r]) => html`<button onClick=${() => go(r, ch.p)}>${t}</button>`)}</div>`}
  </div>`;
}

export function Progress12({ i, goChap }) {
  return html`<div class="p12"><div class="p12-k"><span>Rozdział ${i + 1} z ${CHAPTERS.length}</span></div>
    <div class="p12-bar">${CHAPTERS.map((ch, j) => html`<button class=${j < i ? 'done' : j === i ? 'now' : ''} onClick=${() => goChap(j)} title=${ch.t} aria-label=${'Rozdział ' + (j + 1) + ': ' + ch.t}><span>${ch.t}</span></button>`)}</div></div>`;
}
