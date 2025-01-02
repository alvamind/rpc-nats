import { DMMF } from '@prisma/generator-helper';
import { ExtendedDMMFFieldDefaultValidators } from './05_extendedDMMFFieldDefaultValidators';
import { GeneratorConfig } from '../../schemas';
export declare class ExtendedDMMFFieldValidatorCustomErrors extends ExtendedDMMFFieldDefaultValidators {
    protected _validatorCustomError?: string;
    readonly zodCustomErrors?: string;
    constructor(field: DMMF.Field, generatorConfig: GeneratorConfig, modelName: string);
    private _setValidatorCustomError;
    private _setZodCustomErrors;
}
//# sourceMappingURL=06_extendedDMMFFieldValidatorCustomErrors.d.ts.map