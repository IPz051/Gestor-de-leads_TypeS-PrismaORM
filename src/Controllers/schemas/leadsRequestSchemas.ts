import z from "zod";

const statusSchema = z.string().transform((s) => s.trim().toLowerCase()).pipe(
  z.enum([
    "new",
    "contacted",
    "converted",
    "qualified",
    "unresponsive",
    "disqualified",
    "archived",
  ])
);

const leadStatusSchema = z.enum([
  "new",
  "contacted",
  "converted",
  "qualified",
  "unresponsive",
  "disqualified",
  "archived",
])

export const GetLeadRequestSchemas = z.object({
  id: z.coerce.number().int().positive().optional(),
  page: z.coerce.number().int().positive().optional(),
  pageSize: z.coerce.number().int().positive().optional(),
  name: z.string().optional(),
  status: leadStatusSchema.optional(),
  sortBy: z.enum(["id", "name", "status"]).optional(),
  orderBy: z.enum(["asc","desc"]).optional(),
})

const createLeadRequestSchemas = z.object({
  name: z.string().min(1),
  email: z.string(),
  phone: z.string().optional(),
  status: statusSchema.optional(),
});
export default createLeadRequestSchemas
