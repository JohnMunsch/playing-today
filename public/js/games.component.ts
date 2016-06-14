angular.module('Playing').component('games', {
  bindings: {
    games: '<',
    numPlayers: '<'
  },
  controller: function () {
    this.onlyCompatible = (value, index, array) => {
      if (this.numPlayers) {
        let count = _.find(value.numberOfPlayers, { players: this.numPlayers });

        return count ? true : false;
      } else {
        return true;
      }
    };
  },
  template: `
    <table class="table table-striped">
      <thead>
        <tr>
          <th>Game</th>
          <th>Number of Players</th>
        </tr>
      </thead>
      <tr ng-repeat="game in $ctrl.games | filter:$ctrl.onlyCompatible | orderBy:'name'">
        <td class="name">{{ game.name }}</td>
        <td>
          <recommended-players num-players="game.numberOfPlayers"></recommended-players>
        </td>
      </tr>
    </table>`
});
