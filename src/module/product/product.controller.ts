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
  async getProductById(id: number) {
    return await this.productService.findUnique({ where: { id } }); // Panggil service
  }
  async getProductCount(): Promise<number> {
    return await this.productService.count({});
  }
  async createProduct(data: Prisma.ProductCreateInput) {
    return await this.productService.create({ data }); // Panggil service
  }
  async aggregate(productAggregateArgs: Prisma.ProductAggregateArgs) {
    return await this.productService.aggregate(productAggregateArgs);
  }
}
