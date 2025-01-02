import { z } from 'zod';
export declare const PrismaVersionSchema: z.ZodObject<{
    major: z.ZodNumber;
    minor: z.ZodNumber;
    patch: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    major: number;
    minor: number;
    patch: number;
}, {
    major: number;
    minor: number;
    patch: number;
}>;
export type PrismaVersion = z.infer<typeof PrismaVersionSchema>;
export declare const getPrismaVersion: () => {
    major: number;
    minor: number;
    patch: number;
} | undefined;
//# sourceMappingURL=getPrismaVersion.d.ts.map