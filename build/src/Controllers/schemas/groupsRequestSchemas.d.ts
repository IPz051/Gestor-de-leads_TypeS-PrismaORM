import z from "zod";
export declare const createGroupRequestSchemas: z.ZodObject<{
    name: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export declare const updateGroupRequestSchemas: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export declare const addLeadsToGroupRequestSchemas: z.ZodObject<{
    leadId: z.ZodNumber;
}, z.core.$strip>;
//# sourceMappingURL=groupsRequestSchemas.d.ts.map