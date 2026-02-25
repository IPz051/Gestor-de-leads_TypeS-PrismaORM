import z from "zod";

export const createGroupRequestSchemas = z.object({
    name: z.string().min(1),
    description: z.string().optional(),
})

export const updateGroupRequestSchemas = z.object({
    name: z.string().min(1).optional(),
    description: z.string().optional(),
})

export const addLeadsToGroupRequestSchemas = z.object({
    leadId: z.number().int().min(1),
})
