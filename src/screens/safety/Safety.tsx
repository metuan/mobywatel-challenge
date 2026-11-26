import { cn } from '@/lib/utils';
import { Field, FieldLabel, FieldValue } from '@/components/ui/field';
import {
  List,
  ListItemContent,
  ListItemDescription,
  ListItemTitle,
  ListRow,
  ListRowContent,
  ListRowDescription,
  ListRowIcon,
  ListRowTitle,
} from '@/components/ui/list';
import { Badge } from '@/components/ui/badge';
import { Display, Lead, Title } from '@/components/ui/typography';
import { Actions, Button } from '@/components/ui/button';
import { useState } from 'react';
import { I } from '@/ui/icons';
import { Av, GRow, Label, Sec, Toggle } from '@/ui/primitives';
import type { Ctx } from '@/types';
import type { IconName } from '@/ui/icons';

export function Plan(_c: Ctx) {
  return (
    <div>
      <Title>Plan rodziny na sytuację kryzysową</Title>
      <Lead>Ustalony razem z Tomaszem. Działa bez internetu.</Lead>
      <List>
        <Field>
          <FieldLabel>Miejsce spotkania 1</FieldLabel>
          <FieldValue>Schron, ul. Dekerta 24 (240 m od domu)</FieldValue>
        </Field>
        <Field>
          <FieldLabel>Miejsce spotkania 2</FieldLabel>
          <FieldValue>Szkoła Podstawowa nr 34, ul. Kalwaryjska</FieldValue>
        </Field>
        <Field>
          <FieldLabel>Kto odbiera Zosię z przedszkola</FieldLabel>
          <FieldValue>Tomasz, a jeśli nie odpowiada: Anna</FieldValue>
        </Field>
        <Field>
          <FieldLabel>Kolejność kontaktu</FieldLabel>
          <FieldValue>Anna, Tomasz, tata, sąsiadka p. Ewa</FieldValue>
        </Field>
        <Field>
          <FieldLabel>Leki</FieldLabel>
          <FieldValue>Tata: leki na ciśnienie, zapas na 7 dni</FieldValue>
        </Field>
      </List>
      <Sec t="Plecak ewakuacyjny" />
      <List>
        {[
          ['Woda, 2 l na osobę na dzień', true],
          ['Latarka i baterie', true],
          ['Powerbank', false],
          ['Kopie dokumentów', true],
          ['Apteczka', false],
        ].map(([t, on]) => (
          <ListRow>
            <ListRowIcon className={cn(on && 'bg-green-soft text-green')}>
              {on ? I('check', 18) : ''}
            </ListRowIcon>
            <ListRowContent>
              <ListRowTitle>{t}</ListRowTitle>
            </ListRowContent>
            {!on && <Badge>Brakuje</Badge>}
          </ListRow>
        ))}
      </List>
    </div>
  );
}

export function Places(_c: Ctx) {
  return (
    <div>
      <Title>Obserwowane miejsca</Title>
      <Lead>
        Alerty dla Twojej lokalizacji przychodzą zawsze. Alerty dla tych miejsc są oznaczone ich nazwą, żeby
        ich nie pomylić.
      </Lead>
      <List>
        {[
          ['Sandomierz', 'Tata, ul. Mickiewicza'],
          ['Przedszkole nr 12, Kraków', 'Zosia'],
          ['Biuro Tomasza, Katowice', 'Tomasz'],
        ].map(([t, s]) => (
          <ListRow>
            <ListRowIcon>{I('pin')}</ListRowIcon>
            <ListRowContent>
              <ListRowTitle>{t}</ListRowTitle>
              <ListRowDescription>{s}</ListRowDescription>
            </ListRowContent>
            <Toggle on={true} set={() => {}} label={t} />
          </ListRow>
        ))}
      </List>
      <Actions>
        <Button variant="secondary">{I('plus', 18)} Dodaj miejsce</Button>
      </Actions>
    </div>
  );
}

export function Safety(c: Ctx) {
  const [flood, setFlood] = useState(false);
  const alarm = () => {
    setFlood(true);
    setTimeout(() => c.go('lock'), 650);
  };
  return (
    <div>
      <Display>Ochrona</Display>
      <div className={'status' + (flood ? ' flood [&.status]:text-white' : '')}>
        <div className="flex items-center gap-2 text-[12px] font-semibold text-ink-3 [.status.flood_&]:[color:rgb(255_255_255_/_85%)] [.st-ab_.on_&&]:text-ink">
          <span className="w-2 h-2 rounded-[50%] [box-shadow:0_0_0_0_rgb(52_199_89_/_60%)] motion-safe:animate-[ping-g_1.8s_ease-out_infinite] bg-green"></span>
          Połączono z RCB · 15:40
        </div>
        <div className="leading-9 font-[650] mt-3.5 text-[34px] tracking-[-0.035em]">Kraków</div>
        <div className="text-[17px] font-semibold text-ink-2 tracking-[-0.015em] [.status.flood_&]:[color:rgb(255_255_255_/_85%)]">
          {flood ? 'Alarm, idź do schronu' : 'Spokojnie'}
        </div>
        <div className="[border-top:1px_solid_var(--hair)] mt-4 pt-1 [.status.flood_&]:[border-color:rgb(255_255_255_/_20%)]">
          {[
            ['A', 'Ty', 'Kraków, Podgórze', 'ok'],
            ['Z', 'Zosia', 'Przedszkole nr 12', 'ok'],
            ['S', 'Tata', 'Sandomierz', 'warn'],
          ].map(([i, n, p, st]) => (
            <button
              className="flex gap-3 items-center w-full p-[8px_0] text-left text-[16px] leading-6.25 text-ink m-0 max-w-[34em] text-pretty motion-safe:[.story_&]:animate-[rise_0.5s_var(--out)_0.05s_both] [.sheet_&]:text-[15px] [.sheet_&]:leading-5.5"
              onClick={() => c.go('family-map')}
            >
              <Av i={i} size={28} />
              <ListItemContent>
                <ListItemTitle className="text-[15px]/[22px]">{n}</ListItemTitle>
                <ListItemDescription className="text-[13px]/[19px] in-[.flood]:text-white/85">
                  {p}
                </ListItemDescription>
              </ListItemContent>
              <i className={'w-2 h-2 rounded-[50%] flex-none bg-green [&.warn]:bg-amber ' + st}></i>
            </button>
          ))}
        </div>
        <div className="flex gap-2.5 items-baseline text-[13px] text-ink-2 [border-top:1px_solid_var(--hair)] pt-3 mt-1.5 [.status.flood_&]:[color:rgb(255_255_255_/_85%)] [.status.flood_&]:[border-color:rgb(255_255_255_/_20%)]">
          <i className="w-2 h-2 rounded-[50%] flex-none bg-green [&.warn]:bg-amber warn"></i>
          Sandomierz: wiatr do 90 km/h od 20:00 (IMGW, 2. stopień)
        </div>
        <i className="absolute inset-0 bg-red z-[-1] [clip-path:circle(0_at_26px_26px)] [transition:clip-path_0.48s_var(--out)] [.status.flood_&]:[clip-path:circle(150%_at_26px_26px)]"></i>
      </div>
      <button
        className="pill whitespace-nowrap h-13 rounded-[999px] bg-ink text-white text-[16px] font-semibold p-[0_22px] inline-flex items-center justify-center gap-2 [border:0] [box-shadow:none] [.attn-act_&]:text-[14px] [.attn-act_&]:p-[0_16px] [.attn-act_&]:h-9.5 [.st-nav_&]:h-11 [.st-nav_&]:text-[15px] [.st-nav_&]:p-[0_18px] [.st-nav_&:disabled]:opacity-[0.35] [.tour-btns_&]:h-11.5 [.tour-btns_&]:text-[15px] [@media(max-width:640px)]:[.tour-btns_&]:h-11 [@media(max-width:640px)]:[.tour-btns_&]:p-[0_16px] motion-safe:[transition:transform_0.16s_var(--ease-out),_background-color_0.15s_ease,_box-shadow_0.2s_ease] motion-safe:[&:active]:transform-[scale(0.97)] motion-safe:[&:active]:[transition-duration:0.1s] [.st-nav_&.ready]:[outline:2px_solid_var(--signal-blue)] [.st-nav_&.ready]:outline-offset-[3px] [.st-nav_&.ready]:[box-shadow:0_0_0_6px_rgb(47_107_255_/_18%)] motion-safe:[.st-nav_&.ready]:animate-[coach_1.6s_var(--out)_infinite]! [.w2-acts_&]:flex-1 [.w2-acts_&]:justify-center motion-safe:[.st-nav_&.ready]:[animation-iteration-count:3]! wide [&.pill]:w-full mt-3"
        onClick={alarm}
      >
        Zobacz, jak przychodzi Alert RCB
      </button>
      <div className="grid grid-cols-[1fr_1fr] mt-3 gap-2.5">
        <button
          className="motion-safe:[&:active]:duration-[0.12s] relative bg-white rounded-[22px] flex flex-col text-left text-ink p-[16px_16px_15px] min-h-34.5 [transition:background-color_0.12s,_transform_0.16s_var(--out)] [&:active]:transform-[scale(0.97)]"
          onClick={() => c.go('alert-shelter')}
        >
          <span className="text-[12px] font-medium pr-6.5 leading-4 text-ink-2">Najbliższy schron</span>
          <span className="absolute top-3.5 right-3.5 grid text-ink-3">{I('route', 20)}</span>
          <span className="font-semibold [font-variant-numeric:tabular-nums] mt-auto text-[30px] leading-8 tracking-[-0.035em] [&_small]:text-[14px] [&_small]:font-medium [&_small]:text-ink-2 [&_small]:tracking-[-0.01em]">
            240 m
          </span>
          <span className="text-[13px] text-ink-2 mt-0.75 leading-4.25">Dekerta 24 · 3 min pieszo</span>
        </button>
        <button
          className="motion-safe:[&:active]:duration-[0.12s] relative bg-white rounded-[22px] flex flex-col text-left text-ink p-[16px_16px_15px] min-h-34.5 [transition:background-color_0.12s,_transform_0.16s_var(--out)] [&:active]:transform-[scale(0.97)]"
          onClick={() => c.go('ice')}
        >
          <span className="text-[12px] font-medium pr-6.5 leading-4 text-ink-2">Karta ratunkowa</span>
          <span className="absolute top-3.5 right-3.5 grid text-ink-3">{I('heart', 20)}</span>
          <span className="font-semibold [font-variant-numeric:tabular-nums] mt-auto leading-8 tracking-[-0.035em] [&_small]:font-medium [&_small]:text-ink-2 [&_small]:tracking-[-0.01em] text-[22px]">
            A Rh+
          </span>
          <span className="text-[13px] text-ink-2 mt-0.75 leading-4.25">Widoczna na ekranie blokady</span>
        </button>
        <button
          className="motion-safe:[&:active]:duration-[0.12s] relative bg-white rounded-[22px] flex flex-col text-left text-ink p-[16px_16px_15px] min-h-34.5 [transition:background-color_0.12s,_transform_0.16s_var(--out)] [&:active]:transform-[scale(0.97)]"
          onClick={() => c.go('plan')}
        >
          <span className="text-[12px] font-medium pr-6.5 leading-4 text-ink-2">Plan rodziny</span>
          <span className="absolute top-3.5 right-3.5 grid text-ink-3">{I('people', 20)}</span>
          <span className="font-semibold [font-variant-numeric:tabular-nums] mt-auto text-[30px] leading-8 tracking-[-0.035em] [&_small]:text-[14px] [&_small]:font-medium [&_small]:text-ink-2 [&_small]:tracking-[-0.01em]">
            2<small> miejsca</small>
          </span>
          <span className="text-[13px] text-ink-2 mt-0.75 leading-4.25">Spotkania po alarmie</span>
        </button>
        <button
          className="motion-safe:[&:active]:duration-[0.12s] relative bg-white rounded-[22px] flex flex-col text-left text-ink p-[16px_16px_15px] min-h-34.5 [transition:background-color_0.12s,_transform_0.16s_var(--out)] [&:active]:transform-[scale(0.97)]"
          onClick={() => c.go('scam')}
        >
          <span className="text-[12px] font-medium pr-6.5 leading-4 text-ink-2">Tarcza SMS</span>
          <span className="absolute top-3.5 right-3.5 grid text-ink-3">{I('shield', 20)}</span>
          <span className="font-semibold [font-variant-numeric:tabular-nums] mt-auto text-[30px] leading-8 tracking-[-0.035em] [&_small]:text-[14px] [&_small]:font-medium [&_small]:text-ink-2 [&_small]:tracking-[-0.01em]">
            3<small> zablokowane</small>
          </span>
          <span className="text-[13px] text-ink-2 mt-0.75 leading-4.25">Fałszywe dopłaty i kurierzy</span>
        </button>
      </div>
      <Label t="Komunikaty" />
      <List>
        {(
          [
            ['bell', 'Test syren w Krakowie, 1 grudnia, 12:00', 'RCB · wczoraj'],
            ['sun', 'Silny wiatr w Sandomierzu, 2. stopień', 'IMGW · 14:20'],
            ['wifi', 'Wisła: więcej wody, domom nic nie grozi', 'RSO · 11:02'],
          ] as [IconName, string, string][]
        ).map(([ic, t, s2]) => (
          <GRow ic={ic} t={t} s={s2} onClick={() => c.go('places')} />
        ))}
        <GRow
          ic="call"
          t="Kto do mnie dzwoni?"
          s="Sprawdź, czy dzwoni naprawdę urząd"
          onClick={() => c.go('caller')}
        />
        <GRow
          ic="camera"
          t="Zgłoś szkody po zdarzeniu"
          s="Zdjęcia, opis, jeden wniosek"
          onClick={() => c.go('damage-1')}
        />
      </List>
      <Label t="Rozpoznaj sygnał" />
      <div className="grid grid-cols-[1fr_1fr] mt-3 gap-2.5">
        <div className="motion-safe:[&:active]:duration-[0.12s] relative bg-white rounded-[22px] flex flex-col text-left text-ink p-[16px_16px_15px] min-h-34.5 [transition:background-color_0.12s,_transform_0.16s_var(--out)] [&:active]:transform-[scale(0.97)]">
          <span className="text-[12px] font-medium pr-6.5 leading-4 text-ink-2">Alarm</span>
          <svg viewBox="0 0 120 30" width="100%" height="30" className="mt-auto">
            <path
              d="M0 15 Q7.5 0 15 15 T30 15 T45 15 T60 15 T75 15 T90 15 T105 15 T120 15"
              stroke="var(--ink)"
              strokeWidth="1.75"
              fill="none"
            />
          </svg>
          <span className="text-[13px] text-ink-2 mt-0.75 leading-4.25">Dźwięk modulowany, 3 min</span>
        </div>
        <div className="motion-safe:[&:active]:duration-[0.12s] relative bg-white rounded-[22px] flex flex-col text-left text-ink p-[16px_16px_15px] min-h-34.5 [transition:background-color_0.12s,_transform_0.16s_var(--out)] [&:active]:transform-[scale(0.97)]">
          <span className="text-[12px] font-medium pr-6.5 leading-4 text-ink-2">Odwołanie</span>
          <svg viewBox="0 0 120 30" width="100%" height="30" className="mt-auto">
            <path d="M0 15H120" stroke="var(--ink)" strokeWidth="1.75" />
          </svg>
          <span className="text-[13px] text-ink-2 mt-0.75 leading-4.25">Dźwięk ciągły, 3 min</span>
        </div>
      </div>
    </div>
  );
}
