import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import { traceHandle } from '@/utils';
import schema from './type';

const router = express.Router();

router.use('/itemize', graphqlHTTP(async (_req, _res, params) => {
    traceHandle(params);
    return {
        schema,
        graphiql: true
    };
}));

export default router;
