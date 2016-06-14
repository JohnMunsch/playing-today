'use strict';
let Queue = require('firebase-queue');
let firebase = require('firebase');

firebase.initializeApp({
  serviceAccount: 'Playing-df6b999b486a.json',
  databaseURL: 'https://playing-4376d.firebaseio.com'
});

let ref = firebase.database().ref('queue');
let queue = new Queue(ref, function(data, progress, resolve, reject) {
  // Read and process task data
  console.log(data);

  // Do some work
  progress(50);

  // Finish the task asynchronously
  setTimeout(function() {
    resolve();
  }, 1000);
});
