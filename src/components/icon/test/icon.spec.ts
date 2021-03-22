import { newSpecPage } from '@stencil/core/testing';
import { Icon } from '../icon';

describe('icon', () => {
  it('renders', async () => {
    const { root } = await newSpecPage({
      components: [Icon],
      html: '<ion-icon></ion-icon>',
    });
    expect(root).toEqualHtml(`
      <ion-icon class="md" role="img">
        <mock:shadow-root>
          <div class="icon-inner"></div>
        </mock:shadow-root>
      </ion-icon>
    `);
  });

  it('renders aria-hidden and no aria-label', async () => {
    const { root } = await newSpecPage({
      components: [Icon],
      html: `<ion-icon aria-hidden="true"></ion-icon>`,
    });
    expect(root).toEqualHtml(`
      <ion-icon class="md" role="img" aria-hidden="true">
        <mock:shadow-root>
          <div class="icon-inner"></div>
        </mock:shadow-root>
      </ion-icon>
    `);
  });

  it('renders rtl with aria-hidden', async () => {
    const { root } = await newSpecPage({
      components: [Icon],
      direction: 'rtl',
      html: `<ion-icon name="chevron-forward" aria-hidden="true"></ion-icon>`,
    });

    expect(root).toEqualHtml(`
      <ion-icon class="md flip-rtl" name="chevron-forward" role="img" aria-hidden="true">
        <mock:shadow-root>
          <div class="icon-inner"></div>
        </mock:shadow-root>
      </ion-icon>
    `);
  });
});
