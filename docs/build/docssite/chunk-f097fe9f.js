const h = window.DocsSite.h;

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
function compile(str, options) {
    return tokensToFunction(parse(str, options));
}
function tokensToFunction(tokens) {
    var matches = new Array(tokens.length);
    for (var i = 0; i < tokens.length; i++) {
        var token = tokens[i];
        if (typeof token === 'object') {
            matches[i] = new RegExp('^(?:' + token.pattern + ')$');
        }
    }
    return function (data, options) {
        var path = '';
        var encode = (options && options.encode) || encodeURIComponent;
        for (var i = 0; i < tokens.length; i++) {
            var token = tokens[i];
            if (typeof token === 'string') {
                path += token;
                continue;
            }
            var value = data ? data[token.name] : undefined;
            var segment;
            if (Array.isArray(value)) {
                if (!token.repeat) {
                    throw new TypeError('Expected "' + token.name + '" to not repeat, but got array');
                }
                if (value.length === 0) {
                    if (token.optional)
                        continue;
                    throw new TypeError('Expected "' + token.name + '" to not be empty');
                }
                for (var j = 0; j < value.length; j++) {
                    segment = encode(value[j]);
                    if (!matches[i].test(segment)) {
                        throw new TypeError('Expected all "' + token.name + '" to match "' + token.pattern + '"');
                    }
                    path += (j === 0 ? token.prefix : token.delimiter) + segment;
                }
                continue;
            }
            if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
                segment = encode(String(value));
                if (!matches[i].test(segment)) {
                    throw new TypeError('Expected "' + token.name + '" to match "' + token.pattern + '", but got "' + segment + '"');
                }
                path += token.prefix + segment;
                continue;
            }
            if (token.optional) {
                if (token.partial)
                    path += token.prefix;
                continue;
            }
            throw new TypeError('Expected "' + token.name + '" to be ' + (token.repeat ? 'an array' : 'a string'));
        }
        return path;
    };
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
function stripPrefix(path, prefix) {
    return path.indexOf(prefix) === 0 ? path.substr(prefix.length) : path;
}
function parsePath(path) {
    let pathname = path || '/';
    let search = '';
    let hash = '';
    const hashIndex = pathname.indexOf('#');
    if (hashIndex !== -1) {
        hash = pathname.substr(hashIndex);
        pathname = pathname.substr(0, hashIndex);
    }
    const searchIndex = pathname.indexOf('?');
    if (searchIndex !== -1) {
        search = pathname.substr(searchIndex);
        pathname = pathname.substr(0, searchIndex);
    }
    return {
        pathname,
        search: search === '?' ? '' : search,
        hash: hash === '#' ? '' : hash,
        query: {},
        key: ''
    };
}
function createPath(location) {
    const { pathname, search, hash } = location;
    let path = pathname || '/';
    if (search && search !== '?') {
        path += (search.charAt(0) === '?' ? search : `?${search}`);
    }
    if (hash && hash !== '#') {
        path += (hash.charAt(0) === '#' ? hash : `#${hash}`);
    }
    return path;
}
function parseQueryString(query) {
    if (!query) {
        return {};
    }
    return (/^[?#]/.test(query) ? query.slice(1) : query)
        .split('&')
        .reduce((params, param) => {
        let [key, value] = param.split('=');
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
    for (let i = index, k = i + 1, n = list.length; k < n; i += 1, k += 1) {
        list[i] = list[k];
    }
    list.pop();
}
function resolvePathname(to, from = '') {
    const toParts = to && to.split('/') || [];
    let fromParts = from && from.split('/') || [];
    const isToAbs = to && isAbsolute(to);
    const isFromAbs = from && isAbsolute(from);
    const mustEndAbs = isToAbs || isFromAbs;
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
    let hasTrailingSlash;
    if (fromParts.length) {
        const last = fromParts[fromParts.length - 1];
        hasTrailingSlash = (last === '.' || last === '..' || last === '');
    }
    else {
        hasTrailingSlash = false;
    }
    let up = 0;
    for (let i = fromParts.length; i >= 0; i--) {
        const part = fromParts[i];
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
    let result = fromParts.join('/');
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
    const aType = typeof a;
    const bType = typeof b;
    if (aType !== bType) {
        return false;
    }
    if (aType === 'object') {
        const aValue = a.valueOf();
        const bValue = b.valueOf();
        if (aValue !== a || bValue !== b) {
            return valueEqual(aValue, bValue);
        }
        const aKeys = Object.keys(a);
        const bKeys = Object.keys(b);
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
    let location;
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

const patternCache = {};
const cacheLimit = 10000;
let cacheCount = 0;
function compilePath(pattern, options) {
    const cacheKey = `${options.end}${options.strict}`;
    const cache = patternCache[cacheKey] || (patternCache[cacheKey] = {});
    const cachePattern = JSON.stringify(pattern);
    if (cache[cachePattern]) {
        return cache[cachePattern];
    }
    const keys = [];
    const re = pathToRegexp(pattern, keys, options);
    const compiledPattern = { re, keys };
    if (cacheCount < cacheLimit) {
        cache[cachePattern] = compiledPattern;
        cacheCount += 1;
    }
    return compiledPattern;
}
function matchPath(pathname, options = {}) {
    if (typeof options === 'string') {
        options = { path: options };
    }
    const { path = '/', exact = false, strict = false } = options;
    const { re, keys } = compilePath(path, { end: exact, strict });
    const match = re.exec(pathname);
    if (!match) {
        return null;
    }
    const [url, ...values] = match;
    const isExact = pathname === url;
    if (exact && !isExact) {
        return null;
    }
    return {
        path,
        url: path === '/' && url === '' ? '/' : url,
        isExact,
        params: keys.reduce((memo, key, index) => {
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
function n(n,t){return "sc-"+n.n+(t&&t!==E?"-"+t:"")}function t(n,t){return n+(t?"-h":"-s")}function e(t,e,r,i){var o=2===r.t||1===r.t&&!t.r.e,u=r.n+i.mode,f=r[u];if(o&&(i["s-sc"]=n(r,i.mode)),f||(f=r[u=r.n+E],o&&(i["s-sc"]=n(r))),f){var c=e.i.head,a=t.o.get(c);if(a||t.o.set(c,a={}),!a[u]){var s=void 0;if(t.u?s=t.u.f(i,u,f):((s=e.c("style")).innerHTML=f,a[u]=!0),s){var l=c.querySelectorAll("[data-styles]");e.a(c,s,l.length&&l[l.length-1].nextSibling||c.firstChild);}}}}function r(n){return {s:n[0],l:n[1],v:!!n[2],p:!!n[3],d:!!n[4]}}function i(n,t){if(S(t)&&"object"!=typeof t&&"function"!=typeof t){if(n===Boolean||4===n)return "false"!==t&&(""===t||!!t);if(n===Number||8===n)return parseFloat(t);if(n===String||2===n)return t.toString()}return t}function o(n,t,e,r,i,o){if(n.y.delete(t),(i=n.m.get(t))&&((r=i["s-ld"])&&((e=r.indexOf(t))>-1&&r.splice(e,1),r.length||i["s-init"]&&i["s-init"]()),n.m.delete(t)),n.b.length&&!n.y.size)for(;o=n.b.shift();)o();}function u(n,t){for(var e,r,i=null,o=!1,u=!1,f=arguments.length;f-- >2;)T.push(arguments[f]);for(;T.length>0;){var c=T.pop();if(c&&void 0!==c.pop)for(f=c.length;f--;)T.push(c[f]);else"boolean"==typeof c&&(c=null),(u="function"!=typeof n)&&(null==c?c="":"number"==typeof c?c=String(c):"string"!=typeof c&&(u=!1)),u&&o?i[i.length-1].vtext+=c:null===i?i=[u?{vtext:c}:c]:i.push(u?{vtext:c}:c),o=u;}if(null!=t){if(t.className&&(t.class=t.className),"object"==typeof t.class){for(f in t.class)t.class[f]&&T.push(f);t.class=T.join(" "),T.length=0;}null!=t.key&&(e=t.key),null!=t.name&&(r=t.name);}return "function"==typeof n?n(t,i||[],W):{vtag:n,vchildren:i,vtext:void 0,vattrs:t,vkey:e,vname:r,w:void 0,g:!1}}function f(n){return {vtag:n.vtag,vchildren:n.vchildren,vtext:n.vtext,vattrs:n.vattrs,vkey:n.vkey,vname:n.vname}}function c(n,t){n.y.add(t),n.M.has(t)||(n.M.set(t,!0),n.j?n.queue.write(function(){return a(n,t)}):n.queue.tick(function(){return a(n,t)}));}function a(n,t,e,r,o,u){if(n.M.delete(t),!n.k.has(t)){if(r=n.A.get(t))try{r.componentWillUpdate&&(u=r.componentWillUpdate());}catch(e){n.C(e,5,t);}else{if((o=n.m.get(t))&&!o["s-rn"])return void(o["s-rc"]=o["s-rc"]||[]).push(function(){a(n,t);});r=function f(n,t,e,r,o,u,c){try{r=new(o=n.S(t).O),function a(n,t,e,r,o){n._.set(r,e),n.x.has(e)||n.x.set(e,{}),Object.entries(Object.assign({color:{type:String}},t.properties,{mode:{type:String}})).forEach(function(t){var u=t[0],f=t[1];(function c(n,t,e,r,o,u,f,a){if(t.type||t.state){var s=n.x.get(e);t.state||(!t.attr||void 0!==s[o]&&""!==s[o]||(f=u&&u.P)&&S(a=f[t.attr])&&(s[o]=i(t.type,a)),e.hasOwnProperty(o)&&(void 0===s[o]&&(s[o]=i(t.type,e[o])),"mode"!==o&&delete e[o])),r.hasOwnProperty(o)&&void 0===s[o]&&(s[o]=r[o]),t.watchCallbacks&&(s[N+o]=t.watchCallbacks.slice()),p(r,o,function d(t){return (t=n.x.get(n._.get(this)))&&t[o]},function h(e,r){(r=n._.get(this))&&(t.state||t.mutable)&&l(n,r,o,e);});}else t.elementRef&&v(r,o,e);})(n,f,e,r,u,o);});}(n,o,t,r,e);}catch(e){r={},n.C(e,7,t,!0);}return n.A.set(t,r),r}(n,t,n.T.get(t));try{r.componentWillLoad&&(u=r.componentWillLoad());}catch(e){n.C(e,3,t);}}u&&u.then?u.then(function(){return s(n,t,r)}).catch(function(e){s(n,t,r);}):s(n,t,r);}}function s(n,e,r){(function i(n,e,r,o){try{var f=e.O.host,c=e.O.encapsulation,a="shadow"===c&&n.r.e,s=r;if(!r["s-rn"]){n.W(n,n.r,e,r);var l=r["s-sc"];l&&(n.r.N(r,t(l,!0)),o.render||n.r.N(r,t(l)));}if(o.render||o.hostData||f){n.R=!0;var v=o.render&&o.render();n.R=!1;var p=n.L.get(r)||{};p.w=s;var d=u(null,void 0,v);n.L.set(r,n.render(r,p,d,a,c));}n.u&&n.u.D(r),r["s-rn"]=!0,r["s-rc"]&&(r["s-rc"].forEach(function(n){return n()}),r["s-rc"]=null);}catch(t){n.R=!1,n.C(t,8,r,!0);}})(n,n.S(e),e,r);try{e["s-init"]();}catch(t){n.C(t,6,e,!0);}}function l(n,t,e,r,i){var o=n.x.get(t);o||n.x.set(t,o={}),r!==o[e]&&(o[e]=r,n.A.get(t)&&!n.R&&t["s-rn"]&&c(n,t));}function v(n,t,e){Object.defineProperty(n,t,{configurable:!0,value:e});}function p(n,t,e,r){Object.defineProperty(n,t,{configurable:!0,get:e,set:r});}function d(n,t,e,r,i,o,u){if("class"!==e||o)if("style"===e){for(var f in r)i&&null!=i[f]||(/-/.test(f)?t.style.F(f):t.style[f]="");for(var f in i)r&&i[f]===r[f]||(/-/.test(f)?t.style.setProperty(f,i[f]):t.style[f]=i[f]);}else if("o"!==e[0]||"n"!==e[1]||!/[A-Z]/.test(e[2])||e in t)if("list"!==e&&"type"!==e&&!o&&(e in t||-1!==["object","function"].indexOf(typeof i)&&null!==i)){var c=n.S(t);c&&c.H&&c.H[e]?y(t,e,i):"ref"!==e&&(y(t,e,null==i?"":i),null!=i&&!1!==i||n.r.q(t,e));}else null!=i&&"key"!==e?function a(n,t,e,r){void 0===r&&(r="boolean"==typeof e);var i=t!==(t=t.replace(/^xlink\:?/,""));null==e||r&&(!e||"false"===e)?i?n.removeAttributeNS(R,_(t)):n.removeAttribute(t):"function"!=typeof e&&(e=r?"":e.toString(),i?n.setAttributeNS(R,_(t),e):n.setAttribute(t,e));}(t,e,i):(o||n.r.U(t,e)&&(null==i||!1===i))&&n.r.q(t,e);else e=_(e)in t?_(e.substring(2)):_(e[2])+e.substring(3),i?i!==r&&n.r.B(t,e,i):n.r.I(t,e);else if(r!==i){var s=h$1(r),l=h$1(i),v=s.filter(function(n){return !l.includes(n)}),p=h$1(t.className).filter(function(n){return !v.includes(n)}),d=l.filter(function(n){return !s.includes(n)&&!p.includes(n)});p.push.apply(p,d),t.className=p.join(" ");}}function h$1(n){return null==n||""===n?[]:n.trim().split(/\s+/)}function y(n,t,e){try{n[t]=e;}catch(n){}}function m(n,t,e,r,i){var o=11===e.w.nodeType&&e.w.host?e.w.host:e.w,u=t&&t.vattrs||C,f=e.vattrs||C;for(i in u)f&&null!=f[i]||null==u[i]||d(n,o,i,u[i],void 0,r,e.g);for(i in f)i in u&&f[i]===("value"===i||"checked"===i?o[i]:u[i])||d(n,o,i,u[i],f[i],r,e.g);}function b(n,t){function e(i,o,u,f,c,l,y,b,w){if(b=o.vchildren[u],a||(v=!0,"slot"===b.vtag&&(s&&t.N(f,s+"-s"),b.vchildren?b.Q=!0:b.Y=!0)),S(b.vtext))b.w=t.Z(b.vtext);else if(b.Y)b.w=t.Z("");else{if(l=b.w=L||"svg"===b.vtag?t.z("http://www.w3.org/2000/svg",b.vtag):t.c(b.Q?"slot-fb":b.vtag),n.G(l)&&n.J.delete(h),L="svg"===b.vtag||"foreignObject"!==b.vtag&&L,m(n,null,b,L),S(s)&&l["s-si"]!==s&&t.N(l,l["s-si"]=s),b.vchildren)for(c=0;c<b.vchildren.length;++c)(y=e(i,b,c,l))&&t.K(l,y);"svg"===b.vtag&&(L=!1);}return b.w["s-hn"]=d,(b.Q||b.Y)&&(b.w["s-sr"]=!0,b.w["s-cr"]=p,b.w["s-sn"]=b.vname||"",(w=i&&i.vchildren&&i.vchildren[u])&&w.vtag===b.vtag&&i.w&&r(i.w)),b.w}function r(e,i,o,u){n.V=!0;var a=t.X(e);for(o=a.length-1;o>=0;o--)(u=a[o])["s-hn"]!==d&&u["s-ol"]&&(t.nn(u),t.a(c(u),u,f(u)),t.nn(u["s-ol"]),u["s-ol"]=null,v=!0),i&&r(u,i);n.V=!1;}function i(n,r,i,o,u,c,a,s){var l=n["s-cr"];for((a=l&&t.tn(l)||n).shadowRoot&&t.en(a)===d&&(a=a.shadowRoot);u<=c;++u)o[u]&&(s=S(o[u].vtext)?t.Z(o[u].vtext):e(null,i,u,n))&&(o[u].w=s,t.a(a,s,f(r)));}function o(n,e,i,o){for(;e<=i;++e)S(n[e])&&(o=n[e].w,l=!0,o["s-ol"]?t.nn(o["s-ol"]):r(o,!0),t.nn(o));}function u(n,t){return n.vtag===t.vtag&&n.vkey===t.vkey&&("slot"!==n.vtag||n.vname===t.vname)}function f(n){return n&&n["s-ol"]?n["s-ol"]:n}function c(n){return t.tn(n["s-ol"]?n["s-ol"]:n)}var a,s,l,v,p,d,h,y=[];return function b(w,g,M,$,j,k,A,E,C,O,_,x){if(h=w,d=t.en(h),p=h["s-cr"],a=$,s=h["s-sc"],v=l=!1,function a(s,l,v){var p=l.w=s.w,d=s.vchildren,h=l.vchildren;L=l.w&&S(t.rn(l.w))&&void 0!==l.w.ownerSVGElement,L="svg"===l.vtag||"foreignObject"!==l.vtag&&L,S(l.vtext)?(v=p["s-cr"])?t.in(t.tn(v),l.vtext):s.vtext!==l.vtext&&t.in(p,l.vtext):("slot"!==l.vtag&&m(n,s,l,L),S(d)&&S(h)?function y(n,s,l,v,p,d,h,m){for(var b=0,w=0,g=s.length-1,M=s[0],$=s[g],j=v.length-1,k=v[0],A=v[j];b<=g&&w<=j;)if(null==M)M=s[++b];else if(null==$)$=s[--g];else if(null==k)k=v[++w];else if(null==A)A=v[--j];else if(u(M,k))a(M,k),M=s[++b],k=v[++w];else if(u($,A))a($,A),$=s[--g],A=v[--j];else if(u(M,A))"slot"!==M.vtag&&"slot"!==A.vtag||r(t.tn(M.w)),a(M,A),t.a(n,M.w,t.on($.w)),M=s[++b],A=v[--j];else if(u($,k))"slot"!==M.vtag&&"slot"!==A.vtag||r(t.tn($.w)),a($,k),t.a(n,$.w,M.w),$=s[--g],k=v[++w];else{for(p=null,d=b;d<=g;++d)if(s[d]&&S(s[d].vkey)&&s[d].vkey===k.vkey){p=d;break}S(p)?((m=s[p]).vtag!==k.vtag?h=e(s&&s[w],l,p,n):(a(m,k),s[p]=void 0,h=m.w),k=v[++w]):(h=e(s&&s[w],l,w,n),k=v[++w]),h&&t.a(c(M.w),h,f(M.w));}b>g?i(n,null==v[j+1]?null:v[j+1].w,l,v,w,j):w>j&&o(s,b,g);}(p,d,l,h):S(h)?(S(s.vtext)&&t.in(p,""),i(p,null,l,h,0,h.length-1)):S(d)&&o(d,0,d.length-1)),L&&"svg"===l.vtag&&(L=!1);}(g,M),v){for(function n(e,r,i,o,u,f,c,a,s,v){for(u=0,f=(r=t.X(e)).length;u<f;u++){if((i=r[u])["s-sr"]&&(o=i["s-cr"]))for(a=t.X(t.tn(o)),s=i["s-sn"],c=a.length-1;c>=0;c--)(o=a[c])["s-cn"]||o["s-nr"]||o["s-hn"]===i["s-hn"]||((3===(v=t.un(o))||8===v)&&""===s||1===v&&null===t.fn(o,"slot")&&""===s||1===v&&t.fn(o,"slot")===s)&&(y.some(function(n){return n.cn===o})||(l=!0,o["s-sn"]=s,y.push({an:i,cn:o})));1===t.un(i)&&n(i);}}(M.w),A=0;A<y.length;A++)(E=y[A]).cn["s-ol"]||((C=t.Z(""))["s-nr"]=E.cn,t.a(t.tn(E.cn),E.cn["s-ol"]=C,E.cn));for(n.V=!0,A=0;A<y.length;A++){for(E=y[A],_=t.tn(E.an),x=t.on(E.an),C=E.cn["s-ol"];C=t.sn(C);)if((O=C["s-nr"])&&O&&O["s-sn"]===E.cn["s-sn"]&&_===t.tn(O)&&(O=t.on(O))&&O&&!O["s-nr"]){x=O;break}(!x&&_!==t.tn(E.cn)||t.on(E.cn)!==x)&&E.cn!==x&&(t.nn(E.cn),t.a(_,E.cn,x));}n.V=!1;}return l&&function n(e,r,i,o,u,f,c,a){for(o=0,u=(i=t.X(e)).length;o<u;o++)if(r=i[o],1===t.un(r)){if(r["s-sr"])for(c=r["s-sn"],r.hidden=!1,f=0;f<u;f++)if(i[f]["s-hn"]!==r["s-hn"])if(a=t.un(i[f]),""!==c){if(1===a&&c===t.fn(i[f],"slot")){r.hidden=!0;break}}else if(1===a||3===a&&""!==t.ln(i[f]).trim()){r.hidden=!0;break}n(r);}}(M.w),y.length=0,M}}function w(n,t){n&&(n.vattrs&&n.vattrs.ref&&n.vattrs.ref(t?null:n.w),n.vchildren&&n.vchildren.forEach(function(n){w(n,t);}));}function g(n,t,e,r){if(e.connectedCallback=function(){(function e(n,t,r){n.k.delete(r),n.vn.has(r)||(n.y.add(r),n.vn.set(r,!0),r["s-id"]||(r["s-id"]=n.pn()),function i(n,t,e){for(e=t;e=n.r.rn(e);)if(n.G(e)){n.J.has(t)||(n.m.set(t,e),(e["s-ld"]=e["s-ld"]||[]).push(t));break}}(n,r),n.queue.tick(function(){n.T.set(r,function e(n,t,r,i,o){return r.mode||(r.mode=n.dn(r)),r["s-cr"]||n.fn(r,A)||n.e&&1===t.t||(r["s-cr"]=n.Z(""),r["s-cr"]["s-cn"]=!0,n.a(r,r["s-cr"],n.X(r)[0])),n.e||1!==t.t||(r.shadowRoot=r),i={hn:r["s-id"],P:{}},t.H&&Object.keys(t.H).forEach(function(e){(o=t.H[e].yn)&&(i.P[o]=n.fn(r,o));}),i}(n.r,t,r)),n.mn(t,r);}));})(n,t,this);},e.disconnectedCallback=function(){(function t(n,e){if(!n.V&&function r(n,t){for(;t;){if(!n.tn(t))return 9!==n.un(t);t=n.tn(t);}}(n.r,e)){n.k.set(e,!0),o(n,e),w(n.L.get(e),!0),n.r.I(e),n.bn.delete(e);var i=n.A.get(e);i&&i.componentDidUnload&&i.componentDidUnload(),n.u&&n.u.wn(e),[n.m,n.gn,n.T].forEach(function(n){return n.delete(e)});}})(n,this);},e["s-init"]=function(){(function t(n,e,r,i,u,f){if(n.A.get(e)&&!n.k.has(e)&&(!e["s-ld"]||!e["s-ld"].length)){n.J.set(e,!0),n.Mn.has(e)||(n.Mn.set(e,!0),e["s-ld"]=void 0,n.r.N(e,r));try{w(n.L.get(e)),(u=n.gn.get(e))&&(u.forEach(function(n){return n(e)}),n.gn.delete(e));}catch(t){n.C(t,4,e);}o(n,e);}})(n,this,r);},e.forceUpdate=function(){c(n,this);},t.H){var u=Object.entries(t.H);(function f(n,t,e){t.forEach(function(t){var r=t[0],o=t[1],u=o.$n;3&u?p(e,r,function t(){return (n.x.get(this)||{})[r]},function t(e){l(n,this,r,i(o.jn,e));}):32===u&&v(e,r,P);});})(n,u,e);}}function M(n,t,e,r){return function(){var i=arguments;return function o(n,t,e){var r=t[e],i=n.i.body;return i?(r||(r=i.querySelector(e)),r||(r=t[e]=n.c(e),n.K(i,r)),r.componentOnReady()):Promise.resolve()}(n,t,e).then(function(n){return n[r].apply(n,i)})}}function $(n,t,r,i,o,f){var a={html:{}},s={},l=r[n]=r[n]||{},v=function p(n,t,e){n.ael||(n.ael=function(n,t,e,r){return n.addEventListener(t,e,r)},n.rel=function(n,t,e,r){return n.removeEventListener(t,e,r)});var r=new WeakMap;"function"!=typeof t.CustomEvent&&(t.CustomEvent=function(n,t,r){return (r=e.createEvent("CustomEvent")).initCustomEvent(n,t.bubbles,t.cancelable,t.detail),r},t.CustomEvent.prototype=t.Event.prototype);var i={i:e,e:!!e.documentElement.attachShadow,kn:!1,un:function(n){return n.nodeType},c:function(n){return e.createElement(n)},z:function(n,t){return e.createElementNS(n,t)},Z:function(n){return e.createTextNode(n)},An:function(n){return e.createComment(n)},a:function(n,t,e){return n.insertBefore(t,e)},nn:function(n){return n.remove()},K:function(n,t){return n.appendChild(t)},N:function(n,t){if(n.classList)n.classList.add(t);else if("svg"===n.nodeName.toLowerCase()){var e=n.getAttribute("class")||"";e.split(" ").includes(t)||(e+=" "+t),n.setAttribute("class",e.trim());}},X:function(n){return n.childNodes},tn:function(n){return n.parentNode},on:function(n){return n.nextSibling},sn:function(n){return n.previousSibling},en:function(n){return _(n.nodeName)},ln:function(n){return n.textContent},in:function(n,t){return n.textContent=t},fn:function(n,t){return n.getAttribute(t)},En:function(n,t,e){return n.setAttribute(t,e)},Cn:function(n,t,e,r){return n.setAttributeNS(t,e,r)},q:function(n,t){return n.removeAttribute(t)},U:function(n,t){return n.hasAttribute(t)},dn:function(t){return t.getAttribute("mode")||(n.Context||{}).mode},On:function(n,r){return "child"===r?n.firstElementChild:"parent"===r?i.rn(n):"body"===r?e.body:"document"===r?e:"window"===r?t:n},B:function(t,e,o,u,f,c,a,s){var l=e,v=t,p=r.get(t);if(p&&p[l]&&p[l](),"string"==typeof c?v=i.On(t,c):"object"==typeof c?v=c:(s=e.split(":")).length>1&&(v=i.On(t,s[0]),e=s[1]),v){var d=o;(s=e.split(".")).length>1&&(e=s[0],d=function(n){n.keyCode===O[s[1]]&&o(n);}),a=i.kn?{capture:!!u,passive:!!f}:!!u,n.ael(v,e,d,a),p||r.set(t,p={}),p[l]=function(){v&&n.rel(v,e,d,a),p[l]=null;};}},I:function(n,t){var e=r.get(n);e&&(t?e[t]&&e[t]():Object.keys(e).forEach(function(n){e[n]&&e[n]();}));},Sn:function(n,e,r){return n&&n.dispatchEvent(new t.CustomEvent(e,r))},rn:function(n,t){return (t=i.tn(n))&&11===i.un(t)?t.host:t}};return i}(l,r,i);t.isServer=t.isPrerender=!(t.isClient=!0),t.window=r,t.location=r.location,t.document=i,t.resourcesUrl=t.publicPath=o,l.h=u,l.Context=t;var d=r["s-defined"]=r["s-defined"]||{},h=0,y={r:v,_n:function m(n,t){var e=n.n;r.customElements.get(e)||(g(y,a[e]=n,t.prototype,f),r.customElements.define(n.n,t));},xn:t.emit,S:function(n){return a[v.en(n)]},Pn:function(n){return t[n]},isClient:!0,G:function(n){return !(!d[v.en(n)]&&!y.S(n))},pn:function(){return n+h++},C:function(n,t,e){},Tn:function(n){return function t(n,e,r){return {create:M(n,e,r,"create"),componentOnReady:M(n,e,r,"componentOnReady")}}(v,s,n)},queue:t.queue=function w(n,t){function e(t){return function(e){t.push(e),p||(p=!0,n.raf(o));}}function r(n){for(var t=0;t<n.length;t++)try{n[t](u());}catch(n){}n.length=0;}function i(n,t){for(var e,r=0;r<n.length&&(e=u())<t;)try{n[r++](e);}catch(n){}r===n.length?n.length=0:0!==r&&n.splice(0,r);}function o(){v++,r(a);var t=u()+7*Math.ceil(v*(1/22));i(s,t),i(l,t),s.length>0&&(l.push.apply(l,s),s.length=0),(p=a.length+s.length+l.length>0)?n.raf(o):v=0;}var u=function(){return t.performance.now()},f=Promise.resolve(),c=[],a=[],s=[],l=[],v=0,p=!1;return n.raf||(n.raf=t.requestAnimationFrame.bind(t)),{tick:function(n){c.push(n),1===c.length&&f.then(function(){return r(c)});},read:e(a),write:e(s)}}(l,r),mn:function $(n,t,e){if(n.O)c(y,t);else{var r={mode:t.mode,scoped:!1};n.Wn(r).then(function(e){try{n.O=e,function r(n,t,e,i,o){if(i){var u=t.n+(o||E);t[u]||(t[u]=i);}}(0,n,n.t,e.style,e.styleMode);}catch(t){n.O=function i(){};}c(y,t);});}},R:!1,j:!1,V:!1,W:e,m:new WeakMap,o:new WeakMap,vn:new WeakMap,bn:new WeakMap,Mn:new WeakMap,J:new WeakMap,_:new WeakMap,T:new WeakMap,A:new WeakMap,k:new WeakMap,M:new WeakMap,gn:new WeakMap,Nn:new WeakMap,L:new WeakMap,x:new WeakMap,y:new Set,b:[]};l.onReady=function(){return new Promise(function(n){return y.queue.write(function(){return y.y.size?y.b.push(n):n()})})},y.render=b(y,v);var j=v.i.documentElement;return j["s-ld"]=[],j["s-rn"]=!0,j["s-init"]=function(){y.J.set(j,l.loaded=y.j=!0),v.Sn(r,"appload",{detail:{namespace:n}});},function k(n,t,e,r,i,o){if(t.componentOnReady=function(t,e){if(!t.nodeName.includes("-"))return e(null),!1;var r=n.S(t);if(r)if(n.J.has(t))e(t);else{var i=n.gn.get(t)||[];i.push(e),n.gn.set(t,i);}return !!r},i){for(o=i.length-1;o>=0;o--)t.componentOnReady(i[o][0],i[o][1])&&i.splice(o,1);for(o=0;o<r.length;o++)if(!e[r[o]].componentOnReady)return;for(o=0;o<i.length;o++)i[o][1](null);i.length=0;}}(y,l,r,r["s-apps"],r["s-cr"]),l.initialized=!0,y}function j(n,t,e){void 0===e&&(e={});var i=Array.isArray(t)?t:[t],o=n.document,u=e.hydratedCssClass||"hydrated",f=i.filter(function(n){return n[0]}).map(function(n){return n[0]});if(f.length>0){var c=o.createElement("style");c.innerHTML=f.join()+"{visibility:hidden}."+u+"{visibility:inherit}",c.setAttribute("data-styles",""),o.head.insertBefore(c,o.head.firstChild);}var a=e.namespace||"StencilStateTunnel";return F||(F=!0,function s(n,t,e){(n["s-apps"]=n["s-apps"]||[]).push(t),e.componentOnReady||(e.componentOnReady=function t(){function e(t){if(r.nodeName.indexOf("-")>0){for(var e=n["s-apps"],i=0,o=0;o<e.length;o++)if(n[e[o]].componentOnReady){if(n[e[o]].componentOnReady(r,t))return;i++;}if(i<e.length)return void(n["s-cr"]=n["s-cr"]||[]).push([r,t])}t(null);}var r=this;return n.Promise?new n.Promise(e):{then:e}});}(n,a,n.HTMLElement.prototype)),new Promise(function(i){applyPolyfills(n,function(){if(!D[a]){var f={},c=e.resourcesUrl||"./";k(a,f,n,o,c,u),D[a]=$(a,f,n,o,c,u);}t.forEach(function(t){var e;!function i(n){return /\{\s*\[native code\]\s*\}/.test(""+n)}(n.customElements.define)?(e=function(t){return n.HTMLElement.call(this,t)}).prototype=Object.create(n.HTMLElement.prototype,{constructor:{value:e,configurable:!0}}):e=new Function("w","return class extends w.HTMLElement{}")(n),D[a]._n(function o(n){var t=function e(n){var t=n[0],e=n[1],i=n[3],o=n[4],u=n[5],f={color:{yn:"color"}};if(i)for(var c=0;c<i.length;c++){var a=i[c];f[a[0]]={$n:a[1],Rn:!!a[2],yn:"string"==typeof a[3]?a[3]:a[3]?a[0]:0,jn:a[4]};}return {n:t,Wn:e,H:Object.assign({},f),t:o,Ln:u?u.map(r):void 0}}(n),i=t.Wn,o=x(n[0]);return t.Wn=function(n){var t=n.mode,e=n.scoped;return function r(n,t,e){return import(
/* webpackInclude: /\.entry\.js$/ */
/* webpackMode: "lazy" */
"./build/"+n+(t?".sc":"")+".entry.js").then(function(n){return n[e]})}("string"==typeof i?i:i[t],e,o)},t}(t),e);}),i();});})}undefined&&undefined.Dn||(Object.setPrototypeOf||Array);var k=function(){};function applyPolyfills(n,t){n.Fn=function(){function t(){var n=setTimeout;return function(){return n(e,1)}}function e(){for(var n=0;n<b;n+=2)(0,O[n])(O[n+1]),O[n]=void 0,O[n+1]=void 0;b=0;}function r(n,t){var e=this,r=new this.constructor(o);void 0===r[_]&&h(r);var i=e.Hn;if(i){var u=arguments[i-1];M(function(){return d(i,r,u,e.qn)});}else v(e,r,n,t);return r}function i(n){if(n&&"object"==typeof n&&n.constructor===this)return n;var t=new this(o);return c(t,n),t}function o(){}function u(n){try{return n.then}catch(n){return W.error=n,W}}function f(n,t,e){t.constructor===n.constructor&&e===r&&t.constructor.resolve===i?function(n,t){t.Hn===P?s(n,t.qn):t.Hn===T?l(n,t.qn):v(t,void 0,function(t){return c(n,t)},function(t){return l(n,t)});}(n,t):e===W?(l(n,W.error),W.error=null):void 0===e?s(n,t):"function"==typeof e?function(n,t,e){M(function(n){var r=!1,i=function(n,t,e,r){try{n.call(t,e,r);}catch(n){return n}}(e,t,function(e){r||(r=!0,t!==e?c(n,e):s(n,e));},function(t){r||(r=!0,l(n,t));},n.Un);!r&&i&&(r=!0,l(n,i));},n);}(n,t,e):s(n,t);}function c(n,t){if(n===t)l(n,new TypeError("cannot resolve promise w/ itself"));else{var e=typeof t;null===t||"object"!==e&&"function"!==e?s(n,t):f(n,t,u(t));}}function a(n){n.Bn&&n.Bn(n.qn),p(n);}function s(n,t){n.Hn===x&&(n.qn=t,n.Hn=P,0!==n.In.length&&M(p,n));}function l(n,t){n.Hn===x&&(n.Hn=T,n.qn=t,M(a,n));}function v(n,t,e,r){var i=n.In,o=i.length;n.Bn=null,i[o]=t,i[o+P]=e,i[o+T]=r,0===o&&n.Hn&&M(p,n);}function p(n){var t=n.In,e=n.Hn;if(0!==t.length){for(var r,i,o=n.qn,u=0;u<t.length;u+=3)r=t[u],i=t[u+e],r?d(e,r,i,o):i(o);n.In.length=0;}}function d(n,t,e,r){var i="function"==typeof e,o=void 0,u=void 0,f=void 0,a=void 0;if(i){try{o=e(r);}catch(n){W.error=n,o=W;}if(o===W?(a=!0,u=o.error,o.error=null):f=!0,t===o)return void l(t,new TypeError("Cannot return same promise"))}else o=r,f=!0;t.Hn===x&&(i&&f?c(t,o):a?l(t,u):n===P?s(t,o):n===T&&l(t,o));}function h(n){n[_]=N++,n.Hn=void 0,n.qn=void 0,n.In=[];}var y,m=Array.isArray?Array.isArray:function(n){return "[object Array]"===Object.prototype.toString.call(n)},b=0,w=void 0,g=void 0,M=function(n,t){O[b]=n,O[b+1]=t,2===(b+=2)&&(g?g(e):S());},$=(y=void 0!==n?n:void 0)||{},j=$.Qn||$.Yn;$="undefined"==typeof self;var k,A,E,C="undefined"!=typeof Uint8ClampedArray&&"undefined"!=typeof importScripts&&"undefined"!=typeof MessageChannel,O=Array(1e3),S=void 0;S=j?(k=0,A=new j(e),E=document.createTextNode(""),A.observe(E,{characterData:!0}),function(){E.data=k=++k%2;}):C?function(){var n=new MessageChannel;return n.Zn.onmessage=e,function(){return n.zn.postMessage(0)}}():void 0===y&&"function"==typeof require?function(){try{var n=Function("return this")().Gn("vertx");return void 0!==(w=n.Jn||n.Kn)?function(){w(e);}:t()}catch(n){return t()}}():t();var _=Math.random().toString(36).substring(2),x=void 0,P=1,T=2,W={error:null},N=0,R=function(){function n(n,t){this.Vn=n,this.Xn=new n(o),this.Xn[_]||h(this.Xn),m(t)?(this.nt=this.length=t.length,this.qn=Array(this.length),0===this.length?s(this.Xn,this.qn):(this.length=this.length||0,this.tt(t),0===this.nt&&s(this.Xn,this.qn))):l(this.Xn,Error("Array Methods must be provided an Array"));}return n.prototype.tt=function(n){for(var t=0;this.Hn===x&&t<n.length;t++)this.et(n[t],t);},n.prototype.et=function(n,t){var e=this.Vn,c=e.resolve;c===i?(c=u(n))===r&&n.Hn!==x?this.rt(n.Hn,t,n.qn):"function"!=typeof c?(this.nt--,this.qn[t]=n):e===L?(f(e=new e(o),n,c),this.it(e,t)):this.it(new e(function(t){return t(n)}),t):this.it(c(n),t);},n.prototype.rt=function(n,t,e){var r=this.Xn;r.Hn===x&&(this.nt--,n===T?l(r,e):this.qn[t]=e),0===this.nt&&s(r,this.qn);},n.prototype.it=function(n,t){var e=this;v(n,void 0,function(n){return e.rt(P,t,n)},function(n){return e.rt(T,t,n)});},n}(),L=function(){function n(t){if(this[_]=N++,this.qn=this.Hn=void 0,this.In=[],o!==t){if("function"!=typeof t)throw new TypeError("Must pass a resolver fn as 1st arg");if(!(this instanceof n))throw new TypeError("Failed to construct 'Promise': Use the 'new' operator.");!function(n,t){try{t(function(t){c(n,t);},function(t){l(n,t);});}catch(t){l(n,t);}}(this,t);}}return n.prototype.catch=function(n){return this.then(null,n)},n.prototype.ot=function(n){var t=this.constructor;return this.then(function(e){return t.resolve(n()).then(function(){return e})},function(e){return t.resolve(n()).then(function(){throw e})})},n}();return L.prototype.then=r,L.all=function(n){return new R(this,n).Xn},L.race=function(n){var t=this;return m(n)?new t(function(e,r){for(var i=n.length,o=0;o<i;o++)t.resolve(n[o]).then(e,r);}):new t(function(n,t){return t(new TypeError("Must pass array to race"))})},L.resolve=i,L.reject=function(n){var t=new this(o);return l(t,n),t},L.ut=function(n){g=n;},L.ft=function(n){M=n;},L.ct=M,L.at=function(){var n=void 0;if("undefined"!=typeof global)n=global;else if("undefined"!=typeof self)n=self;else try{n=Function("return this")();}catch(n){throw Error("polyfill failed")}var t=n.Promise;if(t){var e=null;try{e=Object.prototype.toString.call(t.resolve());}catch(n){}if("[object Promise]"===e&&!t.st)return}n.Promise=L;},L.Promise=L,L.at(),L}();var e=[];n.customElements&&(!n.Element||n.Element.prototype.closest&&n.Element.prototype.matches&&n.Element.prototype.remove)||e.push(import('./chunk-2b0607fc.js')),"function"==typeof Object.assign&&Object.entries||e.push(import('./chunk-817460a8.js')),Array.prototype.find&&Array.prototype.includes||e.push(import('./chunk-ee4780ee.js')),String.prototype.startsWith&&String.prototype.endsWith||e.push(import('./chunk-2be0101c.js')),n.fetch||e.push(import('./chunk-baafd9cb.js')),function r(){try{var n=new URL("b","http://a");return n.pathname="c%20d","http://a/c%20d"===n.href&&n.lt}catch(n){return !1}}||e.push(import('./chunk-9c838ead.js')),Promise.all(e).then(function(e){e.forEach(function(t){t.applyPolyfill(n,n.document);}),t();});}var A="ssrv",E="$",C={},O={enter:13,escape:27,space:32,tab:9,left:37,up:38,right:39,down:40},S=function(n){return null!=n},_=function(n){return n.toLowerCase()},x=function(n){return _(n).split("-").map(function(n){return n.charAt(0).toUpperCase()+n.slice(1)}).join("")},P=function(){},T=[],W={forEach:function(n,t){n.forEach(function(n,e,r){return t(f(n),e,r)});},map:function(n,t){return n.map(function(n,e,r){return function i(n){return {vtag:n.vtag,vchildren:n.vchildren,vtext:n.vtext,vattrs:n.vattrs,vkey:n.vkey,vname:n.vname}}(t(f(n),e,r))})}},N="wc-",R="http://www.w3.org/1999/xlink",L=!1,D={},F=!1;

/*! Built with http://stenciljs.com */
var __rest = (undefined && undefined.__rest) || function (s, e) {
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
    if (consumerRender === void 0) { consumerRender = defaultConsumerRender; }
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
    routeViewsUpdated: () => { }
});

const canUseDOM = !!(typeof window !== 'undefined' && window.document && window.document.createElement);
const addEventListener$1 = (node, event, listener) => (node.addEventListener
    ? node.addEventListener(event, listener, false)
    : node.attachEvent('on' + event, listener));
const removeEventListener = (node, event, listener) => (node.removeEventListener
    ? node.removeEventListener(event, listener, false)
    : node.detachEvent('on' + event, listener));
const getConfirmation = (message, callback) => (callback(window.confirm(message)));
const isModifiedEvent = (event) => (event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);
const supportsHistory = () => {
    const ua = window.navigator.userAgent;
    if ((ua.indexOf('Android 2.') !== -1 || ua.indexOf('Android 4.0') !== -1) &&
        ua.indexOf('Mobile Safari') !== -1 &&
        ua.indexOf('Chrome') === -1 &&
        ua.indexOf('Windows Phone') === -1) {
        return false;
    }
    return window.history && 'pushState' in window.history;
};
const supportsPopStateOnHashChange = () => (window.navigator.userAgent.indexOf('Trident') === -1);
const supportsGoWithoutReloadUsingHash = () => (window.navigator.userAgent.indexOf('Firefox') === -1);
const isExtraneousPopstateEvent = (event) => (event.state === undefined &&
    navigator.userAgent.indexOf('CriOS') === -1);
const storageAvailable = (type) => {
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

export { matchPath as a, matchesAreEqual as b, ActiveRouter as c, storageAvailable as d, canUseDOM as e, supportsHistory as f, supportsPopStateOnHashChange as g, getConfirmation as h, stripTrailingSlash as i, addLeadingSlash as j, hasBasename as k, stripBasename as l, createLocation as m, createKey as n, isExtraneousPopstateEvent as o, createPath as p, addEventListener$1 as q, removeEventListener as r, stripLeadingSlash as s, supportsGoWithoutReloadUsingHash as t, locationsAreEqual as u, isModifiedEvent as v };
