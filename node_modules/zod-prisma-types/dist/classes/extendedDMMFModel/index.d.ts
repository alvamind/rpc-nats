import { DMMF } from '@prisma/generator-helper';
import { FormattedNames } from '../formattedNames';
import { ExtendedDMMFModelFormatingHelpers } from './08_extendedDMMFModelFormatingHelpers';
import { ExtendedDMMFField } from '../extendedDMMFField';
import { GeneratorConfig } from '../../schemas/generatorConfigSchema';
export interface ExtendedDMMFModel extends DMMF.Model, FormattedNames {
    readonly generatorConfig: GeneratorConfig;
    readonly fields: ExtendedDMMFField[];
    readonly scalarFields: ExtendedDMMFField[];
    readonly relationFields: ExtendedDMMFField[];
    readonly filteredRelationFields: ExtendedDMMFField[];
    readonly enumFields: ExtendedDMMFField[];
    readonly optionalJsonFields: ExtendedDMMFField[];
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
    readonly zodCustomErrors?: string;
    readonly zodCustomValidators?: string[];
    readonly imports: Set<string>;
    readonly modelImports: Set<string>;
    readonly fieldImports: Set<string>;
    readonly clearedDocumentation?: string;
    readonly optionalJsonFieldUnion: string;
}
export declare class ExtendedDMMFModelClass extends ExtendedDMMFModelFormatingHelpers {
}
//# sourceMappingURL=index.d.ts.map