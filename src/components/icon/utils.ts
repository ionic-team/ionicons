import { getAssetPath } from '@stencil/core';
import { Icon } from './icon';


let CACHED_MAP: Map<string, string>;

export const getIconMap = (): Map<string, string> => {
  if (typeof window === 'undefined') {
    return new Map();
  } else {
    if (!CACHED_MAP) {
      const win = window as any;
      win.Ionicons = win.Ionicons || {};
      CACHED_MAP = win.Ionicons.map = win.Ionicons.map || new Map();
    }
    return CACHED_MAP;
  }
};

export const addIcons = (icons: { [name: string]: string; }) => {
  const map = getIconMap();
  Object.keys(icons).forEach(name => map.set(name, icons[name]));
};


export const getUrl = (i: Icon) => {
  let url = getSrc(i.src);
  if (url) {
    return url;
  }

  url = getName(i.name, i.icon, i.mode, i.ios, i.md);
  if (url) {
    return getNamedUrl(url, i.el);
  }

  if (i.icon) {
    url = getSrc(i.icon);
    if (url) {
      return url;
    }

    url = getSrc(i.icon[i.mode]);
    if (url) {
      return url;
    }
  }

  return null;
};

/**
 * This functions checks if a Stencil component is using
 * the lazy loaded build of Stencil. Returns `true` if
 * the component is lazy loaded. Returns `false` otherwise.
 */
export const hasLazyBuild = (stencilEl: HTMLElement) => {
  return (stencilEl as any).componentOnReady !== undefined;
};

const getNamedUrl = (iconName: string, iconEl: HTMLElement) => {
  const url = getIconMap().get(iconName);
  if (url) {
    return url;
  }
  
  /**
   * The following code lazily loads the SVG
   * data based on a string name.
   * However, the asset path is not set when using dist-custom-elements.
   * In that scenario, developers either need to pass
   * the SVG data directly to the icon component or
   * cache the SVG using the addIcons function.
   */
  if (hasLazyBuild(iconEl)) {
    return getAssetPath(`svg/${iconName}.svg`);
  } else {
    console.warn(`[Ionicons Warning]: Could not find icon "${iconName}". Developers should either pass the SVG data to the icon component or cache it using the addIcons utility.`);
  }
};


export const getName = (
  iconName: string | undefined,
  icon: string | undefined,
  mode: string | undefined,
  ios: string | undefined,
  md: string | undefined
) => {
  // default to "md" if somehow the mode wasn't set
  mode = (mode && toLower(mode)) === 'ios' ? 'ios' : 'md';

  // if an icon was passed in using the ios or md attributes
  // set the iconName to whatever was passed in
  if (ios && mode === 'ios') {
    iconName = toLower(ios);

  } else if (md && mode === 'md') {
    iconName = toLower(md);

  } else {
    if (!iconName && icon && !isSrc(icon)) {
      iconName = icon;
    }
    if (isStr(iconName)) {
      iconName = toLower(iconName);
    }
  }

  if (!isStr(iconName) || iconName.trim() === '') {
    return null;
  }

  // only allow alpha characters and dash
  const invalidChars = iconName.replace(/[a-z]|-|\d/gi, '');
  if (invalidChars !== '') {
    return null;
  }

  return iconName;
};

export const getSrc = (src: string | undefined) => {
  if (isStr(src)) {
    src = src.trim();
    if (isSrc(src)) {
      return src;
    }
  }
  return null;
};

export const isSrc = (str: string) => str.length > 0 && /(\/|\.)/.test(str);

export const isStr = (val: any): val is string => typeof val === 'string';

export const toLower = (val: string) => val.toLowerCase();

/**
 * Elements inside of web components sometimes need to inherit global attributes
 * set on the host. For example, the inner input in `ion-input` should inherit
 * the `title` attribute that developers set directly on `ion-input`. This
 * helper function should be called in componentWillLoad and assigned to a variable
 * that is later used in the render function.
 *
 * This does not need to be reactive as changing attributes on the host element
 * does not trigger a re-render.
 */
export const inheritAttributes = (el: HTMLElement, attributes: string[] = []) => {
  const attributeObject: { [k: string]: any } = {};

  attributes.forEach(attr => {
    if (el.hasAttribute(attr)) {
      const value = el.getAttribute(attr);
      if (value !== null) {
        attributeObject[attr] = el.getAttribute(attr);
      }
      el.removeAttribute(attr);
    }
  });

  return attributeObject;
}

/**
 * Returns `true` if the document or host element
 * has a `dir` set to `rtl`. The host value will always
 * take priority over the root document value.
 */
export const isRTL = (hostEl?: Pick<HTMLElement, 'dir'>) => {
  if (hostEl) {
    if (hostEl.dir !== '') {
      return hostEl.dir.toLowerCase() === 'rtl';
    }
  }
  return document?.dir.toLowerCase() === 'rtl';
};