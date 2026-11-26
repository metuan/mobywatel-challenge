import { expect, test } from '@playwright/test';
import { R } from '../../src/app/routes';
import { collectErrors, freezeClock } from './helpers';

/** Every screen renders on its own, straight from a link, without errors. */
test('every screen renders', async ({ page }) => {
  const errors = collectErrors(page);
  await freezeClock(page);
  await page.goto('./#today');
  for (const route of Object.keys(R)) {
    await page.evaluate(r => (location.hash = r), route);
    await expect(page.locator('.phone .screen').first(), route).toBeVisible();
    const text = await page.locator('.phone').innerText();
    expect(text.trim().length, route).toBeGreaterThan(20);
  }
  expect(errors).toEqual([]);
});
