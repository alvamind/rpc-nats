import { PrismaProxy } from "./PrismaProxy";
export class ExposedPrismaRepository {
    prismaProxy;
    constructor(model, prismaClient) {
        this.prismaProxy = new PrismaProxy(model, prismaClient);
    }
    create(args) {
        return this.prismaProxy.create(args);
    }
    createMany(args) {
        return this.prismaProxy.createMany(args);
    }
    createManyAndReturn(args) {
        return this.prismaProxy.createManyAndReturn(args);
    }
    delete(args) {
        return this.prismaProxy.delete(args);
    }
    deleteMany(args) {
        return this.prismaProxy.deleteMany(args);
    }
    findFirst(args) {
        return this.prismaProxy.findFirst(args);
    }
    findMany(args) {
        return this.prismaProxy.findMany(args);
    }
    findUnique(args) {
        return this.prismaProxy.findUnique(args);
    }
    update(args) {
        return this.prismaProxy.update(args);
    }
    updateMany(args) {
        return this.prismaProxy.updateMany(args);
    }
    upsert(args) {
        return this.prismaProxy.upsert(args);
    }
    $transaction(...args) {
        return this.prismaProxy.$transaction(...args);
    }
    $queryRaw(...args) {
        return this.prismaProxy.$queryRaw(...args);
    }
}
