// src/nats/nats-scanner.ts
import 'reflect-metadata';
export function getAllImplementedInterfaces(target) {
    const interfaces = Reflect.getMetadata('design:interfaces', target) || [];
    return interfaces;
}
export function getAllInterfaceMethods(interfaceClass) {
    const methods = [];
    if (!interfaceClass || !interfaceClass.prototype)
        return methods;
    for (const key of Object.getOwnPropertyNames(interfaceClass.prototype)) {
        if (key === 'constructor')
            continue;
        methods.push({ key, subject: `${interfaceClass.name}.${key}` });
    }
    return methods;
}
export function createProxyController(controller, nats) {
    const handler = {
        get(target, prop, receiver) {
            if (typeof target[prop] === 'function') {
                return async (...args) => {
                    return nats.call(`${target.constructor.name}.${prop}`, args[0]);
                };
            }
            return Reflect.get(target, prop, receiver);
        },
    };
    return new Proxy(controller, handler);
}
