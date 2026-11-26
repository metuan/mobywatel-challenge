import {
  List,
  ListRow,
  ListRowAvatar,
  ListRowContent,
  ListRowDescription,
  ListRowTitle,
} from '@/components/ui/list';
import { Badge } from '@/components/ui/badge';
import { Note } from '@/components/ui/note';
import { Title } from '@/components/ui/typography';
import { I } from '@/ui/icons';
import type { Ctx } from '@/types';

export function FamilyMap(c: Ctx) {
  return (
    <div>
      <Badge style={{ marginTop: '8px' }}>Alert RCB trwa · Kraków</Badge>
      <Title>Gdzie jest rodzina</Title>
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
      <List style={{ marginTop: '12px' }}>
        <ListRow>
          <ListRowAvatar>AN</ListRowAvatar>
          <ListRowContent>
            <ListRowTitle>Ty</ListRowTitle>
            <ListRowDescription>Schron, Dekerta 24 · od 15:49</ListRowDescription>
          </ListRowContent>
          <Badge>Bezpieczna</Badge>
        </ListRow>
        <ListRow>
          <ListRowAvatar>ZN</ListRowAvatar>
          <ListRowContent>
            <ListRowTitle>Zosia</ListRowTitle>
            <ListRowDescription>Z przedszkolem w schronie · 1,9 km od Ciebie</ListRowDescription>
          </ListRowContent>
          <Badge>Bezpieczna</Badge>
        </ListRow>
        <ListRow>
          <ListRowAvatar>TN</ListRowAvatar>
          <ListRowContent>
            <ListRowTitle>Tomasz</ListRowTitle>
            <ListRowDescription>Katowice · poza strefą alarmu</ListRowDescription>
          </ListRowContent>
          <Badge>Bezpieczny</Badge>
        </ListRow>
        <ListRow>
          <ListRowAvatar>SN</ListRowAvatar>
          <ListRowContent>
            <ListRowTitle>Tata</ListRowTitle>
            <ListRowDescription>Sandomierz · poza strefą alarmu · nie odpowiada</ListRowDescription>
          </ListRowContent>
          <button className="mini" onClick={() => c.go('easy-call')}>
            {I('phone', 14)} Zadzwoń
          </button>
        </ListRow>
      </List>
      <Note icon="lock" style={{ marginTop: '12px' }}>
        Lokalizację widzi tylko rodzina i tylko w czasie alarmu. Udostępnianie wyłącza się samo po odwołaniu.
      </Note>
    </div>
  );
}
