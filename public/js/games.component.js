angular.module('Playing').component('games', {
    bindings: {
        games: '<',
        highlightCount: '<'
    },
    template: "\n    <table class=\"table table-striped\">\n      <thead>\n        <tr>\n          <th>Game</th>\n          <th>Number of Players</th>\n        </tr>\n      </thead>\n      <tr ng-repeat=\"game in $ctrl.games | orderBy:'name'\">\n        <td class=\"name\">{{ game.name }}</td>\n        <td>\n          <recommended-players num-players=\"game.numberOfPlayers\"\n            highlight-count=\"$ctrl.highlightCount\"></recommended-players>\n        </td>\n      </tr>\n    </table>"
});
