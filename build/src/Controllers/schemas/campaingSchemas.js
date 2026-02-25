"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateLeadCampaignRequestSchemas = exports.addLeadCampaignRequestSchemas = exports.getCampaignsRequestSchemas = exports.leadCampaignStatusSchema = exports.updateCampaignRequestSchemas = exports.createCampaignRequestSchemas = void 0;
const zod_1 = __importDefault(require("zod"));
exports.createCampaignRequestSchemas = zod_1.default.object({
    name: zod_1.default.string().min(1),
    description: zod_1.default.string().min(1).optional(),
    startDate: zod_1.default.coerce.date().refine(date => !isNaN(date.getTime()), {
        message: "Data inválida. Use o formato AAAA-MM-DD (ex: 2024-01-01)."
    }),
    endDate: zod_1.default.coerce.date().refine(date => !isNaN(date.getTime()), {
        message: "Data inválida. Use o formato AAAA-MM-DD (ex: 2024-01-01)."
    }).optional(),
});
exports.updateCampaignRequestSchemas = zod_1.default.object({
    name: zod_1.default.string().min(1).optional(),
    description: zod_1.default.string().min(1).optional(),
    startDate: zod_1.default.coerce.date().refine(date => !isNaN(date.getTime()), {
        message: "Data inválida. Use o formato AAAA-MM-DD (ex: 2024-01-01)."
    }).optional(),
    endDate: zod_1.default.coerce.date().refine(date => !isNaN(date.getTime()), {
        message: "Data inválida. Use o formato AAAA-MM-DD (ex: 2024-01-01)."
    }).optional(),
});
exports.leadCampaignStatusSchema = zod_1.default.enum([
    "new",
    "engaged",
    "followUp_Scheduled",
    "followUp_Completed",
    "contacted",
    "converted",
    "qualified",
    "unresponsive",
    "disqualified",
    "re_engaged",
    "opted_out",
]);
exports.getCampaignsRequestSchemas = zod_1.default.object({
    page: zod_1.default.string().min(1).optional(),
    pageSize: zod_1.default.string().min(1).optional(),
    name: zod_1.default.string().min(1).optional(),
    status: exports.leadCampaignStatusSchema.optional(),
    sortBy: zod_1.default.enum(["name", "createdAt"]).optional(),
    orderBy: zod_1.default.enum(["asc", "desc"]).optional(),
});
exports.addLeadCampaignRequestSchemas = zod_1.default.object({
    leadInt: zod_1.default.number().int().positive(),
    status: exports.leadCampaignStatusSchema.optional(),
});
exports.updateLeadCampaignRequestSchemas = zod_1.default.object({
    status: exports.leadCampaignStatusSchema.optional(),
});
//# sourceMappingURL=campaingSchemas.js.map