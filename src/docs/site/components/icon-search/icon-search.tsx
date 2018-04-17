import { Component, Listen, State } from '@stencil/core';


@Component({
  tag: 'icon-search',
  styleUrl: 'icon-search.css',
  scoped: true
})
export class LandingPage {

  @State() data: IconData[] = [];

  @State() search: string = '';

  @State() activeIcon: string = '';

  @State() visibleIconType: string = 'md';


  @Listen('keyup')
  @Listen('search')
  searchListener(ev: any) {
    this.search = (ev.target as HTMLInputElement).value;
  }

  @Listen('body:keyup')
  escListener(ev: KeyboardEvent) {
    if (ev.code === 'Escape' && this.activeIcon.length) this.activeIcon = '';
  }

  @Listen('body:click')
  handleBodyClicked() {
    if (this.activeIcon.length) this.activeIcon = '';
  }

  componentWillLoad() {
    return fetch('/data.json').then(rsp => {

      rsp.json().then(d => {
        this.data = d.icons.map((o) =>{
          o.icons = o.icons.reverse();
          o.name = o.icons[0].split('-').slice(1).join('-');
          return o;
        })
      });

    });
  }

  filterIcons() {
    const search = this.search.trim().toLowerCase();
    const results = {
      icon: [],
      logo: []
    };

    this.data.forEach(iconData => {
      if (search === '' || iconData.tags.some(t => t.indexOf(search) > -1)) {

        iconData.icons.forEach(iconName => {
          const iconType = iconName.substr(0, iconName.indexOf('-'));

          switch (iconType) {
            case 'ios':
              results['icon'].push({name: iconData.name});
              break;
            case 'logo':
              results['logo'].push({name: iconData.name, icon: iconName});
              break;
            default:
              return;
          }
        });

      }
    });

    return results;
  }

  handleIconMouseEnter(ev: any) {
    ev.target.classList.remove('mouseOff');
    ev.target.classList.add('mouseOver');
  }

  handleIconMouseLeave(ev: any) {
    ev.target.classList.remove('mouseOver');
    ev.target.classList.add('mouseOff');
  }

  handleIconClick(ev: MouseEvent, name: string) {
    ev.stopPropagation();
    this.activeIcon = name;
  }

  handleToggleClick(ev: MouseEvent) {
    ev.stopPropagation();
    if(this.visibleIconType === 'md') {
      this.visibleIconType = 'ios';
    } else {
      this.visibleIconType = 'md'
    }
  }

  render() {
    const results = this.filterIcons();
    const activeIcon = this.data.find(o => o.name === this.activeIcon);

    return (
      <div class="icon-search">

        <div class="search-input">
          <input type="search" placeholder="Search icons..." autofocus/>
        </div>

        <div class="results">
          {results.icon.length ?
            <div class="icon-list__header-bar">
              <h4>App icons</h4>
              <ul class="toggle">
                <li
                  class={`toggle__item ${(this.visibleIconType  === 'md') ? 'active' : ''}`}
                  onClick={ev => this.handleToggleClick(ev)}>
                    Material style
                </li>
                <li
                  class={`toggle__item ${(this.visibleIconType === 'ios') ? 'active' : ''}`}
                  onClick={ev => this.handleToggleClick(ev)}>
                  iOS style
                </li>
              </ul>
            </div>
          : ''}

          <div class="icon-list">
            {results.icon.map(icon => {
              return <span
                class={`icon-list__cell ${(this.activeIcon === icon.name) ? 'active' : ''}`}
                onClick={(ev) => this.handleIconClick(ev, icon.name)}
                onMouseEnter={(ev) => this.handleIconMouseEnter(ev)}
                onMouseLeave={(ev) => this.handleIconMouseLeave(ev)}>
                  <i class={`ion ion-${this.visibleIconType}-${icon.name}`}></i>
                </span>
            })}
          </div>

          {results.logo.length ?
            <div class="icon-list__header-bar">
              <h4>Logos</h4>
            </div>
          : ''}
          <div class="icon-list">
            {results.logo.map(icon => {
              return <span
                class={`icon-list__cell ${(this.activeIcon === icon.name) ? 'active' : ''}`}
                onClick={(ev) => this.handleIconClick(ev, icon.name)}
                onMouseEnter={(ev) => this.handleIconMouseEnter(ev)}
                onMouseLeave={(ev) => this.handleIconMouseLeave(ev)}>

                <i class={'ion ion-' + icon.icon}></i>
              </span>
            })}
          </div>

          {(!results.icon.length && !results.logo.length) ?
            <div class="icon-list--empty">
              <h2>No results for "{this.search}"</h2>
              <p>Not finding an icon that you want? <a href="https://github.com/ionic-team/ionicons/issues">File an issue</a> and suggest a new icon.</p>
            </div>
          : ''}
        </div>

        <toast-bar activeIcon={activeIcon}></toast-bar>

      </div>
    )
  }
}

interface IconData {
  name: string,
  icons: Array<string>,
  tags: Array<string>
}
