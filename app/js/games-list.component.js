import { LitElement, html } from '@polymer/lit-element';

import './recommended-players.component';

class GamesList extends LitElement {
  createRenderRoot() {
    return this;
  }

  render() {
    return html`
      <table class="table table-striped">
        <thead>
          <tr>
            <th></th>
            <th>Game</th>
            <th>Number of Players</th>
          </tr>
        </thead>
        <tr ng-repeat="(id, game) in $ctrl.onlyCompatible() | orderBy:'name'">
          <td class="controls">
            <span
              class="glyphicon glyphicon-remove-sign"
              aria-hidden="true"
              ng-click="$ctrl.remove()"
            ></span>
          </td>
          <td class="name">{{ game.name }}</td>
          <td>
            <recommended-players
              num-players="game.numberOfPlayers"
            ></recommended-players>
          </td>
        </tr>
      </table>
    `;
  }
}

customElements.define('games-list', GamesList);
