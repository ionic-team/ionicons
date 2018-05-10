/*! Built with http://stenciljs.com */
(function(Context,namespace,hydratedCssClass,resourcesUrl,s){"use strict";
s=document.querySelector("script[data-namespace='docssite']");if(s){resourcesUrl=s.getAttribute('data-resources-url');}
(function(resourcesUrl){var t=Object.prototype.hasOwnProperty;function n(t,n){return t===n?0!==t||0!==n||1/t==1/n:t!=t&&n!=n}function e(e,o){if(n(e,o))return!0;if("object"!=typeof e||null===e||"object"!=typeof o||null===o)return!1;var r=Object.keys(e),u=Object.keys(o);if(r.length!==u.length)return!1;for(var c=0;c<r.length;c++)if(!t.call(o,r[c])||!n(e[r[c]],o[r[c]]))return!1;return!0}var o=function(t,n,e,o){return new(e||(e=Promise))(function(r,u){function c(t){try{i(o.next(t))}catch(t){u(t)}}function l(t){try{i(o.throw(t))}catch(t){u(t)}}function i(t){t.done?r(t.value):new e(function(n){n(t.value)}).then(c,l)}i((o=o.apply(t,n||[])).next())})};Context.activeRouter=function(){let t={};const n=[];function r(n){return 0===Object.keys(t).length?{location:{pathname:Context.window.location.pathname,search:Context.window.location.search}}:n?t[n]:t}function u(){return o(this,void 0,void 0,function*(){const t=n,o=[],u=r("location").pathname;for(let n=0;n<t.length;n++){let r=null;const c=o.some(e=>null!=e[1]&&null!=e[2]&&e[2]===t[n].groupId);r=c?null:t[n].isMatch(u),e(t[n].lastMatch,r)||(!c&&t[n].groupId?o.unshift([n,r,t[n].groupId]):o.push([n,r,t[n].groupId])),t[n].lastMatch=r}for(const[n,e,r]of o)r&&null!=e?yield t[n].listener(e):t[n].listener(e)})}return{set:function(n){t=Object.assign({},t,n),u()},get:r,subscribe:function(t){!function(t){const e=r("location").pathname,o=t.isMatch(e);if(t.lastMatch=o,t.listener(o),null==t.groupId||null==t.groupIndex||0===n.length)n.push(t);else for(let e=0;e<n.length;e++){const{groupId:o,groupIndex:r}=n[e];if(null==o){n.splice(e,0,t);break}if(o===t.groupId&&r>t.groupIndex){n.splice(e,0,t);break}}}(t);let e=!0;return function(){e&&(function(t){const e=n.indexOf(t);n.splice(e,1)}(t),e=!1)}},dispatch:u}}();
})(resourcesUrl);
(function(window, document, Context, namespace) {
  'use strict';
  /**
     * SSR Attribute Names
     */
  const SSR_VNODE_ID = 'data-ssrv';
  const SSR_CHILD_ID = 'data-ssrc';
  /**
     * Default style mode id
     */  const DEFAULT_STYLE_MODE = '$';
  /**
     * Reusable empty obj/array
     * Don't add values to these!!
     */  const EMPTY_OBJ = {};
  const EMPTY_ARR = [];
  /**
     * Key Name to Key Code Map
     */  const KEY_CODE_MAP = {
    'enter': 13,
    'escape': 27,
    'space': 32,
    'tab': 9,
    'left': 37,
    'up': 38,
    'right': 39,
    'down': 40
  };
  function initStyleTemplate(domApi, cmpMeta, cmpConstructor) {
    const style = cmpConstructor.style;
    if (style) {
      // we got a style mode for this component, let's create an id for this style
      const styleModeId = cmpConstructor.is + (cmpConstructor.styleMode || DEFAULT_STYLE_MODE);
      if (!cmpMeta[styleModeId]) {
        false;
        {
          // use <template> elements to clone styles
          // create the template element which will hold the styles
          // adding it to the dom via <template> so that we can
          // clone this for each potential shadow root that will need these styles
          // otherwise it'll be cloned and added to document.body.head
          // but that's for the renderer to figure out later
          const templateElm = domApi.$createElement('template');
          // keep a reference to this template element within the
          // Constructor using the style mode id as the key
                    cmpMeta[styleModeId] = templateElm;
          // add the style text to the template element's innerHTML
                    templateElm.innerHTML = `<style>${style}</style>`;
          // add our new template element to the head
          // so it can be cloned later
                    domApi.$appendChild(domApi.$head, templateElm);
        }
      }
    }
  }
  function attachStyles(plt, domApi, cmpMeta, modeName, elm, customStyle, styleElm) {
    // first see if we've got a style for a specific mode
    let styleModeId = cmpMeta.tagNameMeta + (modeName || DEFAULT_STYLE_MODE);
    let styleTemplate = cmpMeta[styleModeId];
    if (!styleTemplate) {
      // didn't find a style for this mode
      // now let's check if there's a default style for this component
      styleModeId = cmpMeta.tagNameMeta + DEFAULT_STYLE_MODE;
      styleTemplate = cmpMeta[styleModeId];
    }
    if (styleTemplate) {
      // cool, we found a style template element for this component
      let styleContainerNode = domApi.$head;
      // if this browser supports shadow dom, then let's climb up
      // the dom and see if we're within a shadow dom
            if (domApi.$supportsShadowDom) {
        if (1 /* ShadowDom */ === cmpMeta.encapsulation) {
          // we already know we're in a shadow dom
          // so shadow root is the container for these styles
          styleContainerNode = elm.shadowRoot;
        } else {
          // climb up the dom and see if we're in a shadow dom
          while (elm = domApi.$parentNode(elm)) {
            if (elm.host && elm.host.shadowRoot) {
              // looks like we are in shadow dom, let's use
              // this shadow root as the container for these styles
              styleContainerNode = elm.host.shadowRoot;
              break;
            }
          }
        }
      }
      // if this container element already has these styles
      // then there's no need to apply them again
      // create an object to keep track if we'ready applied this component style
            const appliedStyles = plt.componentAppliedStyles.get(styleContainerNode) || {};
      if (!appliedStyles[styleModeId]) {
        false;
        // this browser supports the <template> element
        // and all its native content.cloneNode() goodness
        // clone the template element to create a new <style> element
        styleElm = styleTemplate.content.cloneNode(true);
        // let's make sure we put the styles below the <style data-styles> element
        // so any visibility css overrides the default
        const dataStyles = styleContainerNode.querySelectorAll('[data-styles]');
        domApi.$insertBefore(styleContainerNode, styleElm, dataStyles.length && dataStyles[dataStyles.length - 1].nextSibling || styleContainerNode.firstChild);
        // remember we don't need to do this again for this element
                appliedStyles[styleModeId] = true;
        plt.componentAppliedStyles.set(styleContainerNode, appliedStyles);
      }
    }
  }
  const isDef = v => null != v;
  const toLowerCase = str => str.toLowerCase();
  const dashToPascalCase = str => toLowerCase(str).split('-').map(segment => segment.charAt(0).toUpperCase() + segment.slice(1)).join('');
  const noop = () => {};
  function createDomApi(App, win, doc) {
    // using the $ prefix so that closure is
    // cool with property renaming each of these
    if (!App.ael) {
      App.ael = ((elm, eventName, cb, opts) => elm.addEventListener(eventName, cb, opts));
      App.rel = ((elm, eventName, cb, opts) => elm.removeEventListener(eventName, cb, opts));
    }
    const unregisterListenerFns = new WeakMap();
    const domApi = {
      $documentElement: doc.documentElement,
      $head: doc.head,
      $body: doc.body,
      $supportsEventOptions: false,
      $nodeType: node => node.nodeType,
      $createElement: tagName => doc.createElement(tagName),
      $createElementNS: (namespace, tagName) => doc.createElementNS(namespace, tagName),
      $createTextNode: text => doc.createTextNode(text),
      $createComment: data => doc.createComment(data),
      $insertBefore: (parentNode, childNode, referenceNode) => parentNode.insertBefore(childNode, referenceNode),
      // https://developer.mozilla.org/en-US/docs/Web/API/ChildNode/remove
      // and it's polyfilled in es5 builds
      $remove: node => node.remove(),
      $appendChild: (parentNode, childNode) => parentNode.appendChild(childNode),
      $childNodes: node => node.childNodes,
      $parentNode: node => node.parentNode,
      $nextSibling: node => node.nextSibling,
      $previousSibling: node => node.previousSibling,
      $tagName: elm => toLowerCase(elm.nodeName),
      $getTextContent: node => node.textContent,
      $setTextContent: (node, text) => node.textContent = text,
      $getAttribute: (elm, key) => elm.getAttribute(key),
      $setAttribute: (elm, key, val) => elm.setAttribute(key, val),
      $setAttributeNS: (elm, namespaceURI, qualifiedName, val) => elm.setAttributeNS(namespaceURI, qualifiedName, val),
      $removeAttribute: (elm, key) => elm.removeAttribute(key),
      $elementRef: (elm, referenceName) => {
        if ('child' === referenceName) {
          return elm.firstElementChild;
        }
        if ('parent' === referenceName) {
          return domApi.$parentElement(elm);
        }
        if ('body' === referenceName) {
          return domApi.$body;
        }
        if ('document' === referenceName) {
          return doc;
        }
        if ('window' === referenceName) {
          return win;
        }
        return elm;
      },
      $addEventListener: (assignerElm, eventName, listenerCallback, useCapture, usePassive, attachTo, eventListenerOpts, splt) => {
        // remember the original name before we possibly change it
        const assignersEventName = eventName;
        let attachToElm = assignerElm;
        // get the existing unregister listeners for
        // this element from the unregister listeners weakmap
                let assignersUnregListeners = unregisterListenerFns.get(assignerElm);
        assignersUnregListeners && assignersUnregListeners[assignersEventName] && 
        // removed any existing listeners for this event for the assigner element
        // this element already has this listener, so let's unregister it now
        assignersUnregListeners[assignersEventName]();
        if ('string' === typeof attachTo) {
          // attachTo is a string, and is probably something like
          // "parent", "window", or "document"
          // and the eventName would be like "mouseover" or "mousemove"
          attachToElm = domApi.$elementRef(assignerElm, attachTo);
        } else if ('object' === typeof attachTo) {
          // we were passed in an actual element to attach to
          attachToElm = attachTo;
        } else {
          // depending on the event name, we could actually be attaching
          // this element to something like the document or window
          splt = eventName.split(':');
          if (splt.length > 1) {
            // document:mousemove
            // parent:touchend
            // body:keyup.enter
            attachToElm = domApi.$elementRef(assignerElm, splt[0]);
            eventName = splt[1];
          }
        }
        if (!attachToElm) {
          // somehow we're referencing an element that doesn't exist
          // let's not continue
          return;
        }
        let eventListener = listenerCallback;
        // test to see if we're looking for an exact keycode
                splt = eventName.split('.');
        if (splt.length > 1) {
          // looks like this listener is also looking for a keycode
          // keyup.enter
          eventName = splt[0];
          eventListener = (ev => {
            // wrap the user's event listener with our own check to test
            // if this keyboard event has the keycode they're looking for
            ev.keyCode === KEY_CODE_MAP[splt[1]] && listenerCallback(ev);
          });
        }
        // create the actual event listener options to use
        // this browser may not support event options
                eventListenerOpts = domApi.$supportsEventOptions ? {
          capture: !!useCapture,
          passive: !!usePassive
        } : !!useCapture;
        // ok, good to go, let's add the actual listener to the dom element
                App.ael(attachToElm, eventName, eventListener, eventListenerOpts);
        assignersUnregListeners || 
        // we don't already have a collection, let's create it
        unregisterListenerFns.set(assignerElm, assignersUnregListeners = {});
        // add the unregister listener to this element's collection
                assignersUnregListeners[assignersEventName] = (() => {
          // looks like it's time to say goodbye
          attachToElm && App.rel(attachToElm, eventName, eventListener, eventListenerOpts);
          assignersUnregListeners[assignersEventName] = null;
        });
      },
      $removeEventListener: (elm, eventName) => {
        // get the unregister listener functions for this element
        const assignersUnregListeners = unregisterListenerFns.get(elm);
        assignersUnregListeners && (
        // this element has unregister listeners
        eventName ? 
        // passed in one specific event name to remove
        assignersUnregListeners[eventName] && assignersUnregListeners[eventName]() : 
        // remove all event listeners
        Object.keys(assignersUnregListeners).forEach(assignersEventName => {
          assignersUnregListeners[assignersEventName] && assignersUnregListeners[assignersEventName]();
        }));
      }
    };
    false;
    false;
    domApi.$dispatchEvent = ((elm, eventName, data) => elm && elm.dispatchEvent(new win.CustomEvent(eventName, data)));
    true;
    // test if this browser supports event options or not
    try {
      win.addEventListener('e', null, Object.defineProperty({}, 'passive', {
        get: () => domApi.$supportsEventOptions = true
      }));
    } catch (e) {}
    domApi.$parentElement = ((elm, parentNode) => 
    // if the parent node is a document fragment (shadow root)
    // then use the "host" property on it
    // otherwise use the parent node
    (parentNode = domApi.$parentNode(elm)) && 11 /* DocumentFragment */ === domApi.$nodeType(parentNode) ? parentNode.host : parentNode);
    return domApi;
  }
  function parseComponentLoader(cmpRegistryData, cmpRegistry, i, d) {
    // tag name will always be lower case
    const cmpMeta = {
      tagNameMeta: cmpRegistryData[0],
      membersMeta: {
        // every component defaults to always have
        // the mode and color properties
        // but only color should observe any attribute changes
        'color': {
          attribName: 'color'
        }
      }
    };
    // map of the bundle ids
    // can contain modes, and array of esm and es5 bundle ids
        cmpMeta.bundleIds = cmpRegistryData[1];
    // parse member meta
    // this data only includes props that are attributes that need to be observed
    // it does not include all of the props yet
        const memberData = cmpRegistryData[3];
    if (memberData) {
      for (i = 0; i < memberData.length; i++) {
        d = memberData[i];
        cmpMeta.membersMeta[d[0]] = {
          memberType: d[1],
          reflectToAttr: !!d[2],
          attribName: 'string' === typeof d[3] ? d[3] : d[3] ? d[0] : 0,
          propType: d[4]
        };
      }
    }
    // encapsulation
        cmpMeta.encapsulation = cmpRegistryData[4];
    cmpRegistryData[5] && (
    // parse listener meta
    cmpMeta.listenersMeta = cmpRegistryData[5].map(parseListenerData));
    return cmpRegistry[cmpMeta.tagNameMeta] = cmpMeta;
  }
  function parseListenerData(listenerData) {
    return {
      eventName: listenerData[0],
      eventMethodName: listenerData[1],
      eventDisabled: !!listenerData[2],
      eventPassive: !!listenerData[3],
      eventCapture: !!listenerData[4]
    };
  }
  function parsePropertyValue(propType, propValue) {
    // ensure this value is of the correct prop type
    // we're testing both formats of the "propType" value because
    // we could have either gotten the data from the attribute changed callback,
    // which wouldn't have Constructor data yet, and because this method is reused
    // within proxy where we don't have meta data, but only constructor data
    if (isDef(propValue) && 'object' !== typeof propValue && 'function' !== typeof propValue) {
      if (propType === Boolean || 3 /* Boolean */ === propType) {
        // per the HTML spec, any string value means it is a boolean true value
        // but we'll cheat here and say that the string "false" is the boolean false
        return 'false' !== propValue && ('' === propValue || !!propValue);
      }
      if (propType === Number || 4 /* Number */ === propType) {
        // force it to be a number
        return parseFloat(propValue);
      }
      if (propType === String || 2 /* String */ === propType) {
        // could have been passed as a number or boolean
        // but we still want it as a string
        return propValue.toString();
      }
    }
    // not sure exactly what type we want
    // so no need to change to a different type
        return propValue;
  }
  function initEventEmitters(plt, cmpEvents, instance) {
    if (cmpEvents) {
      const elm = plt.hostElementMap.get(instance);
      cmpEvents.forEach(eventMeta => {
        instance[eventMeta.method] = {
          emit: data => {
            plt.emitEvent(elm, eventMeta.name, {
              bubbles: eventMeta.bubbles,
              composed: eventMeta.composed,
              cancelable: eventMeta.cancelable,
              detail: data
            });
          }
        };
      });
    }
  }
  function proxyComponentInstance(plt, cmpConstructor, elm, instance, hostSnapshot, properties, memberName) {
    // at this point we've got a specific node of a host element, and created a component class instance
    // and we've already created getters/setters on both the host element and component class prototypes
    // let's upgrade any data that might have been set on the host element already
    // and let's have the getters/setters kick in and do their jobs
    // let's automatically add a reference to the host element on the instance
    plt.hostElementMap.set(instance, elm);
    // create the values object if it doesn't already exist
    // this will hold all of the internal getter/setter values
        plt.valuesMap.has(elm) || plt.valuesMap.set(elm, {});
    // get the properties from the constructor
    // and add default "mode" and "color" properties
        properties = Object.assign({
      color: {
        type: String
      }
    }, cmpConstructor.properties);
    // always set mode
        properties.mode = {
      type: String
    };
    // define each of the members and initialize what their role is
        for (memberName in properties) {
      defineMember(plt, properties[memberName], elm, instance, memberName, hostSnapshot);
    }
  }
  function initComponentInstance(plt, elm, hostSnapshot, instance, componentConstructor, queuedEvents, i) {
    try {
      // using the user's component class, let's create a new instance
      componentConstructor = plt.getComponentMeta(elm).componentConstructor;
      instance = new componentConstructor();
      // ok cool, we've got an host element now, and a actual instance
      // and there were no errors creating the instance
      // let's upgrade the data on the host element
      // and let the getters/setters do their jobs
            proxyComponentInstance(plt, componentConstructor, elm, instance, hostSnapshot);
      true;
      // add each of the event emitters which wire up instance methods
      // to fire off dom events from the host element
      initEventEmitters(plt, componentConstructor.events, instance);
      true;
      try {
        // replay any event listeners on the instance that
        // were queued up between the time the element was
        // connected and before the instance was ready
        queuedEvents = plt.queuedEvents.get(elm);
        if (queuedEvents) {
          // events may have already fired before the instance was even ready
          // now that the instance is ready, let's replay all of the events that
          // we queued up earlier that were originally meant for the instance
          for (i = 0; i < queuedEvents.length; i += 2) {
            // data was added in sets of two
            // first item the eventMethodName
            // second item is the event data
            // take a look at initElementListener()
            instance[queuedEvents[i]](queuedEvents[i + 1]);
          }
          plt.queuedEvents.delete(elm);
        }
      } catch (e) {
        plt.onError(e, 2 /* QueueEventsError */ , elm);
      }
    } catch (e) {
      // something done went wrong trying to create a component instance
      // create a dumby instance so other stuff can load
      // but chances are the app isn't fully working cuz this component has issues
      instance = {};
      plt.onError(e, 7 /* InitInstanceError */ , elm, true);
    }
    plt.instanceMap.set(elm, instance);
    return instance;
  }
  function initComponentLoaded(plt, elm, hydratedCssClass, instance, onReadyCallbacks) {
    false;
    // all is good, this component has been told it's time to finish loading
    // it's possible that we've already decided to destroy this element
    // check if this element has any actively loading child elements
    if (!plt.hasLoadedMap.has(elm) && (instance = plt.instanceMap.get(elm)) && !plt.isDisconnectedMap.has(elm) && (!elm['s-ld'] || !elm['s-ld'].length)) {
      // cool, so at this point this element isn't already being destroyed
      // and it does not have any child elements that are still loading
      // ensure we remove any child references cuz it doesn't matter at this point
      delete elm['s-ld'];
      // sweet, this particular element is good to go
      // all of this element's children have loaded (if any)
      // elm._hasLoaded = true;
            plt.hasLoadedMap.set(elm, true);
      try {
        // fire off the ref if it exists
        callNodeRefs(plt.vnodeMap.get(elm));
        // fire off the user's elm.componentOnReady() callbacks that were
        // put directly on the element (well before anything was ready)
                if (onReadyCallbacks = plt.onReadyCallbacksMap.get(elm)) {
          onReadyCallbacks.forEach(cb => cb(elm));
          plt.onReadyCallbacksMap.delete(elm);
        }
        true;
        // fire off the user's componentDidLoad method (if one was provided)
        // componentDidLoad only runs ONCE, after the instance's element has been
        // assigned as the host element, and AFTER render() has been called
        // we'll also fire this method off on the element, just to
        instance.componentDidLoad && instance.componentDidLoad();
      } catch (e) {
        plt.onError(e, 4 /* DidLoadError */ , elm);
      }
      // add the css class that this element has officially hydrated
            elm.classList.add(hydratedCssClass);
      // ( •_•)
      // ( •_•)>⌐■-■
      // (⌐■_■)
      // load events fire from bottom to top
      // the deepest elements load first then bubbles up
            propagateComponentLoaded(plt, elm);
    }
  }
  function propagateComponentLoaded(plt, elm, index, ancestorsActivelyLoadingChildren) {
    // load events fire from bottom to top
    // the deepest elements load first then bubbles up
    const ancestorHostElement = plt.ancestorHostElementMap.get(elm);
    if (ancestorHostElement) {
      // ok so this element already has a known ancestor host element
      // let's make sure we remove this element from its ancestor's
      // known list of child elements which are actively loading
      ancestorsActivelyLoadingChildren = ancestorHostElement['s-ld'] || ancestorHostElement.$activeLoading;
      if (ancestorsActivelyLoadingChildren) {
        index = ancestorsActivelyLoadingChildren.indexOf(elm);
        index > -1 && 
        // yup, this element is in the list of child elements to wait on
        // remove it so we can work to get the length down to 0
        ancestorsActivelyLoadingChildren.splice(index, 1);
        // the ancestor's initLoad method will do the actual checks
        // to see if the ancestor is actually loaded or not
        // then let's call the ancestor's initLoad method if there's no length
        // (which actually ends up as this method again but for the ancestor)
                if (!ancestorsActivelyLoadingChildren.length) {
          ancestorHostElement['s-init'] && ancestorHostElement['s-init']();
          // $initLoad deprecated 2018-04-02
                    ancestorHostElement.$initLoad && ancestorHostElement.$initLoad();
        }
      }
      plt.ancestorHostElementMap.delete(elm);
    }
  }
  /**
     * Production h() function based on Preact by
     * Jason Miller (@developit)
     * Licensed under the MIT License
     * https://github.com/developit/preact/blob/master/LICENSE
     *
     * Modified for Stencil's compiler and vdom
     */  const stack = [];
  function h(nodeName, vnodeData, child) {
    let children = null;
    let lastSimple = false;
    let simple = false;
    for (var i = arguments.length; i-- > 2; ) {
      stack.push(arguments[i]);
    }
    while (stack.length > 0) {
      if ((child = stack.pop()) && void 0 !== child.pop) {
        for (i = child.length; i--; ) {
          stack.push(child[i]);
        }
      } else {
        'boolean' === typeof child && (child = null);
        (simple = 'function' !== typeof nodeName) && (null == child ? child = '' : 'number' === typeof child ? child = String(child) : 'string' !== typeof child && (simple = false));
        simple && lastSimple ? children[children.length - 1].vtext += child : null === children ? children = [ simple ? {
          vtext: child
        } : child ] : children.push(simple ? {
          vtext: child
        } : child);
        lastSimple = simple;
      }
    }
    let vkey;
    let vname;
    if (null != vnodeData) {
      // normalize class / classname attributes
      vnodeData.className && (vnodeData.class = vnodeData.className);
      if ('object' === typeof vnodeData.class) {
        for (i in vnodeData.class) {
          vnodeData.class[i] && stack.push(i);
        }
        vnodeData.class = stack.join(' ');
        stack.length = 0;
      }
      null != vnodeData.key && (vkey = vnodeData.key);
      null != vnodeData.name && (vname = vnodeData.name);
    }
    if ('function' === typeof nodeName) {
      // nodeName is a functional component
      return nodeName(Object.assign({}, vnodeData, {
        children: children
      }), utils);
    }
    return {
      vtag: nodeName,
      vchildren: children,
      vtext: void 0,
      vattrs: vnodeData,
      vkey: vkey,
      vname: vname,
      elm: void 0,
      ishost: false
    };
  }
  const utils = {
    'getAttributes': function(vnode) {
      return vnode.vattrs;
    },
    'replaceAttributes': function(vnode, attributes) {
      vnode.vattrs = attributes;
    }
  };
  function render(plt, cmpMeta, elm, instance, isUpdateRender) {
    try {
      // if this component has a render function, let's fire
      // it off and generate the child vnodes for this host element
      // note that we do not create the host element cuz it already exists
      const hostMeta = cmpMeta.componentConstructor.host;
      let reflectHostAttr;
      false;
      if (instance.render || instance.hostData || hostMeta || reflectHostAttr) {
        // tell the platform we're actively rendering
        // if a value is changed within a render() then
        // this tells the platform not to queue the change
        plt.activeRender = true;
        const vnodeChildren = instance.render && instance.render();
        let vnodeHostData;
        true;
        // user component provided a "hostData()" method
        // the returned data/attributes are used on the host element
        vnodeHostData = instance.hostData && instance.hostData();
        false;
        // tell the platform we're done rendering
        // now any changes will again queue
        plt.activeRender = false;
        false;
        // looks like we've got child nodes to render into this host element
        // or we need to update the css class/attrs on the host element
        // if we haven't already created a vnode, then we give the renderer the actual element
        // if this is a re-render, then give the renderer the last vnode we already created
        const oldVNode = plt.vnodeMap.get(elm) || {};
        oldVNode.elm = elm;
        const hostVNode = h(null, vnodeHostData, vnodeChildren);
        false;
        // each patch always gets a new vnode
        // the host element itself isn't patched because it already exists
        // kick off the actual render and any DOM updates
        plt.vnodeMap.set(elm, plt.render(oldVNode, hostVNode, isUpdateRender, cmpMeta.componentConstructor.encapsulation));
      }
      true;
      // attach the styles this component needs, if any
      // this fn figures out if the styles should go in a
      // shadow root or if they should be global
      plt.attachStyles(plt, plt.domApi, cmpMeta, instance.mode, elm);
      // it's official, this element has rendered
      elm['s-rn'] = true;
      elm.$onRender && (
      // $onRender deprecated 2018-04-02
      elm['s-rc'] = elm.$onRender);
      if (elm['s-rc']) {
        // ok, so turns out there are some child host elements
        // waiting on this parent element to load
        // let's fire off all update callbacks waiting
        elm['s-rc'].forEach(cb => cb());
        elm['s-rc'] = null;
      }
    } catch (e) {
      plt.activeRender = false;
      plt.onError(e, 8 /* RenderError */ , elm, true);
    }
  }
  function queueUpdate(plt, elm) {
    // only run patch if it isn't queued already
    if (!plt.isQueuedForUpdate.has(elm)) {
      plt.isQueuedForUpdate.set(elm, true);
      // run the patch in the next tick
      // vdom diff and patch the host element for differences
            plt.isAppLoaded ? 
      // app has already loaded
      // let's queue this work in the dom write phase
      plt.queue.write(() => update(plt, elm)) : 
      // app hasn't finished loading yet
      // so let's use next tick to do everything
      // as fast as possible
      plt.queue.tick(() => update(plt, elm));
    }
  }
  function update(plt, elm, isInitialLoad, instance, ancestorHostElement, userPromise) {
    // no longer queued for update
    plt.isQueuedForUpdate.delete(elm);
    // everything is async, so somehow we could have already disconnected
    // this node, so be sure to do nothing if we've already disconnected
        if (!plt.isDisconnectedMap.has(elm)) {
      instance = plt.instanceMap.get(elm);
      isInitialLoad = !instance;
      if (isInitialLoad) {
        ancestorHostElement = plt.ancestorHostElementMap.get(elm);
        ancestorHostElement && ancestorHostElement.$rendered && (
        // $rendered deprecated 2018-04-02
        ancestorHostElement['s-rn'] = true);
        if (ancestorHostElement && !ancestorHostElement['s-rn']) {
          // this is the intial load
          // this element has an ancestor host element
          // but the ancestor host element has NOT rendered yet
          // so let's just cool our jets and wait for the ancestor to render
          (ancestorHostElement['s-rc'] = ancestorHostElement['s-rc'] || []).push(() => {
            // this will get fired off when the ancestor host element
            // finally gets around to rendering its lazy self
            update(plt, elm);
          });
          // $onRender deprecated 2018-04-02
                    ancestorHostElement.$onRender = ancestorHostElement['s-rc'];
          return;
        }
        // haven't created a component instance for this host element yet!
        // create the instance from the user's component class
        // https://www.youtube.com/watch?v=olLxrojmvMg
                instance = initComponentInstance(plt, elm, plt.hostSnapshotMap.get(elm));
        true;
        // fire off the user's componentWillLoad method (if one was provided)
        // componentWillLoad only runs ONCE, after instance's element has been
        // assigned as the host element, but BEFORE render() has been called
        try {
          instance.componentWillLoad && (userPromise = instance.componentWillLoad());
        } catch (e) {
          plt.onError(e, 3 /* WillLoadError */ , elm);
        }
      } else {
        false;
      }
      userPromise && userPromise.then ? 
      // looks like the user return a promise!
      // let's not actually kick off the render
      // until the user has resolved their promise
      userPromise.then(() => renderUpdate(plt, elm, instance, isInitialLoad)) : 
      // user never returned a promise so there's
      // no need to wait on anything, let's do the render now my friend
      renderUpdate(plt, elm, instance, isInitialLoad);
    }
  }
  function renderUpdate(plt, elm, instance, isInitialLoad) {
    // if this component has a render function, let's fire
    // it off and generate a vnode for this
    render(plt, plt.getComponentMeta(elm), elm, instance, !isInitialLoad);
    try {
      if (isInitialLoad) {
        // so this was the initial load i guess
        elm['s-init']();
        // componentDidLoad just fired off
            } else {
        true;
        // fire off the user's componentDidUpdate method (if one was provided)
        // componentDidUpdate runs AFTER render() has been called
        // but only AFTER an UPDATE and not after the intial render
        instance.componentDidUpdate && instance.componentDidUpdate();
        callNodeRefs(plt.vnodeMap.get(elm));
      }
    } catch (e) {
      // derp
      plt.onError(e, 6 /* DidUpdateError */ , elm, true);
    }
  }
  function defineMember(plt, property, elm, instance, memberName, hostSnapshot, hostAttributes, hostAttrValue) {
    function getComponentProp(values) {
      // component instance prop/state getter
      // get the property value directly from our internal values
      values = plt.valuesMap.get(plt.hostElementMap.get(this));
      return values && values[memberName];
    }
    function setComponentProp(newValue, elm) {
      // component instance prop/state setter (cannot be arrow fn)
      elm = plt.hostElementMap.get(this);
      if (elm) {
        if (property.state || property.mutable) {
          setValue(plt, elm, memberName, newValue);
        } else {
          true;
          console.warn(`@Prop() "${memberName}" on "${elm.tagName}" cannot be modified.`);
        }
      }
    }
    if (property.type || property.state) {
      const values = plt.valuesMap.get(elm);
      if (!property.state) {
        !property.attr || void 0 !== values[memberName] && '' !== values[memberName] || 
        // check the prop value from the host element attribute
        (hostAttributes = hostSnapshot && hostSnapshot.$attributes) && isDef(hostAttrValue = hostAttributes[property.attr]) && (
        // looks like we've got an attribute value
        // let's set it to our internal values
        values[memberName] = parsePropertyValue(property.type, hostAttrValue));
        true;
        // client-side
        // within the browser, the element's prototype
        // already has its getter/setter set, but on the
        // server the prototype is shared causing issues
        // so instead the server's elm has the getter/setter
        // directly on the actual element instance, not its prototype
        // so on the browser we can use "hasOwnProperty"
        if (elm.hasOwnProperty(memberName)) {
          // @Prop or @Prop({mutable:true})
          // property values on the host element should override
          // any default values on the component instance
          void 0 === values[memberName] && (values[memberName] = parsePropertyValue(property.type, elm[memberName]));
          // for the client only, let's delete its "own" property
          // this way our already assigned getter/setter on the prototype kicks in
                    delete elm[memberName];
        }
      }
      instance.hasOwnProperty(memberName) && void 0 === values[memberName] && (
      // @Prop() or @Prop({mutable:true}) or @State()
      // we haven't yet got a value from the above checks so let's
      // read any "own" property instance values already set
      // to our internal value as the source of getter data
      // we're about to define a property and it'll overwrite this "own" property
      values[memberName] = instance[memberName]);
      property.watchCallbacks && (values[WATCH_CB_PREFIX + memberName] = property.watchCallbacks.slice());
      // add getter/setter to the component instance
      // these will be pointed to the internal data set from the above checks
            definePropertyGetterSetter(instance, memberName, getComponentProp, setComponentProp);
    } else if (true, property.elementRef) {
      // @Element()
      // add a getter to the element reference using
      // the member name the component meta provided
      definePropertyValue(instance, memberName, elm);
    } else {
      false;
      if (true, property.context) {
        // @Prop({ context: 'config' })
        const contextObj = plt.getContextItem(property.context);
        void 0 !== contextObj && definePropertyValue(instance, memberName, contextObj.getContext && contextObj.getContext(elm) || contextObj);
      } else {
        false;
      }
    }
  }
  function setValue(plt, elm, memberName, newVal, values, instance, watchMethods) {
    // get the internal values object, which should always come from the host element instance
    // create the _values object if it doesn't already exist
    values = plt.valuesMap.get(elm);
    values || plt.valuesMap.set(elm, values = {});
    const oldVal = values[memberName];
    // check our new property value against our internal value
        if (newVal !== oldVal) {
      // gadzooks! the property's value has changed!!
      // set our new value!
      // https://youtu.be/dFtLONl4cNc?t=22
      values[memberName] = newVal;
      instance = plt.instanceMap.get(elm);
      if (instance) {
        // get an array of method names of watch functions to call
        watchMethods = values[WATCH_CB_PREFIX + memberName];
        if (true, watchMethods) {
          // this instance is watching for when this property changed
          for (let i = 0; i < watchMethods.length; i++) {
            try {
              // fire off each of the watch methods that are watching this property
              instance[watchMethods[i]].call(instance, newVal, oldVal, memberName);
            } catch (e) {
              console.error(e);
            }
          }
        }
        !plt.activeRender && elm['s-rn'] && 
        // looks like this value actually changed, so we've got work to do!
        // but only if we've already rendered, otherwise just chill out
        // queue that we need to do an update, but don't worry about queuing
        // up millions cuz this function ensures it only runs once
        queueUpdate(plt, elm);
      }
    }
  }
  function definePropertyValue(obj, propertyKey, value) {
    // minification shortcut
    Object.defineProperty(obj, propertyKey, {
      'configurable': true,
      'value': value
    });
  }
  function definePropertyGetterSetter(obj, propertyKey, get, set) {
    // minification shortcut
    Object.defineProperty(obj, propertyKey, {
      'configurable': true,
      'get': get,
      'set': set
    });
  }
  const WATCH_CB_PREFIX = 'wc-';
  function updateAttribute(elm, memberName, newValue) {
    const isXlinkNs = memberName !== (memberName = memberName.replace(/^xlink\:?/, ''));
    const isBooleanAttr = BOOLEAN_ATTRS[memberName];
    if (!isBooleanAttr || newValue && 'false' !== newValue) {
      if ('function' !== typeof newValue) {
        isBooleanAttr && (newValue = '');
        isXlinkNs ? elm.setAttributeNS(XLINK_NS$1, toLowerCase(memberName), newValue) : elm.setAttribute(memberName, newValue);
      }
    } else {
      isXlinkNs ? elm.removeAttributeNS(XLINK_NS$1, toLowerCase(memberName)) : elm.removeAttribute(memberName);
    }
  }
  const BOOLEAN_ATTRS = {
    'allowfullscreen': 1,
    'async': 1,
    'autofocus': 1,
    'autoplay': 1,
    'checked': 1,
    'controls': 1,
    'disabled': 1,
    'enabled': 1,
    'formnovalidate': 1,
    'hidden': 1,
    'multiple': 1,
    'noresize': 1,
    'readonly': 1,
    'required': 1,
    'selected': 1,
    'spellcheck': 1
  };
  const XLINK_NS$1 = 'http://www.w3.org/1999/xlink';
  function setAccessor(plt, elm, memberName, oldValue, newValue, isSvg, isHostElement, i, ilen) {
    if ('class' !== memberName || isSvg) {
      if ('style' === memberName) {
        // Style
        oldValue = oldValue || EMPTY_OBJ;
        newValue = newValue || EMPTY_OBJ;
        for (i in oldValue) {
          newValue[i] || (elm.style[i] = '');
        }
        for (i in newValue) {
          newValue[i] !== oldValue[i] && (elm.style[i] = newValue[i]);
        }
      } else if ('o' !== memberName[0] || 'n' !== memberName[1] || !/[A-Z]/.test(memberName[2]) || memberName in elm) {
        if ('list' !== memberName && 'type' !== memberName && !isSvg && (memberName in elm || -1 !== [ 'object', 'function' ].indexOf(typeof newValue) && null !== newValue) || false) {
          // Properties
          // - list and type are attributes that get applied as values on the element
          // - all svgs get values as attributes not props
          // - check if elm contains name or if the value is array, object, or function
          const cmpMeta = plt.getComponentMeta(elm);
          if (cmpMeta && cmpMeta.membersMeta && cmpMeta.membersMeta[memberName]) {
            // we know for a fact that this element is a known component
            // and this component has this member name as a property,
            // let's set the known @Prop on this element
            // set it directly as property on the element
            setProperty(elm, memberName, newValue);
            false;
          } else if ('ref' !== memberName) {
            // this member name is a property on this element, but it's not a component
            // this is a native property like "value" or something
            // also we can ignore the "ref" member name at this point
            setProperty(elm, memberName, null == newValue ? '' : newValue);
            null != newValue && false !== newValue || elm.removeAttribute(memberName);
          }
        } else {
          null != newValue ? 
          // Element Attributes
          updateAttribute(elm, memberName, newValue) : !isSvg || null != newValue && false !== newValue || 
          // remove svg attribute
          elm.removeAttribute(memberName);
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
        memberName = toLowerCase(memberName) in elm ? toLowerCase(memberName.substring(2)) : toLowerCase(memberName[2]) + memberName.substring(3);
        newValue ? newValue !== oldValue && 
        // add listener
        plt.domApi.$addEventListener(elm, memberName, newValue) : 
        // remove listener
        plt.domApi.$removeEventListener(elm, memberName);
      }
    } else 
    // Class
    if (oldValue !== newValue) {
      const oldList = null == oldValue || '' === oldValue ? EMPTY_ARR : oldValue.trim().split(/\s+/);
      const newList = null == newValue || '' === newValue ? EMPTY_ARR : newValue.trim().split(/\s+/);
      let classList = null == elm.className || '' === elm.className ? EMPTY_ARR : elm.className.trim().split(/\s+/);
      for (i = 0, ilen = oldList.length; i < ilen; i++) {
        -1 === newList.indexOf(oldList[i]) && (classList = classList.filter(c => c !== oldList[i]));
      }
      for (i = 0, ilen = newList.length; i < ilen; i++) {
        -1 === oldList.indexOf(newList[i]) && (classList = [ ...classList, newList[i] ]);
      }
      elm.className = classList.join(' ');
    }
  }
  /**
     * Attempt to set a DOM property to the given value.
     * IE & FF throw for certain property-value combinations.
     */  function setProperty(elm, name, value) {
    try {
      elm[name] = value;
    } catch (e) {}
  }
  function updateElement(plt, oldVnode, newVnode, isSvgMode, memberName) {
    // if the element passed in is a shadow root, which is a document fragment
    // then we want to be adding attrs/props to the shadow root's "host" element
    // if it's not a shadow root, then we add attrs/props to the same element
    const elm = 11 /* DocumentFragment */ === newVnode.elm.nodeType && newVnode.elm.host ? newVnode.elm.host : newVnode.elm;
    const oldVnodeAttrs = oldVnode && oldVnode.vattrs || EMPTY_OBJ;
    const newVnodeAttrs = newVnode.vattrs || EMPTY_OBJ;
    // remove attributes no longer present on the vnode by setting them to undefined
        for (memberName in oldVnodeAttrs) {
      newVnodeAttrs && null != newVnodeAttrs[memberName] || null == oldVnodeAttrs[memberName] || setAccessor(plt, elm, memberName, oldVnodeAttrs[memberName], void 0, isSvgMode, newVnode.ishost);
    }
    // add new & update changed attributes
        for (memberName in newVnodeAttrs) {
      memberName in oldVnodeAttrs && newVnodeAttrs[memberName] === ('value' === memberName || 'checked' === memberName ? elm[memberName] : oldVnodeAttrs[memberName]) || setAccessor(plt, elm, memberName, oldVnodeAttrs[memberName], newVnodeAttrs[memberName], isSvgMode, newVnode.ishost);
    }
  }
  let isSvgMode = false;
  function createRendererPatch(plt, domApi) {
    // createRenderer() is only created once per app
    // the patch() function which createRenderer() returned is the function
    // which gets called numerous times by each component
    function createElm(oldParentVNode, newParentVNode, childIndex, parentElm, i, elm, childNode, newVNode, oldVNode) {
      newVNode = newParentVNode.vchildren[childIndex];
      if (true, !useNativeShadowDom) {
        // remember for later we need to check to relocate nodes
        checkSlotRelocate = true;
        if ('slot' === newVNode.vtag) {
          scopeId && 
          // scoped css needs to add its scoped id to the parent element
          domApi.$setAttribute(parentElm, scopeId + '-slot', '');
          newVNode.vchildren ? 
          // slot element has fallback content
          // still create an element that "mocks" the slot element
          newVNode.isSlotFallback = true : 
          // slot element does not have fallback content
          // create an html comment we'll use to always reference
          // where actual slot content should sit next to
          newVNode.isSlotReference = true;
        }
      }
      if (isDef(newVNode.vtext)) {
        // create text node
        newVNode.elm = domApi.$createTextNode(newVNode.vtext);
      } else if (true, newVNode.isSlotReference) {
        // create a slot reference html text node
        newVNode.elm = domApi.$createTextNode('');
      } else {
        // create element
        elm = newVNode.elm = (true, isSvgMode || 'svg' === newVNode.vtag ? domApi.$createElementNS('http://www.w3.org/2000/svg', newVNode.vtag) : domApi.$createElement((true, 
        newVNode.isSlotFallback ? 'slot-fb' : newVNode.vtag)));
        true;
        isSvgMode = 'svg' === newVNode.vtag || 'foreignObject' !== newVNode.vtag && isSvgMode;
        // add css classes, attrs, props, listeners, etc.
        updateElement(plt, null, newVNode, isSvgMode);
        isDef(scopeId) && elm['s-si'] !== scopeId && 
        // if there is a scopeId and this is the initial render
        // then let's add the scopeId as an attribute
        domApi.$setAttribute(elm, elm['s-si'] = scopeId, '');
        false;
        if (newVNode.vchildren) {
          for (i = 0; i < newVNode.vchildren.length; ++i) {
            // create the node
            childNode = createElm(oldParentVNode, newVNode, i, elm);
            // return node could have been null
                        if (childNode) {
              false;
              // append our new node
              domApi.$appendChild(elm, childNode);
              false;
            }
          }
        }
        (true, 'svg' === newVNode.vtag) && (
        // Only reset the SVG context when we're exiting SVG element
        isSvgMode = false);
      }
      true;
      newVNode.elm['s-hn'] = hostTagName;
      if (newVNode.isSlotFallback || newVNode.isSlotReference) {
        // remember the content reference comment
        newVNode.elm['s-sr'] = true;
        // remember the content reference comment
                newVNode.elm['s-cr'] = contentRef;
        // remember the slot name, or empty string for default slot
                newVNode.elm['s-sn'] = newVNode.vname || '';
        // check if we've got an old vnode for this slot
                oldVNode = oldParentVNode && oldParentVNode.vchildren && oldParentVNode.vchildren[childIndex];
        oldVNode && oldVNode.vtag === newVNode.vtag && oldParentVNode.elm && 
        // we've got an old slot vnode and the wrapper is being replaced
        // so let's move the old slot content back to it's original location
        putBackInOriginalLocation(oldParentVNode.elm);
      }
      return newVNode.elm;
    }
    function putBackInOriginalLocation(parentElm, recursive, i, childNode) {
      plt.tmpDisconnected = true;
      const oldSlotChildNodes = domApi.$childNodes(parentElm);
      for (i = oldSlotChildNodes.length - 1; i >= 0; i--) {
        childNode = oldSlotChildNodes[i];
        if (childNode['s-hn'] !== hostTagName && childNode['s-ol']) {
          // this child node in the old element is from another component
          // remove this node from the old slot's parent
          domApi.$remove(childNode);
          // and relocate it back to it's original location
                    domApi.$insertBefore(parentReferenceNode(childNode), childNode, referenceNode(childNode));
          // remove the old original location comment entirely
          // later on the patch function will know what to do
          // and move this to the correct spot in need be
                    domApi.$remove(childNode['s-ol']);
          childNode['s-ol'] = null;
          checkSlotRelocate = true;
        }
        recursive && putBackInOriginalLocation(childNode, recursive);
      }
      plt.tmpDisconnected = false;
    }
    function addVnodes(parentElm, before, parentVNode, vnodes, startIdx, endIdx, containerElm, childNode) {
      // $defaultHolder deprecated 2018-04-02
      const contentRef = parentElm['s-cr'] || parentElm.$defaultHolder;
      containerElm = contentRef && domApi.$parentNode(contentRef) || parentElm;
      containerElm.shadowRoot && (containerElm = containerElm.shadowRoot);
      for (;startIdx <= endIdx; ++startIdx) {
        if (vnodes[startIdx]) {
          childNode = isDef(vnodes[startIdx].vtext) ? domApi.$createTextNode(vnodes[startIdx].vtext) : createElm(null, parentVNode, startIdx, parentElm);
          if (childNode) {
            vnodes[startIdx].elm = childNode;
            domApi.$insertBefore(containerElm, childNode, referenceNode(before));
          }
        }
      }
    }
    function removeVnodes(vnodes, startIdx, endIdx, node) {
      for (;startIdx <= endIdx; ++startIdx) {
        if (isDef(vnodes[startIdx])) {
          node = vnodes[startIdx].elm;
          true;
          // we're removing this element
          // so it's possible we need to show slot fallback content now
          checkSlotFallbackVisibility = true;
          node['s-ol'] ? 
          // remove the original location comment
          domApi.$remove(node['s-ol']) : 
          // it's possible that child nodes of the node
          // that's being removed are slot nodes
          putBackInOriginalLocation(node, true);
          // remove the vnode's element from the dom
          domApi.$remove(node);
        }
      }
    }
    function updateChildren(parentElm, oldCh, newVNode, newCh, idxInOld, i, node, elmToMove) {
      let oldStartIdx = 0, newStartIdx = 0;
      let oldEndIdx = oldCh.length - 1;
      let oldStartVnode = oldCh[0];
      let oldEndVnode = oldCh[oldEndIdx];
      let newEndIdx = newCh.length - 1;
      let newStartVnode = newCh[0];
      let newEndVnode = newCh[newEndIdx];
      while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
        if (null == oldStartVnode) {
          // Vnode might have been moved left
          oldStartVnode = oldCh[++oldStartIdx];
        } else if (null == oldEndVnode) {
          oldEndVnode = oldCh[--oldEndIdx];
        } else if (null == newStartVnode) {
          newStartVnode = newCh[++newStartIdx];
        } else if (null == newEndVnode) {
          newEndVnode = newCh[--newEndIdx];
        } else if (isSameVnode(oldStartVnode, newStartVnode)) {
          patchVNode(oldStartVnode, newStartVnode);
          oldStartVnode = oldCh[++oldStartIdx];
          newStartVnode = newCh[++newStartIdx];
        } else if (isSameVnode(oldEndVnode, newEndVnode)) {
          patchVNode(oldEndVnode, newEndVnode);
          oldEndVnode = oldCh[--oldEndIdx];
          newEndVnode = newCh[--newEndIdx];
        } else if (isSameVnode(oldStartVnode, newEndVnode)) {
          // Vnode moved right
          'slot' !== oldStartVnode.vtag && 'slot' !== newEndVnode.vtag || putBackInOriginalLocation(domApi.$parentNode(oldStartVnode.elm));
          patchVNode(oldStartVnode, newEndVnode);
          domApi.$insertBefore(parentElm, oldStartVnode.elm, domApi.$nextSibling(oldEndVnode.elm));
          oldStartVnode = oldCh[++oldStartIdx];
          newEndVnode = newCh[--newEndIdx];
        } else if (isSameVnode(oldEndVnode, newStartVnode)) {
          // Vnode moved left
          'slot' !== oldStartVnode.vtag && 'slot' !== newEndVnode.vtag || putBackInOriginalLocation(domApi.$parentNode(oldEndVnode.elm));
          patchVNode(oldEndVnode, newStartVnode);
          domApi.$insertBefore(parentElm, oldEndVnode.elm, oldStartVnode.elm);
          oldEndVnode = oldCh[--oldEndIdx];
          newStartVnode = newCh[++newStartIdx];
        } else {
          // createKeyToOldIdx
          idxInOld = null;
          for (i = oldStartIdx; i <= oldEndIdx; ++i) {
            if (oldCh[i] && isDef(oldCh[i].vkey) && oldCh[i].vkey === newStartVnode.vkey) {
              idxInOld = i;
              break;
            }
          }
          if (isDef(idxInOld)) {
            elmToMove = oldCh[idxInOld];
            if (elmToMove.vtag !== newStartVnode.vtag) {
              node = createElm(oldCh && oldCh[newStartIdx], newVNode, idxInOld, parentElm);
            } else {
              patchVNode(elmToMove, newStartVnode);
              oldCh[idxInOld] = void 0;
              node = elmToMove.elm;
            }
            newStartVnode = newCh[++newStartIdx];
          } else {
            // new element
            node = createElm(oldCh && oldCh[newStartIdx], newVNode, newStartIdx, parentElm);
            newStartVnode = newCh[++newStartIdx];
          }
          node && domApi.$insertBefore(parentReferenceNode(oldStartVnode.elm), node, referenceNode(oldStartVnode.elm));
        }
      }
      oldStartIdx > oldEndIdx ? addVnodes(parentElm, null == newCh[newEndIdx + 1] ? null : newCh[newEndIdx + 1].elm, newVNode, newCh, newStartIdx, newEndIdx) : newStartIdx > newEndIdx && removeVnodes(oldCh, oldStartIdx, oldEndIdx);
    }
    function isSameVnode(vnode1, vnode2) {
      // compare if two vnode to see if they're "technically" the same
      // need to have the same element tag, and same key to be the same
      if (vnode1.vtag === vnode2.vtag && vnode1.vkey === vnode2.vkey) {
        true;
        if ('slot' === vnode1.vtag) {
          return vnode1.vname === vnode2.vname;
        }
        return true;
      }
      return false;
    }
    function referenceNode(node) {
      true;
      if (node && node['s-ol']) {
        // this node was relocated to a new location in the dom
        // because of some other component's slot
        // but we still have an html comment in place of where
        // it's original location was according to it's original vdom
        return node['s-ol'];
      }
      return node;
    }
    function parentReferenceNode(node) {
      return domApi.$parentNode(node['s-ol'] ? node['s-ol'] : node);
    }
    function patchVNode(oldVNode, newVNode, defaultHolder) {
      const elm = newVNode.elm = oldVNode.elm;
      const oldChildren = oldVNode.vchildren;
      const newChildren = newVNode.vchildren;
      true;
      // test if we're rendering an svg element, or still rendering nodes inside of one
      // only add this to the when the compiler sees we're using an svg somewhere
      isSvgMode = newVNode.elm && isDef(domApi.$parentElement(newVNode.elm)) && void 0 !== newVNode.elm.ownerSVGElement;
      isSvgMode = 'svg' === newVNode.vtag || 'foreignObject' !== newVNode.vtag && isSvgMode;
      if (isDef(newVNode.vtext)) {
        true, (defaultHolder = elm['s-cr'] || elm.$defaultHolder /* $defaultHolder deprecated 2018-04-02 */) ? 
        // this element has slotted content
        domApi.$setTextContent(domApi.$parentNode(defaultHolder), newVNode.vtext) : oldVNode.vtext !== newVNode.vtext && 
        // update the text content for the text only vnode
        // and also only if the text is different than before
        domApi.$setTextContent(elm, newVNode.vtext);
      } else {
        // element node
        'slot' !== newVNode.vtag && 
        // either this is the first render of an element OR it's an update
        // AND we already know it's possible it could have changed
        // this updates the element's css classes, attrs, props, listeners, etc.
        updateElement(plt, oldVNode, newVNode, isSvgMode);
        if (isDef(oldChildren) && isDef(newChildren)) {
          // looks like there's child vnodes for both the old and new vnodes
          updateChildren(elm, oldChildren, newVNode, newChildren);
        } else if (isDef(newChildren)) {
          // no old child vnodes, but there are new child vnodes to add
          isDef(oldVNode.vtext) && 
          // the old vnode was text, so be sure to clear it out
          domApi.$setTextContent(elm, '');
          // add the new vnode children
                    addVnodes(elm, null, newVNode, newChildren, 0, newChildren.length - 1);
        } else {
          isDef(oldChildren) && 
          // no new child vnodes, but there are old child vnodes to remove
          removeVnodes(oldChildren, 0, oldChildren.length - 1);
        }
      }
      true;
      // reset svgMode when svg node is fully patched
      isSvgMode && 'svg' === newVNode.vtag && (isSvgMode = false);
    }
    function updateFallbackSlotVisibility(elm, childNode, childNodes, i, ilen, j, slotNameAttr, nodeType) {
      childNodes = domApi.$childNodes(elm);
      for (i = 0, ilen = childNodes.length; i < ilen; i++) {
        childNode = childNodes[i];
        if (1 /* ElementNode */ === domApi.$nodeType(childNode)) {
          if (childNode['s-sr']) {
            // this is a slot fallback node
            // get the slot name for this slot reference node
            slotNameAttr = childNode['s-sn'];
            // by default always show a fallback slot node
            // then hide it if there are other slots in the light dom
                        childNode.hidden = false;
            for (j = 0; j < ilen; j++) {
              if (childNodes[j]['s-hn'] !== childNode['s-hn']) {
                // this sibling node is from a different component
                nodeType = domApi.$nodeType(childNodes[j]);
                if ('' !== slotNameAttr) {
                  // this is a named fallback slot node
                  if (1 /* ElementNode */ === nodeType && slotNameAttr === domApi.$getAttribute(childNodes[j], 'slot')) {
                    childNode.hidden = true;
                    break;
                  }
                } else 
                // this is a default fallback slot node
                // any element or text node (with content)
                // should hide the default fallback slot node
                if (1 /* ElementNode */ === nodeType || 3 /* TextNode */ === nodeType && '' !== domApi.$getTextContent(childNodes[j]).trim()) {
                  childNode.hidden = true;
                  break;
                }
              }
            }
          }
          // keep drilling down
                    updateFallbackSlotVisibility(childNode);
        }
      }
    }
    const relocateNodes = [];
    function relocateSlotContent(elm, childNodes, childNode, node, i, ilen, j, hostContentNodes, slotNameAttr, nodeType) {
      childNodes = domApi.$childNodes(elm);
      for (i = 0, ilen = childNodes.length; i < ilen; i++) {
        childNode = childNodes[i];
        if (childNode['s-sr'] && (node = childNode['s-cr'])) {
          // first got the content reference comment node
          // then we got it's parent, which is where all the host content is in now
          hostContentNodes = domApi.$childNodes(domApi.$parentNode(node));
          slotNameAttr = childNode['s-sn'];
          for (j = hostContentNodes.length - 1; j >= 0; j--) {
            node = hostContentNodes[j];
            if (!node['s-cn'] && !node['s-nr'] && node['s-hn'] !== childNode['s-hn']) {
              // let's do some relocating to its new home
              // but never relocate a content reference node
              // that is suppose to always represent the original content location
              nodeType = domApi.$nodeType(node);
              if (((3 /* TextNode */ === nodeType || 8 /* CommentNode */ === nodeType) && '' === slotNameAttr || 1 /* ElementNode */ === nodeType && null === domApi.$getAttribute(node, 'slot') && '' === slotNameAttr || 1 /* ElementNode */ === nodeType && domApi.$getAttribute(node, 'slot') === slotNameAttr) && !relocateNodes.some(r => r.nodeToRelocate === node)) {
                // made some changes to slots
                // let's make sure we also double check
                // fallbacks are correctly hidden or shown
                checkSlotFallbackVisibility = true;
                node['s-sn'] = slotNameAttr;
                // add to our list of nodes to relocate
                                relocateNodes.push({
                  slotRefNode: childNode,
                  nodeToRelocate: node
                });
              }
            }
          }
        }
        1 /* ElementNode */ === domApi.$nodeType(childNode) && relocateSlotContent(childNode);
      }
    }
    // internal variables to be reused per patch() call
        let useNativeShadowDom, scopeId, isUpdate, checkSlotFallbackVisibility, checkSlotRelocate, hostTagName, contentRef;
    return function patch(oldVNode, newVNode, isUpdatePatch, encapsulation, ssrPatchId, i, relocateNode, orgLocationNode, refNode) {
      // patchVNode() is synchronous
      // so it is safe to set these variables and internally
      // the same patch() call will reference the same data
      isUpdate = isUpdatePatch;
      hostTagName = domApi.$tagName(oldVNode.elm);
      contentRef = oldVNode.elm['s-cr'];
      false;
      true;
      // get the scopeId
      scopeId = 'scoped' === encapsulation || 'shadow' === encapsulation && !domApi.$supportsShadowDom ? 'data-' + domApi.$tagName(oldVNode.elm) : null;
      // always reset
            checkSlotRelocate = checkSlotFallbackVisibility = false;
      false;
      if (!isUpdate) {
        false;
        (true, scopeId) && 
        // this host element should use scoped css
        // add the scope attribute to the host
        domApi.$setAttribute(oldVNode.elm, scopeId + '-host', '');
      }
      // synchronous patch
            patchVNode(oldVNode, newVNode);
      false;
      true;
      if (checkSlotRelocate) {
        relocateSlotContent(newVNode.elm);
        for (i = 0; i < relocateNodes.length; i++) {
          relocateNode = relocateNodes[i];
          if (!relocateNode.nodeToRelocate['s-ol']) {
            // add a reference node marking this node's original location
            // keep a reference to this node for later lookups
            orgLocationNode = domApi.$createTextNode('');
            orgLocationNode['s-nr'] = relocateNode.nodeToRelocate;
            domApi.$insertBefore(domApi.$parentNode(relocateNode.nodeToRelocate), relocateNode.nodeToRelocate['s-ol'] = orgLocationNode, relocateNode.nodeToRelocate);
          }
        }
        // while we're moving nodes around existing nodes, temporarily disable
        // the disconnectCallback from working
                plt.tmpDisconnected = true;
        for (i = 0; i < relocateNodes.length; i++) {
          relocateNode = relocateNodes[i];
          // by default we're just going to insert it directly
          // after the slot reference node
                    const parentNodeRef = domApi.$parentNode(relocateNode.slotRefNode);
          let insertBeforeNode = domApi.$nextSibling(relocateNode.slotRefNode);
          orgLocationNode = relocateNode.nodeToRelocate['s-ol'];
          while (orgLocationNode = domApi.$previousSibling(orgLocationNode)) {
            refNode = orgLocationNode['s-nr'];
            if (refNode && refNode['s-sn'] === relocateNode.nodeToRelocate['s-sn'] && parentNodeRef === domApi.$parentNode(refNode)) {
              insertBeforeNode = domApi.$nextSibling(refNode);
              break;
            }
          }
          if ((!insertBeforeNode && parentNodeRef !== domApi.$parentNode(relocateNode.nodeToRelocate) || domApi.$nextSibling(relocateNode.nodeToRelocate) !== insertBeforeNode) && relocateNode.nodeToRelocate !== insertBeforeNode) {
            // remove the node from the dom
            domApi.$remove(relocateNode.nodeToRelocate);
            // add it back to the dom but in its new home
                        domApi.$insertBefore(parentNodeRef, relocateNode.nodeToRelocate, insertBeforeNode);
          }
        }
        // done moving nodes around
        // allow the disconnect callback to work again
                plt.tmpDisconnected = false;
      }
      checkSlotFallbackVisibility && updateFallbackSlotVisibility(newVNode.elm);
      // always reset
            relocateNodes.length = 0;
      // return our new vnode
      return newVNode;
    };
  }
  function callNodeRefs(vNode, isDestroy) {
    if (vNode) {
      vNode.vattrs && vNode.vattrs.ref && vNode.vattrs.ref(isDestroy ? null : vNode.elm);
      vNode.vchildren && vNode.vchildren.forEach(vChild => {
        callNodeRefs(vChild, isDestroy);
      });
    }
  }
  function createVNodesFromSsr(plt, domApi, rootElm) {
    const allSsrElms = rootElm.querySelectorAll(`[${SSR_VNODE_ID}]`);
    const ilen = allSsrElms.length;
    let elm, ssrVNodeId, ssrVNode, i, j, jlen;
    if (ilen > 0) {
      plt.hasLoadedMap.set(rootElm, true);
      for (i = 0; i < ilen; i++) {
        elm = allSsrElms[i];
        ssrVNodeId = domApi.$getAttribute(elm, SSR_VNODE_ID);
        ssrVNode = {};
        ssrVNode.vtag = domApi.$tagName(ssrVNode.elm = elm);
        plt.vnodeMap.set(elm, ssrVNode);
        for (j = 0, jlen = elm.childNodes.length; j < jlen; j++) {
          addChildSsrVNodes(domApi, elm.childNodes[j], ssrVNode, ssrVNodeId, true);
        }
      }
    }
  }
  function addChildSsrVNodes(domApi, node, parentVNode, ssrVNodeId, checkNestedElements) {
    const nodeType = domApi.$nodeType(node);
    let previousComment;
    let childVNodeId, childVNodeSplt, childVNode;
    if (checkNestedElements && 1 /* ElementNode */ === nodeType) {
      childVNodeId = domApi.$getAttribute(node, SSR_CHILD_ID);
      if (childVNodeId) {
        // split the start comment's data with a period
        childVNodeSplt = childVNodeId.split('.');
        // ensure this this element is a child element of the ssr vnode
                if (childVNodeSplt[0] === ssrVNodeId) {
          // cool, this element is a child to the parent vnode
          childVNode = {};
          childVNode.vtag = domApi.$tagName(childVNode.elm = node);
          // this is a new child vnode
          // so ensure its parent vnode has the vchildren array
                    parentVNode.vchildren || (parentVNode.vchildren = []);
          // add our child vnode to a specific index of the vnode's children
                    parentVNode.vchildren[childVNodeSplt[1]] = childVNode;
          // this is now the new parent vnode for all the next child checks
                    parentVNode = childVNode;
          // if there's a trailing period, then it means there aren't any
          // more nested elements, but maybe nested text nodes
          // either way, don't keep walking down the tree after this next call
                    checkNestedElements = '' !== childVNodeSplt[2];
        }
      }
      // keep drilling down through the elements
            for (let i = 0; i < node.childNodes.length; i++) {
        addChildSsrVNodes(domApi, node.childNodes[i], parentVNode, ssrVNodeId, checkNestedElements);
      }
    } else if (3 /* TextNode */ === nodeType && (previousComment = node.previousSibling) && 8 /* CommentNode */ === domApi.$nodeType(previousComment)) {
      // split the start comment's data with a period
      childVNodeSplt = domApi.$getTextContent(previousComment).split('.');
      // ensure this is an ssr text node start comment
      // which should start with an "s" and delimited by periods
            if ('s' === childVNodeSplt[0] && childVNodeSplt[1] === ssrVNodeId) {
        // cool, this is a text node and it's got a start comment
        childVNode = {
          vtext: domApi.$getTextContent(node)
        };
        childVNode.elm = node;
        // this is a new child vnode
        // so ensure its parent vnode has the vchildren array
                parentVNode.vchildren || (parentVNode.vchildren = []);
        // add our child vnode to a specific index of the vnode's children
                parentVNode.vchildren[childVNodeSplt[2]] = childVNode;
      }
    }
  }
  function createQueueClient(App, win) {
    const now = () => win.performance.now();
    const resolved = Promise.resolve();
    const highPriority = [];
    const domReads = [];
    const domWrites = [];
    const domWritesLow = [];
    let congestion = 0;
    let rafPending = false;
    App.raf || (App.raf = win.requestAnimationFrame.bind(win));
    function consume(queue) {
      for (let i = 0; i < queue.length; i++) {
        try {
          queue[i]();
        } catch (e) {
          console.error(e);
        }
      }
      queue.length = 0;
    }
    function consumeTimeout(queue, timeout) {
      let i = 0;
      while (i < queue.length && now() < timeout) {
        try {
          queue[i++]();
        } catch (e) {
          console.error(e);
        }
      }
      i === queue.length ? queue.length = 0 : 0 !== i && queue.splice(0, i);
    }
    function flush() {
      congestion++;
      // always force a bunch of medium callbacks to run, but still have
      // a throttle on how many can run in a certain time
      // DOM READS!!!
            consume(domReads);
      const start = now() + 7 * Math.ceil(congestion * (1 / 22));
      // DOM WRITES!!!
            consumeTimeout(domWrites, start);
      consumeTimeout(domWritesLow, start);
      if (domWrites.length > 0) {
        domWritesLow.push(...domWrites);
        domWrites.length = 0;
      }
      (rafPending = domReads.length + domWrites.length + domWritesLow.length > 0) ? 
      // still more to do yet, but we've run out of time
      // let's let this thing cool off and try again in the next tick
      App.raf(flush) : congestion = 0;
    }
    return {
      tick(cb) {
        // queue high priority work to happen in next tick
        // uses Promise.resolve() for next tick
        highPriority.push(cb);
        1 === highPriority.length && resolved.then(() => consume(highPriority));
      },
      read(cb) {
        // queue dom reads
        domReads.push(cb);
        if (!rafPending) {
          rafPending = true;
          App.raf(flush);
        }
      },
      write(cb) {
        // queue dom writes
        domWrites.push(cb);
        if (!rafPending) {
          rafPending = true;
          App.raf(flush);
        }
      }
    };
  }
  function initElementListeners(plt, elm) {
    // so the element was just connected, which means it's in the DOM
    // however, the component instance hasn't been created yet
    // but what if an event it should be listening to get emitted right now??
    // let's add our listeners right now to our element, and if it happens
    // to receive events between now and the instance being created let's
    // queue up all of the event data and fire it off on the instance when it's ready
    const cmpMeta = plt.getComponentMeta(elm);
    cmpMeta.listenersMeta && 
    // we've got listens
    cmpMeta.listenersMeta.forEach(listenMeta => {
      // go through each listener
      listenMeta.eventDisabled || 
      // only add ones that are not already disabled
      plt.domApi.$addEventListener(elm, listenMeta.eventName, createListenerCallback(plt, elm, listenMeta.eventMethodName), listenMeta.eventCapture, listenMeta.eventPassive);
    });
  }
  function createListenerCallback(plt, elm, eventMethodName, val) {
    // create the function that gets called when the element receives
    // an event which it should be listening for
    return ev => {
      // get the instance if it exists
      val = plt.instanceMap.get(elm);
      if (val) {
        // instance is ready, let's call it's member method for this event
        val[eventMethodName](ev);
      } else {
        // instance is not ready!!
        // let's queue up this event data and replay it later
        // when the instance is ready
        val = plt.queuedEvents.get(elm) || [];
        val.push(eventMethodName, ev);
        plt.queuedEvents.set(elm, val);
      }
    };
  }
  function enableEventListener(plt, instance, eventName, shouldEnable, attachTo, passive) {
    if (instance) {
      // cool, we've got an instance, it's get the element it's on
      const elm = plt.hostElementMap.get(instance);
      const cmpMeta = plt.getComponentMeta(elm);
      if (cmpMeta && cmpMeta.listenersMeta) {
        // alrighty, so this cmp has listener meta
        if (shouldEnable) {
          // we want to enable this event
          // find which listen meta we're talking about
          const listenMeta = cmpMeta.listenersMeta.find(l => l.eventName === eventName);
          listenMeta && 
          // found the listen meta, so let's add the listener
          plt.domApi.$addEventListener(elm, eventName, ev => instance[listenMeta.eventMethodName](ev), listenMeta.eventCapture, void 0 === passive ? listenMeta.eventPassive : !!passive, attachTo);
        } else {
          // we're disabling the event listener
          // so let's just remove it entirely
          plt.domApi.$removeEventListener(elm, eventName);
        }
      }
    }
  }
  function generateDevInspector(App, namespace, win, plt) {
    const devInspector = win.devInspector = win.devInspector || {};
    devInspector.apps = devInspector.apps || [];
    devInspector.apps.push(generateDevInspectorApp(App, namespace, plt));
    devInspector.getInstance || (devInspector.getInstance = (elm => {
      return Promise.all(devInspector.apps.map(app => {
        return app.getInstance(elm);
      })).then(results => {
        return results.find(instance => !!instance);
      });
    }));
    devInspector.getComponents || (devInspector.getComponents = (() => {
      const appsMetadata = [];
      devInspector.apps.forEach(app => {
        appsMetadata.push(app.getComponents());
      });
      return Promise.all(appsMetadata).then(appMetadata => {
        const allMetadata = [];
        appMetadata.forEach(metadata => {
          metadata.forEach(m => {
            allMetadata.push(m);
          });
        });
        return allMetadata;
      });
    }));
    return devInspector;
  }
  function generateDevInspectorApp(App, namespace, plt) {
    const app = {
      namespace: namespace,
      getInstance: elm => {
        if (elm && elm.tagName) {
          return Promise.all([ getComponentMeta(plt, elm.tagName), getComponentInstance(plt, elm) ]).then(results => {
            if (results[0] && results[1]) {
              const cmp = {
                meta: results[0],
                instance: results[1]
              };
              return cmp;
            }
            return null;
          });
        }
        return Promise.resolve(null);
      },
      getComponent: tagName => {
        return getComponentMeta(plt, tagName);
      },
      getComponents: () => {
        return Promise.all(App.components.map(cmp => {
          return getComponentMeta(plt, cmp[0]);
        })).then(metadata => {
          return metadata.filter(m => m);
        });
      }
    };
    return app;
  }
  function getMembersMeta(properties) {
    return Object.keys(properties).reduce((membersMap, memberKey) => {
      const prop = properties[memberKey];
      let category;
      const member = {
        name: memberKey
      };
      if (prop.state) {
        category = 'states';
        member.watchers = prop.watchCallbacks || [];
      } else if (prop.elementRef) {
        category = 'elements';
      } else if (prop.method) {
        category = 'methods';
      } else {
        category = 'props';
        let type = 'any';
        if (prop.type) {
          type = prop.type;
          'function' === typeof prop.type && (type = prop.type.name);
        }
        member.type = type.toLowerCase();
        member.mutable = prop.mutable || false;
        member.connect = prop.connect || '-';
        member.context = prop.connect || '-';
        member.watchers = prop.watchCallbacks || [];
      }
      membersMap[category].push(member);
      return membersMap;
    }, {
      props: [],
      states: [],
      elements: [],
      methods: []
    });
  }
  function getComponentMeta(plt, tagName) {
    const elm = {
      tagName: tagName
    };
    const internalMeta = plt.getComponentMeta(elm);
    if (!internalMeta || !internalMeta.componentConstructor) {
      return Promise.resolve(null);
    }
    const cmpCtr = internalMeta.componentConstructor;
    const members = getMembersMeta(cmpCtr.properties || {});
    const listeners = (internalMeta.listenersMeta || []).map(listenerMeta => {
      return {
        event: listenerMeta.eventName,
        capture: listenerMeta.eventCapture,
        disabled: listenerMeta.eventDisabled,
        passive: listenerMeta.eventPassive,
        method: listenerMeta.eventMethodName
      };
    });
    const emmiters = cmpCtr.events || [];
    const meta = Object.assign({
      tag: cmpCtr.is,
      bundle: internalMeta.bundleIds || 'unknown',
      encapsulation: cmpCtr.encapsulation || 'none'
    }, members, {
      events: {
        emmiters: emmiters,
        listeners: listeners
      }
    });
    return Promise.resolve(meta);
  }
  function getComponentInstance(plt, elm) {
    return Promise.resolve(plt.instanceMap.get(elm));
  }
  function initCoreComponentOnReady(plt, App) {
    // create the function the HTMLElement.prototype.componentOnReady will end up calling
    App.componentOnReady = ((elm, resolve) => {
      if (plt.getComponentMeta(elm) && !plt.hasLoadedMap.has(elm)) {
        // this is a known component and the
        // host element hasn't finished loading yet
        const onReadyCallbacks = plt.onReadyCallbacksMap.get(elm) || [];
        onReadyCallbacks.push(resolve);
        plt.onReadyCallbacksMap.set(elm, onReadyCallbacks);
      } else {
        // either the host element has already loaded
        // or it's not even a component
        resolve(elm);
      }
    });
    // drain the queue that could have been filled up before the core fully loaded
        App.$r && App.$r.forEach(r => App.componentOnReady(r[0], r[1]));
    // remove the queue now that the core file has initialized
        App.$r = null;
  }
  function attributeChangedCallback(membersMeta, elm, attribName, oldVal, newVal, propName, memberMeta) {
    // only react if the attribute values actually changed
    if (membersMeta && oldVal !== newVal) {
      // using the known component meta data
      // look up to see if we have a property wired up to this attribute name
      for (propName in membersMeta) {
        memberMeta = membersMeta[propName];
        // normalize the attribute name w/ lower case
                if (memberMeta.attribName && toLowerCase(memberMeta.attribName) === toLowerCase(attribName)) {
          // cool we've got a prop using this attribute name, the value will
          // be a string, so let's convert it to the correct type the app wants
          elm[propName] = parsePropertyValue(memberMeta.propType, newVal);
          break;
        }
      }
    }
  }
  function useShadowDom(supportsNativeShadowDom, cmpMeta) {
    return supportsNativeShadowDom && 1 /* ShadowDom */ === cmpMeta.encapsulation;
  }
  function useScopedCss(supportsNativeShadowDom, cmpMeta) {
    if (2 /* ScopedCss */ === cmpMeta.encapsulation) {
      return true;
    }
    if (1 /* ShadowDom */ === cmpMeta.encapsulation && !supportsNativeShadowDom) {
      return true;
    }
    return false;
  }
  function initHostSnapshot(domApi, cmpMeta, elm, hostSnapshot, attribName) {
    true;
    // host element has been connected to the DOM
    if (!elm['s-cr'] && !domApi.$getAttribute(elm, SSR_VNODE_ID) && !useShadowDom(domApi.$supportsShadowDom, cmpMeta)) {
      // only required when we're NOT using native shadow dom (slot)
      // this host element was NOT created with SSR
      // let's pick out the inner content for slot projection
      // create a node to represent where the original
      // content was first placed, which is useful later on
      elm['s-cr'] = domApi.$createTextNode('');
      elm['s-cr']['s-cn'] = true;
      domApi.$insertBefore(elm, elm['s-cr'], domApi.$childNodes(elm)[0]);
    }
    if (!domApi.$supportsShadowDom && 1 /* ShadowDom */ === cmpMeta.encapsulation) {
      true, true;
      // it's possible we're manually forcing the slot polyfill
      // but this browser may already support the read-only shadowRoot
      // do an extra check here, but only for dev mode on the client
      'shadowRoot' in HTMLElement.prototype || (elm.shadowRoot = elm);
    }
    hostSnapshot = {
      $id: elm['s-id'],
      $attributes: {}
    };
    cmpMeta.membersMeta && Object.keys(cmpMeta.membersMeta).forEach(memberName => {
      (attribName = cmpMeta.membersMeta[memberName].attribName) && (hostSnapshot.$attributes[attribName] = domApi.$getAttribute(elm, attribName));
    });
    return hostSnapshot;
  }
  function connectedCallback(plt, cmpMeta, elm) {
    true;
    // initialize our event listeners on the host element
    // we do this now so that we can listening to events that may
    // have fired even before the instance is ready
    if (!plt.hasListenersMap.has(elm)) {
      // it's possible we've already connected
      // then disconnected
      // and the same element is reconnected again
      plt.hasListenersMap.set(elm, true);
      initElementListeners(plt, elm);
    }
    // this element just connected, which may be re-connecting
    // ensure we remove it from our map of disconnected
    plt.isDisconnectedMap.delete(elm);
    if (!plt.hasConnectedMap.has(elm)) {
      // first time we've connected
      plt.hasConnectedMap.set(elm, true);
      elm['s-id'] || (
      // assign a unique id to this host element
      // it's possible this was already given an element id
      elm['s-id'] = plt.nextId());
      // register this component as an actively
      // loading child to its parent component
            registerWithParentComponent(plt, elm);
      // add to the queue to load the bundle
      // it's important to have an async tick in here so we can
      // ensure the "mode" attribute has been added to the element
      // place in high priority since it's not much work and we need
      // to know as fast as possible, but still an async tick in between
            plt.queue.tick(() => 
      // start loading this component mode's bundle
      // if it's already loaded then the callback will be synchronous
      plt.requestBundle(cmpMeta, elm, initHostSnapshot(plt.domApi, cmpMeta, elm)));
    }
  }
  function registerWithParentComponent(plt, elm, ancestorHostElement) {
    // find the first ancestor host element (if there is one) and register
    // this element as one of the actively loading child elements for its ancestor
    ancestorHostElement = elm;
    while (ancestorHostElement = plt.domApi.$parentElement(ancestorHostElement)) {
      // climb up the ancestors looking for the first registered component
      if (plt.isDefinedComponent(ancestorHostElement)) {
        // we found this elements the first ancestor host element
        // if the ancestor already loaded then do nothing, it's too late
        if (!plt.hasLoadedMap.has(elm)) {
          // keep a reference to this element's ancestor host element
          // elm._ancestorHostElement = ancestorHostElement;
          plt.ancestorHostElementMap.set(elm, ancestorHostElement);
          // ensure there is an array to contain a reference to each of the child elements
          // and set this element as one of the ancestor's child elements it should wait on
                    ancestorHostElement.$activeLoading && (
          // $activeLoading deprecated 2018-04-02
          ancestorHostElement['s-ld'] = ancestorHostElement.$activeLoading);
          (ancestorHostElement['s-ld'] = ancestorHostElement['s-ld'] || []).push(elm);
        }
        break;
      }
    }
  }
  function disconnectedCallback(plt, elm, instance) {
    // only disconnect if we're not temporarily disconnected
    // tmpDisconnected will happen when slot nodes are being relocated
    if (!plt.tmpDisconnected && isDisconnected(plt.domApi, elm)) {
      // ok, let's officially destroy this thing
      // set this to true so that any of our pending async stuff
      // doesn't continue since we already decided to destroy this node
      // elm._hasDestroyed = true;
      plt.isDisconnectedMap.set(elm, true);
      // double check that we've informed the ancestor host elements
      // that they're good to go and loaded (cuz this one is on its way out)
            propagateComponentLoaded(plt, elm);
      // since we're disconnecting, call all of the JSX ref's with null
            callNodeRefs(plt.vnodeMap.get(elm), true);
      // detatch any event listeners that may have been added
      // because we're not passing an exact event name it'll
      // remove all of this element's event, which is good
            plt.domApi.$removeEventListener(elm);
      plt.hasListenersMap.delete(elm);
      true;
      // call instance componentDidUnload
      // if we've created an instance for this
      instance = plt.instanceMap.get(elm);
      instance && 
      // call the user's componentDidUnload if there is one
      instance.componentDidUnload && instance.componentDidUnload();
      // clear any references to other elements
      // more than likely we've already deleted these references
      // but let's double check there pal
      [ plt.ancestorHostElementMap, plt.onReadyCallbacksMap, plt.hostSnapshotMap ].forEach(wm => wm.delete(elm));
    }
  }
  function isDisconnected(domApi, elm) {
    while (elm) {
      if (!domApi.$parentNode(elm)) {
        return 9 /* DocumentNode */ !== domApi.$nodeType(elm);
      }
      elm = domApi.$parentNode(elm);
    }
  }
  function proxyHostElementPrototype(plt, membersMeta, hostPrototype) {
    false;
    membersMeta && Object.keys(membersMeta).forEach(memberName => {
      // add getters/setters
      const member = membersMeta[memberName];
      const memberType = member.memberType;
      1 /* Prop */ === memberType || 2 /* PropMutable */ === memberType ? 
      // @Prop() or @Prop({ mutable: true })
      definePropertyGetterSetter(hostPrototype, memberName, function getHostElementProp() {
        // host element getter (cannot be arrow fn)
        // yup, ugly, srynotsry
        return (plt.valuesMap.get(this) || {})[memberName];
      }, function setHostElementProp(newValue) {
        // host element setter (cannot be arrow fn)
        setValue(plt, this, memberName, parsePropertyValue(member.propType, newValue));
      }) : 6 /* Method */ === memberType && 
      // @Method()
      // add a placeholder noop value on the host element's prototype
      // incase this method gets called before setup
      definePropertyValue(hostPrototype, memberName, noop);
    });
  }
  function initHostElement(plt, cmpMeta, HostElementConstructor, hydratedCssClass) {
    // let's wire up our functions to the host element's prototype
    // we can also inject our platform into each one that needs that api
    // note: these cannot be arrow functions cuz "this" is important here hombre
    HostElementConstructor.connectedCallback = function() {
      // coolsville, our host element has just hit the DOM
      connectedCallback(plt, cmpMeta, this);
    };
    true;
    HostElementConstructor.attributeChangedCallback = function(attribName, oldVal, newVal) {
      // the browser has just informed us that an attribute
      // on the host element has changed
      attributeChangedCallback(cmpMeta.membersMeta, this, attribName, oldVal, newVal);
    };
    HostElementConstructor.disconnectedCallback = function() {
      // the element has left the builing
      disconnectedCallback(plt, this);
    };
    HostElementConstructor['s-init'] = function() {
      initComponentLoaded(plt, this, hydratedCssClass);
    };
    HostElementConstructor.forceUpdate = function() {
      queueUpdate(plt, this);
    };
    // add getters/setters to the host element members
    // these would come from the @Prop and @Method decorators that
    // should create the public API to this component
        proxyHostElementPrototype(plt, cmpMeta.membersMeta, HostElementConstructor);
  }
  function proxyController(domApi, controllerComponents, ctrlTag) {
    return {
      'create': proxyProp(domApi, controllerComponents, ctrlTag, 'create'),
      'componentOnReady': proxyProp(domApi, controllerComponents, ctrlTag, 'componentOnReady')
    };
  }
  function proxyProp(domApi, controllerComponents, ctrlTag, proxyMethodName) {
    return function() {
      const args = arguments;
      return loadComponent(domApi, controllerComponents, ctrlTag).then(ctrlElm => ctrlElm[proxyMethodName].apply(ctrlElm, args));
    };
  }
  function loadComponent(domApi, controllerComponents, ctrlTag) {
    return new Promise(resolve => {
      let ctrlElm = controllerComponents[ctrlTag];
      ctrlElm || (ctrlElm = domApi.$body.querySelector(ctrlTag));
      if (!ctrlElm) {
        ctrlElm = controllerComponents[ctrlTag] = domApi.$createElement(ctrlTag);
        domApi.$appendChild(domApi.$body, ctrlElm);
      }
      ctrlElm.componentOnReady(resolve);
    });
  }
  function createPlatformMain(namespace, Context, win, doc, resourcesUrl, hydratedCssClass) {
    const cmpRegistry = {
      'html': {}
    };
    const controllerComponents = {};
    const App = win[namespace] = win[namespace] || {};
    const domApi = createDomApi(App, win, doc);
    // set App Context
        Context.isServer = Context.isPrerender = !(Context.isClient = true);
    Context.window = win;
    Context.location = win.location;
    Context.document = doc;
    Context.resourcesUrl = Context.publicPath = resourcesUrl;
    true;
    Context.enableListener = ((instance, eventName, enabled, attachTo, passive) => enableEventListener(plt, instance, eventName, enabled, attachTo, passive));
    true;
    Context.emit = ((elm, eventName, data) => domApi.$dispatchEvent(elm, Context.eventNameFn ? Context.eventNameFn(eventName) : eventName, data));
    // add the h() fn to the app's global namespace
    App.h = h;
    App.Context = Context;
    // keep a global set of tags we've already defined
        const globalDefined = win.$definedCmps = win.$definedCmps || {};
    // internal id increment for unique ids
        let ids = 0;
    // create the platform api which is used throughout common core code
        const plt = {
      domApi: domApi,
      defineComponent: defineComponent,
      emitEvent: Context.emit,
      getComponentMeta: elm => cmpRegistry[domApi.$tagName(elm)],
      getContextItem: contextKey => Context[contextKey],
      isClient: true,
      isDefinedComponent: elm => !!(globalDefined[domApi.$tagName(elm)] || plt.getComponentMeta(elm)),
      nextId: () => namespace + ids++,
      onError: (err, type, elm) => console.error(err, type, elm && elm.tagName),
      propConnect: ctrlTag => proxyController(domApi, controllerComponents, ctrlTag),
      queue: Context.queue = createQueueClient(App, win),
      requestBundle: requestBundle,
      ancestorHostElementMap: new WeakMap(),
      componentAppliedStyles: new WeakMap(),
      hasConnectedMap: new WeakMap(),
      hasListenersMap: new WeakMap(),
      hasLoadedMap: new WeakMap(),
      hostElementMap: new WeakMap(),
      hostSnapshotMap: new WeakMap(),
      instanceMap: new WeakMap(),
      isDisconnectedMap: new WeakMap(),
      isQueuedForUpdate: new WeakMap(),
      onReadyCallbacksMap: new WeakMap(),
      queuedEvents: new WeakMap(),
      vnodeMap: new WeakMap(),
      valuesMap: new WeakMap()
    };
    // create the renderer that will be used
        plt.render = createRendererPatch(plt, domApi);
    // setup the root element which is the mighty <html> tag
    // the <html> has the final say of when the app has loaded
        const rootElm = domApi.$documentElement;
    rootElm['s-ld'] = [];
    rootElm['s-rn'] = true;
    // this will fire when all components have finished loaded
        rootElm['s-init'] = (() => {
      plt.hasLoadedMap.set(rootElm, App.loaded = plt.isAppLoaded = true);
      domApi.$dispatchEvent(win, 'appload', {
        detail: {
          namespace: namespace
        }
      });
    });
    // if the HTML was generated from SSR
    // then let's walk the tree and generate vnodes out of the data
        createVNodesFromSsr(plt, domApi, rootElm);
    function defineComponent(cmpMeta, HostElementConstructor) {
      if (!globalDefined[cmpMeta.tagNameMeta]) {
        // keep a map of all the defined components
        globalDefined[cmpMeta.tagNameMeta] = true;
        // initialize the members on the host element prototype
                initHostElement(plt, cmpMeta, HostElementConstructor.prototype, hydratedCssClass);
        true;
        {
          // add which attributes should be observed
          const observedAttributes = [];
          // at this point the membersMeta only includes attributes which should
          // be observed, it does not include all props yet, so it's safe to
          // loop through all of the props (attrs) and observed them
                    for (const propName in cmpMeta.membersMeta) {
            cmpMeta.membersMeta[propName].attribName && observedAttributes.push(
            // add this attribute to our array of attributes we need to observe
            cmpMeta.membersMeta[propName].attribName);
          }
          // set the array of all the attributes to keep an eye on
          // https://www.youtube.com/watch?v=RBs21CFBALI
                    HostElementConstructor.observedAttributes = observedAttributes;
        }
        // define the custom element
                win.customElements.define(cmpMeta.tagNameMeta, HostElementConstructor);
      }
    }
    function requestBundle(cmpMeta, elm) {
      // set the "mode" property
      elm.mode || (
      // looks like mode wasn't set as a property directly yet
      // first check if there's an attribute
      // next check the app's global
      elm.mode = domApi.$getAttribute(elm, 'mode') || Context.mode);
      // remember a "snapshot" of this host element's current attributes/child nodes/slots/etc
            initHostSnapshot(plt.domApi, cmpMeta, elm);
      if (cmpMeta.componentConstructor) {
        // we're already all loaded up :)
        queueUpdate(plt, elm);
      } else {
        const bundleId = 'string' === typeof cmpMeta.bundleIds ? cmpMeta.bundleIds : cmpMeta.bundleIds[elm.mode];
        const url = resourcesUrl + bundleId + (useScopedCss(domApi.$supportsShadowDom, cmpMeta) ? '.sc' : '') + '.js';
        // dynamic es module import() => woot!
                import(url).then(importedModule => {
          // async loading of the module is done
          try {
            // get the component constructor from the module
            cmpMeta.componentConstructor = importedModule[dashToPascalCase(cmpMeta.tagNameMeta)];
            // initialize this component constructor's styles
            // it is possible for the same component to have difficult styles applied in the same app
                        initStyleTemplate(domApi, cmpMeta, cmpMeta.componentConstructor);
          } catch (e) {
            // oh man, something's up
            console.error(e);
            // provide a bogus component constructor
            // so the rest of the app acts as normal
                        cmpMeta.componentConstructor = class {};
          }
          // bundle all loaded up, let's continue
                    queueUpdate(plt, elm);
        }).catch(err => console.error(err, url));
      }
    }
    true;
    plt.attachStyles = attachStyles;
    true;
    generateDevInspector(App, namespace, window, plt);
    // register all the components now that everything's ready
    // standard es2017 class extends HTMLElement
    (App.components || []).map(data => parseComponentLoader(data, cmpRegistry)).forEach(cmpMeta => plt.defineComponent(cmpMeta, class extends HTMLElement {}));
    // create the componentOnReady fn
        initCoreComponentOnReady(plt, App);
    // notify that the app has initialized and the core script is ready
    // but note that the components have not fully loaded yet
        App.initialized = true;
  }
  /*
    Extremely simple css parser. Intended to be not more than what we need
    and definitely not necessarily correct =).
    */
  /* tslint:disable */  false;
  // esm build which uses es module imports and dynamic imports
  createPlatformMain(namespace, Context, window, document, resourcesUrl, hydratedCssClass);
})(window, document, Context, namespace);
})({},"DocsSite","hydrated");