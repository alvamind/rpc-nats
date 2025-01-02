"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDecimalJSInstalled = void 0;
const getDecimalJSInstalled = () => {
    try {
        require.resolve('decimal.js');
        return true;
    }
    catch (_e) {
        return false;
    }
};
exports.getDecimalJSInstalled = getDecimalJSInstalled;
//# sourceMappingURL=getDecimalJSInstalled.js.map