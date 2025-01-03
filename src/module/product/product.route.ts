import { z } from "zod";
import { TRPC } from "../../types/general.type";
import { ProductController } from "./product.controller";

export const productRouter = (trpc: TRPC) => {
  return {
    getProductById: trpc.procedure.input(z.object({ id: z.number() })).query(({ input, ctx }) => {
      const productController = ctx.container.resolve(ProductController);
      return productController.getProductById(input.id);
    }),
    createProduct: trpc.procedure.input(z.object({ data: z.any() })).mutation(({ input, ctx }) => {
      const productController = ctx.container.resolve(ProductController);
      return productController.createProduct(input.data);
    }),
  };
};
