import { expect } from '@playwright/test';
import { test } from '@utils/test/playwright';

test.describe('icon: basic', () => {
  test('should not have visual regressions', async ({ page }) => {
    await page.goto(`/`);

    expect(await page.screenshot({ fullPage: true })).toMatchSnapshot(`icon-diff.png`);
  });
});