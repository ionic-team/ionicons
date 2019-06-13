import { Icon } from '../icon';
import { getName, getSrc, getUrl } from '../utils';


describe('getUrl', () => {
  let i: Icon;

  beforeEach(() => {
    i = new Icon();
  });

  it('use icon prop, as name', () => {
    i.icon = 'some-name';
    expect(getUrl(i)).toBe('/svg/md-some-name.svg');
  });

  it('use icon prop, as url', () => {
    i.icon = './some.svg';
    expect(getUrl(i)).toBe('./some.svg');
  });

  it('use icon prop, as an object of modes, md default', () => {
    i.icon = {
      md: './md-imported.svg',
      ios: './ios-imported.svg'
    };
    expect(getUrl(i)).toBe('./md-imported.svg');
  });

  it('use icon prop, as an object of modes, md mode', () => {
    i.mode = 'md';
    i.icon = {
      md: './md-imported.svg',
      ios: './ios-imported.svg'
    };
    expect(getUrl(i)).toBe('./md-imported.svg');
  });

  it('use icon prop, as an object of modes, ios mode', () => {
    i.mode = 'ios';
    i.icon = {
      md: './md-imported.svg',
      ios: './ios-imported.svg'
    };
    expect(getUrl(i)).toBe('./ios-imported.svg');
  });

  it('use name prop, set ios mode', () => {
    i.name = 'some-name';
    i.mode = 'ios';
    expect(getUrl(i)).toBe('/svg/ios-some-name.svg');
  });

  it('use name prop, set md mode', () => {
    i.name = 'some-name';
    i.mode = 'md';
    expect(getUrl(i)).toBe('/svg/md-some-name.svg');
  });

  it('use name prop, set undefined mode', () => {
    i.name = 'some-name';
    i.mode = undefined as any;
    expect(getUrl(i)).toBe('/svg/md-some-name.svg');
  });

  it('use name prop, set unknown mode', () => {
    i.name = 'some-name';
    i.mode = 'somemode' as any;
    expect(getUrl(i)).toBe('/svg/md-some-name.svg');
  });

  it('use name prop, default md mode', () => {
    i.name = 'some-name';
    i.icon = 'some-icon';
    expect(getUrl(i)).toBe('/svg/md-some-name.svg');
  });

  it('use src prop', () => {
    i.src = './some.svg';
    i.name = 'some-name';
    i.icon = 'some-icon';
    expect(getUrl(i)).toBe('./some.svg');
  });

});


describe('getSrc', () => {

  it('both . and /', () => {
    expect(getSrc('./somefile.svg')).toBe('./somefile.svg');
  });

  it('url', () => {
    expect(getSrc('https://ionicons/somefile.svg')).toBe('https://ionicons/somefile.svg');
  });

  it('just a .', () => {
    expect(getSrc('somefile.svg')).toBe('somefile.svg');
  });

  it('just a /', () => {
    expect(getSrc('/somesvg')).toBe('/somesvg');
  });

  it('no . or /', () => {
    expect(getSrc('some-name')).toBe(null);
  });

});


describe('getName', () => {

  it('not allow special chars', () => {
    expect(getName('some\\name', '', 'io', '', '')).toBe(null);
    expect(getName('some$name', '', 'io', '', '')).toBe(null);
    expect(getName('some:name', '', 'io', '', '')).toBe(null);
    expect(getName('some.name', '', 'io', '', '')).toBe(null);
    expect(getName('some/name', '', 'io', '', '')).toBe(null);
  });

  it('use ios mode from mode property', () => {
    expect(getName('some-name', '', 'ios', '', '')).toBe('ios-some-name');
  });

  it('use md mode from mode property', () => {
    expect(getName('some-name', '', 'md', '', '')).toBe('md-some-name');
  });

  it('use ios mode prefixed', () => {
    expect(getName('ios-some-name', '', '', '', '')).toBe('ios-some-name');
  });

  it('use md mode prefixed', () => {
    expect(getName('md-some-name', '', '', '', '')).toBe('md-some-name');
  });

  it('always lowercase name and mode', () => {
    expect(getName('SOME-NAME', '', 'IOS', '', '')).toBe('ios-some-name');
  });

  it('default md name w/out mode, ios or md', () => {
    expect(getName('some-name', '', '', '', '')).toBe('md-some-name');
  });

  it('should not use name if no name, ios or md', () => {
    expect(getName(undefined, undefined, '', '', '')).toBe(null);
  });

});
