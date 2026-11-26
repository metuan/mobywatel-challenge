import { Field, FieldLabel, FieldSource, FieldValue } from '@/components/ui/field';
import {
  List,
  ListRow,
  ListRowAvatar,
  ListRowChevron,
  ListRowContent,
  ListRowDescription,
  ListRowTile,
  ListRowTitle,
} from '@/components/ui/list';
import { Badge } from '@/components/ui/badge';
import { Note } from '@/components/ui/note';
import { Caption, Lead, Title } from '@/components/ui/typography';
import { Actions, Button } from '@/components/ui/button';
import { Fragment, useState } from 'react';
import { Icon } from '@/ui/icons';
import { Sec } from '@/ui/primitives';
import type { Ctx } from '@/types';
import { stashBox } from '@/lib/morph';

export function AlertRed(c: Ctx) {
  return (
    <div
      className="absolute inset-0 z-30 flex flex-col p-[58px_14px_22px] text-white overflow-y-auto [background:#0f1012] [&.clear]:[background:#0f1012]"
      role="alertdialog"
      aria-label="Alert RCB"
    >
      <div className="text-center leading-none m-[8px_0_4px] opacity-[0.95] text-[72px] font-sans font-semibold tracking-[-0.02em]">
        15:42
      </div>
      <div className="text-center text-[14px] opacity-[0.7] mb-4.5">wtorek, 24 listopada</div>
      <div className="rcb">
        <div className="hd [.rcb_&]:flex [.rcb_&]:items-center [.rcb_&]:gap-2 [.rcb_&]:text-[12.5px] [.rcb_&]:font-semibold [.rcb_&]:tracking-[0.02em]">
          <span className="[.road_&]:[border-bottom:1px_solid_var(--hair)] [.road_&]:p-[13px_0] [.rcb_.hd_&]:w-5.5 [.rcb_.hd_&]:h-5.5 [.rcb_.hd_&]:rounded-[6px] [.rcb_.hd_&]:text-white [.rcb_.hd_&]:grid [.rcb_.hd_&]:place-items-center [.rcb.clear_.hd_&]:bg-green [.rcb_.hd_&]:[background:rgb(255_255_255_/_20%)]">
            <Icon name="bell" size={14} />
          </span>
          ALERT RCB · ALERT EKSTREMALNY
          <span className="[.rcb_.hd_&]:ml-auto [.rcb_.hd_&]:font-medium [.rcb_.hd_&]:[color:rgb(255_255_255_/_82%)]">
            teraz
          </span>
        </div>
        <div className="[.rcb_&]:font-bold [.rcb_&]:m-[8px_0_2px] [.rcb_&]:text-[15.5px]">
          Alarm powietrzny: Kraków
        </div>
        <div className="[.rcb_&]:text-[14.5px] [.rcb_&]:leading-[1.4]">
          Alert RCB! Alarm powietrzny w Krakowie. Idź do najbliższego schronu albo ukrycia. Słuchaj poleceń
          służb.
        </div>
        <div className="[.rcb_&]:flex [.rcb_&]:gap-1.5 [.rcb_&]:items-center [.rcb_&]:text-[12px] [.rcb_&]:mt-2 [.rcb_&]:font-medium [.rcb_&]:[color:rgb(255_255_255_/_92%)]">
          <Icon name="check" size={14} /> Telefon sprawdził, że to prawdziwy alert RCB
        </div>
      </div>
      <div className="rcb-app bg-white text-ink p-[6px_0] mt-2.5 motion-safe:animate-[fade-up_0.5s_0.25s_var(--ease-out)_both] rounded-2xl">
        <div className="[.rcb-app_&]:flex [.rcb-app_&]:gap-2 [.rcb-app_&]:items-center [.rcb-app_&]:text-[12px] [.rcb-app_&]:text-ink-2 [.rcb-app_&]:p-[8px_16px_2px] flex justify-between items-center [&_button]:inline-flex [&_button]:items-center [&_button]:gap-0.5 [&_button]:text-ink [&_button]:font-medium [&_button]:text-[14px] text-[13px] tracking-[-0.003em] m-[36px_4px_10px] text-ink-2 font-medium">
          <span className="w-4 h-2.75 rounded-[3px] mr-2 [background:linear-gradient(#fff_50%,_var(--red)_50%)] [box-shadow:0_0_0_0.5px_rgb(11_13_18_/_22%)] inline-block flex-none [.d-rp_&]:w-3.5 [.d-rp_&]:h-2.5 [.d-rp_&]:mr-1.75 [.d-rp_&]:[box-shadow:none]"></span>
          mObywatel dodaje do tego alertu
        </div>
        <ListRow as="button" onClick={() => c.go('alert-shelter')}>
          <ListRowTile className="[background:var(--tile)]">
            <Icon name="route" size={20} />
          </ListRowTile>
          <ListRowContent>
            <ListRowTitle>Schronienie: ul. Dekerta 24</ListRowTitle>
            <ListRowDescription>240 m · 3 min pieszo · trasa działa bez internetu</ListRowDescription>
          </ListRowContent>
          <ListRowChevron size={18} />
        </ListRow>
        <ListRow as="button" onClick={() => c.go('family-map')}>
          <ListRowTile className="[background:var(--tile)]">
            <Icon name="people" size={20} />
          </ListRowTile>
          <ListRowContent>
            <ListRowTitle>Rodzina</ListRowTitle>
            <ListRowDescription>Zosia: przedszkole w schronie · Tata: poza strefą alarmu</ListRowDescription>
          </ListRowContent>
          <ListRowChevron size={18} />
        </ListRow>
      </div>
      <div className="flex-1 min-h-3.5"></div>
      <Actions className="mt-3">
        <Button
          variant="inverse"
          onClick={() => {
            stashBox('shelter', document.querySelector('.phone .rcb-app'));
            c.go('alert-watch');
          }}
        >
          <Icon name="route" size={18} /> Prowadź do schronienia
        </Button>
        <Button variant="inverseSecondary" onClick={() => c.go('alert-guide')}>
          <Icon name="speaker" size={18} /> Co robić teraz (odczytaj)
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
      <Badge className="mt-2">Alert RCB trwa · Kraków</Badge>
      <Title>Idź do schronienia przy ul. Dekerta 24</Title>
      <div className="overflow-hidden [border:0] rounded-[22px]! [box-shadow:none]! bg-white">
        {ShelterMap()}
      </div>
      <List className="mt-3">
        <Field>
          <FieldLabel>Odległość</FieldLabel>
          <FieldValue>240 m · około 3 minuty pieszo</FieldValue>
        </Field>
        <Field>
          <FieldLabel>Typ</FieldLabel>
          <FieldValue>Schron, dla 180 osób, czynny całą dobę</FieldValue>
          <FieldSource>
            <Icon name="check" size={12} /> Źródło: lista „Gdzie się ukryć”, Państwowa Straż Pożarna
          </FieldSource>
        </Field>
        <Field>
          <FieldLabel>Gdy nie zdążysz</FieldLabel>
          <FieldValue>Korytarz bez okien, z dwiema ścianami między Tobą a ulicą</FieldValue>
        </Field>
      </List>
      <Note icon="wifi" className="mt-3">
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
      <Badge className="mt-2">Alert RCB trwa</Badge>
      <Title>Co robić teraz</Title>
      <Lead>Zasady z poradnika RCB. Alarm to syrena, której dźwięk rośnie i opada przez 3 minuty.</Lead>
      <button
        className="flex gap-2.5 items-center justify-center bg-ink text-white rounded-[999px] p-4.5 text-[18px] font-medium w-full"
        onClick={() => setReading(!reading)}
      >
        <Icon name={reading ? 'pause' : 'speaker'} size={22} />{' '}
        {reading ? 'Zatrzymaj odczyt' : 'Odczytaj na głos'}
      </button>
      <div className="road grid grid-cols-[auto_1fr] gap-[0_16px] [&_.n]:text-ink-3 [&_.n]:pt-3 [&_.n]:font-sans [&_.n]:font-bold [&_.n]:text-[20px] mt-2.5">
        {[
          'Zostań w schronieniu do odwołania alarmu.',
          'Trzymaj się z dala od okien i drzwi zewnętrznych.',
          'Nie dzwoń bez potrzeby. Sieć jest potrzebna służbom.',
          'Wyślij rodzinie status „Jestem bezpieczna”. Dojdzie nawet przy słabym zasięgu.',
          'Słuchaj komunikatów w aplikacji i w radiu.',
        ].map((t, i) => (
          <Fragment key={t}>
            <div className="n">{i + 1}</div>
            <div className="[.road_&]:[border-bottom:1px_solid_var(--hair)] [.road_&]:p-[13px_0] [.rcb_.hd_&]:w-5.5 [.rcb_.hd_&]:h-5.5 [.rcb_.hd_&]:rounded-[6px] [.rcb_.hd_&]:text-white [.rcb_.hd_&]:grid [.rcb_.hd_&]:place-items-center [.rcb.clear_.hd_&]:bg-green [.rcb_.hd_&]:[background:rgb(255_255_255_/_20%)]">
              {t}
            </div>
          </Fragment>
        ))}
      </div>
      <Actions>
        <Button onClick={() => c.go('alert-safe')}>
          <Icon name="heart" size={18} /> Jestem bezpieczna
        </Button>
        <Button variant="secondary" onClick={() => c.go('alert-clear')}>
          Pokaż odwołanie alarmu (demo)
        </Button>
      </Actions>
    </div>
  );
}

export function AlertClear(c: Ctx) {
  return (
    <div
      className="absolute inset-0 z-30 flex flex-col p-[58px_14px_22px] text-white overflow-y-auto [background:#0f1012] [&.clear]:[background:#0f1012] clear [&.rcb]:border-t-green [&.rcb]:bg-[#1f2a24]"
      role="alertdialog"
      aria-label="Odwołanie alarmu"
    >
      <div className="text-center leading-none m-[8px_0_4px] opacity-[0.95] text-[72px] font-sans font-semibold tracking-[-0.02em]">
        16:21
      </div>
      <div className="text-center text-[14px] opacity-[0.7] mb-4.5">wtorek, 24 listopada</div>
      <div className="rcb clear [&.rcb]:border-t-green [&.rcb]:bg-[#1f2a24]">
        <div className="hd [.rcb_&]:flex [.rcb_&]:items-center [.rcb_&]:gap-2 [.rcb_&]:text-[12.5px] [.rcb_&]:font-semibold [.rcb_&]:tracking-[0.02em]">
          <span className="[.road_&]:[border-bottom:1px_solid_var(--hair)] [.road_&]:p-[13px_0] [.rcb_.hd_&]:w-5.5 [.rcb_.hd_&]:h-5.5 [.rcb_.hd_&]:rounded-[6px] [.rcb_.hd_&]:text-white [.rcb_.hd_&]:grid [.rcb_.hd_&]:place-items-center [.rcb.clear_.hd_&]:bg-green [.rcb_.hd_&]:[background:rgb(255_255_255_/_20%)]">
            <Icon name="check" size={14} />
          </span>
          ALERT RCB
          <span className="[.rcb_.hd_&]:ml-auto [.rcb_.hd_&]:font-medium [.rcb_.hd_&]:[color:rgb(255_255_255_/_82%)]">
            teraz
          </span>
        </div>
        <div className="[.rcb_&]:font-bold [.rcb_&]:m-[8px_0_2px] [.rcb_&]:text-[15.5px]">
          Odwołanie alarmu: Kraków
        </div>
        <div className="[.rcb_&]:text-[14.5px] [.rcb_&]:leading-[1.4]">
          Alert RCB! Odwołano alarm powietrzny dla miasta Kraków. Ulica Kamieńskiego pozostaje zamknięta do
          odwołania.
        </div>
        <div className="[.rcb_&]:flex [.rcb_&]:gap-1.5 [.rcb_&]:items-center [.rcb_&]:text-[12px] [.rcb_&]:mt-2 [.rcb_&]:font-medium [.rcb_&]:[color:rgb(255_255_255_/_92%)]">
          <Icon name="check" size={14} /> Telefon sprawdził, że to prawdziwy alert RCB
        </div>
      </div>
      <div className="rcb-app bg-white text-ink p-[6px_0] mt-2.5 motion-safe:animate-[fade-up_0.5s_0.25s_var(--ease-out)_both] rounded-2xl">
        <div className="[.rcb-app_&]:flex [.rcb-app_&]:gap-2 [.rcb-app_&]:items-center [.rcb-app_&]:text-[12px] [.rcb-app_&]:text-ink-2 [.rcb-app_&]:p-[8px_16px_2px] flex justify-between items-center [&_button]:inline-flex [&_button]:items-center [&_button]:gap-0.5 [&_button]:text-ink [&_button]:font-medium [&_button]:text-[14px] text-[13px] tracking-[-0.003em] m-[36px_4px_10px] text-ink-2 font-medium">
          <span className="w-4 h-2.75 rounded-[3px] mr-2 [background:linear-gradient(#fff_50%,_var(--red)_50%)] [box-shadow:0_0_0_0.5px_rgb(11_13_18_/_22%)] inline-block flex-none [.d-rp_&]:w-3.5 [.d-rp_&]:h-2.5 [.d-rp_&]:mr-1.75 [.d-rp_&]:[box-shadow:none]"></span>
          Twoja rodzina
        </div>
        <ListRow>
          <ListRowContent>
            <ListRowTitle>Tomasz, Zosia</ListRowTitle>
            <ListRowDescription>Bezpieczni</ListRowDescription>
          </ListRowContent>
          <Badge>OK</Badge>
        </ListRow>
        <ListRow>
          <ListRowContent>
            <ListRowTitle>Tata</ListRowTitle>
            <ListRowDescription>Brak odpowiedzi od 15:42</ListRowDescription>
          </ListRowContent>
          <Badge>Sprawdź</Badge>
        </ListRow>
      </div>
      <div className="flex-1 min-h-3.5"></div>
      <Actions className="mt-3">
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
        <Actions className="mt-1.5">
          <Button variant="success" onClick={send}>
            <Icon name="check" size={22} /> Jestem bezpieczna
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
      <List>
        <ListRow>
          <ListRowAvatar>AN</ListRowAvatar>
          <ListRowContent>
            <ListRowTitle>Ty</ListRowTitle>
            <ListRowDescription>
              {sent ? 'Bezpieczna, schron Dekerta 24, 15:49' : 'Nie wysłano'}
            </ListRowDescription>
          </ListRowContent>
          {sent ? <Badge>Bezpieczna</Badge> : <Badge>—</Badge>}
        </ListRow>
        <ListRow>
          <ListRowAvatar>TN</ListRowAvatar>
          <ListRowContent>
            <ListRowTitle>Tomasz</ListRowTitle>
            <ListRowDescription>Bezpieczny, Katowice, 15:46</ListRowDescription>
          </ListRowContent>
          <Badge>Bezpieczny</Badge>
        </ListRow>
        <ListRow>
          <ListRowAvatar>ZN</ListRowAvatar>
          <ListRowContent>
            <ListRowTitle>Zosia</ListRowTitle>
            <ListRowDescription>Przedszkole nr 12: dzieci w schronie, 15:45</ListRowDescription>
          </ListRowContent>
          <Badge>Bezpieczna</Badge>
        </ListRow>
        <ListRow>
          <ListRowAvatar>SN</ListRowAvatar>
          <ListRowContent>
            <ListRowTitle>Tata</ListRowTitle>
            <ListRowDescription>Brak odpowiedzi od 15:42</ListRowDescription>
          </ListRowContent>
          <button
            className="mini inline-flex gap-1.5 items-center whitespace-nowrap motion-safe:[&:active]:transform-[scale(0.97)] font-semibold text-[15px] p-[6px_14px] bg-fill text-ink rounded-[999px]"
            onClick={() => c.go('easy-call')}
          >
            <Icon name="phone" size={14} /> Zadzwoń
          </button>
        </ListRow>
      </List>
      <Caption className="mt-3">Status widzą tylko osoby z Twojej rodziny. Znika po 72 godzinach.</Caption>
    </div>
  );
}
