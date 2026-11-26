import { useState } from 'react';
import { I } from '@/ui/icons';
import { Toggle } from '@/ui/primitives';
import type { Ctx } from '@/types';

/* 1 + 3: Karta ratunkowa i identyfikator medyczny */
export function Ice(c: Ctx) {
  const [lock, setLock] = useState(c.s.medLock !== false);
  return (
    <div>
      <p className="stepk">Karta ratunkowa</p>
      <h1 className="h-l">Na wypadek, gdy nie możesz mówić</h1>
      <div className="icecard">
        <div className="ice-h">
          <span className="ice-star">{I('plus', 18)}</span>
          <div>
            <div className="t">Anna Nowicka</div>
            <div className="s">34 lata · 168 cm · 61 kg</div>
          </div>
        </div>
        <div className="ice-g">
          <div>
            <div className="l">Grupa krwi</div>
            <div className="v">A Rh+</div>
          </div>
          <div>
            <div className="l">Alergie</div>
            <div className="v">Penicylina</div>
          </div>
          <div>
            <div className="l">Leki</div>
            <div className="v">Euthyrox 50</div>
          </div>
          <div>
            <div className="l">Choroby</div>
            <div className="v">Niedoczynność tarczycy</div>
          </div>
        </div>
        <div className="ice-c">
          <div className="l">Kontakt w nagłych wypadkach</div>
          <div className="ice-p">
            <span>Tomasz Nowicki · partner</span>
            <span className="mini">{I('phone', 14)} Zadzwoń</span>
          </div>
          <div className="ice-p">
            <span>Stanisław Nowicki · tata</span>
            <span className="mini">{I('phone', 14)} Zadzwoń</span>
          </div>
        </div>
      </div>
      <div className="list" style={{ marginTop: '14px' }}>
        <div className="row">
          <span className="it it-red">{I('lock', 18)}</span>
          <span className="tx">
            <div className="t">Pokaż na ekranie blokady</div>
            <div className="s">Ratownik zobaczy kartę bez odblokowania telefonu</div>
          </span>
          <Toggle
            on={lock}
            label="Pokaż na ekranie blokady"
            set={(v: boolean) => {
              setLock(v);
              c.set({ medLock: v });
            }}
          />
        </div>
        <div className="row">
          <span className="it">{I('wifi', 18)}</span>
          <span className="tx">
            <div className="t">Działa bez internetu</div>
            <div className="s">Zapisana w telefonie, zaszyfrowana</div>
          </span>
        </div>
        <button className="row" onClick={() => c.go('medical-id')}>
          <span className="it">{I('eye', 18)}</span>
          <span className="tx">
            <div className="t">Zobacz, co widzi ratownik</div>
          </span>
          <span className="chev">{I('chevron', 18)}</span>
        </button>
      </div>
      <p className="tiny" style={{ marginTop: '12px' }}>
        Alergie i leki pobieramy z Internetowego Konta Pacjenta za Twoją zgodą. Grupę krwi i kontakty
        wpisujesz sama.
      </p>
    </div>
  );
}

export function MedicalId(c: Ctx) {
  return (
    <div className="lock medlock" role="region" aria-label="Ekran blokady: identyfikator medyczny">
      <div className="lk-top">
        <div className="lk-date" style={{ marginTop: '6px' }}>
          Ekran blokady · widok ratownika
        </div>
      </div>
      <div className="med">
        <div className="med-h">
          <span className="ice-star" style={{ background: '#ff3b30' }}>
            {I('plus', 16)}
          </span>
          <b>Identyfikator medyczny</b>
        </div>
        <div className="med-n">Anna Nowicka, 34</div>
        <div className="med-r">
          <span>Grupa krwi</span>
          <b>A Rh+</b>
        </div>
        <div className="med-r">
          <span>Alergie</span>
          <b>Penicylina</b>
        </div>
        <div className="med-r">
          <span>Leki</span>
          <b>Euthyrox 50</b>
        </div>
        <div className="med-r">
          <span>Kontakt</span>
          <b>Tomasz · 600 123 456</b>
        </div>
        <div className="med-f">Dane bez PESEL i adresu. Udostępnione przez właścicielkę telefonu.</div>
      </div>
      <div style={{ flex: '1' }}></div>
      <div className="lk-foot">
        <button className="lk-btn" onClick={c.back}>
          {I('left', 15)} Wróć do karty
        </button>
        <button className="lk-btn" style={{ background: '#ff3b30' }}>
          {I('phone', 15)} 112
        </button>
      </div>
    </div>
  );
}
