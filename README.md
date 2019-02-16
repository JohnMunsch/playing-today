# playing-today

## Introduction

This was written because I: a) wanted it, and b) needed an excuse to try out some tech I hadn't had much time to use. Specifically you'll notice the following.

**JavaScript ES6 (arrow functions, string templates, classes, etc.)** - I don't use TypeScript and I didn't use Babel. _Note: There is a side effect to this in that IE11 cannot work with the page and frankly, it cannot die soon enough for my taste. Every other modern browser is fine with this code without any special compile/transpile steps._

**LitElement** - I only use Web Components for my widget building, it's way faster than any of the frameworks out there, but you still need some middleware to make it easier to write. I drop in LitElement for that at the moment.

**GraphQL** - I never used Firebase again after the first time I built this. It ended up being interesting but I didn't love it enough to stick with it and I hated the propriatary nature of it. GraphQL offers me the same thing (only much better) and even has provisions for subscriptions so I can watch in real time for changes to parts of my data. This app sets up a server which provides subscriptions and the app uses them.

**NeDB** - I'm sure I'll replace it with MongoDB at some point, but it has proven to be a great simple database I can embed in my server side to give me a fast solution to data storage without setting up servers or connecting remotely to some other service. I _will_ be using this again both for prototyping and for projects without too much traffic.

## Installation

1. You're going to need Node.js before anything else. You can get an installer [here](https://nodejs.org).
1. Run "npm install" to install the various pieces you're going to need locally.

## Development and Testing

1. 'npm run server' - Fires up a GraphQL server (under Nodemon so it will watch for and restart after code changes) to act as the back-end for the single page app. Persistence is currently using NeDB but may migrate to MongoDB later.
1. 'npm start' - Builds the app and watches for changes to recompile as you do development.

## "Production" Building

- 'npm run build' - Builds a "Production" version of the app rather than a "Development" version. Basically that just means that it's a lot smaller for deployment to your server.
