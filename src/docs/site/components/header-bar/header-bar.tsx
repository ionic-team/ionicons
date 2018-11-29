import { Component, Element, Event, EventEmitter, Listen, Prop, State } from '@stencil/core';

@Component({
  tag: 'header-bar',
  styleUrl: 'header-bar.scss'
})
export class HeaderBar {
  @Element() el!: Element;

  @Event() toggleHeaderSearch!: EventEmitter;

  @State() isSticky = false;
  @State() isMobileMenuShown?: boolean;

  @Prop() query = '';
  @Prop() version?: string;
  @Prop() isSearchVisible = false;

  @Listen('window:scroll')
  handleScroll() {
    requestAnimationFrame(this.checkScroll.bind(this));
  }

  @Listen('window:resize')
  handleResize() {
    requestAnimationFrame(() => {
      if (window.innerWidth > 768) {
        const menu = (this.el.querySelector('nav') as HTMLElement);
        menu.style.display = '';
        this.el.classList.remove('show-mobile-menu');
        document.body.classList.remove('no-scroll');
        this.isMobileMenuShown = false;
      }
    });
  }

  checkScroll() {
    const scrollTop = document.documentElement!.scrollTop || document.body.scrollTop;
    this.isSticky = (scrollTop > 30);
  }

  showNav() {
    if (this.isMobileMenuShown) return;
    this.isMobileMenuShown = true;

    const menu = (this.el.querySelector('nav') as HTMLElement);

    menu.style.display = 'flex';
    setTimeout(() => {
      menu.classList.add('show-mobile-menu');
      document.body.classList.add('no-scroll');
    }, 1);
  }

  hideNav() {
    if (!this.isMobileMenuShown) return;
    this.isMobileMenuShown = false;

    const menu = (this.el.querySelector('nav') as HTMLElement);

    menu.classList.remove('show-mobile-menu');
    setTimeout(() => {
      menu.style.display = 'none';
      document.body.classList.remove('no-scroll');
    }, 300);
  }

  render() {
    return (
      <header class={`${this.isSearchVisible ? 'visible-search' : ''} ${this.isSticky ? 'overlay' : ''}`}>

        <div class="container">
          <div class="logo">
            <stencil-route-link url="/" exact={true}>
              <svg width="32px" height="32px" viewBox="0 0 32 32">
                <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                  <g id="icon" fill-rule="nonzero">
                    <circle id="circle" fill="#EAEEF5" cx="16" cy="16" r="16"></circle>
                    <circle id="circle_copy" fill="#B4C1D8" cx="16" cy="16" r="11"></circle>
                    <circle id="circle_copy_2" fill="#647AA1" cx="16" cy="16" r="6"></circle>
                    <circle id="circle_copy_3" fill="#647AA1" cx="23.5" cy="8.5" r="2"></circle>
                  </g>
                </g>
              </svg>
              Ionicons
            </stencil-route-link>
            <span class="version">{this.version}</span>

          </div>

          <icon-search query={this.query} size="small"></icon-search>

          <nav>
            <stencil-route-link
              class="nav__item"
              url="/"
              exact={true}
              onClick={this.hideNav.bind(this)}>
              Icons
            </stencil-route-link>

            <stencil-route-link
              class="nav__item"
              url="/usage"
              onClick={() => {
                this.toggleHeaderSearch.emit('hide');
                this.hideNav();
              }}>
              Usage
            </stencil-route-link>

            <a class="nav__item" href="https://github.com/ionic-team/ionicons">
              GitHub
              <svg width="12px" height="12px" viewBox="0 0 12 12" version="1.1" xmlns="http://www.w3.org/2000/svg">
                <g transform="translate(0,1)">
                  <rect id="bg" fill="#e3e8f1" x="0" y="2" width="9" height="9" rx="1.5"></rect>
                  <path d="M9.18198052,1 L6.5,1 L6.5,0 L11,0 L11,1 L11,4.5 L10,4.5 L10,1.59619408 L4.02512627,7.57106781 L3.31801948,6.86396103 L9.18198052,1 Z" id="arrow" fill="#A4AEC3"></path>
                </g>
              </svg>
            </a>
            <span class="close" onClick={this.hideNav.bind(this)}><i class="ion ion-md-close"></i></span>
          </nav>

          <a class="btn sm-hide" href="/ionicons.designerpack.zip">
            <svg width="9px" height="11px" viewBox="0 0 9 11" version="1.1" xmlns="http://www.w3.org/2000/svg">
                <g>
                  <rect id="bg" fill="#BAC3D1" x="0" y="9" width="9" height="2" rx="1"></rect>
                  <path d="M5,6.26776695 L7.26776695,4 L7.97487373,4.70710678 L4.70710678,7.97487373 L4.48743687,7.75520382 L4.26776695,7.97487373 L1,4.70710678 L1.70710678,4 L4,6.29289322 L4,0 L5,0 L5,6.26776695 Z" id="arrow" fill="#94A0B8"></path>
                </g>
            </svg>
            Designer pack
          </a>

          <span class="more" onClick={this.showNav.bind(this)}><i class="ion ion-md-more"></i></span>
        </div>

      </header>
    );
  }
}
