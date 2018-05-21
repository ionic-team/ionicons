/*! Built with http://stenciljs.com */
DocsSite.loadBundle('stencil-route-link', ['exports', './chunk-4440b782.js'], function (exports, __chunk_1) {
    var h = window.DocsSite.h;
    /**
      * @name Route
      * @module ionic
      * @description
     */
    var RouteLink = /** @class */ (function () {
        function RouteLink() {
            this.unsubscribe = function () { return; };
            this.activeClass = 'link-active';
            this.exact = false;
            this.strict = true;
            /**
             *  Custom tag to use instead of an anchor
             */
            this.custom = 'a';
            this.match = null;
        }
        // Identify if the current route is a match.
        RouteLink.prototype.computeMatch = function (pathname) {
            if (!pathname) {
                var location = this.activeRouter.get('location');
                pathname = location.pathname;
            }
            var match = __chunk_1.matchPath(pathname, {
                path: this.urlMatch || this.url,
                exact: this.exact,
                strict: this.strict
            });
            return match;
        };
        RouteLink.prototype.componentWillLoad = function () {
            var _this = this;
            // subscribe the project's active router and listen
            // for changes. Recompute the match if any updates get
            // pushed
            this.unsubscribe = this.activeRouter.subscribe({
                isMatch: this.computeMatch.bind(this),
                listener: function (matchResult) {
                    _this.match = matchResult;
                },
            });
            // Likely that this route link could receive a location prop
            this.match = this.computeMatch();
        };
        RouteLink.prototype.componentDidUnload = function () {
            // be sure to unsubscribe to the router so that we don't
            // get any memory leaks
            this.unsubscribe();
        };
        RouteLink.prototype.handleClick = function (e) {
            e.preventDefault();
            if (!this.activeRouter) {
                console.warn('<stencil-route-link> wasn\'t passed an instance of the router as the "router" prop!');
                return;
            }
            var history = this.activeRouter.get('history');
            return history.push(this.getUrl(this.url));
        };
        // Get the URL for this route link without the root from the router
        RouteLink.prototype.getUrl = function (url) {
            var root = this.activeRouter.get('root') || '/';
            // Don't allow double slashes
            if (url.charAt(0) == '/' && root.charAt(root.length - 1) == '/') {
                return root.slice(0, root.length - 1) + url;
            }
            return root + url;
        };
        RouteLink.prototype.render = function () {
            var anchorAttributes = {
                class: (_a = {},
                    _a[this.activeClass] = this.match !== null,
                    _a),
                onClick: this.handleClick.bind(this)
            };
            if (this.anchorClass) {
                anchorAttributes.class[this.anchorClass] = true;
            }
            if (this.custom === 'a') {
                anchorAttributes = Object.assign({}, anchorAttributes, { href: this.url, title: this.anchorTitle, role: this.anchorRole, tabindex: this.anchorTabIndex });
            }
            return (h(this.custom, Object.assign({}, anchorAttributes), h("slot", null)));
            var _a;
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
                    "activeRouter": {
                        "context": "activeRouter"
                    },
                    "anchorClass": {
                        "type": String,
                        "attr": "anchor-class"
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
                    "custom": {
                        "type": String,
                        "attr": "custom"
                    },
                    "exact": {
                        "type": Boolean,
                        "attr": "exact"
                    },
                    "match": {
                        "state": true
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
    exports.StencilRouteLink = RouteLink;
    Object.defineProperty(exports, '__esModule', { value: true });
});
