"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExtendedDMMFModelCustomValidators = void 0;
const _06_extendedDMMFModelCustomErrors_1 = require("./06_extendedDMMFModelCustomErrors");
class ExtendedDMMFModelCustomValidators extends _06_extendedDMMFModelCustomErrors_1.ExtendedDMMFModelCustomErrors {
    constructor(generatorConfig, model) {
        super(generatorConfig, model);
        Object.defineProperty(this, "zodCustomValidators", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.zodCustomValidators = this._setZodCustomValidators();
    }
    _setZodCustomValidators() {
        if (!this._validatorList)
            return;
        const filterdValidatorList = this._validatorList
            .filter((elem) => !(elem.includes('.error(') || elem.includes('.import(')))
            .sort((a, b) => {
            if (a === '.strict()')
                return -1;
            if (b === '.strict()')
                return 1;
            return 0;
        });
        return filterdValidatorList;
    }
}
exports.ExtendedDMMFModelCustomValidators = ExtendedDMMFModelCustomValidators;
//# sourceMappingURL=07_extendedDMMFModelCustomValidators.js.map