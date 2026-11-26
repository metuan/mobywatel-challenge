import { Badge } from '@/components/ui/badge';
import { Note } from '@/components/ui/note';
import { Caption, Lead, Title } from '@/components/ui/typography';
import { Actions, Button } from '@/components/ui/button';
import { useState } from 'react';
import { I } from '@/ui/icons';
import { Sec } from '@/ui/primitives';
import type { Ctx } from '@/types';
import { stashBox } from '@/lib/morph';

export function AlertRed(c: Ctx) {
  return (
    <div className="rcb-screen" role="alertdialog" aria-label="Alert RCB">
      <div className="rcb-clock">15:42</div>
      <div className="rcb-date">wtorek, 24 listopada</div>
      <div className="rcb">
        <div className="hd">
          <span className="b">{I('bell', 14)}</span>ALERT RCB · ALERT EKSTREMALNY
          <span className="tm">teraz</span>
        </div>
        <div className="ttl">Alarm powietrzny: Kraków</div>
        <div className="bd">
          Alert RCB! Alarm powietrzny w Krakowie. Idź do najbliższego schronu albo ukrycia. Słuchaj poleceń
          służb.
        </div>
        <div className="sig">{I('check', 14)} Telefon sprawdził, że to prawdziwy alert RCB</div>
      </div>
      <div className="rcb-app">
        <div className="lbl">
          <span className="flag"></span>mObywatel dodaje do tego alertu
        </div>
        <button className="row" onClick={() => c.go('alert-shelter')}>
          <span className="it bg-sand">{I('route', 20)}</span>
          <span className="tx">
            <div className="t">Schronienie: ul. Dekerta 24</div>
            <div className="s">240 m · 3 min pieszo · trasa działa bez internetu</div>
          </span>
          <span className="chev">{I('chevron', 18)}</span>
        </button>
        <button className="row" onClick={() => c.go('family-map')}>
          <span className="it bg-rose">{I('people', 20)}</span>
          <span className="tx">
            <div className="t">Rodzina</div>
            <div className="s">Zosia: przedszkole w schronie · Tata: poza strefą alarmu</div>
          </span>
          <span className="chev">{I('chevron', 18)}</span>
        </button>
      </div>
      <div style={{ flex: '1', minHeight: '14px' }}></div>
      <Actions style={{ marginTop: '12px' }}>
        <Button
          variant="inverse"
          onClick={() => {
            stashBox('shelter', document.querySelector('.phone .rcb-app'));
            c.go('alert-watch');
          }}
        >
          {I('route', 18)} Prowadź do schronienia
        </Button>
        <Button variant="inverseSecondary" onClick={() => c.go('alert-guide')}>
          {I('speaker', 18)} Co robić teraz (odczytaj)
        </Button>
      </Actions>
    </div>
  );
}

function ShelterMap() {
  return (
    <svg viewBox="0 0 350 230" width="100%" role="img" aria-label="Mapa trasy do schronienia">
      <rect width="350" height="230" fill="#e9eae5" />
      <g stroke="#ffffff" strokeWidth="14" fill="none">
        <path d="M0 70H350M0 170H350M90 0V230M250 0V230" />
      </g>
      <g fill="#d9dbd4">
        <rect x="10" y="90" width="68" height="68" rx="6" />
        <rect x="102" y="10" width="136" height="50" rx="6" />
        <rect x="102" y="82" width="136" height="76" rx="6" />
        <rect x="262" y="82" width="80" height="76" rx="6" />
        <rect x="102" y="182" width="136" height="44" rx="6" />
      </g>
      <path
        d="M60 170H170V70H250"
        fill="none"
        stroke="#132a5e"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray="1 10"
      />
      <circle cx="60" cy="170" r="9" fill="#132a5e" stroke="#fff" strokeWidth="3" />
      <g transform="translate(250 70)">
        <rect x="-14" y="-14" width="28" height="28" rx="8" fill="#1c7a4c" />
        <path d="M-6 2 0-5 6 2M-4 1v6h8V1" stroke="#fff" strokeWidth="2" fill="none" strokeLinejoin="round" />
      </g>
      <text x="72" y="196" fontSize="11" fill="#5d636d" fontFamily="Inter,Arial">
        Jesteś tutaj
      </text>
      <text x="196" y="52" fontSize="11" fill="#1c7a4c" fontWeight="600" fontFamily="Inter,Arial">
        Schron, Dekerta 24
      </text>
    </svg>
  );
}

export function AlertShelter(c: Ctx) {
  return (
    <div>
      <Badge style={{ marginTop: '8px' }}>Alert RCB trwa · Kraków</Badge>
      <Title>Idź do schronienia przy ul. Dekerta 24</Title>
      <div className="map">{ShelterMap()}</div>
      <div className="list" style={{ marginTop: '12px' }}>
        <div className="field">
          <div className="l">Odległość</div>
          <div className="v">240 m · około 3 minuty pieszo</div>
        </div>
        <div className="field">
          <div className="l">Typ</div>
          <div className="v">Schron, dla 180 osób, czynny całą dobę</div>
          <div className="src">{I('check', 12)} Źródło: lista „Gdzie się ukryć”, Państwowa Straż Pożarna</div>
        </div>
        <div className="field">
          <div className="l">Gdy nie zdążysz</div>
          <div className="v">Korytarz bez okien, z dwiema ścianami między Tobą a ulicą</div>
        </div>
      </div>
      <Note icon="wifi" style={{ marginTop: '12px' }}>
        Mapa i trasa są zapisane w telefonie. Działają bez internetu.
      </Note>
      <Actions>
        <Button onClick={() => c.go('alert-guide')}>Jestem na miejscu</Button>
      </Actions>
    </div>
  );
}

export function AlertGuide(c: Ctx) {
  const [reading, setReading] = useState(false);
  return (
    <div>
      <Badge style={{ marginTop: '8px' }}>Alert RCB trwa</Badge>
      <Title>Co robić teraz</Title>
      <Lead>Zasady z poradnika RCB. Alarm to syrena, której dźwięk rośnie i opada przez 3 minuty.</Lead>
      <button className="speak" style={{ width: '100%' }} onClick={() => setReading(!reading)}>
        {I(reading ? 'pause' : 'speaker', 22)} {reading ? 'Zatrzymaj odczyt' : 'Odczytaj na głos'}
      </button>
      <div className="road" style={{ marginTop: '10px' }}>
        {[
          'Zostań w schronieniu do odwołania alarmu.',
          'Trzymaj się z dala od okien i drzwi zewnętrznych.',
          'Nie dzwoń bez potrzeby. Sieć jest potrzebna służbom.',
          'Wyślij rodzinie status „Jestem bezpieczna”. Dojdzie nawet przy słabym zasięgu.',
          'Słuchaj komunikatów w aplikacji i w radiu.',
        ].map((t, i) => (
          <>
            <div className="n">{i + 1}</div>
            <div className="b">{t}</div>
          </>
        ))}
      </div>
      <Actions>
        <Button onClick={() => c.go('alert-safe')}>{I('heart', 18)} Jestem bezpieczna</Button>
        <Button variant="secondary" onClick={() => c.go('alert-clear')}>
          Pokaż odwołanie alarmu (demo)
        </Button>
      </Actions>
    </div>
  );
}

export function AlertClear(c: Ctx) {
  return (
    <div className="rcb-screen clear" role="alertdialog" aria-label="Odwołanie alarmu">
      <div className="rcb-clock">16:21</div>
      <div className="rcb-date">wtorek, 24 listopada</div>
      <div className="rcb clear">
        <div className="hd">
          <span className="b">{I('check', 14)}</span>ALERT RCB<span className="tm">teraz</span>
        </div>
        <div className="ttl">Odwołanie alarmu: Kraków</div>
        <div className="bd">
          Alert RCB! Odwołano alarm powietrzny dla miasta Kraków. Ulica Kamieńskiego pozostaje zamknięta do
          odwołania.
        </div>
        <div className="sig">{I('check', 14)} Telefon sprawdził, że to prawdziwy alert RCB</div>
      </div>
      <div className="rcb-app">
        <div className="lbl">
          <span className="flag"></span>Twoja rodzina
        </div>
        <div className="row">
          <span className="tx">
            <div className="t">Tomasz, Zosia</div>
            <div className="s">Bezpieczni</div>
          </span>
          <Badge>OK</Badge>
        </div>
        <div className="row">
          <span className="tx">
            <div className="t">Tata</div>
            <div className="s">Brak odpowiedzi od 15:42</div>
          </span>
          <Badge>Sprawdź</Badge>
        </div>
      </div>
      <div style={{ flex: '1', minHeight: '14px' }}></div>
      <Actions style={{ marginTop: '12px' }}>
        <Button variant="inverse" onClick={() => c.go('alert-safe')}>
          Zobacz status rodziny
        </Button>
        <Button variant="inverseSecondary" onClick={() => c.go('damage-1')}>
          Zgłoś szkody
        </Button>
      </Actions>
    </div>
  );
}

export function AlertSafe(c: Ctx) {
  const [sent, setSent] = useState(c.s.safe);
  const send = () => {
    setSent(true);
    c.set({ safe: true });
  };
  return (
    <div>
      <Title>{sent ? 'Rodzina wie, że jesteś bezpieczna.' : 'Daj znać rodzinie'}</Title>
      {!sent && (
        <Actions style={{ marginTop: '6px' }}>
          <Button variant="success" onClick={send}>
            {I('check', 22)} Jestem bezpieczna
          </Button>
          <Button
            variant="secondary"
            onClick={() => c.toast('Rodzina dostała Twoją prośbę o pomoc i lokalizację.')}
          >
            Potrzebuję pomocy
          </Button>
        </Actions>
      )}
      <Sec t="Status rodziny" more="Mapa" go={() => c.go('family-map')} />
      <div className="list">
        <div className="row">
          <span className="face-i" style={{ background: '#132a5e' }}>
            AN
          </span>
          <span className="tx">
            <div className="t">Ty</div>
            <div className="s">{sent ? 'Bezpieczna, schron Dekerta 24, 15:49' : 'Nie wysłano'}</div>
          </span>
          {sent ? <Badge>Bezpieczna</Badge> : <Badge>—</Badge>}
        </div>
        <div className="row">
          <span className="face-i" style={{ background: '#3d5a80' }}>
            TN
          </span>
          <span className="tx">
            <div className="t">Tomasz</div>
            <div className="s">Bezpieczny, Katowice, 15:46</div>
          </span>
          <Badge>Bezpieczny</Badge>
        </div>
        <div className="row">
          <span className="face-i" style={{ background: '#a8650a' }}>
            ZN
          </span>
          <span className="tx">
            <div className="t">Zosia</div>
            <div className="s">Przedszkole nr 12: dzieci w schronie, 15:45</div>
          </span>
          <Badge>Bezpieczna</Badge>
        </div>
        <div className="row">
          <span className="face-i" style={{ background: '#1c7a4c' }}>
            SN
          </span>
          <span className="tx">
            <div className="t">Tata</div>
            <div className="s">Brak odpowiedzi od 15:42</div>
          </span>
          <button className="mini" onClick={() => c.go('easy-call')}>
            {I('phone', 14)} Zadzwoń
          </button>
        </div>
      </div>
      <Caption style={{ marginTop: '12px' }}>
        Status widzą tylko osoby z Twojej rodziny. Znika po 72 godzinach.
      </Caption>
    </div>
  );
}
