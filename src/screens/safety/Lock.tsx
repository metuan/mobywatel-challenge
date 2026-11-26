import { sx } from '@/lib/sx';
import { Fam } from '@/screens/family/Family';
import { useTicker } from '@/ui/hooks';
import { I } from '@/ui/icons';
import { AppIcon } from '@/ui/primitives';
import type { Ctx } from '@/types';

const NOTES = [
  {
    at: 1,
    k: 'imgw',
    app: 'IMGW',
    tm: '15:20',
    t: 'Sandomierz · miejsce taty',
    b: 'Ostrzeżenie 2. stopnia: silny wiatr do 90 km/h, od 20:00.',
  },
  {
    at: 2,
    k: 'rcb',
    app: 'ALERT RCB · ALERT EKSTREMALNY',
    tm: '15:42',
    t: 'Alarm powietrzny: Kraków',
    b: 'Alert RCB! Alarm powietrzny w Krakowie. Idź do najbliższego schronu albo ukrycia.',
    go: 'alert-red',
    big: true,
  },
  {
    at: 4,
    k: 'mob',
    app: 'mObywatel',
    tm: '15:45',
    t: 'Zosia jest w schronie',
    b: 'Przedszkole nr 12 potwierdziło: wszystkie dzieci w schronie przy ul. Limanowskiego.',
    go: 'family-map',
  },
  {
    at: 5,
    k: 'mob',
    app: 'mObywatel',
    tm: '15:46',
    t: 'Tomasz: jestem bezpieczny',
    b: 'Katowice, biuro. Poza strefą alarmu.',
    go: 'alert-safe',
  },
  {
    at: 6,
    k: 'mob',
    app: 'mObywatel',
    tm: '15:43',
    t: 'Tata jeszcze nie odpowiedział',
    b: 'Sandomierz jest poza strefą alarmu. Zadzwonić?',
    go: 'easy-call',
    act: 'Zadzwoń',
  },
];

export function Lock(c: Ctx) {
  const [n, replay] = useTicker(6, 1700);
  const shown = NOTES.filter(x => x.at <= n).reverse();
  const live = n >= 3;
  const sec = n >= 3 ? (n - 2) * 47 + 12 : 0;
  return (
    <div className="lock" role="region" aria-label="Ekran blokady z powiadomieniami">
      <svg className="skyline" viewBox="0 0 390 160" preserveAspectRatio="none" aria-hidden="true">
        <path
          d="M0 160V112h22v-14h14v14h20V96l8-10 8 10v16h18V80h6V64l4-8 4 8v16h6v32h22v-20h30v20h16V90l12-12 12 12v22h20V100h14v-8h10v8h12v12h24V94h8V76l6-10 6 10v18h8v18h22v-16h26v16h18v48z"
          fill="rgba(0,0,0,.28)"
        />
      </svg>
      <div className="lk-top">
        <span>{I('lock', 14)}</span>
        <div className="lk-clock">{n >= 2 ? '15:43' : '15:41'}</div>
        <div className="lk-date">wtorek, 24 listopada</div>
      </div>
      {live && (
        <button className="live" onClick={() => c.go('family-map')}>
          <div className="lv-h">
            <span className="lv-dot"></span>
            <b>Alarm powietrzny · Kraków</b>
            <span className="lv-t">
              {String(Math.floor(sec / 60)).padStart(2, '0')}:{String(sec % 60).padStart(2, '0')}
            </span>
          </div>
          <div className="lv-fam">
            <Fam who="anna" st="Schron" tone="ok" />
            <Fam who="zosia" st={n >= 4 ? 'Schron' : '…'} tone={n >= 4 ? 'ok' : 'wait'} />
            <Fam who="tomasz" st={n >= 5 ? 'Bezpieczny' : '…'} tone={n >= 5 ? 'ok' : 'wait'} />
            <Fam who="tata" st={n >= 6 ? 'Brak odp.' : '…'} tone={n >= 6 ? 'warn' : 'wait'} />
          </div>
          <div className="lv-bar">
            <i style={sx('width:' + (25 + (n >= 4 ? 25 : 0) + (n >= 5 ? 25 : 0)) + '%')}></i>
          </div>
          <div className="lv-f">
            {n >= 5 ? '3 z 4 osób bezpiecznych' : 'Zbieramy status rodziny…'} · stuknij, aby zobaczyć mapę
          </div>
        </button>
      )}
      <div className="nstack">
        {shown.slice(0, 3).map(x => (
          <button key={x.tm} className={'notif' + (x.big ? ' big' : '')} onClick={() => x.go && c.go(x.go)}>
            <div className="nh">
              <AppIcon k={x.k} />
              <span className="na">{x.app}</span>
              <span className="nt">{x.tm}</span>
            </div>
            <div className="ntt">{x.t}</div>
            <div className="nb">{x.b}</div>
            {x.act && (
              <div className="nact">
                <span>
                  {I('phone', 14)} {x.act}
                </span>
              </div>
            )}
          </button>
        ))}
        {shown.length > 3 && (
          <div className="nmore">
            i {shown.length - 3} {shown.length - 3 === 1 ? 'starsze powiadomienie' : 'starsze powiadomienia'}
          </div>
        )}
      </div>
      <div style={{ flex: '1' }}></div>
      <div className="lk-foot">
        <button className="lk-btn" onClick={replay}>
          {I('route', 15)} Odtwórz od nowa
        </button>
        <button className="lk-btn" onClick={() => c.go('alert-red')}>
          Otwórz aplikację
        </button>
      </div>
    </div>
  );
}
