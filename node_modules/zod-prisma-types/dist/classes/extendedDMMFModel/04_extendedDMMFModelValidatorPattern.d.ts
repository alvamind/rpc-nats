import { DMMF } from '@prisma/generator-helper';
import { GeneratorConfig } from '../../schemas';
import { ExtendedDMMFModelValidatorMatch } from './03_extendedDMMFModelValidatorMatch';
export declare const IMPORT_STATEMENT_REGEX_PATTERN: RegExp;
export declare const ALLOWED_TYPES_REGEX_PATTERN: RegExp;
export declare class ExtendedDMMFModelValidatorPattern extends ExtendedDMMFModelValidatorMatch {
    protected _validatorPattern?: string;
    protected _validatorList?: string[];
    constructor(generatorConfig: GeneratorConfig, model: DMMF.Model);
    private _getValidatorPattern;
    private _getValidatorList;
}
//# sourceMappingURL=04_extendedDMMFModelValidatorPattern.d.ts.map