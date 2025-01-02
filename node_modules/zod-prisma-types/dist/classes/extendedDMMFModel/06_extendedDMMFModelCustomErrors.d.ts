import { DMMF } from '@prisma/generator-helper';
import { GeneratorConfig } from '../../schemas';
import { ExtendedDMMFModelImportStatement } from './05_extendedDMMFModelImportStatement';
export declare class ExtendedDMMFModelCustomErrors extends ExtendedDMMFModelImportStatement {
    protected _validatorCustomError?: string;
    readonly zodCustomErrors?: string;
    constructor(generatorConfig: GeneratorConfig, model: DMMF.Model);
    private _setValidatorCustomError;
    private _setZodCustomErrors;
}
//# sourceMappingURL=06_extendedDMMFModelCustomErrors.d.ts.map