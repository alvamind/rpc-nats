"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExtendedDMMFModelFlags = void 0;
const _01_extendedDMMFModelBase_1 = require("./01_extendedDMMFModelBase");
class ExtendedDMMFModelFlags extends _01_extendedDMMFModelBase_1.ExtendedDMMFModelBase {
    constructor(generatorConfig, model) {
        super(generatorConfig, model);
        Object.defineProperty(this, "hasRelationFields", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "hasRequiredJsonFields", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "hasOptionalJsonFields", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "hasOmitFields", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "hasDecimalFields", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "hasOptionalDefaultFields", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "writeOptionalDefaultValuesTypes", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "writeRelationValueTypes", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "writeOptionalDefaultsRelationValueTypes", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "writePartialTypes", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "writePartialRelationValueTypes", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.hasRelationFields = this._setHasRelationFields();
        this.hasRequiredJsonFields = this._setHasRequiredJsonFields();
        this.hasOptionalJsonFields = this._setHasOptionalJsonFields();
        this.hasDecimalFields = this._setHasDecimalFields();
        this.hasOptionalDefaultFields = this._setHasOptionalDefaultFields();
        this.hasOmitFields = this._setHasOmitFields();
        this.writeOptionalDefaultValuesTypes =
            this._setWriteOptionalDefaultValuesTypes();
        this.writeRelationValueTypes = this._setWriteRelationValueTypes();
        this.writeOptionalDefaultsRelationValueTypes =
            this._setWriteOptionalDefaultsRelationValueTypes();
        this.writePartialTypes = this._setWritePartialTypes();
        this.writePartialRelationValueTypes =
            this._writePartialRelationValueTypes();
    }
    _setHasRelationFields() {
        return this.relationFields.length > 0;
    }
    _setHasRequiredJsonFields() {
        return this.fields.some((field) => field.isJsonType && field.isRequired);
    }
    _setHasOptionalJsonFields() {
        return this.fields.some((field) => field.isJsonType && !field.isRequired);
    }
    _setHasDecimalFields() {
        return this.fields.some((field) => field.isDecimalType);
    }
    _setHasOmitFields() {
        return this.fields.some((field) => field.isOmitField());
    }
    _setHasOptionalDefaultFields() {
        return this.fields.some((field) => field.isOptionalDefaultField);
    }
    _setWriteOptionalDefaultValuesTypes() {
        return (this.generatorConfig.createOptionalDefaultValuesTypes);
    }
    _setWriteRelationValueTypes() {
        return (this.hasRelationFields && this.generatorConfig.createRelationValuesTypes);
    }
    _setWriteOptionalDefaultsRelationValueTypes() {
        return this.writeRelationValueTypes && this.writeOptionalDefaultValuesTypes;
    }
    _setWritePartialTypes() {
        return this.generatorConfig.createPartialTypes;
    }
    _writePartialRelationValueTypes() {
        return this.writeRelationValueTypes && this.writePartialTypes;
    }
}
exports.ExtendedDMMFModelFlags = ExtendedDMMFModelFlags;
//# sourceMappingURL=02_extendedDMMFModelFlags.js.map