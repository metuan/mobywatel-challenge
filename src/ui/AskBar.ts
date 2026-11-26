import { html, useState } from '@/lib/preact';
import { I } from '@/ui/icons';

function AskBar({ c, auto }) {
  const [q, setQ] = useState('');
  const send = () => c.ask(q || 'Jak zameldować się w nowym mieszkaniu?');
  return html`<div>
    <div class="askbar">
      <input id="ask" value=${q} onInput=${e => setQ(e.target.value)} onKeyDown=${e => e.key === 'Enter' && send()} placeholder="Zapytaj o sprawę" aria-label="Zapytaj o dowolną sprawę"/>
      <button class="ib" aria-label="Dodaj zdjęcie pisma" onClick=${() => c.go('letter-1')}>${I('clip')}</button>
      <button class="ib" aria-label="Mów" onClick=${() => c.ask('Kiedy kończy się ważność mojego dowodu?')}>${I('mic')}</button>
      <button class="ib go" aria-label="Wyślij" onClick=${send}>${I('send', 18)}</button>
    </div>
    <div class="hint">Spróbuj: „Przeprowadzam się w grudniu, co muszę załatwić?”</div>
  </div>`;
}
