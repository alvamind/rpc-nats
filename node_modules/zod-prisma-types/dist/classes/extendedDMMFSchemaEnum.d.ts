import { DMMF, ReadonlyDeep } from '@prisma/generator-helper';
import { GeneratorConfig } from '../schemas';
import { FormattedNames } from './formattedNames';
export declare class ExtendedDMMFSchemaEnum extends FormattedNames implements DMMF.SchemaEnum {
    readonly generatorConfig: GeneratorConfig;
    readonly name: DMMF.SchemaEnum['name'];
    readonly values: DMMF.SchemaEnum['values'];
    readonly useNativeEnum: boolean;
    constructor(generatorConfig: GeneratorConfig, enumType: ReadonlyDeep<DMMF.SchemaEnum>);
    private _setUseNativeEnum;
}
//# sourceMappingURL=extendedDMMFSchemaEnum.d.ts.map