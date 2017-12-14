import { Component } from '@stencil/core';


@Component({
  tag: 'footer-bar',
  styleUrl: 'footer-bar.scss',
  scoped: true
})
export class FooterBar {

  render() {
    return <footer>
      <nav>
        <a href="cheatsheet.html">Cheatsheet</a>
        <a href="https://ionicframework.com/">Ionic</a>
      </nav>
    </footer>
  }

}
