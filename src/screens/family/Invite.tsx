import { Actions, Button } from '@/components/ui/button';
import { useState } from 'react';
import { QR } from '@/ui/documentCard';
import { Toggle } from '@/ui/primitives';
import type { Ctx } from '@/types';

export function Invite(c: Ctx) {
  const [perm, setPerm] = useState<Record<string, boolean>>({
    dates: true,
    letters: true,
    prepare: true,
    health: false,
  });
  const [step, setStep] = useState(0);
  if (step === 1)
    return (
      <div>
        <p className="stepk">Krok 2 z 2</p>
        <h1 className="h-l">Pokaż ten kod osobie, którą zapraszasz</h1>
        <div className="qr">{QR()}</div>
        <p className="small" style={{ textAlign: 'center' }}>
          Kod działa 10 minut. Zapraszana osoba potwierdza go swoim mDowodem.
        </p>
        <Actions>
          <Button
            onClick={() => {
              c.toast('Zaproszenie wysłane. Czekamy na potwierdzenie.');
              c.go('family');
            }}
          >
            Gotowe
          </Button>
        </Actions>
      </div>
    );
  const rows = [
    ['dates', 'Widzi terminy', 'Dowody, paszporty, OC, wizyty'],
    ['letters', 'Czyta pisma', 'Decyzje i wezwania z urzędów'],
    ['prepare', 'Przygotowuje wnioski', 'Wysyłasz je dopiero Ty'],
    ['health', 'Widzi dane o zdrowiu', 'Recepty, skierowania, wyniki'],
  ];
  return (
    <div>
      <p className="stepk">Krok 1 z 2</p>
      <h1 className="h-l">Co ta osoba może?</h1>
      <p className="lead">
        Możesz to zmienić lub cofnąć w każdej chwili. Każde użycie zobaczysz w historii dostępu.
      </p>
      <div className="list">
        {rows.map(([k, t, s]) => (
          <div className="row">
            <span className="tx">
              <div className="t">{t}</div>
              <div className="s">{s}</div>
            </span>
            <Toggle on={perm[k]} label={t} set={(v: boolean) => setPerm({ ...perm, [k]: v })} />
          </div>
        ))}
      </div>
      <Actions>
        <Button onClick={() => setStep(1)}>Utwórz zaproszenie</Button>
      </Actions>
    </div>
  );
}
