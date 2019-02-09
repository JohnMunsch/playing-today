const Datastore = require('nedb');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const util = require('util');

require('dotenv').config({ path: 'variables.env' });

let db = {};
db.players = new Datastore({ filename: 'src/players.db', autoload: true });
db.players.ensureIndex({ fieldName: 'email', unique: true }, function(err) {
  if (err) {
    throw err;
  }
});
db.games = new Datastore({ filename: 'src/games.db', autoload: true });

const STATUS_CHANGED_TOPIC = 'Status Changed';

function getUserId(context) {
  const Authorization = context.request.get('Authorization');

  if (Authorization) {
    const token = Authorization.replace('Bearer ', '');
    const { _id, email } = jwt.verify(token, process.env.JWTSECRET);

    return { _id, email };
  }

  // There was no authorization or the JSON Web Token would not verify.
  throw new Error('Not authenticated');
}

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
    me: (parent, args, context) => {
      let { _id, email } = getUserId(context);

      return new Promise((resolve, reject) => {
        db.players.find({ email }, (err, players) => {
          if (err) {
            reject(err);
          } else {
            resolve(players[0]);
          }
        });
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
    playing: (parent, args, { pubsub }) => {
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

    // signup(email: String!, password: String!, name: String!): AuthPayload
    signup: async (context, args, { pubsub }) => {
      const password = await bcrypt.hash(args.password, 10);

      return new Promise((resolve, reject) => {
        db.players.insert(
          {
            email: args.email,
            password,
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

                const token = jwt.sign(
                  { _id: newPlayer._id, email: newPlayer.email },
                  process.env.JWTSECRET
                );

                resolve({
                  token,
                  player: newPlayer
                });
              });
            }
          }
        );
      });
    },

    // (_id: String!): Player!
    leave: (context, args, { pubsub }) => {
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
    },

    // login(email: String!, password: String!): AuthPayload
    login: async (context, args, { pubsub }) => {
      return new Promise((resolve, reject) => {
        db.players.find(
          {
            email: args.email
          },
          async (err, player) => {
            if (err) {
              reject(err);
            } else {
              player = player[0];

              const valid = await bcrypt.compare(
                args.password,
                player.password
              );
              if (!valid) {
                reject(new Error('Invalid password.'));
              }

              const token = jwt.sign(
                { _id: player._id, email: player.email },
                process.env.JWTSECRET
              );

              resolve({
                token,
                player
              });
            }
          }
        );
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
