import { logger } from "../utils/logger.utils.js";
import { CustomError } from "../exceptions/custom-error.exception.js";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
export class PrismaControllerGeneric {
    modelService;
    schema;
    constructor(modelService, schema) {
        this.modelService = modelService;
        this.schema = schema;
        logger.info(`${this.constructor.name} initialized`);
    }
    handlePrismaError(error) {
        if (error instanceof PrismaClientKnownRequestError) {
            logger.error("Prisma error:", error);
            throw new CustomError(error);
        }
        if (error instanceof Error) {
            logger.error("Non-Prisma error:", error);
            throw new CustomError(error);
        }
        logger.error("Unknown error:", error);
        throw new CustomError("Unknown error");
    }
    validateData(data) {
        if (!this.schema) {
            return data;
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
    async create(args) {
        try {
            const validatedData = this.validateData(args.data);
            return await this.modelService.create({ ...args, data: validatedData });
        }
        catch (error) {
            this.handlePrismaError(error);
            throw error; // Rethrow the error after handling
        }
    }
    async createMany(args) {
        try {
            return await this.modelService.createMany(args);
        }
        catch (error) {
            this.handlePrismaError(error);
            throw error;
        }
    }
    async delete(args) {
        try {
            return await this.modelService.delete(args);
        }
        catch (error) {
            this.handlePrismaError(error);
            throw error;
        }
    }
    async deleteMany(args) {
        try {
            return await this.modelService.deleteMany(args);
        }
        catch (error) {
            this.handlePrismaError(error);
            throw error;
        }
    }
    async findFirst(args) {
        try {
            return await this.modelService.findFirst(args);
        }
        catch (error) {
            this.handlePrismaError(error);
            throw error;
        }
    }
    async findMany(args) {
        try {
            return await this.modelService.findMany(args);
        }
        catch (error) {
            this.handlePrismaError(error);
            throw error;
        }
    }
    async findUnique(args) {
        try {
            return await this.modelService.findUnique(args);
        }
        catch (error) {
            this.handlePrismaError(error);
            throw error;
        }
    }
    async update(args) {
        try {
            const validatedData = this.validateData(args.data);
            return await this.modelService.update({ ...args, data: validatedData });
        }
        catch (error) {
            this.handlePrismaError(error);
            throw error;
        }
    }
    async updateMany(args) {
        try {
            return await this.modelService.updateMany(args);
        }
        catch (error) {
            this.handlePrismaError(error);
            throw error;
        }
    }
    async upsert(args) {
        try {
            return await this.modelService.upsert(args);
        }
        catch (error) {
            this.handlePrismaError(error);
            throw error;
        }
    }
    $transaction(...args) {
        return this.modelService.$transaction(...args);
    }
    $queryRaw(...args) {
        return this.modelService.$queryRaw(...args);
    }
}
