/*! document-register-element, 1.7.0
https://github.com/WebReflection/document-register-element
(C) Andrea Giammarchi - @WebReflection - Mit Style License */
if (!window['s-ce1']) {
window['s-ce1'] = true;
(function(e,t){"use strict";function Ht(){var e=wt.splice(0,wt.length);Et=0;while(e.length)e.shift().call(null,e.shift())}function Bt(e,t){for(var n=0,r=e.length;n<r;n++)Jt(e[n],t)}function jt(e){for(var t=0,n=e.length,r;t<n;t++)r=e[t],Pt(r,A[It(r)])}function Ft(e){return function(t){ut(t)&&(Jt(t,e),O.length&&Bt(t.querySelectorAll(O),e))}}function It(e){var t=ht.call(e,"is"),n=e.nodeName.toUpperCase(),r=_.call(L,t?N+t.toUpperCase():T+n);return t&&-1<r&&!qt(n,t)?-1:r}function qt(e,t){return-1<O.indexOf(e+'[is="'+t+'"]')}function Rt(e){var t=e.currentTarget,n=e.attrChange,r=e.attrName,i=e.target,s=e[y]||2,o=e[w]||3;kt&&(!i||i===t)&&t[h]&&r!=="style"&&(e.prevValue!==e.newValue||e.newValue===""&&(n===s||n===o))&&t[h](r,n===s?null:e.prevValue,n===o?null:e.newValue)}function Ut(e){var t=Ft(e);return function(e){wt.push(t,e.target),Et&&clearTimeout(Et),Et=setTimeout(Ht,1)}}function zt(e){Ct&&(Ct=!1,e.currentTarget.removeEventListener(S,zt)),O.length&&Bt((e.target||n).querySelectorAll(O),e.detail===l?l:a),st&&Vt()}function Wt(e,t){var n=this;vt.call(n,e,t),Lt.call(n,{target:n})}function Xt(e,t){nt(e,t),Mt?Mt.observe(e,yt):(Nt&&(e.setAttribute=Wt,e[o]=Ot(e),e[u](x,Lt)),e[u](E,Rt)),e[m]&&kt&&(e.created=!0,e[m](),e.created=!1)}function Vt(){for(var e,t=0,n=at.length;t<n;t++)e=at[t],M.contains(e)||(n--,at.splice(t--,1),Jt(e,l))}function $t(e){throw new Error("A "+e+" type is already registered")}function Jt(e,t){var n,r=It(e),i;-1<r&&(Dt(e,A[r]),r=0,t===a&&!e[a]?(e[l]=!1,e[a]=!0,i="connected",r=1,st&&_.call(at,e)<0&&at.push(e)):t===l&&!e[l]&&(e[a]=!1,e[l]=!0,i="disconnected",r=1),r&&(n=e[t+f]||e[i+f])&&n.call(e))}function Kt(){}function Qt(e,t,r){var i=r&&r[c]||"",o=t.prototype,u=tt(o),a=t.observedAttributes||j,f={prototype:u};ot(u,m,{value:function(){if(Q)Q=!1;else if(!this[W]){this[W]=!0,new t(this),o[m]&&o[m].call(this);var e=G[Z.get(t)];(!V||e.create.length>1)&&Zt(this)}}}),ot(u,h,{value:function(e){-1<_.call(a,e)&&o[h].apply(this,arguments)}}),o[d]&&ot(u,p,{value:o[d]}),o[v]&&ot(u,g,{value:o[v]}),i&&(f[c]=i),e=e.toUpperCase(),G[e]={constructor:t,create:i?[i,et(e)]:[e]},Z.set(t,e),n[s](e.toLowerCase(),f),en(e),Y[e].r()}function Gt(e){var t=G[e.toUpperCase()];return t&&t.constructor}function Yt(e){return typeof e=="string"?e:e&&e.is||""}function Zt(e){var t=e[h],n=t?e.attributes:j,r=n.length,i;while(r--)i=n[r],t.call(e,i.name||i.nodeName,null,i.value||i.nodeValue)}function en(e){return e=e.toUpperCase(),e in Y||(Y[e]={},Y[e].p=new K(function(t){Y[e].r=t})),Y[e].p}function tn(){X&&delete e.customElements,B(e,"customElements",{configurable:!0,value:new Kt}),B(e,"CustomElementRegistry",{configurable:!0,value:Kt});for(var t=function(t){var r=e[t];if(r){e[t]=function(t){var i,s;return t||(t=this),t[W]||(Q=!0,i=G[Z.get(t.constructor)],s=V&&i.create.length===1,t=s?Reflect.construct(r,j,i.constructor):n.createElement.apply(n,i.create),t[W]=!0,Q=!1,s||Zt(t)),t},e[t].prototype=r.prototype;try{r.prototype.constructor=e[t]}catch(i){z=!0,B(r,W,{value:e[t]})}}},r=i.get(/^HTML[A-Z]*[a-z]/),o=r.length;o--;t(r[o]));n.createElement=function(e,t){var n=Yt(t);return n?gt.call(this,e,et(n)):gt.call(this,e)},St||(Tt=!0,n[s](""))}var n=e.document,r=e.Object,i=function(e){var t=/^[A-Z]+[a-z]/,n=function(e){var t=[],n;for(n in s)e.test(n)&&t.push(n);return t},i=function(e,t){t=t.toLowerCase(),t in s||(s[e]=(s[e]||[]).concat(t),s[t]=s[t.toUpperCase()]=e)},s=(r.create||r)(null),o={},u,a,f,l;for(a in e)for(l in e[a]){f=e[a][l],s[l]=f;for(u=0;u<f.length;u++)s[f[u].toLowerCase()]=s[f[u].toUpperCase()]=l}return o.get=function(r){return typeof r=="string"?s[r]||(t.test(r)?[]:""):n(r)},o.set=function(n,r){return t.test(n)?i(n,r):i(r,n),o},o}({collections:{HTMLAllCollection:["all"],HTMLCollection:["forms"],HTMLFormControlsCollection:["elements"],HTMLOptionsCollection:["options"]},elements:{Element:["element"],HTMLAnchorElement:["a"],HTMLAppletElement:["applet"],HTMLAreaElement:["area"],HTMLAttachmentElement:["attachment"],HTMLAudioElement:["audio"],HTMLBRElement:["br"],HTMLBaseElement:["base"],HTMLBodyElement:["body"],HTMLButtonElement:["button"],HTMLCanvasElement:["canvas"],HTMLContentElement:["content"],HTMLDListElement:["dl"],HTMLDataElement:["data"],HTMLDataListElement:["datalist"],HTMLDetailsElement:["details"],HTMLDialogElement:["dialog"],HTMLDirectoryElement:["dir"],HTMLDivElement:["div"],HTMLDocument:["document"],HTMLElement:["element","abbr","address","article","aside","b","bdi","bdo","cite","code","command","dd","dfn","dt","em","figcaption","figure","footer","header","i","kbd","mark","nav","noscript","rp","rt","ruby","s","samp","section","small","strong","sub","summary","sup","u","var","wbr"],HTMLEmbedElement:["embed"],HTMLFieldSetElement:["fieldset"],HTMLFontElement:["font"],HTMLFormElement:["form"],HTMLFrameElement:["frame"],HTMLFrameSetElement:["frameset"],HTMLHRElement:["hr"],HTMLHeadElement:["head"],HTMLHeadingElement:["h1","h2","h3","h4","h5","h6"],HTMLHtmlElement:["html"],HTMLIFrameElement:["iframe"],HTMLImageElement:["img"],HTMLInputElement:["input"],HTMLKeygenElement:["keygen"],HTMLLIElement:["li"],HTMLLabelElement:["label"],HTMLLegendElement:["legend"],HTMLLinkElement:["link"],HTMLMapElement:["map"],HTMLMarqueeElement:["marquee"],HTMLMediaElement:["media"],HTMLMenuElement:["menu"],HTMLMenuItemElement:["menuitem"],HTMLMetaElement:["meta"],HTMLMeterElement:["meter"],HTMLModElement:["del","ins"],HTMLOListElement:["ol"],HTMLObjectElement:["object"],HTMLOptGroupElement:["optgroup"],HTMLOptionElement:["option"],HTMLOutputElement:["output"],HTMLParagraphElement:["p"],HTMLParamElement:["param"],HTMLPictureElement:["picture"],HTMLPreElement:["pre"],HTMLProgressElement:["progress"],HTMLQuoteElement:["blockquote","q","quote"],HTMLScriptElement:["script"],HTMLSelectElement:["select"],HTMLShadowElement:["shadow"],HTMLSlotElement:["slot"],HTMLSourceElement:["source"],HTMLSpanElement:["span"],HTMLStyleElement:["style"],HTMLTableCaptionElement:["caption"],HTMLTableCellElement:["td","th"],HTMLTableColElement:["col","colgroup"],HTMLTableElement:["table"],HTMLTableRowElement:["tr"],HTMLTableSectionElement:["thead","tbody","tfoot"],HTMLTemplateElement:["template"],HTMLTextAreaElement:["textarea"],HTMLTimeElement:["time"],HTMLTitleElement:["title"],HTMLTrackElement:["track"],HTMLUListElement:["ul"],HTMLUnknownElement:["unknown","vhgroupv","vkeygen"],HTMLVideoElement:["video"]},nodes:{Attr:["node"],Audio:["audio"],CDATASection:["node"],CharacterData:["node"],Comment:["#comment"],Document:["#document"],DocumentFragment:["#document-fragment"],DocumentType:["node"],HTMLDocument:["#document"],Image:["img"],Option:["option"],ProcessingInstruction:["node"],ShadowRoot:["#shadow-root"],Text:["#text"],XMLDocument:["xml"]}});typeof t!="object"&&(t={type:t||"auto"});var s="registerElement",o="__"+s+(e.Math.random()*1e5>>0),u="addEventListener",a="attached",f="Callback",l="detached",c="extends",h="attributeChanged"+f,p=a+f,d="connected"+f,v="disconnected"+f,m="created"+f,g=l+f,y="ADDITION",b="MODIFICATION",w="REMOVAL",E="DOMAttrModified",S="DOMContentLoaded",x="DOMSubtreeModified",T="<",N="=",C=/^[A-Z][A-Z0-9]*(?:-[A-Z0-9]+)+$/,k=["ANNOTATION-XML","COLOR-PROFILE","FONT-FACE","FONT-FACE-SRC","FONT-FACE-URI","FONT-FACE-FORMAT","FONT-FACE-NAME","MISSING-GLYPH"],L=[],A=[],O="",M=n.documentElement,_=L.indexOf||function(e){for(var t=this.length;t--&&this[t]!==e;);return t},D=r.prototype,P=D.hasOwnProperty,H=D.isPrototypeOf,B=r.defineProperty,j=[],F=r.getOwnPropertyDescriptor,I=r.getOwnPropertyNames,q=r.getPrototypeOf,R=r.setPrototypeOf,U=!!r.__proto__,z=!1,W="__dreCEv1",X=e.customElements,V=!/^force/.test(t.type)&&!!(X&&X.define&&X.get&&X.whenDefined),$=r.create||r,J=e.Map||function(){var t=[],n=[],r;return{get:function(e){return n[_.call(t,e)]},set:function(e,i){r=_.call(t,e),r<0?n[t.push(e)-1]=i:n[r]=i}}},K=e.Promise||function(e){function i(e){n=!0;while(t.length)t.shift()(e)}var t=[],n=!1,r={"catch":function(){return r},then:function(e){return t.push(e),n&&setTimeout(i,1),r}};return e(i),r},Q=!1,G=$(null),Y=$(null),Z=new J,et=function(e){return e.toLowerCase()},tt=r.create||function sn(e){return e?(sn.prototype=e,new sn):this},nt=R||(U?function(e,t){return e.__proto__=t,e}:I&&F?function(){function e(e,t){for(var n,r=I(t),i=0,s=r.length;i<s;i++)n=r[i],P.call(e,n)||B(e,n,F(t,n))}return function(t,n){do e(t,n);while((n=q(n))&&!H.call(n,t));return t}}():function(e,t){for(var n in t)e[n]=t[n];return e}),rt=e.MutationObserver||e.WebKitMutationObserver,it=(e.HTMLElement||e.Element||e.Node).prototype,st=!H.call(it,M),ot=st?function(e,t,n){return e[t]=n.value,e}:B,ut=st?function(e){return e.nodeType===1}:function(e){return H.call(it,e)},at=st&&[],ft=it.attachShadow,lt=it.cloneNode,ct=it.dispatchEvent,ht=it.getAttribute,pt=it.hasAttribute,dt=it.removeAttribute,vt=it.setAttribute,mt=n.createElement,gt=mt,yt=rt&&{attributes:!0,characterData:!0,attributeOldValue:!0},bt=rt||function(e){Nt=!1,M.removeEventListener(E,bt)},wt,Et=0,St=s in n&&!/^force-all/.test(t.type),xt=!0,Tt=!1,Nt=!0,Ct=!0,kt=!0,Lt,At,Ot,Mt,_t,Dt,Pt;St||(R||U?(Dt=function(e,t){H.call(t,e)||Xt(e,t)},Pt=Xt):(Dt=function(e,t){e[o]||(e[o]=r(!0),Xt(e,t))},Pt=Dt),st?(Nt=!1,function(){var e=F(it,u),t=e.value,n=function(e){var t=new CustomEvent(E,{bubbles:!0});t.attrName=e,t.prevValue=ht.call(this,e),t.newValue=null,t[w]=t.attrChange=2,dt.call(this,e),ct.call(this,t)},r=function(e,t){var n=pt.call(this,e),r=n&&ht.call(this,e),i=new CustomEvent(E,{bubbles:!0});vt.call(this,e,t),i.attrName=e,i.prevValue=n?r:null,i.newValue=t,n?i[b]=i.attrChange=1:i[y]=i.attrChange=0,ct.call(this,i)},i=function(e){var t=e.currentTarget,n=t[o],r=e.propertyName,i;n.hasOwnProperty(r)&&(n=n[r],i=new CustomEvent(E,{bubbles:!0}),i.attrName=n.name,i.prevValue=n.value||null,i.newValue=n.value=t[r]||null,i.prevValue==null?i[y]=i.attrChange=0:i[b]=i.attrChange=1,ct.call(t,i))};e.value=function(e,s,u){e===E&&this[h]&&this.setAttribute!==r&&(this[o]={className:{name:"class",value:this.className}},this.setAttribute=r,this.removeAttribute=n,t.call(this,"propertychange",i)),t.call(this,e,s,u)},B(it,u,e)}()):rt||(M[u](E,bt),M.setAttribute(o,1),M.removeAttribute(o),Nt&&(Lt=function(e){var t=this,n,r,i;if(t===e.target){n=t[o],t[o]=r=Ot(t);for(i in r){if(!(i in n))return At(0,t,i,n[i],r[i],y);if(r[i]!==n[i])return At(1,t,i,n[i],r[i],b)}for(i in n)if(!(i in r))return At(2,t,i,n[i],r[i],w)}},At=function(e,t,n,r,i,s){var o={attrChange:e,currentTarget:t,attrName:n,prevValue:r,newValue:i};o[s]=e,Rt(o)},Ot=function(e){for(var t,n,r={},i=e.attributes,s=0,o=i.length;s<o;s++)t=i[s],n=t.name,n!=="setAttribute"&&(r[n]=t.value);return r})),n[s]=function(t,r){p=t.toUpperCase(),xt&&(xt=!1,rt?(Mt=function(e,t){function n(e,t){for(var n=0,r=e.length;n<r;t(e[n++]));}return new rt(function(r){for(var i,s,o,u=0,a=r.length;u<a;u++)i=r[u],i.type==="childList"?(n(i.addedNodes,e),n(i.removedNodes,t)):(s=i.target,kt&&s[h]&&i.attributeName!=="style"&&(o=ht.call(s,i.attributeName),o!==i.oldValue&&s[h](i.attributeName,i.oldValue,o)))})}(Ft(a),Ft(l)),_t=function(e){return Mt.observe(e,{childList:!0,subtree:!0}),e},_t(n),ft&&(it.attachShadow=function(){return _t(ft.apply(this,arguments))})):(wt=[],n[u]("DOMNodeInserted",Ut(a)),n[u]("DOMNodeRemoved",Ut(l))),n[u](S,zt),n[u]("readystatechange",zt),it.cloneNode=function(e){var t=lt.call(this,!!e),n=It(t);return-1<n&&Pt(t,A[n]),e&&O.length&&jt(t.querySelectorAll(O)),t});if(Tt)return Tt=!1;-2<_.call(L,N+p)+_.call(L,T+p)&&$t(t);if(!C.test(p)||-1<_.call(k,p))throw new Error("The type "+t+" is invalid");var i=function(){return o?n.createElement(f,p):n.createElement(f)},s=r||D,o=P.call(s,c),f=o?r[c].toUpperCase():p,p,d;return o&&-1<_.call(L,T+f)&&$t(f),d=L.push((o?N:T)+p)-1,O=O.concat(O.length?",":"",o?f+'[is="'+t.toLowerCase()+'"]':f),i.prototype=A[d]=P.call(s,"prototype")?s.prototype:tt(it),O.length&&Bt(n.querySelectorAll(O),a),i},n.createElement=gt=function(e,t){var r=Yt(t),i=r?mt.call(n,e,et(r)):mt.call(n,e),s=""+e,o=_.call(L,(r?N:T)+(r||s).toUpperCase()),u=-1<o;return r&&(i.setAttribute("is",r=r.toLowerCase()),u&&(u=qt(s.toUpperCase(),r))),kt=!n.createElement.innerHTMLHelper,u&&Pt(i,A[o]),i}),Kt.prototype={constructor:Kt,define:V?function(e,t,n){if(n)Qt(e,t,n);else{var r=e.toUpperCase();G[r]={constructor:t,create:[r]},Z.set(t,r),X.define(e,t)}}:Qt,get:V?function(e){return X.get(e)||Gt(e)}:Gt,whenDefined:V?function(e){return K.race([X.whenDefined(e),en(e)])}:en};if(!X||/^force/.test(t.type))tn();else if(!t.noBuiltIn)try{(function(t,r,i){r[c]="a",t.prototype=tt(HTMLAnchorElement.prototype),t.prototype.constructor=t,e.customElements.define(i,t,r);if(ht.call(n.createElement("a",{is:i}),"is")!==i||V&&ht.call(new t,"is")!==i)throw r})(function on(){return Reflect.construct(HTMLAnchorElement,[],on)},{},"document-register-element-a")}catch(nn){tn()}if(!t.noBuiltIn)try{mt.call(n,"a","a")}catch(rn){et=function(e){return{is:e.toLowerCase()}}}})(window);
}

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
*/
Array.prototype.find||Object.defineProperty(Array.prototype,"find",{writable:!0,configurable:!0,value:function(c,e){if(null==this)throw new TypeError('"this" is null or not defined');var b=Object(this),f=b.length>>>0;if("function"!==typeof c)throw new TypeError("predicate must be a function");for(var a=0;a<f;){var d=b[a];if(c.call(e,d,a,b))return d;a++}}});
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
/*!
url-polyfill, 1.0.14
https://github.com/lifaon74/url-polyfill
MIT Licensed
*/
(function(e){var t=function(){try{return!!Symbol.iterator}catch(e){return false}};var n=t();var r=function(e){var t={next:function(){var t=e.shift();return{done:t===void 0,value:t}}};if(n){t[Symbol.iterator]=function(){return t}}return t};var i=function(e){return encodeURIComponent(e).replace(/%20/g,"+")};var o=function(e){return decodeURIComponent(e).replace(/\+/g," ")};var a=function(){var t=function(e){Object.defineProperty(this,"_entries",{value:{}});if(typeof e==="string"){if(e!==""){e=e.replace(/^\?/,"");var n=e.split("&");var r;for(var i=0;i<n.length;i++){r=n[i].split("=");this.append(o(r[0]),r.length>1?o(r[1]):"")}}}else if(e instanceof t){var a=this;e.forEach(function(e,t){a.append(e,t)})}};var a=t.prototype;a.append=function(e,t){if(e in this._entries){this._entries[e].push(t.toString())}else{this._entries[e]=[t.toString()]}};a.delete=function(e){delete this._entries[e]};a.get=function(e){return e in this._entries?this._entries[e][0]:null};a.getAll=function(e){return e in this._entries?this._entries[e].slice(0):[]};a.has=function(e){return e in this._entries};a.set=function(e,t){this._entries[e]=[t.toString()]};a.forEach=function(e,t){var n;for(var r in this._entries){if(this._entries.hasOwnProperty(r)){n=this._entries[r];for(var i=0;i<n.length;i++){e.call(t,n[i],r,this)}}}};a.keys=function(){var e=[];this.forEach(function(t,n){e.push(n)});return r(e)};a.values=function(){var e=[];this.forEach(function(t){e.push(t)});return r(e)};a.entries=function(){var e=[];this.forEach(function(t,n){e.push([n,t])});return r(e)};if(n){a[Symbol.iterator]=a.entries}a.toString=function(){var e=[];this.forEach(function(t,n){e.push(i(n)+"="+i(t))});return e.join("&")};e.URLSearchParams=t};if(!("URLSearchParams"in e)||new URLSearchParams("?a=1").toString()!=="a=1"){a()}})(typeof global!=="undefined"?global:typeof window!=="undefined"?window:typeof self!=="undefined"?self:this);(function(e){var t=function(){try{var e=new URL("b","http://a");e.pathname="c%20d";return e.href==="http://a/c%20d"&&e.searchParams}catch(e){return false}};var n=function(){var t=e.URL;var n=function(e,t){if(typeof e!=="string")e=String(e);var n=document.implementation.createHTMLDocument("");window.doc=n;if(t){var r=n.createElement("base");r.href=t;n.head.appendChild(r)}var i=n.createElement("a");i.href=e;n.body.appendChild(i);i.href=i.href;if(i.protocol===":"||!/:/.test(i.href)){throw new TypeError("Invalid URL")}Object.defineProperty(this,"_anchorElement",{value:i})};var r=n.prototype;var i=function(e){Object.defineProperty(r,e,{get:function(){return this._anchorElement[e]},set:function(t){this._anchorElement[e]=t},enumerable:true})};["hash","host","hostname","port","protocol","search"].forEach(function(e){i(e)});Object.defineProperties(r,{toString:{get:function(){var e=this;return function(){return e.href}}},href:{get:function(){return this._anchorElement.href.replace(/\?$/,"")},set:function(e){this._anchorElement.href=e},enumerable:true},pathname:{get:function(){return this._anchorElement.pathname.replace(/(^\/?)/,"/")},set:function(e){this._anchorElement.pathname=e},enumerable:true},origin:{get:function(){var e={"http:":80,"https:":443,"ftp:":21}[this._anchorElement.protocol];var t=this._anchorElement.port!=e&&this._anchorElement.port!=="";return this._anchorElement.protocol+"//"+this._anchorElement.hostname+(t?":"+this._anchorElement.port:"")},enumerable:true},password:{get:function(){return""},set:function(e){},enumerable:true},username:{get:function(){return""},set:function(e){},enumerable:true},searchParams:{get:function(){var e=new URLSearchParams(this.search);var t=this;["append","delete","set"].forEach(function(n){var r=e[n];e[n]=function(){r.apply(e,arguments);t.search=e.toString()}});return e},enumerable:true}});n.createObjectURL=function(e){return t.createObjectURL.apply(t,arguments)};n.revokeObjectURL=function(e){return t.revokeObjectURL.apply(t,arguments)};e.URL=n};if(!t()){n()}if(e.location!==void 0&&!("origin"in e.location)){var r=function(){return e.location.protocol+"//"+e.location.hostname+(e.location.port?":"+e.location.port:"")};try{Object.defineProperty(e.location,"origin",{get:r,enumerable:true})}catch(t){setInterval(function(){e.location.origin=r()},100)}}})(typeof global!=="undefined"?global:typeof window!=="undefined"?window:typeof self!=="undefined"?self:this);
/*! Built with http://stenciljs.com */
(function(Context,namespace,hydratedCssClass,resourcesUrl,s){"use strict";
s=document.querySelector("script[data-namespace='docssite']");if(s){resourcesUrl=s.getAttribute('data-resources-url');}
this && this.__extends || function() {
  var extendStatics = Object.setPrototypeOf || {
    __proto__: []
  } instanceof Array && function(d, b) {
    d.__proto__ = b;
  } || function(d, b) {
    for (var p in b) b.hasOwnProperty(p) && (d[p] = b[p]);
  };
}();

var __awaiter = this && this.__awaiter || function(thisArg, _arguments, P, generator) {
  return new (P || (P = Promise))(function(resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : new P(function(resolve) {
        resolve(result.value);
      }).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};

var __generator = this && this.__generator || function(thisArg, body) {
  var f, y, t, g, _ = {
    label: 0,
    sent: function() {
      if (1 & t[0]) throw t[1];
      return t[1];
    },
    trys: [],
    ops: []
  };
  return g = {
    next: verb(0),
    'throw': verb(1),
    'return': verb(2)
  }, 'function' === typeof Symbol && (g[Symbol.iterator] = function() {
    return this;
  }), g;
  function verb(n) {
    return function(v) {
      return step([ n, v ]);
    };
  }
  function step(op) {
    if (f) throw new TypeError('Generator is already executing.');
    while (_) try {
      if (f = 1, y && (t = 2 & op[0] ? y.return : op[0] ? y.throw || ((t = y.return) && t.call(y), 
      0) : y.next) && !(t = t.call(y, op[1])).done) return t;
      (y = 0, t) && (op = [ 2 & op[0], t.value ]);
      switch (op[0]) {
       case 0:
       case 1:
        t = op;
        break;

       case 4:
        _.label++;
        return {
          value: op[1],
          done: false
        };

       case 5:
        _.label++;
        y = op[1];
        op = [ 0 ];
        continue;

       case 7:
        op = _.ops.pop();
        _.trys.pop();
        continue;

       default:
        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (6 === op[0] || 2 === op[0])) {
          _ = 0;
          continue;
        }
        if (3 === op[0] && (!t || op[1] > t[0] && op[1] < t[3])) {
          _.label = op[1];
          break;
        }
        if (6 === op[0] && _.label < t[1]) {
          _.label = t[1];
          t = op;
          break;
        }
        if (t && _.label < t[2]) {
          _.label = t[2];
          _.ops.push(op);
          break;
        }
        t[2] && _.ops.pop();
        _.trys.pop();
        continue;
      }
      op = body.call(thisArg, _);
    } catch (e) {
      op = [ 6, e ];
      y = 0;
    } finally {
      f = t = 0;
    }
    if (5 & op[0]) throw op[1];
    return {
      value: op[0] ? op[1] : void 0,
      done: true
    };
  }
};

(function(window, document, Context, namespace) {
  'use strict';
  /**
     * SSR Attribute Names
     */  var SSR_VNODE_ID = 'ssrv';
  var SSR_CHILD_ID = 'ssrc';
  /**
     * Default style mode id
     */  var DEFAULT_STYLE_MODE = '$';
  /**
     * Reusable empty obj/array
     * Don't add values to these!!
     */  var EMPTY_OBJ = {};
  /**
     * Key Name to Key Code Map
     */  var KEY_CODE_MAP = {
    'enter': 13,
    'escape': 27,
    'space': 32,
    'tab': 9,
    'left': 37,
    'up': 38,
    'right': 39,
    'down': 40
  };
  function getScopeId(cmpMeta, mode) {
    return 'sc-' + cmpMeta.tagNameMeta + (mode && mode !== DEFAULT_STYLE_MODE ? '-' + mode : '');
  }
  function getElementScopeId(scopeId, isHostElement) {
    return scopeId + (isHostElement ? '-h' : '-s');
  }
  function initStyleTemplate(domApi, cmpMeta, encapsulation, style, styleMode) {
    if (style) {
      // we got a style mode for this component, let's create an id for this style
      var styleModeId = cmpMeta.tagNameMeta + (styleMode || DEFAULT_STYLE_MODE);
      if (!cmpMeta[styleModeId]) {
        true;
        // ie11's template polyfill doesn't fully do the trick and there's still issues
        // so instead of trying to clone templates with styles in them, we'll just
        // keep a map of the style text as a string to create <style> elements for es5 builds
        cmpMeta[styleModeId] = style;
      }
    }
  }
  function attachStyles(plt, domApi, cmpMeta, hostElm) {
    // first see if we've got a style for a specific mode
    // either this host element should use scoped css
    // or it wants to use shadow dom but the browser doesn't support it
    // create a scope id which is useful for scoped css
    // and add the scope attribute to the host
    // create the style id w/ the host element's mode
    var styleId = cmpMeta.tagNameMeta + hostElm.mode;
    var styleTemplate = cmpMeta[styleId];
    var shouldScopeCss = 2 /* ScopedCss */ === cmpMeta.encapsulationMeta || 1 /* ShadowDom */ === cmpMeta.encapsulationMeta && !plt.domApi.$supportsShadowDom;
    shouldScopeCss && (hostElm['s-sc'] = styleTemplate ? getScopeId(cmpMeta, hostElm.mode) : getScopeId(cmpMeta));
    if (!styleTemplate) {
      // doesn't look like there's a style template with the mode
      // create the style id using the default style mode and try again
      styleId = cmpMeta.tagNameMeta + DEFAULT_STYLE_MODE;
      styleTemplate = cmpMeta[styleId];
    }
    if (styleTemplate) {
      // cool, we found a style template element for this component
      var styleContainerNode = domApi.$doc.head;
      // if this browser supports shadow dom, then let's climb up
      // the dom and see if we're within a shadow dom
            false;
      // if this container element already has these styles
      // then there's no need to apply them again
      // create an object to keep track if we'ready applied this component style
      var appliedStyles = plt.componentAppliedStyles.get(styleContainerNode);
      appliedStyles || plt.componentAppliedStyles.set(styleContainerNode, appliedStyles = {});
      // check if we haven't applied these styles to this container yet
            if (!appliedStyles[styleId]) {
        var styleElm = void 0;
        true;
        // es5 builds are not usig <template> because of ie11 issues
        // instead the "template" is just the style text as a string
        // create a new style element and add as innerHTML
        if (true, plt.customStyle) styleElm = plt.customStyle.createHostStyle(hostElm, styleId, styleTemplate); else {
          styleElm = domApi.$createElement('style');
          styleElm.innerHTML = styleTemplate;
          // remember we don't need to do this again for this element
                    appliedStyles[styleId] = true;
        }
        if (styleElm) {
          true;
          // add a style attributes, but only useful during dev
          domApi.$setAttribute(styleElm, 'data-style-tag', cmpMeta.tagNameMeta);
          hostElm.mode && domApi.$setAttribute(styleElm, 'data-style-mode', cmpMeta.tagNameMeta);
          hostElm['s-sc'] && domApi.$setAttribute(styleElm, 'data-style-scoped', 'true');
          var dataStyles = styleContainerNode.querySelectorAll('[data-styles]');
          domApi.$insertBefore(styleContainerNode, styleElm, dataStyles.length && dataStyles[dataStyles.length - 1].nextSibling || styleContainerNode.firstChild);
        }
      }
    }
  }
  var isDef = function(v) {
    return null != v;
  };
  var toLowerCase = function(str) {
    return str.toLowerCase();
  };
  var noop = function() {};
  function createDomApi(App, win, doc) {
    // using the $ prefix so that closure is
    // cool with property renaming each of these
    if (!App.ael) {
      App.ael = function(elm, eventName, cb, opts) {
        return elm.addEventListener(eventName, cb, opts);
      };
      App.rel = function(elm, eventName, cb, opts) {
        return elm.removeEventListener(eventName, cb, opts);
      };
    }
    var unregisterListenerFns = new WeakMap();
    true;
    if ('function' !== typeof win.CustomEvent) {
      // CustomEvent polyfill
      win.CustomEvent = function(event, data, evt) {
        evt = doc.createEvent('CustomEvent');
        evt.initCustomEvent(event, data.bubbles, data.cancelable, data.detail);
        return evt;
      };
      win.CustomEvent.prototype = win.Event.prototype;
    }
    var domApi = {
      $doc: doc,
      $supportsShadowDom: !!doc.documentElement.attachShadow,
      $supportsEventOptions: false,
      $nodeType: function(node) {
        return node.nodeType;
      },
      $createElement: function(tagName) {
        return doc.createElement(tagName);
      },
      $createElementNS: function(namespace, tagName) {
        return doc.createElementNS(namespace, tagName);
      },
      $createTextNode: function(text) {
        return doc.createTextNode(text);
      },
      $createComment: function(data) {
        return doc.createComment(data);
      },
      $insertBefore: function(parentNode, childNode, referenceNode) {
        return parentNode.insertBefore(childNode, referenceNode);
      },
      // https://developer.mozilla.org/en-US/docs/Web/API/ChildNode/remove
      // and it's polyfilled in es5 builds
      $remove: function(node) {
        return node.remove();
      },
      $appendChild: function(parentNode, childNode) {
        return parentNode.appendChild(childNode);
      },
      $addClass: function(elm, cssClass) {
        true, true;
        if (elm.classList) elm.classList.add(cssClass); else if ('svg' === elm.nodeName.toLowerCase()) {
          // https://caniuse.com/#search=classList
          // IE11 really does not do <svg> properly :-/
          var cssClasses = elm.getAttribute('class') || '';
          cssClasses.split(' ').includes(cssClass) || (cssClasses += ' ' + cssClass);
          elm.setAttribute('class', cssClasses.trim());
        }
      },
      $childNodes: function(node) {
        return node.childNodes;
      },
      $parentNode: function(node) {
        return node.parentNode;
      },
      $nextSibling: function(node) {
        return node.nextSibling;
      },
      $previousSibling: function(node) {
        return node.previousSibling;
      },
      $tagName: function(elm) {
        return toLowerCase(elm.nodeName);
      },
      $getTextContent: function(node) {
        return node.textContent;
      },
      $setTextContent: function(node, text) {
        return node.textContent = text;
      },
      $getAttribute: function(elm, key) {
        return elm.getAttribute(key);
      },
      $setAttribute: function(elm, key, val) {
        return elm.setAttribute(key, val);
      },
      $setAttributeNS: function(elm, namespaceURI, qualifiedName, val) {
        return elm.setAttributeNS(namespaceURI, qualifiedName, val);
      },
      $removeAttribute: function(elm, key) {
        return elm.removeAttribute(key);
      },
      $hasAttribute: function(elm, key) {
        return elm.hasAttribute(key);
      },
      $getMode: function(elm) {
        return elm.getAttribute('mode') || (App.Context || {}).mode;
      },
      $elementRef: function(elm, referenceName) {
        if ('child' === referenceName) return elm.firstElementChild;
        if ('parent' === referenceName) return domApi.$parentElement(elm);
        if ('body' === referenceName) return doc.body;
        if ('document' === referenceName) return doc;
        if ('window' === referenceName) return win;
        return elm;
      },
      $addEventListener: function(assignerElm, eventName, listenerCallback, useCapture, usePassive, attachTo, eventListenerOpts, splt) {
        // remember the original name before we possibly change it
        var assignersEventName = eventName;
        var attachToElm = assignerElm;
        // get the existing unregister listeners for
        // this element from the unregister listeners weakmap
                var assignersUnregListeners = unregisterListenerFns.get(assignerElm);
        assignersUnregListeners && assignersUnregListeners[assignersEventName] && 
        // removed any existing listeners for this event for the assigner element
        // this element already has this listener, so let's unregister it now
        assignersUnregListeners[assignersEventName]();
        if ('string' === typeof attachTo) 
        // attachTo is a string, and is probably something like
        // "parent", "window", or "document"
        // and the eventName would be like "mouseover" or "mousemove"
        attachToElm = domApi.$elementRef(assignerElm, attachTo); else if ('object' === typeof attachTo) 
        // we were passed in an actual element to attach to
        attachToElm = attachTo; else {
          // depending on the event name, we could actually be attaching
          // this element to something like the document or window
          splt = eventName.split(':');
          if (splt.length > 1) {
            // document:mousemove
            // parent:touchend
            // body:keyup.enter
            attachToElm = domApi.$elementRef(assignerElm, splt[0]);
            eventName = splt[1];
          }
        }
        if (!attachToElm) 
        // somehow we're referencing an element that doesn't exist
        // let's not continue
        return;
        var eventListener = listenerCallback;
        // test to see if we're looking for an exact keycode
                splt = eventName.split('.');
        if (splt.length > 1) {
          // looks like this listener is also looking for a keycode
          // keyup.enter
          eventName = splt[0];
          eventListener = function(ev) {
            // wrap the user's event listener with our own check to test
            // if this keyboard event has the keycode they're looking for
            ev.keyCode === KEY_CODE_MAP[splt[1]] && listenerCallback(ev);
          };
        }
        // create the actual event listener options to use
        // this browser may not support event options
                eventListenerOpts = domApi.$supportsEventOptions ? {
          capture: !!useCapture,
          passive: !!usePassive
        } : !!useCapture;
        // ok, good to go, let's add the actual listener to the dom element
                App.ael(attachToElm, eventName, eventListener, eventListenerOpts);
        assignersUnregListeners || 
        // we don't already have a collection, let's create it
        unregisterListenerFns.set(assignerElm, assignersUnregListeners = {});
        // add the unregister listener to this element's collection
                assignersUnregListeners[assignersEventName] = function() {
          // looks like it's time to say goodbye
          attachToElm && App.rel(attachToElm, eventName, eventListener, eventListenerOpts);
          assignersUnregListeners[assignersEventName] = null;
        };
      },
      $removeEventListener: function(elm, eventName) {
        // get the unregister listener functions for this element
        var assignersUnregListeners = unregisterListenerFns.get(elm);
        assignersUnregListeners && (
        // this element has unregister listeners
        eventName ? 
        // passed in one specific event name to remove
        assignersUnregListeners[eventName] && assignersUnregListeners[eventName]() : 
        // remove all event listeners
        Object.keys(assignersUnregListeners).forEach(function(assignersEventName) {
          assignersUnregListeners[assignersEventName] && assignersUnregListeners[assignersEventName]();
        }));
      },
      $dispatchEvent: function(elm, eventName, data) {
        return elm && elm.dispatchEvent(new win.CustomEvent(eventName, data));
      },
      $parentElement: function(elm, parentNode) {
        // if the parent node is a document fragment (shadow root)
        // then use the "host" property on it
        // otherwise use the parent node
        return (parentNode = domApi.$parentNode(elm)) && 11 /* DocumentFragment */ === domApi.$nodeType(parentNode) ? parentNode.host : parentNode;
      }
    };
    true;
    win.location.search.indexOf('shadow=false') > 0 && (
    // by adding ?shadow=false it'll force the slot polyfill
    // only add this check when in dev mode
    domApi.$supportsShadowDom = false);
    false;
    true;
    // test if this browser supports event options or not
    try {
      win.addEventListener('e', null, Object.defineProperty({}, 'passive', {
        get: function() {
          return domApi.$supportsEventOptions = true;
        }
      }));
    } catch (e) {}
    return domApi;
  }
  function updateAttribute(elm, memberName, newValue, isBooleanAttr) {
    void 0 === isBooleanAttr && (isBooleanAttr = 'boolean' === typeof newValue);
    var isXlinkNs = memberName !== (memberName = memberName.replace(/^xlink\:?/, ''));
    if (null == newValue || isBooleanAttr && (!newValue || 'false' === newValue)) isXlinkNs ? elm.removeAttributeNS(XLINK_NS$1, toLowerCase(memberName)) : elm.removeAttribute(memberName); else if ('function' !== typeof newValue) {
      newValue = isBooleanAttr ? '' : newValue.toString();
      isXlinkNs ? elm.setAttributeNS(XLINK_NS$1, toLowerCase(memberName), newValue) : elm.setAttribute(memberName, newValue);
    }
  }
  var XLINK_NS$1 = 'http://www.w3.org/1999/xlink';
  function setAccessor(plt, elm, memberName, oldValue, newValue, isSvg, isHostElement) {
    if ('class' !== memberName || isSvg) if ('style' === memberName) {
      // update style attribute, css properties and values
      for (var prop in oldValue) newValue && null != newValue[prop] || (/-/.test(prop) ? elm.style.removeProperty(prop) : elm.style[prop] = '');
      for (var prop in newValue) oldValue && newValue[prop] === oldValue[prop] || (/-/.test(prop) ? elm.style.setProperty(prop, newValue[prop]) : elm.style[prop] = newValue[prop]);
    } else if ('o' !== memberName[0] || 'n' !== memberName[1] || !/[A-Z]/.test(memberName[2]) || memberName in elm) if ('list' !== memberName && 'type' !== memberName && !isSvg && (memberName in elm || -1 !== [ 'object', 'function' ].indexOf(typeof newValue) && null !== newValue) || false) {
      // Properties
      // - list and type are attributes that get applied as values on the element
      // - all svgs get values as attributes not props
      // - check if elm contains name or if the value is array, object, or function
      var cmpMeta = plt.getComponentMeta(elm);
      if (cmpMeta && cmpMeta.membersMeta && cmpMeta.membersMeta[memberName]) {
        // we know for a fact that this element is a known component
        // and this component has this member name as a property,
        // let's set the known @Prop on this element
        // set it directly as property on the element
        setProperty(elm, memberName, newValue);
        false;
      } else if ('ref' !== memberName) {
        // this member name is a property on this element, but it's not a component
        // this is a native property like "value" or something
        // also we can ignore the "ref" member name at this point
        setProperty(elm, memberName, null == newValue ? '' : newValue);
        null != newValue && false !== newValue || plt.domApi.$removeAttribute(elm, memberName);
      }
    } else null != newValue && 'key' !== memberName ? 
    // Element Attributes
    updateAttribute(elm, memberName, newValue) : (isSvg || plt.domApi.$hasAttribute(elm, memberName) && (null == newValue || false === newValue)) && 
    // remove svg attribute
    plt.domApi.$removeAttribute(elm, memberName); else {
      // Event Handlers
      // so if the member name starts with "on" and the 3rd characters is
      // a capital letter, and it's not already a member on the element,
      // then we're assuming it's an event listener
      // standard event
      // the JSX attribute could have been "onMouseOver" and the
      // member name "onmouseover" is on the element's prototype
      // so let's add the listener "mouseover", which is all lowercased
      memberName = toLowerCase(memberName) in elm ? toLowerCase(memberName.substring(2)) : toLowerCase(memberName[2]) + memberName.substring(3);
      newValue ? newValue !== oldValue && 
      // add listener
      plt.domApi.$addEventListener(elm, memberName, newValue) : 
      // remove listener
      plt.domApi.$removeEventListener(elm, memberName);
    } else 
    // Class
    if (oldValue !== newValue) {
      var oldList_1 = parseClassList(oldValue);
      var newList_1 = parseClassList(newValue);
      // remove classes in oldList, not included in newList
            var toRemove_1 = oldList_1.filter(function(item) {
        return !newList_1.includes(item);
      });
      var classList_1 = parseClassList(elm.className).filter(function(item) {
        return !toRemove_1.includes(item);
      });
      // add classes from newValue that are not in oldList or classList
            var toAdd = newList_1.filter(function(item) {
        return !oldList_1.includes(item) && !classList_1.includes(item);
      });
      classList_1.push.apply(classList_1, toAdd);
      elm.className = classList_1.join(' ');
    }
  }
  function parseClassList(value) {
    return null == value || '' === value ? [] : value.trim().split(/\s+/);
  }
  /**
     * Attempt to set a DOM property to the given value.
     * IE & FF throw for certain property-value combinations.
     */  function setProperty(elm, name, value) {
    try {
      elm[name] = value;
    } catch (e) {}
  }
  function updateElement(plt, oldVnode, newVnode, isSvgMode, memberName) {
    // if the element passed in is a shadow root, which is a document fragment
    // then we want to be adding attrs/props to the shadow root's "host" element
    // if it's not a shadow root, then we add attrs/props to the same element
    var elm = 11 /* DocumentFragment */ === newVnode.elm.nodeType && newVnode.elm.host ? newVnode.elm.host : newVnode.elm;
    var oldVnodeAttrs = oldVnode && oldVnode.vattrs || EMPTY_OBJ;
    var newVnodeAttrs = newVnode.vattrs || EMPTY_OBJ;
    // remove attributes no longer present on the vnode by setting them to undefined
        for (memberName in oldVnodeAttrs) newVnodeAttrs && null != newVnodeAttrs[memberName] || null == oldVnodeAttrs[memberName] || setAccessor(plt, elm, memberName, oldVnodeAttrs[memberName], void 0, isSvgMode, newVnode.ishost);
    // add new & update changed attributes
        for (memberName in newVnodeAttrs) memberName in oldVnodeAttrs && newVnodeAttrs[memberName] === ('value' === memberName || 'checked' === memberName ? elm[memberName] : oldVnodeAttrs[memberName]) || setAccessor(plt, elm, memberName, oldVnodeAttrs[memberName], newVnodeAttrs[memberName], isSvgMode, newVnode.ishost);
  }
  var isSvgMode = false;
  function createRendererPatch(plt, domApi) {
    // createRenderer() is only created once per app
    // the patch() function which createRenderer() returned is the function
    // which gets called numerous times by each component
    // internal variables to be reused per patch() call
    var useNativeShadowDom, scopeId, checkSlotFallbackVisibility, checkSlotRelocate, contentRef, hostTagName, hostElm;
    function createElm(oldParentVNode, newParentVNode, childIndex, parentElm, i, elm, childNode, newVNode, oldVNode) {
      newVNode = newParentVNode.vchildren[childIndex];
      if (true, !useNativeShadowDom) {
        // remember for later we need to check to relocate nodes
        checkSlotRelocate = true;
        if ('slot' === newVNode.vtag) {
          scopeId && 
          // scoped css needs to add its scoped id to the parent element
          domApi.$addClass(parentElm, scopeId + '-s');
          newVNode.vchildren ? 
          // slot element has fallback content
          // still create an element that "mocks" the slot element
          newVNode.isSlotFallback = true : 
          // slot element does not have fallback content
          // create an html comment we'll use to always reference
          // where actual slot content should sit next to
          newVNode.isSlotReference = true;
        }
      }
      if (isDef(newVNode.vtext)) 
      // create text node
      newVNode.elm = domApi.$createTextNode(newVNode.vtext); else if (true, newVNode.isSlotReference) 
      // create a slot reference html text node
      newVNode.elm = domApi.$createTextNode(''); else {
        // create element
        elm = newVNode.elm = (true, isSvgMode || 'svg' === newVNode.vtag ? domApi.$createElementNS('http://www.w3.org/2000/svg', newVNode.vtag) : domApi.$createElement((true, 
        newVNode.isSlotFallback ? 'slot-fb' : newVNode.vtag)));
        plt.isDefinedComponent(elm) && plt.isCmpReady.delete(hostElm);
        true;
        isSvgMode = 'svg' === newVNode.vtag || 'foreignObject' !== newVNode.vtag && isSvgMode;
        // add css classes, attrs, props, listeners, etc.
        updateElement(plt, null, newVNode, isSvgMode);
        isDef(scopeId) && elm['s-si'] !== scopeId && 
        // if there is a scopeId and this is the initial render
        // then let's add the scopeId as an attribute
        domApi.$addClass(elm, elm['s-si'] = scopeId);
        false;
        if (newVNode.vchildren) for (i = 0; i < newVNode.vchildren.length; ++i) {
          // create the node
          childNode = createElm(oldParentVNode, newVNode, i, elm);
          // return node could have been null
                    if (childNode) {
            false;
            // append our new node
            domApi.$appendChild(elm, childNode);
            false;
          }
        }
        (true, 'svg' === newVNode.vtag) && (
        // Only reset the SVG context when we're exiting SVG element
        isSvgMode = false);
      }
      true;
      newVNode.elm['s-hn'] = hostTagName;
      if (newVNode.isSlotFallback || newVNode.isSlotReference) {
        // remember the content reference comment
        newVNode.elm['s-sr'] = true;
        // remember the content reference comment
                newVNode.elm['s-cr'] = contentRef;
        // remember the slot name, or empty string for default slot
                newVNode.elm['s-sn'] = newVNode.vname || '';
        // check if we've got an old vnode for this slot
                oldVNode = oldParentVNode && oldParentVNode.vchildren && oldParentVNode.vchildren[childIndex];
        oldVNode && oldVNode.vtag === newVNode.vtag && oldParentVNode.elm && 
        // we've got an old slot vnode and the wrapper is being replaced
        // so let's move the old slot content back to it's original location
        putBackInOriginalLocation(oldParentVNode.elm);
      }
      return newVNode.elm;
    }
    function putBackInOriginalLocation(parentElm, recursive, i, childNode) {
      plt.tmpDisconnected = true;
      var oldSlotChildNodes = domApi.$childNodes(parentElm);
      for (i = oldSlotChildNodes.length - 1; i >= 0; i--) {
        childNode = oldSlotChildNodes[i];
        if (childNode['s-hn'] !== hostTagName && childNode['s-ol']) {
          // this child node in the old element is from another component
          // remove this node from the old slot's parent
          domApi.$remove(childNode);
          // and relocate it back to it's original location
                    domApi.$insertBefore(parentReferenceNode(childNode), childNode, referenceNode(childNode));
          // remove the old original location comment entirely
          // later on the patch function will know what to do
          // and move this to the correct spot in need be
                    domApi.$remove(childNode['s-ol']);
          childNode['s-ol'] = null;
          checkSlotRelocate = true;
        }
        recursive && putBackInOriginalLocation(childNode, recursive);
      }
      plt.tmpDisconnected = false;
    }
    function addVnodes(parentElm, before, parentVNode, vnodes, startIdx, endIdx, containerElm, childNode) {
      var contentRef = parentElm['s-cr'];
      containerElm = contentRef && domApi.$parentNode(contentRef) || parentElm;
      containerElm.shadowRoot && domApi.$tagName(containerElm) === hostTagName && (containerElm = containerElm.shadowRoot);
      for (;startIdx <= endIdx; ++startIdx) if (vnodes[startIdx]) {
        childNode = isDef(vnodes[startIdx].vtext) ? domApi.$createTextNode(vnodes[startIdx].vtext) : createElm(null, parentVNode, startIdx, parentElm);
        if (childNode) {
          vnodes[startIdx].elm = childNode;
          domApi.$insertBefore(containerElm, childNode, referenceNode(before));
        }
      }
    }
    function removeVnodes(vnodes, startIdx, endIdx, node) {
      for (;startIdx <= endIdx; ++startIdx) if (isDef(vnodes[startIdx])) {
        node = vnodes[startIdx].elm;
        true;
        // we're removing this element
        // so it's possible we need to show slot fallback content now
        checkSlotFallbackVisibility = true;
        node['s-ol'] ? 
        // remove the original location comment
        domApi.$remove(node['s-ol']) : 
        // it's possible that child nodes of the node
        // that's being removed are slot nodes
        putBackInOriginalLocation(node, true);
        // remove the vnode's element from the dom
        domApi.$remove(node);
      }
    }
    function updateChildren(parentElm, oldCh, newVNode, newCh, idxInOld, i, node, elmToMove) {
      var oldStartIdx = 0, newStartIdx = 0;
      var oldEndIdx = oldCh.length - 1;
      var oldStartVnode = oldCh[0];
      var oldEndVnode = oldCh[oldEndIdx];
      var newEndIdx = newCh.length - 1;
      var newStartVnode = newCh[0];
      var newEndVnode = newCh[newEndIdx];
      while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) if (null == oldStartVnode) 
      // Vnode might have been moved left
      oldStartVnode = oldCh[++oldStartIdx]; else if (null == oldEndVnode) oldEndVnode = oldCh[--oldEndIdx]; else if (null == newStartVnode) newStartVnode = newCh[++newStartIdx]; else if (null == newEndVnode) newEndVnode = newCh[--newEndIdx]; else if (isSameVnode(oldStartVnode, newStartVnode)) {
        patchVNode(oldStartVnode, newStartVnode);
        oldStartVnode = oldCh[++oldStartIdx];
        newStartVnode = newCh[++newStartIdx];
      } else if (isSameVnode(oldEndVnode, newEndVnode)) {
        patchVNode(oldEndVnode, newEndVnode);
        oldEndVnode = oldCh[--oldEndIdx];
        newEndVnode = newCh[--newEndIdx];
      } else if (isSameVnode(oldStartVnode, newEndVnode)) {
        // Vnode moved right
        'slot' !== oldStartVnode.vtag && 'slot' !== newEndVnode.vtag || putBackInOriginalLocation(domApi.$parentNode(oldStartVnode.elm));
        patchVNode(oldStartVnode, newEndVnode);
        domApi.$insertBefore(parentElm, oldStartVnode.elm, domApi.$nextSibling(oldEndVnode.elm));
        oldStartVnode = oldCh[++oldStartIdx];
        newEndVnode = newCh[--newEndIdx];
      } else if (isSameVnode(oldEndVnode, newStartVnode)) {
        // Vnode moved left
        'slot' !== oldStartVnode.vtag && 'slot' !== newEndVnode.vtag || putBackInOriginalLocation(domApi.$parentNode(oldEndVnode.elm));
        patchVNode(oldEndVnode, newStartVnode);
        domApi.$insertBefore(parentElm, oldEndVnode.elm, oldStartVnode.elm);
        oldEndVnode = oldCh[--oldEndIdx];
        newStartVnode = newCh[++newStartIdx];
      } else {
        // createKeyToOldIdx
        idxInOld = null;
        for (i = oldStartIdx; i <= oldEndIdx; ++i) if (oldCh[i] && isDef(oldCh[i].vkey) && oldCh[i].vkey === newStartVnode.vkey) {
          idxInOld = i;
          break;
        }
        if (isDef(idxInOld)) {
          elmToMove = oldCh[idxInOld];
          if (elmToMove.vtag !== newStartVnode.vtag) node = createElm(oldCh && oldCh[newStartIdx], newVNode, idxInOld, parentElm); else {
            patchVNode(elmToMove, newStartVnode);
            oldCh[idxInOld] = void 0;
            node = elmToMove.elm;
          }
          newStartVnode = newCh[++newStartIdx];
        } else {
          // new element
          node = createElm(oldCh && oldCh[newStartIdx], newVNode, newStartIdx, parentElm);
          newStartVnode = newCh[++newStartIdx];
        }
        node && domApi.$insertBefore(parentReferenceNode(oldStartVnode.elm), node, referenceNode(oldStartVnode.elm));
      }
      oldStartIdx > oldEndIdx ? addVnodes(parentElm, null == newCh[newEndIdx + 1] ? null : newCh[newEndIdx + 1].elm, newVNode, newCh, newStartIdx, newEndIdx) : newStartIdx > newEndIdx && removeVnodes(oldCh, oldStartIdx, oldEndIdx);
    }
    function isSameVnode(vnode1, vnode2) {
      // compare if two vnode to see if they're "technically" the same
      // need to have the same element tag, and same key to be the same
      if (vnode1.vtag === vnode2.vtag && vnode1.vkey === vnode2.vkey) {
        true;
        if ('slot' === vnode1.vtag) return vnode1.vname === vnode2.vname;
        return true;
      }
      return false;
    }
    function referenceNode(node) {
      true;
      if (node && node['s-ol']) 
      // this node was relocated to a new location in the dom
      // because of some other component's slot
      // but we still have an html comment in place of where
      // it's original location was according to it's original vdom
      return node['s-ol'];
      return node;
    }
    function parentReferenceNode(node) {
      return domApi.$parentNode(node['s-ol'] ? node['s-ol'] : node);
    }
    function patchVNode(oldVNode, newVNode, defaultHolder) {
      var elm = newVNode.elm = oldVNode.elm;
      var oldChildren = oldVNode.vchildren;
      var newChildren = newVNode.vchildren;
      true;
      // test if we're rendering an svg element, or still rendering nodes inside of one
      // only add this to the when the compiler sees we're using an svg somewhere
      isSvgMode = newVNode.elm && isDef(domApi.$parentElement(newVNode.elm)) && void 0 !== newVNode.elm.ownerSVGElement;
      isSvgMode = 'svg' === newVNode.vtag || 'foreignObject' !== newVNode.vtag && isSvgMode;
      if (isDef(newVNode.vtext)) true, (defaultHolder = elm['s-cr']) ? 
      // this element has slotted content
      domApi.$setTextContent(domApi.$parentNode(defaultHolder), newVNode.vtext) : oldVNode.vtext !== newVNode.vtext && 
      // update the text content for the text only vnode
      // and also only if the text is different than before
      domApi.$setTextContent(elm, newVNode.vtext); else {
        // element node
        'slot' !== newVNode.vtag && 
        // either this is the first render of an element OR it's an update
        // AND we already know it's possible it could have changed
        // this updates the element's css classes, attrs, props, listeners, etc.
        updateElement(plt, oldVNode, newVNode, isSvgMode);
        if (isDef(oldChildren) && isDef(newChildren)) 
        // looks like there's child vnodes for both the old and new vnodes
        updateChildren(elm, oldChildren, newVNode, newChildren); else if (isDef(newChildren)) {
          // no old child vnodes, but there are new child vnodes to add
          isDef(oldVNode.vtext) && 
          // the old vnode was text, so be sure to clear it out
          domApi.$setTextContent(elm, '');
          // add the new vnode children
                    addVnodes(elm, null, newVNode, newChildren, 0, newChildren.length - 1);
        } else isDef(oldChildren) && 
        // no new child vnodes, but there are old child vnodes to remove
        removeVnodes(oldChildren, 0, oldChildren.length - 1);
      }
      true;
      // reset svgMode when svg node is fully patched
      isSvgMode && 'svg' === newVNode.vtag && (isSvgMode = false);
    }
    function updateFallbackSlotVisibility(elm, childNode, childNodes, i, ilen, j, slotNameAttr, nodeType) {
      childNodes = domApi.$childNodes(elm);
      for (i = 0, ilen = childNodes.length; i < ilen; i++) {
        childNode = childNodes[i];
        if (1 /* ElementNode */ === domApi.$nodeType(childNode)) {
          if (childNode['s-sr']) {
            // this is a slot fallback node
            // get the slot name for this slot reference node
            slotNameAttr = childNode['s-sn'];
            // by default always show a fallback slot node
            // then hide it if there are other slots in the light dom
                        childNode.hidden = false;
            for (j = 0; j < ilen; j++) if (childNodes[j]['s-hn'] !== childNode['s-hn']) {
              // this sibling node is from a different component
              nodeType = domApi.$nodeType(childNodes[j]);
              if ('' !== slotNameAttr) {
                // this is a named fallback slot node
                if (1 /* ElementNode */ === nodeType && slotNameAttr === domApi.$getAttribute(childNodes[j], 'slot')) {
                  childNode.hidden = true;
                  break;
                }
              } else 
              // this is a default fallback slot node
              // any element or text node (with content)
              // should hide the default fallback slot node
              if (1 /* ElementNode */ === nodeType || 3 /* TextNode */ === nodeType && '' !== domApi.$getTextContent(childNodes[j]).trim()) {
                childNode.hidden = true;
                break;
              }
            }
          }
          // keep drilling down
                    updateFallbackSlotVisibility(childNode);
        }
      }
    }
    var relocateNodes = [];
    function relocateSlotContent(elm, childNodes, childNode, node, i, ilen, j, hostContentNodes, slotNameAttr, nodeType) {
      childNodes = domApi.$childNodes(elm);
      for (i = 0, ilen = childNodes.length; i < ilen; i++) {
        childNode = childNodes[i];
        if (childNode['s-sr'] && (node = childNode['s-cr'])) {
          // first got the content reference comment node
          // then we got it's parent, which is where all the host content is in now
          hostContentNodes = domApi.$childNodes(domApi.$parentNode(node));
          slotNameAttr = childNode['s-sn'];
          for (j = hostContentNodes.length - 1; j >= 0; j--) {
            node = hostContentNodes[j];
            if (!node['s-cn'] && !node['s-nr'] && node['s-hn'] !== childNode['s-hn']) {
              // let's do some relocating to its new home
              // but never relocate a content reference node
              // that is suppose to always represent the original content location
              nodeType = domApi.$nodeType(node);
              if (((3 /* TextNode */ === nodeType || 8 /* CommentNode */ === nodeType) && '' === slotNameAttr || 1 /* ElementNode */ === nodeType && null === domApi.$getAttribute(node, 'slot') && '' === slotNameAttr || 1 /* ElementNode */ === nodeType && domApi.$getAttribute(node, 'slot') === slotNameAttr) && !relocateNodes.some(function(r) {
                return r.nodeToRelocate === node;
              })) {
                // made some changes to slots
                // let's make sure we also double check
                // fallbacks are correctly hidden or shown
                checkSlotFallbackVisibility = true;
                node['s-sn'] = slotNameAttr;
                // add to our list of nodes to relocate
                                relocateNodes.push({
                  slotRefNode: childNode,
                  nodeToRelocate: node
                });
              }
            }
          }
        }
        1 /* ElementNode */ === domApi.$nodeType(childNode) && relocateSlotContent(childNode);
      }
    }
    return function patch(hostElement, oldVNode, newVNode, useNativeShadowDomVal, encapsulation, ssrPatchId, i, relocateNode, orgLocationNode, refNode, parentNodeRef, insertBeforeNode) {
      // patchVNode() is synchronous
      // so it is safe to set these variables and internally
      // the same patch() call will reference the same data
      hostElm = hostElement;
      hostTagName = domApi.$tagName(hostElm);
      contentRef = hostElm['s-cr'];
      useNativeShadowDom = useNativeShadowDomVal;
      false;
      true;
      // get the scopeId
      scopeId = hostElm['s-sc'];
      // always reset
            checkSlotRelocate = checkSlotFallbackVisibility = false;
      // synchronous patch
      patchVNode(oldVNode, newVNode);
      false;
      true;
      if (checkSlotRelocate) {
        relocateSlotContent(newVNode.elm);
        for (i = 0; i < relocateNodes.length; i++) {
          relocateNode = relocateNodes[i];
          if (!relocateNode.nodeToRelocate['s-ol']) {
            // add a reference node marking this node's original location
            // keep a reference to this node for later lookups
            orgLocationNode = domApi.$createTextNode('');
            orgLocationNode['s-nr'] = relocateNode.nodeToRelocate;
            domApi.$insertBefore(domApi.$parentNode(relocateNode.nodeToRelocate), relocateNode.nodeToRelocate['s-ol'] = orgLocationNode, relocateNode.nodeToRelocate);
          }
        }
        // while we're moving nodes around existing nodes, temporarily disable
        // the disconnectCallback from working
                plt.tmpDisconnected = true;
        for (i = 0; i < relocateNodes.length; i++) {
          relocateNode = relocateNodes[i];
          // by default we're just going to insert it directly
          // after the slot reference node
                    parentNodeRef = domApi.$parentNode(relocateNode.slotRefNode);
          insertBeforeNode = domApi.$nextSibling(relocateNode.slotRefNode);
          orgLocationNode = relocateNode.nodeToRelocate['s-ol'];
          while (orgLocationNode = domApi.$previousSibling(orgLocationNode)) if ((refNode = orgLocationNode['s-nr']) && refNode && refNode['s-sn'] === relocateNode.nodeToRelocate['s-sn'] && parentNodeRef === domApi.$parentNode(refNode) && (refNode = domApi.$nextSibling(refNode)) && refNode && !refNode['s-nr']) {
            insertBeforeNode = refNode;
            break;
          }
          if ((!insertBeforeNode && parentNodeRef !== domApi.$parentNode(relocateNode.nodeToRelocate) || domApi.$nextSibling(relocateNode.nodeToRelocate) !== insertBeforeNode) && relocateNode.nodeToRelocate !== insertBeforeNode) {
            // remove the node from the dom
            domApi.$remove(relocateNode.nodeToRelocate);
            // add it back to the dom but in its new home
                        domApi.$insertBefore(parentNodeRef, relocateNode.nodeToRelocate, insertBeforeNode);
          }
        }
        // done moving nodes around
        // allow the disconnect callback to work again
                plt.tmpDisconnected = false;
      }
      checkSlotFallbackVisibility && updateFallbackSlotVisibility(newVNode.elm);
      // always reset
            relocateNodes.length = 0;
      // return our new vnode
      return newVNode;
    };
  }
  function callNodeRefs(vNode, isDestroy) {
    if (vNode) {
      vNode.vattrs && vNode.vattrs.ref && vNode.vattrs.ref(isDestroy ? null : vNode.elm);
      vNode.vchildren && vNode.vchildren.forEach(function(vChild) {
        callNodeRefs(vChild, isDestroy);
      });
    }
  }
  function createVNodesFromSsr(plt, domApi, rootElm) {
    var allSsrElms = rootElm.querySelectorAll('[' + SSR_VNODE_ID + ']');
    var ilen = allSsrElms.length;
    var elm, ssrVNodeId, ssrVNode, i, j, jlen;
    if (ilen > 0) {
      plt.isCmpReady.set(rootElm, true);
      for (i = 0; i < ilen; i++) {
        elm = allSsrElms[i];
        ssrVNodeId = domApi.$getAttribute(elm, SSR_VNODE_ID);
        ssrVNode = {};
        ssrVNode.vtag = domApi.$tagName(ssrVNode.elm = elm);
        plt.vnodeMap.set(elm, ssrVNode);
        for (j = 0, jlen = elm.childNodes.length; j < jlen; j++) addChildSsrVNodes(domApi, elm.childNodes[j], ssrVNode, ssrVNodeId, true);
      }
    }
  }
  function addChildSsrVNodes(domApi, node, parentVNode, ssrVNodeId, checkNestedElements) {
    var nodeType = domApi.$nodeType(node);
    var previousComment;
    var childVNodeId, childVNodeSplt, childVNode;
    if (checkNestedElements && 1 /* ElementNode */ === nodeType) {
      childVNodeId = domApi.$getAttribute(node, SSR_CHILD_ID);
      if (childVNodeId) {
        // split the start comment's data with a period
        childVNodeSplt = childVNodeId.split('.');
        // ensure this this element is a child element of the ssr vnode
                if (childVNodeSplt[0] === ssrVNodeId) {
          // cool, this element is a child to the parent vnode
          childVNode = {};
          childVNode.vtag = domApi.$tagName(childVNode.elm = node);
          // this is a new child vnode
          // so ensure its parent vnode has the vchildren array
                    parentVNode.vchildren || (parentVNode.vchildren = []);
          // add our child vnode to a specific index of the vnode's children
                    parentVNode.vchildren[childVNodeSplt[1]] = childVNode;
          // this is now the new parent vnode for all the next child checks
                    parentVNode = childVNode;
          // if there's a trailing period, then it means there aren't any
          // more nested elements, but maybe nested text nodes
          // either way, don't keep walking down the tree after this next call
                    checkNestedElements = '' !== childVNodeSplt[2];
        }
      }
      // keep drilling down through the elements
            for (var i = 0; i < node.childNodes.length; i++) addChildSsrVNodes(domApi, node.childNodes[i], parentVNode, ssrVNodeId, checkNestedElements);
    } else if (3 /* TextNode */ === nodeType && (previousComment = node.previousSibling) && 8 /* CommentNode */ === domApi.$nodeType(previousComment)) {
      // split the start comment's data with a period
      childVNodeSplt = domApi.$getTextContent(previousComment).split('.');
      // ensure this is an ssr text node start comment
      // which should start with an "s" and delimited by periods
            if ('s' === childVNodeSplt[0] && childVNodeSplt[1] === ssrVNodeId) {
        // cool, this is a text node and it's got a start comment
        childVNode = {
          vtext: domApi.$getTextContent(node)
        };
        childVNode.elm = node;
        // this is a new child vnode
        // so ensure its parent vnode has the vchildren array
                parentVNode.vchildren || (parentVNode.vchildren = []);
        // add our child vnode to a specific index of the vnode's children
                parentVNode.vchildren[childVNodeSplt[2]] = childVNode;
      }
    }
  }
  function createQueueClient(App, win) {
    var now = function() {
      return win.performance.now();
    };
    var resolved = Promise.resolve();
    var highPriority = [];
    var domReads = [];
    var domWrites = [];
    var domWritesLow = [];
    var congestion = 0;
    var rafPending = false;
    App.raf || (App.raf = win.requestAnimationFrame.bind(win));
    function queueTask(queue) {
      return function(cb) {
        // queue dom reads
        queue.push(cb);
        if (!rafPending) {
          rafPending = true;
          App.raf(flush);
        }
      };
    }
    function consume(queue) {
      for (var i = 0; i < queue.length; i++) try {
        queue[i](now());
      } catch (e) {
        console.error(e);
      }
      queue.length = 0;
    }
    function consumeTimeout(queue, timeout) {
      var i = 0;
      var ts;
      while (i < queue.length && (ts = now()) < timeout) try {
        queue[i++](ts);
      } catch (e) {
        console.error(e);
      }
      i === queue.length ? queue.length = 0 : 0 !== i && queue.splice(0, i);
    }
    function flush() {
      congestion++;
      // always force a bunch of medium callbacks to run, but still have
      // a throttle on how many can run in a certain time
      // DOM READS!!!
            consume(domReads);
      var start = now() + 7 * Math.ceil(congestion * (1 / 22));
      // DOM WRITES!!!
            consumeTimeout(domWrites, start);
      consumeTimeout(domWritesLow, start);
      if (domWrites.length > 0) {
        domWritesLow.push.apply(domWritesLow, domWrites);
        domWrites.length = 0;
      }
      (rafPending = domReads.length + domWrites.length + domWritesLow.length > 0) ? 
      // still more to do yet, but we've run out of time
      // let's let this thing cool off and try again in the next tick
      App.raf(flush) : congestion = 0;
    }
    return {
      tick: function(cb) {
        // queue high priority work to happen in next tick
        // uses Promise.resolve() for next tick
        highPriority.push(cb);
        1 === highPriority.length && resolved.then(function() {
          return consume(highPriority);
        });
      },
      read: queueTask(domReads),
      write: queueTask(domWrites)
    };
  }
  function initElementListeners(plt, elm) {
    // so the element was just connected, which means it's in the DOM
    // however, the component instance hasn't been created yet
    // but what if an event it should be listening to get emitted right now??
    // let's add our listeners right now to our element, and if it happens
    // to receive events between now and the instance being created let's
    // queue up all of the event data and fire it off on the instance when it's ready
    var cmpMeta = plt.getComponentMeta(elm);
    cmpMeta.listenersMeta && 
    // we've got listens
    cmpMeta.listenersMeta.forEach(function(listenMeta) {
      // go through each listener
      listenMeta.eventDisabled || 
      // only add ones that are not already disabled
      plt.domApi.$addEventListener(elm, listenMeta.eventName, createListenerCallback(plt, elm, listenMeta.eventMethodName), listenMeta.eventCapture, listenMeta.eventPassive);
    });
  }
  function createListenerCallback(plt, elm, eventMethodName, val) {
    // create the function that gets called when the element receives
    // an event which it should be listening for
    return function(ev) {
      // get the instance if it exists
      val = plt.instanceMap.get(elm);
      if (val) 
      // instance is ready, let's call it's member method for this event
      val[eventMethodName](ev); else {
        // instance is not ready!!
        // let's queue up this event data and replay it later
        // when the instance is ready
        val = plt.queuedEvents.get(elm) || [];
        val.push(eventMethodName, ev);
        plt.queuedEvents.set(elm, val);
      }
    };
  }
  function enableEventListener(plt, instance, eventName, shouldEnable, attachTo, passive) {
    if (instance) {
      // cool, we've got an instance, it's get the element it's on
      var elm = plt.hostElementMap.get(instance);
      var cmpMeta = plt.getComponentMeta(elm);
      if (cmpMeta && cmpMeta.listenersMeta) 
      // alrighty, so this cmp has listener meta
      if (shouldEnable) {
        // we want to enable this event
        // find which listen meta we're talking about
        var listenMeta_1 = cmpMeta.listenersMeta.find(function(l) {
          return l.eventName === eventName;
        });
        listenMeta_1 && 
        // found the listen meta, so let's add the listener
        plt.domApi.$addEventListener(elm, eventName, function(ev) {
          return instance[listenMeta_1.eventMethodName](ev);
        }, listenMeta_1.eventCapture, void 0 === passive ? listenMeta_1.eventPassive : !!passive, attachTo);
      } else 
      // we're disabling the event listener
      // so let's just remove it entirely
      plt.domApi.$removeEventListener(elm, eventName);
    }
  }
  function generateDevInspector(App, namespace, win, plt) {
    var devInspector = win.devInspector = win.devInspector || {};
    devInspector.apps = devInspector.apps || [];
    devInspector.apps.push(generateDevInspectorApp(App, namespace, plt));
    devInspector.getInstance || (devInspector.getInstance = function(elm) {
      return Promise.all(devInspector.apps.map(function(app) {
        return app.getInstance(elm);
      })).then(function(results) {
        return results.find(function(instance) {
          return !!instance;
        });
      });
    });
    devInspector.getComponents || (devInspector.getComponents = function() {
      var appsMetadata = [];
      devInspector.apps.forEach(function(app) {
        appsMetadata.push(app.getComponents());
      });
      return Promise.all(appsMetadata).then(function(appMetadata) {
        var allMetadata = [];
        appMetadata.forEach(function(metadata) {
          metadata.forEach(function(m) {
            allMetadata.push(m);
          });
        });
        return allMetadata;
      });
    });
    return devInspector;
  }
  function generateDevInspectorApp(App, namespace, plt) {
    var app = {
      namespace: namespace,
      getInstance: function(elm) {
        if (elm && elm.tagName) return Promise.all([ getComponentMeta(plt, elm.tagName), getComponentInstance(plt, elm) ]).then(function(results) {
          if (results[0] && results[1]) {
            var cmp = {
              meta: results[0],
              instance: results[1]
            };
            return cmp;
          }
          return null;
        });
        return Promise.resolve(null);
      },
      getComponent: function(tagName) {
        return getComponentMeta(plt, tagName);
      },
      getComponents: function() {
        return Promise.all(App.components.map(function(cmp) {
          return getComponentMeta(plt, cmp[0]);
        })).then(function(metadata) {
          return metadata.filter(function(m) {
            return m;
          });
        });
      }
    };
    return app;
  }
  function getMembersMeta(properties) {
    return Object.keys(properties).reduce(function(membersMap, memberKey) {
      var prop = properties[memberKey];
      var category;
      var member = {
        name: memberKey
      };
      if (prop.state) {
        category = 'states';
        member.watchers = prop.watchCallbacks || [];
      } else if (prop.elementRef) category = 'elements'; else if (prop.method) category = 'methods'; else {
        category = 'props';
        var type = 'any';
        if (prop.type) {
          type = prop.type;
          'function' === typeof prop.type && (type = prop.type.name);
        }
        member.type = type.toLowerCase();
        member.mutable = prop.mutable || false;
        member.connect = prop.connect || '-';
        member.context = prop.connect || '-';
        member.watchers = prop.watchCallbacks || [];
      }
      membersMap[category].push(member);
      return membersMap;
    }, {
      props: [],
      states: [],
      elements: [],
      methods: []
    });
  }
  function getComponentMeta(plt, tagName) {
    var elm = {
      nodeName: tagName
    };
    var internalMeta = plt.getComponentMeta(elm);
    if (!internalMeta || !internalMeta.componentConstructor) return Promise.resolve(null);
    var cmpCtr = internalMeta.componentConstructor;
    var members = getMembersMeta(cmpCtr.properties || {});
    var listeners = (internalMeta.listenersMeta || []).map(function(listenerMeta) {
      return {
        event: listenerMeta.eventName,
        capture: listenerMeta.eventCapture,
        disabled: listenerMeta.eventDisabled,
        passive: listenerMeta.eventPassive,
        method: listenerMeta.eventMethodName
      };
    });
    var emmiters = cmpCtr.events || [];
    var meta = Object.assign({
      tag: cmpCtr.is,
      bundle: internalMeta.bundleIds || 'unknown',
      encapsulation: cmpCtr.encapsulation || 'none'
    }, members, {
      events: {
        emmiters: emmiters,
        listeners: listeners
      }
    });
    return Promise.resolve(meta);
  }
  function getComponentInstance(plt, elm) {
    return Promise.resolve(plt.instanceMap.get(elm));
  }
  /**
     * Production h() function based on Preact by
     * Jason Miller (@developit)
     * Licensed under the MIT License
     * https://github.com/developit/preact/blob/master/LICENSE
     *
     * Modified for Stencil's compiler and vdom
     */  var stack = [];
  function h(nodeName, vnodeData) {
    var children = null;
    var lastSimple = false;
    var simple = false;
    for (var i = arguments.length; i-- > 2; ) stack.push(arguments[i]);
    while (stack.length > 0) {
      var child = stack.pop();
      if (child && void 0 !== child.pop) for (i = child.length; i--; ) stack.push(child[i]); else {
        'boolean' === typeof child && (child = null);
        (simple = 'function' !== typeof nodeName) && (null == child ? child = '' : 'number' === typeof child ? child = String(child) : 'string' !== typeof child && (simple = false));
        simple && lastSimple ? children[children.length - 1].vtext += child : null === children ? children = [ simple ? {
          vtext: child
        } : child ] : children.push(simple ? {
          vtext: child
        } : child);
        lastSimple = simple;
      }
    }
    var vkey;
    var vname;
    if (null != vnodeData) {
      // normalize class / classname attributes
      vnodeData.className && (vnodeData.class = vnodeData.className);
      if ('object' === typeof vnodeData.class) {
        for (i in vnodeData.class) vnodeData.class[i] && stack.push(i);
        vnodeData.class = stack.join(' ');
        stack.length = 0;
      }
      null != vnodeData.key && (vkey = vnodeData.key);
      null != vnodeData.name && (vname = vnodeData.name);
    }
    if ('function' === typeof nodeName) 
    // nodeName is a functional component
    return nodeName(vnodeData, children || [], utils);
    return {
      vtag: nodeName,
      vchildren: children,
      vtext: void 0,
      vattrs: vnodeData,
      vkey: vkey,
      vname: vname,
      elm: void 0,
      ishost: false
    };
  }
  function childToVNode(child) {
    return {
      vtag: child.vtag,
      vchildren: child.vchildren,
      vtext: child.vtext,
      vattrs: child.vattrs,
      vkey: child.vkey,
      vname: child.vname
    };
  }
  function VNodeToChild(vnode) {
    return {
      'vtag': vnode.vtag,
      'vchildren': vnode.vchildren,
      'vtext': vnode.vtext,
      'vattrs': vnode.vattrs,
      'vkey': vnode.vkey,
      'vname': vnode.vname
    };
  }
  var utils = {
    'forEach': function(children, cb) {
      children.forEach(function(item, index, array) {
        return cb(VNodeToChild(item), index, array);
      });
    },
    'map': function(children, cb) {
      return children.map(function(item, index, array) {
        return childToVNode(cb(VNodeToChild(item), index, array));
      });
    }
  };
  function initCoreComponentOnReady(plt, App, win, apps, queuedComponentOnReadys, i) {
    // add componentOnReady() to the App object
    // this also is used to know that the App's core is ready
    App.componentOnReady = function(elm, resolve) {
      if (!elm.nodeName.includes('-')) {
        resolve(null);
        return false;
      }
      var cmpMeta = plt.getComponentMeta(elm);
      if (cmpMeta) if (plt.isCmpReady.has(elm)) 
      // element has already loaded, pass the resolve the element component
      // so we know that the resolve knows it this element is an app component
      resolve(elm); else {
        // element hasn't loaded yet or it has an update in progress
        // add this resolve specifically to this elements on ready queue
        var onReadyCallbacks = plt.onReadyCallbacksMap.get(elm) || [];
        onReadyCallbacks.push(resolve);
        plt.onReadyCallbacksMap.set(elm, onReadyCallbacks);
      }
      // return a boolean if this app recognized this element or not
            return !!cmpMeta;
    };
    if (queuedComponentOnReadys) {
      // we've got some componentOnReadys in the queue before the app was ready
      for (i = queuedComponentOnReadys.length - 1; i >= 0; i--) 
      // go through each element and see if this app recongizes it
      App.componentOnReady(queuedComponentOnReadys[i][0], queuedComponentOnReadys[i][1]) && 
      // turns out this element belongs to this app
      // remove the resolve from the queue so in the end
      // all that's left in the queue are elements not apart of any apps
      queuedComponentOnReadys.splice(i, 1);
      for (i = 0; i < apps.length; i++) if (!win[apps[i]].componentOnReady) 
      // there is at least 1 apps that isn't ready yet
      // so let's stop here cuz there's still app cores loading
      return;
      // if we got to this point then that means all of the apps are ready
      // and they would have removed any of their elements from queuedComponentOnReadys
      // so let's do the cleanup of the  remaining queuedComponentOnReadys
            for (i = 0; i < queuedComponentOnReadys.length; i++) 
      // resolve any queued componentsOnReadys that are left over
      // since these elements were not apart of any apps
      // call the resolve fn, but pass null so it's know this wasn't a known app component
      queuedComponentOnReadys[i][1](null);
      queuedComponentOnReadys.length = 0;
    }
  }
  function attributeChangedCallback(attrPropsMap, elm, attribName, newVal) {
    // look up to see if we have a property wired up to this attribute name
    var propName = attrPropsMap[toLowerCase(attribName)];
    propName && (
    // there is not need to cast the value since, it's already casted when
    // the prop is setted
    elm[propName] = newVal);
  }
  function initHostSnapshot(domApi, cmpMeta, hostElm, hostSnapshot, attribName) {
    // the host element has connected to the dom
    // and we've waited a tick to make sure all frameworks
    // have finished adding attributes and child nodes to the host
    // before we go all out and hydrate this beast
    // let's first take a snapshot of its original layout before render
    hostElm.mode || (
    // looks like mode wasn't set as a property directly yet
    // first check if there's an attribute
    // next check the app's global
    hostElm.mode = domApi.$getMode(hostElm));
    true;
    // if the slot polyfill is required we'll need to put some nodes
    // in here to act as original content anchors as we move nodes around
    // host element has been connected to the DOM
    if (!hostElm['s-cr'] && !domApi.$getAttribute(hostElm, SSR_VNODE_ID) && (!domApi.$supportsShadowDom || 1 /* ShadowDom */ !== cmpMeta.encapsulationMeta)) {
      // only required when we're NOT using native shadow dom (slot)
      // or this browser doesn't support native shadow dom
      // and this host element was NOT created with SSR
      // let's pick out the inner content for slot projection
      // create a node to represent where the original
      // content was first placed, which is useful later on
      hostElm['s-cr'] = domApi.$createTextNode('');
      hostElm['s-cr']['s-cn'] = true;
      domApi.$insertBefore(hostElm, hostElm['s-cr'], domApi.$childNodes(hostElm)[0]);
    }
    if (!domApi.$supportsShadowDom && 1 /* ShadowDom */ === cmpMeta.encapsulationMeta) {
      true, true;
      // it's possible we're manually forcing the slot polyfill
      // but this browser may already support the read-only shadowRoot
      // do an extra check here, but only for dev mode on the client
      'shadowRoot' in HTMLElement.prototype || (hostElm.shadowRoot = hostElm);
    }
    false;
    // create a host snapshot object we'll
    // use to store all host data about to be read later
    hostSnapshot = {
      $id: hostElm['s-id'],
      $attributes: {}
    };
    // loop through and gather up all the original attributes on the host
    // this is useful later when we're creating the component instance
        cmpMeta.membersMeta && Object.keys(cmpMeta.membersMeta).forEach(function(memberName) {
      (attribName = cmpMeta.membersMeta[memberName].attribName) && (hostSnapshot.$attributes[attribName] = domApi.$getAttribute(hostElm, attribName));
    });
    return hostSnapshot;
  }
  function connectedCallback(plt, cmpMeta, elm) {
    true;
    // initialize our event listeners on the host element
    // we do this now so that we can listening to events that may
    // have fired even before the instance is ready
    if (!plt.hasListenersMap.has(elm)) {
      // it's possible we've already connected
      // then disconnected
      // and the same element is reconnected again
      plt.hasListenersMap.set(elm, true);
      initElementListeners(plt, elm);
    }
    // this element just connected, which may be re-connecting
    // ensure we remove it from our map of disconnected
    plt.isDisconnectedMap.delete(elm);
    if (!plt.hasConnectedMap.has(elm)) {
      plt.processingCmp.add(elm);
      // first time we've connected
            plt.hasConnectedMap.set(elm, true);
      elm['s-id'] || (
      // assign a unique id to this host element
      // it's possible this was already given an element id
      elm['s-id'] = plt.nextId());
      // register this component as an actively
      // loading child to its parent component
            registerWithParentComponent(plt, elm);
      // add to the queue to load the bundle
      // it's important to have an async tick in here so we can
      // ensure the "mode" attribute has been added to the element
      // place in high priority since it's not much work and we need
      // to know as fast as possible, but still an async tick in between
            plt.queue.tick(function() {
        // start loading this component mode's bundle
        // if it's already loaded then the callback will be synchronous
        plt.hostSnapshotMap.set(elm, initHostSnapshot(plt.domApi, cmpMeta, elm));
        plt.requestBundle(cmpMeta, elm);
      });
    }
  }
  function registerWithParentComponent(plt, elm, ancestorHostElement) {
    // find the first ancestor host element (if there is one) and register
    // this element as one of the actively loading child elements for its ancestor
    ancestorHostElement = elm;
    while (ancestorHostElement = plt.domApi.$parentElement(ancestorHostElement)) 
    // climb up the ancestors looking for the first registered component
    if (plt.isDefinedComponent(ancestorHostElement)) {
      // we found this elements the first ancestor host element
      // if the ancestor already loaded then do nothing, it's too late
      if (!plt.isCmpReady.has(elm)) {
        // keep a reference to this element's ancestor host element
        // elm._ancestorHostElement = ancestorHostElement;
        plt.ancestorHostElementMap.set(elm, ancestorHostElement);
        // ensure there is an array to contain a reference to each of the child elements
        // and set this element as one of the ancestor's child elements it should wait on
                // ensure there is an array to contain a reference to each of the child elements
        // and set this element as one of the ancestor's child elements it should wait on
        (ancestorHostElement['s-ld'] = ancestorHostElement['s-ld'] || []).push(elm);
      }
      break;
    }
  }
  function initEventEmitters(plt, cmpEvents, instance) {
    if (cmpEvents) {
      var elm_1 = plt.hostElementMap.get(instance);
      cmpEvents.forEach(function(eventMeta) {
        instance[eventMeta.method] = {
          emit: function(data) {
            plt.emitEvent(elm_1, eventMeta.name, {
              bubbles: eventMeta.bubbles,
              composed: eventMeta.composed,
              cancelable: eventMeta.cancelable,
              detail: data
            });
          }
        };
      });
    }
  }
  function parseComponentLoader(cmpRegistryData) {
    // tag name will always be lower case
    // parse member meta
    // this data only includes props that are attributes that need to be observed
    // it does not include all of the props yet
    var tagNameMeta = cmpRegistryData[0], bundleIds = cmpRegistryData[1], memberData = cmpRegistryData[3], encapsulationMeta = cmpRegistryData[4], listenerMeta = cmpRegistryData[5];
    var membersMeta = {
      // every component defaults to always have
      // the mode and color properties
      // but only color should observe any attribute changes
      'color': {
        attribName: 'color'
      }
    };
    if (memberData) for (var i = 0; i < memberData.length; i++) {
      var d = memberData[i];
      membersMeta[d[0]] = {
        memberType: d[1],
        reflectToAttrib: !!d[2],
        attribName: 'string' === typeof d[3] ? d[3] : d[3] ? d[0] : 0,
        propType: d[4]
      };
    }
    return {
      tagNameMeta: tagNameMeta,
      // map of the bundle ids
      // can contain modes, and array of esm and es5 bundle ids
      bundleIds: bundleIds,
      membersMeta: Object.assign({}, membersMeta),
      // encapsulation
      encapsulationMeta: encapsulationMeta,
      // parse listener meta
      listenersMeta: listenerMeta ? listenerMeta.map(parseListenerData) : void 0
    };
  }
  function parseListenerData(listenerData) {
    return {
      eventName: listenerData[0],
      eventMethodName: listenerData[1],
      eventDisabled: !!listenerData[2],
      eventPassive: !!listenerData[3],
      eventCapture: !!listenerData[4]
    };
  }
  function parsePropertyValue(propType, propValue) {
    // ensure this value is of the correct prop type
    // we're testing both formats of the "propType" value because
    // we could have either gotten the data from the attribute changed callback,
    // which wouldn't have Constructor data yet, and because this method is reused
    // within proxy where we don't have meta data, but only constructor data
    if (isDef(propValue) && 'object' !== typeof propValue && 'function' !== typeof propValue) {
      if (propType === Boolean || 4 /* Boolean */ === propType) 
      // per the HTML spec, any string value means it is a boolean true value
      // but we'll cheat here and say that the string "false" is the boolean false
      return 'false' !== propValue && ('' === propValue || !!propValue);
      if (propType === Number || 8 /* Number */ === propType) 
      // force it to be a number
      return parseFloat(propValue);
      if (propType === String || 2 /* String */ === propType) 
      // could have been passed as a number or boolean
      // but we still want it as a string
      return propValue.toString();
    }
    // not sure exactly what type we want
    // so no need to change to a different type
        return propValue;
  }
  function render(plt, cmpMeta, hostElm, instance) {
    try {
      // if this component has a render function, let's fire
      // it off and generate the child vnodes for this host element
      // note that we do not create the host element cuz it already exists
      var hostMeta = cmpMeta.componentConstructor.host;
      var encapsulation = cmpMeta.componentConstructor.encapsulation;
      // test if this component should be shadow dom
      // and if so does the browser supports it
            var useNativeShadowDom = 'shadow' === encapsulation && plt.domApi.$supportsShadowDom;
      var reflectHostAttr = void 0;
      var rootElm = hostElm;
      false;
      false;
      if (true, !hostElm['s-rn']) {
        // attach the styles this component needs, if any
        // this fn figures out if the styles should go in a
        // shadow root or if they should be global
        plt.attachStyles(plt, plt.domApi, cmpMeta, hostElm);
        var scopeId = hostElm['s-sc'];
        if (scopeId) {
          plt.domApi.$addClass(hostElm, getElementScopeId(scopeId, true));
          'scoped' === encapsulation && plt.domApi.$addClass(hostElm, getElementScopeId(scopeId));
        }
      }
      if (instance.render || instance.hostData || hostMeta || reflectHostAttr) {
        // tell the platform we're actively rendering
        // if a value is changed within a render() then
        // this tells the platform not to queue the change
        plt.activeRender = true;
        var vnodeChildren = instance.render && instance.render();
        var vnodeHostData = void 0;
        false;
        false;
        // tell the platform we're done rendering
        // now any changes will again queue
        plt.activeRender = false;
        false;
        // looks like we've got child nodes to render into this host element
        // or we need to update the css class/attrs on the host element
        // if we haven't already created a vnode, then we give the renderer the actual element
        // if this is a re-render, then give the renderer the last vnode we already created
        var oldVNode = plt.vnodeMap.get(hostElm) || {};
        oldVNode.elm = rootElm;
        var hostVNode = h(null, vnodeHostData, vnodeChildren);
        false;
        // each patch always gets a new vnode
        // the host element itself isn't patched because it already exists
        // kick off the actual render and any DOM updates
        plt.vnodeMap.set(hostElm, plt.render(hostElm, oldVNode, hostVNode, useNativeShadowDom, encapsulation));
      }
      // update styles!
            (true, plt.customStyle) && plt.customStyle.updateHost(hostElm);
      // it's official, this element has rendered
            hostElm['s-rn'] = true;
      if (hostElm['s-rc']) {
        // ok, so turns out there are some child host elements
        // waiting on this parent element to load
        // let's fire off all update callbacks waiting
        hostElm['s-rc'].forEach(function(cb) {
          return cb();
        });
        hostElm['s-rc'] = null;
      }
    } catch (e) {
      plt.activeRender = false;
      plt.onError(e, 8 /* RenderError */ , hostElm, true);
    }
  }
  function queueUpdate(plt, elm) {
    // we're actively processing this component
    plt.processingCmp.add(elm);
    // only run patch if it isn't queued already
        if (!plt.isQueuedForUpdate.has(elm)) {
      plt.isQueuedForUpdate.set(elm, true);
      // run the patch in the next tick
      // vdom diff and patch the host element for differences
            plt.isAppLoaded ? 
      // app has already loaded
      // let's queue this work in the dom write phase
      plt.queue.write(function() {
        return update(plt, elm);
      }) : 
      // app hasn't finished loading yet
      // so let's use next tick to do everything
      // as fast as possible
      plt.queue.tick(function() {
        return update(plt, elm);
      });
    }
  }
  function update(plt, elm, isInitialLoad, instance, ancestorHostElement) {
    return __awaiter(this, void 0, void 0, function() {
      var e_1, e_2;
      return __generator(this, function(_a) {
        switch (_a.label) {
         case 0:
          // no longer queued for update
          plt.isQueuedForUpdate.delete(elm);
          if (!!plt.isDisconnectedMap.has(elm)) return [ 3 /*break*/ , 12 ];
          instance = plt.instanceMap.get(elm);
          isInitialLoad = !instance;
          if (!isInitialLoad) return [ 3 /*break*/ , 6 ];
          ancestorHostElement = plt.ancestorHostElementMap.get(elm);
          if (ancestorHostElement && !ancestorHostElement['s-rn']) {
            // this is the intial load
            // this element has an ancestor host element
            // but the ancestor host element has NOT rendered yet
            // so let's just cool our jets and wait for the ancestor to render
            (ancestorHostElement['s-rc'] = ancestorHostElement['s-rc'] || []).push(function() {
              // this will get fired off when the ancestor host element
              // finally gets around to rendering its lazy self
              update(plt, elm);
            });
            return [ 2 /*return*/ ];
          }
          // haven't created a component instance for this host element yet!
          // create the instance from the user's component class
          // https://www.youtube.com/watch?v=olLxrojmvMg
                    instance = initComponentInstance(plt, elm, plt.hostSnapshotMap.get(elm));
          if (!(true, instance)) return [ 3 /*break*/ , 5 ];
          _a.label = 1;

         case 1:
          _a.trys.push([ 1, 4, , 5 ]);
          if (!instance.componentWillLoad) return [ 3 /*break*/ , 3 ];
          return [ 4 /*yield*/ , instance.componentWillLoad() ];

         case 2:
          _a.sent();
          _a.label = 3;

         case 3:
          return [ 3 /*break*/ , 5 ];

         case 4:
          e_1 = _a.sent();
          plt.onError(e_1, 3 /* WillLoadError */ , elm);
          return [ 3 /*break*/ , 5 ];

         case 5:
          return [ 3 /*break*/ , 11 ];

         case 6:
          if (!(true, instance)) return [ 3 /*break*/ , 11 ];
          _a.label = 7;

         case 7:
          _a.trys.push([ 7, 10, , 11 ]);
          if (!instance.componentWillUpdate) return [ 3 /*break*/ , 9 ];
          return [ 4 /*yield*/ , instance.componentWillUpdate() ];

         case 8:
          _a.sent();
          _a.label = 9;

         case 9:
          return [ 3 /*break*/ , 11 ];

         case 10:
          e_2 = _a.sent();
          plt.onError(e_2, 5 /* WillUpdateError */ , elm);
          return [ 3 /*break*/ , 11 ];

         case 11:
          // if this component has a render function, let's fire
          // it off and generate a vnode for this
          render(plt, plt.getComponentMeta(elm), elm, instance);
          elm['s-init']();
          true;
          elm['s-hmr-load'] && elm['s-hmr-load']();
          _a.label = 12;

         case 12:
          return [ 2 /*return*/ ];
        }
      });
    });
  }
  function defineMember(plt, property, elm, instance, memberName, hostSnapshot, hostAttributes, hostAttrValue) {
    function getComponentProp(values) {
      // component instance prop/state getter
      // get the property value directly from our internal values
      values = plt.valuesMap.get(plt.hostElementMap.get(this));
      return values && values[memberName];
    }
    function setComponentProp(newValue, elm) {
      // component instance prop/state setter (cannot be arrow fn)
      elm = plt.hostElementMap.get(this);
      if (elm) if (property.state || property.mutable) setValue(plt, elm, memberName, newValue); else {
        true;
        console.warn('@Prop() "' + memberName + '" on "' + elm.tagName + '" cannot be modified.');
      }
    }
    if (property.type || property.state) {
      var values = plt.valuesMap.get(elm);
      if (!property.state) {
        !property.attr || void 0 !== values[memberName] && '' !== values[memberName] || 
        // check the prop value from the host element attribute
        (hostAttributes = hostSnapshot && hostSnapshot.$attributes) && isDef(hostAttrValue = hostAttributes[property.attr]) && (
        // looks like we've got an attribute value
        // let's set it to our internal values
        values[memberName] = parsePropertyValue(property.type, hostAttrValue));
        true;
        // client-side
        // within the browser, the element's prototype
        // already has its getter/setter set, but on the
        // server the prototype is shared causing issues
        // so instead the server's elm has the getter/setter
        // directly on the actual element instance, not its prototype
        // so on the browser we can use "hasOwnProperty"
        if (elm.hasOwnProperty(memberName)) {
          // @Prop or @Prop({mutable:true})
          // property values on the host element should override
          // any default values on the component instance
          void 0 === values[memberName] && (values[memberName] = parsePropertyValue(property.type, elm[memberName]));
          // for the client only, let's delete its "own" property
          // this way our already assigned getter/setter on the prototype kicks in
          // the very special case is to NOT do this for "mode"
                    'mode' !== memberName && delete elm[memberName];
        }
      }
      instance.hasOwnProperty(memberName) && void 0 === values[memberName] && (
      // @Prop() or @Prop({mutable:true}) or @State()
      // we haven't yet got a value from the above checks so let's
      // read any "own" property instance values already set
      // to our internal value as the source of getter data
      // we're about to define a property and it'll overwrite this "own" property
      values[memberName] = instance[memberName]);
      property.watchCallbacks && (values[WATCH_CB_PREFIX + memberName] = property.watchCallbacks.slice());
      // add getter/setter to the component instance
      // these will be pointed to the internal data set from the above checks
            definePropertyGetterSetter(instance, memberName, getComponentProp, setComponentProp);
    } else if (true, property.elementRef) 
    // @Element()
    // add a getter to the element reference using
    // the member name the component meta provided
    definePropertyValue(instance, memberName, elm); else {
      false;
      if (true, property.context) {
        // @Prop({ context: 'config' })
        var contextObj = plt.getContextItem(property.context);
        void 0 !== contextObj && definePropertyValue(instance, memberName, contextObj.getContext && contextObj.getContext(elm) || contextObj);
      } else false;
    }
  }
  function setValue(plt, elm, memberName, newVal, instance) {
    // get the internal values object, which should always come from the host element instance
    // create the _values object if it doesn't already exist
    var values = plt.valuesMap.get(elm);
    values || plt.valuesMap.set(elm, values = {});
    var oldVal = values[memberName];
    // check our new property value against our internal value
        if (newVal !== oldVal) {
      // gadzooks! the property's value has changed!!
      // set our new value!
      // https://youtu.be/dFtLONl4cNc?t=22
      values[memberName] = newVal;
      instance = plt.instanceMap.get(elm);
      if (instance) {
        true;
        var watchMethods = values[WATCH_CB_PREFIX + memberName];
        if (watchMethods) 
        // this instance is watching for when this property changed
        for (var i = 0; i < watchMethods.length; i++) try {
          // fire off each of the watch methods that are watching this property
          instance[watchMethods[i]].call(instance, newVal, oldVal, memberName);
        } catch (e) {
          console.error(e);
        }
        !plt.activeRender && elm['s-rn'] && 
        // looks like this value actually changed, so we've got work to do!
        // but only if we've already rendered, otherwise just chill out
        // queue that we need to do an update, but don't worry about queuing
        // up millions cuz this function ensures it only runs once
        queueUpdate(plt, elm);
      }
    }
  }
  function definePropertyValue(obj, propertyKey, value) {
    // minification shortcut
    Object.defineProperty(obj, propertyKey, {
      'configurable': true,
      'value': value
    });
  }
  function definePropertyGetterSetter(obj, propertyKey, get, set) {
    // minification shortcut
    Object.defineProperty(obj, propertyKey, {
      'configurable': true,
      'get': get,
      'set': set
    });
  }
  var WATCH_CB_PREFIX = 'wc-';
  function proxyComponentInstance(plt, cmpConstructor, elm, instance, hostSnapshot) {
    // at this point we've got a specific node of a host element, and created a component class instance
    // and we've already created getters/setters on both the host element and component class prototypes
    // let's upgrade any data that might have been set on the host element already
    // and let's have the getters/setters kick in and do their jobs
    // let's automatically add a reference to the host element on the instance
    plt.hostElementMap.set(instance, elm);
    // create the values object if it doesn't already exist
    // this will hold all of the internal getter/setter values
        plt.valuesMap.has(elm) || plt.valuesMap.set(elm, {});
    // get the properties from the constructor
    // and add default "mode" and "color" properties
        Object.entries(Object.assign({
      color: {
        type: String
      }
    }, cmpConstructor.properties, {
      mode: {
        type: String
      }
    })).forEach(function(_a) {
      var memberName = _a[0], property = _a[1];
      // define each of the members and initialize what their role is
            defineMember(plt, property, elm, instance, memberName, hostSnapshot);
    });
  }
  function initComponentInstance(plt, elm, hostSnapshot, instance, componentConstructor, queuedEvents, i) {
    try {
      // using the user's component class, let's create a new instance
      componentConstructor = plt.getComponentMeta(elm).componentConstructor;
      instance = new componentConstructor();
      // ok cool, we've got an host element now, and a actual instance
      // and there were no errors creating the instance
      // let's upgrade the data on the host element
      // and let the getters/setters do their jobs
            proxyComponentInstance(plt, componentConstructor, elm, instance, hostSnapshot);
      true;
      // add each of the event emitters which wire up instance methods
      // to fire off dom events from the host element
      initEventEmitters(plt, componentConstructor.events, instance);
      true;
      try {
        // replay any event listeners on the instance that
        // were queued up between the time the element was
        // connected and before the instance was ready
        queuedEvents = plt.queuedEvents.get(elm);
        if (queuedEvents) {
          // events may have already fired before the instance was even ready
          // now that the instance is ready, let's replay all of the events that
          // we queued up earlier that were originally meant for the instance
          for (i = 0; i < queuedEvents.length; i += 2) 
          // data was added in sets of two
          // first item the eventMethodName
          // second item is the event data
          // take a look at initElementListener()
          instance[queuedEvents[i]](queuedEvents[i + 1]);
          plt.queuedEvents.delete(elm);
        }
      } catch (e) {
        plt.onError(e, 2 /* QueueEventsError */ , elm);
      }
    } catch (e) {
      // something done went wrong trying to create a component instance
      // create a dumby instance so other stuff can load
      // but chances are the app isn't fully working cuz this component has issues
      instance = {};
      plt.onError(e, 7 /* InitInstanceError */ , elm, true);
    }
    plt.instanceMap.set(elm, instance);
    return instance;
  }
  function initComponentLoaded(plt, elm, hydratedCssClass, instance, onReadyCallbacks, hasCmpLoaded) {
    if (true, !allChildrenHaveConnected(plt, elm)) 
    // this check needs to be done when using the customElements polyfill
    // since the polyfill uses MutationObserver which causes the
    // connectedCallbacks to fire async, which isn't ideal for the code below
    return;
    // all is good, this component has been told it's time to finish loading
    // it's possible that we've already decided to destroy this element
    // check if this element has any actively loading child elements
        if ((instance = plt.instanceMap.get(elm)) && !plt.isDisconnectedMap.has(elm) && (!elm['s-ld'] || !elm['s-ld'].length)) {
      // cool, so at this point this element isn't already being destroyed
      // and it does not have any child elements that are still loading
      // all of this element's children have loaded (if any)
      plt.isCmpReady.set(elm, true);
      if (!(hasCmpLoaded = plt.isCmpLoaded.has(elm))) {
        // remember that this component has loaded
        // isCmpLoaded map is useful to know if we should fire
        // the lifecycle componentDidLoad() or componentDidUpdate()
        plt.isCmpLoaded.set(elm, true);
        // ensure we remove any child references cuz it doesn't matter at this point
                elm['s-ld'] = void 0;
        // add the css class that this element has officially hydrated
                plt.domApi.$addClass(elm, hydratedCssClass);
      }
      try {
        // fire off the ref if it exists
        callNodeRefs(plt.vnodeMap.get(elm));
        // fire off the user's elm.componentOnReady() callbacks that were
        // put directly on the element (well before anything was ready)
                if (onReadyCallbacks = plt.onReadyCallbacksMap.get(elm)) {
          onReadyCallbacks.forEach(function(cb) {
            return cb(elm);
          });
          plt.onReadyCallbacksMap.delete(elm);
        }
        (true, !hasCmpLoaded) && instance.componentDidLoad ? 
        // we've never loaded this component
        // fire off the user's componentDidLoad method (if one was provided)
        // componentDidLoad only runs ONCE, after the instance's element has been
        // assigned as the host element, and AFTER render() has been called
        // and all the child componenets have finished loading
        instance.componentDidLoad() : (true, hasCmpLoaded) && instance.componentDidUpdate && 
        // we've already loaded this component
        // fire off the user's componentDidUpdate method (if one was provided)
        // componentDidUpdate runs AFTER render() has been called
        // and all child components have finished updating
        instance.componentDidUpdate();
      } catch (e) {
        plt.onError(e, 4 /* DidLoadError */ , elm);
      }
      // ( •_•)
      // ( •_•)>⌐■-■
      // (⌐■_■)
      // load events fire from bottom to top
      // the deepest elements load first then bubbles up
            propagateComponentReady(plt, elm);
    }
  }
  function allChildrenHaveConnected(plt, elm) {
    // Note: in IE11 <svg> does not have the "children" property
    for (var i = 0; i < elm.childNodes.length; i++) {
      var child = elm.childNodes[i];
      if (1 /* ElementNode */ === child.nodeType) {
        if (plt.getComponentMeta(child) && !plt.hasConnectedMap.has(child)) 
        // this is a defined componnent
        // but it hasn't connected yet
        return false;
        if (!allChildrenHaveConnected(plt, child)) 
        // one of the defined child components hasn't connected yet
        return false;
      }
    }
    // everything has connected, we're good
        return true;
  }
  function propagateComponentReady(plt, elm, index, ancestorsActivelyLoadingChildren, ancestorHostElement, cb) {
    // we're no longer processing this component
    plt.processingCmp.delete(elm);
    // load events fire from bottom to top
    // the deepest elements load first then bubbles up
        if (ancestorHostElement = plt.ancestorHostElementMap.get(elm)) {
      // ok so this element already has a known ancestor host element
      // let's make sure we remove this element from its ancestor's
      // known list of child elements which are actively loading
      ancestorsActivelyLoadingChildren = ancestorHostElement['s-ld'];
      if (ancestorsActivelyLoadingChildren) {
        index = ancestorsActivelyLoadingChildren.indexOf(elm);
        index > -1 && 
        // yup, this element is in the list of child elements to wait on
        // remove it so we can work to get the length down to 0
        ancestorsActivelyLoadingChildren.splice(index, 1);
        // the ancestor's initLoad method will do the actual checks
        // to see if the ancestor is actually loaded or not
        // then let's call the ancestor's initLoad method if there's no length
        // (which actually ends up as this method again but for the ancestor)
                ancestorsActivelyLoadingChildren.length || ancestorHostElement['s-init'] && ancestorHostElement['s-init']();
      }
      plt.ancestorHostElementMap.delete(elm);
    }
    if (plt.onAppReadyCallbacks.length && !plt.processingCmp.size) 
    // we've got some promises waiting on the entire app to be done processing
    // so it should have an empty queue and no longer rendering
    while (cb = plt.onAppReadyCallbacks.shift()) cb();
  }
  function disconnectedCallback(plt, elm) {
    // only disconnect if we're not temporarily disconnected
    // tmpDisconnected will happen when slot nodes are being relocated
    if (!plt.tmpDisconnected && isDisconnected(plt.domApi, elm)) {
      // ok, let's officially destroy this thing
      // set this to true so that any of our pending async stuff
      // doesn't continue since we already decided to destroy this node
      // elm._hasDestroyed = true;
      plt.isDisconnectedMap.set(elm, true);
      // double check that we've informed the ancestor host elements
      // that they're good to go and loaded (cuz this one is on its way out)
            propagateComponentReady(plt, elm);
      // since we're disconnecting, call all of the JSX ref's with null
            callNodeRefs(plt.vnodeMap.get(elm), true);
      // detatch any event listeners that may have been added
      // because we're not passing an exact event name it'll
      // remove all of this element's event, which is good
            plt.domApi.$removeEventListener(elm);
      plt.hasListenersMap.delete(elm);
      false;
      // clear CSS var-shim tracking
      (true, plt.customStyle) && plt.customStyle.removeHost(elm);
      // clear any references to other elements
      // more than likely we've already deleted these references
      // but let's double check there pal
            [ plt.ancestorHostElementMap, plt.onReadyCallbacksMap, plt.hostSnapshotMap ].forEach(function(wm) {
        return wm.delete(elm);
      });
    }
  }
  function isDisconnected(domApi, elm) {
    while (elm) {
      if (!domApi.$parentNode(elm)) return 9 /* DocumentNode */ !== domApi.$nodeType(elm);
      elm = domApi.$parentNode(elm);
    }
  }
  function hmrStart(plt, cmpMeta, elm, hmrVersionId) {
    // ¯\_(ツ)_/¯
    // keep the existing state
    // forget the constructor
    cmpMeta.componentConstructor = null;
    // no sir, this component has never loaded, not once, ever
        plt.isCmpLoaded.delete(elm);
    plt.isCmpReady.delete(elm);
    // forget the instance
        var instance = plt.instanceMap.get(elm);
    if (instance) {
      plt.hostElementMap.delete(instance);
      plt.instanceMap.delete(elm);
    }
    // detatch any event listeners that may have been added
    // because we're not passing an exact event name it'll
    // remove all of this element's event, which is good
        plt.domApi.$removeEventListener(elm);
    plt.hasListenersMap.delete(elm);
    cmpMeta.listenersMeta = null;
    // create a callback for when this component finishes hmr
        elm['s-hmr-load'] = function() {
      // finished hmr for this element
      delete elm['s-hmr-load'];
      hmrFinish(plt, cmpMeta, elm);
    };
    // create the new host snapshot from the element
        plt.hostSnapshotMap.set(elm, initHostSnapshot(plt.domApi, cmpMeta, elm));
    // request the bundle again
        plt.requestBundle(cmpMeta, elm, hmrVersionId);
  }
  function hmrFinish(plt, cmpMeta, elm) {
    if (!plt.hasListenersMap.has(elm)) {
      plt.hasListenersMap.set(elm, true);
      // initElementListeners works off of cmp metadata
      // but we just got new data from the constructor
      // so let's update the cmp metadata w/ constructor listener data
            if (cmpMeta.componentConstructor && cmpMeta.componentConstructor.listeners) {
        cmpMeta.listenersMeta = cmpMeta.componentConstructor.listeners.map(function(lstn) {
          var listenerMeta = {
            eventMethodName: lstn.method,
            eventName: lstn.name,
            eventCapture: !!lstn.capture,
            eventPassive: !!lstn.passive,
            eventDisabled: !!lstn.disabled
          };
          return listenerMeta;
        });
        initElementListeners(plt, elm);
      }
    }
  }
  function proxyHostElementPrototype(plt, membersEntries, hostPrototype) {
    false;
    membersEntries.forEach(function(_a) {
      var memberName = _a[0], member = _a[1];
      // add getters/setters
            var memberType = member.memberType;
      3 /* PropMutable */ & memberType ? 
      // @Prop() or @Prop({ mutable: true })
      definePropertyGetterSetter(hostPrototype, memberName, function getHostElementProp() {
        // host element getter (cannot be arrow fn)
        // yup, ugly, srynotsry
        return (plt.valuesMap.get(this) || {})[memberName];
      }, function setHostElementProp(newValue) {
        // host element setter (cannot be arrow fn)
        setValue(plt, this, memberName, parsePropertyValue(member.propType, newValue));
      }) : 32 /* Method */ === memberType && 
      // @Method()
      // add a placeholder noop value on the host element's prototype
      // incase this method gets called before setup
      definePropertyValue(hostPrototype, memberName, noop);
    });
  }
  function initHostElement(plt, cmpMeta, HostElementConstructor, hydratedCssClass) {
    // let's wire up our functions to the host element's prototype
    // we can also inject our platform into each one that needs that api
    // note: these cannot be arrow functions cuz "this" is important here hombre
    HostElementConstructor.connectedCallback = function() {
      // coolsville, our host element has just hit the DOM
      connectedCallback(plt, cmpMeta, this);
    };
    HostElementConstructor.disconnectedCallback = function() {
      // the element has left the builing
      disconnectedCallback(plt, this);
    };
    HostElementConstructor['s-init'] = function() {
      initComponentLoaded(plt, this, hydratedCssClass);
    };
    HostElementConstructor.forceUpdate = function() {
      queueUpdate(plt, this);
    };
    true;
    HostElementConstructor['s-hmr'] = function(hmrVersionId) {
      hmrStart(plt, cmpMeta, this, hmrVersionId);
    };
    if (cmpMeta.membersMeta) {
      var entries = Object.entries(cmpMeta.membersMeta);
      true;
      var attrToProp_1 = {};
      entries.forEach(function(_a) {
        var propName = _a[0], attribName = _a[1].attribName;
        attribName && (attrToProp_1[attribName] = propName);
      });
      attrToProp_1 = Object.assign({}, attrToProp_1);
      HostElementConstructor.attributeChangedCallback = function(attribName, _oldVal, newVal) {
        // the browser has just informed us that an attribute
        // on the host element has changed
        attributeChangedCallback(attrToProp_1, this, attribName, newVal);
      };
      // add getters/setters to the host element members
      // these would come from the @Prop and @Method decorators that
      // should create the public API to this component
      proxyHostElementPrototype(plt, entries, HostElementConstructor);
    }
  }
  function proxyController(domApi, controllerComponents, ctrlTag) {
    return {
      'create': proxyProp(domApi, controllerComponents, ctrlTag, 'create'),
      'componentOnReady': proxyProp(domApi, controllerComponents, ctrlTag, 'componentOnReady')
    };
  }
  function proxyProp(domApi, controllerComponents, ctrlTag, proxyMethodName) {
    return function() {
      var args = arguments;
      return loadComponent(domApi, controllerComponents, ctrlTag).then(function(ctrlElm) {
        return ctrlElm[proxyMethodName].apply(ctrlElm, args);
      });
    };
  }
  function loadComponent(domApi, controllerComponents, ctrlTag) {
    var ctrlElm = controllerComponents[ctrlTag];
    var body = domApi.$doc.body;
    if (body) {
      ctrlElm || (ctrlElm = body.querySelector(ctrlTag));
      if (!ctrlElm) {
        ctrlElm = controllerComponents[ctrlTag] = domApi.$createElement(ctrlTag);
        domApi.$appendChild(body, ctrlElm);
      }
      return ctrlElm.componentOnReady();
    }
    return Promise.resolve();
  }
  function runtimeHelpers(win) {
    var nodeGlobals = [ 'process', 'Buffer' ];
    nodeGlobals.forEach(function(nodeGlobal) {
      'undefined' === typeof win[nodeGlobal] && Object.defineProperty(win, nodeGlobal, {
        get: function() {
          throw new Error('The "' + nodeGlobal + '" property appears to be a node global, however, node globals cannot be executed from within a browser environment. The source of using a node global is often from a dependency and a common solution is to provide the "rollup-plugin-node-globals" plugin within the stencil config plugins. Please see the bundling docs for more information.');
        },
        configurable: true
      });
    });
  }
  function createPlatformMainLegacy(namespace, Context, win, doc, resourcesUrl, hydratedCssClass, customStyle) {
    var cmpRegistry = {
      'html': {}
    };
    var bundleQueue = [];
    var loadedBundles = new Map();
    var pendingBundleRequests = new Set();
    var controllerComponents = {};
    var App = win[namespace] = win[namespace] || {};
    var domApi = createDomApi(App, win, doc);
    (true, false) && domApi.$supportsShadowDom && customStyle && console.error('Unsupported browser. Native shadow-dom available but CSS Custom Properites are not.');
    // set App Context
        Context.isServer = Context.isPrerender = !(Context.isClient = true);
    Context.window = win;
    Context.location = win.location;
    Context.document = doc;
    Context.resourcesUrl = Context.publicPath = resourcesUrl;
    true;
    Context.enableListener = function(instance, eventName, enabled, attachTo, passive) {
      return enableEventListener(plt, instance, eventName, enabled, attachTo, passive);
    };
    true;
    Context.emit = function(elm, eventName, data) {
      return domApi.$dispatchEvent(elm, Context.eventNameFn ? Context.eventNameFn(eventName) : eventName, data);
    };
    // add the h() fn to the app's global namespace
    App.h = h;
    App.Context = Context;
    // keep a global set of tags we've already defined
        var globalDefined = win['s-defined'] = win['s-defined'] || {};
    // internal id increment for unique ids
        var ids = 0;
    // create the platform api which is used throughout common core code
        var plt = {
      domApi: domApi,
      defineComponent: defineComponent,
      emitEvent: Context.emit,
      customStyle: customStyle,
      getComponentMeta: function(elm) {
        return cmpRegistry[domApi.$tagName(elm)];
      },
      getContextItem: function(contextKey) {
        return Context[contextKey];
      },
      isClient: true,
      isDefinedComponent: function(elm) {
        return !!(globalDefined[domApi.$tagName(elm)] || plt.getComponentMeta(elm));
      },
      onError: function(err, type, elm) {
        return console.error(err, type, elm && elm.tagName);
      },
      nextId: function() {
        return namespace + ids++;
      },
      propConnect: function(ctrlTag) {
        return proxyController(domApi, controllerComponents, ctrlTag);
      },
      queue: Context.queue = createQueueClient(App, win),
      requestBundle: requestBundle,
      isAppLoaded: false,
      activeRender: false,
      tmpDisconnected: false,
      ancestorHostElementMap: new WeakMap(),
      componentAppliedStyles: new WeakMap(),
      hasConnectedMap: new WeakMap(),
      hasListenersMap: new WeakMap(),
      isCmpLoaded: new WeakMap(),
      isCmpReady: new WeakMap(),
      hostElementMap: new WeakMap(),
      hostSnapshotMap: new WeakMap(),
      instanceMap: new WeakMap(),
      isDisconnectedMap: new WeakMap(),
      isQueuedForUpdate: new WeakMap(),
      onReadyCallbacksMap: new WeakMap(),
      queuedEvents: new WeakMap(),
      vnodeMap: new WeakMap(),
      valuesMap: new WeakMap(),
      processingCmp: new Set(),
      onAppReadyCallbacks: []
    };
    // create a method that returns a promise
    // which gets resolved when the app's queue is empty
    // and app is idle, works for both initial load and updates
        App.onReady = function() {
      return new Promise(function(resolve) {
        return plt.queue.write(function() {
          return plt.processingCmp.size ? plt.onAppReadyCallbacks.push(resolve) : resolve();
        });
      });
    };
    // create the renderer that will be used
        plt.render = createRendererPatch(plt, domApi);
    // setup the root element which is the mighty <html> tag
    // the <html> has the final say of when the app has loaded
        var rootElm = domApi.$doc.documentElement;
    rootElm['s-ld'] = [];
    rootElm['s-rn'] = true;
    // this will fire when all components have finished loaded
        rootElm['s-init'] = function() {
      plt.isCmpReady.set(rootElm, App.loaded = plt.isAppLoaded = true);
      domApi.$dispatchEvent(win, 'appload', {
        detail: {
          namespace: namespace
        }
      });
    };
    // if the HTML was generated from SSR
    // then let's walk the tree and generate vnodes out of the data
        createVNodesFromSsr(plt, domApi, rootElm);
    function defineComponent(cmpMeta, HostElementConstructor) {
      if (!win.customElements.get(cmpMeta.tagNameMeta)) {
        // keep a map of all the defined components
        globalDefined[cmpMeta.tagNameMeta] = true;
        // initialize the members on the host element prototype
        // keep a ref to the metadata with the tag as the key
                initHostElement(plt, cmpRegistry[cmpMeta.tagNameMeta] = cmpMeta, HostElementConstructor.prototype, hydratedCssClass);
        true;
        // add which attributes should be observed
        var observedAttributes = [];
        // at this point the membersMeta only includes attributes which should
        // be observed, it does not include all props yet, so it's safe to
        // loop through all of the props (attrs) and observed them
                for (var propName in cmpMeta.membersMeta) cmpMeta.membersMeta[propName].attribName && observedAttributes.push(
        // add this attribute to our array of attributes we need to observe
        cmpMeta.membersMeta[propName].attribName);
        // set the array of all the attributes to keep an eye on
        // https://www.youtube.com/watch?v=RBs21CFBALI
                HostElementConstructor.observedAttributes = observedAttributes;
        // define the custom element
        win.customElements.define(cmpMeta.tagNameMeta, HostElementConstructor);
      }
    }
    function getLoadedBundle(bundleId, hmrVersionId) {
      (true, hmrVersionId) && loadedBundles.delete(bundleId.replace(/^\.\//, ''));
      if (null == bundleId) return null;
      return loadedBundles.get(bundleId.replace(/^\.\//, ''));
    }
    function isLoadedBundle(id) {
      if ('exports' === id || 'require' === id) return true;
      return !!getLoadedBundle(id);
    }
    function execBundleCallback(bundleId, deps, callback) {
      var bundleExports = {};
      try {
        callback.apply(null, deps.map(function(d) {
          if ('exports' === d) return bundleExports;
          if ('require' === d) return userRequire;
          return getLoadedBundle(d);
        }));
      } catch (e) {
        console.error(e);
      }
      // If name is undefined then this callback was fired by component callback
            if (void 0 === bundleId) return;
      loadedBundles.set(bundleId, bundleExports);
      // If name contains chunk then this callback was associated with a dependent bundle loading
      // let's add a reference to the constructors on each components metadata
      // each key in moduleImports is a PascalCased tag name
            bundleId && !bundleId.endsWith('.js') && Object.keys(bundleExports).forEach(function(pascalCasedTagName) {
        var normalizedTagName = pascalCasedTagName.replace(/-/g, '').toLowerCase();
        var registryTags = Object.keys(cmpRegistry);
        for (var i = 0; i < registryTags.length; i++) {
          var normalizedRegistryTag = registryTags[i].replace(/-/g, '').toLowerCase();
          if (normalizedRegistryTag === normalizedTagName) {
            var cmpMeta = cmpRegistry[registryTags[i]];
            if (cmpMeta) {
              // get the component constructor from the module
              cmpMeta.componentConstructor = bundleExports[pascalCasedTagName];
              initStyleTemplate(domApi, cmpMeta, cmpMeta.encapsulationMeta, cmpMeta.componentConstructor.style, cmpMeta.componentConstructor.styleMode);
            }
            break;
          }
        }
      });
    }
    function userRequire(ids, resolve) {
      loadBundle(void 0, ids, resolve);
    }
    /**
         * Check to see if any items in the bundle queue can be executed
         */    function checkQueue() {
      for (var i = bundleQueue.length - 1; i >= 0; i--) {
        var _a = bundleQueue[i], bundleId = _a[0], dependentsList = _a[1], importer = _a[2];
        if (dependentsList.every(isLoadedBundle) && !isLoadedBundle(bundleId)) {
          bundleQueue.splice(i, 1);
          execBundleCallback(bundleId, dependentsList, importer);
        }
      }
    }
    /**
         * This function is called anytime a JS file is loaded
         */    function loadBundle(bundleId, dependentsList, importer) {
      var missingDependents = dependentsList.filter(function(d) {
        return !isLoadedBundle(d);
      });
      missingDependents.forEach(function(d) {
        requestUrl(resourcesUrl + d.replace('.js', '.es5.js'));
      });
      bundleQueue.push([ bundleId, dependentsList, importer ]);
      // If any dependents are not yet met then queue the bundle execution
            0 === missingDependents.length && checkQueue();
    }
    App.loadBundle = loadBundle;
    var requestBundleQueue = [];
    (true, customStyle) && customStyle.init().then(function() {
      // loaded all the css, let's run all the request bundle callbacks
      while (requestBundleQueue.length) requestBundleQueue.shift()();
      // set to null to we know we're loaded
            requestBundleQueue = null;
    });
    // This is executed by the component's connected callback.
        function requestBundle(cmpMeta, elm, hmrVersionId) {
      var bundleId = 'string' === typeof cmpMeta.bundleIds ? cmpMeta.bundleIds : cmpMeta.bundleIds[elm.mode];
      if (getLoadedBundle(bundleId, hmrVersionId)) 
      // sweet, we've already loaded this bundle
      queueUpdate(plt, elm); else {
        // never seen this bundle before, let's start the request
        // and add it to the callbacks to fire when it has loaded
        bundleQueue.push([ void 0, [ bundleId ], function() {
          queueUpdate(plt, elm);
        } ]);
        // when to request the bundle depends is we're using the css shim or not
                true, customStyle && requestBundleQueue ? 
        // add this to the loadBundleQueue to run when css is ready
        requestBundleQueue.push(function() {
          return requestComponentBundle(bundleId, hmrVersionId);
        }) : 
        // not using css shim, so no need to wait on css shim to finish
        // figure out which bundle to request and kick it off
        requestComponentBundle(bundleId, hmrVersionId);
      }
    }
    function requestComponentBundle(bundleId, hmrVersionId) {
      // create the url we'll be requesting
      // always use the es5/jsonp callback module
      var useScopedCss = false;
      var url = resourcesUrl + bundleId + (useScopedCss ? '.sc' : '') + '.es5.entry.js';
      (true, hmrVersionId) && (url += '?s-hmr=' + hmrVersionId);
      requestUrl(url);
    }
    // Use JSONP to load in bundles
        function requestUrl(url) {
      var tmrId;
      var scriptElm;
      function onScriptComplete() {
        clearTimeout(tmrId);
        scriptElm.onerror = scriptElm.onload = null;
        domApi.$remove(scriptElm);
        // remove from our list of active requests
                pendingBundleRequests.delete(url);
      }
      if (!pendingBundleRequests.has(url)) {
        // we're not already actively requesting this url
        // let's kick off the bundle request and
        // remember that we're now actively requesting this url
        pendingBundleRequests.add(url);
        // create a sript element to add to the document.head
                scriptElm = domApi.$createElement('script');
        scriptElm.charset = 'utf-8';
        scriptElm.async = true;
        scriptElm.src = url;
        // create a fallback timeout if something goes wrong
                tmrId = setTimeout(onScriptComplete, 12e4);
        // add script completed listener to this script element
                scriptElm.onerror = scriptElm.onload = onScriptComplete;
        // inject a script tag in the head
        // kick off the actual request
                domApi.$appendChild(domApi.$doc.head, scriptElm);
      }
    }
    true;
    plt.attachStyles = function(plt, domApi, cmpMeta, elm) {
      attachStyles(plt, domApi, cmpMeta, elm);
    };
    true;
    generateDevInspector(App, namespace, win, plt);
    true;
    runtimeHelpers(win);
    // register all the components now that everything's ready
    (App.components || []).map(function(data) {
      var cmpMeta = parseComponentLoader(data);
      return cmpRegistry[cmpMeta.tagNameMeta] = cmpMeta;
    }).forEach(function(cmpMeta) {
      // es5 way of extending HTMLElement
      function HostElement(self) {
        return HTMLElement.call(this, self);
      }
      HostElement.prototype = Object.create(HTMLElement.prototype, {
        constructor: {
          value: HostElement,
          configurable: true
        }
      });
      defineComponent(cmpMeta, HostElement);
    });
    // create the componentOnReady fn
        initCoreComponentOnReady(plt, App, win, win['s-apps'], win['s-cr']);
    // notify that the app has initialized and the core script is ready
    // but note that the components have not fully loaded yet
        App.initialized = true;
  }
  /*
    Extremely simple css parser. Intended to be not more than what we need
    and definitely not necessarily correct =).
    */
  /** @unrestricted */  var StyleNode = /** @class */ function() {
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
  }();
  // given a string of css, return a simple rule tree
  /**
     * @param {string} text
     * @return {StyleNode}
     */  function parse(text) {
    text = clean(text);
    return parseCss(lex(text), text);
  }
  // remove stuff we don't care about that may hinder parsing
  /**
     * @param {string} cssText
     * @return {string}
     */  function clean(cssText) {
    return cssText.replace(RX.comments, '').replace(RX.port, '');
  }
  // super simple {...} lexer that returns a node tree
  /**
     * @param {string} text
     * @return {StyleNode}
     */  function lex(text) {
    var root = new StyleNode();
    root.start = 0;
    root.end = text.length;
    var n = root;
    for (var i = 0, l = text.length; i < l; i++) if (text[i] === OPEN_BRACE) {
      n.rules || (n.rules = []);
      var p = n;
      var previous = p.rules[p.rules.length - 1] || null;
      n = new StyleNode();
      n.start = i + 1;
      n.parent = p;
      n.previous = previous;
      p.rules.push(n);
    } else if (text[i] === CLOSE_BRACE) {
      n.end = i + 1;
      n = n.parent || root;
    }
    return root;
  }
  // add selectors/cssText to node tree
  /**
     * @param {StyleNode} node
     * @param {string} text
     * @return {StyleNode}
     */  function parseCss(node, text) {
    var t = text.substring(node.start, node.end - 1);
    node.parsedCssText = node.cssText = t.trim();
    if (node.parent) {
      var ss = node.previous ? node.previous.end : node.parent.start;
      t = text.substring(ss, node.start - 1);
      t = _expandUnicodeEscapes(t);
      t = t.replace(RX.multipleSpaces, ' ');
      // TODO(sorvell): ad hoc; make selector include only after last ;
      // helps with mixin syntax
            t = t.substring(t.lastIndexOf(';') + 1);
      var s = node.parsedSelector = node.selector = t.trim();
      node.atRule = 0 === s.indexOf(AT_START);
      // note, support a subset of rule types...
            if (node.atRule) {
        if (0 === s.indexOf(MEDIA_START)) node.type = types.MEDIA_RULE; else if (s.match(RX.keyframesRule)) {
          node.type = types.KEYFRAMES_RULE;
          node.keyframesName = node.selector.split(RX.multipleSpaces).pop();
        }
      } else 0 === s.indexOf(VAR_START) ? node.type = types.MIXIN_RULE : node.type = types.STYLE_RULE;
    }
    var r$ = node.rules;
    if (r$) for (var i = 0, l = r$.length, r = void 0; i < l && (r = r$[i]); i++) parseCss(r, text);
    return node;
  }
  /**
     * conversion of sort unicode escapes with spaces like `\33 ` (and longer) into
     * expanded form that doesn't require trailing space `\000033`
     * @param {string} s
     * @return {string}
     */  function _expandUnicodeEscapes(s) {
    return s.replace(/\\([0-9a-f]{1,6})\s/gi, function() {
      var code = arguments[1], repeat = 6 - code.length;
      while (repeat--) code = '0' + code;
      return '\\' + code;
    });
  }
  /** @enum {number} */  var types = {
    STYLE_RULE: 1,
    KEYFRAMES_RULE: 7,
    MEDIA_RULE: 4,
    MIXIN_RULE: 1e3
  };
  var OPEN_BRACE = '{';
  var CLOSE_BRACE = '}';
  // helper regexp's
    var RX = {
    comments: /\/\*[^*]*\*+([^\/*][^*]*\*+)*\//gim,
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
    regex.lastIndex = 0;
    var r = cssText.substring(offset).match(regex);
    if (r) {
      var start = offset + r.index;
      return {
        start: start,
        end: start + r[0].length
      };
    }
    return null;
  }
  var VAR_USAGE_START = /\bvar\(/;
  var VAR_ASSIGN_START = /\B--[\w-]+\s*:/;
  var COMMENTS = /\/\*[^*]*\*+([^\/*][^*]*\*+)*\//gim;
  var TRAILING_LINES = /^[\t ]+\n/gm;
  var EMPTY_SELECTORS = /[^{}]*{\s*}/gm;
  function resolveVar(props, prop, fallback) {
    if (props[prop]) return props[prop];
    if (fallback) return executeTemplate(fallback, props);
    return '';
  }
  function findVarEndIndex(cssText, offset) {
    var count = 0;
    var i = offset;
    for (;i < cssText.length; i++) {
      var c = cssText[i];
      if ('(' === c) count++; else if (')' === c) {
        count--;
        if (count <= 0) return i + 1;
      }
    }
    return i;
  }
  function parseVar(cssText, offset) {
    var varPos = findRegex(VAR_USAGE_START, cssText, offset);
    if (!varPos) return null;
    var endVar = findVarEndIndex(cssText, varPos.start);
    var varContent = cssText.substring(varPos.end, endVar - 1);
    var _a = varContent.split(','), propName = _a[0], fallback = _a.slice(1);
    return {
      start: varPos.start,
      end: endVar,
      propName: propName.trim(),
      fallback: fallback.length > 0 ? fallback.join(',').trim() : void 0
    };
  }
  function compileVar(cssText, template, offset) {
    var varMeta = parseVar(cssText, offset);
    if (!varMeta) {
      template.push(cssText.substring(offset, cssText.length));
      return cssText.length;
    }
    var propName = varMeta.propName;
    var fallback = null != varMeta.fallback ? compileTemplate(varMeta.fallback) : void 0;
    template.push(cssText.substring(offset, varMeta.start), function(params) {
      return resolveVar(params, propName, fallback);
    });
    return varMeta.end;
  }
  function executeTemplate(template, props) {
    var final = '';
    for (var i = 0; i < template.length; i++) {
      var s = template[i];
      final += 'string' === typeof s ? s : s(props);
    }
    return final;
  }
  function findEndValue(cssText, offset) {
    var onStr = false;
    var double = false;
    var i = offset;
    for (;i < cssText.length; i++) {
      var c = cssText[i];
      if (onStr) {
        double && '"' === c && (onStr = false);
        double || '\'' !== c || (onStr = false);
      } else if ('"' === c) {
        onStr = true;
        double = true;
      } else if ('\'' === c) {
        onStr = true;
        double = false;
      } else {
        if (';' === c) return i + 1;
        if ('}' === c) return i;
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
      if (!assignPos) break;
      offset = findEndValue(cssText, start);
    }
    return final;
  }
  function compileTemplate(cssText) {
    var index = 0;
    cssText = cssText.replace(COMMENTS, '');
    cssText = removeCustomAssigns(cssText).replace(EMPTY_SELECTORS, '').replace(TRAILING_LINES, '');
    var segments = [];
    while (index < cssText.length) index = compileVar(cssText, segments, index);
    return segments;
  }
  function resolveValues(selectors) {
    var props = {};
    selectors.forEach(function(selector) {
      selector.declarations.forEach(function(dec) {
        props[dec.prop] = dec.value;
      });
    });
    var propsValues = {};
    var entries = Object.entries(props);
    var _loop_1 = function(i) {
      var dirty = false;
      entries.forEach(function(_a) {
        var key = _a[0], value = _a[1];
        var propValue = executeTemplate(value, propsValues);
        if (propValue !== propsValues[key]) {
          propsValues[key] = propValue;
          dirty = true;
        }
      });
      if (!dirty) return 'break';
    };
    for (var i = 0; i < 10; i++) {
      var state_1 = _loop_1(i);
      if ('break' === state_1) break;
    }
    return propsValues;
  }
  function getSelectors(root, index) {
    void 0 === index && (index = 0);
    if (!root.rules) return [];
    var selectors = [];
    root.rules.filter(function(rule) {
      return rule.type === types.STYLE_RULE;
    }).forEach(function(rule) {
      var declarations = getDeclarations(rule.cssText);
      declarations.length > 0 && rule.parsedSelector.split(',').forEach(function(selector) {
        selector = selector.trim();
        selectors.push({
          selector: selector,
          declarations: declarations,
          specificity: computeSpecificity(selector),
          nu: index
        });
      });
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
        important: important
      });
    }
    return declarations;
  }
  function normalizeValue(value) {
    var regex = /\s+/gim;
    value = value.replace(regex, ' ').trim();
    var important = value.endsWith(IMPORTANT);
    important && (value = value.substr(0, value.length - IMPORTANT.length).trim());
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
        var activeSelectors = selectorSet.filter(function(selector) {
      return matches(hostEl, selector.selector);
    });
    // sort selectors by specifity
        return sortSelectors(activeSelectors);
  }
  function getScopesForElement(hostTemplateMap, node) {
    var scopes = [];
    while (node) {
      var scope = hostTemplateMap.get(node);
      scope && scopes.push(scope);
      node = node.parentElement;
    }
    return scopes;
  }
  function getSelectorsForScopes(scopes) {
    var selectors = [];
    scopes.forEach(function(scope) {
      selectors.push.apply(selectors, scope.selectors);
    });
    return selectors;
  }
  function sortSelectors(selectors) {
    selectors.sort(function(a, b) {
      if (a.specificity === b.specificity) return a.nu - b.nu;
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
    scopes.forEach(function(scope) {
      scope.isDynamic && (scope.styleEl.innerHTML = executeTemplate(scope.template, props));
    });
  }
  function reScope(scope, cssScopeId) {
    var template = scope.template.map(function(segment) {
      return 'string' === typeof segment ? replaceScope(segment, scope.cssScopeId, cssScopeId) : segment;
    });
    var selectors = scope.selectors.map(function(sel) {
      return Object.assign({}, sel, {
        selector: replaceScope(sel.selector, scope.cssScopeId, cssScopeId)
      });
    });
    return Object.assign({}, scope, {
      template: template,
      selectors: selectors,
      cssScopeId: cssScopeId
    });
  }
  function replaceScope(original, oldScopeId, newScopeId) {
    original = replaceAll(original, '\\.' + oldScopeId, '.' + newScopeId);
    return original;
  }
  function replaceAll(input, find, replace) {
    return input.replace(new RegExp(find, 'g'), replace);
  }
  function loadDocument(doc, globalScopes) {
    return loadDocumentLinks(doc, globalScopes).then(function() {
      loadDocumentStyles(doc, globalScopes);
    });
  }
  function loadDocumentLinks(doc, globalScopes) {
    var promises = [];
    var linkElms = doc.querySelectorAll('link[rel="stylesheet"][href]');
    for (var i = 0; i < linkElms.length; i++) promises.push(addGlobalLink(doc, globalScopes, linkElms[i]));
    return Promise.all(promises);
  }
  function loadDocumentStyles(doc, globalScopes) {
    var styleElms = doc.querySelectorAll('style');
    for (var i = 0; i < styleElms.length; i++) addGlobalStyle(globalScopes, styleElms[i]);
  }
  function addGlobalLink(doc, globalScopes, linkElm) {
    var url = linkElm.href;
    return fetch(url).then(function(rsp) {
      return rsp.text();
    }).then(function(text) {
      if (hasCssVariables(text) && linkElm.parentNode) {
        hasRelativeUrls(text) && (text = fixRelativeUrls(text, url));
        var styleEl = doc.createElement('style');
        styleEl.innerHTML = text;
        addGlobalStyle(globalScopes, styleEl);
        linkElm.parentNode.insertBefore(styleEl, linkElm);
        linkElm.remove();
      }
    }).catch(function(err) {
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
    var CSS_URL_REGEXP = /url[\s]*\([\s]*['"]?(?![http|\/])([^\'\"\)]*)[\s]*['"]?\)[\s]*/gim;
  function hasRelativeUrls(css) {
    CSS_URL_REGEXP.lastIndex = 0;
    return CSS_URL_REGEXP.test(css);
  }
  function fixRelativeUrls(css, originalUrl) {
    // get the basepath from the original import url
    var basePath = originalUrl.replace(/[^\/]*$/, '');
    // replace the relative url, with the new relative url
        return css.replace(CSS_URL_REGEXP, function(fullMatch, url) {
      // rhe new relative path is the base path + uri
      // TODO: normalize relative URL
      var relativeUrl = basePath + url;
      return fullMatch.replace(url, relativeUrl);
    });
  }
  function supportsCssVars(win) {
    return !!(win.CSS && win.CSS.supports && win.CSS.supports('color', 'var(--c)'));
  }
  var CustomStyle = /** @class */ function() {
    function CustomStyle(win, doc) {
      this.win = win;
      this.doc = doc;
      this.count = 0;
      this.hostStyleMap = new WeakMap();
      this.hostScopeMap = new WeakMap();
      this.globalScopes = [];
      this.scopesMap = new Map();
    }
    CustomStyle.prototype.init = function() {
      var _this = this;
      return new Promise(function(resolve) {
        _this.win.requestAnimationFrame(function() {
          loadDocument(_this.doc, _this.globalScopes).then(function() {
            return resolve();
          });
        });
      });
    };
    CustomStyle.prototype.addLink = function(linkEl) {
      var _this = this;
      return addGlobalLink(this.doc, this.globalScopes, linkEl).then(function() {
        _this.updateGlobal();
      });
    };
    CustomStyle.prototype.addGlobalStyle = function(styleEl) {
      addGlobalStyle(this.globalScopes, styleEl);
      this.updateGlobal();
    };
    CustomStyle.prototype.createHostStyle = function(hostEl, templateName, cssText) {
      if (this.hostScopeMap.has(hostEl)) return null;
      var cssScopeId = hostEl['s-sc'];
      var baseScope = this.registerHostTemplate(cssText, templateName, cssScopeId);
      var isDynamicScoped = baseScope.isDynamic && baseScope.cssScopeId;
      var needStyleEl = isDynamicScoped || !baseScope.styleEl;
      if (!needStyleEl) return null;
      var styleEl = this.doc.createElement('style');
      if (isDynamicScoped) {
        var newScopeId = baseScope.cssScopeId + '-' + this.count;
        hostEl['s-sc'] = newScopeId;
        this.hostStyleMap.set(hostEl, styleEl);
        this.hostScopeMap.set(hostEl, reScope(baseScope, newScopeId));
        this.count++;
      } else {
        baseScope.styleEl = styleEl;
        baseScope.isDynamic || (styleEl.innerHTML = executeTemplate(baseScope.template, {}));
        this.globalScopes.push(baseScope);
        this.updateGlobal();
        this.hostScopeMap.set(hostEl, baseScope);
      }
      return styleEl;
    };
    CustomStyle.prototype.removeHost = function(hostEl) {
      var css = this.hostStyleMap.get(hostEl);
      css && css.remove();
      this.hostStyleMap.delete(hostEl);
      this.hostScopeMap.delete(hostEl);
    };
    CustomStyle.prototype.updateHost = function(hostEl) {
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
    CustomStyle.prototype.updateGlobal = function() {
      updateGlobalScopes(this.globalScopes);
    };
    CustomStyle.prototype.registerHostTemplate = function(cssText, scopeName, cssScopeId) {
      var scope = this.scopesMap.get(scopeName);
      if (!scope) {
        scope = parseCSS(cssText);
        scope.cssScopeId = cssScopeId;
        this.scopesMap.set(scopeName, scope);
      }
      return scope;
    };
    return CustomStyle;
  }();
  true;
  // es5 build which does not use es module imports or dynamic imports
  // and requires the es5 way of extending HTMLElement
  var customStyle = void 0;
  true;
  var needShim = !supportsCssVars(window);
  true;
  window.location.search.indexOf('cssvars=false') > 0 && (
  // by adding ?shadow=false it'll force the slot polyfill
  // only add this check when in dev mode
  needShim = true);
  needShim && (customStyle = new CustomStyle(window, document));
  createPlatformMainLegacy(namespace, Context, window, document, resourcesUrl, hydratedCssClass, customStyle);
})(window, document, Context, namespace);
})({},"DocsSite","hydrated");