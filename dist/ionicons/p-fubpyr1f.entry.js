import{r as t,c as i,h as s,H as n,d as o}from"./p-51656f47.js";import{i as r,g as e,b as c}from"./p-d9e6b652.js";const h=t=>{if(1===t.nodeType){if("script"===t.nodeName.toLowerCase())return!1;for(let i=0;i<t.attributes.length;i++){const s=t.attributes[i].value;if(r(s)&&0===s.toLowerCase().indexOf("on"))return!1}for(let i=0;i<t.childNodes.length;i++)if(!h(t.childNodes[i]))return!1}return!0},l=new Map,a=class{constructor(i){t(this,i),this.mode=d(this),this.isVisible=!1,this.lazy=!1}connectedCallback(){this.waitUntilVisible(this.el,"50px",()=>{this.isVisible=!0,this.loadIcon()})}disconnectedCallback(){this.io&&(this.io.disconnect(),this.io=void 0)}waitUntilVisible(t,i,s){if(this.lazy&&"undefined"!=typeof window&&window.IntersectionObserver){const n=this.io=new window.IntersectionObserver(t=>{t[0].isIntersecting&&(n.disconnect(),this.io=void 0,s())},{rootMargin:i});n.observe(t)}else s()}loadIcon(){if(this.isVisible){const t=e(this);t&&(t=>{let i=l.get(t);return i||(i=fetch(t).then(t=>t.status<=299?t.text():Promise.resolve(null)).then(t=>(t=>{if(t){const i=document.createElement("div");i.innerHTML=t;for(let t=i.childNodes.length-1;t>=0;t--)"svg"!==i.childNodes[t].nodeName.toLowerCase()&&i.removeChild(i.childNodes[t]);const s=i.firstElementChild;if(s&&"svg"===s.nodeName.toLowerCase()&&(s.setAttribute("class","s-ion-icon"),h(s)))return i.innerHTML}return""})(t)),l.set(t,i)),i})(t).then(t=>this.svgContent=t)}if(!this.ariaLabel){const t=c(this.name,this.icon,this.mode,this.ios,this.md);t&&(this.ariaLabel=t.replace("ios-","").replace("md-","").replace(/\-/g," "))}}render(){const t=this.mode||"md",i=this.flipRtl||this.ariaLabel&&this.ariaLabel.indexOf("arrow")>-1&&!1!==this.flipRtl;return s(n,{role:"img",class:Object.assign({[t]:!0},f(this.color),{[`icon-${this.size}`]:!!this.size,"flip-rtl":!!i&&"rtl"===this.el.ownerDocument.dir})},s("div",this.svgContent?{class:"icon-inner",innerHTML:this.svgContent}:{class:"icon-inner"}))}static get assetsDirs(){return["svg"]}get el(){return o(this)}static get watchers(){return{name:["loadIcon"],src:["loadIcon"],icon:["loadIcon"]}}static get style(){return":host{display:inline-block;width:1em;height:1em;contain:strict;fill:currentColor;-webkit-box-sizing:content-box!important;box-sizing:content-box!important}.icon-inner,svg{display:block;height:100%;width:100%}:host(.flip-rtl) .icon-inner{-webkit-transform:scaleX(-1);transform:scaleX(-1)}:host(.icon-small){font-size:18px!important}:host(.icon-large){font-size:32px!important}:host(.ion-color){color:var(--ion-color-base)!important}:host(.ion-color-primary){--ion-color-base:var(--ion-color-primary,#3880ff)}:host(.ion-color-secondary){--ion-color-base:var(--ion-color-secondary,#0cd1e8)}:host(.ion-color-tertiary){--ion-color-base:var(--ion-color-tertiary,#f4a942)}:host(.ion-color-success){--ion-color-base:var(--ion-color-success,#10dc60)}:host(.ion-color-warning){--ion-color-base:var(--ion-color-warning,#ffce00)}:host(.ion-color-danger){--ion-color-base:var(--ion-color-danger,#f14141)}:host(.ion-color-light){--ion-color-base:var(--ion-color-light,#f4f5f8)}:host(.ion-color-medium){--ion-color-base:var(--ion-color-medium,#989aa2)}:host(.ion-color-dark){--ion-color-base:var(--ion-color-dark,#222428)}"}},d=t=>i(t)||document.documentElement.getAttribute("mode")||"md",f=t=>t?{"ion-color":!0,[`ion-color-${t}`]:!0}:null;export{a as ion_icon};