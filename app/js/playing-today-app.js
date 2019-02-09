import { LitElement, html } from 'lit-element';

import MainPage from './main-page.component.js';
import SignInOrRegisterPage from './sign-in-or-register-page.component.js';

class PlayingTodayApp extends LitElement {
  createRenderRoot() {
    return this;
  }

  render() {
    // return html`
    //   <main-page></main-page>
    // `;
    return html`
      <sign-in-or-register-page></sign-in-or-register-page>
    `;
  }
}

customElements.define('playing-today-app', PlayingTodayApp);
