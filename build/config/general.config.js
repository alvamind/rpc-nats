import * as dotenv from 'dotenv';
dotenv.config();
export const config = {
    env: process.env.NODE_ENV || 'development',
    port: process.env.PORT ? parseInt(process.env.PORT, 10) : 3000,
    database: {
        url: process.env.DATABASE_URL || 'postgresql://user:password@localhost:5432/db?schema=public',
    },
    redis: {
        host: process.env.REDIS_HOST || 'localhost',
        port: process.env.REDIS_PORT ? parseInt(process.env.REDIS_PORT, 10) : 6379,
        streamName: process.env.REDIS_STREAM_NAME || 'aiQueueStream',
        maxRetries: process.env.REDIS_MAX_RETRIES ? parseInt(process.env.REDIS_MAX_RETRIES, 10) : 5,
        retryDelay: process.env.REDIS_RETRY_DELAY ? parseInt(process.env.REDIS_RETRY_DELAY, 10) : 500,
        maxRetryDelay: process.env.REDIS_MAX_RETRY_DELAY ? parseInt(process.env.REDIS_MAX_RETRY_DELAY, 10) : 5000,
    },
    nats: {
        url: process.env.NATS_URL || 'nats://localhost:4222',
    },
    defaultBatchSize: process.env.DEFAULT_BATCH_SIZE ? parseInt(process.env.DEFAULT_BATCH_SIZE, 10) : 5,
    websocket: {
        url: process.env.WEBSOCKET_URL || 'ws://localhost:3000/websocket/interaction',
    },
    cron: {
        aiQueueSchedule: process.env.AIQUEUE_SCHEDULE || '0 */5 * * * *',
    },
};
export const retryConfig = {
    maxRetries: 3,
    initialDelay: 1000,
    maxDelay: 10000,
    factor: 2,
};
