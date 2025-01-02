"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseGeneratorConfig = void 0;
const getPrismaClientOutputPath_1 = require("./getPrismaClientOutputPath");
const getPrismaDbProvider_1 = require("./getPrismaDbProvider");
const schemas_1 = require("../schemas");
const getPrismaVersion_1 = require("./getPrismaVersion");
const getDecimalJSInstalled_1 = require("./getDecimalJSInstalled");
const parseGeneratorConfig = (generatorOptions) => {
    return schemas_1.configSchema.parse({
        ...generatorOptions.generator.config,
        ...(0, getPrismaClientOutputPath_1.getPrismaClientOutputPath)(generatorOptions),
        ...(0, getPrismaDbProvider_1.getPrismaClientProvider)(generatorOptions),
        prismaVersion: (0, getPrismaVersion_1.getPrismaVersion)(),
        decimalJSInstalled: (0, getDecimalJSInstalled_1.getDecimalJSInstalled)(),
    });
};
exports.parseGeneratorConfig = parseGeneratorConfig;
//# sourceMappingURL=parseGeneratorConfig.js.map