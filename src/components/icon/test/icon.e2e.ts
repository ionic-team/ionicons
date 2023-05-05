import { expect } from '@playwright/test';
import { test } from '@utils/test/playwright';

test.describe('icon: basic', () => {
  test('should not have visual regressions', async ({ page }) => {
    await page.goto(`/`);

    // Wait for all SVGs to be lazily loaded before taking screenshots
    await page.waitForLoadState('networkidle');

    expect(await page.screenshot({ fullPage: true })).toMatchSnapshot(`icon-diff.png`);
  });

  test('some icons should flip when rtl', async ({ page }) => {
    await page.goto(`/`);

    const autoflip = page.locator('.auto-flip-chevrons [name=chevron-forward]');
    await expect(autoflip).not.toHaveClass(/flip-rtl/);

    const unflip = page.locator('.un-flip-chevrons [name=chevron-forward]');
    await expect(unflip).not.toHaveClass(/flip-rtl/);

    await page.evaluate(() => {
      document.dir = 'rtl';
    });

    await expect(autoflip).toHaveClass(/flip-rtl/);
    await expect(unflip).not.toHaveClass(/flip-rtl/);

    // Wait for all SVGs to be lazily loaded before taking screenshots
    await page.waitForLoadState('networkidle');

    expect(await page.screenshot({ fullPage: true })).toMatchSnapshot(`icon-rtl-diff.png`);
  });
});
