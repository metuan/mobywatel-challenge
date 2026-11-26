import type { CSSProperties } from 'react';
import { useEffect, useState } from 'react';
import { OFFICES, PEOPLE } from '@/data/household';
import { DocCard } from '@/ui/documentCard';
import { I } from '@/ui/icons';
import { Av } from '@/ui/primitives';

export function Tour({
  mode,
  onStart,
  onClose,
}: {
  mode: 'intro' | 'outro';
  onStart: () => void;
  onClose: () => void;
}) {
  const outro = mode === 'outro';
  const N = outro ? 1 : 4;
  const [k, setK] = useState(0);
  const next = () => (k < N - 1 ? setK(k + 1) : onStart());
  useEffect(() => {
    const f = (e: KeyboardEvent) => {
      e.stopImmediatePropagation();
      if (e.key === 'ArrowRight' || e.key === 'Enter') next();
      if (e.key === 'ArrowLeft' && k > 0) setK(k - 1);
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', f, true);
    return () => window.removeEventListener('keydown', f, true);
  }, [k]);
  const slides = outro
    ? [
        <div
          className="motion-safe:[&_>_*]:animate-[rise_0.5s_var(--out)_both] motion-safe:[&_>_*:nth-child(2)]:[animation-delay:0.06s] motion-safe:[&_>_*:nth-child(3)]:[animation-delay:0.1s] motion-safe:[&_>_*:nth-child(n_+_4)]:[animation-delay:0.14s]"
          key="o"
        >
          <div className="tv-art h-50 flex items-center justify-center m-[4px_0_24px] rounded-[22px] bg-bg relative overflow-hidden [&.week_div]:flex [&.week_div]:flex-col [&.week_div]:items-center [&.week_div]:gap-2.5 [&.week_div]:font-medium [&.week_div]:text-ink-2 [&.week_i]:rounded-[50%] [&.week_i]:bg-white [&.week_i]:[box-shadow:0_0_0_0.5px_var(--hair-2)] [&.week_i.red]:bg-red [&.week_i.red]:[box-shadow:none] [&.week_i.red]:text-white motion-safe:[&.week_div]:animate-[rise_0.55s_var(--spring)_both] [@media(max-width:640px)]:h-42.5 [@media(max-width:640px)]:mb-4.5 [&&.week]:gap-2.5 [&.week_div]:w-15.5 [&.week_div]:text-[11.5px] [&.week_div]:text-center [&.week_i]:grid [&.week_i]:place-items-center [&.week_i]:not-italic [&.week_i]:text-[13px] [&.week_i]:font-semibold [&.week_i]:text-ink [&.week_i]:w-11.5 [&.week_i]:h-11.5 [&.week_div:nth-child(5)_span]:text-red [&.week_div:nth-child(5)_span]:font-semibold [@media(max-width:640px)]:[&.week]:gap-0.5 [@media(max-width:640px)]:[&.week_div]:w-11 [@media(max-width:640px)]:[&.week_div]:text-[10px] [@media(max-width:640px)]:[&.week_i]:w-9 [@media(max-width:640px)]:[&.week_i]:h-9">
            <div className="tv-card motion-safe:animate-[card-in_0.8s_var(--spring)_0.1s_both] w-85 [@media(max-width:640px)]:w-70">
              <DocCard interactive={false} />
            </div>
          </div>
          <div className="text-[13px] font-semibold text-ink-2">To wszystko</div>
          <h2 className="text-[30px] font-[680] m-[6px_0_10px] text-balance [@media(max-width:640px)]:text-[24px] tracking-tight leading-[1.08]">
            Tak mógłby działać mObywatel.
          </h2>
          <p className="text-[16px] leading-6 text-ink-2 m-0 text-pretty [@media(max-width:640px)]:text-[15px] [@media(max-width:640px)]:leading-5.5">
            Część tych funkcji działa już dziś, reszta korzysta z rejestrów, które państwo już ma. Przy każdym
            ekranie widać, jak to działa i gdzie pomaga AI.
          </p>
        </div>,
      ]
    : [
        <div
          className="motion-safe:[&_>_*]:animate-[rise_0.5s_var(--out)_both] motion-safe:[&_>_*:nth-child(2)]:[animation-delay:0.06s] motion-safe:[&_>_*:nth-child(3)]:[animation-delay:0.1s] motion-safe:[&_>_*:nth-child(n_+_4)]:[animation-delay:0.14s]"
          key="0"
        >
          <div className="tv-art h-50 flex items-center justify-center m-[4px_0_24px] rounded-[22px] bg-bg relative overflow-hidden [&.week_div]:flex [&.week_div]:flex-col [&.week_div]:items-center [&.week_div]:gap-2.5 [&.week_div]:font-medium [&.week_div]:text-ink-2 [&.week_i]:rounded-[50%] [&.week_i]:bg-white [&.week_i]:[box-shadow:0_0_0_0.5px_var(--hair-2)] [&.week_i.red]:bg-red [&.week_i.red]:[box-shadow:none] [&.week_i.red]:text-white motion-safe:[&.week_div]:animate-[rise_0.55s_var(--spring)_both] [@media(max-width:640px)]:h-42.5 [@media(max-width:640px)]:mb-4.5 [&&.week]:gap-2.5 [&.week_div]:w-15.5 [&.week_div]:text-[11.5px] [&.week_div]:text-center [&.week_i]:grid [&.week_i]:place-items-center [&.week_i]:not-italic [&.week_i]:text-[13px] [&.week_i]:font-semibold [&.week_i]:text-ink [&.week_i]:w-11.5 [&.week_i]:h-11.5 [&.week_div:nth-child(5)_span]:text-red [&.week_div:nth-child(5)_span]:font-semibold [@media(max-width:640px)]:[&.week]:gap-0.5 [@media(max-width:640px)]:[&.week_div]:w-11 [@media(max-width:640px)]:[&.week_div]:text-[10px] [@media(max-width:640px)]:[&.week_i]:w-9 [@media(max-width:640px)]:[&.week_i]:h-9 [&.tv-art]:gap-5.5 [@media(max-width:640px)]:[&.tv-art]:gap-3 [&.tv-art]:items-start [&.tv-art]:p-[34px_0_0]">
            {PEOPLE.map(([i, n, r], j) => (
              <div
                key={n}
                className="tv-person flex flex-col items-center gap-1.5 text-center max-w-27.5 [&_b]:text-[14px] [&_b]:font-semibold [&_span]:text-[12px] [&_span]:text-ink-2 [&_span]:leading-3.75 motion-safe:animate-[rise_0.55s_var(--spring)_both] [@media(max-width:640px)]:[&_>_span:not(.av)]:hidden [&:not(:first-child)]:mt-2"
                style={{ animationDelay: `${j * 70}ms` }}
              >
                <Av i={i} size={j === 0 ? 72 : 56} />
                <b>{n}</b>
                <span>{r}</span>
              </div>
            ))}
          </div>
          <div className="text-[13px] font-semibold text-ink-2">Prototyp nowego mObywatela</div>
          <h2 className="text-[30px] font-[680] m-[6px_0_10px] text-balance [@media(max-width:640px)]:text-[24px] tracking-tight leading-[1.08]">
            Poznaj Nowickich.
          </h2>
          <p className="text-[16px] leading-6 text-ink-2 m-0 text-pretty [@media(max-width:640px)]:text-[15px] [@media(max-width:640px)]:leading-5.5">
            Anna i Tomasz mieszkają w Krakowie z sześcioletnią Zosią. Tata Anny, Stanisław, mieszka sam w
            Sandomierzu. Rodzina jest zmyślona, sprawy są prawdziwe.
          </p>
        </div>,
        <div
          className="motion-safe:[&_>_*]:animate-[rise_0.5s_var(--out)_both] motion-safe:[&_>_*:nth-child(2)]:[animation-delay:0.06s] motion-safe:[&_>_*:nth-child(3)]:[animation-delay:0.1s] motion-safe:[&_>_*:nth-child(n_+_4)]:[animation-delay:0.14s]"
          key="1"
        >
          <div className="tv-art h-50 flex items-center justify-center m-[4px_0_24px] rounded-[22px] bg-bg relative overflow-hidden [&.week_div]:flex [&.week_div]:flex-col [&.week_div]:items-center [&.week_div]:gap-2.5 [&.week_div]:font-medium [&.week_div]:text-ink-2 [&.week_i]:rounded-[50%] [&.week_i]:bg-white [&.week_i]:[box-shadow:0_0_0_0.5px_var(--hair-2)] [&.week_i.red]:bg-red [&.week_i.red]:[box-shadow:none] [&.week_i.red]:text-white motion-safe:[&.week_div]:animate-[rise_0.55s_var(--spring)_both] [@media(max-width:640px)]:h-42.5 [@media(max-width:640px)]:mb-4.5 [&&.week]:gap-2.5 [&.week_div]:w-15.5 [&.week_div]:text-[11.5px] [&.week_div]:text-center [&.week_i]:grid [&.week_i]:place-items-center [&.week_i]:not-italic [&.week_i]:text-[13px] [&.week_i]:font-semibold [&.week_i]:text-ink [&.week_i]:w-11.5 [&.week_i]:h-11.5 [&.week_div:nth-child(5)_span]:text-red [&.week_div:nth-child(5)_span]:font-semibold [@media(max-width:640px)]:[&.week]:gap-0.5 [@media(max-width:640px)]:[&.week_div]:w-11 [@media(max-width:640px)]:[&.week_div]:text-[10px] [@media(max-width:640px)]:[&.week_i]:w-9 [@media(max-width:640px)]:[&.week_i]:h-9 [&.tv-art]:flex-wrap [&.tv-art]:gap-2 [&.tv-art]:p-[22px_26px] [&.tv-art]:content-center [&.tv-art_span]:h-8 [&.tv-art_span]:p-[0_13px] [&.tv-art_span]:rounded-[999px] [&.tv-art_span]:bg-white [&.tv-art_span]:[box-shadow:0_0_0_0.5px_var(--hair-2),_0_4px_12px_-6px_rgb(11_13_18_/_20%)] [&.tv-art_span]:inline-flex [&.tv-art_span]:items-center [&.tv-art_span]:text-[13px] [&.tv-art_span]:font-medium [&.tv-art_span]:transform-[rotate(var(--r))] motion-safe:[&.tv-art_span]:animate-[drop_0.6s_var(--spring)_both] motion-safe:[&.tv-art_span]:[animation-delay:var(--d)]">
            {OFFICES.map((o, j) => (
              <span
                key={o}
                style={{ '--r': `${((j * 37) % 13) - 6}deg`, '--d': `${j * 40}ms` } as CSSProperties}
              >
                {o}
              </span>
            ))}
          </div>
          <div className="text-[13px] font-semibold text-ink-2">Ich tydzień</div>
          <h2 className="text-[30px] font-[680] m-[6px_0_10px] text-balance [@media(max-width:640px)]:text-[24px] tracking-tight leading-[1.08]">
            Przeprowadzka, poród, kardiolog, mandat, alarm i zalane mieszkanie.
          </h2>
          <p className="text-[16px] leading-6 text-ink-2 m-0 text-pretty [@media(max-width:640px)]:text-[15px] [@media(max-width:640px)]:leading-5.5">
            Dziś każda z tych spraw to inny urząd, inny formularz i ten sam PESEL wpisywany od nowa.
          </p>
        </div>,
        <div
          className="motion-safe:[&_>_*]:animate-[rise_0.5s_var(--out)_both] motion-safe:[&_>_*:nth-child(2)]:[animation-delay:0.06s] motion-safe:[&_>_*:nth-child(3)]:[animation-delay:0.1s] motion-safe:[&_>_*:nth-child(n_+_4)]:[animation-delay:0.14s]"
          key="2"
        >
          <div className="tv-art h-50 flex items-center justify-center m-[4px_0_24px] rounded-[22px] bg-bg relative overflow-hidden [&.week_div]:flex [&.week_div]:flex-col [&.week_div]:items-center [&.week_div]:gap-2.5 [&.week_div]:font-medium [&.week_div]:text-ink-2 [&.week_i]:rounded-[50%] [&.week_i]:bg-white [&.week_i]:[box-shadow:0_0_0_0.5px_var(--hair-2)] [&.week_i.red]:bg-red [&.week_i.red]:[box-shadow:none] [&.week_i.red]:text-white motion-safe:[&.week_div]:animate-[rise_0.55s_var(--spring)_both] [@media(max-width:640px)]:h-42.5 [@media(max-width:640px)]:mb-4.5 [&&.week]:gap-2.5 [&.week_div]:w-15.5 [&.week_div]:text-[11.5px] [&.week_div]:text-center [&.week_i]:grid [&.week_i]:place-items-center [&.week_i]:not-italic [&.week_i]:text-[13px] [&.week_i]:font-semibold [&.week_i]:text-ink [&.week_i]:w-11.5 [&.week_i]:h-11.5 [&.week_div:nth-child(5)_span]:text-red [&.week_div:nth-child(5)_span]:font-semibold [@media(max-width:640px)]:[&.week]:gap-0.5 [@media(max-width:640px)]:[&.week_div]:w-11 [@media(max-width:640px)]:[&.week_div]:text-[10px] [@media(max-width:640px)]:[&.week_i]:w-9 [@media(max-width:640px)]:[&.week_i]:h-9">
            <div className="tv-card motion-safe:animate-[card-in_0.8s_var(--spring)_0.1s_both] w-85 [@media(max-width:640px)]:w-70">
              <DocCard interactive={false} />
            </div>
          </div>
          <div className="text-[13px] font-semibold text-ink-2">Pomysł</div>
          <h2 className="text-[30px] font-[680] m-[6px_0_10px] text-balance [@media(max-width:640px)]:text-[24px] tracking-tight leading-[1.08]">
            Jedna aplikacja, która prowadzi sprawę do końca.
          </h2>
          <div className="grid [grid-template-columns:repeat(3,_1fr)] gap-2.5 mt-4 [&_div]:bg-bg [&_div]:rounded-2xl [&_div]:p-[12px_14px] [&_b]:block [&_b]:text-[14px] [&_b]:font-semibold [&_span]:text-[13px] [&_span]:leading-4.25 [&_span]:text-ink-2 [@media(max-width:640px)]:grid-cols-[1fr] [@media(max-width:640px)]:[&_div]:p-[10px_12px]">
            <div>
              <b>Do końca</b>
              <span>Od wniosku do decyzji, bez okienek.</span>
            </div>
            <div>
              <b>Dla rodziny</b>
              <span>Dzieci, rodzice, pełnomocnictwa.</span>
            </div>
            <div>
              <b>Za Twoją zgodą</b>
              <span>Nic nie wychodzi bez potwierdzenia.</span>
            </div>
          </div>
        </div>,
        <div
          className="motion-safe:[&_>_*]:animate-[rise_0.5s_var(--out)_both] motion-safe:[&_>_*:nth-child(2)]:[animation-delay:0.06s] motion-safe:[&_>_*:nth-child(3)]:[animation-delay:0.1s] motion-safe:[&_>_*:nth-child(n_+_4)]:[animation-delay:0.14s]"
          key="3"
        >
          <div className="tv-art h-50 flex items-center justify-center m-[4px_0_24px] rounded-[22px] bg-bg relative overflow-hidden [&.week_div]:flex [&.week_div]:flex-col [&.week_div]:items-center [&.week_div]:gap-2.5 [&.week_div]:font-medium [&.week_div]:text-ink-2 [&.week_i]:rounded-[50%] [&.week_i]:bg-white [&.week_i]:[box-shadow:0_0_0_0.5px_var(--hair-2)] [&.week_i.red]:bg-red [&.week_i.red]:[box-shadow:none] [&.week_i.red]:text-white motion-safe:[&.week_div]:animate-[rise_0.55s_var(--spring)_both] [@media(max-width:640px)]:h-42.5 [@media(max-width:640px)]:mb-4.5 [&&.week]:gap-2.5 [&.week_div]:w-15.5 [&.week_div]:text-[11.5px] [&.week_div]:text-center [&.week_i]:grid [&.week_i]:place-items-center [&.week_i]:not-italic [&.week_i]:text-[13px] [&.week_i]:font-semibold [&.week_i]:text-ink [&.week_i]:w-11.5 [&.week_i]:h-11.5 [&.week_div:nth-child(5)_span]:text-red [&.week_div:nth-child(5)_span]:font-semibold [@media(max-width:640px)]:[&.week]:gap-0.5 [@media(max-width:640px)]:[&.week_div]:w-11 [@media(max-width:640px)]:[&.week_div]:text-[10px] [@media(max-width:640px)]:[&.week_i]:w-9 [@media(max-width:640px)]:[&.week_i]:h-9 [&&&.tv-art]:gap-3.5 [&.tv-art]:items-end [&.tv-art]:pb-4.5">
            <div className="flex flex-col items-center gap-2 relative [&_b]:absolute [&_b]:-top-2.5 [&_b]:-left-2.5 [&_b]:w-5.5 [&_b]:h-5.5 [&_b]:rounded-[50%] [&_b]:bg-ink [&_b]:text-white [&_b]:text-[12px] [&_b]:grid [&_b]:place-items-center [&_b]:z-1 [&_em]:not-italic [&_em]:text-[12px] [&_em]:font-semibold [&_em]:text-ink-2">
              <b>1</b>
              <span className="hw-col flex flex-col gap-1.75 w-27.5 h-30 rounded-[14px] bg-white p-3.5 [box-shadow:0_0_0_0.5px_var(--hair-2)] [&_i]:h-1.5 [&_i]:rounded-[3px] [&_i]:bg-fill-2 [&.ph]:w-19 [&.ph]:h-35 [&.ph]:rounded-[18px] [&.ph]:[box-shadow:0_0_0_3px_var(--ink)] [&.ph]:justify-center [&.ph]:items-center [@media(max-width:640px)]:w-19.5 [@media(max-width:640px)]:h-25 [@media(max-width:640px)]:p-2.5 [@media(max-width:640px)]:[&.ph]:w-15 [@media(max-width:640px)]:[&.ph]:h-28 txt">
                <i></i>
                <i></i>
                <i className="[.ice-h_&]:text-[14px] [.ice-h_&]:text-ink-2 [.hw-col_i&]:w-[60%]"></i>
                <i className="[.hw-col_i&]:mt-auto [.hw-col_i&]:h-3.5 [.hw-col_i&]:w-[55%] [.hw-col_i&]:rounded-[7px] [.hw-col_i&]:bg-ink"></i>
              </span>
              <em>Czytasz</em>
            </div>
            <div className="flex flex-col items-center gap-2 relative [&_b]:absolute [&_b]:-top-2.5 [&_b]:-left-2.5 [&_b]:w-5.5 [&_b]:h-5.5 [&_b]:rounded-[50%] [&_b]:bg-ink [&_b]:text-white [&_b]:text-[12px] [&_b]:grid [&_b]:place-items-center [&_b]:z-1 [&_em]:not-italic [&_em]:text-[12px] [&_em]:font-semibold [&_em]:text-ink-2 main">
              <b>2</b>
              <span className="hw-col flex flex-col gap-1.75 w-27.5 h-30 rounded-[14px] bg-white p-3.5 [box-shadow:0_0_0_0.5px_var(--hair-2)] [&_i]:h-1.5 [&_i]:rounded-[3px] [&_i]:bg-fill-2 [&.ph]:w-19 [&.ph]:h-35 [&.ph]:rounded-[18px] [&.ph]:[box-shadow:0_0_0_3px_var(--ink)] [&.ph]:justify-center [&.ph]:items-center [@media(max-width:640px)]:w-19.5 [@media(max-width:640px)]:h-25 [@media(max-width:640px)]:p-2.5 [@media(max-width:640px)]:[&.ph]:w-15 [@media(max-width:640px)]:[&.ph]:h-28 ph [aspect-ratio:1/1] rounded-[12px] overflow-hidden relative bg-white [&_span]:absolute [&_span]:left-2 [&_span]:bottom-2 [&_span]:text-[11px] [&_span]:text-white [&_span]:[background:rgb(0_0_0_/_45%)] [&_span]:rounded-[6px] [&_span]:p-[2px_6px]">
                <i className="relative inline-grid place-items-center flex-none [&_svg]:absolute [&_svg]:inset-0 [.hw-col.ph_&]:w-9 [.hw-col.ph_&]:h-3.5 [.hw-col.ph_&]:rounded-[7px] [.hw-col.ph_&]:bg-fill-2 [.hw-col.ph_&]:[outline:2px_solid_var(--signal-blue)] [.hw-col.ph_&]:outline-offset-[3px] motion-safe:[.hw-col.ph_&]:animate-[coach_1.4s_var(--out)_infinite] [.is-r_&_svg_circle:first-child]:[stroke:rgb(255_255_255_/_25%)]"></i>
              </span>
              <em>Klikasz</em>
            </div>
            <div className="flex flex-col items-center gap-2 relative [&_b]:absolute [&_b]:-top-2.5 [&_b]:-left-2.5 [&_b]:w-5.5 [&_b]:h-5.5 [&_b]:rounded-[50%] [&_b]:bg-ink [&_b]:text-white [&_b]:text-[12px] [&_b]:grid [&_b]:place-items-center [&_b]:z-1 [&_em]:not-italic [&_em]:text-[12px] [&_em]:font-semibold [&_em]:text-ink-2">
              <b>3</b>
              <span className="hw-col flex flex-col gap-1.75 w-27.5 h-30 rounded-[14px] bg-white p-3.5 [box-shadow:0_0_0_0.5px_var(--hair-2)] [&_i]:h-1.5 [&_i]:rounded-[3px] [&_i]:bg-fill-2 [&.ph]:w-19 [&.ph]:h-35 [&.ph]:rounded-[18px] [&.ph]:[box-shadow:0_0_0_3px_var(--ink)] [&.ph]:justify-center [&.ph]:items-center [@media(max-width:640px)]:w-19.5 [@media(max-width:640px)]:h-25 [@media(max-width:640px)]:p-2.5 [@media(max-width:640px)]:[&.ph]:w-15 [@media(max-width:640px)]:[&.ph]:h-28 txt">
                <i className="[.ice-h_&]:text-[14px] [.ice-h_&]:text-ink-2 [.hw-col_i&]:w-[60%]"></i>
                <i></i>
                <i className="[.ice-h_&]:text-[14px] [.ice-h_&]:text-ink-2 [.hw-col_i&]:w-[60%]"></i>
                <i></i>
              </span>
              <em>Jak to działa</em>
            </div>
          </div>
          <div className="text-[13px] font-semibold text-ink-2">Jak to obejrzeć</div>
          <h2 className="text-[30px] font-[680] m-[6px_0_10px] text-balance [@media(max-width:640px)]:text-[24px] tracking-tight leading-[1.08]">
            13 rozdziałów, około 6 minut.
          </h2>
          <p className="text-[16px] leading-6 text-ink-2 m-0 text-pretty [@media(max-width:640px)]:text-[15px] [@media(max-width:640px)]:leading-5.5">
            Po lewej przeczytasz, co się dzieje. Telefon w środku działa naprawdę: podświetlimy, co kliknąć.
            Po prawej zobaczysz, jak to działa od środka. Następny rozdział włączysz przyciskiem „Dalej” albo
            strzałką →.
          </p>
        </div>,
      ];
  return (
    <div
      className="tour-bg fixed inset-0 z-200 grid place-items-center p-6 [background:rgb(244_244_246_/_62%)] [-webkit-backdrop-filter:blur(18px)_saturate(140%)] motion-safe:animate-[fade_0.3s_ease-out_both] [@media(max-width:640px)]:p-0 [@media(max-width:640px)]:[place-items:end_stretch] [@media(prefers-reduced-transparency:reduce)]:[-webkit-backdrop-filter:none]! [@media(prefers-reduced-transparency:reduce)]:[background:rgb(244_244_246_/_96%)]"
      role="dialog"
      aria-modal="true"
      aria-label="Wprowadzenie"
    >
      <div className="tour relative w-[min(620px,100%)] bg-white rounded-4xl p-[36px_40px_28px] [box-shadow:0_40px_100px_-30px_rgb(11_13_18_/_35%),_0_0_0_0.5px_var(--hair)] motion-safe:animate-[tour-in_0.5s_var(--out)_both] [@media(max-width:640px)]:w-full [@media(max-width:640px)]:rounded-[28px_28px_0_0] [@media(max-width:640px)]:p-[26px_22px_22px] max-h-[calc(100dvh-32px)] overflow-auto [@media(max-width:640px)]:max-h-[92dvh] motion-safe:[&_button]:[transition:transform_0.16s_var(--ease-out),_background-color_0.15s_ease,_box-shadow_0.2s_ease] motion-safe:[&_button:active]:transform-[scale(0.97)] motion-safe:[&_button:active]:[transition-duration:0.1s] [@media(prefers-contrast:more)]:[box-shadow:0_0_0_1px_var(--ink)]">
        <button
          className="absolute top-4.5 right-4.5 w-9 h-9 rounded-[50%] bg-fill grid place-items-center text-ink [@media(max-width:640px)]:top-3 [@media(max-width:640px)]:right-3 [@media(max-width:640px)]:z-2"
          aria-label="Zamknij"
          onClick={onClose}
        >
          {I('x', 18)}
        </button>
        {slides[k]}
        <div className="flex justify-between items-center mt-6.5">
          {N > 1 ? (
            <div className="tour-dots flex gap-1.5 [&_i]:w-1.5 [&_i]:h-1.5 [&_i]:rounded-[3px] [&_i]:bg-fill-2 [&_i]:[transition:width_0.3s_var(--out),_background_0.3s]">
              {Array.from({ length: N }, (_, j) => (
                <i
                  key={j}
                  className={
                    j === k
                      ? 'on [.progress_i&]:bg-ink [.steps_i&]:bg-ink [.st-ab_>_div&&]:bg-white [.st-ab_&_p]:text-ink [.tour-dots_i&]:w-5.5 [.tour-dots_i&]:bg-ink [.call-keys_button&_span]:bg-white [.call-keys_button&_span]:text-ink'
                      : ''
                  }
                ></i>
              ))}
            </div>
          ) : (
            <span></span>
          )}
          <div className="tour-btns flex gap-2">
            {outro ? (
              <>
                <button
                  className="pill whitespace-nowrap h-13 rounded-[999px] bg-ink text-white text-[16px] font-semibold p-[0_22px] inline-flex items-center justify-center gap-2 [border:0] [box-shadow:none] [.attn-act_&]:text-[14px] [.attn-act_&]:p-[0_16px] [.attn-act_&]:h-9.5 [.st-nav_&]:h-11 [.st-nav_&]:text-[15px] [.st-nav_&]:p-[0_18px] [.st-nav_&:disabled]:opacity-[0.35] [.tour-btns_&]:h-11.5 [.tour-btns_&]:text-[15px] [@media(max-width:640px)]:[.tour-btns_&]:h-11 [@media(max-width:640px)]:[.tour-btns_&]:p-[0_16px] motion-safe:[transition:transform_0.16s_var(--ease-out),_background-color_0.15s_ease,_box-shadow_0.2s_ease] motion-safe:[&:active]:transform-[scale(0.97)] motion-safe:[&:active]:[transition-duration:0.1s] [.st-nav_&.ready]:[outline:2px_solid_var(--signal-blue)] [.st-nav_&.ready]:outline-offset-[3px] [.st-nav_&.ready]:[box-shadow:0_0_0_6px_rgb(47_107_255_/_18%)] motion-safe:[.st-nav_&.ready]:animate-[coach_1.6s_var(--out)_infinite]! [.w2-acts_&]:flex-1 [.w2-acts_&]:justify-center motion-safe:[.st-nav_&.ready]:[animation-iteration-count:3]! [&.pill]:bg-fill [&.pill]:text-ink [.st-nav_&.pill]:w-11 [.st-nav_&.pill]:p-0"
                  onClick={onClose}
                >
                  Klikaj dalej sam
                </button>
                <button
                  className="pill whitespace-nowrap h-13 rounded-[999px] bg-ink text-white text-[16px] font-semibold p-[0_22px] inline-flex items-center justify-center gap-2 [border:0] [box-shadow:none] [.attn-act_&]:text-[14px] [.attn-act_&]:p-[0_16px] [.attn-act_&]:h-9.5 [.st-nav_&]:h-11 [.st-nav_&]:text-[15px] [.st-nav_&]:p-[0_18px] [.st-nav_&:disabled]:opacity-[0.35] [.tour-btns_&]:h-11.5 [.tour-btns_&]:text-[15px] [@media(max-width:640px)]:[.tour-btns_&]:h-11 [@media(max-width:640px)]:[.tour-btns_&]:p-[0_16px] motion-safe:[transition:transform_0.16s_var(--ease-out),_background-color_0.15s_ease,_box-shadow_0.2s_ease] motion-safe:[&:active]:transform-[scale(0.97)] motion-safe:[&:active]:[transition-duration:0.1s] [.st-nav_&.ready]:[outline:2px_solid_var(--signal-blue)] [.st-nav_&.ready]:outline-offset-[3px] [.st-nav_&.ready]:[box-shadow:0_0_0_6px_rgb(47_107_255_/_18%)] motion-safe:[.st-nav_&.ready]:animate-[coach_1.6s_var(--out)_infinite]! [.w2-acts_&]:flex-1 [.w2-acts_&]:justify-center motion-safe:[.st-nav_&.ready]:[animation-iteration-count:3]!"
                  onClick={onStart}
                >
                  Obejrzyj od nowa
                </button>
              </>
            ) : k < N - 1 ? (
              <>
                <button
                  className="pill whitespace-nowrap h-13 rounded-[999px] bg-ink text-white text-[16px] font-semibold p-[0_22px] inline-flex items-center justify-center gap-2 [border:0] [box-shadow:none] [.attn-act_&]:text-[14px] [.attn-act_&]:p-[0_16px] [.attn-act_&]:h-9.5 [.st-nav_&]:h-11 [.st-nav_&]:text-[15px] [.st-nav_&]:p-[0_18px] [.st-nav_&:disabled]:opacity-[0.35] [.tour-btns_&]:h-11.5 [.tour-btns_&]:text-[15px] [@media(max-width:640px)]:[.tour-btns_&]:h-11 [@media(max-width:640px)]:[.tour-btns_&]:p-[0_16px] motion-safe:[transition:transform_0.16s_var(--ease-out),_background-color_0.15s_ease,_box-shadow_0.2s_ease] motion-safe:[&:active]:transform-[scale(0.97)] motion-safe:[&:active]:[transition-duration:0.1s] [.st-nav_&.ready]:[outline:2px_solid_var(--signal-blue)] [.st-nav_&.ready]:outline-offset-[3px] [.st-nav_&.ready]:[box-shadow:0_0_0_6px_rgb(47_107_255_/_18%)] motion-safe:[.st-nav_&.ready]:animate-[coach_1.6s_var(--out)_infinite]! [.w2-acts_&]:flex-1 [.w2-acts_&]:justify-center motion-safe:[.st-nav_&.ready]:[animation-iteration-count:3]! [&.pill]:bg-fill [&.pill]:text-ink [.st-nav_&.pill]:w-11 [.st-nav_&.pill]:p-0"
                  onClick={onClose}
                >
                  Pomiń
                </button>
                <button
                  className="pill whitespace-nowrap h-13 rounded-[999px] bg-ink text-white text-[16px] font-semibold p-[0_22px] inline-flex items-center justify-center gap-2 [border:0] [box-shadow:none] [.attn-act_&]:text-[14px] [.attn-act_&]:p-[0_16px] [.attn-act_&]:h-9.5 [.st-nav_&]:h-11 [.st-nav_&]:text-[15px] [.st-nav_&]:p-[0_18px] [.st-nav_&:disabled]:opacity-[0.35] [.tour-btns_&]:h-11.5 [.tour-btns_&]:text-[15px] [@media(max-width:640px)]:[.tour-btns_&]:h-11 [@media(max-width:640px)]:[.tour-btns_&]:p-[0_16px] motion-safe:[transition:transform_0.16s_var(--ease-out),_background-color_0.15s_ease,_box-shadow_0.2s_ease] motion-safe:[&:active]:transform-[scale(0.97)] motion-safe:[&:active]:[transition-duration:0.1s] [.st-nav_&.ready]:[outline:2px_solid_var(--signal-blue)] [.st-nav_&.ready]:outline-offset-[3px] [.st-nav_&.ready]:[box-shadow:0_0_0_6px_rgb(47_107_255_/_18%)] motion-safe:[.st-nav_&.ready]:animate-[coach_1.6s_var(--out)_infinite]! [.w2-acts_&]:flex-1 [.w2-acts_&]:justify-center motion-safe:[.st-nav_&.ready]:[animation-iteration-count:3]!"
                  onClick={next}
                >
                  Dalej {I('chevron', 16)}
                </button>
              </>
            ) : (
              <>
                <button
                  className="pill whitespace-nowrap h-13 rounded-[999px] bg-ink text-white text-[16px] font-semibold p-[0_22px] inline-flex items-center justify-center gap-2 [border:0] [box-shadow:none] [.attn-act_&]:text-[14px] [.attn-act_&]:p-[0_16px] [.attn-act_&]:h-9.5 [.st-nav_&]:h-11 [.st-nav_&]:text-[15px] [.st-nav_&]:p-[0_18px] [.st-nav_&:disabled]:opacity-[0.35] [.tour-btns_&]:h-11.5 [.tour-btns_&]:text-[15px] [@media(max-width:640px)]:[.tour-btns_&]:h-11 [@media(max-width:640px)]:[.tour-btns_&]:p-[0_16px] motion-safe:[transition:transform_0.16s_var(--ease-out),_background-color_0.15s_ease,_box-shadow_0.2s_ease] motion-safe:[&:active]:transform-[scale(0.97)] motion-safe:[&:active]:[transition-duration:0.1s] [.st-nav_&.ready]:[outline:2px_solid_var(--signal-blue)] [.st-nav_&.ready]:outline-offset-[3px] [.st-nav_&.ready]:[box-shadow:0_0_0_6px_rgb(47_107_255_/_18%)] motion-safe:[.st-nav_&.ready]:animate-[coach_1.6s_var(--out)_infinite]! [.w2-acts_&]:flex-1 [.w2-acts_&]:justify-center motion-safe:[.st-nav_&.ready]:[animation-iteration-count:3]! [&.pill]:bg-fill [&.pill]:text-ink [.st-nav_&.pill]:w-11 [.st-nav_&.pill]:p-0"
                  onClick={onClose}
                >
                  Rozejrzę się sam
                </button>
                <button
                  className="pill whitespace-nowrap h-13 rounded-[999px] bg-ink text-white text-[16px] font-semibold p-[0_22px] inline-flex items-center justify-center gap-2 [border:0] [box-shadow:none] [.attn-act_&]:text-[14px] [.attn-act_&]:p-[0_16px] [.attn-act_&]:h-9.5 [.st-nav_&]:h-11 [.st-nav_&]:text-[15px] [.st-nav_&]:p-[0_18px] [.st-nav_&:disabled]:opacity-[0.35] [.tour-btns_&]:h-11.5 [.tour-btns_&]:text-[15px] [@media(max-width:640px)]:[.tour-btns_&]:h-11 [@media(max-width:640px)]:[.tour-btns_&]:p-[0_16px] motion-safe:[transition:transform_0.16s_var(--ease-out),_background-color_0.15s_ease,_box-shadow_0.2s_ease] motion-safe:[&:active]:transform-[scale(0.97)] motion-safe:[&:active]:[transition-duration:0.1s] [.st-nav_&.ready]:[outline:2px_solid_var(--signal-blue)] [.st-nav_&.ready]:outline-offset-[3px] [.st-nav_&.ready]:[box-shadow:0_0_0_6px_rgb(47_107_255_/_18%)] motion-safe:[.st-nav_&.ready]:animate-[coach_1.6s_var(--out)_infinite]! [.w2-acts_&]:flex-1 [.w2-acts_&]:justify-center motion-safe:[.st-nav_&.ready]:[animation-iteration-count:3]!"
                  onClick={onStart}
                >
                  Zacznij historię {I('chevron', 16)}
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
