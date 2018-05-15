/*! Built with http://stenciljs.com */
(function(Context,namespace,hydratedCssClass,resourcesUrl,s){"use strict";
s=document.querySelector("script[data-namespace='ionicons']");if(s){resourcesUrl=s.getAttribute('data-resources-url');}
(function(e, t, n, o) {
  "use strict";
  function parseListenerData(e) {
    return {
      _$eventName$_: e[0],
      _$eventMethodName$_: e[1],
      _$eventDisabled$_: !!e[2],
      _$eventPassive$_: !!e[3],
      _$eventCapture$_: !!e[4]
    };
  }
  function parsePropertyValue(e, t) {
    // ensure this value is of the correct prop type
    // we're testing both formats of the "propType" value because
    // we could have either gotten the data from the attribute changed callback,
    // which wouldn't have Constructor data yet, and because this method is reused
    // within proxy where we don't have meta data, but only constructor data
    if (u(t) && "object" != typeof t && "function" != typeof t) {
      if (e === Boolean || 3 /* Boolean */ === e) {
        // per the HTML spec, any string value means it is a boolean true value
        // but we'll cheat here and say that the string "false" is the boolean false
        return "false" !== t && ("" === t || !!t);
      }
      if (e === Number || 4 /* Number */ === e) {
        // force it to be a number
        return parseFloat(t);
      }
      if (e === String || 2 /* String */ === e) {
        // could have been passed as a number or boolean
        // but we still want it as a string
        return t.toString();
      }
    }
    // not sure exactly what type we want
    // so no need to change to a different type
        return t;
  }
  function propagateComponentLoaded(e, t, n, o) {
    // load events fire from bottom to top
    // the deepest elements load first then bubbles up
    const r = e._$ancestorHostElementMap$_.get(t);
    r && (
    // ok so this element already has a known ancestor host element
    // let's make sure we remove this element from its ancestor's
    // known list of child elements which are actively loading
    (o = r["s-ld"] || r.$activeLoading) && ((n = o.indexOf(t)) > -1 && 
    // yup, this element is in the list of child elements to wait on
    // remove it so we can work to get the length down to 0
    o.splice(n, 1), 
    // the ancestor's initLoad method will do the actual checks
    // to see if the ancestor is actually loaded or not
    // then let's call the ancestor's initLoad method if there's no length
    // (which actually ends up as this method again but for the ancestor)
    o.length || (r["s-init"] && r["s-init"](), 
    // $initLoad deprecated 2018-04-02
    r.$initLoad && r.$initLoad())), e._$ancestorHostElementMap$_.delete(t));
  }
  /**
     * Production h() function based on Preact by
     * Jason Miller (@developit)
     * Licensed under the MIT License
     * https://github.com/developit/preact/blob/master/LICENSE
     *
     * Modified for Stencil's compiler and vdom
     */  function h(e, t, n) {
    let o, r, i = null, a = !1, s = !1;
    for (var c = arguments.length; c-- > 2; ) {
      d.push(arguments[c]);
    }
    for (;d.length > 0; ) {
      if ((n = d.pop()) && void 0 !== n.pop) {
        for (c = n.length; c--; ) {
          d.push(n[c]);
        }
      } else {
        "boolean" == typeof n && (n = null), (s = "function" != typeof e) && (null == n ? n = "" : "number" == typeof n ? n = String(n) : "string" != typeof n && (s = !1)), 
        s && a ? i[i.length - 1]._$vtext$_ += n : null === i ? i = [ s ? {
          _$vtext$_: n
        } : n ] : i.push(s ? {
          _$vtext$_: n
        } : n), a = s;
      }
    }
    if (null != t) {
      if (
      // normalize class / classname attributes
      t.className && (t.class = t.className), "object" == typeof t.class) {
        for (c in t.class) {
          t.class[c] && d.push(c);
        }
        t.class = d.join(" "), d.length = 0;
      }
      null != t._$key$_ && (o = t._$key$_), null != t.name && (r = t.name);
    }
    return "function" == typeof e ? e(Object.assign({}, t, {
      children: i
    }), m) : {
      _$vtag$_: e,
      _$vchildren$_: i,
      _$vtext$_: void 0,
      _$vattrs$_: t,
      _$vkey$_: o,
      _$vname$_: r,
      _$elm$_: void 0,
      _$ishost$_: !1
    };
  }
  function convertCssNamesToObj(e, t, n, o) {
    t.split(" ").forEach(t => {
      e[t] = !0, n && (e[`${t}-${n}`] = !0, o && (e[`${t}-${n}-${o}`] = e[`${t}-${o}`] = !0));
    });
  }
  function queueUpdate(e, t) {
    // only run patch if it isn't queued already
    e._$isQueuedForUpdate$_.has(t) || (e._$isQueuedForUpdate$_.set(t, !0), 
    // run the patch in the next tick
    // vdom diff and patch the host element for differences
    e._$isAppLoaded$_ ? 
    // app has already loaded
    // let's queue this work in the dom write phase
    e.queue.write(() => update(e, t)) : 
    // app hasn't finished loading yet
    // so let's use next tick to do everything
    // as fast as possible
    e.queue.tick(() => update(e, t)));
  }
  function update(e, t, n, o, r, i) {
    // everything is async, so somehow we could have already disconnected
    // this node, so be sure to do nothing if we've already disconnected
    if (
    // no longer queued for update
    e._$isQueuedForUpdate$_.delete(t), !e._$isDisconnectedMap$_.has(t)) {
      if (o = e._$instanceMap$_.get(t), n = !o) {
        if ((r = e._$ancestorHostElementMap$_.get(t)) && r.$rendered && (
        // $rendered deprecated 2018-04-02
        r["s-rn"] = !0), r && !r["s-rn"]) {
          // this is the intial load
          // this element has an ancestor host element
          // but the ancestor host element has NOT rendered yet
          // so let's just cool our jets and wait for the ancestor to render
          return (r["s-rc"] = r["s-rc"] || []).push(() => {
            // this will get fired off when the ancestor host element
            // finally gets around to rendering its lazy self
            update(e, t);
          }), void (
          // $onRender deprecated 2018-04-02
          r.$onRender = r["s-rc"]);
        }
        // haven't created a component instance for this host element yet!
        // create the instance from the user's component class
        // https://www.youtube.com/watch?v=olLxrojmvMg
                o = function initComponentInstance(e, t, n, o, r, i, a) {
          try {
            // using the user's component class, let's create a new instance
            // ok cool, we've got an host element now, and a actual instance
            // and there were no errors creating the instance
            // let's upgrade the data on the host element
            // and let the getters/setters do their jobs
            (function proxyComponentInstance(e, t, n, o, r, i, a) {
              // define each of the members and initialize what their role is
              for (a in 
              // at this point we've got a specific node of a host element, and created a component class instance
              // and we've already created getters/setters on both the host element and component class prototypes
              // let's upgrade any data that might have been set on the host element already
              // and let's have the getters/setters kick in and do their jobs
              // let's automatically add a reference to the host element on the instance
              e._$hostElementMap$_.set(o, n), 
              // create the values object if it doesn't already exist
              // this will hold all of the internal getter/setter values
              e._$valuesMap$_.has(n) || e._$valuesMap$_.set(n, {}), 
              // always set mode
              (
              // get the properties from the constructor
              // and add default "mode" and "color" properties
              i = Object.assign({
                color: {
                  type: String
                }
              }, t.properties)).mode = {
                type: String
              }, i) {
                defineMember(e, i[a], n, o, a, r);
              }
            })(e, r = e._$getComponentMeta$_(t)._$componentConstructor$_, t, o = new r(), n);
          } catch (n) {
            // something done went wrong trying to create a component instance
            // create a dumby instance so other stuff can load
            // but chances are the app isn't fully working cuz this component has issues
            o = {}, e._$onError$_(n, 7 /* InitInstanceError */ , t, !0);
          }
          return e._$instanceMap$_.set(t, o), o;
        }(e, t, e._$hostSnapshotMap$_.get(t));
        // fire off the user's componentWillLoad method (if one was provided)
        // componentWillLoad only runs ONCE, after instance's element has been
        // assigned as the host element, but BEFORE render() has been called
        try {
          o.componentWillLoad && (i = o.componentWillLoad());
        } catch (n) {
          e._$onError$_(n, 3 /* WillLoadError */ , t);
        }
      }
      i && i.then ? 
      // looks like the user return a promise!
      // let's not actually kick off the render
      // until the user has resolved their promise
      i.then(() => renderUpdate(e, t, o, n)) : 
      // user never returned a promise so there's
      // no need to wait on anything, let's do the render now my friend
      renderUpdate(e, t, o, n);
    }
  }
  function renderUpdate(e, t, n, o) {
    // if this component has a render function, let's fire
    // it off and generate a vnode for this
    (function render(e, t, n, o, r) {
      try {
        // if this component has a render function, let's fire
        // it off and generate the child vnodes for this host element
        // note that we do not create the host element cuz it already exists
        const i = t._$componentConstructor$_.host;
        let a;
        if (o.render || o.hostData || i || a) {
          // tell the platform we're actively rendering
          // if a value is changed within a render() then
          // this tells the platform not to queue the change
          e._$activeRender$_ = !0;
          const a = o.render && o.render();
          let s;
          // user component provided a "hostData()" method
          // the returned data/attributes are used on the host element
          s = o.hostData && o.hostData(), 
          // tell the platform we're done rendering
          // now any changes will again queue
          e._$activeRender$_ = !1, i && (
          // component meta data has a "theme"
          // use this to automatically generate a good css class
          // from the mode and color to add to the host element
          s = function applyComponentHostData(e, t, n) {
            return e = e || {}, 
            // component meta data has a "theme"
            // use this to automatically generate a good css class
            // from the mode and color to add to the host element
            Object.keys(t).forEach(o => {
              "theme" === o ? 
              // host: { theme: 'button' }
              // adds css classes w/ mode and color combinations
              // class="button button-md button-primary button-md-primary"
              convertCssNamesToObj(e.class = e.class || {}, t[o], n.mode, n.color) : "class" === o ? 
              // host: { class: 'multiple css-classes' }
              // class="multiple css-classes"
              convertCssNamesToObj(e[o] = e[o] || {}, t[o]) : 
              // rando attribute/properties
              e[o] = t[o];
            }), e;
          }(s, i, o));
          // looks like we've got child nodes to render into this host element
          // or we need to update the css class/attrs on the host element
          // if we haven't already created a vnode, then we give the renderer the actual element
          // if this is a re-render, then give the renderer the last vnode we already created
          const c = e._$vnodeMap$_.get(n) || {};
          c._$elm$_ = n;
          const l = h(null, s, a);
          // each patch always gets a new vnode
          // the host element itself isn't patched because it already exists
          // kick off the actual render and any DOM updates
          e._$vnodeMap$_.set(n, e.render(c, l, r, t._$componentConstructor$_.encapsulation));
        }
        // attach the styles this component needs, if any
        // this fn figures out if the styles should go in a
        // shadow root or if they should be global
        e._$attachStyles$_(e, e._$domApi$_, t, o.mode, n), 
        // it's official, this element has rendered
        n["s-rn"] = !0, n.$onRender && (
        // $onRender deprecated 2018-04-02
        n["s-rc"] = n.$onRender), n["s-rc"] && (
        // ok, so turns out there are some child host elements
        // waiting on this parent element to load
        // let's fire off all update callbacks waiting
        n["s-rc"].forEach(e => e()), n["s-rc"] = null);
      } catch (t) {
        e._$activeRender$_ = !1, e._$onError$_(t, 8 /* RenderError */ , n, !0);
      }
    })(e, e._$getComponentMeta$_(t), t, n, !o);
    try {
      o ? 
      // so this was the initial load i guess
      t["s-init"]() : callNodeRefs(e._$vnodeMap$_.get(t));
    } catch (n) {
      // derp
      e._$onError$_(n, 6 /* DidUpdateError */ , t, !0);
    }
  }
  function defineMember(e, t, n, o, r, i, a, s) {
    if (t.type || t.state) {
      const c = e._$valuesMap$_.get(n);
      t.state || (!t.attr || void 0 !== c[r] && "" !== c[r] || 
      // check the prop value from the host element attribute
      (a = i && i._$$attributes$_) && u(s = a[t.attr]) && (
      // looks like we've got an attribute value
      // let's set it to our internal values
      c[r] = parsePropertyValue(t.type, s)), 
      // client-side
      // within the browser, the element's prototype
      // already has its getter/setter set, but on the
      // server the prototype is shared causing issues
      // so instead the server's elm has the getter/setter
      // directly on the actual element instance, not its prototype
      // so on the browser we can use "hasOwnProperty"
      n.hasOwnProperty(r) && (
      // @Prop or @Prop({mutable:true})
      // property values on the host element should override
      // any default values on the component instance
      void 0 === c[r] && (c[r] = parsePropertyValue(t.type, n[r])), 
      // for the client only, let's delete its "own" property
      // this way our already assigned getter/setter on the prototype kicks in
      delete n[r])), o.hasOwnProperty(r) && void 0 === c[r] && (
      // @Prop() or @Prop({mutable:true}) or @State()
      // we haven't yet got a value from the above checks so let's
      // read any "own" property instance values already set
      // to our internal value as the source of getter data
      // we're about to define a property and it'll overwrite this "own" property
      c[r] = o[r]), t.watchCallbacks && (c[y + r] = t.watchCallbacks.slice()), 
      // add getter/setter to the component instance
      // these will be pointed to the internal data set from the above checks
      definePropertyGetterSetter(o, r, function getComponentProp(t) {
        // component instance prop/state getter
        // get the property value directly from our internal values
        return (t = e._$valuesMap$_.get(e._$hostElementMap$_.get(this))) && t[r];
      }, function setComponentProp(n, o) {
        // component instance prop/state setter (cannot be arrow fn)
        (o = e._$hostElementMap$_.get(this)) && (t.state || t.mutable) && setValue(e, o, r, n);
      });
    } else if (t.elementRef) {
      // @Element()
      // add a getter to the element reference using
      // the member name the component meta provided
      definePropertyValue(o, r, n);
    } else if (t.context) {
      // @Prop({ context: 'config' })
      const i = e._$getContextItem$_(t.context);
      void 0 !== i && definePropertyValue(o, r, i._$getContext$_ && i._$getContext$_(n) || i);
    }
  }
  function setValue(e, t, n, o, r, i, a) {
    (
    // get the internal values object, which should always come from the host element instance
    // create the _values object if it doesn't already exist
    r = e._$valuesMap$_.get(t)) || e._$valuesMap$_.set(t, r = {});
    const s = r[n];
    // check our new property value against our internal value
        if (o !== s && (
    // gadzooks! the property's value has changed!!
    // set our new value!
    // https://youtu.be/dFtLONl4cNc?t=22
    r[n] = o, i = e._$instanceMap$_.get(t))) {
      if (
      // get an array of method names of watch functions to call
      a = r[y + n]) {
        // this instance is watching for when this property changed
        for (let e = 0; e < a.length; e++) {
          try {
            // fire off each of the watch methods that are watching this property
            i[a[e]].call(i, o, s, n);
          } catch (e) {
            console.error(e);
          }
        }
      }
      !e._$activeRender$_ && t["s-rn"] && 
      // looks like this value actually changed, so we've got work to do!
      // but only if we've already rendered, otherwise just chill out
      // queue that we need to do an update, but don't worry about queuing
      // up millions cuz this function ensures it only runs once
      queueUpdate(e, t);
    }
  }
  function definePropertyValue(e, t, n) {
    // minification shortcut
    Object.defineProperty(e, t, {
      configurable: !0,
      value: n
    });
  }
  function definePropertyGetterSetter(e, t, n, o) {
    // minification shortcut
    Object.defineProperty(e, t, {
      configurable: !0,
      get: n,
      set: o
    });
  }
  function setAccessor(e, t, n, o, r, i, a, l, u) {
    if ("class" !== n || i) {
      if ("style" === n) {
        for (l in 
        // Style
        o = o || s, r = r || s, o) {
          r[l] || (t.style[l] = "");
        }
        for (l in r) {
          r[l] !== o[l] && (t.style[l] = r[l]);
        }
      } else if ("o" !== n[0] || "n" !== n[1] || !/[A-Z]/.test(n[2]) || n in t) {
        if ("list" !== n && "type" !== n && !i && (n in t || -1 !== [ "object", "function" ].indexOf(typeof r) && null !== r)) {
          // Properties
          // - list and type are attributes that get applied as values on the element
          // - all svgs get values as attributes not props
          // - check if elm contains name or if the value is array, object, or function
          const o = e._$getComponentMeta$_(t);
          o && o._$membersMeta$_ && o._$membersMeta$_[n] ? 
          // we know for a fact that this element is a known component
          // and this component has this member name as a property,
          // let's set the known @Prop on this element
          // set it directly as property on the element
          setProperty(t, n, r) : "ref" !== n && (
          // this member name is a property on this element, but it's not a component
          // this is a native property like "value" or something
          // also we can ignore the "ref" member name at this point
          setProperty(t, n, null == r ? "" : r), null != r && !1 !== r || t.removeAttribute(n));
        } else {
          null != r ? 
          // Element Attributes
          function updateAttribute(e, t, n) {
            const o = t !== (t = t.replace(/^xlink\:?/, "")), r = b[t];
            !r || n && "false" !== n ? "function" != typeof n && (r && (n = ""), o ? e.setAttributeNS(v, f(t), n) : e.setAttribute(t, n)) : o ? e.removeAttributeNS(v, f(t)) : e.removeAttribute(t);
          }(t, n, r) : !i || null != r && !1 !== r || 
          // remove svg attribute
          t.removeAttribute(n);
        }
      } else {
        // Event Handlers
        // so if the member name starts with "on" and the 3rd characters is
        // a capital letter, and it's not already a member on the element,
        // then we're assuming it's an event listener
        // standard event
        // the JSX attribute could have been "onMouseOver" and the
        // member name "onmouseover" is on the element's prototype
        // so let's add the listener "mouseover", which is all lowercased
        n = f(n) in t ? f(n.substring(2)) : f(n[2]) + n.substring(3), r ? r !== o && 
        // add listener
        e._$domApi$_._$$addEventListener$_(t, n, r) : 
        // remove listener
        e._$domApi$_._$$removeEventListener$_(t, n);
      }
    } else 
    // Class
    if (o !== r) {
      const e = null == o || "" === o ? c : o.trim().split(/\s+/), n = null == r || "" === r ? c : r.trim().split(/\s+/);
      let i = null == t.className || "" === t.className ? c : t.className.trim().split(/\s+/);
      for (l = 0, u = e.length; l < u; l++) {
        -1 === n.indexOf(e[l]) && (i = i.filter(t => t !== e[l]));
      }
      for (l = 0, u = n.length; l < u; l++) {
        -1 === e.indexOf(n[l]) && (i = [ ...i, n[l] ]);
      }
      t.className = i.join(" ");
    }
  }
  /**
     * Attempt to set a DOM property to the given value.
     * IE & FF throw for certain property-value combinations.
     */  function setProperty(e, t, n) {
    try {
      e[t] = n;
    } catch (e) {}
  }
  function updateElement(e, t, n, o, r) {
    // if the element passed in is a shadow root, which is a document fragment
    // then we want to be adding attrs/props to the shadow root's "host" element
    // if it's not a shadow root, then we add attrs/props to the same element
    const i = 11 /* DocumentFragment */ === n._$elm$_.nodeType && n._$elm$_.host ? n._$elm$_.host : n._$elm$_, a = t && t._$vattrs$_ || s, c = n._$vattrs$_ || s;
    // remove attributes no longer present on the vnode by setting them to undefined
    for (r in a) {
      c && null != c[r] || null == a[r] || setAccessor(e, i, r, a[r], void 0, o, n._$ishost$_);
    }
    // add new & update changed attributes
        for (r in c) {
      r in a && c[r] === ("value" === r || "checked" === r ? i[r] : a[r]) || setAccessor(e, i, r, a[r], c[r], o, n._$ishost$_);
    }
  }
  function createRendererPatch(e, t) {
    // createRenderer() is only created once per app
    // the patch() function which createRenderer() returned is the function
    // which gets called numerous times by each component
    function createElm(n, i, a, f, p, d, m, h, y) {
      if (h = i._$vchildren$_[a], o || (
      // remember for later we need to check to relocate nodes
      s = !0, "slot" === h._$vtag$_ && (r && 
      // scoped css needs to add its scoped id to the parent element
      t._$$setAttribute$_(f, r + "-slot", ""), h._$vchildren$_ ? 
      // slot element has fallback content
      // still create an element that "mocks" the slot element
      h._$isSlotFallback$_ = !0 : 
      // slot element does not have fallback content
      // create an html comment we'll use to always reference
      // where actual slot content should sit next to
      h._$isSlotReference$_ = !0)), u(h._$vtext$_)) {
        // create text node
        h._$elm$_ = t._$$createTextNode$_(h._$vtext$_);
      } else if (h._$isSlotReference$_) {
        // create a slot reference html text node
        h._$elm$_ = t._$$createTextNode$_("");
      } else {
        if (
        // create element
        d = h._$elm$_ = C || "svg" === h._$vtag$_ ? t._$$createElementNS$_("http://www.w3.org/2000/svg", h._$vtag$_) : t._$$createElement$_(h._$isSlotFallback$_ ? "slot-fb" : h._$vtag$_), 
        C = "svg" === h._$vtag$_ || "foreignObject" !== h._$vtag$_ && C, 
        // add css classes, attrs, props, listeners, etc.
        updateElement(e, null, h, C), u(r) && d["s-si"] !== r && 
        // if there is a scopeId and this is the initial render
        // then let's add the scopeId as an attribute
        t._$$setAttribute$_(d, d["s-si"] = r, ""), h._$vchildren$_) {
          for (p = 0; p < h._$vchildren$_.length; ++p) {
            // create the node
            // return node could have been null
            (m = createElm(n, h, p, d)) && 
            // append our new node
            t._$$appendChild$_(d, m);
          }
        }
        "svg" === h._$vtag$_ && (
        // Only reset the SVG context when we're exiting SVG element
        C = !1);
      }
      return h._$elm$_["s-hn"] = c, (h._$isSlotFallback$_ || h._$isSlotReference$_) && (
      // remember the content reference comment
      h._$elm$_["s-sr"] = !0, 
      // remember the content reference comment
      h._$elm$_["s-cr"] = l, 
      // remember the slot name, or empty string for default slot
      h._$elm$_["s-sn"] = h._$vname$_ || "", (
      // check if we've got an old vnode for this slot
      y = n && n._$vchildren$_ && n._$vchildren$_[a]) && y._$vtag$_ === h._$vtag$_ && n._$elm$_ && 
      // we've got an old slot vnode and the wrapper is being replaced
      // so let's move the old slot content back to it's original location
      putBackInOriginalLocation(n._$elm$_)), h._$elm$_;
    }
    function putBackInOriginalLocation(n, o, r, i) {
      e._$tmpDisconnected$_ = !0;
      const a = t._$$childNodes$_(n);
      for (r = a.length - 1; r >= 0; r--) {
        (i = a[r])["s-hn"] !== c && i["s-ol"] && (
        // this child node in the old element is from another component
        // remove this node from the old slot's parent
        t._$$remove$_(i), 
        // and relocate it back to it's original location
        t._$$insertBefore$_(parentReferenceNode(i), i, referenceNode(i)), 
        // remove the old original location comment entirely
        // later on the patch function will know what to do
        // and move this to the correct spot in need be
        t._$$remove$_(i["s-ol"]), i["s-ol"] = null, s = !0), o && putBackInOriginalLocation(i, o);
      }
      e._$tmpDisconnected$_ = !1;
    }
    function addVnodes(e, n, o, r, i, a, s, c) {
      // $defaultHolder deprecated 2018-04-02
      const l = e["s-cr"] || e.$defaultHolder;
      for ((s = l && t._$$parentNode$_(l) || e).shadowRoot && (s = s.shadowRoot); i <= a; ++i) {
        r[i] && (c = u(r[i]._$vtext$_) ? t._$$createTextNode$_(r[i]._$vtext$_) : createElm(null, o, i, e)) && (r[i]._$elm$_ = c, 
        t._$$insertBefore$_(s, c, referenceNode(n)));
      }
    }
    function removeVnodes(e, n, o, r) {
      for (;n <= o; ++n) {
        u(e[n]) && (r = e[n]._$elm$_, 
        // we're removing this element
        // so it's possible we need to show slot fallback content now
        a = !0, r["s-ol"] ? 
        // remove the original location comment
        t._$$remove$_(r["s-ol"]) : 
        // it's possible that child nodes of the node
        // that's being removed are slot nodes
        putBackInOriginalLocation(r, !0), 
        // remove the vnode's element from the dom
        t._$$remove$_(r));
      }
    }
    function isSameVnode(e, t) {
      // compare if two vnode to see if they're "technically" the same
      // need to have the same element tag, and same key to be the same
      return e._$vtag$_ === t._$vtag$_ && e._$vkey$_ === t._$vkey$_ && ("slot" !== e._$vtag$_ || e._$vname$_ === t._$vname$_);
    }
    function referenceNode(e) {
      return e && e["s-ol"] ? e["s-ol"] : e;
    }
    function parentReferenceNode(e) {
      return t._$$parentNode$_(e["s-ol"] ? e["s-ol"] : e);
    }
    const n = [];
    // internal variables to be reused per patch() call
    let o, r, i, a, s, c, l;
    return function patch(o, f, p, d, m, h, y, b, v) {
      if (
      // patchVNode() is synchronous
      // so it is safe to set these variables and internally
      // the same patch() call will reference the same data
      i = p, c = t._$$tagName$_(o._$elm$_), l = o._$elm$_["s-cr"], 
      // get the scopeId
      r = "scoped" === d || "shadow" === d && !t._$$supportsShadowDom$_ ? "data-" + t._$$tagName$_(o._$elm$_) : null, 
      // always reset
      s = a = !1, i || r && 
      // this host element should use scoped css
      // add the scope attribute to the host
      t._$$setAttribute$_(o._$elm$_, r + "-host", ""), 
      // synchronous patch
      function patchVNode(n, o, r) {
        const i = o._$elm$_ = n._$elm$_, a = n._$vchildren$_, s = o._$vchildren$_;
        // test if we're rendering an svg element, or still rendering nodes inside of one
        // only add this to the when the compiler sees we're using an svg somewhere
        C = o._$elm$_ && u(t._$$parentElement$_(o._$elm$_)) && void 0 !== o._$elm$_.ownerSVGElement, 
        C = "svg" === o._$vtag$_ || "foreignObject" !== o._$vtag$_ && C, u(o._$vtext$_) ? (r = i["s-cr"] || i.$defaultHolder /* $defaultHolder deprecated 2018-04-02 */) ? 
        // this element has slotted content
        t._$$setTextContent$_(t._$$parentNode$_(r), o._$vtext$_) : n._$vtext$_ !== o._$vtext$_ && 
        // update the text content for the text only vnode
        // and also only if the text is different than before
        t._$$setTextContent$_(i, o._$vtext$_) : (
        // element node
        "slot" !== o._$vtag$_ && 
        // either this is the first render of an element OR it's an update
        // AND we already know it's possible it could have changed
        // this updates the element's css classes, attrs, props, listeners, etc.
        updateElement(e, n, o, C), u(a) && u(s) ? 
        // looks like there's child vnodes for both the old and new vnodes
        function updateChildren(e, n, o, r, i, a, s, c) {
          let l = 0, f = 0, p = n.length - 1, d = n[0], m = n[p], h = r.length - 1, y = r[0], b = r[h];
          for (;l <= p && f <= h; ) {
            if (null == d) {
              // Vnode might have been moved left
              d = n[++l];
            } else if (null == m) {
              m = n[--p];
            } else if (null == y) {
              y = r[++f];
            } else if (null == b) {
              b = r[--h];
            } else if (isSameVnode(d, y)) {
              patchVNode(d, y), d = n[++l], y = r[++f];
            } else if (isSameVnode(m, b)) {
              patchVNode(m, b), m = n[--p], b = r[--h];
            } else if (isSameVnode(d, b)) {
              // Vnode moved right
              "slot" !== d._$vtag$_ && "slot" !== b._$vtag$_ || putBackInOriginalLocation(t._$$parentNode$_(d._$elm$_)), 
              patchVNode(d, b), t._$$insertBefore$_(e, d._$elm$_, t._$$nextSibling$_(m._$elm$_)), 
              d = n[++l], b = r[--h];
            } else if (isSameVnode(m, y)) {
              // Vnode moved left
              "slot" !== d._$vtag$_ && "slot" !== b._$vtag$_ || putBackInOriginalLocation(t._$$parentNode$_(m._$elm$_)), 
              patchVNode(m, y), t._$$insertBefore$_(e, m._$elm$_, d._$elm$_), m = n[--p], y = r[++f];
            } else {
              for (
              // createKeyToOldIdx
              i = null, a = l; a <= p; ++a) {
                if (n[a] && u(n[a]._$vkey$_) && n[a]._$vkey$_ === y._$vkey$_) {
                  i = a;
                  break;
                }
              }
              u(i) ? ((c = n[i])._$vtag$_ !== y._$vtag$_ ? s = createElm(n && n[f], o, i, e) : (patchVNode(c, y), 
              n[i] = void 0, s = c._$elm$_), y = r[++f]) : (
              // new element
              s = createElm(n && n[f], o, f, e), y = r[++f]), s && t._$$insertBefore$_(parentReferenceNode(d._$elm$_), s, referenceNode(d._$elm$_));
            }
          }
          l > p ? addVnodes(e, null == r[h + 1] ? null : r[h + 1]._$elm$_, o, r, f, h) : f > h && removeVnodes(n, l, p);
        }(i, a, o, s) : u(s) ? (
        // no old child vnodes, but there are new child vnodes to add
        u(n._$vtext$_) && 
        // the old vnode was text, so be sure to clear it out
        t._$$setTextContent$_(i, ""), 
        // add the new vnode children
        addVnodes(i, null, o, s, 0, s.length - 1)) : u(a) && 
        // no new child vnodes, but there are old child vnodes to remove
        removeVnodes(a, 0, a.length - 1)), 
        // reset svgMode when svg node is fully patched
        C && "svg" === o._$vtag$_ && (C = !1);
      }(o, f), s) {
        for (function relocateSlotContent(e, o, r, i, s, c, l, u, f, p) {
          for (s = 0, c = (o = t._$$childNodes$_(e)).length; s < c; s++) {
            if ((r = o[s])["s-sr"] && (i = r["s-cr"])) {
              for (
              // first got the content reference comment node
              // then we got it's parent, which is where all the host content is in now
              u = t._$$childNodes$_(t._$$parentNode$_(i)), f = r["s-sn"], l = u.length - 1; l >= 0; l--) {
                (i = u[l])["s-cn"] || i["s-nr"] || i["s-hn"] === r["s-hn"] || ((3 /* TextNode */ === (
                // let's do some relocating to its new home
                // but never relocate a content reference node
                // that is suppose to always represent the original content location
                p = t._$$nodeType$_(i)) || 8 /* CommentNode */ === p) && "" === f || 1 /* ElementNode */ === p && null === t._$$getAttribute$_(i, "slot") && "" === f || 1 /* ElementNode */ === p && t._$$getAttribute$_(i, "slot") === f) && (
                // it's possible we've already decided to relocate this node
                n.some(e => e._$nodeToRelocate$_ === i) || (
                // made some changes to slots
                // let's make sure we also double check
                // fallbacks are correctly hidden or shown
                a = !0, i["s-sn"] = f, 
                // add to our list of nodes to relocate
                n.push({
                  _$slotRefNode$_: r,
                  _$nodeToRelocate$_: i
                })));
              }
            }
            1 /* ElementNode */ === t._$$nodeType$_(r) && relocateSlotContent(r);
          }
        }(f._$elm$_), h = 0; h < n.length; h++) {
          (y = n[h])._$nodeToRelocate$_["s-ol"] || (
          // add a reference node marking this node's original location
          // keep a reference to this node for later lookups
          (b = t._$$createTextNode$_(""))["s-nr"] = y._$nodeToRelocate$_, t._$$insertBefore$_(t._$$parentNode$_(y._$nodeToRelocate$_), y._$nodeToRelocate$_["s-ol"] = b, y._$nodeToRelocate$_));
        }
        // while we're moving nodes around existing nodes, temporarily disable
        // the disconnectCallback from working
                for (e._$tmpDisconnected$_ = !0, h = 0; h < n.length; h++) {
          y = n[h];
          // by default we're just going to insert it directly
          // after the slot reference node
          const e = t._$$parentNode$_(y._$slotRefNode$_);
          let o = t._$$nextSibling$_(y._$slotRefNode$_);
          for (b = y._$nodeToRelocate$_["s-ol"]; b = t._$$previousSibling$_(b); ) {
            if ((v = b["s-nr"]) && v["s-sn"] === y._$nodeToRelocate$_["s-sn"] && e === t._$$parentNode$_(v)) {
              o = t._$$nextSibling$_(v);
              break;
            }
          }
          (!o && e !== t._$$parentNode$_(y._$nodeToRelocate$_) || t._$$nextSibling$_(y._$nodeToRelocate$_) !== o) && y._$nodeToRelocate$_ !== o && (
          // remove the node from the dom
          t._$$remove$_(y._$nodeToRelocate$_), 
          // add it back to the dom but in its new home
          t._$$insertBefore$_(e, y._$nodeToRelocate$_, o));
        }
        // done moving nodes around
        // allow the disconnect callback to work again
                e._$tmpDisconnected$_ = !1;
      }
      // return our new vnode
      return a && function updateFallbackSlotVisibility(e, n, o, r, i, a, s, c) {
        for (r = 0, i = (o = t._$$childNodes$_(e)).length; r < i; r++) {
          if (n = o[r], 1 /* ElementNode */ === t._$$nodeType$_(n)) {
            if (n["s-sr"]) {
              for (
              // this is a slot fallback node
              // get the slot name for this slot reference node
              s = n["s-sn"], 
              // by default always show a fallback slot node
              // then hide it if there are other slots in the light dom
              n.hidden = !1, a = 0; a < i; a++) {
                if (o[a]["s-hn"] !== n["s-hn"]) {
                  if (
                  // this sibling node is from a different component
                  c = t._$$nodeType$_(o[a]), "" !== s) {
                    // this is a named fallback slot node
                    if (1 /* ElementNode */ === c && s === t._$$getAttribute$_(o[a], "slot")) {
                      n.hidden = !0;
                      break;
                    }
                  } else 
                  // this is a default fallback slot node
                  // any element or text node (with content)
                  // should hide the default fallback slot node
                  if (1 /* ElementNode */ === c || 3 /* TextNode */ === c && "" !== t._$$getTextContent$_(o[a]).trim()) {
                    n.hidden = !0;
                    break;
                  }
                }
              }
            }
            // keep drilling down
                        updateFallbackSlotVisibility(n);
          }
        }
      }(f._$elm$_), 
      // always reset
      n.length = 0, f;
    };
  }
  function callNodeRefs(e, t) {
    e && (e._$vattrs$_ && e._$vattrs$_.ref && e._$vattrs$_.ref(t ? null : e._$elm$_), 
    e._$vchildren$_ && e._$vchildren$_.forEach(e => {
      callNodeRefs(e, t);
    }));
  }
  function addChildSsrVNodes(e, t, n, o, r) {
    const a = e._$$nodeType$_(t);
    let s, c, l, u;
    if (r && 1 /* ElementNode */ === a) {
      (c = e._$$getAttribute$_(t, i)) && (
      // split the start comment's data with a period
      l = c.split("."))[0] === o && (
      // cool, this element is a child to the parent vnode
      (u = {})._$vtag$_ = e._$$tagName$_(u._$elm$_ = t), 
      // this is a new child vnode
      // so ensure its parent vnode has the vchildren array
      n._$vchildren$_ || (n._$vchildren$_ = []), 
      // add our child vnode to a specific index of the vnode's children
      n._$vchildren$_[l[1]] = u, 
      // this is now the new parent vnode for all the next child checks
      n = u, 
      // if there's a trailing period, then it means there aren't any
      // more nested elements, but maybe nested text nodes
      // either way, don't keep walking down the tree after this next call
      r = "" !== l[2]);
      // keep drilling down through the elements
            for (let i = 0; i < t.childNodes.length; i++) {
        addChildSsrVNodes(e, t.childNodes[i], n, o, r);
      }
    } else {
      3 /* TextNode */ === a && (s = t.previousSibling) && 8 /* CommentNode */ === e._$$nodeType$_(s) && "s" === (
      // split the start comment's data with a period
      l = e._$$getTextContent$_(s).split("."))[0] && l[1] === o && (
      // cool, this is a text node and it's got a start comment
      (u = {
        _$vtext$_: e._$$getTextContent$_(t)
      })._$elm$_ = t, 
      // this is a new child vnode
      // so ensure its parent vnode has the vchildren array
      n._$vchildren$_ || (n._$vchildren$_ = []), 
      // add our child vnode to a specific index of the vnode's children
      n._$vchildren$_[l[2]] = u);
    }
  }
  function initHostSnapshot(e, t, n, o, i) {
    // host element has been connected to the DOM
    return n["s-cr"] || e._$$getAttribute$_(n, r) || function useShadowDom(e, t) {
      return e && 1 /* ShadowDom */ === t.encapsulation;
    }(e._$$supportsShadowDom$_, t) || (
    // only required when we're NOT using native shadow dom (slot)
    // this host element was NOT created with SSR
    // let's pick out the inner content for slot projection
    // create a node to represent where the original
    // content was first placed, which is useful later on
    n["s-cr"] = e._$$createTextNode$_(""), n["s-cr"]["s-cn"] = !0, e._$$insertBefore$_(n, n["s-cr"], e._$$childNodes$_(n)[0])), 
    e._$$supportsShadowDom$_ || 1 /* ShadowDom */ !== t.encapsulation || (n.shadowRoot = n), 
    o = {
      _$$id$_: n["s-id"],
      _$$attributes$_: {}
    }, t._$membersMeta$_ && Object.keys(t._$membersMeta$_).forEach(r => {
      (i = t._$membersMeta$_[r]._$attribName$_) && (o._$$attributes$_[i] = e._$$getAttribute$_(n, i));
    }), o;
  }
  function initHostElement(e, t, n, o) {
    // let's wire up our functions to the host element's prototype
    // we can also inject our platform into each one that needs that api
    // note: these cannot be arrow functions cuz "this" is important here hombre
    n.connectedCallback = function() {
      // coolsville, our host element has just hit the DOM
      (function connectedCallback(e, t, n) {
        // this element just connected, which may be re-connecting
        // ensure we remove it from our map of disconnected
        e._$isDisconnectedMap$_.delete(n), e._$hasConnectedMap$_.has(n) || (
        // first time we've connected
        e._$hasConnectedMap$_.set(n, !0), n["s-id"] || (
        // assign a unique id to this host element
        // it's possible this was already given an element id
        n["s-id"] = e._$nextId$_()), 
        // register this component as an actively
        // loading child to its parent component
        function registerWithParentComponent(e, t, n) {
          for (
          // find the first ancestor host element (if there is one) and register
          // this element as one of the actively loading child elements for its ancestor
          n = t; n = e._$domApi$_._$$parentElement$_(n); ) {
            // climb up the ancestors looking for the first registered component
            if (e._$isDefinedComponent$_(n)) {
              // we found this elements the first ancestor host element
              // if the ancestor already loaded then do nothing, it's too late
              e._$hasLoadedMap$_.has(t) || (
              // keep a reference to this element's ancestor host element
              // elm._ancestorHostElement = ancestorHostElement;
              e._$ancestorHostElementMap$_.set(t, n), 
              // ensure there is an array to contain a reference to each of the child elements
              // and set this element as one of the ancestor's child elements it should wait on
              n.$activeLoading && (
              // $activeLoading deprecated 2018-04-02
              n["s-ld"] = n.$activeLoading), (n["s-ld"] = n["s-ld"] || []).push(t));
              break;
            }
          }
        }(e, n), 
        // add to the queue to load the bundle
        // it's important to have an async tick in here so we can
        // ensure the "mode" attribute has been added to the element
        // place in high priority since it's not much work and we need
        // to know as fast as possible, but still an async tick in between
        e.queue.tick(() => 
        // start loading this component mode's bundle
        // if it's already loaded then the callback will be synchronous
        e._$requestBundle$_(t, n, initHostSnapshot(e._$domApi$_, t, n))));
      })(e, t, this);
    }, n.attributeChangedCallback = function(e, n, o) {
      // the browser has just informed us that an attribute
      // on the host element has changed
      (function attributeChangedCallback(e, t, n, o, r, i, a) {
        // only react if the attribute values actually changed
        if (e && o !== r) {
          // using the known component meta data
          // look up to see if we have a property wired up to this attribute name
          for (i in e) {
            // normalize the attribute name w/ lower case
            if ((a = e[i])._$attribName$_ && f(a._$attribName$_) === f(n)) {
              // cool we've got a prop using this attribute name, the value will
              // be a string, so let's convert it to the correct type the app wants
              t[i] = parsePropertyValue(a._$propType$_, r);
              break;
            }
          }
        }
      })(t._$membersMeta$_, this, e, n, o);
    }, n.disconnectedCallback = function() {
      // the element has left the builing
      (function disconnectedCallback(e, t, n) {
        // only disconnect if we're not temporarily disconnected
        // tmpDisconnected will happen when slot nodes are being relocated
        !e._$tmpDisconnected$_ && function isDisconnected(e, t) {
          for (;t; ) {
            if (!e._$$parentNode$_(t)) {
              return 9 /* DocumentNode */ !== e._$$nodeType$_(t);
            }
            t = e._$$parentNode$_(t);
          }
        }(e._$domApi$_, t) && (
        // ok, let's officially destroy this thing
        // set this to true so that any of our pending async stuff
        // doesn't continue since we already decided to destroy this node
        // elm._hasDestroyed = true;
        e._$isDisconnectedMap$_.set(t, !0), 
        // double check that we've informed the ancestor host elements
        // that they're good to go and loaded (cuz this one is on its way out)
        propagateComponentLoaded(e, t), 
        // since we're disconnecting, call all of the JSX ref's with null
        callNodeRefs(e._$vnodeMap$_.get(t), !0), 
        // detatch any event listeners that may have been added
        // because we're not passing an exact event name it'll
        // remove all of this element's event, which is good
        e._$domApi$_._$$removeEventListener$_(t), e._$hasListenersMap$_.delete(t), 
        // clear any references to other elements
        // more than likely we've already deleted these references
        // but let's double check there pal
        [ e._$ancestorHostElementMap$_, e._$onReadyCallbacksMap$_, e._$hostSnapshotMap$_ ].forEach(e => e.delete(t)));
      })(e, this);
    }, n["s-init"] = function() {
      (function initComponentLoaded(e, t, n, o, r) {
        // all is good, this component has been told it's time to finish loading
        // it's possible that we've already decided to destroy this element
        // check if this element has any actively loading child elements
        if (!e._$hasLoadedMap$_.has(t) && e._$instanceMap$_.get(t) && !e._$isDisconnectedMap$_.has(t) && (!t["s-ld"] || !t["s-ld"].length)) {
          // cool, so at this point this element isn't already being destroyed
          // and it does not have any child elements that are still loading
          // ensure we remove any child references cuz it doesn't matter at this point
          delete t["s-ld"], 
          // sweet, this particular element is good to go
          // all of this element's children have loaded (if any)
          // elm._hasLoaded = true;
          e._$hasLoadedMap$_.set(t, !0);
          try {
            // fire off the ref if it exists
            callNodeRefs(e._$vnodeMap$_.get(t)), 
            // fire off the user's elm.componentOnReady() callbacks that were
            // put directly on the element (well before anything was ready)
            (r = e._$onReadyCallbacksMap$_.get(t)) && (r.forEach(e => e(t)), e._$onReadyCallbacksMap$_.delete(t));
          } catch (n) {
            e._$onError$_(n, 4 /* DidLoadError */ , t);
          }
          // add the css class that this element has officially hydrated
                    t.classList.add(n), 
          // ( •_•)
          // ( •_•)>⌐■-■
          // (⌐■_■)
          // load events fire from bottom to top
          // the deepest elements load first then bubbles up
          propagateComponentLoaded(e, t);
        }
      })(e, this, o);
    }, n.forceUpdate = function() {
      queueUpdate(e, this);
    }, 
    // add getters/setters to the host element members
    // these would come from the @Prop and @Method decorators that
    // should create the public API to this component
    function proxyHostElementPrototype(e, t, n) {
      t && Object.keys(t).forEach(o => {
        // add getters/setters
        const r = t[o], i = r._$memberType$_;
        1 /* Prop */ === i || 2 /* PropMutable */ === i ? 
        // @Prop() or @Prop({ mutable: true })
        definePropertyGetterSetter(n, o, function getHostElementProp() {
          // host element getter (cannot be arrow fn)
          // yup, ugly, srynotsry
          return (e._$valuesMap$_.get(this) || {})[o];
        }, function setHostElementProp(t) {
          // host element setter (cannot be arrow fn)
          setValue(e, this, o, parsePropertyValue(r._$propType$_, t));
        }) : 6 /* Method */ === i && 
        // @Method()
        // add a placeholder noop value on the host element's prototype
        // incase this method gets called before setup
        definePropertyValue(n, o, p);
      });
    }(e, t._$membersMeta$_, n);
  }
  function proxyProp(e, t, n, o) {
    return function() {
      const r = arguments;
      return function loadComponent(e, t, n) {
        return new Promise(o => {
          let r = t[n];
          r || (r = e._$$body$_.querySelector(n)), r || (r = t[n] = e._$$createElement$_(n), 
          e._$$appendChild$_(e._$$body$_, r)), r.componentOnReady(o);
        });
      }(e, t, n).then(e => e[o].apply(e, r));
    };
  }
  const r = "data-ssrv", i = "data-ssrc", a = "$", s = {}, c = [], l = {
    enter: 13,
    escape: 27,
    space: 32,
    tab: 9,
    left: 37,
    up: 38,
    right: 39,
    down: 40
  }, u = e => null != e, f = e => e.toLowerCase(), p = () => {}, d = [], m = {
    getAttributes: e => e._$vattrs$_,
    replaceAttributes: (e, t) => e._$vattrs$_ = t
  }, y = "wc-", b = {
    allowfullscreen: 1,
    async: 1,
    autofocus: 1,
    autoplay: 1,
    checked: 1,
    controls: 1,
    disabled: 1,
    enabled: 1,
    formnovalidate: 1,
    hidden: 1,
    multiple: 1,
    noresize: 1,
    readonly: 1,
    required: 1,
    selected: 1,
    spellcheck: 1
  }, v = "http://www.w3.org/1999/xlink";
  /**
     * SSR Attribute Names
     */  let C = !1;
  // esm build which uses es module imports and dynamic imports
  (function createPlatformMain(e, t, n, o, i, s, c) {
    function defineComponent(e, t) {
      if (!y[e._$tagNameMeta$_]) {
        // keep a map of all the defined components
        y[e._$tagNameMeta$_] = !0, 
        // define the custom element
        // initialize the members on the host element prototype
        // keep a ref to the metadata with the tag as the key
        initHostElement(v, u[e._$tagNameMeta$_] = e, t.prototype, s);
        {
          // add which attributes should be observed
          const n = t.observedAttributes = [];
          // at this point the membersMeta only includes attributes which should
          // be observed, it does not include all props yet, so it's safe to
          // loop through all of the props (attrs) and observed them
                    for (const t in e._$membersMeta$_) {
            e._$membersMeta$_[t]._$attribName$_ && n.push(
            // add this attribute to our array of attributes we need to observe
            e._$membersMeta$_[t]._$attribName$_);
          }
        }
        n.customElements.define(e._$tagNameMeta$_, t);
      }
    }
    const u = {
      html: {}
    }, p = {}, d = n[e] = n[e] || {}, m = function createDomApi(e, t, n) {
      // using the $ prefix so that closure is
      // cool with property renaming each of these
      e._$ael$_ || (e._$ael$_ = ((e, t, n, o) => e.addEventListener(t, n, o)), e._$rel$_ = ((e, t, n, o) => e.removeEventListener(t, n, o)));
      const o = new WeakMap(), r = {
        _$$documentElement$_: n.documentElement,
        _$$head$_: n.head,
        _$$body$_: n.body,
        _$$supportsEventOptions$_: !1,
        _$$nodeType$_: e => e.nodeType,
        _$$createElement$_: e => n.createElement(e),
        _$$createElementNS$_: (e, t) => n.createElementNS(e, t),
        _$$createTextNode$_: e => n.createTextNode(e),
        _$$createComment$_: e => n.createComment(e),
        _$$insertBefore$_: (e, t, n) => e.insertBefore(t, n),
        // https://developer.mozilla.org/en-US/docs/Web/API/ChildNode/remove
        // and it's polyfilled in es5 builds
        _$$remove$_: e => e.remove(),
        _$$appendChild$_: (e, t) => e.appendChild(t),
        _$$childNodes$_: e => e.childNodes,
        _$$parentNode$_: e => e.parentNode,
        _$$nextSibling$_: e => e.nextSibling,
        _$$previousSibling$_: e => e.previousSibling,
        _$$tagName$_: e => f(e.nodeName),
        _$$getTextContent$_: e => e.textContent,
        _$$setTextContent$_: (e, t) => e.textContent = t,
        _$$getAttribute$_: (e, t) => e.getAttribute(t),
        _$$setAttribute$_: (e, t, n) => e.setAttribute(t, n),
        _$$setAttributeNS$_: (e, t, n, o) => e.setAttributeNS(t, n, o),
        _$$removeAttribute$_: (e, t) => e.removeAttribute(t),
        _$$elementRef$_: (e, o) => "child" === o ? e.firstElementChild : "parent" === o ? r._$$parentElement$_(e) : "body" === o ? r._$$body$_ : "document" === o ? n : "window" === o ? t : e,
        _$$addEventListener$_: (t, n, i, a, s, c, u, f) => {
          // remember the original name before we possibly change it
          const p = n;
          let d = t, m = o.get(t);
          // get the existing unregister listeners for
          // this element from the unregister listeners weakmap
                    if (m && m[p] && 
          // removed any existing listeners for this event for the assigner element
          // this element already has this listener, so let's unregister it now
          m[p](), "string" == typeof c ? 
          // attachTo is a string, and is probably something like
          // "parent", "window", or "document"
          // and the eventName would be like "mouseover" or "mousemove"
          d = r._$$elementRef$_(t, c) : "object" == typeof c ? 
          // we were passed in an actual element to attach to
          d = c : (
          // depending on the event name, we could actually be attaching
          // this element to something like the document or window
          f = n.split(":")).length > 1 && (
          // document:mousemove
          // parent:touchend
          // body:keyup.enter
          d = r._$$elementRef$_(t, f[0]), n = f[1]), !d) {
            // somehow we're referencing an element that doesn't exist
            // let's not continue
            return;
          }
          let h = i;
          // test to see if we're looking for an exact keycode
                    (f = n.split(".")).length > 1 && (
          // looks like this listener is also looking for a keycode
          // keyup.enter
          n = f[0], h = (e => {
            // wrap the user's event listener with our own check to test
            // if this keyboard event has the keycode they're looking for
            e.keyCode === l[f[1]] && i(e);
          })), 
          // create the actual event listener options to use
          // this browser may not support event options
          u = r._$$supportsEventOptions$_ ? {
            capture: !!a,
            passive: !!s
          } : !!a, 
          // ok, good to go, let's add the actual listener to the dom element
          e._$ael$_(d, n, h, u), m || 
          // we don't already have a collection, let's create it
          o.set(t, m = {}), 
          // add the unregister listener to this element's collection
          m[p] = (() => {
            // looks like it's time to say goodbye
            d && e._$rel$_(d, n, h, u), m[p] = null;
          });
        },
        _$$removeEventListener$_: (e, t) => {
          // get the unregister listener functions for this element
          const n = o.get(e);
          n && (
          // this element has unregister listeners
          t ? 
          // passed in one specific event name to remove
          n[t] && n[t]() : 
          // remove all event listeners
          Object.keys(n).forEach(e => {
            n[e] && n[e]();
          }));
        },
        _$$dispatchEvent$_: (e, n, o) => e && e.dispatchEvent(new t.CustomEvent(n, o)),
        _$$parentElement$_: (e, t) => 
        // if the parent node is a document fragment (shadow root)
        // then use the "host" property on it
        // otherwise use the parent node
        (t = r._$$parentNode$_(e)) && 11 /* DocumentFragment */ === r._$$nodeType$_(t) ? t.host : t
      };
      return r;
    }(d, n, o);
    // set App Context
    t.isServer = t.isPrerender = !(t.isClient = !0), t.window = n, t.location = n.location, 
    t.document = o, t.resourcesUrl = t.publicPath = i, 
    // add the h() fn to the app's global namespace
    d.h = h, d.Context = t;
    // keep a global set of tags we've already defined
    const y = n.$definedCmps = n.$definedCmps || {};
    // internal id increment for unique ids
        let b = 0;
    // create the platform api which is used throughout common core code
        const v = {
      _$domApi$_: m,
      _$defineComponent$_: defineComponent,
      _$emitEvent$_: t.emit,
      _$getComponentMeta$_: e => u[m._$$tagName$_(e)],
      _$getContextItem$_: e => t[e],
      isClient: !0,
      _$isDefinedComponent$_: e => !(!y[m._$$tagName$_(e)] && !v._$getComponentMeta$_(e)),
      _$nextId$_: () => e + b++,
      _$onError$_: (e, t, n) => console.error(e, t, n && n.tagName),
      _$propConnect$_: e => (function proxyController(e, t, n) {
        return {
          create: proxyProp(e, t, n, "create"),
          componentOnReady: proxyProp(e, t, n, "componentOnReady")
        };
      })(m, p, e),
      queue: t.queue = function createQueueClient(e, t) {
        function consume(e) {
          for (let t = 0; t < e.length; t++) {
            try {
              e[t]();
            } catch (e) {
              console.error(e);
            }
          }
          e.length = 0;
        }
        function consumeTimeout(e, t) {
          let o = 0;
          for (;o < e.length && n() < t; ) {
            try {
              e[o++]();
            } catch (e) {
              console.error(e);
            }
          }
          o === e.length ? e.length = 0 : 0 !== o && e.splice(0, o);
        }
        function flush() {
          c++, 
          // always force a bunch of medium callbacks to run, but still have
          // a throttle on how many can run in a certain time
          // DOM READS!!!
          consume(i);
          const t = n() + 7 * Math.ceil(c * (1 / 22));
          // DOM WRITES!!!
                    consumeTimeout(a, t), consumeTimeout(s, t), a.length > 0 && (s.push(...a), 
          a.length = 0), (l = i.length + a.length + s.length > 0) ? 
          // still more to do yet, but we've run out of time
          // let's let this thing cool off and try again in the next tick
          e.raf(flush) : c = 0;
        }
        const n = () => t.performance.now(), o = Promise.resolve(), r = [], i = [], a = [], s = [];
        let c = 0, l = !1;
        return e.raf || (e.raf = t.requestAnimationFrame.bind(t)), {
          tick(e) {
            // queue high priority work to happen in next tick
            // uses Promise.resolve() for next tick
            r.push(e), 1 === r.length && o.then(() => consume(r));
          },
          read(t) {
            // queue dom reads
            i.push(t), l || (l = !0, e.raf(flush));
          },
          write(t) {
            // queue dom writes
            a.push(t), l || (l = !0, e.raf(flush));
          }
        };
      }(d, n),
      _$requestBundle$_: function requestBundle(e, n) {
        if (
        // set the "mode" property
        n.mode || (
        // looks like mode wasn't set as a property directly yet
        // first check if there's an attribute
        // next check the app's global
        n.mode = m._$$getAttribute$_(n, "mode") || t.mode), 
        // remember a "snapshot" of this host element's current attributes/child nodes/slots/etc
        initHostSnapshot(v._$domApi$_, e, n), e._$componentConstructor$_) {
          // we're already all loaded up :)
          queueUpdate(v, n);
        } else {
          // self loading module using built-in browser's import()
          // this is when not using a 3rd party bundler
          // and components are able to lazy load themselves
          // through standardized browser APIs
          const t = "string" == typeof e._$bundleIds$_ ? e._$bundleIds$_ : e._$bundleIds$_[n.mode], o = i + t + (function useScopedCss(e, t) {
            return 2 /* ScopedCss */ === t.encapsulation || 1 /* ShadowDom */ === t.encapsulation && !e;
          }(m._$$supportsShadowDom$_, e) ? ".sc" : "") + ".js";
          // dynamic es module import() => woot!
          import(o).then(t => {
            // async loading of the module is done
            try {
              // get the component constructor from the module
              // initialize this component constructor's styles
              // it is possible for the same component to have difficult styles applied in the same app
              (function initStyleTemplate(e, t, n) {
                const o = n.style;
                if (o) {
                  // we got a style mode for this component, let's create an id for this style
                  const r = n.is + (n.styleMode || a);
                  if (!t[r]) {
                    // use <template> elements to clone styles
                    // create the template element which will hold the styles
                    // adding it to the dom via <template> so that we can
                    // clone this for each potential shadow root that will need these styles
                    // otherwise it'll be cloned and added to document.body.head
                    // but that's for the renderer to figure out later
                    const n = e._$$createElement$_("template");
                    // keep a reference to this template element within the
                    // Constructor using the style mode id as the key
                                        t[r] = n, 
                    // add the style text to the template element's innerHTML
                    n.innerHTML = `<style>${o}</style>`, 
                    // add our new template element to the head
                    // so it can be cloned later
                    e._$$appendChild$_(e._$$head$_, n);
                  }
                }
              })(m, e, e._$componentConstructor$_ = t[(e => f(e).split("-").map(e => e.charAt(0).toUpperCase() + e.slice(1)).join(""))(e._$tagNameMeta$_)]);
            } catch (t) {
              // oh man, something's up
              console.error(t), 
              // provide a bogus component constructor
              // so the rest of the app acts as normal
              e._$componentConstructor$_ = class {};
            }
            // bundle all loaded up, let's continue
                        queueUpdate(v, n);
          }).catch(e => console.error(e, o));
        }
      },
      _$ancestorHostElementMap$_: new WeakMap(),
      _$componentAppliedStyles$_: new WeakMap(),
      _$hasConnectedMap$_: new WeakMap(),
      _$hasListenersMap$_: new WeakMap(),
      _$hasLoadedMap$_: new WeakMap(),
      _$hostElementMap$_: new WeakMap(),
      _$hostSnapshotMap$_: new WeakMap(),
      _$instanceMap$_: new WeakMap(),
      _$isDisconnectedMap$_: new WeakMap(),
      _$isQueuedForUpdate$_: new WeakMap(),
      _$onReadyCallbacksMap$_: new WeakMap(),
      _$queuedEvents$_: new WeakMap(),
      _$vnodeMap$_: new WeakMap(),
      _$valuesMap$_: new WeakMap()
    };
    // create the renderer that will be used
        v.render = createRendererPatch(v, m);
    // setup the root element which is the mighty <html> tag
    // the <html> has the final say of when the app has loaded
    const C = m._$$documentElement$_;
    C["s-ld"] = [], C["s-rn"] = !0, 
    // this will fire when all components have finished loaded
    C["s-init"] = (() => {
      v._$hasLoadedMap$_.set(C, d.loaded = v._$isAppLoaded$_ = !0), m._$$dispatchEvent$_(n, "appload", {
        detail: {
          namespace: e
        }
      });
    }), 
    // if the HTML was generated from SSR
    // then let's walk the tree and generate vnodes out of the data
    function createVNodesFromSsr(e, t, n) {
      const o = n.querySelectorAll(`[${r}]`), i = o.length;
      let a, s, c, l, u, f;
      if (i > 0) {
        for (e._$hasLoadedMap$_.set(n, !0), l = 0; l < i; l++) {
          for (a = o[l], s = t._$$getAttribute$_(a, r), (c = {})._$vtag$_ = t._$$tagName$_(c._$elm$_ = a), 
          e._$vnodeMap$_.set(a, c), u = 0, f = a.childNodes.length; u < f; u++) {
            addChildSsrVNodes(t, a.childNodes[u], c, s, !0);
          }
        }
      }
    }(v, m, C), v._$attachStyles$_ = ((e, t, n, o, r) => {
      (function attachStyles(e, t, n, o, r, i, s) {
        // first see if we've got a style for a specific mode
        let c = n._$tagNameMeta$_ + (o || a), l = n[c];
        if (l || (l = n[
        // didn't find a style for this mode
        // now let's check if there's a default style for this component
        c = n._$tagNameMeta$_ + a]), l) {
          // cool, we found a style template element for this component
          let o = t._$$head$_;
          // if this browser supports shadow dom, then let's climb up
          // the dom and see if we're within a shadow dom
                    if (t._$$supportsShadowDom$_) {
            if (1 /* ShadowDom */ === n.encapsulation) {
              // we already know we're in a shadow dom
              // so shadow root is the container for these styles
              o = r.shadowRoot;
            } else {
              // climb up the dom and see if we're in a shadow dom
              for (;r = t._$$parentNode$_(r); ) {
                if (r.host && r.host.shadowRoot) {
                  // looks like we are in shadow dom, let's use
                  // this shadow root as the container for these styles
                  o = r.host.shadowRoot;
                  break;
                }
              }
            }
          }
          // if this container element already has these styles
          // then there's no need to apply them again
          // create an object to keep track if we'ready applied this component style
                    const i = e._$componentAppliedStyles$_.get(o) || {};
          if (!i[c]) {
            // this browser supports the <template> element
            // and all its native content.cloneNode() goodness
            // clone the template element to create a new <style> element
            s = l.content.cloneNode(!0);
            // let's make sure we put the styles below the <style data-styles> element
            // so any visibility css overrides the default
            const n = o.querySelectorAll("[data-styles]");
            t._$$insertBefore$_(o, s, n.length && n[n.length - 1].nextSibling || o._$firstChild$_), 
            // remember we don't need to do this again for this element
            i[c] = !0, e._$componentAppliedStyles$_.set(o, i);
          }
        }
      })(e, t, n, o, r);
    }), 
    // register all the components now that everything's ready
    // standard es2017 class extends HTMLElement
    (d.components || []).map(e => (function parseComponentLoader(e, t, n) {
      // tag name will always be lower case
      const o = {
        _$tagNameMeta$_: e[0],
        _$membersMeta$_: {
          // every component defaults to always have
          // the mode and color properties
          // but only color should observe any attribute changes
          color: {
            _$attribName$_: "color"
          }
        }
      };
      // map of the bundle ids
      // can contain modes, and array of esm and es5 bundle ids
            o._$bundleIds$_ = e[1];
      // parse member meta
      // this data only includes props that are attributes that need to be observed
      // it does not include all of the props yet
      const r = e[3];
      if (r) {
        for (t = 0; t < r.length; t++) {
          n = r[t], o._$membersMeta$_[n[0]] = {
            _$memberType$_: n[1],
            _$reflectToAttr$_: !!n[2],
            _$attribName$_: "string" == typeof n[3] ? n[3] : n[3] ? n[0] : 0,
            _$propType$_: n[4]
          };
        }
      }
      // encapsulation
            return o.encapsulation = e[4], e[5] && (
      // parse listener meta
      o._$listenersMeta$_ = e[5].map(parseListenerData)), o;
    })(e)).forEach(e => defineComponent(e, class extends HTMLElement {})), 
    // create the componentOnReady fn
    function initCoreComponentOnReady(e, t) {
      // create the function the HTMLElement.prototype.componentOnReady will end up calling
      t.componentOnReady = ((t, n) => {
        if (e._$getComponentMeta$_(t) && !e._$hasLoadedMap$_.has(t)) {
          // this is a known component and the
          // host element hasn't finished loading yet
          const o = e._$onReadyCallbacksMap$_.get(t) || [];
          o.push(n), e._$onReadyCallbacksMap$_.set(t, o);
        } else {
          // either the host element has already loaded
          // or it's not even a component
          n(t);
        }
      }), 
      // drain the queue that could have been filled up before the core fully loaded
      t.$r && t.$r.forEach(e => t.componentOnReady(e[0], e[1])), 
      // remove the queue now that the core file has initialized
      t.$r = null;
    }(v, d), 
    // notify that the app has initialized and the core script is ready
    // but note that the components have not fully loaded yet
    d.initialized = !0;
  })(o, n, e, t, resourcesUrl, hydratedCssClass);
})(window, document, Context, namespace);
})({},"ionicons","hydrated");