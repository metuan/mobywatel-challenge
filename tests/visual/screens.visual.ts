import { expect, test } from '@playwright/test';
import { R } from '../../src/app/routes';
import { freezeClock } from '../e2e/helpers';

/**
 * Pixel baselines for every screen, taken inside the phone frame.
 * They guard the visual parity of refactors: a change that moves a pixel shows up here.
 */
test.use({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' });

for (const route of Object.keys(R)) {
  test(`screen ${route}`, async ({ page }) => {
    await freezeClock(page);
    await page.goto(`./#${route}`);
    await page.evaluate(() => document.fonts.ready);
    const phone = page.locator('.phone').first();
    await expect(phone).toBeVisible();
    // The coach mark and streamed answers arrive on timers, so let it settle and keep its floating label out of the shot.
    await page.waitForTimeout(3000);
    await page.addStyleTag({ content: '.coach-tip { visibility: hidden !important; }' });
    await expect(phone).toHaveScreenshot(`${route}.png`, {
      animations: 'disabled',
      caret: 'hide',
      maxDiffPixelRatio: 0.002,
      mask: [page.locator('.clock, .watch')],
    });
  });
}
