"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeSingleFileTypeStatements = void 0;
const contentWriters_1 = require("./contentWriters");
const writeSingleFileTypeStatements = (dmmf, fileWriter) => {
    if (!dmmf.generatorConfig.createModelTypes ||
        dmmf.datamodel.types.length === 0)
        return;
    fileWriter.writer.blankLine();
    fileWriter.writeHeading(`COMPOSITE TYPES`, 'FAT');
    dmmf.datamodel.types.forEach((type) => {
        fileWriter.writeHeading(`${type.formattedNames.upperCaseSpace}`, 'SLIM');
        fileWriter.writer.newLine();
        (0, contentWriters_1.writeModelOrType)({ fileWriter, dmmf }, type);
        fileWriter.writer.newLine();
    });
};
exports.writeSingleFileTypeStatements = writeSingleFileTypeStatements;
//# sourceMappingURL=writeSingleFileTypeStatements.js.map