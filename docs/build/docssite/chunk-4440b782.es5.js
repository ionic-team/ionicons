/*! Built with http://stenciljs.com */
DocsSite.loadBundle('chunk-4440b782.js', ['exports'], function (exports) {
    var h = window.DocsSite.h;
    /**
     * TS adaption of https://github.com/pillarjs/path-to-regexp/blob/master/index.js
     */
    /**
     * Default configs.
     */
    var DEFAULT_DELIMITER = '/';
    var DEFAULT_DELIMITERS = './';
    /**
     * The main path matching regexp utility.
     */
    var PATH_REGEXP = new RegExp([
        // Match escaped characters that would otherwise appear in future matches.
        // This allows the user to escape special characters that won't transform.
        '(\\\\.)',
        // Match Express-style parameters and un-named parameters with a prefix
        // and optional suffixes. Matches appear as:
        //
        // "/:test(\\d+)?" => ["/", "test", "\d+", undefined, "?"]
        // "/route(\\d+)"  => [undefined, undefined, undefined, "\d+", undefined]
        '(?:\\:(\\w+)(?:\\(((?:\\\\.|[^\\\\()])+)\\))?|\\(((?:\\\\.|[^\\\\()])+)\\))([+*?])?'
    ].join('|'), 'g');
    /**
     * Parse a string for the raw tokens.
     */
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
            // Ignore already escaped sequences.
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
            // Push the current path onto the tokens.
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
        // Push any remaining characters.
        if (path || index < str.length) {
            tokens.push(path + str.substr(index));
        }
        return tokens;
    }
    /**
     * Escape a regular expression string.
     */
    function escapeString(str) {
        return str.replace(/([.+*?=^!:${}()[\]|/\\])/g, '\\$1');
    }
    /**
     * Escape the capturing group by escaping special characters and meaning.
     */
    function escapeGroup(group) {
        return group.replace(/([=!:$/()])/g, '\\$1');
    }
    /**
     * Get the flags for a regexp from the options.
     */
    function flags(options) {
        return options && options.sensitive ? '' : 'i';
    }
    /**
     * Pull out keys from a regexp.
     */
    function regexpToRegexp(path, keys) {
        if (!keys)
            return path;
        // Use a negative lookahead to match only capturing groups.
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
    /**
     * Transform an array into a regexp.
     */
    function arrayToRegexp(path, keys, options) {
        var parts = [];
        for (var i = 0; i < path.length; i++) {
            parts.push(pathToRegexp(path[i], keys, options).source);
        }
        return new RegExp('(?:' + parts.join('|') + ')', flags(options));
    }
    /**
     * Create a path regexp from string input.
     */
    function stringToRegexp(path, keys, options) {
        return tokensToRegExp(parse(path, options), keys, options);
    }
    /**
     * Expose a function for taking tokens and returning a RegExp.
     */
    function tokensToRegExp(tokens, keys, options) {
        options = options || {};
        var strict = options.strict;
        var end = options.end !== false;
        var delimiter = escapeString(options.delimiter || DEFAULT_DELIMITER);
        var delimiters = options.delimiters || DEFAULT_DELIMITERS;
        var endsWith = [].concat(options.endsWith || []).map(escapeString).concat('$').join('|');
        var route = '';
        var isEndDelimited = false;
        // Iterate over the tokens and create our regexp string.
        for (var i = 0; i < tokens.length; i++) {
            var token = tokens[i];
            if (typeof token === 'string') {
                route += escapeString(token);
                isEndDelimited = i === tokens.length - 1 && delimiters.indexOf(token[token.length - 1]) > -1;
            }
            else {
                var prefix = escapeString(token.prefix);
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
    /**
     * Normalize the given path string, returning a regular expression.
     *
     * An empty array can be passed in for the keys, which will hold the
     * placeholder key descriptions. For example, using `/user/:id`, `keys` will
     * contain `[{ name: 'id', delimiter: '/', optional: false, repeat: false }]`.
     */
    function pathToRegexp(path, keys, options) {
        if (path instanceof RegExp) {
            return regexpToRegexp(path, keys);
        }
        if (Array.isArray(path)) {
            return arrayToRegexp(path, keys, options);
        }
        return stringToRegexp(path, keys, options);
    }
    var patternCache = {};
    var cacheLimit = 10000;
    var cacheCount = 0;
    // Memoized function for creating the path match regex
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
    /**
     * Public API for matching a URL pathname to a path pattern.
     */
    function matchPath(pathname, options) {
        if (options === void 0) { options = {}; }
        if (typeof options === 'string') {
            options = { path: options };
        }
        var _a = options.path, path = _a === void 0 ? '/' : _a, _b = options.exact, exact = _b === void 0 ? false : _b, _c = options.strict, strict = _c === void 0 ? false : _c;
        var _d = compilePath(path, { end: exact, strict: strict }), re = _d.re, keys = _d.keys;
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
    exports.matchPath = matchPath;
});
