"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExtendedDMMFModelValidatorMatch = exports.IMPORT_STATEMENT_REGEX_PATTERN = void 0;
const _02_extendedDMMFModelFlags_1 = require("./02_extendedDMMFModelFlags");
exports.IMPORT_STATEMENT_REGEX_PATTERN = /@zod(?<validatorPattern>[\w\p{Script=Latin}\p{Script=Hiragana}\p{Script=Katakana}\p{Script=Han}\p{Punctuation}\p{M}\p{N} (),.'"。、|\\:+*#!§$%&/{}[\]=?~><°^\\-]*[)])/u;
class ExtendedDMMFModelValidatorMatch extends _02_extendedDMMFModelFlags_1.ExtendedDMMFModelFlags {
    constructor(generatorConfig, model) {
        super(generatorConfig, model);
        Object.defineProperty(this, "_validatorMatch", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "clearedDocumentation", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this._validatorMatch = this._getValidatorMatchArray();
        this.clearedDocumentation = this._getClearedDocumentation();
    }
    _getValidatorMatchArray() {
        var _a;
        if (!this.documentation)
            return;
        return ((_a = this.documentation.match(exports.IMPORT_STATEMENT_REGEX_PATTERN)) !== null && _a !== void 0 ? _a : undefined);
    }
    _getClearedDocumentation() {
        var _a;
        if (!this.documentation)
            return;
        return ((_a = this.documentation
            .replace(exports.IMPORT_STATEMENT_REGEX_PATTERN, '')
            .replace('  ', ' ')
            .trim()) !== null && _a !== void 0 ? _a : undefined);
    }
}
exports.ExtendedDMMFModelValidatorMatch = ExtendedDMMFModelValidatorMatch;
//# sourceMappingURL=03_extendedDMMFModelValidatorMatch.js.map