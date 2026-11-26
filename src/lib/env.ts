export const buzz = p => {
  try {
    navigator.vibrate && navigator.vibrate(p);
  } catch (e) {}
};

export const rmo = () => {
  try {
    return matchMedia('(prefers-reduced-motion: reduce)').matches;
  } catch (e) {
    return false;
  }
};

export const fire = () => setTimeout(() => window.dispatchEvent(new Event('coach')), 60);

export const fmt = n => n.toLocaleString('pl-PL').replace(/,/g, ' ');

const wait = ms => new Promise(r => setTimeout(r, ms));

export const norm = s => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/ł/g, 'l');

export const RM = () => {
  try {
    return matchMedia('(prefers-reduced-motion: reduce)').matches;
  } catch (e) {
    return false;
  }
};
