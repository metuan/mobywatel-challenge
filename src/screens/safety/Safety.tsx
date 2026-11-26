import { Badge } from '@/components/ui/badge';
import { Display, Lead, Title } from '@/components/ui/typography';
import { Actions, Button } from '@/components/ui/button';
import { sx } from '@/lib/sx';
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
      <div className="list">
        <div className="field">
          <div className="l">Miejsce spotkania 1</div>
          <div className="v">Schron, ul. Dekerta 24 (240 m od domu)</div>
        </div>
        <div className="field">
          <div className="l">Miejsce spotkania 2</div>
          <div className="v">Szkoła Podstawowa nr 34, ul. Kalwaryjska</div>
        </div>
        <div className="field">
          <div className="l">Kto odbiera Zosię z przedszkola</div>
          <div className="v">Tomasz, a jeśli nie odpowiada: Anna</div>
        </div>
        <div className="field">
          <div className="l">Kolejność kontaktu</div>
          <div className="v">Anna, Tomasz, tata, sąsiadka p. Ewa</div>
        </div>
        <div className="field">
          <div className="l">Leki</div>
          <div className="v">Tata: leki na ciśnienie, zapas na 7 dni</div>
        </div>
      </div>
      <Sec t="Plecak ewakuacyjny" />
      <div className="list">
        {[
          ['Woda, 2 l na osobę na dzień', true],
          ['Latarka i baterie', true],
          ['Powerbank', false],
          ['Kopie dokumentów', true],
          ['Apteczka', false],
        ].map(([t, on]) => (
          <div className="row">
            <span className="ic" style={sx(on ? 'background:var(--green-soft);color:var(--green)' : '')}>
              {on ? I('check', 18) : ''}
            </span>
            <span className="tx">
              <div className="t">{t}</div>
            </span>
            {!on && <Badge>Brakuje</Badge>}
          </div>
        ))}
      </div>
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
      <div className="list">
        {[
          ['Sandomierz', 'Tata, ul. Mickiewicza'],
          ['Przedszkole nr 12, Kraków', 'Zosia'],
          ['Biuro Tomasza, Katowice', 'Tomasz'],
        ].map(([t, s]) => (
          <div className="row">
            <span className="ic">{I('pin')}</span>
            <span className="tx">
              <div className="t">{t}</div>
              <div className="s">{s}</div>
            </span>
            <Toggle on={true} set={() => {}} label={t} />
          </div>
        ))}
      </div>
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
              <span className="gtx">
                <span className="gt">{n}</span>
                <span className="gs">{p}</span>
              </span>
              <i className={'sdot ' + st}></i>
            </button>
          ))}
        </div>
        <div className="st-warn">
          <i className="sdot warn"></i>Sandomierz: wiatr do 90 km/h od 20:00 (IMGW, 2. stopień)
        </div>
        <i className="st-flood"></i>
      </div>
      <button className="pill wide" style={{ marginTop: '12px' }} onClick={alarm}>
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
          <span className="wv" style={{ fontSize: '22px' }}>
            A Rh+
          </span>
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
      <div className="glist">
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
      </div>
      <Label t="Rozpoznaj sygnał" />
      <div className="w8">
        <div className="w">
          <span className="wk">Alarm</span>
          <svg viewBox="0 0 120 30" width="100%" height="30" style={{ marginTop: 'auto' }}>
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
          <svg viewBox="0 0 120 30" width="100%" height="30" style={{ marginTop: 'auto' }}>
            <path d="M0 15H120" stroke="var(--ink)" strokeWidth="1.75" />
          </svg>
          <span className="ws">Dźwięk ciągły, 3 min</span>
        </div>
      </div>
    </div>
  );
}
