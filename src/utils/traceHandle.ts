import { GraphQLParams } from 'express-graphql';
import httpContext from 'express-http-context';
import { trace } from '@/configs';

export default (args?: GraphQLParams) => {
    trace({
        traceId: httpContext.get('traceId'),
        spanId: httpContext.get('spanId'),
        parentSpanId: httpContext.get('parentSpanId')
    }, 'graphql').info(`graphql query:  \n ${args?.query?.replace('\\n', '')}`);
};
