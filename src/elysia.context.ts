    // src/elysia.context.ts
    import { FetchCreateContextFnOptions } from '@trpc/server/adapters/fetch';
    import * as EventEmitter from 'events';
    import { DependencyContainer } from 'tsyringe-neo';
    export const createContext = async (opts: FetchCreateContextFnOptions) => {
    return {
        opts,
        eventEmitter: EventEmitter,
    };
    };
    export type ContextWithContainer = Awaited<ReturnType<typeof createContext>> & {
    container: DependencyContainer;
    };
