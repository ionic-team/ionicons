/*! document-register-element, 1.7.0
https://github.com/WebReflection/document-register-element
(C) Andrea Giammarchi - @WebReflection - Mit Style License */
(function(e,t){"use strict";function Ht(){var e=wt.splice(0,wt.length);Et=0;while(e.length)e.shift().call(null,e.shift())}function Bt(e,t){for(var n=0,r=e.length;n<r;n++)Jt(e[n],t)}function jt(e){for(var t=0,n=e.length,r;t<n;t++)r=e[t],Pt(r,A[It(r)])}function Ft(e){return function(t){ut(t)&&(Jt(t,e),O.length&&Bt(t.querySelectorAll(O),e))}}function It(e){var t=ht.call(e,"is"),n=e.nodeName.toUpperCase(),r=_.call(L,t?N+t.toUpperCase():T+n);return t&&-1<r&&!qt(n,t)?-1:r}function qt(e,t){return-1<O.indexOf(e+'[is="'+t+'"]')}function Rt(e){var t=e.currentTarget,n=e.attrChange,r=e.attrName,i=e.target,s=e[y]||2,o=e[w]||3;kt&&(!i||i===t)&&t[h]&&r!=="style"&&(e.prevValue!==e.newValue||e.newValue===""&&(n===s||n===o))&&t[h](r,n===s?null:e.prevValue,n===o?null:e.newValue)}function Ut(e){var t=Ft(e);return function(e){wt.push(t,e.target),Et&&clearTimeout(Et),Et=setTimeout(Ht,1)}}function zt(e){Ct&&(Ct=!1,e.currentTarget.removeEventListener(S,zt)),O.length&&Bt((e.target||n).querySelectorAll(O),e.detail===l?l:a),st&&Vt()}function Wt(e,t){var n=this;vt.call(n,e,t),Lt.call(n,{target:n})}function Xt(e,t){nt(e,t),Mt?Mt.observe(e,yt):(Nt&&(e.setAttribute=Wt,e[o]=Ot(e),e[u](x,Lt)),e[u](E,Rt)),e[m]&&kt&&(e.created=!0,e[m](),e.created=!1)}function Vt(){for(var e,t=0,n=at.length;t<n;t++)e=at[t],M.contains(e)||(n--,at.splice(t--,1),Jt(e,l))}function $t(e){throw new Error("A "+e+" type is already registered")}function Jt(e,t){var n,r=It(e),i;-1<r&&(Dt(e,A[r]),r=0,t===a&&!e[a]?(e[l]=!1,e[a]=!0,i="connected",r=1,st&&_.call(at,e)<0&&at.push(e)):t===l&&!e[l]&&(e[a]=!1,e[l]=!0,i="disconnected",r=1),r&&(n=e[t+f]||e[i+f])&&n.call(e))}function Kt(){}function Qt(e,t,r){var i=r&&r[c]||"",o=t.prototype,u=tt(o),a=t.observedAttributes||j,f={prototype:u};ot(u,m,{value:function(){if(Q)Q=!1;else if(!this[W]){this[W]=!0,new t(this),o[m]&&o[m].call(this);var e=G[Z.get(t)];(!V||e.create.length>1)&&Zt(this)}}}),ot(u,h,{value:function(e){-1<_.call(a,e)&&o[h].apply(this,arguments)}}),o[d]&&ot(u,p,{value:o[d]}),o[v]&&ot(u,g,{value:o[v]}),i&&(f[c]=i),e=e.toUpperCase(),G[e]={constructor:t,create:i?[i,et(e)]:[e]},Z.set(t,e),n[s](e.toLowerCase(),f),en(e),Y[e].r()}function Gt(e){var t=G[e.toUpperCase()];return t&&t.constructor}function Yt(e){return typeof e=="string"?e:e&&e.is||""}function Zt(e){var t=e[h],n=t?e.attributes:j,r=n.length,i;while(r--)i=n[r],t.call(e,i.name||i.nodeName,null,i.value||i.nodeValue)}function en(e){return e=e.toUpperCase(),e in Y||(Y[e]={},Y[e].p=new K(function(t){Y[e].r=t})),Y[e].p}function tn(){X&&delete e.customElements,B(e,"customElements",{configurable:!0,value:new Kt}),B(e,"CustomElementRegistry",{configurable:!0,value:Kt});for(var t=function(t){var r=e[t];if(r){e[t]=function(t){var i,s;return t||(t=this),t[W]||(Q=!0,i=G[Z.get(t.constructor)],s=V&&i.create.length===1,t=s?Reflect.construct(r,j,i.constructor):n.createElement.apply(n,i.create),t[W]=!0,Q=!1,s||Zt(t)),t},e[t].prototype=r.prototype;try{r.prototype.constructor=e[t]}catch(i){z=!0,B(r,W,{value:e[t]})}}},r=i.get(/^HTML[A-Z]*[a-z]/),o=r.length;o--;t(r[o]));n.createElement=function(e,t){var n=Yt(t);return n?gt.call(this,e,et(n)):gt.call(this,e)},St||(Tt=!0,n[s](""))}var n=e.document,r=e.Object,i=function(e){var t=/^[A-Z]+[a-z]/,n=function(e){var t=[],n;for(n in s)e.test(n)&&t.push(n);return t},i=function(e,t){t=t.toLowerCase(),t in s||(s[e]=(s[e]||[]).concat(t),s[t]=s[t.toUpperCase()]=e)},s=(r.create||r)(null),o={},u,a,f,l;for(a in e)for(l in e[a]){f=e[a][l],s[l]=f;for(u=0;u<f.length;u++)s[f[u].toLowerCase()]=s[f[u].toUpperCase()]=l}return o.get=function(r){return typeof r=="string"?s[r]||(t.test(r)?[]:""):n(r)},o.set=function(n,r){return t.test(n)?i(n,r):i(r,n),o},o}({collections:{HTMLAllCollection:["all"],HTMLCollection:["forms"],HTMLFormControlsCollection:["elements"],HTMLOptionsCollection:["options"]},elements:{Element:["element"],HTMLAnchorElement:["a"],HTMLAppletElement:["applet"],HTMLAreaElement:["area"],HTMLAttachmentElement:["attachment"],HTMLAudioElement:["audio"],HTMLBRElement:["br"],HTMLBaseElement:["base"],HTMLBodyElement:["body"],HTMLButtonElement:["button"],HTMLCanvasElement:["canvas"],HTMLContentElement:["content"],HTMLDListElement:["dl"],HTMLDataElement:["data"],HTMLDataListElement:["datalist"],HTMLDetailsElement:["details"],HTMLDialogElement:["dialog"],HTMLDirectoryElement:["dir"],HTMLDivElement:["div"],HTMLDocument:["document"],HTMLElement:["element","abbr","address","article","aside","b","bdi","bdo","cite","code","command","dd","dfn","dt","em","figcaption","figure","footer","header","i","kbd","mark","nav","noscript","rp","rt","ruby","s","samp","section","small","strong","sub","summary","sup","u","var","wbr"],HTMLEmbedElement:["embed"],HTMLFieldSetElement:["fieldset"],HTMLFontElement:["font"],HTMLFormElement:["form"],HTMLFrameElement:["frame"],HTMLFrameSetElement:["frameset"],HTMLHRElement:["hr"],HTMLHeadElement:["head"],HTMLHeadingElement:["h1","h2","h3","h4","h5","h6"],HTMLHtmlElement:["html"],HTMLIFrameElement:["iframe"],HTMLImageElement:["img"],HTMLInputElement:["input"],HTMLKeygenElement:["keygen"],HTMLLIElement:["li"],HTMLLabelElement:["label"],HTMLLegendElement:["legend"],HTMLLinkElement:["link"],HTMLMapElement:["map"],HTMLMarqueeElement:["marquee"],HTMLMediaElement:["media"],HTMLMenuElement:["menu"],HTMLMenuItemElement:["menuitem"],HTMLMetaElement:["meta"],HTMLMeterElement:["meter"],HTMLModElement:["del","ins"],HTMLOListElement:["ol"],HTMLObjectElement:["object"],HTMLOptGroupElement:["optgroup"],HTMLOptionElement:["option"],HTMLOutputElement:["output"],HTMLParagraphElement:["p"],HTMLParamElement:["param"],HTMLPictureElement:["picture"],HTMLPreElement:["pre"],HTMLProgressElement:["progress"],HTMLQuoteElement:["blockquote","q","quote"],HTMLScriptElement:["script"],HTMLSelectElement:["select"],HTMLShadowElement:["shadow"],HTMLSlotElement:["slot"],HTMLSourceElement:["source"],HTMLSpanElement:["span"],HTMLStyleElement:["style"],HTMLTableCaptionElement:["caption"],HTMLTableCellElement:["td","th"],HTMLTableColElement:["col","colgroup"],HTMLTableElement:["table"],HTMLTableRowElement:["tr"],HTMLTableSectionElement:["thead","tbody","tfoot"],HTMLTemplateElement:["template"],HTMLTextAreaElement:["textarea"],HTMLTimeElement:["time"],HTMLTitleElement:["title"],HTMLTrackElement:["track"],HTMLUListElement:["ul"],HTMLUnknownElement:["unknown","vhgroupv","vkeygen"],HTMLVideoElement:["video"]},nodes:{Attr:["node"],Audio:["audio"],CDATASection:["node"],CharacterData:["node"],Comment:["#comment"],Document:["#document"],DocumentFragment:["#document-fragment"],DocumentType:["node"],HTMLDocument:["#document"],Image:["img"],Option:["option"],ProcessingInstruction:["node"],ShadowRoot:["#shadow-root"],Text:["#text"],XMLDocument:["xml"]}});typeof t!="object"&&(t={type:t||"auto"});var s="registerElement",o="__"+s+(e.Math.random()*1e5>>0),u="addEventListener",a="attached",f="Callback",l="detached",c="extends",h="attributeChanged"+f,p=a+f,d="connected"+f,v="disconnected"+f,m="created"+f,g=l+f,y="ADDITION",b="MODIFICATION",w="REMOVAL",E="DOMAttrModified",S="DOMContentLoaded",x="DOMSubtreeModified",T="<",N="=",C=/^[A-Z][A-Z0-9]*(?:-[A-Z0-9]+)+$/,k=["ANNOTATION-XML","COLOR-PROFILE","FONT-FACE","FONT-FACE-SRC","FONT-FACE-URI","FONT-FACE-FORMAT","FONT-FACE-NAME","MISSING-GLYPH"],L=[],A=[],O="",M=n.documentElement,_=L.indexOf||function(e){for(var t=this.length;t--&&this[t]!==e;);return t},D=r.prototype,P=D.hasOwnProperty,H=D.isPrototypeOf,B=r.defineProperty,j=[],F=r.getOwnPropertyDescriptor,I=r.getOwnPropertyNames,q=r.getPrototypeOf,R=r.setPrototypeOf,U=!!r.__proto__,z=!1,W="__dreCEv1",X=e.customElements,V=!/^force/.test(t.type)&&!!(X&&X.define&&X.get&&X.whenDefined),$=r.create||r,J=e.Map||function(){var t=[],n=[],r;return{get:function(e){return n[_.call(t,e)]},set:function(e,i){r=_.call(t,e),r<0?n[t.push(e)-1]=i:n[r]=i}}},K=e.Promise||function(e){function i(e){n=!0;while(t.length)t.shift()(e)}var t=[],n=!1,r={"catch":function(){return r},then:function(e){return t.push(e),n&&setTimeout(i,1),r}};return e(i),r},Q=!1,G=$(null),Y=$(null),Z=new J,et=function(e){return e.toLowerCase()},tt=r.create||function sn(e){return e?(sn.prototype=e,new sn):this},nt=R||(U?function(e,t){return e.__proto__=t,e}:I&&F?function(){function e(e,t){for(var n,r=I(t),i=0,s=r.length;i<s;i++)n=r[i],P.call(e,n)||B(e,n,F(t,n))}return function(t,n){do e(t,n);while((n=q(n))&&!H.call(n,t));return t}}():function(e,t){for(var n in t)e[n]=t[n];return e}),rt=e.MutationObserver||e.WebKitMutationObserver,it=(e.HTMLElement||e.Element||e.Node).prototype,st=!H.call(it,M),ot=st?function(e,t,n){return e[t]=n.value,e}:B,ut=st?function(e){return e.nodeType===1}:function(e){return H.call(it,e)},at=st&&[],ft=it.attachShadow,lt=it.cloneNode,ct=it.dispatchEvent,ht=it.getAttribute,pt=it.hasAttribute,dt=it.removeAttribute,vt=it.setAttribute,mt=n.createElement,gt=mt,yt=rt&&{attributes:!0,characterData:!0,attributeOldValue:!0},bt=rt||function(e){Nt=!1,M.removeEventListener(E,bt)},wt,Et=0,St=s in n&&!/^force-all/.test(t.type),xt=!0,Tt=!1,Nt=!0,Ct=!0,kt=!0,Lt,At,Ot,Mt,_t,Dt,Pt;St||(R||U?(Dt=function(e,t){H.call(t,e)||Xt(e,t)},Pt=Xt):(Dt=function(e,t){e[o]||(e[o]=r(!0),Xt(e,t))},Pt=Dt),st?(Nt=!1,function(){var e=F(it,u),t=e.value,n=function(e){var t=new CustomEvent(E,{bubbles:!0});t.attrName=e,t.prevValue=ht.call(this,e),t.newValue=null,t[w]=t.attrChange=2,dt.call(this,e),ct.call(this,t)},r=function(e,t){var n=pt.call(this,e),r=n&&ht.call(this,e),i=new CustomEvent(E,{bubbles:!0});vt.call(this,e,t),i.attrName=e,i.prevValue=n?r:null,i.newValue=t,n?i[b]=i.attrChange=1:i[y]=i.attrChange=0,ct.call(this,i)},i=function(e){var t=e.currentTarget,n=t[o],r=e.propertyName,i;n.hasOwnProperty(r)&&(n=n[r],i=new CustomEvent(E,{bubbles:!0}),i.attrName=n.name,i.prevValue=n.value||null,i.newValue=n.value=t[r]||null,i.prevValue==null?i[y]=i.attrChange=0:i[b]=i.attrChange=1,ct.call(t,i))};e.value=function(e,s,u){e===E&&this[h]&&this.setAttribute!==r&&(this[o]={className:{name:"class",value:this.className}},this.setAttribute=r,this.removeAttribute=n,t.call(this,"propertychange",i)),t.call(this,e,s,u)},B(it,u,e)}()):rt||(M[u](E,bt),M.setAttribute(o,1),M.removeAttribute(o),Nt&&(Lt=function(e){var t=this,n,r,i;if(t===e.target){n=t[o],t[o]=r=Ot(t);for(i in r){if(!(i in n))return At(0,t,i,n[i],r[i],y);if(r[i]!==n[i])return At(1,t,i,n[i],r[i],b)}for(i in n)if(!(i in r))return At(2,t,i,n[i],r[i],w)}},At=function(e,t,n,r,i,s){var o={attrChange:e,currentTarget:t,attrName:n,prevValue:r,newValue:i};o[s]=e,Rt(o)},Ot=function(e){for(var t,n,r={},i=e.attributes,s=0,o=i.length;s<o;s++)t=i[s],n=t.name,n!=="setAttribute"&&(r[n]=t.value);return r})),n[s]=function(t,r){p=t.toUpperCase(),xt&&(xt=!1,rt?(Mt=function(e,t){function n(e,t){for(var n=0,r=e.length;n<r;t(e[n++]));}return new rt(function(r){for(var i,s,o,u=0,a=r.length;u<a;u++)i=r[u],i.type==="childList"?(n(i.addedNodes,e),n(i.removedNodes,t)):(s=i.target,kt&&s[h]&&i.attributeName!=="style"&&(o=ht.call(s,i.attributeName),o!==i.oldValue&&s[h](i.attributeName,i.oldValue,o)))})}(Ft(a),Ft(l)),_t=function(e){return Mt.observe(e,{childList:!0,subtree:!0}),e},_t(n),ft&&(it.attachShadow=function(){return _t(ft.apply(this,arguments))})):(wt=[],n[u]("DOMNodeInserted",Ut(a)),n[u]("DOMNodeRemoved",Ut(l))),n[u](S,zt),n[u]("readystatechange",zt),it.cloneNode=function(e){var t=lt.call(this,!!e),n=It(t);return-1<n&&Pt(t,A[n]),e&&O.length&&jt(t.querySelectorAll(O)),t});if(Tt)return Tt=!1;-2<_.call(L,N+p)+_.call(L,T+p)&&$t(t);if(!C.test(p)||-1<_.call(k,p))throw new Error("The type "+t+" is invalid");var i=function(){return o?n.createElement(f,p):n.createElement(f)},s=r||D,o=P.call(s,c),f=o?r[c].toUpperCase():p,p,d;return o&&-1<_.call(L,T+f)&&$t(f),d=L.push((o?N:T)+p)-1,O=O.concat(O.length?",":"",o?f+'[is="'+t.toLowerCase()+'"]':f),i.prototype=A[d]=P.call(s,"prototype")?s.prototype:tt(it),O.length&&Bt(n.querySelectorAll(O),a),i},n.createElement=gt=function(e,t){var r=Yt(t),i=r?mt.call(n,e,et(r)):mt.call(n,e),s=""+e,o=_.call(L,(r?N:T)+(r||s).toUpperCase()),u=-1<o;return r&&(i.setAttribute("is",r=r.toLowerCase()),u&&(u=qt(s.toUpperCase(),r))),kt=!n.createElement.innerHTMLHelper,u&&Pt(i,A[o]),i}),Kt.prototype={constructor:Kt,define:V?function(e,t,n){if(n)Qt(e,t,n);else{var r=e.toUpperCase();G[r]={constructor:t,create:[r]},Z.set(t,r),X.define(e,t)}}:Qt,get:V?function(e){return X.get(e)||Gt(e)}:Gt,whenDefined:V?function(e){return K.race([X.whenDefined(e),en(e)])}:en};if(!X||/^force/.test(t.type))tn();else if(!t.noBuiltIn)try{(function(t,r,i){r[c]="a",t.prototype=tt(HTMLAnchorElement.prototype),t.prototype.constructor=t,e.customElements.define(i,t,r);if(ht.call(n.createElement("a",{is:i}),"is")!==i||V&&ht.call(new t,"is")!==i)throw r})(function on(){return Reflect.construct(HTMLAnchorElement,[],on)},{},"document-register-element-a")}catch(nn){tn()}if(!t.noBuiltIn)try{mt.call(n,"a","a")}catch(rn){et=function(e){return{is:e.toLowerCase()}}}})(window);
/*!
Element.closest and Element.matches
https://github.com/jonathantneal/closest
Creative Commons Zero v1.0 Universal
*/
(function(a){"function"!==typeof a.matches&&(a.matches=a.msMatchesSelector||a.mozMatchesSelector||a.webkitMatchesSelector||function(a){a=(this.document||this.ownerDocument).querySelectorAll(a);for(var b=0;a[b]&&a[b]!==this;)++b;return!!a[b]});"function"!==typeof a.closest&&(a.closest=function(a){for(var b=this;b&&1===b.nodeType;){if(b.matches(a))return b;b=b.parentNode}return null})})(window.Element.prototype);
/*!
Element.remove()
https://developer.mozilla.org/en-US/docs/Web/API/ChildNode/remove
*/
(function(b){b.forEach(function(a){a.hasOwnProperty("remove")||Object.defineProperty(a,"remove",{configurable:!0,enumerable:!0,writable:!0,value:function(){null!==this.parentNode&&this.parentNode.removeChild(this)}})})})([Element.prototype,CharacterData.prototype,DocumentType.prototype]);
/*!
Array.prototype.find
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find
*/
Array.prototype.find||Object.defineProperty(Array.prototype,"find",{writable:!0,configurable:!0,value:function(c,e){if(null==this)throw new TypeError('"this" is null or not defined');var b=Object(this),f=b.length>>>0;if("function"!==typeof c)throw new TypeError("predicate must be a function");for(var a=0;a<f;){var d=b[a];if(c.call(e,d,a,b))return d;a++}}});
/*!
Array.prototype.includes
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/includes
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
String.prototype.startsWith
*/
String.prototype.startsWith||Object.defineProperty(String.prototype,"startsWith",{writable:!0,configurable:!0,value:function(b,a){return this.substr(!a||0>a?0:+a,b.length)===b}});
/*!
String.prototype.endsWith
*/
String.prototype.endsWith||Object.defineProperty(String.prototype,"endsWith",{writable:!0,configurable:!0,value:function(b,a){if(void 0===a||a>this.length)a=this.length;return this.substring(a-b.length,a)===b}});
/*!
es6-promise - a tiny implementation of Promises/A+.
Copyright (c) 2014 Yehuda Katz, Tom Dale, Stefan Penner and contributors (Conversion to ES6 API by Jake Archibald)
Licensed under MIT license
See https://raw.githubusercontent.com/stefanpenner/es6-promise/master/LICENSE
v4.2.4+314e4831
*/
(window.ES6Promise=function(){function t(){var t=setTimeout;return function(){return t(r,1)}}function r(){for(var t=0;t<y;t+=2)(0,C[t])(C[t+1]),C[t]=void 0,C[t+1]=void 0;y=0}function e(t,r){var e=this,n=new this.constructor(o);void 0===n[O]&&_(n);var i=e._state;if(i){var s=arguments[i-1];g(function(){return v(i,n,s,e._result)})}else l(e,n,t,r);return n}function n(t){if(t&&"object"==typeof t&&t.constructor===this)return t;var r=new this(o);return u(r,t),r}function o(){}function i(t){try{return t.then}catch(t){return q.error=t,q}}function s(t,r,o){r.constructor===t.constructor&&o===e&&r.constructor.resolve===n?function(t,r){r._state===x?a(t,r._result):r._state===F?f(t,r._result):l(r,void 0,function(r){return u(t,r)},function(r){return f(t,r)})}(t,r):o===q?(f(t,q.error),q.error=null):void 0===o?a(t,r):"function"==typeof o?function(t,r,e){g(function(t){var n=!1,o=function(t,r,e,n){try{t.call(r,e,n)}catch(t){return t}}(e,r,function(e){n||(n=!0,r!==e?u(t,e):a(t,e))},function(r){n||(n=!0,f(t,r))},t._label);!n&&o&&(n=!0,f(t,o))},t)}(t,r,o):a(t,r)}function u(t,r){if(t===r)f(t,new TypeError("cannot resolve promise w/ itself"));else{var e=typeof r;null===r||"object"!==e&&"function"!==e?a(t,r):s(t,r,i(r))}}function c(t){t._onerror&&t._onerror(t._result),h(t)}function a(t,r){t._state===P&&(t._result=r,t._state=x,0!==t._subscribers.length&&g(h,t))}function f(t,r){t._state===P&&(t._state=F,t._result=r,g(c,t))}function l(t,r,e,n){var o=t._subscribers,i=o.length;t._onerror=null,o[i]=r,o[i+x]=e,o[i+F]=n,0===i&&t._state&&g(h,t)}function h(t){var r=t._subscribers,e=t._state;if(0!==r.length){for(var n,o,i=t._result,s=0;s<r.length;s+=3)n=r[s],o=r[s+e],n?v(e,n,o,i):o(i);t._subscribers.length=0}}function v(t,r,e,n){var o="function"==typeof e,i=void 0,s=void 0,c=void 0,l=void 0;if(o){try{i=e(n)}catch(t){q.error=t,i=q}if(i===q?(l=!0,s=i.error,i.error=null):c=!0,r===i)return void f(r,new TypeError("Cannot return same promise"))}else i=n,c=!0;r._state===P&&(o&&c?u(r,i):l?f(r,s):t===x?a(r,i):t===F&&f(r,i))}function _(t){t[O]=U++,t._state=void 0,t._result=void 0,t._subscribers=[]}var p,d=Array.isArray?Array.isArray:function(t){return"[object Array]"===Object.prototype.toString.call(t)},y=0,w=void 0,m=void 0,g=function(t,e){C[y]=t,C[y+1]=e,2===(y+=2)&&(m?m(r):T())},b=(p="undefined"!=typeof window?window:void 0)||{},A=b.MutationObserver||b.WebKitMutationObserver;b="undefined"==typeof self;var E,S,M,j="undefined"!=typeof Uint8ClampedArray&&"undefined"!=typeof importScripts&&"undefined"!=typeof MessageChannel,C=Array(1e3),T=void 0;T=A?(E=0,S=new A(r),M=document.createTextNode(""),S.observe(M,{characterData:!0}),function(){M.data=E=++E%2}):j?function(){var t=new MessageChannel;return t.port1.onmessage=r,function(){return t.port2.postMessage(0)}}():void 0===p&&"function"==typeof require?function(){try{var e=Function("return this")().require("vertx");return void 0!==(w=e.runOnLoop||e.runOnContext)?function(){w(r)}:t()}catch(r){return t()}}():t();var O=Math.random().toString(36).substring(2),P=void 0,x=1,F=2,q={error:null},U=0,D=function(){function t(t,r){this._instanceConstructor=t,this.promise=new t(o),this.promise[O]||_(this.promise),d(r)?(this._remaining=this.length=r.length,this._result=Array(this.length),0===this.length?a(this.promise,this._result):(this.length=this.length||0,this._enumerate(r),0===this._remaining&&a(this.promise,this._result))):f(this.promise,Error("Array Methods must be provided an Array"))}return t.prototype._enumerate=function(t){for(var r=0;this._state===P&&r<t.length;r++)this._eachEntry(t[r],r)},t.prototype._eachEntry=function(t,r){var u=this._instanceConstructor,c=u.resolve;c===n?(c=i(t))===e&&t._state!==P?this._settledAt(t._state,r,t._result):"function"!=typeof c?(this._remaining--,this._result[r]=t):u===K?(s(u=new u(o),t,c),this._willSettleAt(u,r)):this._willSettleAt(new u(function(r){return r(t)}),r):this._willSettleAt(c(t),r)},t.prototype._settledAt=function(t,r,e){var n=this.promise;n._state===P&&(this._remaining--,t===F?f(n,e):this._result[r]=e),0===this._remaining&&a(n,this._result)},t.prototype._willSettleAt=function(t,r){var e=this;l(t,void 0,function(t){return e._settledAt(x,r,t)},function(t){return e._settledAt(F,r,t)})},t}(),K=function(){function t(r){if(this[O]=U++,this._result=this._state=void 0,this._subscribers=[],o!==r){if("function"!=typeof r)throw new TypeError("Must pass a resolver fn as 1st arg");if(!(this instanceof t))throw new TypeError("Failed to construct 'Promise': Use the 'new' operator.");!function(t,r){try{r(function(r){u(t,r)},function(r){f(t,r)})}catch(r){f(t,r)}}(this,r)}}return t.prototype.catch=function(t){return this.then(null,t)},t.prototype.finally=function(t){var r=this.constructor;return this.then(function(e){return r.resolve(t()).then(function(){return e})},function(e){return r.resolve(t()).then(function(){throw e})})},t}();return K.prototype.then=e,K.all=function(t){return new D(this,t).promise},K.race=function(t){var r=this;return d(t)?new r(function(e,n){for(var o=t.length,i=0;i<o;i++)r.resolve(t[i]).then(e,n)}):new r(function(t,r){return r(new TypeError("Must pass array to race"))})},K.resolve=n,K.reject=function(t){var r=new this(o);return f(r,t),r},K._setScheduler=function(t){m=t},K._setAsap=function(t){g=t},K._asap=g,K.polyfill=function(){var t=void 0;if("undefined"!=typeof global)t=global;else if("undefined"!=typeof self)t=self;else try{t=Function("return this")()}catch(t){throw Error("polyfill failed")}var r=t.Promise;if(r){var e=null;try{e=Object.prototype.toString.call(r.resolve())}catch(t){}if("[object Promise]"===e&&!r.cast)return}t.Promise=K},K.Promise=K,K.polyfill(),K}());
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
/*! Built with http://stenciljs.com */
(function(Context,namespace,hydratedCssClass,resourcesUrl,s){"use strict";
s=document.querySelector("script[data-namespace='ionicons']");if(s){resourcesUrl=s.getAttribute('data-resources-url');}
this && this._$__extends$_ || (Object.setPrototypeOf || {
  __proto__: []
} instanceof Array && function(e, n) {
  e.__proto__ = n;
} || function(e, n) {
  for (var t in n) {
    n.hasOwnProperty(t) && (e[t] = n[t]);
  }
}), function(e, n, t, r) {
  "use strict";
  function initStyleTemplate(e, n, t) {
    var r = t.style;
    if (r) {
      // we got a style mode for this component, let's create an id for this style
      var o = t.is + (t.styleMode || a);
      n[o] || (
      // ie11's template polyfill doesn't fully do the trick and there's still issues
      // so instead of trying to clone templates with styles in them, we'll just
      // keep a map of the style text as a string to create <style> elements for es5 builds
      n[o] = r);
    }
  }
  function parseListenerData(e) {
    return {
      _$eventName$_: e[0],
      _$eventMethodName$_: e[1],
      _$eventDisabled$_: !!e[2],
      _$eventPassive$_: !!e[3],
      _$eventCapture$_: !!e[4]
    };
  }
  function parsePropertyValue(e, n) {
    // ensure this value is of the correct prop type
    // we're testing both formats of the "propType" value because
    // we could have either gotten the data from the attribute changed callback,
    // which wouldn't have Constructor data yet, and because this method is reused
    // within proxy where we don't have meta data, but only constructor data
    if (l(n) && "object" != typeof n && "function" != typeof n) {
      if (e === Boolean || 3 /* Boolean */ === e) {
        // per the HTML spec, any string value means it is a boolean true value
        // but we'll cheat here and say that the string "false" is the boolean false
        return "false" !== n && ("" === n || !!n);
      }
      if (e === Number || 4 /* Number */ === e) {
        // force it to be a number
        return parseFloat(n);
      }
      if (e === String || 2 /* String */ === e) {
        // could have been passed as a number or boolean
        // but we still want it as a string
        return n.toString();
      }
    }
    // not sure exactly what type we want
    // so no need to change to a different type
        return n;
  }
  function propagateComponentLoaded(e, n, t, r) {
    // load events fire from bottom to top
    // the deepest elements load first then bubbles up
    var o = e._$ancestorHostElementMap$_.get(n);
    o && (
    // ok so this element already has a known ancestor host element
    // let's make sure we remove this element from its ancestor's
    // known list of child elements which are actively loading
    (r = o["s-ld"] || o.$activeLoading) && ((t = r.indexOf(n)) > -1 && 
    // yup, this element is in the list of child elements to wait on
    // remove it so we can work to get the length down to 0
    r.splice(t, 1), 
    // the ancestor's initLoad method will do the actual checks
    // to see if the ancestor is actually loaded or not
    // then let's call the ancestor's initLoad method if there's no length
    // (which actually ends up as this method again but for the ancestor)
    r.length || (o["s-init"] && o["s-init"](), 
    // $initLoad deprecated 2018-04-02
    o.$initLoad && o.$initLoad())), e._$ancestorHostElementMap$_.delete(n));
  }
  /**
     * Production h() function based on Preact by
     * Jason Miller (@developit)
     * Licensed under the MIT License
     * https://github.com/developit/preact/blob/master/LICENSE
     *
     * Modified for Stencil's compiler and vdom
     */  function h(e, n, t) {
    for (var r, o, i = null, u = !1, a = !1, f = arguments.length; f-- > 2; ) {
      v.push(arguments[f]);
    }
    for (;v.length > 0; ) {
      if ((t = v.pop()) && void 0 !== t.pop) {
        for (f = t.length; f--; ) {
          v.push(t[f]);
        }
      } else {
        "boolean" == typeof t && (t = null), (a = "function" != typeof e) && (null == t ? t = "" : "number" == typeof t ? t = String(t) : "string" != typeof t && (a = !1)), 
        a && u ? i[i.length - 1]._$vtext$_ += t : null === i ? i = [ a ? {
          _$vtext$_: t
        } : t ] : i.push(a ? {
          _$vtext$_: t
        } : t), u = a;
      }
    }
    if (null != n) {
      if (
      // normalize class / classname attributes
      n.className && (n.class = n.className), "object" == typeof n.class) {
        for (f in n.class) {
          n.class[f] && v.push(f);
        }
        n.class = v.join(" "), v.length = 0;
      }
      null != n._$key$_ && (r = n._$key$_), null != n.name && (o = n.name);
    }
    return "function" == typeof e ? e(Object.assign({}, n, {
      children: i
    }), m) : {
      _$vtag$_: e,
      _$vchildren$_: i,
      _$vtext$_: void 0,
      _$vattrs$_: n,
      _$vkey$_: r,
      _$vname$_: o,
      _$elm$_: void 0,
      _$ishost$_: !1
    };
  }
  function convertCssNamesToObj(e, n, t, r) {
    n.split(" ").forEach(function(n) {
      e[n] = !0, t && (e[n + "-" + t] = !0, r && (e[n + "-" + t + "-" + r] = e[n + "-" + r] = !0));
    });
  }
  function queueUpdate(e, n) {
    // only run patch if it isn't queued already
    e._$isQueuedForUpdate$_.has(n) || (e._$isQueuedForUpdate$_.set(n, !0), 
    // run the patch in the next tick
    // vdom diff and patch the host element for differences
    e._$isAppLoaded$_ ? 
    // app has already loaded
    // let's queue this work in the dom write phase
    e.queue.write(function() {
      return update(e, n);
    }) : 
    // app hasn't finished loading yet
    // so let's use next tick to do everything
    // as fast as possible
    e.queue.tick(function() {
      return update(e, n);
    }));
  }
  function update(e, n, t, r, o, i) {
    // everything is async, so somehow we could have already disconnected
    // this node, so be sure to do nothing if we've already disconnected
    if (
    // no longer queued for update
    e._$isQueuedForUpdate$_.delete(n), !e._$isDisconnectedMap$_.has(n)) {
      if (r = e._$instanceMap$_.get(n), t = !r) {
        if ((o = e._$ancestorHostElementMap$_.get(n)) && o.$rendered && (
        // $rendered deprecated 2018-04-02
        o["s-rn"] = !0), o && !o["s-rn"]) {
          // this is the intial load
          // this element has an ancestor host element
          // but the ancestor host element has NOT rendered yet
          // so let's just cool our jets and wait for the ancestor to render
          return (o["s-rc"] = o["s-rc"] || []).push(function() {
            // this will get fired off when the ancestor host element
            // finally gets around to rendering its lazy self
            update(e, n);
          }), void (
          // $onRender deprecated 2018-04-02
          o.$onRender = o["s-rc"]);
        }
        // haven't created a component instance for this host element yet!
        // create the instance from the user's component class
        // https://www.youtube.com/watch?v=olLxrojmvMg
                r = function initComponentInstance(e, n, t, r, o, i, u) {
          try {
            // using the user's component class, let's create a new instance
            // ok cool, we've got an host element now, and a actual instance
            // and there were no errors creating the instance
            // let's upgrade the data on the host element
            // and let the getters/setters do their jobs
            (function proxyComponentInstance(e, n, t, r, o, i, u) {
              // define each of the members and initialize what their role is
              for (u in 
              // at this point we've got a specific node of a host element, and created a component class instance
              // and we've already created getters/setters on both the host element and component class prototypes
              // let's upgrade any data that might have been set on the host element already
              // and let's have the getters/setters kick in and do their jobs
              // let's automatically add a reference to the host element on the instance
              e._$hostElementMap$_.set(r, t), 
              // create the values object if it doesn't already exist
              // this will hold all of the internal getter/setter values
              e._$valuesMap$_.has(t) || e._$valuesMap$_.set(t, {}), 
              // always set mode
              (
              // get the properties from the constructor
              // and add default "mode" and "color" properties
              i = Object.assign({
                color: {
                  type: String
                }
              }, n.properties)).mode = {
                type: String
              }, i) {
                defineMember(e, i[u], t, r, u, o);
              }
            })(e, o = e._$getComponentMeta$_(n)._$componentConstructor$_, n, r = new o(), t);
          } catch (t) {
            // something done went wrong trying to create a component instance
            // create a dumby instance so other stuff can load
            // but chances are the app isn't fully working cuz this component has issues
            r = {}, e._$onError$_(t, 7 /* InitInstanceError */ , n, !0);
          }
          return e._$instanceMap$_.set(n, r), r;
        }(e, n, e._$hostSnapshotMap$_.get(n));
        // fire off the user's componentWillLoad method (if one was provided)
        // componentWillLoad only runs ONCE, after instance's element has been
        // assigned as the host element, but BEFORE render() has been called
        try {
          r.componentWillLoad && (i = r.componentWillLoad());
        } catch (t) {
          e._$onError$_(t, 3 /* WillLoadError */ , n);
        }
      }
      i && i.then ? 
      // looks like the user return a promise!
      // let's not actually kick off the render
      // until the user has resolved their promise
      i.then(function() {
        return renderUpdate(e, n, r, t);
      }) : 
      // user never returned a promise so there's
      // no need to wait on anything, let's do the render now my friend
      renderUpdate(e, n, r, t);
    }
  }
  function renderUpdate(e, n, t, r) {
    // if this component has a render function, let's fire
    // it off and generate a vnode for this
    (function render(e, n, t, r, o) {
      try {
        // if this component has a render function, let's fire
        // it off and generate the child vnodes for this host element
        // note that we do not create the host element cuz it already exists
        var i = n._$componentConstructor$_.host;
        if (r.render || r.hostData || i) {
          // tell the platform we're actively rendering
          // if a value is changed within a render() then
          // this tells the platform not to queue the change
          e._$activeRender$_ = !0;
          var u = r.render && r.render(), a = void 0;
          // user component provided a "hostData()" method
          // the returned data/attributes are used on the host element
          a = r.hostData && r.hostData(), 
          // tell the platform we're done rendering
          // now any changes will again queue
          e._$activeRender$_ = !1, i && (
          // component meta data has a "theme"
          // use this to automatically generate a good css class
          // from the mode and color to add to the host element
          a = function applyComponentHostData(e, n, t) {
            return e = e || {}, 
            // component meta data has a "theme"
            // use this to automatically generate a good css class
            // from the mode and color to add to the host element
            Object.keys(n).forEach(function(r) {
              "theme" === r ? 
              // host: { theme: 'button' }
              // adds css classes w/ mode and color combinations
              // class="button button-md button-primary button-md-primary"
              convertCssNamesToObj(e.class = e.class || {}, n[r], t.mode, t.color) : "class" === r ? 
              // host: { class: 'multiple css-classes' }
              // class="multiple css-classes"
              convertCssNamesToObj(e[r] = e[r] || {}, n[r]) : 
              // rando attribute/properties
              e[r] = n[r];
            }), e;
          }(a, i, r));
          // looks like we've got child nodes to render into this host element
          // or we need to update the css class/attrs on the host element
          // if we haven't already created a vnode, then we give the renderer the actual element
          // if this is a re-render, then give the renderer the last vnode we already created
          var f = e._$vnodeMap$_.get(t) || {};
          f._$elm$_ = t;
          var c = h(null, a, u);
          // each patch always gets a new vnode
          // the host element itself isn't patched because it already exists
          // kick off the actual render and any DOM updates
          e._$vnodeMap$_.set(t, e.render(f, c, o, n._$componentConstructor$_.encapsulation));
        }
        // attach the styles this component needs, if any
        // this fn figures out if the styles should go in a
        // shadow root or if they should be global
        e._$attachStyles$_(e, e._$domApi$_, n, r.mode, t), 
        // it's official, this element has rendered
        t["s-rn"] = !0, t.$onRender && (
        // $onRender deprecated 2018-04-02
        t["s-rc"] = t.$onRender), t["s-rc"] && (
        // ok, so turns out there are some child host elements
        // waiting on this parent element to load
        // let's fire off all update callbacks waiting
        t["s-rc"].forEach(function(e) {
          return e();
        }), t["s-rc"] = null);
      } catch (n) {
        e._$activeRender$_ = !1, e._$onError$_(n, 8 /* RenderError */ , t, !0);
      }
    })(e, e._$getComponentMeta$_(n), n, t, !r);
    try {
      r ? 
      // so this was the initial load i guess
      n["s-init"]() : callNodeRefs(e._$vnodeMap$_.get(n));
    } catch (t) {
      // derp
      e._$onError$_(t, 6 /* DidUpdateError */ , n, !0);
    }
  }
  function defineMember(e, n, t, r, o, i, u, a) {
    if (n.type || n.state) {
      var f = e._$valuesMap$_.get(t);
      n.state || (!n.attr || void 0 !== f[o] && "" !== f[o] || 
      // check the prop value from the host element attribute
      (u = i && i._$$attributes$_) && l(a = u[n.attr]) && (
      // looks like we've got an attribute value
      // let's set it to our internal values
      f[o] = parsePropertyValue(n.type, a)), 
      // client-side
      // within the browser, the element's prototype
      // already has its getter/setter set, but on the
      // server the prototype is shared causing issues
      // so instead the server's elm has the getter/setter
      // directly on the actual element instance, not its prototype
      // so on the browser we can use "hasOwnProperty"
      t.hasOwnProperty(o) && (
      // @Prop or @Prop({mutable:true})
      // property values on the host element should override
      // any default values on the component instance
      void 0 === f[o] && (f[o] = parsePropertyValue(n.type, t[o])), 
      // for the client only, let's delete its "own" property
      // this way our already assigned getter/setter on the prototype kicks in
      delete t[o])), r.hasOwnProperty(o) && void 0 === f[o] && (
      // @Prop() or @Prop({mutable:true}) or @State()
      // we haven't yet got a value from the above checks so let's
      // read any "own" property instance values already set
      // to our internal value as the source of getter data
      // we're about to define a property and it'll overwrite this "own" property
      f[o] = r[o]), n.watchCallbacks && (f[y + o] = n.watchCallbacks.slice()), 
      // add getter/setter to the component instance
      // these will be pointed to the internal data set from the above checks
      definePropertyGetterSetter(r, o, function getComponentProp(n) {
        // component instance prop/state getter
        // get the property value directly from our internal values
        return (n = e._$valuesMap$_.get(e._$hostElementMap$_.get(this))) && n[o];
      }, function setComponentProp(t, r) {
        // component instance prop/state setter (cannot be arrow fn)
        (r = e._$hostElementMap$_.get(this)) && (n.state || n.mutable) && setValue(e, r, o, t);
      });
    } else if (n.elementRef) {
      // @Element()
      // add a getter to the element reference using
      // the member name the component meta provided
      definePropertyValue(r, o, t);
    } else if (n.context) {
      // @Prop({ context: 'config' })
      var c = e._$getContextItem$_(n.context);
      void 0 !== c && definePropertyValue(r, o, c._$getContext$_ && c._$getContext$_(t) || c);
    }
  }
  function setValue(e, n, t, r, o, i, u) {
    (
    // get the internal values object, which should always come from the host element instance
    // create the _values object if it doesn't already exist
    o = e._$valuesMap$_.get(n)) || e._$valuesMap$_.set(n, o = {});
    var a = o[t];
    // check our new property value against our internal value
        if (r !== a && (
    // gadzooks! the property's value has changed!!
    // set our new value!
    // https://youtu.be/dFtLONl4cNc?t=22
    o[t] = r, i = e._$instanceMap$_.get(n))) {
      if (
      // get an array of method names of watch functions to call
      u = o[y + t]) {
        // this instance is watching for when this property changed
        for (var f = 0; f < u.length; f++) {
          try {
            // fire off each of the watch methods that are watching this property
            i[u[f]].call(i, r, a, t);
          } catch (e) {
            console.error(e);
          }
        }
      }
      !e._$activeRender$_ && n["s-rn"] && 
      // looks like this value actually changed, so we've got work to do!
      // but only if we've already rendered, otherwise just chill out
      // queue that we need to do an update, but don't worry about queuing
      // up millions cuz this function ensures it only runs once
      queueUpdate(e, n);
    }
  }
  function definePropertyValue(e, n, t) {
    // minification shortcut
    Object.defineProperty(e, n, {
      configurable: !0,
      value: t
    });
  }
  function definePropertyGetterSetter(e, n, t, r) {
    // minification shortcut
    Object.defineProperty(e, n, {
      configurable: !0,
      get: t,
      set: r
    });
  }
  function setAccessor(e, n, t, r, o, i, u, a, s) {
    if ("class" !== t || i) {
      if ("style" === t) {
        for (a in 
        // Style
        r = r || f, o = o || f, r) {
          o[a] || (n.style[a] = "");
        }
        for (a in o) {
          o[a] !== r[a] && (n.style[a] = o[a]);
        }
      } else if ("o" !== t[0] || "n" !== t[1] || !/[A-Z]/.test(t[2]) || t in n) {
        if ("list" !== t && "type" !== t && !i && (t in n || -1 !== [ "object", "function" ].indexOf(typeof o) && null !== o)) {
          // Properties
          // - list and type are attributes that get applied as values on the element
          // - all svgs get values as attributes not props
          // - check if elm contains name or if the value is array, object, or function
          var l = e._$getComponentMeta$_(n);
          l && l._$membersMeta$_ && l._$membersMeta$_[t] ? 
          // we know for a fact that this element is a known component
          // and this component has this member name as a property,
          // let's set the known @Prop on this element
          // set it directly as property on the element
          setProperty(n, t, o) : "ref" !== t && (
          // this member name is a property on this element, but it's not a component
          // this is a native property like "value" or something
          // also we can ignore the "ref" member name at this point
          setProperty(n, t, null == o ? "" : o), null != o && !1 !== o || n.removeAttribute(t));
        } else {
          null != o ? 
          // Element Attributes
          function updateAttribute(e, n, t) {
            var r = n !== (n = n.replace(/^xlink\:?/, "")), o = C[n];
            !o || t && "false" !== t ? "function" != typeof t && (o && (t = ""), r ? e.setAttributeNS(b, d(n), t) : e.setAttribute(n, t)) : r ? e.removeAttributeNS(b, d(n)) : e.removeAttribute(n);
          }(n, t, o) : !i || null != o && !1 !== o || 
          // remove svg attribute
          n.removeAttribute(t);
        }
      } else {
        // Event Handlers
        // so if the member name starts with "on" and the 3rd characters is
        // a capital letter, and it's not already a member on the element,
        // then we're assuming it's an event listener
        // standard event
        // the JSX attribute could have been "onMouseOver" and the
        // member name "onmouseover" is on the element's prototype
        // so let's add the listener "mouseover", which is all lowercased
        t = d(t) in n ? d(t.substring(2)) : d(t[2]) + t.substring(3), o ? o !== r && 
        // add listener
        e._$domApi$_._$$addEventListener$_(n, t, o) : 
        // remove listener
        e._$domApi$_._$$removeEventListener$_(n, t);
      }
    } else 
    // Class
    if (r !== o) {
      var p = null == r || "" === r ? c : r.trim().split(/\s+/), v = null == o || "" === o ? c : o.trim().split(/\s+/), h = null == n.className || "" === n.className ? c : n.className.trim().split(/\s+/);
      for (a = 0, s = p.length; a < s; a++) {
        -1 === v.indexOf(p[a]) && (h = h.filter(function(e) {
          return e !== p[a];
        }));
      }
      for (a = 0, s = v.length; a < s; a++) {
        -1 === p.indexOf(v[a]) && (h = h.concat([ v[a] ]));
      }
      n.className = h.join(" ");
    }
  }
  /**
     * Attempt to set a DOM property to the given value.
     * IE & FF throw for certain property-value combinations.
     */  function setProperty(e, n, t) {
    try {
      e[n] = t;
    } catch (e) {}
  }
  function updateElement(e, n, t, r, o) {
    // if the element passed in is a shadow root, which is a document fragment
    // then we want to be adding attrs/props to the shadow root's "host" element
    // if it's not a shadow root, then we add attrs/props to the same element
    var i = 11 /* DocumentFragment */ === t._$elm$_.nodeType && t._$elm$_.host ? t._$elm$_.host : t._$elm$_, u = n && n._$vattrs$_ || f, a = t._$vattrs$_ || f;
    // remove attributes no longer present on the vnode by setting them to undefined
    for (o in u) {
      a && null != a[o] || null == u[o] || setAccessor(e, i, o, u[o], void 0, r, t._$ishost$_);
    }
    // add new & update changed attributes
        for (o in a) {
      o in u && a[o] === ("value" === o || "checked" === o ? i[o] : u[o]) || setAccessor(e, i, o, u[o], a[o], r, t._$ishost$_);
    }
  }
  function createRendererPatch(e, n) {
    // createRenderer() is only created once per app
    // the patch() function which createRenderer() returned is the function
    // which gets called numerous times by each component
    function createElm(o, i, c, s, d, p, v, h, m) {
      if (h = i._$vchildren$_[c], t || (
      // remember for later we need to check to relocate nodes
      u = !0, "slot" === h._$vtag$_ && (r && 
      // scoped css needs to add its scoped id to the parent element
      n._$$setAttribute$_(s, r + "-slot", ""), h._$vchildren$_ ? 
      // slot element has fallback content
      // still create an element that "mocks" the slot element
      h._$isSlotFallback$_ = !0 : 
      // slot element does not have fallback content
      // create an html comment we'll use to always reference
      // where actual slot content should sit next to
      h._$isSlotReference$_ = !0)), l(h._$vtext$_)) {
        // create text node
        h._$elm$_ = n._$$createTextNode$_(h._$vtext$_);
      } else if (h._$isSlotReference$_) {
        // create a slot reference html text node
        h._$elm$_ = n._$$createTextNode$_("");
      } else {
        if (
        // create element
        p = h._$elm$_ = g || "svg" === h._$vtag$_ ? n._$$createElementNS$_("http://www.w3.org/2000/svg", h._$vtag$_) : n._$$createElement$_(h._$isSlotFallback$_ ? "slot-fb" : h._$vtag$_), 
        g = "svg" === h._$vtag$_ || "foreignObject" !== h._$vtag$_ && g, 
        // add css classes, attrs, props, listeners, etc.
        updateElement(e, null, h, g), l(r) && p["s-si"] !== r && 
        // if there is a scopeId and this is the initial render
        // then let's add the scopeId as an attribute
        n._$$setAttribute$_(p, p["s-si"] = r, ""), h._$vchildren$_) {
          for (d = 0; d < h._$vchildren$_.length; ++d) {
            // create the node
            // return node could have been null
            (v = createElm(o, h, d, p)) && 
            // append our new node
            n._$$appendChild$_(p, v);
          }
        }
        "svg" === h._$vtag$_ && (
        // Only reset the SVG context when we're exiting SVG element
        g = !1);
      }
      return h._$elm$_["s-hn"] = a, (h._$isSlotFallback$_ || h._$isSlotReference$_) && (
      // remember the content reference comment
      h._$elm$_["s-sr"] = !0, 
      // remember the content reference comment
      h._$elm$_["s-cr"] = f, 
      // remember the slot name, or empty string for default slot
      h._$elm$_["s-sn"] = h._$vname$_ || "", (
      // check if we've got an old vnode for this slot
      m = o && o._$vchildren$_ && o._$vchildren$_[c]) && m._$vtag$_ === h._$vtag$_ && o._$elm$_ && 
      // we've got an old slot vnode and the wrapper is being replaced
      // so let's move the old slot content back to it's original location
      putBackInOriginalLocation(o._$elm$_)), h._$elm$_;
    }
    function putBackInOriginalLocation(t, r, o, i) {
      e._$tmpDisconnected$_ = !0;
      var f = n._$$childNodes$_(t);
      for (o = f.length - 1; o >= 0; o--) {
        (i = f[o])["s-hn"] !== a && i["s-ol"] && (
        // this child node in the old element is from another component
        // remove this node from the old slot's parent
        n._$$remove$_(i), 
        // and relocate it back to it's original location
        n._$$insertBefore$_(parentReferenceNode(i), i, referenceNode(i)), 
        // remove the old original location comment entirely
        // later on the patch function will know what to do
        // and move this to the correct spot in need be
        n._$$remove$_(i["s-ol"]), i["s-ol"] = null, u = !0), r && putBackInOriginalLocation(i, r);
      }
      e._$tmpDisconnected$_ = !1;
    }
    function addVnodes(e, t, r, o, i, u, a, f) {
      // $defaultHolder deprecated 2018-04-02
      var c = e["s-cr"] || e.$defaultHolder;
      for ((a = c && n._$$parentNode$_(c) || e).shadowRoot && (a = a.shadowRoot); i <= u; ++i) {
        o[i] && (f = l(o[i]._$vtext$_) ? n._$$createTextNode$_(o[i]._$vtext$_) : createElm(null, r, i, e)) && (o[i]._$elm$_ = f, 
        n._$$insertBefore$_(a, f, referenceNode(t)));
      }
    }
    function removeVnodes(e, t, r, o) {
      for (;t <= r; ++t) {
        l(e[t]) && (o = e[t]._$elm$_, 
        // we're removing this element
        // so it's possible we need to show slot fallback content now
        i = !0, o["s-ol"] ? 
        // remove the original location comment
        n._$$remove$_(o["s-ol"]) : 
        // it's possible that child nodes of the node
        // that's being removed are slot nodes
        putBackInOriginalLocation(o, !0), 
        // remove the vnode's element from the dom
        n._$$remove$_(o));
      }
    }
    function isSameVnode(e, n) {
      // compare if two vnode to see if they're "technically" the same
      // need to have the same element tag, and same key to be the same
      return e._$vtag$_ === n._$vtag$_ && e._$vkey$_ === n._$vkey$_ && ("slot" !== e._$vtag$_ || e._$vname$_ === n._$vname$_);
    }
    function referenceNode(e) {
      return e && e["s-ol"] ? e["s-ol"] : e;
    }
    function parentReferenceNode(e) {
      return n._$$parentNode$_(e["s-ol"] ? e["s-ol"] : e);
    }
    var t, r, o, i, u, a, f, c = [];
    return function patch(t, s, d, p, v, h, m, y, C) {
      if (
      // patchVNode() is synchronous
      // so it is safe to set these variables and internally
      // the same patch() call will reference the same data
      o = d, a = n._$$tagName$_(t._$elm$_), f = t._$elm$_["s-cr"], 
      // get the scopeId
      r = "scoped" === p || "shadow" === p && !n._$$supportsShadowDom$_ ? "data-" + n._$$tagName$_(t._$elm$_) : null, 
      // always reset
      u = i = !1, o || r && 
      // this host element should use scoped css
      // add the scope attribute to the host
      n._$$setAttribute$_(t._$elm$_, r + "-host", ""), 
      // synchronous patch
      function patchVNode(t, r, o) {
        var i = r._$elm$_ = t._$elm$_, u = t._$vchildren$_, a = r._$vchildren$_;
        // test if we're rendering an svg element, or still rendering nodes inside of one
        // only add this to the when the compiler sees we're using an svg somewhere
        g = r._$elm$_ && l(n._$$parentElement$_(r._$elm$_)) && void 0 !== r._$elm$_.ownerSVGElement, 
        g = "svg" === r._$vtag$_ || "foreignObject" !== r._$vtag$_ && g, l(r._$vtext$_) ? (o = i["s-cr"] || i.$defaultHolder /* $defaultHolder deprecated 2018-04-02 */) ? 
        // this element has slotted content
        n._$$setTextContent$_(n._$$parentNode$_(o), r._$vtext$_) : t._$vtext$_ !== r._$vtext$_ && 
        // update the text content for the text only vnode
        // and also only if the text is different than before
        n._$$setTextContent$_(i, r._$vtext$_) : (
        // element node
        "slot" !== r._$vtag$_ && 
        // either this is the first render of an element OR it's an update
        // AND we already know it's possible it could have changed
        // this updates the element's css classes, attrs, props, listeners, etc.
        updateElement(e, t, r, g), l(u) && l(a) ? 
        // looks like there's child vnodes for both the old and new vnodes
        function updateChildren(e, t, r, o, i, u, a, f) {
          for (var c = 0, s = 0, d = t.length - 1, p = t[0], v = t[d], h = o.length - 1, m = o[0], y = o[h]; c <= d && s <= h; ) {
            if (null == p) {
              // Vnode might have been moved left
              p = t[++c];
            } else if (null == v) {
              v = t[--d];
            } else if (null == m) {
              m = o[++s];
            } else if (null == y) {
              y = o[--h];
            } else if (isSameVnode(p, m)) {
              patchVNode(p, m), p = t[++c], m = o[++s];
            } else if (isSameVnode(v, y)) {
              patchVNode(v, y), v = t[--d], y = o[--h];
            } else if (isSameVnode(p, y)) {
              // Vnode moved right
              "slot" !== p._$vtag$_ && "slot" !== y._$vtag$_ || putBackInOriginalLocation(n._$$parentNode$_(p._$elm$_)), 
              patchVNode(p, y), n._$$insertBefore$_(e, p._$elm$_, n._$$nextSibling$_(v._$elm$_)), 
              p = t[++c], y = o[--h];
            } else if (isSameVnode(v, m)) {
              // Vnode moved left
              "slot" !== p._$vtag$_ && "slot" !== y._$vtag$_ || putBackInOriginalLocation(n._$$parentNode$_(v._$elm$_)), 
              patchVNode(v, m), n._$$insertBefore$_(e, v._$elm$_, p._$elm$_), v = t[--d], m = o[++s];
            } else {
              for (
              // createKeyToOldIdx
              i = null, u = c; u <= d; ++u) {
                if (t[u] && l(t[u]._$vkey$_) && t[u]._$vkey$_ === m._$vkey$_) {
                  i = u;
                  break;
                }
              }
              l(i) ? ((f = t[i])._$vtag$_ !== m._$vtag$_ ? a = createElm(t && t[s], r, i, e) : (patchVNode(f, m), 
              t[i] = void 0, a = f._$elm$_), m = o[++s]) : (
              // new element
              a = createElm(t && t[s], r, s, e), m = o[++s]), a && n._$$insertBefore$_(parentReferenceNode(p._$elm$_), a, referenceNode(p._$elm$_));
            }
          }
          c > d ? addVnodes(e, null == o[h + 1] ? null : o[h + 1]._$elm$_, r, o, s, h) : s > h && removeVnodes(t, c, d);
        }(i, u, r, a) : l(a) ? (
        // no old child vnodes, but there are new child vnodes to add
        l(t._$vtext$_) && 
        // the old vnode was text, so be sure to clear it out
        n._$$setTextContent$_(i, ""), 
        // add the new vnode children
        addVnodes(i, null, r, a, 0, a.length - 1)) : l(u) && 
        // no new child vnodes, but there are old child vnodes to remove
        removeVnodes(u, 0, u.length - 1)), 
        // reset svgMode when svg node is fully patched
        g && "svg" === r._$vtag$_ && (g = !1);
      }(t, s), u) {
        for (function relocateSlotContent(e, t, r, o, u, a, f, s, l, d) {
          for (u = 0, a = (t = n._$$childNodes$_(e)).length; u < a; u++) {
            if ((r = t[u])["s-sr"] && (o = r["s-cr"])) {
              for (
              // first got the content reference comment node
              // then we got it's parent, which is where all the host content is in now
              s = n._$$childNodes$_(n._$$parentNode$_(o)), l = r["s-sn"], f = s.length - 1; f >= 0; f--) {
                (o = s[f])["s-cn"] || o["s-nr"] || o["s-hn"] === r["s-hn"] || ((3 /* TextNode */ === (
                // let's do some relocating to its new home
                // but never relocate a content reference node
                // that is suppose to always represent the original content location
                d = n._$$nodeType$_(o)) || 8 /* CommentNode */ === d) && "" === l || 1 /* ElementNode */ === d && null === n._$$getAttribute$_(o, "slot") && "" === l || 1 /* ElementNode */ === d && n._$$getAttribute$_(o, "slot") === l) && (
                // it's possible we've already decided to relocate this node
                c.some(function(e) {
                  return e._$nodeToRelocate$_ === o;
                }) || (
                // made some changes to slots
                // let's make sure we also double check
                // fallbacks are correctly hidden or shown
                i = !0, o["s-sn"] = l, 
                // add to our list of nodes to relocate
                c.push({
                  _$slotRefNode$_: r,
                  _$nodeToRelocate$_: o
                })));
              }
            }
            1 /* ElementNode */ === n._$$nodeType$_(r) && relocateSlotContent(r);
          }
        }
        // internal variables to be reused per patch() call
        (s._$elm$_), h = 0; h < c.length; h++) {
          (m = c[h])._$nodeToRelocate$_["s-ol"] || (
          // add a reference node marking this node's original location
          // keep a reference to this node for later lookups
          (y = n._$$createTextNode$_(""))["s-nr"] = m._$nodeToRelocate$_, n._$$insertBefore$_(n._$$parentNode$_(m._$nodeToRelocate$_), m._$nodeToRelocate$_["s-ol"] = y, m._$nodeToRelocate$_));
        }
        // while we're moving nodes around existing nodes, temporarily disable
        // the disconnectCallback from working
                for (e._$tmpDisconnected$_ = !0, h = 0; h < c.length; h++) {
          m = c[h];
          // by default we're just going to insert it directly
          // after the slot reference node
          var b = n._$$parentNode$_(m._$slotRefNode$_), S = n._$$nextSibling$_(m._$slotRefNode$_);
          for (y = m._$nodeToRelocate$_["s-ol"]; y = n._$$previousSibling$_(y); ) {
            if ((C = y["s-nr"]) && C["s-sn"] === m._$nodeToRelocate$_["s-sn"] && b === n._$$parentNode$_(C)) {
              S = n._$$nextSibling$_(C);
              break;
            }
          }
          (!S && b !== n._$$parentNode$_(m._$nodeToRelocate$_) || n._$$nextSibling$_(m._$nodeToRelocate$_) !== S) && m._$nodeToRelocate$_ !== S && (
          // remove the node from the dom
          n._$$remove$_(m._$nodeToRelocate$_), 
          // add it back to the dom but in its new home
          n._$$insertBefore$_(b, m._$nodeToRelocate$_, S));
        }
        // done moving nodes around
        // allow the disconnect callback to work again
                e._$tmpDisconnected$_ = !1;
      }
      // return our new vnode
      return i && function updateFallbackSlotVisibility(e, t, r, o, i, u, a, f) {
        for (o = 0, i = (r = n._$$childNodes$_(e)).length; o < i; o++) {
          if (t = r[o], 1 /* ElementNode */ === n._$$nodeType$_(t)) {
            if (t["s-sr"]) {
              for (
              // this is a slot fallback node
              // get the slot name for this slot reference node
              a = t["s-sn"], 
              // by default always show a fallback slot node
              // then hide it if there are other slots in the light dom
              t.hidden = !1, u = 0; u < i; u++) {
                if (r[u]["s-hn"] !== t["s-hn"]) {
                  if (
                  // this sibling node is from a different component
                  f = n._$$nodeType$_(r[u]), "" !== a) {
                    // this is a named fallback slot node
                    if (1 /* ElementNode */ === f && a === n._$$getAttribute$_(r[u], "slot")) {
                      t.hidden = !0;
                      break;
                    }
                  } else 
                  // this is a default fallback slot node
                  // any element or text node (with content)
                  // should hide the default fallback slot node
                  if (1 /* ElementNode */ === f || 3 /* TextNode */ === f && "" !== n._$$getTextContent$_(r[u]).trim()) {
                    t.hidden = !0;
                    break;
                  }
                }
              }
            }
            // keep drilling down
                        updateFallbackSlotVisibility(t);
          }
        }
      }(s._$elm$_), 
      // always reset
      c.length = 0, s;
    };
  }
  function callNodeRefs(e, n) {
    e && (e._$vattrs$_ && e._$vattrs$_.ref && e._$vattrs$_.ref(n ? null : e._$elm$_), 
    e._$vchildren$_ && e._$vchildren$_.forEach(function(e) {
      callNodeRefs(e, n);
    }));
  }
  function addChildSsrVNodes(e, n, t, r, o) {
    var i, a, f, c, s = e._$$nodeType$_(n);
    if (o && 1 /* ElementNode */ === s) {
      (a = e._$$getAttribute$_(n, u)) && (
      // split the start comment's data with a period
      f = a.split("."))[0] === r && (
      // cool, this element is a child to the parent vnode
      (c = {})._$vtag$_ = e._$$tagName$_(c._$elm$_ = n), 
      // this is a new child vnode
      // so ensure its parent vnode has the vchildren array
      t._$vchildren$_ || (t._$vchildren$_ = []), 
      // add our child vnode to a specific index of the vnode's children
      t._$vchildren$_[f[1]] = c, 
      // this is now the new parent vnode for all the next child checks
      t = c, 
      // if there's a trailing period, then it means there aren't any
      // more nested elements, but maybe nested text nodes
      // either way, don't keep walking down the tree after this next call
      o = "" !== f[2]);
      // keep drilling down through the elements
            for (var l = 0; l < n.childNodes.length; l++) {
        addChildSsrVNodes(e, n.childNodes[l], t, r, o);
      }
    } else {
      3 /* TextNode */ === s && (i = n.previousSibling) && 8 /* CommentNode */ === e._$$nodeType$_(i) && "s" === (
      // split the start comment's data with a period
      f = e._$$getTextContent$_(i).split("."))[0] && f[1] === r && (
      // cool, this is a text node and it's got a start comment
      (c = {
        _$vtext$_: e._$$getTextContent$_(n)
      })._$elm$_ = n, 
      // this is a new child vnode
      // so ensure its parent vnode has the vchildren array
      t._$vchildren$_ || (t._$vchildren$_ = []), 
      // add our child vnode to a specific index of the vnode's children
      t._$vchildren$_[f[2]] = c);
    }
  }
  function initHostSnapshot(e, n, t, r, o) {
    // host element has been connected to the DOM
    return t["s-cr"] || e._$$getAttribute$_(t, i) || function useShadowDom(e, n) {
      return e && 1 /* ShadowDom */ === n.encapsulation;
    }(e._$$supportsShadowDom$_, n) || (
    // only required when we're NOT using native shadow dom (slot)
    // this host element was NOT created with SSR
    // let's pick out the inner content for slot projection
    // create a node to represent where the original
    // content was first placed, which is useful later on
    t["s-cr"] = e._$$createTextNode$_(""), t["s-cr"]["s-cn"] = !0, e._$$insertBefore$_(t, t["s-cr"], e._$$childNodes$_(t)[0])), 
    e._$$supportsShadowDom$_ || 1 /* ShadowDom */ !== n.encapsulation || (t.shadowRoot = t), 
    r = {
      _$$id$_: t["s-id"],
      _$$attributes$_: {}
    }, n._$membersMeta$_ && Object.keys(n._$membersMeta$_).forEach(function(i) {
      (o = n._$membersMeta$_[i]._$attribName$_) && (r._$$attributes$_[o] = e._$$getAttribute$_(t, o));
    }), r;
  }
  function initHostElement(e, n, t, r) {
    // let's wire up our functions to the host element's prototype
    // we can also inject our platform into each one that needs that api
    // note: these cannot be arrow functions cuz "this" is important here hombre
    t.connectedCallback = function() {
      // coolsville, our host element has just hit the DOM
      (function connectedCallback(e, n, t) {
        // this element just connected, which may be re-connecting
        // ensure we remove it from our map of disconnected
        e._$isDisconnectedMap$_.delete(t), e._$hasConnectedMap$_.has(t) || (
        // first time we've connected
        e._$hasConnectedMap$_.set(t, !0), t["s-id"] || (
        // assign a unique id to this host element
        // it's possible this was already given an element id
        t["s-id"] = e._$nextId$_()), 
        // register this component as an actively
        // loading child to its parent component
        function registerWithParentComponent(e, n, t) {
          for (
          // find the first ancestor host element (if there is one) and register
          // this element as one of the actively loading child elements for its ancestor
          t = n; t = e._$domApi$_._$$parentElement$_(t); ) {
            // climb up the ancestors looking for the first registered component
            if (e._$isDefinedComponent$_(t)) {
              // we found this elements the first ancestor host element
              // if the ancestor already loaded then do nothing, it's too late
              e._$hasLoadedMap$_.has(n) || (
              // keep a reference to this element's ancestor host element
              // elm._ancestorHostElement = ancestorHostElement;
              e._$ancestorHostElementMap$_.set(n, t), 
              // ensure there is an array to contain a reference to each of the child elements
              // and set this element as one of the ancestor's child elements it should wait on
              t.$activeLoading && (
              // $activeLoading deprecated 2018-04-02
              t["s-ld"] = t.$activeLoading), (t["s-ld"] = t["s-ld"] || []).push(n));
              break;
            }
          }
        }(e, t), 
        // add to the queue to load the bundle
        // it's important to have an async tick in here so we can
        // ensure the "mode" attribute has been added to the element
        // place in high priority since it's not much work and we need
        // to know as fast as possible, but still an async tick in between
        e.queue.tick(function() {
          // start loading this component mode's bundle
          // if it's already loaded then the callback will be synchronous
          return e._$requestBundle$_(n, t, initHostSnapshot(e._$domApi$_, n, t));
        }));
      })(e, n, this);
    }, t.attributeChangedCallback = function(e, t, r) {
      // the browser has just informed us that an attribute
      // on the host element has changed
      (function attributeChangedCallback(e, n, t, r, o, i, u) {
        // only react if the attribute values actually changed
        if (e && r !== o) {
          // using the known component meta data
          // look up to see if we have a property wired up to this attribute name
          for (i in e) {
            // normalize the attribute name w/ lower case
            if ((u = e[i])._$attribName$_ && d(u._$attribName$_) === d(t)) {
              // cool we've got a prop using this attribute name, the value will
              // be a string, so let's convert it to the correct type the app wants
              n[i] = parsePropertyValue(u._$propType$_, o);
              break;
            }
          }
        }
      })(n._$membersMeta$_, this, e, t, r);
    }, t.disconnectedCallback = function() {
      // the element has left the builing
      (function disconnectedCallback(e, n, t) {
        // only disconnect if we're not temporarily disconnected
        // tmpDisconnected will happen when slot nodes are being relocated
        !e._$tmpDisconnected$_ && function isDisconnected(e, n) {
          for (;n; ) {
            if (!e._$$parentNode$_(n)) {
              return 9 /* DocumentNode */ !== e._$$nodeType$_(n);
            }
            n = e._$$parentNode$_(n);
          }
        }(e._$domApi$_, n) && (
        // ok, let's officially destroy this thing
        // set this to true so that any of our pending async stuff
        // doesn't continue since we already decided to destroy this node
        // elm._hasDestroyed = true;
        e._$isDisconnectedMap$_.set(n, !0), 
        // double check that we've informed the ancestor host elements
        // that they're good to go and loaded (cuz this one is on its way out)
        propagateComponentLoaded(e, n), 
        // since we're disconnecting, call all of the JSX ref's with null
        callNodeRefs(e._$vnodeMap$_.get(n), !0), 
        // detatch any event listeners that may have been added
        // because we're not passing an exact event name it'll
        // remove all of this element's event, which is good
        e._$domApi$_._$$removeEventListener$_(n), e._$hasListenersMap$_.delete(n), 
        // clear any references to other elements
        // more than likely we've already deleted these references
        // but let's double check there pal
        [ e._$ancestorHostElementMap$_, e._$onReadyCallbacksMap$_, e._$hostSnapshotMap$_ ].forEach(function(e) {
          return e.delete(n);
        }));
      })(e, this);
    }, t["s-init"] = function() {
      (function initComponentLoaded(e, n, t, r, o) {
        if (function allChildrenHaveConnected(e, n) {
          // Note: in IE11 <svg> does not have the "children" property
          for (var t = 0; t < n.childNodes.length; t++) {
            if (1 /* ElementNode */ === n.childNodes[t].nodeType) {
              if (e._$getComponentMeta$_(n.childNodes[t]) && !e._$hasConnectedMap$_.has(n.childNodes[t])) {
                // this is a defined componnent
                // but it hasn't connected yet
                return !1;
              }
              if (!allChildrenHaveConnected(e, n.childNodes[t])) {
                // one of the defined child components hasn't connected yet
                return !1;
              }
            }
          }
          // everything has connected, we're good
                    return !0;
        }(e, n) && !e._$hasLoadedMap$_.has(n) && e._$instanceMap$_.get(n) && !e._$isDisconnectedMap$_.has(n) && (!n["s-ld"] || !n["s-ld"].length)) {
          // cool, so at this point this element isn't already being destroyed
          // and it does not have any child elements that are still loading
          // ensure we remove any child references cuz it doesn't matter at this point
          delete n["s-ld"], 
          // sweet, this particular element is good to go
          // all of this element's children have loaded (if any)
          // elm._hasLoaded = true;
          e._$hasLoadedMap$_.set(n, !0);
          try {
            // fire off the ref if it exists
            callNodeRefs(e._$vnodeMap$_.get(n)), 
            // fire off the user's elm.componentOnReady() callbacks that were
            // put directly on the element (well before anything was ready)
            (o = e._$onReadyCallbacksMap$_.get(n)) && (o.forEach(function(e) {
              return e(n);
            }), e._$onReadyCallbacksMap$_.delete(n));
          } catch (t) {
            e._$onError$_(t, 4 /* DidLoadError */ , n);
          }
          // add the css class that this element has officially hydrated
                    n.classList.add(t), 
          // ( •_•)
          // ( •_•)>⌐■-■
          // (⌐■_■)
          // load events fire from bottom to top
          // the deepest elements load first then bubbles up
          propagateComponentLoaded(e, n);
        }
        // all is good, this component has been told it's time to finish loading
        // it's possible that we've already decided to destroy this element
        // check if this element has any actively loading child elements
            })(e, this, r);
    }, t.forceUpdate = function() {
      queueUpdate(e, this);
    }, 
    // add getters/setters to the host element members
    // these would come from the @Prop and @Method decorators that
    // should create the public API to this component
    function proxyHostElementPrototype(e, n, t) {
      n && Object.keys(n).forEach(function(r) {
        // add getters/setters
        var o = n[r], i = o._$memberType$_;
        1 /* Prop */ === i || 2 /* PropMutable */ === i ? 
        // @Prop() or @Prop({ mutable: true })
        definePropertyGetterSetter(t, r, function getHostElementProp() {
          // host element getter (cannot be arrow fn)
          // yup, ugly, srynotsry
          return (e._$valuesMap$_.get(this) || {})[r];
        }, function setHostElementProp(n) {
          // host element setter (cannot be arrow fn)
          setValue(e, this, r, parsePropertyValue(o._$propType$_, n));
        }) : 6 /* Method */ === i && 
        // @Method()
        // add a placeholder noop value on the host element's prototype
        // incase this method gets called before setup
        definePropertyValue(t, r, p);
      });
    }(e, n._$membersMeta$_, t);
  }
  function proxyProp(e, n, t, r) {
    return function() {
      var o = arguments;
      return function loadComponent(e, n, t) {
        return new Promise(function(r) {
          var o = n[t];
          o || (o = e._$$body$_.querySelector(t)), o || (o = n[t] = e._$$createElement$_(t), 
          e._$$appendChild$_(e._$$body$_, o)), o.componentOnReady(r);
        });
      }(e, n, t).then(function(e) {
        return e[r].apply(e, o);
      });
    };
  }
  function loadLinkStyles(e, n, t) {
    var r = t.href;
    return fetch(r).then(function(e) {
      return e.text();
    }).then(function(o) {
      if (function hasCssVariables(e) {
        return e.indexOf("var(") > -1 || S.test(e);
      }
      // This regexp find all url() usages with relative urls
      (o)) {
        var i = e.createElement("style");
        return function hasRelativeUrls(e) {
          return k.test(e);
        }(o) && (o = function fixRelativeUrls(e, n) {
          // get the basepath from the original import url
          var t = n.replace(/[^/]*$/, "");
          // replace the relative url, with the new relative url
                    return e.replace(k, function(e, n) {
            // rhe new relative path is the base path + uri
            // TODO: normalize relative URL
            var r = t + n;
            return e.replace(n, r);
          });
        }
        /*
    Extremely simple css parser. Intended to be not more than what we need
    and definitely not necessarily correct =).
    */
        /* tslint:disable */ (o, r)), i.innerHTML = o, t.parentNode.insertBefore(i, t), 
        n._$addStyle$_(i).then(function() {
          t.parentNode.removeChild(t);
        });
      }
      return Promise.resolve();
    }).catch(function(e) {
      console.error(e);
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
    // given a string of css, return a simple rule tree
  function parse(e) {
    // add selectors/cssText to node tree
    return function parseCss(e, n) {
      var t = n.substring(e._$start$_, e._$end$_ - 1);
      if (e._$parsedCssText$_ = e._$cssText$_ = t.trim(), e._$parent$_) {
        var r = e._$previous$_ ? e._$previous$_._$end$_ : e._$parent$_._$start$_;
        t = (t = (t = 
        /**
     * conversion of sort unicode escapes with spaces like `\33 ` (and longer) into
     * expanded form that doesn't require trailing space `\000033`
     */
        function _expandUnicodeEscapes(e) {
          return e.replace(/\\([0-9a-f]{1,6})\s/gi, function() {
            for (var e = arguments[1], n = 6 - e.length; n--; ) {
              e = "0" + e;
            }
            return "\\" + e;
          });
        }
        /**
     * stringify parsed css.
     */ (t = n.substring(r, e._$start$_ - 1))).replace(j, " ")).substring(t.lastIndexOf(";") + 1);
        var o = e._$parsedSelector$_ = e._$selector$_ = t.trim();
        e._$atRule$_ = 0 === o.indexOf(R), 
        // note, support a subset of rule types...
        e._$atRule$_ ? 0 === o.indexOf(x) ? e.type = 4 /* MEDIA_RULE */ : o.match(O) && (e.type = 7 /* KEYFRAMES_RULE */ , 
        e._$keyframesName$_ = e._$selector$_.split(j).pop()) : 0 === o.indexOf(B) ? e.type = 1e3 /* MIXIN_RULE */ : e.type = 1 /* STYLE_RULE */;
      }
      var i = e._$rules$_;
      if (i) {
        for (var u = 0, a = i.length, f = void 0; u < a && (f = i[u]); u++) {
          parseCss(f, n);
        }
      }
      return e;
    }(
    // super simple {...} lexer that returns a node tree
    function lex(e) {
      var n = new P();
      n._$start$_ = 0, n._$end$_ = e.length;
      for (var t = n, r = 0, o = e.length; r < o; r++) {
        if (e[r] === M) {
          t._$rules$_ || (t._$rules$_ = []);
          var i = t, u = i._$rules$_[i._$rules$_.length - 1] || null;
          (t = new P())._$start$_ = r + 1, t._$parent$_ = i, t._$previous$_ = u, i._$rules$_.push(t);
        } else {
          e[r] === N && (t._$end$_ = r + 1, t = t._$parent$_ || n);
        }
      }
      return n;
    }(e = 
    // remove stuff we don't care about that may hinder parsing
    function clean(e) {
      return e.replace(V, "").replace(E, "");
    }(e)), e);
  }
  function removeCustomPropAssignment(e) {
    return e.replace($, "");
  }
  function rulesForStyle(e) {
    return !e._$__cssRules$_ && e.textContent && (e._$__cssRules$_ = parse(e.textContent)), 
    e._$__cssRules$_ || null;
  }
  function forEachRule(e, n, t, r, o) {
    if (n) {
      var i = !1, u = n.type;
      if (o && 4 /* MEDIA_RULE */ === u) {
        var a = n._$selector$_.match(T);
        a && (
        // if rule is a non matching @media rule, skip subrules
        e.matchMedia(a[1]).matches || (i = !0));
      }
      1 /* STYLE_RULE */ === u ? t(n) : r && 7 /* KEYFRAMES_RULE */ === u ? r(n) : 1e3 /* MIXIN_RULE */ === u && (i = !0);
      var f = n._$rules$_;
      if (f && !i) {
        for (var c = 0, s = f.length, l = void 0; c < s && (l = f[c]); c++) {
          forEachRule(e, l, t, r, o);
        }
      }
    }
  }
  /**
     * Walk from text[start] matching parens and
     * returns position of the outer end paren
     */  function findMatchingParen(e, n) {
    for (var t = 0, r = n, o = e.length; r < o; r++) {
      if ("(" === e[r]) {
        t++;
      } else if (")" === e[r] && 0 == --t) {
        return r;
      }
    }
    return -1;
  }
  var o, i = "data-ssrv", u = "data-ssrc", a = "$", f = {}, c = [], s = {
    enter: 13,
    escape: 27,
    space: 32,
    tab: 9,
    left: 37,
    up: 38,
    right: 39,
    down: 40
  }, l = function(e) {
    return null != e;
  }, d = function(e) {
    return e.toLowerCase();
  }, p = function() {}, v = [], m = {
    getAttributes: function(e) {
      return e._$vattrs$_;
    },
    replaceAttributes: function(e, n) {
      return e._$vattrs$_ = n;
    }
  }, y = "wc-", C = {
    allowfullscreen: 1,
    async: 1,
    autofocus: 1,
    autoplay: 1,
    checked: 1,
    controls: 1,
    disabled: 1,
    enabled: 1,
    formnovalidate: 1,
    hidden: 1,
    multiple: 1,
    noresize: 1,
    readonly: 1,
    required: 1,
    selected: 1,
    spellcheck: 1
  }, b = "http://www.w3.org/1999/xlink", g = !1, S = /[\s;{]--[-a-zA-Z0-9]+\s*:/m, k = /url[\s]*\([\s]*['"]?(?!http)([^\'\"\)]*)[\s]*['"]?\)[\s]*/gim, P = function P() {
    this._$rules$_ = null, this._$start$_ = 0, this._$end$_ = 0, this._$parent$_ = null, 
    this._$previous$_ = null, this._$parsedCssText$_ = "", this._$cssText$_ = "", this._$parsedSelector$_ = "", 
    this._$atRule$_ = !1, this._$selector$_ = "", this.type = 0, this._$keyframesName$_ = "";
  }, w = /** @class */ function() {
    function StyleInfo(e) {
      this._$styleRules$_ = e || null, this._$styleProperties$_ = null;
    }
    return StyleInfo.get = function(e) {
      return e ? e[A] : null;
    }, StyleInfo.set = function(e, n) {
      return e[A] = n, n;
    }, StyleInfo;
  }(), M = "{", N = "}", V = /\/\*[^*]*\*+([^/*][^*]*\*+)*\//gim, E = /@import[^;]*;/gim, $ = /(?:^[^;\-\s}]+)?--[\w-]*?\s*:\s*(?:(?:'(?:\\'|.)*?'|"(?:\\"|.)*?"|\([^)]*?\)|[^};{])+(?:[;\n]|$))/gim, L = /[^;:]*?:[^;]*?var\([^;]*\)(?:[;\n]|$)?/gim, O = /^@[^\s]*keyframes/, j = /\s+/g, B = "--", x = "@media", R = "@", A = "__styleInfo", T = /@media\s(.*)/, q = /** @class */ function() {
    function StyleProperties(e) {
      var n;
      this._$win$_ = e, this._$SAFE_TOKEN$_ = "__!__", this.matchesSelector = (n = e.Element.prototype).matches || n.matchesSelector || n.mozMatchesSelector || n.msMatchesSelector || n.webkitMatchesSelector;
    }
    // decorate a single rule with property info
        return StyleProperties.prototype._$decorateRule$_ = function(e) {
      if (e._$propertyInfo$_) {
        return e._$propertyInfo$_;
      }
      var n = {}, t = {};
      return this._$collectProperties$_(e, t) && (n.properties = t, 
      // TODO(sorvell): workaround parser seeing mixins as additional rules
      e._$rules$_ = null), n._$cssText$_ = e._$parsedCssText$_, e._$propertyInfo$_ = n, 
      n;
    }, 
    // collects the custom properties from a rule's cssText
    StyleProperties.prototype._$collectProperties$_ = function(e, n) {
      var t = e._$propertyInfo$_;
      if (!t) {
        for (var r = void 0, o = e._$parsedCssText$_, i = void 0, u = void 0; r = H.exec(o); ) {
          // note: group 2 is var, 3 is mixin
          // value of 'inherit' or 'unset' is equivalent to not setting the property here
          "inherit" === (i = (r[2] || r[3]).trim()) && "unset" === i || (n[r[1].trim()] = i), 
          u = !0;
        }
        return u;
      }
      if (t.properties) {
        return Object.assign(n, t.properties), !0;
      }
    }, 
    // turns custom properties into realized values.
    StyleProperties.prototype._$reify$_ = function(e) {
      for (
      // big perf optimization here: reify only *own* properties
      // since this object has __proto__ of the element's scope properties
      var n = Object.getOwnPropertyNames(e), t = 0, r = void 0; t < n.length; t++) {
        e[r = n[t]] = this._$valueForProperty$_(e[r], e);
      }
    }, StyleProperties.prototype._$hasNonNestedSemicolon$_ = function(e) {
      return this._$getParts$_(e).length > 2;
    }, 
    // given a property value, returns the reified value
    // a property value may be:
    // (1) a literal value like: red or 5px;
    // (2) a variable value like: var(--a), var(--a, red), or var(--a, --b) or
    // var(--a, var(--b));
    StyleProperties.prototype._$valueForProperty$_ = function(e, n) {
      var t = this;
      // case (1) default
            return e && (e = this._$hasNonNestedSemicolon$_(e) ? this._$valueForProperties$_(e, n) : function processVariableAndFallback(e, n) {
        // find 'var('
        var t = e.indexOf("var(");
        if (-1 === t) {
          // no var?, everything is prefix
          return n(e, "", "", "");
        }
        // ${prefix}var(${inner})${suffix}
                var r = findMatchingParen(e, t + 3), o = e.substring(t + 4, r), i = e.substring(0, t), u = processVariableAndFallback(e.substring(r + 1), n), a = o.indexOf(",");
        // value and fallback args should be trimmed to match in property lookup
        return -1 === a ? n(i, o.trim(), "", u) : n(i, o.substring(0, a).trim(), o.substring(a + 1).trim(), u);
        // var(${value},${fallback})
            }(e, function(e, r, o, i) {
        if (!r) {
          return e + i;
        }
        var u = t._$valueForProperty$_(n[r], n);
        // if value is "initial", then the variable should be treated as unset
                return u && "initial" !== u || (
        // fallback may be --a or var(--a) or literal
        u = t._$valueForProperty$_(n[o] || o, n) || o), e + (u || "") + i;
      })), e && e.trim() || "";
    }, StyleProperties.prototype._$sanitizeSemicolons$_ = function(e, n) {
      var t = e.indexOf("(", n);
      if (-1 === t) {
        return e;
      }
      var r = findMatchingParen(e, t), o = e.substr(t, r - t), i = o.replace(";", this._$SAFE_TOKEN$_), u = e.replace(o, i);
      return this._$sanitizeSemicolons$_(u, r + 2);
    }, StyleProperties.prototype._$getParts$_ = function(e) {
      var n = this;
      return this._$sanitizeSemicolons$_(e, 0).split(";").map(function(e) {
        return e.replace(n._$SAFE_TOKEN$_, ";");
      });
    }, 
    // note: we do not yet support mixin within mixin
    StyleProperties.prototype._$valueForProperties$_ = function(e, n) {
      for (var t = this._$getParts$_(e), r = 0, o = void 0; r < t.length; r++) {
        if (o = t[r]) {
          var i = o.indexOf(":");
          if (-1 !== i) {
            var u = o.substring(i);
            u = u.trim(), u = this._$valueForProperty$_(u, n) || u, o = o.substring(0, i) + u;
          }
          t[r] = o && o.lastIndexOf(";") === o.length - 1 ? 
          // strip trailing ;
          o.slice(0, -1) : o || "";
        }
      }
      return t.join(";");
    }, 
    // Test if the rules in these styles matches the given `element` and if so,
    // collect any custom properties into `props`.
    StyleProperties.prototype._$propertyDataFromStyles$_ = function(e, n) {
      var t = this, r = {}, o = [];
      // note: active rules excludes non-matching @media rules
      return forEachRule(this._$win$_, e, function(e) {
        // TODO(sorvell): we could trim the set of rules at declaration
        // time to only include ones that have properties
        e._$propertyInfo$_ || t._$decorateRule$_(e);
        // match element against transformedSelector: selector may contain
        // unwanted uniquification and parsedSelector does not directly match
        // for :host selectors.
                try {
          var i = e._$transformedSelector$_ || e._$parsedSelector$_;
          n && e._$propertyInfo$_.properties && i && t.matchesSelector.call(n, i) && (t._$collectProperties$_(e, r), 
          // produce numeric key for these matches for lookup
          function addToBitMask(e, n) {
            var t = parseInt(e / 32, 10), r = 1 << e % 32;
            n[t] = (n[t] || 0) | r;
          }(e._$index$_, o));
        } catch (e) {
          console.error(e);
        }
      }, null, !0), {
        properties: r,
        _$key$_: o
      };
    }, StyleProperties.prototype._$applyCustomStyle$_ = function(e, n) {
      var t = this, r = rulesForStyle(e);
      e.textContent = function toCssText(e, n, t) {
        return n ? ("string" == typeof n && (n = parse(n)), t && forEachRule(e, n, t), function stringify(e, n, t) {
          void 0 === t && (t = "");
          // calc rule cssText
                    var r = "";
          if (e._$cssText$_ || e._$rules$_) {
            var o = e._$rules$_;
            if (o) {
              for (var i = 0, u = o.length, a = void 0; i < u && (a = o[i]); i++) {
                r = stringify(a, n, r);
              }
            } else {
              (r = (r = n ? e._$cssText$_ : function removeCustomProps(e) {
                return function removeCustomPropApply(e) {
                  return e.replace(L, "");
                }(e = removeCustomPropAssignment(e));
              }(e._$cssText$_)).trim()) && (r = "  " + r + "\n");
            }
          }
          // emit rule if there is cssText
                    return r && (e._$selector$_ && (t += e._$selector$_ + " " + M + "\n"), 
          t += r, e._$selector$_ && (t += N + "\n\n")), t;
        }(n, !1)) : "";
      }(this._$win$_, r, function(e) {
        var r = e._$cssText$_ = e._$parsedCssText$_;
        e._$propertyInfo$_ && e._$propertyInfo$_._$cssText$_ && (
        // remove property assignments
        // so next function isn't confused
        // NOTE: we have 3 categories of css:
        // (1) normal properties,
        // (2) custom property assignments (--foo: red;),
        // (3) custom property usage: border: var(--foo); @apply(--foo);
        // In elements, 1 and 3 are separated for efficiency; here they
        // are not and this makes this case unique.
        r = removeCustomPropAssignment(r), 
        // replace with reified properties, scenario is same as mixin
        e._$cssText$_ = t._$valueForProperties$_(r, n));
      });
    }, StyleProperties;
  }(), H = /(?:^|[;\s{]\s*)(--[\w-]*?)\s*:\s*(?:((?:'(?:\\'|.)*?'|"(?:\\"|.)*?"|\([^)]*?\)|[^};{])+)|\{([^}]*)\}(?:(?=[;\s}])|$))/gi, I = /** @class */ function() {
    function CustomStyle(e, n) {
      if (this._$win$_ = e, this._$doc$_ = n, this._$customStyles$_ = [], this._$enqueued$_ = !1, 
      this._$flushCallbacks$_ = [], this._$supportsCssVars$_ = !!(e.CSS && e.CSS.supports && e.CSS.supports("color", "var(--c)")), 
      !this._$supportsCssVars$_) {
        this._$documentOwner$_ = n.documentElement;
        var t = new P();
        t._$rules$_ = [], this._$documentOwnerStyleInfo$_ = w.set(this._$documentOwner$_, new w(t)), 
        this._$styleProperties$_ = new q(e);
      }
    }
    return CustomStyle.prototype._$init$_ = function(e) {
      var n = this;
      this._$supportsCssVars$_ ? e && e() : this._$win$_.requestAnimationFrame(function() {
        for (var t = [], r = n._$doc$_.querySelectorAll('link[rel="stylesheet"][href]'), o = 0; o < r.length; o++) {
          t.push(loadLinkStyles(n._$doc$_, n, r[o]));
        }
        var i = n._$doc$_.querySelectorAll("style");
        for (o = 0; o < i.length; o++) {
          t.push(n._$addStyle$_(i[o]));
        }
        Promise.all(t).then(function() {
          e && e();
        });
      });
    }, CustomStyle.prototype._$flushCustomStyles$_ = function() {
      var e = this._$processStyles$_();
      // early return if custom-styles don't need validation
            if (this._$enqueued$_) {
        for (this._$updateProperties$_(this._$documentOwner$_, this._$documentOwnerStyleInfo$_), 
        this._$applyCustomStyles$_(e), this._$enqueued$_ = !1; this._$flushCallbacks$_.length; ) {
          this._$flushCallbacks$_.shift()();
        }
      }
    }, CustomStyle.prototype._$applyCustomStyles$_ = function(e) {
      for (var n = 0; n < e.length; n++) {
        var t = e[n], r = this._$getStyleForCustomStyle$_(t);
        r && this._$styleProperties$_._$applyCustomStyle$_(r, this._$documentOwnerStyleInfo$_._$styleProperties$_);
      }
    }, CustomStyle.prototype._$updateProperties$_ = function(e, n) {
      var t = this._$documentOwner$_, r = w.get(t), o = r._$styleProperties$_, i = Object.create(o || null), u = this._$styleProperties$_._$propertyDataFromStyles$_(r._$styleRules$_, e).properties;
      Object.assign(i, u), this._$styleProperties$_._$reify$_(i), n._$styleProperties$_ = i;
    }, CustomStyle.prototype._$addStyle$_ = function(e) {
      var n = this;
      return new Promise(function(t) {
        e._$__seen$_ ? t() : (e._$__seen$_ = !0, n._$customStyles$_.push(e), n._$flushCallbacks$_.push(t), 
        n._$enqueued$_ || (n._$enqueued$_ = !0, n._$win$_.requestAnimationFrame(function() {
          n._$enqueued$_ && n._$flushCustomStyles$_();
        })));
      });
    }, CustomStyle.prototype._$getStyleForCustomStyle$_ = function(e) {
      return e._$__cached$_ ? e._$__cached$_ : e.getStyle ? e.getStyle() : e;
    }, CustomStyle.prototype._$processStyles$_ = function() {
      for (var e = this._$customStyles$_, n = 0; n < e.length; n++) {
        var t = e[n];
        if (!t._$__cached$_) {
          var r = this._$getStyleForCustomStyle$_(t);
          r && (this._$transformCustomStyleForDocument$_(r), t._$__cached$_ = r);
        }
      }
      return e;
    }, CustomStyle.prototype._$transformCustomStyleForDocument$_ = function(e) {
      var n = rulesForStyle(e);
      this._$documentOwnerStyleInfo$_._$styleRules$_._$rules$_.push(n);
    }, CustomStyle;
  }();
  /**
     * SSR Attribute Names
     */  o = new I(e, n), function createPlatformMainLegacy(e, n, t, r, o, u, f) {
    function defineComponent(e, n) {
      if (!b[e._$tagNameMeta$_]) {
        // keep a map of all the defined components
        b[e._$tagNameMeta$_] = !0, 
        // initialize the members on the host element prototype
        // keep a ref to the metadata with the tag as the key
        initHostElement(S, c[e._$tagNameMeta$_] = e, n.prototype, u);
        // add which attributes should be observed
        var r = [];
        // at this point the membersMeta only includes attributes which should
        // be observed, it does not include all props yet, so it's safe to
        // loop through all of the props (attrs) and observed them
                for (var o in e._$membersMeta$_) {
          e._$membersMeta$_[o]._$attribName$_ && r.push(
          // add this attribute to our array of attributes we need to observe
          e._$membersMeta$_[o]._$attribName$_);
        }
        // set the array of all the attributes to keep an eye on
        // https://www.youtube.com/watch?v=RBs21CFBALI
                n.observedAttributes = r, 
        // define the custom element
        t.customElements.define(e._$tagNameMeta$_, n);
      }
    }
    function getLoadedBundle(e) {
      return null == e ? null : p.get(e.replace(/^\.\//, ""));
    }
    function isLoadedBundle(e) {
      return "exports" === e || "require" === e || !!getLoadedBundle(e);
    }
    /**
         * Execute a bundle queue item
         * @param name
         * @param deps
         * @param callback
         */    function execBundleCallback(e, n, t) {
      var r = {};
      try {
        t.apply(null, n.map(function(e) {
          return "exports" === e ? r : "require" === e ? userRequire : getLoadedBundle(e);
        }));
      } catch (e) {
        console.error(e);
      }
      // If name is undefined then this callback was fired by component callback
            void 0 !== e && (function setLoadedBundle(e, n) {
        p.set(e, n);
      }(e, r), 
      // If name contains chunk then this callback was associated with a dependent bundle loading
      // let's add a reference to the constructors on each components metadata
      // each key in moduleImports is a PascalCased tag name
      e && !e.endsWith(".js") && Object.keys(r).forEach(function(e) {
        for (var n = e.replace(/-/g, "").toLowerCase(), t = Object.keys(c), o = 0; o < t.length; o++) {
          if (t[o].replace(/-/g, "").toLowerCase() === n) {
            var i = c[t[o]];
            i && (
            // get the component constructor from the module
            i._$componentConstructor$_ = r[e], initStyleTemplate(0, i, i._$componentConstructor$_));
            break;
          }
        }
      }));
    }
    function userRequire(e, n) {
      loadBundle(void 0, e, n);
    }
    /**
         * Check to see if any items in the bundle queue can be executed
         */    
    /**
         * This function is called anytime a JS file is loaded
         */
    function loadBundle(e, n, t) {
      var r = n.filter(function(e) {
        return !isLoadedBundle(e);
      });
      r.forEach(function(e) {
        requestUrl(o + e.replace(".js", ".es5.js"));
      }), l.push([ e, n, t ]), 
      // If any dependents are not yet met then queue the bundle execution
      0 === r.length && function checkQueue() {
        for (var e = l.length - 1; e >= 0; e--) {
          var n = l[e], t = n[0], r = n[1], o = n[2];
          r.every(isLoadedBundle) && !isLoadedBundle(t) && (l.splice(e, 1), execBundleCallback(t, r, o));
        }
      }();
    }
    function requestComponentBundle(e, n) {
      // create the url we'll be requesting
      // always use the es5/jsonp callback module
      requestUrl(o + n + (function useScopedCss(e, n) {
        return 2 /* ScopedCss */ === n.encapsulation || 1 /* ShadowDom */ === n.encapsulation && !e;
      }(C._$$supportsShadowDom$_, e) ? ".sc" : "") + ".es5.js");
    }
    // Use JSONP to load in bundles
        function requestUrl(e) {
      function onScriptComplete() {
        clearTimeout(n), t.onerror = t.onload = null, C._$$remove$_(t), 
        // remove from our list of active requests
        v.delete(e);
      }
      var n, t;
      v.has(e) || (
      // we're not already actively requesting this url
      // let's kick off the bundle request and
      // remember that we're now actively requesting this url
      v.add(e), (
      // create a sript element to add to the document.head
      t = C._$$createElement$_("script")).charset = "utf-8", t.async = !0, t.src = e, 
      // create a fallback timeout if something goes wrong
      n = setTimeout(onScriptComplete, 12e4), 
      // add script completed listener to this script element
      t.onerror = t.onload = onScriptComplete, 
      // inject a script tag in the head
      // kick off the actual request
      C._$$appendChild$_(C._$$head$_, t));
    }
    var c = {
      html: {}
    }, l = [], p = new Map(), v = new Set(), m = {}, y = t[e] = t[e] || {}, C = function createDomApi(e, n, t) {
      // using the $ prefix so that closure is
      // cool with property renaming each of these
      e._$ael$_ || (e._$ael$_ = function(e, n, t, r) {
        return e.addEventListener(n, t, r);
      }, e._$rel$_ = function(e, n, t, r) {
        return e.removeEventListener(n, t, r);
      });
      var r = new WeakMap(), o = {
        _$$documentElement$_: t.documentElement,
        _$$head$_: t.head,
        _$$body$_: t.body,
        _$$supportsEventOptions$_: !1,
        _$$nodeType$_: function(e) {
          return e.nodeType;
        },
        _$$createElement$_: function(e) {
          return t.createElement(e);
        },
        _$$createElementNS$_: function(e, n) {
          return t.createElementNS(e, n);
        },
        _$$createTextNode$_: function(e) {
          return t.createTextNode(e);
        },
        _$$createComment$_: function(e) {
          return t.createComment(e);
        },
        _$$insertBefore$_: function(e, n, t) {
          return e.insertBefore(n, t);
        },
        // https://developer.mozilla.org/en-US/docs/Web/API/ChildNode/remove
        // and it's polyfilled in es5 builds
        _$$remove$_: function(e) {
          return e.remove();
        },
        _$$appendChild$_: function(e, n) {
          return e.appendChild(n);
        },
        _$$childNodes$_: function(e) {
          return e.childNodes;
        },
        _$$parentNode$_: function(e) {
          return e.parentNode;
        },
        _$$nextSibling$_: function(e) {
          return e.nextSibling;
        },
        _$$previousSibling$_: function(e) {
          return e.previousSibling;
        },
        _$$tagName$_: function(e) {
          return d(e.nodeName);
        },
        _$$getTextContent$_: function(e) {
          return e.textContent;
        },
        _$$setTextContent$_: function(e, n) {
          return e.textContent = n;
        },
        _$$getAttribute$_: function(e, n) {
          return e.getAttribute(n);
        },
        _$$setAttribute$_: function(e, n, t) {
          return e.setAttribute(n, t);
        },
        _$$setAttributeNS$_: function(e, n, t, r) {
          return e.setAttributeNS(n, t, r);
        },
        _$$removeAttribute$_: function(e, n) {
          return e.removeAttribute(n);
        },
        _$$elementRef$_: function(e, r) {
          return "child" === r ? e.firstElementChild : "parent" === r ? o._$$parentElement$_(e) : "body" === r ? o._$$body$_ : "document" === r ? t : "window" === r ? n : e;
        },
        _$$addEventListener$_: function(n, t, i, u, a, f, c, l) {
          // remember the original name before we possibly change it
          var d = t, p = n, v = r.get(n);
          if (v && v[d] && 
          // removed any existing listeners for this event for the assigner element
          // this element already has this listener, so let's unregister it now
          v[d](), "string" == typeof f ? 
          // attachTo is a string, and is probably something like
          // "parent", "window", or "document"
          // and the eventName would be like "mouseover" or "mousemove"
          p = o._$$elementRef$_(n, f) : "object" == typeof f ? 
          // we were passed in an actual element to attach to
          p = f : (
          // depending on the event name, we could actually be attaching
          // this element to something like the document or window
          l = t.split(":")).length > 1 && (
          // document:mousemove
          // parent:touchend
          // body:keyup.enter
          p = o._$$elementRef$_(n, l[0]), t = l[1]), p) {
            var h = i;
            // test to see if we're looking for an exact keycode
                        (l = t.split(".")).length > 1 && (
            // looks like this listener is also looking for a keycode
            // keyup.enter
            t = l[0], h = function(e) {
              // wrap the user's event listener with our own check to test
              // if this keyboard event has the keycode they're looking for
              e.keyCode === s[l[1]] && i(e);
            }), 
            // create the actual event listener options to use
            // this browser may not support event options
            c = o._$$supportsEventOptions$_ ? {
              capture: !!u,
              passive: !!a
            } : !!u, 
            // ok, good to go, let's add the actual listener to the dom element
            e._$ael$_(p, t, h, c), v || 
            // we don't already have a collection, let's create it
            r.set(n, v = {}), 
            // add the unregister listener to this element's collection
            v[d] = function() {
              // looks like it's time to say goodbye
              p && e._$rel$_(p, t, h, c), v[d] = null;
            };
          }
        },
        _$$removeEventListener$_: function(e, n) {
          // get the unregister listener functions for this element
          var t = r.get(e);
          t && (
          // this element has unregister listeners
          n ? 
          // passed in one specific event name to remove
          t[n] && t[n]() : 
          // remove all event listeners
          Object.keys(t).forEach(function(e) {
            t[e] && t[e]();
          }));
        }
      };
      return "function" != typeof n.CustomEvent && (
      // CustomEvent polyfill
      n.CustomEvent = function(e, n, r) {
        return (r = t.createEvent("CustomEvent")).initCustomEvent(e, n.bubbles, n.cancelable, n.detail), 
        r;
      }, n.CustomEvent.prototype = n.Event.prototype), o._$$dispatchEvent$_ = function(e, t, r) {
        return e && e.dispatchEvent(new n.CustomEvent(t, r));
      }, o._$$parentElement$_ = function(e, n) {
        // if the parent node is a document fragment (shadow root)
        // then use the "host" property on it
        // otherwise use the parent node
        return (n = o._$$parentNode$_(e)) && 11 /* DocumentFragment */ === o._$$nodeType$_(n) ? n.host : n;
      }, o;
    }(y, t, r);
    // set App Context
    n.isServer = n.isPrerender = !(n.isClient = !0), n.window = t, n.location = t.location, 
    n.document = r, n.resourcesUrl = n.publicPath = o, 
    // add the h() fn to the app's global namespace
    y.h = h, y.Context = n;
    // keep a global set of tags we've already defined
    var b = t.$definedCmps = t.$definedCmps || {}, g = 0, S = {
      _$domApi$_: C,
      _$defineComponent$_: defineComponent,
      _$emitEvent$_: n.emit,
      _$getComponentMeta$_: function(e) {
        return c[C._$$tagName$_(e)];
      },
      _$getContextItem$_: function(e) {
        return n[e];
      },
      isClient: !0,
      _$isDefinedComponent$_: function(e) {
        return !(!b[C._$$tagName$_(e)] && !S._$getComponentMeta$_(e));
      },
      _$onError$_: function(e, n, t) {
        return console.error(e, n, t && t.tagName);
      },
      _$nextId$_: function() {
        return e + g++;
      },
      _$propConnect$_: function(e) {
        return function proxyController(e, n, t) {
          return {
            create: proxyProp(e, n, t, "create"),
            componentOnReady: proxyProp(e, n, t, "componentOnReady")
          };
        }(C, m, e);
      },
      queue: n.queue = function createQueueClient(e, n) {
        function consume(e) {
          for (var n = 0; n < e.length; n++) {
            try {
              e[n]();
            } catch (e) {
              console.error(e);
            }
          }
          e.length = 0;
        }
        function consumeTimeout(e, n) {
          for (var r = 0; r < e.length && t() < n; ) {
            try {
              e[r++]();
            } catch (e) {
              console.error(e);
            }
          }
          r === e.length ? e.length = 0 : 0 !== r && e.splice(0, r);
        }
        function flush() {
          f++, 
          // always force a bunch of medium callbacks to run, but still have
          // a throttle on how many can run in a certain time
          // DOM READS!!!
          consume(i);
          var n = t() + 7 * Math.ceil(f * (1 / 22));
          // DOM WRITES!!!
                    consumeTimeout(u, n), consumeTimeout(a, n), u.length > 0 && (a.push.apply(a, u), 
          u.length = 0), (c = i.length + u.length + a.length > 0) ? 
          // still more to do yet, but we've run out of time
          // let's let this thing cool off and try again in the next tick
          e.raf(flush) : f = 0;
        }
        var t = function() {
          return n.performance.now();
        }, r = Promise.resolve(), o = [], i = [], u = [], a = [], f = 0, c = !1;
        return e.raf || (e.raf = n.requestAnimationFrame.bind(n)), {
          tick: function(e) {
            // queue high priority work to happen in next tick
            // uses Promise.resolve() for next tick
            o.push(e), 1 === o.length && r.then(function() {
              return consume(o);
            });
          },
          read: function(n) {
            // queue dom reads
            i.push(n), c || (c = !0, e.raf(flush));
          },
          write: function(n) {
            // queue dom writes
            u.push(n), c || (c = !0, e.raf(flush));
          }
        };
      }(y, t),
      _$requestBundle$_: 
      // This is executed by the component's connected callback.
      function requestBundle(e, t) {
        // set the "mode" property
        t.mode || (
        // looks like mode wasn't set as a property directly yet
        // first check if there's an attribute
        // next check the app's global
        t.mode = C._$$getAttribute$_(t, "mode") || n.mode), 
        // remember a "snapshot" of this host element's current attributes/child nodes/slots/etc
        initHostSnapshot(S._$domApi$_, e, t);
        var r = "string" == typeof e._$bundleIds$_ ? e._$bundleIds$_ : e._$bundleIds$_[t.mode];
        getLoadedBundle(r) ? 
        // sweet, we've already loaded this bundle
        queueUpdate(S, t) : (
        // never seen this bundle before, let's start the request
        // and add it to the callbacks to fire when it has loaded
        l.push([ void 0, [ r ], function() {
          queueUpdate(S, t);
        } ]), 
        // when to request the bundle depends is we're using the css shim or not
        f && !f._$supportsCssVars$_ && P ? 
        // add this to the loadBundleQueue to run when css is ready
        P.push(function() {
          return requestComponentBundle(e, r);
        }) : 
        // not using css shim, so no need to wait on css shim to finish
        // figure out which bundle to request and kick it off
        requestComponentBundle(e, r));
      },
      _$ancestorHostElementMap$_: new WeakMap(),
      _$componentAppliedStyles$_: new WeakMap(),
      _$hasConnectedMap$_: new WeakMap(),
      _$hasListenersMap$_: new WeakMap(),
      _$hasLoadedMap$_: new WeakMap(),
      _$hostElementMap$_: new WeakMap(),
      _$hostSnapshotMap$_: new WeakMap(),
      _$instanceMap$_: new WeakMap(),
      _$isDisconnectedMap$_: new WeakMap(),
      _$isQueuedForUpdate$_: new WeakMap(),
      _$onReadyCallbacksMap$_: new WeakMap(),
      _$queuedEvents$_: new WeakMap(),
      _$vnodeMap$_: new WeakMap(),
      _$valuesMap$_: new WeakMap()
    };
    // internal id increment for unique ids
        // create the renderer that will be used
    S.render = createRendererPatch(S, C);
    // setup the root element which is the mighty <html> tag
    // the <html> has the final say of when the app has loaded
    var k = C._$$documentElement$_;
    k["s-ld"] = [], k["s-rn"] = !0, 
    // this will fire when all components have finished loaded
    k["s-init"] = function() {
      S._$hasLoadedMap$_.set(k, y.loaded = S._$isAppLoaded$_ = !0), C._$$dispatchEvent$_(t, "appload", {
        detail: {
          namespace: e
        }
      });
    }, 
    // if the HTML was generated from SSR
    // then let's walk the tree and generate vnodes out of the data
    function createVNodesFromSsr(e, n, t) {
      var r, o, u, a, f, c, s = t.querySelectorAll("[" + i + "]"), l = s.length;
      if (l > 0) {
        for (e._$hasLoadedMap$_.set(t, !0), a = 0; a < l; a++) {
          for (r = s[a], o = n._$$getAttribute$_(r, i), (u = {})._$vtag$_ = n._$$tagName$_(u._$elm$_ = r), 
          e._$vnodeMap$_.set(r, u), f = 0, c = r.childNodes.length; f < c; f++) {
            addChildSsrVNodes(n, r.childNodes[f], u, o, !0);
          }
        }
      }
    }(S, C, k), y.loadBundle = loadBundle;
    var P = [];
    f && f._$init$_(function() {
      // loaded all the css, let's run all the request bundle callbacks
      for (;P.length; ) {
        P.shift()();
      }
      // set to null to we know we're loaded
            P = null;
    }), S._$attachStyles$_ = function(e, n, t, r, o) {
      (function attachStyles(e, n, t, r, o, i, u) {
        // first see if we've got a style for a specific mode
        var f = t._$tagNameMeta$_ + (r || a), c = t[f];
        if (c || (c = t[
        // didn't find a style for this mode
        // now let's check if there's a default style for this component
        f = t._$tagNameMeta$_ + a]), c) {
          // cool, we found a style template element for this component
          var s = n._$$head$_;
          // if this browser supports shadow dom, then let's climb up
          // the dom and see if we're within a shadow dom
                    if (n._$$supportsShadowDom$_) {
            if (1 /* ShadowDom */ === t.encapsulation) {
              // we already know we're in a shadow dom
              // so shadow root is the container for these styles
              s = o.shadowRoot;
            } else {
              // climb up the dom and see if we're in a shadow dom
              for (;o = n._$$parentNode$_(o); ) {
                if (o.host && o.host.shadowRoot) {
                  // looks like we are in shadow dom, let's use
                  // this shadow root as the container for these styles
                  s = o.host.shadowRoot;
                  break;
                }
              }
            }
          }
          // if this container element already has these styles
          // then there's no need to apply them again
          // create an object to keep track if we'ready applied this component style
                    var l = e._$componentAppliedStyles$_.get(s) || {};
          if (!l[f]) {
            (
            // es5 builds are not usig <template> because of ie11 issues
            // instead the "template" is just the style text as a string
            // create a new style element and add as innerHTML
            u = n._$$createElement$_("style")).innerHTML = c, i && !i._$supportsCssVars$_ && i._$addStyle$_(u);
            // let's make sure we put the styles below the <style data-styles> element
            // so any visibility css overrides the default
            var d = s.querySelectorAll("[data-styles]");
            n._$$insertBefore$_(s, u, d.length && d[d.length - 1].nextSibling || s._$firstChild$_), 
            // remember we don't need to do this again for this element
            l[f] = !0, e._$componentAppliedStyles$_.set(s, l);
          }
        }
      })(e, n, t, r, o, f);
    }, 
    // register all the components now that everything's ready
    (y.components || []).map(function(e) {
      return function parseComponentLoader(e, n, t) {
        // tag name will always be lower case
        var r = {
          _$tagNameMeta$_: e[0],
          _$membersMeta$_: {
            // every component defaults to always have
            // the mode and color properties
            // but only color should observe any attribute changes
            color: {
              _$attribName$_: "color"
            }
          }
        };
        // map of the bundle ids
        // can contain modes, and array of esm and es5 bundle ids
                r._$bundleIds$_ = e[1];
        // parse member meta
        // this data only includes props that are attributes that need to be observed
        // it does not include all of the props yet
        var o = e[3];
        if (o) {
          for (n = 0; n < o.length; n++) {
            t = o[n], r._$membersMeta$_[t[0]] = {
              _$memberType$_: t[1],
              _$reflectToAttr$_: !!t[2],
              _$attribName$_: "string" == typeof t[3] ? t[3] : t[3] ? t[0] : 0,
              _$propType$_: t[4]
            };
          }
        }
        // encapsulation
                return r.encapsulation = e[4], e[5] && (
        // parse listener meta
        r._$listenersMeta$_ = e[5].map(parseListenerData)), r;
      }(e);
    }).forEach(function(e) {
      // es5 way of extending HTMLElement
      function HostElement(e) {
        return HTMLElement.call(this, e);
      }
      HostElement.prototype = Object.create(HTMLElement.prototype, {
        constructor: {
          value: HostElement,
          configurable: !0
        }
      }), defineComponent(e, HostElement);
    }), 
    // create the componentOnReady fn
    function initCoreComponentOnReady(e, n) {
      // create the function the HTMLElement.prototype.componentOnReady will end up calling
      n.componentOnReady = function(n, t) {
        if (e._$getComponentMeta$_(n) && !e._$hasLoadedMap$_.has(n)) {
          // this is a known component and the
          // host element hasn't finished loading yet
          var r = e._$onReadyCallbacksMap$_.get(n) || [];
          r.push(t), e._$onReadyCallbacksMap$_.set(n, r);
        } else {
          // either the host element has already loaded
          // or it's not even a component
          t(n);
        }
      }, 
      // drain the queue that could have been filled up before the core fully loaded
      n.$r && n.$r.forEach(function(e) {
        return n.componentOnReady(e[0], e[1]);
      }), 
      // remove the queue now that the core file has initialized
      n.$r = null;
    }(S, y), 
    // notify that the app has initialized and the core script is ready
    // but note that the components have not fully loaded yet
    y.initialized = !0;
  }(r, t, e, n, resourcesUrl, hydratedCssClass, o);
}(window, document, Context, namespace);
})({},"ionicons","hydrated");