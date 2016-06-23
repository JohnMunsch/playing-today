angular.module('Playing').component('main', {
    bindings: {
        $router: '<'
    },
    controller: function ($scope, StateService) {
        var _this = this;
        this.state = StateService.store.getState();
        var unsubscribe = StateService.store.subscribe(function () {
            $scope.$applyAsync(function () {
                _this.state = StateService.store.getState();
                if (_this.state.user === null) {
                    _this.$router.navigate(['SignInOrRegister']);
                }
                else if (_this.status) {
                    StateService.playingToday(_this.state.user.uid, _this.state.user.email, _this.status === 'in' ? true : false);
                    delete _this.status;
                }
            });
        });
        this.signOut = StateService.signOut;
        this.playing = StateService.playingToday;
        this.$routerOnActivate = function (next, previous) {
            _this.status = next.params.status;
        };
    },
    template: "\n    <navbar user=\"$ctrl.state.user\" sign-out=\"$ctrl.signOut()\"></navbar>\n\n    <div class=\"container\">\n      <div class=\"row\">\n        <div class=\"col-md-4\">\n          <players active=\"$ctrl.state.user\" state=\"$ctrl.state\"\n            playing=\"$ctrl.playing(uid, name, playingToday)\"></players>\n        </div>\n        <div class=\"col-md-8\">\n          <tabs games=\"$ctrl.state.games\" num-players=\"$ctrl.state.counts.playersIn\"></tabs>\n        </div>\n      </div>\n\n      <hr>\n\n      <footer>\n        <p>&copy; John Munsch 2016</p>\n      </footer>\n    </div> <!-- /container -->"
});
