"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExtendedDMMFModelValidatorPattern = exports.ALLOWED_TYPES_REGEX_PATTERN = exports.IMPORT_STATEMENT_REGEX_PATTERN = void 0;
const getNestedValidatorList_1 = require("../../utils/getNestedValidatorList");
const _03_extendedDMMFModelValidatorMatch_1 = require("./03_extendedDMMFModelValidatorMatch");
exports.IMPORT_STATEMENT_REGEX_PATTERN = /(@zod(?<validatorPattern>\..+?\))(?=\s|$))/;
exports.ALLOWED_TYPES_REGEX_PATTERN = /\.(import|error|parse|parseAsync|safeParse|safeParseAsync|refine|superRefine|transform|default|describe|catch|optional|nullable|nullish|array|promise|or|and|brand|readonly|pipe|shape|keyof|extend|merge|pick|omit|partial|deepPartial|required|passthrough|strict|strip|catchall)\(/;
const extractValidatorKeyword = (str) => {
    const match = str.match(/\.(.*?)\(/);
    return match ? match[1] : null;
};
class ExtendedDMMFModelValidatorPattern extends _03_extendedDMMFModelValidatorMatch_1.ExtendedDMMFModelValidatorMatch {
    constructor(generatorConfig, model) {
        super(generatorConfig, model);
        Object.defineProperty(this, "_validatorPattern", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "_validatorList", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this._validatorPattern = this._getValidatorPattern();
        this._validatorList = this._getValidatorList();
    }
    _getValidatorPattern() {
        var _a, _b;
        if (!this._validatorMatch)
            return;
        return (_b = (_a = this._validatorMatch) === null || _a === void 0 ? void 0 : _a.groups) === null || _b === void 0 ? void 0 : _b['validatorPattern'];
    }
    _getValidatorList() {
        if (!this._validatorPattern)
            return;
        const validatorList = (0, getNestedValidatorList_1.getNestedValidatorList)(this._validatorPattern);
        validatorList.forEach((validatorString) => {
            const validatorKeyword = extractValidatorKeyword(validatorString);
            const isValid = exports.ALLOWED_TYPES_REGEX_PATTERN.test(validatorString);
            if (!isValid) {
                throw new Error(`[@zod generator error]: '${validatorKeyword}' is not valid as validator. ${this._errorLocation}`);
            }
        });
        return validatorList;
    }
}
exports.ExtendedDMMFModelValidatorPattern = ExtendedDMMFModelValidatorPattern;
//# sourceMappingURL=04_extendedDMMFModelValidatorPattern.js.map