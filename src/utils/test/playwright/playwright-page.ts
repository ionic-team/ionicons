import type {
  PlaywrightTestArgs,
  PlaywrightTestOptions,
  PlaywrightWorkerArgs,
  PlaywrightWorkerOptions,
  TestInfo,
} from '@playwright/test';
import { test as base } from '@playwright/test';

import {
  goto as goToPage,
} from './page/utils';
import type { E2EPage } from './playwright-declarations';

type CustomTestArgs = PlaywrightTestArgs &
  PlaywrightTestOptions &
  PlaywrightWorkerArgs &
  PlaywrightWorkerOptions & {
    page: E2EPage;
  };

type CustomFixtures = {
  page: E2EPage;
};

/**
 * Extends the base `page` test figure within Playwright.
 * @param page The page to extend.
 * @param testInfo The test info.
 * @returns The modified playwright page with extended functionality.
 */
export async function extendPageFixture(page: E2EPage, testInfo: TestInfo) {
  const originalGoto = page.goto.bind(page);

  /**
   * Adds a global flag on the window that the test suite
   * can use to determine when it is safe to execute tests
   * on hydrated Stencil components.
   */
  await page.addInitScript(`
  (function() {
    window.addEventListener('appload', () => {
      window.testAppLoaded = true;
    });
  })();`);
  // Overridden Playwright methods
  page.goto = (url: string, options) => goToPage(page, url, options, testInfo, originalGoto);

  return page;
}

export const test = base.extend<CustomFixtures>({
  page: async ({ page }: CustomTestArgs, use: (r: E2EPage) => Promise<void>, testInfo: TestInfo) => {
    page = await extendPageFixture(page, testInfo);
    await use(page);
  },
});