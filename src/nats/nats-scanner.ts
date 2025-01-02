// src/nats/nats-scanner.ts
import 'reflect-metadata';
interface MethodMetadata {
  key: string;
  subject: string;
}
export function getAllImplementedInterfaces(target: any): any[] {
  const interfaces = Reflect.getMetadata('design:interfaces', target) || [];
  return interfaces;
}

export function getAllInterfaceMethods(interfaceClass: any): MethodMetadata[] {
  const methods: MethodMetadata[] = [];
  if (!interfaceClass || !interfaceClass.prototype) return methods;
  for (const key of Object.getOwnPropertyNames(interfaceClass.prototype)) {
    if (key === 'constructor') continue;
    methods.push({ key, subject: `${interfaceClass.name}.${key}` });
  }
  return methods;
}
export function createProxyController<T>(controller: T, nats: any): T {
  const handler = {
    get(target: any, prop: string, receiver: any) {
      if (typeof target[prop] === 'function') {
        return async (...args: any[]) => {
          return nats.call(`${target.constructor.name}.${prop}`, args[0]);
        };
      }
      return Reflect.get(target, prop, receiver);
    },
  };
  return new Proxy(controller, handler) as T;
}
