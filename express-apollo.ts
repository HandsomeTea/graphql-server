import { startStandaloneServer } from '@apollo/server/standalone';
import server from './src/apollo-test';
import { log, updateOrCreateLogInstance } from './src/configs';

updateOrCreateLogInstance();
// Passing an ApolloServer instance to the `startStandaloneServer` function:
//  1. creates an Express app
//  2. installs your ApolloServer instance as middleware
//  3. prepares your app to handle incoming requests
startStandaloneServer(server, {
    listen: { port: 4000 }
}).then((server) => {
    log('STARTUP').info(`访问 ${server.url} 以体验graphql`);
});
