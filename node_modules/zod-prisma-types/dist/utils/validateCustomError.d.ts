export type ZodCustomErrorKey = 'invalid_type_error' | 'required_error' | 'description';
export declare const VALIDATOR_CUSTOM_ERROR_REGEX: RegExp;
export declare const VALIDATOR_CUSTOM_ERROR_MESSAGE_REGEX: RegExp;
export declare const VALIDATOR_CUSTOM_ERROR_SPLIT_KEYS_REGEX: RegExp;
export declare const ZOD_VALID_ERROR_KEYS: ZodCustomErrorKey[];
export declare const validateCustomError: (customError: string, errorLocation: string) => string | undefined;
//# sourceMappingURL=validateCustomError.d.ts.map