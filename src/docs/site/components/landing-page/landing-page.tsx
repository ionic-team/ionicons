import { Element, Component, Prop, State, Listen } from '@stencil/core';

@Component({
  tag: 'landing-page',
  styleUrl: 'landing-page.scss'
})
export class LandingPage {
  @Element() el: Element;

  @Prop() query: string = '';
  @Prop() data: any;

  @State() isHeaderSearchVisible: boolean = false;

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
    const headerSearchEl: HTMLElement = document.querySelector('header .search-input');
    const bodySearchEl: HTMLElement = document.querySelector('icon-list .search-input');

    if (!bodySearchEl) return;
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
              <p id="lead" class="lead">Premium designed icons for use in web, iOS, Android, and desktop apps. Support for SVG and web font. Completely open source, MIT licensed.</p>
            </div>
          </div>
          <icon-list query={this.query} data={this.data}></icon-list>
        </div>

        <footer-bar></footer-bar>
      </main>
    )
  }
}
