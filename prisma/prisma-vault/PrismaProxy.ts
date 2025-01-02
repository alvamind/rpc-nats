import { Prisma, PrismaClient, PrismaPromise } from "./PrismaClientForVault.js"
import { IPrismaDelegate } from "./IPrismaDelegate.js"

export class PrismaProxy<TModel extends IPrismaDelegate<TModel>> {
  constructor(private model: TModel, private prismaClient: PrismaClient) {}

  create<TArgs extends Prisma.Args<TModel, "create">>(
    args: TArgs
  ): PrismaPromise<Prisma.Result<TModel, TArgs, "create">> {
    return this.model.create(args)
  }

  createMany<TArgs extends Prisma.Args<TModel, "createMany">>(
    args: TArgs
  ): PrismaPromise<Prisma.Result<TModel, TArgs, "createMany">> {
    return this.model.createMany(args)
  }

  createManyAndReturn<TArgs extends Prisma.Args<TModel, "createManyAndReturn">>(
    args: TArgs
  ): PrismaPromise<Prisma.Result<TModel, TArgs, "createManyAndReturn">> {
    return this.model.createManyAndReturn(args)
  }

  delete<TArgs extends Prisma.Args<TModel, "delete">>(
    args: TArgs
  ): PrismaPromise<Prisma.Result<TModel, TArgs, "delete">> {
    return this.model.delete(args)
  }

  deleteMany<TArgs extends Prisma.Args<TModel, "deleteMany">>(
    args: TArgs
  ): PrismaPromise<Prisma.Result<TModel, TArgs, "deleteMany">> {
    return this.model.deleteMany(args)
  }

  findFirst<TArgs extends Prisma.Args<TModel, "findFirst">>(
    args: TArgs
  ): PrismaPromise<Prisma.Result<TModel, TArgs, "findFirst">> {
    return this.model.findFirst(args)
  }

  findMany<TArgs extends Prisma.Args<TModel, "findMany">>(
    args: TArgs
  ): PrismaPromise<Prisma.Result<TModel, TArgs, "findMany">> {
    return this.model.findMany(args)
  }

  findUnique<TArgs extends Prisma.Args<TModel, "findUnique">>(
    args: TArgs
  ): PrismaPromise<Prisma.Result<TModel, TArgs, "findUnique">> {
    return this.model.findUnique(args)
  }

  update<TArgs extends Prisma.Args<TModel, "update">>(
    args: TArgs
  ): PrismaPromise<Prisma.Result<TModel, TArgs, "update">> {
    return this.model.update(args)
  }

  updateMany<TArgs extends Prisma.Args<TModel, "updateMany">>(
    args: TArgs
  ): PrismaPromise<Prisma.Result<TModel, TArgs, "updateMany">> {
    return this.model.updateMany(args)
  }

  upsert<TArgs extends Prisma.Args<TModel, "upsert">>(
    args: TArgs
  ): PrismaPromise<Prisma.Result<TModel, TArgs, "upsert">> {
    return this.model.upsert(args)
  }

  $transaction(...args: Parameters<PrismaClient["$transaction"]>) {
    return this.prismaClient.$transaction(...args)
  }

  $queryRaw(...args: Parameters<PrismaClient["$queryRaw"]>) {
    return this.prismaClient.$queryRaw(...args)
  }
}
