import { DMMF } from '@prisma/generator-helper';
import { GeneratorConfig } from '../../schemas';
import { ExtendedDMMFModelBase } from './01_extendedDMMFModelBase';
export declare class ExtendedDMMFModelFlags extends ExtendedDMMFModelBase {
    readonly hasRelationFields: boolean;
    readonly hasRequiredJsonFields: boolean;
    readonly hasOptionalJsonFields: boolean;
    readonly hasOmitFields: boolean;
    readonly hasDecimalFields: boolean;
    readonly hasOptionalDefaultFields: boolean;
    readonly writeOptionalDefaultValuesTypes: boolean;
    readonly writeRelationValueTypes: boolean;
    readonly writeOptionalDefaultsRelationValueTypes: boolean;
    readonly writePartialTypes: boolean;
    readonly writePartialRelationValueTypes: boolean;
    constructor(generatorConfig: GeneratorConfig, model: DMMF.Model);
    private _setHasRelationFields;
    private _setHasRequiredJsonFields;
    private _setHasOptionalJsonFields;
    private _setHasDecimalFields;
    private _setHasOmitFields;
    private _setHasOptionalDefaultFields;
    private _setWriteOptionalDefaultValuesTypes;
    private _setWriteRelationValueTypes;
    private _setWriteOptionalDefaultsRelationValueTypes;
    private _setWritePartialTypes;
    private _writePartialRelationValueTypes;
}
//# sourceMappingURL=02_extendedDMMFModelFlags.d.ts.map