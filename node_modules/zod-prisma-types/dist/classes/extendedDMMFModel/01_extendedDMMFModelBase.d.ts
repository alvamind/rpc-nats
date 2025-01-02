import { DMMF } from '@prisma/generator-helper';
import { GeneratorConfig } from '../../schemas';
import { FormattedNames } from '../formattedNames';
import { type ExtendedDMMFField } from '../extendedDMMFField';
export declare class ExtendedDMMFModelBase extends FormattedNames implements DMMF.Model {
    readonly generatorConfig: GeneratorConfig;
    readonly name: DMMF.Model['name'];
    readonly dbName: DMMF.Model['dbName'];
    readonly schema: DMMF.Model['schema'];
    readonly uniqueFields: DMMF.Model['uniqueFields'];
    readonly uniqueIndexes: DMMF.Model['uniqueIndexes'];
    readonly documentation?: DMMF.Model['documentation'];
    readonly primaryKey: DMMF.Model['primaryKey'];
    readonly isGenerated?: DMMF.Model['isGenerated'];
    readonly fields: ExtendedDMMFField[];
    readonly scalarFields: ExtendedDMMFField[];
    readonly relationFields: ExtendedDMMFField[];
    readonly enumFields: ExtendedDMMFField[];
    readonly filteredRelationFields: ExtendedDMMFField[];
    readonly optionalJsonFields: ExtendedDMMFField[];
    protected _errorLocation: string;
    constructor(generatorConfig: GeneratorConfig, model: DMMF.Model);
    private _getExtendedFields;
    private _setScalarFields;
    private _setRelationFields;
    private _setEnumfields;
    private _setFilteredRelationFields;
    private _setOptionalJsonFields;
    private _setErrorLocation;
}
//# sourceMappingURL=01_extendedDMMFModelBase.d.ts.map