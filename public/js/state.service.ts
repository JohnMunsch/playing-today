declare var angular;
declare var _;

angular.module('Playing').factory('StateService', function ($rootScope) {
  this.state = {
    games: {
    },

    players: {
    },

    playersIn: 0,
    playersOut: 0,
    playersCount: 0
  };

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

    // At the same time we're saving the value to the server...
    // let player = this.state.players[uid];
    // player.playingToday = playingToday;
  };

  // The following are live all the time and updating the state structure as the
  // Firebase database updates.
  firebase.database().ref(`players`).on('value', (snapshot) => {
    $rootScope.$applyAsync(() => {
      this.state.players = snapshot.val();

      // Update all the counts to reflect the current state of the list.
      this.state.playersCount = _.keys(this.state.players).length;
      this.state.playersIn = _.reduce(this.state.players, (sum, player) => {
        return player.playingToday ? sum + 1 : sum;
      }, 0);
      this.state.playersOut = this.state.playersCount - this.state.playersIn;
    });
  });

  firebase.database().ref(`games`).on('value', (snapshot) => {
    $rootScope.$applyAsync(() => {
      this.state.games = snapshot.val();
    });
  });

  return this;
});
