"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExtendedDMMFFieldImportMatch = void 0;
const transformImportStringToList_1 = require("../../utils/transformImportStringToList");
const validateImportStatements_1 = require("../../utils/validateImportStatements");
const _12_extendedDMMFFieldZodType_1 = require("./12_extendedDMMFFieldZodType");
class ExtendedDMMFFieldImportMatch extends _12_extendedDMMFFieldZodType_1.ExtendedDMMFFieldZodType {
    constructor(field, generatorConfig, modelName) {
        super(field, generatorConfig, modelName);
        Object.defineProperty(this, "_importStatements", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "imports", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this._importStatements = this._getImportStatement();
        this.imports = this._getImports();
    }
    _getImportStatement() {
        var _a, _b, _c, _d;
        if (!((_b = (_a = this._validatorMatch) === null || _a === void 0 ? void 0 : _a.groups) === null || _b === void 0 ? void 0 : _b['import']))
            return;
        return (0, validateImportStatements_1.validateImportStatement)((_d = (_c = this._validatorMatch) === null || _c === void 0 ? void 0 : _c.groups) === null || _d === void 0 ? void 0 : _d['import'], this._errorLocation);
    }
    _getImports() {
        if (!this._importStatements)
            return new Set([]);
        return new Set((0, transformImportStringToList_1.transformImportStringToList)(this._importStatements));
    }
}
exports.ExtendedDMMFFieldImportMatch = ExtendedDMMFFieldImportMatch;
//# sourceMappingURL=13_extendedDMMFFieldImportMatch.js.map