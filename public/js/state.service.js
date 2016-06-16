angular.module('Playing').factory('StateService', function ($rootScope) {
    var _this = this;
    this.state = {
        games: {},
        players: {},
        playersIn: 0,
        playersOut: 0,
        playersCount: 0
    };
    this.signOut = function () {
        firebase.auth().signOut().then(function () {
        }, function (error) {
        });
    };
    this.playingToday = function (uid, name, playingToday) {
        firebase.database().ref("players/" + uid).set({
            name: name,
            playingToday: playingToday
        });
    };
    firebase.database().ref("players").on('value', function (snapshot) {
        $rootScope.$applyAsync(function () {
            _this.state.players = snapshot.val();
            _this.state.playersCount = _.keys(_this.state.players).length;
            _this.state.playersIn = _.reduce(_this.state.players, function (sum, player) {
                return player.playingToday ? sum + 1 : sum;
            }, 0);
            _this.state.playersOut = _this.state.playersCount - _this.state.playersIn;
        });
    });
    firebase.database().ref("games").on('value', function (snapshot) {
        $rootScope.$applyAsync(function () {
            _this.state.games = snapshot.val();
        });
    });
    return this;
});
