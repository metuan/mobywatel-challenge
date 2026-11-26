import { Caption, Muted, Subtitle } from '@/components/ui/typography';
import { sx } from '@/lib/sx';
import { I } from '@/ui/icons';
import { Label, Row, Sec, Toggle } from '@/ui/primitives';
import type { Ctx } from '@/types';

function ProfileBase(c: Ctx) {
  return (
    <div>
      <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginTop: '8px' }}>
        <span className="face-i" style={{ background: '#132a5e', width: '52px', height: '52px' }}>
          AN
        </span>
        <div>
          <Subtitle as="h1">Anna Nowicka</Subtitle>
          <Muted>Kraków</Muted>
        </div>
      </div>
      <Sec t="Zaufanie" />
      <div className="list">
        <Row
          icon="eye"
          t="Kto sprawdzał moje dane"
          s="4 razy w tym miesiącu"
          onClick={() => c.go('access-log')}
        />
        <Row
          icon="lock"
          t="Moje zgody"
          s="Rodzina, firmy, pamięć asystenta"
          onClick={() => c.go('consents')}
        />
        <Row icon="key" t="Logowanie" s="Twarz i klucz dostępu" onClick={() => c.go('signin')} />
        <Row
          icon="phone"
          t="Urządzenia i sesje"
          s="2 telefony, 1 przeglądarka"
          onClick={() => c.go('devices')}
        />
        <Row
          icon="shield"
          t="Tarcza antyoszustwa"
          s="Sprawdź podejrzany SMS lub link"
          onClick={() => c.go('scam')}
        />
      </div>
      <Sec t="Ułatwienia" />
      <div className="list">
        <div className="row">
          <span className="ic">{I('sun')}</span>
          <span className="tx">
            <div className="t">Tryb prosty</div>
            <div className="s">Duże przyciski, jedna decyzja na ekranie</div>
          </span>
          <Toggle
            on={!!c.s.easy}
            label="Tryb prosty"
            set={(v: boolean) => {
              c.go(v ? 'easy' : 'today', v ? 'tata' : 'anna');
            }}
          />
        </div>
        <Row icon="speaker" t="Odczyt na głos i sterowanie głosem" s="Włączone" onClick={() => {}} />
        <Row
          icon="people"
          t="Tłumacz polskiego języka migowego"
          s="Wideo z tłumaczem, przycisk na każdym ekranie"
          onClick={() => c.go('pjm')}
        />
        <Row
          icon="wifi"
          t="Co, jeśli aktualizacja się nie uda?"
          s="Zobacz, co działa bez internetu"
          onClick={() => c.go('offline')}
        />
      </div>
      <Sec t="O aplikacji" />
      <div className="list">
        <Row
          icon="list"
          t="Nowe funkcje"
          s="11 rzeczy, o które prosili ludzie w badaniach"
          onClick={() => c.go('roadmap')}
        />
        <Row
          icon="doc"
          t="O tej koncepcji"
          s="Niezależny projekt na mObywatel Challenge"
          onClick={() => c.go('about')}
        />
      </div>
    </div>
  );
}

function TextSize(c: Ctx) {
  const v = c.s.fs || 1;
  const steps = [0.9, 1, 1.12, 1.25];
  return (
    <div className="fs8">
      <span className="fs-a sm">A</span>
      <div className="fs-track">
        {steps.map(x => (
          <button aria-label={'Rozmiar ' + x} aria-pressed={v === x} onClick={() => c.set({ fs: x })}>
            <i></i>
          </button>
        ))}
        <span className="fs-fill" style={sx(`width:${(steps.indexOf(v) / 3) * 100}%`)}></span>
      </div>
      <span className="fs-a lg">A</span>
    </div>
  );
}

export function Profile(c: Ctx) {
  return (
    <div>
      {ProfileBase(c)}
      <Label t="Wielkość tekstu" />
      <div className="card" style={{ padding: '16px 18px' }}>
        <TextSize {...c} />
        <Caption style={{ margin: '10px 0 0' }}>Zmiana działa od razu na każdym ekranie.</Caption>
      </div>
    </div>
  );
}
