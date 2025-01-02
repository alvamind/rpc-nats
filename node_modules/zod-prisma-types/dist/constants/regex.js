"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IMPORT_STATEMENT_REGEX_PATTERN_ENHANCED = exports.PRISMA_FUNCTION_TYPES_WITH_VALIDATORS_WHERE_UNIQUE = exports.PRISMA_FUNCTION_TYPES_WITH_VALIDATORS = void 0;
exports.PRISMA_FUNCTION_TYPES_WITH_VALIDATORS = /CreateInput|CreateWithout|CreateMany|UpdateInput|UpdateWithout|UpdateMany/;
exports.PRISMA_FUNCTION_TYPES_WITH_VALIDATORS_WHERE_UNIQUE = /CreateInput|CreateWithout|CreateMany|UpdateInput|UpdateWithout|UpdateMany|WhereUnique/;
exports.IMPORT_STATEMENT_REGEX_PATTERN_ENHANCED = /@zod(\.(?<type>[\w]+))?(\.import\(\[(?<imports>[\w "'${}/,;.*-]+)\]\))?(\.refine\((?<refine>[\w\W]+)\))?/;
//# sourceMappingURL=regex.js.map