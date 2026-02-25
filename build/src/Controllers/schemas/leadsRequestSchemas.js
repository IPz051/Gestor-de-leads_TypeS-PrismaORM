"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetLeadRequestSchemas = void 0;
const zod_1 = __importDefault(require("zod"));
const statusSchema = zod_1.default.string().transform((s) => s.trim().toLowerCase()).pipe(zod_1.default.enum([
    "new",
    "contacted",
    "converted",
    "qualified",
    "unresponsive",
    "disqualified",
    "archived",
]));
const leadStatusSchema = zod_1.default.enum([
    "new",
    "contacted",
    "converted",
    "qualified",
    "unresponsive",
    "disqualified",
    "archived",
]);
exports.GetLeadRequestSchemas = zod_1.default.object({
    id: zod_1.default.coerce.number().int().positive().optional(),
    page: zod_1.default.coerce.number().int().positive().optional(),
    pageSize: zod_1.default.coerce.number().int().positive().optional(),
    name: zod_1.default.string().optional(),
    status: leadStatusSchema.optional(),
    sortBy: zod_1.default.enum(["name", "status"]).optional(),
    orderBy: zod_1.default.enum(["asc", "desc"]).optional(),
});
const createLeadRequestSchemas = zod_1.default.object({
    name: zod_1.default.string().min(1),
    email: zod_1.default.string(),
    phone: zod_1.default.string().min(10),
    status: statusSchema.optional(),
});
exports.default = createLeadRequestSchemas;
//# sourceMappingURL=leadsRequestSchemas.js.map