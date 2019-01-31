import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { WebSocketLink } from 'apollo-link-ws';
import gql from 'graphql-tag';
import { split } from 'apollo-link';
import { getMainDefinition } from 'apollo-utilities';

import { LitElement, html } from '@polymer/lit-element';

import './game-tabs.component';
import './nav-bar.component';
import './players-list.component';

function emailSort(a, b) {
  return a.localeCompare(b);
}
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

    this.user = {};
    this.games = [];
    this.players = [];

    const cache = new InMemoryCache();
    const httpLink = new HttpLink({
      uri: 'http://localhost:4000/'
    });
    const wsLink = new WebSocketLink({
      uri: `ws://localhost:4000/`,
      options: {
        reconnect: true
      }
    });

    // using the ability to split links, you can send data to each link
    // depending on what kind of operation is being sent
    const link = split(
      // split based on operation type
      ({ query }) => {
        const { kind, operation } = getMainDefinition(query);
        return kind === 'OperationDefinition' && operation === 'subscription';
      },
      wsLink,
      httpLink
    );

    this.client = new ApolloClient({
      cache,
      link
    });

    this.client
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

    this.client
      .subscribe({
        query: gql`
          subscription {
            statusChange {
              id
              email
              playingToday
            }
          }
        `
      })
      .subscribe(
        results => (this.players = results.data.statusChange),
        error => console.error(error)
      );
  }

  playingStatusChanged(event) {
    console.log(event);
    // Find the player in the local of players and change status to match.
    this.players = this.players.map(player => {
      if (player.id === event.detail.id) {
        player.playingToday = event.detail.playingToday;
      }

      return player;
    });

    // Make a mutation request via GraphQL to persist the change.
    this.client
      .mutate({
        mutation: gql`
          mutation {
            playing(id: "${event.detail.id}", playingToday: ${
          event.detail.playingToday
        }) { playingToday }
        }
        `
      })
      .then(results => console.log(results), error => console.error(error));
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
              @status-changed="${this.playingStatusChanged}"
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
