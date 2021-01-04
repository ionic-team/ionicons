/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 *
 * This file is a port of shadowCSS from webcomponents.js to TypeScript.
 * https://github.com/webcomponents/webcomponentsjs/blob/4efecd7e0e/src/ShadowCSS/ShadowCSS.js
 * https://github.com/angular/angular/blob/master/packages/compiler/src/shadow_css.ts
 */
const safeSelector = (selector) => {
    const placeholders = [];
    let index = 0;
    let content;
    // Replaces attribute selectors with placeholders.
    // The WS in [attr="va lue"] would otherwise be interpreted as a selector separator.
    selector = selector.replace(/(\[[^\]]*\])/g, (_, keep) => {
        const replaceBy = `__ph-${index}__`;
        placeholders.push(keep);
        index++;
        return replaceBy;
    });
    // Replaces the expression in `:nth-child(2n + 1)` with a placeholder.
    // WS and "+" would otherwise be interpreted as selector separators.
    content = selector.replace(/(:nth-[-\w]+)(\([^)]+\))/g, (_, pseudo, exp) => {
        const replaceBy = `__ph-${index}__`;
        placeholders.push(exp);
        index++;
        return pseudo + replaceBy;
    });
    const ss = {
        content,
        placeholders,
    };
    return ss;
};
const restoreSafeSelector = (placeholders, content) => {
    return content.replace(/__ph-(\d+)__/g, (_, index) => placeholders[+index]);
};
const _polyfillHost = '-shadowcsshost';
const _polyfillSlotted = '-shadowcssslotted';
// note: :host-context pre-processed to -shadowcsshostcontext.
const _polyfillHostContext = '-shadowcsscontext';
const _parenSuffix = ')(?:\\((' +
    '(?:\\([^)(]*\\)|[^)(]*)+?' +
    ')\\))?([^,{]*)';
const _cssColonHostRe = new RegExp('(' + _polyfillHost + _parenSuffix, 'gim');
const _cssColonHostContextRe = new RegExp('(' + _polyfillHostContext + _parenSuffix, 'gim');
const _cssColonSlottedRe = new RegExp('(' + _polyfillSlotted + _parenSuffix, 'gim');
const _polyfillHostNoCombinator = _polyfillHost + '-no-combinator';
const _polyfillHostNoCombinatorRe = /-shadowcsshost-no-combinator([^\s]*)/;
const _shadowDOMSelectorsRe = [
    /::shadow/g,
    /::content/g
];
const _selectorReSuffix = '([>\\s~+\[.,{:][\\s\\S]*)?$';
const _polyfillHostRe = /-shadowcsshost/gim;
const _colonHostRe = /:host/gim;
const _colonSlottedRe = /::slotted/gim;
const _colonHostContextRe = /:host-context/gim;
const _commentRe = /\/\*\s*[\s\S]*?\*\//g;
const stripComments = (input) => {
    return input.replace(_commentRe, '');
};
const _commentWithHashRe = /\/\*\s*#\s*source(Mapping)?URL=[\s\S]+?\*\//g;
const extractCommentsWithHash = (input) => {
    return input.match(_commentWithHashRe) || [];
};
const _ruleRe = /(\s*)([^;\{\}]+?)(\s*)((?:{%BLOCK%}?\s*;?)|(?:\s*;))/g;
const _curlyRe = /([{}])/g;
const OPEN_CURLY = '{';
const CLOSE_CURLY = '}';
const BLOCK_PLACEHOLDER = '%BLOCK%';
const processRules = (input, ruleCallback) => {
    const inputWithEscapedBlocks = escapeBlocks(input);
    let nextBlockIndex = 0;
    return inputWithEscapedBlocks.escapedString.replace(_ruleRe, (...m) => {
        const selector = m[2];
        let content = '';
        let suffix = m[4];
        let contentPrefix = '';
        if (suffix && suffix.startsWith('{' + BLOCK_PLACEHOLDER)) {
            content = inputWithEscapedBlocks.blocks[nextBlockIndex++];
            suffix = suffix.substring(BLOCK_PLACEHOLDER.length + 1);
            contentPrefix = '{';
        }
        const cssRule = {
            selector,
            content
        };
        const rule = ruleCallback(cssRule);
        return `${m[1]}${rule.selector}${m[3]}${contentPrefix}${rule.content}${suffix}`;
    });
};
const escapeBlocks = (input) => {
    const inputParts = input.split(_curlyRe);
    const resultParts = [];
    const escapedBlocks = [];
    let bracketCount = 0;
    let currentBlockParts = [];
    for (let partIndex = 0; partIndex < inputParts.length; partIndex++) {
        const part = inputParts[partIndex];
        if (part === CLOSE_CURLY) {
            bracketCount--;
        }
        if (bracketCount > 0) {
            currentBlockParts.push(part);
        }
        else {
            if (currentBlockParts.length > 0) {
                escapedBlocks.push(currentBlockParts.join(''));
                resultParts.push(BLOCK_PLACEHOLDER);
                currentBlockParts = [];
            }
            resultParts.push(part);
        }
        if (part === OPEN_CURLY) {
            bracketCount++;
        }
    }
    if (currentBlockParts.length > 0) {
        escapedBlocks.push(currentBlockParts.join(''));
        resultParts.push(BLOCK_PLACEHOLDER);
    }
    const strEscapedBlocks = {
        escapedString: resultParts.join(''),
        blocks: escapedBlocks
    };
    return strEscapedBlocks;
};
const insertPolyfillHostInCssText = (selector) => {
    selector = selector
        .replace(_colonHostContextRe, _polyfillHostContext)
        .replace(_colonHostRe, _polyfillHost)
        .replace(_colonSlottedRe, _polyfillSlotted);
    return selector;
};
const convertColonRule = (cssText, regExp, partReplacer) => {
    // m[1] = :host(-context), m[2] = contents of (), m[3] rest of rule
    return cssText.replace(regExp, (...m) => {
        if (m[2]) {
            const parts = m[2].split(',');
            const r = [];
            for (let i = 0; i < parts.length; i++) {
                const p = parts[i].trim();
                if (!p)
                    break;
                r.push(partReplacer(_polyfillHostNoCombinator, p, m[3]));
            }
            return r.join(',');
        }
        else {
            return _polyfillHostNoCombinator + m[3];
        }
    });
};
const colonHostPartReplacer = (host, part, suffix) => {
    return host + part.replace(_polyfillHost, '') + suffix;
};
const convertColonHost = (cssText) => {
    return convertColonRule(cssText, _cssColonHostRe, colonHostPartReplacer);
};
const colonHostContextPartReplacer = (host, part, suffix) => {
    if (part.indexOf(_polyfillHost) > -1) {
        return colonHostPartReplacer(host, part, suffix);
    }
    else {
        return host + part + suffix + ', ' + part + ' ' + host + suffix;
    }
};
const convertColonSlotted = (cssText, slotAttr) => {
    const regExp = _cssColonSlottedRe;
    return cssText.replace(regExp, (...m) => {
        if (m[2]) {
            const compound = m[2].trim();
            const suffix = m[3];
            const sel = '.' + slotAttr + ' > ' + compound + suffix;
            return sel;
        }
        else {
            return _polyfillHostNoCombinator + m[3];
        }
    });
};
const convertColonHostContext = (cssText) => {
    return convertColonRule(cssText, _cssColonHostContextRe, colonHostContextPartReplacer);
};
const convertShadowDOMSelectors = (cssText) => {
    return _shadowDOMSelectorsRe.reduce((result, pattern) => result.replace(pattern, ' '), cssText);
};
const makeScopeMatcher = (scopeSelector) => {
    const lre = /\[/g;
    const rre = /\]/g;
    scopeSelector = scopeSelector.replace(lre, '\\[').replace(rre, '\\]');
    return new RegExp('^(' + scopeSelector + ')' + _selectorReSuffix, 'm');
};
const selectorNeedsScoping = (selector, scopeSelector) => {
    const re = makeScopeMatcher(scopeSelector);
    return !re.test(selector);
};
const applySimpleSelectorScope = (selector, scopeSelector, hostSelector) => {
    // In Android browser, the lastIndex is not reset when the regex is used in String.replace()
    _polyfillHostRe.lastIndex = 0;
    if (_polyfillHostRe.test(selector)) {
        const replaceBy = `.${hostSelector}`;
        return selector
            .replace(_polyfillHostNoCombinatorRe, (_, selector) => {
            return selector.replace(/([^:]*)(:*)(.*)/, (_, before, colon, after) => {
                return before + replaceBy + colon + after;
            });
        })
            .replace(_polyfillHostRe, replaceBy + ' ');
    }
    return scopeSelector + ' ' + selector;
};
const applyStrictSelectorScope = (selector, scopeSelector, hostSelector) => {
    const isRe = /\[is=([^\]]*)\]/g;
    scopeSelector = scopeSelector.replace(isRe, (_, ...parts) => parts[0]);
    const className = '.' + scopeSelector;
    const _scopeSelectorPart = (p) => {
        let scopedP = p.trim();
        if (!scopedP) {
            return '';
        }
        if (p.indexOf(_polyfillHostNoCombinator) > -1) {
            scopedP = applySimpleSelectorScope(p, scopeSelector, hostSelector);
        }
        else {
            // remove :host since it should be unnecessary
            const t = p.replace(_polyfillHostRe, '');
            if (t.length > 0) {
                const matches = t.match(/([^:]*)(:*)(.*)/);
                if (matches) {
                    scopedP = matches[1] + className + matches[2] + matches[3];
                }
            }
        }
        return scopedP;
    };
    const safeContent = safeSelector(selector);
    selector = safeContent.content;
    let scopedSelector = '';
    let startIndex = 0;
    let res;
    const sep = /( |>|\+|~(?!=))\s*/g;
    // If a selector appears before :host it should not be shimmed as it
    // matches on ancestor elements and not on elements in the host's shadow
    // `:host-context(div)` is transformed to
    // `-shadowcsshost-no-combinatordiv, div -shadowcsshost-no-combinator`
    // the `div` is not part of the component in the 2nd selectors and should not be scoped.
    // Historically `component-tag:host` was matching the component so we also want to preserve
    // this behavior to avoid breaking legacy apps (it should not match).
    // The behavior should be:
    // - `tag:host` -> `tag[h]` (this is to avoid breaking legacy apps, should not match anything)
    // - `tag :host` -> `tag [h]` (`tag` is not scoped because it's considered part of a
    //   `:host-context(tag)`)
    const hasHost = selector.indexOf(_polyfillHostNoCombinator) > -1;
    // Only scope parts after the first `-shadowcsshost-no-combinator` when it is present
    let shouldScope = !hasHost;
    while ((res = sep.exec(selector)) !== null) {
        const separator = res[1];
        const part = selector.slice(startIndex, res.index).trim();
        shouldScope = shouldScope || part.indexOf(_polyfillHostNoCombinator) > -1;
        const scopedPart = shouldScope ? _scopeSelectorPart(part) : part;
        scopedSelector += `${scopedPart} ${separator} `;
        startIndex = sep.lastIndex;
    }
    const part = selector.substring(startIndex);
    shouldScope = shouldScope || part.indexOf(_polyfillHostNoCombinator) > -1;
    scopedSelector += shouldScope ? _scopeSelectorPart(part) : part;
    // replace the placeholders with their original values
    return restoreSafeSelector(safeContent.placeholders, scopedSelector);
};
const scopeSelector = (selector, scopeSelectorText, hostSelector, slotSelector) => {
    return selector.split(',')
        .map(shallowPart => {
        if (slotSelector && shallowPart.indexOf('.' + slotSelector) > -1) {
            return shallowPart.trim();
        }
        if (selectorNeedsScoping(shallowPart, scopeSelectorText)) {
            return applyStrictSelectorScope(shallowPart, scopeSelectorText, hostSelector).trim();
        }
        else {
            return shallowPart.trim();
        }
    })
        .join(', ');
};
const scopeSelectors = (cssText, scopeSelectorText, hostSelector, slotSelector, commentOriginalSelector) => {
    return processRules(cssText, (rule) => {
        let selector = rule.selector;
        let content = rule.content;
        if (rule.selector[0] !== '@') {
            selector = scopeSelector(rule.selector, scopeSelectorText, hostSelector, slotSelector);
        }
        else if (rule.selector.startsWith('@media') || rule.selector.startsWith('@supports') ||
            rule.selector.startsWith('@page') || rule.selector.startsWith('@document')) {
            content = scopeSelectors(rule.content, scopeSelectorText, hostSelector, slotSelector);
        }
        const cssRule = {
            selector: selector.replace(/\s{2,}/g, ' ').trim(),
            content
        };
        return cssRule;
    });
};
const scopeCssText = (cssText, scopeId, hostScopeId, slotScopeId, commentOriginalSelector) => {
    cssText = insertPolyfillHostInCssText(cssText);
    cssText = convertColonHost(cssText);
    cssText = convertColonHostContext(cssText);
    cssText = convertColonSlotted(cssText, slotScopeId);
    cssText = convertShadowDOMSelectors(cssText);
    if (scopeId) {
        cssText = scopeSelectors(cssText, scopeId, hostScopeId, slotScopeId);
    }
    cssText = cssText.replace(/-shadowcsshost-no-combinator/g, `.${hostScopeId}`);
    cssText = cssText.replace(/>\s*\*\s+([^{, ]+)/gm, ' $1 ');
    return cssText.trim();
};
const scopeCss = (cssText, scopeId, commentOriginalSelector) => {
    const hostScopeId = scopeId + '-h';
    const slotScopeId = scopeId + '-s';
    const commentsWithHash = extractCommentsWithHash(cssText);
    cssText = stripComments(cssText);
    const orgSelectors = [];
    if (commentOriginalSelector) {
        const processCommentedSelector = (rule) => {
            const placeholder = `/*!@___${orgSelectors.length}___*/`;
            const comment = `/*!@${rule.selector}*/`;
            orgSelectors.push({ placeholder, comment });
            rule.selector = placeholder + rule.selector;
            return rule;
        };
        cssText = processRules(cssText, rule => {
            if (rule.selector[0] !== '@') {
                return processCommentedSelector(rule);
            }
            else if (rule.selector.startsWith('@media') || rule.selector.startsWith('@supports') ||
                rule.selector.startsWith('@page') || rule.selector.startsWith('@document')) {
                rule.content = processRules(rule.content, processCommentedSelector);
                return rule;
            }
            return rule;
        });
    }
    const scopedCssText = scopeCssText(cssText, scopeId, hostScopeId, slotScopeId);
    cssText = [scopedCssText, ...commentsWithHash].join('\n');
    if (commentOriginalSelector) {
        orgSelectors.forEach(({ placeholder, comment }) => {
            cssText = cssText.replace(placeholder, comment);
        });
    }
    return cssText;
};

export { scopeCss };
