"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExtendedDMMFIndex = void 0;
class ExtendedDMMFIndex {
    constructor(generatorConfig, index) {
        Object.defineProperty(this, "generatorConfig", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: generatorConfig
        });
        Object.defineProperty(this, "model", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "type", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "isDefinedOnField", {
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
        Object.defineProperty(this, "algorithm", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "clustered", {
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
        this.model = index.model;
        this.type = index.type;
        this.isDefinedOnField = index.isDefinedOnField;
        this.name = index.name;
        this.dbName = index.dbName;
        this.algorithm = index.algorithm;
        this.clustered = index.clustered;
        this.fields = index.fields;
    }
}
exports.ExtendedDMMFIndex = ExtendedDMMFIndex;
//# sourceMappingURL=extendedDMMFIndex.js.map