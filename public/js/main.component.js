angular.module('Playing').component('main', {
    bindings: {
        $router: '<'
    },
    controller: function ($scope, StateService, GamesService) {
        var _this = this;
        this.$routerOnActivate = this.$routeOnReuse = function () {
            firebase.auth().onAuthStateChanged(function (user) {
                $scope.$apply(function () {
                    if (user) {
                        _this.user = user;
                    }
                    else {
                        _this.user = null;
                        _this.$router.navigate(['SignInOrRegister']);
                    }
                });
            });
        };
        this.state = StateService;
        GamesService.then(function (games) {
            _this.games = games;
        });
        this.signOut = function () {
            firebase.auth().signOut().then(function () {
            }, function (error) {
            });
        };
        this.playing = function (uid, name, playingToday) {
            firebase.database().ref("players/" + uid).set({
                name: name,
                playingToday: playingToday
            });
            var player = _this.state.players[uid];
            player.playingToday = playingToday;
        };
        this.numPlaying = function () {
            return _.reduce(_this.state.players, function (sum, player) {
                return player.playingToday ? sum + 1 : sum;
            }, 0);
        };
    },
    template: "\n    <navbar user=\"$ctrl.user\" sign-out=\"$ctrl.signOut()\"></navbar>\n\n    <div class=\"container\">\n      <div class=\"col-md-4\">\n        <players active=\"$ctrl.user\" players=\"$ctrl.state.players\"\n          playing=\"$ctrl.playing(uid, name, playingToday)\"></players>\n      </div>\n      <div class=\"col-md-8\">\n        <games games=\"$ctrl.games\" highlight-count=\"$ctrl.numPlaying()\"></games>\n      </div>\n\n      <hr>\n\n      <footer>\n        <p>&copy; John Munsch 2016</p>\n      </footer>\n    </div> <!-- /container -->"
});
