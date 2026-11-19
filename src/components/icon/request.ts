import { isEncodedDataUrl, isSvgDataUrl, validateContent } from './validate';

export const ioniconContent = new Map<string, string>();
const requests = new Map<string, Promise<any>>();

let parser: DOMParser;

/**
 * Unsanitized content gets its own key so it's never served to an icon that
 * sanitizes.
 */
export const getCacheKey = (url: string, sanitize: boolean) =>
  `${sanitize !== false ? 'sanitized' : 'unsanitized'}:${url}`;

/**
 * Warns when the whole icon is rejected so it doesn't silently render nothing.
 */
const sanitizeSvg = (url: string, svgContent: string) =>
  validateContent(svgContent, () => {
    const source = url.length > 100 ? `${url.slice(0, 100)}...` : url;
    console.warn(
      `[Ionicons Warning]: The SVG from "${source}" was not rendered because it failed sanitization. Only set sanitize="false" for SVG content from a trusted source.`,
    );
  });

/**
 * Safely fallback to an empty svg
 */
function safeFallback(cacheKey: string) {
  const svg = '';
  ioniconContent.set(cacheKey, svg);
  return svg;
}

export const getSvgContent = (url: string, sanitize: boolean): Promise<string> => {
  const cacheKey = getCacheKey(url, sanitize);
  /**
   * See if we already have a request for this url
   */
  const req = requests.get(cacheKey);
  if (req) {
    return req;
  }

  if (typeof fetch !== 'undefined' && typeof document !== 'undefined') {
    /**
     * If the url is a data url of an svg, then try to parse it
     * with the DOMParser. This works with content security policies enabled.
     */
    if (isSvgDataUrl(url) && isEncodedDataUrl(url)) {
      return Promise.resolve(getSvgByUrl(url, sanitize));
    }

    return fetchSvg(url, sanitize);
  }

  return Promise.resolve(safeFallback(cacheKey));
};

function getSvgByUrl(url: string, sanitize: boolean): string {
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
    const svgContent = sanitize !== false ? sanitizeSvg(url, svg.outerHTML) : svg.outerHTML;
    ioniconContent.set(getCacheKey(url, sanitize), svgContent);
    return svgContent;
  }

  throw new Error(`Could not parse svg from ${url}`);
}

function fetchSvg(url: string, sanitize: boolean): Promise<string> {
  const cacheKey = getCacheKey(url, sanitize);
  /**
   * We don't already have a request
   */
  const req = fetch(url)
    .then((rsp) => {
      /**
       * When fetching from a file:// URL, some browsers return
       * a 0 status code even when the request succeeds so don't
       * rely on rsp.ok as the only signal of success.
       */
      return rsp
        .text()
        .then((svgContent) => {
          if (svgContent && sanitize !== false) {
            svgContent = sanitizeSvg(url, svgContent);
          }

          const svg = svgContent || '';
          ioniconContent.set(cacheKey, svg);
          return svg;
        })
        .catch(() => safeFallback(cacheKey));
    })
    .catch(() => safeFallback(cacheKey));

  /**
   * Cache for the same requests
   */
  requests.set(cacheKey, req);
  return req;
}
