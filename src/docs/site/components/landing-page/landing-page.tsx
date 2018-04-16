import { Component } from '@stencil/core';


@Component({
  tag: 'landing-page',
  styleUrl: 'landing-page.css',
  scoped: true
})
export class LandingPage {

  render() {
    return(
      <main>
        <div class="wrapper">
          <div class="container">
            <header-bar></header-bar>

            <div class="content">
              <h1>Beautifully crafted open source icons</h1>
              <h3>Premium designed icons for use in web, iOS, Android, and desktop apps. Support for SVG and web font. Completely open source, MIT licensed.</h3>
              <icon-search></icon-search>
            </div>
          </div>
        </div>
        <footer-bar></footer-bar>
      </main>
    )
  }

}
