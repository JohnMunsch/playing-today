angular.module('Playing').component('game', {
    controller: function ($scope, StateService) {
        var _this = this;
        this.state = StateService.store.getState();
        this.$routerOnActivate = function (next, previous) {
            this.id = parseInt(next.params.id, 10);
        };
        StateService.store.subscribe(function () {
            $scope.$applyAsync(function () {
                if (_this.id !== undefined) {
                    StateService.getGame(_this.id).then(function (game) { _this.game = game; });
                }
            });
        });
    },
    template: "\n    <navbar user=\"$ctrl.state.user\" sign-out=\"$ctrl.signOut()\"></navbar>\n\n    <div class=\"container\">\n      <div class=\"row\">\n        <h1>{{ $ctrl.game.name }}</h1>\n      </div>\n    </div>"
});
