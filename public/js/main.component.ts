declare var angular;
declare var d3;
declare var firebase;

angular.module('Playing').component('main', {
  bindings: {
    $router: '<'
  },
  controller: function ($scope, StateService) {
    this.$routerOnActivate = this.$routeOnReuse = () => {
      // TODO: Move this to the state service.
      // Wire up to the Firebase authentication notifications.
      firebase.auth().onAuthStateChanged((user) => {
        $scope.$apply(() => {
          if (user) {
            this.user = user;
          } else {
            this.user = null;

            this.$router.navigate(['SignInOrRegister']);
          }
        });
      });
    }

    // Inject the player and game data once it's loaded.
    this.state = StateService.state;

    this.signOut = () => {
      StateService.signOut();
    };

    this.playing = (uid, name, playingToday) => {
      StateService.playingToday(uid, name, playingToday);
    };
  },
  template: `
    <navbar user="$ctrl.user" sign-out="$ctrl.signOut()"></navbar>

    <div class="container">
      <div class="row">
        <div class="col-md-4">
          <players active="$ctrl.user" state="$ctrl.state"
            playing="$ctrl.playing(uid, name, playingToday)"></players>
        </div>
        <div class="col-md-8">
          <tabs games="$ctrl.state.games" num-players="$ctrl.state.playersIn"></tabs>
        </div>
      </div>

      <hr>

      <footer>
        <p>&copy; John Munsch 2016</p>
      </footer>
    </div> <!-- /container -->`
});
