/*! Built with http://stenciljs.com */
(function(win, doc, namespace, fsNamespace, resourcesUrl, appCore, appCoreSsr, appCorePolyfilled, hydratedCssClass, components) {

    function init(win, doc, namespace, fsNamespace, resourcesUrl, appCore, appCorePolyfilled, hydratedCssClass, components, HTMLElementPrototype, App, x, y, scriptElm, orgComponentOnReady) {
    // create global namespace if it doesn't already exist
    App = win[namespace] = win[namespace] || {};
    App.components = components;
    y = components.filter(function (c) { return c[2]; }).map(function (c) { return c[0]; });
    if (y.length) {
        // auto hide components until they been fully hydrated
        // reusing the "x" and "i" variables from the args for funzies
        x = doc.createElement('style');
        x.innerHTML = y.join() + '{visibility:hidden}.' + hydratedCssClass + '{visibility:inherit}';
        x.setAttribute('data-styles', '');
        doc.head.insertBefore(x, doc.head.firstChild);
    }
    // create a temporary array to store the resolves
    // before the core file has fully loaded
    App.$r = [];
    // add componentOnReady to HTMLElement.prototype
    orgComponentOnReady = HTMLElementPrototype.componentOnReady;
    HTMLElementPrototype.componentOnReady = function componentOnReady(cb) {
        const elm = this;
        // there may be more than one app on the window so
        // call original HTMLElement.prototype.componentOnReady
        // if one exists already
        orgComponentOnReady && orgComponentOnReady.call(elm);
        function executor(resolve) {
            if (App.$r) {
                // core file hasn't loaded yet
                // so let's throw it in this temporary queue
                // and when the core does load it'll handle these
                App.$r.push([elm, resolve]);
            }
            else {
                // core has finished loading because there's no temporary queue
                // call the core's logic to handle this
                App.componentOnReady(elm, resolve);
            }
        }
        if (cb) {
            // just a callback
            return executor(cb);
        }
        // callback wasn't provided, let's return a promise
        if (win.Promise) {
            // use native/polyfilled promise
            return new Promise(executor);
        }
        // promise may not have been polyfilled yet
        return { then: executor };
    };
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
    if (y) {
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


    init(win, doc, namespace, fsNamespace, resourcesUrl, appCore, appCoreSsr, appCorePolyfilled, hydratedCssClass, components);

    })(window, document, "DocsSite","docssite",0,"docssite.core.js","docssite.core.pf.js","hydrated",[["footer-bar","footer-bar",1],["header-bar","header-bar",1,[["el",7],["isMobileMenuShown",5],["isSearchVisible",1,0,"is-search-visible",3],["isSticky",5],["query",1,0,1,2],["version",1,0,1,2]],0,[["window:scroll","handleScroll",0,1],["window:resize","handleResize",0,1]]],["icon-list","icon-list",1,[["data",1,0,1,1],["el",7],["isHeaderSearchVisible",5],["query",1,0,1,2],["selectedIcon",5],["selectedIconType",5]],0,[["body:keyup","escListener"],["body:click","handleBodyClicked"],["clearToast","handleClearToast"],["window:scroll","handleScroll",0,1]]],["icon-search","icon-search",1,[["autofocus",1,0,1,2],["query",1,0,1,2],["showClearCtrl",5],["size",1,0,1,2]],0,[["keyup","searchListener"]]],["ionicons-site","header-bar",1,[["data",5],["isHeaderSearchVisible",5],["query",5]],0,[["window:scroll","handleScroll",0,1],["hasSearched","searchHandler"],["toggleHeaderSearch","toggleHandler"]]],["landing-page","icon-list",1,[["data",1,0,1,1],["el",7],["query",1,0,1,2]]],["notfound-page","notfound-page",1],["stencil-route","header-bar",0,[["activeInGroup",5],["activeRouter",3,0,0,0,"activeRouter"],["component",1,0,1,2],["componentProps",1],["el",7],["exact",1,0,1,3],["group",1,0,1,2],["groupIndex",1,0,"group-index",4],["isServer",3,0,0,0,"isServer"],["location",3,0,0,0,"location"],["match",5],["queue",3,0,0,0,"queue"],["routeRender",1],["scrollTopOffset",1,0,"scroll-top-offset",4],["url",1,0,1,2]]],["stencil-route-link","stencil-route-link",0,[["activeClass",1,0,"active-class",2],["activeRouter",3,0,0,0,"activeRouter"],["anchorClass",1,0,"anchor-class",2],["anchorRole",1,0,"anchor-role",2],["anchorTabIndex",1,0,"anchor-tab-index",2],["anchorTitle",1,0,"anchor-title",2],["custom",1,0,1,2],["exact",1,0,1,3],["match",5],["strict",1,0,1,3],["url",1,0,1,2],["urlMatch",1,0,"url-match",2]]],["stencil-router","header-bar",0,[["activeRouter",3,0,0,0,"activeRouter"],["historyType",1,0,"history-type",2],["match",5],["root",1,0,1,2],["titleSuffix",1,0,"title-suffix",2]]],["toast-bar","icon-list",1,[["el",7],["hadIconOnce",5],["selectedIcon",1],["selectedIconType",1,0,"selected-icon-type",2],["showCopiedConfirm",5],["touchEndY",5],["touchStartY",5]]],["usage-page","usage-page",1,[["data",1,0,1,1],["exampleIcon",5],["exampleType",5],["match",1],["queue",3,0,0,0,"queue"]]]],HTMLElement.prototype);