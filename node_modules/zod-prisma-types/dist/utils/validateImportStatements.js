"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateImportStatement = exports.IMPORT_STATEMENT_REGEX_PATTERN = exports.IMPORT_STATEMENT_REGEX = void 0;
const importStatementRegex = `(?<imports>[\\w\\s"@'\${}/,;:.~*-]+)`;
const importStatementRegexPattern = `(?<import>[\\w]+)(\\(\\[${importStatementRegex}\\]\\))`;
exports.IMPORT_STATEMENT_REGEX = new RegExp(importStatementRegex);
exports.IMPORT_STATEMENT_REGEX_PATTERN = new RegExp(importStatementRegexPattern);
const validateImportStatement = (importString, errorLocation) => {
    var _a, _b;
    const importStatementMatch = (_b = (_a = importString.match(exports.IMPORT_STATEMENT_REGEX_PATTERN)) === null || _a === void 0 ? void 0 : _a.groups) === null || _b === void 0 ? void 0 : _b['imports'];
    if (!importStatementMatch) {
        throw new Error(`[@zod generator error]: import statement is not valid. Check for unusal characters. ${errorLocation}`);
    }
    return importStatementMatch;
};
exports.validateImportStatement = validateImportStatement;
//# sourceMappingURL=validateImportStatements.js.map