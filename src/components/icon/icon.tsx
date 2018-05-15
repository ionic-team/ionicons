import { Component, Prop, State, Watch } from '@stencil/core';


@Component({
  tag: 'ion-icon',
  host: {
    theme: 'icon'
  },
  assetsDir: 'svg',
  styleUrl: 'icon.css'
})
export class Icon {
  @State() private svgContent: string = null;

  @Prop({ context: 'isServer'}) private isServer: boolean;

  @Prop({ context: 'resourcesUrl'}) private resourcesUrl: string;

  @Prop({ context: 'mode' }) mode: string;

  @Prop({ context: 'document' }) doc: Document;

  @Prop({ context: 'window' }) win: Window;

  @Prop({ context: 'appVersion' }) appVersion: string;

  @Prop() color: string;

  /**
   * Specifies the label to use for accessibility. Defaults to the icon name.
   */
  @Prop() ariaLabel = '';

  /**
   * Specifies which icon to use on `ios` mode.
   */
  @Prop() ios = '';

  /**
   * Specifies which icon to use on `md` mode.
   */
  @Prop() md = '';

  /**
   * Specifies which icon to use from the built-in set of icons.
   */
  @Prop() name = '';

  /**
   * Specifies the exact `src` of an SVG file to use.
   */
  @Prop() src = '';

  /**
   * A combination of both `name` and `src`. If a `src` url is detected
   * it will set the `src` property. Otherwise it assumes it's a built-in named
   * SVG and set the `name` property.
   */
  @Prop() icon = '';

  /**
   * The size of the icon.
   * Available options are: `"small"` and `"large"`.
   */
  @Prop() size: string;


  componentWillLoad() {
    // purposely do not return the promise here because loading
    // the svg file should not hold up loading the app
    this.update();
  }

  @Watch('name')
  @Watch('src')
  @Watch('icon')
  update() {
    if (!this.isServer) {
      const url = this.getUrl();

      if (url) {
        const cacheKey = `ionicons_${this.appVersion}_${url}`;
        const cachedSvg = this.win.localStorage.getItem(cacheKey);

        if (cachedSvg) {
          this.svgContent = cachedSvg;

        } else {
          fetch(url).then(rsp => {
            rsp.text().then(svgContent => {
              this.svgContent = validateContent(this.doc, svgContent);
              this.win.localStorage.setItem(cacheKey, this.svgContent);
            })
          });
        }
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

  getNamedUrl(name: string) {
    return `${this.resourcesUrl}svg/${name}.svg`;
  }

  hostData() {
    const attrs: {[attrName: string]: string} = {
      'role': 'img'
    };

    if (!this.ariaLabel) {
      const name = getName(this.name, this.mode, this.ios, this.md);
      // user did not provide a label
      // come up with the label based on the icon name
      if (name) {
        attrs['aria-label'] = this.name
          .replace('ios-', '')
          .replace('md-', '')
          .replace('-outline', '')
          .replace(/\-/g, ' ');
      }
    }

    const iconClasses = {};
    if (this.size) {
      iconClasses[`icon-${this.size}`] = true;
    }

    return {
      ...attrs,
      class: iconClasses
    };
  }


  render() {
    if (this.isServer) {
      return <div class="icon-inner">{/* ssr */}</div>;
    }

    if (this.svgContent) {
      // we've already loaded up this svg at one point
      // and the svg content we've loaded and assigned checks out
      // render this svg!!
      return <div class="icon-inner" innerHTML={this.svgContent}></div>;
    }

    // actively requesting the svg, so let's just render a div for now
    return <div class="icon-inner">{/* loading svg */}</div>;
  }
}


function getName(name: string, mode: string, ios: string, md: string) {
  if (typeof name !== 'string') {
    return null;
  }

  name = name.trim().toLowerCase();
  if (name.length === 0) {
    return null;
  }

  // default to "md" if somehow the mode wasn't set
  mode = mode || 'md';

  // if an icon was passed in using the ios or md attributes
  // set the iconName to whatever was passed in
  if (ios && mode === 'ios') {
    name = ios.toLowerCase();

  } else if (md && mode === 'md') {
    name = md.toLowerCase();

  } else if (name && !(/^md-|^ios-|^logo-/.test(name))) {
    // this does not have one of the defaults
    // so lets auto add in the mode prefix for them
    name = mode + '-' + name;
  }

  // only allow alpha characters and dash
  const invalidChars = name.replace(/[a-z]|-|\d/g, '');
  if (invalidChars !== '') {
    return null;
  }

  return name;
}


function getSrc(src: string) {
  if (typeof src === 'string') {
    src = src.trim();
    if (src.length > 0 && /\//.test(src)) {
      return src;
    }
  }
  return null;
}


function validateContent(document: Document, svgContent: string) {
  const frag = document.createDocumentFragment();
  const div = document.createElement('div');
  div.innerHTML = svgContent;
  frag.appendChild(div);

  // must only have 1 root element
  if (div.children.length === 1) {
    const rootElm = div.firstElementChild;

    // root element must be an svg
    if (rootElm.nodeName === 'SVG') {

      // lets double check we've got valid elements
      // do not allow scripts
      if (isValid(rootElm as any)) {
        return svgContent;
      }
    }
  }

  return null;
}


function isValid(elm: HTMLElement) {
  if (elm.nodeType === 1) {
    if (elm.nodeName === 'SCRIPT') {
      return false;
    }

    for (var i = 0; i < elm.attributes.length; i++) {
      let val = elm.attributes[i].value;
      if (typeof val === 'string' && val.toLowerCase().indexOf('on') === 0) {
        return false;
      }
    }

    for (i = 0; i < elm.childNodes.length; i++) {
      if (!isValid(elm.childNodes[i] as any)) {
        return false;
      }
    }
  }
  return true;
}
