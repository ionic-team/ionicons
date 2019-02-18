const h = window.DocsSite.h;

class IconSearch {
    constructor() {
        this.query = '';
        this.size = 'small';
        this.autofocus = 'none';
        this.showClearCtrl = false;
    }
    watchQuery() {
        this.showClearCtrl = (this.query.length > 0) ? true : false;
    }
    searchListener(ev) {
        if (ev.keyCode === 27) {
            this.handleClear();
            return;
        }
        const value = ev.target.value;
        this.hasSearched.emit(value);
    }
    handleClear() {
        this.hasSearched.emit('');
    }
    componentWillLoad() {
        this.watchQuery();
    }
    render() {
        return (h("div", { class: `search-input search-input--${this.size}` },
            h("input", { type: "text", placeholder: "Search icons...", value: this.query, autofocus: this.autofocus === 'autofocus' ? 'autofocus' : '' }),
            h("i", { class: {
                    'search-input__clear': true,
                    'search-input__clear--active': this.showClearCtrl,
                    'ion': true,
                    'ion-md-close': true
                }, onClick: this.handleClear.bind(this) })));
    }
    static get is() { return "icon-search"; }
    static get properties() { return {
        "autofocus": {
            "type": String,
            "attr": "autofocus"
        },
        "query": {
            "type": String,
            "attr": "query",
            "watchCallbacks": ["watchQuery"]
        },
        "showClearCtrl": {
            "state": true
        },
        "size": {
            "type": String,
            "attr": "size"
        }
    }; }
    static get events() { return [{
            "name": "hasSearched",
            "method": "hasSearched",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }]; }
    static get listeners() { return [{
            "name": "keyup",
            "method": "searchListener"
        }]; }
    static get style() { return "icon-search .search-input {\n  position: relative; }\n\nicon-search .search-input input {\n  width: 100%;\n  font-weight: 400;\n  font-family: 'Eina';\n  font-size: 16px;\n  border: 0;\n  outline: 0;\n  border-radius: 6px;\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box;\n  display: block;\n  -webkit-appearance: none;\n  vertical-align: middle; }\n\nicon-search .search-input__clear {\n  -webkit-transition: background 0.3s, opacity 0.3s;\n  transition: background 0.3s, opacity 0.3s;\n  position: absolute;\n  top: 50%;\n  -webkit-transform: translateY(-50%);\n  transform: translateY(-50%);\n  right: 16px;\n  font-size: 14px;\n  width: 22px;\n  height: 22px;\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-align: center;\n  align-items: center;\n  -ms-flex-pack: center;\n  justify-content: center;\n  cursor: pointer;\n  color: var(--color-pale-sky);\n  opacity: 0;\n  background-color: var(--color-catskill-white);\n  border-radius: 100px; }\n  icon-search .search-input__clear--active {\n    opacity: 0.8; }\n    icon-search .search-input__clear--active:hover {\n      opacity: 1;\n      background-color: #e3e9f3; }\n\nicon-search .search-input--small .search-input__clear {\n  font-size: 12px;\n  width: 18px;\n  height: 18px;\n  background-color: #e3e9f3;\n  right: 12px; }\n  icon-search .search-input--small .search-input__clear--active:hover {\n    background-color: #dce3f0; }\n\nicon-search .search-input:before {\n  font-family: \"Ionicons\";\n  content: \"\\f4a5\";\n  color: var(--color-heather);\n  position: absolute;\n  height: 24px;\n  top: 50%;\n  -webkit-transform: translateY(-50%);\n  transform: translateY(-50%); }\n\nicon-search .search-input--small input {\n  font-size: 13px;\n  line-height: 18px;\n  padding: 10px;\n  padding-left: 30px;\n  padding-right: 30px;\n  background-color: #f6f7f9;\n  height: 39px;\n  text-indent: 0; }\n\nicon-search .search-input--small:before {\n  font-size: 18px;\n  left: 10px; }\n\nicon-search .search-input--large input {\n  -webkit-transition: -webkit-box-shadow 0.3s;\n  transition: -webkit-box-shadow 0.3s;\n  transition: box-shadow 0.3s;\n  transition: box-shadow 0.3s, -webkit-box-shadow 0.3s;\n  font-size: 16px;\n  line-height: 22px;\n  padding: 20px;\n  padding-left: 50px;\n  padding-right: 50px;\n  background-color: white;\n  -webkit-box-shadow: 0px 3px 6px 0px rgba(0, 0, 0, 0.1), 0px 1px 3px 0px rgba(0, 0, 0, 0.08);\n  box-shadow: 0px 3px 6px 0px rgba(0, 0, 0, 0.1), 0px 1px 3px 0px rgba(0, 0, 0, 0.08); }\n\nicon-search .search-input--large input:focus {\n  -webkit-box-shadow: 0px 6px 12px 0px rgba(0, 0, 0, 0.1), 0px 1px 3px 0px rgba(0, 0, 0, 0.08);\n  box-shadow: 0px 6px 12px 0px rgba(0, 0, 0, 0.1), 0px 1px 3px 0px rgba(0, 0, 0, 0.08); }\n\nicon-search .search-input--large:before {\n  font-size: 22px;\n  left: 20px; }\n\nicon-search .search-input input::-webkit-input-placeholder {\n  color: var(--color-heather); }\n\nicon-search .search-input input:-ms-input-placeholder {\n  color: var(--color-heather); }\n\nicon-search .search-input input::-ms-input-placeholder {\n  color: var(--color-heather); }\n\nicon-search .search-input input::placeholder {\n  color: var(--color-heather); }"; }
}

export { IconSearch };
