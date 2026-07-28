import { expect } from '@playwright/test';
import { test } from '@utils/test/playwright';
import { AxeBuilder } from '@axe-core/playwright';

test.describe('icon: a11y', () => {
  test('should pass accessibility checks', async ({ page }) => {
    await page.goto(`/icon/test/a11y/`);

    await page.waitForLoadState('networkidle');

    const results = await new AxeBuilder({ page }).analyze();

    expect(results.violations).toEqual([]);
  });
});
