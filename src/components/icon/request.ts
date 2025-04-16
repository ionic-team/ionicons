import { isEncodedDataUrl, isSvgDataUrl, validateContent } from './validate';

export const ioniconContent = new Map<string, string>();
const requests = new Map<string, Promise<any>>();

let parser: DOMParser;

/**
 * savely fallback to an empty svg
 */
function safeFallback (url: string) {
  const svg = '';
  ioniconContent.set(url, svg);
  return svg;
}

export const getSvgContent = (url: string, sanitize: boolean): Promise<string> | string => {
  /**
   * see if we already have a request for this url
   */
  const req = requests.get(url);
  if (req) {
    return req;
  }

  if (typeof fetch !== 'undefined' && typeof document !== 'undefined') {
    /**
     * If the url is a data url of an svg, then try to parse it
     * with the DOMParser. This works with content security policies enabled.
     */
    if (isSvgDataUrl(url) && isEncodedDataUrl(url)) {
      return getSvgByUrl(url);
    }

    return fetchSvg(url, sanitize);
  }

  return Promise.resolve(safeFallback(url));
};

function getSvgByUrl(url: string): string {
  if (!parser) {
    /**
     * Create an instance of the DOM parser. This creates a single
     * parser instance for the entire app, which is more efficient.
     */
    parser = new DOMParser();
  }
  const doc = parser.parseFromString(url, 'text/html');
  const svg = doc.querySelector('svg');
  if (svg) {
    ioniconContent.set(url, svg.outerHTML);
    return svg.outerHTML;
  }
  
  throw new Error(`Could not parse svg from ${url}`);
}

function fetchSvg(url: string, sanitize: boolean): Promise<string> {
  /**
   * we don't already have a request
   */
  const req = fetch(url).then((rsp) => {
    /**
     * When fetching from a file:// URL, some browsers return
     * a 0 status code even when the request succeeds so don't
     * rely on rsp.ok as the only signal of success.
     */
    return rsp.text().then((svgContent) => {
      if (svgContent && sanitize !== false) {
        svgContent = validateContent(svgContent);
      }

      const svg = svgContent || '';
      ioniconContent.set(url, svg);
      return svg;
    }).catch(() => safeFallback(url));
  }).catch(() => safeFallback(url));
 
  /**
   * cache for the same requests
   */
  requests.set(url, req);
  return req;
}