import { Build, Component, Element, Host, Prop, State, Watch, h } from '@stencil/core';
import { getSvgContent, ioniconContent } from './request';
import { getName, getUrl, inheritAttributes, isRTL } from './utils';

@Component({
  tag: 'ion-icon',
  assetsDirs: ['svg'],
  styleUrl: 'icon.css',
  shadow: true,
})
export class Icon {
  private io?: IntersectionObserver;
  private iconName: string | null = null;
  private inheritedAttributes: { [k: string]: any } = {};
  private didLoadIcon = false;

  @Element() el!: HTMLElement;

  @State() private svgContent?: string;
  @State() private isVisible = false;

  /**
   * The mode determines which platform styles to use.
   */
  @Prop({ mutable: true }) mode = getIonMode();

  /**
   * The color to use for the background of the item.
   */
  @Prop() color?: string;

  /**
   * Specifies which icon to use on `ios` mode.
   */
  @Prop() ios?: string;

  /**
   * Specifies which icon to use on `md` mode.
   */
  @Prop() md?: string;

  /**
   * Specifies whether the icon should horizontally flip when `dir` is `"rtl"`.
   */
  @Prop() flipRtl?: boolean;

  /**
   * Specifies which icon to use from the built-in set of icons.
   */
  @Prop({ reflect: true }) name?: string;

  /**
   * Specifies the exact `src` of an SVG file to use.
   */
  @Prop() src?: string;

  /**
   * A combination of both `name` and `src`. If a `src` url is detected
   * it will set the `src` property. Otherwise it assumes it's a built-in named
   * SVG and set the `name` property.
   */
  @Prop() icon?: any;

  /**
   * The size of the icon.
   * Available options are: `"small"` and `"large"`.
   */
  @Prop() size?: string;

  /**
   * If enabled, ion-icon will be loaded lazily when it's visible in the viewport.
   * Default, `false`.
   */
  @Prop() lazy = false;

  /**
   * When set to `false`, SVG content that is HTTP fetched will not be checked
   * if the response SVG content has any `<script>` elements, or any attributes
   * that start with `on`, such as `onclick`.
   * @default true
   */
  @Prop() sanitize = true;

  componentWillLoad() {
    this.inheritedAttributes = inheritAttributes(this.el, ['aria-label']);
  }

  connectedCallback() {
    /**
     * purposely do not return the promise here because loading
     * the svg file should not hold up loading the app
     * only load the svg if it's visible
     */
    this.waitUntilVisible(this.el, '50px', () => {
      this.isVisible = true;
      this.loadIcon();
    });
  }

  /**
   * Loads the icon after the component has finished rendering.
   */
  componentDidLoad() {
    /**
     * Addresses an Angular issue where property values are assigned after the 'connectedCallback' but prior to the registration of watchers.
     * This enhancement ensures the loading of an icon when the component has finished rendering and the icon has yet to apply the SVG data.
     * This modification pertains to the usage of Angular's binding syntax:
     * `<ion-icon [name]="myIconName"></ion-icon>`
     */
    if (!this.didLoadIcon) {
      this.loadIcon();
    }
  }

  /**
   * Disconnect the IntersectionObserver.
   */
  disconnectedCallback() {
    if (this.io) {
      this.io.disconnect();
      this.io = undefined;
    }
  }

  /**
   * Wait until the icon is visible in the viewport.
   * @param el - The element to observe.
   * @param rootMargin - The root margin of the observer.
   * @param cb - The callback to call when the element is visible.
   */
  private waitUntilVisible(el: HTMLElement, rootMargin: string, cb: () => void) {
    /**
     * IntersectionObserver is a browser API that allows you to observe
     * the visibility of an element relative to a root element. It is
     * supported in all modern browsers, except IE and when server-side
     * rendering.
     */
    const hasIntersectionObserverSupport = Boolean(
      Build.isBrowser && this.lazy && typeof window !== 'undefined' && window.IntersectionObserver,
    );

    /**
     * browser doesn't support IntersectionObserver
     * so just fallback to always show it
     */
    if (!hasIntersectionObserverSupport) {
      return cb();
    }

    const io = (this.io = new window.IntersectionObserver(
      (data: IntersectionObserverEntry[]) => {
        if (data[0].isIntersecting) {
          io.disconnect();
          this.io = undefined;
          cb();
        }
      },
      { rootMargin },
    ));

    io.observe(el);
  }

  /**
   * Watch for changes to the icon name, src, icon, ios, or md properties.
   * When a change is detected, the icon will be loaded.
   */
  @Watch('name')
  @Watch('src')
  @Watch('icon')
  @Watch('ios')
  @Watch('md')
  loadIcon() {
    if (Build.isBrowser && this.isVisible) {
      const url = getUrl(this);

      if (url) {
        if (ioniconContent.has(url)) {
          // sync if it's already loaded
          this.svgContent = ioniconContent.get(url);
        } else {
          // async if it hasn't been loaded
          getSvgContent(url, this.sanitize).then(() => (this.svgContent = ioniconContent.get(url)));
        }
        this.didLoadIcon = true;
      }
    }

    this.iconName = getName(this.name, this.icon, this.mode, this.ios, this.md);
  }

  render() {
    const { flipRtl, iconName, inheritedAttributes, el } = this;
    const mode = this.mode || 'md';

    /**
     * we have designated that arrows & chevrons should automatically flip (unless flip-rtl
     * is set to false) because "back" is left in ltr and right in rtl, and "forward" is the opposite
     */
    const shouldAutoFlip = iconName
      ? (iconName.includes('arrow') || iconName.includes('chevron')) && flipRtl !== false
      : false;

    /**
     * if shouldBeFlippable is true, the icon should change direction when `dir` changes
     */
    const shouldBeFlippable = flipRtl || shouldAutoFlip;

    return (
      <Host
        role="img"
        class={{
          [mode]: true,
          ...createColorClasses(this.color),
          [`icon-${this.size}`]: !!this.size,
          'flip-rtl': shouldBeFlippable,
          'icon-rtl': shouldBeFlippable && isRTL(el),
        }}
        {...inheritedAttributes}
      >
        {Build.isBrowser && this.svgContent ? (
          <div class="icon-inner" innerHTML={this.svgContent}></div>
        ) : (
          <div class="icon-inner"></div>
        )}
      </Host>
    );
  }
}

/**
 * Get the mode of the document.
 * @returns The mode of the document.
 */
const getIonMode = () =>
  (Build.isBrowser && typeof document !== 'undefined' && document.documentElement.getAttribute('mode')) || 'md';

/**
 * Create color classes for the icon.
 * @param color - The color of the icon.
 * @returns The color classes for the icon.
 */
const createColorClasses = (color: string | undefined) => {
  return color
    ? {
        'ion-color': true,
        [`ion-color-${color}`]: true,
      }
    : null;
};
