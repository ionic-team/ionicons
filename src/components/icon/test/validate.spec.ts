import { isEncodedDataUrl, isSvgDataUrl, isValid } from '../validate';


describe('isValid', () => {

  it('invalid onload attr', () => {
    const el = {
      nodeType: 1,
      nodeName: 'svg',
      attributes: [{ name: 'onload' }],
      childNodes: []
    } as any;
    expect(isValid(el)).toBe(false);
  });

  it('invalid onclick attr', () => {
    const el = {
      nodeType: 1,
      nodeName: 'svg',
      attributes: [{ name: 'OnClIcK' }],
      childNodes: []
    } as any;
    expect(isValid(el)).toBe(false);
  });

  it('invalid child SCRIPT elm', () => {
    const el = {
      nodeType: 1, nodeName: 'svg', attributes: [], childNodes: [
        { nodeType: 1, nodeName: 'SCRIPT', attributes: [], childNodes: [] }
      ]
    } as any;
    expect(isValid(el)).toBe(false);
  });

  it('invalid script elm', () => {
    const el = { nodeType: 1, nodeName: 'script', attributes: [], childNodes: [] } as any;
    expect(isValid(el)).toBe(false);
  });

  it('is valid circle elm', () => {
    const el = { nodeType: 1, nodeName: 'circle', attributes: [], childNodes: [] } as any;
    expect(isValid(el)).toBe(true);
  });

  it('is valid SVG elm', () => {
    const el = {
      nodeType: 1, nodeName: 'SVG', attributes: [], childNodes: [
        { nodeType: 1, nodeName: 'line', attributes: [], childNodes: [] }
      ]
    } as any;
    expect(isValid(el)).toBe(true);
  });

  it('is valid text node', () => {
    const el = { nodeType: 3, nodeName: '#text' } as any;
    expect(isValid(el)).toBe(true);
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