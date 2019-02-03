const Datastore = require('nedb');
const util = require('util');

let db = {};
db.players = new Datastore({ filename: 'src/players.db', autoload: true });
db.games = new Datastore({ filename: 'src/games.db', autoload: true });

const STATUS_CHANGED_TOPIC = 'Status Changed';

function publishUpdatedPlayers(pubsub) {
  return new Promise((resolve, reject) => {
    db.players.find({}, (err, players) => {
      if (err) {
        reject(err);
      } else {
        resolve(players);

        pubsub.publish(STATUS_CHANGED_TOPIC, {
          statusChange: players
        });
      }
    });
  });
}

module.exports = {
  Query: {
    info: () =>
      `This is the API of a In/Out board for player check in for getting together to play games.`,
    me: () => {
      return new Promise((resolve, reject) => {
        db.players.find(
          { email: 'john.munsch@aptitude.com' },
          (err, players) => {
            if (err) {
              reject(err);
            } else {
              resolve(players[0]);
            }
          }
        );
      });
    },
    games: () => {
      return new Promise((resolve, reject) => {
        db.games.find({}, (err, games) => {
          if (err) {
            reject(err);
          } else {
            resolve(games);
          }
        });
      });
    },
    players: () => {
      return new Promise((resolve, reject) => {
        db.players.find({}, (err, players) => {
          if (err) {
            reject(err);
          } else {
            resolve(players);
          }
        });
      });
    }
  },
  Mutation: {
    // (_id: String!, playingToday: Boolean!): Player!
    playing: (context, args, { pubsub }) => {
      // Find the player in question and set his/her status for gaming today.
      return new Promise((resolve, reject) => {
        db.players.update(
          { _id: args._id },
          { $set: { playingToday: args.playingToday } },
          {},
          (err, docs) => {
            if (err) {
              reject(err);
            } else {
              publishUpdatedPlayers(pubsub).then(players => {
                // Make sure we return the player we just updated.
                let mutatedPlayer = players.find(
                  player => player._id === args._id
                );
                resolve(mutatedPlayer);
              });
            }
          }
        );
      });
    },

    reset: (parent, args, { pubsub }) => {
      return new Promise((resolve, reject) => {
        db.players.update(
          {},
          { $set: { playingToday: false } },
          { multi: true },
          (err, docs) => {
            if (err) {
              reject(err);
            } else {
              resolve(false);

              publishUpdatedPlayers(pubsub);
            }
          }
        );
      });
    },

    // (email: String!): Player!
    createPlayer: (context, args, { pubsub }) => {
      return new Promise((resolve, reject) => {
        db.players.insert(
          {
            email: args.email,
            playingToday: false
          },
          (err, newDoc) => {
            if (err) {
              reject(err);
            } else {
              publishUpdatedPlayers(pubsub).then(players => {
                let newPlayer = players.find(
                  player => player.email === args.email
                );
                resolve(newPlayer);
              });
            }
          }
        );
      });
    },

    // (_id: String!): Player!
    deletePlayer: (context, args, { pubsub }) => {
      return new Promise((resolve, reject) => {
        db.players.remove({ _id: args._id }, {}, (err, docs) => {
          if (err) {
            reject(err);
          } else {
            resolve(true);
            publishUpdatedPlayers(pubsub);
          }
        });
      });
    }
  },
  Subscription: {
    statusChange: {
      subscribe: (parent, args, { pubsub }) => {
        return pubsub.asyncIterator(STATUS_CHANGED_TOPIC);
      }
    }
  }
};
