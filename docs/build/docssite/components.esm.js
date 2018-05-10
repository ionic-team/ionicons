
var FooterBarComponent = /** @class **/ (function() {
  function FooterBar() {
  }
  FooterBar.is = 'footer-bar';
  FooterBar.getModule = function(opts) {
    
    return import('./footer-bar.js').then(function(m) {
        return m.FooterBar;
      });

  }
});

var HeaderBarComponent = /** @class **/ (function() {
  function HeaderBar() {
  }
  HeaderBar.is = 'header-bar';
  HeaderBar.getModule = function(opts) {
    
    return import('./header-bar.js').then(function(m) {
        return m.HeaderBar;
      });

  }
});

var LandingPageComponent = /** @class **/ (function() {
  function LandingPage() {
  }
  LandingPage.is = 'icon-list';
  LandingPage.getModule = function(opts) {
    
    return import('./icon-list.js').then(function(m) {
        return m.LandingPage;
      });

  }
});

var IconSearchComponent = /** @class **/ (function() {
  function IconSearch() {
  }
  IconSearch.is = 'icon-search';
  IconSearch.getModule = function(opts) {
    
    return import('./icon-search.js').then(function(m) {
        return m.IconSearch;
      });

  }
});

var IoniconsSiteComponent = /** @class **/ (function() {
  function IoniconsSite() {
  }
  IoniconsSite.is = 'ionicons-site';
  IoniconsSite.getModule = function(opts) {
    
    return import('./header-bar.js').then(function(m) {
        return m.IoniconsSite;
      });

  }
});

var LandingPageComponent = /** @class **/ (function() {
  function LandingPage() {
  }
  LandingPage.is = 'landing-page';
  LandingPage.getModule = function(opts) {
    
    return import('./icon-list.js').then(function(m) {
        return m.LandingPage;
      });

  }
});

var NotFoundPageComponent = /** @class **/ (function() {
  function NotFoundPage() {
  }
  NotFoundPage.is = 'notfound-page';
  NotFoundPage.getModule = function(opts) {
    
    return import('./notfound-page.js').then(function(m) {
        return m.NotFoundPage;
      });

  }
});

var RouteComponent = /** @class **/ (function() {
  function Route() {
  }
  Route.is = 'stencil-route';
  Route.getModule = function(opts) {
    
    return import('./header-bar.js').then(function(m) {
        return m.Route;
      });

  }
});

var RouteLinkComponent = /** @class **/ (function() {
  function RouteLink() {
  }
  RouteLink.is = 'stencil-route-link';
  RouteLink.getModule = function(opts) {
    
    return import('./stencil-route-link.js').then(function(m) {
        return m.RouteLink;
      });

  }
});

var RouterComponent = /** @class **/ (function() {
  function Router() {
  }
  Router.is = 'stencil-router';
  Router.getModule = function(opts) {
    
    return import('./header-bar.js').then(function(m) {
        return m.Router;
      });

  }
});

var ToastBarComponent = /** @class **/ (function() {
  function ToastBar() {
  }
  ToastBar.is = 'toast-bar';
  ToastBar.getModule = function(opts) {
    
    return import('./icon-list.js').then(function(m) {
        return m.ToastBar;
      });

  }
});

var UsagePageComponent = /** @class **/ (function() {
  function UsagePage() {
  }
  UsagePage.is = 'usage-page';
  UsagePage.getModule = function(opts) {
    
    return import('./usage-page.js').then(function(m) {
        return m.UsagePage;
      });

  }
});

export {
  
  FooterBar,
  HeaderBar,
  LandingPage,
  IconSearch,
  IoniconsSite,
  LandingPage,
  NotFoundPage,
  Route,
  RouteLink,
  Router,
  ToastBar,
  UsagePage,
};
  