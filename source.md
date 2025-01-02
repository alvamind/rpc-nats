prisma
src
src/common
src/common/generic
src/config
src/database
src/database/{migrations}
src/module
src/module/category
src/module/product
src/nats
src/persistence
src/persistence/prisma
src/types
====================
// .env
DATABASE_URL="postgresql://postgres:passwordrahasia@localhost:5432/myapp?schema=public&connection_limit=1"
REDIS_HOST="localhost"
REDIS_PORT=6379
NATS_URL="nats://localhost:4222"

// docker-compose.yml
version: '3.9'
services:
  nats:
    image: nats:latest
    ports:
      - '4222:4222'
      - '8222:8222' # Monitoring
    #  command: ["-js"] #optional kalau butuh jetstream
  postgres:
    image: postgres:16-alpine
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: passwordrahasia
      POSTGRES_DB: myapp
    ports:
      - '5432:5432'
    healthcheck:
      test: ['CMD-SHELL', 'pg_isready -U postgres']
      interval: 10s
      timeout: 5s
      retries: 5

// package.json
{
  "name": "rpc-nats-example",
  "version": "1.0.0",
  "scripts": {
    "seed": "bunx prisma db seed",
    "db-reset": "bunx prisma db push --force-reset",
    "dev": "bun run src/index.ts --watch",
    "generate": "bunx prisma generate",
    "compose": "docker compose up -d",
    "commit": "commit",
    "source": "generate-source output=source.md exclude=build/",
    "clean": "rm -rf .bun .turbo .eslintcache .parcel-cache node_modules .next .cache dist build coverage .eslintcache .parcel-cache .turbo .vite yarn.lock package-lock.json bun.lockb pnpm-lock.yaml .DS_Store && echo 'Done.'"
  },
  "prisma": {
    "seed": "bun src/database/seed.ts"
  },
  "dependencies": {
    "@elysiajs/trpc": "^1.1.0",
    "@prisma/client": "^6.1.0",
    "@trpc/server": "^10.45.2",
    "@types/bun": "^1.1.14",
    "alvamind-tools": "^1.0.1",
    "dotenv": "^16.4.7",
    "elysia": "^1.2.9",
    "ioredis": "^5.3.2",
    "nats": "^2.19.0",
    "prisma-generator-vault": "^0.0.2",
    "reflect-metadata": "^0.2.2",
    "tsyringe-neo": "^5.1.0",
    "zod": "^3.24.1",
    "zod-prisma-types": "3.2.1"
  },
  "devDependencies": {
    "@types/node": "latest",
    "bun-types": "^1.1.42",
    "prisma": "^6.1.0",
    "typescript": "^5.7.2"
  },
  "type": "module"
}

// src/app.module.ts
    import { container } from './config/dependency.config';
    import { ProductController } from './module/product/product.controller';
    import { CategoryController } from './module/category/category.controller';
    import { NATSAbstraction } from './nats/nats-abstraction';
    import { config } from './config/general.config';
    import { ControllerRegistry } from './nats/controller-registry';
    import { ProductService } from './module/product/product.service';
    import { CategoryService } from './module/category/category.service';
    import { PrismaClient } from '@prisma/client';
    import { prismaClient } from './persistence/prisma/prisma-client';
    export async function initializeApp(): Promise<void> {
        container.resolve(ProductService)
        container.resolve(CategoryService)
        const nats = new NATSAbstraction(config.nats.url);
        container.register(NATSAbstraction, { useValue: nats });
        await nats.connect();
        const controllerRegistry = new ControllerRegistry(nats, container);
        container.register(ControllerRegistry, { useValue: controllerRegistry });
        controllerRegistry.registerAll();
        container.register(PrismaClient, { useValue: prismaClient });
       container.resolve(ProductController)
        container.resolve(CategoryController)
    }

// src/config/dependency.config.ts
import { container } from 'tsyringe-neo';
import { PrismaClient } from '@prisma/client'; // <-- Import PrismaClient
import { prismaClient } from '../persistence/prisma/prisma-client';
import { ProductService } from '../module/product/product.service';
import { ProductController } from '../module/product/product.controller';
import { CategoryService } from '../module/category/category.service';
import { CategoryController } from '../module/category/category.controller';
container.register(PrismaClient, { useValue: prismaClient });
container.registerSingleton(ProductService);
container.registerSingleton(CategoryService);
container.registerSingleton(ProductController);
container.registerSingleton(CategoryController);
const CONTEXT_WITH_CONTAINER = Symbol.for('ContextWithContainer');
container.register(CONTEXT_WITH_CONTAINER, {
  useFactory: (context) => {
    return () => {
      return {
        context: context,
        opts: {},
      };
    };
  },
});
export { container };

// src/config/general.config.ts
import * as dotenv from 'dotenv';
import { RetryConfigInterface } from '../types/general.type';
dotenv.config();
export const config = {
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT ? parseInt(process.env.PORT, 10) : 3000,
  database: {
    url: process.env.DATABASE_URL || 'postgresql://user:password@localhost:5432/db?schema=public',
  },
  redis: {
    host: process.env.REDIS_HOST || 'localhost',
    port: process.env.REDIS_PORT ? parseInt(process.env.REDIS_PORT, 10) : 6379,
    streamName: process.env.REDIS_STREAM_NAME || 'aiQueueStream',
    maxRetries: process.env.REDIS_MAX_RETRIES ? parseInt(process.env.REDIS_MAX_RETRIES, 10) : 5,
    retryDelay: process.env.REDIS_RETRY_DELAY ? parseInt(process.env.REDIS_RETRY_DELAY, 10) : 500,
    maxRetryDelay: process.env.REDIS_MAX_RETRY_DELAY ? parseInt(process.env.REDIS_MAX_RETRY_DELAY, 10) : 5000,
  },
  nats: {
    url: process.env.NATS_URL || 'nats://localhost:4222',
  },
  defaultBatchSize: process.env.DEFAULT_BATCH_SIZE ? parseInt(process.env.DEFAULT_BATCH_SIZE, 10) : 5,
  websocket: {
    url: process.env.WEBSOCKET_URL || 'ws://localhost:3000/websocket/interaction',
  },
  cron: {
    aiQueueSchedule: process.env.AIQUEUE_SCHEDULE || '0 */5 * * * *',
  },
};
export const retryConfig: RetryConfigInterface = {
  maxRetries: 3,
  initialDelay: 1000,
  maxDelay: 10000,
  factor: 2,
};

// src/config/trpc.config.ts
import { initTRPC } from '@trpc/server';
import { ContextWithContainer } from '../elysia.context';
import { productRouter } from '../module/product/product.route';
import { categoryRouter } from '../module/category/category.route';
export const trpc = initTRPC.context<ContextWithContainer>().create();
export const appRouter = trpc.router({
  product: trpc.router(productRouter(trpc)),
  category: trpc.router(categoryRouter(trpc)),
});

// src/database/seed.ts
    import { PrismaClient } from '@prisma/client';
    const prisma = new PrismaClient();
    async function main() {
    await prisma.category.createMany({
        data: [
        {
            name: 'Electronics',
            description: 'Electronic products',
        },
        {
            name: 'Books',
            description: 'Books and literature',
        },
        ],
    });
      await prisma.product.createMany({
            data: [
            {
                name: 'Laptop',
                description: 'Portable computer',
                categoryId: 1,
            },
            {
                name: 'The Lord of the Rings',
                description: 'A classic fantasy novel',
                categoryId: 2,
            },
            ],
        });
    }
    main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });

// src/elysia.context.ts
    import { FetchCreateContextFnOptions } from '@trpc/server/adapters/fetch';
    import * as EventEmitter from 'events';
    import { DependencyContainer } from 'tsyringe-neo';
    export const createContext = async (opts: FetchCreateContextFnOptions) => {
    return {
        opts,
        eventEmitter: EventEmitter,
    };
    };
    export type ContextWithContainer = Awaited<ReturnType<typeof createContext>> & {
    container: DependencyContainer;
    };

// src/index.ts
import 'reflect-metadata';
import { Elysia } from 'elysia';
import { logger } from './common/utils/logger.utils';
import { ContextWithContainer } from './elysia.context';
import { execSync } from 'child_process';
import { container } from './config/dependency.config';
import { initializeApp } from './app.module';
import { trpc } from '@elysiajs/trpc';
import { appRouter } from './config/trpc.config';
import { ProductController } from './module/product/product.controller';
execSync('clear', { stdio: 'inherit' });
const requestTimings = new WeakMap<any, number>();
const logRequestStart = ({ request }: any) => {
  logger.info(`[${request.method}] ${request.url} - START`);
  requestTimings.set(request, performance.now());
};
const createErrorResponse = ({ code, error, request }: any): Response => {
  logger.error(`[${request.method}] ${request.url} - ERROR - ${code} - ${error.message}`);
  const errorResponse = {
    code,
    message: error.message,
  };
  return new Response(JSON.stringify(errorResponse), {
    status: 500,
    headers: {
      'Content-Type': 'application/json',
    },
  });
};
const startTime = performance.now();
const app = new Elysia()
  .onStart(async () => {
    initializeApp();
    const productController = container.resolve<ProductController>(ProductController); // Resolve dengan type
    const result = await productController.getProductWithCategory(1);
    console.log('result from getProductWithCategory : ', result);
  })
  .onRequest(logRequestStart)
  .use(
    trpc(appRouter, {
      createContext: async (opts) => {
        return {
          opts,
          container,
        } as ContextWithContainer;
      },
    }),
  )
  .onAfterResponse((context: any) => {
    const start = requestTimings.get(context.request);
    if (start) {
      const duration = performance.now() - start;
      logger.info(`[${context.request.method}] ${context.request.url} - END - ${duration} ms`);
      requestTimings.delete(context.request);
    }
  })
  .onError(createErrorResponse)
  .listen(3000);
const endTime = performance.now();
const startupTime = endTime - startTime;
logger.warn(`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port} in ${startupTime.toFixed(2)}ms`);
export { app };

// src/module/category/category.controller.ts
import { Prisma } from '@prisma/client';
import { CategoryService } from './category.service';
import { inject, injectable } from 'tsyringe-neo';
import { NATSAbstraction } from '../../nats/nats-abstraction';
@injectable()
export class CategoryController {
  constructor(
    @inject(CategoryService) private readonly categoryService: CategoryService,
    @inject(NATSAbstraction) private readonly nats: NATSAbstraction,
  ) {
    this.nats.registerAll(this);
  }
  async getCategoryById(id: number) {
    return await this.categoryService.findUnique({ where: { id } });
  }
  async getCategoryCount(): Promise<number> {
    return await this.categoryService.count({});
  }
  async createCategory(data: Prisma.CategoryCreateInput) {
    return await this.categoryService.create({ data });
  }
  async aggregate(categoryAggregateArgs: Prisma.CategoryAggregateArgs) {
    return await this.categoryService.aggregate(categoryAggregateArgs);
  }
}

// src/module/category/category.service.ts
import { Prisma } from '@prisma/client';
import { injectable } from 'tsyringe-neo';
import { prismaClient } from '../../persistence/prisma/prisma-client';
@injectable()
export class CategoryService {
  constructor(private prisma: typeof prismaClient) {}
  async findUnique(args: Prisma.CategoryFindUniqueArgs) {
    return await this.prisma.category.findUnique(args);
  }
  async create(args: Prisma.CategoryCreateArgs) {
    return await this.prisma.category.create(args);
  }
  async aggregate(categoryAggregateArgs: Prisma.CategoryAggregateArgs) {
    return await this.prisma.category.aggregate(categoryAggregateArgs);
  }
  async count(categoryCountArgs: Prisma.CategoryCountArgs) {
    return await this.prisma.category.count(categoryCountArgs);
  }
}

// src/module/product/product.controller.ts
import { Prisma } from '@prisma/client';
import { ProductService } from './product.service';
import { inject, injectable } from 'tsyringe-neo';
import { NATSAbstraction } from '../../nats/nats-abstraction';
@injectable()
export class ProductController {
  constructor(
    @inject(ProductService) private readonly productService: ProductService,
    @inject(NATSAbstraction) private readonly nats: NATSAbstraction,
  ) {
    this.nats.registerAll(this);
  }
  async getProductById(id: number) {
    return await this.productService.findUnique({ where: { id } });
  }
  async getProductCount(): Promise<number> {
    return await this.productService.count({});
  }
  async createProduct(data: Prisma.ProductCreateInput) {
    return await this.productService.create({ data });
  }
  async aggregate(productAggregateArgs: Prisma.ProductAggregateArgs) {
    return await this.productService.aggregate(productAggregateArgs);
  }
  async getProductWithCategory(id: number) {
    const product = await this.productService.findUnique({ where: { id } });
    if (!product) return null;
    const category = await this.nats.call('CategoryController.getCategoryById', { id: product.categoryId });
    return {
      ...product,
      category,
    };
  }
}

// src/module/product/product.service.ts
import { injectable } from 'tsyringe-neo';
import { prismaClient } from '../../persistence/prisma/prisma-client';
import { Prisma } from '@prisma/client';
@injectable()
export class ProductService {
  constructor(private prisma: typeof prismaClient) {}
  async findUnique(args: Prisma.ProductFindUniqueArgs) {
    return await this.prisma.product.findUnique(args);
  }
  async create(args: Prisma.ProductCreateArgs) {
    return await this.prisma.product.create(args);
  }
  async aggregate(productAggregateArgs: Prisma.ProductAggregateArgs) {
    return await this.prisma.product.aggregate(productAggregateArgs);
  }
  async count(productCountArgs: Prisma.ProductCountArgs) {
    return await this.prisma.product.count(productCountArgs);
  }
}

// src/nats/controller-registry.ts
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

// src/nats/nats-abstraction.ts
import { connect, NatsConnection } from 'nats';
import { getAllImplementedInterfaces, getAllInterfaceMethods } from './nats-scanner';
interface RPCHandler<T, R> {
  (data: T): Promise<R>;
}
export class NATSAbstraction {
  private nc?: NatsConnection; //Make it optional
  private handlers = new Map<string, RPCHandler<any, any>>();
  constructor(private server: string) {}
  async connect() {
    this.nc = await connect({ servers: this.server });
    console.log(`[NATS] Connected to ${this.server}`);
    this.nc.closed().then(() => {
      console.log('[NATS] Connection closed');
    });
  }
  async call<T, R>(subject: string, data: T): Promise<R> {
    if (!this.nc) {
      throw new Error('NATS not connected');
    }
    const encodedData = new TextEncoder().encode(JSON.stringify(data));
    const response = await this.nc.request(subject, encodedData, { timeout: 5000 });
    const decodedData = new TextDecoder().decode(response.data);
    return JSON.parse(decodedData) as R;
  }
  register<T, R>(subject: string, handler: RPCHandler<T, R>) {
    if (!this.nc) {
      throw new Error('NATS not connected');
    }
    if (this.handlers.has(subject)) {
      throw new Error(`Handler already registered for subject: ${subject}`);
    }
    this.handlers.set(subject, handler);
    this.nc.subscribe(subject, {
      callback: (err, msg) => {
        if (err) {
          console.error(`[NATS] Error on ${subject} sub: ${err.message}`);
          return;
        }
        const decodedData = new TextDecoder().decode(msg.data);
        const data: T = JSON.parse(decodedData) as T;
        handler(data)
          .then((result) => {
            const encodedData = new TextEncoder().encode(JSON.stringify(result));
            msg.respond(encodedData);
          })
          .catch((e) => {
            console.error(`[NATS] Error processing message for ${subject}: ${e.message}`);
          });
      },
    });
  }
  registerAll(controller: any) {
    const interfaces = getAllImplementedInterfaces(controller);
    for (const interfaceClass of interfaces) {
      const methods = getAllInterfaceMethods(interfaceClass);
      for (const { key, subject } of methods) {
        this.register(subject, async (data: any) => {
          return controller[key](data);
        });
      }
    }
  }
  close() {
    if (this.nc) {
      this.nc.close();
    }
  }
}

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

// src/persistence/prisma/prisma-client.ts
import { PrismaClient } from '@prisma/client';
import { logger } from '../../common/utils/logger.utils';
export const prismaClient = new PrismaClient();
prismaClient
  .$connect()
  .then(() => {
    logger.info('Successfully connected to database');
  })
  .catch((e) => {
    logger.error(`Failed to connect to database ${e}`);
  });

// src/types/general.type.ts
    import { appRouter, trpc } from "../config/trpc.config";
    import { ContextWithContainer } from "../elysia.context";
    export type TRPC = typeof trpc;
    export type AppRouter = typeof appRouter;
    export interface RetryConfigInterface {
        maxRetries: number;
        initialDelay: number;
        maxDelay: number;
        factor: number;
    }
    export type TRPCContext = ContextWithContainer;

// tsconfig.json
{
  "compilerOptions": {
    "lib": ["ESNext"],
    "target": "ESNext",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "types": [],
    "strict": true,
    "skipLibCheck": true,
    "noEmit": false,
    "outDir": "build",
    "moduleDetection": "force",
    "allowJs": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "forceConsistentCasingInFileNames": true,
    "baseUrl": ".",
    "noImplicitReturns": true,
    "allowSyntheticDefaultImports": true,
    "noImplicitAny": true,
    "noImplicitThis": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "strictBindCallApply": true,
    "strictPropertyInitialization": true,
    "emitDecoratorMetadata": true,
    "experimentalDecorators": true
  },
  "include": ["src*.ts"],
  "exclude": ["node_modules"]
}

