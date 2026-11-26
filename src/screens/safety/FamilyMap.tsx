import { I } from '@/ui/icons';
import type { Ctx } from '@/types';

export function FamilyMap(c: Ctx) {
  return (
    <div>
      <span className="pill p-red" style={{ marginTop: '8px' }}>
        Alert RCB trwa · Kraków
      </span>
      <h1 className="h-l">Gdzie jest rodzina</h1>
      <div className="map" style={{ position: 'relative' }}>
        <svg viewBox="0 0 350 260" width="100%" role="img" aria-label="Mapa: położenie rodziny">
          <rect width="350" height="260" fill="#eef0ea" />
          <path
            d="M-10 180C60 150 120 200 190 170S300 120 360 140"
            stroke="#cfe0f5"
            strokeWidth="22"
            fill="none"
          />
          <g stroke="#fff" strokeWidth="9" fill="none">
            <path d="M0 70H350M0 230H350M80 0V260M220 0V260M300 0V260" />
            <path d="M0 20 350 120" strokeWidth="6" />
          </g>
          <g fill="#e2e4dc">
            <rect x="96" y="84" width="108" height="56" rx="6" />
            <rect x="236" y="10" width="50" height="50" rx="6" />
            <rect x="10" y="88" width="56" height="60" rx="6" />
          </g>
          <circle
            cx="150"
            cy="110"
            r="34"
            fill="rgba(212,42,62,.08)"
            stroke="rgba(212,42,62,.35)"
            strokeDasharray="3 4"
          />
          <g className="mpin" transform="translate(150 110)">
            <circle r="15" fill="#22408f" stroke="#fff" strokeWidth="3" />
            <text y="4" textAnchor="middle" fontSize="10" fontWeight="700" fill="#fff" fontFamily="Inter">
              AN
            </text>
          </g>
          <g className="mpin" style={{ animationDelay: '.12s' }} transform="translate(262 205)">
            <circle r="15" fill="#b0533f" stroke="#fff" strokeWidth="3" />
            <text y="4" textAnchor="middle" fontSize="10" fontWeight="700" fill="#fff" fontFamily="Inter">
              ZN
            </text>
          </g>
          <text
            x="150"
            y="142"
            textAnchor="middle"
            fontSize="10.5"
            fill="#1b2333"
            fontFamily="Inter"
            fontWeight="600"
          >
            Schron, Dekerta 24
          </text>
          <text
            x="262"
            y="237"
            textAnchor="middle"
            fontSize="10.5"
            fill="#1b2333"
            fontFamily="Inter"
            fontWeight="600"
          >
            Przedszkole nr 12
          </text>
          <g transform="translate(18 26)">
            <rect width="122" height="26" rx="13" fill="#fff" stroke="#e6e6ea" />
            <text x="12" y="17" fontSize="11" fill="#1b2333" fontFamily="Inter">
              ← Tomasz · Katowice
            </text>
          </g>
          <g transform="translate(206 26)">
            <rect width="128" height="26" rx="13" fill="#fff" stroke="#e6e6ea" />
            <text x="12" y="17" fontSize="11" fill="#1b2333" fontFamily="Inter">
              Tata · Sandomierz →
            </text>
          </g>
        </svg>
      </div>
      <div className="list" style={{ marginTop: '12px' }}>
        <div className="row">
          <span className="face-i" style={{ background: '#22408f' }}>
            AN
          </span>
          <span className="tx">
            <div className="t">Ty</div>
            <div className="s">Schron, Dekerta 24 · od 15:49</div>
          </span>
          <span className="pill p-green">Bezpieczna</span>
        </div>
        <div className="row">
          <span className="face-i" style={{ background: '#b0533f' }}>
            ZN
          </span>
          <span className="tx">
            <div className="t">Zosia</div>
            <div className="s">Z przedszkolem w schronie · 1,9 km od Ciebie</div>
          </span>
          <span className="pill p-green">Bezpieczna</span>
        </div>
        <div className="row">
          <span className="face-i" style={{ background: '#3d5a80' }}>
            TN
          </span>
          <span className="tx">
            <div className="t">Tomasz</div>
            <div className="s">Katowice · poza strefą alarmu</div>
          </span>
          <span className="pill p-green">Bezpieczny</span>
        </div>
        <div className="row">
          <span className="face-i" style={{ background: '#1c7a4c' }}>
            SN
          </span>
          <span className="tx">
            <div className="t">Tata</div>
            <div className="s">Sandomierz · poza strefą alarmu · nie odpowiada</div>
          </span>
          <button className="mini" onClick={() => c.go('easy-call')}>
            {I('phone', 14)} Zadzwoń
          </button>
        </div>
      </div>
      <div className="note" style={{ marginTop: '12px' }}>
        {I('lock', 18)}
        <span>
          Lokalizację widzi tylko rodzina i tylko w czasie alarmu. Udostępnianie wyłącza się samo po
          odwołaniu.
        </span>
      </div>
    </div>
  );
}
