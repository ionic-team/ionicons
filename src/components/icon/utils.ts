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
  Object.keys(icons).forEach(name => {
    addToIconMap(name, icons[name]);

    /**
     * Developers can also pass in the SVG object directly
     * and Ionicons can map the object to a kebab case name.
     * Example: addIcons({ addCircleOutline });
     * This will create an "addCircleOutline" entry and
     * an "add-circle-outline" entry.
     * Usage: <ion-icon name="add-circle-outline"></ion-icon>
     * Using name="addCircleOutline" is valid too, but the
     * kebab case naming is preferred.
     */
    const toKebabCase = name.replace(/([a-z0-9]|(?=[A-Z]))([A-Z0-9])/g, "$1-$2").toLowerCase();
    if (name !== toKebabCase) {
      addToIconMap(toKebabCase, icons[name]);
    }
  });
};

const addToIconMap = (name: string, data: any) => {
  const map = getIconMap();

  const existingIcon = map.get(name);

  if (existingIcon === undefined) {
    map.set(name, data);

  /**
   * Importing and defining the same icon reference
   * multiple times should not yield a warning.
   */
  } else if (existingIcon !== data) {
    console.warn(`[Ionicons Warning]: Multiple icons were mapped to name "${name}". Ensure that multiple icons are not mapped to the same icon name.`)
  }
}


export const getUrl = (i: Icon) => {
  let url = getSrc(i.src);
  if (url) {
    return url;
  }

  url = getName(i.name, i.icon, i.mode, i.ios, i.md);
  if (url) {
    return getNamedUrl(url, i);
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


const getNamedUrl = (iconName: string, iconEl: Icon) => {
  const url = getIconMap().get(iconName);
  if (url) {
    return url;
  }
  try {
    return getAssetPath(`svg/${iconName}.svg`);
  } catch(e) {
    /**
     * In the custom elements build version of ionicons, referencing an icon
     * by name will throw an invalid URL error because the asset path is not defined.
     * This catches that error and logs something that is more developer-friendly.
     * We also include a reference to the ion-icon element so developers can
     * figure out which instance of ion-icon needs to be updated.
     */
    console.warn(`[Ionicons Warning]: Could not load icon with name "${iconName}". Ensure that the icon is registered using addIcons or that the icon SVG data is passed directly to the icon component.`, iconEl);
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