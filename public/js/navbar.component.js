angular.module('Playing').component('navbar', {
    bindings: {
        user: '<',
        signIn: '&',
        signOut: '&'
    },
    template: "\n    <nav class=\"navbar navbar-inverse navbar-fixed-top\" role=\"navigation\">\n      <div class=\"container\">\n        <div class=\"navbar-header\">\n          <button type=\"button\" class=\"navbar-toggle collapsed\" data-toggle=\"collapse\" data-target=\"#navbar\" aria-expanded=\"false\" aria-controls=\"navbar\">\n            <span class=\"sr-only\">Toggle navigation</span>\n            <span class=\"icon-bar\"></span>\n            <span class=\"icon-bar\"></span>\n            <span class=\"icon-bar\"></span>\n          </button>\n          <a class=\"navbar-brand\" href=\"/\"><img class=\"logo\" src=\"img/meeple.svg\"><div>Playing today?</div></a>\n        </div>\n        <div id=\"navbar\" class=\"navbar-collapse collapse\">\n          <form class=\"navbar-form navbar-right\" role=\"form\" ng-if=\"$ctrl.user !== null\">\n            <button type=\"submit\" class=\"btn btn-success\" ng-click=\"$ctrl.signOut()\">Sign out</button>\n          </form>\n          <p class=\"navbar-text navbar-right\">{{ $ctrl.user.email }}</p>\n        </div><!--/.navbar-collapse -->\n      </div>\n    </nav>"
});
