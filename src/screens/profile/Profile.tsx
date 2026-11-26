import {
  List,
  ListRow,
  ListRowAvatar,
  ListRowContent,
  ListRowDescription,
  ListRowIcon,
  ListRowTitle,
} from '@/components/ui/list';
import { Card } from '@/components/ui/card';
import { Caption, Muted, Subtitle } from '@/components/ui/typography';
import { I } from '@/ui/icons';
import { Label, Row, Sec, Toggle } from '@/ui/primitives';
import type { Ctx } from '@/types';

function ProfileBase(c: Ctx) {
  return (
    <div>
      <div className="flex gap-3 items-center mt-2">
        <ListRowAvatar className="size-[52px]">AN</ListRowAvatar>
        <div>
          <Subtitle as="h1">Anna Nowicka</Subtitle>
          <Muted>Kraków</Muted>
        </div>
      </div>
      <Sec t="Zaufanie" />
      <List>
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
      </List>
      <Sec t="Ułatwienia" />
      <List>
        <ListRow>
          <ListRowIcon>{I('sun')}</ListRowIcon>
          <ListRowContent>
            <ListRowTitle>Tryb prosty</ListRowTitle>
            <ListRowDescription>Duże przyciski, jedna decyzja na ekranie</ListRowDescription>
          </ListRowContent>
          <Toggle
            on={!!c.s.easy}
            label="Tryb prosty"
            set={(v: boolean) => {
              c.go(v ? 'easy' : 'today', v ? 'tata' : 'anna');
            }}
          />
        </ListRow>
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
      </List>
      <Sec t="O aplikacji" />
      <List>
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
      </List>
    </div>
  );
}

function TextSize(c: Ctx) {
  const v = c.s.fs || 1;
  const steps = [0.9, 1, 1.12, 1.25];
  return (
    <div className="fs8 flex items-center gap-3.5">
      <span className="fs-a font-semibold text-ink-2 [&.sm]:text-[13px] sm">A</span>
      <div className="relative flex-1 h-7 flex justify-between items-center [&::before]:[content:''] [&::before]:absolute [&::before]:left-1.5 [&::before]:right-1.5 [&::before]:top-[50%] [&::before]:h-0.75 [&::before]:[margin-top:-1.5px] [&::before]:[background:var(--fill-2)] [&::before]:rounded-[3px] [&_button]:relative [&_button]:z-1 [&_button]:w-7 [&_button]:h-7 [&_button]:grid [&_button]:place-items-center [&_button_i]:w-3 [&_button_i]:h-3 [&_button_i]:rounded-[50%] [&_button_i]:[background:var(--fill-2)] [&_button_i]:[transition:transform_0.2s_var(--out),_background_0.2s] [&_button[aria-pressed='true']_i]:w-6 [&_button[aria-pressed='true']_i]:h-6 [&_button[aria-pressed='true']_i]:[background:#fff] [&_button[aria-pressed='true']_i]:[box-shadow:0_1px_4px_rgb(11_13_18_/_25%),_0_0_0_0.5px_var(--hair-2)]">
        {steps.map(x => (
          <button aria-label={'Rozmiar ' + x} aria-pressed={v === x} onClick={() => c.set({ fs: x })}>
            <i></i>
          </button>
        ))}
        <span
          className="absolute left-1.5 top-[50%] h-0.75 [margin-top:-1.5px] [background:var(--ink)] rounded-[3px] max-w-[calc(100%-12px)] [transition:width_0.25s_var(--out)]"
          style={{ width: `${(steps.indexOf(v) / 3) * 100}%` }}
        ></span>
      </div>
      <span className="fs-a font-semibold text-ink-2 [&.sm]:text-[13px] [&&.fs-a]:text-[22px]">A</span>
    </div>
  );
}

export function Profile(c: Ctx) {
  return (
    <div>
      {ProfileBase(c)}
      <Label t="Wielkość tekstu" />
      <Card className="py-4 px-4.5">
        <TextSize {...c} />
        <Caption className="mt-2.5 mr-0 mb-0 ml-0">Zmiana działa od razu na każdym ekranie.</Caption>
      </Card>
    </div>
  );
}
