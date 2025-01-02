import { DMMF } from '@prisma/generator-helper';
import { GeneratorConfig } from '../../schemas';
import { ExtendedDMMFModelValidatorPattern } from './04_extendedDMMFModelValidatorPattern';
export declare class ExtendedDMMFModelImportStatement extends ExtendedDMMFModelValidatorPattern {
    protected _importStatements?: string[];
    protected _automaticImports?: string[];
    readonly modelImports: Set<string>;
    readonly fieldImports: Set<string>;
    readonly imports: Set<string>;
    constructor(generatorConfig: GeneratorConfig, model: DMMF.Model);
    private _getImportStatement;
    private _getAutomaticImports;
    private _getModelImports;
    private _getImports;
    private _getFieldImports;
}
//# sourceMappingURL=05_extendedDMMFModelImportStatement.d.ts.map