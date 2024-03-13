import { expect } from '@playwright/test';
import { test } from '@utils/test/playwright';

test.describe('icon: basic', () => {
  test('should not have visual regressions', async ({ page }) => {
    await page.goto(`/`);

    // Wait for all SVGs to be lazily loaded before taking screenshots
    await page.waitForLoadState('networkidle');

    await expect(page).toHaveScreenshot(`icon-diff.png`, { fullPage: true });
  });

  test('some icons should flip when rtl', async ({ page }) => {
    await page.goto(`/`);

    const autoflip = page.locator('.auto-flip-chevrons [name=chevron-forward] .icon-inner');
    const unflip = page.locator('.un-flip-chevrons [name=chevron-forward] .icon-inner');
    await expect(autoflip).not.toHaveCSS('transform', /matrix\(-1/);
    await expect(unflip).not.toHaveCSS('transform', /matrix\(-1/);

    await page.evaluate(() => {
      document.dir = 'rtl';
    });

    await expect(autoflip).toHaveCSS('transform', /matrix\(-1/);
    await expect(unflip).not.toHaveCSS('transform', /matrix\(-1/);

    // Wait for all SVGs to be lazily loaded before taking screenshots
    await page.waitForLoadState('networkidle');

    const rtlTests = page.locator('#rtl-tests');
    await expect(rtlTests).toHaveScreenshot(`icon-rtl-diff.png`);
  });

  test('arrows should flip if dir changes on the element', async ({ page }) => {
    await page.goto(`/`);

    const autoflip = page.locator('.auto-flip-chevrons [name=chevron-forward] .icon-inner');
    const unflip = page.locator('.un-flip-chevrons [name=chevron-forward] .icon-inner');
    await expect(autoflip).not.toHaveCSS('transform', /matrix\(-1/);
    await expect(unflip).not.toHaveCSS('transform', /matrix\(-1/);

    const autoflipEl = await page.$('.auto-flip-chevrons [name=chevron-forward]');
    const unflipEl = await page.$('.un-flip-chevrons [name=chevron-forward]');
    await autoflipEl!.evaluate((node) => node.setAttribute('dir', 'rtl'));
    await unflipEl!.evaluate((node) => node.setAttribute('dir', 'rtl'));

    await expect(autoflip).toHaveCSS('transform', /matrix\(-1/);
    await expect(unflip).not.toHaveCSS('transform', /matrix\(-1/);
  });

  test('icon should reassess flipping when name changes', async ({ page }) => {
    await page.goto(`/`);

    await page.evaluate(() => {
      document.dir = 'rtl';
    });

    const iconLoc = page.locator('.auto-flip-chevrons ion-icon:nth-child(2)');
    await expect(iconLoc).toHaveAttribute('name', 'chevron-forward');
    await expect(iconLoc).toHaveClass(/flip-rtl/);

    const iconEl = await page.$('.auto-flip-chevrons ion-icon:nth-child(2)');
    await iconEl!.evaluate((node) => node.setAttribute('name', 'brush'));

    await expect(iconLoc).toHaveAttribute('name', 'brush');
    await expect(iconLoc).not.toHaveClass(/flip-rtl/);
  });

});
