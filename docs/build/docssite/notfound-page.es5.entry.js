/*! Built with http://stenciljs.com */
DocsSite.loadBundle('notfound-page', ['exports'], function (exports) {
    var h = window.DocsSite.h;
    var NotFoundPage = /** @class */ (function () {
        function NotFoundPage() {
        }
        NotFoundPage.prototype.render = function () {
            return (h("main", null, h("div", { class: "container" }, h("h1", null, "Woops! We can't find the page your looking for."), h("p", null, "Head on back to the ", h("stencil-route-link", { url: "/", class: "block" }, "Icons page"), ".")), h("footer-bar", null)));
        };
        Object.defineProperty(NotFoundPage, "is", {
            get: function () { return "notfound-page"; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NotFoundPage, "style", {
            get: function () { return "notfound-page {\n  text-align: center;\n  height: 100%; }\n  notfound-page h1 {\n    max-width: 500px; }\n  notfound-page a {\n    font-weight: 600; }"; },
            enumerable: true,
            configurable: true
        });
        return NotFoundPage;
    }());
    exports.NotfoundPage = NotFoundPage;
    Object.defineProperty(exports, '__esModule', { value: true });
});
