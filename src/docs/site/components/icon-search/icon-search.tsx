import { Component, Prop, Listen, Event, EventEmitter } from '@stencil/core';

@Component({
  tag: 'icon-search',
  styleUrl: 'icon-search.css',
  scoped: true
})
export class IconSearch {
  @Prop() query: string = '';
  @Prop() size: string = 'small';
  @Prop() autofocus: string = 'none';

  @Event() hasSearched: EventEmitter;

  @Listen('keyup')
  @Listen('search')
  searchListener(ev: any) {
    const value = (ev.target as HTMLInputElement).value;
    this.hasSearched.emit(value);
  }

  render() {
    return (
    <div class={`search-input search-input--${this.size}`}>
      <input type="search" placeholder="Search icons..." value={this.query} autofocus={this.autofocus === 'autofocus' ? 'autofocus' : ''} />
    </div>
  )}
}
