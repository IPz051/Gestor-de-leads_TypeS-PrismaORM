import z from "zod";
declare const createLeadRequestSchemas: z.ZodObject<{
    name: z.ZodString;
    email: z.ZodString;
    phone: z.ZodString;
    status: z.ZodOptional<z.ZodPipe<z.ZodPipe<z.ZodString, z.ZodTransform<string, string>>, z.ZodEnum<{
        new: "new";
        contacted: "contacted";
        converted: "converted";
        qualified: "qualified";
        unresponsive: "unresponsive";
        disqualified: "disqualified";
        archived: "archived";
    }>>>;
}, z.core.$strip>;
export default createLeadRequestSchemas;
//# sourceMappingURL=leadsRequestSchemas.d.ts.map