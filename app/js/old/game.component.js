angular.module('Playing').component('game', {
  controller: function ($scope, StateService) {
    this.state = StateService.store.getState();

    this.$routerOnActivate = function(next, previous) {
      this.id = parseInt(next.params.id, 10);
    };

    StateService.store.subscribe(() => {
      $scope.$applyAsync(() => {
        if (this.id !== undefined) {
          StateService.getGame(this.id).then((game) => { this.game = game; });
        }
      });
    });
  },
  template: `
    <navbar user="$ctrl.state.user" sign-out="$ctrl.signOut()"></navbar>

    <div class="container">
      <div class="row">
        <h1>{{ $ctrl.game.name }}</h1>
      </div>
    </div>`
});