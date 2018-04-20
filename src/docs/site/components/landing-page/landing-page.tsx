import { Element, Component, State, Listen } from '@stencil/core';

@Component({
  tag: 'landing-page',
  styleUrl: 'landing-page.scss'
})
export class LandingPage {
  @Element() el: Element;

  @State() query: string = '';
  @State() isHeaderSearchVisible: boolean = false;

  @Listen('hasSearched')
  searchHandler(event: CustomEvent) {
    this.query = event.detail;
  }

  @Listen('toggleHeaderSearch')
  toggleHandler(event: CustomEvent) {
    this.isHeaderSearchVisible = (event.detail === 'show') ? true : false;
  }

  @Listen('window:scroll')
  handleScroll() {
    requestAnimationFrame(this.checkScroll.bind(this));
  }

  checkScroll() {
    const stickyHeaders = Array.from(this.el.querySelectorAll('.icon-list__header-bar'))
    stickyHeaders.forEach( o => {
      const childTop = o.getBoundingClientRect().top;
      if (childTop <= 58) {
        o.classList.add('sticky');
      } else {
        o.classList.remove('sticky');
      }
    })

    // show/hide header searchbar
    const headerSearchEl: HTMLElement = this.el.querySelector('header .search-input');
    const bodySearchEl: HTMLElement = this.el.querySelector('icon-list .search-input');
    const headerInput: HTMLElement = headerSearchEl.querySelector('input');
    const bodyInput: HTMLElement = bodySearchEl.querySelector('input');

    if (bodySearchEl.getBoundingClientRect().top < (bodySearchEl.scrollHeight/2)) {
      if (this.isHeaderSearchVisible) return;
      this.isHeaderSearchVisible = true;
      if (bodyInput === document.activeElement) headerInput.focus();
    } else {
      if (!this.isHeaderSearchVisible) return;
      this.isHeaderSearchVisible = false;
      if (headerInput === document.activeElement) bodyInput.focus();
    }
  }

  render() {
    return(
      <main>
        <div class="wrapper">


          <div class="container">
            <div class="content">
              <h1>Beautifully crafted open source icons</h1>
              <h3>Premium designed icons for use in web, iOS, Android, and desktop apps. Support for SVG and web font. Completely open source, MIT licensed.</h3>
            </div>
          </div>
          <icon-list query={this.query}></icon-list>
        </div>

        <footer-bar></footer-bar>
      </main>
    )
  }
}
