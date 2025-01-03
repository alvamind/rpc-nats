import { container } from "./config/dependency.config";
import { config } from "./config/general.config";
import { NatsRpc } from "rpc-nats-alvamind";
import { ProductController } from "./module/product/product.controller";
import { CategoryController } from "./module/category/category.controller";

export async function initializeApp(): Promise<void> {
  try {
    const natsRpc = new NatsRpc({
      dependencyResolver: container,
      natsUrl: config.nats.url,
      subjectPattern: (className, methodName) => `${className}-${methodName}`,
    });
    container.register(NatsRpc, { useValue: natsRpc });
    await natsRpc.connect();
    await natsRpc.registerController(CategoryController);
    await natsRpc.registerController(ProductController);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    console.log("App initialization complete");
  } catch (error) {
    console.error("Failed to initialize app:", error);
  }
}
