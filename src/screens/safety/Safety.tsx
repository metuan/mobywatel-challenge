import { cn } from '@/lib/utils';
import { Field, FieldLabel, FieldValue } from '@/components/ui/field';
import {
  List,
  ListItemContent,
  ListItemDescription,
  ListItemTitle,
  ListRow,
  ListRowContent,
  ListRowDescription,
  ListRowIcon,
  ListRowTitle,
} from '@/components/ui/list';
import { Badge } from '@/components/ui/badge';
import { Display, Lead, Title } from '@/components/ui/typography';
import { Actions, Button } from '@/components/ui/button';
import { useState } from 'react';
import { I } from '@/ui/icons';
import { Av, GRow, Label, Sec, Toggle } from '@/ui/primitives';
import type { Ctx } from '@/types';
import type { IconName } from '@/ui/icons';

export function Plan(_c: Ctx) {
  return (
    <div>
      <Title>Plan rodziny na sytuację kryzysową</Title>
      <Lead>Ustalony razem z Tomaszem. Działa bez internetu.</Lead>
      <List>
        <Field>
          <FieldLabel>Miejsce spotkania 1</FieldLabel>
          <FieldValue>Schron, ul. Dekerta 24 (240 m od domu)</FieldValue>
        </Field>
        <Field>
          <FieldLabel>Miejsce spotkania 2</FieldLabel>
          <FieldValue>Szkoła Podstawowa nr 34, ul. Kalwaryjska</FieldValue>
        </Field>
        <Field>
          <FieldLabel>Kto odbiera Zosię z przedszkola</FieldLabel>
          <FieldValue>Tomasz, a jeśli nie odpowiada: Anna</FieldValue>
        </Field>
        <Field>
          <FieldLabel>Kolejność kontaktu</FieldLabel>
          <FieldValue>Anna, Tomasz, tata, sąsiadka p. Ewa</FieldValue>
        </Field>
        <Field>
          <FieldLabel>Leki</FieldLabel>
          <FieldValue>Tata: leki na ciśnienie, zapas na 7 dni</FieldValue>
        </Field>
      </List>
      <Sec t="Plecak ewakuacyjny" />
      <List>
        {[
          ['Woda, 2 l na osobę na dzień', true],
          ['Latarka i baterie', true],
          ['Powerbank', false],
          ['Kopie dokumentów', true],
          ['Apteczka', false],
        ].map(([t, on]) => (
          <ListRow>
            <ListRowIcon className={cn(on && 'bg-green-soft text-green')}>
              {on ? I('check', 18) : ''}
            </ListRowIcon>
            <ListRowContent>
              <ListRowTitle>{t}</ListRowTitle>
            </ListRowContent>
            {!on && <Badge>Brakuje</Badge>}
          </ListRow>
        ))}
      </List>
    </div>
  );
}

export function Places(_c: Ctx) {
  return (
    <div>
      <Title>Obserwowane miejsca</Title>
      <Lead>
        Alerty dla Twojej lokalizacji przychodzą zawsze. Alerty dla tych miejsc są oznaczone ich nazwą, żeby
        ich nie pomylić.
      </Lead>
      <List>
        {[
          ['Sandomierz', 'Tata, ul. Mickiewicza'],
          ['Przedszkole nr 12, Kraków', 'Zosia'],
          ['Biuro Tomasza, Katowice', 'Tomasz'],
        ].map(([t, s]) => (
          <ListRow>
            <ListRowIcon>{I('pin')}</ListRowIcon>
            <ListRowContent>
              <ListRowTitle>{t}</ListRowTitle>
              <ListRowDescription>{s}</ListRowDescription>
            </ListRowContent>
            <Toggle on={true} set={() => {}} label={t} />
          </ListRow>
        ))}
      </List>
      <Actions>
        <Button variant="secondary">{I('plus', 18)} Dodaj miejsce</Button>
      </Actions>
    </div>
  );
}

export function Safety(c: Ctx) {
  const [flood, setFlood] = useState(false);
  const alarm = () => {
    setFlood(true);
    setTimeout(() => c.go('lock'), 650);
  };
  return (
    <div>
      <Display>Ochrona</Display>
      <div className={'status' + (flood ? ' flood' : '')}>
        <div className="st-k">
          <span className="pulse-dot"></span>Połączono z RCB · 15:40
        </div>
        <div className="st-city">Kraków</div>
        <div className="st-calm">{flood ? 'Alarm, idź do schronu' : 'Spokojnie'}</div>
        <div className="st-people">
          {[
            ['A', 'Ty', 'Kraków, Podgórze', 'ok'],
            ['Z', 'Zosia', 'Przedszkole nr 12', 'ok'],
            ['S', 'Tata', 'Sandomierz', 'warn'],
          ].map(([i, n, p, st]) => (
            <button className="st-p" onClick={() => c.go('family-map')}>
              <Av i={i} size={28} />
              <ListItemContent>
                <ListItemTitle className="text-[15px]/[22px]">{n}</ListItemTitle>
                <ListItemDescription className="text-[13px]/[19px] in-[.flood]:text-white/85">
                  {p}
                </ListItemDescription>
              </ListItemContent>
              <i className={'sdot ' + st}></i>
            </button>
          ))}
        </div>
        <div className="st-warn">
          <i className="sdot warn"></i>Sandomierz: wiatr do 90 km/h od 20:00 (IMGW, 2. stopień)
        </div>
        <i className="st-flood"></i>
      </div>
      <button className="pill wide mt-3" onClick={alarm}>
        Zobacz, jak przychodzi Alert RCB
      </button>
      <div className="w8">
        <button className="w" onClick={() => c.go('alert-shelter')}>
          <span className="wk">Najbliższy schron</span>
          <span className="wico">{I('route', 20)}</span>
          <span className="wv">240 m</span>
          <span className="ws">Dekerta 24 · 3 min pieszo</span>
        </button>
        <button className="w" onClick={() => c.go('ice')}>
          <span className="wk">Karta ratunkowa</span>
          <span className="wico">{I('heart', 20)}</span>
          <span className="wv text-[22px]">A Rh+</span>
          <span className="ws">Widoczna na ekranie blokady</span>
        </button>
        <button className="w" onClick={() => c.go('plan')}>
          <span className="wk">Plan rodziny</span>
          <span className="wico">{I('people', 20)}</span>
          <span className="wv">
            2<small> miejsca</small>
          </span>
          <span className="ws">Spotkania po alarmie</span>
        </button>
        <button className="w" onClick={() => c.go('scam')}>
          <span className="wk">Tarcza SMS</span>
          <span className="wico">{I('shield', 20)}</span>
          <span className="wv">
            3<small> zablokowane</small>
          </span>
          <span className="ws">Fałszywe dopłaty i kurierzy</span>
        </button>
      </div>
      <Label t="Komunikaty" />
      <List>
        {(
          [
            ['bell', 'Test syren w Krakowie, 1 grudnia, 12:00', 'RCB · wczoraj'],
            ['sun', 'Silny wiatr w Sandomierzu, 2. stopień', 'IMGW · 14:20'],
            ['wifi', 'Wisła: więcej wody, domom nic nie grozi', 'RSO · 11:02'],
          ] as [IconName, string, string][]
        ).map(([ic, t, s2]) => (
          <GRow ic={ic} t={t} s={s2} onClick={() => c.go('places')} />
        ))}
        <GRow
          ic="call"
          t="Kto do mnie dzwoni?"
          s="Sprawdź, czy dzwoni naprawdę urząd"
          onClick={() => c.go('caller')}
        />
        <GRow
          ic="camera"
          t="Zgłoś szkody po zdarzeniu"
          s="Zdjęcia, opis, jeden wniosek"
          onClick={() => c.go('damage-1')}
        />
      </List>
      <Label t="Rozpoznaj sygnał" />
      <div className="w8">
        <div className="w">
          <span className="wk">Alarm</span>
          <svg viewBox="0 0 120 30" width="100%" height="30" className="mt-auto">
            <path
              d="M0 15 Q7.5 0 15 15 T30 15 T45 15 T60 15 T75 15 T90 15 T105 15 T120 15"
              stroke="var(--ink)"
              strokeWidth="1.75"
              fill="none"
            />
          </svg>
          <span className="ws">Dźwięk modulowany, 3 min</span>
        </div>
        <div className="w">
          <span className="wk">Odwołanie</span>
          <svg viewBox="0 0 120 30" width="100%" height="30" className="mt-auto">
            <path d="M0 15H120" stroke="var(--ink)" strokeWidth="1.75" />
          </svg>
          <span className="ws">Dźwięk ciągły, 3 min</span>
        </div>
      </div>
    </div>
  );
}
