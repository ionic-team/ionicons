export function applyPolyfills() {
  var win = window;

  var promises = [];

  if (!win.customElements || (win.Element && (!win.Element.prototype.closest || !win.Element.prototype.matches || !win.Element.prototype.remove))) {
    promises.push(import('./dom.js'));
  }

  function checkIfURLIsSupported() {
    try {
      var u = new URL('b', 'http://a');
      u.pathname = 'c%20d';
      return (u.href === 'http://a/c%20d') && u.searchParams;
    } catch(e) {
      return false;
    }
  }

  if (
    'function' !== typeof Object.assign || !Object.entries ||
    !Array.prototype.find || !Array.prototype.includes ||
    !String.prototype.startsWith || !String.prototype.endsWith ||
    (win.NodeList && !win.NodeList.prototype.forEach) ||
    !win.fetch ||
    !checkIfURLIsSupported() ||
    typeof WeakMap == 'undefined'
  ) {
    promises.push(import('./core-js.js'));
  }
  if (!(win.CSS && win.CSS.supports && win.CSS.supports('color', 'var(--c)'))) {
    promises.push(import('./css-shim.js'));
  }
  return Promise.all(promises);
}
