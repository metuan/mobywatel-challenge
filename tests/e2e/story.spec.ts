import { expect, test } from '@playwright/test';
import { BEATS, CHAPTERS } from '../../src/story/chapters';
import { collectErrors, currentRoute, freezeClock } from './helpers';

/**
 * Plays every chapter of the guided story the way a visitor would: tap whatever the coach mark
 * points at until the chapter's last beat is reached and "next chapter" lights up.
 */
CHAPTERS.forEach((chapter, i) => {
  test(`chapter ${i + 1}: ${chapter.t}`, async ({ page }) => {
    const errors = collectErrors(page);
    await freezeClock(page);
    await page.goto('./');
    await page.getByRole('button', { name: 'Pomiń' }).click();
    await expect(page.locator('.tour')).toHaveCount(0);
    // Skip ahead with the "next chapter" button (in the story rail on desktop, the story bar on phones).
    for (let k = 1; k <= i; k++) {
      await page.locator('.st-next, .ms-next').filter({ visible: true }).first().click();
      await expect.poll(() => currentRoute(page)).toBe(CHAPTERS[k].r[0]);
    }
    await expect.poll(() => currentRoute(page)).toBe(chapter.r[0]);

    const beats = BEATS[i];
    const lastRoute = beats[beats.length - 1][0];
    const visited = new Set<string>();
    let idle = 0;
    for (let step = 0; step < 40; step++) {
      await page.waitForTimeout(1300);
      const route = await currentRoute(page);
      visited.add(route);
      const coach = page.locator('.coach').first();
      if (await coach.isVisible().catch(() => false)) {
        idle = 0;
        const box = await coach.boundingBox();
        if (!box) continue;
        if (/hold/.test((await coach.getAttribute('class')) || '')) {
          await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
          await page.mouse.down();
          await page.waitForTimeout(2200);
          await page.mouse.up();
        } else {
          await coach
            .click({ timeout: 3000 })
            .catch(() => page.mouse.click(box.x + box.width / 2, box.y + box.height / 2));
        }
        continue;
      }
      const ready = await page.locator('.st-next.ready, .ms-next.ready').count();
      if (ready && route === lastRoute) break;
      if (++idle > 8) break;
    }

    expect(await currentRoute(page)).toBe(lastRoute);
    await expect(page.locator('.st-next.ready, .ms-next.ready').first()).toBeAttached();
    for (const [route] of beats) expect(visited, `beat on ${route}`).toContain(route);
    expect(errors).toEqual([]);
  });
});
