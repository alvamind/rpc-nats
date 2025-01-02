import { DMMF, ReadonlyDeep } from '@prisma/generator-helper';
import { ExtendedDMMFEnum } from './extendedDMMFEnum';
import { ExtendedDMMFModel } from './extendedDMMFModel';
import { GeneratorConfig } from '../schemas';
import { ExtendedDMMFIndex } from './extendedDMMFIndex';
export interface ExtendedDMMFDatamodelOptions {
    datamodel: DMMF.Datamodel;
    config: GeneratorConfig;
}
export declare class ExtendedDMMFDatamodel {
    readonly generatorConfig: GeneratorConfig;
    readonly enums: ExtendedDMMFEnum[];
    readonly models: ExtendedDMMFModel[];
    readonly types: ExtendedDMMFModel[];
    readonly indexes: ExtendedDMMFIndex[];
    constructor(generatorConfig: GeneratorConfig, datamodel: ReadonlyDeep<DMMF.Datamodel>);
    private _getExtendedModels;
    private _getExtendedEnums;
    private _getExtendedIndexes;
}
//# sourceMappingURL=extendedDMMFDatamodel.d.ts.map