import { Component, Listen, State } from '@stencil/core';
import '@stencil/router';

interface IconData {
  name: string;
  icons: string[];
  tags: string[];
}

interface AppData {
  version: string | undefined;
  icons: IconData[];
}

@Component({
  tag: 'ionicons-site',
  styleUrl: 'ionicons-site.scss'
})
export class IoniconsSite {

  @State() data: AppData = {
    version: undefined,
    icons: []
  };
  @State() query = '';
  @State() isHeaderSearchVisible = false;

  @Listen('window:scroll')
  handleScroll() {
    requestAnimationFrame(this.checkScroll.bind(this));
  }

  @Listen('hasSearched')
  searchHandler(event: CustomEvent) {
    this.query = event.detail;
  }

  @Listen('toggleHeaderSearch')
  toggleHandler(event: CustomEvent) {
    this.isHeaderSearchVisible = (event.detail === 'show') ? true : false;
  }

  componentWillLoad() {
    this.loadData();
  }

  async loadData() {
    const res = await fetch('/data.json');
    const json = await res.json();

    this.data = json;
    this.data.icons = json.icons.map((o: any) => {
      o.icons = o.icons.reverse();
      o.name = o.icons[0].split('-').slice(1).join('-');
      return o;
    });
  }

  checkScroll() {
    // show/hide header searchbar
    const headerSearchEl = document.querySelector('header .search-input');
    const bodySearchEl = document.querySelector('icon-list .search-input');

    if (!bodySearchEl || !headerSearchEl) {
      return;
    }

    const headerInput = headerSearchEl.querySelector('input')!;
    const bodyInput = bodySearchEl.querySelector('input')!;

    if (bodySearchEl.getBoundingClientRect().top < (bodySearchEl.scrollHeight / 2)) {
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
    return [
      <header-bar
        version={this.data.version}
        query={this.query}
        isSearchVisible={this.isHeaderSearchVisible}></header-bar>,

      <stencil-router>
        <stencil-router-scroll-top>
          <stencil-route-switch scrollTopOffset={0}>
            <stencil-route url="/"
              component="landing-page"
              exact={true}
              componentProps={{ 'query': this.query, 'data': this.data }}>

            </stencil-route>
            <stencil-route url="/usage"
              component="usage-page"
              componentProps={{ 'data': this.data }}>

            </stencil-route>
            <stencil-route component="notfound-page"></stencil-route>
          </stencil-route-switch>
        </stencil-router-scroll-top>
      </stencil-router>
    ];
  }
}
