angular.module('Playing').component('games', {
    bindings: {
        games: '<',
        numPlayers: '<'
    },
    controller: function () {
        var _this = this;
        this.onlyCompatible = function (value, index, array) {
            if (_this.numPlayers) {
                var count = _.find(value.numberOfPlayers, { players: _this.numPlayers });
                return count ? true : false;
            }
            else {
                return true;
            }
        };
    },
    template: "\n    <table class=\"table table-striped\">\n      <thead>\n        <tr>\n          <th>Game</th>\n          <th>Number of Players</th>\n        </tr>\n      </thead>\n      <tr ng-repeat=\"game in $ctrl.games | filter:$ctrl.onlyCompatible | orderBy:'name'\">\n        <td class=\"name\">{{ game.name }}</td>\n        <td>\n          <recommended-players num-players=\"game.numberOfPlayers\"></recommended-players>\n        </td>\n      </tr>\n    </table>"
});
