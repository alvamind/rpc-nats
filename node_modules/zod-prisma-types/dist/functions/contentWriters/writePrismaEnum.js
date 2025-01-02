"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.writePrismaEnum = void 0;
const writePrismaEnum = ({ fileWriter: { writer, writeImport }, dmmf, getSingleFileContent = false, }, { useNativeEnum, values, name }) => {
    const { useMultipleFiles, prismaClientPath } = dmmf.generatorConfig;
    if (useMultipleFiles && !getSingleFileContent) {
        writeImport('{ z }', 'zod');
    }
    if (useNativeEnum) {
        writer.blankLine().write(`export const ${name}Schema = z.enum([`);
        values.forEach((value, idx) => {
            const writeComma = idx !== values.length - 1;
            writer.write(`'${value}'${writeComma ? ',' : ''}`);
        });
        writer.write(`]);`);
    }
    else {
        if (name === 'JsonNullValueInput') {
            writer
                .conditionalWrite(useMultipleFiles, `import { Prisma } from '${prismaClientPath}';`)
                .blankLine()
                .write(`export const ${name}Schema = z.enum([`);
            values.forEach((value) => {
                writer.write(`'${value}',`);
            });
            writer.write(`]).transform((value) => (value === 'JsonNull' ? Prisma.JsonNull : value));`);
            return;
        }
        if (name === 'NullableJsonNullValueInput') {
            writer
                .conditionalWrite(useMultipleFiles, `import { Prisma } from '${prismaClientPath}';`)
                .blankLine()
                .write(`export const ${name}Schema = z.enum([`);
            values.forEach((value) => {
                writer.write(`'${value}',`);
            });
            writer.write(`]).transform((value) => value === 'JsonNull' ? Prisma.JsonNull : value === 'DbNull' ? Prisma.DbNull : value);`);
            return;
        }
        if (name === 'JsonNullValueFilter') {
            writer
                .conditionalWrite(useMultipleFiles, `import { Prisma } from '${prismaClientPath}';`)
                .blankLine()
                .write(`export const ${name}Schema = z.enum([`);
            values.forEach((value) => {
                writer.write(`'${value}',`);
            });
            writer.write(`]).transform((value) => value === 'JsonNull' ? Prisma.JsonNull : value === 'DbNull' ? Prisma.JsonNull : value === 'AnyNull' ? Prisma.AnyNull : value);`);
            return;
        }
        writer
            .write(`export const ${name}Schema = z.enum([`);
        values.forEach((value) => {
            writer.write(`'${value}',`);
        });
        writer.write(`])`);
    }
    if (useMultipleFiles && !getSingleFileContent) {
        writer.blankLine().writeLine(`export default ${name}Schema;`);
    }
};
exports.writePrismaEnum = writePrismaEnum;
//# sourceMappingURL=writePrismaEnum.js.map