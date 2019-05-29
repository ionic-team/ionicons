
/*!
Array.prototype.fill
*/
Array.prototype.fill||Object.defineProperty(Array.prototype,"fill",{value:function(t){var r,e,i,n,o,a,l;if(null==this)throw new TypeError("this is null or not defined");for(e=(r=Object(this)).length>>>0,n=(i=arguments[1]>>0)<0?Math.max(e+i,0):Math.min(i,e),l=(a=void 0===(o=arguments[2])?e:o>>0)<0?Math.max(e+a,0):Math.min(a,e);n<l;)r[n]=t,n++;return r}});

/*!
Array.prototype.find
*/
Array.prototype.find||Object.defineProperty(Array.prototype,"find",{writable:!0,configurable:!0,value:function(c,e){if(null==this)throw new TypeError('"this" is null or not defined');var b=Object(this),f=b.length>>>0;if("function"!==typeof c)throw new TypeError("predicate must be a function");for(var a=0;a<f;){var d=b[a];if(c.call(e,d,a,b))return d;a++}}});
/*!
Array.prototype.findIndex
*/
Array.prototype.findIndex||Object.defineProperty(Array.prototype,"findIndex",{value:function(c,d){if(null==this)throw new TypeError('"this" is null or not defined');var b=Object(this),e=b.length>>>0;if("function"!==typeof c)throw new TypeError("predicate must be a function");for(var a=0;a<e;){if(c.call(d,b[a],a,b))return a;a++}return-1},configurable:!0,writable:!0});
/*!
Array.from
*/
Array.from||(Array.from=function(){var l=Object.prototype.toString,h=function(c){return"function"===typeof c||"[object Function]"===l.call(c)},m=Math.pow(2,53)-1;return function(c){var k=Object(c);if(null==c)throw new TypeError("Array.from requires an array-like object - not null or undefined");var d=1<arguments.length?arguments[1]:void 0,f;if("undefined"!==typeof d){if(!h(d))throw new TypeError("Array.from: when provided, the second argument must be a function");2<arguments.length&&(f=arguments[2])}var a=
Number(k.length);a=isNaN(a)?0:0!==a&&isFinite(a)?(0<a?1:-1)*Math.floor(Math.abs(a)):a;a=Math.min(Math.max(a,0),m);for(var g=h(this)?Object(new this(a)):Array(a),b=0,e;b<a;)e=k[b],g[b]=d?"undefined"===typeof f?d(e,b):d.call(f,e,b):e,b+=1;g.length=a;return g}}());
/*!
Array.prototype.includes
*/
Array.prototype.includes||Object.defineProperty(Array.prototype,"includes",{writable:!0,configurable:!0,value:function(r,e){if(null==this)throw new TypeError('"this" is null or not defined');var t=Object(this),n=t.length>>>0;if(0===n)return!1;var i,o,a=0|e,u=Math.max(0<=a?a:n-Math.abs(a),0);for(;u<n;){if((i=t[u])===(o=r)||"number"==typeof i&&"number"==typeof o&&isNaN(i)&&isNaN(o))return!0;u++}return!1}});

/*!
Object.assign
*/
"function"!=typeof Object.assign&&Object.defineProperty(Object,"assign",{value:function(d,f){if(null==d)throw new TypeError("Cannot convert undefined or null to object");for(var e=Object(d),b=1;b<arguments.length;b++){var a=arguments[b];if(null!=a)for(var c in a)Object.prototype.hasOwnProperty.call(a,c)&&(e[c]=a[c])}return e},writable:!0,configurable:!0});
/*!
Object.entries
*/
Object.entries||(Object.entries=function(c){for(var b=Object.keys(c),a=b.length,d=Array(a);a--;)d[a]=[b[a],c[b[a]]];return d});
/*!
Object.values
*/
Object.values||(Object.values=function(n){return Object.keys(n).map(function(r){return n[r]})});

/*!
Number
*/
void 0===Number.isFinite&&(Number.isFinite=function(a){return"number"===typeof a&&isFinite(a)});
Number.isNaN=Number.isNaN||function(a){return a!==a};
Number.isInteger=Number.isInteger||function(a){return"number"===typeof a&&isFinite(a)&&Math.floor(a)===a};

/*!
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
String.prototype.startsWith||Object.defineProperty(String.prototype,"startsWith",{writable:!0,configurable:!0,value:function(b,a){return this.substr(!a||0>a?0:+a,b.length)===b}});
/*
  Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
  This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
  The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
  The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
  Code distributed by Google as part of the polymer project is also
  subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
(function(){"use strict";var t=new Set("annotation-xml color-profile font-face font-face-src font-face-uri font-face-format font-face-name missing-glyph".split(" "));function e(e){var n=t.has(e);return e=/^[a-z][.0-9_a-z]*-[\-.0-9_a-z]*$/.test(e),!n&&e}function n(t){var e=t.isConnected;if(void 0!==e)return e;for(;t&&!(t.__CE_isImportDocument||t instanceof Document);)t=t.parentNode||(window.ShadowRoot&&t instanceof ShadowRoot?t.host:void 0);return!(!t||!(t.__CE_isImportDocument||t instanceof Document))}function o(t,e){for(;e&&e!==t&&!e.nextSibling;)e=e.parentNode;return e&&e!==t?e.nextSibling:null}function i(t,e,n){n=void 0===n?new Set:n;for(var r=t;r;){if(r.nodeType===Node.ELEMENT_NODE){var a=r;e(a);var l=a.localName;if("link"===l&&"import"===a.getAttribute("rel")){if((r=a.import)instanceof Node&&!n.has(r))for(n.add(r),r=r.firstChild;r;r=r.nextSibling)i(r,e,n);r=o(t,a);continue}if("template"===l){r=o(t,a);continue}if(a=a.__CE_shadowRoot)for(a=a.firstChild;a;a=a.nextSibling)i(a,e,n)}r=r.firstChild?r.firstChild:o(t,r)}}function r(t,e,n){t[e]=n}function a(){this.a=new Map,this.f=new Map,this.c=[],this.b=!1}function l(t,e){t.b=!0,t.c.push(e)}function c(t,e){t.b&&i(e,function(e){return s(t,e)})}function s(t,e){if(t.b&&!e.__CE_patched){e.__CE_patched=!0;for(var n=0;n<t.c.length;n++)t.c[n](e)}}function h(t,e){var n=[];for(i(e,function(t){return n.push(t)}),e=0;e<n.length;e++){var o=n[e];1===o.__CE_state?t.connectedCallback(o):f(t,o)}}function u(t,e){var n=[];for(i(e,function(t){return n.push(t)}),e=0;e<n.length;e++){var o=n[e];1===o.__CE_state&&t.disconnectedCallback(o)}}function p(t,e,n){var o=(n=void 0===n?{}:n).u||new Set,r=n.h||function(e){return f(t,e)},a=[];if(i(e,function(e){if("link"===e.localName&&"import"===e.getAttribute("rel")){var n=e.import;n instanceof Node&&(n.__CE_isImportDocument=!0,n.__CE_hasRegistry=!0),n&&"complete"===n.readyState?n.__CE_documentLoadHandled=!0:e.addEventListener("load",function(){var n=e.import;if(!n.__CE_documentLoadHandled){n.__CE_documentLoadHandled=!0;var i=new Set(o);i.delete(n),p(t,n,{u:i,h:r})}})}else a.push(e)},o),t.b)for(e=0;e<a.length;e++)s(t,a[e]);for(e=0;e<a.length;e++)r(a[e])}function f(t,e){if(void 0===e.__CE_state){var o=e.ownerDocument;if((o.defaultView||o.__CE_isImportDocument&&o.__CE_hasRegistry)&&(o=t.a.get(e.localName))){o.constructionStack.push(e);var i=o.constructorFunction;try{try{if(new i!==e)throw Error("The custom element constructor did not produce the element being upgraded.")}finally{o.constructionStack.pop()}}catch(t){throw e.__CE_state=2,t}if(e.__CE_state=1,e.__CE_definition=o,o.attributeChangedCallback)for(o=o.observedAttributes,i=0;i<o.length;i++){var r=o[i],a=e.getAttribute(r);null!==a&&t.attributeChangedCallback(e,r,null,a,null)}n(e)&&t.connectedCallback(e)}}}function d(t){var e=document;this.c=t,this.a=e,this.b=void 0,p(this.c,this.a),"loading"===this.a.readyState&&(this.b=new MutationObserver(this.f.bind(this)),this.b.observe(this.a,{childList:!0,subtree:!0}))}function m(t){t.b&&t.b.disconnect()}function w(){var t=this;this.b=this.a=void 0,this.c=new Promise(function(e){t.b=e,t.a&&e(t.a)})}function b(t){if(t.a)throw Error("Already resolved.");t.a=void 0,t.b&&t.b(void 0)}function y(t){this.c=!1,this.a=t,this.j=new Map,this.f=function(t){return t()},this.b=!1,this.i=[],this.o=new d(t)}a.prototype.connectedCallback=function(t){var e=t.__CE_definition;e.connectedCallback&&e.connectedCallback.call(t)},a.prototype.disconnectedCallback=function(t){var e=t.__CE_definition;e.disconnectedCallback&&e.disconnectedCallback.call(t)},a.prototype.attributeChangedCallback=function(t,e,n,o,i){var r=t.__CE_definition;r.attributeChangedCallback&&-1<r.observedAttributes.indexOf(e)&&r.attributeChangedCallback.call(t,e,n,o,i)},d.prototype.f=function(t){var e=this.a.readyState;for("interactive"!==e&&"complete"!==e||m(this),e=0;e<t.length;e++)for(var n=t[e].addedNodes,o=0;o<n.length;o++)p(this.c,n[o])},y.prototype.l=function(t,n){var o=this;if(!(n instanceof Function))throw new TypeError("Custom element constructors must be functions.");if(!e(t))throw new SyntaxError("The element name '"+t+"' is not valid.");if(this.a.a.get(t))throw Error("A custom element with name '"+t+"' has already been defined.");if(this.c)throw Error("A custom element is already being defined.");this.c=!0;try{var i=function(t){var e=r[t];if(void 0!==e&&!(e instanceof Function))throw Error("The '"+t+"' callback must be a function.");return e},r=n.prototype;if(!(r instanceof Object))throw new TypeError("The custom element constructor's prototype is not an object.");var a=i("connectedCallback"),l=i("disconnectedCallback"),c=i("adoptedCallback"),s=i("attributeChangedCallback"),h=n.observedAttributes||[]}catch(t){return}finally{this.c=!1}n={localName:t,constructorFunction:n,connectedCallback:a,disconnectedCallback:l,adoptedCallback:c,attributeChangedCallback:s,observedAttributes:h,constructionStack:[]},function(t,e,n){t.a.set(e,n),t.f.set(n.constructorFunction,n)}(this.a,t,n),this.i.push(n),this.b||(this.b=!0,this.f(function(){return function(t){if(!1!==t.b){t.b=!1;for(var e=t.i,n=[],o=new Map,i=0;i<e.length;i++)o.set(e[i].localName,[]);for(p(t.a,document,{h:function(e){if(void 0===e.__CE_state){var i=e.localName,r=o.get(i);r?r.push(e):t.a.a.get(i)&&n.push(e)}}}),i=0;i<n.length;i++)f(t.a,n[i]);for(;0<e.length;){var r=e.shift();i=r.localName,r=o.get(r.localName);for(var a=0;a<r.length;a++)f(t.a,r[a]);(i=t.j.get(i))&&b(i)}}}(o)}))},y.prototype.h=function(t){p(this.a,t)},y.prototype.get=function(t){if(t=this.a.a.get(t))return t.constructorFunction},y.prototype.m=function(t){if(!e(t))return Promise.reject(new SyntaxError("'"+t+"' is not a valid custom element name."));var n=this.j.get(t);return n?n.c:(n=new w,this.j.set(t,n),this.a.a.get(t)&&!this.i.some(function(e){return e.localName===t})&&b(n),n.c)},y.prototype.s=function(t){m(this.o);var e=this.f;this.f=function(n){return t(function(){return e(n)})}},window.CustomElementRegistry=y,y.prototype.define=y.prototype.l,y.prototype.upgrade=y.prototype.h,y.prototype.get=y.prototype.get,y.prototype.whenDefined=y.prototype.m,y.prototype.polyfillWrapFlushCallback=y.prototype.s;var g=window.Document.prototype.createElement,v=window.Document.prototype.createElementNS,E=window.Document.prototype.importNode,_=window.Document.prototype.prepend,C=window.Document.prototype.append,N=window.DocumentFragment.prototype.prepend,S=window.DocumentFragment.prototype.append,k=window.Node.prototype.cloneNode,D=window.Node.prototype.appendChild,T=window.Node.prototype.insertBefore,A=window.Node.prototype.removeChild,j=window.Node.prototype.replaceChild,L=Object.getOwnPropertyDescriptor(window.Node.prototype,"textContent"),M=window.Element.prototype.attachShadow,H=Object.getOwnPropertyDescriptor(window.Element.prototype,"innerHTML"),x=window.Element.prototype.getAttribute,O=window.Element.prototype.setAttribute,F=window.Element.prototype.removeAttribute,R=window.Element.prototype.getAttributeNS,P=window.Element.prototype.setAttributeNS,I=window.Element.prototype.removeAttributeNS,z=window.Element.prototype.insertAdjacentElement,W=window.Element.prototype.insertAdjacentHTML,B=window.Element.prototype.prepend,U=window.Element.prototype.append,V=window.Element.prototype.before,X=window.Element.prototype.after,$=window.Element.prototype.replaceWith,q=window.Element.prototype.remove,G=window.HTMLElement,J=Object.getOwnPropertyDescriptor(window.HTMLElement.prototype,"innerHTML"),K=window.HTMLElement.prototype.insertAdjacentElement,Q=window.HTMLElement.prototype.insertAdjacentHTML,Y=new function(){};function Z(t,e,o){function i(e){return function(o){for(var i=[],r=0;r<arguments.length;++r)i[r]=arguments[r];r=[];for(var a=[],l=0;l<i.length;l++){var c=i[l];if(c instanceof Element&&n(c)&&a.push(c),c instanceof DocumentFragment)for(c=c.firstChild;c;c=c.nextSibling)r.push(c);else r.push(c)}for(e.apply(this,i),i=0;i<a.length;i++)u(t,a[i]);if(n(this))for(i=0;i<r.length;i++)(a=r[i])instanceof Element&&h(t,a)}}void 0!==o.g&&(e.prepend=i(o.g)),void 0!==o.append&&(e.append=i(o.append))}var tt,et=window.customElements;if(!et||"function"!=typeof et.define||"function"!=typeof et.get){var nt=new a;tt=nt,window.HTMLElement=function(){function t(){var t=this.constructor,e=tt.f.get(t);if(!e)throw Error("The custom element being constructed was not registered with `customElements`.");var n=e.constructionStack;if(0===n.length)return n=g.call(document,e.localName),Object.setPrototypeOf(n,t.prototype),n.__CE_state=1,n.__CE_definition=e,s(tt,n),n;var o=n[e=n.length-1];if(o===Y)throw Error("The HTMLElement constructor was either called reentrantly for this constructor or called multiple times.");return n[e]=Y,Object.setPrototypeOf(o,t.prototype),s(tt,o),o}return t.prototype=G.prototype,Object.defineProperty(t.prototype,"constructor",{writable:!0,configurable:!0,enumerable:!1,value:t}),t}(),function(){var t=nt;r(Document.prototype,"createElement",function(e){if(this.__CE_hasRegistry){var n=t.a.get(e);if(n)return new n.constructorFunction}return e=g.call(this,e),s(t,e),e}),r(Document.prototype,"importNode",function(e,n){return e=E.call(this,e,!!n),this.__CE_hasRegistry?p(t,e):c(t,e),e}),r(Document.prototype,"createElementNS",function(e,n){if(this.__CE_hasRegistry&&(null===e||"http://www.w3.org/1999/xhtml"===e)){var o=t.a.get(n);if(o)return new o.constructorFunction}return e=v.call(this,e,n),s(t,e),e}),Z(t,Document.prototype,{g:_,append:C})}(),Z(nt,DocumentFragment.prototype,{g:N,append:S}),function(){function t(t,o){Object.defineProperty(t,"textContent",{enumerable:o.enumerable,configurable:!0,get:o.get,set:function(t){if(this.nodeType===Node.TEXT_NODE)o.set.call(this,t);else{var i=void 0;if(this.firstChild){var r=this.childNodes,a=r.length;if(0<a&&n(this)){i=Array(a);for(var l=0;l<a;l++)i[l]=r[l]}}if(o.set.call(this,t),i)for(t=0;t<i.length;t++)u(e,i[t])}}})}var e=nt;r(Node.prototype,"insertBefore",function(t,o){if(t instanceof DocumentFragment){var i=Array.prototype.slice.apply(t.childNodes);if(t=T.call(this,t,o),n(this))for(o=0;o<i.length;o++)h(e,i[o]);return t}return i=n(t),o=T.call(this,t,o),i&&u(e,t),n(this)&&h(e,t),o}),r(Node.prototype,"appendChild",function(t){if(t instanceof DocumentFragment){var o=Array.prototype.slice.apply(t.childNodes);if(t=D.call(this,t),n(this))for(var i=0;i<o.length;i++)h(e,o[i]);return t}return o=n(t),i=D.call(this,t),o&&u(e,t),n(this)&&h(e,t),i}),r(Node.prototype,"cloneNode",function(t){return t=k.call(this,!!t),this.ownerDocument.__CE_hasRegistry?p(e,t):c(e,t),t}),r(Node.prototype,"removeChild",function(t){var o=n(t),i=A.call(this,t);return o&&u(e,t),i}),r(Node.prototype,"replaceChild",function(t,o){if(t instanceof DocumentFragment){var i=Array.prototype.slice.apply(t.childNodes);if(t=j.call(this,t,o),n(this))for(u(e,o),o=0;o<i.length;o++)h(e,i[o]);return t}i=n(t);var r=j.call(this,t,o),a=n(this);return a&&u(e,o),i&&u(e,t),a&&h(e,t),r}),L&&L.get?t(Node.prototype,L):l(e,function(e){t(e,{enumerable:!0,configurable:!0,get:function(){for(var t=[],e=0;e<this.childNodes.length;e++)t.push(this.childNodes[e].textContent);return t.join("")},set:function(t){for(;this.firstChild;)A.call(this,this.firstChild);D.call(this,document.createTextNode(t))}})})}(),function(){function t(t,e){Object.defineProperty(t,"innerHTML",{enumerable:e.enumerable,configurable:!0,get:e.get,set:function(t){var o=this,r=void 0;if(n(this)&&(r=[],i(this,function(t){t!==o&&r.push(t)})),e.set.call(this,t),r)for(var l=0;l<r.length;l++){var s=r[l];1===s.__CE_state&&a.disconnectedCallback(s)}return this.ownerDocument.__CE_hasRegistry?p(a,this):c(a,this),t}})}function e(t,e){r(t,"insertAdjacentElement",function(t,o){var i=n(o);return t=e.call(this,t,o),i&&u(a,o),n(t)&&h(a,o),t})}function o(t,e){function n(t,e){for(var n=[];t!==e;t=t.nextSibling)n.push(t);for(e=0;e<n.length;e++)p(a,n[e])}r(t,"insertAdjacentHTML",function(t,o){if("beforebegin"===(t=t.toLowerCase())){var i=this.previousSibling;e.call(this,t,o),n(i||this.parentNode.firstChild,this)}else if("afterbegin"===t)i=this.firstChild,e.call(this,t,o),n(this.firstChild,i);else if("beforeend"===t)i=this.lastChild,e.call(this,t,o),n(i||this.firstChild,null);else{if("afterend"!==t)throw new SyntaxError("The value provided ("+String(t)+") is not one of 'beforebegin', 'afterbegin', 'beforeend', or 'afterend'.");i=this.nextSibling,e.call(this,t,o),n(this.nextSibling,i)}})}var a=nt;M&&r(Element.prototype,"attachShadow",function(t){return this.__CE_shadowRoot=M.call(this,t)}),H&&H.get?t(Element.prototype,H):J&&J.get?t(HTMLElement.prototype,J):l(a,function(e){t(e,{enumerable:!0,configurable:!0,get:function(){return k.call(this,!0).innerHTML},set:function(t){var e="template"===this.localName,n=e?this.content:this,o=v.call(document,this.namespaceURI,this.localName);for(o.innerHTML=t;0<n.childNodes.length;)A.call(n,n.childNodes[0]);for(t=e?o.content:o;0<t.childNodes.length;)D.call(n,t.childNodes[0])}})}),r(Element.prototype,"setAttribute",function(t,e){if(1!==this.__CE_state)return O.call(this,t,e);var n=x.call(this,t);O.call(this,t,e),e=x.call(this,t),a.attributeChangedCallback(this,t,n,e,null)}),r(Element.prototype,"setAttributeNS",function(t,e,n){if(1!==this.__CE_state)return P.call(this,t,e,n);var o=R.call(this,t,e);P.call(this,t,e,n),n=R.call(this,t,e),a.attributeChangedCallback(this,e,o,n,t)}),r(Element.prototype,"removeAttribute",function(t){if(1!==this.__CE_state)return F.call(this,t);var e=x.call(this,t);F.call(this,t),null!==e&&a.attributeChangedCallback(this,t,e,null,null)}),r(Element.prototype,"removeAttributeNS",function(t,e){if(1!==this.__CE_state)return I.call(this,t,e);var n=R.call(this,t,e);I.call(this,t,e);var o=R.call(this,t,e);n!==o&&a.attributeChangedCallback(this,e,n,o,t)}),K?e(HTMLElement.prototype,K):z?e(Element.prototype,z):console.warn("Custom Elements: `Element#insertAdjacentElement` was not patched."),Q?o(HTMLElement.prototype,Q):W?o(Element.prototype,W):console.warn("Custom Elements: `Element#insertAdjacentHTML` was not patched."),Z(a,Element.prototype,{g:B,append:U}),function(t){function e(e){return function(o){for(var i=[],r=0;r<arguments.length;++r)i[r]=arguments[r];r=[];for(var a=[],l=0;l<i.length;l++){var c=i[l];if(c instanceof Element&&n(c)&&a.push(c),c instanceof DocumentFragment)for(c=c.firstChild;c;c=c.nextSibling)r.push(c);else r.push(c)}for(e.apply(this,i),i=0;i<a.length;i++)u(t,a[i]);if(n(this))for(i=0;i<r.length;i++)(a=r[i])instanceof Element&&h(t,a)}}var o=Element.prototype;void 0!==V&&(o.before=e(V)),void 0!==V&&(o.after=e(X)),void 0!==$&&r(o,"replaceWith",function(e){for(var o=[],i=0;i<arguments.length;++i)o[i]=arguments[i];i=[];for(var r=[],a=0;a<o.length;a++){var l=o[a];if(l instanceof Element&&n(l)&&r.push(l),l instanceof DocumentFragment)for(l=l.firstChild;l;l=l.nextSibling)i.push(l);else i.push(l)}for(a=n(this),$.apply(this,o),o=0;o<r.length;o++)u(t,r[o]);if(a)for(u(t,this),o=0;o<i.length;o++)(r=i[o])instanceof Element&&h(t,r)}),void 0!==q&&r(o,"remove",function(){var e=n(this);q.call(this),e&&u(t,this)})}(a)}(),document.__CE_hasRegistry=!0;var ot=new y(nt);Object.defineProperty(window,"customElements",{configurable:!0,enumerable:!0,value:ot})}}).call(self);

// Polyfill CustomEvent
if (typeof window.CustomEvent !== 'function') {
  function CustomEvent(event, params) {
    params = params || { bubbles: false, cancelable: false, detail: undefined };
    var evt = document.createEvent( 'CustomEvent' );
    evt.initCustomEvent( event, params.bubbles, params.cancelable, params.detail );
    return evt;
  }

  CustomEvent.prototype = window.Event.prototype;

  window.CustomEvent = CustomEvent;
}

/*!
Element.closest and Element.matches
https://github.com/jonathantneal/closest
Creative Commons Zero v1.0 Universal
*/
(function(a){"function"!==typeof a.matches&&(a.matches=a.msMatchesSelector||a.mozMatchesSelector||a.webkitMatchesSelector||function(a){a=(this.document||this.ownerDocument).querySelectorAll(a);for(var b=0;a[b]&&a[b]!==this;)++b;return!!a[b]});"function"!==typeof a.closest&&(a.closest=function(a){for(var b=this;b&&1===b.nodeType;){if(b.matches(a))return b;b=b.parentNode}return null})})(window.Element.prototype);
/*!
Element.getRootNode()
*/
(function(c){function d(a){a=b(a);return 11===a.nodeType?d(a.host):a}function b(a){return a.parentNode?b(a.parentNode):a}"function"!==typeof c.getRootNode&&(c.getRootNode=function(a){return a&&a.composed?d(this):b(this)})})(Element.prototype);
/*!
Element.remove()
*/
(function(b){b.forEach(function(a){a.hasOwnProperty("remove")||Object.defineProperty(a,"remove",{configurable:!0,enumerable:!0,writable:!0,value:function(){null!==this.parentNode&&this.parentNode.removeChild(this)}})})})([Element.prototype,CharacterData.prototype,DocumentType.prototype]);

(function() {
  if (
    // No Reflect, no classes, no need for shim because native custom elements
    // require ES2015 classes or Reflect.
    window.Reflect === undefined ||
    window.customElements === undefined
  ) {
    return;
  }
  const BuiltInHTMLElement = HTMLElement;
  window.HTMLElement = /** @this {!Object} */ function HTMLElement() {
    return Reflect.construct(
        BuiltInHTMLElement, [], /** @type {!Function} */ (this.constructor));
  };
  HTMLElement.prototype = BuiltInHTMLElement.prototype;
  HTMLElement.prototype.constructor = HTMLElement;
  Object.setPrototypeOf(HTMLElement, BuiltInHTMLElement);
})();

/*!
es6-promise - a tiny implementation of Promises/A+.
Copyright (c) 2014 Yehuda Katz, Tom Dale, Stefan Penner and contributors (Conversion to ES6 API by Jake Archibald)
Licensed under MIT license
See https://raw.githubusercontent.com/stefanpenner/es6-promise/master/LICENSE
v4.2.4+314e4831
*/
(window.ES6Promise=function(){function t(){var t=setTimeout;return function(){return t(r,1)}}function r(){for(var t=0;t<y;t+=2)(0,C[t])(C[t+1]),C[t]=void 0,C[t+1]=void 0;y=0}function e(t,r){var e=this,n=new this.constructor(o);void 0===n[O]&&_(n);var i=e._state;if(i){var s=arguments[i-1];g(function(){return v(i,n,s,e._result)})}else l(e,n,t,r);return n}function n(t){if(t&&"object"==typeof t&&t.constructor===this)return t;var r=new this(o);return u(r,t),r}function o(){}function i(t){try{return t.then}catch(t){return q.error=t,q}}function s(t,r,o){r.constructor===t.constructor&&o===e&&r.constructor.resolve===n?function(t,r){r._state===x?a(t,r._result):r._state===F?f(t,r._result):l(r,void 0,function(r){return u(t,r)},function(r){return f(t,r)})}(t,r):o===q?(f(t,q.error),q.error=null):void 0===o?a(t,r):"function"==typeof o?function(t,r,e){g(function(t){var n=!1,o=function(t,r,e,n){try{t.call(r,e,n)}catch(t){return t}}(e,r,function(e){n||(n=!0,r!==e?u(t,e):a(t,e))},function(r){n||(n=!0,f(t,r))},t._label);!n&&o&&(n=!0,f(t,o))},t)}(t,r,o):a(t,r)}function u(t,r){if(t===r)f(t,new TypeError("cannot resolve promise w/ itself"));else{var e=typeof r;null===r||"object"!==e&&"function"!==e?a(t,r):s(t,r,i(r))}}function c(t){t._onerror&&t._onerror(t._result),h(t)}function a(t,r){t._state===P&&(t._result=r,t._state=x,0!==t._subscribers.length&&g(h,t))}function f(t,r){t._state===P&&(t._state=F,t._result=r,g(c,t))}function l(t,r,e,n){var o=t._subscribers,i=o.length;t._onerror=null,o[i]=r,o[i+x]=e,o[i+F]=n,0===i&&t._state&&g(h,t)}function h(t){var r=t._subscribers,e=t._state;if(0!==r.length){for(var n,o,i=t._result,s=0;s<r.length;s+=3)n=r[s],o=r[s+e],n?v(e,n,o,i):o(i);t._subscribers.length=0}}function v(t,r,e,n){var o="function"==typeof e,i=void 0,s=void 0,c=void 0,l=void 0;if(o){try{i=e(n)}catch(t){q.error=t,i=q}if(i===q?(l=!0,s=i.error,i.error=null):c=!0,r===i)return void f(r,new TypeError("Cannot return same promise"))}else i=n,c=!0;r._state===P&&(o&&c?u(r,i):l?f(r,s):t===x?a(r,i):t===F&&f(r,i))}function _(t){t[O]=U++,t._state=void 0,t._result=void 0,t._subscribers=[]}var p,d=Array.isArray?Array.isArray:function(t){return"[object Array]"===Object.prototype.toString.call(t)},y=0,w=void 0,m=void 0,g=function(t,e){C[y]=t,C[y+1]=e,2===(y+=2)&&(m?m(r):T())},b=(p="undefined"!=typeof window?window:void 0)||{},A=b.MutationObserver||b.WebKitMutationObserver;b="undefined"==typeof self;var E,S,M,j="undefined"!=typeof Uint8ClampedArray&&"undefined"!=typeof importScripts&&"undefined"!=typeof MessageChannel,C=Array(1e3),T=void 0;T=A?(E=0,S=new A(r),M=document.createTextNode(""),S.observe(M,{characterData:!0}),function(){M.data=E=++E%2}):j?function(){var t=new MessageChannel;return t.port1.onmessage=r,function(){return t.port2.postMessage(0)}}():void 0===p&&"function"==typeof require?function(){try{var e=Function("return this")().require("vertx");return void 0!==(w=e.runOnLoop||e.runOnContext)?function(){w(r)}:t()}catch(r){return t()}}():t();var O=Math.random().toString(36).substring(2),P=void 0,x=1,F=2,q={error:null},U=0,D=function(){function t(t,r){this._instanceConstructor=t,this.promise=new t(o),this.promise[O]||_(this.promise),d(r)?(this._remaining=this.length=r.length,this._result=Array(this.length),0===this.length?a(this.promise,this._result):(this.length=this.length||0,this._enumerate(r),0===this._remaining&&a(this.promise,this._result))):f(this.promise,Error("Array Methods must be provided an Array"))}return t.prototype._enumerate=function(t){for(var r=0;this._state===P&&r<t.length;r++)this._eachEntry(t[r],r)},t.prototype._eachEntry=function(t,r){var u=this._instanceConstructor,c=u.resolve;c===n?(c=i(t))===e&&t._state!==P?this._settledAt(t._state,r,t._result):"function"!=typeof c?(this._remaining--,this._result[r]=t):u===K?(s(u=new u(o),t,c),this._willSettleAt(u,r)):this._willSettleAt(new u(function(r){return r(t)}),r):this._willSettleAt(c(t),r)},t.prototype._settledAt=function(t,r,e){var n=this.promise;n._state===P&&(this._remaining--,t===F?f(n,e):this._result[r]=e),0===this._remaining&&a(n,this._result)},t.prototype._willSettleAt=function(t,r){var e=this;l(t,void 0,function(t){return e._settledAt(x,r,t)},function(t){return e._settledAt(F,r,t)})},t}(),K=function(){function t(r){if(this[O]=U++,this._result=this._state=void 0,this._subscribers=[],o!==r){if("function"!=typeof r)throw new TypeError("Must pass a resolver fn as 1st arg");if(!(this instanceof t))throw new TypeError("Failed to construct 'Promise': Use the 'new' operator.");!function(t,r){try{r(function(r){u(t,r)},function(r){f(t,r)})}catch(r){f(t,r)}}(this,r)}}return t.prototype.catch=function(t){return this.then(null,t)},t.prototype.finally=function(t){var r=this.constructor;return this.then(function(e){return r.resolve(t()).then(function(){return e})},function(e){return r.resolve(t()).then(function(){throw e})})},t}();return K.prototype.then=e,K.all=function(t){return new D(this,t).promise},K.race=function(t){var r=this;return d(t)?new r(function(e,n){for(var o=t.length,i=0;i<o;i++)r.resolve(t[i]).then(e,n)}):new r(function(t,r){return r(new TypeError("Must pass array to race"))})},K.resolve=n,K.reject=function(t){var r=new this(o);return f(r,t),r},K._setScheduler=function(t){m=t},K._setAsap=function(t){g=t},K._asap=g,K.polyfill=function(){var t=void 0;if("undefined"!=typeof global)t=global;else if("undefined"!=typeof self)t=self;else try{t=Function("return this")()}catch(t){throw Error("polyfill failed")}var r=t.Promise;if(r){var e=null;try{e=Object.prototype.toString.call(r.resolve())}catch(t){}if("[object Promise]"===e&&!r.cast)return}t.Promise=K},K.Promise=K,K.polyfill(),K}());
/*! https://github.com/WebReflection/es6-collections
(C) Andrea Giammarchi - @WebReflection - Mit Style License */
(function(e){function d(a,b){function c(a){if(!this||this.constructor!==c)return new c(a);this._keys=[];this._values=[];this._itp=[];this.objectOnly=b;a&&v.call(this,a)}b||w(a,"size",{get:x});a.constructor=c;c.prototype=a;return c}function v(a){this.add?a.forEach(this.add,this):a.forEach(function(a){this.set(a[0],a[1])},this)}function f(a){this.has(a)&&(this._keys.splice(c,1),this._values.splice(c,1),this._itp.forEach(function(a){c<a[0]&&a[0]--}));return-1<c}function m(a){return this.has(a)?this._values[c]:
  void 0}function n(a,b){if(this.objectOnly&&b!==Object(b))throw new TypeError("Invalid value used as weak collection key");if(b!=b||0===b)for(c=a.length;c--&&!y(a[c],b););else c=a.indexOf(b);return-1<c}function p(a){return n.call(this,this._values,a)}function q(a){return n.call(this,this._keys,a)}function r(a,b){this.has(a)?this._values[c]=b:this._values[this._keys.push(a)-1]=b;return this}function t(a){this.has(a)||this._values.push(a);return this}function h(){(this._keys||0).length=this._values.length=
  0}function z(){return k(this._itp,this._keys)}function l(){return k(this._itp,this._values)}function A(){return k(this._itp,this._keys,this._values)}function B(){return k(this._itp,this._values,this._values)}function k(a,b,c){var g=[0],e=!1;a.push(g);return{next:function(){var d=g[0];if(!e&&d<b.length){var f=c?[b[d],c[d]]:b[d];g[0]++}else e=!0,a.splice(a.indexOf(g),1);return{done:e,value:f}}}}function x(){return this._values.length}function u(a,b){for(var c=this.entries();;){var d=c.next();if(d.done)break;
  a.call(b,d.value[1],d.value[0],this)}}var c,w=Object.defineProperty,y=function(a,b){return a===b||a!==a&&b!==b};"undefined"==typeof WeakMap&&(e.WeakMap=d({"delete":f,clear:h,get:m,has:q,set:r},!0));"undefined"!=typeof Map&&"function"===typeof(new Map).values&&(new Map).values().next||(e.Map=d({"delete":f,has:q,get:m,set:r,keys:z,values:l,entries:A,forEach:u,clear:h}));"undefined"!=typeof Set&&"function"===typeof(new Set).values&&(new Set).values().next||(e.Set=d({has:p,add:t,"delete":f,clear:h,keys:l,
  values:l,entries:B,forEach:u}));"undefined"==typeof WeakSet&&(e.WeakSet=d({"delete":f,add:t,clear:h,has:p},!0))})(window);
/*!
whatwg-fetch, 2.0.3
https://github.com/github/fetch
Copyright (c) 2014-2016 GitHub, Inc. - MIT License
*/
(function(e){function l(a){"string"!==typeof a&&(a=String(a));if(/[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(a))throw new TypeError("Invalid character in header field name");return a.toLowerCase()}function q(a){"string"!==typeof a&&(a=String(a));return a}function n(a){var b={next:function(){var b=a.shift();return{done:void 0===b,value:b}}};g.iterable&&(b[Symbol.iterator]=function(){return b});return b}function d(a){this.map={};a instanceof d?a.forEach(function(a,c){this.append(c,a)},this):Array.isArray(a)?
a.forEach(function(a){this.append(a[0],a[1])},this):a&&Object.getOwnPropertyNames(a).forEach(function(b){this.append(b,a[b])},this)}function p(a){if(a.bodyUsed)return Promise.reject(new TypeError("Already read"));a.bodyUsed=!0}function r(a){return new Promise(function(b,c){a.onload=function(){b(a.result)};a.onerror=function(){c(a.error)}})}function w(a){var b=new FileReader,c=r(b);b.readAsArrayBuffer(a);return c}function x(a){a=new Uint8Array(a);for(var b=Array(a.length),c=0;c<a.length;c++)b[c]=String.fromCharCode(a[c]);
return b.join("")}function t(a){if(a.slice)return a.slice(0);var b=new Uint8Array(a.byteLength);b.set(new Uint8Array(a));return b.buffer}function u(){this.bodyUsed=!1;this._initBody=function(a){if(this._bodyInit=a)if("string"===typeof a)this._bodyText=a;else if(g.blob&&Blob.prototype.isPrototypeOf(a))this._bodyBlob=a;else if(g.formData&&FormData.prototype.isPrototypeOf(a))this._bodyFormData=a;else if(g.searchParams&&URLSearchParams.prototype.isPrototypeOf(a))this._bodyText=a.toString();else if(g.arrayBuffer&&
g.blob&&y(a))this._bodyArrayBuffer=t(a.buffer),this._bodyInit=new Blob([this._bodyArrayBuffer]);else if(g.arrayBuffer&&(ArrayBuffer.prototype.isPrototypeOf(a)||z(a)))this._bodyArrayBuffer=t(a);else throw Error("unsupported BodyInit type");else this._bodyText="";this.headers.get("content-type")||("string"===typeof a?this.headers.set("content-type","text/plain;charset=UTF-8"):this._bodyBlob&&this._bodyBlob.type?this.headers.set("content-type",this._bodyBlob.type):g.searchParams&&URLSearchParams.prototype.isPrototypeOf(a)&&
this.headers.set("content-type","application/x-www-form-urlencoded;charset=UTF-8"))};g.blob&&(this.blob=function(){var a=p(this);if(a)return a;if(this._bodyBlob)return Promise.resolve(this._bodyBlob);if(this._bodyArrayBuffer)return Promise.resolve(new Blob([this._bodyArrayBuffer]));if(this._bodyFormData)throw Error("could not read FormData body as blob");return Promise.resolve(new Blob([this._bodyText]))},this.arrayBuffer=function(){return this._bodyArrayBuffer?p(this)||Promise.resolve(this._bodyArrayBuffer):
this.blob().then(w)});this.text=function(){var a=p(this);if(a)return a;if(this._bodyBlob){a=this._bodyBlob;var b=new FileReader,c=r(b);b.readAsText(a);return c}if(this._bodyArrayBuffer)return Promise.resolve(x(this._bodyArrayBuffer));if(this._bodyFormData)throw Error("could not read FormData body as text");return Promise.resolve(this._bodyText)};g.formData&&(this.formData=function(){return this.text().then(A)});this.json=function(){return this.text().then(JSON.parse)};return this}function k(a,b){b=
b||{};var c=b.body;if(a instanceof k){if(a.bodyUsed)throw new TypeError("Already read");this.url=a.url;this.credentials=a.credentials;b.headers||(this.headers=new d(a.headers));this.method=a.method;this.mode=a.mode;c||null==a._bodyInit||(c=a._bodyInit,a.bodyUsed=!0)}else this.url=String(a);this.credentials=b.credentials||this.credentials||"omit";if(b.headers||!this.headers)this.headers=new d(b.headers);var v=b.method||this.method||"GET",g=v.toUpperCase();this.method=-1<B.indexOf(g)?g:v;this.mode=
b.mode||this.mode||null;this.referrer=null;if(("GET"===this.method||"HEAD"===this.method)&&c)throw new TypeError("Body not allowed for GET or HEAD requests");this._initBody(c)}function A(a){var b=new FormData;a.trim().split("&").forEach(function(a){if(a){var c=a.split("=");a=c.shift().replace(/\+/g," ");c=c.join("=").replace(/\+/g," ");b.append(decodeURIComponent(a),decodeURIComponent(c))}});return b}function C(a){var b=new d;a.replace(/\r?\n[\t ]+/g," ").split(/\r?\n/).forEach(function(a){var c=
a.split(":");if(a=c.shift().trim())c=c.join(":").trim(),b.append(a,c)});return b}function h(a,b){b||(b={});this.type="default";this.status=void 0===b.status?200:b.status;this.ok=200<=this.status&&300>this.status;this.statusText="statusText"in b?b.statusText:"OK";this.headers=new d(b.headers);this.url=b.url||"";this._initBody(a)}if(!e.fetch){var D="Symbol"in e&&"iterator"in Symbol,m;if(m="FileReader"in e&&"Blob"in e)try{new Blob,m=!0}catch(a){m=!1}var g={searchParams:"URLSearchParams"in e,iterable:D,
blob:m,formData:"FormData"in e,arrayBuffer:"ArrayBuffer"in e};if(g.arrayBuffer){var E="[object Int8Array];[object Uint8Array];[object Uint8ClampedArray];[object Int16Array];[object Uint16Array];[object Int32Array];[object Uint32Array];[object Float32Array];[object Float64Array]".split(";");var y=function(a){return a&&DataView.prototype.isPrototypeOf(a)};var z=ArrayBuffer.isView||function(a){return a&&-1<E.indexOf(Object.prototype.toString.call(a))}}d.prototype.append=function(a,b){a=l(a);b=q(b);var c=
this.map[a];this.map[a]=c?c+","+b:b};d.prototype["delete"]=function(a){delete this.map[l(a)]};d.prototype.get=function(a){a=l(a);return this.has(a)?this.map[a]:null};d.prototype.has=function(a){return this.map.hasOwnProperty(l(a))};d.prototype.set=function(a,b){this.map[l(a)]=q(b)};d.prototype.forEach=function(a,b){for(var c in this.map)this.map.hasOwnProperty(c)&&a.call(b,this.map[c],c,this)};d.prototype.keys=function(){var a=[];this.forEach(function(b,c){a.push(c)});return n(a)};d.prototype.values=
function(){var a=[];this.forEach(function(b){a.push(b)});return n(a)};d.prototype.entries=function(){var a=[];this.forEach(function(b,c){a.push([c,b])});return n(a)};g.iterable&&(d.prototype[Symbol.iterator]=d.prototype.entries);var B="DELETE GET HEAD OPTIONS POST PUT".split(" ");k.prototype.clone=function(){return new k(this,{body:this._bodyInit})};u.call(k.prototype);u.call(h.prototype);h.prototype.clone=function(){return new h(this._bodyInit,{status:this.status,statusText:this.statusText,headers:new d(this.headers),
url:this.url})};h.error=function(){var a=new h(null,{status:0,statusText:""});a.type="error";return a};var F=[301,302,303,307,308];h.redirect=function(a,b){if(-1===F.indexOf(b))throw new RangeError("Invalid status code");return new h(null,{status:b,headers:{location:a}})};e.Headers=d;e.Request=k;e.Response=h;e.fetch=function(a,b){return new Promise(function(c,d){var e=new k(a,b),f=new XMLHttpRequest;f.onload=function(){var a={status:f.status,statusText:f.statusText,headers:C(f.getAllResponseHeaders()||
"")};a.url="responseURL"in f?f.responseURL:a.headers.get("X-Request-URL");c(new h("response"in f?f.response:f.responseText,a))};f.onerror=function(){d(new TypeError("Network request failed"))};f.ontimeout=function(){d(new TypeError("Network request failed"))};f.open(e.method,e.url,!0);"include"===e.credentials?f.withCredentials=!0:"omit"===e.credentials&&(f.withCredentials=!1);"responseType"in f&&g.blob&&(f.responseType="blob");e.headers.forEach(function(a,b){f.setRequestHeader(b,a)});f.send("undefined"===
typeof e._bodyInit?null:e._bodyInit)})};e.fetch.polyfill=!0}})("undefined"!==typeof self?self:window);
/*!
url-polyfill, 1.1.5
https://github.com/lifaon74/url-polyfill
MIT Licensed
*/
(function(t){var e=function(){try{return!!Symbol.iterator}catch(e){return false}};var r=e();var n=function(t){var e={next:function(){var e=t.shift();return{done:e===void 0,value:e}}};if(r){e[Symbol.iterator]=function(){return e}}return e};var i=function(e){return encodeURIComponent(e).replace(/%20/g,"+")};var o=function(e){return decodeURIComponent(String(e).replace(/\+/g," "))};var a=function(){var a=function(e){Object.defineProperty(this,"_entries",{writable:true,value:{}});var t=typeof e;if(t==="undefined"){}else if(t==="string"){if(e!==""){this._fromString(e)}}else if(e instanceof a){var r=this;e.forEach(function(e,t){r.append(t,e)})}else if(e!==null&&t==="object"){if(Object.prototype.toString.call(e)==="[object Array]"){for(var n=0;n<e.length;n++){var i=e[n];if(Object.prototype.toString.call(i)==="[object Array]"||i.length!==2){this.append(i[0],i[1])}else{throw new TypeError("Expected [string, any] as entry at index "+n+" of URLSearchParams's input")}}}else{for(var o in e){if(e.hasOwnProperty(o)){this.append(o,e[o])}}}}else{throw new TypeError("Unsupported input's type for URLSearchParams")}};var e=a.prototype;e.append=function(e,t){if(e in this._entries){this._entries[e].push(String(t))}else{this._entries[e]=[String(t)]}};e.delete=function(e){delete this._entries[e]};e.get=function(e){return e in this._entries?this._entries[e][0]:null};e.getAll=function(e){return e in this._entries?this._entries[e].slice(0):[]};e.has=function(e){return e in this._entries};e.set=function(e,t){this._entries[e]=[String(t)]};e.forEach=function(e,t){var r;for(var n in this._entries){if(this._entries.hasOwnProperty(n)){r=this._entries[n];for(var i=0;i<r.length;i++){e.call(t,r[i],n,this)}}}};e.keys=function(){var r=[];this.forEach(function(e,t){r.push(t)});return n(r)};e.values=function(){var t=[];this.forEach(function(e){t.push(e)});return n(t)};e.entries=function(){var r=[];this.forEach(function(e,t){r.push([t,e])});return n(r)};if(r){e[Symbol.iterator]=e.entries}e.toString=function(){var r=[];this.forEach(function(e,t){r.push(i(t)+"="+i(e))});return r.join("&")};t.URLSearchParams=a};if(!("URLSearchParams"in t)||new t.URLSearchParams("?a=1").toString()!=="a=1"){a()}var s=t.URLSearchParams.prototype;if(typeof s.sort!=="function"){s.sort=function(){var r=this;var n=[];this.forEach(function(e,t){n.push([t,e]);if(!r._entries){r.delete(t)}});n.sort(function(e,t){if(e[0]<t[0]){return-1}else if(e[0]>t[0]){return+1}else{return 0}});if(r._entries){r._entries={}}for(var e=0;e<n.length;e++){this.append(n[e][0],n[e][1])}}}if(typeof s._fromString!=="function"){Object.defineProperty(s,"_fromString",{enumerable:false,configurable:false,writable:false,value:function(e){if(this._entries){this._entries={}}else{var r=[];this.forEach(function(e,t){r.push(t)});for(var t=0;t<r.length;t++){this.delete(r[t])}}e=e.replace(/^\?/,"");var n=e.split("&");var i;for(var t=0;t<n.length;t++){i=n[t].split("=");this.append(o(i[0]),i.length>1?o(i[1]):"")}}})}})(typeof global!=="undefined"?global:typeof window!=="undefined"?window:typeof self!=="undefined"?self:this);(function(h){var e=function(){try{var e=new h.URL("b","http://a");e.pathname="c%20d";return e.href==="http://a/c%20d"&&e.searchParams}catch(e){return false}};var t=function(){var t=h.URL;var e=function(e,t){if(typeof e!=="string")e=String(e);var r=document,n;if(t&&(h.location===void 0||t!==h.location.href)){r=document.implementation.createHTMLDocument("");n=r.createElement("base");n.href=t;r.head.appendChild(n);try{if(n.href.indexOf(t)!==0)throw new Error(n.href)}catch(e){throw new Error("URL unable to set base "+t+" due to "+e)}}var i=r.createElement("a");i.href=e;if(n){r.body.appendChild(i);i.href=i.href}if(i.protocol===":"||!/:/.test(i.href)){throw new TypeError("Invalid URL")}Object.defineProperty(this,"_anchorElement",{value:i});var o=new h.URLSearchParams(this.search);var a=true;var s=true;var c=this;["append","delete","set"].forEach(function(e){var t=o[e];o[e]=function(){t.apply(o,arguments);if(a){s=false;c.search=o.toString();s=true}}});Object.defineProperty(this,"searchParams",{value:o,enumerable:true});var f=void 0;Object.defineProperty(this,"_updateSearchParams",{enumerable:false,configurable:false,writable:false,value:function(){if(this.search!==f){f=this.search;if(s){a=false;this.searchParams._fromString(this.search);a=true}}}})};var r=e.prototype;var n=function(t){Object.defineProperty(r,t,{get:function(){return this._anchorElement[t]},set:function(e){this._anchorElement[t]=e},enumerable:true})};["hash","host","hostname","port","protocol"].forEach(function(e){n(e)});Object.defineProperty(r,"search",{get:function(){return this._anchorElement["search"]},set:function(e){this._anchorElement["search"]=e;this._updateSearchParams()},enumerable:true});Object.defineProperties(r,{toString:{get:function(){var e=this;return function(){return e.href}}},href:{get:function(){return this._anchorElement.href.replace(/\?$/,"")},set:function(e){this._anchorElement.href=e;this._updateSearchParams()},enumerable:true},pathname:{get:function(){return this._anchorElement.pathname.replace(/(^\/?)/,"/")},set:function(e){this._anchorElement.pathname=e},enumerable:true},origin:{get:function(){var e={"http:":80,"https:":443,"ftp:":21}[this._anchorElement.protocol];var t=this._anchorElement.port!=e&&this._anchorElement.port!=="";return this._anchorElement.protocol+"//"+this._anchorElement.hostname+(t?":"+this._anchorElement.port:"")},enumerable:true},password:{get:function(){return""},set:function(e){},enumerable:true},username:{get:function(){return""},set:function(e){},enumerable:true}});e.createObjectURL=function(e){return t.createObjectURL.apply(t,arguments)};e.revokeObjectURL=function(e){return t.revokeObjectURL.apply(t,arguments)};h.URL=e};if(!e()){t()}if(h.location!==void 0&&!("origin"in h.location)){var r=function(){return h.location.protocol+"//"+h.location.hostname+(h.location.port?":"+h.location.port:"")};try{Object.defineProperty(h.location,"origin",{get:r,enumerable:true})}catch(e){setInterval(function(){h.location.origin=r()},100)}}})(typeof global!=="undefined"?global:typeof window!=="undefined"?window:typeof self!=="undefined"?self:this);

/*
* SystemJS 3.1.3
*/
!function(){const e="undefined"!=typeof self,n=e?self:global;let t;if("undefined"!=typeof location){const e=(t=location.href.split("#")[0].split("?")[0]).lastIndexOf("/");-1!==e&&(t=t.slice(0,e+1))}const r=/\\/g,i="undefined"!=typeof Symbol,o=i&&Symbol.toStringTag,c=i?Symbol():"@";function l(){this[c]={}}const s=l.prototype;let u;s.import=function(e,n){const t=this;return Promise.resolve(t.resolve(e,n)).then(function(e){const n=function e(n,t,r){let i=n[c][t];if(i)return i;const l=[],s=Object.create(null);o&&Object.defineProperty(s,o,{value:"Module"});let u=Promise.resolve().then(function(){return n.instantiate(t,r)}).then(function(e){if(!e)throw new Error("Module "+t+" did not instantiate");const r=e[1](function(e,n){i.h=!0;let t=!1;if("object"!=typeof e)e in s&&s[e]===n||(s[e]=n,t=!0);else for(let n in e){let r=e[n];n in s&&s[n]===r||(s[n]=r,t=!0)}if(t)for(let e=0;e<l.length;e++)l[e](s);return n},2===e[1].length?{import:function(e){return n.import(e,t)},meta:n.createContext(t)}:void 0);return i.e=r.execute||function(){},[e[0],r.setters||[]]});const f=u.then(function(r){return Promise.all(r[0].map(function(i,o){const c=r[1][o];return Promise.resolve(n.resolve(i,t)).then(function(r){const i=e(n,r,t);return Promise.resolve(i.I).then(function(){return c&&(i.i.push(c),!i.h&&i.I||c(i.n)),i})})})).then(function(e){i.d=e})});return f.catch(function(e){i.e=null,i.er=e}),i=n[c][t]={id:t,i:l,n:s,I:u,L:f,h:!1,d:void 0,e:void 0,er:void 0,E:void 0,C:void 0}}(t,e);return n.C||function(e,n){return n.C=function e(n,t,r){if(!r[t.id])return r[t.id]=!0,Promise.resolve(t.L).then(function(){return Promise.all(t.d.map(function(t){return e(n,t,r)}))})}(e,n,{}).then(function(){return function e(n,t,r){if(r[t.id])return;if(r[t.id]=!0,!t.e){if(t.er)throw t.er;return t.E?t.E:void 0}let i;return t.d.forEach(function(t){{const o=e(n,t,r);o&&(i=i||[]).push(o)}}),i?Promise.all(i).then(o):o();function o(){try{let e=t.e.call(f);if(e)return e=e.then(function(){t.C=t.n,t.E=null}),t.E=t.E||e;t.C=t.n}catch(e){throw t.er=e,e}finally{t.L=t.I=void 0,t.e=null}}}(e,n,{})}).then(function(){return n.n})}(t,n)})},s.createContext=function(e){return{url:e}},s.register=function(e,n){u=[e,n]},s.getRegister=function(){const e=u;return u=void 0,e};const f=Object.freeze(Object.create(null));let d;n.System=new l,"undefined"!=typeof window&&window.addEventListener("error",function(e){d=e.error});const h=s.register;s.register=function(e,n){d=void 0,h.call(this,e,n)},s.instantiate=function(e,n){const t=this;return new Promise(function(r,i){const o=document.createElement("script");o.charset="utf-8",o.async=!0,o.crossOrigin="anonymous",o.addEventListener("error",function(){i(new Error("Error loading "+e+(n?" from "+n:"")))}),o.addEventListener("load",function(){if(document.head.removeChild(o),d)return i(d),d=void 0;r(t.getRegister())}),o.src=e,document.head.appendChild(o)})},e&&"function"==typeof importScripts&&(s.instantiate=function(e){const n=this;return new Promise(function(t,r){try{importScripts(e)}catch(e){r(e)}t(n.getRegister())})}),s.resolve=function(e,n){const i=function(e,n){if(-1!==e.indexOf("\\")&&(e=e.replace(r,"/")),"/"===e[0]&&"/"===e[1])return n.slice(0,n.indexOf(":")+1)+e;if("."===e[0]&&("/"===e[1]||"."===e[1]&&("/"===e[2]||2===e.length&&(e+="/"))||1===e.length&&(e+="/"))||"/"===e[0]){const t=n.slice(0,n.indexOf(":")+1);let r;if(r="/"===n[t.length+1]?"file:"!==t?(r=n.slice(t.length+2)).slice(r.indexOf("/")+1):n.slice(8):n.slice(t.length+("/"===n[t.length])),"/"===e[0])return n.slice(0,n.length-r.length-1)+e;const i=r.slice(0,r.lastIndexOf("/")+1)+e,o=[];let c=-1;for(let e=0;e<i.length;e++)-1!==c?"/"===i[e]&&(o.push(i.slice(c,e+1)),c=-1):"."===i[e]?"."!==i[e+1]||"/"!==i[e+2]&&e+2!==i.length?"/"===i[e+1]||e+1===i.length?e+=1:c=e:(o.pop(),e+=2):c=e;return-1!==c&&o.push(i.slice(c)),n.slice(0,n.length-r.length)+o.join("")}}(e,n||t);if(!i){if(-1!==e.indexOf(":"))return Promise.resolve(e);throw new Error('Cannot resolve "'+e+(n?'" from '+n:'"'))}return Promise.resolve(i)}}();

/*
Extremely simple css parser. Intended to be not more than what we need
and definitely not necessarily correct =).
*/
/** @unrestricted */
var StyleNode = /** @class */ (function () {
    function StyleNode() {
        this.start = 0;
        this.end = 0;
        this.previous = null;
        this.parent = null;
        this.rules = null;
        this.parsedCssText = '';
        this.cssText = '';
        this.atRule = false;
        this.type = 0;
        this.keyframesName = '';
        this.selector = '';
        this.parsedSelector = '';
    }
    return StyleNode;
}());
// given a string of css, return a simple rule tree
/**
 * @param {string} text
 * @return {StyleNode}
 */
function parse(text) {
    text = clean(text);
    return parseCss(lex(text), text);
}
// remove stuff we don't care about that may hinder parsing
/**
 * @param {string} cssText
 * @return {string}
 */
function clean(cssText) {
    return cssText.replace(RX.comments, '').replace(RX.port, '');
}
// super simple {...} lexer that returns a node tree
/**
 * @param {string} text
 * @return {StyleNode}
 */
function lex(text) {
    var root = new StyleNode();
    root['start'] = 0;
    root['end'] = text.length;
    var n = root;
    for (var i = 0, l = text.length; i < l; i++) {
        if (text[i] === OPEN_BRACE) {
            if (!n['rules']) {
                n['rules'] = [];
            }
            var p = n;
            var previous = p['rules'][p['rules'].length - 1] || null;
            n = new StyleNode();
            n['start'] = i + 1;
            n['parent'] = p;
            n['previous'] = previous;
            p['rules'].push(n);
        }
        else if (text[i] === CLOSE_BRACE) {
            n['end'] = i + 1;
            n = n['parent'] || root;
        }
    }
    return root;
}
// add selectors/cssText to node tree
/**
 * @param {StyleNode} node
 * @param {string} text
 * @return {StyleNode}
 */
function parseCss(node, text) {
    var t = text.substring(node['start'], node['end'] - 1);
    node['parsedCssText'] = node['cssText'] = t.trim();
    if (node.parent) {
        var ss = node.previous ? node.previous['end'] : node.parent['start'];
        t = text.substring(ss, node['start'] - 1);
        t = _expandUnicodeEscapes(t);
        t = t.replace(RX.multipleSpaces, ' ');
        // TODO(sorvell): ad hoc; make selector include only after last ;
        // helps with mixin syntax
        t = t.substring(t.lastIndexOf(';') + 1);
        var s = node['parsedSelector'] = node['selector'] = t.trim();
        node['atRule'] = (s.indexOf(AT_START) === 0);
        // note, support a subset of rule types...
        if (node['atRule']) {
            if (s.indexOf(MEDIA_START) === 0) {
                node['type'] = types.MEDIA_RULE;
            }
            else if (s.match(RX.keyframesRule)) {
                node['type'] = types.KEYFRAMES_RULE;
                node['keyframesName'] = node['selector'].split(RX.multipleSpaces).pop();
            }
        }
        else {
            if (s.indexOf(VAR_START) === 0) {
                node['type'] = types.MIXIN_RULE;
            }
            else {
                node['type'] = types.STYLE_RULE;
            }
        }
    }
    var r$ = node['rules'];
    if (r$) {
        for (var i = 0, l = r$.length, r = void 0; (i < l) && (r = r$[i]); i++) {
            parseCss(r, text);
        }
    }
    return node;
}
/**
 * conversion of sort unicode escapes with spaces like `\33 ` (and longer) into
 * expanded form that doesn't require trailing space `\000033`
 * @param {string} s
 * @return {string}
 */
function _expandUnicodeEscapes(s) {
    return s.replace(/\\([0-9a-f]{1,6})\s/gi, function () {
        var code = arguments[1], repeat = 6 - code.length;
        while (repeat--) {
            code = '0' + code;
        }
        return '\\' + code;
    });
}
/** @enum {number} */
var types = {
    STYLE_RULE: 1,
    KEYFRAMES_RULE: 7,
    MEDIA_RULE: 4,
    MIXIN_RULE: 1000
};
var OPEN_BRACE = '{';
var CLOSE_BRACE = '}';
// helper regexp's
var RX = {
    comments: /\/\*[^*]*\*+([^/*][^*]*\*+)*\//gim,
    port: /@import[^;]*;/gim,
    customProp: /(?:^[^;\-\s}]+)?--[^;{}]*?:[^{};]*?(?:[;\n]|$)/gim,
    mixinProp: /(?:^[^;\-\s}]+)?--[^;{}]*?:[^{};]*?{[^}]*?}(?:[;\n]|$)?/gim,
    mixinApply: /@apply\s*\(?[^);]*\)?\s*(?:[;\n]|$)?/gim,
    varApply: /[^;:]*?:[^;]*?var\([^;]*\)(?:[;\n]|$)?/gim,
    keyframesRule: /^@[^\s]*keyframes/,
    multipleSpaces: /\s+/g
};
var VAR_START = '--';
var MEDIA_START = '@media';
var AT_START = '@';
function findRegex(regex, cssText, offset) {
    regex['lastIndex'] = 0;
    var r = cssText.substring(offset).match(regex);
    if (r) {
        var start = offset + r['index'];
        return {
            start: start,
            end: start + r[0].length
        };
    }
    return null;
}
var VAR_USAGE_START = /\bvar\(/;
var VAR_ASSIGN_START = /\B--[\w-]+\s*:/;
var COMMENTS = /\/\*[^*]*\*+([^/*][^*]*\*+)*\//gim;
var TRAILING_LINES = /^[\t ]+\n/gm;
function resolveVar(props, prop, fallback) {
    if (props[prop]) {
        return props[prop];
    }
    if (fallback) {
        return executeTemplate(fallback, props);
    }
    return '';
}
function findVarEndIndex(cssText, offset) {
    var count = 0;
    var i = offset;
    for (; i < cssText.length; i++) {
        var c = cssText[i];
        if (c === '(') {
            count++;
        }
        else if (c === ')') {
            count--;
            if (count <= 0) {
                return i + 1;
            }
        }
    }
    return i;
}
function parseVar(cssText, offset) {
    var varPos = findRegex(VAR_USAGE_START, cssText, offset);
    if (!varPos) {
        return null;
    }
    var endVar = findVarEndIndex(cssText, varPos.start);
    var varContent = cssText.substring(varPos.end, endVar - 1);
    var _a = varContent.split(','), propName = _a[0], fallback = _a.slice(1);
    return {
        start: varPos.start,
        end: endVar,
        propName: propName.trim(),
        fallback: fallback.length > 0 ? fallback.join(',').trim() : undefined
    };
}
function compileVar(cssText, template, offset) {
    var varMeta = parseVar(cssText, offset);
    if (!varMeta) {
        template.push(cssText.substring(offset, cssText.length));
        return cssText.length;
    }
    var propName = varMeta.propName;
    var fallback = varMeta.fallback != null ? compileTemplate(varMeta.fallback) : undefined;
    template.push(cssText.substring(offset, varMeta.start), function (params) { return resolveVar(params, propName, fallback); });
    return varMeta.end;
}
function executeTemplate(template, props) {
    var final = '';
    for (var i = 0; i < template.length; i++) {
        var s = template[i];
        final += (typeof s === 'string')
            ? s
            : s(props);
    }
    return final;
}
function findEndValue(cssText, offset) {
    var onStr = false;
    var double = false;
    var i = offset;
    for (; i < cssText.length; i++) {
        var c = cssText[i];
        if (onStr) {
            if (double && c === '"') {
                onStr = false;
            }
            if (!double && c === '\'') {
                onStr = false;
            }
        }
        else {
            if (c === '"') {
                onStr = true;
                double = true;
            }
            else if (c === '\'') {
                onStr = true;
                double = false;
            }
            else if (c === ';') {
                return i + 1;
            }
            else if (c === '}') {
                return i;
            }
        }
    }
    return i;
}
function removeCustomAssigns(cssText) {
    var final = '';
    var offset = 0;
    while (true) {
        var assignPos = findRegex(VAR_ASSIGN_START, cssText, offset);
        var start = assignPos ? assignPos.start : cssText.length;
        final += cssText.substring(offset, start);
        if (assignPos) {
            offset = findEndValue(cssText, start);
        }
        else {
            break;
        }
    }
    return final;
}
function compileTemplate(cssText) {
    var index = 0;
    cssText = cssText.replace(COMMENTS, '');
    cssText = removeCustomAssigns(cssText)
        .replace(TRAILING_LINES, '');
    var segments = [];
    while (index < cssText.length) {
        index = compileVar(cssText, segments, index);
    }
    return segments;
}
function resolveValues(selectors) {
    var props = {};
    selectors.forEach(function (selector) {
        selector.declarations.forEach(function (dec) {
            props[dec.prop] = dec.value;
        });
    });
    var propsValues = {};
    var entries = Object.entries(props);
    var _loop_1 = function (i) {
        var dirty = false;
        entries.forEach(function (_a) {
            var key = _a[0], value = _a[1];
            var propValue = executeTemplate(value, propsValues);
            if (propValue !== propsValues[key]) {
                propsValues[key] = propValue;
                dirty = true;
            }
        });
        if (!dirty) {
            return "break";
        }
    };
    for (var i = 0; i < 10; i++) {
        var state_1 = _loop_1(i);
        if (state_1 === "break")
            break;
    }
    return propsValues;
}
function getSelectors(root, index) {
    if (index === void 0) { index = 0; }
    if (!root.rules) {
        return [];
    }
    var selectors = [];
    root.rules
        .filter(function (rule) { return rule.type === types.STYLE_RULE; })
        .forEach(function (rule) {
        var declarations = getDeclarations(rule.cssText);
        if (declarations.length > 0) {
            rule.parsedSelector.split(',').forEach(function (selector) {
                selector = selector.trim();
                selectors.push({
                    selector: selector,
                    declarations: declarations,
                    specificity: computeSpecificity(selector),
                    nu: index
                });
            });
        }
        index++;
    });
    return selectors;
}
function computeSpecificity(_selector) {
    return 1;
}
var IMPORTANT = '!important';
var FIND_DECLARATIONS = /(?:^|[;\s{]\s*)(--[\w-]*?)\s*:\s*(?:((?:'(?:\\'|.)*?'|"(?:\\"|.)*?"|\([^)]*?\)|[^};{])+)|\{([^}]*)\}(?:(?=[;\s}])|$))/gm;
function getDeclarations(cssText) {
    var declarations = [];
    var xArray;
    while (xArray = FIND_DECLARATIONS.exec(cssText.trim())) {
        var _a = normalizeValue(xArray[2]), value = _a.value, important = _a.important;
        declarations.push({
            prop: xArray[1].trim(),
            value: compileTemplate(value),
            important: important,
        });
    }
    return declarations;
}
function normalizeValue(value) {
    var regex = /\s+/gim;
    value = value.replace(regex, ' ').trim();
    var important = value.endsWith(IMPORTANT);
    if (important) {
        value = value.substr(0, value.length - IMPORTANT.length).trim();
    }
    return {
        value: value,
        important: important
    };
}
function getActiveSelectors(hostEl, hostScopeMap, globalScopes) {
    // computes the css scopes that might affect this particular element
    var scopes = globalScopes.concat(getScopesForElement(hostScopeMap, hostEl));
    // each scope might have an array of associated selectors
    // let's flatten the complete array of selectors from all the scopes
    var selectorSet = getSelectorsForScopes(scopes);
    // we filter to only the selectors that matches the hostEl
    var activeSelectors = selectorSet.filter(function (selector) { return matches(hostEl, selector.selector); });
    // sort selectors by specifity
    return sortSelectors(activeSelectors);
}
function getScopesForElement(hostTemplateMap, node) {
    var scopes = [];
    while (node) {
        var scope = hostTemplateMap.get(node);
        if (scope) {
            scopes.push(scope);
        }
        node = node.parentElement;
    }
    return scopes;
}
function getSelectorsForScopes(scopes) {
    var selectors = [];
    scopes.forEach(function (scope) {
        selectors.push.apply(selectors, scope.selectors);
    });
    return selectors;
}
function sortSelectors(selectors) {
    selectors.sort(function (a, b) {
        if (a.specificity === b.specificity) {
            return a.nu - b.nu;
        }
        return a.specificity - b.specificity;
    });
    return selectors;
}
function matches(el, selector) {
    return el.matches(selector);
}
function parseCSS(original) {
    var ast = parse(original);
    var template = compileTemplate(original);
    var selectors = getSelectors(ast);
    return {
        original: original,
        template: template,
        selectors: selectors,
        isDynamic: template.length > 1
    };
}
function addGlobalStyle(globalScopes, styleEl) {
    var css = parseCSS(styleEl.innerHTML);
    css.styleEl = styleEl;
    globalScopes.push(css);
}
function updateGlobalScopes(scopes) {
    var selectors = getSelectorsForScopes(scopes);
    var props = resolveValues(selectors);
    scopes.forEach(function (scope) {
        if (scope.isDynamic) {
            scope.styleEl.innerHTML = executeTemplate(scope.template, props);
        }
    });
}
function reScope(scope, cssScopeId) {
    var template = scope.template.map(function (segment) {
        return (typeof segment === 'string')
            ? replaceScope(segment, scope.cssScopeId, cssScopeId)
            : segment;
    });
    var selectors = scope.selectors.map(function (sel) {
        return Object.assign({}, sel, { selector: replaceScope(sel.selector, scope.cssScopeId, cssScopeId) });
    });
    return Object.assign({}, scope, { template: template,
        selectors: selectors,
        cssScopeId: cssScopeId });
}
function replaceScope(original, oldScopeId, newScopeId) {
    original = replaceAll(original, "\\." + oldScopeId, "." + newScopeId);
    return original;
}
function replaceAll(input, find, replace) {
    return input.replace(new RegExp(find, 'g'), replace);
}
function loadDocument(doc, globalScopes) {
    return loadDocumentLinks(doc, globalScopes).then(function () {
        loadDocumentStyles(doc, globalScopes);
    });
}
function loadDocumentLinks(doc, globalScopes) {
    var promises = [];
    var linkElms = doc.querySelectorAll('link[rel="stylesheet"][href]');
    for (var i = 0; i < linkElms.length; i++) {
        promises.push(addGlobalLink(doc, globalScopes, linkElms[i]));
    }
    return Promise.all(promises);
}
function loadDocumentStyles(doc, globalScopes) {
    var styleElms = doc.querySelectorAll('style');
    for (var i = 0; i < styleElms.length; i++) {
        addGlobalStyle(globalScopes, styleElms[i]);
    }
}
function addGlobalLink(doc, globalScopes, linkElm) {
    var url = linkElm.href;
    return fetch(url).then(function (rsp) { return rsp.text(); }).then(function (text) {
        if (hasCssVariables(text) && linkElm.parentNode) {
            if (hasRelativeUrls(text)) {
                text = fixRelativeUrls(text, url);
            }
            var styleEl = doc.createElement('style');
            styleEl.innerHTML = text;
            addGlobalStyle(globalScopes, styleEl);
            linkElm.parentNode.insertBefore(styleEl, linkElm);
            linkElm.remove();
        }
    }).catch(function (err) {
        console.error(err);
    });
}
// This regexp tries to determine when a variable is declared, for example:
//
// .my-el { --highlight-color: green; }
//
// but we don't want to trigger when a classname uses "--" or a pseudo-class is
// used. We assume that the only characters that can preceed a variable
// declaration are "{", from an opening block, ";" from a preceeding rule, or a
// space. This prevents the regexp from matching a word in a selector, since
// they would need to start with a "." or "#". (We assume element names don't
// start with "--").
var CSS_VARIABLE_REGEXP = /[\s;{]--[-a-zA-Z0-9]+\s*:/m;
function hasCssVariables(css) {
    return css.indexOf('var(') > -1 || CSS_VARIABLE_REGEXP.test(css);
}
// This regexp find all url() usages with relative urls
var CSS_URL_REGEXP = /url[\s]*\([\s]*['"]?(?![http|/])([^\'\"\)]*)[\s]*['"]?\)[\s]*/gim;
function hasRelativeUrls(css) {
    CSS_URL_REGEXP.lastIndex = 0;
    return CSS_URL_REGEXP.test(css);
}
function fixRelativeUrls(css, originalUrl) {
    // get the basepath from the original import url
    var basePath = originalUrl.replace(/[^/]*$/, '');
    // replace the relative url, with the new relative url
    return css.replace(CSS_URL_REGEXP, function (fullMatch, url) {
        // rhe new relative path is the base path + uri
        // TODO: normalize relative URL
        var relativeUrl = basePath + url;
        return fullMatch.replace(url, relativeUrl);
    });
}
var CustomStyle = /** @class */ (function () {
    function CustomStyle(win, doc) {
        this.win = win;
        this.doc = doc;
        this.count = 0;
        this.hostStyleMap = new WeakMap();
        this.hostScopeMap = new WeakMap();
        this.globalScopes = [];
        this.scopesMap = new Map();
    }
    CustomStyle.prototype.initShim = function () {
        var _this = this;
        return new Promise(function (resolve) {
            _this.win.requestAnimationFrame(function () {
                loadDocument(_this.doc, _this.globalScopes).then(function () { return resolve(); });
            });
        });
    };
    CustomStyle.prototype.addLink = function (linkEl) {
        var _this = this;
        return addGlobalLink(this.doc, this.globalScopes, linkEl).then(function () {
            _this.updateGlobal();
        });
    };
    CustomStyle.prototype.addGlobalStyle = function (styleEl) {
        addGlobalStyle(this.globalScopes, styleEl);
        this.updateGlobal();
    };
    CustomStyle.prototype.createHostStyle = function (hostEl, cssScopeId, cssText) {
        if (this.hostScopeMap.has(hostEl)) {
            throw new Error('host style already created');
        }
        var baseScope = this.registerHostTemplate(cssText, cssScopeId);
        var isDynamicScoped = !!(baseScope.isDynamic && baseScope.cssScopeId);
        var needStyleEl = isDynamicScoped || !baseScope.styleEl;
        var styleEl = this.doc.createElement('style');
        if (!needStyleEl) {
            styleEl.innerHTML = cssText;
        }
        else {
            if (isDynamicScoped) {
                styleEl['s-sc'] = cssScopeId = baseScope.cssScopeId + "-" + this.count;
                styleEl.innerHTML = '/*needs update*/';
                this.hostStyleMap.set(hostEl, styleEl);
                this.hostScopeMap.set(hostEl, reScope(baseScope, cssScopeId));
                this.count++;
            }
            else {
                baseScope.styleEl = styleEl;
                if (!baseScope.isDynamic) {
                    styleEl.innerHTML = executeTemplate(baseScope.template, {});
                }
                this.globalScopes.push(baseScope);
                this.updateGlobal();
                this.hostScopeMap.set(hostEl, baseScope);
            }
        }
        return styleEl;
    };
    CustomStyle.prototype.removeHost = function (hostEl) {
        var css = this.hostStyleMap.get(hostEl);
        if (css) {
            css.remove();
        }
        this.hostStyleMap.delete(hostEl);
        this.hostScopeMap.delete(hostEl);
    };
    CustomStyle.prototype.updateHost = function (hostEl) {
        var scope = this.hostScopeMap.get(hostEl);
        if (scope && scope.isDynamic && scope.cssScopeId) {
            var styleEl = this.hostStyleMap.get(hostEl);
            if (styleEl) {
                var selectors = getActiveSelectors(hostEl, this.hostScopeMap, this.globalScopes);
                var props = resolveValues(selectors);
                styleEl.innerHTML = executeTemplate(scope.template, props);
            }
        }
    };
    CustomStyle.prototype.updateGlobal = function () {
        updateGlobalScopes(this.globalScopes);
    };
    CustomStyle.prototype.registerHostTemplate = function (cssText, scopeId) {
        var scope = this.scopesMap.get(scopeId);
        if (!scope) {
            scope = parseCSS(cssText);
            scope.cssScopeId = scopeId;
            this.scopesMap.set(scopeId, scope);
        }
        return scope;
    };
    return CustomStyle;
}());
var win = window;
function needsShim() {
    return !(win.CSS && win.CSS.supports && win.CSS.supports('color', 'var(--c)'));
}
if (!win.__stencil_cssshim && needsShim()) {
    win.__stencil_cssshim = new CustomStyle(win, document);
}

var doc = document;
var allScripts = doc.querySelectorAll('script');
var scriptElm;
for (var x = allScripts.length - 1; x >= 0; x--) {
  scriptElm = allScripts[x];
  if (scriptElm.src || scriptElm.hasAttribute('data-resources-url')) {
    break;
  }
}
var resourcesUrl = scriptElm ? scriptElm.getAttribute('data-resources-url') || scriptElm.src : '';
var start = function() {
  var url = new URL('./p-ce5a2083.system.js', resourcesUrl);
  System.import(url.href);
};

if (win.__stencil_cssshim) {
  win.__stencil_cssshim.initShim().then(start);
} else {
  start();
}
