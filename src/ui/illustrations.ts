import { html } from '@/lib/preact';

const C_ = { ink: '#0B0D12', navy: '#E4E5E9', sky: '#ffffff', coral: '#E4E5E9', sand: '#ffffff', sand2: '#EDEEF1', mint: '#ffffff', yellow: '#ffffff', yellow2: '#EDEEF1', rose: '#ffffff', cream: '#ffffff', green: '#E4E5E9' };

const ILLS = {
  move: html`<g>
    <path d="M62 44 84 26 106 44V82H62z" fill=${C_.sky}/><rect x="78" y="62" width="12" height="20" rx="2" fill=${C_.navy}/><rect x="70" y="48" width="9" height="8" rx="1.5" fill="#fff"/>
    <path d="M18 52 26 42H70L62 52z" fill=${C_.sand2}/><path d="M62 52 70 42V74L62 84z" fill="#d8d7d0"/><path d="M18 52H62V84H18z" fill=${C_.sand}/>
    <rect x="35" y="52" width="10" height="32" fill=${C_.cream} opacity=".9"/><path d="M24 62h6M24 67h4" stroke=${C_.ink} stroke-width="2" stroke-linecap="round"/></g>`,
  baby: html`<g>
    <path d="M32 50a28 28 0 0 1 28-28v28z" fill=${C_.coral}/><path d="M32 50h58c0 13-10 22-26 22H50c-11 0-18-9-18-22z" fill=${C_.rose}/>
    <path d="M90 50 99 33h9" fill="none" stroke=${C_.ink} stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M50 72 44 82M70 72l8 10" stroke=${C_.ink} stroke-width="3" stroke-linecap="round"/>
    <circle cx="44" cy="82" r="8" fill="#fff"/><circle cx="78" cy="82" r="8" fill="#fff"/><circle cx="44" cy="82" r="2" fill=${C_.ink}/><circle cx="78" cy="82" r="2" fill=${C_.ink}/></g>`,
  car: html`<g>
    <path d="M14 70V60c0-4 3-6 7-7l13-3 12-14c2-2 4-3 7-3h27c3 0 5 1 7 3l11 14 6 2c3 1 4 4 4 7v11z" fill=${C_.sky}/>
    <path d="M51 38h13v12H40zM68 38h13l10 12H68z" fill="#fff"/><rect x="98" y="56" width="8" height="5" rx="2" fill="#e6e5df"/><rect x="48" y="56" width="26" height="9" rx="1.5" fill="#fff" stroke-width="1.4"/><rect x="48" y="56" width="4" height="9" fill=${C_.navy} stroke="none"/><text x="63" y="63" font-size="5.5" font-family="Inter" font-weight="700" fill="#0c1222" stroke="none" text-anchor="middle">KR 4F21</text>
    <circle cx="35" cy="71" r="10" fill=${C_.ink}/><circle cx="87" cy="71" r="10" fill=${C_.ink}/><circle cx="35" cy="71" r="4" fill="#fff"/><circle cx="87" cy="71" r="4" fill="#fff"/></g>`,
  coin: html`<g>${[70, 61, 52, 43].map(y => html`<g><path d=${`M24 ${y}v8a22 6 0 0 0 44 0v-8`} fill=${C_.yellow2}/><ellipse cx="46" cy=${y} rx="22" ry="6" fill=${C_.yellow}/></g>`)}
    <path d="M89 72C71 60 71 46 80 44c5-1 8 2 9 5 1-3 4-6 9-5 9 2 9 16-9 28z" fill=${C_.coral}/></g>`,
  shield: html`<g>
    <path d="M60 14 88 24v24c0 18-12 30-28 36-16-6-28-18-28-36V24z" fill=${C_.navy}/>
    <path d="M47 49 56 58 74 40" fill="none" stroke="#fff" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M95 28a14 14 0 0 1 7 12M99 19a24 24 0 0 1 12 21" fill="none" stroke=${C_.coral} stroke-width="3" stroke-linecap="round"/></g>`,
  family: html`<g>
    <path d="M26 82V64c0-8 6-12 14-12s14 4 14 12v18z" fill=${C_.navy}/><circle cx="40" cy="39" r="9" fill=${C_.sand}/>
    <path d="M66 82V64c0-8 6-12 14-12s14 4 14 12v18z" fill=${C_.coral}/><circle cx="80" cy="39" r="9" fill=${C_.sand}/>
    <path d="M50 82V73c0-5 4-8 10-8s10 3 10 8v9z" fill=${C_.mint}/><circle cx="60" cy="56" r="7" fill=${C_.sand}/>
    <path d="M60 32c-7-4-7-10-3-11 2 0 3 1 3 2 0-1 1-2 3-2 4 1 4 7-3 11z" fill=${C_.coral}/></g>`,
  doctor: html`<g>
    <rect x="20" y="24" width="62" height="58" rx="9" fill="#fff"/><path d="M20 33a9 9 0 0 1 9-9h44a9 9 0 0 1 9 9v7H20z" fill=${C_.coral}/>
    <path d="M34 18v12M68 18v12" stroke=${C_.ink} stroke-width="3" stroke-linecap="round"/>
    ${[0, 1, 2].map(r => [0, 1, 2, 3].map(k => html`<rect x=${30 + k * 12} y=${48 + r * 10} width="7" height="5" rx="1.5" fill=${r === 1 && k === 2 ? C_.navy : '#e6e8ee'}/>`))}
    <circle cx="90" cy="66" r="17" fill=${C_.rose}/><path d="M77 66h6l3-7 4 14 3-7h7" fill="none" stroke=${C_.coral} stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/></g>`,
  letter: html`<g>
    <rect x="16" y="32" width="74" height="50" rx="7" fill=${C_.cream}/><path d="M17 36 53 60 89 36" fill="none" stroke=${C_.ink} stroke-width="2.2" stroke-linejoin="round"/>
    <circle cx="30" cy="70" r="6" fill=${C_.coral}/>
    <circle cx="88" cy="62" r="14" fill=${C_.sky}/><circle cx="88" cy="62" r="14" fill="none" stroke=${C_.ink} stroke-width="3"/><path d="M98 72l9 9" stroke=${C_.ink} stroke-width="5" stroke-linecap="round"/></g>`,
  id: html`<g>
    <rect x="16" y="26" width="88" height="56" rx="9" fill=${C_.sky}/><rect x="26" y="38" width="24" height="32" rx="5" fill="#fff"/>
    <circle cx="38" cy="50" r="5" fill=${C_.sand}/><path d="M30 66c1-5 4-8 8-8s7 3 8 8" fill=${C_.navy}/>
    <path d="M58 44h34M58 54h26M58 64h18" stroke=${C_.navy} stroke-width="3.5" stroke-linecap="round"/>
    <rect x="86" y="31" width="12" height="4" fill="#fff"/><rect x="86" y="35" width="12" height="4" fill="#ffffff"/></g>`,
  sun: html`<g>
    <circle cx="78" cy="38" r="16" fill=${C_.yellow}/><path d="M78 12v6M78 58v6M52 38h6M98 38h6M60 20l4 4M92 52l4 4M96 20l-4 4" stroke=${C_.yellow2} stroke-width="3" stroke-linecap="round"/>
    <path d="M8 86c18-26 40-28 58-14 16-12 34-10 46 14z" fill=${C_.mint}/></g>`,
  siren: html`<g>
    <path d="M42 66V50a18 18 0 0 1 36 0v16z" fill=${C_.coral}/><path d="M50 50a10 10 0 0 1 10-10" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round"/>
    <rect x="34" y="66" width="52" height="12" rx="4" fill=${C_.navy}/>
    <path d="M28 40l-8-4M30 26l-6-7M92 40l8-4M90 26l6-7M60 18V9" stroke=${C_.coral} stroke-width="3" stroke-linecap="round"/></g>`,
  shelter: html`<g>
    <path d="M10 84c8-34 92-34 100 0z" fill=${C_.sand}/><path d="M48 84V68a12 12 0 0 1 24 0v16z" fill=${C_.navy}/>
    <rect x="78" y="44" width="24" height="15" rx="3" fill=${C_.green}/><path d="M84 52h12M91 48l4 4-4 4" fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></g>`,
  lock: html`<g>
    <rect x="30" y="44" width="60" height="40" rx="8" fill=${C_.navy}/><path d="M42 44V34a18 18 0 0 1 36 0v10" fill="none" stroke=${C_.ink} stroke-width="5"/>
    <circle cx="60" cy="61" r="5" fill="#fff"/><path d="M60 64v8" stroke="#fff" stroke-width="4" stroke-linecap="round"/>
    <circle cx="94" cy="30" r="11" fill=${C_.mint}/><path d="M89 30l4 4 6-7" fill="none" stroke=${C_.ink} stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></g>`
};

/* outline pass: draws an ink stroke around every filled shape for the hand-made look */
export const ILL = (n, w = 120) => html`<svg class="ill" width=${w} height=${w * .8} viewBox="0 0 120 96" aria-hidden="true">
  <path d="M14 88h92" stroke="#0B0D12" stroke-width="1.25" stroke-linecap="round" stroke-dasharray="0 0 70 6 3 200"/>
  <g stroke="#0B0D12" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">${ILLS[n]}</g></svg>`;

export const Hero = ({ n }) => html`<div class="spot">${ILL(n, 84)}</div>`;
