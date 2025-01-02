import { DMMF } from '@prisma/generator-helper';
import { OmitFieldMode } from './11_extendedDMMFFieldOmitField';
import { GeneratorConfig } from '../../schemas';
import { FormattedNames } from '../formattedNames';
import { ExtendedDMMFFieldImportMatch } from './13_extendedDMMFFieldImportMatch';
export interface ExtendedDMMFField extends DMMF.Field, FormattedNames {
    readonly generatorConfig: GeneratorConfig;
    readonly isNullable: boolean;
    readonly isJsonType: boolean;
    readonly isBytesType: boolean;
    readonly isDecimalType: boolean;
    readonly isCompositeType: boolean;
    readonly isOptionalOnDefaultValue: boolean;
    readonly isOptionalDefaultField: boolean;
    readonly clearedDocumentation?: string;
    readonly zodValidatorString?: string;
    readonly zodCustomErrors?: string;
    readonly zodCustomValidatorString?: string;
    readonly zodArrayValidatorString?: string;
    readonly zodOmitField: OmitFieldMode;
    readonly zodType: string;
    omitInModel(): boolean;
    omitInInputTypes(inputTypeName: string): boolean;
    isOmitField(): boolean;
    readonly imports: Set<string>;
}
export declare class ExtendedDMMFFieldClass extends ExtendedDMMFFieldImportMatch implements ExtendedDMMFField {
}
//# sourceMappingURL=index.d.ts.map