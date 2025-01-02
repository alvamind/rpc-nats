import { DMMF } from '@prisma/generator-helper';
import { GeneratorConfig } from '../../schemas';
import { ExtendedDMMFModelCustomValidators } from './07_extendedDMMFModelCustomValidators';
export declare class ExtendedDMMFModelFormatingHelpers extends ExtendedDMMFModelCustomValidators {
    readonly optionalJsonFieldUnion: string;
    constructor(generatorConfig: GeneratorConfig, model: DMMF.Model);
    private _setOptionalJsonFieldUnion;
}
//# sourceMappingURL=08_extendedDMMFModelFormatingHelpers.d.ts.map