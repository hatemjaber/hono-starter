import { serve } from '@hono/node-server';
import { createRoute, OpenAPIHono } from '@hono/zod-openapi';
import { Hono } from 'hono';
import { compress } from 'hono/compress';
import { cors } from 'hono/cors';
import { showRoutes } from 'hono/dev';
import { logger as httpLogger } from 'hono/logger';
import { trimTrailingSlash } from 'hono/trailing-slash';
import { env } from './utils/env.js';
import { logger } from './utils/logger.js';
import { StatusCodes } from 'http-status-codes';
import { swaggerUI } from '@hono/swagger-ui';

const app = new OpenAPIHono();

// Generic middlewares
app.use(cors());
app.use(compress());
app.use(httpLogger());
app.use(trimTrailingSlash());

app.openapi(createRoute({
    path: '/',
    method: 'get',
    responses: {
        [StatusCodes.OK]: {
            description: 'Hello World',
        },
    },
}), (c) => c.text('Hello World'));

// The OpenAPI documentation will be available at /doc
app.doc('/doc', {
    openapi: '3.0.0',
    info: {
        version: '1.0.0',
        title: 'My API',
    },
});

app.get('/ui', swaggerUI({ url: "/doc" }));

if (env.NODE_ENV === "development") {
    console.log('Available routes:');
    showRoutes(app);
}

const server = serve({ fetch: app.fetch, port: env.PORT });
logger.info(`Server is running on port: ${ env.PORT }, env: ${ env.NODE_ENV }`);

process.on('SIGTERM', () => {
    logger.info('SIGTERM signal received');

    logger.info('Closing http server');
    server.close(async () => {
        logger.info('Exiting...');
        process.exit(0);
    });
});