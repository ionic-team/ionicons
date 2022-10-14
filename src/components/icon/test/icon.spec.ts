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
  
  it('renders default aria-label', async () => {
    const { root } = await newSpecPage({
      components: [Icon],
      html: `<ion-icon name="chevron-forward"></ion-icon>`,
    });

    expect(root).toEqualHtml(`
      <ion-icon class="md" name="chevron-forward" role="img" aria-label="chevron forward">
        <mock:shadow-root>
          <div class="icon-inner"></div>
        </mock:shadow-root>
      </ion-icon>
    `);
  });
  
  it('renders custom aria-label', async () => {
    const { root } = await newSpecPage({
      components: [Icon],
      html: `<ion-icon name="chevron-forward" aria-label="custom label"></ion-icon>`,
    });

    expect(root).toEqualHtml(`
      <ion-icon class="md" name="chevron-forward" role="img" aria-label="custom label">
        <mock:shadow-root>
          <div class="icon-inner"></div>
        </mock:shadow-root>
      </ion-icon>
    `);
  });
  
  it('renders custom label after changing source', async () => {
    const page = await newSpecPage({
      components: [Icon],
      html: `<ion-icon name="chevron-forward" aria-label="custom label"></ion-icon>`,
    });
    
    const icon = page.root;

    expect(icon).toEqualHtml(`
      <ion-icon class="md" name="chevron-forward" role="img" aria-label="custom label">
        <mock:shadow-root>
          <div class="icon-inner"></div>
        </mock:shadow-root>
      </ion-icon>
    `);
    
    if (icon) {
      icon.name = 'trash';
    }
    await page.waitForChanges();

    expect(icon).toEqualHtml(`
      <ion-icon class="md" name="trash" role="img" aria-label="custom label">
        <mock:shadow-root>
          <div class="icon-inner"></div>
        </mock:shadow-root>
      </ion-icon>
    `);
  });
  
  it('renders default label after changing source', async () => {
    const page = await newSpecPage({
      components: [Icon],
      html: `<ion-icon name="chevron-forward"></ion-icon>`,
    });
    
    const icon = page.root;

    expect(icon).toEqualHtml(`
      <ion-icon class="md" name="chevron-forward" role="img" aria-label="chevron forward">
        <mock:shadow-root>
          <div class="icon-inner"></div>
        </mock:shadow-root>
      </ion-icon>
    `);
    
    if (icon) {
      icon.name = 'trash';
    }
    await page.waitForChanges();

    expect(icon).toEqualHtml(`
      <ion-icon class="md" name="trash" role="img" aria-label="trash">
        <mock:shadow-root>
          <div class="icon-inner"></div>
        </mock:shadow-root>
      </ion-icon>
    `);
  });
});
