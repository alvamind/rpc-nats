"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllBoolCombinations = getAllBoolCombinations;
function getAllBoolCombinations(arr) {
    const result = [];
    function combine(start, soFar) {
        if (soFar.length === arr.length) {
            result.push(soFar.slice());
            return;
        }
        combine(start + 1, [...soFar, { ...arr[start], isRequired: true }]);
        combine(start + 1, [...soFar, { ...arr[start], isRequired: false }]);
    }
    combine(0, []);
    return result;
}
//# sourceMappingURL=getAllBoolCombinations.js.map