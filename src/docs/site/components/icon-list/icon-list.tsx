import { Component, Element, Listen, Prop, State } from '@stencil/core';


@Component({
  tag: 'icon-list',
  styleUrl: 'icon-list.scss'
})
export class LandingPage {
  @Element() el!: Element;

  @State() selectedIcon = '';
  @State() selectedIconType = 'md';
  @State() isHeaderSearchVisible = false;

  @Prop() query = '';
  @Prop() data: any;

  @Listen('body:keyup')
  escListener(ev: KeyboardEvent) {
    if (ev.code === 'Escape' && this.selectedIcon.length) this.selectedIcon = '';
  }

  @Listen('body:click')
  handleBodyClicked() {
    if (this.selectedIcon.length) this.selectedIcon = '';
  }

  @Listen('clearToast')
  handleClearToast() {
    this.selectedIcon = '';
  }

  @Listen('window:scroll')
  handleScroll() {
    requestAnimationFrame(this.checkScroll.bind(this));
  }

  checkScroll() {
    const headerBars = this.el.querySelectorAll('.icon-list__header-bar');

    for (let i = 0; i < headerBars.length; i++) {
      const bar = headerBars[i];
      if (bar.getBoundingClientRect().top < 67) {
        bar.classList.add('sticky');
      } else {
        bar.classList.remove('sticky');
      }
    }
  }

  filterIcons() {
    const search = this.query.trim().toLowerCase();
    const results = {
      icon: [],
      logo: []
    };

    this.data.icons.forEach((iconData: any) => {
      if (search === '' || iconData.tags.some((t: any) => t.indexOf(search) > -1)) {

        iconData.icons.forEach((iconName: any) => {
          const iconType = iconName.substr(0, iconName.indexOf('-'));

          switch (iconType) {
            case 'ios':
              results['icon'].push({ name: iconData.name });
              break;
            case 'logo':
              results['logo'].push({ name: iconData.name, icon: iconName });
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
    this.selectedIcon = name;
  }

  handleToggleClick(ev: MouseEvent) {
    ev.stopPropagation();
    this.selectedIconType = (this.selectedIconType === 'md')
     ? 'ios' : 'md';
  }

  render() {
    const results = this.filterIcons();
    const selectedIcon = this.data.icons.find(o => o.name === this.selectedIcon);

    if (!results.icon.length && !results.logo.length && this.isHeaderSearchVisible) document.documentElement!.scrollTop = 0;

    return (
      <div class="icon-list">

        <div class="icon-list__search container--small">
          <icon-search query={this.query} size="large" autofocus="autofocus"></icon-search>
        </div>

          {results.icon.length ?
            <div class="icon-list__wrapper">
              <div class="icon-list__header-bar">
                <div class="container--small">
                  <h4>App icons</h4>
                  <ul class="toggle">
                    <li
                      class={`toggle__item ${(this.selectedIconType === 'md') ? 'active' : ''}`}
                      onClick={ev => this.handleToggleClick(ev)}>
                        Material style
                    </li>
                    <li
                      class={`toggle__item ${(this.selectedIconType === 'ios') ? 'active' : ''}`}
                      onClick={ev => this.handleToggleClick(ev)}>
                      iOS style
                    </li>
                  </ul>
                </div>
              </div>
              <div class="container--small">
                <div class="icon-results">
                  {results.icon.map(icon => (
                    <span
                      class={`icon-results__cell ${(this.selectedIcon === icon.name) ? 'active' : ''}`}
                      onClick={(ev) => this.handleIconClick(ev, icon.name)}
                      onMouseEnter={(ev) => this.handleIconMouseEnter(ev)}
                      onMouseLeave={(ev) => this.handleIconMouseLeave(ev)}>
                        <i class={`ion ion-${this.selectedIconType}-${icon.name}`}></i>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          : ''}

        {results.logo.length ?
          <div class="icon-list__wrapper">

            <div class="icon-list__header-bar">
              <div class="container--small">
                <h4>Logos</h4>
              </div>
            </div>

            <div class="container--small">
              <div class="icon-results">
                {results.logo.map(icon => (
                  <span
                    class={`icon-results__cell ${(this.selectedIcon === icon.name) ? 'active' : ''}`}
                    onClick={(ev) => this.handleIconClick(ev, icon.name)}
                    onMouseEnter={(ev) => this.handleIconMouseEnter(ev)}
                    onMouseLeave={(ev) => this.handleIconMouseLeave(ev)}>

                    <i class={'ion ion-' + icon.icon}></i>
                  </span>
                ))}
              </div>
            </div>
          </div>
        : ''}

        {(!results.icon.length && !results.logo.length) ?
          <div class="icon-results--empty container--small">
            <h2>No results for "{this.query}"</h2>
            <p>Not finding an icon that you want? <a href="https://github.com/ionic-team/ionicons/issues">File an issue</a> and suggest a new icon.</p>
          </div>
        : ''}

        <toast-bar
          selectedIcon={selectedIcon}
          selectedIconType={this.selectedIconType}>
        </toast-bar>

      </div>
    );
  }
}
