/*! Built with http://stenciljs.com */
DocsSite.loadBundle("chunk-4440b782.js", ["exports"], function (e) { window.DocsSite.h; var t = "/", n = "./", r = new RegExp(["(\\\\.)", "(?:\\:(\\w+)(?:\\(((?:\\\\.|[^\\\\()])+)\\))?|\\(((?:\\\\.|[^\\\\()])+)\\))([+*?])?"].join("|"), "g"); function i(e) { return e.replace(/([.+*?=^!:${}()[\]|/\\])/g, "\\$1"); } function a(e) { return e.replace(/([=!:$/()])/g, "\\$1"); } function u(e) { return e && e.sensitive ? "" : "i"; } function l(e, o, c) { return e instanceof RegExp ? function (e, t) { if (!t)
    return e; var n = e.source.match(/\((?!\?)/g); if (n)
    for (var r = 0; r < n.length; r++)
        t.push({ name: r, prefix: null, delimiter: null, optional: !1, repeat: !1, partial: !1, pattern: null }); return e; }(e, o) : Array.isArray(e) ? function (e, t, n) { for (var r = [], i = 0; i < e.length; i++)
    r.push(l(e[i], t, n).source); return new RegExp("(?:" + r.join("|") + ")", u(n)); }(e, o, c) : function (e, l, o) { return function (e, r, a) { for (var l = (a = a || {}).strict, o = !1 !== a.end, c = i(a.delimiter || t), s = a.delimiters || n, p = [].concat(a.endsWith || []).map(i).concat("$").join("|"), f = "", h = !1, d = 0; d < e.length; d++) {
    var g = e[d];
    if ("string" == typeof g)
        f += i(g), h = d === e.length - 1 && s.indexOf(g[g.length - 1]) > -1;
    else {
        var x = i(g.prefix), v = g.repeat ? "(?:" + g.pattern + ")(?:" + x + "(?:" + g.pattern + "))*" : g.pattern;
        r && r.push(g), g.optional ? g.partial ? f += x + "(" + v + ")?" : f += "(?:" + x + "(" + v + "))?" : f += x + "(" + v + ")";
    }
} return o ? (l || (f += "(?:" + c + ")?"), f += "$" === p ? "$" : "(?=" + p + ")") : (l || (f += "(?:" + c + "(?=" + p + "))?"), h || (f += "(?=" + c + "|" + p + ")")), new RegExp("^" + f, u(a)); }(function (e, u) { for (var l, o = [], c = 0, s = 0, p = "", f = u && u.delimiter || t, h = u && u.delimiters || n, d = !1; null !== (l = r.exec(e));) {
    var g = l[0], x = l[1], v = l.index;
    if (p += e.slice(s, v), s = v + g.length, x)
        p += x[1], d = !0;
    else {
        var m = "", $ = e[s], y = l[2], w = l[3], E = l[4], R = l[5];
        if (!d && p.length) {
            var j = p.length - 1;
            h.indexOf(p[j]) > -1 && (m = p[j], p = p.slice(0, j));
        }
        p && (o.push(p), p = "", d = !1);
        var O = "" !== m && void 0 !== $ && $ !== m, S = "+" === R || "*" === R, b = "?" === R || "*" === R, k = m || f, A = w || E;
        o.push({ name: y || c++, prefix: m, delimiter: k, optional: b, repeat: S, partial: O, pattern: A ? a(A) : "[^" + i(k) + "]+?" });
    }
} return (p || s < e.length) && o.push(p + e.substr(s)), o; }(e, o), l, o); }(e, o, c); } var o = {}; var c = 0; e.matchPath = function (e, t) {
    if (t === void 0) { t = {}; }
    "string" == typeof t && (t = { path: t });
    var _a = t.path, n = _a === void 0 ? "/" : _a, _b = t.exact, r = _b === void 0 ? !1 : _b, _c = t.strict, i = _c === void 0 ? !1 : _c, _d = function (e, t) { var n = "" + t.end + t.strict, r = o[n] || (o[n] = {}), i = JSON.stringify(e); if (r[i])
        return r[i]; var a = [], u = { re: l(e, a, t), keys: a }; return c < 1e4 && (r[i] = u, c += 1), u; }(n, { end: r, strict: i }), a = _d.re, u = _d.keys, s = a.exec(e);
    if (!s)
        return null;
    var p = s[0], f = s.slice(1), h = e === p;
    return r && !h ? null : { path: n, url: "/" === n && "" === p ? "/" : p, isExact: h, params: u.reduce(function (e, t, n) { return e[t.name] = f[n], e; }, {}) };
}; });
