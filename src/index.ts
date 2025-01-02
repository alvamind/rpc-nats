    import 'reflect-metadata';
    import { Elysia } from 'elysia';
    import { logger } from './common/utils/logger.utils';
    import { ContextWithContainer } from './elysia.context';
    import { execSync } from 'child_process';
    import { container } from './config/dependency.config';
    import { initializeApp } from './app.module';
    import { t } from 'elysia';
    import { trpc } from '@elysiajs/trpc';
    import { appRouter } from './config/trpc.config';
    execSync('clear', { stdio: 'inherit' });
    const requestTimings = new WeakMap<any, number>();
    const logRequestStart = ({ request }: any) => {
      logger.info(`[${request.method}] ${request.url} - START`);
      requestTimings.set(request, performance.now());
    };
    const createErrorResponse = ({ code, error, request }: any): Response => {
      logger.error(`[${request.method}] ${request.url} - ERROR - ${code} - ${error.message}`);
      const errorResponse = {
        code,
        message: error.message,
      };
      return new Response(JSON.stringify(errorResponse), {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    };
    const startTime = performance.now();
    const app = new Elysia()
      .onStart(async () => {
        initializeApp();
      })
      .onRequest(logRequestStart)
        .use(
            trpc(appRouter, {
                createContext: async (opts) => {
                    return {
                    opts,
                    container
                } as ContextWithContainer;
              },
            }),
    )
      .onAfterResponse((context: any) => {
        const start = requestTimings.get(context.request);
        if (start) {
          const duration = performance.now() - start;
          logger.info(`[${context.request.method}] ${context.request.url} - END - ${duration} ms`);
          requestTimings.delete(context.request);
        }
      })
      .onError(createErrorResponse)
      .listen(3000);
    const endTime = performance.now();
    const startupTime = endTime - startTime;
    logger.warn(`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port} in ${startupTime.toFixed(2)}ms`);
    export { app };
