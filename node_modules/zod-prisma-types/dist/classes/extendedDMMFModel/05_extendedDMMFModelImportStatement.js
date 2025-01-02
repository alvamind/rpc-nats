"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExtendedDMMFModelImportStatement = void 0;
const _04_extendedDMMFModelValidatorPattern_1 = require("./04_extendedDMMFModelValidatorPattern");
const transformImportStringToList_1 = require("../../utils/transformImportStringToList");
const validateImportStatements_1 = require("../../utils/validateImportStatements");
class ExtendedDMMFModelImportStatement extends _04_extendedDMMFModelValidatorPattern_1.ExtendedDMMFModelValidatorPattern {
    constructor(generatorConfig, model) {
        super(generatorConfig, model);
        Object.defineProperty(this, "_importStatements", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "_automaticImports", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "modelImports", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "fieldImports", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "imports", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this._importStatements = this._getImportStatement();
        this._automaticImports = this._getAutomaticImports();
        this.modelImports = this._getModelImports();
        this.fieldImports = this._getFieldImports();
        this.imports = this._getImports();
    }
    _getImportStatement() {
        if (!this._validatorList)
            return;
        const importStatements = this._validatorList
            .filter((elem) => elem.includes('.import('))
            .map((importStatement) => {
            return (0, validateImportStatements_1.validateImportStatement)(importStatement, this._errorLocation);
        });
        return importStatements;
    }
    _getAutomaticImports() {
        const statements = [];
        const { inputTypePath, prismaClientPath } = this.generatorConfig;
        if (this.fields.some((field) => field.isJsonType)) {
            statements.push(`import { JsonValueSchema } from '../${inputTypePath}/JsonValueSchema'`);
        }
        if (this.hasDecimalFields) {
            statements.push(`import { Prisma } from '${prismaClientPath}'`);
        }
        this.enumFields.forEach((field) => {
            statements.push(`import { ${field.type}Schema } from '../${inputTypePath}/${field.type}Schema'`);
        });
        return statements;
    }
    _getModelImports() {
        if (!this._importStatements)
            return new Set();
        const importList = this._importStatements
            .map((importStatement) => {
            return (0, transformImportStringToList_1.transformImportStringToList)(importStatement);
        })
            .flat();
        return new Set(importList);
    }
    _getImports() {
        const imports = new Set();
        if (this._automaticImports) {
            this._automaticImports.forEach((statement) => imports.add(statement));
        }
        if (this.modelImports) {
            this.modelImports.forEach((statement) => imports.add(statement));
        }
        if (this.fieldImports) {
            this.fieldImports.forEach((statement) => imports.add(statement));
        }
        return imports;
    }
    _getFieldImports() {
        const imports = new Set();
        this.fields.forEach((field) => {
            if (field.imports) {
                field.imports.forEach((statement) => imports.add(statement));
            }
        });
        return imports;
    }
}
exports.ExtendedDMMFModelImportStatement = ExtendedDMMFModelImportStatement;
//# sourceMappingURL=05_extendedDMMFModelImportStatement.js.map