"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateCustomError = exports.ZOD_VALID_ERROR_KEYS = exports.VALIDATOR_CUSTOM_ERROR_SPLIT_KEYS_REGEX = exports.VALIDATOR_CUSTOM_ERROR_MESSAGE_REGEX = exports.VALIDATOR_CUSTOM_ERROR_REGEX = void 0;
exports.VALIDATOR_CUSTOM_ERROR_REGEX = /(\()(?<object>\{(?<messages>[\w\W\p{Script=Latin}\p{Script=Hiragana}\p{Script=Katakana}\p{Script=Han}\p{M} ()-.,'ʼ:+\-*#!§$%&/{}[\]=?~><°^|]+)\})(\))/u;
exports.VALIDATOR_CUSTOM_ERROR_MESSAGE_REGEX = /[ ]?"[\w\p{Script=Latin}\p{Script=Hiragana}\p{Script=Katakana}\p{Script=Han}\p{M} ()-.,'ʼ:+\-*#!§$%&/{}[\]=?~><°^|]+"[,]?[ ]?/gu;
exports.VALIDATOR_CUSTOM_ERROR_SPLIT_KEYS_REGEX = /[\w]+(?=:)/gu;
exports.ZOD_VALID_ERROR_KEYS = [
    'invalid_type_error',
    'required_error',
    'description',
];
const validateCustomError = (customError, errorLocation) => {
    var _a, _b;
    const match = customError.match(exports.VALIDATOR_CUSTOM_ERROR_REGEX);
    const messages = (_a = match === null || match === void 0 ? void 0 : match.groups) === null || _a === void 0 ? void 0 : _a['messages'];
    const object = (_b = match === null || match === void 0 ? void 0 : match.groups) === null || _b === void 0 ? void 0 : _b['object'];
    if (!messages)
        return;
    const customErrorKeysArray = messages
        .replace(exports.VALIDATOR_CUSTOM_ERROR_MESSAGE_REGEX, '')
        .match(exports.VALIDATOR_CUSTOM_ERROR_SPLIT_KEYS_REGEX);
    const isValid = customErrorKeysArray === null || customErrorKeysArray === void 0 ? void 0 : customErrorKeysArray.every((key) => {
        if (exports.ZOD_VALID_ERROR_KEYS === null || exports.ZOD_VALID_ERROR_KEYS === void 0 ? void 0 : exports.ZOD_VALID_ERROR_KEYS.includes(key))
            return true;
        throw new Error(`[@zod generator error]: Custom error key '${key}' is not valid. Please check for typos! ${errorLocation}`);
    });
    return isValid ? object : undefined;
};
exports.validateCustomError = validateCustomError;
//# sourceMappingURL=validateCustomError.js.map