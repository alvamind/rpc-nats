import { Prisma } from '@prisma/client';
import { CategoryService } from './category.service';
import { inject, injectable } from 'tsyringe-neo';
import { NATSAbstraction } from '../../nats/nats-abstraction';

@injectable()
export class CategoryController {
  constructor(
    @inject(CategoryService) private readonly categoryService: CategoryService,
    @inject(NATSAbstraction) private readonly nats: NATSAbstraction,
  ) {
    // Hapus setTimeout dan langsung register
    this.nats.registerAll(this);
  }

  async getCategoryById(id: number) {
    console.log('CategoryController.getCategoryById called with id:', id);
    try {
      // Perbaiki handling parameter
      const categoryId = typeof id === 'object' ? (id as any).id : id;
      const result = await this.categoryService.findUnique({
        where: { id: categoryId },
      });
      console.log('CategoryController.getCategoryById result:', result);
      return result;
    } catch (error) {
      console.error('Error in CategoryController.getCategoryById:', error);
      throw error;
    }
  }

  async getCategoryCount(): Promise<number> {
    return await this.categoryService.count({});
  }

  async createCategory(data: Prisma.CategoryCreateInput) {
    return await this.categoryService.create({ data });
  }

  async aggregate(categoryAggregateArgs: Prisma.CategoryAggregateArgs) {
    return await this.categoryService.aggregate(categoryAggregateArgs);
  }
}
