import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import { buildSchema } from 'graphql';
import { traceHandle } from '@/utils';

const router = express.Router();
const schema = buildSchema(`
    type Query {
        hello: String
        test: String
    }
`);
const root = {
    hello: () => {
        // console.log(a, b, 123);
        return 'hello worldsss';
    },
    test: '123'
};

router.use('/userssss', graphqlHTTP(async (_req, _res, params) => {
    traceHandle(params);
    return {
        schema,
        rootValue: root,
        graphiql: true
    };
}));

export default router;
