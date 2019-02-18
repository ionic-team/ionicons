const h = window.DocsSite.h;

import { a as matchPath, b as matchesAreEqual, c as ActiveRouter, d as storageAvailable, e as canUseDOM, f as supportsHistory, g as supportsPopStateOnHashChange, h as getConfirmation, i as stripTrailingSlash, j as addLeadingSlash, k as hasBasename, l as stripBasename, m as createLocation, n as createKey, o as isExtraneousPopstateEvent, p as createPath, q as addEventListener$1, r as removeEventListener, s as stripLeadingSlash, t as supportsGoWithoutReloadUsingHash, u as locationsAreEqual } from './chunk-f097fe9f.js';

class HeaderBar {
    constructor() {
        this.isSticky = false;
        this.query = '';
        this.isSearchVisible = false;
    }
    handleScroll() {
        requestAnimationFrame(this.checkScroll.bind(this));
    }
    handleResize() {
        requestAnimationFrame(() => {
            if (window.innerWidth > 768) {
                const menu = this.el.querySelector('nav');
                menu.style.display = '';
                this.el.classList.remove('show-mobile-menu');
                document.body.classList.remove('no-scroll');
                this.isMobileMenuShown = false;
            }
        });
    }
    checkScroll() {
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        this.isSticky = (scrollTop > 30);
    }
    showNav() {
        if (this.isMobileMenuShown)
            return;
        this.isMobileMenuShown = true;
        const menu = this.el.querySelector('nav');
        menu.style.display = 'flex';
        setTimeout(() => {
            menu.classList.add('show-mobile-menu');
            document.body.classList.add('no-scroll');
        }, 1);
    }
    hideNav() {
        if (!this.isMobileMenuShown)
            return;
        this.isMobileMenuShown = false;
        const menu = this.el.querySelector('nav');
        menu.classList.remove('show-mobile-menu');
        setTimeout(() => {
            menu.style.display = 'none';
            document.body.classList.remove('no-scroll');
        }, 300);
    }
    render() {
        return (h("header", { class: `${this.isSearchVisible ? 'visible-search' : ''} ${this.isSticky ? 'overlay' : ''}` },
            h("div", { class: "container" },
                h("div", { class: "logo" },
                    h("stencil-route-link", { url: "/", exact: true },
                        h("svg", { width: "32px", height: "32px", viewBox: "0 0 32 32" },
                            h("g", { stroke: "none", "stroke-width": "1", fill: "none", "fill-rule": "evenodd" },
                                h("g", { id: "icon", "fill-rule": "nonzero" },
                                    h("circle", { id: "circle", fill: "#EAEEF5", cx: "16", cy: "16", r: "16" }),
                                    h("circle", { id: "circle_copy", fill: "#B4C1D8", cx: "16", cy: "16", r: "11" }),
                                    h("circle", { id: "circle_copy_2", fill: "#647AA1", cx: "16", cy: "16", r: "6" }),
                                    h("circle", { id: "circle_copy_3", fill: "#647AA1", cx: "23.5", cy: "8.5", r: "2" })))),
                        "Ionicons"),
                    h("span", { class: "version" }, this.version)),
                h("icon-search", { query: this.query, size: "small" }),
                h("nav", null,
                    h("stencil-route-link", { class: "nav__item", url: "/", exact: true, onClick: this.hideNav.bind(this) }, "Icons"),
                    h("stencil-route-link", { class: "nav__item", url: "/usage", onClick: () => {
                            this.toggleHeaderSearch.emit('hide');
                            this.hideNav();
                        } }, "Usage"),
                    h("a", { class: "nav__item", href: "https://github.com/ionic-team/ionicons" },
                        "GitHub",
                        h("svg", { width: "12px", height: "12px", viewBox: "0 0 12 12", version: "1.1", xmlns: "http://www.w3.org/2000/svg" },
                            h("g", { transform: "translate(0,1)" },
                                h("rect", { id: "bg", fill: "#e3e8f1", x: "0", y: "2", width: "9", height: "9", rx: "1.5" }),
                                h("path", { d: "M9.18198052,1 L6.5,1 L6.5,0 L11,0 L11,1 L11,4.5 L10,4.5 L10,1.59619408 L4.02512627,7.57106781 L3.31801948,6.86396103 L9.18198052,1 Z", id: "arrow", fill: "#A4AEC3" })))),
                    h("span", { class: "close", onClick: this.hideNav.bind(this) },
                        h("i", { class: "ion ion-md-close" }))),
                h("a", { class: "btn sm-hide", href: "/ionicons.designerpack.zip" },
                    h("svg", { width: "9px", height: "11px", viewBox: "0 0 9 11", version: "1.1", xmlns: "http://www.w3.org/2000/svg" },
                        h("g", null,
                            h("rect", { id: "bg", fill: "#BAC3D1", x: "0", y: "9", width: "9", height: "2", rx: "1" }),
                            h("path", { d: "M5,6.26776695 L7.26776695,4 L7.97487373,4.70710678 L4.70710678,7.97487373 L4.48743687,7.75520382 L4.26776695,7.97487373 L1,4.70710678 L1.70710678,4 L4,6.29289322 L4,0 L5,0 L5,6.26776695 Z", id: "arrow", fill: "#94A0B8" }))),
                    "Designer pack"),
                h("span", { class: "more", onClick: this.showNav.bind(this) },
                    h("i", { class: "ion ion-md-more" })))));
    }
    static get is() { return "header-bar"; }
    static get properties() { return {
        "el": {
            "elementRef": true
        },
        "isMobileMenuShown": {
            "state": true
        },
        "isSearchVisible": {
            "type": Boolean,
            "attr": "is-search-visible"
        },
        "isSticky": {
            "state": true
        },
        "query": {
            "type": String,
            "attr": "query"
        },
        "version": {
            "type": String,
            "attr": "version"
        }
    }; }
    static get events() { return [{
            "name": "toggleHeaderSearch",
            "method": "toggleHeaderSearch",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }]; }
    static get listeners() { return [{
            "name": "window:scroll",
            "method": "handleScroll",
            "passive": true
        }, {
            "name": "window:resize",
            "method": "handleResize",
            "passive": true
        }]; }
    static get style() { return "header-bar header {\n  -webkit-transition: border 0.6s;\n  transition: border 0.6s;\n  position: fixed;\n  width: 100%;\n  top: 0;\n  left: 0;\n  right: 0;\n  background: #fff;\n  z-index: 999;\n  border-bottom: 1px solid transparent;\n  height: 64px; }\n\nheader-bar header.overlay {\n  border-bottom: 1px solid rgba(0, 0, 0, 0.05); }\n\nheader-bar .container,\nheader-bar .logo,\nheader-bar .logo a,\nheader-bar nav {\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-align: center;\n  align-items: center; }\n\nheader-bar .logo,\nheader-bar nav {\n  -ms-flex: 0 0 auto;\n  flex: 0 0 auto; }\n\nheader-bar nav {\n  -ms-flex-align: baseline;\n  align-items: baseline; }\n\nheader-bar icon-search {\n  -webkit-transition: opacity 0.5s;\n  transition: opacity 0.5s;\n  -ms-flex: 1;\n  flex: 1;\n  padding-left: 60px;\n  padding-right: 60px;\n  opacity: 0;\n  pointer-events: none; }\n\nheader-bar .visible-search icon-search {\n  opacity: 1;\n  pointer-events: auto; }\n\nheader-bar .container {\n  -ms-flex-pack: justify;\n  justify-content: space-between;\n  padding-top: 12px;\n  padding-bottom: 12px; }\n\nheader-bar .logo a {\n  font-weight: 700;\n  font-size: 16px;\n  color: var(--color-shark); }\n\nheader-bar .logo svg {\n  margin-right: 10px; }\n\nheader-bar .logo .version {\n  margin-left: 10px;\n  font-size: 10px;\n  font-weight: 600;\n  color: var(--color-oslo-gray);\n  background-color: var(--color-catskill-white);\n  border-radius: 4px;\n  padding: 1px 5px;\n  position: relative;\n  top: -2px; }\n\nheader-bar a {\n  text-decoration: none; }\n\nheader-bar nav + .btn,\nheader-bar .nav__item + .nav__item {\n  margin-left: 30px; }\n\nheader-bar .nav__item {\n  font-size: 13px;\n  font-weight: 600; }\n  header-bar .nav__item,\n  header-bar .nav__item a {\n    -webkit-transition: color 0.3s;\n    transition: color 0.3s;\n    color: var(--color-pale-sky); }\n  header-bar .nav__item:hover,\n  header-bar .nav__item a:not(.link-active):hover {\n    color: var(--color-shark); }\n  header-bar .nav__item .link-active {\n    color: var(--color-heather);\n    cursor: default; }\n  header-bar .nav__item svg {\n    margin-left: 6px; }\n  header-bar .nav__item:hover svg #arrow {\n    -webkit-transform: translate(1px, -1px);\n    transform: translate(1px, -1px); }\n\nheader-bar .btn svg {\n  margin-right: 6px; }\n\nheader-bar .btn:hover svg #arrow {\n  -webkit-transform: translate(0, 1px);\n  transform: translate(0, 1px); }\n\nheader-bar .more {\n  padding: 0 8px;\n  font-size: 28px;\n  line-height: 28px;\n  color: var(--color-dodger-blue);\n  cursor: pointer;\n  display: none; }\n\nheader-bar nav span.close {\n  display: none;\n  font-size: 28px; }\n\n\@media screen and (max-width: 992px) {\n  header-bar nav > * + * {\n    margin-left: 18px; }\n  header-bar icon-search {\n    padding-left: 30px;\n    padding-right: 30px; } }\n\n\@media screen and (max-width: 768px) {\n  header-bar .btn.sm-hide {\n    display: none; }\n  header-bar .more,\n  header-bar .close {\n    cursor: pointer; }\n  header-bar .more {\n    display: block; }\n  header-bar nav + .btn,\n  header-bar .nav__item + .nav__item {\n    margin-left: 0;\n    margin-top: 30px; }\n  header-bar nav {\n    -webkit-transition: opacity 0.3s;\n    transition: opacity 0.3s;\n    position: fixed;\n    top: 0;\n    left: 0;\n    right: 0;\n    bottom: 0;\n    width: 100%;\n    height: 100%;\n    z-index: 99999;\n    background-image: linear-gradient(-223deg, #363E49 0%, #1C1E21 100%);\n    display: -ms-flexbox;\n    display: flex;\n    -ms-flex-direction: column;\n    flex-direction: column;\n    -ms-flex-pack: center;\n    justify-content: center;\n    -ms-flex-align: center;\n    align-items: center;\n    opacity: 0;\n    display: none; }\n  header-bar nav .close {\n    margin: 0;\n    position: absolute;\n    top: 14px;\n    right: 18px;\n    color: #fff;\n    cursor: pointer; }\n  header-bar .nav__item {\n    -webkit-transition: -webkit-transform 0.4s;\n    transition: -webkit-transform 0.4s;\n    transition: transform 0.4s;\n    transition: transform 0.4s, -webkit-transform 0.4s;\n    -webkit-transform: translateY(8px);\n    transform: translateY(8px); }\n    header-bar .nav__item,\n    header-bar .nav__item a {\n      font-size: 28px;\n      color: rgba(255, 255, 255, 0.9); }\n    header-bar .nav__item .link-active {\n      color: rgba(255, 255, 255, 0.3); }\n    header-bar .nav__item:hover,\n    header-bar .nav__item a:not(.link-active):hover {\n      color: rgba(255, 255, 255, 0.9); }\n    header-bar .nav__item svg #bg {\n      opacity: 0.2; }\n  header-bar nav.show-mobile-menu {\n    opacity: 1; }\n  header-bar nav.show-mobile-menu .nav__item {\n    -webkit-transform: translateY(0);\n    transform: translateY(0); }\n  header-bar nav.show-mobile-menu .close {\n    display: block; }\n  header-bar icon-search {\n    padding-left: 20px;\n    padding-right: 15px; } }\n\n\@media screen and (max-width: 520px) {\n  header-bar .version {\n    display: none; } }"; }
}

class IoniconsSite {
    constructor() {
        this.data = {
            version: undefined,
            icons: []
        };
        this.query = '';
        this.isHeaderSearchVisible = false;
    }
    handleScroll() {
        requestAnimationFrame(this.checkScroll.bind(this));
    }
    searchHandler(event) {
        this.query = event.detail;
    }
    toggleHandler(event) {
        this.isHeaderSearchVisible = (event.detail === 'show') ? true : false;
    }
    componentWillLoad() {
        this.loadData();
    }
    async loadData() {
        const res = await fetch('/data.json');
        const json = await res.json();
        this.data = json;
        this.data.icons = json.icons.map((o) => {
            o.icons = o.icons.reverse();
            o.name = o.icons[0].split('-').slice(1).join('-');
            return o;
        });
    }
    checkScroll() {
        // show/hide header searchbar
        const headerSearchEl = document.querySelector('header .search-input');
        const bodySearchEl = document.querySelector('icon-list .search-input');
        if (!bodySearchEl || !headerSearchEl) {
            return;
        }
        const headerInput = headerSearchEl.querySelector('input');
        const bodyInput = bodySearchEl.querySelector('input');
        if (bodySearchEl.getBoundingClientRect().top < (bodySearchEl.scrollHeight / 2)) {
            if (this.isHeaderSearchVisible)
                return;
            this.isHeaderSearchVisible = true;
            if (bodyInput === document.activeElement)
                headerInput.focus();
        }
        else {
            if (!this.isHeaderSearchVisible)
                return;
            this.isHeaderSearchVisible = false;
            if (headerInput === document.activeElement)
                bodyInput.focus();
        }
    }
    render() {
        return [
            h("header-bar", { version: this.data.version, query: this.query, isSearchVisible: this.isHeaderSearchVisible }),
            h("stencil-router", null,
                h("stencil-router-scroll-top", null,
                    h("stencil-route-switch", { scrollTopOffset: 0 },
                        h("stencil-route", { url: "/", component: "landing-page", exact: true, componentProps: { 'query': this.query, 'data': this.data } }),
                        h("stencil-route", { url: "/usage", component: "usage-page", componentProps: { 'data': this.data } }),
                        h("stencil-route", { component: "notfound-page" }))))
        ];
    }
    static get is() { return "ionicons-site"; }
    static get properties() { return {
        "data": {
            "state": true
        },
        "isHeaderSearchVisible": {
            "state": true
        },
        "query": {
            "state": true
        }
    }; }
    static get listeners() { return [{
            "name": "window:scroll",
            "method": "handleScroll",
            "passive": true
        }, {
            "name": "hasSearched",
            "method": "searchHandler"
        }, {
            "name": "toggleHeaderSearch",
            "method": "toggleHandler"
        }]; }
    static get style() { return "stencil-router > div {\n  height: 100%; }"; }
}

var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try {
            step(generator.next(value));
        }
        catch (e) {
            reject(e);
        } }
        function rejected(value) { try {
            step(generator["throw"](value));
        }
        catch (e) {
            reject(e);
        } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class Route {
    constructor() {
        this.group = null;
        this.match = null;
        this.componentProps = {};
        this.exact = false;
        this.scrollOnNextRender = false;
        this.previousMatch = null;
    }
    computeMatch(newLocation) {
        const isGrouped = this.group != null || (this.el.parentElement != null && this.el.parentElement.tagName.toLowerCase() === "stencil-route-switch");
        if (!newLocation || isGrouped) {
            return;
        }
        this.previousMatch = this.match;
        return this.match = matchPath(newLocation.pathname, {
            path: this.url,
            exact: this.exact,
            strict: true
        });
    }
    loadCompleted() {
        return __awaiter(this, void 0, void 0, function* () {
            let routeViewOptions = {};
            if (this.history && this.history.location.hash) {
                routeViewOptions = {
                    scrollToId: this.history.location.hash.substr(1)
                };
            }
            else if (this.scrollTopOffset) {
                routeViewOptions = {
                    scrollTopOffset: this.scrollTopOffset
                };
            }
            if (typeof this.componentUpdated === "function") {
                this.componentUpdated(routeViewOptions);
            }
            else if (this.match && !matchesAreEqual(this.match, this.previousMatch) && this.routeViewsUpdated) {
                this.routeViewsUpdated(routeViewOptions);
            }
        });
    }
    componentDidUpdate() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.loadCompleted();
        });
    }
    componentDidLoad() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.loadCompleted();
        });
    }
    render() {
        if (!this.match || !this.history) {
            return null;
        }
        const childProps = Object.assign({}, this.componentProps, { history: this.history, match: this.match });
        if (this.routeRender) {
            return this.routeRender(Object.assign({}, childProps, { component: this.component }));
        }
        if (this.component) {
            const ChildComponent = this.component;
            return (h(ChildComponent, Object.assign({}, childProps)));
        }
    }
    static get is() { return "stencil-route"; }
    static get properties() {
        return {
            "component": {
                "type": String,
                "attr": "component"
            },
            "componentProps": {
                "type": "Any",
                "attr": "component-props"
            },
            "componentUpdated": {
                "type": "Any",
                "attr": "component-updated"
            },
            "el": {
                "elementRef": true
            },
            "exact": {
                "type": Boolean,
                "attr": "exact"
            },
            "group": {
                "type": String,
                "attr": "group",
                "reflectToAttr": true
            },
            "history": {
                "type": "Any",
                "attr": "history"
            },
            "historyType": {
                "type": String,
                "attr": "history-type"
            },
            "location": {
                "type": "Any",
                "attr": "location",
                "watchCallbacks": ["computeMatch"]
            },
            "match": {
                "type": "Any",
                "attr": "match",
                "mutable": true
            },
            "routeRender": {
                "type": "Any",
                "attr": "route-render"
            },
            "routeViewsUpdated": {
                "type": "Any",
                "attr": "route-views-updated"
            },
            "scrollTopOffset": {
                "type": Number,
                "attr": "scroll-top-offset"
            },
            "url": {
                "type": String,
                "attr": "url"
            }
        };
    }
    static get style() { return "stencil-route.inactive {\n  display: none;\n}"; }
}
ActiveRouter.injectProps(Route, [
    "location",
    "history",
    "historyType",
    "routeViewsUpdated"
]);

function uuidv4 () {
    return ([1e7].toString() + -1e3.toString() + -4e3.toString() + -8e3.toString() + -1e11.toString()).replace(/[018]/g, function (c) {
        const random = window.crypto.getRandomValues(new Uint8Array(1));
        return (c ^ random[0] & 15 >> c / 4).toString(16);
    });
}

var __awaiter$1 = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try {
            step(generator.next(value));
        }
        catch (e) {
            reject(e);
        } }
        function rejected(value) { try {
            step(generator["throw"](value));
        }
        catch (e) {
            reject(e);
        } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function getUniqueId() {
    if (window.crypto) {
        return uuidv4();
    }
    return ((Math.random() * 100000000000000000).toString().match(/.{4}/g) || []).join("-");
}
function getMatch(pathname, url, exact) {
    return matchPath(pathname, {
        path: url,
        exact: exact,
        strict: true
    });
}
function isHTMLStencilRouteElement(element) {
    return element.tagName.toLowerCase() === "stencil-route";
}
class RouteSwitch {
    constructor() {
        this.group = getUniqueId();
        this.subscribers = [];
    }
    componentWillLoad() {
        if (this.location != null) {
            this.regenerateSubscribers(this.location);
        }
    }
    regenerateSubscribers(newLocation) {
        return __awaiter$1(this, void 0, void 0, function* () {
            if (newLocation == null) {
                return;
            }
            let newActiveIndex = -1;
            this.subscribers = Array.prototype.slice.call(this.el.children)
                .filter(isHTMLStencilRouteElement)
                .map((childElement, index) => {
                const match = getMatch(newLocation.pathname, childElement.url, childElement.exact);
                if (match && newActiveIndex === -1) {
                    newActiveIndex = index;
                }
                return {
                    el: childElement,
                    match: match
                };
            });
            if (newActiveIndex === -1) {
                return;
            }
            if (this.activeIndex === newActiveIndex) {
                this.subscribers[newActiveIndex].el.match = this.subscribers[newActiveIndex].match;
                return;
            }
            this.activeIndex = newActiveIndex;
            const activeChild = this.subscribers[this.activeIndex];
            if (this.scrollTopOffset) {
                activeChild.el.scrollTopOffset = this.scrollTopOffset;
            }
            activeChild.el.group = this.group;
            activeChild.el.match = activeChild.match;
            activeChild.el.componentUpdated = (routeViewUpdatedOptions) => {
                this.queue.write(() => {
                    this.subscribers.forEach((child, index) => {
                        child.el.componentUpdated = undefined;
                        if (index === this.activeIndex) {
                            return child.el.style.display = "";
                        }
                        if (this.scrollTopOffset) {
                            child.el.scrollTopOffset = this.scrollTopOffset;
                        }
                        child.el.group = this.group;
                        child.el.match = null;
                        child.el.style.display = "none";
                    });
                });
                if (this.routeViewsUpdated) {
                    this.routeViewsUpdated(Object.assign({ scrollTopOffset: this.scrollTopOffset }, routeViewUpdatedOptions));
                }
            };
        });
    }
    render() {
        return (h("slot", null));
    }
    static get is() { return "stencil-route-switch"; }
    static get properties() {
        return {
            "el": {
                "elementRef": true
            },
            "group": {
                "type": String,
                "attr": "group",
                "reflectToAttr": true
            },
            "location": {
                "type": "Any",
                "attr": "location",
                "watchCallbacks": ["regenerateSubscribers"]
            },
            "queue": {
                "context": "queue"
            },
            "routeViewsUpdated": {
                "type": "Any",
                "attr": "route-views-updated"
            },
            "scrollTopOffset": {
                "type": Number,
                "attr": "scroll-top-offset"
            }
        };
    }
}
ActiveRouter.injectProps(RouteSwitch, [
    "location",
    "routeViewsUpdated"
]);

function invariant(value, ...args) {
    if (!value) {
        console.error(...args);
    }
}
function warning(value, ...args) {
    if (!value) {
        console.warn(...args);
    }
}

const createTransitionManager = () => {
    let prompt;
    const setPrompt = (nextPrompt) => {
        warning(prompt == null, 'A history supports only one prompt at a time');
        prompt = nextPrompt;
        return () => {
            if (prompt === nextPrompt) {
                prompt = null;
            }
        };
    };
    const confirmTransitionTo = (location, action, getUserConfirmation, callback) => {
        if (prompt != null) {
            const result = typeof prompt === 'function' ? prompt(location, action) : prompt;
            if (typeof result === 'string') {
                if (typeof getUserConfirmation === 'function') {
                    getUserConfirmation(result, callback);
                }
                else {
                    warning(false, 'A history needs a getUserConfirmation function in order to use a prompt message');
                    callback(true);
                }
            }
            else {
                callback(result !== false);
            }
        }
        else {
            callback(true);
        }
    };
    let listeners = [];
    const appendListener = (fn) => {
        let isActive = true;
        const listener = (...args) => {
            if (isActive) {
                fn(...args);
            }
        };
        listeners.push(listener);
        return () => {
            isActive = false;
            listeners = listeners.filter(item => item !== listener);
        };
    };
    const notifyListeners = (...args) => {
        listeners.forEach(listener => listener(...args));
    };
    return {
        setPrompt,
        confirmTransitionTo,
        appendListener,
        notifyListeners
    };
};

const createScrollHistory = (applicationScrollKey = 'scrollPositions') => {
    let scrollPositions = new Map();
    if (storageAvailable('sessionStorage')) {
        const scrollData = window.sessionStorage.getItem(applicationScrollKey);
        scrollPositions = scrollData ?
            new Map(JSON.parse(scrollData)) :
            scrollPositions;
    }
    if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual';
    }
    function set(key, value) {
        scrollPositions.set(key, value);
        if (storageAvailable('sessionStorage')) {
            const arrayData = [];
            scrollPositions.forEach((value, key) => {
                arrayData.push([key, value]);
            });
            window.sessionStorage.setItem('scrollPositions', JSON.stringify(arrayData));
        }
    }
    function get(key) {
        return scrollPositions.get(key);
    }
    function has(key) {
        return scrollPositions.has(key);
    }
    function capture(key) {
        set(key, [window.scrollX, window.scrollY]);
    }
    return {
        set,
        get,
        has,
        capture
    };
};

const PopStateEvent = 'popstate';
const HashChangeEvent = 'hashchange';
const getHistoryState = () => {
    try {
        return window.history.state || {};
    }
    catch (e) {
        return {};
    }
};
const createBrowserHistory = (props = {}) => {
    invariant(canUseDOM, 'Browser history needs a DOM');
    const globalHistory = window.history;
    const canUseHistory = supportsHistory();
    const needsHashChangeListener = !supportsPopStateOnHashChange();
    const scrollHistory = createScrollHistory();
    const forceRefresh = (props.forceRefresh != null) ? props.forceRefresh : false;
    const getUserConfirmation = (props.getUserConfirmation != null) ? props.getUserConfirmation : getConfirmation;
    const keyLength = (props.keyLength != null) ? props.keyLength : 6;
    const basename = props.basename ? stripTrailingSlash(addLeadingSlash(props.basename)) : '';
    const getDOMLocation = (historyState) => {
        historyState = historyState || {};
        const { key, state } = historyState;
        const { pathname, search, hash } = window.location;
        let path = pathname + search + hash;
        warning((!basename || hasBasename(path, basename)), 'You are attempting to use a basename on a page whose URL path does not begin ' +
            'with the basename. Expected path "' + path + '" to begin with "' + basename + '".');
        if (basename) {
            path = stripBasename(path, basename);
        }
        return createLocation(path, state, key || createKey(keyLength));
    };
    const transitionManager = createTransitionManager();
    const setState = (nextState) => {
        scrollHistory.capture(history.location.key);
        Object.assign(history, nextState);
        history.location.scrollPosition = scrollHistory.get(history.location.key);
        history.length = globalHistory.length;
        transitionManager.notifyListeners(history.location, history.action);
    };
    const handlePopState = (event) => {
        if (isExtraneousPopstateEvent(event)) {
            return;
        }
        handlePop(getDOMLocation(event.state));
    };
    const handleHashChange = () => {
        handlePop(getDOMLocation(getHistoryState()));
    };
    let forceNextPop = false;
    const handlePop = (location) => {
        if (forceNextPop) {
            forceNextPop = false;
            setState();
        }
        else {
            const action = 'POP';
            transitionManager.confirmTransitionTo(location, action, getUserConfirmation, (ok) => {
                if (ok) {
                    setState({ action, location });
                }
                else {
                    revertPop(location);
                }
            });
        }
    };
    const revertPop = (fromLocation) => {
        const toLocation = history.location;
        let toIndex = allKeys.indexOf(toLocation.key);
        if (toIndex === -1) {
            toIndex = 0;
        }
        let fromIndex = allKeys.indexOf(fromLocation.key);
        if (fromIndex === -1) {
            fromIndex = 0;
        }
        const delta = toIndex - fromIndex;
        if (delta) {
            forceNextPop = true;
            go(delta);
        }
    };
    const initialLocation = getDOMLocation(getHistoryState());
    let allKeys = [initialLocation.key];
    const createHref = (location) => {
        return basename + createPath(location);
    };
    const push = (path, state) => {
        warning(!(typeof path === 'object' && path.state !== undefined && state !== undefined), 'You should avoid providing a 2nd state argument to push when the 1st ' +
            'argument is a location-like object that already has state; it is ignored');
        const action = 'PUSH';
        const location = createLocation(path, state, createKey(keyLength), history.location);
        transitionManager.confirmTransitionTo(location, action, getUserConfirmation, (ok) => {
            if (!ok) {
                return;
            }
            const href = createHref(location);
            const { key, state } = location;
            if (canUseHistory) {
                globalHistory.pushState({ key, state }, undefined, href);
                if (forceRefresh) {
                    window.location.href = href;
                }
                else {
                    const prevIndex = allKeys.indexOf(history.location.key);
                    const nextKeys = allKeys.slice(0, prevIndex === -1 ? 0 : prevIndex + 1);
                    nextKeys.push(location.key);
                    allKeys = nextKeys;
                    setState({ action, location });
                }
            }
            else {
                warning(state === undefined, 'Browser history cannot push state in browsers that do not support HTML5 history');
                window.location.href = href;
            }
        });
    };
    const replace = (path, state) => {
        warning(!(typeof path === 'object' && path.state !== undefined && state !== undefined), 'You should avoid providing a 2nd state argument to replace when the 1st ' +
            'argument is a location-like object that already has state; it is ignored');
        const action = 'REPLACE';
        const location = createLocation(path, state, createKey(keyLength), history.location);
        transitionManager.confirmTransitionTo(location, action, getUserConfirmation, (ok) => {
            if (!ok) {
                return;
            }
            const href = createHref(location);
            const { key, state } = location;
            if (canUseHistory) {
                globalHistory.replaceState({ key, state }, undefined, href);
                if (forceRefresh) {
                    window.location.replace(href);
                }
                else {
                    const prevIndex = allKeys.indexOf(history.location.key);
                    if (prevIndex !== -1) {
                        allKeys[prevIndex] = location.key;
                    }
                    setState({ action, location });
                }
            }
            else {
                warning(state === undefined, 'Browser history cannot replace state in browsers that do not support HTML5 history');
                window.location.replace(href);
            }
        });
    };
    const go = (n) => {
        globalHistory.go(n);
    };
    const goBack = () => go(-1);
    const goForward = () => go(1);
    let listenerCount = 0;
    const checkDOMListeners = (delta) => {
        listenerCount += delta;
        if (listenerCount === 1) {
            addEventListener$1(window, PopStateEvent, handlePopState);
            if (needsHashChangeListener) {
                addEventListener$1(window, HashChangeEvent, handleHashChange);
            }
        }
        else if (listenerCount === 0) {
            removeEventListener(window, PopStateEvent, handlePopState);
            if (needsHashChangeListener) {
                removeEventListener(window, HashChangeEvent, handleHashChange);
            }
        }
    };
    let isBlocked = false;
    const block = (prompt = '') => {
        const unblock = transitionManager.setPrompt(prompt);
        if (!isBlocked) {
            checkDOMListeners(1);
            isBlocked = true;
        }
        return () => {
            if (isBlocked) {
                isBlocked = false;
                checkDOMListeners(-1);
            }
            return unblock();
        };
    };
    const listen = (listener) => {
        const unlisten = transitionManager.appendListener(listener);
        checkDOMListeners(1);
        return () => {
            checkDOMListeners(-1);
            unlisten();
        };
    };
    const history = {
        length: globalHistory.length,
        action: 'POP',
        location: initialLocation,
        createHref,
        push,
        replace,
        go,
        goBack,
        goForward,
        block,
        listen
    };
    return history;
};

const HashChangeEvent$1 = 'hashchange';
const HashPathCoders = {
    hashbang: {
        encodePath: (path) => path.charAt(0) === '!' ? path : '!/' + stripLeadingSlash(path),
        decodePath: (path) => path.charAt(0) === '!' ? path.substr(1) : path
    },
    noslash: {
        encodePath: stripLeadingSlash,
        decodePath: addLeadingSlash
    },
    slash: {
        encodePath: addLeadingSlash,
        decodePath: addLeadingSlash
    }
};
const getHashPath = () => {
    const href = window.location.href;
    const hashIndex = href.indexOf('#');
    return hashIndex === -1 ? '' : href.substring(hashIndex + 1);
};
const pushHashPath = (path) => (window.location.hash = path);
const replaceHashPath = (path) => {
    const hashIndex = window.location.href.indexOf('#');
    window.location.replace(window.location.href.slice(0, hashIndex >= 0 ? hashIndex : 0) + '#' + path);
};
const createHashHistory = (props = {}) => {
    invariant(canUseDOM, 'Hash history needs a DOM');
    const globalHistory = window.history;
    const canGoWithoutReload = supportsGoWithoutReloadUsingHash();
    const keyLength = (props.keyLength != null) ? props.keyLength : 6;
    const { getUserConfirmation = getConfirmation, hashType = 'slash' } = props;
    const basename = props.basename ? stripTrailingSlash(addLeadingSlash(props.basename)) : '';
    const { encodePath, decodePath } = HashPathCoders[hashType];
    const getDOMLocation = () => {
        let path = decodePath(getHashPath());
        warning((!basename || hasBasename(path, basename)), 'You are attempting to use a basename on a page whose URL path does not begin ' +
            'with the basename. Expected path "' + path + '" to begin with "' + basename + '".');
        if (basename) {
            path = stripBasename(path, basename);
        }
        return createLocation(path, undefined, createKey(keyLength));
    };
    const transitionManager = createTransitionManager();
    const setState = (nextState) => {
        Object.assign(history, nextState);
        history.length = globalHistory.length;
        transitionManager.notifyListeners(history.location, history.action);
    };
    let forceNextPop = false;
    let ignorePath = null;
    const handleHashChange = () => {
        const path = getHashPath();
        const encodedPath = encodePath(path);
        if (path !== encodedPath) {
            replaceHashPath(encodedPath);
        }
        else {
            const location = getDOMLocation();
            const prevLocation = history.location;
            if (!forceNextPop && locationsAreEqual(prevLocation, location)) {
                return;
            }
            if (ignorePath === createPath(location)) {
                return;
            }
            ignorePath = null;
            handlePop(location);
        }
    };
    const handlePop = (location) => {
        if (forceNextPop) {
            forceNextPop = false;
            setState();
        }
        else {
            const action = 'POP';
            transitionManager.confirmTransitionTo(location, action, getUserConfirmation, (ok) => {
                if (ok) {
                    setState({ action, location });
                }
                else {
                    revertPop(location);
                }
            });
        }
    };
    const revertPop = (fromLocation) => {
        const toLocation = history.location;
        let toIndex = allPaths.lastIndexOf(createPath(toLocation));
        if (toIndex === -1) {
            toIndex = 0;
        }
        let fromIndex = allPaths.lastIndexOf(createPath(fromLocation));
        if (fromIndex === -1) {
            fromIndex = 0;
        }
        const delta = toIndex - fromIndex;
        if (delta) {
            forceNextPop = true;
            go(delta);
        }
    };
    const path = getHashPath();
    const encodedPath = encodePath(path);
    if (path !== encodedPath) {
        replaceHashPath(encodedPath);
    }
    const initialLocation = getDOMLocation();
    let allPaths = [createPath(initialLocation)];
    const createHref = (location) => ('#' + encodePath(basename + createPath(location)));
    const push = (path, state) => {
        warning(state === undefined, 'Hash history cannot push state; it is ignored');
        const action = 'PUSH';
        const location = createLocation(path, undefined, createKey(keyLength), history.location);
        transitionManager.confirmTransitionTo(location, action, getUserConfirmation, (ok) => {
            if (!ok) {
                return;
            }
            const path = createPath(location);
            const encodedPath = encodePath(basename + path);
            const hashChanged = getHashPath() !== encodedPath;
            if (hashChanged) {
                ignorePath = path;
                pushHashPath(encodedPath);
                const prevIndex = allPaths.lastIndexOf(createPath(history.location));
                const nextPaths = allPaths.slice(0, prevIndex === -1 ? 0 : prevIndex + 1);
                nextPaths.push(path);
                allPaths = nextPaths;
                setState({ action, location });
            }
            else {
                warning(false, 'Hash history cannot PUSH the same path; a new entry will not be added to the history stack');
                setState();
            }
        });
    };
    const replace = (path, state) => {
        warning(state === undefined, 'Hash history cannot replace state; it is ignored');
        const action = 'REPLACE';
        const location = createLocation(path, undefined, createKey(keyLength), history.location);
        transitionManager.confirmTransitionTo(location, action, getUserConfirmation, (ok) => {
            if (!ok) {
                return;
            }
            const path = createPath(location);
            const encodedPath = encodePath(basename + path);
            const hashChanged = getHashPath() !== encodedPath;
            if (hashChanged) {
                ignorePath = path;
                replaceHashPath(encodedPath);
            }
            const prevIndex = allPaths.indexOf(createPath(history.location));
            if (prevIndex !== -1) {
                allPaths[prevIndex] = path;
            }
            setState({ action, location });
        });
    };
    const go = (n) => {
        warning(canGoWithoutReload, 'Hash history go(n) causes a full page reload in this browser');
        globalHistory.go(n);
    };
    const goBack = () => go(-1);
    const goForward = () => go(1);
    let listenerCount = 0;
    const checkDOMListeners = (delta) => {
        listenerCount += delta;
        if (listenerCount === 1) {
            addEventListener$1(window, HashChangeEvent$1, handleHashChange);
        }
        else if (listenerCount === 0) {
            removeEventListener(window, HashChangeEvent$1, handleHashChange);
        }
    };
    let isBlocked = false;
    const block = (prompt = '') => {
        const unblock = transitionManager.setPrompt(prompt);
        if (!isBlocked) {
            checkDOMListeners(1);
            isBlocked = true;
        }
        return () => {
            if (isBlocked) {
                isBlocked = false;
                checkDOMListeners(-1);
            }
            return unblock();
        };
    };
    const listen = (listener) => {
        const unlisten = transitionManager.appendListener(listener);
        checkDOMListeners(1);
        return () => {
            checkDOMListeners(-1);
            unlisten();
        };
    };
    const history = {
        length: globalHistory.length,
        action: 'POP',
        location: initialLocation,
        createHref,
        push,
        replace,
        go,
        goBack,
        goForward,
        block,
        listen
    };
    return history;
};

var __awaiter$2 = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try {
            step(generator.next(value));
        }
        catch (e) {
            reject(e);
        } }
        function rejected(value) { try {
            step(generator["throw"](value));
        }
        catch (e) {
            reject(e);
        } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function getLocation(location, root) {
    const pathname = location.pathname.indexOf(root) == 0 ?
        "/" + location.pathname.slice(root.length) :
        location.pathname;
    return Object.assign({}, location, { pathname });
}
const HISTORIES = {
    "browser": createBrowserHistory,
    "hash": createHashHistory
};
class Router {
    constructor() {
        this.root = "/";
        this.historyType = "browser";
        this.titleSuffix = "";
        this.routeViewsUpdated = (options = {}) => {
            if (options.scrollToId && this.historyType === "browser") {
                const element = document.getElementById(options.scrollToId);
                if (element) {
                    return element.scrollIntoView();
                }
            }
            this.scrollTo(options.scrollTopOffset || this.scrollTopOffset);
        };
    }
    componentWillLoad() {
        this.history = HISTORIES[this.historyType]();
        this.history.listen((location) => __awaiter$2(this, void 0, void 0, function* () {
            location = getLocation(location, this.root);
            this.location = location;
        }));
        this.location = getLocation(this.history.location, this.root);
    }
    scrollTo(scrollToLocation) {
        if (scrollToLocation == null || this.isServer || !this.history) {
            return;
        }
        if (this.history.action === "POP" && Array.isArray(this.history.location.scrollPosition)) {
            return this.queue.write(() => {
                if (this.history && this.history.location && Array.isArray(this.history.location.scrollPosition)) {
                    window.scrollTo(this.history.location.scrollPosition[0], this.history.location.scrollPosition[1]);
                }
            });
        }
        return this.queue.write(() => {
            window.scrollTo(0, scrollToLocation);
        });
    }
    render() {
        if (!this.location || !this.history) {
            return;
        }
        const state = {
            historyType: this.historyType,
            location: this.location,
            titleSuffix: this.titleSuffix,
            root: this.root,
            history: this.history,
            routeViewsUpdated: this.routeViewsUpdated
        };
        return (h(ActiveRouter.Provider, { state: state }, h("slot", null)));
    }
    static get is() { return "stencil-router"; }
    static get properties() {
        return {
            "history": {
                "state": true
            },
            "historyType": {
                "type": String,
                "attr": "history-type"
            },
            "isServer": {
                "context": "isServer"
            },
            "location": {
                "state": true
            },
            "queue": {
                "context": "queue"
            },
            "root": {
                "type": String,
                "attr": "root"
            },
            "scrollTopOffset": {
                "type": Number,
                "attr": "scroll-top-offset"
            },
            "titleSuffix": {
                "type": String,
                "attr": "title-suffix"
            }
        };
    }
}

export { HeaderBar, IoniconsSite, Route as StencilRoute, RouteSwitch as StencilRouteSwitch, Router as StencilRouter };
