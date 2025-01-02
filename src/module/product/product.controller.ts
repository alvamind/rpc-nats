import { Prisma } from '@prisma/client';
import { ProductService } from './product.service';
import { inject, injectable } from 'tsyringe-neo';
import { NatsRpc } from 'rpc-nats-alvamind';
import { Category } from '../../types/general.type';
import { CategoryController } from '../category/category.controller';
@injectable()
export class ProductController {
  private categoryController: CategoryController;
  constructor(
    @inject(ProductService) private readonly productService: ProductService,
    @inject(NatsRpc) private readonly natsRpc: NatsRpc,
  ) {
    this.categoryController = this.natsRpc.getControllerProxy<CategoryController>('CategoryController');
  }
  async getProductById(id: number) {
    console.log('getProductById called', id);
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
    try {
      console.log('getProductWithCategory called', id);
      const product = await this.productService.findUnique({ where: { id } });
      if (!product) {
        console.log('Product not found');
        return null;
      }
      let category: Category | null = null;
      try {
        category = await this.categoryController.getCategoryById({
          id: product.categoryId,
        });
        console.log('Category response:', category);
      } catch (err) {
        console.error('Failed to fetch category:', err);
      }
      return {
        ...product,
        category,
      };
    } catch (error) {
      console.error('Error in getProductWithCategory:', error);
      throw error;
    }
  }
}
