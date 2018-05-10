/*! Built with http://stenciljs.com */
DocsSite.loadBundle('header-bar', ['exports', './chunk-4440b782.js'], function (exports, __chunk_1) {
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
                    menu.style.display = "";
                    _this.el.classList.remove('show-mobile-menu');
                    document.body.classList.remove('no-scroll');
                    _this.isMobileMenuShown = false;
                }
            });
        };
        HeaderBar.prototype.checkScroll = function () {
            var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
            if (scrollTop > 30) {
                this.isSticky = true;
            }
            else {
                this.isSticky = false;
            }
        };
        HeaderBar.prototype.showNav = function () {
            if (this.isMobileMenuShown)
                return;
            this.isMobileMenuShown = true;
            var menu = this.el.querySelector('nav');
            menu.style.display = "flex";
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
                menu.style.display = "none";
                document.body.classList.remove('no-scroll');
            }, 300);
        };
        HeaderBar.prototype.render = function () {
            var _this = this;
            return (h("header", { class: (this.isSearchVisible ? 'visible-search' : '') + " " + (this.isSticky ? 'overlay' : '') }, h("div", { class: "container" }, h("div", { class: "logo" }, h("stencil-route-link", { url: '/', exact: true }, h("svg", { width: "32px", height: "32px", viewBox: "0 0 32 32", version: "1.1", xmlns: "http://www.w3.org/2000/svg" }, h("g", { stroke: "none", "stroke-width": "1", fill: "none", "fill-rule": "evenodd" }, h("g", { id: "icon", "fill-rule": "nonzero" }, h("circle", { id: "circle", fill: "#EAEEF5", cx: "16", cy: "16", r: "16" }), h("circle", { id: "circle_copy", fill: "#B4C1D8", cx: "16", cy: "16", r: "11" }), h("circle", { id: "circle_copy_2", fill: "#647AA1", cx: "16", cy: "16", r: "6" }), h("circle", { id: "circle_copy_3", fill: "#647AA1", cx: "23.5", cy: "8.5", r: "2" })))), "Ionicons"), h("span", { class: "version" }, this.version)), h("icon-search", { query: this.query, size: "small" }), h("nav", null, h("stencil-route-link", { class: "nav__item", url: '/', exact: true, onClick: this.hideNav.bind(this) }, "Icons"), h("stencil-route-link", { class: "nav__item", url: '/usage', onClick: function () {
                    _this.toggleHeaderSearch.emit('hide');
                    _this.hideNav();
                } }, "Usage"), h("a", { class: "nav__item", href: 'https://github.com/ionic-team/ionicons' }, "Github", h("svg", { width: "12px", height: "12px", viewBox: "0 0 12 12", version: "1.1", xmlns: "http://www.w3.org/2000/svg" }, h("g", { transform: "translate(0,1)" }, h("rect", { id: "bg", fill: "#e3e8f1", x: "0", y: "2", width: "9", height: "9", rx: "1.5" }), h("path", { d: "M9.18198052,1 L6.5,1 L6.5,0 L11,0 L11,1 L11,4.5 L10,4.5 L10,1.59619408 L4.02512627,7.57106781 L3.31801948,6.86396103 L9.18198052,1 Z", id: "arrow", fill: "#A4AEC3" })))), h("span", { class: "close", onClick: this.hideNav.bind(this) }, h("i", { class: "ion ion-md-close" }))), h("a", { class: "btn sm-hide", href: '/svg/ionicons.designerpack.zip' }, h("svg", { width: "9px", height: "11px", viewBox: "0 0 9 11", version: "1.1", xmlns: "http://www.w3.org/2000/svg" }, h("g", null, h("rect", { id: "bg", fill: "#BAC3D1", x: "0", y: "9", width: "9", height: "2", rx: "1" }), h("path", { d: "M5,6.26776695 L7.26776695,4 L7.97487373,4.70710678 L4.70710678,7.97487373 L4.48743687,7.75520382 L4.26776695,7.97487373 L1,4.70710678 L1.70710678,4 L4,6.29289322 L4,0 L5,0 L5,6.26776695 Z", id: "arrow", fill: "#94A0B8" }))), "Designer pack"), h("span", { class: "more", onClick: this.showNav.bind(this) }, h("i", { class: "ion ion-md-more" })))));
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
            get: function () { return "header-bar header {\n  -webkit-transition: border 0.6s;\n  transition: border 0.6s;\n  position: fixed;\n  width: 100%;\n  top: 0;\n  left: 0;\n  right: 0;\n  background: #fff;\n  z-index: 999;\n  border-bottom: 1px solid transparent;\n  height: 64px; }\n\nheader-bar header.overlay {\n  border-bottom: 1px solid rgba(0, 0, 0, 0.05); }\n\nheader-bar .container,\nheader-bar .logo,\nheader-bar .logo a,\nheader-bar nav {\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n  -webkit-align-items: center;\n  -ms-flex-align: center;\n  align-items: center; }\n\nheader-bar .logo,\nheader-bar nav {\n  -webkit-box-flex: 0;\n  -webkit-flex: 0 0 auto;\n  -ms-flex: 0 0 auto;\n  flex: 0 0 auto; }\n\nheader-bar nav {\n  -webkit-box-align: baseline;\n  -webkit-align-items: baseline;\n  -ms-flex-align: baseline;\n  align-items: baseline; }\n\nheader-bar icon-search {\n  -webkit-transition: opacity 0.5s;\n  transition: opacity 0.5s;\n  -webkit-box-flex: 1;\n  -webkit-flex: 1;\n  -ms-flex: 1;\n  flex: 1;\n  padding-left: 60px;\n  padding-right: 60px;\n  opacity: 0;\n  pointer-events: none; }\n\nheader-bar .visible-search icon-search {\n  opacity: 1;\n  pointer-events: auto; }\n\nheader-bar .container {\n  -webkit-box-pack: justify;\n  -webkit-justify-content: space-between;\n  -ms-flex-pack: justify;\n  justify-content: space-between;\n  padding-top: 12px;\n  padding-bottom: 12px; }\n\nheader-bar .logo a {\n  font-weight: 700;\n  font-size: 16px;\n  color: var(--color-shark); }\n\nheader-bar .logo svg {\n  margin-right: 10px; }\n\nheader-bar .logo .version {\n  margin-left: 10px;\n  font-size: 10px;\n  font-weight: 600;\n  color: var(--color-oslo-gray);\n  background-color: var(--color-catskill-white);\n  border-radius: 4px;\n  padding: 1px 5px;\n  position: relative;\n  top: -2px; }\n\nheader-bar a {\n  text-decoration: none; }\n\nheader-bar nav + .btn,\nheader-bar .nav__item + .nav__item {\n  margin-left: 30px; }\n\nheader-bar .nav__item {\n  font-size: 13px;\n  font-weight: 600; }\n  header-bar .nav__item,\n  header-bar .nav__item a {\n    -webkit-transition: color 0.3s;\n    transition: color 0.3s;\n    color: var(--color-pale-sky); }\n  header-bar .nav__item:hover,\n  header-bar .nav__item a:not(.link-active):hover {\n    color: var(--color-shark); }\n  header-bar .nav__item .link-active {\n    color: var(--color-heather);\n    cursor: default; }\n  header-bar .nav__item svg {\n    margin-left: 6px; }\n  header-bar .nav__item:hover svg #arrow {\n    -webkit-transform: translate(1px, -1px);\n    transform: translate(1px, -1px); }\n\nheader-bar .btn svg {\n  margin-right: 6px; }\n\nheader-bar .btn:hover svg #arrow {\n  -webkit-transform: translate(0, 1px);\n  transform: translate(0, 1px); }\n\nheader-bar .more {\n  padding: 0 8px;\n  font-size: 28px;\n  line-height: 28px;\n  color: var(--color-dodger-blue);\n  cursor: pointer;\n  display: none; }\n\nheader-bar nav span.close {\n  display: none;\n  font-size: 28px; }\n\n\@media screen and (max-width: 992px) {\n  header-bar nav > * + * {\n    margin-left: 18px; }\n  header-bar icon-search {\n    padding-left: 30px;\n    padding-right: 30px; } }\n\n\@media screen and (max-width: 768px) {\n  header-bar .btn.sm-hide {\n    display: none; }\n  header-bar .more,\n  header-bar .close {\n    cursor: pointer; }\n  header-bar .more {\n    display: block; }\n  header-bar nav + .btn,\n  header-bar .nav__item + .nav__item {\n    margin-left: 0;\n    margin-top: 30px; }\n  header-bar nav {\n    -webkit-transition: opacity 0.3s;\n    transition: opacity 0.3s;\n    position: fixed;\n    top: 0;\n    left: 0;\n    right: 0;\n    bottom: 0;\n    width: 100%;\n    height: 100%;\n    z-index: 99999;\n    background-image: linear-gradient(-223deg, #363E49 0%, #1C1E21 100%);\n    display: -webkit-box;\n    display: -webkit-flex;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-orient: vertical;\n    -webkit-box-direction: normal;\n    -webkit-flex-direction: column;\n    -ms-flex-direction: column;\n    flex-direction: column;\n    -webkit-box-pack: center;\n    -webkit-justify-content: center;\n    -ms-flex-pack: center;\n    justify-content: center;\n    -webkit-box-align: center;\n    -webkit-align-items: center;\n    -ms-flex-align: center;\n    align-items: center;\n    opacity: 0;\n    display: none; }\n  header-bar nav .close {\n    margin: 0;\n    position: absolute;\n    top: 14px;\n    right: 18px;\n    color: #fff;\n    cursor: pointer; }\n  header-bar .nav__item {\n    -webkit-transition: -webkit-transform 0.4s;\n    transition: -webkit-transform 0.4s;\n    transition: transform 0.4s;\n    transition: transform 0.4s, -webkit-transform 0.4s;\n    -webkit-transform: translateY(8px);\n    transform: translateY(8px); }\n    header-bar .nav__item,\n    header-bar .nav__item a {\n      font-size: 28px;\n      color: rgba(255, 255, 255, 0.9); }\n    header-bar .nav__item .link-active {\n      color: rgba(255, 255, 255, 0.3); }\n    header-bar .nav__item:hover,\n    header-bar .nav__item a:not(.link-active):hover {\n      color: rgba(255, 255, 255, 0.9); }\n    header-bar .nav__item svg #bg {\n      opacity: 0.2; }\n  header-bar nav.show-mobile-menu {\n    opacity: 1; }\n  header-bar nav.show-mobile-menu .nav__item {\n    -webkit-transform: translateY(0);\n    transform: translateY(0); }\n  header-bar nav.show-mobile-menu .close {\n    display: block; }\n  header-bar icon-search {\n    padding-left: 20px;\n    padding-right: 15px; } }\n\n\@media screen and (max-width: 520px) {\n  header-bar .version {\n    display: none; } }"; },
            enumerable: true,
            configurable: true
        });
        return HeaderBar;
    }());
    function uuidv4() {
        return ([1e7].toString() + -1e3.toString() + -4e3.toString() + -8e3.toString() + -1e11.toString()).replace(/[018]/g, function (c) {
            var random = window.crypto.getRandomValues(new Uint8Array(1));
            return (c ^ random[0] & 15 >> c / 4).toString(16);
        });
    }
    var RouterSwitch = function (_a, util) {
        var children = _a.children, scrollTopOffset = _a.scrollTopOffset;
        var group;
        if (window.crypto) {
            group = uuidv4();
        }
        else {
            group = (Math.random() * 10e16).toString();
        }
        var chil = children
            .map(function (child, groupIndex) {
            var currentAttributes = util.getAttributes(child);
            util.replaceAttributes(child, Object.assign({}, currentAttributes, { scrollTopOffset: scrollTopOffset,
                group: group,
                groupIndex: groupIndex }));
            return child;
        });
        return (h("div", null, chil));
    };
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
            var _this = this;
            return fetch('/data.json').then(function (rsp) {
                rsp.json().then(function (d) {
                    _this.data = d;
                    _this.data.icons = _this.data.icons.map(function (o) {
                        o.icons = o.icons.reverse();
                        o.name = o.icons[0].split('-').slice(1).join('-');
                        return o;
                    });
                });
            });
        };
        IoniconsSite.prototype.checkScroll = function () {
            // show/hide header searchbar
            var headerSearchEl = document.querySelector('header .search-input');
            var bodySearchEl = document.querySelector('icon-list .search-input');
            if (!bodySearchEl)
                return;
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
                h("stencil-router", null, h("stencil-router-scroll-top", null, h(RouterSwitch, { scrollTopOffset: 0 }, h("stencil-route", { url: "/", component: "landing-page", exact: true, componentProps: { 'query': this.query, 'data': this.data } }), h("stencil-route", { url: "/usage", component: "usage-page", componentProps: { 'data': this.data } }), h("stencil-route", { component: 'notfound-page' }))))
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
    /**
      * @name Route
      * @module ionic
      * @description
     */
    var Route = /** @class */ (function () {
        function Route() {
            this.unsubscribe = function () { return; };
            this.componentProps = {};
            this.exact = false;
            this.group = null;
            this.groupIndex = null;
            this.routeRender = null;
            this.scrollTopOffset = null;
            this.match = null;
            this.activeInGroup = false;
            this.scrollOnNextRender = false;
        }
        // Identify if the current route is a match.
        Route.prototype.computeMatch = function (pathname) {
            if (!pathname) {
                var location = this.activeRouter.get('location');
                pathname = location.pathname;
            }
            return __chunk_1.matchPath(pathname, {
                path: this.url,
                exact: this.exact,
                strict: true
            });
        };
        Route.prototype.componentWillLoad = function () {
            var _this = this;
            var thisRoute = this;
            // subscribe the project's active router and listen
            // for changes. Recompute the match if any updates get
            // pushed
            var listener = function (matchResults) {
                _this.match = matchResults;
                return new Promise(function (resolve) {
                    thisRoute.componentDidRerender = resolve;
                });
            };
            this.unsubscribe = this.activeRouter.subscribe({
                isMatch: this.computeMatch.bind(this),
                listener: listener,
                groupId: this.group,
                groupIndex: this.groupIndex
            });
        };
        Route.prototype.componentDidUnload = function () {
            // be sure to unsubscribe to the router so that we don't
            // get any memory leaks
            this.unsubscribe();
        };
        Route.prototype.componentDidUpdate = function () {
            var _this = this;
            if (this.componentDidRerender) {
                // After route component has rendered then check if its child has.
                var childElement = this.el.firstElementChild;
                if (childElement && childElement.componentOnReady) {
                    childElement.componentOnReady().then(function () {
                        if (_this.componentDidRerender) {
                            _this.componentDidRerender();
                        }
                        _this.componentDidRerender = undefined;
                        _this.activeInGroup = !!_this.match;
                        _this.scrollOnNextRender = _this.activeInGroup;
                    });
                }
                else {
                    // If there is no child then resolve the Promise immediately
                    this.componentDidRerender();
                    this.componentDidRerender = undefined;
                    this.activeInGroup = !!this.match;
                    this.scrollOnNextRender = this.activeInGroup;
                }
            }
            else if (this.scrollOnNextRender) {
                // If this is the new active route in a group and it is now active then scroll
                this.scrollTo();
                this.scrollOnNextRender = false;
            }
        };
        Route.prototype.scrollTo = function () {
            var _this = this;
            var history = this.activeRouter.get('history');
            if (this.scrollTopOffset == null || !history || this.isServer) {
                return;
            }
            if (history.action === 'POP' && history.location.scrollPosition != null) {
                return this.queue.write(function () {
                    window.scrollTo(history.location.scrollPosition[0], history.location.scrollPosition[1]);
                });
            }
            // read a frame to let things measure correctly
            return this.queue.read(function () {
                // okay, the frame has passed. Go ahead and render now
                return _this.queue.write(function () {
                    window.scrollTo(0, _this.scrollTopOffset);
                });
            });
        };
        Route.prototype.hostData = function () {
            if (!this.activeRouter || !this.match || (this.group && !this.activeInGroup)) {
                return {
                    style: {
                        display: 'none'
                    }
                };
            }
        };
        Route.prototype.render = function () {
            // If there is no activeRouter then do not render
            // Check if this route is in the matching URL (for example, a parent route)
            if (!this.activeRouter || !this.match) {
                return null;
            }
            // component props defined in route
            // the history api
            // current match data including params
            var childProps = Object.assign({}, this.componentProps, { history: this.activeRouter.get('history'), match: this.match });
            // If there is a routerRender defined then use
            // that and pass the component and component props with it.
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
                    "activeInGroup": {
                        "state": true
                    },
                    "activeRouter": {
                        "context": "activeRouter"
                    },
                    "component": {
                        "type": String,
                        "attr": "component"
                    },
                    "componentProps": {
                        "type": "Any",
                        "attr": "component-props"
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
                        "attr": "group"
                    },
                    "groupIndex": {
                        "type": Number,
                        "attr": "group-index"
                    },
                    "isServer": {
                        "context": "isServer"
                    },
                    "location": {
                        "context": "location"
                    },
                    "match": {
                        "state": true
                    },
                    "queue": {
                        "context": "queue"
                    },
                    "routeRender": {
                        "type": "Any",
                        "attr": "route-render"
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
        return Route;
    }());
    function hasBasename(path, prefix) {
        return (new RegExp('^' + prefix + '(\\/|\\?|#|$)', 'i')).test(path);
    }
    function stripBasename(path, prefix) {
        return hasBasename(path, prefix) ? path.substr(prefix.length) : path;
    }
    function stripTrailingSlash(path) {
        return path.charAt(path.length - 1) === '/' ? path.slice(0, -1) : path;
    }
    function addLeadingSlash(path) {
        return path.charAt(0) === '/' ? path : '/' + path;
    }
    function stripLeadingSlash(path) {
        return path.charAt(0) === '/' ? path.substr(1) : path;
    }
    function parsePath(path) {
        var pathname = path || '/';
        var search = '';
        var hash = '';
        var hashIndex = pathname.indexOf('#');
        if (hashIndex !== -1) {
            hash = pathname.substr(hashIndex);
            pathname = pathname.substr(0, hashIndex);
        }
        var searchIndex = pathname.indexOf('?');
        if (searchIndex !== -1) {
            search = pathname.substr(searchIndex);
            pathname = pathname.substr(0, searchIndex);
        }
        return {
            pathname: pathname,
            search: search === '?' ? '' : search,
            hash: hash === '#' ? '' : hash
        };
    }
    function createPath(location) {
        var pathname = location.pathname, search = location.search, hash = location.hash;
        var path = pathname || '/';
        if (search && search !== '?') {
            path += (search.charAt(0) === '?' ? search : "?" + search);
        }
        if (hash && hash !== '#') {
            path += (hash.charAt(0) === '#' ? hash : "#" + hash);
        }
        return path;
    }
    function parseQueryString(query) {
        if (!query) {
            return {};
        }
        return (/^[?#]/.test(query) ? query.slice(1) : query)
            .split('&')
            .reduce(function (params, param) {
            var _a = param.split('='), key = _a[0], value = _a[1];
            params[key] = value ? decodeURIComponent(value.replace(/\+/g, ' ')) : '';
            return params;
        }, {});
    }
    function isAbsolute(pathname) {
        return pathname.charAt(0) === '/';
    }
    // About 1.5x faster than the two-arg version of Array#splice()
    function spliceOne(list, index) {
        for (var i = index, k = i + 1, n = list.length; k < n; i += 1, k += 1) {
            list[i] = list[k];
        }
        list.pop();
    }
    // This implementation is based heavily on node's url.parse
    function resolvePathname(to, from) {
        if (from === void 0) { from = ''; }
        var toParts = to && to.split('/') || [];
        var fromParts = from && from.split('/') || [];
        var isToAbs = to && isAbsolute(to);
        var isFromAbs = from && isAbsolute(from);
        var mustEndAbs = isToAbs || isFromAbs;
        if (to && isAbsolute(to)) {
            // to is absolute
            fromParts = toParts;
        }
        else if (toParts.length) {
            // to is relative, drop the filename
            fromParts.pop();
            fromParts = fromParts.concat(toParts);
        }
        if (!fromParts.length) {
            return '/';
        }
        var hasTrailingSlash;
        if (fromParts.length) {
            var last = fromParts[fromParts.length - 1];
            hasTrailingSlash = (last === '.' || last === '..' || last === '');
        }
        else {
            hasTrailingSlash = false;
        }
        var up = 0;
        for (var i = fromParts.length; i >= 0; i--) {
            var part = fromParts[i];
            if (part === '.') {
                spliceOne(fromParts, i);
            }
            else if (part === '..') {
                spliceOne(fromParts, i);
                up++;
            }
            else if (up) {
                spliceOne(fromParts, i);
                up--;
            }
        }
        if (!mustEndAbs) {
            for (; up--; up) {
                fromParts.unshift('..');
            }
        }
        if (mustEndAbs && fromParts[0] !== '' && (!fromParts[0] || !isAbsolute(fromParts[0]))) {
            fromParts.unshift('');
        }
        var result = fromParts.join('/');
        if (hasTrailingSlash && result.substr(-1) !== '/') {
            result += '/';
        }
        return result;
    }
    function valueEqual(a, b) {
        if (a === b) {
            return true;
        }
        if (a == null || b == null) {
            return false;
        }
        if (Array.isArray(a)) {
            return Array.isArray(b) && a.length === b.length && a.every(function (item, index) {
                return valueEqual(item, b[index]);
            });
        }
        var aType = typeof a;
        var bType = typeof b;
        if (aType !== bType) {
            return false;
        }
        if (aType === 'object') {
            var aValue = a.valueOf();
            var bValue = b.valueOf();
            if (aValue !== a || bValue !== b) {
                return valueEqual(aValue, bValue);
            }
            var aKeys = Object.keys(a);
            var bKeys = Object.keys(b);
            if (aKeys.length !== bKeys.length) {
                return false;
            }
            return aKeys.every(function (key) {
                return valueEqual(a[key], b[key]);
            });
        }
        return false;
    }
    function locationsAreEqual(a, b) {
        return a.pathname === b.pathname &&
            a.search === b.search &&
            a.hash === b.hash &&
            a.key === b.key &&
            valueEqual(a.state, b.state);
    }
    function createLocation(path, state, key, currentLocation) {
        var location;
        if (typeof path === 'string') {
            // Two-arg form: push(path, state)
            location = parsePath(path);
            location.state = state;
        }
        else {
            // One-arg form: push(location)
            location = Object.assign({}, path);
            if (location.pathname === undefined) {
                location.pathname = '';
            }
            if (location.search) {
                if (location.search.charAt(0) !== '?') {
                    location.search = '?' + location.search;
                }
            }
            else {
                location.search = '';
            }
            if (location.hash) {
                if (location.hash.charAt(0) !== '#') {
                    location.hash = '#' + location.hash;
                }
            }
            else {
                location.hash = '';
            }
            if (state !== undefined && location.state === undefined) {
                location.state = state;
            }
        }
        try {
            location.pathname = decodeURI(location.pathname);
        }
        catch (e) {
            if (e instanceof URIError) {
                throw new URIError('Pathname "' + location.pathname + '" could not be decoded. ' +
                    'This is likely caused by an invalid percent-encoding.');
            }
            else {
                throw e;
            }
        }
        if (key) {
            location.key = key;
        }
        if (currentLocation) {
            // Resolve incomplete/relative pathname relative to current location.
            if (!location.pathname) {
                location.pathname = currentLocation.pathname;
            }
            else if (location.pathname.charAt(0) !== '/') {
                location.pathname = resolvePathname(location.pathname, currentLocation.pathname);
            }
        }
        else {
            // When there is no prior location and pathname is empty, set it to /
            if (!location.pathname) {
                location.pathname = '/';
            }
        }
        location.query = parseQueryString(location.search);
        return location;
    }
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
            // TODO: If another transition starts while we're still confirming
            // the previous one, we may end up in a weird state. Figure out the
            // best way to handle this.
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
                    // Return false from a transition hook to cancel the transition.
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
    var canUseDOM = !!(typeof window !== 'undefined' && window.document && window.document.createElement);
    var addEventListener$1 = function (node, event, listener) { return (node.addEventListener
        ? node.addEventListener(event, listener, false)
        : node.attachEvent('on' + event, listener)); };
    var removeEventListener = function (node, event, listener) { return (node.removeEventListener
        ? node.removeEventListener(event, listener, false)
        : node.detachEvent('on' + event, listener)); };
    var getConfirmation = function (message, callback) { return (callback(window.confirm(message))); };
    /**
     * Returns true if the HTML5 history API is supported. Taken from Modernizr.
     *
     * https://github.com/Modernizr/Modernizr/blob/master/LICENSE
     * https://github.com/Modernizr/Modernizr/blob/master/feature-detects/history.js
     * changed to avoid false negatives for Windows Phones: https://github.com/reactjs/react-router/issues/586
     */
    var supportsHistory = function () {
        var ua = window.navigator.userAgent;
        if ((ua.indexOf('Android 2.') !== -1 || ua.indexOf('Android 4.0') !== -1) &&
            ua.indexOf('Mobile Safari') !== -1 &&
            ua.indexOf('Chrome') === -1 &&
            ua.indexOf('Windows Phone') === -1) {
            return false;
        }
        return window.history && 'pushState' in window.history;
    };
    /**
     * Returns true if browser fires popstate on hash change.
     * IE10 and IE11 do not.
     */
    var supportsPopStateOnHashChange = function () { return (window.navigator.userAgent.indexOf('Trident') === -1); };
    /**
     * Returns false if using go(n) with hash history causes a full page reload.
     */
    var supportsGoWithoutReloadUsingHash = function () { return (window.navigator.userAgent.indexOf('Firefox') === -1); };
    var isExtraneousPopstateEvent = function (event) { return (event.state === undefined &&
        navigator.userAgent.indexOf('CriOS') === -1); };
    var storageAvailable = function (type) {
        try {
            var storage = window[type], x = '__storage_test__';
            storage.setItem(x, x);
            storage.removeItem(x);
            return true;
        }
        catch (e) {
            return e instanceof DOMException && (
            // everything except Firefox
            e.code === 22 ||
                // Firefox
                e.code === 1014 ||
                // test name field too, because code might not be present
                // everything except Firefox
                e.name === 'QuotaExceededError' ||
                // Firefox
                e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
                // acknowledge QuotaExceededError only if there's something already stored
                storage.length !== 0;
        }
    };
    var createScrollHistory = function (applicationScrollKey) {
        if (applicationScrollKey === void 0) { applicationScrollKey = 'scrollPositions'; }
        var scrollPositions = new Map();
        if (storageAvailable('sessionStorage')) {
            scrollPositions = window.sessionStorage.getItem(applicationScrollKey) ?
                new Map(JSON.parse(window.sessionStorage.getItem(applicationScrollKey))) :
                scrollPositions;
        }
        if ('scrollRestoration' in history) {
            history.scrollRestoration = 'manual';
        }
        function set(key, value) {
            scrollPositions.set(key, value);
            if (storageAvailable('sessionStorage')) {
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
            // IE 11 sometimes throws when accessing window.history.state
            // See https://github.com/ReactTraining/history/pull/289
            return {};
        }
    };
    /**
     * Creates a history object that uses the HTML5 history API including
     * pushState, replaceState, and the popstate event.
     */
    var createBrowserHistory = function (props) {
        if (props === void 0) { props = {}; }
        invariant(canUseDOM, 'Browser history needs a DOM');
        var globalHistory = window.history;
        var canUseHistory = supportsHistory();
        var needsHashChangeListener = !supportsPopStateOnHashChange();
        var scrollHistory = createScrollHistory();
        var _a = props.forceRefresh, forceRefresh = _a === void 0 ? false : _a, _b = props.getUserConfirmation, getUserConfirmation = _b === void 0 ? getConfirmation : _b, _c = props.keyLength, keyLength = _c === void 0 ? 6 : _c;
        var basename = props.basename ? stripTrailingSlash(addLeadingSlash(props.basename)) : '';
        var getDOMLocation = function (historyState) {
            historyState = historyState || {};
            var key = historyState.key, state = historyState.state;
            var _a = window.location, pathname = _a.pathname, search = _a.search, hash = _a.hash;
            var path = pathname + search + hash;
            warning((!basename || hasBasename(path, basename)), 'You are attempting to use a basename on a page whose URL path does not begin ' +
                'with the basename. Expected path "' + path + '" to begin with "' + basename + '".');
            if (basename) {
                path = stripBasename(path, basename);
            }
            return createLocation(path, state, key);
        };
        var createKey = function () { return (Math.random().toString(36).substr(2, keyLength)); };
        var transitionManager = createTransitionManager();
        var setState = function (nextState) {
            // Capture location for the view before changing history.
            scrollHistory.capture(history.location.key);
            Object.assign(history, nextState);
            // Set scroll position based on its previous storage value
            history.location.scrollPosition = scrollHistory.get(history.location.key);
            history.length = globalHistory.length;
            transitionManager.notifyListeners(history.location, history.action);
        };
        var handlePopState = function (event) {
            // Ignore extraneous popstate events in WebKit.
            if (isExtraneousPopstateEvent(event)) {
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
            // TODO: We could probably make this more reliable by
            // keeping a list of keys we've seen in sessionStorage.
            // Instead, we just default to 0 for keys we don't know.
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
        // Public interface
        var createHref = function (location) {
            return basename + createPath(location);
        };
        var push = function (path, state) {
            warning(!(typeof path === 'object' && path.state !== undefined && state !== undefined), 'You should avoid providing a 2nd state argument to push when the 1st ' +
                'argument is a location-like object that already has state; it is ignored');
            var action = 'PUSH';
            var location = createLocation(path, state, createKey(), history.location);
            transitionManager.confirmTransitionTo(location, action, getUserConfirmation, function (ok) {
                if (!ok) {
                    return;
                }
                var href = createHref(location);
                var key = location.key, state = location.state;
                if (canUseHistory) {
                    globalHistory.pushState({ key: key, state: state }, null, href);
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
            var location = createLocation(path, state, createKey(), history.location);
            transitionManager.confirmTransitionTo(location, action, getUserConfirmation, function (ok) {
                if (!ok) {
                    return;
                }
                var href = createHref(location);
                var key = location.key, state = location.state;
                if (canUseHistory) {
                    globalHistory.replaceState({ key: key, state: state }, null, href);
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
            encodePath: function (path) { return path.charAt(0) === '!' ? path : '!/' + stripLeadingSlash(path); },
            decodePath: function (path) { return path.charAt(0) === '!' ? path.substr(1) : path; }
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
    var getHashPath = function () {
        // We can't use window.location.hash here because it's not
        // consistent across browsers - Firefox will pre-decode it!
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
        invariant(canUseDOM, 'Hash history needs a DOM');
        var globalHistory = window.history;
        var canGoWithoutReload = supportsGoWithoutReloadUsingHash();
        var _a = props.getUserConfirmation, getUserConfirmation = _a === void 0 ? getConfirmation : _a, _b = props.hashType, hashType = _b === void 0 ? 'slash' : _b;
        var basename = props.basename ? stripTrailingSlash(addLeadingSlash(props.basename)) : '';
        var _c = HashPathCoders[hashType], encodePath = _c.encodePath, decodePath = _c.decodePath;
        var getDOMLocation = function () {
            var path = decodePath(getHashPath());
            warning((!basename || hasBasename(path, basename)), 'You are attempting to use a basename on a page whose URL path does not begin ' +
                'with the basename. Expected path "' + path + '" to begin with "' + basename + '".');
            if (basename) {
                path = stripBasename(path, basename);
            }
            return createLocation(path);
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
                // Ensure we always have a properly-encoded hash.
                replaceHashPath(encodedPath);
            }
            else {
                var location = getDOMLocation();
                var prevLocation = history.location;
                if (!forceNextPop && locationsAreEqual(prevLocation, location)) {
                    return; // A hashchange doesn't always == location change.
                }
                if (ignorePath === createPath(location)) {
                    return; // Ignore this change; we already setState in push/replace.
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
            // TODO: We could probably make this more reliable by
            // keeping a list of paths we've seen in sessionStorage.
            // Instead, we just default to 0 for paths we don't know.
            var toIndex = allPaths.lastIndexOf(createPath(toLocation));
            if (toIndex === -1) {
                toIndex = 0;
            }
            var fromIndex = allPaths.lastIndexOf(createPath(fromLocation));
            if (fromIndex === -1) {
                fromIndex = 0;
            }
            var delta = toIndex - fromIndex;
            if (delta) {
                forceNextPop = true;
                go(delta);
            }
        };
        // Ensure the hash is encoded properly before doing anything else.
        var path = getHashPath();
        var encodedPath = encodePath(path);
        if (path !== encodedPath) {
            replaceHashPath(encodedPath);
        }
        var initialLocation = getDOMLocation();
        var allPaths = [createPath(initialLocation)];
        // Public interface
        var createHref = function (location) { return ('#' + encodePath(basename + createPath(location))); };
        var push = function (path, state) {
            warning(state === undefined, 'Hash history cannot push state; it is ignored');
            var action = 'PUSH';
            var location = createLocation(path, undefined, undefined, history.location);
            transitionManager.confirmTransitionTo(location, action, getUserConfirmation, function (ok) {
                if (!ok) {
                    return;
                }
                var path = createPath(location);
                var encodedPath = encodePath(basename + path);
                var hashChanged = getHashPath() !== encodedPath;
                if (hashChanged) {
                    // We cannot tell if a hashchange was caused by a PUSH, so we'd
                    // rather setState here and ignore the hashchange. The caveat here
                    // is that other hash histories in the page will consider it a POP.
                    ignorePath = path;
                    pushHashPath(encodedPath);
                    var prevIndex = allPaths.lastIndexOf(createPath(history.location));
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
            var location = createLocation(path, undefined, undefined, history.location);
            transitionManager.confirmTransitionTo(location, action, getUserConfirmation, function (ok) {
                if (!ok) {
                    return;
                }
                var path = createPath(location);
                var encodedPath = encodePath(basename + path);
                var hashChanged = getHashPath() !== encodedPath;
                if (hashChanged) {
                    // We cannot tell if a hashchange was caused by a REPLACE, so we'd
                    // rather setState here and ignore the hashchange. The caveat here
                    // is that other hash histories in the page will consider it a POP.
                    ignorePath = path;
                    replaceHashPath(encodedPath);
                }
                var prevIndex = allPaths.indexOf(createPath(history.location));
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
                addEventListener$1(window, HashChangeEvent$1, handleHashChange);
            }
            else if (listenerCount === 0) {
                removeEventListener(window, HashChangeEvent$1, handleHashChange);
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
    var HISTORIES = {
        'browser': createBrowserHistory,
        'hash': createHashHistory
    };
    /**
      * @name Router
      * @module ionic
      * @description
     */
    var Router = /** @class */ (function () {
        function Router() {
            this.root = '/';
            this.historyType = 'browser';
            // A suffix to append to the page title whenever
            // it's updated through RouteTitle
            this.titleSuffix = '';
            this.unsubscribe = function () { };
            this.match = null;
        }
        Router.prototype.titleSuffixChanged = function (newValue) {
            this.activeRouter.set({
                titleSuffix: newValue
            });
        };
        Router.prototype.computeMatch = function (pathname) {
            return {
                path: this.root,
                url: this.root,
                isExact: pathname === this.root,
                params: {}
            };
        };
        Router.prototype.componentWillLoad = function () {
            var _this = this;
            var history = HISTORIES[this.historyType]();
            history.listen(function (location) {
                _this.activeRouter.set({ location: _this.getLocation(location) });
            });
            this.activeRouter.set({
                location: this.getLocation(history.location),
                titleSuffix: this.titleSuffix,
                root: this.root,
                history: history
            });
            // subscribe the project's active router and listen
            // for changes. Recompute the match if any updates get
            // pushed
            this.unsubscribe = this.activeRouter.subscribe({
                isMatch: this.computeMatch.bind(this),
                listener: function (matchResult) {
                    _this.match = matchResult;
                },
            });
            this.match = this.computeMatch();
        };
        Router.prototype.componentDidLoad = function () {
            this.activeRouter.dispatch();
        };
        Router.prototype.getLocation = function (location) {
            // Remove the root URL if found at beginning of string
            var pathname = location.pathname.indexOf(this.root) == 0 ?
                '/' + location.pathname.slice(this.root.length) :
                location.pathname;
            return Object.assign({}, location, { pathname: pathname });
        };
        Router.prototype.componentDidUnload = function () {
            // be sure to unsubscribe to the router so that we don't
            // get any memory leaks
            this.unsubscribe();
        };
        Router.prototype.render = function () {
            return h("slot", null);
        };
        Object.defineProperty(Router, "is", {
            get: function () { return "stencil-router"; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Router, "properties", {
            get: function () {
                return {
                    "activeRouter": {
                        "context": "activeRouter"
                    },
                    "historyType": {
                        "type": String,
                        "attr": "history-type"
                    },
                    "match": {
                        "state": true
                    },
                    "root": {
                        "type": String,
                        "attr": "root"
                    },
                    "titleSuffix": {
                        "type": String,
                        "attr": "title-suffix",
                        "watchCallbacks": ["titleSuffixChanged"]
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
    exports.StencilRouter = Router;
    Object.defineProperty(exports, '__esModule', { value: true });
});
