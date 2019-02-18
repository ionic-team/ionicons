const h = window.DocsSite.h;

class NotFoundPage {
    render() {
        return (h("main", null,
            h("div", { class: "container" },
                h("h1", null, "Woops! We can't find the page your looking for."),
                h("p", null,
                    "Head on back to the ",
                    h("stencil-route-link", { url: "/", class: "block" }, "Icons page"),
                    ".")),
            h("footer-bar", null)));
    }
    static get is() { return "notfound-page"; }
    static get style() { return "notfound-page {\n  text-align: center;\n  height: 100%; }\n  notfound-page h1 {\n    max-width: 500px; }\n  notfound-page a {\n    font-weight: 600; }"; }
}

export { NotFoundPage as NotfoundPage };
