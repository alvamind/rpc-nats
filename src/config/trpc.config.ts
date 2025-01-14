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
