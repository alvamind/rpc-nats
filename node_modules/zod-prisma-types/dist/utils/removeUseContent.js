"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeUseContent = removeUseContent;
function removeUseContent(input) {
    let result = '';
    let depth = 0;
    let isInUseBlock = false;
    for (let i = 0; i < input.length; i++) {
        const char = input[i];
        if (input.substring(i, i + 5) === '.use(') {
            depth++;
            isInUseBlock = true;
            i += 4;
            result += '.use(';
            continue;
        }
        if (isInUseBlock) {
            if (char === '(') {
                depth++;
            }
            else if (char === ')') {
                depth--;
                if (depth === 0) {
                    isInUseBlock = false;
                    result += ')';
                }
            }
            continue;
        }
        result += char;
    }
    return result;
}
//# sourceMappingURL=removeUseContent.js.map