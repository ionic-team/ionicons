/*! Built with http://stenciljs.com */
/*! Built with http://stenciljs.com */
const {h: t} = window.ionicons;

class e {
  constructor() {
    this.svgContent = null, 
    /**
         * Specifies the label to use for accessibility. Defaults to the icon name.
         */
    this.ariaLabel = "", 
    /**
         * Specifies which icon to use on `ios` mode.
         */
    this.ios = "", 
    /**
         * Specifies which icon to use on `md` mode.
         */
    this.md = "", 
    /**
         * Specifies which icon to use from the built-in set of icons.
         */
    this.name = "", 
    /**
         * Specifies the exact `src` of an SVG file to use.
         */
    this.src = "", 
    /**
         * A combination of both `name` and `src`. If a `src` url is detected
         * it will set the `src` property. Otherwise it assumes it's a built-in named
         * SVG and set the `name` property.
         */
    this.icon = "";
  }
  componentWillLoad() {
    // purposely do not return the promise here because loading
    // the svg file should not hold up loading the app
    // only load the svg if it's visible
    this.waitUntilVisible(this.el, "50px", () => {
      this.isVisible = !0, this.loadIcon();
    });
  }
  waitUntilVisible(t, e, i) {
    if (this.win.IntersectionObserver) {
      const s = new this.win.IntersectionObserver(t => {
        t[0].isIntersecting && (s.disconnect(), i());
      }, {
        rootMargin: e
      });
      s.observe(t);
    } else {
      // browser doesn't support IntersectionObserver
      // so just fallback to always show it
      i();
    }
  }
  loadIcon() {
    if (!this.isServer && this.isVisible) {
      const t = this.getUrl();
      t && function(t) {
        // see if we already have a request for this url
        let e = i.get(t);
        return e || (
        // we don't already have a request
        e = fetch(t, {
          keepalive: !0,
          cache: "force-cache"
        }).then(t => t.ok ? t.text() : Promise.resolve(null)), 
        // cache for the same requests
        i.set(t, e)), e;
      }(t).then(t => {
        this.svgContent = t;
      });
    }
  }
  getUrl() {
    let t = getSrc(this.src);
    return t || ((t = getName(this.name, this.mode, this.ios, this.md)) ? this.getNamedUrl(t) : (t = getSrc(this.icon)) ? t : (t = getName(this.icon, this.mode, this.ios, this.md)) ? this.getNamedUrl(t) : null);
  }
  getNamedUrl(t) {
    return `${this.resourcesUrl}svg/${t}.svg`;
  }
  hostData() {
    const t = {
      role: "img"
    };
    this.ariaLabel || 
    // user did not provide a label
    // come up with the label based on the icon name
    getName(this.name, this.mode, this.ios, this.md) && (t["aria-label"] = this.name.replace("ios-", "").replace("md-", "").replace("-outline", "").replace(/\-/g, " "));
    const e = {};
    return this.size && (e[`icon-${this.size}`] = !0), Object.assign({}, t, {
      class: e
    });
  }
  render() {
    return this.isServer ? t("div", {
      class: "icon-inner"
    }) : this.svgContent ? t("div", {
      class: "icon-inner",
      innerHTML: function(t, e) {
        if (e) {
          const i = t.createDocumentFragment(), s = t.createElement("div");
          s.innerHTML = e, i.appendChild(s);
          // setup this way to ensure it works on our buddy IE
          for (let t = s.childNodes.length - 1; t >= 0; t--) {
            "svg" !== s.childNodes[t].nodeName.toLowerCase() && s.removeChild(s.childNodes[t]);
          }
          // must only have 1 root element
                    const n = s.firstElementChild;
          if (n && "svg" === n.nodeName.toLowerCase() && function isValid(t) {
            if (1 === t.nodeType) {
              if ("SCRIPT" === t.nodeName) {
                return !1;
              }
              for (var e = 0; e < t.attributes.length; e++) {
                let i = t.attributes[e].value;
                if ("string" == typeof i && 0 === i.toLowerCase().indexOf("on")) {
                  return !1;
                }
              }
              for (e = 0; e < t.childNodes.length; e++) {
                if (!isValid(t.childNodes[e])) {
                  return !1;
                }
              }
            }
            return !0;
          }(n)) {
            return s.innerHTML;
          }
        }
        return "";
      }(this.doc, this.svgContent)
    }) : t("div", {
      class: "icon-inner"
    });
  }
  static get is() {
    return "ion-icon";
  }
  static get host() {
    return {
      theme: "icon"
    };
  }
  static get properties() {
    return {
      ariaLabel: {
        type: String,
        attr: "aria-label"
      },
      color: {
        type: String,
        attr: "color"
      },
      doc: {
        context: "document"
      },
      el: {
        elementRef: !0
      },
      icon: {
        type: String,
        attr: "icon",
        watchCallbacks: [ "loadIcon" ]
      },
      ios: {
        type: String,
        attr: "ios"
      },
      isServer: {
        context: "isServer"
      },
      isVisible: {
        state: !0
      },
      md: {
        type: String,
        attr: "md"
      },
      mode: {
        context: "mode"
      },
      name: {
        type: String,
        attr: "name",
        watchCallbacks: [ "loadIcon" ]
      },
      resourcesUrl: {
        context: "resourcesUrl"
      },
      size: {
        type: String,
        attr: "size"
      },
      src: {
        type: String,
        attr: "src",
        watchCallbacks: [ "loadIcon" ]
      },
      svgContent: {
        state: !0
      },
      win: {
        context: "window"
      }
    };
  }
  static get style() {
    return "ion-icon{display:inline-block;font-size:inherit}ion-icon .icon-inner{height:1em;width:1em}ion-icon svg{fill:currentColor;stroke:currentColor}.icon-small .icon-inner{font-size:18px}.icon-large .icon-inner{font-size:32px}.icon-ios-primary svg{fill:var(--ion-color-ios-primary,var(--ion-color-primary,#3880ff));stroke:var(--ion-color-ios-primary,var(--ion-color-primary,#3880ff))}.icon-ios-secondary svg{fill:var(--ion-color-ios-secondary,var(--ion-color-secondary,#0cd1e8));stroke:var(--ion-color-ios-secondary,var(--ion-color-secondary,#0cd1e8))}.icon-ios-tertiary svg{fill:var(--ion-color-ios-tertiary,var(--ion-color-tertiary,#f4a942));stroke:var(--ion-color-ios-tertiary,var(--ion-color-tertiary,#f4a942))}.icon-ios-success svg{fill:var(--ion-color-ios-success,var(--ion-color-success,#10dc60));stroke:var(--ion-color-ios-success,var(--ion-color-success,#10dc60))}.icon-ios-warning svg{fill:var(--ion-color-ios-warning,var(--ion-color-warning,#ffce00));stroke:var(--ion-color-ios-warning,var(--ion-color-warning,#ffce00))}.icon-ios-danger svg{fill:var(--ion-color-ios-danger,var(--ion-color-danger,#f14141));stroke:var(--ion-color-ios-danger,var(--ion-color-danger,#f14141))}.icon-ios-light svg{fill:var(--ion-color-ios-light,var(--ion-color-light,#f4f5f8));stroke:var(--ion-color-ios-light,var(--ion-color-light,#f4f5f8))}.icon-ios-medium svg{fill:var(--ion-color-ios-medium,var(--ion-color-medium,#989aa2));stroke:var(--ion-color-ios-medium,var(--ion-color-medium,#989aa2))}.icon-ios-dark svg{fill:var(--ion-color-ios-dark,var(--ion-color-dark,#222428));stroke:var(--ion-color-ios-dark,var(--ion-color-dark,#222428))}.icon-md-primary svg{fill:var(--ion-color-md-primary,var(--ion-color-primary,#3880ff));stroke:var(--ion-color-md-primary,var(--ion-color-primary,#3880ff))}.icon-md-secondary svg{fill:var(--ion-color-md-secondary,var(--ion-color-secondary,#0cd1e8));stroke:var(--ion-color-md-secondary,var(--ion-color-secondary,#0cd1e8))}.icon-md-tertiary svg{fill:var(--ion-color-md-tertiary,var(--ion-color-tertiary,#f4a942));stroke:var(--ion-color-md-tertiary,var(--ion-color-tertiary,#f4a942))}.icon-md-success svg{fill:var(--ion-color-md-success,var(--ion-color-success,#10dc60));stroke:var(--ion-color-md-success,var(--ion-color-success,#10dc60))}.icon-md-warning svg{fill:var(--ion-color-md-warning,var(--ion-color-warning,#ffce00));stroke:var(--ion-color-md-warning,var(--ion-color-warning,#ffce00))}.icon-md-danger svg{fill:var(--ion-color-md-danger,var(--ion-color-danger,#f14141));stroke:var(--ion-color-md-danger,var(--ion-color-danger,#f14141))}.icon-md-light svg{fill:var(--ion-color-md-light,var(--ion-color-light,#f4f5f8));stroke:var(--ion-color-md-light,var(--ion-color-light,#f4f5f8))}.icon-md-medium svg{fill:var(--ion-color-md-medium,var(--ion-color-medium,#989aa2));stroke:var(--ion-color-md-medium,var(--ion-color-medium,#989aa2))}.icon-md-dark svg{fill:var(--ion-color-md-dark,var(--ion-color-dark,#222428));stroke:var(--ion-color-md-dark,var(--ion-color-dark,#222428))}";
  }
}

const i = new Map();

function getName(t, e, i, s) {
  return "string" != typeof t ? null : 0 === (t = t.trim().toLowerCase()).length ? null : (
  // default to "md" if somehow the mode wasn't set
  e = e || "md", 
  // if an icon was passed in using the ios or md attributes
  // set the iconName to whatever was passed in
  i && "ios" === e ? t = i.toLowerCase() : s && "md" === e ? t = s.toLowerCase() : t && !/^md-|^ios-|^logo-/.test(t) && (
  // this does not have one of the defaults
  // so lets auto add in the mode prefix for them
  t = e + "-" + t), "" !== t.replace(/[a-z]|-|\d/g, "") ? null : t);
}

function getSrc(t) {
  return "string" == typeof t && (t = t.trim()).length > 0 && /\//.test(t) ? t : null;
}

export { e as IonIcon };