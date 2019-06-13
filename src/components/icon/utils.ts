import { getAssetPath } from '@stencil/core';
import { Icon } from './icon';


let CACHED_MAP: Map<string, string>;

export const getIconMap = (): Map<string, string> => {
  if (!CACHED_MAP) {
    const win = window as any;
    win.Ionicons = win.Ionicons || {};
    CACHED_MAP = win.Ionicons.map = win.Ionicons.map || new Map();
  }
  return CACHED_MAP;
};

export const addIcons = (icons: {[name: string]: string }) => {
  const map = getIconMap();
  Object.keys(icons).forEach(name => {
    map.set(name, icons[name]);
  });
};


export const getUrl = (i: Icon) => {
  let url = getSrc(i.src);
  if (url) {
    return url;
  }

  url = getName(i.name, i.icon, i.mode, i.ios, i.md);
  if (url) {
    return getNamedUrl(url);
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


const getNamedUrl = (name: string) => {
  const url = getIconMap().get(name);
  if (url) {
    return url;
  }
  return getAssetPath(`svg/${name}.svg`);
};


export const getName = (
  name: string | undefined,
  icon: string | undefined,
  mode: string | undefined,
  ios: string | undefined,
  md: string | undefined
) => {
  // default to "md" if somehow the mode wasn't set
  mode = (mode && mode.toLowerCase()) === 'ios' ? 'ios' : 'md';

  // if an icon was passed in using the ios or md attributes
  // set the iconName to whatever was passed in
  if (ios && mode === 'ios') {
    name = ios.toLowerCase();

  } else if (md && mode === 'md') {
    name = md.toLowerCase();

  } else {
    if (!name && icon && !isSrc(icon)) {
      name = icon;
    }
    if (isStr(name)) {
      name = name.toLowerCase();
      if (!/^md-|^ios-|^logo-/.test(name)) {
        // this does not have one of the defaults
        // so lets auto add in the mode prefix for them
        name = mode + '-' + name;
      }
    }
  }

  if (!isStr(name) || name.trim() === '') {
    return null;
  }

  // only allow alpha characters and dash
  const invalidChars = name.replace(/[a-z]|-|\d/gi, '');
  if (invalidChars !== '') {
    return null;
  }

  return name;
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

export const isSrc = (str: string) => {
  return str.length > 0 && /(\/|\.)/.test(str);
};


export const isStr = (val: any): val is string => typeof val === 'string';
