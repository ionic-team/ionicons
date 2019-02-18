const h = window.DocsSite.h;

function applyPolyfill(window, document) {/*!
String.prototype.endsWith
*/
String.prototype.endsWith||Object.defineProperty(String.prototype,"endsWith",{writable:!0,configurable:!0,value:function(b,a){if(void 0===a||a>this.length)a=this.length;return this.substring(a-b.length,a)===b}});
/*!
String.prototype.includes
*/
String.prototype.includes||(String.prototype.includes=function(b,a){"number"!==typeof a&&(a=0);return a+b.length>this.length?!1:-1!==this.indexOf(b,a)});
/*!
String.prototype.startsWith
*/
String.prototype.startsWith||Object.defineProperty(String.prototype,"startsWith",{writable:!0,configurable:!0,value:function(b,a){return this.substr(!a||0>a?0:+a,b.length)===b}});}

export { applyPolyfill };
