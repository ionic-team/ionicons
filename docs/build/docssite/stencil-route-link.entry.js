const h = window.DocsSite.h;

import { a as matchPath, v as isModifiedEvent, c as ActiveRouter } from './chunk-f097fe9f.js';

function getUrl(url, root) {
    if (url.charAt(0) == "/" && root.charAt(root.length - 1) == "/") {
        return root.slice(0, root.length - 1) + url;
    }
    return root + url;
}
class RouteLink {
    constructor() {
        this.unsubscribe = () => { return; };
        this.activeClass = "link-active";
        this.exact = false;
        this.strict = true;
        this.custom = "a";
        this.match = null;
    }
    componentWillLoad() {
        this.computeMatch();
    }
    computeMatch() {
        if (this.location) {
            this.match = matchPath(this.location.pathname, {
                path: this.urlMatch || this.url,
                exact: this.exact,
                strict: this.strict
            });
        }
    }
    handleClick(e) {
        if (isModifiedEvent(e) || !this.history || !this.url || !this.root) {
            return;
        }
        e.preventDefault();
        return this.history.push(getUrl(this.url, this.root));
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
        if (this.custom === "a") {
            anchorAttributes = Object.assign({}, anchorAttributes, { href: this.url, title: this.anchorTitle, role: this.anchorRole, tabindex: this.anchorTabIndex, "aria-haspopup": this.ariaHaspopup, id: this.anchorId, "aria-posinset": this.ariaPosinset, "aria-setsize": this.ariaSetsize, "aria-label": this.ariaLabel });
        }
        return (h(this.custom, Object.assign({}, anchorAttributes), h("slot", null)));
    }
    static get is() { return "stencil-route-link"; }
    static get properties() {
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
    }
}
ActiveRouter.injectProps(RouteLink, [
    "history",
    "location",
    "root"
]);

export { RouteLink as StencilRouteLink };
