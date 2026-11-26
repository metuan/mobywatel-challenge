import { html, useState } from '@/lib/preact';
import { QR } from '@/ui/documentCard';
import { Toggle } from '@/ui/primitives';

export function Invite(c) {
  const [perm, setPerm] = useState({ dates: true, letters: true, prepare: true, health: false });
  const [step, setStep] = useState(0);
  if (step === 1)
    return html`<div>
    <p class="stepk">Krok 2 z 2</p><h1 class="h-l">Pokaż ten kod osobie, którą zapraszasz</h1>
    <div class="qr">${QR()}</div>
    <p class="small" style="text-align:center">Kod działa 10 minut. Zapraszana osoba potwierdza go swoim mDowodem.</p>
    <div class="actions"><button class="btn" onClick=${() => {
      c.toast('Zaproszenie wysłane. Czekamy na potwierdzenie.');
      c.go('family');
    }}>Gotowe</button></div></div>`;
  const rows = [
    ['dates', 'Widzi terminy', 'Dowody, paszporty, OC, wizyty'],
    ['letters', 'Czyta pisma', 'Decyzje i wezwania z urzędów'],
    ['prepare', 'Przygotowuje wnioski', 'Wysyłasz je dopiero Ty'],
    ['health', 'Widzi dane o zdrowiu', 'Recepty, skierowania, wyniki'],
  ];
  return html`<div>
    <p class="stepk">Krok 1 z 2</p><h1 class="h-l">Co ta osoba może?</h1>
    <p class="lead">Możesz to zmienić lub cofnąć w każdej chwili. Każde użycie zobaczysz w historii dostępu.</p>
    <div class="list">${rows.map(([k, t, s]) => html`<div class="row"><span class="tx"><div class="t">${t}</div><div class="s">${s}</div></span><${Toggle} on=${perm[k]} label=${t} set=${v => setPerm({ ...perm, [k]: v })}/></div>`)}</div>
    <div class="actions"><button class="btn" onClick=${() => setStep(1)}>Utwórz zaproszenie</button></div>
  </div>`;
}
