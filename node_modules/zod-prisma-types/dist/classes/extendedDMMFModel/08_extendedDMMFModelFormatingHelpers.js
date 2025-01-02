"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExtendedDMMFModelFormatingHelpers = void 0;
const _07_extendedDMMFModelCustomValidators_1 = require("./07_extendedDMMFModelCustomValidators");
class ExtendedDMMFModelFormatingHelpers extends _07_extendedDMMFModelCustomValidators_1.ExtendedDMMFModelCustomValidators {
    constructor(generatorConfig, model) {
        super(generatorConfig, model);
        Object.defineProperty(this, "optionalJsonFieldUnion", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.optionalJsonFieldUnion = this._setOptionalJsonFieldUnion();
    }
    _setOptionalJsonFieldUnion() {
        return this.optionalJsonFields
            .map((field) => `"${field.name}"`)
            .join(' | ');
    }
}
exports.ExtendedDMMFModelFormatingHelpers = ExtendedDMMFModelFormatingHelpers;
//# sourceMappingURL=08_extendedDMMFModelFormatingHelpers.js.map