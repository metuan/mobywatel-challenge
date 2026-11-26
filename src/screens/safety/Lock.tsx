import { Fam } from '@/screens/family/Family';
import { useTicker } from '@/ui/hooks';
import { I } from '@/ui/icons';
import { AppIcon } from '@/ui/primitives';
import type { Ctx } from '@/types';

const NOTES = [
  {
    at: 1,
    k: 'imgw',
    app: 'IMGW',
    tm: '15:20',
    t: 'Sandomierz · miejsce taty',
    b: 'Ostrzeżenie 2. stopnia: silny wiatr do 90 km/h, od 20:00.',
  },
  {
    at: 2,
    k: 'rcb',
    app: 'ALERT RCB · ALERT EKSTREMALNY',
    tm: '15:42',
    t: 'Alarm powietrzny: Kraków',
    b: 'Alert RCB! Alarm powietrzny w Krakowie. Idź do najbliższego schronu albo ukrycia.',
    go: 'alert-red',
    big: true,
  },
  {
    at: 4,
    k: 'mob',
    app: 'mObywatel',
    tm: '15:45',
    t: 'Zosia jest w schronie',
    b: 'Przedszkole nr 12 potwierdziło: wszystkie dzieci w schronie przy ul. Limanowskiego.',
    go: 'family-map',
  },
  {
    at: 5,
    k: 'mob',
    app: 'mObywatel',
    tm: '15:46',
    t: 'Tomasz: jestem bezpieczny',
    b: 'Katowice, biuro. Poza strefą alarmu.',
    go: 'alert-safe',
  },
  {
    at: 6,
    k: 'mob',
    app: 'mObywatel',
    tm: '15:43',
    t: 'Tata jeszcze nie odpowiedział',
    b: 'Sandomierz jest poza strefą alarmu. Zadzwonić?',
    go: 'easy-call',
    act: 'Zadzwoń',
  },
];

export function Lock(c: Ctx) {
  const [n, replay] = useTicker(6, 1700);
  const shown = NOTES.filter(x => x.at <= n).reverse();
  const live = n >= 3;
  const sec = n >= 3 ? (n - 2) * 47 + 12 : 0;
  return (
    <div className="lock" role="region" aria-label="Ekran blokady z powiadomieniami">
      <svg
        className="absolute left-0 right-0 bottom-0 w-full h-40 pointer-events-none"
        viewBox="0 0 390 160"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d="M0 160V112h22v-14h14v14h20V96l8-10 8 10v16h18V80h6V64l4-8 4 8v16h6v32h22v-20h30v20h16V90l12-12 12 12v22h20V100h14v-8h10v8h12v12h24V94h8V76l6-10 6 10v18h8v18h22v-16h26v16h18v48z"
          fill="rgba(0,0,0,.28)"
        />
      </svg>
      <div className="text-center relative [&_>_span]:opacity-[0.8]">
        <span>{I('lock', 14)}</span>
        <div className="leading-none mt-0.5 [font-variant-numeric:tabular-nums] text-[80px] font-sans font-semibold tracking-[-0.02em]">
          {n >= 2 ? '15:43' : '15:41'}
        </div>
        <div className="text-[15px] opacity-[0.85] m-[4px_0_14px] font-medium">wtorek, 24 listopada</div>
      </div>
      {live && (
        <button
          className="relative block w-full [background:rgb(10_12_18_/_78%)] [-webkit-backdrop-filter:blur(18px)] rounded-3xl p-[12px_14px] text-white mb-2 motion-safe:[transition:transform_0.16s_var(--ease-out),_background-color_0.2s,_color_0.2s,_box-shadow_0.2s] motion-safe:[&:active]:transform-[scale(0.985)] motion-safe:animate-[live-in_0.6s_var(--ease-drawer)_both] [@media(prefers-reduced-transparency:reduce)]:[-webkit-backdrop-filter:none]!"
          onClick={() => c.go('family-map')}
        >
          <div className="lv-h flex items-center gap-2 text-[13px]">
            <span className="w-2 h-2 rounded-[50%] [background:#ff4d5e] [box-shadow:0_0_0_0_rgb(255_77_94_/_60%)] motion-safe:animate-[ping_1.6s_ease-out_infinite]"></span>
            <b>Alarm powietrzny · Kraków</b>
            <span className="[.lv-h_&]:ml-auto [.lv-h_&]:[font-variant-numeric:tabular-nums] [.lv-h_&]:text-[#ff8a8a] [.lv-h_&]:font-semibold">
              {String(Math.floor(sec / 60)).padStart(2, '0')}:{String(sec % 60).padStart(2, '0')}
            </span>
          </div>
          <div className="grid [grid-template-columns:repeat(4,_1fr)] gap-1 m-[10px_0_8px]">
            <Fam who="anna" st="Schron" tone="ok" />
            <Fam who="zosia" st={n >= 4 ? 'Schron' : '…'} tone={n >= 4 ? 'ok' : 'wait'} />
            <Fam who="tomasz" st={n >= 5 ? 'Bezpieczny' : '…'} tone={n >= 5 ? 'ok' : 'wait'} />
            <Fam who="tata" st={n >= 6 ? 'Brak odp.' : '…'} tone={n >= 6 ? 'warn' : 'wait'} />
          </div>
          <div className="h-1 rounded-xs [background:rgb(255_255_255_/_15%)] overflow-hidden [&_i]:block [&_i]:h-full [&_i]:[background:#3ccf7e] [&_i]:rounded-xs [&_i]:[transition:width_0.6s_cubic-bezier(0.22,_1,_0.36,_1)]">
            <i style={{ width: `${25 + (n >= 4 ? 25 : 0) + (n >= 5 ? 25 : 0)}%` }}></i>
          </div>
          <div className="text-[11.5px] opacity-[0.7] mt-1.75">
            {n >= 5 ? '3 z 4 osób bezpiecznych' : 'Zbieramy status rodziny…'} · stuknij, aby zobaczyć mapę
          </div>
        </button>
      )}
      <div className="flex flex-col gap-2">
        {shown.slice(0, 3).map(x => (
          <button
            key={x.tm}
            className={
              'notif block w-full text-left [background:rgb(245_245_247_/_78%)] [-webkit-backdrop-filter:blur(20px)_saturate(1.4)] text-ink rounded-[22px] p-[11px_14px_12px] [&.big]:[background:rgb(255_255_255_/_94%)] motion-safe:[transition:transform_0.16s_var(--ease-out),_background-color_0.2s,_color_0.2s,_box-shadow_0.2s] motion-safe:[&:active]:transform-[scale(0.985)] motion-safe:animate-[notif-in_0.55s_var(--ease-spring)_both] motion-safe:[&.big]:[animation:notif-in_0.55s_var(--ease-spring)_both,_buzz_0.42s_0.5s_ease-in-out] [@media(prefers-reduced-transparency:reduce)]:[-webkit-backdrop-filter:none]!' +
              (x.big
                ? ' big [.taxhero_&]:text-[40px] [.taxhero_&]:font-bold [.taxhero_&]:tracking-[-0.03em] [.taxhero_&]:text-signal-green [.taxhero_&]:m-[4px_0_0]'
                : '')
            }
            onClick={() => x.go && c.go(x.go)}
          >
            <div className="[.notif_&]:flex [.notif_&]:items-center [.notif_&]:gap-2 [.notif_&]:text-[12px] [.notif_&]:text-[#5b6170] [.notif.big_&]:text-red [.notif.big_&]:font-semibold">
              <AppIcon k={x.k} />
              <span className="na">{x.app}</span>
              <span className="[.notif_&]:ml-auto [.notif_&]:font-normal [.notif_&]:text-[#5b6170]">
                {x.tm}
              </span>
            </div>
            <div className="[.notif_&]:font-semibold [.notif_&]:text-[14.5px] [.notif_&]:mt-1 [.notif_&]:tracking-[-0.01em]">
              {x.t}
            </div>
            <div className="[.notif_&]:text-[14px] [.notif_&]:leading-[1.35] [.notif_&]:text-[#2b3242]">
              {x.b}
            </div>
            {x.act && (
              <div className="[.notif_&]:mt-2 [.notif_&]:[border-top:1px_solid_rgb(0_0_0_/_8%)] [.notif_&]:pt-2 [.notif_&]:text-[13.5px] [.notif_&]:font-semibold [.notif_&]:text-ink [.notif_&_span]:inline-flex [.notif_&_span]:gap-1.5 [.notif_&_span]:items-center">
                <span>
                  {I('phone', 14)} {x.act}
                </span>
              </div>
            )}
          </button>
        ))}
        {shown.length > 3 && (
          <div className="m-[-14px_10px_0] h-5 rounded-[0_0_18px_18px] [background:rgb(245_245_247_/_45%)] [font-size:0]">
            i {shown.length - 3} {shown.length - 3 === 1 ? 'starsze powiadomienie' : 'starsze powiadomienia'}
          </div>
        )}
      </div>
      <div className="flex-1"></div>
      <div className="flex justify-between gap-2.5 relative">
        <button
          className="lk-btn inline-flex gap-1.5 items-center [background:rgb(255_255_255_/_18%)] [-webkit-backdrop-filter:blur(14px)] text-white rounded-[999px] p-[10px_14px] text-[13px] font-medium motion-safe:[&:active]:transform-[scale(0.97)]"
          onClick={replay}
        >
          {I('route', 15)} Odtwórz od nowa
        </button>
        <button
          className="lk-btn inline-flex gap-1.5 items-center [background:rgb(255_255_255_/_18%)] [-webkit-backdrop-filter:blur(14px)] text-white rounded-[999px] p-[10px_14px] text-[13px] font-medium motion-safe:[&:active]:transform-[scale(0.97)]"
          onClick={() => c.go('alert-red')}
        >
          Otwórz aplikację
        </button>
      </div>
    </div>
  );
}
