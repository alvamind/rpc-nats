var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { CategoryService } from './category.service';
import { inject, injectable } from 'tsyringe-neo';
import { NATSAbstraction } from '../../nats/nats-abstraction';
let CategoryController = class CategoryController {
    categoryService;
    nats;
    constructor(categoryService, nats) {
        this.categoryService = categoryService;
        this.nats = nats;
        this.nats.registerAll(this);
    }
    async getCategoryById(id) {
        return await this.categoryService.findUnique({ where: { id } });
    }
    async getCategoryCount() {
        return await this.categoryService.count({});
    }
    async createCategory(data) {
        return await this.categoryService.create({ data });
    }
    async aggregate(categoryAggregateArgs) {
        return await this.categoryService.aggregate(categoryAggregateArgs);
    }
};
CategoryController = __decorate([
    injectable(),
    __param(0, inject(CategoryService)),
    __param(1, inject(NATSAbstraction)),
    __metadata("design:paramtypes", [CategoryService,
        NATSAbstraction])
], CategoryController);
export { CategoryController };
