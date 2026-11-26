import { TABOF } from '@/app/routes';
import { TECH } from '@/tech/techData';

/** Explains, step by step, which public systems the current screen relies on. */
export function TechPanel({ route }: { route: string }) {
  const t = TECH[route] || TECH[TABOF(route)] || TECH.today;
  return (
    <div className="tech bg-white [border:1px_solid_var(--line)] rounded-[26px] p-[20px_20px_16px] [&_h3]:m-[4px_0_14px] [&_h3]:leading-[1.05] [&_h3]:font-sans [&_h3]:font-bold [&_h3]:text-[24px] [&_h3]:tracking-[-0.02em] [.sheet_&]:[border:0] [.sheet_&]:bg-white [.sheet_&]:rounded-[12px] [.sheet_&]:p-4 [&_.sys]:font-semibold [&_.what]:text-ink-2 [.how-card_&&]:[background:none] [.how-card_&]:[border:0] [.how-card_&&]:p-0 [.how-card_&_h3]:text-[22px] [.how-card_&_h3]:leading-7 [.how-card_&_h3]:font-[650] [.how-card_&_h3]:tracking-tight [.how-card_&_h3]:m-[0_0_20px] [.sheet_&_h3]:text-[22px] [.sheet_&_h3]:leading-7 [.sheet_&_h3]:font-[650] [.sheet_&_h3]:tracking-tight [.sheet_&_h3]:m-[0_0_20px]">
      <div className="[.tech_&]:normal-case! [.tech_&]:[letter-spacing:0]! normal-case! [letter-spacing:0]! [.tech_&]:text-[13px] [.tech_&]:font-medium [.tech_&]:text-ink-2 [.how-card_.tech_&]:hidden">
        Jak to działa na tym ekranie
      </div>
      <h3>{t[0]}</h3>
      <ol className="[list-style:none] m-0 p-0 flex flex-col">
        {t[1].map(([sys, what, k], i) => (
          <li
            key={what}
            className={
              'tstep relative grid grid-cols-[24px_1fr] gap-x-3.5 pb-4.5 [&:last-child]:pb-0 [&:not(:last-child)::before]:[content:""] [&:not(:last-child)::before]:absolute [&:not(:last-child)::before]:left-[11.5px] [&:not(:last-child)::before]:top-7.5 [&:not(:last-child)::before]:bottom-1.5 [&:not(:last-child)::before]:w-px [&:not(:last-child)::before]:bg-hair-2 motion-safe:[.how-card_&]:animate-[fadeUp_0.35s_var(--out)_both] motion-safe:[.how-card_&:nth-child(2)]:[animation-delay:0.04s] motion-safe:[.how-card_&:nth-child(3)]:[animation-delay:0.08s] motion-safe:[.how-card_&:nth-child(n_+_4)]:[animation-delay:0.12s]' +
              (k === 'a' ? ' ai' : '')
            }
          >
            <span className="w-6 h-6 rounded-[50%] grid place-items-center text-[11.5px] font-semibold [font-variant-numeric:tabular-nums] text-ink bg-fill -mt-px [.tstep.ai_&]:[background:linear-gradient(135deg,_var(--signal-blue),_var(--signal-violet))] [.tstep.ai_&]:text-white [.tstep.ai_&]:[box-shadow:0_4px_10px_-4px_rgb(76_90_255_/_60%)]">
              {k === 'a' ? (
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2l2.2 6.3L20.5 10l-6.3 2.2L12 18.5l-2.2-6.3L3.5 10l6.3-1.7z" />
                </svg>
              ) : (
                i + 1
              )}
            </span>
            <div className="min-w-0">
              <div className="flex items-center gap-2 min-h-5.5">
                <span className="text-[15px] leading-5.5 font-semibold tracking-[-0.012em] text-ink">
                  {sys}
                </span>
                {k === 'a' && (
                  <span className="inline-flex items-center h-4.5 p-[0_7px] rounded-[999px] text-[10.5px] font-bold tracking-wider text-[#4a55f0] [background:linear-gradient(135deg,_rgb(47_107_255_/_12%),_rgb(122_77_255_/_14%))] flex-none [.ts-foot_&]:mt-0">
                    AI
                  </span>
                )}
              </div>
              <div className="text-[13.5px] leading-5 text-ink-2 mt-0.5 text-pretty">{what}</div>
            </div>
          </li>
        ))}
      </ol>
      {t[1].some(x => x[2] === 'a') && (
        <div className="ts-foot flex items-start gap-2 mt-5 pt-3.5 [border-top:0.5px_solid_var(--hair-2)] text-[12.5px] leading-4.5 text-ink-2">
          <span className="inline-flex items-center h-4.5 p-[0_7px] rounded-[999px] text-[10.5px] font-bold tracking-wider text-[#4a55f0] [background:linear-gradient(135deg,_rgb(47_107_255_/_12%),_rgb(122_77_255_/_14%))] flex-none [.ts-foot_&]:mt-0">
            AI
          </span>{' '}
          Polski model językowy. Proponuje, ale nic nie wysyła bez Twojego potwierdzenia.
        </div>
      )}
    </div>
  );
}
