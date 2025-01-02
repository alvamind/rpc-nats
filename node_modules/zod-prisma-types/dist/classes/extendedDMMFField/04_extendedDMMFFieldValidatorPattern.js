"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExtendedDMMFFieldValidatorPattern = void 0;
const _03_extendedDMMFFieldValidatorType_1 = require("./03_extendedDMMFFieldValidatorType");
const getNestedValidatorList_1 = require("../../utils/getNestedValidatorList");
const removeUseContent_1 = require("../../utils/removeUseContent");
class ExtendedDMMFFieldValidatorPattern extends _03_extendedDMMFFieldValidatorType_1.ExtendedDMMFFieldValidatorType {
    constructor(field, generatorConfig, modelName) {
        super(field, generatorConfig, modelName);
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
        return (0, getNestedValidatorList_1.getNestedValidatorList)(this._validatorPattern);
    }
    _getZodValidatorListWithoutArray() {
        var _a;
        return (_a = this._validatorList) === null || _a === void 0 ? void 0 : _a.filter((elem) => {
            const removedUseContentElem = (0, removeUseContent_1.removeUseContent)(elem);
            return !removedUseContentElem.includes('.array');
        });
    }
    _getZodValidatorListArray() {
        var _a;
        return (_a = this._validatorList) === null || _a === void 0 ? void 0 : _a.filter((elem) => {
            const removedUseContentElem = (0, removeUseContent_1.removeUseContent)(elem);
            return removedUseContentElem.includes('.array');
        });
    }
}
exports.ExtendedDMMFFieldValidatorPattern = ExtendedDMMFFieldValidatorPattern;
//# sourceMappingURL=04_extendedDMMFFieldValidatorPattern.js.map