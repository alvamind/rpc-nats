import { z } from "zod";
import { TRPC } from "../../types/general.type";
import { CategoryController } from "./category.controller";
export const categoryRouter = (trpc: TRPC) => {
  return {
    getCategoryById: trpc.procedure.input(z.object({ id: z.number() })).query(({ input, ctx }) => {
      const categoryController = ctx.container.resolve(CategoryController);
      return categoryController.getCategoryById({ id: input.id });
    }),
    createCategory: trpc.procedure.input(z.object({ data: z.any() })).mutation(({ input, ctx }) => {
      const categoryController = ctx.container.resolve(CategoryController);
      return categoryController.createCategory(input.data);
    }),
  };
};
