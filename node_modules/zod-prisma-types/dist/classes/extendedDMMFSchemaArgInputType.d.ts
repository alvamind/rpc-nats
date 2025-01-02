import { DMMF } from '@prisma/generator-helper';
import { GeneratorConfig } from '../schemas';
type SchemaArgInputType = DMMF.TypeRef<'scalar' | 'inputObjectTypes' | 'enumTypes' | 'fieldRefTypes'>;
export declare class ExtendedDMMFSchemaArgInputType implements SchemaArgInputType {
    readonly generatorConfig: GeneratorConfig;
    readonly isJsonType: boolean;
    readonly isBytesType: boolean;
    readonly isDecimalType: boolean;
    readonly isNullType: boolean;
    readonly isList: SchemaArgInputType['isList'];
    readonly type: SchemaArgInputType['type'];
    readonly location: SchemaArgInputType['location'];
    readonly namespace?: SchemaArgInputType['namespace'];
    constructor(generatorConfig: GeneratorConfig, arg: SchemaArgInputType);
    private _setIsJsonType;
    private _setIsBytesType;
    private _setIsDecimalType;
    private _setIsNullType;
    getZodScalarType: () => import("../types").ZodScalarType | undefined;
    getZodNonScalarType: () => string | undefined;
    getZodNullType: () => "null" | undefined;
    isSpecialType: () => boolean;
}
export {};
//# sourceMappingURL=extendedDMMFSchemaArgInputType.d.ts.map