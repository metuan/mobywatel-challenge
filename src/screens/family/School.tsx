import { Actions, Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { I } from '@/ui/icons';
import type { Ctx } from '@/types';

/* 4: Zgoda obojga rodziców */
export function Consent2(c: Ctx) {
  const [tom, setTom] = useState(c.s.tomOk || false);
  useEffect(() => {
    if (c.s.askedTom && !tom) {
      const t = setTimeout(() => {
        setTom(true);
        c.set({ tomOk: true });
      }, 2200);
      return () => clearTimeout(t);
    }
  }, [c.s.askedTom]);
  return (
    <div>
      <p className="stepk">Paszport dla Zosi</p>
      <h1 className="h-l">Potrzebna zgoda obojga rodziców</h1>
      <p className="lead">
        Od czerwca 2026 drugi rodzic może zatwierdzić paszport w swoim mObywatelu. Rozszerzamy to na szkołę i
        wyjazdy, w jednym miejscu.
      </p>
      <div className="list">
        <div className="row">
          <span className="face-i" style={{ background: '#22408f' }}>
            AN
          </span>
          <span className="tx">
            <div className="t">Anna</div>
            <div className="s">Zatwierdzone dziś, 16:10</div>
          </span>
          <span className="pill p-green">Zgoda</span>
        </div>
        <div className="row">
          <span className="face-i" style={{ background: '#3d5a80' }}>
            TN
          </span>
          <span className="tx">
            <div className="t">Tomasz</div>
            <div className="s">
              {tom
                ? 'Zatwierdzone dziś, 16:11'
                : c.s.askedTom
                  ? 'Prośba wysłana, czekamy…'
                  : 'Jeszcze nie zapytany'}
            </div>
          </span>
          {tom ? (
            <span className="pill p-green">Zgoda</span>
          ) : (
            <span className="pill p-gray">{c.s.askedTom ? 'Czeka' : '—'}</span>
          )}
        </div>
      </div>
      <div className="list" style={{ marginTop: '14px' }}>
        <div className="field">
          <div className="l">Wizyta w urzędzie</div>
          <div className="v">Tylko zdjęcie. Dzieci do 12 lat nie oddają odcisków palców</div>
        </div>
        <div className="field">
          <div className="l">Opłata</div>
          <div className="v">30 zł</div>
        </div>
      </div>
      <Actions>
        {tom ? (
          <Button onClick={() => c.toast('Wizyta: Małopolski Urząd Wojewódzki, 2 grudnia, 9:20')}>
            Umów wizytę w urzędzie
          </Button>
        ) : (
          <Button onClick={() => c.set({ askedTom: true })}>Poproś Tomasza o zgodę</Button>
        )}
      </Actions>
    </div>
  );
}

/* 5: Szkoła */
export function School(c: Ctx) {
  const [tab, setTab] = useState('dziś');
  const [ex, setEx] = useState(c.s.excused || false);
  return (
    <div>
      <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginTop: '4px' }}>
        <span className="face-i" style={{ background: '#b0533f' }}>
          ZN
        </span>
        <div>
          <div className="t" style={{ fontWeight: '600', fontSize: '17px' }}>
            Zosia · zerówka
          </div>
          <div className="small">Szkoła Podstawowa nr 9, Kraków</div>
        </div>
      </div>
      <h1 className="h-l">Szkoła</h1>
      <div className="seg full" style={{ marginBottom: '14px' }}>
        {['dziś', 'frekwencja', 'oceny'].map(t => (
          <button aria-pressed={tab === t} onClick={() => setTab(t)}>
            {t[0].toUpperCase() + t.slice(1)}
          </button>
        ))}
      </div>
      {tab === 'dziś' && (
        <div>
          <div className="list">
            <div className="row">
              <span className="it it-orange">{I('bell', 18)}</span>
              <span className="tx">
                <div className="t">Nieobecność wczoraj</div>
                <div className="s">
                  {ex ? 'Usprawiedliwiona przez Ciebie, 16:20' : 'Poniedziałek, 23 listopada, cały dzień'}
                </div>
              </span>
              {ex ? (
                <span className="pill p-green">OK</span>
              ) : (
                <button
                  className="mini"
                  onClick={() => {
                    setEx(true);
                    c.set({ excused: true });
                    c.toast('Wychowawczyni dostała usprawiedliwienie.');
                  }}
                >
                  Usprawiedliw
                </button>
              )}
            </div>
            <div className="row">
              <span className="it it-green">{I('route', 18)}</span>
              <span className="tx">
                <div className="t">Wycieczka do Ojcowa, 4 grudnia</div>
                <div className="s">Zgoda rodzica i 45 zł</div>
              </span>
              <button
                className="mini"
                onClick={() => c.toast('Zgoda wyrażona. Płatność BLIK w pełnej wersji.')}
              >
                Zgoda
              </button>
            </div>
            <div className="row">
              <span className="it">{I('mail', 18)}</span>
              <span className="tx">
                <div className="t">Wiadomość od wychowawczyni</div>
                <div className="s">„Jutro zajęcia z bezpieczeństwa, proszę o kamizelkę odblaskową”</div>
              </span>
            </div>
          </div>
        </div>
      )}
      {tab === 'frekwencja' && (
        <div className="card" style={{ padding: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
            <div className="h-m">96%</div>
            <div className="small">listopad</div>
          </div>
          <div className="att">
            {Array.from({ length: 20 }, (_, i) => (
              <i className={i === 15 ? (ex ? 'ex' : 'ab') : ''}></i>
            ))}
          </div>
          <div className="small" style={{ marginTop: '8px' }}>
            1 nieobecność{ex ? ' (usprawiedliwiona)' : ''} · 0 spóźnień
          </div>
        </div>
      )}
      {tab === 'oceny' && (
        <div className="card" style={{ padding: '16px' }}>
          <div className="small">
            Ocena opisowa za I półrocze pojawi się w styczniu. W klasach 1–3 oceny też są opisowe.
          </div>
          <div className="note" style={{ marginTop: '12px', background: 'var(--fill)' }}>
            {I('sparkle', 18)}
            <span>Jeśli chcesz, streścimy ocenę w trzech zdaniach.</span>
          </div>
        </div>
      )}
      <p className="tiny" style={{ marginTop: '12px' }}>
        Widzą oboje rodzice. Dane z dziennika elektronicznego szkoły.
      </p>
    </div>
  );
}
