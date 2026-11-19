import { readFileSync, readdirSync } from 'fs';
import { join } from 'path';

import { isEncodedDataUrl, isSvgDataUrl, isValid, validateContent } from '../validate';

const SVG_NS = 'http://www.w3.org/2000/svg';

const elm = (nodeName: string, attributes: { name: string; value?: string }[] = [], childNodes: any[] = []) =>
  ({ nodeType: 1, namespaceURI: SVG_NS, nodeName, attributes, childNodes }) as any;

describe('isValid', () => {
  it('invalid onload attr', () => {
    expect(isValid(elm('svg', [{ name: 'onload' }]))).toBe(false);
  });

  it('invalid onclick attr', () => {
    expect(isValid(elm('svg', [{ name: 'OnClIcK' }]))).toBe(false);
  });

  it('invalid child SCRIPT elm', () => {
    expect(isValid(elm('svg', [], [elm('SCRIPT')]))).toBe(false);
  });

  it('invalid script elm', () => {
    expect(isValid(elm('script'))).toBe(false);
  });

  it('invalid foreignObject elm', () => {
    expect(isValid(elm('svg', [], [elm('foreignObject')]))).toBe(false);
  });

  it.each(['iframe', 'embed', 'object'])('invalid %s elm', (name) => {
    expect(isValid(elm('svg', [], [elm(name)]))).toBe(false);
  });

  it('invalid html namespace elm', () => {
    const noscript = { ...elm('noscript'), namespaceURI: 'http://www.w3.org/1999/xhtml' };
    expect(isValid(elm('svg', [], [elm('desc', [], [noscript])]))).toBe(false);
  });

  it('invalid javascript: url', () => {
    expect(isValid(elm('a', [{ name: 'href', value: 'javascript:alert(1)' }]))).toBe(false);
  });

  it('invalid obfuscated javascript: url', () => {
    expect(isValid(elm('a', [{ name: 'xlink:href', value: ' JaVa\tScRiPt:alert(1)' }]))).toBe(false);
  });

  it('invalid javascript: url in a value list', () => {
    expect(isValid(elm('animate', [{ name: 'values', value: 'https://ionic.io;javascript:alert(1)' }]))).toBe(false);
  });

  it('is valid circle elm', () => {
    expect(isValid(elm('circle'))).toBe(true);
  });

  it('is valid SVG elm', () => {
    expect(isValid(elm('SVG', [], [elm('line')]))).toBe(true);
  });

  it('is valid href', () => {
    expect(isValid(elm('a', [{ name: 'href', value: 'https://ionic.io' }]))).toBe(true);
  });

  it('is valid text node', () => {
    const el = { nodeType: 3, nodeName: '#text' } as any;
    expect(isValid(el)).toBe(true);
  });
});

describe('validateContent', () => {
  it('removes foreignObject and keeps the artwork', () => {
    const onRejected = jest.fn();
    const result = validateContent(
      `<svg xmlns="${SVG_NS}"><switch><foreignObject><iframe></iframe></foreignObject><g><path d="M0 0"></path></g></switch></svg>`,
      onRejected,
    );
    expect(result).toContain('<path');
    expect(result).not.toContain('foreignObject');
    expect(onRejected).not.toHaveBeenCalled();
  });

  it('strips non-svg siblings', () => {
    const result = validateContent(
      `<img src="x" onerror="alert(1)"><svg xmlns="${SVG_NS}"><path d="M0 0"></path></svg>`,
    );
    expect(result).toContain('<path');
    expect(result).not.toContain('<img');
  });

  it('rejects html inside desc and calls onRejected', () => {
    const onRejected = jest.fn();
    expect(validateContent(`<svg xmlns="${SVG_NS}"><desc><noscript><p></p></noscript></desc></svg>`, onRejected)).toBe(
      '',
    );
    expect(onRejected).toHaveBeenCalledTimes(1);
  });

  it('rejects more than one root svg', () => {
    const onRejected = jest.fn();
    const svg = `<svg xmlns="${SVG_NS}"><path d="M0 0"></path></svg>`;
    expect(validateContent(svg + svg, onRejected)).toBe('');
    expect(onRejected).toHaveBeenCalledTimes(1);
  });

  it('accepts every shipped icon', () => {
    const svgDir = join(__dirname, '../../../svg');
    const rejected = readdirSync(svgDir)
      .filter((file) => file.endsWith('.svg'))
      .filter((file) => !validateContent(readFileSync(join(svgDir, file), 'utf8')));
    expect(rejected).toEqual([]);
  });

  it('does not call onRejected when there is no svg', () => {
    const onRejected = jest.fn();
    expect(validateContent('<html><body>Not found</body></html>', onRejected)).toBe('');
    expect(onRejected).not.toHaveBeenCalled();
  });
});

it('isSvgDataUrl', () => {
  expect(isSvgDataUrl('data:image/svg+xml;base64,xxx')).toBe(true);
  expect(isSvgDataUrl('data:image/svg+xml;utf8,<svg></svg>')).toBe(true);
  expect(isSvgDataUrl('https://example.com/icon.svg')).toBe(false);
  expect(isSvgDataUrl('http://example.com/icon.svg')).toBe(false);
});

it('isEncodedDataUrl', () => {
  expect(isEncodedDataUrl('data:image/svg+xml;base64,xxx')).toBe(false);
  expect(isEncodedDataUrl('data:image/svg+xml;utf8,<svg></svg>')).toBe(true);
  expect(isEncodedDataUrl('https://example.com/icon.svg')).toBe(false);
  expect(isEncodedDataUrl('http://example.com/icon.svg')).toBe(false);
});
