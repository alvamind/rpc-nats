"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PRISMA_ACTION_MATCHER_ARRAY = exports.PRISMA_ACTION_ARRAY = exports.PRISMA_ACTION_ARG_MAP = exports.ZOD_VALID_ERROR_KEYS = exports.PRISMA_TO_ZOD_TYPE_MAP = exports.PRISMA_TO_VALIDATOR_TYPE_MAP = void 0;
const formattedNames_1 = require("../classes/formattedNames");
exports.PRISMA_TO_VALIDATOR_TYPE_MAP = {
    string: ['String'],
    number: ['Float', 'Int'],
    bigint: ['BigInt'],
    date: ['DateTime'],
    custom: [
        'String',
        'Boolean',
        'Int',
        'BigInt',
        'Float',
        'Decimal',
        'DateTime',
        'Json',
        'Bytes',
    ],
};
exports.PRISMA_TO_ZOD_TYPE_MAP = {
    String: 'string',
    Boolean: 'boolean',
    DateTime: 'date',
    Int: 'number',
    BigInt: 'bigint',
    Float: 'number',
};
exports.ZOD_VALID_ERROR_KEYS = [
    'invalid_type_error',
    'required_error',
    'description',
];
exports.PRISMA_ACTION_ARG_MAP = {
    findUnique: new formattedNames_1.FormattedNames('findUnique'),
    findMany: new formattedNames_1.FormattedNames('findMany'),
    findFirst: new formattedNames_1.FormattedNames('findFirst'),
    createOne: new formattedNames_1.FormattedNames('create'),
    createMany: new formattedNames_1.FormattedNames('createMany'),
    createManyAndReturn: new formattedNames_1.FormattedNames('createManyAndReturn'),
    updateOne: new formattedNames_1.FormattedNames('update'),
    updateMany: new formattedNames_1.FormattedNames('updateMany'),
    upsertOne: new formattedNames_1.FormattedNames('upsert'),
    deleteOne: new formattedNames_1.FormattedNames('delete'),
    deleteMany: new formattedNames_1.FormattedNames('deleteMany'),
    aggregate: new formattedNames_1.FormattedNames('aggregate'),
    groupBy: new formattedNames_1.FormattedNames('groupBy'),
};
exports.PRISMA_ACTION_ARRAY = [
    'findUnique',
    'findMany',
    'findFirst',
    'createOne',
    'AndReturn',
    'createMany',
    'updateOne',
    'updateMany',
    'upsertOne',
    'deleteOne',
    'deleteMany',
    'aggregate',
    'groupBy',
];
exports.PRISMA_ACTION_MATCHER_ARRAY = [
    ['findUnique', 'findUnique'],
    ['findMany', 'findMany'],
    ['findFirst', 'findFirst'],
    ['createOne', 'createOne'],
    ['AndReturn', 'createManyAndReturn'],
    ['createMany', 'createMany'],
    ['updateOne', 'updateOne'],
    ['updateMany', 'updateMany'],
    ['upsertOne', 'upsertOne'],
    ['deleteOne', 'deleteOne'],
    ['deleteMany', 'deleteMany'],
    ['aggregate', 'aggregate'],
    ['groupBy', 'groupBy'],
];
//# sourceMappingURL=objectMaps.js.map