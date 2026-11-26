import { List, ListRow, ListRowContent, ListRowDescription, ListRowTitle } from '@/components/ui/list';
import { Eyebrow, Lead, Muted, Title } from '@/components/ui/typography';
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
        <Eyebrow>Krok 2 z 2</Eyebrow>
        <Title>Pokaż ten kod osobie, którą zapraszasz</Title>
        <div className="qr">{QR()}</div>
        <Muted as="p" style={{ textAlign: 'center' }}>
          Kod działa 10 minut. Zapraszana osoba potwierdza go swoim mDowodem.
        </Muted>
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
      <Eyebrow>Krok 1 z 2</Eyebrow>
      <Title>Co ta osoba może?</Title>
      <Lead>Możesz to zmienić lub cofnąć w każdej chwili. Każde użycie zobaczysz w historii dostępu.</Lead>
      <List>
        {rows.map(([k, t, s]) => (
          <ListRow>
            <ListRowContent>
              <ListRowTitle>{t}</ListRowTitle>
              <ListRowDescription>{s}</ListRowDescription>
            </ListRowContent>
            <Toggle on={perm[k]} label={t} set={(v: boolean) => setPerm({ ...perm, [k]: v })} />
          </ListRow>
        ))}
      </List>
      <Actions>
        <Button onClick={() => setStep(1)}>Utwórz zaproszenie</Button>
      </Actions>
    </div>
  );
}
