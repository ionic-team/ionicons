import { Component, Listen, State } from '@stencil/core';


@Component({
  tag: 'icon-search',
  styleUrl: 'icon-search.css',
  scoped: true
})
export class LandingPage {

  @State() data: {name: string, icons: Array<string>, tags: Array<string>, isActive: boolean}[] = [];

  @State() search: string = '';

  @State() activeIcon: string = '';

  @Listen('keyup')
  @Listen('search')
  searchListener(ev) {
    this.search = (ev.target as HTMLInputElement).value;
  }

  @Listen('body:click')
  handleBodyClicked() {
    if (this.activeIcon.length) this.activeIcon = '';
  }

  componentWillLoad() {
    return fetch('/data.json').then(rsp => {
      rsp.json().then(d => {
        this.data = d.icons.map((o) =>{
          o.isActive = false;
          o.name = o.icons[0].split('-').slice(1).join('-');
          return o;
        })
      });

    });
  }

  filterIcons() {
    const search = this.search.trim().toLowerCase();
    const results = {
      ios: [],
      md: [],
      logo: []
    };

    this.data.forEach(iconData => {
      if (search === '' || iconData.tags.some(t => t.indexOf(search) > -1)) {
        iconData.icons.forEach(iconName => {
          const iconType = iconName.substr(0, iconName.indexOf('-'));
          results[iconType].push({name:iconData.name, icon: iconName, isActive: iconData.isActive});
        });
      }
    });

    return results;
  }

  handleIconClick(ev, name: string) {
    ev.stopPropagation();
    this.activeIcon = name;
  }

  render() {
    const icons = this.filterIcons();
    const activeIcon = this.data.find(o => o.name === this.activeIcon);
    const activeCodeBlocks = activeIcon
      ? activeIcon.icons.map(icon => {
        return <code><i class={'ion ion-' + icon}></i> {icon} </code>
      })
      : '';

    return (
      <div class="icon-search">

        <div class="search-input">
          <input type="search" placeholder="Search icons..." autofocus/>
        </div>

        <div class="results">

          {icons.ios.length ? <h4>iOS Style</h4> : ''}
          <div class="icon-list">
            {icons.ios.map(icon => {
              return <span class={`icon-list__cell ${(this.activeIcon === icon.name) ? 'active' : ''}`} data-name={icon.name} onClick={(ev) => this.handleIconClick(ev, icon.name)}><i class={'ion ion-' + icon.icon}></i></span>
            })}
          </div>


          {icons.md.length ? <h4>Material Design Style</h4> : ''}
          <div class="icon-list">
            {icons.md.map(icon => {
              return <span class={`icon-list__cell ${(this.activeIcon === icon.name) ? 'active' : ''}`} data-name={icon.name} onClick={(ev) => this.handleIconClick(ev, icon.name)}><i class={'ion ion-' + icon.icon}></i></span>
            })}
          </div>

          {icons.logo.length ? <h4>Logos</h4> : ''}
          <div class="icon-list">
            {icons.logo.map(icon => {
              return <span class={`icon-list__cell ${(this.activeIcon === icon.name) ? 'active' : ''}`} data-name={icon.name} onClick={(ev) => this.handleIconClick(ev, icon.name)}><i class={'ion ion-' + icon.icon}></i></span>
            })}
          </div>

          {(!icons.ios.length && !icons.md.length && !icons.logo.length) ? <h2>No results</h2> : ''}

        </div>

        <div class={`icon-selection-bar ${activeIcon ? 'isVisible' : 'isHidden'}`} onClick={ev => ev.stopPropagation()}>
          <div class="container">
            <div class="icon-selection-bar--inner">
              {activeIcon &&
                <div class="icon-selection-bar__details">
                  <h4>{activeIcon.name}</h4>
                  {activeCodeBlocks}
                </div>
              }
              {activeIcon && <a href="#" class="btn btn--large">Download</a>}
            </div>
          </div>
        </div>

      </div>
    )
  }

}


interface IconData {
  icons: string[];
  tags: string[];
}
