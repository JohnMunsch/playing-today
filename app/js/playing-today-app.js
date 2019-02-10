import { LitElement, html } from 'lit-element';
import Model from './model';

import MainPage from './main-page.component.js';
import SignInOrRegisterPage from './sign-in-or-register-page.component.js';

class PlayingTodayApp extends LitElement {
  constructor() {
    super();

    this.model = new Model();
  }

  createRenderRoot() {
    return this;
  }

  render() {
    return html`
      ${this.model.token
        ? html`
            <main-page .model="${this.model}"></main-page>
          `
        : html`
            <sign-in-or-register-page
              .model="${this.model}"
            ></sign-in-or-register-page>
          `}
    `;
  }
}

customElements.define('playing-today-app', PlayingTodayApp);
