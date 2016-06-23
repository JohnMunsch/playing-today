angular.module('Playing').component('games', {
    bindings: {
        games: '<',
        numPlayers: '<'
    },
    controller: function () {
        var _this = this;
        this.onlyCompatible = function () {
            return _.filter(_this.games, function (game) {
                if (_this.numPlayers) {
                    var count = _.find(game.numberOfPlayers, { players: _this.numPlayers });
                    return count ? true : false;
                }
                else {
                    return true;
                }
            });
        };
    },
    template: "\n    <table class=\"table table-striped\">\n      <thead>\n        <tr>\n          <th>Game</th>\n          <th>Number of Players</th>\n        </tr>\n      </thead>\n      <tr ng-repeat=\"(id, game) in $ctrl.onlyCompatible() | orderBy:'name'\">\n        <td class=\"name\"><a href=\"#/game/{{ id }}\">{{ game.name }}</a></td>\n        <td>\n          <recommended-players num-players=\"game.numberOfPlayers\"></recommended-players>\n        </td>\n      </tr>\n    </table>"
});
