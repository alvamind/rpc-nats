// src/module/category/category.service.ts

import { Prisma } from '@prisma/client';
import { injectable } from 'tsyringe-neo';
import { prismaClient } from '../../persistence/prisma/prisma-client';

@injectable()
export class CategoryService {
  constructor(private prisma: typeof prismaClient) {}
  async aggregate(categoryAggregateArgs: Prisma.CategoryAggregateArgs) {
    return await this.prisma.category.aggregate(categoryAggregateArgs);
  }

  async count(categoryCountArgs: Prisma.CategoryCountArgs) {
    return await this.prisma.category.count(categoryCountArgs);
  }
}
