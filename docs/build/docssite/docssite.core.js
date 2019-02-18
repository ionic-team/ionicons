/*! Built with http://stenciljs.com */
((w,d,x,n,h,c,r)=>{((s)=>{s&&(r=s.getAttribute('data-resources-url'))})(d.querySelector("script[data-namespace='docssite']"));
/**
 * SSR Attribute Names
 */
const SSR_VNODE_ID = 'ssrv';

/**
 * Default style mode id
 */
const DEFAULT_STYLE_MODE = '$';

/**
 * Reusable empty obj/array
 * Don't add values to these!!
 */ const EMPTY_OBJ = {};

/**
 * Key Name to Key Code Map
 */ const KEY_CODE_MAP = {
  'enter': 13,
  'escape': 27,
  'space': 32,
  'tab': 9,
  'left': 37,
  'up': 38,
  'right': 39,
  'down': 40
};

function getScopeId(cmpMeta, mode) {
  return 'sc-' + cmpMeta.tagNameMeta + (mode && mode !== DEFAULT_STYLE_MODE ? '-' + mode : '');
}

function getElementScopeId(scopeId, isHostElement) {
  return scopeId + (isHostElement ? '-h' : '-s');
}

function initStyleTemplate(domApi, cmpMeta, encapsulation, style, styleMode, perf) {
  if (style) {
    false;
    // we got a style mode for this component, let's create an id for this style
    const styleModeId = cmpMeta.tagNameMeta + (styleMode || DEFAULT_STYLE_MODE);
    if (!cmpMeta[styleModeId]) {
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
      {
        // hot module replacement enabled
        // add a style id attribute, but only useful during dev
        const styleContent = [ '<style', ` data-style-tag="${cmpMeta.tagNameMeta}"` ];
        domApi.$setAttribute(templateElm, 'data-tmpl-style-tag', cmpMeta.tagNameMeta), styleMode && (styleContent.push(` data-style-mode="${styleMode}"`), 
        domApi.$setAttribute(templateElm, 'data-tmpl-style-mode', styleMode)), (2 /* ScopedCss */ === encapsulation || 1 /* ShadowDom */ === encapsulation && !domApi.$supportsShadowDom) && (styleContent.push(' data-style-scoped="true"'), 
        domApi.$setAttribute(templateElm, 'data-tmpl-style-scoped', 'true')), styleContent.push('>'), 
        styleContent.push(style), styleContent.push('</style>'), templateElm.innerHTML = styleContent.join('');
      }
      // add our new template element to the head
      // so it can be cloned later
      domApi.$appendChild(domApi.$doc.head, templateElm);
    }
    false;
  }
}

const attachStyles = (plt, domApi, cmpMeta, hostElm) => {
  // first see if we've got a style for a specific mode
  // either this host element should use scoped css
  // or it wants to use shadow dom but the browser doesn't support it
  // create a scope id which is useful for scoped css
  // and add the scope attribute to the host
  // create the style id w/ the host element's mode
  let styleId = cmpMeta.tagNameMeta + DEFAULT_STYLE_MODE;
  let styleTemplate = cmpMeta[styleId];
  // if (false || false) {
    const shouldScopeCss = 2 /* ScopedCss */ === cmpMeta.encapsulationMeta || 1 /* ShadowDom */ === cmpMeta.encapsulationMeta && !plt.domApi.$supportsShadowDom;
  if (shouldScopeCss && (hostElm['s-sc'] = styleTemplate ? getScopeId(cmpMeta, hostElm.mode) : getScopeId(cmpMeta)), 
  styleTemplate) {
    // cool, we found a style template element for this component
    let styleContainerNode = domApi.$doc.head;
    // if this browser supports shadow dom, then let's climb up
    // the dom and see if we're within a shadow dom
        false;
    // if this container element already has these styles
    // then there's no need to apply them again
    // create an object to keep track if we'ready applied this component style
    let appliedStyles = plt.componentAppliedStyles.get(styleContainerNode);
    // check if we haven't applied these styles to this container yet
    if (appliedStyles || plt.componentAppliedStyles.set(styleContainerNode, appliedStyles = {}), 
    !appliedStyles[styleId]) {
      let styleElm;
      {
        // this browser supports the <template> element
        // and all its native content.cloneNode() goodness
        // clone the template element to create a new <style> element
        styleElm = styleTemplate.content.cloneNode(true), 
        // remember we don't need to do this again for this element
        appliedStyles[styleId] = true;
        // let's make sure we put the styles below the <style data-styles> element
        // so any visibility css overrides the default
        const dataStyles = styleContainerNode.querySelectorAll('[data-styles]');
        domApi.$insertBefore(styleContainerNode, styleElm, dataStyles.length && dataStyles[dataStyles.length - 1].nextSibling || styleContainerNode.firstChild);
      }
    }
  }
};

const isDef = v => null != v;

const toLowerCase = str => str.toLowerCase();

const dashToPascalCase = str => toLowerCase(str).split('-').map(segment => segment.charAt(0).toUpperCase() + segment.slice(1)).join('');

const updateAttribute = (elm, memberName, newValue, isBooleanAttr = 'boolean' === typeof newValue, isXlinkNs) => {
  isXlinkNs = memberName !== (memberName = memberName.replace(/^xlink\:?/, '')), null == newValue || isBooleanAttr && (!newValue || 'false' === newValue) ? isXlinkNs ? elm.removeAttributeNS(XLINK_NS$1, toLowerCase(memberName)) : elm.removeAttribute(memberName) : 'function' !== typeof newValue && (newValue = isBooleanAttr ? '' : newValue.toString(), 
  isXlinkNs ? elm.setAttributeNS(XLINK_NS$1, toLowerCase(memberName), newValue) : elm.setAttribute(memberName, newValue));
};

const XLINK_NS$1 = 'http://www.w3.org/1999/xlink';

const setAccessor = (plt, elm, memberName, oldValue, newValue, isSvg, isHostElement) => {
  if ('class' !== memberName || isSvg) if ('style' === memberName) {
    for (const prop in oldValue) newValue && null != newValue[prop] || (/-/.test(prop) ? elm.style.removeProperty(prop) : elm.style[prop] = '');
    for (const prop in newValue) oldValue && newValue[prop] === oldValue[prop] || (/-/.test(prop) ? elm.style.setProperty(prop, newValue[prop]) : elm.style[prop] = newValue[prop]);
  } else if ('o' !== memberName[0] || 'n' !== memberName[1] || !/[A-Z]/.test(memberName[2]) || memberName in elm) if ('list' !== memberName && 'type' !== memberName && !isSvg && (memberName in elm || -1 !== [ 'object', 'function' ].indexOf(typeof newValue) && null !== newValue) || false) {
    // Properties
    // - list and type are attributes that get applied as values on the element
    // - all svgs get values as attributes not props
    // - check if elm contains name or if the value is array, object, or function
    const cmpMeta = plt.getComponentMeta(elm);
    cmpMeta && cmpMeta.membersMeta && cmpMeta.membersMeta[memberName] ? 
    // we know for a fact that this element is a known component
    // and this component has this member name as a property,
    // let's set the known @Prop on this element
    // set it directly as property on the element
    setProperty(elm, memberName, newValue) : 'ref' !== memberName && (
    // this member name is a property on this element, but it's not a component
    // this is a native property like "value" or something
    // also we can ignore the "ref" member name at this point
    setProperty(elm, memberName, null == newValue ? '' : newValue), null != newValue && false !== newValue || plt.domApi.$removeAttribute(elm, memberName));
  } else null != newValue && 'key' !== memberName ? ('htmlfor' === memberName && console.error(`Attribute "htmlfor" set on ${elm.tagName.toLowerCase()}, with the lower case "f" must be replaced with a "htmlFor" (capital "F")`), 
  // Element Attributes
  updateAttribute(elm, memberName, newValue)) : (isSvg || plt.domApi.$hasAttribute(elm, memberName) && (null == newValue || false === newValue)) && 
  // remove svg attribute
  plt.domApi.$removeAttribute(elm, memberName); else 
  // Event Handlers
  // so if the member name starts with "on" and the 3rd characters is
  // a capital letter, and it's not already a member on the element,
  // then we're assuming it's an event listener
  // standard event
  // the JSX attribute could have been "onMouseOver" and the
  // member name "onmouseover" is on the element's prototype
  // so let's add the listener "mouseover", which is all lowercased
  memberName = toLowerCase(memberName) in elm ? toLowerCase(memberName.substring(2)) : toLowerCase(memberName[2]) + memberName.substring(3), 
  newValue ? newValue !== oldValue && 
  // add listener
  plt.domApi.$addEventListener(elm, memberName, newValue, 0) : 
  // remove listener
  plt.domApi.$removeEventListener(elm, memberName, 0); else if (oldValue !== newValue) {
    const oldList = parseClassList(oldValue);
    const newList = parseClassList(newValue);
    // remove classes in oldList, not included in newList
        const toRemove = oldList.filter(item => !newList.includes(item));
    const classList = parseClassList(elm.className).filter(item => !toRemove.includes(item));
    // add classes from newValue that are not in oldList or classList
        const toAdd = newList.filter(item => !oldList.includes(item) && !classList.includes(item));
    classList.push(...toAdd), elm.className = classList.join(' ');
  }
};

const parseClassList = value => null == value || '' === value ? [] : value.trim().split(/\s+/);

/**
 * Attempt to set a DOM property to the given value.
 * IE & FF throw for certain property-value combinations.
 */ const setProperty = (elm, name, value) => {
  try {
    elm[name] = value;
  } catch (e) {}
};

const updateElement = (plt, oldVnode, newVnode, isSvgMode, memberName) => {
  // if the element passed in is a shadow root, which is a document fragment
  // then we want to be adding attrs/props to the shadow root's "host" element
  // if it's not a shadow root, then we add attrs/props to the same element
  const elm = 11 /* DocumentFragment */ === newVnode.elm.nodeType && newVnode.elm.host ? newVnode.elm.host : newVnode.elm;
  const oldVnodeAttrs = oldVnode && oldVnode.vattrs || EMPTY_OBJ;
  const newVnodeAttrs = newVnode.vattrs || EMPTY_OBJ;
  // remove attributes no longer present on the vnode by setting them to undefined
  for (memberName in oldVnodeAttrs) newVnodeAttrs && null != newVnodeAttrs[memberName] || null == oldVnodeAttrs[memberName] || setAccessor(plt, elm, memberName, oldVnodeAttrs[memberName], void 0, isSvgMode, newVnode.ishost);
  // add new & update changed attributes
  for (memberName in newVnodeAttrs) memberName in oldVnodeAttrs && newVnodeAttrs[memberName] === ('value' === memberName || 'checked' === memberName ? elm[memberName] : oldVnodeAttrs[memberName]) || setAccessor(plt, elm, memberName, oldVnodeAttrs[memberName], newVnodeAttrs[memberName], isSvgMode, newVnode.ishost);
};

let isSvgMode = false;

const createRendererPatch = (plt, domApi) => {
  // createRenderer() is only created once per app
  // the patch() function which createRenderer() returned is the function
  // which gets called numerous times by each component
  // internal variables to be reused per patch() call
  let useNativeShadowDom, scopeId, checkSlotFallbackVisibility, checkSlotRelocate, contentRef, hostTagName, hostElm;
  const createElm = (oldParentVNode, newParentVNode, childIndex, parentElm, i, elm, childNode, newVNode, oldVNode) => {
    if (newVNode = newParentVNode.vchildren[childIndex], useNativeShadowDom || (
    // remember for later we need to check to relocate nodes
    checkSlotRelocate = true, 'slot' === newVNode.vtag && (scopeId && 
    // scoped css needs to add its scoped id to the parent element
    domApi.$addClass(parentElm, scopeId + '-s'), newVNode.vchildren ? 
    // slot element has fallback content
    // still create an element that "mocks" the slot element
    newVNode.isSlotFallback = true : 
    // slot element does not have fallback content
    // create an html comment we'll use to always reference
    // where actual slot content should sit next to
    newVNode.isSlotReference = true)), isDef(newVNode.vtext)) 
    // create text node
    newVNode.elm = domApi.$createTextNode(newVNode.vtext); else if (newVNode.isSlotReference) 
    // create a slot reference html text node
    newVNode.elm = domApi.$createTextNode(''); else {
      if (
      // create element
      elm = newVNode.elm = isSvgMode || 'svg' === newVNode.vtag ? domApi.$createElementNS('http://www.w3.org/2000/svg', newVNode.vtag) : domApi.$createElement(newVNode.isSlotFallback ? 'slot-fb' : newVNode.vtag), 
      plt.isDefinedComponent(elm) && plt.isCmpReady.delete(hostElm), isSvgMode = 'svg' === newVNode.vtag || 'foreignObject' !== newVNode.vtag && isSvgMode, 
      // add css classes, attrs, props, listeners, etc.
      updateElement(plt, null, newVNode, isSvgMode), isDef(scopeId) && elm['s-si'] !== scopeId && 
      // if there is a scopeId and this is the initial render
      // then let's add the scopeId as an attribute
      domApi.$addClass(elm, elm['s-si'] = scopeId), newVNode.vchildren) for (i = 0; i < newVNode.vchildren.length; ++i) 
      // create the node
      childNode = createElm(oldParentVNode, newVNode, i, elm), 
      // return node could have been null
      childNode && 
      // append our new node
      domApi.$appendChild(elm, childNode);
      'svg' === newVNode.vtag && (
      // Only reset the SVG context when we're exiting SVG element
      isSvgMode = false);
    }
    return newVNode.elm['s-hn'] = hostTagName, (newVNode.isSlotFallback || newVNode.isSlotReference) && (
    // remember the content reference comment
    newVNode.elm['s-sr'] = true, 
    // remember the content reference comment
    newVNode.elm['s-cr'] = contentRef, 
    // remember the slot name, or empty string for default slot
    newVNode.elm['s-sn'] = newVNode.vname || '', 
    // check if we've got an old vnode for this slot
    oldVNode = oldParentVNode && oldParentVNode.vchildren && oldParentVNode.vchildren[childIndex], 
    oldVNode && oldVNode.vtag === newVNode.vtag && oldParentVNode.elm && 
    // we've got an old slot vnode and the wrapper is being replaced
    // so let's move the old slot content back to it's original location
    putBackInOriginalLocation(oldParentVNode.elm)), newVNode.elm;
  };
  const putBackInOriginalLocation = (parentElm, recursive, i, childNode) => {
    plt.tmpDisconnected = true;
    const oldSlotChildNodes = domApi.$childNodes(parentElm);
    for (i = oldSlotChildNodes.length - 1; i >= 0; i--) childNode = oldSlotChildNodes[i], 
    childNode['s-hn'] !== hostTagName && childNode['s-ol'] && (
    // this child node in the old element is from another component
    // remove this node from the old slot's parent
    domApi.$remove(childNode), 
    // and relocate it back to it's original location
    domApi.$insertBefore(parentReferenceNode(childNode), childNode, referenceNode(childNode)), 
    // remove the old original location comment entirely
    // later on the patch function will know what to do
    // and move this to the correct spot in need be
    domApi.$remove(childNode['s-ol']), childNode['s-ol'] = null, checkSlotRelocate = true), 
    recursive && putBackInOriginalLocation(childNode, recursive);
    plt.tmpDisconnected = false;
  };
  const addVnodes = (parentElm, before, parentVNode, vnodes, startIdx, endIdx, containerElm, childNode) => {
    const contentRef = parentElm['s-cr'];
    for (containerElm = contentRef && domApi.$parentNode(contentRef) || parentElm, containerElm.shadowRoot && domApi.$tagName(containerElm) === hostTagName && (containerElm = containerElm.shadowRoot); startIdx <= endIdx; ++startIdx) vnodes[startIdx] && (childNode = isDef(vnodes[startIdx].vtext) ? domApi.$createTextNode(vnodes[startIdx].vtext) : createElm(null, parentVNode, startIdx, parentElm), 
    childNode && (vnodes[startIdx].elm = childNode, domApi.$insertBefore(containerElm, childNode, referenceNode(before))));
  };
  const removeVnodes = (vnodes, startIdx, endIdx, node) => {
    for (;startIdx <= endIdx; ++startIdx) isDef(vnodes[startIdx]) && (node = vnodes[startIdx].elm, 
    // we're removing this element
    // so it's possible we need to show slot fallback content now
    checkSlotFallbackVisibility = true, node['s-ol'] ? 
    // remove the original location comment
    domApi.$remove(node['s-ol']) : 
    // it's possible that child nodes of the node
    // that's being removed are slot nodes
    putBackInOriginalLocation(node, true), 
    // remove the vnode's element from the dom
    domApi.$remove(node));
  };
  const isSameVnode = (vnode1, vnode2) => {
    // compare if two vnode to see if they're "technically" the same
    // need to have the same element tag, and same key to be the same
    if (vnode1.vtag === vnode2.vtag && vnode1.vkey === vnode2.vkey) {
      if ('slot' === vnode1.vtag) return vnode1.vname === vnode2.vname;
      return true;
    }
    return false;
  };
  const referenceNode = node => {
    if (node && node['s-ol']) 
    // this node was relocated to a new location in the dom
    // because of some other component's slot
    // but we still have an html comment in place of where
    // it's original location was according to it's original vdom
    return node['s-ol'];
    return node;
  };
  const parentReferenceNode = node => {
    return domApi.$parentNode(node['s-ol'] ? node['s-ol'] : node);
  };
  const patchVNode = (oldVNode, newVNode, defaultHolder) => {
    const elm = newVNode.elm = oldVNode.elm;
    const oldChildren = oldVNode.vchildren;
    const newChildren = newVNode.vchildren;
    // test if we're rendering an svg element, or still rendering nodes inside of one
    // only add this to the when the compiler sees we're using an svg somewhere
    isSvgMode = newVNode.elm && isDef(domApi.$parentElement(newVNode.elm)) && void 0 !== newVNode.elm.ownerSVGElement, 
    isSvgMode = 'svg' === newVNode.vtag || 'foreignObject' !== newVNode.vtag && isSvgMode, 
    isDef(newVNode.vtext) ? (defaultHolder = elm['s-cr']) ? 
    // this element has slotted content
    domApi.$setTextContent(domApi.$parentNode(defaultHolder), newVNode.vtext) : oldVNode.vtext !== newVNode.vtext && 
    // update the text content for the text only vnode
    // and also only if the text is different than before
    domApi.$setTextContent(elm, newVNode.vtext) : (
    // element node
    'slot' !== newVNode.vtag && 
    // either this is the first render of an element OR it's an update
    // AND we already know it's possible it could have changed
    // this updates the element's css classes, attrs, props, listeners, etc.
    updateElement(plt, oldVNode, newVNode, isSvgMode), isDef(oldChildren) && isDef(newChildren) ? 
    // looks like there's child vnodes for both the old and new vnodes
    ((parentElm, oldCh, newVNode, newCh, idxInOld, i, node, elmToMove) => {
      let oldStartIdx = 0, newStartIdx = 0;
      let oldEndIdx = oldCh.length - 1;
      let oldStartVnode = oldCh[0];
      let oldEndVnode = oldCh[oldEndIdx];
      let newEndIdx = newCh.length - 1;
      let newStartVnode = newCh[0];
      let newEndVnode = newCh[newEndIdx];
      while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) if (null == oldStartVnode) 
      // Vnode might have been moved left
      oldStartVnode = oldCh[++oldStartIdx]; else if (null == oldEndVnode) oldEndVnode = oldCh[--oldEndIdx]; else if (null == newStartVnode) newStartVnode = newCh[++newStartIdx]; else if (null == newEndVnode) newEndVnode = newCh[--newEndIdx]; else if (isSameVnode(oldStartVnode, newStartVnode)) patchVNode(oldStartVnode, newStartVnode), 
      oldStartVnode = oldCh[++oldStartIdx], newStartVnode = newCh[++newStartIdx]; else if (isSameVnode(oldEndVnode, newEndVnode)) patchVNode(oldEndVnode, newEndVnode), 
      oldEndVnode = oldCh[--oldEndIdx], newEndVnode = newCh[--newEndIdx]; else if (isSameVnode(oldStartVnode, newEndVnode)) 
      // Vnode moved right
      'slot' !== oldStartVnode.vtag && 'slot' !== newEndVnode.vtag || putBackInOriginalLocation(domApi.$parentNode(oldStartVnode.elm)), 
      patchVNode(oldStartVnode, newEndVnode), domApi.$insertBefore(parentElm, oldStartVnode.elm, domApi.$nextSibling(oldEndVnode.elm)), 
      oldStartVnode = oldCh[++oldStartIdx], newEndVnode = newCh[--newEndIdx]; else if (isSameVnode(oldEndVnode, newStartVnode)) 
      // Vnode moved left
      'slot' !== oldStartVnode.vtag && 'slot' !== newEndVnode.vtag || putBackInOriginalLocation(domApi.$parentNode(oldEndVnode.elm)), 
      patchVNode(oldEndVnode, newStartVnode), domApi.$insertBefore(parentElm, oldEndVnode.elm, oldStartVnode.elm), 
      oldEndVnode = oldCh[--oldEndIdx], newStartVnode = newCh[++newStartIdx]; else {
        for (
        // createKeyToOldIdx
        idxInOld = null, i = oldStartIdx; i <= oldEndIdx; ++i) if (oldCh[i] && isDef(oldCh[i].vkey) && oldCh[i].vkey === newStartVnode.vkey) {
          idxInOld = i;
          break;
        }
        isDef(idxInOld) ? (elmToMove = oldCh[idxInOld], elmToMove.vtag !== newStartVnode.vtag ? node = createElm(oldCh && oldCh[newStartIdx], newVNode, idxInOld, parentElm) : (patchVNode(elmToMove, newStartVnode), 
        oldCh[idxInOld] = void 0, node = elmToMove.elm), newStartVnode = newCh[++newStartIdx]) : (
        // new element
        node = createElm(oldCh && oldCh[newStartIdx], newVNode, newStartIdx, parentElm), 
        newStartVnode = newCh[++newStartIdx]), node && domApi.$insertBefore(parentReferenceNode(oldStartVnode.elm), node, referenceNode(oldStartVnode.elm));
      }
      oldStartIdx > oldEndIdx ? addVnodes(parentElm, null == newCh[newEndIdx + 1] ? null : newCh[newEndIdx + 1].elm, newVNode, newCh, newStartIdx, newEndIdx) : newStartIdx > newEndIdx && removeVnodes(oldCh, oldStartIdx, oldEndIdx);
    })(elm, oldChildren, newVNode, newChildren) : isDef(newChildren) ? (
    // no old child vnodes, but there are new child vnodes to add
    isDef(oldVNode.vtext) && 
    // the old vnode was text, so be sure to clear it out
    domApi.$setTextContent(elm, ''), 
    // add the new vnode children
    addVnodes(elm, null, newVNode, newChildren, 0, newChildren.length - 1)) : isDef(oldChildren) && 
    // no new child vnodes, but there are old child vnodes to remove
    removeVnodes(oldChildren, 0, oldChildren.length - 1)), 
    // reset svgMode when svg node is fully patched
    isSvgMode && 'svg' === newVNode.vtag && (isSvgMode = false);
  };
  const updateFallbackSlotVisibility = (elm, childNode, childNodes, i, ilen, j, slotNameAttr, nodeType) => {
    for (childNodes = domApi.$childNodes(elm), i = 0, ilen = childNodes.length; i < ilen; i++) if (childNode = childNodes[i], 
    1 /* ElementNode */ === domApi.$nodeType(childNode)) {
      if (childNode['s-sr']) for (
      // this is a slot fallback node
      // get the slot name for this slot reference node
      slotNameAttr = childNode['s-sn'], 
      // by default always show a fallback slot node
      // then hide it if there are other slots in the light dom
      childNode.hidden = false, j = 0; j < ilen; j++) if (childNodes[j]['s-hn'] !== childNode['s-hn']) if (
      // this sibling node is from a different component
      nodeType = domApi.$nodeType(childNodes[j]), '' !== slotNameAttr) {
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
      // keep drilling down
            updateFallbackSlotVisibility(childNode);
    }
  };
  const relocateNodes = [];
  const relocateSlotContent = (elm, childNodes, childNode, node, i, ilen, j, hostContentNodes, slotNameAttr, nodeType) => {
    for (childNodes = domApi.$childNodes(elm), i = 0, ilen = childNodes.length; i < ilen; i++) {
      if (childNode = childNodes[i], childNode['s-sr'] && (node = childNode['s-cr'])) for (
      // first got the content reference comment node
      // then we got it's parent, which is where all the host content is in now
      hostContentNodes = domApi.$childNodes(domApi.$parentNode(node)), slotNameAttr = childNode['s-sn'], 
      j = hostContentNodes.length - 1; j >= 0; j--) node = hostContentNodes[j], node['s-cn'] || node['s-nr'] || node['s-hn'] === childNode['s-hn'] || (
      // let's do some relocating to its new home
      // but never relocate a content reference node
      // that is suppose to always represent the original content location
      nodeType = domApi.$nodeType(node), ((3 /* TextNode */ === nodeType || 8 /* CommentNode */ === nodeType) && '' === slotNameAttr || 1 /* ElementNode */ === nodeType && null === domApi.$getAttribute(node, 'slot') && '' === slotNameAttr || 1 /* ElementNode */ === nodeType && domApi.$getAttribute(node, 'slot') === slotNameAttr) && (
      // it's possible we've already decided to relocate this node
      relocateNodes.some(r => r.nodeToRelocate === node) || (
      // made some changes to slots
      // let's make sure we also double check
      // fallbacks are correctly hidden or shown
      checkSlotFallbackVisibility = true, node['s-sn'] = slotNameAttr, 
      // add to our list of nodes to relocate
      relocateNodes.push({
        slotRefNode: childNode,
        nodeToRelocate: node
      }))));
      1 /* ElementNode */ === domApi.$nodeType(childNode) && relocateSlotContent(childNode);
    }
  };
  return (hostElement, oldVNode, newVNode, useNativeShadowDomVal, encapsulation, ssrPatchId, i, relocateNode, orgLocationNode, refNode, parentNodeRef, insertBeforeNode) => {
    if (
    // patchVNode() is synchronous
    // so it is safe to set these variables and internally
    // the same patch() call will reference the same data
    hostElm = hostElement, hostTagName = domApi.$tagName(hostElm), contentRef = hostElm['s-cr'], 
    useNativeShadowDom = useNativeShadowDomVal, 
    // get the scopeId
    scopeId = hostElm['s-sc'], 
    // always reset
    checkSlotRelocate = checkSlotFallbackVisibility = false, 
    // synchronous patch
    patchVNode(oldVNode, newVNode), checkSlotRelocate) {
      for (relocateSlotContent(newVNode.elm), i = 0; i < relocateNodes.length; i++) relocateNode = relocateNodes[i], 
      relocateNode.nodeToRelocate['s-ol'] || (
      // add a reference node marking this node's original location
      // keep a reference to this node for later lookups
      orgLocationNode = domApi.$createTextNode(''), orgLocationNode['s-nr'] = relocateNode.nodeToRelocate, 
      domApi.$insertBefore(domApi.$parentNode(relocateNode.nodeToRelocate), relocateNode.nodeToRelocate['s-ol'] = orgLocationNode, relocateNode.nodeToRelocate));
      // while we're moving nodes around existing nodes, temporarily disable
      // the disconnectCallback from working
            for (plt.tmpDisconnected = true, i = 0; i < relocateNodes.length; i++) {
        relocateNode = relocateNodes[i], 
        // by default we're just going to insert it directly
        // after the slot reference node
        parentNodeRef = domApi.$parentNode(relocateNode.slotRefNode), insertBeforeNode = domApi.$nextSibling(relocateNode.slotRefNode), 
        orgLocationNode = relocateNode.nodeToRelocate['s-ol'];
        while (orgLocationNode = domApi.$previousSibling(orgLocationNode)) if ((refNode = orgLocationNode['s-nr']) && refNode && refNode['s-sn'] === relocateNode.nodeToRelocate['s-sn'] && parentNodeRef === domApi.$parentNode(refNode) && (refNode = domApi.$nextSibling(refNode)) && refNode && !refNode['s-nr']) {
          insertBeforeNode = refNode;
          break;
        }
        (!insertBeforeNode && parentNodeRef !== domApi.$parentNode(relocateNode.nodeToRelocate) || domApi.$nextSibling(relocateNode.nodeToRelocate) !== insertBeforeNode) && relocateNode.nodeToRelocate !== insertBeforeNode && (
        // remove the node from the dom
        domApi.$remove(relocateNode.nodeToRelocate), 
        // add it back to the dom but in its new home
        domApi.$insertBefore(parentNodeRef, relocateNode.nodeToRelocate, insertBeforeNode));
      }
      // done moving nodes around
      // allow the disconnect callback to work again
            plt.tmpDisconnected = false;
    }
    // return our new vnode
    return checkSlotFallbackVisibility && updateFallbackSlotVisibility(newVNode.elm), 
    // always reset
    relocateNodes.length = 0, newVNode;
  };
};

const callNodeRefs = (vNode, isDestroy) => {
  vNode && (vNode.vattrs && vNode.vattrs.ref && vNode.vattrs.ref(isDestroy ? null : vNode.elm), 
  vNode.vchildren && vNode.vchildren.forEach(vChild => {
    callNodeRefs(vChild, isDestroy);
  }));
};

const createQueueClient = (App, win) => {
  {
    let congestion = 0;
    let rafPending = false;
    const now = () => win.performance.now();
    const async = false !== App.asyncQueue;
    const resolved = Promise.resolve();
    const highPriority = [];
    const domReads = [];
    const domWrites = [];
    const domWritesLow = [];
    const queueTask = queue => cb => {
      // queue dom reads
      queue.push(cb), rafPending || (rafPending = true, App.raf(flush));
    };
    const consume = queue => {
      for (let i = 0; i < queue.length; i++) try {
        queue[i](now());
      } catch (e) {
        console.error(e);
      }
      queue.length = 0;
    };
    const consumeTimeout = (queue, timeout) => {
      let i = 0;
      let ts;
      while (i < queue.length && (ts = now()) < timeout) try {
        queue[i++](ts);
      } catch (e) {
        console.error(e);
      }
      i === queue.length ? queue.length = 0 : 0 !== i && queue.splice(0, i);
    };
    const flush = () => {
      congestion++, 
      // always force a bunch of medium callbacks to run, but still have
      // a throttle on how many can run in a certain time
      // DOM READS!!!
      consume(domReads);
      const timeout = async ? now() + 7 * Math.ceil(congestion * (1 / 22)) : Infinity;
      // DOM WRITES!!!
            consumeTimeout(domWrites, timeout), consumeTimeout(domWritesLow, timeout), 
      domWrites.length > 0 && (domWritesLow.push(...domWrites), domWrites.length = 0), 
      (rafPending = domReads.length + domWrites.length + domWritesLow.length > 0) ? 
      // still more to do yet, but we've run out of time
      // let's let this thing cool off and try again in the next tick
      App.raf(flush) : congestion = 0;
    };
    return App.raf || (App.raf = win.requestAnimationFrame.bind(win)), {
      tick(cb) {
        // queue high priority work to happen in next tick
        // uses Promise.resolve() for next tick
        highPriority.push(cb), 1 === highPriority.length && resolved.then(() => consume(highPriority));
      },
      read: queueTask(domReads),
      write: queueTask(domWrites)
    };
  }
};

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
    plt.domApi.$addEventListener(elm, listenMeta.eventName, function createListenerCallback(plt, elm, eventMethodName, val) {
      // create the function that gets called when the element receives
      // an event which it should be listening for
      return ev => {
        // get the instance if it exists
        val = plt.instanceMap.get(elm), val ? 
        // instance is ready, let's call it's member method for this event
        val[eventMethodName](ev) : (
        // instance is not ready!!
        // let's queue up this event data and replay it later
        // when the instance is ready
        val = plt.queuedEvents.get(elm) || [], val.push(eventMethodName, ev), plt.queuedEvents.set(elm, val));
      };
    }(plt, elm, listenMeta.eventMethodName), 1, listenMeta.eventCapture, listenMeta.eventPassive);
  });
}

function generateDevInspector(namespace, win, plt, components) {
  const devInspector = win.devInspector = win.devInspector || {};
  return devInspector.apps = devInspector.apps || [], devInspector.apps.push(function generateDevInspectorApp(namespace, plt, components) {
    const app = {
      namespace,
      getInstance: elm => {
        if (elm && elm.tagName) return Promise.all([ getComponentMeta(plt, elm.tagName), getComponentInstance(plt, elm) ]).then(results => {
          if (results[0] && results[1]) {
            const cmp = {
              meta: results[0],
              instance: results[1]
            };
            return cmp;
          }
          return null;
        });
        return Promise.resolve(null);
      },
      getComponent: tagName => {
        return getComponentMeta(plt, tagName);
      },
      getComponents: () => {
        return Promise.all(components.map(cmp => {
          return getComponentMeta(plt, cmp[0]);
        })).then(metadata => {
          return metadata.filter(m => m);
        });
      }
    };
    return app;
  }(namespace, plt, components)), devInspector.getInstance || (devInspector.getInstance = (elm => {
    return Promise.all(devInspector.apps.map(app => {
      return app.getInstance(elm);
    })).then(results => {
      return results.find(instance => !!instance);
    });
  })), devInspector.getComponents || (devInspector.getComponents = (() => {
    const appsMetadata = [];
    return devInspector.apps.forEach(app => {
      appsMetadata.push(app.getComponents());
    }), Promise.all(appsMetadata).then(appMetadata => {
      const allMetadata = [];
      return appMetadata.forEach(metadata => {
        metadata.forEach(m => {
          allMetadata.push(m);
        });
      }), allMetadata;
    });
  })), devInspector;
}

function getComponentMeta(plt, tagName) {
  const elm = {
    nodeName: tagName
  };
  const internalMeta = plt.getComponentMeta(elm);
  if (!internalMeta || !internalMeta.componentConstructor) return Promise.resolve(null);
  const cmpCtr = internalMeta.componentConstructor;
  const members = function getMembersMeta(properties) {
    return Object.keys(properties).reduce((membersMap, memberKey) => {
      const prop = properties[memberKey];
      let category;
      const member = {
        name: memberKey
      };
      if (prop.state) category = 'states', member.watchers = prop.watchCallbacks || []; else if (prop.elementRef) category = 'elements'; else if (prop.method) category = 'methods'; else {
        category = 'props';
        let type = 'any';
        prop.type && (type = prop.type, 'function' === typeof prop.type && (type = prop.type.name)), 
        member.type = type.toLowerCase(), member.mutable = prop.mutable || false, member.connect = prop.connect || '-', 
        member.context = prop.connect || '-', member.watchers = prop.watchCallbacks || [];
      }
      return membersMap[category].push(member), membersMap;
    }, {
      props: [],
      states: [],
      elements: [],
      methods: []
    });
  }(cmpCtr.properties || {});
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
      emmiters,
      listeners
    }
  });
  return Promise.resolve(meta);
}

function getComponentInstance(plt, elm) {
  return Promise.resolve(plt.instanceMap.get(elm));
}

/**
 * Production h() function based on Preact by
 * Jason Miller (@developit)
 * Licensed under the MIT License
 * https://github.com/developit/preact/blob/master/LICENSE
 *
 * Modified for Stencil's compiler and vdom
 */ const stack = [];

function h$1(nodeName, vnodeData) {
  let children = null;
  let lastSimple = false;
  let simple = false;
  let i = arguments.length;
  let vkey;
  let vname;
  for (;i-- > 2; ) stack.push(arguments[i]);
  while (stack.length > 0) {
    let child = stack.pop();
    if (child && void 0 !== child.pop) for (i = child.length; i--; ) stack.push(child[i]); else 'boolean' === typeof child && (child = null), 
    (simple = 'function' !== typeof nodeName) && (null == child ? child = '' : 'number' === typeof child ? child = String(child) : 'string' !== typeof child && (simple = false)), 
    simple && lastSimple ? children[children.length - 1].vtext += child : null === children ? children = [ simple ? {
      vtext: child
    } : child ] : children.push(simple ? {
      vtext: child
    } : child), lastSimple = simple;
  }
  if (null != vnodeData) {
    if (
    // normalize class / classname attributes
    vnodeData.className && (vnodeData.class = vnodeData.className), 'object' === typeof vnodeData.class) {
      for (i in vnodeData.class) vnodeData.class[i] && stack.push(i);
      vnodeData.class = stack.join(' '), stack.length = 0;
    }
    null != vnodeData.key && (vkey = vnodeData.key), null != vnodeData.name && (vname = vnodeData.name);
  }
  if ('function' === typeof nodeName) 
  // nodeName is a functional component
  return nodeName(vnodeData, children || [], utils);
  return {
    vtag: nodeName,
    vchildren: children,
    vtext: void 0,
    vattrs: vnodeData,
    vkey,
    vname,
    elm: void 0,
    ishost: false
  };
}

const utils = {
  'forEach': (children, cb) => children.forEach(cb),
  'map': (children, cb) => children.map(cb)
};

const initHostSnapshot = (domApi, cmpMeta, hostElm, hostSnapshot, attribName) => {
  // the host element has connected to the dom
  // and we've waited a tick to make sure all frameworks
  // have finished adding attributes and child nodes to the host
  // before we go all out and hydrate this beast
  // let's first take a snapshot of its original layout before render
  return hostElm.mode || (
  // looks like mode wasn't set as a property directly yet
  // first check if there's an attribute
  // next check the app's global
  hostElm.mode = domApi.$getMode(hostElm)), 
  // if the slot polyfill is required we'll need to put some nodes
  // in here to act as original content anchors as we move nodes around
  // host element has been connected to the DOM
  hostElm['s-cr'] || domApi.$getAttribute(hostElm, SSR_VNODE_ID) || domApi.$supportsShadowDom && 1 /* ShadowDom */ === cmpMeta.encapsulationMeta || (
  // only required when we're NOT using native shadow dom (slot)
  // or this browser doesn't support native shadow dom
  // and this host element was NOT created with SSR
  // let's pick out the inner content for slot projection
  // create a node to represent where the original
  // content was first placed, which is useful later on
  hostElm['s-cr'] = domApi.$createTextNode(''), hostElm['s-cr']['s-cn'] = true, domApi.$insertBefore(hostElm, hostElm['s-cr'], domApi.$childNodes(hostElm)[0])), 
  // create a host snapshot object we'll
  // use to store all host data about to be read later
  hostSnapshot = {
    $attributes: {}
  }, 
  // loop through and gather up all the original attributes on the host
  // this is useful later when we're creating the component instance
  cmpMeta.membersMeta && Object.keys(cmpMeta.membersMeta).forEach(memberName => {
    (attribName = cmpMeta.membersMeta[memberName].attribName) && (hostSnapshot.$attributes[attribName] = domApi.$getAttribute(hostElm, attribName));
  }), hostSnapshot;
};

const registerWithParentComponent = (plt, elm, ancestorHostElement) => {
  // find the first ancestor host element (if there is one) and register
  // this element as one of the actively loading child elements for its ancestor
  ancestorHostElement = elm;
  while (ancestorHostElement = plt.domApi.$parentElement(ancestorHostElement)) 
  // climb up the ancestors looking for the first registered component
  if (plt.isDefinedComponent(ancestorHostElement)) {
    // we found this elements the first ancestor host element
    // if the ancestor already loaded then do nothing, it's too late
    plt.isCmpReady.has(elm) || (
    // keep a reference to this element's ancestor host element
    // elm._ancestorHostElement = ancestorHostElement;
    plt.ancestorHostElementMap.set(elm, ancestorHostElement), 
    // ensure there is an array to contain a reference to each of the child elements
    // and set this element as one of the ancestor's child elements it should wait on
    (ancestorHostElement['s-ld'] = ancestorHostElement['s-ld'] || []).push(elm));
    break;
  }
};

const parseComponentLoader = (cmpRegistryData, i, cmpData) => {
  // tag name will always be lower case
  // parse member meta
  // this data only includes props that are attributes that need to be observed
  // it does not include all of the props yet
  const [tagNameMeta, bundleIds, , memberData, encapsulationMeta, listenerMeta] = cmpRegistryData;
  const membersMeta = {
    // every component defaults to always have
    // the mode and color properties
    // but only color should observe any attribute changes
    'color': {
      attribName: 'color'
    }
  };
  if (memberData) for (i = 0; i < memberData.length; i++) cmpData = memberData[i], 
  membersMeta[cmpData[0]] = {
    memberType: cmpData[1],
    reflectToAttrib: !!cmpData[2],
    attribName: 'string' === typeof cmpData[3] ? cmpData[3] : cmpData[3] ? cmpData[0] : 0,
    propType: cmpData[4]
  };
  return {
    tagNameMeta,
    // map of the bundle ids
    // can contain modes, and array of esm and es5 bundle ids
    bundleIds,
    membersMeta: Object.assign({}, membersMeta),
    // encapsulation
    encapsulationMeta,
    // parse listener meta
    listenersMeta: listenerMeta ? listenerMeta.map(parseListenerData) : void 0
  };
};

const parseListenerData = listenerData => ({
  eventName: listenerData[0],
  eventMethodName: listenerData[1],
  eventDisabled: !!listenerData[2],
  eventPassive: !!listenerData[3],
  eventCapture: !!listenerData[4]
});

const parsePropertyValue = (propType, propValue) => {
  // ensure this value is of the correct prop type
  // we're testing both formats of the "propType" value because
  // we could have either gotten the data from the attribute changed callback,
  // which wouldn't have Constructor data yet, and because this method is reused
  // within proxy where we don't have meta data, but only constructor data
  if (isDef(propValue) && 'object' !== typeof propValue && 'function' !== typeof propValue) {
    if (propType === Boolean || 4 /* Boolean */ === propType) 
    // per the HTML spec, any string value means it is a boolean true value
    // but we'll cheat here and say that the string "false" is the boolean false
    return 'false' !== propValue && ('' === propValue || !!propValue);
    if (propType === Number || 8 /* Number */ === propType) 
    // force it to be a number
    return parseFloat(propValue);
    if (propType === String || 2 /* String */ === propType) 
    // could have been passed as a number or boolean
    // but we still want it as a string
    return propValue.toString();
    // redundant return here for better minification
        return propValue;
  }
  // not sure exactly what type we want
  // so no need to change to a different type
    return propValue;
};

const queueUpdate = (plt, elm, perf) => {
  // we're actively processing this component
  plt.processingCmp.add(elm), 
  // only run patch if it isn't queued already
  plt.isQueuedForUpdate.has(elm) || (plt.isQueuedForUpdate.set(elm, true), 
  // run the patch in the next tick
  // vdom diff and patch the host element for differences
  plt.isAppLoaded ? 
  // app has already loaded
  // let's queue this work in the dom write phase
  plt.queue.write(() => update(plt, elm, perf)) : 
  // app hasn't finished loading yet
  // so let's use next tick to do everything
  // as fast as possible
  plt.queue.tick(() => update(plt, elm, perf)));
};

const update = async (plt, elm, perf, isInitialLoad, instance, ancestorHostElement) => {
  // everything is async, so somehow we could have already disconnected
  // this node, so be sure to do nothing if we've already disconnected
  if (perf.mark(`update_start:${elm.nodeName.toLowerCase()}:${elm['s-id']}`), 
  // no longer queued for update
  plt.isQueuedForUpdate.delete(elm), !plt.isDisconnectedMap.has(elm)) {
    if (instance = plt.instanceMap.get(elm), isInitialLoad = !instance, isInitialLoad) {
      if (ancestorHostElement = plt.ancestorHostElementMap.get(elm), ancestorHostElement && !ancestorHostElement['s-rn']) 
      // this is the intial load
      // this element has an ancestor host element
      // but the ancestor host element has NOT rendered yet
      // so let's just cool our jets and wait for the ancestor to render
      return void (ancestorHostElement['s-rc'] = ancestorHostElement['s-rc'] || []).push(() => {
        // this will get fired off when the ancestor host element
        // finally gets around to rendering its lazy self
        update(plt, elm, perf);
      });
      // haven't created a component instance for this host element yet!
      // create the instance from the user's component class
      // https://www.youtube.com/watch?v=olLxrojmvMg
            if (instance = initComponentInstance(plt, elm, plt.hostSnapshotMap.get(elm), perf), 
      instance) 
      // this is the initial load and the instance was just created
      // fire off the user's componentWillLoad method (if one was provided)
      // componentWillLoad only runs ONCE, after instance's element has been
      // assigned as the host element, but BEFORE render() has been called
      try {
        instance.componentWillLoad && await instance.componentWillLoad();
      } catch (e) {
        plt.onError(e, 3 /* WillLoadError */ , elm);
      }
    } else false;
    // if this component has a render function, let's fire
    // it off and generate a vnode for this
        ((plt, cmpMeta, hostElm, instance, perf) => {
      try {
        // if this component has a render function, let's fire
        // it off and generate the child vnodes for this host element
        // note that we do not create the host element cuz it already exists
        const hostMeta = cmpMeta.componentConstructor.host;
        const encapsulation = cmpMeta.componentConstructor.encapsulation;
        // test if this component should be shadow dom
        // and if so does the browser supports it
                const useNativeShadowDom = false;
        let reflectHostAttr;
        let rootElm = hostElm;
        if (!hostElm['s-rn']) {
          // attach the styles this component needs, if any
          // this fn figures out if the styles should go in a
          // shadow root or if they should be global
          plt.attachStyles(plt, plt.domApi, cmpMeta, hostElm);
          const scopeId = hostElm['s-sc'];
          scopeId && (plt.domApi.$addClass(hostElm, getElementScopeId(scopeId, true)), 'scoped' === encapsulation && plt.domApi.$addClass(hostElm, getElementScopeId(scopeId)));
        }
        if (instance.render || instance.hostData || hostMeta || reflectHostAttr) {
          // tell the platform we're actively rendering
          // if a value is changed within a render() then
          // this tells the platform not to queue the change
          plt.activeRender = true;
          const vnodeChildren = instance.render && instance.render();
          let vnodeHostData;
          // tell the platform we're done rendering
          // now any changes will again queue
          plt.activeRender = false;
          // looks like we've got child nodes to render into this host element
          // or we need to update the css class/attrs on the host element
          const hostVNode = h$1(null, vnodeHostData, vnodeChildren);
          // if we haven't already created a vnode, then we give the renderer the actual element
          // if this is a re-render, then give the renderer the last vnode we already created
                    const oldVNode = plt.vnodeMap.get(hostElm) || {};
          oldVNode.elm = rootElm, 
          // each patch always gets a new vnode
          // the host element itself isn't patched because it already exists
          // kick off the actual render and any DOM updates
          plt.vnodeMap.set(hostElm, plt.render(hostElm, oldVNode, hostVNode, useNativeShadowDom, encapsulation));
        }
        // update styles!
                // it's official, this element has rendered
        hostElm['s-rn'] = true, hostElm['s-rc'] && (
        // ok, so turns out there are some child host elements
        // waiting on this parent element to load
        // let's fire off all update callbacks waiting
        hostElm['s-rc'].forEach(cb => cb()), hostElm['s-rc'] = null);
      } catch (e) {
        plt.activeRender = false, plt.onError(e, 8 /* RenderError */ , hostElm, true);
      }
    })(plt, plt.getComponentMeta(elm), elm, instance), perf.mark(`update_end:${elm.nodeName.toLowerCase()}:${elm['s-id']}`), 
    perf.measure(`update:${elm.nodeName.toLowerCase()}:${elm['s-id']}`, `update_start:${elm.nodeName.toLowerCase()}:${elm['s-id']}`, `update_end:${elm.nodeName.toLowerCase()}:${elm['s-id']}`), 
    elm['s-init'](), elm['s-hmr-load'] && elm['s-hmr-load']();
  }
};

const defineMember = (plt, property, elm, instance, memberName, hostSnapshot, perf, hostAttributes, hostAttrValue) => {
  if (property.type || property.state) {
    const values = plt.valuesMap.get(elm);
    !property.state && true && (!property.attr || void 0 !== values[memberName] && '' !== values[memberName] || 
    // check the prop value from the host element attribute
    (hostAttributes = hostSnapshot && hostSnapshot.$attributes) && isDef(hostAttrValue = hostAttributes[property.attr]) && (
    // looks like we've got an attribute value
    // let's set it to our internal values
    values[memberName] = parsePropertyValue(property.type, hostAttrValue)), 
    // client-side
    // within the browser, the element's prototype
    // already has its getter/setter set, but on the
    // server the prototype is shared causing issues
    // so instead the server's elm has the getter/setter
    // directly on the actual element instance, not its prototype
    // so on the browser we can use "hasOwnProperty"
    elm.hasOwnProperty(memberName) && (
    // @Prop or @Prop({mutable:true})
    // property values on the host element should override
    // any default values on the component instance
    void 0 === values[memberName] && (values[memberName] = parsePropertyValue(property.type, elm[memberName])), 
    // for the client only, let's delete its "own" property
    // this way our already assigned getter/setter on the prototype kicks in
    // the very special case is to NOT do this for "mode"
    'mode' !== memberName && delete elm[memberName])), instance.hasOwnProperty(memberName) && void 0 === values[memberName] && (
    // @Prop() or @Prop({mutable:true}) or @State()
    // we haven't yet got a value from the above checks so let's
    // read any "own" property instance values already set
    // to our internal value as the source of getter data
    // we're about to define a property and it'll overwrite this "own" property
    values[memberName] = instance[memberName]), property.watchCallbacks && (values[WATCH_CB_PREFIX + memberName] = property.watchCallbacks.slice()), 
    // add getter/setter to the component instance
    // these will be pointed to the internal data set from the above checks
    definePropertyGetterSetter(instance, memberName, function getComponentProp(values) {
      // component instance prop/state getter
      // get the property value directly from our internal values
      return values = plt.valuesMap.get(plt.hostElementMap.get(this)), values && values[memberName];
    }, function setComponentProp(newValue, elm) {
      // component instance prop/state setter (cannot be arrow fn)
      elm = plt.hostElementMap.get(this), elm && (property.state || property.mutable ? setValue(plt, elm, memberName, newValue, perf) : console.warn(`@Prop() "${memberName}" on "${elm.tagName}" cannot be modified.`));
    });
  } else if (property.elementRef) 
  // @Element()
  // add a getter to the element reference using
  // the member name the component meta provided
  definePropertyValue(instance, memberName, elm); else if (property.context) {
    // @Prop({ context: 'config' })
    const contextObj = plt.getContextItem(property.context);
    void 0 !== contextObj && definePropertyValue(instance, memberName, contextObj.getContext && contextObj.getContext(elm) || contextObj);
  } else false;
};

const setValue = (plt, elm, memberName, newVal, perf, instance, values) => {
  // get the internal values object, which should always come from the host element instance
  // create the _values object if it doesn't already exist
  values = plt.valuesMap.get(elm), values || plt.valuesMap.set(elm, values = {});
  const oldVal = values[memberName];
  // check our new property value against our internal value
    if (newVal !== oldVal && (
  // gadzooks! the property's value has changed!!
  // set our new value!
  // https://youtu.be/dFtLONl4cNc?t=22
  values[memberName] = newVal, instance = plt.instanceMap.get(elm), instance)) {
    {
      const watchMethods = values[WATCH_CB_PREFIX + memberName];
      if (watchMethods) 
      // this instance is watching for when this property changed
      for (let i = 0; i < watchMethods.length; i++) try {
        // fire off each of the watch methods that are watching this property
        instance[watchMethods[i]].call(instance, newVal, oldVal, memberName);
      } catch (e) {
        console.error(e);
      }
    }
    !plt.activeRender && elm['s-rn'] && 
    // looks like this value actually changed, so we've got work to do!
    // but only if we've already rendered, otherwise just chill out
    // queue that we need to do an update, but don't worry about queuing
    // up millions cuz this function ensures it only runs once
    queueUpdate(plt, elm, perf);
  }
};

const definePropertyValue = (obj, propertyKey, value) => {
  // minification shortcut
  Object.defineProperty(obj, propertyKey, {
    configurable: true,
    value
  });
};

const definePropertyGetterSetter = (obj, propertyKey, get, set) => {
  // minification shortcut
  Object.defineProperty(obj, propertyKey, {
    configurable: true,
    get,
    set
  });
};

const WATCH_CB_PREFIX = 'wc-';

const initComponentInstance = (plt, elm, hostSnapshot, perf, instance, componentConstructor, queuedEvents, i) => {
  try {
    false, 
    // using the user's component class, let's create a new instance
    componentConstructor = plt.getComponentMeta(elm).componentConstructor, instance = new componentConstructor(), 
    // ok cool, we've got an host element now, and a actual instance
    // and there were no errors creating the instance
    // let's upgrade the data on the host element
    // and let the getters/setters do their jobs
    ((plt, cmpConstructor, elm, instance, hostSnapshot, perf) => {
      // at this point we've got a specific node of a host element, and created a component class instance
      // and we've already created getters/setters on both the host element and component class prototypes
      // let's upgrade any data that might have been set on the host element already
      // and let's have the getters/setters kick in and do their jobs
      // let's automatically add a reference to the host element on the instance
      plt.hostElementMap.set(instance, elm), 
      // create the values object if it doesn't already exist
      // this will hold all of the internal getter/setter values
      plt.valuesMap.has(elm) || plt.valuesMap.set(elm, {}), 
      // get the properties from the constructor
      // and add default "mode" and "color" properties
      Object.entries(Object.assign({
        color: {
          type: String
        }
      }, cmpConstructor.properties, {
        mode: {
          type: String
        }
      })).forEach(([memberName, property]) => {
        // define each of the members and initialize what their role is
        defineMember(plt, property, elm, instance, memberName, hostSnapshot, perf);
      });
    })(plt, componentConstructor, elm, instance, hostSnapshot, perf), 
    // add each of the event emitters which wire up instance methods
    // to fire off dom events from the host element
    function initEventEmitters(plt, cmpEvents, instance) {
      if (cmpEvents) {
        const elm = plt.hostElementMap.get(instance);
        cmpEvents.forEach(eventMeta => {
          instance[eventMeta.method] = {
            emit: data => plt.emitEvent(elm, eventMeta.name, {
              bubbles: eventMeta.bubbles,
              composed: eventMeta.composed,
              cancelable: eventMeta.cancelable,
              detail: data
            })
          };
        });
      }
    }(plt, componentConstructor.events, instance);
    try {
      if (
      // replay any event listeners on the instance that
      // were queued up between the time the element was
      // connected and before the instance was ready
      queuedEvents = plt.queuedEvents.get(elm), queuedEvents) {
        // events may have already fired before the instance was even ready
        // now that the instance is ready, let's replay all of the events that
        // we queued up earlier that were originally meant for the instance
        for (i = 0; i < queuedEvents.length; i += 2) 
        // data was added in sets of two
        // first item the eventMethodName
        // second item is the event data
        // take a look at initElementListener()
        instance[queuedEvents[i]](queuedEvents[i + 1]);
        plt.queuedEvents.delete(elm);
      }
    } catch (e) {
      plt.onError(e, 2 /* QueueEventsError */ , elm);
    }
  } catch (e) {
    // something done went wrong trying to create a component instance
    // create a dumby instance so other stuff can load
    // but chances are the app isn't fully working cuz this component has issues
    instance = {}, plt.onError(e, 7 /* InitInstanceError */ , elm, true);
  }
  return plt.instanceMap.set(elm, instance), instance;
};

const propagateComponentReady = (plt, elm, index, ancestorsActivelyLoadingChildren, ancestorHostElement, cb) => {
  if (
  // we're no longer processing this component
  plt.processingCmp.delete(elm), 
  // load events fire from bottom to top
  // the deepest elements load first then bubbles up
  (ancestorHostElement = plt.ancestorHostElementMap.get(elm)) && (
  // ok so this element already has a known ancestor host element
  // let's make sure we remove this element from its ancestor's
  // known list of child elements which are actively loading
  ancestorsActivelyLoadingChildren = ancestorHostElement['s-ld'], ancestorsActivelyLoadingChildren && (index = ancestorsActivelyLoadingChildren.indexOf(elm), 
  index > -1 && 
  // yup, this element is in the list of child elements to wait on
  // remove it so we can work to get the length down to 0
  ancestorsActivelyLoadingChildren.splice(index, 1), 
  // the ancestor's initLoad method will do the actual checks
  // to see if the ancestor is actually loaded or not
  // then let's call the ancestor's initLoad method if there's no length
  // (which actually ends up as this method again but for the ancestor)
  ancestorsActivelyLoadingChildren.length || ancestorHostElement['s-init'] && ancestorHostElement['s-init']()), 
  plt.ancestorHostElementMap.delete(elm)), plt.onAppReadyCallbacks.length && !plt.processingCmp.size) 
  // we've got some promises waiting on the entire app to be done processing
  // so it should have an empty queue and no longer rendering
  while (cb = plt.onAppReadyCallbacks.shift()) cb();
};

const isDisconnected = (domApi, elm) => {
  while (elm) {
    if (!domApi.$parentNode(elm)) return 9 /* DocumentNode */ !== domApi.$nodeType(elm);
    elm = domApi.$parentNode(elm);
  }
};

function hmrStart(plt, cmpMeta, elm, hmrVersionId) {
  // ¯\_(ツ)_/¯
  // keep the existing state
  // forget the constructor
  cmpMeta.componentConstructor = null, 
  // no sir, this component has never loaded, not once, ever
  plt.isCmpLoaded.delete(elm), plt.isCmpReady.delete(elm);
  // forget the instance
  const instance = plt.instanceMap.get(elm);
  instance && (plt.hostElementMap.delete(instance), plt.instanceMap.delete(elm)), 
  // detatch any event listeners that may have been added
  // because we're not passing an exact event name it'll
  // remove all of this element's event, which is good
  plt.domApi.$removeEventListener(elm), plt.hasListenersMap.delete(elm), cmpMeta.listenersMeta = null, 
  // create a callback for when this component finishes hmr
  elm['s-hmr-load'] = (() => {
    // finished hmr for this element
    delete elm['s-hmr-load'], function hmrFinish(plt, cmpMeta, elm) {
      plt.hasListenersMap.has(elm) || (plt.hasListenersMap.set(elm, true), 
      // initElementListeners works off of cmp metadata
      // but we just got new data from the constructor
      // so let's update the cmp metadata w/ constructor listener data
      cmpMeta.componentConstructor && cmpMeta.componentConstructor.listeners && (cmpMeta.listenersMeta = cmpMeta.componentConstructor.listeners.map(lstn => {
        const listenerMeta = {
          eventMethodName: lstn.method,
          eventName: lstn.name,
          eventCapture: !!lstn.capture,
          eventPassive: !!lstn.passive,
          eventDisabled: !!lstn.disabled
        };
        return listenerMeta;
      }), initElementListeners(plt, elm)));
    }(plt, cmpMeta, elm);
  }), 
  // create the new host snapshot from the element
  plt.hostSnapshotMap.set(elm, initHostSnapshot(plt.domApi, cmpMeta, elm)), 
  // request the bundle again
  plt.requestBundle(cmpMeta, elm, hmrVersionId);
}

const proxyHostElementPrototype = (plt, membersEntries, hostPrototype, perf) => {
  membersEntries.forEach(([memberName, member]) => {
    // add getters/setters
    const memberType = member.memberType;
    3 /* PropMutable */ & memberType && true && 
    // @Prop() or @Prop({ mutable: true })
    definePropertyGetterSetter(hostPrototype, memberName, function getHostElementProp() {
      // host element getter (cannot be arrow fn)
      // yup, ugly, srynotsry
      return (plt.valuesMap.get(this) || {})[memberName];
    }, function setHostElementProp(newValue) {
      // host element setter (cannot be arrow fn)
      setValue(plt, this, memberName, parsePropertyValue(member.propType, newValue), perf);
    });
  });
};

const initHostElement = (plt, cmpMeta, HostElementConstructor, hydratedCssClass, perf) => {
  if (
  // let's wire up our functions to the host element's prototype
  // we can also inject our platform into each one that needs that api
  // note: these cannot be arrow functions cuz "this" is important here hombre
  HostElementConstructor.connectedCallback = function() {
    // coolsville, our host element has just hit the DOM
    ((plt, cmpMeta, elm, perf) => {
      // initialize our event listeners on the host element
      // we do this now so that we can listening to events that may
      // have fired even before the instance is ready
      plt.hasListenersMap.has(elm) || (
      // it's possible we've already connected
      // then disconnected
      // and the same element is reconnected again
      plt.hasListenersMap.set(elm, true), initElementListeners(plt, elm)), 
      // this element just connected, which may be re-connecting
      // ensure we remove it from our map of disconnected
      plt.isDisconnectedMap.delete(elm), plt.hasConnectedMap.has(elm) || (plt.hasConnectedComponent = true, 
      plt.processingCmp.add(elm), 
      // first time we've connected
      plt.hasConnectedMap.set(elm, true), 
      // register this component as an actively
      // loading child to its parent component
      registerWithParentComponent(plt, elm), 
      // add to the queue to load the bundle
      // it's important to have an async tick in here so we can
      // ensure the "mode" attribute has been added to the element
      // place in high priority since it's not much work and we need
      // to know as fast as possible, but still an async tick in between
      plt.queue.tick(() => {
        // start loading this component mode's bundle
        // if it's already loaded then the callback will be synchronous
        plt.hostSnapshotMap.set(elm, initHostSnapshot(plt.domApi, cmpMeta, elm)), plt.requestBundle(cmpMeta, elm);
      }));
    })(plt, cmpMeta, this);
  }, HostElementConstructor.disconnectedCallback = function() {
    // the element has left the builing
    ((plt, elm, perf) => {
      // only disconnect if we're not temporarily disconnected
      // tmpDisconnected will happen when slot nodes are being relocated
      !plt.tmpDisconnected && isDisconnected(plt.domApi, elm) && (
      // ok, let's officially destroy this thing
      // set this to true so that any of our pending async stuff
      // doesn't continue since we already decided to destroy this node
      // elm._hasDestroyed = true;
      plt.isDisconnectedMap.set(elm, true), 
      // double check that we've informed the ancestor host elements
      // that they're good to go and loaded (cuz this one is on its way out)
      propagateComponentReady(plt, elm), 
      // since we're disconnecting, call all of the JSX ref's with null
      callNodeRefs(plt.vnodeMap.get(elm), true), 
      // detatch any event listeners that may have been added
      // because we're not passing an exact event name it'll
      // remove all of this element's event, which is good
      plt.domApi.$removeEventListener(elm), plt.hasListenersMap.delete(elm), 
      // clear any references to other elements
      // more than likely we've already deleted these references
      // but let's double check there pal
      [ plt.ancestorHostElementMap, plt.onReadyCallbacksMap, plt.hostSnapshotMap ].forEach(wm => wm.delete(elm)));
    })(plt, this);
  }, HostElementConstructor['s-init'] = function() {
    ((plt, elm, hydratedCssClass, perf, instance, onReadyCallbacks, hasCmpLoaded) => {
      // all is good, this component has been told it's time to finish loading
      // it's possible that we've already decided to destroy this element
      // check if this element has any actively loading child elements
      if ((instance = plt.instanceMap.get(elm)) && !plt.isDisconnectedMap.has(elm) && (!elm['s-ld'] || !elm['s-ld'].length)) {
        // cool, so at this point this element isn't already being destroyed
        // and it does not have any child elements that are still loading
        // all of this element's children have loaded (if any)
        plt.isCmpReady.set(elm, true), (hasCmpLoaded = plt.isCmpLoaded.has(elm)) || (
        // remember that this component has loaded
        // isCmpLoaded map is useful to know if we should fire
        // the lifecycle componentDidLoad() or componentDidUpdate()
        plt.isCmpLoaded.set(elm, true), 
        // ensure we remove any child references cuz it doesn't matter at this point
        elm['s-ld'] = void 0, 
        // add the css class that this element has officially hydrated
        plt.domApi.$addClass(elm, hydratedCssClass));
        try {
          // fire off the ref if it exists
          callNodeRefs(plt.vnodeMap.get(elm)), 
          // fire off the user's elm.componentOnReady() callbacks that were
          // put directly on the element (well before anything was ready)
          (onReadyCallbacks = plt.onReadyCallbacksMap.get(elm)) && (onReadyCallbacks.forEach(cb => cb(elm)), 
          plt.onReadyCallbacksMap.delete(elm)), !hasCmpLoaded && instance.componentDidLoad ? instance.componentDidLoad() : hasCmpLoaded && instance.componentDidUpdate && instance.componentDidUpdate();
        } catch (e) {
          plt.onError(e, 4 /* DidLoadError */ , elm);
        }
        // ( •_•)
        // ( •_•)>⌐■-■
        // (⌐■_■)
        // load events fire from bottom to top
        // the deepest elements load first then bubbles up
        propagateComponentReady(plt, elm);
      }
    })(plt, this, hydratedCssClass);
  }, HostElementConstructor.forceUpdate = function() {
    queueUpdate(plt, this, perf);
  }, HostElementConstructor['s-hmr'] = function(hmrVersionId) {
    hmrStart(plt, cmpMeta, this, hmrVersionId);
  }, cmpMeta.membersMeta) {
    const entries = Object.entries(cmpMeta.membersMeta);
    {
      let attrToProp = {};
      entries.forEach(([propName, {attribName}]) => {
        attribName && (attrToProp[attribName] = propName);
      }), attrToProp = Object.assign({}, attrToProp), HostElementConstructor.attributeChangedCallback = function(attribName, _oldVal, newVal) {
        // the browser has just informed us that an attribute
        // on the host element has changed
        (function attributeChangedCallback(attrPropsMap, elm, attribName, newVal) {
          // look up to see if we have a property wired up to this attribute name
          const propName = attrPropsMap[toLowerCase(attribName)];
          propName && (
          // there is not need to cast the value since, it's already casted when
          // the prop is setted
          elm[propName] = newVal);
        })(attrToProp, this, attribName, newVal);
      };
    }
    // add getters/setters to the host element members
    // these would come from the @Prop and @Method decorators that
    // should create the public API to this component
        proxyHostElementPrototype(plt, entries, HostElementConstructor, perf);
  }
};

// esm build which uses es module imports and dynamic imports
((namespace, Context, win, doc, resourcesUrl, hydratedCssClass, components) => {
  const perf = win.performance;
  const cmpRegistry = {
    'html': {}
  };
  const App = win[namespace] = win[namespace] || {};
  const domApi = ((App, win, doc) => {
    // using the $ prefix so that closure is
    // cool with property renaming each of these
    const unregisterListenerFns = new WeakMap();
    const domApi = {
      $doc: doc,
      $supportsShadowDom: !!doc.documentElement.attachShadow,
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
      $addClass: (elm, cssClass) => {
        elm.classList.add(cssClass);
      },
      $childNodes: node => node.childNodes,
      $parentNode: node => node.parentNode,
      $nextSibling: node => node.nextSibling,
      $previousSibling: node => node.previousSibling,
      $tagName: elm => toLowerCase(elm.nodeName),
      $getTextContent: node => node.textContent,
      $setTextContent: (node, text) => node.textContent = text,
      $getAttribute: (elm, key) => elm.getAttribute(key),
      $setAttribute: (elm, key, val) => elm.setAttribute(key, val),
      $removeAttribute: (elm, key) => elm.removeAttribute(key),
      $hasAttribute: (elm, key) => elm.hasAttribute(key),
      $getMode: elm => elm.getAttribute('mode') || (App.Context || {}).mode,
      $elementRef: (elm, referenceName) => {
        if ('child' === referenceName) return elm.firstElementChild;
        if ('parent' === referenceName) return domApi.$parentElement(elm);
        if ('body' === referenceName) return doc.body;
        if ('document' === referenceName) return doc;
        if ('window' === referenceName) return win;
        return elm;
      },
      $addEventListener: (assignerElm, eventName, listenerCallback, assignerId, useCapture, usePassive, attachTo, eventListenerOpts, splt, assignersEventName) => {
        // remember the original name before we possibly change it
        let attachToElm = assignerElm;
        let eventListener = listenerCallback;
        // get the existing unregister listeners for
        // this element from the unregister listeners weakmap
                let assignersUnregListeners = unregisterListenerFns.get(assignerElm);
        assignersEventName = eventName + assignerId, assignersUnregListeners && assignersUnregListeners[assignersEventName] && 
        // removed any existing listeners for this event for the assigner element
        // this element already has this listener, so let's unregister it now
        assignersUnregListeners[assignersEventName](), 'string' === typeof attachTo ? 
        // attachTo is a string, and is probably something like
        // "parent", "window", or "document"
        // and the eventName would be like "mouseover" or "mousemove"
        attachToElm = domApi.$elementRef(assignerElm, attachTo) : 'object' === typeof attachTo ? 
        // we were passed in an actual element to attach to
        attachToElm = attachTo : (
        // depending on the event name, we could actually be attaching
        // this element to something like the document or window
        splt = eventName.split(':'), splt.length > 1 && (
        // document:mousemove
        // parent:touchend
        // body:keyup.enter
        attachToElm = domApi.$elementRef(assignerElm, splt[0]), eventName = splt[1])), attachToElm && (
        // test to see if we're looking for an exact keycode
        splt = eventName.split('.'), splt.length > 1 && (
        // looks like this listener is also looking for a keycode
        // keyup.enter
        eventName = splt[0], eventListener = (ev => {
          // wrap the user's event listener with our own check to test
          // if this keyboard event has the keycode they're looking for
          ev.keyCode === KEY_CODE_MAP[splt[1]] && listenerCallback(ev);
        })), 
        // create the actual event listener options to use
        // this browser may not support event options
        eventListenerOpts = domApi.$supportsEventOptions ? {
          capture: !!useCapture,
          passive: !!usePassive
        } : !!useCapture, 
        // ok, good to go, let's add the actual listener to the dom element
        App.ael(attachToElm, eventName, eventListener, eventListenerOpts), assignersUnregListeners || 
        // we don't already have a collection, let's create it
        unregisterListenerFns.set(assignerElm, assignersUnregListeners = {}), 
        // add the unregister listener to this element's collection
        assignersUnregListeners[assignersEventName] = (() => {
          // looks like it's time to say goodbye
          attachToElm && App.rel(attachToElm, eventName, eventListener, eventListenerOpts), 
          assignersUnregListeners[assignersEventName] = null;
        }));
      },
      $removeEventListener: (elm, eventName, assignerId, assignersUnregListeners) => {
        // get the unregister listener functions for this element
        (assignersUnregListeners = unregisterListenerFns.get(elm)) && (
        // this element has unregister listeners
        eventName ? 
        // passed in one specific event name to remove
        assignersUnregListeners[eventName + assignerId] && assignersUnregListeners[eventName + assignerId]() : 
        // remove all event listeners
        Object.keys(assignersUnregListeners).forEach(assignersEventName => {
          assignersUnregListeners[assignersEventName] && assignersUnregListeners[assignersEventName]();
        }));
      },
      $dispatchEvent: (elm, eventName, data, e) => {
        // create and return the custom event, allows for cancel checks
        return e = new win.CustomEvent(eventName, data), elm && elm.dispatchEvent(e), e;
      },
      $parentElement: (elm, parentNode) => 
      // if the parent node is a document fragment (shadow root)
      // then use the "host" property on it
      // otherwise use the parent node
      (parentNode = domApi.$parentNode(elm)) && 11 /* DocumentFragment */ === domApi.$nodeType(parentNode) ? parentNode.host : parentNode
    };
    domApi.$setAttributeNS = ((elm, namespaceURI, qualifiedName, val) => elm.setAttributeNS(namespaceURI, qualifiedName, val)), 
    win.location.search.indexOf('shadow=false') > 0 && (
    // by adding ?shadow=false it'll force the slot polyfill
    // only add this check when in dev mode
    domApi.$supportsShadowDom = false), App.ael || (App.ael = ((elm, eventName, cb, opts) => elm.addEventListener(eventName, cb, opts)), 
    App.rel = ((elm, eventName, cb, opts) => elm.removeEventListener(eventName, cb, opts)));
    // test if this browser supports event options or not
    try {
      win.addEventListener('e', null, Object.defineProperty({}, 'passive', {
        get: () => domApi.$supportsEventOptions = true
      }));
    } catch (e) {}
    return domApi;
  })(App, win, doc);
  const rootElm = domApi.$doc.documentElement;
  // keep a global set of tags we've already defined
    const globalDefined = win['s-defined'] = win['s-defined'] || {};
  const defineComponent = (cmpMeta, HostElementConstructor) => {
    win.customElements.get(cmpMeta.tagNameMeta) || (
    // define the custom element
    // initialize the members on the host element prototype
    // keep a ref to the metadata with the tag as the key
    initHostElement(plt, cmpRegistry[cmpMeta.tagNameMeta] = cmpMeta, HostElementConstructor.prototype, hydratedCssClass, perf), 
    // add which attributes should be observed
    // at this point the membersMeta only includes attributes which should
    // be observed, it does not include all props yet, so it's safe to
    // loop through all of the props (attrs) and observed them
    // set the array of all the attributes to keep an eye on
    // https://www.youtube.com/watch?v=RBs21CFBALI
    HostElementConstructor.observedAttributes = Object.values(cmpMeta.membersMeta).map(member => member.attribName).filter(attribName => !!attribName), 
    win.customElements.define(cmpMeta.tagNameMeta, HostElementConstructor));
  };
  // create the platform api which is used throughout common core code
    const plt = {
    domApi,
    defineComponent,
    getComponentMeta: elm => cmpRegistry[domApi.$tagName(elm)],
    getContextItem: contextKey => Context[contextKey],
    isClient: true,
    isDefinedComponent: elm => !!(globalDefined[domApi.$tagName(elm)] || plt.getComponentMeta(elm)),
    onError: (err, type, elm) => console.error(err, type, elm && elm.tagName),
    queue: Context.queue = createQueueClient(App, win),
    requestBundle: (cmpMeta, elm, hmrVersionId) => {
      {
        // self loading module using built-in browser's import()
        // this is when not using a 3rd party bundler
        // and components are able to lazy load themselves
        // through standardized browser APIs
        const bundleId = cmpMeta.bundleIds;
        const useScopedCss = false;
        let url = resourcesUrl + bundleId + (useScopedCss ? '.sc' : '') + '.entry.js';
        hmrVersionId && (url += '?s-hmr=' + hmrVersionId), 
        // dynamic es module import() => woot!
        import(url).then(importedModule => {
          try {
            // get the component constructor from the module
            // initialize this component constructor's styles
            // it is possible for the same component to have difficult styles applied in the same app
            cmpMeta.componentConstructor = importedModule[dashToPascalCase(cmpMeta.tagNameMeta)], 
            initStyleTemplate(domApi, cmpMeta, cmpMeta.encapsulationMeta, cmpMeta.componentConstructor.style, cmpMeta.componentConstructor.styleMode), 
            // bundle all loaded up, let's continue
            queueUpdate(plt, elm, perf);
          } catch (e) {
            // oh man, something's up
            console.error(e), 
            // provide a bogus component constructor
            // so the rest of the app acts as normal
            cmpMeta.componentConstructor = class {};
          }
        }, err => console.error(err, url));
      }
    },
    activeRender: false,
    isAppLoaded: false,
    tmpDisconnected: false,
    attachStyles,
    ancestorHostElementMap: new WeakMap(),
    componentAppliedStyles: new WeakMap(),
    hasConnectedMap: new WeakMap(),
    hasListenersMap: new WeakMap(),
    isCmpLoaded: new WeakMap(),
    isCmpReady: new WeakMap(),
    hostElementMap: new WeakMap(),
    hostSnapshotMap: new WeakMap(),
    instanceMap: new WeakMap(),
    isDisconnectedMap: new WeakMap(),
    isQueuedForUpdate: new WeakMap(),
    onReadyCallbacksMap: new WeakMap(),
    queuedEvents: new WeakMap(),
    vnodeMap: new WeakMap(),
    valuesMap: new WeakMap(),
    processingCmp: new Set(),
    onAppReadyCallbacks: []
  };
  // set App Context
  Context.isServer = Context.isPrerender = !(Context.isClient = true), Context.window = win, 
  Context.location = win.location, Context.document = doc, Context.resourcesUrl = Context.publicPath = resourcesUrl, 
  Context.enableListener = ((instance, eventName, enabled, attachTo, passive) => (function enableEventListener(plt, instance, eventName, shouldEnable, attachTo, passive) {
    if (instance) {
      // cool, we've got an instance, it's get the element it's on
      const elm = plt.hostElementMap.get(instance);
      const cmpMeta = plt.getComponentMeta(elm);
      if (cmpMeta && cmpMeta.listenersMeta) 
      // alrighty, so this cmp has listener meta
      if (shouldEnable) {
        // we want to enable this event
        // find which listen meta we're talking about
        const listenMeta = cmpMeta.listenersMeta.find(l => l.eventName === eventName);
        listenMeta && 
        // found the listen meta, so let's add the listener
        plt.domApi.$addEventListener(elm, eventName, ev => instance[listenMeta.eventMethodName](ev), 1, listenMeta.eventCapture, void 0 === passive ? listenMeta.eventPassive : !!passive, attachTo);
      } else 
      // we're disabling the event listener
      // so let's just remove it entirely
      plt.domApi.$removeEventListener(elm, eventName, 1);
    }
  })(plt, instance, eventName, enabled, attachTo, passive)), plt.emitEvent = Context.emit = ((elm, eventName, data) => domApi.$dispatchEvent(elm, Context.eventNameFn ? Context.eventNameFn(eventName) : eventName, data)), 
  // add the h() fn to the app's global namespace
  App.h = h$1, App.Context = Context, 
  // create a method that returns a promise
  // which gets resolved when the app's queue is empty
  // and app is idle, works for both initial load and updates
  App.onReady = (() => new Promise(resolve => plt.queue.write(() => plt.processingCmp.size ? plt.onAppReadyCallbacks.push(resolve) : resolve()))), 
  // create the renderer that will be used
  plt.render = createRendererPatch(plt, domApi), 
  // setup the root element which is the mighty <html> tag
  // the <html> has the final say of when the app has loaded
  rootElm['s-ld'] = [], rootElm['s-rn'] = true, 
  // this will fire when all components have finished loaded
  rootElm['s-init'] = (() => {
    plt.isCmpReady.set(rootElm, App.loaded = plt.isAppLoaded = true), domApi.$dispatchEvent(win, 'appload', {
      detail: {
        namespace
      }
    });
  }), generateDevInspector(namespace, win, plt, components), components.map(parseComponentLoader).forEach(cmpMeta => defineComponent(cmpMeta, class extends HTMLElement {})), 
  plt.hasConnectedComponent || 
  // we just defined call the custom elements but no
  // connectedCallbacks happened, so no components in the dom :(
  rootElm['s-init'](), 
  // create the componentOnReady fn
  ((plt, App, win, apps, queuedComponentOnReadys, i) => {
    if (
    // add componentOnReady() to the App object
    // this also is used to know that the App's core is ready
    App.componentOnReady = ((elm, resolve) => {
      if (!elm.nodeName.includes('-')) return resolve(null), false;
      const cmpMeta = plt.getComponentMeta(elm);
      if (cmpMeta) if (plt.isCmpReady.has(elm)) 
      // element has already loaded, pass the resolve the element component
      // so we know that the resolve knows it this element is an app component
      resolve(elm); else {
        // element hasn't loaded yet or it has an update in progress
        // add this resolve specifically to this elements on ready queue
        const onReadyCallbacks = plt.onReadyCallbacksMap.get(elm) || [];
        onReadyCallbacks.push(resolve), plt.onReadyCallbacksMap.set(elm, onReadyCallbacks);
      }
      // return a boolean if this app recognized this element or not
            return !!cmpMeta;
    }), queuedComponentOnReadys) {
      // we've got some componentOnReadys in the queue before the app was ready
      for (i = queuedComponentOnReadys.length - 1; i >= 0; i--) 
      // go through each element and see if this app recongizes it
      App.componentOnReady(queuedComponentOnReadys[i][0], queuedComponentOnReadys[i][1]) && 
      // turns out this element belongs to this app
      // remove the resolve from the queue so in the end
      // all that's left in the queue are elements not apart of any apps
      queuedComponentOnReadys.splice(i, 1);
      for (i = 0; i < apps.length; i++) if (!win[apps[i]].componentOnReady) 
      // there is at least 1 apps that isn't ready yet
      // so let's stop here cuz there's still app cores loading
      return;
      // if we got to this point then that means all of the apps are ready
      // and they would have removed any of their elements from queuedComponentOnReadys
      // so let's do the cleanup of the  remaining queuedComponentOnReadys
            for (i = 0; i < queuedComponentOnReadys.length; i++) 
      // resolve any queued componentsOnReadys that are left over
      // since these elements were not apart of any apps
      // call the resolve fn, but pass null so it's know this wasn't a known app component
      queuedComponentOnReadys[i][1](null);
      queuedComponentOnReadys.length = 0;
    }
  })(plt, App, win, win['s-apps'], win['s-cr']), 
  // notify that the app has initialized and the core script is ready
  // but note that the components have not fully loaded yet
  App.initialized = true;
})(n, x, w, d, r, h, c);
})(window,document,{},"DocsSite","hydrated",[["footer-bar","footer-bar",1],["header-bar","header-bar",1,[["el",64],["isMobileMenuShown",16],["isSearchVisible",1,0,"is-search-visible",4],["isSticky",16],["query",1,0,1,2],["version",1,0,1,2]],0,[["window:scroll","handleScroll",0,1],["window:resize","handleResize",0,1]]],["icon-list","icon-list",1,[["data",1,0,1,1],["el",64],["isHeaderSearchVisible",16],["query",1,0,1,2],["selectedIcon",16],["selectedIconType",16]],0,[["body:keyup","escListener"],["body:click","handleBodyClicked"],["clearToast","handleClearToast"],["window:scroll","handleScroll",0,1]]],["icon-search","icon-search",1,[["autofocus",1,0,1,2],["query",1,0,1,2],["showClearCtrl",16],["size",1,0,1,2]],0,[["keyup","searchListener"]]],["ionicons-site","header-bar",1,[["data",16],["isHeaderSearchVisible",16],["query",16]],0,[["window:scroll","handleScroll",0,1],["hasSearched","searchHandler"],["toggleHeaderSearch","toggleHandler"]]],["landing-page","icon-list",1,[["data",1,0,1,1],["el",64],["query",1,0,1,2]]],["notfound-page","notfound-page",1],["stencil-route","header-bar",1,[["component",1,0,1,2],["componentProps",1],["componentUpdated",1],["el",64],["exact",1,0,1,4],["group",1,0,1,2],["history",1],["historyType",1,0,"history-type",2],["location",1],["match",2],["routeRender",1],["routeViewsUpdated",1],["scrollTopOffset",1,0,"scroll-top-offset",8],["url",1,0,1,2]]],["stencil-route-link","stencil-route-link",0,[["activeClass",1,0,"active-class",2],["anchorClass",1,0,"anchor-class",2],["anchorId",1,0,"anchor-id",2],["anchorRole",1,0,"anchor-role",2],["anchorTabIndex",1,0,"anchor-tab-index",2],["anchorTitle",1,0,"anchor-title",2],["ariaHaspopup",1,0,"aria-haspopup",2],["ariaLabel",1,0,"aria-label",2],["ariaPosinset",1,0,"aria-posinset",2],["ariaSetsize",1,0,"aria-setsize",8],["custom",1,0,1,2],["el",64],["exact",1,0,1,4],["history",1],["location",1],["match",16],["root",1,0,1,2],["strict",1,0,1,4],["url",1,0,1,2],["urlMatch",1,0,"url-match",2]]],["stencil-route-switch","header-bar",0,[["el",64],["group",1,0,1,2],["location",1],["queue",4,0,0,0,"queue"],["routeViewsUpdated",1],["scrollTopOffset",1,0,"scroll-top-offset",8]]],["stencil-router","header-bar",0,[["history",16],["historyType",1,0,"history-type",2],["isServer",4,0,0,0,"isServer"],["location",16],["queue",4,0,0,0,"queue"],["root",1,0,1,2],["scrollTopOffset",1,0,"scroll-top-offset",8],["titleSuffix",1,0,"title-suffix",2]]],["toast-bar","icon-list",1,[["el",64],["hadIconOnce",16],["selectedIcon",1],["selectedIconType",1,0,"selected-icon-type",2],["showCopiedConfirm",16],["touchEndY",16],["touchStartY",16]]],["usage-page","usage-page",1,[["data",1,0,1,1],["exampleIcon",16],["exampleType",16],["match",1],["queue",4,0,0,0,"queue"]]]]);