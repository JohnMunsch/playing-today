import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { WebSocketLink } from 'apollo-link-ws';
import gql from 'graphql-tag';
import { setContext } from 'apollo-link-context';
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

    // Using the ability to split links, you can send data to each link
    // depending on what kind of operation is being sent.
    const link = split(
      // Split based on operation type.
      ({ query }) => {
        const { kind, operation } = getMainDefinition(query);
        return kind === 'OperationDefinition' && operation === 'subscription';
      },
      wsLink,
      httpLink
    );

    const authLink = setContext((_, { headers }) => {
      // Get the authentication token from local storage if it exists
      const token = localStorage.getItem('token');

      // Return the headers to the context so httpLink can read them.
      return {
        headers: {
          ...headers,
          authorization: token ? `Bearer ${token}` : ''
        }
      };
    });

    this.client = new ApolloClient({
      cache,
      link: authLink.concat(link)
    });

    this.client
      .query({
        query: gql`
          query {
            me {
              _id
              email
            }
            games {
              _id
              name
              notes
              players {
                num
                best
                recommended
              }
            }
            players {
              _id
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
              _id
              email
              playingToday
            }
          }
        `
      })
      .subscribe(
        results => {
          this.players = results.data.statusChange;
        },
        error => console.error(error)
      );
  }

  playingStatusChanged(event) {
    // Find the player in the local of players and change status to match.
    this.players = this.players.map(player => {
      if (player._id === event.detail._id) {
        player.playingToday = event.detail.playingToday;
      }

      return player;
    });

    // Make a mutation request via GraphQL to persist the change.
    this.client.mutate({
      mutation: gql`
          mutation {
            playing(_id: "${event.detail._id}", playingToday: ${
        event.detail.playingToday
      }) { playingToday }
        }
        `
    });
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
