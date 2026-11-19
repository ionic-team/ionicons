import type { Page, TestInfo } from '@playwright/test';
import type { E2EPage } from '@utils/test/playwright';

/**
 * Overwrites the default Playwright page.setContent method.
 *
 * Navigates to a blank page, sets the content, and waits for the
 * Stencil components to be hydrated before proceeding with the test.
 *
 * Ported from Ionic Framework's fixture. Ionicons has no mode, direction,
 * or palette config, so only the ionicons build is injected.
 *
 * @param page The Playwright page object.
 * @param html The HTML content to set on the page body.
 * @param testInfo The TestInfo associated with the current test run.
 * @param options Navigation options passed to page.goto.
 */
export const setContent = async (
  page: Page,
  html: string,
  testInfo: TestInfo,
  options?: Parameters<E2EPage['goto']>[1],
) => {
  if (page.isClosed()) {
    throw new Error('setContent unavailable: page is already closed');
  }

  const baseUrl = testInfo.project.use.baseURL;
  if (!baseUrl) {
    throw new Error('setContent requires a baseURL in the Playwright config');
  }

  const output = `
    <!DOCTYPE html>
    <html dir="ltr" lang="en">
      <head>
        <title>Ionicons Playwright Test</title>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0" />
        <script type="module" src="${baseUrl}/build/ionicons.esm.js"></script>
      </head>
      <body>
        ${html}
      </body>
    </html>
  `;

  await page.route(baseUrl, (route) => {
    if (route.request().url() === `${baseUrl}/`) {
      /**
       * Intercepts the empty page request and returns the
       * HTML content that was passed in.
       */
      route.fulfill({
        status: 200,
        contentType: 'text/html',
        body: output,
      });
    } else {
      // Allow all other requests to pass through
      route.continue();
    }
  });

  /**
   * URL query parameters cause the custom Playwright `page.route`
   * interceptor to fail, which is necessary to inject the test HTML.
   *
   * To avoid this, the final navigation URL is kept simple by using
   * hash params to ensure the route interceptor always works.
   */
  await page.goto(`${baseUrl}#`, options);
};
