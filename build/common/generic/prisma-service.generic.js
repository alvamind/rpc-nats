import { PrismaProxy } from "./generated/PrismaProxy.js";
import { logger } from "../utils/logger.utils.js";
import { CustomError } from "../exceptions/custom-error.exception.js";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
export class PrismaServiceGeneric {
    prismaProxy;
    schema;
    constructor(model, prismaClient, schema) {
        this.prismaProxy = new PrismaProxy(model, prismaClient);
        this.schema = schema;
        logger.info(`${this.constructor.name} initialized`);
    }
    handlePrismaError(error) {
        if (error instanceof PrismaClientKnownRequestError) {
            logger.error('Prisma error:', error);
            throw new CustomError(error);
        }
        if (error instanceof Error) {
            logger.error('Non-Prisma error:', error);
            throw new CustomError(error);
        }
        logger.error('Unknown error:', error);
        throw new CustomError('Unknown error');
    }
    validateData(data) {
        if (!this.schema) {
            return data; // Skip validation if no schema is defined
        }
        try {
            const parsedData = this.schema.parse(data);
            return parsedData;
        }
        catch (error) {
            logger.error('Zod validation error:', error.errors);
            throw new CustomError(`Zod validation error: ${error.errors.map((err) => err.message).join(", ")}`);
        }
    }
    create(args) {
        try {
            const validatedData = this.validateData(args.data);
            return this.prismaProxy.create({ ...args, data: validatedData });
        }
        catch (error) {
            this.handlePrismaError(error);
            throw error;
        }
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
        try {
            const validatedData = this.validateData(args.data);
            return this.prismaProxy.update({ ...args, data: validatedData });
        }
        catch (error) {
            this.handlePrismaError(error);
            throw error;
        }
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
