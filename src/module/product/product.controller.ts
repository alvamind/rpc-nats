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
    return await this.productService.findUnique({ where: { id } });
  }

  async getProductCount(): Promise<number> {
    return await this.productService.count({});
  }

  async createProduct(data: Prisma.ProductCreateInput) {
    return await this.productService.create({ data });
  }

  async aggregate(productAggregateArgs: Prisma.ProductAggregateArgs) {
    return await this.productService.aggregate(productAggregateArgs);
  }

  async getProductWithCategory(id: number) {
    // Misal mau ambil product dengan category
    const product = await this.productService.findUnique({ where: { id } });
    if (!product) return null;
    // **Manggil `CategoryController.getCategoryById` lewat NATS**
    const category = await this.nats.call('CategoryController.getCategoryById', { id: product.categoryId });
    return {
      ...product,
      category,
    };
  }
}
