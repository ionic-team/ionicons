/*! Built with http://stenciljs.com */
DocsSite.loadBundle("chunk-438b3614.js", ["exports"], function (e) { window.DocsSite.h; var t = "/", n = "./", r = new RegExp(["(\\\\.)", "(?:\\:(\\w+)(?:\\(((?:\\\\.|[^\\\\()])+)\\))?|\\(((?:\\\\.|[^\\\\()])+)\\))([+*?])?"].join("|"), "g"); function i(e) { return e.replace(/([.+*?=^!:${}()[\]|/\\])/g, "\\$1"); } function o(e) { return e.replace(/([=!:$/()])/g, "\\$1"); } function a(e) { return e && e.sensitive ? "" : "i"; } function s(e, d, u) { return e instanceof RegExp ? function (e, t) { if (!t)
    return e; var n = e.source.match(/\((?!\?)/g); if (n)
    for (var r = 0; r < n.length; r++)
        t.push({ name: r, prefix: null, delimiter: null, optional: !1, repeat: !1, partial: !1, pattern: null }); return e; }(e, d) : Array.isArray(e) ? function (e, t, n) { for (var r = [], i = 0; i < e.length; i++)
    r.push(s(e[i], t, n).source); return new RegExp("(?:" + r.join("|") + ")", a(n)); }(e, d, u) : function (e, s, d) { return function (e, r, o) { for (var s = (o = o || {}).strict, d = !1 !== o.end, u = i(o.delimiter || t), c = o.delimiters || n, l = [].concat(o.endsWith || []).map(i).concat("$").join("|"), f = "", p = !1, h = 0; h < e.length; h++) {
    var v = e[h];
    if ("string" == typeof v)
        f += i(v), p = h === e.length - 1 && c.indexOf(v[v.length - 1]) > -1;
    else {
        var g = i(v.prefix), m = v.repeat ? "(?:" + v.pattern + ")(?:" + g + "(?:" + v.pattern + "))*" : v.pattern;
        r && r.push(v), v.optional ? v.partial ? f += g + "(" + m + ")?" : f += "(?:" + g + "(" + m + "))?" : f += g + "(" + m + ")";
    }
} return d ? (s || (f += "(?:" + u + ")?"), f += "$" === l ? "$" : "(?=" + l + ")") : (s || (f += "(?:" + u + "(?=" + l + "))?"), p || (f += "(?=" + u + "|" + l + ")")), new RegExp("^" + f, a(o)); }(function (e, a) { for (var s, d = [], u = 0, c = 0, l = "", f = a && a.delimiter || t, p = a && a.delimiters || n, h = !1; null !== (s = r.exec(e));) {
    var v = s[0], g = s[1], m = s.index;
    if (l += e.slice(c, m), c = m + v.length, g)
        l += g[1], h = !0;
    else {
        var w = "", x = e[c], E = s[2], O = s[3], y = s[4], A = s[5];
        if (!h && l.length) {
            var R = l.length - 1;
            p.indexOf(l[R]) > -1 && (w = l[R], l = l.slice(0, R));
        }
        l && (d.push(l), l = "", h = !1);
        var $ = "" !== w && void 0 !== x && x !== w, _ = "+" === A || "*" === A, S = "?" === A || "*" === A, D = w || f, L = O || y;
        d.push({ name: E || u++, prefix: w, delimiter: D, optional: S, repeat: _, partial: $, pattern: L ? o(L) : "[^" + i(D) + "]+?" });
    }
} return (l || c < e.length) && d.push(l + e.substr(c)), d; }(e, d), s, d); }(e, d, u); } var d = {}; var u = 0; var c = !("undefined" == typeof window || !window.document || !window.document.createElement); e.matchPath = function (e, t) {
    if (t === void 0) { t = {}; }
    "string" == typeof t && (t = { path: t });
    var _a = t.path, n = _a === void 0 ? "/" : _a, _b = t.exact, r = _b === void 0 ? !1 : _b, _c = t.strict, i = _c === void 0 ? !1 : _c, _d = function (e, t) { var n = "" + t.end + t.strict, r = d[n] || (d[n] = {}), i = JSON.stringify(e); if (r[i])
        return r[i]; var o = [], a = { re: s(e, o, t), keys: o }; return u < 1e4 && (r[i] = a, u += 1), a; }(n, { end: r, strict: i }), o = _d.re, a = _d.keys, c = o.exec(e);
    if (!c)
        return null;
    var l = c[0], f = c.slice(1), p = e === l;
    return r && !p ? null : { path: n, url: "/" === n && "" === l ? "/" : l, isExact: p, params: a.reduce(function (e, t, n) { return e[t.name] = f[n], e; }, {}) };
}, e.storageAvailable = (function (e) { try {
    var t = window[e], n = "__storage_test__";
    return t.setItem(n, n), t.removeItem(n), !0;
}
catch (e) {
    return e instanceof DOMException && (22 === e.code || 1014 === e.code || "QuotaExceededError" === e.name || "NS_ERROR_DOM_QUOTA_REACHED" === e.name) && 0 !== t.length;
} }), e.canUseDOM = c, e.addEventListener = (function (e, t, n) { return e.addEventListener ? e.addEventListener(t, n, !1) : e.attachEvent("on" + t, n); }), e.removeEventListener = (function (e, t, n) { return e.removeEventListener ? e.removeEventListener(t, n, !1) : e.detachEvent("on" + t, n); }), e.getConfirmation = (function (e, t) { return t(window.confirm(e)); }), e.supportsHistory = (function () { var e = window.navigator.userAgent; return (-1 === e.indexOf("Android 2.") && -1 === e.indexOf("Android 4.0") || -1 === e.indexOf("Mobile Safari") || -1 !== e.indexOf("Chrome") || -1 !== e.indexOf("Windows Phone")) && window.history && "pushState" in window.history; }), e.supportsPopStateOnHashChange = (function () { return -1 === window.navigator.userAgent.indexOf("Trident"); }), e.isExtraneousPopstateEvent = (function (e) { return void 0 === e.state && -1 === navigator.userAgent.indexOf("CriOS"); }), e.supportsGoWithoutReloadUsingHash = (function () { return -1 === window.navigator.userAgent.indexOf("Firefox"); }), e.isModifiedEvent = (function (e) { return e.metaKey || e.altKey || e.ctrlKey || e.shiftKey; }); });
