import { LitElement, html } from '@polymer/lit-element';

import './game-tabs.component';
import './nav-bar.component';
import './players-list.component';

class MainPage extends LitElement {
  createRenderRoot() {
    return this;
  }

  render() {
    return html`
      <nav-bar user="$ctrl.state.user" sign-out="$ctrl.signOut()"></nav-bar>

      <div class="container">
        <div class="row">
          <div class="col-md-4">
            <players-list
              active="$ctrl.state.user"
              state="$ctrl.state"
              playing="$ctrl.playing(uid, name, playingToday)"
            ></players-list>
          </div>
          <div class="col-md-8">
            <game-tabs
              games="$ctrl.state.games"
              num-players="$ctrl.state.counts.playersIn"
            ></game-tabs>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define('main-page', MainPage);
