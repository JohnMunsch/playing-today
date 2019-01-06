angular.module('Playing').component('players', {
  bindings: {
    active: '<',
    state: '<',
    playing: '&'
  },
  template: `
    <h2>In <span class="label label-default">{{ $ctrl.state.counts.playersIn }}</span></h2>
    <table class="table table-striped">
      <thead>
        <tr>
          <th>Player</th>
          <th class="inOut">In/Out</th>
        </tr>
      </thead>
      <tr ng-repeat="(key, value) in $ctrl.state.players" ng-if="value.playingToday">
        <td class="name">{{ value.name }}</td>
        <td class="inOut">
          <div class="btn-group btn-group-xs" role="group" aria-label="..." ng-if="$ctrl.active.uid === key">
            <button type="button" class="btn btn-default"
              ng-click="$ctrl.playing({ uid: $ctrl.active.uid, name: $ctrl.active.email, playingToday: true })"
              ng-class="{ active: value.playingToday }">In</button>
            <button type="button" class="btn btn-default"
              ng-click="$ctrl.playing({ uid: $ctrl.active.uid, name: $ctrl.active.email, playingToday: false })"
              ng-class="{ active: !value.playingToday }">Out</button>
          </div>
          <div ng-if="$ctrl.active.uid !== key">
            {{ value.playingToday ? 'In' : 'Out' }}
          </div>
        </td>
      </tr>
    </table>

    <h2>Out <span class="label label-default">{{ $ctrl.state.counts.playersOut }}</span></h2>
    <table class="table table-striped">
      <thead>
        <tr>
          <th>Player</th>
          <th class="inOut">In/Out</th>
        </tr>
      </thead>
      <tr ng-repeat="(key, value) in $ctrl.state.players" ng-if="!value.playingToday">
        <td class="name">{{ value.name }}</td>
        <td class="inOut">
          <div class="btn-group btn-group-xs" role="group" aria-label="..." ng-if="$ctrl.active.uid === key">
            <button type="button" class="btn btn-default"
              ng-click="$ctrl.playing({ uid: $ctrl.active.uid, name: $ctrl.active.email, playingToday: true })"
              ng-class="{ active: value.playingToday }">In</button>
            <button type="button" class="btn btn-default"
              ng-click="$ctrl.playing({ uid: $ctrl.active.uid, name: $ctrl.active.email, playingToday: false })"
              ng-class="{ active: !value.playingToday }">Out</button>
          </div>
          <div ng-if="$ctrl.active.uid !== key">
            {{ value.playingToday ? 'In' : 'Out' }}
          </div>
        </td>
      </tr>
    </table>`
});
