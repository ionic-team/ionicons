/*!
 * Built with http://stenciljs.com
 * 2018-09-18T20:00:40
 */
(function(win, doc, namespace, fsNamespace, resourcesUrl, appCore, appCoreSsr, appCorePolyfilled, hydratedCssClass, components) {

  function init(win, doc, namespace, fsNamespace, resourcesUrl, appCore, appCorePolyfilled, hydratedCssClass, components, HTMLElementPrototype, App, x, y, scriptElm) {
    // create global namespace if it doesn't already exist
    App = win[namespace] = win[namespace] || {};
    App.components = components;
    y = components.map(function (c) { return c[0]; });
    if (y.length) {
        // auto hide components until they been fully hydrated
        // reusing the "x" and "i" variables from the args for funzies
        x = doc.createElement('style');
        x.innerHTML = y.join() + '{visibility:hidden}.' + hydratedCssClass + '{visibility:inherit}';
        x.setAttribute('data-styles', '');
        y = doc.head.querySelector('meta[charset]');
        doc.head.insertBefore(x, y ? y.nextSibling : doc.head.firstChild);
    }
    createComponentOnReadyPrototype(win, namespace, HTMLElementPrototype);
    resourcesUrl = resourcesUrl || App.resourcesUrl;
    // figure out the script element for this current script
    y = doc.querySelectorAll('script');
    for (x = y.length - 1; x >= 0; x--) {
        scriptElm = y[x];
        if (scriptElm.src || scriptElm.hasAttribute('data-resources-url')) {
            break;
        }
    }
    // get the resource path attribute on this script element
    y = scriptElm.getAttribute('data-resources-url');
    if (!resourcesUrl && y) {
        // the script element has a data-resources-url attribute, always use that
        resourcesUrl = y;
    }
    if (!resourcesUrl && scriptElm.src) {
        // we don't have an exact resourcesUrl, so let's
        // figure it out relative to this script's src and app's filesystem namespace
        y = scriptElm.src.split('/').slice(0, -1);
        resourcesUrl = (y.join('/')) + (y.length ? '/' : '') + fsNamespace + '/';
    }
    // request the core this browser needs
    // test for native support of custom elements and fetch
    // if either of those are not supported, then use the core w/ polyfills
    // also check if the page was build with ssr or not
    x = doc.createElement('script');
    if (usePolyfills(win, win.location, x, 'import("")')) {
        // requires the es5/polyfilled core
        x.src = resourcesUrl + appCorePolyfilled;
    }
    else {
        // let's do this!
        x.src = resourcesUrl + appCore;
        x.setAttribute('type', 'module');
        x.setAttribute('crossorigin', true);
    }
    x.setAttribute('data-resources-url', resourcesUrl);
    x.setAttribute('data-namespace', fsNamespace);
    doc.head.appendChild(x);
}
function usePolyfills(win, location, scriptElm, dynamicImportTest) {
    // fyi, dev mode has verbose if/return statements
    // but it minifies to a nice 'lil one-liner ;)
    if (location.search.indexOf('core=esm') > 0) {
        // force esm build
        return false;
    }
    if ((location.search.indexOf('core=es5') > 0) ||
        (location.protocol === 'file:') ||
        (!(win.customElements && win.customElements.define)) ||
        (!win.fetch) ||
        (!(win.CSS && win.CSS.supports && win.CSS.supports('color', 'var(--c)'))) ||
        (!('noModule' in scriptElm))) {
        // es5 build w/ polyfills
        return true;
    }
    // final test to see if this browser support dynamic imports
    return doesNotSupportsDynamicImports(dynamicImportTest);
}
function doesNotSupportsDynamicImports(dynamicImportTest) {
    try {
        new Function(dynamicImportTest);
        return false;
    }
    catch (e) { }
    return true;
}
function createComponentOnReadyPrototype(win, namespace, HTMLElementPrototype) {
    (win['s-apps'] = win['s-apps'] || []).push(namespace);
    if (!HTMLElementPrototype.componentOnReady) {
        HTMLElementPrototype.componentOnReady = function componentOnReady() {
            /*tslint:disable*/
            var elm = this;
            function executor(resolve) {
                if (elm.nodeName.indexOf('-') > 0) {
                    // window hasn't loaded yet and there's a
                    // good chance this is a custom element
                    var apps = win['s-apps'];
                    var appsReady = 0;
                    // loop through all the app namespaces
                    for (var i = 0; i < apps.length; i++) {
                        // see if this app has "componentOnReady" setup
                        if (win[apps[i]].componentOnReady) {
                            // this app's core has loaded call its "componentOnReady"
                            if (win[apps[i]].componentOnReady(elm, resolve)) {
                                // this component does belong to this app and would
                                // have fired off the resolve fn
                                // let's stop here, we're good
                                return;
                            }
                            appsReady++;
                        }
                    }
                    if (appsReady < apps.length) {
                        // not all apps are ready yet
                        // add it to the queue to be figured out when they are
                        (win['s-cr'] = win['s-cr'] || []).push([elm, resolve]);
                        return;
                    }
                }
                // not a recognized app component
                resolve(null);
            }
            // callback wasn't provided, let's return a promise
            if (win.Promise) {
                // use native/polyfilled promise
                return new win.Promise(executor);
            }
            // promise may not have been polyfilled yet
            return { then: executor };
        };
    }
}


  init(win, doc, namespace, fsNamespace, resourcesUrl, appCore, appCoreSsr, appCorePolyfilled, hydratedCssClass, components);

  })(window, document, "DocsSite","docssite",0,"docssite.core.js","docssite.core.pf.js","hydrated",[["footer-bar","footer-bar",1],["header-bar","header-bar",1,[["el",64],["isMobileMenuShown",16],["isSearchVisible",1,0,"is-search-visible",4],["isSticky",16],["query",1,0,1,2],["version",1,0,1,2]],0,[["window:scroll","handleScroll",0,1],["window:resize","handleResize",0,1]]],["icon-list","icon-list",1,[["data",1,0,1,1],["el",64],["isHeaderSearchVisible",16],["query",1,0,1,2],["selectedIcon",16],["selectedIconType",16]],0,[["body:keyup","escListener"],["body:click","handleBodyClicked"],["clearToast","handleClearToast"],["window:scroll","handleScroll",0,1]]],["icon-search","icon-search",1,[["autofocus",1,0,1,2],["query",1,0,1,2],["showClearCtrl",16],["size",1,0,1,2]],0,[["keyup","searchListener"]]],["ionicons-site","header-bar",1,[["data",16],["isHeaderSearchVisible",16],["query",16]],0,[["window:scroll","handleScroll",0,1],["hasSearched","searchHandler"],["toggleHeaderSearch","toggleHandler"]]],["landing-page","icon-list",1,[["data",1,0,1,1],["el",64],["query",1,0,1,2]]],["notfound-page","notfound-page",1],["stencil-route","header-bar",1,[["component",1,0,1,2],["componentProps",1],["componentUpdated",1],["el",64],["exact",1,0,1,4],["group",1,0,1,2],["history",1],["historyType",1,0,"history-type",2],["location",1],["match",2],["routeRender",1],["routeViewsUpdated",1],["scrollTopOffset",1,0,"scroll-top-offset",8],["url",1,0,1,2]]],["stencil-route-link","stencil-route-link",0,[["activeClass",1,0,"active-class",2],["anchorClass",1,0,"anchor-class",2],["anchorId",1,0,"anchor-id",2],["anchorRole",1,0,"anchor-role",2],["anchorTabIndex",1,0,"anchor-tab-index",2],["anchorTitle",1,0,"anchor-title",2],["ariaHaspopup",1,0,"aria-haspopup",2],["ariaLabel",1,0,"aria-label",2],["ariaPosinset",1,0,"aria-posinset",2],["ariaSetsize",1,0,"aria-setsize",8],["custom",1,0,1,2],["el",64],["exact",1,0,1,4],["history",1],["location",1],["match",16],["root",1,0,1,2],["strict",1,0,1,4],["url",1,0,1,2],["urlMatch",1,0,"url-match",2]]],["stencil-route-switch","header-bar",0,[["el",64],["group",1,0,1,2],["location",1],["queue",4,0,0,0,"queue"],["routeViewsUpdated",1],["scrollTopOffset",1,0,"scroll-top-offset",8]]],["stencil-router","header-bar",0,[["history",16],["historyType",1,0,"history-type",2],["isServer",4,0,0,0,"isServer"],["location",16],["queue",4,0,0,0,"queue"],["root",1,0,1,2],["scrollTopOffset",1,0,"scroll-top-offset",8],["titleSuffix",1,0,"title-suffix",2]]],["toast-bar","icon-list",1,[["el",64],["hadIconOnce",16],["selectedIcon",1],["selectedIconType",1,0,"selected-icon-type",2],["showCopiedConfirm",16],["touchEndY",16],["touchStartY",16]]],["usage-page","usage-page",1,[["data",1,0,1,1],["exampleIcon",16],["exampleType",16],["match",1],["queue",4,0,0,0,"queue"]]]],HTMLElement.prototype);