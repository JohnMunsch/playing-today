import { LitElement, html } from '@polymer/lit-element';

import './nav-bar.component';

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
            <players
              active="$ctrl.state.user"
              state="$ctrl.state"
              playing="$ctrl.playing(uid, name, playingToday)"
            ></players>
          </div>
          <div class="col-md-8">
            <tabs
              games="$ctrl.state.games"
              num-players="$ctrl.state.counts.playersIn"
            ></tabs>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define('main-page', MainPage);
