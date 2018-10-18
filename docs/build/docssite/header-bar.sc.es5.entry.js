var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
/*! Built with http://stenciljs.com */
DocsSite.loadBundle('header-bar', ['exports', './chunk-4e065e0c.js'], function (exports, __chunk_1) {
    var h = window.DocsSite.h;
    var HeaderBar = /** @class */ (function () {
        function HeaderBar() {
            this.isSticky = false;
            this.query = '';
            this.isSearchVisible = false;
        }
        HeaderBar.prototype.handleScroll = function () {
            requestAnimationFrame(this.checkScroll.bind(this));
        };
        HeaderBar.prototype.handleResize = function () {
            var _this = this;
            requestAnimationFrame(function () {
                if (window.innerWidth > 768) {
                    var menu = _this.el.querySelector('nav');
                    menu.style.display = '';
                    _this.el.classList.remove('show-mobile-menu');
                    document.body.classList.remove('no-scroll');
                    _this.isMobileMenuShown = false;
                }
            });
        };
        HeaderBar.prototype.checkScroll = function () {
            var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
            this.isSticky = (scrollTop > 30);
        };
        HeaderBar.prototype.showNav = function () {
            if (this.isMobileMenuShown)
                return;
            this.isMobileMenuShown = true;
            var menu = this.el.querySelector('nav');
            menu.style.display = 'flex';
            setTimeout(function () {
                menu.classList.add('show-mobile-menu');
                document.body.classList.add('no-scroll');
            }, 1);
        };
        HeaderBar.prototype.hideNav = function () {
            if (!this.isMobileMenuShown)
                return;
            this.isMobileMenuShown = false;
            var menu = this.el.querySelector('nav');
            menu.classList.remove('show-mobile-menu');
            setTimeout(function () {
                menu.style.display = 'none';
                document.body.classList.remove('no-scroll');
            }, 300);
        };
        HeaderBar.prototype.render = function () {
            var _this = this;
            return (h("header", { class: (this.isSearchVisible ? 'visible-search' : '') + " " + (this.isSticky ? 'overlay' : '') }, h("div", { class: "container" }, h("div", { class: "logo" }, h("stencil-route-link", { url: "/", exact: true }, h("svg", { width: "32px", height: "32px", viewBox: "0 0 32 32" }, h("g", { stroke: "none", "stroke-width": "1", fill: "none", "fill-rule": "evenodd" }, h("g", { id: "icon", "fill-rule": "nonzero" }, h("circle", { id: "circle", fill: "#EAEEF5", cx: "16", cy: "16", r: "16" }), h("circle", { id: "circle_copy", fill: "#B4C1D8", cx: "16", cy: "16", r: "11" }), h("circle", { id: "circle_copy_2", fill: "#647AA1", cx: "16", cy: "16", r: "6" }), h("circle", { id: "circle_copy_3", fill: "#647AA1", cx: "23.5", cy: "8.5", r: "2" })))), "Ionicons"), h("span", { class: "version" }, this.version)), h("icon-search", { query: this.query, size: "small" }), h("nav", null, h("stencil-route-link", { class: "nav__item", url: "/", exact: true, onClick: this.hideNav.bind(this) }, "Icons"), h("stencil-route-link", { class: "nav__item", url: "/usage", onClick: function () {
                    _this.toggleHeaderSearch.emit('hide');
                    _this.hideNav();
                } }, "Usage"), h("a", { class: "nav__item", href: "https://github.com/ionic-team/ionicons" }, "Github", h("svg", { width: "12px", height: "12px", viewBox: "0 0 12 12", version: "1.1", xmlns: "http://www.w3.org/2000/svg" }, h("g", { transform: "translate(0,1)" }, h("rect", { id: "bg", fill: "#e3e8f1", x: "0", y: "2", width: "9", height: "9", rx: "1.5" }), h("path", { d: "M9.18198052,1 L6.5,1 L6.5,0 L11,0 L11,1 L11,4.5 L10,4.5 L10,1.59619408 L4.02512627,7.57106781 L3.31801948,6.86396103 L9.18198052,1 Z", id: "arrow", fill: "#A4AEC3" })))), h("span", { class: "close", onClick: this.hideNav.bind(this) }, h("i", { class: "ion ion-md-close" }))), h("a", { class: "btn sm-hide", href: "/ionicons.designerpack.zip" }, h("svg", { width: "9px", height: "11px", viewBox: "0 0 9 11", version: "1.1", xmlns: "http://www.w3.org/2000/svg" }, h("g", null, h("rect", { id: "bg", fill: "#BAC3D1", x: "0", y: "9", width: "9", height: "2", rx: "1" }), h("path", { d: "M5,6.26776695 L7.26776695,4 L7.97487373,4.70710678 L4.70710678,7.97487373 L4.48743687,7.75520382 L4.26776695,7.97487373 L1,4.70710678 L1.70710678,4 L4,6.29289322 L4,0 L5,0 L5,6.26776695 Z", id: "arrow", fill: "#94A0B8" }))), "Designer pack"), h("span", { class: "more", onClick: this.showNav.bind(this) }, h("i", { class: "ion ion-md-more" })))));
        };
        Object.defineProperty(HeaderBar, "is", {
            get: function () { return "header-bar"; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(HeaderBar, "properties", {
            get: function () {
                return {
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
                };
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(HeaderBar, "events", {
            get: function () {
                return [{
                        "name": "toggleHeaderSearch",
                        "method": "toggleHeaderSearch",
                        "bubbles": true,
                        "cancelable": true,
                        "composed": true
                    }];
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(HeaderBar, "listeners", {
            get: function () {
                return [{
                        "name": "window:scroll",
                        "method": "handleScroll",
                        "passive": true
                    }, {
                        "name": "window:resize",
                        "method": "handleResize",
                        "passive": true
                    }];
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(HeaderBar, "style", {
            get: function () { return "header-bar header {\n  -webkit-transition: border 0.6s;\n  transition: border 0.6s;\n  position: fixed;\n  width: 100%;\n  top: 0;\n  left: 0;\n  right: 0;\n  background: #fff;\n  z-index: 999;\n  border-bottom: 1px solid transparent;\n  height: 64px; }\n\nheader-bar header.overlay {\n  border-bottom: 1px solid rgba(0, 0, 0, 0.05); }\n\nheader-bar .container,\nheader-bar .logo,\nheader-bar .logo a,\nheader-bar nav {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n  -ms-flex-align: center;\n  align-items: center; }\n\nheader-bar .logo,\nheader-bar nav {\n  -webkit-box-flex: 0;\n  -ms-flex: 0 0 auto;\n  flex: 0 0 auto; }\n\nheader-bar nav {\n  -webkit-box-align: baseline;\n  -ms-flex-align: baseline;\n  align-items: baseline; }\n\nheader-bar icon-search {\n  -webkit-transition: opacity 0.5s;\n  transition: opacity 0.5s;\n  -webkit-box-flex: 1;\n  -ms-flex: 1;\n  flex: 1;\n  padding-left: 60px;\n  padding-right: 60px;\n  opacity: 0;\n  pointer-events: none; }\n\nheader-bar .visible-search icon-search {\n  opacity: 1;\n  pointer-events: auto; }\n\nheader-bar .container {\n  -webkit-box-pack: justify;\n  -ms-flex-pack: justify;\n  justify-content: space-between;\n  padding-top: 12px;\n  padding-bottom: 12px; }\n\nheader-bar .logo a {\n  font-weight: 700;\n  font-size: 16px;\n  color: var(--color-shark); }\n\nheader-bar .logo svg {\n  margin-right: 10px; }\n\nheader-bar .logo .version {\n  margin-left: 10px;\n  font-size: 10px;\n  font-weight: 600;\n  color: var(--color-oslo-gray);\n  background-color: var(--color-catskill-white);\n  border-radius: 4px;\n  padding: 1px 5px;\n  position: relative;\n  top: -2px; }\n\nheader-bar a {\n  text-decoration: none; }\n\nheader-bar nav + .btn,\nheader-bar .nav__item + .nav__item {\n  margin-left: 30px; }\n\nheader-bar .nav__item {\n  font-size: 13px;\n  font-weight: 600; }\n  header-bar .nav__item,\n  header-bar .nav__item a {\n    -webkit-transition: color 0.3s;\n    transition: color 0.3s;\n    color: var(--color-pale-sky); }\n  header-bar .nav__item:hover,\n  header-bar .nav__item a:not(.link-active):hover {\n    color: var(--color-shark); }\n  header-bar .nav__item .link-active {\n    color: var(--color-heather);\n    cursor: default; }\n  header-bar .nav__item svg {\n    margin-left: 6px; }\n  header-bar .nav__item:hover svg #arrow {\n    -webkit-transform: translate(1px, -1px);\n    transform: translate(1px, -1px); }\n\nheader-bar .btn svg {\n  margin-right: 6px; }\n\nheader-bar .btn:hover svg #arrow {\n  -webkit-transform: translate(0, 1px);\n  transform: translate(0, 1px); }\n\nheader-bar .more {\n  padding: 0 8px;\n  font-size: 28px;\n  line-height: 28px;\n  color: var(--color-dodger-blue);\n  cursor: pointer;\n  display: none; }\n\nheader-bar nav span.close {\n  display: none;\n  font-size: 28px; }\n\n\@media screen and (max-width: 992px) {\n  header-bar nav > * + * {\n    margin-left: 18px; }\n  header-bar icon-search {\n    padding-left: 30px;\n    padding-right: 30px; } }\n\n\@media screen and (max-width: 768px) {\n  header-bar .btn.sm-hide {\n    display: none; }\n  header-bar .more,\n  header-bar .close {\n    cursor: pointer; }\n  header-bar .more {\n    display: block; }\n  header-bar nav + .btn,\n  header-bar .nav__item + .nav__item {\n    margin-left: 0;\n    margin-top: 30px; }\n  header-bar nav {\n    -webkit-transition: opacity 0.3s;\n    transition: opacity 0.3s;\n    position: fixed;\n    top: 0;\n    left: 0;\n    right: 0;\n    bottom: 0;\n    width: 100%;\n    height: 100%;\n    z-index: 99999;\n    background-image: linear-gradient(-223deg, #363E49 0%, #1C1E21 100%);\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-orient: vertical;\n    -webkit-box-direction: normal;\n    -ms-flex-direction: column;\n    flex-direction: column;\n    -webkit-box-pack: center;\n    -ms-flex-pack: center;\n    justify-content: center;\n    -webkit-box-align: center;\n    -ms-flex-align: center;\n    align-items: center;\n    opacity: 0;\n    display: none; }\n  header-bar nav .close {\n    margin: 0;\n    position: absolute;\n    top: 14px;\n    right: 18px;\n    color: #fff;\n    cursor: pointer; }\n  header-bar .nav__item {\n    -webkit-transition: -webkit-transform 0.4s;\n    transition: -webkit-transform 0.4s;\n    transition: transform 0.4s;\n    transition: transform 0.4s, -webkit-transform 0.4s;\n    -webkit-transform: translateY(8px);\n    transform: translateY(8px); }\n    header-bar .nav__item,\n    header-bar .nav__item a {\n      font-size: 28px;\n      color: rgba(255, 255, 255, 0.9); }\n    header-bar .nav__item .link-active {\n      color: rgba(255, 255, 255, 0.3); }\n    header-bar .nav__item:hover,\n    header-bar .nav__item a:not(.link-active):hover {\n      color: rgba(255, 255, 255, 0.9); }\n    header-bar .nav__item svg #bg {\n      opacity: 0.2; }\n  header-bar nav.show-mobile-menu {\n    opacity: 1; }\n  header-bar nav.show-mobile-menu .nav__item {\n    -webkit-transform: translateY(0);\n    transform: translateY(0); }\n  header-bar nav.show-mobile-menu .close {\n    display: block; }\n  header-bar icon-search {\n    padding-left: 20px;\n    padding-right: 15px; } }\n\n\@media screen and (max-width: 520px) {\n  header-bar .version {\n    display: none; } }"; },
            enumerable: true,
            configurable: true
        });
        return HeaderBar;
    }());
    var IoniconsSite = /** @class */ (function () {
        function IoniconsSite() {
            this.data = {
                version: undefined,
                icons: []
            };
            this.query = '';
            this.isHeaderSearchVisible = false;
        }
        IoniconsSite.prototype.handleScroll = function () {
            requestAnimationFrame(this.checkScroll.bind(this));
        };
        IoniconsSite.prototype.searchHandler = function (event) {
            this.query = event.detail;
        };
        IoniconsSite.prototype.toggleHandler = function (event) {
            this.isHeaderSearchVisible = (event.detail === 'show') ? true : false;
        };
        IoniconsSite.prototype.componentWillLoad = function () {
            this.loadData();
        };
        IoniconsSite.prototype.loadData = function () {
            return __awaiter(this, void 0, void 0, function () {
                var res, json;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, fetch('/data.json')];
                        case 1:
                            res = _a.sent();
                            return [4 /*yield*/, res.json()];
                        case 2:
                            json = _a.sent();
                            this.data = json;
                            this.data.icons = json.icons.map(function (o) {
                                o.icons = o.icons.reverse();
                                o.name = o.icons[0].split('-').slice(1).join('-');
                                return o;
                            });
                            return [2 /*return*/];
                    }
                });
            });
        };
        IoniconsSite.prototype.checkScroll = function () {
            // show/hide header searchbar
            var headerSearchEl = document.querySelector('header .search-input');
            var bodySearchEl = document.querySelector('icon-list .search-input');
            if (!bodySearchEl || !headerSearchEl) {
                return;
            }
            var headerInput = headerSearchEl.querySelector('input');
            var bodyInput = bodySearchEl.querySelector('input');
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
        };
        IoniconsSite.prototype.render = function () {
            return [
                h("header-bar", { version: this.data.version, query: this.query, isSearchVisible: this.isHeaderSearchVisible }),
                h("stencil-router", null, h("stencil-router-scroll-top", null, h("stencil-route-switch", { scrollTopOffset: 0 }, h("stencil-route", { url: "/", component: "landing-page", exact: true, componentProps: { 'query': this.query, 'data': this.data } }), h("stencil-route", { url: "/usage", component: "usage-page", componentProps: { 'data': this.data } }), h("stencil-route", { component: "notfound-page" }))))
            ];
        };
        Object.defineProperty(IoniconsSite, "is", {
            get: function () { return "ionicons-site"; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(IoniconsSite, "properties", {
            get: function () {
                return {
                    "data": {
                        "state": true
                    },
                    "isHeaderSearchVisible": {
                        "state": true
                    },
                    "query": {
                        "state": true
                    }
                };
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(IoniconsSite, "listeners", {
            get: function () {
                return [{
                        "name": "window:scroll",
                        "method": "handleScroll",
                        "passive": true
                    }, {
                        "name": "hasSearched",
                        "method": "searchHandler"
                    }, {
                        "name": "toggleHeaderSearch",
                        "method": "toggleHandler"
                    }];
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(IoniconsSite, "style", {
            get: function () { return "stencil-router > div {\n  height: 100%; }"; },
            enumerable: true,
            configurable: true
        });
        return IoniconsSite;
    }());
    var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) {
                try {
                    step(generator.next(value));
                }
                catch (e) {
                    reject(e);
                }
            }
            function rejected(value) {
                try {
                    step(generator["throw"](value));
                }
                catch (e) {
                    reject(e);
                }
            }
            function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    };
    var Route = /** @class */ (function () {
        function Route() {
            this.group = null;
            this.match = null;
            this.componentProps = {};
            this.exact = false;
            this.scrollOnNextRender = false;
            this.previousMatch = null;
        }
        Route.prototype.computeMatch = function (newLocation) {
            var isGrouped = this.group != null || (this.el.parentElement != null && this.el.parentElement.tagName.toLowerCase() === "stencil-route-switch");
            if (!newLocation || isGrouped) {
                return;
            }
            this.previousMatch = this.match;
            return this.match = __chunk_1.matchPath(newLocation.pathname, {
                path: this.url,
                exact: this.exact,
                strict: true
            });
        };
        Route.prototype.componentDidUpdate = function () {
            return __awaiter(this, void 0, void 0, function () {
                var routeViewOptions;
                return __generator(this, function (_a) {
                    routeViewOptions = {};
                    if (this.scrollTopOffset) {
                        routeViewOptions = {
                            scrollTopOffset: this.scrollTopOffset
                        };
                    }
                    if (typeof this.componentUpdated === "function") {
                        this.componentUpdated(routeViewOptions);
                    }
                    else if (this.match && !__chunk_1.matchesAreEqual(this.match, this.previousMatch) && this.routeViewsUpdated) {
                        this.routeViewsUpdated(routeViewOptions);
                    }
                    return [2 /*return*/];
                });
            });
        };
        Route.prototype.render = function () {
            if (!this.match || !this.history) {
                return null;
            }
            var childProps = Object.assign({}, this.componentProps, { history: this.history, match: this.match });
            if (this.routeRender) {
                return this.routeRender(Object.assign({}, childProps, { component: this.component }));
            }
            if (this.component) {
                var ChildComponent = this.component;
                return (h(ChildComponent, Object.assign({}, childProps)));
            }
        };
        Object.defineProperty(Route, "is", {
            get: function () { return "stencil-route"; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Route, "properties", {
            get: function () {
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
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Route, "style", {
            get: function () { return "stencil-route.inactive {\n  display: none;\n}"; },
            enumerable: true,
            configurable: true
        });
        return Route;
    }());
    __chunk_1.ActiveRouter.injectProps(Route, [
        "location",
        "history",
        "historyType",
        "routeViewsUpdated"
    ]);
    function uuidv4() {
        return ([1e7].toString() + -1e3.toString() + -4e3.toString() + -8e3.toString() + -1e11.toString()).replace(/[018]/g, function (c) {
            var random = window.crypto.getRandomValues(new Uint8Array(1));
            return (c ^ random[0] & 15 >> c / 4).toString(16);
        });
    }
    var __awaiter$1 = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) {
                try {
                    step(generator.next(value));
                }
                catch (e) {
                    reject(e);
                }
            }
            function rejected(value) {
                try {
                    step(generator["throw"](value));
                }
                catch (e) {
                    reject(e);
                }
            }
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
        return __chunk_1.matchPath(pathname, {
            path: url,
            exact: exact,
            strict: true
        });
    }
    function isHTMLStencilRouteElement(element) {
        return element.tagName.toLocaleLowerCase() === "stencil-route";
    }
    var RouteSwitch = /** @class */ (function () {
        function RouteSwitch() {
            this.group = getUniqueId();
            this.subscribers = [];
        }
        RouteSwitch.prototype.componentWillLoad = function () {
            if (this.location != null) {
                this.regenerateSubscribers(this.location);
            }
        };
        RouteSwitch.prototype.regenerateSubscribers = function (newLocation) {
            return __awaiter$1(this, void 0, void 0, function () {
                var newActiveIndex, activeChild;
                var _this = this;
                return __generator(this, function (_a) {
                    if (newLocation == null) {
                        return [2 /*return*/];
                    }
                    newActiveIndex = -1;
                    this.subscribers = Array.prototype.slice.call(this.el.children)
                        .filter(isHTMLStencilRouteElement)
                        .map(function (childElement, index) {
                        var match = getMatch(newLocation.pathname, childElement.url, childElement.exact);
                        if (match && newActiveIndex === -1) {
                            newActiveIndex = index;
                        }
                        return {
                            el: childElement,
                            match: match
                        };
                    });
                    if (newActiveIndex === -1) {
                        return [2 /*return*/];
                    }
                    if (this.activeIndex === newActiveIndex) {
                        this.subscribers[newActiveIndex].el.match = this.subscribers[newActiveIndex].match;
                        return [2 /*return*/];
                    }
                    this.activeIndex = newActiveIndex;
                    activeChild = this.subscribers[this.activeIndex];
                    if (this.scrollTopOffset) {
                        activeChild.el.scrollTopOffset = this.scrollTopOffset;
                    }
                    activeChild.el.group = this.group;
                    activeChild.el.match = activeChild.match;
                    activeChild.el.componentUpdated = function (routeViewUpdatedOptions) {
                        _this.queue.write(function () {
                            _this.subscribers.forEach(function (child, index) {
                                child.el.componentUpdated = undefined;
                                if (index === _this.activeIndex) {
                                    return child.el.style.display = "";
                                }
                                if (_this.scrollTopOffset) {
                                    child.el.scrollTopOffset = _this.scrollTopOffset;
                                }
                                child.el.group = _this.group;
                                child.el.match = null;
                                child.el.style.display = "none";
                            });
                        });
                        if (_this.routeViewsUpdated) {
                            _this.routeViewsUpdated(Object.assign({ scrollTopOffset: _this.scrollTopOffset }, routeViewUpdatedOptions));
                        }
                    };
                    return [2 /*return*/];
                });
            });
        };
        RouteSwitch.prototype.render = function () {
            return (h("slot", null));
        };
        Object.defineProperty(RouteSwitch, "is", {
            get: function () { return "stencil-route-switch"; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(RouteSwitch, "properties", {
            get: function () {
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
            },
            enumerable: true,
            configurable: true
        });
        return RouteSwitch;
    }());
    __chunk_1.ActiveRouter.injectProps(RouteSwitch, [
        "location",
        "routeViewsUpdated"
    ]);
    function invariant(value) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        if (!value) {
            console.error.apply(console, args);
        }
    }
    function warning(value) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        if (!value) {
            console.warn.apply(console, args);
        }
    }
    var createTransitionManager = function () {
        var prompt;
        var setPrompt = function (nextPrompt) {
            warning(prompt == null, 'A history supports only one prompt at a time');
            prompt = nextPrompt;
            return function () {
                if (prompt === nextPrompt) {
                    prompt = null;
                }
            };
        };
        var confirmTransitionTo = function (location, action, getUserConfirmation, callback) {
            if (prompt != null) {
                var result = typeof prompt === 'function' ? prompt(location, action) : prompt;
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
        var listeners = [];
        var appendListener = function (fn) {
            var isActive = true;
            var listener = function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                if (isActive) {
                    fn.apply(void 0, args);
                }
            };
            listeners.push(listener);
            return function () {
                isActive = false;
                listeners = listeners.filter(function (item) { return item !== listener; });
            };
        };
        var notifyListeners = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            listeners.forEach(function (listener) { return listener.apply(void 0, args); });
        };
        return {
            setPrompt: setPrompt,
            confirmTransitionTo: confirmTransitionTo,
            appendListener: appendListener,
            notifyListeners: notifyListeners
        };
    };
    var createScrollHistory = function (applicationScrollKey) {
        if (applicationScrollKey === void 0) { applicationScrollKey = 'scrollPositions'; }
        var scrollPositions = new Map();
        if (__chunk_1.storageAvailable('sessionStorage')) {
            var scrollData = window.sessionStorage.getItem(applicationScrollKey);
            scrollPositions = scrollData ?
                new Map(JSON.parse(scrollData)) :
                scrollPositions;
        }
        if ('scrollRestoration' in history) {
            history.scrollRestoration = 'manual';
        }
        function set(key, value) {
            scrollPositions.set(key, value);
            if (__chunk_1.storageAvailable('sessionStorage')) {
                var arrayData_1 = [];
                scrollPositions.forEach(function (value, key) {
                    arrayData_1.push([key, value]);
                });
                window.sessionStorage.setItem('scrollPositions', JSON.stringify(arrayData_1));
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
            set: set,
            get: get,
            has: has,
            capture: capture
        };
    };
    var PopStateEvent = 'popstate';
    var HashChangeEvent = 'hashchange';
    var getHistoryState = function () {
        try {
            return window.history.state || {};
        }
        catch (e) {
            return {};
        }
    };
    var createBrowserHistory = function (props) {
        if (props === void 0) { props = {}; }
        invariant(__chunk_1.canUseDOM, 'Browser history needs a DOM');
        var globalHistory = window.history;
        var canUseHistory = __chunk_1.supportsHistory();
        var needsHashChangeListener = !__chunk_1.supportsPopStateOnHashChange();
        var scrollHistory = createScrollHistory();
        var forceRefresh = (props.forceRefresh != null) ? props.forceRefresh : false;
        var getUserConfirmation = (props.getUserConfirmation != null) ? props.getUserConfirmation : __chunk_1.getConfirmation;
        var keyLength = (props.keyLength != null) ? props.keyLength : 6;
        var basename = props.basename ? __chunk_1.stripTrailingSlash(__chunk_1.addLeadingSlash(props.basename)) : '';
        var getDOMLocation = function (historyState) {
            historyState = historyState || {};
            var key = historyState.key, state = historyState.state;
            var _a = window.location, pathname = _a.pathname, search = _a.search, hash = _a.hash;
            var path = pathname + search + hash;
            warning((!basename || __chunk_1.hasBasename(path, basename)), 'You are attempting to use a basename on a page whose URL path does not begin ' +
                'with the basename. Expected path "' + path + '" to begin with "' + basename + '".');
            if (basename) {
                path = __chunk_1.stripBasename(path, basename);
            }
            return __chunk_1.createLocation(path, state, key || __chunk_1.createKey(keyLength));
        };
        var transitionManager = createTransitionManager();
        var setState = function (nextState) {
            scrollHistory.capture(history.location.key);
            Object.assign(history, nextState);
            history.location.scrollPosition = scrollHistory.get(history.location.key);
            history.length = globalHistory.length;
            transitionManager.notifyListeners(history.location, history.action);
        };
        var handlePopState = function (event) {
            if (__chunk_1.isExtraneousPopstateEvent(event)) {
                return;
            }
            handlePop(getDOMLocation(event.state));
        };
        var handleHashChange = function () {
            handlePop(getDOMLocation(getHistoryState()));
        };
        var forceNextPop = false;
        var handlePop = function (location) {
            if (forceNextPop) {
                forceNextPop = false;
                setState();
            }
            else {
                var action_1 = 'POP';
                transitionManager.confirmTransitionTo(location, action_1, getUserConfirmation, function (ok) {
                    if (ok) {
                        setState({ action: action_1, location: location });
                    }
                    else {
                        revertPop(location);
                    }
                });
            }
        };
        var revertPop = function (fromLocation) {
            var toLocation = history.location;
            var toIndex = allKeys.indexOf(toLocation.key);
            if (toIndex === -1) {
                toIndex = 0;
            }
            var fromIndex = allKeys.indexOf(fromLocation.key);
            if (fromIndex === -1) {
                fromIndex = 0;
            }
            var delta = toIndex - fromIndex;
            if (delta) {
                forceNextPop = true;
                go(delta);
            }
        };
        var initialLocation = getDOMLocation(getHistoryState());
        var allKeys = [initialLocation.key];
        var createHref = function (location) {
            return basename + __chunk_1.createPath(location);
        };
        var push = function (path, state) {
            warning(!(typeof path === 'object' && path.state !== undefined && state !== undefined), 'You should avoid providing a 2nd state argument to push when the 1st ' +
                'argument is a location-like object that already has state; it is ignored');
            var action = 'PUSH';
            var location = __chunk_1.createLocation(path, state, __chunk_1.createKey(keyLength), history.location);
            transitionManager.confirmTransitionTo(location, action, getUserConfirmation, function (ok) {
                if (!ok) {
                    return;
                }
                var href = createHref(location);
                var key = location.key, state = location.state;
                if (canUseHistory) {
                    globalHistory.pushState({ key: key, state: state }, undefined, href);
                    if (forceRefresh) {
                        window.location.href = href;
                    }
                    else {
                        var prevIndex = allKeys.indexOf(history.location.key);
                        var nextKeys = allKeys.slice(0, prevIndex === -1 ? 0 : prevIndex + 1);
                        nextKeys.push(location.key);
                        allKeys = nextKeys;
                        setState({ action: action, location: location });
                    }
                }
                else {
                    warning(state === undefined, 'Browser history cannot push state in browsers that do not support HTML5 history');
                    window.location.href = href;
                }
            });
        };
        var replace = function (path, state) {
            warning(!(typeof path === 'object' && path.state !== undefined && state !== undefined), 'You should avoid providing a 2nd state argument to replace when the 1st ' +
                'argument is a location-like object that already has state; it is ignored');
            var action = 'REPLACE';
            var location = __chunk_1.createLocation(path, state, __chunk_1.createKey(keyLength), history.location);
            transitionManager.confirmTransitionTo(location, action, getUserConfirmation, function (ok) {
                if (!ok) {
                    return;
                }
                var href = createHref(location);
                var key = location.key, state = location.state;
                if (canUseHistory) {
                    globalHistory.replaceState({ key: key, state: state }, undefined, href);
                    if (forceRefresh) {
                        window.location.replace(href);
                    }
                    else {
                        var prevIndex = allKeys.indexOf(history.location.key);
                        if (prevIndex !== -1) {
                            allKeys[prevIndex] = location.key;
                        }
                        setState({ action: action, location: location });
                    }
                }
                else {
                    warning(state === undefined, 'Browser history cannot replace state in browsers that do not support HTML5 history');
                    window.location.replace(href);
                }
            });
        };
        var go = function (n) {
            globalHistory.go(n);
        };
        var goBack = function () { return go(-1); };
        var goForward = function () { return go(1); };
        var listenerCount = 0;
        var checkDOMListeners = function (delta) {
            listenerCount += delta;
            if (listenerCount === 1) {
                __chunk_1.addEventListener(window, PopStateEvent, handlePopState);
                if (needsHashChangeListener) {
                    __chunk_1.addEventListener(window, HashChangeEvent, handleHashChange);
                }
            }
            else if (listenerCount === 0) {
                __chunk_1.removeEventListener(window, PopStateEvent, handlePopState);
                if (needsHashChangeListener) {
                    __chunk_1.removeEventListener(window, HashChangeEvent, handleHashChange);
                }
            }
        };
        var isBlocked = false;
        var block = function (prompt) {
            if (prompt === void 0) { prompt = ''; }
            var unblock = transitionManager.setPrompt(prompt);
            if (!isBlocked) {
                checkDOMListeners(1);
                isBlocked = true;
            }
            return function () {
                if (isBlocked) {
                    isBlocked = false;
                    checkDOMListeners(-1);
                }
                return unblock();
            };
        };
        var listen = function (listener) {
            var unlisten = transitionManager.appendListener(listener);
            checkDOMListeners(1);
            return function () {
                checkDOMListeners(-1);
                unlisten();
            };
        };
        var history = {
            length: globalHistory.length,
            action: 'POP',
            location: initialLocation,
            createHref: createHref,
            push: push,
            replace: replace,
            go: go,
            goBack: goBack,
            goForward: goForward,
            block: block,
            listen: listen
        };
        return history;
    };
    var HashChangeEvent$1 = 'hashchange';
    var HashPathCoders = {
        hashbang: {
            encodePath: function (path) { return path.charAt(0) === '!' ? path : '!/' + __chunk_1.stripLeadingSlash(path); },
            decodePath: function (path) { return path.charAt(0) === '!' ? path.substr(1) : path; }
        },
        noslash: {
            encodePath: __chunk_1.stripLeadingSlash,
            decodePath: __chunk_1.addLeadingSlash
        },
        slash: {
            encodePath: __chunk_1.addLeadingSlash,
            decodePath: __chunk_1.addLeadingSlash
        }
    };
    var getHashPath = function () {
        var href = window.location.href;
        var hashIndex = href.indexOf('#');
        return hashIndex === -1 ? '' : href.substring(hashIndex + 1);
    };
    var pushHashPath = function (path) { return (window.location.hash = path); };
    var replaceHashPath = function (path) {
        var hashIndex = window.location.href.indexOf('#');
        window.location.replace(window.location.href.slice(0, hashIndex >= 0 ? hashIndex : 0) + '#' + path);
    };
    var createHashHistory = function (props) {
        if (props === void 0) { props = {}; }
        invariant(__chunk_1.canUseDOM, 'Hash history needs a DOM');
        var globalHistory = window.history;
        var canGoWithoutReload = __chunk_1.supportsGoWithoutReloadUsingHash();
        var keyLength = (props.keyLength != null) ? props.keyLength : 6;
        var _a = props.getUserConfirmation, getUserConfirmation = _a === void 0 ? getConfirmation : _a, __chunk_1 = props.__chunk_1, getConfirmation = props.getConfirmation, _b = props.hashType, hashType = _b === void 0 ? 'slash' : _b;
        var basename = props.basename ? __chunk_1.stripTrailingSlash(__chunk_1.addLeadingSlash(props.basename)) : '';
        var _c = HashPathCoders[hashType], encodePath = _c.encodePath, decodePath = _c.decodePath;
        var getDOMLocation = function () {
            var path = decodePath(getHashPath());
            warning((!basename || __chunk_1.hasBasename(path, basename)), 'You are attempting to use a basename on a page whose URL path does not begin ' +
                'with the basename. Expected path "' + path + '" to begin with "' + basename + '".');
            if (basename) {
                path = __chunk_1.stripBasename(path, basename);
            }
            return __chunk_1.createLocation(path, undefined, __chunk_1.createKey(keyLength));
        };
        var transitionManager = createTransitionManager();
        var setState = function (nextState) {
            Object.assign(history, nextState);
            history.length = globalHistory.length;
            transitionManager.notifyListeners(history.location, history.action);
        };
        var forceNextPop = false;
        var ignorePath = null;
        var handleHashChange = function () {
            var path = getHashPath();
            var encodedPath = encodePath(path);
            if (path !== encodedPath) {
                replaceHashPath(encodedPath);
            }
            else {
                var location = getDOMLocation();
                var prevLocation = history.location;
                if (!forceNextPop && __chunk_1.locationsAreEqual(prevLocation, location)) {
                    return;
                }
                if (ignorePath === __chunk_1.createPath(location)) {
                    return;
                }
                ignorePath = null;
                handlePop(location);
            }
        };
        var handlePop = function (location) {
            if (forceNextPop) {
                forceNextPop = false;
                setState();
            }
            else {
                var action_2 = 'POP';
                transitionManager.confirmTransitionTo(location, action_2, getUserConfirmation, function (ok) {
                    if (ok) {
                        setState({ action: action_2, location: location });
                    }
                    else {
                        revertPop(location);
                    }
                });
            }
        };
        var revertPop = function (fromLocation) {
            var toLocation = history.location;
            var toIndex = allPaths.lastIndexOf(__chunk_1.createPath(toLocation));
            if (toIndex === -1) {
                toIndex = 0;
            }
            var fromIndex = allPaths.lastIndexOf(__chunk_1.createPath(fromLocation));
            if (fromIndex === -1) {
                fromIndex = 0;
            }
            var delta = toIndex - fromIndex;
            if (delta) {
                forceNextPop = true;
                go(delta);
            }
        };
        var path = getHashPath();
        var encodedPath = encodePath(path);
        if (path !== encodedPath) {
            replaceHashPath(encodedPath);
        }
        var initialLocation = getDOMLocation();
        var allPaths = [__chunk_1.createPath(initialLocation)];
        var createHref = function (location) { return ('#' + encodePath(basename + __chunk_1.createPath(location))); };
        var push = function (path, state) {
            warning(state === undefined, 'Hash history cannot push state; it is ignored');
            var action = 'PUSH';
            var location = __chunk_1.createLocation(path, undefined, __chunk_1.createKey(keyLength), history.location);
            transitionManager.confirmTransitionTo(location, action, getUserConfirmation, function (ok) {
                if (!ok) {
                    return;
                }
                var path = __chunk_1.createPath(location);
                var encodedPath = encodePath(basename + path);
                var hashChanged = getHashPath() !== encodedPath;
                if (hashChanged) {
                    ignorePath = path;
                    pushHashPath(encodedPath);
                    var prevIndex = allPaths.lastIndexOf(__chunk_1.createPath(history.location));
                    var nextPaths = allPaths.slice(0, prevIndex === -1 ? 0 : prevIndex + 1);
                    nextPaths.push(path);
                    allPaths = nextPaths;
                    setState({ action: action, location: location });
                }
                else {
                    warning(false, 'Hash history cannot PUSH the same path; a new entry will not be added to the history stack');
                    setState();
                }
            });
        };
        var replace = function (path, state) {
            warning(state === undefined, 'Hash history cannot replace state; it is ignored');
            var action = 'REPLACE';
            var location = __chunk_1.createLocation(path, undefined, __chunk_1.createKey(keyLength), history.location);
            transitionManager.confirmTransitionTo(location, action, getUserConfirmation, function (ok) {
                if (!ok) {
                    return;
                }
                var path = __chunk_1.createPath(location);
                var encodedPath = encodePath(basename + path);
                var hashChanged = getHashPath() !== encodedPath;
                if (hashChanged) {
                    ignorePath = path;
                    replaceHashPath(encodedPath);
                }
                var prevIndex = allPaths.indexOf(__chunk_1.createPath(history.location));
                if (prevIndex !== -1) {
                    allPaths[prevIndex] = path;
                }
                setState({ action: action, location: location });
            });
        };
        var go = function (n) {
            warning(canGoWithoutReload, 'Hash history go(n) causes a full page reload in this browser');
            globalHistory.go(n);
        };
        var goBack = function () { return go(-1); };
        var goForward = function () { return go(1); };
        var listenerCount = 0;
        var checkDOMListeners = function (delta) {
            listenerCount += delta;
            if (listenerCount === 1) {
                __chunk_1.addEventListener(window, HashChangeEvent$1, handleHashChange);
            }
            else if (listenerCount === 0) {
                __chunk_1.removeEventListener(window, HashChangeEvent$1, handleHashChange);
            }
        };
        var isBlocked = false;
        var block = function (prompt) {
            if (prompt === void 0) { prompt = ''; }
            var unblock = transitionManager.setPrompt(prompt);
            if (!isBlocked) {
                checkDOMListeners(1);
                isBlocked = true;
            }
            return function () {
                if (isBlocked) {
                    isBlocked = false;
                    checkDOMListeners(-1);
                }
                return unblock();
            };
        };
        var listen = function (listener) {
            var unlisten = transitionManager.appendListener(listener);
            checkDOMListeners(1);
            return function () {
                checkDOMListeners(-1);
                unlisten();
            };
        };
        var history = {
            length: globalHistory.length,
            action: 'POP',
            location: initialLocation,
            createHref: createHref,
            push: push,
            replace: replace,
            go: go,
            goBack: goBack,
            goForward: goForward,
            block: block,
            listen: listen
        };
        return history;
    };
    var __awaiter$2 = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) {
                try {
                    step(generator.next(value));
                }
                catch (e) {
                    reject(e);
                }
            }
            function rejected(value) {
                try {
                    step(generator["throw"](value));
                }
                catch (e) {
                    reject(e);
                }
            }
            function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    };
    function getLocation(location, root) {
        var pathname = location.pathname.indexOf(root) == 0 ?
            "/" + location.pathname.slice(root.length) :
            location.pathname;
        return Object.assign({}, location, { pathname: pathname });
    }
    var HISTORIES = {
        "browser": createBrowserHistory,
        "hash": createHashHistory
    };
    var Router = /** @class */ (function () {
        function Router() {
            var _this = this;
            this.root = "/";
            this.historyType = "browser";
            this.titleSuffix = "";
            this.routeViewsUpdated = function (options) {
                if (options === void 0) { options = {}; }
                _this.scrollTo(options.scrollTopOffset || _this.scrollTopOffset);
            };
        }
        Router.prototype.componentWillLoad = function () {
            var _this = this;
            this.history = HISTORIES[this.historyType]();
            this.history.listen(function (location) { return __awaiter$2(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    location = getLocation(location, this.root);
                    this.location = location;
                    return [2 /*return*/];
                });
            }); });
            this.location = getLocation(this.history.location, this.root);
        };
        Router.prototype.scrollTo = function (scrollToLocation) {
            var _this = this;
            if (scrollToLocation == null || this.isServer || !this.history) {
                return;
            }
            if (this.history.action === "POP" && Array.isArray(this.history.location.scrollPosition)) {
                return this.queue.write(function () {
                    if (_this.history && _this.history.location && Array.isArray(_this.history.location.scrollPosition)) {
                        window.scrollTo(_this.history.location.scrollPosition[0], _this.history.location.scrollPosition[1]);
                    }
                });
            }
            return this.queue.write(function () {
                window.scrollTo(0, scrollToLocation);
            });
        };
        Router.prototype.render = function () {
            if (!this.location || !this.history) {
                return;
            }
            var state = {
                historyType: this.historyType,
                location: this.location,
                titleSuffix: this.titleSuffix,
                root: this.root,
                history: this.history,
                routeViewsUpdated: this.routeViewsUpdated
            };
            return (h(__chunk_1.ActiveRouter.Provider, { state: state }, h("slot", null)));
        };
        Object.defineProperty(Router, "is", {
            get: function () { return "stencil-router"; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Router, "properties", {
            get: function () {
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
            },
            enumerable: true,
            configurable: true
        });
        return Router;
    }());
    exports.HeaderBar = HeaderBar;
    exports.IoniconsSite = IoniconsSite;
    exports.StencilRoute = Route;
    exports.StencilRouteSwitch = RouteSwitch;
    exports.StencilRouter = Router;
    Object.defineProperty(exports, '__esModule', { value: true });
});
