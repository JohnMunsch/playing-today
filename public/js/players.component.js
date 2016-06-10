angular.module('Playing').component('players', {
    bindings: {
        active: '<',
        players: '<',
        playing: '&'
    },
    template: "\n    <table class=\"table table-striped\">\n      <thead>\n        <tr>\n          <th>Player</th>\n          <th class=\"inOut\">In/Out</th>\n        </tr>\n      </thead>\n      <tr ng-repeat=\"(key, value) in $ctrl.players\">\n        <td class=\"name\">{{ value.name }}</td>\n        <td class=\"inOut\">\n          <div class=\"btn-group btn-group-xs\" role=\"group\" aria-label=\"...\" ng-if=\"$ctrl.active.uid === key\">\n            <button type=\"button\" class=\"btn btn-default\"\n              ng-click=\"$ctrl.playing({ uid: $ctrl.active.uid, name: $ctrl.active.email, playingToday: true })\"\n              ng-class=\"{ active: value.playingToday }\">In</button>\n            <button type=\"button\" class=\"btn btn-default\"\n              ng-click=\"$ctrl.playing({ uid: $ctrl.active.uid, name: $ctrl.active.email, playingToday: false })\"\n              ng-class=\"{ active: !value.playingToday }\">Out</button>\n          </div>\n          <div ng-if=\"$ctrl.active.uid !== key\">\n            {{ value.playingToday ? 'In' : 'Out' }}\n          </div>\n        </td>\n      </tr>\n    </table>"
});
