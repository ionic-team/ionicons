import { newSpecPage } from 'jest-stencil-runner';
import { Icon } from '../icon';

describe('icon', () => {
  describe('basic rendering', () => {
    it('renders', async () => {
      const { root } = await newSpecPage({
        components: [Icon],
        html: '<ion-icon></ion-icon>',
      });
      expect(root).toEqualHtml(`
        <ion-icon class="md" role="img">
          <mock:shadow-root>
            <div class="icon-inner">
              <slot></slot>
            </div>
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
        <ion-icon class="md flip-rtl icon-rtl" name="chevron-forward" role="img" aria-hidden="true">
          <mock:shadow-root>
            <div class="icon-inner">
              <slot></slot>
            </div>
          </mock:shadow-root>
        </ion-icon>
      `);
    });

    it('renders custom aria-label', async () => {
      const { root } = await newSpecPage({
        components: [Icon],
        html: `<ion-icon name="star" aria-label="custom label"></ion-icon>`,
      });

      expect(root).toEqualHtml(`
        <ion-icon class="md" name="star" role="img" aria-label="custom label">
          <mock:shadow-root>
            <div class="icon-inner">
              <slot></slot>
            </div>
          </mock:shadow-root>
        </ion-icon>
      `);
    });
  });

  describe('dynamic rendering', () => {
    it('renders custom label after changing source', async () => {
      const page = await newSpecPage({
        components: [Icon],
        html: `<ion-icon name="chevron-forward" aria-label="custom label"></ion-icon>`,
      });

      const icon = page.root;

      expect(icon).toEqualHtml(`
        <ion-icon class="flip-rtl md" name="chevron-forward" role="img" aria-label="custom label">
          <mock:shadow-root>
            <div class="icon-inner">
              <slot></slot>
            </div>
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
            <div class="icon-inner">
              <slot></slot>
            </div>
          </mock:shadow-root>
        </ion-icon>
      `);
    });
  });

  describe('svg rendering scenarios', () => {
    it('svgContent=true: renders svg without slot', async () => {
      const page = await newSpecPage({
        components: [Icon],
        html: `<ion-icon aria-hidden="true" part="close-icon" class="close-icon"></ion-icon>`,
      });

      const icon = page.root as any;
      const instance = page.rootInstance as any;
      instance.svgContent = '<svg><circle cx="50" cy="50" r="40"/></svg>';
      await page.waitForChanges();

      const shadowRoot = icon.shadowRoot;
      const iconInner = shadowRoot?.querySelector('.icon-inner');

      // Should have no slot
      const slot = iconInner?.querySelector('slot');
      expect(slot).toBeNull();

      // SVG should be a direct child of icon-inner,
      // not nested in another div
      expect(iconInner?.children.length).toBe(1);
      const firstChild = iconInner?.children[0];
      expect((firstChild as any)?.tagName?.toLowerCase()).toBe('svg');
      expect(firstChild?.querySelector('circle')).not.toBeNull();
    });

    it('svgContent=false: renders slot for custom content', async () => {
      const page = await newSpecPage({
        components: [Icon],
        html: `<ion-icon aria-hidden="true" part="close-icon" class="close-icon"></ion-icon>`,
      });

      const icon = page.root as any;
      const shadowRoot = icon.shadowRoot;
      const iconInner = shadowRoot?.querySelector('.icon-inner');
      const slot = iconInner?.querySelector('slot');
      const svg = iconInner?.querySelector('svg');

      expect(slot).not.toBeNull();
      expect(svg).toBeNull();
    });
  });

  describe('slotted content', () => {
    it('renders slotted font icon (Font Awesome)', async () => {
      const { root } = await newSpecPage({
        components: [Icon],
        html: `
          <ion-icon>
            <i class="fa fa-home"></i>
          </ion-icon>
        `,
      });
      expect(root).toEqualHtml(`
        <ion-icon class="md" role="img">
          <mock:shadow-root>
            <div class="icon-inner">
              <slot></slot>
            </div>
          </mock:shadow-root>
          <i class="fa fa-home"></i>
        </ion-icon>
      `);
    });

    it('renders slotted font icon with color', async () => {
      const { root } = await newSpecPage({
        components: [Icon],
        html: `
          <ion-icon color="primary">
            <i class="fa fa-heart"></i>
          </ion-icon>
        `,
      });
      expect(root).toEqualHtml(`
        <ion-icon class="md ion-color ion-color-primary" color="primary" role="img">
          <mock:shadow-root>
            <div class="icon-inner">
              <slot></slot>
            </div>
          </mock:shadow-root>
          <i class="fa fa-heart"></i>
        </ion-icon>
      `);
    });

    it('renders slotted font icon with custom style', async () => {
      const { root } = await newSpecPage({
        components: [Icon],
        html: `
          <ion-icon style="font-size: 48px">
            <i class="fa fa-star"></i>
          </ion-icon>
        `,
      });
      expect(root).toEqualHtml(`
        <ion-icon class="md" role="img" style="font-size: 48px">
          <mock:shadow-root>
            <div class="icon-inner">
              <slot></slot>
            </div>
          </mock:shadow-root>
          <i class="fa fa-star"></i>
        </ion-icon>
      `);
    });
  });
});
