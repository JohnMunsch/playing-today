angular.module('Playing').component('navbar', {
  bindings: {
    user: '<',
    signIn: '&',
    signOut: '&'
  },
  template: `
    <nav class="navbar navbar-inverse navbar-fixed-top" role="navigation">
      <div class="container">
        <div class="navbar-header">
          <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <a class="navbar-brand" href="#"><img class="logo" src="img/meeple.svg"><div>Playing today?</div></a>
        </div>
        <div id="navbar" class="navbar-collapse collapse">
          <form class="navbar-form navbar-right" role="form" ng-if="$ctrl.user === null">
            <div class="form-group">
              <input type="text" placeholder="Email" class="form-control" ng-model="$ctrl.email">
            </div>
            <div class="form-group">
              <input type="password" placeholder="Password" class="form-control" ng-model="$ctrl.password">
            </div>
            <button type="submit" class="btn btn-success" ng-click="$ctrl.signIn({ email: $ctrl.email, password: $ctrl.password})">Sign in</button>
          </form>
          <form class="navbar-form navbar-right" role="form" ng-if="$ctrl.user !== null">
            <button type="submit" class="btn btn-success" ng-click="$ctrl.signOut()">Sign out</button>
          </form>
          <p class="navbar-text navbar-right">{{ $ctrl.user.email }}</p>
        </div><!--/.navbar-collapse -->
      </div>
    </nav>`
});
