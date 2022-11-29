import { expect } from '@playwright/test';
import { test } from '../../../utils/test/playwright';

test.describe('icon: csp', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/test/csp');
  });

  test('should load svg', async ({ page }) => {
    const svg = page.locator('ion-icon#icon-usage svg');
    await expect(svg).toBeVisible();
  });

});
