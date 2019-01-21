import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import gql from 'graphql-tag';

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

    const cache = new InMemoryCache();
    const link = new HttpLink({
      uri: 'http://localhost:4000/'
    });
    const client = new ApolloClient({
      cache,
      link
    });

    this.user = {};
    this.games = [];
    this.players = [];

    client
      .query({
        query: gql`
          query {
            me {
              id
              email
            }
            games {
              id
              name
              notes
              players {
                num
                best
                recommended
              }
            }
            players {
              id
              email
              playingToday
            }
          }
        `
      })
      .then(results => {
        this.user = results.data.me;
        this.players = results.data.players;
        this.games = results.data.games;

        this.requestUpdate;
      });
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
