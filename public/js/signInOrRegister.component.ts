declare var $;

angular.module('Playing').component('signInOrRegister', {
  bindings: {
    $router: '<'
  },
  controller: function ($scope, StateService) {
    this.state = StateService.store.getState();

    let unsubscribe = StateService.store.subscribe(() => {
      $scope.$applyAsync(() => {
        this.state = StateService.store.getState();

        if (this.state.user !== null) {
          this.$router.navigate(['Main']);
        }
      });
    });

    this.toggleForms = () => {
      $('form').animate({height: "toggle", opacity: "toggle"}, "slow");
    };

    this.register = StateService.register;

    this.signIn = StateService.signIn;
  },
  template: `
    <div id="signIn">
      <div class="container">
        <div class="info">
          <h1>Sign In/Register</h1>
        </div>
      </div>
      <div class="form">
        <div class="thumbnail"><img class="logo" src="img/meeple.svg"></div>
        <form class="register-form">
          <input type="text" placeholder="Email Address" ng-model="$ctrl.emailAddress"/>
          <input type="password" placeholder="Password" ng-model="$ctrl.password"/>
          <button ng-click="$ctrl.register($ctrl.emailAddress, $ctrl.password)">Register</button>
          <p class="message">Already registered? <a ng-click="$ctrl.toggleForms()">Sign In</a></p>
        </form>
        <form class="login-form">
          <input type="text" placeholder="Email Address" ng-model="$ctrl.emailAddress"/>
          <input type="password" placeholder="Password" ng-model="$ctrl.password"/>
          <button ng-click="$ctrl.signIn($ctrl.emailAddress, $ctrl.password)">Sign In</button>
          <p class="message">Not registered? <a ng-click="$ctrl.toggleForms()">Register an account</a></p>
        </form>
      </div>    
    </div>`
});
