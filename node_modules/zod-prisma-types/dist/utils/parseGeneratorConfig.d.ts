import { GeneratorOptions } from '@prisma/generator-helper';
export declare const parseGeneratorConfig: (generatorOptions: GeneratorOptions) => {
    prismaClientPath: string;
    useMultipleFiles: boolean;
    writeBarrelFiles: boolean;
    createInputTypes: boolean;
    createModelTypes: boolean;
    createOptionalDefaultValuesTypes: boolean;
    createRelationValuesTypes: boolean;
    createPartialTypes: boolean;
    addInputTypeValidation: boolean;
    addIncludeType: boolean;
    addSelectType: boolean;
    validateWhereUniqueInput: boolean;
    useDefaultValidators: boolean;
    coerceDate: boolean;
    writeNullishInModelTypes: boolean;
    useTypeAssertions: boolean;
    isMongoDb: boolean;
    inputTypePath: string;
    outputTypePath: string;
    decimalJSInstalled: boolean;
    provider?: string | undefined;
    prismaVersion?: {
        major: number;
        minor: number;
        patch: number;
    } | undefined;
};
//# sourceMappingURL=parseGeneratorConfig.d.ts.map