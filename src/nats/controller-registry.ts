import { DependencyContainer, isValueProvider, isClassProvider, isFactoryProvider } from 'tsyringe-neo';
import { NATSAbstraction } from './nats-abstraction';
import { createProxyController } from './nats-scanner';

export class ControllerRegistry {
  private controllers: { [key: string]: any } = {};

  constructor(
    private readonly nats: NATSAbstraction,
    private readonly container: DependencyContainer,
  ) {}

  registerAll() {
    const tokens = this.container.registeredTokens();

    for (const token of tokens) {
      let instance: any;

      if (this.container.isRegistered(token)) {
        const provider = this.container.resolve(token);
        if (isValueProvider(provider)) {
          instance = provider.useValue;
        } else if (isClassProvider(provider)) {
          instance = this.container.resolve(token);
        } else if (isFactoryProvider(provider)) {
          instance = this.container.resolve(token);
        }

        if (typeof instance === 'object' && instance !== null && instance?.constructor?.name?.includes('Controller')) {
          const proxy = createProxyController(instance, this.nats);
          this.controllers[instance.constructor.name] = proxy;
        }
      }
    }
  }

  get<T>(controllerName: string): T {
    const controller = this.controllers[controllerName];
    if (!controller) {
      throw new Error(`Controller ${controllerName} not found in registry`);
    }
    return controller;
  }
}
