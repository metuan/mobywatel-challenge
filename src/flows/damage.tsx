import { sx } from '@/lib/sx';
import { useState } from 'react';
import { I } from '@/ui/icons';
import { Hero } from '@/ui/illustrations';
import { Progress, Src } from '@/ui/primitives';
import type { Ctx } from '@/types';

/* 2: Zgłaszanie szkód */
export function Damage1(c: Ctx) {
  const [n, setN] = useState(c.s.dmgPhotos || 0);
  return (
    <div>
      <p className="stepk">Zgłoszenie szkód · krok 1 z 3</p>
      <Progress n={1} of={3} />
      <h1 className="h-l">Zrób zdjęcia szkód</h1>
      <p className="lead">Do każdego zdjęcia dodamy datę i miejsce. Nikt ich potem nie zmieni.</p>
      <div className="photos">
        {[0, 1, 2, 3].map(i =>
          i < n ? (
            <div className="ph">
              <svg viewBox="0 0 100 100" width="100%" height="100%">
                <rect width="100" height="100" fill={['#c9c4bb', '#b7b1a6', '#d2ccc2', '#bfb9ae'][i]} />
                <path
                  d={
                    [
                      'M10 70 40 40 60 60 75 45 95 70V100H10z',
                      'M0 60H100V100H0zM20 20h30v40H20z',
                      'M15 80 50 30 85 80z',
                      'M0 50 100 40V100H0z',
                    ][i]
                  }
                  fill="rgba(0,0,0,.18)"
                />
              </svg>
              <span>15:58 · Kraków</span>
            </div>
          ) : (
            <button
              className="ph add"
              onClick={() => {
                setN(n + 1);
                c.set({ dmgPhotos: n + 1 });
              }}
            >
              {I('camera', 24)}
              <span>{i === n ? 'Zrób zdjęcie' : ''}</span>
            </button>
          ),
        )}
      </div>
      <div className="actions">
        <button
          className="btn"
          disabled={n === 0}
          style={sx(n === 0 ? 'opacity:.4' : '')}
          onClick={() => c.go('damage-2')}
        >
          Dalej
        </button>
      </div>
    </div>
  );
}

export function Damage2(c: Ctx) {
  const [k, setK] = useState('dom');
  return (
    <div>
      <p className="stepk">Zgłoszenie szkód · krok 2 z 3</p>
      <Progress n={2} of={3} />
      <h1 className="h-l">Co zostało uszkodzone?</h1>
      <div className="seg full" style={{ marginBottom: '14px' }}>
        {[
          ['dom', 'Mieszkanie'],
          ['auto', 'Samochód'],
          ['inne', 'Inne'],
        ].map(([v, t]) => (
          <button aria-pressed={k === v} onClick={() => setK(v)}>
            {t}
          </button>
        ))}
      </div>
      <div className="list">
        <div className="field">
          <div className="l">Adres</div>
          <div className="v">ul. Długa 12/4, Kraków</div>
          <Src t="rejestr PESEL" />
        </div>
        <div className="field">
          <div className="l">Zdarzenie</div>
          <div className="v">Alarm powietrzny, 24 listopada</div>
          <Src t="Alert RCB" />
        </div>
        <div className="field">
          <div className="l">Opis</div>
          <div className="v">Wybite okna w kuchni i pokoju, zalany parkiet</div>
        </div>
        <div className="field">
          <div className="l">Konto do wypłaty</div>
          <div className="v">PKO BP •••• 4471</div>
          <Src t="konto do zwrotu podatku" />
        </div>
      </div>
      <div className="actions">
        <button
          className="btn"
          onClick={() =>
            c.confirm({
              t: 'Wysłać zgłoszenie do gminy?',
              items: ['4 zdjęcia z datą i miejscem', 'Opis szkód: mieszkanie', 'Konto do wypłaty •••• 4471'],
              ok: 'Wyślij',
              done: () => c.go('damage-3'),
            })
          }
        >
          Sprawdź i wyślij
        </button>
      </div>
    </div>
  );
}

export function Damage3(c: Ctx) {
  return (
    <div>
      <Hero n="shelter" />
      <h1 className="h-l">Zgłoszenie przyjęte</h1>
      <p className="lead">Numer sprawy: KR/SZK/2026/0412. Zajmuje się nią Urząd Miasta Krakowa.</p>
      <div className="list timeline">
        {[
          ['Zgłoszenie wysłane', 'Dziś, 16:04', 1],
          ['Komisja ogląda szkody', 'Wybierz termin: 26 lub 27 listopada', 0],
          ['Komisja wycenia szkody', 'Wynik zobaczysz tutaj', 0],
          ['Wypłata zasiłku', 'Na konto •••• 4471', 0],
        ].map(([t, s, d]) => (
          <div className="row">
            <span className={'tl' + (d ? ' on' : '')}></span>
            <span className="tx">
              <div className="t">{t}</div>
              <div className="s">{s}</div>
            </span>
          </div>
        ))}
      </div>
      <div className="actions">
        <button className="btn" onClick={() => c.toast('Komisja przyjdzie 26 listopada, 10:00–12:00')}>
          Wybierz termin wizyty komisji
        </button>
      </div>
    </div>
  );
}
