const FAMILY = [
  { id:'anna', name:'Anna', full:'Anna Nowicka', role:'Ty', age:34, color:'#132a5e', ini:'AN' },
  { id:'tomasz', name:'Tomasz', full:'Tomasz Nowicki', role:'Partner', age:36, color:'#3d5a80', ini:'TN' },
  { id:'zosia', name:'Zosia', full:'Zofia Nowicka', role:'Córka, 6 lat', age:6, color:'#a8650a', ini:'ZN' },
  { id:'tata', name:'Tata', full:'Stanisław Nowicki', role:'Tata, Sandomierz', age:71, color:'#1c7a4c', ini:'SN' }
];

const DEADLINES = [
  { t:'Paszport Zosi', s:'Ważny do 4 stycznia 2027', d:41, tone:'amber', go:'docs' },
  { t:'OC — Toyota Yaris KR 4F21', s:'Polisa kończy się 6 grudnia', d:12, tone:'red', go:'car' },
  { t:'Dowód osobisty taty', s:'Ważny do 26 stycznia 2027', d:63, tone:'gray', go:'member-tata' },
  { t:'Szczepienie Zosi (MMR, dawka 2)', s:'Zalecane do końca roku', d:37, tone:'gray', go:'vacc' }
];

export const LOG = [
  { who:'Apteka Gemini, Kraków', why:'Realizacja e-recepty', when:'22 listopada, 17:42', how:'Kod recepty' },
  { who:'Bank Pekao S.A.', why:'Weryfikacja tożsamości przy kredycie', when:'18 listopada, 10:05', how:'mDowód, kod QR' },
  { who:'Policja, KMP Kraków', why:'Kontrola drogowa', when:'9 listopada, 21:13', how:'Rejestr CEPiK' },
  { who:'Tomasz Nowicki', why:'Podgląd terminów rodziny', when:'8 listopada, 08:30', how:'Uprawnienie rodzinne' }
];

export const PEOPLE = [['A', 'Anna', '34 lata, Kraków'], ['T', 'Tomasz', 'partner'], ['Z', 'Zosia', '6 lat'], ['S', 'Stanisław', 'tata, 71 lat, Sandomierz']];

export const OFFICES = ['Urząd gminy', 'NFZ', 'ZUS', 'CEPiK', 'Urząd skarbowy', 'USC', 'Szkoła', 'Poradnia', 'Ubezpieczyciel', 'RCB', 'Policja', 'Urząd wojewódzki'];
