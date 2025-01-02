"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeRelation = void 0;
const _1 = require(".");
const writeRelation = ({ writer, field, writeOptionalDefaults = false, isPartial = false, isOptionalDefaults = false, }) => {
    writer
        .conditionalWrite(field.omitInModel(), '// omitted: ')
        .write(`${field.name}: `)
        .write(`z.lazy(() => ${field.type}`)
        .conditionalWrite(isPartial, 'Partial')
        .conditionalWrite(isOptionalDefaults, 'OptionalDefaults')
        .conditionalWrite(!field.isCompositeType, 'WithRelations')
        .write('Schema)');
    (0, _1.writeFieldAdditions)({ writer, field, writeOptionalDefaults });
};
exports.writeRelation = writeRelation;
//# sourceMappingURL=writeModelRelation.js.map