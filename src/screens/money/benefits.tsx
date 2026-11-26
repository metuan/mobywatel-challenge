import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Note } from '@/components/ui/note';
import { Caption, Eyebrow, Title } from '@/components/ui/typography';
import { sx } from '@/lib/sx';
import { I } from '@/ui/icons';
import { Hero } from '@/ui/illustrations';
import { GRow, Label, Ring, Row } from '@/ui/primitives';
import type { Ctx } from '@/types';

export function Benefits(c: Ctx) {
  return (
    <div>
      <Hero n="coin" />
      <Title>Świadczenia, które mogą Ci przysługiwać</Title>
      <Note icon="lock" tone="amber">
        Sprawdzamy to tylko za Twoją zgodą, na podstawie danych o rodzinie. Nic nie składamy bez Ciebie.
      </Note>
      <div className="list" style={{ marginTop: '12px' }}>
        <Row
          icon="coin"
          t="800+ na drugie dziecko"
          s="Po urodzeniu Julii"
          right={<Badge>Pasuje</Badge>}
          onClick={() => c.go('baby-1')}
        />
        <Row
          icon="card"
          t="Karta Dużej Rodziny"
          s="Od trojga dzieci"
          right={<Badge>Nie teraz</Badge>}
          onClick={() => {}}
        />
        <Row
          icon="coin"
          t="Ulga na dzieci w PIT"
          s="Przy rozliczeniu za 2026"
          right={<Badge>Pasuje</Badge>}
          onClick={() => {}}
        />
      </div>
    </div>
  );
}

/* Hop 8: 800+ with a payment history and countdown */
export function P800(c: Ctx) {
  const M = ['cze', 'lip', 'sie', 'wrz', 'paź', 'lis', 'gru', 'sty', 'lut', 'mar', 'kwi', 'maj'];
  return (
    <div className="p8">
      <Eyebrow>Świadczenie dla Zosi</Eyebrow>
      <Title>800+</Title>
      <div className="p8-hero">
        <Ring v={26} max={30} size={76} w={4}>
          <b>2</b>
          <small>dni</small>
        </Ring>
        <div>
          <div className="gs">Następna wypłata</div>
          <div className="p8-v">800 zł</div>
          <div className="gs">28 listopada · konto •• 4821</div>
        </div>
      </div>
      <Label t="Wypłaty od czerwca 2026 do maja 2027" />
      <Card className="p8-chart">
        <div className="bars">
          {M.map((m, i) => (
            <span className={i < 5 ? 'paid' : i === 5 ? 'next' : ''}>
              <i style={sx(`--i:${i}`)}></i>
              <small>{m}</small>
            </span>
          ))}
        </div>
        <div className="p8-sum">
          <span>
            <b>4 000 zł</b> wypłacone
          </span>
          <span>5 z 12</span>
        </div>
      </Card>
      {c.s.babyDone ? (
        <>
          <Label t="Julia" />
          <div className="glist">
            <GRow ic="baby" t="Wniosek w ZUS" s="Decyzja do 24 grudnia" v="W toku" />
          </div>
        </>
      ) : (
        <div className="glist" style={{ marginTop: '12px' }}>
          <GRow
            ic="baby"
            t="Urodziło się dziecko?"
            s="Wniosek o 800+ złożysz w pakiecie „Nowe dziecko”"
            onClick={() => c.go('baby-1')}
          />
        </div>
      )}
      <Caption style={{ marginTop: '12px' }}>Nie musisz logować się do ZUS ani do banku.</Caption>
    </div>
  );
}

/* Hop 9: vaccinations as a timeline */
export function Vacc(c: Ctx) {
  const V = [
    ['6 lat', 'MMR, dawka 2', 'Zalecane do 31 grudnia', 'due'],
    ['6 lat', 'DTaP, dawka 5', 'Wykonane 12 września 2026', 'ok'],
    ['6 lat', 'Polio, dawka 4', 'Wykonane 12 września 2026', 'ok'],
    ['14 lat', 'HPV', 'Za 8 lat, przypomnimy', 'later'],
    ['19 lat', 'Td, przypominająca', 'Za 13 lat', 'later'],
  ];
  return (
    <div>
      <Eyebrow>Zosia, 6 lat</Eyebrow>
      <Title>Szczepienia</Title>
      <div className="vt">
        {V.map(([age, t, s, st]) => (
          <div className={'vt-i ' + st}>
            <span className="vt-dot">{st === 'ok' ? I('check', 12) : ''}</span>
            <div className="vt-b">
              <div className="gt">{t}</div>
              <div className="gs">{s}</div>
              {st === 'due' && (
                <button className="pill" style={{ marginTop: '10px' }} onClick={() => c.go('visit-1')}>
                  Umów szczepienie
                </button>
              )}
            </div>
            <span className="vt-age">{age}</span>
          </div>
        ))}
      </div>
      <Caption>Z Internetowego Konta Pacjenta. Oboje rodzice widzą to samo.</Caption>
    </div>
  );
}
