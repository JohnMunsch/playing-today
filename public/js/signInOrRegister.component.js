angular.module('Playing').component('signInOrRegister', {
    bindings: {
        $router: '<'
    },
    controller: function ($scope) {
        var _this = this;
        this.$routerOnActivate = this.$routeOnReuse = function () {
            firebase.auth().onAuthStateChanged(function (user) {
                $scope.$apply(function () {
                    if (user) {
                        _this.$router.navigate(['Main']);
                    }
                    else {
                        _this.user = null;
                    }
                });
            });
        };
        this.toggleForms = function () {
            $('form').animate({ height: "toggle", opacity: "toggle" }, "slow");
        };
        this.register = function (email, password) {
            firebase.auth().createUserWithEmailAndPassword(email, password).then(function (user) {
                firebase.database().ref("players/" + user.uid).set({
                    name: email,
                    playingToday: false
                });
            });
        };
        this.signIn = function (email, password) {
            firebase.auth().signInWithEmailAndPassword(email, password).catch(function (error) {
                $scope.$apply(function () {
                    var errorCode = error.code;
                    var errorMessage = error.message;
                });
            });
        };
    },
    template: "\n    <div id=\"signIn\">\n      <div class=\"container\">\n        <div class=\"info\">\n          <h1>Sign In/Register</h1>\n        </div>\n      </div>\n      <div class=\"form\">\n        <div class=\"thumbnail\"><img class=\"logo\" src=\"img/meeple.svg\"></div>\n        <form class=\"register-form\">\n          <input type=\"text\" placeholder=\"Email Address\" ng-model=\"$ctrl.emailAddress\"/>\n          <input type=\"password\" placeholder=\"Password\" ng-model=\"$ctrl.password\"/>\n          <button ng-click=\"$ctrl.register($ctrl.emailAddress, $ctrl.password)\">Register</button>\n          <p class=\"message\">Already registered? <a ng-click=\"$ctrl.toggleForms()\">Sign In</a></p>\n        </form>\n        <form class=\"login-form\">\n          <input type=\"text\" placeholder=\"Email Address\" ng-model=\"$ctrl.emailAddress\"/>\n          <input type=\"password\" placeholder=\"Password\" ng-model=\"$ctrl.password\"/>\n          <button ng-click=\"$ctrl.signIn($ctrl.emailAddress, $ctrl.password)\">Sign In</button>\n          <p class=\"message\">Not registered? <a ng-click=\"$ctrl.toggleForms()\">Register an account</a></p>\n        </form>\n      </div>    \n    </div>"
});
