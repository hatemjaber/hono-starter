import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { compress } from 'hono/compress';
import { cors } from 'hono/cors';
import { showRoutes } from 'hono/dev';
import { logger as httpLogger } from 'hono/logger';
import { trimTrailingSlash } from 'hono/trailing-slash';
import { env } from './utils/env.js';
import { logger } from './utils/logger.js';

const app = new Hono();

// Generic middlewares
app.use(cors());
app.use(compress());
app.use(httpLogger());
app.use(trimTrailingSlash());

app.get('/', (c) => c.text('Hello World'));


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