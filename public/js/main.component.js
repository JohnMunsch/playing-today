angular.module('Playing').component('main', {
    bindings: {
        $router: '<'
    },
    controller: function ($scope, StateService) {
        var _this = this;
        this.$routerOnActivate = this.$routeOnReuse = function () {
            firebase.auth().onAuthStateChanged(function (user) {
                $scope.$apply(function () {
                    if (user) {
                        _this.user = user;
                    }
                    else {
                        _this.user = null;
                        _this.$router.navigate(['SignInOrRegister']);
                    }
                });
            });
        };
        this.state = StateService.state;
        this.signOut = function () {
            StateService.signOut();
        };
        this.playing = function (uid, name, playingToday) {
            StateService.playingToday(uid, name, playingToday);
        };
    },
    template: "\n    <navbar user=\"$ctrl.user\" sign-out=\"$ctrl.signOut()\"></navbar>\n\n    <div class=\"container\">\n      <div class=\"row\">\n        <div class=\"col-md-4\">\n          <players active=\"$ctrl.user\" state=\"$ctrl.state\"\n            playing=\"$ctrl.playing(uid, name, playingToday)\"></players>\n        </div>\n        <div class=\"col-md-8\">\n          <tabs games=\"$ctrl.state.games\" num-players=\"$ctrl.state.playersIn\"></tabs>\n        </div>\n      </div>\n\n      <hr>\n\n      <footer>\n        <p>&copy; John Munsch 2016</p>\n      </footer>\n    </div> <!-- /container -->"
});
