angular.module('Playing').factory('StateService', function ($rootScope) {
    var state = {
        players: {}
    };
    firebase.database().ref("players").on('value', function (snapshot) {
        $rootScope.$applyAsync(function () {
            state.players = snapshot.val();
        });
    });
    return state;
});
