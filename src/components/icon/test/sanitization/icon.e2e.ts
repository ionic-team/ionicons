import { expect } from '@playwright/test';
import type { E2EPage } from '@utils/test/playwright';
import { test } from '@utils/test/playwright';

/**
 * An SVG whose handler pushes `label` to `window.xssFired` if it ever runs.
 */
const imageOnErrorSvg = (label: string) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><image href="x" onerror="window.xssFired.push('${label}')"/></svg>`;

const utf8DataUrl = (svg: string) => `data:image/svg+xml;utf8,${svg}`;

/**
 * Sets `sanitize` before `src` so the icon loads with the intended setting.
 */
const addIcon = (page: E2EPage, id: string, src: string, sanitize?: boolean) =>
  page.evaluate(
    ([id, src, sanitize]) => {
      const icon = document.createElement('ion-icon') as any;
      icon.id = id;
      if (sanitize !== undefined) {
        icon.sanitize = sanitize;
      }
      icon.src = src;
      document.body.appendChild(icon);
    },
    [id, src, sanitize] as const,
  );

/**
 * Waits for the unsanitized control icon's handler to fire. Any `data:` URL
 * payload added before it has had at least as long to fire.
 */
const waitForControl = (page: E2EPage) => page.waitForFunction(() => (window as any).xssFired.includes('control'));

const getFired = (page: E2EPage) => page.evaluate(() => (window as any).xssFired as string[]);

test.describe('icon: sanitization', () => {
  test('should not have visual regressions', async ({ page }) => {
    await page.goto(`/icon/test/sanitization/`);

    await page.waitForLoadState('networkidle');

    const main = page.locator('main');
    await expect(main).toHaveScreenshot(`icon-sanitization.png`);
  });
});

test.describe('icon: sanitization: unsafe content', () => {
  test.beforeEach(async ({ page }) => {
    await page.setContent(`<script>window.xssFired = [];</script>`);
  });

  test('should not run handlers from a utf8 svg data url', async ({ page }) => {
    await addIcon(page, 'attack', utf8DataUrl(imageOnErrorSvg('attack')));
    await addIcon(page, 'control', utf8DataUrl(imageOnErrorSvg('control')), false);
    await waitForControl(page);

    expect(await getFired(page)).not.toContain('attack');
    await expect(page.locator('#attack .icon-inner svg')).toHaveCount(0);
  });

  test('should render a clean utf8 svg data url', async ({ page }) => {
    const clean = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M0 0h24v24H0z"/></svg>`;
    await addIcon(page, 'clean', utf8DataUrl(clean));

    await expect(page.locator('#clean .icon-inner svg path')).toHaveCount(1);
  });

  test('should warn when an svg is rejected', async ({ page }) => {
    const warnings: string[] = [];
    page.on('console', (msg) => {
      if (msg.type() === 'warning') {
        warnings.push(msg.text());
      }
    });

    await addIcon(page, 'attack', utf8DataUrl(imageOnErrorSvg('attack')));

    await expect.poll(() => warnings.some((warning) => warning.includes('[Ionicons Warning]'))).toBe(true);
  });

  test('should not warn about sanitizing when the response is not an svg', async ({ page }) => {
    const warnings: string[] = [];
    page.on('console', (msg) => {
      if (msg.type() === 'warning') {
        warnings.push(msg.text());
      }
    });
    await page.route('**/missing.svg', (route) =>
      route.fulfill({ status: 404, contentType: 'text/html', body: '<html><body>Not found</body></html>' }),
    );
    await page.route('**/rejected.svg', (route) =>
      route.fulfill({ contentType: 'image/svg+xml', body: imageOnErrorSvg('attack') }),
    );

    const missingLoaded = page.waitForResponse('**/missing.svg');
    await addIcon(page, 'missing', '/missing.svg');
    await missingLoaded;
    // This takes the same fetch and sanitize steps, so once it warns the 404 has been handled
    await addIcon(page, 'rejected', '/rejected.svg');
    await expect.poll(() => warnings.some((warning) => warning.includes('rejected.svg'))).toBe(true);

    expect(warnings.filter((warning) => warning.includes('missing.svg'))).toHaveLength(0);
  });

  test('should not run handlers from a fetched svg while sanitizing it', async ({ page }) => {
    await page.route('**/xss/*.svg', (route) => {
      const label = route.request().url().includes('control') ? 'control' : 'attack';
      route.fulfill({
        contentType: 'image/svg+xml',
        body: `<img src="x" onerror="window.xssFired.push('${label}')">${imageOnErrorSvg(label)}`,
      });
    });

    // Fetches resolve independently, so let the attack load before the control starts
    const attackLoaded = page.waitForResponse('**/xss/attack.svg');
    await addIcon(page, 'attack', '/xss/attack.svg');
    await attackLoaded;
    await addIcon(page, 'control', '/xss/control.svg', false);
    await waitForControl(page);

    expect(await getFired(page)).not.toContain('attack');
    await expect(page.locator('#attack .icon-inner svg')).toHaveCount(0);
  });

  test('should reject a fetched svg with more than one root svg', async ({ page }) => {
    await page.route('**/xss/*.svg', (route) => {
      const label = route.request().url().includes('control') ? 'control' : 'attack';
      route.fulfill({
        contentType: 'image/svg+xml',
        body: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M0 0h24v24H0z"/></svg>${imageOnErrorSvg(label)}`,
      });
    });

    const attackLoaded = page.waitForResponse('**/xss/attack.svg');
    await addIcon(page, 'attack', '/xss/attack.svg');
    await attackLoaded;
    await addIcon(page, 'control', '/xss/control.svg', false);
    await waitForControl(page);

    expect(await getFired(page)).not.toContain('attack');
    await expect(page.locator('#attack .icon-inner svg')).toHaveCount(0);
  });

  const htmlInSvgPayloads = [
    {
      name: 'noscript',
      inner: `<desc><noscript><p title="</noscript><img src=x onerror=top.xssFired.push('attack')>"></p></noscript></desc>`,
    },
    {
      name: 'template',
      inner: `<desc><template><img src="x" onerror="top.xssFired.push('attack')"></template></desc>`,
    },
  ];

  htmlInSvgPayloads.forEach(({ name, inner }) => {
    test(`should reject an svg containing an html ${name} element`, async ({ page }) => {
      const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">${inner}<path d="M0 0h24v24H0z"/></svg>`;
      await addIcon(page, 'attack', utf8DataUrl(svg));
      await addIcon(page, 'control', utf8DataUrl(imageOnErrorSvg('control')), false);
      await waitForControl(page);

      expect(await getFired(page)).not.toContain('attack');
      await expect(page.locator('#attack .icon-inner svg')).toHaveCount(0);
    });
  });

  const foreignObjectPayloads = [
    {
      name: 'iframe srcdoc',
      inner: `<iframe xmlns="http://www.w3.org/1999/xhtml" srcdoc="&lt;script&gt;top.xssFired.push('attack')&lt;/script&gt;"></iframe>`,
    },
    {
      name: 'iframe javascript: src',
      inner: `<iframe xmlns="http://www.w3.org/1999/xhtml" src="javascript:top.xssFired.push('attack')"></iframe>`,
    },
  ];

  foreignObjectPayloads.forEach(({ name, inner }) => {
    test(`should remove a foreignObject containing an ${name}`, async ({ page }) => {
      const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><foreignObject width="24" height="24">${inner}</foreignObject><path d="M0 0h24v24H0z"/></svg>`;
      await addIcon(page, 'attack', utf8DataUrl(svg));
      await addIcon(page, 'control', utf8DataUrl(imageOnErrorSvg('control')), false);
      await waitForControl(page);

      expect(await getFired(page)).not.toContain('attack');
      await expect(page.locator('#attack .icon-inner svg path')).toHaveCount(1);
      await expect(page.locator('#attack .icon-inner svg > :not(path)')).toHaveCount(0);
    });
  });

  test('should render an illustrator export that uses a switch with a foreignObject', async ({ page }) => {
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:i="http://ns.adobe.com/AdobeIllustrator/10.0/" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24"><switch><foreignObject requiredExtensions="http://ns.adobe.com/AdobeIllustrator/10.0/" x="0" y="0" width="1" height="1"><i:pgfRef xlink:href="#adobe_illustrator_pgf"></i:pgfRef></foreignObject><g i:extraneous="self"><path d="M0 0h24v24H0z"/></g></switch></svg>`;
    await addIcon(page, 'illustrator', utf8DataUrl(svg));

    await expect(page.locator('#illustrator .icon-inner svg path')).toHaveCount(1);
  });

  const javascriptUrlPayloads = [
    { name: 'an anchor href', inner: `<a href="javascript:top.xssFired.push('attack')"><path d="M0 0h24v24H0z"/></a>` },
    {
      name: 'an obfuscated xlink:href',
      inner: `<a xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href=" JaVa&#x09;ScRiPt:top.xssFired.push('attack')"><path d="M0 0h24v24H0z"/></a>`,
    },
    {
      name: 'an animate element',
      inner: `<a><animate attributeName="href" values="https://ionic.io;javascript:top.xssFired.push('attack')"/><path d="M0 0h24v24H0z"/></a>`,
    },
    {
      name: 'a set element',
      inner: `<a><set attributeName="href" to="javascript:top.xssFired.push('attack')"/><path d="M0 0h24v24H0z"/></a>`,
    },
  ];

  javascriptUrlPayloads.forEach(({ name, inner }) => {
    test(`should reject an svg with a javascript: url in ${name}`, async ({ page }) => {
      const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">${inner}</svg>`;
      await addIcon(page, 'attack', utf8DataUrl(svg));
      await addIcon(page, 'control', utf8DataUrl(imageOnErrorSvg('control')), false);
      await waitForControl(page);

      await expect(page.locator('#attack .icon-inner svg')).toHaveCount(0);
    });
  });

  test('should not reuse unsanitized content cached for the same data url', async ({ page }) => {
    const shared = utf8DataUrl(imageOnErrorSvg('shared'));

    await addIcon(page, 'unsanitized', shared, false);
    await page.waitForFunction(() => (window as any).xssFired.includes('shared'));

    await addIcon(page, 'sanitized', shared);
    await addIcon(page, 'control', utf8DataUrl(imageOnErrorSvg('control')), false);
    await waitForControl(page);

    await expect(page.locator('#sanitized .icon-inner svg')).toHaveCount(0);
    expect((await getFired(page)).filter((label) => label === 'shared')).toHaveLength(1);
  });

  test('should not reuse sanitized content cached for the same data url', async ({ page }) => {
    const shared = utf8DataUrl(imageOnErrorSvg('shared'));

    await addIcon(page, 'sanitized', shared);
    await addIcon(page, 'unsanitized', shared, false);

    await expect(page.locator('#unsanitized .icon-inner svg')).toHaveCount(1);
  });

  test('should not let a src forge the unsanitized cache key', async ({ page }) => {
    const shared = utf8DataUrl(imageOnErrorSvg('shared'));

    await addIcon(page, 'unsanitized', shared, false);
    await page.waitForFunction(() => (window as any).xssFired.includes('shared'));

    await addIcon(page, 'sanitized', `unsanitized:${shared}`);
    await addIcon(page, 'control', utf8DataUrl(imageOnErrorSvg('control')), false);
    await waitForControl(page);

    await expect(page.locator('#sanitized .icon-inner svg')).toHaveCount(0);
    expect((await getFired(page)).filter((label) => label === 'shared')).toHaveLength(1);
  });

  test('should not reuse an unsanitized in-flight fetch for the same url', async ({ page }) => {
    await page.route('**/xss/*.svg', (route) => {
      const label = route.request().url().includes('control') ? 'control' : 'shared';
      // Sanitizing drops the <img> sibling and keeps the clean <svg>
      route.fulfill({
        contentType: 'image/svg+xml',
        body: `<img src="x" onerror="window.xssFired.push('${label}')"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M0 0h24v24H0z"/></svg>`,
      });
    });

    await addIcon(page, 'unsanitized', '/xss/shared.svg', false);
    await addIcon(page, 'sanitized', '/xss/shared.svg');
    await addIcon(page, 'control', '/xss/control.svg', false);
    await waitForControl(page);
    await page.waitForFunction(() => (window as any).xssFired.includes('shared'));

    await expect(page.locator('#sanitized .icon-inner svg path')).toHaveCount(1);
    await expect(page.locator('#sanitized .icon-inner img')).toHaveCount(0);
    expect((await getFired(page)).filter((label) => label === 'shared')).toHaveLength(1);
  });
});
