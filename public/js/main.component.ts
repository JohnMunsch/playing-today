declare var angular;
declare var d3;
declare var firebase;

angular.module('Playing').component('main', {
  bindings: {
    $router: '<'
  },
  controller: function ($scope, StateService, GamesService) {
    this.$routerOnActivate = this.$routeOnReuse = () => {
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
    this.state = StateService;

    GamesService.then(games => {
      this.games = games;
    });

    this.signOut = () => {
      firebase.auth().signOut().then(function() {
        // Sign-out successful.
      }, function(error) {
        // An error happened.
      });
    };

    this.playing = (uid, name, playingToday) => {
      firebase.database().ref(`players/${uid}`).set({
        name,
        playingToday
      });

      // At the same time we're saving the value to the server...
      let player = this.state.players[uid];
      player.playingToday = playingToday;
    };

    this.numPlayers = () => {
      return _.reduce(this.state.players, (sum, player) => {
        return player.playingToday ? sum + 1 : sum;
      }, 0);
    };
  },
  template: `
    <navbar user="$ctrl.user" sign-out="$ctrl.signOut()"></navbar>

    <div class="container">
      <div class="row">
        <div class="col-md-4">
          <players active="$ctrl.user" players="$ctrl.state.players"
            playing="$ctrl.playing(uid, name, playingToday)"></players>
        </div>
        <div class="col-md-8">
          <tabs games="$ctrl.games" num-players="$ctrl.numPlayers()"></tabs>
        </div>
      </div>

      <hr>

      <footer>
        <p>&copy; John Munsch 2016</p>
      </footer>
    </div> <!-- /container -->`
});
