import * as icon from './icon';


describe('isValid', () => {

  it('invalid onload attr', () => {
    const el = {
      nodeType: 1,
      nodeName: 'svg',
      attributes: [{ value: 'onload' }],
      childNodes: []
    } as any;
    expect(icon.isValid(el)).toBe(false);
  });

  it('invalid onclick attr', () => {
    const el = {
      nodeType: 1,
      nodeName: 'svg',
      attributes: [{ value: 'OnClIcK' }],
      childNodes: []
    } as any;
    expect(icon.isValid(el)).toBe(false);
  });

  it('invalid child SCRIPT elm', () => {
    const el = { nodeType: 1, nodeName: 'svg', attributes: [], childNodes: [
      { nodeType: 1, nodeName: 'SCRIPT', attributes: [], childNodes: [] }
    ] } as any;
    expect(icon.isValid(el)).toBe(false);
  });

  it('invalid script elm', () => {
    const el = { nodeType: 1, nodeName: 'script', attributes: [], childNodes: [] } as any;
    expect(icon.isValid(el)).toBe(false);
  });

  it('is valid circle elm', () => {
    const el = { nodeType: 1, nodeName: 'circle', attributes: [], childNodes: [] } as any;
    expect(icon.isValid(el)).toBe(true);
  });

  it('is valid SVG elm', () => {
    const el = { nodeType: 1, nodeName: 'SVG', attributes: [], childNodes: [
      { nodeType: 1, nodeName: 'line', attributes: [], childNodes: [] }
    ] } as any;
    expect(icon.isValid(el)).toBe(true);
  });

  it('is valid text node', () => {
    const el = { nodeType: 3, nodeName: '#text' } as any;
    expect(icon.isValid(el)).toBe(true);
  });

});


describe('getUrl', () => {
  let i: icon.Icon;

  beforeEach(() => {
    i = new icon.Icon();
    i.resourcesUrl = '/build/ionicons/';
  });

  it('use icon prop, as name', () => {
    i.icon = 'some-name';
    expect(i.getUrl()).toBe('/build/ionicons/svg/md-some-name.svg');
  });

  it('use icon prop, as url', () => {
    i.icon = './some.svg';
    expect(i.getUrl()).toBe('./some.svg');
  });

  it('use name prop, set ios mode', () => {
    i.name = 'some-name';
    i.mode = 'ios';
    expect(i.getUrl()).toBe('/build/ionicons/svg/ios-some-name.svg');
  });

  it('use name prop, set md mode', () => {
    i.name = 'some-name';
    i.mode = 'md';
    expect(i.getUrl()).toBe('/build/ionicons/svg/md-some-name.svg');
  });

  it('use name prop, default md mode', () => {
    i.name = 'some-name';
    i.icon = 'some-icon';
    expect(i.getUrl()).toBe('/build/ionicons/svg/md-some-name.svg');
  });

  it('use src prop', () => {
    i.src = './some.svg';
    i.name = 'some-name';
    i.icon = 'some-icon';
    expect(i.getUrl()).toBe('./some.svg');
  });

});


describe('getSrc', () => {

  it('both . and /', () => {
    expect(icon.getSrc('./somefile.svg')).toBe('./somefile.svg');
  });

  it('url', () => {
    expect(icon.getSrc('https://ionicons/somefile.svg')).toBe('https://ionicons/somefile.svg');
  });

  it('just a .', () => {
    expect(icon.getSrc('somefile.svg')).toBe('somefile.svg');
  });

  it('just a /', () => {
    expect(icon.getSrc('/somesvg')).toBe('/somesvg');
  });

  it('no . or /', () => {
    expect(icon.getSrc('some-name')).toBe(null);
  });

});


describe('getName', () => {

  it('not allow special chars', () => {
    expect(icon.getName('some\\name', 'io', '', '')).toBe(null);
    expect(icon.getName('some$name', 'io', '', '')).toBe(null);
    expect(icon.getName('some:name', 'io', '', '')).toBe(null);
    expect(icon.getName('some.name', 'io', '', '')).toBe(null);
    expect(icon.getName('some/name', 'io', '', '')).toBe(null);
  });

  it('use ios mode from mode property', () => {
    expect(icon.getName('some-name', 'ios', '', '')).toBe('ios-some-name');
  });

  it('use md mode from mode property', () => {
    expect(icon.getName('some-name', 'md', '', '')).toBe('md-some-name');
  });

  it('use ios mode prefixed', () => {
    expect(icon.getName('ios-some-name', '', '', '')).toBe('ios-some-name');
  });

  it('use md mode prefixed', () => {
    expect(icon.getName('md-some-name', '', '', '')).toBe('md-some-name');
  });

  it('always lowercase name and mode', () => {
    expect(icon.getName('SOME-NAME', 'IOS', '', '')).toBe('ios-some-name');
  });

  it('default md name w/out mode, ios or md', () => {
    expect(icon.getName('some-name', '', '', '')).toBe('md-some-name');
  });

  it('should not use name if no name, ios or md', () => {
    expect(icon.getName('', '', '', '')).toBe(null);
  });

});
