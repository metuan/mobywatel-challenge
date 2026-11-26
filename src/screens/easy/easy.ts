import { html, useEffect, useState } from '@/lib/preact';
import { I } from '@/ui/icons';
import { Av } from '@/ui/primitives';
import type { Ctx } from '@/types';

export function Easy(c: Ctx) {
  return html`<div class="easy">
    <h1 class="h-xl">Dzień dobry, Panie Stanisławie.</h1>
    ${c.s.easyApproved ? '' : html`<button class="note amber" style="width:100%;font-size:17px;padding:16px;margin-bottom:14px" onClick=${() => c.go('easy-approve')}>${I('bell', 22)}<span><b>Anna prosi o dostęp.</b> Dotknij, żeby zdecydować.</span></button>`}
    <div class="tiles">
      <button class="tile" onClick=${() => c.go('easy-doc')}><span class="ic">${I('card', 28)}</span>Mój dowód</button>
      <button class="tile" onClick=${() => c.go('easy-rx')}><span class="ic">${I('doc', 28)}</span>Moje recepty</button>
      <button class="tile" onClick=${() => c.go('assistant')}><span class="ic">${I('sparkle', 28)}</span>Zapytaj o pomoc</button>
      <button class="tile" onClick=${() => c.go('easy-call')}><span class="ic">${I('phone', 28)}</span>Zadzwoń do Anny</button>
    </div>
    <button class="speak" style="width:100%;margin-top:14px" onClick=${() => c.go('easy-voice')}>${I('mic', 24)} Powiedz, czego potrzebujesz</button>
  </div>`;
}

export function EasyApprove(c: Ctx) {
  const done = c.s.easyApproved;
  return html`<div class="easy">
    <h1 class="h-l" style="font-size:38px">${done ? 'Zgoda zapisana.' : 'Anna chce Panu pomagać w sprawach urzędowych.'}</h1>
    <div class="card" style="padding:18px;font-size:18px;line-height:1.5">
      <div style="font-weight:600;margin-bottom:6px">Anna będzie mogła:</div>
      <div>✓ widzieć Pana terminy</div><div>✓ czytać pisma z urzędów</div><div>✓ przygotowywać wnioski</div>
      <div style="font-weight:600;margin:10px 0 6px">Anna nie będzie mogła:</div>
      <div>✗ widzieć danych o zdrowiu</div><div>✗ wysyłać niczego bez Pana zgody</div>
    </div>
    ${
      done
        ? html`<div class="actions"><button class="btn bigbtn" onClick=${() => c.go(c.s.persona === 'tata' ? 'easy' : 'member-tata')}>Wróć</button></div>`
        : html`<div class="actions"><button class="btn green bigbtn" onClick=${() =>
            c.confirm({
              t: 'Zgodzić się?',
              items: ['Dostęp dla: Anna Nowicka', 'Na rok, do 24.11.2027', 'Może Pan cofnąć w każdej chwili'],
              ok: 'Zgadzam się',
              big: true,
              done: () => {
                c.set({ easyApproved: true });
                c.toast('Anna dostała Pana zgodę.');
              },
            })}>Zgadzam się</button>
      <button class="btn ghost bigbtn" onClick=${() => c.go('easy')}>Nie teraz</button>
      <button class="btn ghost bigbtn">${I('speaker', 22)} Przeczytaj mi to</button></div>`
    }
  </div>`;
}

export function EasyDoc(c: Ctx) {
  return html`<div class="easy"><h1 class="h-l" style="font-size:38px">Pana dowód</h1>
    <div class="card" style="padding:20px;font-size:20px"><div class="small" style="font-size:16px">Ważny do</div><div style="font-weight:600;font-size:28px">26 stycznia 2027</div>
    <div class="note amber" style="margin-top:12px;font-size:16px">Za 63 dni. Anna pomoże złożyć wniosek o nowy.</div></div>
    <div class="actions"><button class="btn bigbtn" onClick=${() => c.go('share-min')}>Pokaż do sprawdzenia</button><button class="btn ghost bigbtn" onClick=${() => c.go('easy')}>Wróć</button></div></div>`;
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
  return html`<div class="call8 ${t >= 0 ? 'on' : ''}">
    <div class="call-av"><i></i><i></i><${Av} i=${who[0]} size=${108}/></div>
    <div class="call-n">${who === 'Anna' ? 'Anna, córka' : 'Tata'}</div>
    <div class="call-t">${mm}</div>
    ${t >= 2 && html`<div class="call-note">${I('sparkle', 14)} Anna widzi, że oglądasz ekran z dowodem. Może Ci pomóc krok po kroku.</div>`}
    <div class="call-keys">
      <button class=${mute ? 'on' : ''} onClick=${() => setMute(!mute)}><span>${I('mute', 26)}</span>Wycisz</button>
      <button onClick=${() => c.toast('Klawiatura')}><span>${I('grid', 26)}</span>Klawiatura</button>
      <button class=${spk ? 'on' : ''} onClick=${() => setSpk(!spk)}><span>${I('speaker', 26)}</span>Głośnik</button>
    </div>
    <button class="call-end" aria-label="Rozłącz" onClick=${() => {
      c.toast(t >= 0 ? `Rozmowa trwała ${mm}` : 'Połączenie przerwane');
      c.back();
    }}>${I('call', 30)}</button>
  </div>`;
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
  return html`<div class="easy voice8">
    <div class=${'wave ' + (done ? 'stop' : '')}>${Array.from({ length: 28 }, (_, i) => html`<i style=${`--d:${(i * 73) % 600}ms;--h:${18 + ((i * 37) % 46)}px`}></i>`)}</div>
    <p class="v-q">${n ? html`„${Q.slice(0, n).join(' ')}${n === Q.length ? '”' : ''}` : html`<span class="v-hint">Słucham. Mów spokojnie.</span>`}</p>
    ${
      done &&
      html`<div class="card v-a" style="padding:20px;font-size:20px;line-height:1.5">Pana dowód jest ważny do <b>26 stycznia 2027</b>, czyli jeszcze 63 dni. Anna może pomóc złożyć wniosek o nowy.
      <div class="actions"><button class="speak" onClick=${() => c.toast('Czytam na głos…')}>${I('speaker', 22)} Przeczytaj jeszcze raz</button><button class="btn bigbtn" onClick=${() => c.go('easy-doc')}>Pokaż mój dowód</button></div></div>`
    }
  </div>`;
}

/* Hop 7: prescriptions as pharmacy-ready codes */
export function EasyRx(c: Ctx) {
  const [open, setOpen] = useState<number | null>(null);
  const RX: [string, string, string, number][] = [
    ['Bisoprolol 5 mg', '7731', 'Na serce, 1 rano', 18],
    ['Atorwastatyna 20 mg', '2290', 'Na cholesterol, 1 wieczorem', 26],
  ];
  return html`<div class="easy"><h1 class="h-l" style="font-size:34px;line-height:1.1">Pana recepty</h1>
    <p class="lead" style="font-size:18px">Dotknij recepty i pokaż ekran w aptece.</p>
    <div class="rx8">${RX.map(
      (
        [t, k, how, d],
        i,
      ) => html`<button class=${'rx ' + (open === i ? 'open' : '')} onClick=${() => setOpen(open === i ? null : i)}>
      <span class="rx-h"><span class="rx-ic">${I('pharm', 22)}</span><span><b>${t}</b><small>${how}</small></span></span>
      <span class="rx-code"><small>Kod recepty</small><b>${k.split('').join(' ')}</b><small>PESEL 520103•••••</small></span>
      <span class="rx-f"><span>Ważna jeszcze ${d} dni</span><span>${open === i ? 'Schowaj' : 'Pokaż w aptece'}</span></span></button>`,
    )}</div>
    <div class="actions"><button class="btn ghost bigbtn" onClick=${() => c.go('easy')}>Wróć</button></div></div>`;
}
