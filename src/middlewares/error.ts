import { Request, Response, NextFunction } from 'express';
import httpContext from 'express-http-context';

import { log, getENV, trace } from '@/configs';

/**
 * 捕捉路由中未处理的错误，即直接throw new Error的情况
 */
export default (err: Error, req: Request, res: Response, _next: NextFunction) => { /* eslint-disable-line*/
    const result = {
        message: err.message,
        source: getENV('SERVER_NAME'),
        code: 'INTERNAL_SERVER_ERROR',
        status: 500,
        reason: []
    };

    log('http-error').error(err);
    trace({
        traceId: httpContext.get('traceId'),
        spanId: httpContext.get('spanId'),
        parentSpanId: httpContext.get('parentSpanId')
    }, 'http-error').info(`${req.method}: ${req.originalUrl} => \n${JSON.stringify(result, null, '   ')}`);

    res.status(result.status).send(result);
};
