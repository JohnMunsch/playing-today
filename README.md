# playing-today

## Introduction
This was written because I: a) wanted it, and b) needed an excuse to try out some tech I hadn't had much time to use. Specifically you'll notice the following.

* ES2015/ES6 - All of the JavaScript files here are the latest version of JS and use arrow functions, string templates, classes, etc. *Note: There is a side effect to this in that the current iOS 9 and Safari browsers as well as IE11 cannot work with the page. However, the new versions of iOS and Safari due to be released shortly fix both of those, leaving only IE11 as incompatible.*
* Redux - I had already used this for one work project and ended up pretty happy with it. This was just an attempt for me to do the same again and also use it to deal with Firebase's somewhat unusual realtime updates.
* AngularJS 1.5 - I wanted to make some more use of the new components. I'm a big fan of them as a replacement for most of the directives I used to have to write.
* AngularJS 1.5 Component Router - *sigh...* I put this in there and they deprecated it just a couple of weeks after they introduced it. Very disappointing. I'll have to remove it in the long run and put something else in.
* Firebase - I had tried to use it a long time ago to prototype something and found it difficult to use with the AngularJS wrapper they provided. This time I didn't bother with that and just used the standard JavaScript library.
* D3.js - This was the last of the kitchen sink of stuff I threw into this in order to get a little time with it. I'm not crazy about the graphs I made, I feel like I'm going to have to revise them to get the message across that I was going for. But I still learned something.

## Installation
1. You're going to need Node.js before anything else. You can get an installer here.
1. Run "npm install" to install the various pieces you're going to need locally.
1. Go sign up for a Firebase account with Google (https://firebase.google.com/) and download and install their tools for web development (https://firebase.google.com/docs/web/setup).

## Testing and Deployment

1. Update the API key, authDomain, databaseURL, etc. in the public/index.html file where I setup the Firebase config.
1. Then run "firebase serve" to run a local server to try out the application.
1. Once you're happy with it locally you can use "firebase deploy" to deploy it to their servers and have your own copy running out there at your own domain.