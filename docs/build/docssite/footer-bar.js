/*! Built with http://stenciljs.com */
const { h } = window.DocsSite;

class FooterBar {
    render() {
        return (h("footer", null,
            h("div", { class: "container" },
                h("div", { class: "footer__open-source" },
                    h("a", { href: "http://ionicframework.com/", title: "IonicFramework.com", rel: "noopener" },
                        h("img", { src: "/assets/img/ionic-os-logo.png", alt: "Ionic Open Source Logo" })),
                    h("p", null,
                        "Released under ",
                        h("span", { id: "mit" }, "MIT License"),
                        " | Copyright @ ",
                        (new Date()).getFullYear())),
                h("div", { class: "footer-menu" },
                    h("a", { href: "cheatsheet.html" }, "Cheatsheet"),
                    h("a", { href: "/v1" }, "v1"),
                    h("a", { href: "/v2" }, "v2"),
                    h("a", { href: "https://ionicframework.com/docs/components/#icons" }, "v3"),
                    h("a", { href: "https://ionicframework.com/" }, "Ionic Framework")))));
    }
    static get is() { return "footer-bar"; }
    static get style() { return "footer-bar footer {\n  width: 100%;\n  background: var(--color-white-lilac);\n  -webkit-box-flex: 0;\n  -webkit-flex: 0 0 8em;\n  -ms-flex: 0 0 8em;\n  flex: 0 0 8em;\n  /* margin-top: 100px; */ }\n\nfooter-bar .container {\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: justify;\n  -webkit-justify-content: space-between;\n  -ms-flex-pack: justify;\n  justify-content: space-between;\n  -webkit-box-align: center;\n  -webkit-align-items: center;\n  -ms-flex-align: center;\n  align-items: center;\n  width: 100%;\n  padding-top: 40px;\n  padding-bottom: 40px; }\n\nfooter-bar img {\n  width: 50%; }\n\nfooter-bar p {\n  margin-top: 0;\n  margin-bottom: 0;\n  color: var(--color-cadet-blue);\n  font-size: 10px;\n  letter-spacing: 0; }\n\nfooter-bar .footer-menu a {\n  -webkit-transition: color 0.3s;\n  transition: color 0.3s;\n  font-size: 11px;\n  font-weight: 600;\n  text-decoration: none;\n  color: var(--color-gull-gray); }\n\nfooter-bar .footer-menu a:hover {\n  color: var(--color-shark); }\n\nfooter-bar .footer-menu a + a {\n  margin-left: 18px; }\n\n\@media screen and (max-width: 768px) {\n  footer-bar .container {\n    -webkit-box-orient: vertical;\n    -webkit-box-direction: reverse;\n    -webkit-flex-direction: column-reverse;\n    -ms-flex-direction: column-reverse;\n    flex-direction: column-reverse;\n    text-align: center; }\n  footer-bar .footer-menu {\n    margin-bottom: 36px; } }"; }
}

export { FooterBar };
