// jQuery? We don't need no stinkin' jQuery

(function(){

  // load up the icon object from whats in the DOM
  var
  x, l, y,
  iconElement,
  tags,
  pack,
  el,
  icon,
  icons = {},
  iconElements = document.getElementsByTagName("li");

  for(x = 0, l = iconElements.length; x < l; x++) {
    iconElement = iconElements[x];
    if(iconElement.className === "") {
      iconElement.style.display = 'none';
      continue;
    }
    el = window.getPseudoElements(iconElement, "before");
    el = document.createElement("input");
    el.value = iconElement.className;
    iconElement.appendChild(el);
    tags = iconElement.getAttribute("data-tags");
    pack = iconElement.getAttribute("data-pack");
    icons[ iconElement.className ] = {
      tags: (tags ? tags.split(',') : []),
      pack: (pack ? pack : 'default'),
      el: iconElement
    };
    tags = iconElement.className.split('-');
    for(y = 0; y < tags.length; y++) {
      if(tags[y] !== "icon") {
        icons[ iconElement.className ].tags.push(tags[y]);
      }
    }
  }


  // search
  var searchInput = document.getElementById("search");
  var iconsUL = document.getElementById("icons");
  searchInput.addEventListener("focus", function(){
    iconsUL.className = "search-init";
    this.placeholder = "";
  });
  searchInput.addEventListener("blur", function(){
    iconsUL.className = "";
    this.value = "";
    this.placeholder = "Search";
  });
  searchInput.addEventListener("keyup", function(e) {
    var keyCode = e.which || e.keyCode;
    if(keyCode === 27) {
      this.blur();
    } else {
      iconsUL.className = "search-results";
      searchQuery(this.value);
    }
  });

  function searchQuery(query) {
    var isResult = false;

    console.log("query:", query);
    if(query === "") {
      iconsUL.className = "search-init";
      return;
    }

    iconsUL.className = "search-results";

    for(x in icons) {
      icon = icons[x];
      for(y = 0; y < icon.tags.length; y++) {
        if( icon.tags[y].indexOf(query) > -1 ) {
          isResult = true;
          break;
        }
      }
      if(isResult) {
        if(icon.el.style.display !== "inline-block") {
          icon.el.style.display = "inline-block";
        }
      } else {
        if(icon.el.style.display !== "") {
          icon.el.style.display = "";
        }
      }
    }
  }

})();