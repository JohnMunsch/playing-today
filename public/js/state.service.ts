declare var angular;
declare var _;
declare var Redux;
declare var reduxLogger;
declare var firebase;

angular.module('Playing').factory('StateService', function ($rootScope, $q) {
  const LOAD_USER = 'LOAD_USER';
  const LOAD_GAMES = 'LOAD_GAMES';
  const LOAD_PLAYERS = 'LOAD_PLAYERS';
  const LOAD_COUNTS = 'LOAD_COUNTS';

  let initialState = {
    user: null,

    games: {
    },

    players: {
    },

    counts: {
      playersIn: 0,
      playersOut: 0,
      playersCount: 0
    }
  };

  var rootReducer = Redux.combineReducers({
    user,
    games,
    players,
    counts
  });

  function configureStore(initialState) {
    return Redux.createStore(rootReducer, initialState, Redux.applyMiddleware(reduxLogger({
      collapsed: true
    })));
  }

  this.store = configureStore(initialState);

  // The structure of Redux with reducers is slightly different. We can actually fire off updates to the server to
  // sing in, register a new user, sign out, change the in/out status of the user, etc. and not immediately update the
  // state. Instead, when Firebase informs us of a change to the remote database, we can dispatch actions to update the
  // state at that point.
  this.register = (email, password) => {
    firebase.auth().createUserWithEmailAndPassword(email, password).then((user) => {
      firebase.database().ref(`players/${user.uid}`).set({
        name: email,
        playingToday: false
      });
    });
  };

  this.signIn = (email, password) => {
    firebase.auth().signInWithEmailAndPassword(email, password).catch(
        (error) => {
          $rootScope.$apply(() => {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // ...
          });
        });
  };
  
  this.signOut = () => {
    firebase.auth().signOut().then(function() {
      // Sign-out successful.
    }, function(error) {
      // An error happened.
    });
  };

  this.playingToday = (uid, name, playingToday) => {
    firebase.database().ref(`players/${uid}`).set({
      name,
      playingToday
    });
  };
  
  this.getGame = (id) => {
    return $q.when(this.store.getState().games[`${id}`]);
  };

  // The following are live all the time and updating the state structure as the
  // Firebase database updates.
  firebase.database().ref(`players`).on('value', (snapshot) => {
    var players = snapshot.val();

    this.store.dispatch({
      type: LOAD_PLAYERS,
      data: players
    });

    // Update all the counts to reflect the current state of the list.
    let playersCount = _.keys(players).length;
    let playersIn = _.reduce(players, (sum, player) => {
      return player.playingToday ? sum + 1 : sum;
    }, 0);
    let playersOut = playersCount - playersIn;

    this.store.dispatch({
      type: LOAD_COUNTS,
      data: {
        playersCount,
        playersIn,
        playersOut
      }
    });
  });

  firebase.database().ref(`games`).on('value', (snapshot) => {
    this.store.dispatch({
      type: LOAD_GAMES,
      data: snapshot.val()
    });
  });

  // Wire up to the Firebase authentication notifications.
  firebase.auth().onAuthStateChanged((user) => {
    this.store.dispatch({
      type: LOAD_USER,
      data: user ? user : null
    });
  });

  function user(state, action) {
    switch (action.type) {
      case LOAD_USER:
        return action.data;
      default:
        if (state === undefined) {
          return initialState;
        } else {
          return state;
        }
    }
  }

  function games(state, action) {
    switch (action.type) {
      case LOAD_GAMES:
        return action.data;
      default:
        if (state === undefined) {
          return initialState;
        } else {
          return state;
        }
    }
  }

  function players(state, action) {
    switch (action.type) {
      case LOAD_PLAYERS:
        return action.data;
      default:
        if (state === undefined) {
          return initialState;
        } else {
          return state;
        }
    }
  }

  function counts(state, action) {
    switch (action.type) {
      case LOAD_COUNTS:
        return action.data;
      default:
        if (state === undefined) {
          return initialState;
        } else {
          return state;
        }
    }
  }

  return this;
});

// let regexForBGGString = /(\d+)\s(\d*.\d+)%\s\(\d+\)\s(\d*.\d+)%\s\(\d+\)\s(\d*.\d+)%/;
//
// let games = [
//   {
//     name: 'Carcassonne',
//     numberOfPlayers: [
//       '2	56.4% (687)	37.6% (458)	6.1% (74)	1219',
//       '3	47.3% (553)	50.3% (588)	2.3% (27)	1168',
//       '4	31.7% (360)	59.7% (678)	8.6% (98)	1136',
//       '5	12.0% (122)	52.7% (536)	35.4% (360)	1018'
//     ],
//     notes: `Plays with six if you add the Inns & Cathedrals.`
//   },
// ];
//
// games = _.map(games, (game) => {
//   if (game.numberOfPlayers.length > 0) {
//     if (_.isString(game.numberOfPlayers[0])) {
//       let numberOfPlayers = _.map(game.numberOfPlayers, (numString) => {
//         let matches = numString.match(regexForBGGString);
//
//         if (!matches) {
//           console.log(numString);
//         }
//
//         return {
//           players: matches[1],
//           best: matches[2],
//           recommended: matches[3],
//           not: matches[4]
//         };
//       });
//
//       return _.assign({}, game, {
//         numberOfPlayers
//       })
//     } else {
//       return game;
//     }
//   } else {
//     return game;
//   }
// });
