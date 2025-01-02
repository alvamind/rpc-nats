"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExtendedDMMFFieldValidatorCustomErrors = void 0;
const _05_extendedDMMFFieldDefaultValidators_1 = require("./05_extendedDMMFFieldDefaultValidators");
const validateCustomError_1 = require("../../utils/validateCustomError");
class ExtendedDMMFFieldValidatorCustomErrors extends _05_extendedDMMFFieldDefaultValidators_1.ExtendedDMMFFieldDefaultValidators {
    constructor(field, generatorConfig, modelName) {
        super(field, generatorConfig, modelName);
        Object.defineProperty(this, "_validatorCustomError", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "zodCustomErrors", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this._validatorCustomError = this._setValidatorCustomError();
        this.zodCustomErrors = this._setZodCustomErrors();
    }
    _setValidatorCustomError() {
        var _a, _b;
        if (!this._validatorMatch)
            return;
        return (_b = (_a = this._validatorMatch) === null || _a === void 0 ? void 0 : _a.groups) === null || _b === void 0 ? void 0 : _b['customErrors'];
    }
    _setZodCustomErrors() {
        if (!this._validatorCustomError)
            return;
        return (0, validateCustomError_1.validateCustomError)(this._validatorCustomError, this._errorLocation);
    }
}
exports.ExtendedDMMFFieldValidatorCustomErrors = ExtendedDMMFFieldValidatorCustomErrors;
//# sourceMappingURL=06_extendedDMMFFieldValidatorCustomErrors.js.map