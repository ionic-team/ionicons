/*! Built with http://stenciljs.com */
DocsSite.loadComponents(

/**** module id (dev mode) ****/
"landing-page",

/**** component modules ****/
function importComponent(exports, h, t, Context, publicPath) {
var LandingPage = /** @class */ (function () {
    function LandingPage() {
    }
    LandingPage.prototype.render = function () {
        return h("div", 0,
            h("h1", 0, t("The premium icon pack for "),
                h("a", { "a": { "href": "http://ionicframework.com/" } }, t("Ionic Framework")), t(".")),
            h("h2", 0, t("100% free and open source. MIT Licensed.")),
            h("div", 0,
                h("span", { "c": { "twitter-share": true } },
                    h("a", { "c": { "twitter-share-button": true }, "a": { "href": "https://twitter.com/share", "data-via": "ionicframework", "data-hashtags": "icons,webdev,mobile", "data-related": "benjsperry,maxlynch,adamdbradley,drifty" } }, t("Tweet"))),
                h("span", { "c": { "twitter-follow": true } },
                    h("a", { "c": { "twitter-follow-button": true }, "a": { "href": "https://twitter.com/ionicframework" } }, t("Follow @ionicframework"))),
                h("span", { "c": { "github-star": true } },
                    h("iframe", { "a": { "src": "http://ghbtns.com/github-btn.html?user=ionic-team&repo=ionicons&type=watch&count=true", "allowtransparency": "true", "frameborder": "0", "scrolling": "0", "width": "110", "height": "20" } }))),
            h("icon-search", 0));
    };
    return LandingPage;
}());

exports['LANDING-PAGE'] = LandingPage;
},


/***************** landing-page *****************/
[
/** landing-page: tag **/
"LANDING-PAGE",

/** landing-page: members **/
0 /* no members */,

/** landing-page: host **/
{}

]
)