// src/nats/controller-registry.ts
import { container } from 'tsyringe-neo';
import { createProxyController } from './nats-scanner';
export class ControllerRegistry {
    nats;
    container;
    controllers = {};
    constructor(nats, container) {
        this.nats = nats;
        this.container = container;
    }
    registerAll() {
        const instances = container.getRegistry().entries();
        for (const [key, value] of instances) {
            if (typeof value === 'object' && value !== null && value?.useValue?.constructor?.name?.includes('Controller')) {
                const proxy = createProxyController(value.useValue, this.nats);
                this.controllers[value.useValue.constructor.name] = proxy;
            }
        }
    }
    get(controllerName) {
        const controller = this.controllers[controllerName];
        if (!controller) {
            throw new Error(`Controller ${controllerName} not found in registry`);
        }
        return controller;
    }
}
