"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPrismaVersion = exports.PrismaVersionSchema = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const zod_1 = require("zod");
exports.PrismaVersionSchema = zod_1.z.object({
    major: zod_1.z.number(),
    minor: zod_1.z.number(),
    patch: zod_1.z.number(),
});
const getPrismaVersion = () => {
    try {
        const rawData = fs_1.default.readFileSync(path_1.default.join(process.cwd(), 'package.json'), 'utf-8');
        const jsonData = JSON.parse(rawData);
        let prismaVersion = jsonData['dependencies']['@prisma/client'];
        prismaVersion = prismaVersion.replace(/^[\^=~<>*]/, '');
        const [major, minor, patch] = prismaVersion.split('.').map(Number);
        const version = exports.PrismaVersionSchema.parse({ major, minor, patch });
        return version;
    }
    catch (error) {
        console.error(`Error reading package.json: ${error}`);
        return undefined;
    }
};
exports.getPrismaVersion = getPrismaVersion;
//# sourceMappingURL=getPrismaVersion.js.map