    // src/common/utils/logger.utils.ts
    export const logger = {
        info: (message: any, ...args: any[]) => {
            console.log(`\x1b[32m[INFO]\x1b[0m ${message}`, ...args);
        },
        warn: (message: any, ...args: any[]) => {
            console.warn(`\x1b[33m[WARN]\x1b[0m ${message}`, ...args);
        },
        error: (message: any, ...args: any[]) => {
            console.error(`\x1b[31m[ERROR]\x1b[0m ${message}`, ...args);
        },
        debug: (message: any, ...args: any[]) => {
            console.debug(`\x1b[34m[DEBUG]\x1b[0m ${message}`, ...args);
         },
    };
