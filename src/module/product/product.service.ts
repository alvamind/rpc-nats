// src/module/product/product.service.ts

import { Prisma } from '@prisma/client';
import { injectable } from 'tsyringe-neo';
import { prismaClient } from '../../persistence/prisma/prisma-client';

@injectable()
export class ProductService {
  constructor(private prisma: typeof prismaClient) {}

  async aggregate(productAggregateArgs: Prisma.ProductAggregateArgs) {
    return await this.prisma.product.aggregate(productAggregateArgs);
  }

  async count(productCountArgs: Prisma.ProductCountArgs) {
    return await this.prisma.product.count(productCountArgs);
  }
}
