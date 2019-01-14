import { LitElement, html } from '@polymer/lit-element';

class PlayersList extends LitElement {
  static get properties() {
    return {
      user: { type: Object },
      players: { type: Array }
    };
  }

  playersIn(players) {
    return 2;
  }

  playersOut(players) {
    return 8;
  }

  renderControlsOrStatus(player, user) {
    if (player.uid == user.uid) {
      return html`
        <div
          class="btn-group btn-group-xs"
          role="group"
          aria-label="..."
          ng-if="$ctrl.active.uid === key"
        >
          <button
            type="button"
            class="btn btn-default"
            ng-click="$ctrl.playing({ uid: $ctrl.active.uid, name: $ctrl.active.email, playingToday: true })"
            ng-class="{ active: value.playingToday }"
          >
            In
          </button>
          <button
            type="button"
            class="btn btn-default"
            ng-click="$ctrl.playing({ uid: $ctrl.active.uid, name: $ctrl.active.email, playingToday: false })"
            ng-class="{ active: !value.playingToday }"
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
            <td class="name">${player.name}</td>
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