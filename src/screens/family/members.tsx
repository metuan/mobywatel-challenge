import { Badge } from '@/components/ui/badge';
import { Note } from '@/components/ui/note';
import { Caption, Muted, Subtitle } from '@/components/ui/typography';
import { Actions, Button } from '@/components/ui/button';
import { sx } from '@/lib/sx';
import { I } from '@/ui/icons';
import { Row, Sec } from '@/ui/primitives';
import type { Ctx } from '@/types';

export function MemberZosia(c: Ctx) {
  return (
    <div>
      <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginTop: '8px' }}>
        <span className="face-i" style={{ background: '#a8650a', width: '52px', height: '52px' }}>
          ZN
        </span>
        <div>
          <Subtitle as="h1">Zofia Nowicka</Subtitle>
          <Muted>6 lat, PESEL 200307•••••</Muted>
        </div>
      </div>
      <Sec t="Dokumenty" />
      <div className="list">
        <Row
          icon="card"
          t="Paszport"
          s="Ważny do 4 stycznia 2027"
          right={<Badge>41 dni</Badge>}
          onClick={() => c.go('renew-pass')}
        />
        <Row
          icon="card"
          t="Legitymacja szkolna"
          s="Szkoła Podstawowa nr 9, zerówka"
          onClick={() => c.go('school')}
        />
      </div>
      <Sec t="Szkoła" />
      <div className="list">
        <Row
          icon="list"
          t="Frekwencja, usprawiedliwienia, zgody"
          s={c.s.excused ? 'Wszystko załatwione' : '1 nieobecność do usprawiedliwienia'}
          onClick={() => c.go('school')}
        />
      </div>
      <Sec t="Zdrowie" />
      <div className="list">
        <Row
          icon="steth"
          t="e-Skierowanie: kardiolog"
          s={c.s.visit ? 'Wizyta: ' + c.s.visit : 'Zarezerwuj wizytę'}
          onClick={() => c.go(c.s.visit ? 'visit-4' : 'visit-1')}
          right={c.s.visit ? <Badge>Umówiona</Badge> : undefined}
        />
        <Row icon="heart" t="Szczepienia" s="1 zalecane do końca roku" onClick={() => c.go('vacc')} />
        <Row
          icon="doc"
          t="e-Recepta: Nurofen dla dzieci"
          s="Kod 4821, ważna do 21 grudnia"
          onClick={() => {}}
        />
      </div>
      <Sec t="Świadczenia" />
      <div className="list">
        <Row icon="coin" t="800+" s="Wypłata 28 listopada" onClick={() => c.go('p800')} />
      </div>
      <Caption style={{ marginTop: '14px' }}>Widzą: Ty i Tomasz (oboje rodzice).</Caption>
    </div>
  );
}

export function MemberTata(c: Ctx) {
  return (
    <div>
      <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginTop: '8px' }}>
        <span className="face-i" style={{ background: '#1c7a4c', width: '52px', height: '52px' }}>
          SN
        </span>
        <div>
          <Subtitle as="h1">Stanisław Nowicki</Subtitle>
          <Muted>Tata, 71 lat, Sandomierz</Muted>
        </div>
      </div>
      <Note icon="check" tone="green" style={{ marginTop: '16px' }}>
        Tata zatwierdził Twój dostęp 24 listopada 2026, w trybie prostym na swoim telefonie. Może go cofnąć w
        każdej chwili.
      </Note>
      <Sec t="Możesz" />
      <div className="list">
        {[
          ['Widzieć jego terminy', true],
          ['Czytać pisma z urzędów', true],
          ['Przygotowywać wnioski do jego zatwierdzenia', true],
          ['Widzieć dane o zdrowiu', false],
          ['Wysyłać wnioski bez jego zgody', false],
        ].map(([t, on]) => (
          <div className="row">
            <span className="ic" style={sx(on ? 'background:var(--green-soft);color:var(--green)' : '')}>
              {I(on ? 'check' : 'x', 18)}
            </span>
            <span className="tx">
              <div className="t">{t}</div>
            </span>
          </div>
        ))}
      </div>
      <Sec t="Terminy taty" />
      <div className="list">
        <Row
          icon="card"
          t="Dowód osobisty"
          s="Ważny do 26 stycznia 2027"
          right={<Badge>63 dni</Badge>}
          onClick={() => c.toast('Przygotowałaś wniosek o nowy dowód. Tata zatwierdzi go u siebie.')}
        />
        <Row
          icon="doc"
          t="Legitymacja emeryta"
          s="Bezterminowa"
          right={<Badge>Ważna</Badge>}
          onClick={() => {}}
        />
      </div>
      <Actions>
        <Button variant="secondary" onClick={() => c.go('easy-approve')}>
          Zobacz, jak tata to zatwierdził
        </Button>
      </Actions>
    </div>
  );
}

export function MemberTomasz(_c: Ctx) {
  return (
    <div>
      <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginTop: '8px' }}>
        <span className="face-i" style={{ background: '#3d5a80', width: '52px', height: '52px' }}>
          TN
        </span>
        <div>
          <Subtitle as="h1">Tomasz Nowicki</Subtitle>
          <Muted>Partner</Muted>
        </div>
      </div>
      <Sec t="Wspólne" />
      <div className="list">
        {[
          'Terminy rodziny',
          'Sprawy dzieci, jako drugi rodzic',
          'Plan kryzysowy i status „Jestem bezpieczna”',
        ].map(t => (
          <div className="row">
            <span className="ic" style={{ background: 'var(--green-soft)', color: 'var(--green)' }}>
              {I('check', 18)}
            </span>
            <span className="tx">
              <div className="t">{t}</div>
            </span>
          </div>
        ))}
      </div>
      <Muted as="p" style={{ marginTop: '12px' }}>
        Każdy z Was zachowuje własne dokumenty, finanse i zdrowie. Nie są wspólne.
      </Muted>
    </div>
  );
}
