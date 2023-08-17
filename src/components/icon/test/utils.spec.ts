import { Icon } from '../icon';
import { addIcons, getIconMap, getName, getSrc, getUrl } from '../utils';


describe('getUrl', () => {
  let i: Icon;

  beforeEach(() => {
    i = new Icon();
  });

  it('use icon prop, as name', () => {
    i.icon = 'some-name';
    expect(getUrl(i)).toBe('/svg/some-name.svg');
  });

  it('use icon prop, as url', () => {
    i.icon = './some.svg';
    expect(getUrl(i)).toBe('./some.svg');
  });

  it('use name prop', () => {
    i.name = 'some-name';
    expect(getUrl(i)).toBe('/svg/some-name.svg');
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

  it('use ios mode prefixed', () => {
    expect(getName('ios-some-name', '', '', '', '')).toBe('ios-some-name');
  });

  it('use md mode prefixed', () => {
    expect(getName('md-some-name', '', '', '', '')).toBe('md-some-name');
  });

  it('should not use name if no name, ios or md', () => {
    expect(getName(undefined, undefined, '', '', '')).toBe(null);
  });

});

describe('addIcons', () => {
  it('should add an svg to the icon cache', () => {
    const testData = 'stubbed data';
    
    expect(getIconMap().get('logo-ionic')).toEqual(undefined);
    
    addIcons({ 'logo-ionic': 'stubbed data' });
    
    expect(getIconMap().get('logo-ionic')).toEqual(testData);
  });
  
  it('should add kebab and camel case names to the icon cache', () => {
    const logoIonitron = 'stubbed data';
    
    expect(getIconMap().get('logo-ionitron')).toEqual(undefined);
    expect(getIconMap().get('logoIonitron')).toEqual(undefined);
    
    addIcons({ logoIonitron });
    
    expect(getIconMap().get('logo-ionitron')).toEqual(logoIonitron);
    expect(getIconMap().get('logoIonitron')).toEqual(logoIonitron);
  });
});
