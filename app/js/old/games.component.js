angular.module('Playing').component('games', {
  bindings: {
    games: '<',
    numPlayers: '<',
    remove: '&'
  },
  controller: function () {
    this.onlyCompatible = () => {
      return _.filter(this.games, (game) => {
        if (this.numPlayers) {
          let count = _.find(game.numberOfPlayers, { players: this.numPlayers });

          return count ? true : false;
        } else {
          return true;
        }
      });
    };
  },
  template: `
    <table class="table table-striped">
      <thead>
        <tr>
          <th></th>
          <th>Game</th>
          <th>Number of Players</th>
        </tr>
      </thead>
      <tr ng-repeat="(id, game) in $ctrl.onlyCompatible() | orderBy:'name'">
        <td class="controls">
          <span class="glyphicon glyphicon-remove-sign" aria-hidden="true" ng-click="$ctrl.remove()"></span>
        </td>
        <td class="name">{{ game.name }}</td>
        <td>
          <recommended-players num-players="game.numberOfPlayers"></recommended-players>
        </td>
      </tr>
    </table>`
});
