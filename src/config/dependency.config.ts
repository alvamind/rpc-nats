    // src/config/dependency.config.ts
    import { container } from 'tsyringe-neo';
    import { prismaClient } from '../persistence/prisma/prisma-client';
    import { PrismaClient } from '@prisma/client';
    import { ProductService } from '../module/product/product.service';
    import { ProductController } from '../module/product/product.controller';
    import { CategoryService } from '../module/category/category.service';
    import { CategoryController } from '../module/category/category.controller';
    import { NATSAbstraction } from '../nats/nats-abstraction';
    import { ControllerRegistry } from '../nats/controller-registry';

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
