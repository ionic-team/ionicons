/*! Built with http://stenciljs.com */
DocsSite.loadComponents(

/**** module id (dev mode) ****/
"icon-search",

/**** component modules ****/
function importComponent(exports, h, t, Context, publicPath) {
var LandingPage = /** @class */ (function () {
    function LandingPage() {
    }
    LandingPage.prototype.keyup = function (ev) {
        console.log('keyup', ev);
    };
    LandingPage.prototype.focusout = function (ev) {
        console.log('focusout', ev);
    };
    LandingPage.prototype.focusin = function (ev) {
        console.log('focusin', ev);
    };
    LandingPage.prototype.render = function () {
        return h("div", { "c": { "icon-search": true } },
            h("div", { "c": { "search": true } },
                h("input", { "a": { "id": "search", "type": "search", "placeholder": "Search" } })));
    };
    return LandingPage;
}());

exports['ICON-SEARCH'] = LandingPage;
},


/***************** icon-search *****************/
[
/** icon-search: tag **/
"ICON-SEARCH",

/** icon-search: members **/
0 /* no members */,

/** icon-search: host **/
{}

]
)