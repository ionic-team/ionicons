/*! Built with http://stenciljs.com */
DocsSite.loadBundle('stencil-route-link', ['exports', './chunk-4e065e0c.js'], function (exports, __chunk_1) {
    var h = window.DocsSite.h;
    function getUrl(url, root) {
        if (url.charAt(0) == "/" && root.charAt(root.length - 1) == "/") {
            return root.slice(0, root.length - 1) + url;
        }
        return root + url;
    }
    var RouteLink = /** @class */ (function () {
        function RouteLink() {
            this.unsubscribe = function () { return; };
            this.activeClass = "link-active";
            this.exact = false;
            this.strict = true;
            this.custom = "a";
            this.match = null;
        }
        RouteLink.prototype.componentWillLoad = function () {
            this.computeMatch();
        };
        RouteLink.prototype.computeMatch = function () {
            if (this.location) {
                this.match = __chunk_1.matchPath(this.location.pathname, {
                    path: this.urlMatch || this.url,
                    exact: this.exact,
                    strict: this.strict
                });
            }
        };
        RouteLink.prototype.handleClick = function (e) {
            if (__chunk_1.isModifiedEvent(e) || !this.history || !this.url || !this.root) {
                return;
            }
            e.preventDefault();
            return this.history.push(getUrl(this.url, this.root));
        };
        RouteLink.prototype.render = function () {
            var _a;
            var anchorAttributes = {
                class: (_a = {},
                    _a[this.activeClass] = this.match !== null,
                    _a),
                onClick: this.handleClick.bind(this)
            };
            if (this.anchorClass) {
                anchorAttributes.class[this.anchorClass] = true;
            }
            if (this.custom === "a") {
                anchorAttributes = Object.assign({}, anchorAttributes, { href: this.url, title: this.anchorTitle, role: this.anchorRole, tabindex: this.anchorTabIndex, "aria-haspopup": this.ariaHaspopup, id: this.anchorId, "aria-posinset": this.ariaPosinset, "aria-setsize": this.ariaSetsize, "aria-label": this.ariaLabel });
            }
            return (h(this.custom, Object.assign({}, anchorAttributes), h("slot", null)));
        };
        Object.defineProperty(RouteLink, "is", {
            get: function () { return "stencil-route-link"; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(RouteLink, "properties", {
            get: function () {
                return {
                    "activeClass": {
                        "type": String,
                        "attr": "active-class"
                    },
                    "anchorClass": {
                        "type": String,
                        "attr": "anchor-class"
                    },
                    "anchorId": {
                        "type": String,
                        "attr": "anchor-id"
                    },
                    "anchorRole": {
                        "type": String,
                        "attr": "anchor-role"
                    },
                    "anchorTabIndex": {
                        "type": String,
                        "attr": "anchor-tab-index"
                    },
                    "anchorTitle": {
                        "type": String,
                        "attr": "anchor-title"
                    },
                    "ariaHaspopup": {
                        "type": String,
                        "attr": "aria-haspopup"
                    },
                    "ariaLabel": {
                        "type": String,
                        "attr": "aria-label"
                    },
                    "ariaPosinset": {
                        "type": String,
                        "attr": "aria-posinset"
                    },
                    "ariaSetsize": {
                        "type": Number,
                        "attr": "aria-setsize"
                    },
                    "custom": {
                        "type": String,
                        "attr": "custom"
                    },
                    "el": {
                        "elementRef": true
                    },
                    "exact": {
                        "type": Boolean,
                        "attr": "exact"
                    },
                    "history": {
                        "type": "Any",
                        "attr": "history"
                    },
                    "location": {
                        "type": "Any",
                        "attr": "location",
                        "watchCallbacks": ["computeMatch"]
                    },
                    "match": {
                        "state": true
                    },
                    "root": {
                        "type": String,
                        "attr": "root"
                    },
                    "strict": {
                        "type": Boolean,
                        "attr": "strict"
                    },
                    "url": {
                        "type": String,
                        "attr": "url"
                    },
                    "urlMatch": {
                        "type": String,
                        "attr": "url-match"
                    }
                };
            },
            enumerable: true,
            configurable: true
        });
        return RouteLink;
    }());
    __chunk_1.ActiveRouter.injectProps(RouteLink, [
        "history",
        "location",
        "root"
    ]);
    exports.StencilRouteLink = RouteLink;
    Object.defineProperty(exports, '__esModule', { value: true });
});
