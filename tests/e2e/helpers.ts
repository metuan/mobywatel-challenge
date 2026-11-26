import type { Page } from '@playwright/test';

/** Fail the test on any uncaught error in the page. */
export function collectErrors(page: Page) {
  const errors: string[] = [];
  page.on('pageerror', e => errors.push(e.message));
  return errors;
}

/** Freeze the wall clock so time-based copy is stable; timers still run. */
export async function freezeClock(page: Page) {
  await page.clock.setFixedTime(new Date('2026-11-26T09:41:00+01:00'));
}

/** The route on screen; the app opens on Dziś when there is no hash. */
export const currentRoute = (page: Page) =>
  page.evaluate(() => location.hash.slice(1).split('?')[0] || 'today');
