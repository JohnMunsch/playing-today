const Datastore = require('nedb');

let db = {};
db.players = new Datastore({ filename: 'players.db', autoload: true });
db.games = new Datastore({ filename: 'games.db', autoload: true });

function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = (Math.random() * 16) | 0,
      v = c == 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

const STATUS_CHANGED_TOPIC = 'Status Changed';

module.exports = {
  Query: {
    info: () =>
      `This is the API of a In/Out board for player check in for getting together to play games.`,
    me: () => {
      return players.find(
        player => player.email === 'john.munsch@aptitude.com'
      );
    },
    games: () => games,
    players: () => players
  },
  Mutation: {
    // (id: String!, playingToday: Boolean!): Player!
    playing: (context, args, { pubsub }) => {
      // Find the player in question and set his/her status for gaming today.
      let player = players.find(player => player.id === args.id);

      player.playingToday = args.playingToday;

      pubsub.publish(STATUS_CHANGED_TOPIC, { statusChange: players });

      return player;
    },

    reset: (parent, args, { pubsub }) => {
      players = players.map(player => {
        player.playingToday = false;

        return player;
      });

      pubsub.publish(STATUS_CHANGED_TOPIC, { statusChange: players });

      return false;
    },

    // (name: String!, notes: String, players: RecommendationInput): Game!
    createGame: (context, args) => {
      let newGame = {
        id: uuidv4(),
        name: args.name,
        notes: args.notes,
        players: args.players
      };

      games.push(newGame);

      return newGame;
    },
    // (id: String!): Game
    deleteGame: (context, args) => {
      let match = null;

      games = games.filter(game => {
        if (game.id === args.id) {
          match = game;
          return false;
        } else {
          return true;
        }
      });

      return match;
    },

    // (email: String!): Player!
    createPlayer: (context, args, { pubsub }) => {
      let newPlayer = {
        id: uuidv4(),
        email: args.email,
        playingToday: false
      };

      players.push(newPlayer);

      pubsub.publish(STATUS_CHANGED_TOPIC, { statusChange: players });

      return newPlayer;
    },
    // (id: String!): Player!
    deletePlayer: (context, args, { pubsub }) => {
      let match = null;

      players = players.filter(player => {
        if (player.id === args.id) {
          match = player;
          return false;
        } else {
          return true;
        }
      });

      pubsub.publish(STATUS_CHANGED_TOPIC, { statusChange: players });

      return match;
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
