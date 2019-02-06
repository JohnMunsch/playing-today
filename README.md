# playing-today

## Introduction

This is a rewrite of the thing I wrote before because this time I wanted to strip it down; no AngularJS, no Redux, and no Firebase. Instead it's just Web Components, a tiny amount of D3.js, and GraphQL using the Apollo Client.

All of the JavaScript files here are use ES6 JS (arrow functions, string templates, classes, etc.). I don't use TypeScript and I didn't use Babel. _Note: There is a side effect to this in that IE11 cannot work with the page and frankly, it cannot die soon enough for my taste. Every other modern browser is fine with this code without any special compile/transpile steps._

## Installation

1. You're going to need Node.js before anything else. You can get an installer [here](https://nodejs.org).
1. Run "npm install" to install the various pieces you're going to need locally.

## Development and Testing

- 'npm start' - Builds the app and watches for changes to recompile as you do development.
- 'npm run build' - Builds a "Production" version of the app rather than a "Development" version. Basically that just means that it's a lot smaller for deployment to your server.
- 'npm run server' - Fires up a GraphQL server (under Nodemon so it will watch for and restart after code changes) to act as the back-end for the single page app. Persistence is currently using NeDB but may migrate to MongoDB later.
