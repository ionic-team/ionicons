/*! Built with http://stenciljs.com */
const { h } = window.DocsSite;

import { a as matchPath } from './chunk-f6f1d593.js';

/**
  * @name Route
  * @module ionic
  * @description
 */
class RouteLink {
    constructor() {
        this.unsubscribe = () => { return; };
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
    computeMatch(pathname) {
        if (!pathname) {
            const location = this.activeRouter.get('location');
            pathname = location.pathname;
        }
        const match = matchPath(pathname, {
            path: this.urlMatch || this.url,
            exact: this.exact,
            strict: this.strict
        });
        return match;
    }
    componentWillLoad() {
        // subscribe the project's active router and listen
        // for changes. Recompute the match if any updates get
        // pushed
        this.unsubscribe = this.activeRouter.subscribe({
            isMatch: this.computeMatch.bind(this),
            listener: (matchResult) => {
                this.match = matchResult;
            },
        });
        // Likely that this route link could receive a location prop
        this.match = this.computeMatch();
    }
    componentDidUnload() {
        // be sure to unsubscribe to the router so that we don't
        // get any memory leaks
        this.unsubscribe();
    }
    handleClick(e) {
        e.preventDefault();
        if (!this.activeRouter) {
            console.warn('<stencil-route-link> wasn\'t passed an instance of the router as the "router" prop!');
            return;
        }
        const history = this.activeRouter.get('history');
        return history.push(this.getUrl(this.url));
    }
    // Get the URL for this route link without the root from the router
    getUrl(url) {
        const root = this.activeRouter.get('root') || '/';
        // Don't allow double slashes
        if (url.charAt(0) == '/' && root.charAt(root.length - 1) == '/') {
            return root.slice(0, root.length - 1) + url;
        }
        return root + url;
    }
    render() {
        let anchorAttributes = {
            class: {
                [this.activeClass]: this.match !== null,
            },
            onClick: this.handleClick.bind(this)
        };
        if (this.anchorClass) {
            anchorAttributes.class[this.anchorClass] = true;
        }
        if (this.custom === 'a') {
            anchorAttributes = Object.assign({}, anchorAttributes, { href: this.url, title: this.anchorTitle, role: this.anchorRole, tabindex: this.anchorTabIndex });
        }
        return (h(this.custom, Object.assign({}, anchorAttributes),
            h("slot", null)));
    }
    static get is() { return "stencil-route-link"; }
    static get properties() { return {
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
    }; }
}

export { RouteLink as StencilRouteLink };
