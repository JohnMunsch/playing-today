import { LitElement, html } from '@polymer/lit-element';

import './game-tabs.component';
import './nav-bar.component';
import './players-list.component';

class MainPage extends LitElement {
  static get properties() {
    return {
      user: { type: Object },
      games: { type: Array },
      players: { type: Array }
    };
  }

  constructor() {
    super();

    // Retrieve the list of games and associated info.
    // If the user is logged in, obtain the user's data, player info, and
    // subscribe to receive notifications about changes in player's status.
    this.user = {
      uid: '6plMXPEIgoO4CYNUHp6HZEuDQ352',
      email: 'john.munsch@aptitude.com'
    };

    this.players = [
      {
        uid: '4ajsIxK3zJeCD39JoP0IDNGY4t82',
        name: 'mike.wartberg@aptitude.com',
        playingToday: false
      },
      {
        uid: '6plMXPEIgoO4CYNUHp6HZEuDQ352',
        name: 'john.munsch@aptitude.com',
        playingToday: true
      },
      {
        uid: 'CXbucJgnHcW6LK68blG3RVozg3D2',
        name: 'trang.ngo@aptitude.com',
        playingToday: false
      },
      {
        uid: 'DcX0mno0e8T5ewKbw4yAN9Tv7EF2',
        name: 'sfisherm@vha.com',
        playingToday: true
      },
      {
        uid: 'IMkuyDvmYNMYEIIfkV28HVmFZl62',
        name: 'luis.gomez@aptitude.com',
        playingToday: false
      },
      {
        uid: 'PCLW3bxNgxPaq4bosKIpSiEFRYY2',
        name: 'david.daniels@aptitude.com',
        playingToday: false
      },
      {
        uid: 'YeRVOKsi7sVhcsz75vATE9AZdRL2',
        name: 'mike.nguchie@aptitude.com',
        playingToday: false
      },
      {
        uid: 'cDXTUxWBGwcPXsNzkRgc6x88uAR2',
        name: 'barry.forrest@vizientinc.com',
        playingToday: false
      },
      {
        uid: 'sSNQFNHhzOOFhnPx7ydssl7gixr1',
        name: 'richard.morgan@aptitude.com',
        playingToday: false
      },
      {
        uid: 'vok5IUKHdaRBPvNlEYzhtjNYy4t1',
        name: 'kavya.katam@aptitude.com',
        playingToday: false
      }
    ];

    this.games = [
      {
        name: 'Carcassonne',
        notes: 'Plays with six if you add the Inns & Cathedrals.',
        numberOfPlayers: {
          '0': { best: 56.4, not: 6.1, players: 2, recommended: 37.6 },
          '1': { best: 47.3, not: 2.3, players: 3, recommended: 50.3 },
          '2': { best: 31.7, not: 8.6, players: 4, recommended: 59.7 },
          '3': { best: 12, not: 35.4, players: 5, recommended: 52.7 }
        }
      },
      {
        name: 'Jamaica',
        numberOfPlayers: {
          '0': { best: 3.9, not: 58.3, players: 2, recommended: 37.9 },
          '1': { best: 8.2, not: 25.8, players: 3, recommended: 66 },
          '2': { best: 33.6, not: 0.9, players: 4, recommended: 65.5 },
          '3': { best: 45, not: 0, players: 5, recommended: 55 },
          '4': { best: 70.9, not: 4.5, players: 6, recommended: 24.5 }
        }
      },
      {
        name: 'Augustus',
        numberOfPlayers: {
          '0': { best: 6.7, not: 20, players: 2, recommended: 73.3 },
          '1': { best: 50.9, not: 0, players: 3, recommended: 49.1 },
          '2': { best: 67.9, not: 0, players: 4, recommended: 32.1 },
          '3': { best: 35.4, not: 4.2, players: 5, recommended: 60.4 },
          '4': { best: 23.9, not: 15.2, players: 6, recommended: 60.9 }
        }
      },
      {
        name: 'No Thanks!',
        numberOfPlayers: {
          '0': { best: 1, not: 92.2, players: 2, recommended: 6.8 },
          '1': { best: 17.5, not: 18.9, players: 3, recommended: 63.6 },
          '2': { best: 57.7, not: 0, players: 4, recommended: 42.3 },
          '3': { best: 73, not: 0.7, players: 5, recommended: 26.4 }
        }
      },
      {
        name: 'Rattus',
        numberOfPlayers: {
          '0': { best: 6.8, not: 45.9, players: 2, recommended: 47.3 },
          '1': { best: 28.6, not: 3.9, players: 3, recommended: 67.5 },
          '2': { best: 87.8, not: 2.4, players: 4, recommended: 9.8 }
        }
      },
      {
        name: 'Agricola: All Creatures Big and Small',
        numberOfPlayers: {
          '0': { best: 94, not: 1.2, players: 2, recommended: 4.8 }
        }
      },
      {
        name: 'Dice Town',
        numberOfPlayers: {
          '0': { best: 4.7, not: 53.5, players: 2, recommended: 41.9 },
          '1': { best: 20.9, not: 16.3, players: 3, recommended: 62.8 },
          '2': { best: 67.4, not: 2.2, players: 4, recommended: 30.4 },
          '3': { best: 48.9, not: 6.4, players: 5, recommended: 44.7 }
        }
      },
      {
        name: 'Saboteur',
        numberOfPlayers: {
          '0': { best: 1.4, not: 83.7, players: 3, recommended: 15 },
          '1': { best: 4.3, not: 58.4, players: 4, recommended: 37.3 },
          '2': { best: 21.5, not: 8.6, players: 5, recommended: 69.9 },
          '3': { best: 37.3, not: 6.5, players: 6, recommended: 56.2 },
          '4': { best: 64.7, not: 1.2, players: 7, recommended: 34.1 },
          '5': { best: 58.8, not: 4.1, players: 8, recommended: 37.2 },
          '6': { best: 31.6, not: 9.6, players: 9, recommended: 58.8 },
          '7': { best: 24.8, not: 14.3, players: 10, recommended: 60.9 }
        }
      },
      {
        name: 'Bang! The Dice Game',
        numberOfPlayers: {
          '0': { best: 0, not: 87.1, players: 3, recommended: 12.9 },
          '1': { best: 3.5, not: 55.8, players: 4, recommended: 40.7 },
          '2': { best: 32.6, not: 1.1, players: 5, recommended: 66.3 },
          '3': { best: 68.8, not: 0, players: 6, recommended: 31.3 },
          '4': { best: 64.8, not: 1.1, players: 7, recommended: 34.1 },
          '5': { best: 39.5, not: 5.8, players: 8, recommended: 54.7 }
        }
      },
      {
        name: 'Cacao',
        numberOfPlayers: {
          '0': { best: 19.4, not: 6.5, players: 2, recommended: 74.2 },
          '1': { best: 69.7, not: 3, players: 3, recommended: 27.3 },
          '2': { best: 34.3, not: 5.7, players: 4, recommended: 60 }
        }
      },
      {
        name: 'Dominion',
        numberOfPlayers: {
          '0': { best: 38.4, not: 6, players: 2, recommended: 55.6 },
          '1': { best: 56.7, not: 1, players: 3, recommended: 42.3 },
          '2': { best: 39.6, not: 6.9, players: 4, recommended: 53.5 }
        }
      },
      {
        name: 'For Sale',
        numberOfPlayers: {
          '0': { best: 7.7, not: 19.6, players: 3, recommended: 72.6 },
          '1': { best: 41.2, not: 0, players: 4, recommended: 58.8 },
          '2': { best: 69.4, not: 1.2, players: 5, recommended: 29.5 },
          '3': { best: 32.5, not: 8.8, players: 6, recommended: 58.8 }
        }
      },
      {
        name: 'High Society',
        numberOfPlayers: {
          '0': { best: 20, not: 21.5, players: 3, recommended: 58.5 },
          '1': { best: 63.6, not: 0, players: 4, recommended: 36.4 },
          '2': { best: 56.3, not: 3.1, players: 5, recommended: 40.6 }
        }
      },
      {
        name: 'Sushi Go',
        numberOfPlayers: {
          '0': { best: 5.7, not: 39.8, players: 2, recommended: 54.5 },
          '1': { best: 44.9, not: 2.2, players: 3, recommended: 52.8 },
          '2': { best: 71.1, not: 1, players: 4, recommended: 27.8 },
          '3': { best: 33.3, not: 7.7, players: 5, recommended: 59 }
        }
      },
      {
        name: 'Coup Rebellion G54',
        numberOfPlayers: {
          '0': { best: 7.1, not: 28.6, players: 3, recommended: 64.3 },
          '1': { best: 35.7, not: 0, players: 4, recommended: 64.3 },
          '2': { best: 85.7, not: 0, players: 5, recommended: 14.3 },
          '3': { best: 64.3, not: 7.1, players: 6, recommended: 28.6 }
        }
      },
      {
        name: 'Splendor',
        numberOfPlayers: {
          '0': { best: 34.5, not: 7.8, players: 2, recommended: 57.8 },
          '1': { best: 53.2, not: 2, players: 3, recommended: 44.8 },
          '2': { best: 37.5, not: 8.2, players: 4, recommended: 54.3 }
        }
      },
      {
        name: 'Settlers of Catan, The',
        numberOfPlayers: {
          '0': { best: 35, not: 7.1, players: 3, recommended: 57.9 },
          '1': { best: 75.9, not: 2, players: 4, recommended: 22.1 }
        }
      },
      {
        name: 'Carcassonne: The Castle',
        numberOfPlayers: {
          '0': { best: 96.5, not: 0, players: 2, recommended: 3.5 }
        }
      }
    ];
  }

  playingStatusChanged(event) {
    console.log('playingStatusChanged');
  }

  signOut(event) {
    console.log('signOut');
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
              @playing-status-changed="${this.playingStatusChanged}"
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
