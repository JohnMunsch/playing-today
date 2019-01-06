import { LitElement, html } from '@polymer/lit-element';

import './games-list.component.js';

class GameTabs extends LitElement {
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
              Games for {{ $ctrl.numPlayers }} Players
            </a>
          </li>
          <li role="presentation" ng-class="{ active: $ctrl.numPlayers === 0 }">
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
            <games-list games="$ctrl.games" num-players="$ctrl.numPlayers"></games>
          </div>
          <div role="tabpanel" class="tab-pane" id="tab-2">
            <games-list games="$ctrl.games"></games>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define('game-tabs', GameTabs);
