// src/module/product/product.controller.ts
import { Prisma } from '@prisma/client';
import { ProductService } from './product.service';
import { inject, injectable } from 'tsyringe-neo';
import { NATSAbstraction } from '../../nats/nats-abstraction';

@injectable()
export class ProductController {
  constructor(
    @inject(ProductService) private readonly productService: ProductService,
    @inject(NATSAbstraction) private readonly nats: NATSAbstraction,
  ) {
    this.nats.registerAll(this);
  }
  async getProductById(id: number): Promise<Prisma.Product | null> {
    return await this.findUnique({ where: { id } });
  }
  async getProductCount(): Promise<number> {
    return await this.productService.count({});
  }
  async createProduct(data: Prisma.ProductCreateInput): Promise<Prisma.Product> {
    return await this.create({ data });
  }
  async aggregate(productAggregateArgs: Prisma.ProductAggregateArgs) {
    return await this.productService.aggregate(productAggregateArgs);
  }
}
