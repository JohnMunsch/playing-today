import { LitElement, html } from '@polymer/lit-element';

import MainPage from './main-page.js';

class PlayingTodayApp extends LitElement {
  createRenderRoot() {
    return this;
  }

  render() {
    return html`
      <main-page></main-page>

      <footer>
        <div>
          Copyright &copy; 2018
          <a href="mailto:john.munsch@gmail.com">John Munsch</a>
        </div>
      </footer>
    `;
  }
}

customElements.define('playing-today-app', PlayingTodayApp);
