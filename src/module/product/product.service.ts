import { Prisma } from '@prisma/client';
import { injectable } from 'tsyringe-neo';
import { prismaClient } from '../../persistence/prisma/prisma-client';
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
