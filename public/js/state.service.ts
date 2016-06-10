declare var angular;

angular.module('Playing').factory('StateService', function ($rootScope) {
  let state = {
    players: {
    }
  };

  firebase.database().ref(`players`).on('value', (snapshot) => {
    $rootScope.$applyAsync(() => {
      state.players = snapshot.val();
    });
  });

  return state;
});
