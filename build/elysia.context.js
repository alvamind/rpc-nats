import * as EventEmitter from 'events';
export const createContext = async (opts) => {
    return {
        opts,
        eventEmitter: EventEmitter,
    };
};
