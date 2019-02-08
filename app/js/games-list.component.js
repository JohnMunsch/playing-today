import { LitElement, html } from 'lit-element';

import './recommended-players.component';

class GamesList extends LitElement {
  static get properties() {
    return { games: { type: Array } };
  }

  remove() {}

  createRenderRoot() {
    return this;
  }

  renderListOfGames(games) {
    return games.map(game => {
      return html`
        <tr>
          <td class="controls">
            <span
              class="glyphicon glyphicon-remove-sign"
              aria-hidden="true"
              @click="${this.remove}"
            ></span>
          </td>
          <td class="name">${game.name}</td>
          <td>
            <recommended-players
              .players="${game.players}"
            ></recommended-players>
          </td>
        </tr>
      `;
    });
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
        <tbody>
          ${this.renderListOfGames(this.games)}
        </tbody>
      </table>
    `;
  }
}

customElements.define('games-list', GamesList);
