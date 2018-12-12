import { Component, Element, Prop, State, Watch } from '@stencil/core';
import { getIconMap, getName, getSrc, isValid } from './utils';

@Component({
  tag: 'ion-icon',
  assetsDir: 'svg',
  styleUrl: 'icon.css',
  shadow: true
})
export class Icon {
  private io?: IntersectionObserver;

  @Element() el!: HTMLElement;

  @State() private svgContent?: string;
  @State() private isVisible = false;

  @Prop({ context: 'isServer' }) isServer!: boolean;
  @Prop({ context: 'resourcesUrl' }) resourcesUrl!: string;
  @Prop({ context: 'document' }) doc!: Document;
  @Prop({ context: 'window' }) win: any;

  /**
   * The color to use for the background of the item.
   */
  @Prop() color?: string;

  /**
   * The mode determines which platform styles to use.
   * Possible values are: `"ios"` or `"md"`.
   */
  @Prop() mode?: 'ios' | 'md';

  /**
   * Specifies the label to use for accessibility. Defaults to the icon name.
   */
  @Prop({ mutable: true, reflectToAttr: true }) ariaLabel?: string;

  /**
   * Specifies which icon to use on `ios` mode.
   */
  @Prop() ios?: string;

  /**
   * Specifies which icon to use on `md` mode.
   */
  @Prop() md?: string;

  /**
   * Specifies which icon to use from the built-in set of icons.
   */
  @Prop() name?: string;

  /**
   * Specifies the exact `src` of an SVG file to use.
   */
  @Prop() src?: string;

  /**
   * A combination of both `name` and `src`. If a `src` url is detected
   * it will set the `src` property. Otherwise it assumes it's a built-in named
   * SVG and set the `name` property.
   */
  @Prop() icon?: string;

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

  componentWillLoad() {
    // purposely do not return the promise here because loading
    // the svg file should not hold up loading the app
    // only load the svg if it's visible
    this.waitUntilVisible(this.el, '50px', () => {
      this.isVisible = true;
      this.loadIcon();
    });
  }

  componentDidUnload() {
    if (this.io) {
      this.io.disconnect();
      this.io = undefined;
    }
  }

  private waitUntilVisible(el: HTMLElement, rootMargin: string, cb: () => void) {
    if (this.lazy && this.win && this.win.IntersectionObserver) {
      const io = this.io = new this.win.IntersectionObserver((data: IntersectionObserverEntry[]) => {
        if (data[0].isIntersecting) {
          io.disconnect();
          this.io = undefined;
          cb();
        }
      }, { rootMargin });

      io.observe(el);

    } else {
      // browser doesn't support IntersectionObserver
      // so just fallback to always show it
      cb();
    }
  }


  @Watch('name')
  @Watch('src')
  @Watch('icon')
  loadIcon() {
    if (!this.isServer && this.isVisible) {
      const url = this.getUrl();
      if (url) {
        getSvgContent(this.doc, url, 's-ion-icon')
          .then(svgContent => this.svgContent = svgContent);
      } else {
        console.error('icon was not resolved');
      }
    }

    if (!this.ariaLabel) {
      const name = getName(this.name, this.mode, this.ios, this.md);
      // user did not provide a label
      // come up with the label based on the icon name
      if (name) {
        this.ariaLabel = name
          .replace('ios-', '')
          .replace('md-', '')
          .replace(/\-/g, ' ');
      }
    }
  }

  getUrl() {
    let url = getSrc(this.src);
    if (url) {
      return url;
    }

    url = getName(this.name, this.mode, this.ios, this.md);
    if (url) {
      return this.getNamedUrl(url);
    }

    url = getSrc(this.icon);
    if (url) {
      return url;
    }

    url = getName(this.icon, this.mode, this.ios, this.md);
    if (url) {
      return this.getNamedUrl(url);
    }

    return null;
  }

  private getNamedUrl(name: string) {
    const url = getIconMap().get(name);
    if (url) {
      return url;
    }
    return `${this.resourcesUrl}svg/${name}.svg`;
  }

  hostData() {
    return {
      'role': 'img',
      class: {
        ...createColorClasses(this.color),
        [`icon-${this.size}`]: !!this.size,
      }
    };
  }

  render() {
    if (!this.isServer && this.svgContent) {
      // we've already loaded up this svg at one point
      // and the svg content we've loaded and assigned checks out
      // render this svg!!
      return <div class="icon-inner" innerHTML={this.svgContent}></div>;
    }

    // actively requesting the svg
    // or it's an SSR render
    // so let's just render an empty div for now
    return <div class="icon-inner"></div>;
  }
}


const requests = new Map<string, Promise<string>>();

function getSvgContent(doc: Document, url: string, scopedId: string | undefined) {
  // see if we already have a request for this url
  let req = requests.get(url);

  if (!req) {
    // we don't already have a request
    req = fetch(url, { cache: 'force-cache' }).then(rsp => {
      if (isStatusValid(rsp.status)) {
        return rsp.text();
      }
      return Promise.resolve(null);
    }).then(svgContent => validateContent(doc, svgContent, scopedId));

    // cache for the same requests
    requests.set(url, req);
  }

  return req;
}


function isStatusValid(status: number) {
  return status <= 299;
}

function validateContent(
  document: Document,
  svgContent: string | null,
  scopeId: string | undefined
) {
  if (svgContent) {
    const frag = document.createDocumentFragment();
    const div = document.createElement('div');
    div.innerHTML = svgContent;
    frag.appendChild(div);

    // setup this way to ensure it works on our buddy IE
    for (let i = div.childNodes.length - 1; i >= 0; i--) {
      if (div.childNodes[i].nodeName.toLowerCase() !== 'svg') {
        div.removeChild(div.childNodes[i]);
      }
    }

    // must only have 1 root element
    const svgElm = div.firstElementChild;
    if (svgElm && svgElm.nodeName.toLowerCase() === 'svg') {
      if (scopeId) {
        svgElm.setAttribute('class', scopeId);
      }
      // root element must be an svg
      // lets double check we've got valid elements
      // do not allow scripts
      if (isValid(svgElm as any)) {
        return div.innerHTML;
      }
    }
  }
  return '';
}

function createColorClasses(color: string | undefined) {
  return (color) ? {
    'ion-color': true,
    [`ion-color-${color}`]: true
  } : null;
}
