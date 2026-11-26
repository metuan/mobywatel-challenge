import { cn } from '@/lib/utils';
import {
  List,
  ListRow,
  ListRowAvatar,
  ListRowContent,
  ListRowIcon,
  ListRowTitle,
} from '@/components/ui/list';
import { Badge } from '@/components/ui/badge';
import { Note } from '@/components/ui/note';
import { Caption, Muted, Subtitle } from '@/components/ui/typography';
import { Actions, Button } from '@/components/ui/button';
import { I } from '@/ui/icons';
import { Row, Sec } from '@/ui/primitives';
import type { Ctx } from '@/types';

export function MemberZosia(c: Ctx) {
  return (
    <div>
      <div className="flex gap-3 items-center mt-2">
        <ListRowAvatar className="size-[52px]">ZN</ListRowAvatar>
        <div>
          <Subtitle as="h1">Zofia Nowicka</Subtitle>
          <Muted>6 lat, PESEL 200307•••••</Muted>
        </div>
      </div>
      <Sec t="Dokumenty" />
      <List>
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
      </List>
      <Sec t="Szkoła" />
      <List>
        <Row
          icon="list"
          t="Frekwencja, usprawiedliwienia, zgody"
          s={c.s.excused ? 'Wszystko załatwione' : '1 nieobecność do usprawiedliwienia'}
          onClick={() => c.go('school')}
        />
      </List>
      <Sec t="Zdrowie" />
      <List>
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
      </List>
      <Sec t="Świadczenia" />
      <List>
        <Row icon="coin" t="800+" s="Wypłata 28 listopada" onClick={() => c.go('p800')} />
      </List>
      <Caption className="mt-3.5">Widzą: Ty i Tomasz (oboje rodzice).</Caption>
    </div>
  );
}

export function MemberTata(c: Ctx) {
  return (
    <div>
      <div className="flex gap-3 items-center mt-2">
        <ListRowAvatar className="size-[52px]">SN</ListRowAvatar>
        <div>
          <Subtitle as="h1">Stanisław Nowicki</Subtitle>
          <Muted>Tata, 71 lat, Sandomierz</Muted>
        </div>
      </div>
      <Note icon="check" tone="green" className="mt-4">
        Tata zatwierdził Twój dostęp 24 listopada 2026, w trybie prostym na swoim telefonie. Może go cofnąć w
        każdej chwili.
      </Note>
      <Sec t="Możesz" />
      <List>
        {[
          ['Widzieć jego terminy', true],
          ['Czytać pisma z urzędów', true],
          ['Przygotowywać wnioski do jego zatwierdzenia', true],
          ['Widzieć dane o zdrowiu', false],
          ['Wysyłać wnioski bez jego zgody', false],
        ].map(([t, on]) => (
          <ListRow key={String(t)}>
            <ListRowIcon className={cn(on && 'bg-green-soft text-green')}>
              {I(on ? 'check' : 'x', 18)}
            </ListRowIcon>
            <ListRowContent>
              <ListRowTitle>{t}</ListRowTitle>
            </ListRowContent>
          </ListRow>
        ))}
      </List>
      <Sec t="Terminy taty" />
      <List>
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
      </List>
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
      <div className="flex gap-3 items-center mt-2">
        <ListRowAvatar className="size-[52px]">TN</ListRowAvatar>
        <div>
          <Subtitle as="h1">Tomasz Nowicki</Subtitle>
          <Muted>Partner</Muted>
        </div>
      </div>
      <Sec t="Wspólne" />
      <List>
        {[
          'Terminy rodziny',
          'Sprawy dzieci, jako drugi rodzic',
          'Plan kryzysowy i status „Jestem bezpieczna”',
        ].map(t => (
          <ListRow key={t}>
            <ListRowIcon className="bg-green-soft text-green">{I('check', 18)}</ListRowIcon>
            <ListRowContent>
              <ListRowTitle>{t}</ListRowTitle>
            </ListRowContent>
          </ListRow>
        ))}
      </List>
      <Muted as="p" className="mt-3">
        Każdy z Was zachowuje własne dokumenty, finanse i zdrowie. Nie są wspólne.
      </Muted>
    </div>
  );
}
