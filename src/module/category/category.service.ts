import { Prisma } from '@prisma/client';
import { injectable } from 'tsyringe-neo';
import { prismaClient } from '../../persistence/prisma/prisma-client';
@injectable()
export class CategoryService {
  constructor(private prisma: typeof prismaClient) {}
  async findUnique(args: Prisma.CategoryFindUniqueArgs) {
    return await this.prisma.category.findUnique(args);
  }
  async create(args: Prisma.CategoryCreateArgs) {
    return await this.prisma.category.create(args);
  }
  async aggregate(categoryAggregateArgs: Prisma.CategoryAggregateArgs) {
    return await this.prisma.category.aggregate(categoryAggregateArgs);
  }
  async count(categoryCountArgs: Prisma.CategoryCountArgs) {
    return await this.prisma.category.count(categoryCountArgs);
  }
}
