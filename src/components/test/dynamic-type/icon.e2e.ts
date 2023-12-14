import { expect } from '@playwright/test';
import { test } from '../../../utils/test/playwright';

test.describe('icon: dynamic type', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/test/dynamic-type');
  });

  test('should scale text on larger font sizes', async ({ page }) => {
    // Wait for all SVGs to be lazily loaded before taking screenshots
    await page.waitForLoadState('networkidle');

    const icons = page.locator('#icons');

    await expect(icons).toHaveScreenshot(`icon-dynamic-type-diff.png`);
  });

});
