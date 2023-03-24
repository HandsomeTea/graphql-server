// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
import fs from 'fs';
import path from 'path';

import resolvers from './resolver';

import { ApolloServer } from '@apollo/server';

export default new ApolloServer({
    typeDefs: fs.readFileSync(path.join(__dirname, './type.graphql')).toString(),
    resolvers
});
