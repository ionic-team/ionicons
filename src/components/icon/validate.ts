import { isStr } from './utils';

/**
 * Calls `onRejected` only when an `<svg>` was found and failed validation,
 * not when there's no `<svg>` at all (like an HTML 404 page).
 */
export const validateContent = (svgContent: string, onRejected?: () => void) => {
  /**
   * Parse into a template so nothing loads or runs yet. Parsing into a live
   * element would fire handlers like `<img onerror>` before validation.
   */
  const template = document.createElement('template');
  template.innerHTML = svgContent;
  const content = template.content;

  for (let i = content.childNodes.length - 1; i >= 0; i--) {
    if (content.childNodes[i].nodeName.toLowerCase() !== 'svg') {
      content.removeChild(content.childNodes[i]);
    }
  }

  const svgElm = content.firstElementChild;
  if (svgElm && svgElm.nodeName.toLowerCase() === 'svg') {
    const svgClass = svgElm.getAttribute('class') || '';
    svgElm.setAttribute('class', (svgClass + ' s-ion-icon').trim());

    /**
     * Illustrator exports keep editor data in a `<foreignObject>` next to the
     * artwork, so remove it instead of rejecting the icon.
     */
    removeForeignObjects(svgElm);

    // every root is serialized, so a second <svg> would skip validation
    if (content.children.length === 1 && isValid(svgElm as any)) {
      return template.innerHTML;
    }
    onRejected?.();
  }
  return '';
};

const removeForeignObjects = (elm: Element) => {
  for (let i = elm.children.length - 1; i >= 0; i--) {
    const child = elm.children[i];
    if (child.nodeName.toLowerCase() === 'foreignobject') {
      child.remove();
    } else {
      removeForeignObjects(child);
    }
  }
};

/**
 * Elements that can run script or load a document without an `on*` attribute.
 */
const disallowedElements = new Set(['script', 'foreignobject', 'iframe', 'embed', 'object']);

/**
 * Browsers ignore whitespace and control characters in a URL scheme, so strip
 * them first. Checking the whole value also catches lists like
 * `<animate values="a;javascript:...">`.
 */
const hasJavascriptUrl = (value: string) =>
  value
    .replace(/[\u0000-\u0020]/g, '')
    .toLowerCase()
    .includes('javascript:');

const SVG_NS = 'http://www.w3.org/2000/svg';

export const isValid = (elm: HTMLElement) => {
  if (elm.nodeType === 1) {
    /**
     * HTML inside `<desc>` or `<title>` (like `<noscript>`) can parse
     * differently when it renders than it did here, so only allow SVG elements.
     */
    if (elm.namespaceURI !== SVG_NS || disallowedElements.has(elm.nodeName.toLowerCase())) {
      return false;
    }

    for (let i = 0; i < elm.attributes.length; i++) {
      const { name, value } = elm.attributes[i];
      if (isStr(name) && name.toLowerCase().indexOf('on') === 0) {
        return false;
      }
      if (isStr(value) && hasJavascriptUrl(value)) {
        return false;
      }
    }

    for (let i = 0; i < elm.childNodes.length; i++) {
      if (!isValid(elm.childNodes[i] as any)) {
        return false;
      }
    }
  }
  return true;
};

export const isSvgDataUrl = (url: string) => url.startsWith('data:image/svg+xml');
export const isEncodedDataUrl = (url: string) => url.indexOf(';utf8,') !== -1;
