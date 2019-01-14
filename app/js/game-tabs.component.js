import { LitElement, html } from '@polymer/lit-element';

import './games-list.component.js';

class GameTabs extends LitElement {
  static get properties() {
    return { games: { type: Array }, numPlayers: { type: Number } };
  }

  createRenderRoot() {
    return this;
  }

  render() {
    return html`
      <div class="gamesByPlayerCount">
        <!-- Nav tabs -->
        <ul class="nav nav-tabs" role="tablist">
          <li role="presentation" class="active" ng-if="$ctrl.numPlayers > 0">
            <a href="#tab-1" aria-controls="home" role="tab" data-toggle="tab">
              Games for ${this.numPlayers} Players
            </a>
          </li>
          <li
            role="presentation"
            class="${this.numPlayers === 0 ? 'active' : ''}"
          >
            <a
              href="#tab-2"
              aria-controls="profile"
              role="tab"
              data-toggle="tab"
            >
              All Games
            </a>
          </li>
        </ul>

        <!-- Tab panes -->
        <div class="tab-content">
          <div role="tabpanel" class="tab-pane active" id="tab-1">
            <games-list
              .games="${this.games}"
              .num-players="${this.numPlayers}"
            ></games-list>
          </div>
          <div role="tabpanel" class="tab-pane" id="tab-2">
            <games-list .games="${this.games}"></games-list>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define('game-tabs', GameTabs);
