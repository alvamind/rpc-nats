"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transformImportStringToList = exports.IMPORT_STATEMENT_REGEX = void 0;
exports.IMPORT_STATEMENT_REGEX = /"(?<statement>[\w\s"'${}/,:@;.*-]+)"/;
const transformImportStringToList = (importString) => {
    const importList = importString
        .split(/(?<="),/g)
        .map((statement) => {
        var _a, _b;
        return (_b = (_a = statement
            .trim()
            .match(exports.IMPORT_STATEMENT_REGEX)) === null || _a === void 0 ? void 0 : _a.groups) === null || _b === void 0 ? void 0 : _b['statement'].replace(/["']/g, "'");
    })
        .filter((statement) => typeof statement === 'string');
    return importList;
};
exports.transformImportStringToList = transformImportStringToList;
//# sourceMappingURL=transformImportStringToList.js.map