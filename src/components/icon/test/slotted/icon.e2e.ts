import { expect } from '@playwright/test';
import { test } from '@utils/test/playwright';

test.describe('icon: slotted', () => {
  test('should not have visual regressions', async ({ page }) => {
    await page.goto(`/icon/test/slotted/`);

    // Wait for all SVGs to be lazily loaded before taking screenshots
    await page.waitForLoadState('networkidle');

    await expect(page).toHaveScreenshot(`icon-slotted.png`, { fullPage: true });
  });
});
