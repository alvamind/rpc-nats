"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExtendedDMMFModelCustomErrors = void 0;
const _05_extendedDMMFModelImportStatement_1 = require("./05_extendedDMMFModelImportStatement");
const validateCustomError_1 = require("../../utils/validateCustomError");
class ExtendedDMMFModelCustomErrors extends _05_extendedDMMFModelImportStatement_1.ExtendedDMMFModelImportStatement {
    constructor(generatorConfig, model) {
        super(generatorConfig, model);
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
        if (!this._validatorList)
            return;
        const validatorCustomError = this._validatorList.filter((elem) => elem.includes('.error('));
        if (validatorCustomError.length > 1) {
            throw new Error(`[@zod generator error]: Only one error message property can be set. ${this._errorLocation}`);
        }
        if (validatorCustomError.length === 0)
            return;
        return validatorCustomError[0].replace('.error', '');
    }
    _setZodCustomErrors() {
        if (!this._validatorCustomError)
            return;
        return (0, validateCustomError_1.validateCustomError)(this._validatorCustomError, this._errorLocation);
    }
}
exports.ExtendedDMMFModelCustomErrors = ExtendedDMMFModelCustomErrors;
//# sourceMappingURL=06_extendedDMMFModelCustomErrors.js.map