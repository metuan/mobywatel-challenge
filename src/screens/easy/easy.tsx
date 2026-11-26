import type { CSSProperties } from 'react';
import { Card } from '@/components/ui/card';
import { Note, NoteButton } from '@/components/ui/note';
import { Display, Lead, Muted, Title } from '@/components/ui/typography';
import { Actions, Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { I } from '@/ui/icons';
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
      <div className="tiles">
        <button className="tile" onClick={() => c.go('easy-doc')}>
          <span className="ic">{I('card', 28)}</span>Mój dowód
        </button>
        <button className="tile" onClick={() => c.go('easy-rx')}>
          <span className="ic">{I('doc', 28)}</span>Moje recepty
        </button>
        <button className="tile" onClick={() => c.go('assistant')}>
          <span className="ic">{I('sparkle', 28)}</span>Zapytaj o pomoc
        </button>
        <button className="tile" onClick={() => c.go('easy-call')}>
          <span className="ic">{I('phone', 28)}</span>Zadzwoń do Anny
        </button>
      </div>
      <button
        className="speak w-full mt-3.5"

        onClick={() => c.go('easy-voice')}
      >
        {I('mic', 24)} Powiedz, czego potrzebujesz
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
          <Button variant="secondary">{I('speaker', 22)} Przeczytaj mi to</Button>
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
    <div className={`call8 ${t >= 0 ? 'on' : ''}`}>
      <div className="call-av">
        <i></i>
        <i></i>
        <Av i={who[0]} size={108} />
      </div>
      <div className="call-n">{who === 'Anna' ? 'Anna, córka' : 'Tata'}</div>
      <div className="call-t">{mm}</div>
      {t >= 2 && (
        <div className="call-note">
          {I('sparkle', 14)} Anna widzi, że oglądasz ekran z dowodem. Może Ci pomóc krok po kroku.
        </div>
      )}
      <div className="call-keys">
        <button className={mute ? 'on' : ''} onClick={() => setMute(!mute)}>
          <span>{I('mute', 26)}</span>Wycisz
        </button>
        <button onClick={() => c.toast('Klawiatura')}>
          <span>{I('grid', 26)}</span>Klawiatura
        </button>
        <button className={spk ? 'on' : ''} onClick={() => setSpk(!spk)}>
          <span>{I('speaker', 26)}</span>Głośnik
        </button>
      </div>
      <button
        className="call-end"
        aria-label="Rozłącz"
        onClick={() => {
          c.toast(t >= 0 ? `Rozmowa trwała ${mm}` : 'Połączenie przerwane');
          c.back();
        }}
      >
        {I('call', 30)}
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
    <div className="easy voice8">
      <div className={'wave ' + (done ? 'stop' : '')}>
        {Array.from({ length: 28 }, (_, i) => (
          <i
            style={{ '--d': `${(i * 73) % 600}ms`, '--h': `${18 + ((i * 37) % 46)}px` } as CSSProperties}
          ></i>
        ))}
      </div>
      <p className="v-q">
        {n ? (
          <>
            „{Q.slice(0, n).join(' ')}
            {n === Q.length ? '”' : ''}
          </>
        ) : (
          <span className="v-hint">Słucham. Mów spokojnie.</span>
        )}
      </p>
      {done && (
        <Card className="v-a p-5 text-[20px] leading-[1.5]">
          Pana dowód jest ważny do <b>26 stycznia 2027</b>, czyli jeszcze 63 dni. Anna może pomóc złożyć
          wniosek o nowy.
          <Actions>
            <button className="speak" onClick={() => c.toast('Czytam na głos…')}>
              {I('speaker', 22)} Przeczytaj jeszcze raz
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
      <div className="rx8">
        {RX.map(([t, k, how, d], i) => (
          <button
            className={'rx ' + (open === i ? 'open' : '')}
            onClick={() => setOpen(open === i ? null : i)}
          >
            <span className="rx-h">
              <span className="rx-ic">{I('pharm', 22)}</span>
              <span>
                <b>{t}</b>
                <small>{how}</small>
              </span>
            </span>
            <span className="rx-code">
              <small>Kod recepty</small>
              <b>{k.split('').join(' ')}</b>
              <small>PESEL 520103•••••</small>
            </span>
            <span className="rx-f">
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
