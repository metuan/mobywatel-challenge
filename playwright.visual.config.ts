import { defineConfig } from '@playwright/test';

const PORT = 4174;
/**
 * Baselines are rendered in CI (Playwright's Linux image, with the Inter web font), so they
 * only match a run in the same image. Locally, point VISUAL_SNAPSHOTS at a scratch folder
 * and take your own baseline before a change: VISUAL_SNAPSHOTS=.visual-local npm run test:visual -- -u
 */
const SNAPSHOTS = process.env.VISUAL_SNAPSHOTS ?? 'tests/visual/__screenshots__';

/** Screenshot baselines for every screen, on desktop and on a phone (npm run test:visual). */
export default defineConfig({
  testDir: 'tests/visual',
  testMatch: '*.visual.ts',
  snapshotPathTemplate: `${SNAPSHOTS}/{projectName}/{arg}{ext}`,
  timeout: 60_000,
  fullyParallel: true,
  reporter: process.env.CI ? [['github'], ['html', { open: 'never' }]] : 'list',
  use: {
    baseURL: `http://localhost:${PORT}/`,
    browserName: 'chromium',
    trace: 'off',
    reducedMotion: 'reduce',
  },
  projects: [
    { name: 'desktop', use: { viewport: { width: 1440, height: 900 } } },
    { name: 'mobile', use: { viewport: { width: 390, height: 844 }, deviceScaleFactor: 1, hasTouch: true } },
  ],
  webServer: {
    command: `npm run build && npx vite preview --port ${PORT} --strictPort`,
    port: PORT,
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});
