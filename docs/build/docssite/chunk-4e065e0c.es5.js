/*! Built with http://stenciljs.com */
DocsSite.loadBundle('chunk-4e065e0c.js', ['require', 'exports'], function (require, exports) {
    var h = window.DocsSite.h;
    var DEFAULT_DELIMITER = '/';
    var DEFAULT_DELIMITERS = './';
    var PATH_REGEXP = new RegExp([
        '(\\\\.)',
        '(?:\\:(\\w+)(?:\\(((?:\\\\.|[^\\\\()])+)\\))?|\\(((?:\\\\.|[^\\\\()])+)\\))([+*?])?'
    ].join('|'), 'g');
    function parse(str, options) {
        var tokens = [];
        var key = 0;
        var index = 0;
        var path = '';
        var defaultDelimiter = (options && options.delimiter) || DEFAULT_DELIMITER;
        var delimiters = (options && options.delimiters) || DEFAULT_DELIMITERS;
        var pathEscaped = false;
        var res;
        while ((res = PATH_REGEXP.exec(str)) !== null) {
            var m = res[0];
            var escaped = res[1];
            var offset = res.index;
            path += str.slice(index, offset);
            index = offset + m.length;
            if (escaped) {
                path += escaped[1];
                pathEscaped = true;
                continue;
            }
            var prev = '';
            var next = str[index];
            var name = res[2];
            var capture = res[3];
            var group = res[4];
            var modifier = res[5];
            if (!pathEscaped && path.length) {
                var k = path.length - 1;
                if (delimiters.indexOf(path[k]) > -1) {
                    prev = path[k];
                    path = path.slice(0, k);
                }
            }
            if (path) {
                tokens.push(path);
                path = '';
                pathEscaped = false;
            }
            var partial = prev !== '' && next !== undefined && next !== prev;
            var repeat = modifier === '+' || modifier === '*';
            var optional = modifier === '?' || modifier === '*';
            var delimiter = prev || defaultDelimiter;
            var pattern = capture || group;
            tokens.push({
                name: name || key++,
                prefix: prev,
                delimiter: delimiter,
                optional: optional,
                repeat: repeat,
                partial: partial,
                pattern: pattern ? escapeGroup(pattern) : '[^' + escapeString(delimiter) + ']+?'
            });
        }
        if (path || index < str.length) {
            tokens.push(path + str.substr(index));
        }
        return tokens;
    }
    function escapeString(str) {
        return str.replace(/([.+*?=^!:${}()[\]|/\\])/g, '\\$1');
    }
    function escapeGroup(group) {
        return group.replace(/([=!:$/()])/g, '\\$1');
    }
    function flags(options) {
        return options && options.sensitive ? '' : 'i';
    }
    function regexpToRegexp(path, keys) {
        if (!keys)
            return path;
        var groups = path.source.match(/\((?!\?)/g);
        if (groups) {
            for (var i = 0; i < groups.length; i++) {
                keys.push({
                    name: i,
                    prefix: null,
                    delimiter: null,
                    optional: false,
                    repeat: false,
                    partial: false,
                    pattern: null
                });
            }
        }
        return path;
    }
    function arrayToRegexp(path, keys, options) {
        var parts = [];
        for (var i = 0; i < path.length; i++) {
            parts.push(pathToRegexp(path[i], keys, options).source);
        }
        return new RegExp('(?:' + parts.join('|') + ')', flags(options));
    }
    function stringToRegexp(path, keys, options) {
        return tokensToRegExp(parse(path, options), keys, options);
    }
    function tokensToRegExp(tokens, keys, options) {
        options = options || {};
        var strict = options.strict;
        var end = options.end !== false;
        var delimiter = escapeString(options.delimiter || DEFAULT_DELIMITER);
        var delimiters = options.delimiters || DEFAULT_DELIMITERS;
        var endsWith = [].concat(options.endsWith || []).map(escapeString).concat('$').join('|');
        var route = '';
        var isEndDelimited = false;
        for (var i = 0; i < tokens.length; i++) {
            var token = tokens[i];
            if (typeof token === 'string') {
                route += escapeString(token);
                isEndDelimited = i === tokens.length - 1 && delimiters.indexOf(token[token.length - 1]) > -1;
            }
            else {
                var prefix = escapeString(token.prefix || '');
                var capture = token.repeat
                    ? '(?:' + token.pattern + ')(?:' + prefix + '(?:' + token.pattern + '))*'
                    : token.pattern;
                if (keys)
                    keys.push(token);
                if (token.optional) {
                    if (token.partial) {
                        route += prefix + '(' + capture + ')?';
                    }
                    else {
                        route += '(?:' + prefix + '(' + capture + '))?';
                    }
                }
                else {
                    route += prefix + '(' + capture + ')';
                }
            }
        }
        if (end) {
            if (!strict)
                route += '(?:' + delimiter + ')?';
            route += endsWith === '$' ? '$' : '(?=' + endsWith + ')';
        }
        else {
            if (!strict)
                route += '(?:' + delimiter + '(?=' + endsWith + '))?';
            if (!isEndDelimited)
                route += '(?=' + delimiter + '|' + endsWith + ')';
        }
        return new RegExp('^' + route, flags(options));
    }
    function pathToRegexp(path, keys, options) {
        if (path instanceof RegExp) {
            return regexpToRegexp(path, keys);
        }
        if (Array.isArray(path)) {
            return arrayToRegexp(path, keys, options);
        }
        return stringToRegexp(path, keys, options);
    }
    function hasBasename(path, prefix) {
        return (new RegExp('^' + prefix + '(\\/|\\?|#|$)', 'i')).test(path);
    }
    function stripBasename(path, prefix) {
        return hasBasename(path, prefix) ? path.substr(prefix.length) : path;
    }
    function stripTrailingSlash(path) {
        return path.charAt(path.length - 1) === '/' ? path.slice(0, -1) : path;
    }
    function addLeadingSlash(path) {
        return path.charAt(0) === '/' ? path : '/' + path;
    }
    function stripLeadingSlash(path) {
        return path.charAt(0) === '/' ? path.substr(1) : path;
    }
    function parsePath(path) {
        var pathname = path || '/';
        var search = '';
        var hash = '';
        var hashIndex = pathname.indexOf('#');
        if (hashIndex !== -1) {
            hash = pathname.substr(hashIndex);
            pathname = pathname.substr(0, hashIndex);
        }
        var searchIndex = pathname.indexOf('?');
        if (searchIndex !== -1) {
            search = pathname.substr(searchIndex);
            pathname = pathname.substr(0, searchIndex);
        }
        return {
            pathname: pathname,
            search: search === '?' ? '' : search,
            hash: hash === '#' ? '' : hash,
            query: {},
            key: ''
        };
    }
    function createPath(location) {
        var pathname = location.pathname, search = location.search, hash = location.hash;
        var path = pathname || '/';
        if (search && search !== '?') {
            path += (search.charAt(0) === '?' ? search : "?" + search);
        }
        if (hash && hash !== '#') {
            path += (hash.charAt(0) === '#' ? hash : "#" + hash);
        }
        return path;
    }
    function parseQueryString(query) {
        if (!query) {
            return {};
        }
        return (/^[?#]/.test(query) ? query.slice(1) : query)
            .split('&')
            .reduce(function (params, param) {
            var _c = param.split('='), key = _c[0], value = _c[1];
            params[key] = value ? decodeURIComponent(value.replace(/\+/g, ' ')) : '';
            return params;
        }, {});
    }
    function isAbsolute(pathname) {
        return pathname.charAt(0) === '/';
    }
    function createKey(keyLength) {
        return Math.random().toString(36).substr(2, keyLength);
    }
    function spliceOne(list, index) {
        for (var i = index, k = i + 1, n = list.length; k < n; i += 1, k += 1) {
            list[i] = list[k];
        }
        list.pop();
    }
    function resolvePathname(to, from) {
        if (from === void 0) { from = ''; }
        var toParts = to && to.split('/') || [];
        var fromParts = from && from.split('/') || [];
        var isToAbs = to && isAbsolute(to);
        var isFromAbs = from && isAbsolute(from);
        var mustEndAbs = isToAbs || isFromAbs;
        if (to && isAbsolute(to)) {
            fromParts = toParts;
        }
        else if (toParts.length) {
            fromParts.pop();
            fromParts = fromParts.concat(toParts);
        }
        if (!fromParts.length) {
            return '/';
        }
        var hasTrailingSlash;
        if (fromParts.length) {
            var last = fromParts[fromParts.length - 1];
            hasTrailingSlash = (last === '.' || last === '..' || last === '');
        }
        else {
            hasTrailingSlash = false;
        }
        var up = 0;
        for (var i = fromParts.length; i >= 0; i--) {
            var part = fromParts[i];
            if (part === '.') {
                spliceOne(fromParts, i);
            }
            else if (part === '..') {
                spliceOne(fromParts, i);
                up++;
            }
            else if (up) {
                spliceOne(fromParts, i);
                up--;
            }
        }
        if (!mustEndAbs) {
            for (; up--; up) {
                fromParts.unshift('..');
            }
        }
        if (mustEndAbs && fromParts[0] !== '' && (!fromParts[0] || !isAbsolute(fromParts[0]))) {
            fromParts.unshift('');
        }
        var result = fromParts.join('/');
        if (hasTrailingSlash && result.substr(-1) !== '/') {
            result += '/';
        }
        return result;
    }
    function valueEqual(a, b) {
        if (a === b) {
            return true;
        }
        if (a == null || b == null) {
            return false;
        }
        if (Array.isArray(a)) {
            return Array.isArray(b) && a.length === b.length && a.every(function (item, index) {
                return valueEqual(item, b[index]);
            });
        }
        var aType = typeof a;
        var bType = typeof b;
        if (aType !== bType) {
            return false;
        }
        if (aType === 'object') {
            var aValue = a.valueOf();
            var bValue = b.valueOf();
            if (aValue !== a || bValue !== b) {
                return valueEqual(aValue, bValue);
            }
            var aKeys = Object.keys(a);
            var bKeys = Object.keys(b);
            if (aKeys.length !== bKeys.length) {
                return false;
            }
            return aKeys.every(function (key) {
                return valueEqual(a[key], b[key]);
            });
        }
        return false;
    }
    function locationsAreEqual(a, b) {
        return a.pathname === b.pathname &&
            a.search === b.search &&
            a.hash === b.hash &&
            a.key === b.key &&
            valueEqual(a.state, b.state);
    }
    function createLocation(path, state, key, currentLocation) {
        var location;
        if (typeof path === 'string') {
            location = parsePath(path);
            if (location.state !== undefined) {
                location.state = state;
            }
        }
        else {
            location = Object.assign({ pathname: '' }, path);
            if (location.search && location.search.charAt(0) !== '?') {
                location.search = '?' + location.search;
            }
            if (location.hash && location.hash.charAt(0) !== '#') {
                location.hash = '#' + location.hash;
            }
            if (state !== undefined && location.state === undefined) {
                location.state = state;
            }
        }
        try {
            location.pathname = decodeURI(location.pathname);
        }
        catch (e) {
            if (e instanceof URIError) {
                throw new URIError('Pathname "' + location.pathname + '" could not be decoded. ' +
                    'This is likely caused by an invalid percent-encoding.');
            }
            else {
                throw e;
            }
        }
        location.key = key;
        if (currentLocation) {
            if (!location.pathname) {
                location.pathname = currentLocation.pathname;
            }
            else if (location.pathname.charAt(0) !== '/') {
                location.pathname = resolvePathname(location.pathname, currentLocation.pathname);
            }
        }
        else {
            if (!location.pathname) {
                location.pathname = '/';
            }
        }
        location.query = parseQueryString(location.search || '');
        return location;
    }
    var patternCache = {};
    var cacheLimit = 10000;
    var cacheCount = 0;
    function compilePath(pattern, options) {
        var cacheKey = "" + options.end + options.strict;
        var cache = patternCache[cacheKey] || (patternCache[cacheKey] = {});
        var cachePattern = JSON.stringify(pattern);
        if (cache[cachePattern]) {
            return cache[cachePattern];
        }
        var keys = [];
        var re = pathToRegexp(pattern, keys, options);
        var compiledPattern = { re: re, keys: keys };
        if (cacheCount < cacheLimit) {
            cache[cachePattern] = compiledPattern;
            cacheCount += 1;
        }
        return compiledPattern;
    }
    function matchPath(pathname, options) {
        if (options === void 0) { options = {}; }
        if (typeof options === 'string') {
            options = { path: options };
        }
        var _c = options.path, path = _c === void 0 ? '/' : _c, _d = options.exact, exact = _d === void 0 ? false : _d, _e = options.strict, strict = _e === void 0 ? false : _e;
        var _f = compilePath(path, { end: exact, strict: strict }), re = _f.re, keys = _f.keys;
        var match = re.exec(pathname);
        if (!match) {
            return null;
        }
        var url = match[0], values = match.slice(1);
        var isExact = pathname === url;
        if (exact && !isExact) {
            return null;
        }
        return {
            path: path,
            url: path === '/' && url === '' ? '/' : url,
            isExact: isExact,
            params: keys.reduce(function (memo, key, index) {
                memo[key.name] = values[index];
                return memo;
            }, {})
        };
    }
    function matchesAreEqual(a, b) {
        if (a == null && b == null) {
            return true;
        }
        if (b == null) {
            return false;
        }
        return a && b &&
            a.path === b.path &&
            a.url === b.url &&
            valueEqual(a.params, b.params);
    }
    /*!
     * StencilStateTunnel: Core, es5
     * Built with http://stenciljs.com
     */
    function u(n, t) { for (var e, r, i = null, o = !1, u = !1, f = arguments.length; f-- > 2;)
        T.push(arguments[f]); for (; T.length > 0;) {
        var c = T.pop();
        if (c && void 0 !== c.pop)
            for (f = c.length; f--;)
                T.push(c[f]);
        else
            "boolean" == typeof c && (c = null), (u = "function" != typeof n) && (null == c ? c = "" : "number" == typeof c ? c = String(c) : "string" != typeof c && (u = !1)), u && o ? i[i.length - 1].vtext += c : null === i ? i = [u ? { vtext: c } : c] : i.push(u ? { vtext: c } : c), o = u;
    } if (null != t) {
        if (t.className && (t.class = t.className), "object" == typeof t.class) {
            for (f in t.class)
                t.class[f] && T.push(f);
            t.class = T.join(" "), T.length = 0;
        }
        null != t.key && (e = t.key), null != t.name && (r = t.name);
    } return "function" == typeof n ? n(t, i || [], W) : { vtag: n, vchildren: i, vtext: void 0, vattrs: t, vkey: e, vname: r, w: void 0, g: !1 }; }
    function f(n) { return { vtag: n.vtag, vchildren: n.vchildren, vtext: n.vtext, vattrs: n.vattrs, vkey: n.vkey, vname: n.vname }; }
    undefined && undefined.Dn || (Object.setPrototypeOf || Array);
    var T = [], W = { forEach: function (n, t) { n.forEach(function (n, e, r) { return t(f(n), e, r); }); }, map: function (n, t) { return n.map(function (n, e, r) { return function i(n) { return { vtag: n.vtag, vchildren: n.vchildren, vtext: n.vtext, vattrs: n.vattrs, vkey: n.vkey, vname: n.vname }; }(t(f(n), e, r)); }); } };
    /*! Built with http://stenciljs.com */
    var __rest = function (s, e) {
        var t = {};
        for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
                t[p] = s[p];
        if (s != null && typeof Object.getOwnPropertySymbols === "function")
            for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++)
                if (e.indexOf(p[i]) < 0)
                    t[p[i]] = s[p[i]];
        return t;
    };
    function defaultConsumerRender(subscribe, renderer) {
        return u("context-consumer", { subscribe: subscribe, renderer: renderer });
    }
    function createProviderConsumer(defaultState, consumerRender) {
        if (consumerRender === void 0) {
            consumerRender = defaultConsumerRender;
        }
        var listeners = new Map();
        var currentState = defaultState;
        function notifyConsumers() {
            listeners.forEach(updateListener);
        }
        function updateListener(fields, listener) {
            if (Array.isArray(fields)) {
                fields.slice().forEach(function (fieldName) {
                    listener[fieldName] = currentState[fieldName];
                });
            }
            else {
                listener[fields] = Object.assign({}, currentState);
            }
            listener.forceUpdate();
        }
        function attachListener(propList) {
            return function (el) {
                if (listeners.has(el)) {
                    return;
                }
                listeners.set(el, propList);
                updateListener(propList, el);
            };
        }
        function subscribe(el, propList) {
            attachListener(propList)(el);
            return function () {
                listeners.delete(el);
            };
        }
        var Provider = function (_b, children) {
            var state = _b.state;
            currentState = state;
            notifyConsumers();
            return children;
        };
        var Consumer = function (props, children) {
            return consumerRender(subscribe, children[0]);
        };
        function wrapConsumer(childComponent, fieldList) {
            var Child = childComponent.is;
            return function (_a) {
                var children = _a.children, props = __rest(_a, ["children"]);
                return (u(Child, Object.assign({ ref: attachListener(fieldList) }, props), children));
            };
        }
        function injectProps(childComponent, fieldList) {
            var unsubscribe = null;
            var elementRefName = Object.keys(childComponent.properties).find(function (propName) {
                return childComponent.properties[propName].elementRef == true;
            });
            if (elementRefName == undefined) {
                throw new Error("Please ensure that your Component " + childComponent.is + " has an attribute with an \"@Element\" decorator. " +
                    "This is required to be able to inject properties.");
            }
            var prevComponentWillLoad = childComponent.prototype.componentWillLoad;
            childComponent.prototype.componentWillLoad = function () {
                unsubscribe = subscribe(this[elementRefName], fieldList);
                if (prevComponentWillLoad) {
                    return prevComponentWillLoad.bind(this)();
                }
            };
            var prevComponentDidUnload = childComponent.prototype.componentDidUnload;
            childComponent.prototype.componentDidUnload = function () {
                unsubscribe();
                if (prevComponentDidUnload) {
                    return prevComponentDidUnload.bind(this)();
                }
            };
        }
        return {
            Provider: Provider,
            Consumer: Consumer,
            wrapConsumer: wrapConsumer,
            injectProps: injectProps
        };
    }
    // StencilStateTunnel: ES Module
    var ActiveRouter = createProviderConsumer({
        historyType: 'browser',
        location: {
            pathname: '',
            query: {},
            key: ''
        },
        titleSuffix: '',
        root: '/',
        routeViewsUpdated: function () { }
    });
    var canUseDOM = !!(typeof window !== 'undefined' && window.document && window.document.createElement);
    var addEventListener$1 = function (node, event, listener) { return (node.addEventListener
        ? node.addEventListener(event, listener, false)
        : node.attachEvent('on' + event, listener)); };
    var removeEventListener = function (node, event, listener) { return (node.removeEventListener
        ? node.removeEventListener(event, listener, false)
        : node.detachEvent('on' + event, listener)); };
    var getConfirmation = function (message, callback) { return (callback(window.confirm(message))); };
    var isModifiedEvent = function (event) { return (event.metaKey || event.altKey || event.ctrlKey || event.shiftKey); };
    var supportsHistory = function () {
        var ua = window.navigator.userAgent;
        if ((ua.indexOf('Android 2.') !== -1 || ua.indexOf('Android 4.0') !== -1) &&
            ua.indexOf('Mobile Safari') !== -1 &&
            ua.indexOf('Chrome') === -1 &&
            ua.indexOf('Windows Phone') === -1) {
            return false;
        }
        return window.history && 'pushState' in window.history;
    };
    var supportsPopStateOnHashChange = function () { return (window.navigator.userAgent.indexOf('Trident') === -1); };
    var supportsGoWithoutReloadUsingHash = function () { return (window.navigator.userAgent.indexOf('Firefox') === -1); };
    var isExtraneousPopstateEvent = function (event) { return (event.state === undefined &&
        navigator.userAgent.indexOf('CriOS') === -1); };
    var storageAvailable = function (type) {
        var storage = window[type], x = '__storage_test__';
        try {
            storage.setItem(x, x);
            storage.removeItem(x);
            return true;
        }
        catch (e) {
            return e instanceof DOMException && (e.code === 22 ||
                e.code === 1014 ||
                e.name === 'QuotaExceededError' ||
                e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
                storage.length !== 0;
        }
    };
    exports.matchPath = matchPath;
    exports.matchesAreEqual = matchesAreEqual;
    exports.ActiveRouter = ActiveRouter;
    exports.storageAvailable = storageAvailable;
    exports.createLocation = createLocation;
    exports.createKey = createKey;
    exports.addLeadingSlash = addLeadingSlash;
    exports.stripTrailingSlash = stripTrailingSlash;
    exports.hasBasename = hasBasename;
    exports.stripBasename = stripBasename;
    exports.createPath = createPath;
    exports.canUseDOM = canUseDOM;
    exports.addEventListener = addEventListener$1;
    exports.removeEventListener = removeEventListener;
    exports.getConfirmation = getConfirmation;
    exports.supportsHistory = supportsHistory;
    exports.supportsPopStateOnHashChange = supportsPopStateOnHashChange;
    exports.isExtraneousPopstateEvent = isExtraneousPopstateEvent;
    exports.locationsAreEqual = locationsAreEqual;
    exports.stripLeadingSlash = stripLeadingSlash;
    exports.supportsGoWithoutReloadUsingHash = supportsGoWithoutReloadUsingHash;
    exports.isModifiedEvent = isModifiedEvent;
});
