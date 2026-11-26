import { sx } from '@/lib/sx';
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
        <div className="tv" key="o">
          <div className="tv-art">
            <div className="tv-card">
              <DocCard interactive={false} />
            </div>
          </div>
          <div className="tv-k">To wszystko</div>
          <h2 className="tv-h">Tak mógłby działać mObywatel.</h2>
          <p className="tv-p">
            Część tych funkcji działa już dziś, reszta korzysta z rejestrów, które państwo już ma. Przy każdym
            ekranie widać, jak to działa i gdzie pomaga AI.
          </p>
        </div>,
      ]
    : [
        <div className="tv" key="0">
          <div className="tv-art fam">
            {PEOPLE.map(([i, n, r], j) => (
              <div className="tv-person" style={sx(`animation-delay:${j * 70}ms`)}>
                <Av i={i} size={j === 0 ? 72 : 56} />
                <b>{n}</b>
                <span>{r}</span>
              </div>
            ))}
          </div>
          <div className="tv-k">Prototyp nowego mObywatela</div>
          <h2 className="tv-h">Poznaj Nowickich.</h2>
          <p className="tv-p">
            Anna i Tomasz mieszkają w Krakowie z sześcioletnią Zosią. Tata Anny, Stanisław, mieszka sam w
            Sandomierzu. Rodzina jest zmyślona, sprawy są prawdziwe.
          </p>
        </div>,
        <div className="tv" key="1">
          <div className="tv-art scatter">
            {OFFICES.map((o, j) => (
              <span style={sx(`--r:${((j * 37) % 13) - 6}deg;--d:${j * 40}ms`)}>{o}</span>
            ))}
          </div>
          <div className="tv-k">Ich tydzień</div>
          <h2 className="tv-h">Przeprowadzka, poród, kardiolog, mandat, alarm i zalane mieszkanie.</h2>
          <p className="tv-p">
            Dziś każda z tych spraw to inny urząd, inny formularz i ten sam PESEL wpisywany od nowa.
          </p>
        </div>,
        <div className="tv" key="2">
          <div className="tv-art">
            <div className="tv-card">
              <DocCard interactive={false} />
            </div>
          </div>
          <div className="tv-k">Pomysł</div>
          <h2 className="tv-h">Jedna aplikacja, która prowadzi sprawę do końca.</h2>
          <div className="tv-3">
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
        <div className="tv" key="3">
          <div className="tv-art howto">
            <div className="hw">
              <b>1</b>
              <span className="hw-col txt">
                <i></i>
                <i></i>
                <i className="s"></i>
                <i className="btn"></i>
              </span>
              <em>Czytasz</em>
            </div>
            <div className="hw main">
              <b>2</b>
              <span className="hw-col ph">
                <i className="ring"></i>
              </span>
              <em>Klikasz</em>
            </div>
            <div className="hw">
              <b>3</b>
              <span className="hw-col txt">
                <i className="s"></i>
                <i></i>
                <i className="s"></i>
                <i></i>
              </span>
              <em>Jak to działa</em>
            </div>
          </div>
          <div className="tv-k">Jak to obejrzeć</div>
          <h2 className="tv-h">13 rozdziałów, około 6 minut.</h2>
          <p className="tv-p">
            Po lewej przeczytasz, co się dzieje. Telefon w środku działa naprawdę: podświetlimy, co kliknąć.
            Po prawej zobaczysz, jak to działa od środka. Następny rozdział włączysz przyciskiem „Dalej” albo
            strzałką →.
          </p>
        </div>,
      ];
  return (
    <div className="tour-bg" role="dialog" aria-modal="true" aria-label="Wprowadzenie">
      <div className="tour">
        <button className="tour-x" aria-label="Zamknij" onClick={onClose}>
          {I('x', 18)}
        </button>
        {slides[k]}
        <div className="tour-foot">
          {N > 1 ? (
            <div className="tour-dots">
              {Array.from({ length: N }, (_, j) => (
                <i className={j === k ? 'on' : ''}></i>
              ))}
            </div>
          ) : (
            <span></span>
          )}
          <div className="tour-btns">
            {outro ? (
              <>
                <button className="pill soft" onClick={onClose}>
                  Klikaj dalej sam
                </button>
                <button className="pill" onClick={onStart}>
                  Obejrzyj od nowa
                </button>
              </>
            ) : k < N - 1 ? (
              <>
                <button className="pill soft" onClick={onClose}>
                  Pomiń
                </button>
                <button className="pill" onClick={next}>
                  Dalej {I('chevron', 16)}
                </button>
              </>
            ) : (
              <>
                <button className="pill soft" onClick={onClose}>
                  Rozejrzę się sam
                </button>
                <button className="pill" onClick={onStart}>
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
