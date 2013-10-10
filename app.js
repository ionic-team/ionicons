// jQuery? We don't need no stinkin' jQuery

if (!String.prototype.trim) {
  String.prototype.trim = function () {
    return this.replace(/^\s+|\s+$/g, '');
  };
}

(function(){

  // load up the icon object from whats in the DOM
  var
  x, l, y,
  iconElement,
  tags,
  pack,
  el,
  isResult,
  totalResults,
  icons = {},
  iconElements = document.getElementsByTagName("li");

  for(x = 0, l = iconElements.length; x < l; x++) {
    iconElement = iconElements[x];
    
    el = document.createElement("div");
    el.innerHTML = iconElement.className;
    iconElement.appendChild(el);

    tags = iconElement.getAttribute("data-tags");
    pack = iconElement.getAttribute("data-pack");
    icons[ iconElement.className ] = {
      tags: (tags ? tags.split(',') : []),
      pack: (pack ? pack : 'default'),
      el: iconElement,
      show: true
    };
    tags = iconElement.className.split('-');
    for(y = 0; y < tags.length; y++) {
      if(tags[y].length > 1 && tags[y] !== "icon") {
        icons[ iconElement.className ].tags.push(tags[y]);
      }
    }
    iconElement.addEventListener("click", iconClick);
  }
  totalResults = icons.length;
  
  function iconClick(e) {
    alert(e.currentTarget.className);
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
    this.placeholder = "Search";
    if(totalResults < 1) {
      this.value = "";
      showAll();
    }
  });
  searchInput.addEventListener("keyup", function(e) {
    var keyCode = e.which || e.keyCode;
    if(keyCode === 27) {
      this.value = "";
      this.blur();
    } else {
      iconsUL.className = "search-results";
      searchQuery(this.value);
    }
  });

  function searchQuery(query) {
    totalResults = 0;
    console.log("query:", query);
    
    query = query.trim();

    var terms = query.split(' ');

    if(terms.length < 1) {
      showAll();
      iconsUL.className = "search-init";
      return;
    }

    iconsUL.className = "search-results";

    // set all to show
    for(x in icons) {
      icons[x].show = true;
    }

    // filter down for each term in the query
    for(var t = 0; t < terms.length; t++) {
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
      icons[x].el.style.display = "inline-block";
    }
  }

})();