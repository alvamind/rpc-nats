import 'reflect-metadata';
interface MethodMetadata {
  key: string;
  subject: string;
}

export function getAllImplementedInterfaces(target: any): any[] {
  return Reflect.getMetadata('design:interfaces', target) || [];
}

export function getAllInterfaceMethods(target: any): MethodMetadata[] {
  const methods: MethodMetadata[] = [];
  if (!target || !target.prototype) return methods;

  for (const key of Object.getOwnPropertyNames(target.prototype)) {
    if (key === 'constructor' || typeof target.prototype[key] !== 'function') continue;
    methods.push({ key, subject: `${target.name}.${key}` });
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
