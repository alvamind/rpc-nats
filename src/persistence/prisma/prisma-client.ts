// src/persistence/prisma/prisma-client.ts
import { PrismaClient } from '@prisma/client';
import { logger } from '../../common/utils/logger.utils';

export const prismaClient = new PrismaClient();

prismaClient
  .$connect()
  .then(() => {
    logger.info('Successfully connected to database');
  })
  .catch((e) => {
    logger.error(`Failed to connect to database ${e}`);
  });
