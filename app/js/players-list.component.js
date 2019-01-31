import { LitElement, html } from '@polymer/lit-element';

class PlayersList extends LitElement {
  static get properties() {
    return {
      user: { type: Object },
      players: { type: Array }
    };
  }

  playersIn(players) {
    return players.reduce((sum, player) => {
      return sum + (player.playingToday ? 1 : 0);
    }, 0);
  }

  playersOut(players) {
    return players.reduce((sum, player) => {
      return sum + (player.playingToday ? 0 : 1);
    }, 0);
  }

  in(e) {
    this.dispatchEvent(
      new CustomEvent('status-changed', {
        detail: { id: this.user.id, playingToday: true }
      })
    );
  }

  out(e) {
    this.dispatchEvent(
      new CustomEvent('status-changed', {
        detail: { id: this.user.id, playingToday: false }
      })
    );
  }

  renderControlsOrStatus(player, user) {
    if (player.id == user.id) {
      return html`
        <div class="btn-group btn-group-xs">
          <button
            type="button"
            class="btn btn-default ${player.playingToday ? 'active' : ''}"
            @click="${this.in}"
          >
            In
          </button>
          <button
            type="button"
            class="btn btn-default ${!player.playingToday ? 'active' : ''}"
            @click="${this.out}"
          >
            Out
          </button>
        </div>
      `;
    } else {
      return html`
        <div>${player.playingToday ? 'In' : 'Out'}</div>
      `;
    }
  }

  renderListOfPlayers(players, user, playing) {
    return players.map(player => {
      if (player.playingToday == playing) {
        return html`
          <tr>
            <td class="name">${player.email}</td>
            <td class="inOut">${this.renderControlsOrStatus(player, user)}</td>
          </tr>
        `;
      }
    });
  }

  createRenderRoot() {
    // This avoids us building our component with Shadow DOM so we can use Bootstrap
    // or another CSS framework (which Shadow DOM would interfere with).
    return this;
  }

  render() {
    return html`
      <h2>
        In
        <span class="label label-default">${this.playersIn(this.players)}</span>
      </h2>
      <table class="table table-striped">
        <thead>
          <tr>
            <th>Player</th>
            <th class="inOut">In/Out</th>
          </tr>
        </thead>
        <tbody>
          ${this.renderListOfPlayers(this.players, this.user, true)}
        </tbody>
      </table>

      <h2>
        Out
        <span class="label label-default"
          >${this.playersOut(this.players)}</span
        >
      </h2>
      <table class="table table-striped">
        <thead>
          <tr>
            <th>Player</th>
            <th class="inOut">In/Out</th>
          </tr>
        </thead>
        <tbody>
          ${this.renderListOfPlayers(this.players, this.user, false)}
        </tbody>
      </table>
    `;
  }
}

customElements.define('players-list', PlayersList);
