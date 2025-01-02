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
import { ProductService } from './product.service';
import { inject, injectable } from 'tsyringe-neo';
import { NATSAbstraction } from '../../nats/nats-abstraction';
let ProductController = class ProductController {
    productService;
    nats;
    constructor(productService, nats) {
        this.productService = productService;
        this.nats = nats;
        this.nats.registerAll(this);
    }
    async getProductById(id) {
        return await this.findUnique({ where: { id } });
    }
    async getProductCount() {
        return await this.productService.count({});
    }
    async createProduct(data) {
        return await this.create({ data });
    }
    async aggregate(productAggregateArgs) {
        return await this.productService.aggregate(productAggregateArgs);
    }
};
ProductController = __decorate([
    injectable(),
    __param(0, inject(ProductService)),
    __param(1, inject(NATSAbstraction)),
    __metadata("design:paramtypes", [ProductService,
        NATSAbstraction])
], ProductController);
export { ProductController };
