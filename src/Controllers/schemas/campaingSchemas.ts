
import z from "zod";


export const createCampaignRequestSchemas = z.object({
    name: z.string().min(1),
    description: z.string().optional(),
    startDate: z.coerce.date().refine(date => !isNaN(date.getTime()), {
        message: "Data inválida. Use o formato AAAA-MM-DD (ex: 2024-01-01)."
    }),
    endDate: z.coerce.date().refine(date => !isNaN(date.getTime()), {
        message: "Data inválida. Use o formato AAAA-MM-DD (ex: 2024-01-01)."
    }).optional(),
})

export const updateCampaignRequestSchemas = z.object({
    name: z.string().min(1).optional(),
    description: z.string().optional(),
    startDate: z.coerce.date().refine(date => !isNaN(date.getTime()), {
        message: "Data inválida. Use o formato AAAA-MM-DD (ex: 2024-01-01)."
    }).optional(),
    endDate: z.coerce.date().refine(date => !isNaN(date.getTime()), {
        message: "Data inválida. Use o formato AAAA-MM-DD (ex: 2024-01-01)."
    }).optional(),
})

export const leadCampaignStatusSchema = z.enum([
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
])

export const getCampaignsRequestSchemas = z.object({
    page: z.string().min(1).optional(),
    pageSize: z.string().min(1).optional(),
    name: z.string().min(1).optional(),
    status: leadCampaignStatusSchema.optional(),
    sortBy: z.enum(["name", "createdAt"]).optional(),
    orderBy: z.enum(["asc", "desc"]).optional(),
})

export const addLeadCampaignRequestSchemas = z.object({
    leadInt: z.number().int().positive(),
    status: leadCampaignStatusSchema.optional(),
})

export const updateLeadCampaignRequestSchemas = z.object({
    status: leadCampaignStatusSchema.optional(),
})
