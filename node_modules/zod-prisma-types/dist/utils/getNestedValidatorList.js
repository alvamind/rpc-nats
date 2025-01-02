"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isWordChar = exports.getPatternListFromSplitIndices = exports.getSplitIndices = exports.getNestedValidatorList = void 0;
const getNestedValidatorList = (validatorPattern) => {
    const splitIndices = (0, exports.getSplitIndices)(validatorPattern);
    return (0, exports.getPatternListFromSplitIndices)(validatorPattern, splitIndices);
};
exports.getNestedValidatorList = getNestedValidatorList;
const getSplitIndices = (string, match = /\.\w+$/) => {
    const splitIndices = [0];
    let depth = 0;
    [...string].forEach((char, idx) => {
        var _a;
        if (!depth && !(0, exports.isWordChar)(char)) {
            const splitPosition = (_a = string.substring(0, idx).match(match)) === null || _a === void 0 ? void 0 : _a.index;
            if (splitPosition)
                splitIndices.push(splitPosition);
        }
        if (char === '(')
            depth++;
        if (char === ')')
            depth--;
    });
    return splitIndices;
};
exports.getSplitIndices = getSplitIndices;
const getPatternListFromSplitIndices = (validatorPattern, splitIndices) => {
    var _a;
    const patternList = [];
    for (let i = 0; i < splitIndices.length; i++) {
        const start = splitIndices[i];
        const end = (_a = splitIndices[i + 1]) !== null && _a !== void 0 ? _a : validatorPattern.length;
        patternList.push(validatorPattern.substring(start, end).trimEnd());
    }
    return patternList;
};
exports.getPatternListFromSplitIndices = getPatternListFromSplitIndices;
const isWordChar = (char) => {
    return /[\w]/.test(char);
};
exports.isWordChar = isWordChar;
//# sourceMappingURL=getNestedValidatorList.js.map