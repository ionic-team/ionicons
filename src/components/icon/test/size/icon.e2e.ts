import { expect } from '@playwright/test';
import { test } from '@utils/test/playwright';

test.describe('icon: size', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(`/icon/test/size/`);
  });

  test('should scale the icon based on the size property', async ({ page }) => {
    // Wait for all SVGs to be lazily loaded before taking screenshots
    await page.waitForLoadState('networkidle');

    const main = page.locator('main');
    await expect(main).toHaveScreenshot(`icon-size.png`);
  });

  test('size prop should apply correct font-size to SVG icons', async ({ page }) => {
    // Wait for all SVGs to be lazily loaded
    await page.waitForLoadState('networkidle');

    const icons = page.locator('ion-icon[name="heart"]');

    // Default size is 16px, small is 18px, large is 32px
    expect(await icons.nth(0).evaluate((el) => window.getComputedStyle(el).fontSize)).toBe('16px');
    expect(await icons.nth(1).evaluate((el) => window.getComputedStyle(el).fontSize)).toBe('18px');
    expect(await icons.nth(2).evaluate((el) => window.getComputedStyle(el).fontSize)).toBe('32px');
  });

  test('size prop should apply correct font-size to font icons', async ({ page }) => {
    // Wait for document fonts to be ready
    await page.evaluate(() => document.fonts.ready);

    const icons = page.locator('ion-icon:not([name])');

    // Default size is 16px, small is 18px, large is 32px
    expect(await icons.nth(0).evaluate((el) => window.getComputedStyle(el).fontSize)).toBe('16px');
    expect(await icons.nth(1).evaluate((el) => window.getComputedStyle(el).fontSize)).toBe('18px');
    expect(await icons.nth(2).evaluate((el) => window.getComputedStyle(el).fontSize)).toBe('32px');
  });
});
