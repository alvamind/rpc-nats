import { Prisma, PrismaClient, PrismaPromise } from "./PrismaClientForVault.js"
import { IPrismaDelegate } from "./IPrismaDelegate"
import { PrismaProxy } from "./PrismaProxy"

export abstract class EncapsulatedPrismaRepository<TModel extends IPrismaDelegate<TModel>> {
  private prismaProxy: PrismaProxy<TModel>

  constructor(model: TModel, prismaClient: PrismaClient) {
    this.prismaProxy = new PrismaProxy<TModel>(model, prismaClient)
  }

  protected create<TArgs extends Prisma.Args<TModel, "create">>(
    args: TArgs
  ): PrismaPromise<Prisma.Result<TModel, TArgs, "create">> {
    return this.prismaProxy.create(args)
  }

  protected createMany<TArgs extends Prisma.Args<TModel, "createMany">>(
    args: TArgs
  ): PrismaPromise<Prisma.Result<TModel, TArgs, "createMany">> {
    return this.prismaProxy.createMany(args)
  }

  protected createManyAndReturn<TArgs extends Prisma.Args<TModel, "createManyAndReturn">>(
    args: TArgs
  ): PrismaPromise<Prisma.Result<TModel, TArgs, "createManyAndReturn">> {
    return this.prismaProxy.createManyAndReturn(args)
  }

  protected delete<TArgs extends Prisma.Args<TModel, "delete">>(
    args: TArgs
  ): PrismaPromise<Prisma.Result<TModel, TArgs, "delete">> {
    return this.prismaProxy.delete(args)
  }

  protected deleteMany<TArgs extends Prisma.Args<TModel, "deleteMany">>(
    args: TArgs
  ): PrismaPromise<Prisma.Result<TModel, TArgs, "deleteMany">> {
    return this.prismaProxy.deleteMany(args)
  }

  protected findFirst<TArgs extends Prisma.Args<TModel, "findFirst">>(
    args: TArgs
  ): PrismaPromise<Prisma.Result<TModel, TArgs, "findFirst">> {
    return this.prismaProxy.findFirst(args)
  }

  protected findMany<TArgs extends Prisma.Args<TModel, "findMany">>(
    args: TArgs
  ): PrismaPromise<Prisma.Result<TModel, TArgs, "findMany">> {
    return this.prismaProxy.findMany(args)
  }

  protected findUnique<TArgs extends Prisma.Args<TModel, "findUnique">>(
    args: TArgs
  ): PrismaPromise<Prisma.Result<TModel, TArgs, "findUnique">> {
    return this.prismaProxy.findUnique(args)
  }

  protected update<TArgs extends Prisma.Args<TModel, "update">>(
    args: TArgs
  ): PrismaPromise<Prisma.Result<TModel, TArgs, "update">> {
    return this.prismaProxy.update(args)
  }

  protected updateMany<TArgs extends Prisma.Args<TModel, "updateMany">>(
    args: TArgs
  ): PrismaPromise<Prisma.Result<TModel, TArgs, "updateMany">> {
    return this.prismaProxy.updateMany(args)
  }

  protected upsert<TArgs extends Prisma.Args<TModel, "upsert">>(
    args: TArgs
  ): PrismaPromise<Prisma.Result<TModel, TArgs, "upsert">> {
    return this.prismaProxy.upsert(args)
  }

  protected $transaction(...args: Parameters<PrismaClient["$transaction"]>) {
    return this.prismaProxy.$transaction(...args)
  }

  protected $queryRaw(...args: Parameters<PrismaClient["$queryRaw"]>) {
    return this.prismaProxy.$queryRaw(...args)
  }
}

