import { DMMF } from '@prisma/generator-helper';
import { GeneratorConfig } from '../schemas';
export declare class ExtendedDMMFIndex implements DMMF.Index {
    readonly generatorConfig: GeneratorConfig;
    readonly model: DMMF.Index['model'];
    readonly type: DMMF.Index['type'];
    readonly isDefinedOnField: DMMF.Index['isDefinedOnField'];
    readonly name?: DMMF.Index['name'];
    readonly dbName?: DMMF.Index['dbName'];
    readonly algorithm?: DMMF.Index['algorithm'];
    readonly clustered?: DMMF.Index['clustered'];
    readonly fields: DMMF.Index['fields'];
    constructor(generatorConfig: GeneratorConfig, index: DMMF.Index);
}
//# sourceMappingURL=extendedDMMFIndex.d.ts.map