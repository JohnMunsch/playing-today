angular.module('Playing').factory('StateService', function ($rootScope, $q) {
    var _this = this;
    var LOAD_USER = 'LOAD_USER';
    var LOAD_GAMES = 'LOAD_GAMES';
    var LOAD_PLAYERS = 'LOAD_PLAYERS';
    var LOAD_COUNTS = 'LOAD_COUNTS';
    var initialState = {
        user: null,
        games: {},
        players: {},
        counts: {
            playersIn: 0,
            playersOut: 0,
            playersCount: 0
        }
    };
    var rootReducer = Redux.combineReducers({
        user: user,
        games: games,
        players: players,
        counts: counts
    });
    function configureStore(initialState) {
        return Redux.createStore(rootReducer, initialState, Redux.applyMiddleware(reduxLogger({
            collapsed: true
        })));
    }
    this.store = configureStore(initialState);
    this.register = function (email, password) {
        firebase.auth().createUserWithEmailAndPassword(email, password).then(function (user) {
            firebase.database().ref("players/" + user.uid).set({
                name: email,
                playingToday: false
            });
        });
    };
    this.signIn = function (email, password) {
        firebase.auth().signInWithEmailAndPassword(email, password).catch(function (error) {
            $rootScope.$apply(function () {
                var errorCode = error.code;
                var errorMessage = error.message;
            });
        });
    };
    this.signOut = function () {
        firebase.auth().signOut().then(function () {
        }, function (error) {
        });
    };
    this.playingToday = function (uid, name, playingToday) {
        return firebase.database().ref("players/" + uid).set({
            name: name,
            playingToday: playingToday
        });
    };
    this.getGame = function (id) {
        return $q.when(_this.store.getState().games[("" + id)]);
    };
    firebase.database().ref("players").on('value', function (snapshot) {
        var players = snapshot.val();
        _this.store.dispatch({
            type: LOAD_PLAYERS,
            data: players
        });
        var playersCount = _.keys(players).length;
        var playersIn = _.reduce(players, function (sum, player) {
            return player.playingToday ? sum + 1 : sum;
        }, 0);
        var playersOut = playersCount - playersIn;
        _this.store.dispatch({
            type: LOAD_COUNTS,
            data: {
                playersCount: playersCount,
                playersIn: playersIn,
                playersOut: playersOut
            }
        });
    });
    firebase.database().ref("games").on('value', function (snapshot) {
        _this.store.dispatch({
            type: LOAD_GAMES,
            data: snapshot.val()
        });
    });
    firebase.auth().onAuthStateChanged(function (user) {
        _this.store.dispatch({
            type: LOAD_USER,
            data: user ? user : null
        });
    });
    function user(state, action) {
        switch (action.type) {
            case LOAD_USER:
                return action.data;
            default:
                if (state === undefined) {
                    return initialState;
                }
                else {
                    return state;
                }
        }
    }
    function games(state, action) {
        switch (action.type) {
            case LOAD_GAMES:
                return action.data;
            default:
                if (state === undefined) {
                    return initialState;
                }
                else {
                    return state;
                }
        }
    }
    function players(state, action) {
        switch (action.type) {
            case LOAD_PLAYERS:
                return action.data;
            default:
                if (state === undefined) {
                    return initialState;
                }
                else {
                    return state;
                }
        }
    }
    function counts(state, action) {
        switch (action.type) {
            case LOAD_COUNTS:
                return action.data;
            default:
                if (state === undefined) {
                    return initialState;
                }
                else {
                    return state;
                }
        }
    }
    return this;
});
