import { DependencyContainer } from 'tsyringe-neo';
import { NATSAbstraction } from './nats-abstraction';
import { createProxyController } from './nats-scanner';

export class ControllerRegistry {
  private controllers: { [key: string]: any } = {};

  constructor(
    private readonly nats: NATSAbstraction,
    private readonly container: DependencyContainer,
  ) {}

  async registerAll() {
    // console.log('this.container:', this.container);
    if (!this.container) {
      console.error('Container is undefined!');
      return;
    }
    const tokens = this.container.registeredTokens();
    for (const token of tokens) {
      try {
        let instance = this.container.resolve(token);
        // console.log(`[Controller Registry] Controller resolved : ${String(token)}`);
        if (instance?.constructor?.name?.includes('Controller')) {
          // console.log(`Registering controller: ${instance.constructor.name}`);
          await this.nats.registerAll(instance);
          const proxy = createProxyController(instance, this.nats);
          this.controllers[instance.constructor.name] = proxy;
        }
      } catch (error) {
        console.error(`Error registering controller for token ${String(token)}:`, error);
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
