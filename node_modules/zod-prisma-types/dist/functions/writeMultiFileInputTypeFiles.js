"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeInputTypeFiles = void 0;
const _1 = require(".");
const classes_1 = require("../classes");
const writeInputTypeFiles = ({ path, dmmf }) => {
    const { inputTypePath, writeBarrelFiles } = dmmf.generatorConfig;
    const indexFileWriter = new classes_1.FileWriter();
    const folderPath = indexFileWriter.createPath(`${path}/${inputTypePath}`);
    if (folderPath) {
        if (writeBarrelFiles) {
            indexFileWriter.createFile(`${folderPath}/index.ts`, ({ writeExport }) => {
                const writeExportSet = new Set();
                if (dmmf.generatorConfig.createInputTypes) {
                    dmmf.schema.inputObjectTypes.prisma.forEach((inputType) => {
                        writeExportSet.add(`${inputType.name}Schema`);
                    });
                }
                dmmf.schema.enumTypes.prisma.forEach((enumData) => {
                    writeExportSet.add(`${enumData.name}Schema`);
                });
                dmmf.datamodel.enums.forEach((enumData) => {
                    writeExportSet.add(`${enumData.name}Schema`);
                });
                if (dmmf.schema.hasJsonTypes) {
                    writeExportSet.add(`InputJsonValueSchema`);
                    writeExportSet.add(`JsonValueSchema`);
                }
                if (dmmf.schema.hasDecimalTypes) {
                    writeExportSet.add(`DecimalJsLikeSchema`);
                    writeExportSet.add(`isValidDecimalInput`);
                }
                writeExportSet.forEach((exportName) => {
                    writeExport(`{ ${exportName} }`, `./${exportName}`);
                });
            });
        }
        if (dmmf.schema.hasJsonTypes) {
            new classes_1.FileWriter().createFile(`${folderPath}/JsonValueSchema.ts`, (fileWriter) => (0, _1.writeJsonValue)({ fileWriter, dmmf }));
            new classes_1.FileWriter().createFile(`${folderPath}/InputJsonValueSchema.ts`, (fileWriter) => (0, _1.writeInputJsonValue)({ fileWriter, dmmf }));
        }
        if (dmmf.schema.hasDecimalTypes) {
            new classes_1.FileWriter().createFile(`${folderPath}/DecimalJsLikeSchema.ts`, (fileWriter) => (0, _1.writeDecimalJsLike)({ fileWriter, dmmf }));
            new classes_1.FileWriter().createFile(`${folderPath}/isValidDecimalInput.ts`, (fileWriter) => (0, _1.writeIsValidDecimalInput)({ fileWriter, dmmf }));
        }
        dmmf.schema.enumTypes.prisma.forEach((enumData) => {
            new classes_1.FileWriter().createFile(`${folderPath}/${enumData.name}Schema.ts`, (fileWriter) => (0, _1.writePrismaEnum)({ fileWriter, dmmf }, enumData));
        });
        dmmf.datamodel.enums.forEach((enumData) => {
            new classes_1.FileWriter().createFile(`${folderPath}/${enumData.name}Schema.ts`, (fileWriter) => (0, _1.writeCustomEnum)({ fileWriter, dmmf }, enumData));
        });
        if (!dmmf.generatorConfig.createInputTypes)
            return;
        dmmf.schema.outputObjectTypes.model.forEach((model) => {
            if (model.hasRelationField()) {
                new classes_1.FileWriter().createFile(`${folderPath}/${model.name}IncludeSchema.ts`, (fileWriter) => (0, _1.writeInclude)({ fileWriter, dmmf }, model));
            }
            new classes_1.FileWriter().createFile(`${folderPath}/${model.name}SelectSchema.ts`, (fileWriter) => (0, _1.writeSelect)({ fileWriter, dmmf }, model));
        });
        dmmf.schema.inputObjectTypes.prisma.forEach((inputType) => {
            new classes_1.FileWriter().createFile(`${folderPath}/${inputType.name}Schema.ts`, (fileWriter) => (0, _1.writeInputObjectType)({ fileWriter, dmmf }, inputType));
        });
    }
};
exports.writeInputTypeFiles = writeInputTypeFiles;
//# sourceMappingURL=writeMultiFileInputTypeFiles.js.map