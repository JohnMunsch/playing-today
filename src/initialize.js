const bcrypt = require('bcryptjs');
const Datastore = require('nedb');

let db = {};
db.players = new Datastore({ filename: 'players.db', autoload: true });
db.games = new Datastore({ filename: 'games.db', autoload: true });

const games = [
  {
    name: 'Carcassonne',
    notes: 'Plays with six if you add the Inns & Cathedrals.',
    players: [
      { best: 56.4, not: 6.1, num: 2, recommended: 37.6 },
      { best: 47.3, not: 2.3, num: 3, recommended: 50.3 },
      { best: 31.7, not: 8.6, num: 4, recommended: 59.7 },
      { best: 12, not: 35.4, num: 5, recommended: 52.7 }
    ]
  },
  {
    name: 'Jamaica',
    players: [
      { best: 3.9, not: 58.3, num: 2, recommended: 37.9 },
      { best: 8.2, not: 25.8, num: 3, recommended: 66 },
      { best: 33.6, not: 0.9, num: 4, recommended: 65.5 },
      { best: 45, not: 0, num: 5, recommended: 55 },
      { best: 70.9, not: 4.5, num: 6, recommended: 24.5 }
    ]
  },
  {
    name: 'Augustus',
    players: [
      { best: 6.7, not: 20, num: 2, recommended: 73.3 },
      { best: 50.9, not: 0, num: 3, recommended: 49.1 },
      { best: 67.9, not: 0, num: 4, recommended: 32.1 },
      { best: 35.4, not: 4.2, num: 5, recommended: 60.4 },
      { best: 23.9, not: 15.2, num: 6, recommended: 60.9 }
    ]
  },
  {
    name: 'No Thanks!',
    players: [
      { best: 1, not: 92.2, num: 2, recommended: 6.8 },
      { best: 17.5, not: 18.9, num: 3, recommended: 63.6 },
      { best: 57.7, not: 0, num: 4, recommended: 42.3 },
      { best: 73, not: 0.7, num: 5, recommended: 26.4 }
    ]
  },
  {
    name: 'Rattus',
    players: [
      { best: 6.8, not: 45.9, num: 2, recommended: 47.3 },
      { best: 28.6, not: 3.9, num: 3, recommended: 67.5 },
      { best: 87.8, not: 2.4, num: 4, recommended: 9.8 }
    ]
  },
  {
    name: 'Agricola: All Creatures Big and Small',
    players: [{ best: 94, not: 1.2, num: 2, recommended: 4.8 }]
  },
  {
    name: 'Dice Town',
    players: [
      { best: 4.7, not: 53.5, num: 2, recommended: 41.9 },
      { best: 20.9, not: 16.3, num: 3, recommended: 62.8 },
      { best: 67.4, not: 2.2, num: 4, recommended: 30.4 },
      { best: 48.9, not: 6.4, num: 5, recommended: 44.7 }
    ]
  },
  {
    name: 'Saboteur',
    players: [
      { best: 1.4, not: 83.7, num: 3, recommended: 15 },
      { best: 4.3, not: 58.4, num: 4, recommended: 37.3 },
      { best: 21.5, not: 8.6, num: 5, recommended: 69.9 },
      { best: 37.3, not: 6.5, num: 6, recommended: 56.2 },
      { best: 64.7, not: 1.2, num: 7, recommended: 34.1 },
      { best: 58.8, not: 4.1, num: 8, recommended: 37.2 },
      { best: 31.6, not: 9.6, num: 9, recommended: 58.8 },
      { best: 24.8, not: 14.3, num: 10, recommended: 60.9 }
    ]
  },
  {
    name: 'Bang! The Dice Game',
    players: [
      { best: 0, not: 87.1, num: 3, recommended: 12.9 },
      { best: 3.5, not: 55.8, num: 4, recommended: 40.7 },
      { best: 32.6, not: 1.1, num: 5, recommended: 66.3 },
      { best: 68.8, not: 0, num: 6, recommended: 31.3 },
      { best: 64.8, not: 1.1, num: 7, recommended: 34.1 },
      { best: 39.5, not: 5.8, num: 8, recommended: 54.7 }
    ]
  },
  {
    name: 'Cacao',
    players: [
      { best: 19.4, not: 6.5, num: 2, recommended: 74.2 },
      { best: 69.7, not: 3, num: 3, recommended: 27.3 },
      { best: 34.3, not: 5.7, num: 4, recommended: 60 }
    ]
  },
  {
    name: 'Dominion',
    players: [
      { best: 38.4, not: 6, num: 2, recommended: 55.6 },
      { best: 56.7, not: 1, num: 3, recommended: 42.3 },
      { best: 39.6, not: 6.9, num: 4, recommended: 53.5 }
    ]
  },
  {
    name: 'For Sale',
    players: [
      { best: 7.7, not: 19.6, num: 3, recommended: 72.6 },
      { best: 41.2, not: 0, num: 4, recommended: 58.8 },
      { best: 69.4, not: 1.2, num: 5, recommended: 29.5 },
      { best: 32.5, not: 8.8, num: 6, recommended: 58.8 }
    ]
  },
  {
    name: 'High Society',
    players: [
      { best: 20, not: 21.5, num: 3, recommended: 58.5 },
      { best: 63.6, not: 0, num: 4, recommended: 36.4 },
      { best: 56.3, not: 3.1, num: 5, recommended: 40.6 }
    ]
  },
  {
    name: 'Sushi Go',
    players: [
      { best: 5.7, not: 39.8, num: 2, recommended: 54.5 },
      { best: 44.9, not: 2.2, num: 3, recommended: 52.8 },
      { best: 71.1, not: 1, num: 4, recommended: 27.8 },
      { best: 33.3, not: 7.7, num: 5, recommended: 59 }
    ]
  },
  {
    name: 'Coup Rebellion G54',
    players: [
      { best: 7.1, not: 28.6, num: 3, recommended: 64.3 },
      { best: 35.7, not: 0, num: 4, recommended: 64.3 },
      { best: 85.7, not: 0, num: 5, recommended: 14.3 },
      { best: 64.3, not: 7.1, num: 6, recommended: 28.6 }
    ]
  },
  {
    name: 'Splendor',
    players: [
      { best: 34.5, not: 7.8, num: 2, recommended: 57.8 },
      { best: 53.2, not: 2, num: 3, recommended: 44.8 },
      { best: 37.5, not: 8.2, num: 4, recommended: 54.3 }
    ]
  },
  {
    name: 'Settlers of Catan, The',
    players: [
      { best: 35, not: 7.1, num: 3, recommended: 57.9 },
      { best: 75.9, not: 2, num: 4, recommended: 22.1 }
    ]
  },
  {
    name: 'Carcassonne: The Castle',
    players: [{ best: 96.5, not: 0, num: 2, recommended: 3.5 }]
  }
];

const players = [
  {
    email: 'mike.wartberg@aptitude.com',
    password: 'password',
    playingToday: false
  },
  {
    email: 'john.munsch@aptitude.com',
    password: 'password',
    playingToday: true
  },
  {
    email: 'trang.ngo@aptitude.com',
    password: 'password',
    playingToday: false
  },
  {
    email: 'sfisherm@vha.com',
    password: 'password',
    playingToday: true
  },
  {
    email: 'luis.gomez@aptitude.com',
    password: 'password',
    playingToday: false
  },
  {
    email: 'david.daniels@aptitude.com',
    password: 'password',
    playingToday: false
  },
  {
    email: 'mike.nguchie@aptitude.com',
    password: 'password',
    playingToday: false
  },
  {
    email: 'barry.forrest@vizientinc.com',
    password: 'password',
    playingToday: false
  },
  {
    email: 'richard.morgan@aptitude.com',
    password: 'password',
    playingToday: false
  },
  {
    email: 'kavya.katam@aptitude.com',
    password: 'password',
    playingToday: false
  }
];

// Persist all of the players to one datastore.
players.forEach(async player => {
  const password = await bcrypt.hash(player.password, 10);
  let newPlayer = Object.assign({}, player, { password });
  db.players.insert(newPlayer, (err, newDoc) => {});
});

// And all the games to another datastore.
games.forEach(game => {
  db.games.insert(game, (err, newDoc) => {});
});
