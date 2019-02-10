import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { WebSocketLink } from 'apollo-link-ws';
import gql from 'graphql-tag';
import { setContext } from 'apollo-link-context';
import { split } from 'apollo-link';
import { getMainDefinition } from 'apollo-utilities';

import PubSub from 'pubsub-js';

function emailSort(a, b) {
  return a.localeCompare(b);
}

export default class Model {
  constructor() {
    this.user = {};
    this.games = [];
    this.players = [];

    // Create links to connect to both the conventional URL (for queries and mutations)
    // and to the websocket connection (for subscriptions).
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

    // Using the ability to split links, you can send data to each link depending
    // on what kind of operation is being sent.
    const link = split(
      // Split based on operation type.
      ({ query }) => {
        const { kind, operation } = getMainDefinition(query);
        return kind === 'OperationDefinition' && operation === 'subscription';
      },
      wsLink,
      httpLink
    );

    // Create a decorator which will add the token to the header with each request.
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

    this.token = localStorage.getItem('token');

    if (this.token) {
      this.init();
    }
  }

  init() {
    // Now that we've got everything setup, make an initial query to get info about
    // the user, all games, and all players.
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

        PubSub.publish('Model Changed', this);
      });

    // And make another request to subscribe to player status changes.
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

          PubSub.publish('Model Changed', this);
        },
        error => console.error(error)
      );
  }

  signup(email, password) {
    return this.client
      .mutate({
        mutation: gql`
        mutation {
          signup(email:"${email}", password:"${password}") {
            token
            player {
              _id,
              email
              playingToday
            }
          }
        }`
      })
      .then(results => {
        this.token = results.data.signup.token;

        return results;
      });
  }

  login(email, password) {
    return this.client
      .mutate({
        mutation: gql`
        mutation {
          login(email:"${email}", password:"${password}") {
            token
            player {
              _id
              email
              playingToday
            }
          }
        }`
      })
      .then(results => {
        this.token = results.data.login.token;

        return results;
      });
  }

  logout() {
    // Get rid of any local JSON Web Token to log this user out.
    localStorage.removeItem('token');

    // Clear all of the local data.
    this.user = {};
    this.games = [];
    this.players = [];
  }

  playing(_id, playingToday) {
    // Make a mutation request via GraphQL to persist the change.
    return this.client.mutate({
      mutation: gql`
          mutation {
            playing(_id: "${_id}", playingToday: ${playingToday}) { playingToday }
        }
        `
    });
  }
}
