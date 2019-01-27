const { GraphQLServer, PubSub } = require('graphql-yoga');
const resolvers = require('./resolvers');

// 3
const pubsub = new PubSub();
const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context: { pubsub }
});

server.start(() => console.log(`Server is running on http://localhost:4000`));
