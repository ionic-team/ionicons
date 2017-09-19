import { Component } from '@stencil/core';


@Component({
  tag: 'landing-page',
  styleUrl: 'landing-page.scss'
})
export class LandingPage {

  render() {
    return <div>

      <h1>
        The premium icon pack for <a href="http://ionicframework.com/">Ionic Framework</a>.
      </h1>

      <h2>
        100% free and open source. MIT Licensed.
      </h2>

      <div>
        <span class="twitter-share">
          <a href="https://twitter.com/share" class="twitter-share-button" data-via="ionicframework" data-hashtags="icons,webdev,mobile" data-related="benjsperry,maxlynch,adamdbradley,drifty">Tweet</a>
        </span>
        <span class="twitter-follow">
          <a href="https://twitter.com/ionicframework" class="twitter-follow-button">Follow @ionicframework</a>
        </span>
        <span class="github-star">
          <iframe src="http://ghbtns.com/github-btn.html?user=ionic-team&amp;repo=ionicons&amp;type=watch&amp;count=true"
          allowtransparency="true" frameborder="0" scrolling="0" width="110" height="20"></iframe>
        </span>
      </div>

      <div class="search">
        <input id="search" type="search" placeholder="Search"/>
      </div>

    </div>
  }

}