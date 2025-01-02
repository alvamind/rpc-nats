import { DMMF } from '@prisma/generator-helper';
import { GeneratorConfig } from '../../schemas';
import { ExtendedDMMFModelCustomErrors } from './06_extendedDMMFModelCustomErrors';
export declare class ExtendedDMMFModelCustomValidators extends ExtendedDMMFModelCustomErrors {
    readonly zodCustomValidators?: string[];
    constructor(generatorConfig: GeneratorConfig, model: DMMF.Model);
    private _setZodCustomValidators;
}
//# sourceMappingURL=07_extendedDMMFModelCustomValidators.d.ts.map