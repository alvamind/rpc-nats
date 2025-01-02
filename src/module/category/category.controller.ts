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
    this.nats.registerAll(this);
  }

  async getCategoryById(id: number) {
    return await this.categoryService.findUnique({ where: { id } });
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
