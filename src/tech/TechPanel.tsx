import { TABOF } from '@/app/routes';
import { TECH } from '@/tech/techData';

/** Explains, step by step, which public systems the current screen relies on. */
export function TechPanel({ route }: { route: string }) {
  const t = TECH[route] || TECH[TABOF(route)] || TECH.today;
  return (
    <div className="tech">
      <div className="eyebrow">Jak to działa na tym ekranie</div>
      <h3>{t[0]}</h3>
      <ol className="tsteps">
        {t[1].map(([sys, what, k], i) => (
          <li className={'tstep' + (k === 'a' ? ' ai' : '')}>
            <span className="ts-dot">
              {k === 'a' ? (
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2l2.2 6.3L20.5 10l-6.3 2.2L12 18.5l-2.2-6.3L3.5 10l6.3-1.7z" />
                </svg>
              ) : (
                i + 1
              )}
            </span>
            <div className="ts-b">
              <div className="ts-h">
                <span className="ts-t">{sys}</span>
                {k === 'a' && <span className="ts-ai">AI</span>}
              </div>
              <div className="ts-w">{what}</div>
            </div>
          </li>
        ))}
      </ol>
      {t[1].some(x => x[2] === 'a') && (
        <div className="ts-foot">
          <span className="ts-ai">AI</span> Polski model językowy. Proponuje, ale nic nie wysyła bez Twojego
          potwierdzenia.
        </div>
      )}
    </div>
  );
}
