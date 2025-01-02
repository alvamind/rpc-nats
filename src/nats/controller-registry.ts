// src/nats/controller-registry.ts
import { container, DependencyContainer } from 'tsyringe-neo';
import { NATSAbstraction } from './nats-abstraction';
import { createProxyController } from './nats-scanner';

export class ControllerRegistry {
  private controllers: { [key: string]: any } = {};

  constructor(
    private readonly nats: NATSAbstraction,
    private readonly container: DependencyContainer,
  ) {}

  registerAll() {
    const instances = container.getRegistry().entries();
    for (const [key, value] of instances) {
      if (typeof value === 'object' && value !== null && value?.useValue?.constructor?.name?.includes('Controller')) {
        const proxy = createProxyController(value.useValue, this.nats);
        this.controllers[value.useValue.constructor.name] = proxy;
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
