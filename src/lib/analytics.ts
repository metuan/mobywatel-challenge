/*
 * Visitor counts with Cloudflare Web Analytics: free, no cookies and no personal data, so no consent banner.
 * It loads only on the published site, never locally or in tests.
 */
// The site token comes from the VITE_CF_BEACON_TOKEN repository secret at build time (see deploy.yml); without it nothing loads.
const TOKEN = import.meta.env.VITE_CF_BEACON_TOKEN ?? '';
const LIVE_HOST = 'metuan.github.io';

export function initAnalytics() {
  if (!TOKEN || location.hostname !== LIVE_HOST) return;
  const s = document.createElement('script');
  s.defer = true;
  s.src = 'https://static.cloudflareinsights.com/beacon.min.js';
  s.dataset.cfBeacon = JSON.stringify({ token: TOKEN });
  document.head.appendChild(s);
}
