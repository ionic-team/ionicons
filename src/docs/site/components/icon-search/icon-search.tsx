import { Component, Prop, Listen, Event, EventEmitter, State, Watch } from '@stencil/core';

@Component({
  tag: 'icon-search',
  styleUrl: 'icon-search.scss'
})
export class IconSearch {
  @Prop() query: string = '';
  @Prop() size: string = 'small';
  @Prop() autofocus: string = 'none';

  @State() showClearCtrl: boolean = false;

  @Event() hasSearched: EventEmitter;

  @Watch('query')
  watchQuery() {
    this.showClearCtrl = (this.query.length > 0) ? true : false;
  }


  @Listen('keyup')
  searchListener(ev: any) {
    if (ev.keyCode === 27) {
      this.handleClear();
      return;
    }

    const value = (ev.target as HTMLInputElement).value;
    this.hasSearched.emit(value);
  }

  handleClear() {
    this.hasSearched.emit('');
  }

  componentWillLoad() {
    this.watchQuery();
  }

  render() {
    return (
    <div class={`search-input search-input--${this.size}`}>

      <input type="text"
        placeholder="Search icons..."
        value={this.query}
        autofocus={this.autofocus === 'autofocus' ? 'autofocus' : ''}/>

      <i class={{
          'search-input__clear': true,
          'search-input__clear--active': this.showClearCtrl,
          'ion': true,
          'ion-md-close': true
        }}
        onClick={this.handleClear.bind(this)}></i>

    </div>
  )}
}
