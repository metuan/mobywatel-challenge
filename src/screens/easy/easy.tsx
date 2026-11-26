import type { CSSProperties } from 'react';
import { Card } from '@/components/ui/card';
import { Note, NoteButton } from '@/components/ui/note';
import { Display, Lead, Muted, Title } from '@/components/ui/typography';
import { Actions, Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { Icon } from '@/ui/icons';
import { Av } from '@/ui/primitives';
import type { Ctx } from '@/types';

export function Easy(c: Ctx) {
  return (
    <div className="easy">
      <Display>Dzień dobry, Panie Stanisławie.</Display>
      {c.s.easyApproved ? (
        ''
      ) : (
        <NoteButton
          icon="bell"
          tone="amber"
          className="w-full text-[17px]/[1.45] p-4 mb-3.5"
          onClick={() => c.go('easy-approve')}
        >
          <b>Anna prosi o dostęp.</b> Dotknij, żeby zdecydować.
        </NoteButton>
      )}
      <div className="grid grid-cols-[1fr] gap-3 motion-safe:[.screen_&_>_*]:animate-[fade-up_0.42s_var(--ease-out)_both] motion-safe:[.screen_&_>_*:nth-child(2)]:[animation-delay:0.04s] motion-safe:[.screen_&_>_*:nth-child(3)]:[animation-delay:0.08s] motion-safe:[.screen_&_>_*:nth-child(n_+_4)]:[animation-delay:0.12s]">
        <button
          className="tile p-[22px_20px] flex items-center gap-4 font-semibold tracking-[-0.02em] [border:0] text-[22px] rounded-[22px]! [box-shadow:none]! bg-white [transition:background-color_0.12s,_transform_0.16s_var(--out)] [&:active]:transform-[scale(0.97)]"
          onClick={() => c.go('easy-doc')}
        >
          <span className="[.tile_&]:w-14 [.tile_&]:h-14 [.tile_&]:rounded-[50%] [.tile_&]:bg-bg [.tile_&]:text-ink [.tile_&]:grid [.tile_&]:place-items-center [.tile_&]:flex-none bg-fill! text-ink! rounded-[50%]!">
            <Icon name="card" size={28} />
          </span>
          Mój dowód
        </button>
        <button
          className="tile p-[22px_20px] flex items-center gap-4 font-semibold tracking-[-0.02em] [border:0] text-[22px] rounded-[22px]! [box-shadow:none]! bg-white [transition:background-color_0.12s,_transform_0.16s_var(--out)] [&:active]:transform-[scale(0.97)]"
          onClick={() => c.go('easy-rx')}
        >
          <span className="[.tile_&]:w-14 [.tile_&]:h-14 [.tile_&]:rounded-[50%] [.tile_&]:bg-bg [.tile_&]:text-ink [.tile_&]:grid [.tile_&]:place-items-center [.tile_&]:flex-none bg-fill! text-ink! rounded-[50%]!">
            <Icon name="doc" size={28} />
          </span>
          Moje recepty
        </button>
        <button
          className="tile p-[22px_20px] flex items-center gap-4 font-semibold tracking-[-0.02em] [border:0] text-[22px] rounded-[22px]! [box-shadow:none]! bg-white [transition:background-color_0.12s,_transform_0.16s_var(--out)] [&:active]:transform-[scale(0.97)]"
          onClick={() => c.go('assistant')}
        >
          <span className="[.tile_&]:w-14 [.tile_&]:h-14 [.tile_&]:rounded-[50%] [.tile_&]:bg-bg [.tile_&]:text-ink [.tile_&]:grid [.tile_&]:place-items-center [.tile_&]:flex-none bg-fill! text-ink! rounded-[50%]!">
            <Icon name="sparkle" size={28} />
          </span>
          Zapytaj o pomoc
        </button>
        <button
          className="tile p-[22px_20px] flex items-center gap-4 font-semibold tracking-[-0.02em] [border:0] text-[22px] rounded-[22px]! [box-shadow:none]! bg-white [transition:background-color_0.12s,_transform_0.16s_var(--out)] [&:active]:transform-[scale(0.97)]"
          onClick={() => c.go('easy-call')}
        >
          <span className="[.tile_&]:w-14 [.tile_&]:h-14 [.tile_&]:rounded-[50%] [.tile_&]:bg-bg [.tile_&]:text-ink [.tile_&]:grid [.tile_&]:place-items-center [.tile_&]:flex-none bg-fill! text-ink! rounded-[50%]!">
            <Icon name="phone" size={28} />
          </span>
          Zadzwoń do Anny
        </button>
      </div>
      <button
        className="flex gap-2.5 items-center justify-center bg-ink text-white rounded-[999px] p-4.5 text-[18px] font-medium w-full mt-3.5"

        onClick={() => c.go('easy-voice')}
      >
        <Icon name="mic" size={24} /> Powiedz, czego potrzebujesz
      </button>
    </div>
  );
}

export function EasyApprove(c: Ctx) {
  const done = c.s.easyApproved;
  return (
    <div className="easy">
      <Title className="text-[38px]">
        {done ? 'Zgoda zapisana.' : 'Anna chce Panu pomagać w sprawach urzędowych.'}
      </Title>
      <Card className="p-4.5 text-[18px] leading-[1.5]">
        <div className="font-semibold mb-1.5">Anna będzie mogła:</div>
        <div>✓ widzieć Pana terminy</div>
        <div>✓ czytać pisma z urzędów</div>
        <div>✓ przygotowywać wnioski</div>
        <div className="font-semibold mt-2.5 mr-0 mb-1.5 ml-0">Anna nie będzie mogła:</div>
        <div>✗ widzieć danych o zdrowiu</div>
        <div>✗ wysyłać niczego bez Pana zgody</div>
      </Card>
      {done ? (
        <Actions>
          <Button onClick={() => c.go(c.s.persona === 'tata' ? 'easy' : 'member-tata')}>Wróć</Button>
        </Actions>
      ) : (
        <Actions>
          <Button
            variant="success"
            onClick={() =>
              c.confirm({
                t: 'Zgodzić się?',
                items: [
                  'Dostęp dla: Anna Nowicka',
                  'Na rok, do 24.11.2027',
                  'Może Pan cofnąć w każdej chwili',
                ],
                ok: 'Zgadzam się',
                big: true,
                done: () => {
                  c.set({ easyApproved: true });
                  c.toast('Anna dostała Pana zgodę.');
                },
              })
            }
          >
            Zgadzam się
          </Button>
          <Button variant="secondary" onClick={() => c.go('easy')}>
            Nie teraz
          </Button>
          <Button variant="secondary">
            <Icon name="speaker" size={22} /> Przeczytaj mi to
          </Button>
        </Actions>
      )}
    </div>
  );
}

export function EasyDoc(c: Ctx) {
  return (
    <div className="easy">
      <Title className="text-[38px]">Pana dowód</Title>
      <Card className="p-5 text-[20px]">
        <Muted className="text-[16px]">Ważny do</Muted>
        <div className="font-semibold text-[28px]">26 stycznia 2027</div>
        <Note icon="info" className="mt-3 text-base/[1.45]">
          Za 63 dni. Anna pomoże złożyć wniosek o nowy.
        </Note>
      </Card>
      <Actions>
        <Button onClick={() => c.go('share-min')}>Pokaż do sprawdzenia</Button>
        <Button variant="secondary" onClick={() => c.go('easy')}>
          Wróć
        </Button>
      </Actions>
    </div>
  );
}

/* Hop 5: a real call screen */
export function EasyCall(c: Ctx) {
  const who = c.s.persona === 'tata' ? 'Anna' : 'Tata';
  const [t, setT] = useState(-1);
  const [mute, setMute] = useState(false);
  const [spk, setSpk] = useState(false);
  useEffect(() => {
    const a = setTimeout(() => setT(0), 2200);
    return () => clearTimeout(a);
  }, []);
  useEffect(() => {
    if (t < 0) return;
    const a = setTimeout(() => setT(t + 1), 1000);
    return () => clearTimeout(a);
  }, [t]);
  const mm =
    t < 0 ? 'Łączę…' : `${String(Math.floor(t / 60)).padStart(2, '0')}:${String(t % 60).padStart(2, '0')}`;
  return (
    <div
      className={`call8 min-h-160 m-[-8px_-20px_0] p-[56px_24px_40px] flex flex-col items-center [background:radial-gradient(120%_70%_at_50%_0%,_#232a38_0%,_var(--ink)_70%)] text-white rounded-[0_0_40px_40px] [.screen.full_&]:m-0 [.screen.full_&]:min-h-full [.screen.full_&]:h-full [.screen.full_&]:rounded-none [.screen.full_&]:pt-24 ${t >= 0 ? 'on [.progress_i&]:bg-ink [.steps_i&]:bg-ink [.st-ab_>_div&&]:bg-white [.st-ab_&_p]:text-ink [.tour-dots_i&]:w-5.5 [.tour-dots_i&]:bg-ink [.call-keys_button&_span]:bg-white [.call-keys_button&_span]:text-ink' : ''}`}
    >
      <div className="call-av relative w-27 h-27 mb-5.5 [&_i]:absolute [&_i]:inset-0 [&_i]:rounded-[50%] [&_i]:[border:1.5px_solid_rgb(255_255_255_/_35%)] [&_i]:animate-[callring_1.6s_var(--out)_3] [&_i_+_i]:[animation-delay:0.5s] [.call8.on_&_i]:animate-none [.call8.on_&_i]:opacity-[0] motion-reduce:[&_i]:animate-none!">
        <i></i>
        <i></i>
        <Av i={who[0]} size={108} />
      </div>
      <div className="text-[28px] font-semibold tracking-[-0.02em]">
        {who === 'Anna' ? 'Anna, córka' : 'Tata'}
      </div>
      <div className="text-[17px] [color:rgb(255_255_255_/_60%)] mt-1.5 [font-variant-numeric:tabular-nums]">
        {mm}
      </div>
      {t >= 2 && (
        <div className="mt-5.5 flex gap-2 items-start text-[14px] leading-[1.4] [background:rgb(255_255_255_/_8%)] rounded-2xl p-[12px_14px] [color:rgb(255_255_255_/_85%)] animate-[fadeUp_0.3s_var(--out)]">
          <Icon name="sparkle" size={14} /> Anna widzi, że oglądasz ekran z dowodem. Może Ci pomóc krok po
          kroku.
        </div>
      )}
      <div className="call-keys grid [grid-template-columns:repeat(3,_1fr)] gap-5.5 mt-auto pt-10 w-full [&_button]:flex [&_button]:flex-col [&_button]:items-center [&_button]:gap-2 [&_button]:text-white [&_button]:text-[13px] [&_span]:w-18 [&_span]:h-18 [&_span]:rounded-[50%] [&_span]:grid [&_span]:place-items-center [&_span]:[background:rgb(255_255_255_/_12%)] [&_span]:[transition:background_0.2s,_color_0.2s,_transform_0.16s_var(--out)] [&_button:active_span]:transform-[scale(0.95)]">
        <button
          className={
            mute
              ? 'on [.progress_i&]:bg-ink [.steps_i&]:bg-ink [.st-ab_>_div&&]:bg-white [.st-ab_&_p]:text-ink [.tour-dots_i&]:w-5.5 [.tour-dots_i&]:bg-ink [.call-keys_button&_span]:bg-white [.call-keys_button&_span]:text-ink'
              : ''
          }
          onClick={() => setMute(!mute)}
        >
          <span>
            <Icon name="mute" size={26} />
          </span>
          Wycisz
        </button>
        <button onClick={() => c.toast('Klawiatura')}>
          <span>
            <Icon name="grid" size={26} />
          </span>
          Klawiatura
        </button>
        <button
          className={
            spk
              ? 'on [.progress_i&]:bg-ink [.steps_i&]:bg-ink [.st-ab_>_div&&]:bg-white [.st-ab_&_p]:text-ink [.tour-dots_i&]:w-5.5 [.tour-dots_i&]:bg-ink [.call-keys_button&_span]:bg-white [.call-keys_button&_span]:text-ink'
              : ''
          }
          onClick={() => setSpk(!spk)}
        >
          <span>
            <Icon name="speaker" size={26} />
          </span>
          Głośnik
        </button>
      </div>
      <button
        className="mt-7.5 w-19 h-19 rounded-[50%] [background:#e5243b] text-white grid place-items-center [transition:transform_0.16s_var(--out)] [&_svg]:transform-[rotate(135deg)] [&:active]:transform-[scale(0.95)]"
        aria-label="Rozłącz"
        onClick={() => {
          c.toast(t >= 0 ? `Rozmowa trwała ${mm}` : 'Połączenie przerwane');
          c.back();
        }}
      >
        <Icon name="call" size={30} />
      </button>
    </div>
  );
}

/* Hop 6: voice with a live waveform and words appearing as they are heard */
export function EasyVoice(c: Ctx) {
  const Q = 'Kiedy kończy mi się dowód?'.split(' ');
  const [n, setN] = useState(0);
  const [done, setDone] = useState(false);
  useEffect(() => {
    if (n < Q.length) {
      const a = setTimeout(() => setN(n + 1), n ? 340 : 900);
      return () => clearTimeout(a);
    }
    const b = setTimeout(() => setDone(true), 700);
    return () => clearTimeout(b);
  }, [n]);
  return (
    <div className="easy pt-10">
      <div
        className={
          'h-22.5 flex items-center justify-center gap-1 [&_i]:w-1 [&_i]:[border-radius:4px] [&_i]:bg-ink [&_i]:h-(--h) [&_i]:animate-[wv_0.9s_ease-in-out_var(--d)_infinite_alternate] [&_i]:origin-center [&.stop_i]:animate-none [&.stop_i]:transform-[scaleY(0.12)] [&.stop_i]:[transition:transform_0.4s_var(--out)] motion-reduce:[&_i]:animate-none! ' +
          (done ? 'stop' : '')
        }
      >
        {Array.from({ length: 28 }, (_, i) => (
          <i
            key={i}
            style={{ '--d': `${(i * 73) % 600}ms`, '--h': `${18 + ((i * 37) % 46)}px` } as CSSProperties}
          ></i>
        ))}
      </div>
      <p className="text-center text-[24px] leading-[1.3] font-semibold tracking-[-0.02em] min-h-16 m-[18px_0]">
        {n ? (
          <>
            „{Q.slice(0, n).join(' ')}
            {n === Q.length ? '”' : ''}
          </>
        ) : (
          <span className="text-ink-3 font-medium text-[18px]">Słucham. Mów spokojnie.</span>
        )}
      </p>
      {done && (
        <Card className="animate-[fadeUp_0.35s_var(--out)] p-5 text-[20px] leading-[1.5]">
          Pana dowód jest ważny do <b>26 stycznia 2027</b>, czyli jeszcze 63 dni. Anna może pomóc złożyć
          wniosek o nowy.
          <Actions>
            <button
              className="flex gap-2.5 items-center justify-center bg-ink text-white rounded-[999px] p-4.5 text-[18px] font-medium"
              onClick={() => c.toast('Czytam na głos…')}
            >
              <Icon name="speaker" size={22} /> Przeczytaj jeszcze raz
            </button>
            <Button onClick={() => c.go('easy-doc')}>Pokaż mój dowód</Button>
          </Actions>
        </Card>
      )}
    </div>
  );
}

/* Hop 7: prescriptions as pharmacy-ready codes */
export function EasyRx(c: Ctx) {
  const [open, setOpen] = useState<number | null>(null);
  const RX: [string, string, string, number][] = [
    ['Bisoprolol 5 mg', '7731', 'Na serce, 1 rano', 18],
    ['Atorwastatyna 20 mg', '2290', 'Na cholesterol, 1 wieczorem', 26],
  ];
  return (
    <div className="easy">
      <Title className="text-[34px] leading-[1.1]">Pana recepty</Title>
      <Lead className="text-[18px]/[1.45]">Dotknij recepty i pokaż ekran w aptece.</Lead>
      <div className="flex flex-col gap-3 mt-2.5">
        {RX.map(([t, k, how, d], i) => (
          <button
            key={t}
            className={
              'rx flex flex-col items-stretch text-left bg-surface rounded-[22px] p-4.5 [box-shadow:0_0_0_0.5px_var(--hair)] [transition:transform_0.16s_var(--out)] [&:active]:transform-[scale(0.985)] ' +
              (open === i ? 'open' : '')
            }
            onClick={() => setOpen(open === i ? null : i)}
          >
            <span className="flex gap-3 items-center [&_b]:block [&_b]:text-[20px] [&_b]:font-semibold [&_b]:tracking-[-0.015em] [&_small]:block [&_small]:text-[16px] [&_small]:text-ink-2 [&_small]:mt-0.5">
              <span className="w-11 h-11 rounded-[14px] bg-fill grid place-items-center">
                <Icon name="pharm" size={22} />
              </span>
              <span>
                <b>{t}</b>
                <small>{how}</small>
              </span>
            </span>
            <span className="grid-rows-[0fr] overflow-hidden opacity-[0] text-center block max-h-0 p-[0_16px] [transition:max-height_0.32s_var(--out),_opacity_0.2s,_margin_0.32s_var(--out),_padding_0.32s_var(--out)] [&_>_*]:min-h-0 [.rx.open_&]:grid-rows-[auto] [.rx.open_&]:opacity-[1] [.rx.open_&]:m-[16px_0_4px] [.rx.open_&]:bg-fill [.rx.open_&]:rounded-2xl [.rx.open_&]:max-h-50 [.rx.open_&]:p-4 [&_b]:block [&_b]:text-[52px] [&_b]:tracking-[0.06em] [&_b]:font-[650] [&_b]:[font-variant-numeric:tabular-nums] [&_b]:leading-[1.1] [&_small]:block [&_small]:text-[15px] [&_small]:text-ink-2">
              <small>Kod recepty</small>
              <b>{k.split('').join(' ')}</b>
              <small>PESEL 520103•••••</small>
            </span>
            <span className="flex justify-between mt-3.5 text-[16px] text-ink-2 [&_span:last-child]:text-ink [&_span:last-child]:font-semibold">
              <span>Ważna jeszcze {d} dni</span>
              <span>{open === i ? 'Schowaj' : 'Pokaż w aptece'}</span>
            </span>
          </button>
        ))}
      </div>
      <Actions>
        <Button variant="secondary" onClick={() => c.go('easy')}>
          Wróć
        </Button>
      </Actions>
    </div>
  );
}
