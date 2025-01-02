// src/module/category/category.route.ts
import { t } from "elysia";
export const categoryRouter = (trpc) => {
    return {
        getCategoryById: trpc.procedure
            .input(t.Object({ id: t.Number() }))
            .query(({ input, ctx }) => {
            const categoryController = ctx.container.resolve('CategoryController');
            return categoryController.getCategoryById(input.id);
        }),
        getCategoryCount: trpc.procedure
            .query(({ ctx }) => {
            const categoryController = ctx.container.resolve('CategoryController');
            return categoryController.getCategoryCount();
        }),
        createCategory: trpc.procedure
            .input(t.Object({ data: t.Any() }))
            .mutation(({ input, ctx }) => {
            const categoryController = ctx.container.resolve('CategoryController');
            return categoryController.createCategory(input.data);
        })
    };
};
