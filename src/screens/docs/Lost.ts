import { html, useState } from '@/lib/preact';
import { HoldBtn } from '@/ui/controls';
import { I } from '@/ui/icons';
import { Row, Sec } from '@/ui/primitives';

export function Lost(c) {
  const [done, setDone] = useState(false);
  const items = [
    'mDowód i dowód osobisty',
    'Prawo jazdy',
    'PESEL: nikt nie weźmie kredytu na Twoje dane',
    'Karty płatnicze w 3 bankach',
  ];
  const finish = () => {
    setDone(true);
    c.toast({ t: 'Zastrzeżono 4 dokumenty', undo: () => setDone(false) });
  };
  return html`<div>
    <h1 class="h-l">${done ? 'Wszystko zastrzeżone.' : 'Zgubiłaś portfel?'}</h1>
    <p class="lead">${done ? 'Zastrzeżenia są aktywne od 15:58. Oto co dalej.' : 'Zastrzeżemy to wszystko naraz. Każdy krok możesz później cofnąć.'}</p>
    <div class=${'list lost8' + (done ? ' done' : '')}>${items.map((t, i) => html`<div class="row" style=${`--i:${i}`}><span class="ic lk">${done ? I('check', 18) : I('lock', 18)}</span><span class="tx"><div class="t">${t}</div></span></div>`)}</div>
    ${
      done
        ? html`<${Sec} t="Następne kroki"/><div class="list"><${Row} t="Zamów nowy dowód" s="Wizyta w urzędzie na zdjęcie i odciski" onClick=${() => {}}/><${Row} t="Zgłoś kradzież na policję" s="Jeśli portfel ukradziono" onClick=${() => {}}/></div>`
        : html`<div class="actions"><${HoldBtn} label="Przytrzymaj, żeby zastrzec" holdLabel="Trzymaj…" onDone=${finish} onTap=${() => c.confirm({ t: 'Zastrzec 4 dokumenty?', items: items, ok: 'Zastrzeż', done: () => setDone(true) })}/></div>
      <p class="tiny" style="text-align:center;margin-top:8px">Przytrzymaj przycisk przez sekundę. Krótkie dotknięcie pokaże podsumowanie.</p>`
    }
  </div>`;
}
