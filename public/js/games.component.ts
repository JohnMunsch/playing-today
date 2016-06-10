angular.module('Playing').component('games', {
  bindings: {
    games: '<',
    highlightCount: '<'
  },
  template: `
    <table class="table table-striped">
      <thead>
        <tr>
          <th>Game</th>
          <th>Number of Players</th>
        </tr>
      </thead>
      <tr ng-repeat="game in $ctrl.games">
        <td class="name">{{ game.name }}</td>
        <td>
          <recommended-players num-players="game.numberOfPlayers" 
            highlight-count="$ctrl.highlightCount"></recommended-players>
        </td>
      </tr>
    </table>`
});
