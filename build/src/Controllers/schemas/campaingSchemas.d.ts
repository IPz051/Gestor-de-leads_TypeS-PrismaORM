import z from "zod";
export declare const createCampaignRequestSchemas: z.ZodObject<{
    name: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    startDate: z.ZodCoercedDate<unknown>;
    endDate: z.ZodOptional<z.ZodCoercedDate<unknown>>;
}, z.core.$strip>;
export declare const updateCampaignRequestSchemas: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodString>;
    startDate: z.ZodOptional<z.ZodCoercedDate<unknown>>;
    endDate: z.ZodOptional<z.ZodCoercedDate<unknown>>;
}, z.core.$strip>;
export declare const leadCampaignStatusSchema: z.ZodEnum<{
    new: "new";
    contacted: "contacted";
    converted: "converted";
    qualified: "qualified";
    unresponsive: "unresponsive";
    disqualified: "disqualified";
    engaged: "engaged";
    followUp_Scheduled: "followUp_Scheduled";
    followUp_Completed: "followUp_Completed";
    re_engaged: "re_engaged";
    opted_out: "opted_out";
}>;
export declare const getCampaignsRequestSchemas: z.ZodObject<{
    page: z.ZodOptional<z.ZodString>;
    pageSize: z.ZodOptional<z.ZodString>;
    name: z.ZodOptional<z.ZodString>;
    status: z.ZodOptional<z.ZodEnum<{
        new: "new";
        contacted: "contacted";
        converted: "converted";
        qualified: "qualified";
        unresponsive: "unresponsive";
        disqualified: "disqualified";
        engaged: "engaged";
        followUp_Scheduled: "followUp_Scheduled";
        followUp_Completed: "followUp_Completed";
        re_engaged: "re_engaged";
        opted_out: "opted_out";
    }>>;
    sortBy: z.ZodOptional<z.ZodEnum<{
        name: "name";
        id: "id";
        createdAt: "createdAt";
    }>>;
    orderBy: z.ZodOptional<z.ZodEnum<{
        asc: "asc";
        desc: "desc";
    }>>;
}, z.core.$strip>;
export declare const addLeadCampaignRequestSchemas: z.ZodObject<{
    leadInt: z.ZodNumber;
    status: z.ZodOptional<z.ZodEnum<{
        new: "new";
        contacted: "contacted";
        converted: "converted";
        qualified: "qualified";
        unresponsive: "unresponsive";
        disqualified: "disqualified";
        engaged: "engaged";
        followUp_Scheduled: "followUp_Scheduled";
        followUp_Completed: "followUp_Completed";
        re_engaged: "re_engaged";
        opted_out: "opted_out";
    }>>;
}, z.core.$strip>;
export declare const updateLeadCampaignRequestSchemas: z.ZodObject<{
    status: z.ZodOptional<z.ZodEnum<{
        new: "new";
        contacted: "contacted";
        converted: "converted";
        qualified: "qualified";
        unresponsive: "unresponsive";
        disqualified: "disqualified";
        engaged: "engaged";
        followUp_Scheduled: "followUp_Scheduled";
        followUp_Completed: "followUp_Completed";
        re_engaged: "re_engaged";
        opted_out: "opted_out";
    }>>;
}, z.core.$strip>;
//# sourceMappingURL=campaingSchemas.d.ts.map