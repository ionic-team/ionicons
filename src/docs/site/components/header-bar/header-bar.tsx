import { Component } from '@stencil/core';


@Component({
  tag: 'header-bar',
  styleUrl: 'header-bar.scss',
  scoped: true
})
export class HeaderBar {

  render() {
    return <header>
      <div>
        <a href='/'>Ionicons</a>
      </div>
      <nav>
        <a href='https://github.com/ionic-team/ionicons'>Github</a>
        <a href='https://ionicframework.com/'>Ionic</a>
      </nav>
    </header>
  }

}
