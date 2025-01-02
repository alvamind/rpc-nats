    // src/module/product/product.route.ts
    import { t } from "elysia";
    import { TRPC } from "../../types/general.type";
    export const productRouter = (trpc: TRPC) => {
    return {
        getProductById: trpc.procedure
        .input(t.Object({ id: t.Number() }))
        .query(({ input, ctx }) => {
        const productController = ctx.container.resolve('ProductController') as any;
            return productController.getProductById(input.id);
        }),
         getProductCount: trpc.procedure
        .query(({ ctx }) => {
            const productController = ctx.container.resolve('ProductController') as any;
            return productController.getProductCount();
        }),
        createProduct: trpc.procedure
         .input(t.Object({ data: t.Any() }))
         .mutation(({ input, ctx }) => {
           const productController = ctx.container.resolve('ProductController') as any;
           return productController.createProduct(input.data);
        })
    };
    };
