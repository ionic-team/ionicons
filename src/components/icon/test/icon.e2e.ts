import { expect, test } from '@playwright/test';

test.describe('icon: basic', () => {
  test('should not have visual regressions', async ({ page }) => {
    await page.goto(`/`);

    expect(await page.screenshot({ fullPage: true })).toMatchSnapshot(`icon-diff.png`);
  });
});