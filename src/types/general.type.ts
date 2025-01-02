import { appRouter, trpc } from '../config/trpc.config';
import { ContextWithContainer } from '../elysia.context';

export type TRPC = typeof trpc;
export type AppRouter = typeof appRouter;
export interface RetryConfigInterface {
  maxRetries: number;
  initialDelay: number;
  maxDelay: number;
  factor: number;
}
export type TRPCContext = ContextWithContainer;

export interface Category {
  id: number;
  name: string;
  description: string;
  createdAt?: Date;
  updatedAt?: Date;
}
