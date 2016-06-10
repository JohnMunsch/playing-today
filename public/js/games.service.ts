declare var angular;
declare var _;

angular.module('Playing').factory('GamesService', function ($q) {
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

    let deferred = $q.defer();

    firebase.database().ref(`games`).on('value', (snapshot) => {
      deferred.resolve(snapshot.val());
    });

    return deferred.promise;
  });
