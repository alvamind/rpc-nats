import { DMMF } from '@prisma/generator-helper';
import { GeneratorConfig } from '../../schemas';
import { ExtendedDMMFModelFlags } from './02_extendedDMMFModelFlags';
export declare const IMPORT_STATEMENT_REGEX_PATTERN: RegExp;
export declare class ExtendedDMMFModelValidatorMatch extends ExtendedDMMFModelFlags {
    protected _validatorMatch?: RegExpMatchArray;
    readonly clearedDocumentation?: string;
    constructor(generatorConfig: GeneratorConfig, model: DMMF.Model);
    private _getValidatorMatchArray;
    private _getClearedDocumentation;
}
//# sourceMappingURL=03_extendedDMMFModelValidatorMatch.d.ts.map