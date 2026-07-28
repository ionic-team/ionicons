import { expect } from '@playwright/test';
import { test } from '@utils/test/playwright';

test.describe('icon: sanitization', () => {
  test('should not have visual regressions', async ({ page }) => {
    await page.goto(`/icon/test/sanitization/`);

    await page.waitForLoadState('networkidle');

    const main = page.locator('main');
    await expect(main).toHaveScreenshot(`icon-sanitization.png`);
  });
});
