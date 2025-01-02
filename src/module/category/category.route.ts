import { z } from 'zod';
import { TRPC } from '../../types/general.type';
export const categoryRouter = (trpc: TRPC) => {
  return {
    getCategoryById: trpc.procedure.input(z.object({ id: z.number() })).query(({ input, ctx }) => {
      const categoryController = ctx.container.resolve('CategoryController') as any;
      return categoryController.getCategoryById(input.id);
    }),
    createCategory: trpc.procedure.input(z.object({ data: z.any() })).mutation(({ input, ctx }) => {
      const categoryController = ctx.container.resolve('CategoryController') as any;
      return categoryController.createCategory(input.data);
    }),
  };
};
