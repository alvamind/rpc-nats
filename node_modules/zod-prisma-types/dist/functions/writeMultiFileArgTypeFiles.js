"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeArgTypeFiles = void 0;
const classes_1 = require("../classes");
const contentWriters_1 = require("./contentWriters");
const writeArgTypeFiles = ({ path, dmmf }) => {
    if (!dmmf.generatorConfig.createInputTypes)
        return;
    const { outputTypePath, writeBarrelFiles } = dmmf.generatorConfig;
    const indexFileWriter = new classes_1.FileWriter();
    const folderPath = indexFileWriter.createPath(`${path}/${outputTypePath}`);
    if (folderPath) {
        if (writeBarrelFiles) {
            indexFileWriter.createFile(`${folderPath}/index.ts`, ({ writeExport }) => {
                const writeExportSet = new Set();
                dmmf.schema.outputObjectTypes.model.forEach((model) => {
                    if (model.hasRelationField()) {
                        writeExportSet.add(`${model.name}ArgsSchema`);
                    }
                });
                dmmf.schema.outputObjectTypes.argTypes.forEach((outputType) => {
                    outputType.prismaActionFields.forEach((field) => {
                        writeExportSet.add(`${field.argName}Schema`);
                    });
                });
                writeExportSet.forEach((exportName) => {
                    writeExport(`{ ${exportName} }`, `./${exportName}`);
                });
            });
        }
        dmmf.schema.outputObjectTypes.model.forEach((model) => {
            if (model.writeIncludeArgs()) {
                new classes_1.FileWriter().createFile(`${folderPath}/${model.name}ArgsSchema.ts`, (fileWriter) => (0, contentWriters_1.writeArgs)({ fileWriter, dmmf }, model));
            }
            if (model.writeCountArgs()) {
                new classes_1.FileWriter().createFile(`${folderPath}/${model.name}CountOutputTypeArgsSchema.ts`, (fileWriter) => (0, contentWriters_1.writeCountArgs)({ fileWriter, dmmf }, model));
                new classes_1.FileWriter().createFile(`${folderPath}/${model.name}CountOutputTypeSelectSchema.ts`, (fileWriter) => (0, contentWriters_1.writeCountSelect)({ fileWriter, dmmf }, model));
            }
        });
        dmmf.schema.outputObjectTypes.argTypes.forEach((outputType) => {
            outputType.prismaActionFields.forEach((field) => {
                new classes_1.FileWriter().createFile(`${folderPath}/${field.argName}Schema.ts`, (fileWriter) => (0, contentWriters_1.writeOutputObjectType)({ fileWriter, dmmf }, field));
            });
        });
    }
};
exports.writeArgTypeFiles = writeArgTypeFiles;
//# sourceMappingURL=writeMultiFileArgTypeFiles.js.map