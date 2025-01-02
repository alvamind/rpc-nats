import { container } from './config/dependency.config';
import { NATSAbstraction } from './nats/nats-abstraction';
import { config } from './config/general.config';
import { ControllerRegistry } from './nats/controller-registry';

export async function initializeApp(): Promise<void> {
  const nats = new NATSAbstraction(config.nats.url);

  try {
    await nats.connect();
    console.log('NATS connected successfully');

    container.register(NATSAbstraction, { useValue: nats });

    const registry = new ControllerRegistry(nats, container);
    await registry.registerAll();

    // Wait for handlers to be registered
    await new Promise((resolve) => setTimeout(resolve, 2000));

    console.log('App initialization complete');
  } catch (error) {
    console.error('Failed to initialize app:', error);
    throw error;
  }
}
