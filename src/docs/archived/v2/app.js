// jQuery? We don't need no stinkin' jQuery

if (!String.prototype.trim) {
  String.prototype.trim = function () {
    return this.replace(/^\s+|\s+$/g, '');
  };
}

(function(){

  // load up the icon object from whats in the DOM
  var
  x, l, y, t,
  iconElement,
  tags,
  pack,
  isResult,
  totalResults,
  clipboardTimer,
  icons = {},
  iconElements = document.getElementsByTagName("li"),
  searchInput = document.getElementById("search"),
  iconsUL = document.getElementById("icons");

  for(x = 0, l = iconElements.length; x < l; x++) {
    iconElement = iconElements[x];

    if(iconElement.className.length < 6) {
      continue;
    }

    if(icons[ iconElement.className ]) {
      alert(iconElement.className + " already exists");
      continue;
    }

    tags = iconElement.getAttribute("data-tags");
    pack = iconElement.getAttribute("data-pack");

    iconElement.icon = icons[ iconElement.className ] = {
      name: iconElement.className,
      tags: (tags ? tags.split(',') : []),
      pack: (pack ? pack : 'default'),
      el: iconElement,
      show: true,
      code: getContentForIcon(iconElement.className),
      animation: (iconElement.getAttribute("data-animation") === "true")
    };

    tags = iconElement.className.split('-');
    for(y = 0; y < tags.length; y++) {
      tags[y] = tags[y].trim().toLowerCase();
      if(tags[y].length > 0 && tags[y] !== "icon") {
        iconElement.icon.tags.push(tags[y]);
      }
    }
    addEvent(iconElement, 'click', panelClick);
    addEvent(iconElement, 'mouseover', iconMouseOver);
  }
  totalResults = icons.length;

  // search
  function onSearchFocus(){
    iconsUL.className = "search-init";
    searchInput.className = "has-text"
    this.placeholder = "";
    hideIconPanel();
  }
  addEvent(searchInput, "focus", onSearchFocus);
  function onSearchBlur(){
    iconsUL.className = "";
    this.placeholder = "Search";
    if(totalResults < 1 || this.value.trim() === "") {
      this.value = "";
      this.className = "";
      showAll();
    }
    hideIconPanel();
  }
  addEvent(searchInput, "blur", onSearchBlur);
  function onSearchKeyUp(e) {
    var keyCode = e.which || e.keyCode;
    if(keyCode === 27) {
      this.value = "";
      searchInput.className = "";
      this.blur();
    } else if(this.value.trim() === "") {
      showAll();
      this.value = "";
      iconsUL.className = "search-init";
      hideIconPanel();
    } else {
      hideIconPanel();
      iconsUL.className = "search-results";
      searchQuery(this.value);
    }
  }
  addEvent(searchInput, "keyup", onSearchKeyUp);

  function searchQuery(query) {
    if(!query) return;

    totalResults = 0;

    query = query.trim().toLowerCase();

    var terms = query.split(' ');

    if(terms.length < 1) {
      showAll();
      iconsUL.className = "search-init";
      return;
    }

    iconsUL.className = "search-results";
    searchInput.className = "has-text";

    // set all to show
    for(x in icons) {
      icons[x].show = true;
    }

    // filter down for each term in the query
    for(t = 0; t < terms.length; t++) {
      for(x in icons) {
        if(!icons[x].show) continue;
        isResult = false;
        for(y = 0; y < icons[x].tags.length; y++) {
          if( icons[x].tags[y].indexOf(terms[t]) > -1 ) {
            isResult = true;
            break;
          }
        }
        if(!isResult) {
          icons[x].show = false;
        }
      }
    }

    // show or hide
    for(x in icons) {
      if(icons[x].show) {
        totalResults++;
        if(icons[x].el.style.display !== "inline-block") {
          icons[x].el.style.display = "inline-block";
        }
      } else {
        if(icons[x].el.style.display !== "none") {
          icons[x].el.style.display = "none";
        }
      }
    }
  }

  function showAll() {
    totalResults = icons.length;
    for(x in icons) {
      icons[x].show = true;
      if(icons[x].el.style.display !== "inline-block") {
        icons[x].el.style.display = "inline-block";
      }
    }
  }

  function addEvent(el, ev, fn) {
    if (el.addEventListener) {
        el.addEventListener(ev, fn, false);
    } else if (el.attachEvent) {
        el.attachEvent('on' + ev, fn);
    } else {
        el['on' + ev] = fn;
    }
  }

  var iconPanel = document.getElementById("icon-panel");
  var iconName = document.getElementById("icon-name");

  var mouseOverTimeout;
  function iconMouseOver(e) {
    var target = (e.currentTarget) ? e.currentTarget : e.srcElement;
    if(target.className.indexOf("active") === -1) {
      clearTimeout(mouseOverTimeout);
      mouseOverTimeout = setTimeout(hideIconPanel, 20);
    }
  }

  function panelClick(e) {
    var target = (e.currentTarget) ? e.currentTarget : e.srcElement;
    if(target && target.icon) {
      if(target.className.indexOf("active") > -1) {
        hideIconPanel();
        return;
      }
      for(x in icons) {
        if(icons[x].el.className.indexOf("active") > -1) {
          icons[x].el.className = icons[x].el.className.replace(" active", "");
        }
      }
      iconPanel.style.top = (target.offsetTop + 60) + "px";
      iconPanel.style.left = (target.offsetLeft - 85) + "px";
      target.className += " active";
      iconName.value = target.icon.name;
    }
  }

  function hideIconPanel() {
    if(iconPanel.style.top !== "-9999px") {
      iconPanel.style.top = "-9999px";
    }
    for(x in icons) {
      if(icons[x].el.className.indexOf("active") > -1) {
        icons[x].el.className = icons[x].el.className.replace(" active", "");
      }
    }
  }

  function getContentForIcon(className) {
    try {
      var rules = document.styleSheets[0].cssRules;
      for(var j=0; j<rules.length; j++) {
        if(rules[j].selectorText === "." + className + "::before") {
          var content = rules[j].style["content"];
          if(content) {
            var decimalValue = content.charCodeAt().toString(10).replace(/\D/g, ''); //clean the value
            return "\\" + Number(decimalValue).toString(16);
          }
        }
      }
    } catch(e) {}
  }

  if(location.hash && location.hash.length > 1 && location.hash !== '#cdn') {
    searchInput.value = location.hash.replace('#', '').replace(/%20/g, ' ');
    iconsUL.className = "search-results";
    searchQuery(searchInput.value);
  }

})();
