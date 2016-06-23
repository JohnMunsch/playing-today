angular.module('Playing').component('tabs', {
    bindings: {
        games: '<',
        numPlayers: '<'
    },
    controller: function () {
    },
    template: "\n    <div class=\"gamesByPlayerCount\">\n      <!-- Nav tabs -->\n      <ul class=\"nav nav-tabs\" role=\"tablist\">\n        <li role=\"presentation\" class=\"active\" ng-if=\"$ctrl.numPlayers > 0\">\n          <a href=\"#tab-1\" aria-controls=\"home\" role=\"tab\" data-toggle=\"tab\">\n            Games for {{ $ctrl.numPlayers }} Players\n          </a>\n        </li>\n        <li role=\"presentation\" ng-class=\"{ active: $ctrl.numPlayers === 0 }\">\n          <a href=\"#tab-2\" aria-controls=\"profile\" role=\"tab\" data-toggle=\"tab\">\n            All Games\n          </a>\n        </li>\n      </ul>\n\n      <!-- Tab panes -->\n      <div class=\"tab-content\">\n        <div role=\"tabpanel\" class=\"tab-pane active\" id=\"tab-1\">\n          <games games=\"$ctrl.games\" num-players=\"$ctrl.numPlayers\"></games>\n        </div>\n        <div role=\"tabpanel\" class=\"tab-pane\" id=\"tab-2\">\n          <games games=\"$ctrl.games\"></games>\n        </div>\n      </div>\n    </div>"
});
