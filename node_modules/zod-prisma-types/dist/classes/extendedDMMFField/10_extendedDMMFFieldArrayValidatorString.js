"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExtendedDMMFFieldArrayValidatorString = exports.ARRAY_VALIDATOR_REGEX_MAP = exports.ARRAY_VALIDATOR_WITH_MESSAGE_REGEX = exports.ARRAY_VALIDATOR_NUMBER_OR_STRING_AND_MESSAGE_REGEX = exports.ARRAY_VALIDATOR_NUMBER_AND_MESSAGE_REGEX = void 0;
const _09_extendedDMMFFieldCustomValidatorString_1 = require("./09_extendedDMMFFieldCustomValidatorString");
const _07_extendedDMMFFieldValidatorMap_1 = require("./07_extendedDMMFFieldValidatorMap");
const getNestedValidatorList_1 = require("../../utils/getNestedValidatorList");
const removeUseContent_1 = require("../../utils/removeUseContent");
exports.ARRAY_VALIDATOR_NUMBER_AND_MESSAGE_REGEX = /.(?<validator>min|max|length|nonempty)\((?<number>[\d]+)([,][ ]?)?(?<message>[{][ ]?message:[ ]?['"][\w\W\p{Script=Hiragana}\p{Script=Katakana}\p{Script=Han}]+['"][ ]?[}])?\)/u;
exports.ARRAY_VALIDATOR_NUMBER_OR_STRING_AND_MESSAGE_REGEX = /.(?<validator>min|max|length|nonempty)\((?<number>[\w.]+)([,][ ]?)?(?<message>[{][ ]?message:[ ]?['"][\w\W\p{Script=Hiragana}\p{Script=Katakana}\p{Script=Han}]+['"][ ]?[}])?\)/u;
exports.ARRAY_VALIDATOR_WITH_MESSAGE_REGEX = /(?<validator>nonempty)(\((?<message>[{][ ]?message:[ ]?['"][\w\W\p{Script=Hiragana}\p{Script=Katakana}\p{Script=Han}]+['"][ ]?[}])?\))/u;
exports.ARRAY_VALIDATOR_REGEX_MAP = {
    min: exports.ARRAY_VALIDATOR_NUMBER_OR_STRING_AND_MESSAGE_REGEX,
    max: exports.ARRAY_VALIDATOR_NUMBER_OR_STRING_AND_MESSAGE_REGEX,
    length: exports.ARRAY_VALIDATOR_NUMBER_OR_STRING_AND_MESSAGE_REGEX,
    nonempty: exports.ARRAY_VALIDATOR_WITH_MESSAGE_REGEX,
};
class ExtendedDMMFFieldArrayValidatorString extends _09_extendedDMMFFieldCustomValidatorString_1.ExtendedDMMFFieldCustomValidatorString {
    constructor(field, generatorConfig, modelName) {
        super(field, generatorConfig, modelName);
        Object.defineProperty(this, "zodArrayValidatorString", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.zodArrayValidatorString = this._getZodArrayValidatorString();
    }
    _getZodArrayValidatorString() {
        if (!this._validatorType)
            return this.zodArrayValidatorString;
        return this._validatorIsValid()
            ? this._extractArrayPattern()
            : this.zodArrayValidatorString;
    }
    _extractArrayPattern() {
        var _a, _b, _c, _d;
        const validatorList = (_a = this._getZodValidatorListArray()) === null || _a === void 0 ? void 0 : _a.map((elem) => {
            if (!elem.includes('.use('))
                return elem;
            return (0, removeUseContent_1.removeUseContent)(elem);
        });
        const pattern = (_d = (_c = (_b = validatorList === null || validatorList === void 0 ? void 0 : validatorList.find((pattern) => pattern.includes('.array'))) === null || _b === void 0 ? void 0 : _b.match(_07_extendedDMMFFieldValidatorMap_1.ARRAY_VALIDATOR_MESSAGE_REGEX)) === null || _c === void 0 ? void 0 : _c.groups) === null || _d === void 0 ? void 0 : _d['pattern'];
        if (pattern && !this.isList) {
            throw new Error(`[@zod generator error]: '.array' validator is only allowed on lists. ${this._errorLocation}`);
        }
        return this._getValidArrayPattern(pattern);
    }
    _getValidArrayPattern(pattern) {
        if (!pattern)
            return;
        const validatorList = this._getArrayValidatorList(pattern);
        validatorList.forEach((pattern) => {
            const isValid = this._validateRegexInMap(exports.ARRAY_VALIDATOR_REGEX_MAP, {
                key: this._getValidatorKeyFromPattern(pattern),
                pattern,
            });
            if (!isValid) {
                throw new Error(`[@zod generator error]: '${pattern}' is not valid as array validator. ${this._errorLocation}`);
            }
        });
        return pattern;
    }
    _getArrayValidatorList(pattern) {
        return (0, getNestedValidatorList_1.getNestedValidatorList)(pattern);
    }
}
exports.ExtendedDMMFFieldArrayValidatorString = ExtendedDMMFFieldArrayValidatorString;
//# sourceMappingURL=10_extendedDMMFFieldArrayValidatorString.js.map