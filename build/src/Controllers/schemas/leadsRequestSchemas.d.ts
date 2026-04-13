import z from "zod";
export declare const GetLeadRequestSchemas: z.ZodObject<{
    id: z.ZodOptional<z.ZodCoercedNumber<unknown>>;
    page: z.ZodOptional<z.ZodCoercedNumber<unknown>>;
    pageSize: z.ZodOptional<z.ZodCoercedNumber<unknown>>;
    name: z.ZodOptional<z.ZodString>;
    status: z.ZodOptional<z.ZodEnum<{
        new: "new";
        contacted: "contacted";
        converted: "converted";
        qualified: "qualified";
        unresponsive: "unresponsive";
        disqualified: "disqualified";
        archived: "archived";
    }>>;
    sortBy: z.ZodOptional<z.ZodEnum<{
        name: "name";
        id: "id";
        status: "status";
    }>>;
    orderBy: z.ZodOptional<z.ZodEnum<{
        asc: "asc";
        desc: "desc";
    }>>;
}, z.core.$strip>;
declare const createLeadRequestSchemas: z.ZodObject<{
    name: z.ZodString;
    email: z.ZodString;
    phone: z.ZodOptional<z.ZodString>;
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