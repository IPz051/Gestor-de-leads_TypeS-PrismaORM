"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addLeadsToGroupRequestSchemas = exports.updateGroupRequestSchemas = exports.createGroupRequestSchemas = void 0;
const zod_1 = __importDefault(require("zod"));
exports.createGroupRequestSchemas = zod_1.default.object({
    name: zod_1.default.string().min(1),
    description: zod_1.default.string().optional(),
});
exports.updateGroupRequestSchemas = zod_1.default.object({
    name: zod_1.default.string().min(1).optional(),
    description: zod_1.default.string().optional(),
});
exports.addLeadsToGroupRequestSchemas = zod_1.default.object({
    leadId: zod_1.default.number().int().min(1),
});
//# sourceMappingURL=groupsRequestSchemas.js.map