import { Element, Component, Listen, State } from '@stencil/core';


@Component({
  tag: 'icon-search',
  styleUrl: 'icon-search.css',
  scoped: true
})
export class LandingPage {

  @Element() el: Element;

  @State() data: IconData[] = [];

  @State() search: string = '';

  @State() activeIcon: string = '';

  @State() visibleIconType: string = 'md';

  @State() isCodeCopied: any = '';

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

  handleCodeClick(ev: MouseEvent) {
    const codeEl = this.el.querySelector('.icon-selection-bar__section code');
    const el = document.createElement('textarea');

    el.value = `<ion-icon name="${this.activeIcon}"></ion-icon>`;
    el.setAttribute('readonly', '');
    el.style.position = 'absolute';
    el.style.left = '-9999px';
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);


    if (this.isCodeCopied.length) {
      clearTimeout(this.isCodeCopied);
      this.isCodeCopied = '';
    }
    codeEl.classList.add('copied');
    this.isCodeCopied = setTimeout(()=>{
      codeEl.classList.remove('copied');
      this.isCodeCopied = '';
    }, 1500);
  }

  render() {
    const results = this.filterIcons();
    const activeIcon = this.data.find(o => o.name === this.activeIcon);
    let activeDownloadLinks = null;

    if (activeIcon) {
      activeDownloadLinks = activeIcon.icons.map((name) => {
        const type = name.substr(0, name.indexOf('-'));

        let heading;
        switch (type) {
          case 'ios':
            heading = 'iOS STYLE';
            break;
          case 'md':
            heading = 'MATERIAL STYLE';
            break;
          case 'logo':
            heading = 'LOGO';
            break;
        }

        return (
          <div class="icon-selection-bar__section">
            <h6>{ heading }</h6>
            <div class="btn-group">
              <div class="btn btn--gray btn--small btn--icon">
                <i class={'ion ion-' + name}></i>
              </div>
              <div class="btn btn--gray btn--small">
                <i class='ion ion-md-download'></i>
                SVG
              </div>
            </div>
          </div>
        )
      })
    }

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

        <div class={`icon-selection-bar ${activeIcon ? 'isVisible' : 'isHidden'}`} onClick={ev => ev.stopPropagation()}>
          <div class="container">
            <div class="icon-selection-bar--inner">
              {activeIcon && <h4>{activeIcon.name}</h4>}
              {activeIcon &&
                <div class="icon-selection-bar__details">
                  <div class="icon-selection-bar__section">
                    <h6>Web component code</h6>
                    <code>
                      <span class="hover-highlight" onClick={ev => this.handleCodeClick(ev)}>
                        {'<'}<span class="yellow">ion-icon</span>&nbsp;<span class="orange">name</span>{'='}<span class="green">{`"${activeIcon.name}"`}</span>{'>'}{'</'}<span class="yellow">ion-icon</span>{'>'}
                      </span>
                      <div class="confirmation"><i class="ion ion-md-checkmark"></i>Copied</div>
                    </code>
                  </div>
                  { activeDownloadLinks }
                </div>
              }
            </div>
          </div>
        </div>

      </div>
    )
  }
}

interface IconData {
  name: string,
  icons: Array<string>,
  tags: Array<string>,
  isActive: boolean
}
