// src/app.module.ts
import { container } from './config/dependency.config';
import { ProductController } from './module/product/product.controller';
import { CategoryController } from './module/category/category.controller';
import { NATSAbstraction } from './nats/nats-abstraction';
import { config } from './config/general.config';
import { ControllerRegistry } from './nats/controller-registry';
import { ProductService } from './module/product/product.service';
import { CategoryService } from './module/category/category.service';

export async function initializeApp(): Promise<void> {
  container.resolve(ProductService);
  container.resolve(CategoryService);
  const nats = new NATSAbstraction(config.nats.url);
  container.register(NATSAbstraction, { useValue: nats });
  await nats.connect();
  const controllerRegistry = new ControllerRegistry(nats, container);
  container.register(ControllerRegistry, { useValue: controllerRegistry });
  controllerRegistry.registerAll();
  container.resolve(ProductController);
  container.resolve(CategoryController);
}
