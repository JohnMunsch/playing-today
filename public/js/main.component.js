angular.module('Playing').component('main', {
  bindings: {
    $router: '<'
  },
  controller: function ($scope, StateService) {
    // Inject the player and game data once it's loaded.
    this.state = StateService.store.getState();

    this.unsubscribe = StateService.store.subscribe(() => {
      $scope.$applyAsync(() => {
        this.state = StateService.store.getState();

        if (this.state.user === null) {
          this.$router.navigate([ 'SignInOrRegister' ]);
        } else if (!_.isNil(this.status)) {
          StateService.playingToday(this.state.user.uid, this.state.user.email,
            this.status === 'in' ? true : false).then(() => {
              this.status = null;

              this.$router.navigate([ 'Main' ]);
            });
        }
      });
    });

    this.signOut = StateService.signOut;

    this.playing = StateService.playingToday;

    this.$onDestroy = () => {
      this.unsubscribe();
    };

    this.$routerOnActivate = this.$routeOnReuse = (next, previous) => {
      // Get the hero identified by the route parameter
      this.status = next.params.status;
    };
  },
  template: `
    <navbar user="$ctrl.state.user" sign-out="$ctrl.signOut()"></navbar>

    <div class="container">
      <div class="row">
        <div class="col-md-4">
          <players active="$ctrl.state.user" state="$ctrl.state"
            playing="$ctrl.playing(uid, name, playingToday)"></players>
        </div>
        <div class="col-md-8">
          <tabs games="$ctrl.state.games" num-players="$ctrl.state.counts.playersIn"></tabs>
        </div>
      </div>

      <hr>

      <footer>
        <p>&copy; John Munsch 2016</p>
      </footer>
    </div> <!-- /container -->`
});
