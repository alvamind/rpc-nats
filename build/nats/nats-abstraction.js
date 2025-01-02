// src/nats/nats-abstraction.ts
import { connect } from 'nats';
import { getAllImplementedInterfaces, getAllInterfaceMethods } from './nats-scanner';
export class NATSAbstraction {
    server;
    nc;
    handlers = new Map();
    constructor(server) {
        this.server = server;
    }
    async connect() {
        this.nc = await connect({ servers: this.server });
        console.log(`[NATS] Connected to ${this.server}`);
        this.nc.closed().then(() => {
            console.log('[NATS] Connection closed');
        });
    }
    async call(subject, data) {
        const encodedData = new TextEncoder().encode(JSON.stringify(data));
        const response = await this.nc.request(subject, encodedData, { timeout: 5000 });
        const decodedData = new TextDecoder().decode(response.data);
        return JSON.parse(decodedData);
    }
    register(subject, handler) {
        if (this.handlers.has(subject)) {
            throw new Error(`Handler already registered for subject: ${subject}`);
        }
        this.handlers.set(subject, handler);
        this.nc.subscribe(subject, {
            callback: (err, msg) => {
                if (err) {
                    console.error(`[NATS] Error on ${subject} sub: ${err.message}`);
                    return;
                }
                const decodedData = new TextDecoder().decode(msg.data);
                const data = JSON.parse(decodedData);
                handler(data)
                    .then((result) => {
                    const encodedData = new TextEncoder().encode(JSON.stringify(result));
                    msg.respond(encodedData);
                })
                    .catch((e) => {
                    console.error(`[NATS] Error processing message for ${subject}: ${e.message}`);
                });
            },
        });
    }
    registerAll(controller) {
        const interfaces = getAllImplementedInterfaces(controller);
        for (const interfaceClass of interfaces) {
            const methods = getAllInterfaceMethods(interfaceClass);
            for (const { key, subject } of methods) {
                this.register(subject, async (data) => {
                    return controller[key](data);
                });
            }
        }
    }
    close() {
        this.nc.close();
    }
}
