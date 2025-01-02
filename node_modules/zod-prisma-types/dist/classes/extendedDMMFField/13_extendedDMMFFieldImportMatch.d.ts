import { DMMF } from '@prisma/generator-helper';
import { GeneratorConfig } from '../../schemas';
import { ExtendedDMMFFieldZodType } from './12_extendedDMMFFieldZodType';
export declare class ExtendedDMMFFieldImportMatch extends ExtendedDMMFFieldZodType {
    protected _importStatements?: string;
    readonly imports: Set<string>;
    constructor(field: DMMF.Field, generatorConfig: GeneratorConfig, modelName: string);
    private _getImportStatement;
    private _getImports;
}
//# sourceMappingURL=13_extendedDMMFFieldImportMatch.d.ts.map