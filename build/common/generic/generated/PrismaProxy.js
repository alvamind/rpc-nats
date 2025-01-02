export class PrismaProxy {
    model;
    prismaClient;
    constructor(model, prismaClient) {
        this.model = model;
        this.prismaClient = prismaClient;
    }
    create(args) {
        return this.model.create(args);
    }
    createMany(args) {
        return this.model.createMany(args);
    }
    createManyAndReturn(args) {
        return this.model.createManyAndReturn(args);
    }
    delete(args) {
        return this.model.delete(args);
    }
    deleteMany(args) {
        return this.model.deleteMany(args);
    }
    findFirst(args) {
        return this.model.findFirst(args);
    }
    findMany(args) {
        return this.model.findMany(args);
    }
    findUnique(args) {
        return this.model.findUnique(args);
    }
    update(args) {
        return this.model.update(args);
    }
    updateMany(args) {
        return this.model.updateMany(args);
    }
    upsert(args) {
        return this.model.upsert(args);
    }
    $transaction(...args) {
        return this.prismaClient.$transaction(...args);
    }
    $queryRaw(...args) {
        return this.prismaClient.$queryRaw(...args);
    }
}
