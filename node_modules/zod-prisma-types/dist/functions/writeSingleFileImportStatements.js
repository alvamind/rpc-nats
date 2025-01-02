"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeSingleFileImportStatements = void 0;
const writeSingleFileImportStatements = (dmmf, { writer, writeImport }) => {
    const { prismaClientPath, decimalJSInstalled } = dmmf.generatorConfig;
    writeImport('{ z }', 'zod');
    if (dmmf.schema.hasJsonTypes || dmmf.schema.hasDecimalTypes) {
        writeImport(`{ Prisma }`, `${prismaClientPath}`);
    }
    else {
        writeImport(`type { Prisma }`, `${prismaClientPath}`);
    }
    if (dmmf.schema.hasDecimalTypes && decimalJSInstalled) {
        writeImport(`Decimal`, 'decimal.js');
    }
    if (dmmf.customImports) {
        dmmf.customImports.forEach((statement) => {
            writer.writeLine(statement);
        });
    }
};
exports.writeSingleFileImportStatements = writeSingleFileImportStatements;
//# sourceMappingURL=writeSingleFileImportStatements.js.map