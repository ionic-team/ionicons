import { Component, Prop, State, Watch } from '@stencil/core';

@Component({
  tag: 'ion-icon',
  host: {
    theme: 'icon'
  },
  styleUrl: 'icon.css'
})
export class Icon {

  @State() private svgContent?: string;

  @Prop({ context: 'isServer'}) private isServer!: boolean;
  @Prop({ context: 'publicPath'}) private publicPath!: string;

  @Prop() mode!: string;

  /**
   * The color to use from your Sass `$colors` map.
   * Default options are: `"primary"`, `"secondary"`, `"danger"`, `"light"`, and `"dark"`.
   * For more information, see [Theming your App](/docs/theming/theming-your-app).
   */
  @Prop() color?: string;

  /**
   * Specifies the label to use for accessibility. Defaults to the icon name.
   */
  @Prop() ariaLabel?: string;

  /**
   * Specifies which icon to use on `ios` mode.
   */
  @Prop() ios?: string;

  /**
   * Specifies which icon to use on `md` mode.
   */
  @Prop() md?: string;

  /**
   * Specifies which icon to use. The appropriate icon will be used based on the mode.
   * For more information, see [Ionicons](/docs/ionicons/).
   */
  @Prop() name?: string;

  /**
   * The size of the icon.
   * Available options are: `"small"` and `"large"`.
   */
  @Prop() size?: 'small' | 'large';

  @Watch('name')
  @Watch('md')
  @Watch('ios')
  async loadIcon() {
    if (!this.isServer) {
      this.svgContent = await loadSvgContent(this.getIconName(), this.publicPath);
    }
  }

  componentWillLoad() {
    this.loadIcon();
  }

  private getIconName() {
    const mode = this.mode || 'md';
    const {name, ios, md} = this;
    if (!name) {
      return null;
    }
    let iconName = name.toLowerCase();

    // if an icon was passed in using the ios or md attributes
    // set the iconName to whatever was passed in
    if (ios && mode === 'ios') {
      iconName = ios.toLowerCase();
    } else if (md && mode === 'md') {
      iconName = md.toLowerCase();
    // this does not have one of the defaults
    // so lets auto add in the mode prefix for them
    } else if (iconName && !(/^md-|^ios-|^logo-/.test(iconName))) {
      iconName = `${mode}-${iconName}`;
    }

    // only allow alpha characters and dash
    const invalidChars = iconName.replace(/[a-z]|-|\d/g, '');
    if (invalidChars !== '') {
      console.error(`invalid characters in ion-icon name: ${invalidChars}`);
      return null;
    }
    return iconName;
  }

  private getAriaLabel() {
    if (this.ariaLabel) {
      // user provided label
      return this.ariaLabel;

    }
    // come up with the label based on the icon name
    const iconName = this.getIconName();
    if (iconName) {
      return iconName
        .replace('ios-', '')
        .replace('md-', '')
        .replace('-outline', '')
        .replace(/\-/g, ' ');
    }
  }

  hostData() {
    return {
      'role': 'img',
      'aria-label': this.getAriaLabel(),

      class: {
        [`icon-${this.size}`]: !!this.size
      }
    };
  }


  render() {
    return <div class="icon-inner" innerHTML={this.svgContent}></div>;
  }
}

const requests = new Map<string, Promise<string | undefined>>();

async function loadSvgContent(iconName: string | null, publicPath: string) {
  if (!iconName) {
    return undefined;
  }
  let req = requests.get(iconName);
  if (!req) {
    req = requestIcon(iconName, publicPath);
    requests.set(iconName, req);
  }
  return req;
}

async function requestIcon(iconName: string, publicPath: string) {
  const url = `${publicPath}../svg/${iconName}.svg`;
  const res = await fetch(url, {keepalive: true, cache: 'force-cache'});
  if (res.ok) {
    return res.text();
  }
  return undefined;
}
