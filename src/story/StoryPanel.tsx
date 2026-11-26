import { BEATS, CHAPTERS, beatOf } from '@/story/chapters';
import { I } from '@/ui/icons';
import type { Persona } from '@/types';

export function StoryPanel({
  i,
  route,
  go,
  step,
  lastBeat = 0,
}: {
  i: number;
  route: string;
  go: (r: string, p?: Persona) => void;
  step: (d: number) => void;
  lastBeat?: number;
}) {
  const ch = CHAPTERS[i],
    beats = BEATS[i];
  const here = beatOf(i, route),
    off = here < 0 && route !== beats[0][0];
  const cur = here >= 0 ? here : Math.min(lastBeat, beats.length - 1);
  const last = cur === beats.length - 1;
  return (
    <div className="story" key={i}>
      <div className="st-n">
        <span>{ch.when}</span>
      </div>
      <h2 className="st-t">{ch.t}</h2>
      <p className="st-hook">{ch.hook}</p>
      <div className="st-ab">
        <div>
          <span className="st-k">Dziś</span>
          <p>{ch.today}</p>
        </div>
        <div className="on">
          <span className="st-k">W nowym mObywatelu</span>
          <p>{ch.razem}</p>
        </div>
      </div>
      <ol className="beats">
        {beats.map(([r, t], j) => (
          <li className={j < cur ? 'done' : j === cur ? 'now' : ''}>
            <button className="bt-dot" onClick={() => go(r, ch.p)} aria-label={'Krok ' + (j + 1)}>
              {j < cur ? I('check', 13) : j + 1}
            </button>
            <div>
              <p>{t}</p>
              {j === cur && off && (
                <button className="bt-back" onClick={() => go(r, ch.p)}>
                  {I('left', 14)}
                  <span>Wróć do tego kroku</span>
                </button>
              )}
            </div>
          </li>
        ))}
      </ol>
      {last && (
        <div className="st-done">
          {i < CHAPTERS.length - 1 ? 'Ten rozdział za Tobą.' : 'To ostatni rozdział.'}
        </div>
      )}
      <div className="st-nav">
        <button
          className="pill soft"
          disabled={i === 0}
          onClick={() => step(-1)}
          aria-label="Poprzedni rozdział"
        >
          {I('left', 18)}
        </button>
        <button className="pill st-next" onClick={() => step(1)}>
          {i < CHAPTERS.length - 1 ? <>Dalej: {CHAPTERS[i + 1].t}</> : 'Zakończ historię'} {I('chevron', 16)}
        </button>
      </div>
      {ch.x.length > 0 && (
        <div className="st-more">
          <span>Zobacz też</span>
          {ch.x.map(([t, r]) => (
            <button onClick={() => go(r, ch.p)}>{t}</button>
          ))}
        </div>
      )}
    </div>
  );
}

export function Progress12({ i, goChap }: { i: number; goChap: (k: number) => void }) {
  return (
    <div className="p12">
      <div className="p12-k">
        <span>
          Rozdział {i + 1} z {CHAPTERS.length}
        </span>
      </div>
      <div className="p12-bar">
        {CHAPTERS.map((ch, j) => (
          <button
            className={j < i ? 'done' : j === i ? 'now' : ''}
            onClick={() => goChap(j)}
            title={ch.t}
            aria-label={'Rozdział ' + (j + 1) + ': ' + ch.t}
          >
            <span>{ch.t}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
