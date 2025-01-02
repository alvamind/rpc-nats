"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeJson = void 0;
const writeJson = ({ writer, field }) => {
    writer
        .conditionalWrite(field.omitInModel(), '// omitted: ')
        .write(`${field.formattedNames.original}: JsonValueSchema`)
        .conditionalWrite(field.isList, `.array()`)
        .conditionalWrite(field.isNullable, `.nullable()`)
        .write(`,`)
        .newLine();
};
exports.writeJson = writeJson;
//# sourceMappingURL=writeModelJson.js.map