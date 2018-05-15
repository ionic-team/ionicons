/*! Built with http://stenciljs.com */
/*! Built with http://stenciljs.com */
ionicons.loadBundle("olno4hrp", [ "exports" ], function(e) {
  var t = window.ionicons.h, n = /** @class */ function() {
    function Icon() {
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
    return Icon.prototype.componentWillLoad = function() {
      var e = this;
      // purposely do not return the promise here because loading
      // the svg file should not hold up loading the app
      // only load the svg if it's visible
            this.waitUntilVisible(this.el, "50px", function() {
        e.isVisible = !0, e.loadIcon();
      });
    }, Icon.prototype.waitUntilVisible = function(e, t, n) {
      if (this.win.IntersectionObserver) {
        var i = new this.win.IntersectionObserver(function(e) {
          e[0].isIntersecting && (i.disconnect(), n());
        }, {
          rootMargin: t
        });
        i.observe(e);
      } else {
        // browser doesn't support IntersectionObserver
        // so just fallback to always show it
        n();
      }
    }, Icon.prototype.loadIcon = function() {
      var e = this;
      if (!this.isServer && this.isVisible) {
        var t = this.getUrl();
        t && function(e) {
          // see if we already have a request for this url
          var t = i.get(e);
          return t || (
          // we don't already have a request
          t = fetch(e, {
            keepalive: !0,
            cache: "force-cache"
          }).then(function(e) {
            return e.ok ? e.text() : Promise.resolve(null);
          }), 
          // cache for the same requests
          i.set(e, t)), t;
        }(t).then(function(t) {
          e.svgContent = t;
        });
      }
    }, Icon.prototype.getUrl = function() {
      var e = getSrc(this.src);
      return e || ((e = getName(this.name, this.mode, this.ios, this.md)) ? this.getNamedUrl(e) : (e = getSrc(this.icon)) ? e : (e = getName(this.icon, this.mode, this.ios, this.md)) ? this.getNamedUrl(e) : null);
    }, Icon.prototype.getNamedUrl = function(e) {
      return this.resourcesUrl + "svg/" + e + ".svg";
    }, Icon.prototype.hostData = function() {
      var e = {
        role: "img"
      };
      this.ariaLabel || 
      // user did not provide a label
      // come up with the label based on the icon name
      getName(this.name, this.mode, this.ios, this.md) && (e["aria-label"] = this.name.replace("ios-", "").replace("md-", "").replace("-outline", "").replace(/\-/g, " "));
      var t = {};
      return this.size && (t["icon-" + this.size] = !0), Object.assign({}, e, {
        class: t
      });
    }, Icon.prototype.render = function() {
      return this.isServer ? t("div", {
        class: "icon-inner"
      }) : this.svgContent ? t("div", {
        class: "icon-inner",
        innerHTML: function(e, t) {
          if (t) {
            var n = e.createDocumentFragment(), i = e.createElement("div");
            i.innerHTML = t, n.appendChild(i);
            // must only have 1 root element
            var r = i.querySelector("svg");
            if (r && function isValid(e) {
              if (1 === e.nodeType) {
                if ("SCRIPT" === e.nodeName) {
                  return !1;
                }
                for (var t = 0; t < e.attributes.length; t++) {
                  var n = e.attributes[t].value;
                  if ("string" == typeof n && 0 === n.toLowerCase().indexOf("on")) {
                    return !1;
                  }
                }
                for (t = 0; t < e.childNodes.length; t++) {
                  if (!isValid(e.childNodes[t])) {
                    return !1;
                  }
                }
              }
              return !0;
            }(r)) {
              return r.outerHTML;
            }
          }
          return "";
        }(this.doc, this.svgContent)
      }) : t("div", {
        class: "icon-inner"
      });
    }, Object.defineProperty(Icon, "is", {
      get: function() {
        return "ion-icon";
      },
      enumerable: !0,
      configurable: !0
    }), Object.defineProperty(Icon, "host", {
      get: function() {
        return {
          theme: "icon"
        };
      },
      enumerable: !0,
      configurable: !0
    }), Object.defineProperty(Icon, "properties", {
      get: function() {
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
      },
      enumerable: !0,
      configurable: !0
    }), Object.defineProperty(Icon, "style", {
      get: function() {
        return "ion-icon{display:inline-block;font-size:inherit}ion-icon .icon-inner{height:1em;width:1em}ion-icon svg{fill:currentColor;stroke:currentColor}.icon-small .icon-inner{font-size:18px}.icon-large .icon-inner{font-size:32px}.icon-ios-primary svg{fill:var(--ion-color-ios-primary,var(--ion-color-primary,#3880ff));stroke:var(--ion-color-ios-primary,var(--ion-color-primary,#3880ff))}.icon-ios-secondary svg{fill:var(--ion-color-ios-secondary,var(--ion-color-secondary,#0cd1e8));stroke:var(--ion-color-ios-secondary,var(--ion-color-secondary,#0cd1e8))}.icon-ios-tertiary svg{fill:var(--ion-color-ios-tertiary,var(--ion-color-tertiary,#f4a942));stroke:var(--ion-color-ios-tertiary,var(--ion-color-tertiary,#f4a942))}.icon-ios-success svg{fill:var(--ion-color-ios-success,var(--ion-color-success,#10dc60));stroke:var(--ion-color-ios-success,var(--ion-color-success,#10dc60))}.icon-ios-warning svg{fill:var(--ion-color-ios-warning,var(--ion-color-warning,#ffce00));stroke:var(--ion-color-ios-warning,var(--ion-color-warning,#ffce00))}.icon-ios-danger svg{fill:var(--ion-color-ios-danger,var(--ion-color-danger,#f14141));stroke:var(--ion-color-ios-danger,var(--ion-color-danger,#f14141))}.icon-ios-light svg{fill:var(--ion-color-ios-light,var(--ion-color-light,#f4f5f8));stroke:var(--ion-color-ios-light,var(--ion-color-light,#f4f5f8))}.icon-ios-medium svg{fill:var(--ion-color-ios-medium,var(--ion-color-medium,#989aa2));stroke:var(--ion-color-ios-medium,var(--ion-color-medium,#989aa2))}.icon-ios-dark svg{fill:var(--ion-color-ios-dark,var(--ion-color-dark,#222428));stroke:var(--ion-color-ios-dark,var(--ion-color-dark,#222428))}.icon-md-primary svg{fill:var(--ion-color-md-primary,var(--ion-color-primary,#3880ff));stroke:var(--ion-color-md-primary,var(--ion-color-primary,#3880ff))}.icon-md-secondary svg{fill:var(--ion-color-md-secondary,var(--ion-color-secondary,#0cd1e8));stroke:var(--ion-color-md-secondary,var(--ion-color-secondary,#0cd1e8))}.icon-md-tertiary svg{fill:var(--ion-color-md-tertiary,var(--ion-color-tertiary,#f4a942));stroke:var(--ion-color-md-tertiary,var(--ion-color-tertiary,#f4a942))}.icon-md-success svg{fill:var(--ion-color-md-success,var(--ion-color-success,#10dc60));stroke:var(--ion-color-md-success,var(--ion-color-success,#10dc60))}.icon-md-warning svg{fill:var(--ion-color-md-warning,var(--ion-color-warning,#ffce00));stroke:var(--ion-color-md-warning,var(--ion-color-warning,#ffce00))}.icon-md-danger svg{fill:var(--ion-color-md-danger,var(--ion-color-danger,#f14141));stroke:var(--ion-color-md-danger,var(--ion-color-danger,#f14141))}.icon-md-light svg{fill:var(--ion-color-md-light,var(--ion-color-light,#f4f5f8));stroke:var(--ion-color-md-light,var(--ion-color-light,#f4f5f8))}.icon-md-medium svg{fill:var(--ion-color-md-medium,var(--ion-color-medium,#989aa2));stroke:var(--ion-color-md-medium,var(--ion-color-medium,#989aa2))}.icon-md-dark svg{fill:var(--ion-color-md-dark,var(--ion-color-dark,#222428));stroke:var(--ion-color-md-dark,var(--ion-color-dark,#222428))}";
      },
      enumerable: !0,
      configurable: !0
    }), Icon;
  }(), i = new Map();
  function getName(e, t, n, i) {
    return "string" != typeof e ? null : 0 === (e = e.trim().toLowerCase()).length ? null : (
    // default to "md" if somehow the mode wasn't set
    t = t || "md", 
    // if an icon was passed in using the ios or md attributes
    // set the iconName to whatever was passed in
    n && "ios" === t ? e = n.toLowerCase() : i && "md" === t ? e = i.toLowerCase() : e && !/^md-|^ios-|^logo-/.test(e) && (
    // this does not have one of the defaults
    // so lets auto add in the mode prefix for them
    e = t + "-" + e), "" !== e.replace(/[a-z]|-|\d/g, "") ? null : e);
  }
  function getSrc(e) {
    return "string" == typeof e && (e = e.trim()).length > 0 && /\//.test(e) ? e : null;
  }
  e.IonIcon = n, Object.defineProperty(e, "__esModule", {
    value: !0
  });
});