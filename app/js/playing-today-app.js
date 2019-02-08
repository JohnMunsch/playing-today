import { LitElement, html } from 'lit-element';

import MainPage from './main-page.js';

class PlayingTodayApp extends LitElement {
  createRenderRoot() {
    return this;
  }

  render() {
    return html`
      <main-page></main-page>
    `;
  }
}

customElements.define('playing-today-app', PlayingTodayApp);
