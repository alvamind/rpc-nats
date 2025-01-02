import { DMMF, ReadonlyDeep } from '@prisma/generator-helper';
import { GeneratorConfig } from '../schemas';
export declare class ExtendedDMMFMappings implements DMMF.Mappings {
    readonly generatorConfig: GeneratorConfig;
    readonly modelOperations: ReadonlyDeep<DMMF.ModelMapping[]>;
    readonly otherOperations: ReadonlyDeep<{
        readonly read: string[];
        readonly write: string[];
    }>;
    constructor(generatorConfig: GeneratorConfig, mappings: DMMF.Mappings);
}
//# sourceMappingURL=extendedDMMFMappings.d.ts.map