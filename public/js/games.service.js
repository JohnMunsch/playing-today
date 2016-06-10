angular.module('Playing').factory('GamesService', function ($q) {
    var deferred = $q.defer();
    firebase.database().ref("games").on('value', function (snapshot) {
        deferred.resolve(snapshot.val());
    });
    return deferred.promise;
});
