import { isEncodedDataUrl, isSvgDataUrl, validateContent } from './validate';

export const ioniconContent = new Map<string, string>();
const requests = new Map<string, Promise<any>>();

let parser: DOMParser;

export const getSvgContent = (url: string, sanitize: boolean) => {
  // see if we already have a request for this url
  let req = requests.get(url);

  if (!req) {
    if (typeof fetch !== 'undefined' && typeof document !== 'undefined') {
      /**
       * If the url is a data url of an svg, then try to parse it
       * with the DOMParser. This works with content security policies enabled.
       */
      if (isSvgDataUrl(url) && isEncodedDataUrl(url)) {
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
        }
        return Promise.resolve();
      } else {
        // we don't already have a request
        req = fetch(url).then((rsp) => {
          if (rsp.ok) {
            return rsp.text().then((svgContent) => {
              if (svgContent && sanitize !== false) {
                svgContent = validateContent(svgContent);
              }
              ioniconContent.set(url, svgContent || '');
            });
          }
          ioniconContent.set(url, '');
        });
        // cache for the same requests
        requests.set(url, req);
      }

    } else {
      // set to empty for ssr scenarios and resolve promise
      ioniconContent.set(url, '');
      return Promise.resolve();
    }
  }

  return req;
};
