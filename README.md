# graphql-server
- graphql使用的总结
 	- 使用`express-graphql`（运行`npm run start:express`体验）。可与express项目无缝融合，不影响已有代码，只需在路由代码部分做如下操作：
		```
		import { graphqlHTTP } from 'express-graphql';

		router.use('/itemize', graphqlHTTP(async (_req, _res, params) => {
		    return {
                schema, // 详见代码
                graphiql: true
    	    };
		}));
		```
	- 使用apollo服务器（运行`npm run start:apollo`体验）。apollo是graphql应用的一个服务器，apollo可以作为一个中间件，集成到express，但使用体验不如直接将apollo作为服务器好