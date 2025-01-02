"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExtendedDMMFModelBase = void 0;
const formattedNames_1 = require("../formattedNames");
const extendedDMMFField_1 = require("../extendedDMMFField");
class ExtendedDMMFModelBase extends formattedNames_1.FormattedNames {
    constructor(generatorConfig, model) {
        super(model.name);
        Object.defineProperty(this, "generatorConfig", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "name", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "dbName", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "schema", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "uniqueFields", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "uniqueIndexes", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "documentation", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "primaryKey", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "isGenerated", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "fields", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "scalarFields", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "relationFields", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "enumFields", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "filteredRelationFields", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "optionalJsonFields", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "_errorLocation", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.generatorConfig = generatorConfig;
        this.name = model.name;
        this.dbName = model.dbName;
        this.schema = model.schema;
        this.uniqueFields = model.uniqueFields;
        this.uniqueIndexes = model.uniqueIndexes;
        this.documentation = model.documentation;
        this.primaryKey = model.primaryKey;
        this.fields = this._getExtendedFields(model);
        this.scalarFields = this._setScalarFields();
        this.relationFields = this._setRelationFields();
        this.filteredRelationFields = this._setFilteredRelationFields();
        this.enumFields = this._setEnumfields();
        this.optionalJsonFields = this._setOptionalJsonFields();
        this._errorLocation = this._setErrorLocation();
    }
    _getExtendedFields(model) {
        return model.fields.map((field) => new extendedDMMFField_1.ExtendedDMMFFieldClass(field, this.generatorConfig, this.name));
    }
    _setScalarFields() {
        return this.fields.filter((field) => field.kind === 'scalar');
    }
    _setRelationFields() {
        return this.fields.filter((field) => field.kind === 'object');
    }
    _setEnumfields() {
        return this.fields.filter((field) => field.kind === 'enum');
    }
    _setFilteredRelationFields() {
        return this.relationFields.filter((field) => field.type !== this.name);
    }
    _setOptionalJsonFields() {
        return this.fields.filter((field) => field.isJsonType && !field.isRequired);
    }
    _setErrorLocation() {
        return `[Error Location]: Model: '${this.name}'.`;
    }
}
exports.ExtendedDMMFModelBase = ExtendedDMMFModelBase;
//# sourceMappingURL=01_extendedDMMFModelBase.js.map