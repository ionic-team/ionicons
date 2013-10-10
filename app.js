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
  totalResults = 0,
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
    
    if(query === "") {
      showAll();
      iconsUL.className = "search-init";
      return;
    }

    iconsUL.className = "search-results";

    for(x in icons) {
      icon = icons[x];
      icon.show = false;
      for(y = 0; y < icon.tags.length; y++) {
        if( icon.tags[y].indexOf(query) > -1 ) {
          icon.show = true;
          totalResults++;
          break;
        }
      }
      if(icon.show) {
        if(icon.el.style.display !== "inline-block") {
          icon.el.style.display = "inline-block";
        }
      } else {
        if(icon.el.style.display !== "none") {
          icon.el.style.display = "none";
        }
      }
    }
  }

  function showAll() {
    for(x in icons) {
      icons[x].el.style.display = "inline-block";
    }
  }

})();