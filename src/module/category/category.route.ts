    // src/module/category/category.route.ts
    import { t } from "elysia";
    import { TRPC } from "../../types/general.type";
    export const categoryRouter = (trpc: TRPC) => {
    return {
        getCategoryById: trpc.procedure
        .input(t.Object({ id: t.Number() }))
        .query(({ input, ctx }) => {
        const categoryController = ctx.container.resolve('CategoryController') as any;
            return categoryController.getCategoryById(input.id);
        }),
         getCategoryCount: trpc.procedure
        .query(({ ctx }) => {
            const categoryController = ctx.container.resolve('CategoryController') as any;
            return categoryController.getCategoryCount();
        }),
        createCategory: trpc.procedure
         .input(t.Object({ data: t.Any() }))
         .mutation(({ input, ctx }) => {
           const categoryController = ctx.container.resolve('CategoryController') as any;
           return categoryController.createCategory(input.data);
        })
    };
    };
