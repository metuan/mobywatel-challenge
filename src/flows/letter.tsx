import { useEffect, useState } from 'react';
import { I } from '@/ui/icons';
import { Hero } from '@/ui/illustrations';
import type { Ctx } from '@/types';

export function Letter1(c: Ctx) {
  const [snap, setSnap] = useState(false);
  useEffect(() => {
    if (snap) {
      const t = setTimeout(() => c.go('letter-2'), 1400);
      return () => clearTimeout(t);
    }
  }, [snap]);
  return (
    <div>
      <Hero n="letter" />
      <h1 className="h-l">Zrób zdjęcie pisma</h1>
      <div
        style={{
          background: '#1b1e24',
          borderRadius: '20px',
          height: '420px',
          display: 'grid',
          placeItems: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            width: '220px',
            height: '300px',
            background: '#f6f5f0',
            borderRadius: '4px',
            padding: '18px',
            transform: 'rotate(-2deg)',
            fontSize: '7px',
            color: '#444',
            lineHeight: '1.6',
          }}
        >
          <div style={{ fontWeight: '700', fontSize: '8px' }}>URZĄD SKARBOWY KRAKÓW-PODGÓRZE</div>
          <div>ul. Wadowicka 10</div>
          <br />
          <div style={{ fontWeight: '700' }}>WEZWANIE</div>
          <div>
            Na podstawie art. 155 § 1 Ordynacji podatkowej wzywa się Panią do złożenia wyjaśnień dotyczących
            korekty zeznania PIT-37 za rok 2025…
          </div>
          <div style={{ marginTop: '6px' }}>{'▬ '.repeat(40)}</div>
        </div>
        <div
          style={{
            position: 'absolute',
            inset: '40px 50px',
            border: `2px solid ${snap ? '#1c7a4c' : 'rgba(255,255,255,.7)'}`,
            borderRadius: '14px',
          }}
        ></div>
        {snap && (
          <div style={{ position: 'absolute', bottom: '16px', color: '#fff', fontSize: '13px' }}>
            Czytam pismo…
          </div>
        )}
      </div>
      <div className="actions">
        <button className="btn" onClick={() => setSnap(true)}>
          {I('camera', 18)} Zrób zdjęcie
        </button>
      </div>
    </div>
  );
}

export function Letter3(c: Ctx) {
  return (
    <div>
      <p className="stepk">Podgląd odpowiedzi</p>
      <h1 className="h-l">Wyjaśnienie do urzędu</h1>
      <div className="card" style={{ padding: '16px', fontSize: '14px', lineHeight: '1.6' }}>
        <p style={{ margin: '0 0 8px' }}>W sprawie: pisma z 19.11.2026, PIT-37 za 2025 r.</p>
        <p style={{ margin: '0 0 8px' }}>
          Poprawiłam zeznanie, bo w pierwszej wersji zapomniałam o uldze na dziecko (Zofia Nowicka, PESEL
          200307•••••). Dołączam zaświadczenie.
        </p>
        <p style={{ margin: '0' }}>Anna Nowicka</p>
      </div>
      <div className="list" style={{ marginTop: '10px' }}>
        <div className="field">
          <div className="l">Załącznik</div>
          <div className="v">Zaświadczenie o uldze na dziecko (z rejestru, bez skanowania)</div>
        </div>
      </div>
      {c.s.letterSent ? (
        <div className="note green" style={{ marginTop: '14px' }}>
          {I('check', 18)}
          <span>Wysłano przez e-Doręczenia. Urzędowe potwierdzenie odbioru jest zapisane w sprawie.</span>
        </div>
      ) : (
        <div className="actions">
          <button
            className="btn"
            onClick={() =>
              c.confirm({
                t: 'Wysłać wyjaśnienie?',
                items: ['Do: Urząd Skarbowy Kraków-Podgórze', 'Przez: e-Doręczenia', '1 załącznik'],
                ok: 'Potwierdź i wyślij',
                done: () => {
                  c.set({ letterSent: true });
                  c.toast('Wysłano. Urząd ma 14 dni na odpowiedź.');
                },
              })
            }
          >
            Potwierdź
          </button>
          <button className="btn ghost">Edytuj treść</button>
        </div>
      )}
    </div>
  );
}

/* Hop 10: the explanation streams in, so the AI step feels like work, not magic */
export function Letter2(c: Ctx) {
  const [k, setK] = useState(c.s.l2seen ? 4 : 0);
  useEffect(() => {
    if (k >= 4) {
      c.s.l2seen || c.set({ l2seen: true });
      setTimeout(() => window.dispatchEvent(new Event('coach')), 60);
      return;
    }
    const a = setTimeout(() => setK(k + 1), k ? 520 : 900);
    return () => clearTimeout(a);
  }, [k]);
  const F = [
    [
      'Co to znaczy',
      'To nie kara. Urząd chce wiedzieć, dlaczego zmieniłaś zeznanie za 2025 rok i zwrot wzrósł o 1 240 zł.',
    ],
    ['Termin', '7 grudnia 2026 (14 dni od dnia, w którym dostałaś pismo)'],
    ['Co zrobić', 'Wyślij krótkie wyjaśnienie i zaświadczenie o uldze na dziecko.'],
  ];
  return (
    <div>
      <p className="stepk">Wyjaśnienie pisma</p>
      <h1 className="h-l">Urząd skarbowy prosi o wyjaśnienie korekty PIT-37.</h1>
      {k < 4 && (
        <div className="ai-work">
          {I('sparkle', 14)}{' '}
          <span>
            {['Czytam pismo…', 'Szukam przepisu…', 'Sprawdzam termin…', 'Piszę prostym językiem…'][k]}
          </span>
        </div>
      )}
      <div className="list">
        {F.map(([l, v], i) => (
          <div className="field">
            <div className="l">{l}</div>
            {i < k ? (
              <div className="v in">{v}</div>
            ) : (
              <div className="skel">
                <i></i>
                <i></i>
              </div>
            )}
          </div>
        ))}
      </div>
      {k >= 4 && (
        <>
          <div className="msg ai in" style={{ maxWidth: '100%', marginTop: '12px' }}>
            <span className="small">Źródła</span>
            <div className="srcs">
              <span>Ordynacja podatkowa, art. 155</span>
              <span>podatki.gov.pl: korekta zeznania</span>
            </div>
          </div>
          <p className="ai-warn">Asystent może się mylić. To nie jest porada prawna.</p>
        </>
      )}
      <div className="actions">
        <button className="btn" disabled={k < 4} onClick={() => c.go('letter-3')}>
          Przygotuj odpowiedź
        </button>
      </div>
    </div>
  );
}
