import { Component, Listen } from '@stencil/core';


@Component({
  tag: 'icon-search',
  styleUrl: 'icon-search.scss'
})
export class LandingPage {

  @Listen('keyup')
  keyup(ev: KeyboardEvent) {
    console.log('keyup', ev);
  }

  @Listen('focusout')
  focusout(ev: UIEvent) {
    console.log('focusout', ev);
  }

  @Listen('focusin')
  focusin(ev: UIEvent) {
    console.log('focusin', ev);
  }

  render() {
    return <div class="icon-search">

      <div class="search">
        <input id="search" type="search" placeholder="Search"/>
      </div>

    </div>
  }

}