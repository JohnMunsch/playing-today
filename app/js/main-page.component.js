import { LitElement, html } from 'lit-element';

import './game-tabs.component';
import './nav-bar.component';
import './players-list.component';

class MainPage extends LitElement {
  static get properties() {
    return {
      model: { type: Object },
      user: { type: Object },
      games: { type: Array },
      players: { type: Array }
    };
  }

  constructor() {
    super();
  }

  get user() {
    return this.model.user;
  }

  get games() {
    return this.model.games;
  }

  get players() {
    return this.model.players;
  }

  playingStatusChanged(event) {
    this.model.playing(event.detail._id, event.detail.playingToday);
  }

  signOut(event) {
    this.model.logout();
  }

  createRenderRoot() {
    // This avoids us building our component with Shadow DOM so we can use Bootstrap
    // or another CSS framework (which Shadow DOM would interfere with).
    return this;
  }

  render() {
    return html`
      <nav-bar .user="${this.user}" @sign-out="${this.signOut}"></nav-bar>

      <div class="container">
        <div class="row">
          <div class="col-md-4">
            <players-list
              .user="${this.user}"
              .players="${this.players}"
              @status-changed="${this.playingStatusChanged}"
            ></players-list>
          </div>
          <div class="col-md-8">
            <game-tabs
              .games="${this.games}"
              .num-players="this.counts.playersIn"
            ></game-tabs>
          </div>
        </div>

        <footer>
          <div>
            Copyright &copy; 2019
            <a href="mailto:john.munsch@gmail.com">John Munsch</a>
          </div>
        </footer>
      </div>
    `;
  }
}

customElements.define('main-page', MainPage);
