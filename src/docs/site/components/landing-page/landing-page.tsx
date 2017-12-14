import { Component } from '@stencil/core';


@Component({
  tag: 'landing-page',
  styleUrl: 'landing-page.scss',
  scoped: true
})
export class LandingPage {

  render() {
    return <main>

      <header-bar></header-bar>

      <div>
        <h1>
          Beautifully crafted open source icons.
        </h1>

        <h3>
          Premium designed icons for use in web, iOS, and Android applications.
          Load as a web component, SVG, PNG or font icon. 100% free and open source.
        </h3>
      </div>

      <icon-search></icon-search>

      <footer-bar></footer-bar>

    </main>
  }

}