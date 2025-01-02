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
